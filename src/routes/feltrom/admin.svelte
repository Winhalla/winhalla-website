<script>
    import { callApi } from "../../utils/api";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Loading from "../../components/Loading.svelte";
    import UsersArray from "../../components/UsersArray.svelte";
    import { config } from "../../components/storeAdmin";
    import { goto } from "@sapper/app";
    import RefreshButton from "../../components/RefreshButton.svelte";
    import Infos from "../../components/Infos.svelte";
    import Poll from "../../components/Poll.svelte";
    import { counter } from "../../components/store";
    import NavAlert from "../../components/Navigation/NavAlert.svelte";

    let configs;
    let isAuthorizedUser = false;
    let isLoggedIn = false;
    let otp = "";
    let pwd = "a";
    let users;
    let activePanel = "config";
    let newConfig;
    let goldEvent = [];
    let loadingUsers;
    let sortBy = "alphabetic";
    let suspiciousBitches = [];
    let suspiciousUsersFound = 0;
    let bannedOnes = [];
    let normalUsersShown;
    let commands;
    let popup = {};
    let isSavingConfig;

    async function loadUsers() {
        loadingUsers = true;
        suspiciousBitches = [];
        suspiciousUsersFound = 0;
        bannedOnes = [];
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        for (let i = 0; i < users.length * 2; i++) {
            if (!users[i - suspiciousUsersFound]) continue;
            users[i - suspiciousUsersFound].winrate = Math.round((users[i - suspiciousUsersFound].stats.ffa.wins / users[i - suspiciousUsersFound].stats.ffa.gamesPlayed) * 100);
            if (isNaN(users[i - suspiciousUsersFound].winrate)) users[i - suspiciousUsersFound].winrate = 0;
            if (users[i - suspiciousUsersFound].isSucpicious.ffa === true || users[i - suspiciousUsersFound].isSucpicious.solo === true) {
                suspiciousBitches.push(...users.splice(i - suspiciousUsersFound, 1));
                suspiciousUsersFound += 1;
            }
        }
        sortArrays((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));

        bannedOnes = configs.find(e => e.name === "IDs BANNED").value;
        bannedOnes.forEach((ban, i) => {
            let user = users.find(user => user.steamId === ban.id);
            let winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);
            if (isNaN(winrate)) winrate = 0;
            bannedOnes[i] = user;
            bannedOnes[i].reason = ban.reason;
            users.splice(users.findIndex(e => e.steamId === ban), 1);

            loadingUsers = false;
            users = users;
            suspiciousBitches = suspiciousBitches;
        });


        loadingUsers = false;
    }

    async function loadCommands() {
        commands = await callApi("get", `/feltrom/commands?otp=${otp}&pwd=${pwd}`);
        commands.sort((a, b) => a.date - b.date);
    }

    async function login(refresh) {

        goldEvent = ["", "", "", ""];
        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        otp = configs.tempKey;
        configs = configs.configs;
        newConfig = configs;

        let polls = await callApi("get", `/feltrom/getAllPolls?otp=${otp}&pwd=${pwd}`);
        configs.push({ name: "POLLS", value: polls });
        newConfig = configs;
        configs = JSON.stringify(configs);
        if (refresh) {
            loadUsers();
            loadCommands();
        }
    }

    function sortArrays(fx) {
        users.sort(fx);
        suspiciousBitches.sort(fx);
        bannedOnes.sort(fx);
    }

    function sort(by, stats) {
        if (stats) {
            sortArrays((a, b) => {
                return b.stats.ffa[by] - a.stats.ffa[by];
            });

        } else if (by === "alphabetic") {
            sortArrays((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));
        } else {
            sortArrays((a, b) => {
                return b[by] - a[by];
            });
        }
        sortBy = by;
        users = users;
    }

    function logout() {
        callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`);
        goto("/");
    }

    async function delThing(thing) {
        if (thing === "event") {
            let eventIndex = configs.findIndex(e => e.name === "GOLD EVENT");
            let infosIndex = configs.findIndex(e => e.name === "INFOS");
            configs[eventIndex].value = { percentage: 100, expiration: null };
            configs[infosIndex].value.splice(configs[infosIndex].value.findIndex(e => e.type === "event"), 1);
            await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, configs.filter(e => e.name === "GOLD EVENT" || e.name === "INFOS"));
        }

        if (thing === "info") {
            let infosIndex = configs.findIndex(e => e.name === "INFOS");
            configs[infosIndex].value.splice(popup.options.index, 1);
            await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, configs.filter(e => e.name === "INFOS"));
            newConfig = configs;
        }

        if (thing === "poll") {
            await callApi("post", `/feltrom/deletePoll?otp=${otp}&pwd=${pwd}`, { id: popup.options.index });
        }
        login(true);
    }

    async function createThing(thing) {
        if (thing === "event") {
            let { duration, description, percentage, name } = {
                name: popup.fields[0].value,
                duration: popup.fields[1].value,
                percentage: popup.fields[2].value,
                description: popup.fields[3].value
            };
            await callApi("post", `/feltrom/newEvent?otp=${otp}&pwd=${pwd}`, {
                percentage: parseInt(percentage) + 100,
                expiration: Date.now() + parseFloat(duration) * 86400 * 1000,
                informationsContent: { type: "event", name, description }
            });
        } else if (thing === "info") {
            let { duration, description, name } = {
                name: popup.fields[0].value,
                duration: popup.fields[1].value,
                description: popup.fields[2].value
            };
            await callApi("post", `/feltrom/createInformation?otp=${otp}&pwd=${pwd}`, {
                type: "info",
                expiration: parseFloat(duration) * 3600 * 1000,
                name,
                description
            });
        } else if (thing === "poll") {
            let { name, isMCQ, options } = {
                name: popup.fields[0].value,
                isMCQ: popup.fields[1].value,
                options: popup.fields[1].special
            };
            await callApi("post", `/feltrom/createPoll?otp=${otp}&pwd=${pwd}`, { name, options, isMCQ });
        }
        login(true);
    }

    function makePopup(reason, options) {
        popup.type = reason.goal === "create" ? "creation" : "deletion";
        popup.thing = reason.text;
        if (reason.text === "event" && reason.goal === "create") {
            popup.fields = [{ name: "Name (reason of the event)", value: null }, {
                name: "Duration (in days)",
                value: null
            }, {
                name: "Percentage of boost (20 equals all rewards to be raised by 20%)",
                value: null
            }, { name: "description (additional infos)", value: null }];
        } else if (reason.text === "info" && reason.goal === "create") {
            popup.fields = [{ name: "Name", value: null }, {
                name: "Duration (in hours)",
                value: null
            }, { name: "description", value: null }];
        } else if (reason.text === "info" || reason.text === "event" || reason.text === "poll" && reason.goal === "delete") {
            popup.options = options;
            popup.fields = [];
        } else if (reason.text === "poll") {
            popup.fields = [{ name: "name", value: null }, {
                name: "Multiple choice question ?",
                value: null,
                special: []
            }];
            popup.special = "poll";
        }
    }

    function handleConfirm() {
        if (popup.type === "creation") createThing(popup.thing);
        else if (popup.type === "deletion") delThing(popup.thing);
        popup = {};
    }

    onMount(async () => {
        isAuthorizedUser = (await callApi("get", "/feltrom/login")) === true;
        login();
    });

    function addField() {
        popup.fields[1].special.push("");
        popup = popup;
    }

    function handlePreview() {
        popup.isPreviewing = !popup.isPreviewing;
    }

    function resetConfig() {
        newConfig = JSON.parse(configs);
    }

    async function saveConfig() {
        isSavingConfig = true;
        await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, newConfig);
        configs = JSON.stringify(newConfig);
        newConfig.forEach((e,i)=>{
            newConfig[i].isEditing = false
        })
        isSavingConfig = false;
    }
</script>
<style>
    input[type=text] {
        @apply py-2 px-4;
    }

    .input {
        @apply w-full text-background bg-font py-3 px-4 rounded;
    }

    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }

    /*.info {
        @apply text-lg mt-1;
    }*/

    .input-header {
        @apply text-primary text-3xl;
        margin-bottom: 0.35rem;
    }

    /*.check {
        margin-top: 0.15rem;
        margin-right: 0.4rem;
    }

    .h1, .p {
        margin: 0 auto;
    }

    .h1 {
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    .p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        .h1 {
            font-size: 4em;
        }
    }*/
</style>
<svelte:head>
    {#if isAuthorizedUser}
        <title>Admin dashboard - Winhalla</title>
    {:else}
        <title>404</title>
    {/if}
</svelte:head>
{#if isAuthorizedUser && !isLoggedIn}
    <div>
        <div class="flex items-center justify-center md:h-screen-7">
            <div class="flex flex-col justify-center px-5 md:p-0">
                <div class="text-center md:text-left mt-7 md:mt-12">
                    <h1
                        class="text-6xl mb-6 md:mb-8 leading-snug
                        md:leading-normal">
                        ADMIN DASHBOARD
                    </h1>
                </div>
                <div class="md:mt-4">
                    <p class="input-header">Password</p>
                    <div>
                        <input
                            placeholder="Personal password"
                            bind:value={pwd}
                            type="password"
                            class="input-style focus:outline-none
                            focus:border-primary placeholder-disabled input" />
                    </div>
                </div>
                <div class="md:mt-4">
                    <p class="input-header">Authenticator password</p>
                    <div>
                        <input
                            type="text"
                            maxlength="6"
                            placeholder="Google authenticator OTP"
                            bind:value={otp}
                            class="input input-style focus:outline-none
                            focus:border-primary placeholder-disabled" />
                    </div>
                </div>
                <button
                    on:click={login}
                    class="button button-brand mt-3">
                    Login
                </button>
            </div>
        </div>
    </div>
{:else if isLoggedIn}
    {#if !configs}
        <div out:fade={{duration:100}} class="z-50 bg-background absolute">
            <Loading data="Entering super secret page..." />
        </div>
    {/if}
    {#if configs}
        <div class="lg:block lg:pl-24 lg:pr-24 mt-7 lg:mt-12 h-full w-full">
            <div class="flex justify-between mb-12">
                <h1 class="text-6xl">ADMIN DASHBOARD</h1>
                <button class="button button-brand" on:click={logout}>Logout</button>
            </div>

            <h2 class="text-3xl mb-2">View :
                <strong class="text-3xl cursor-pointer font-normal" class:text-primary={activePanel === "config"}
                        class:text-4xl={activePanel === "config"} on:click={()=>activePanel = "config"}>CONFIG</strong>,
                <strong class="text-3xl cursor-pointer font-normal" class:text-primary={activePanel === "users"}
                        class:text-4xl={activePanel === "users"}
                        on:click={()=>{activePanel = "users";if(!users)loadUsers()}}>USERS</strong>,
                <strong class="text-3xl cursor-pointer font-normal" class:text-primary={activePanel === "commands"}
                        class:text-4xl={activePanel === "commands"}
                        on:click={()=>{activePanel = "commands";if(!commands)loadCommands()}}>COMMANDS</strong>
            </h2>
            <div class="w-full">
                {#if configs && activePanel === "config"}
                    <div class="justify-evenly mx-4 w-full flex h-full flex-wrap p-8">
                        {#each newConfig as config,i}
                            <div class="mb-16 border-t-2 border-primary bg-variant rounded-lg mx-8 p-4">
                                <div class="flex flex-justify">
                                    <h1 class="text-5xl text-primary w-full">{config.name}</h1>
                                    {#if config.name !== "IDs BANNED"}
                                        <div>
                                            <button
                                                class="flex m-3 mt-1.5 p-2 pt-1 focus:outline-none text-gray-500 hover:text-white"
                                                on:click={()=>config.isEditing = !config.isEditing}>
                                                <svg version="1.1" class="w-5 h-5"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                     viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                                                     xml:space="preserve">
                                                    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                                                    <g><g class="fill-current" transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M7681.7,4992.8c-223.8-57.1-328.5-138.1-840.3-649.9c-278.5-276.1-507-514.2-507-528.5c0-30.9,2337.6-2368.5,2370.9-2368.5c11.9,0,254.7,233.3,535.6,518.9c552.2,557,599.8,623.7,647.5,902.2c31,178.5,0,376.1-90.4,571.3c-50,111.9-164.3,240.4-626.1,704.6c-645.1,649.9-737.9,730.8-926,802.2C8088.7,5004.7,7819.8,5026.1,7681.7,4992.8z"/><path
                                                        d="M3704,1207.9L1299.7-1196.4l285.6-285.7c157.1-157.1,295.2-285.7,309.5-285.7c11.9,0,1099.8,1076,2416.1,2392.3L6703.3,3017l-297.5,297.6l-297.6,297.6L3704,1207.9z" /><path
                                                        d="M4418.1,493.7L2013.9-1910.5l483.2-480.8l480.9-483.2L5382.2-470.4l2404.2,2404.2l-483.2,483.2L6822.4,2898L4418.1,493.7z" /><path
                                                        d="M5506-584.6c-1311.6-1311.6-2385.2-2397.1-2385.2-2409c0-14.3,128.5-152.4,285.7-309.5l285.6-285.6l2404.3,2404.2l2404.2,2404.2l-290.4,290.4C8048.3,1672,7912.6,1803,7905.5,1803C7898.3,1803,6820,729.4,5506-584.6z" /><path
                                                        d="M959.3-2284.2C826-2700.8,716.5-3053.1,716.5-3065c0-33.3,1078.3-1106.9,1111.7-1106.9c30.9,0,1511.6,476.1,1530.6,492.8c9.5,9.5-2121,2149.5-2142.4,2149.5C1209.3-1529.6,1092.6-1870,959.3-2284.2z" /><path
                                                        d="M588-3429.2c-7.1-11.9-66.7-173.8-133.3-359.5c-64.3-185.7-171.4-485.6-235.7-666.5l-119-333.3l290.4,104.7c159.5,57.1,461.8,164.3,671.3,238c209.5,73.8,388,142.8,397.5,152.4c9.5,9.5-178.5,211.8-419,452.3C799.8-3600.6,597.5-3415,588-3429.2z" /></g></g>
                                                </svg>
                                            </button>
                                        </div>
                                    {/if}
                                </div>
                                <div class="pt-4 block">
                                    {#if config.name === "GAMEMODES STATUS"}
                                        <h2 class="text-3xl">FFA</h2>
                                        <div class:flex={!config.isEditing}>
                                            {#if config.isEditing}
                                                <input type="radio" id="FFAActivatedTrue" name="FFAActivated"
                                                       value={true}
                                                       bind:group={config.value.FFA}>
                                                <label for="FFAActivatedTrue" class="text-green">Activated</label><br>
                                                <input type="radio" id="FFAActivatedMaintenance" name="FFAActivated"
                                                       value="maintenance" bind:group={config.value.FFA}>
                                                <label for="FFAActivatedMaintenance"
                                                       class="text-accent">Maintenance</label><br>
                                                <input type="radio" id="FFAActivatedFalse" name="FFAActivated"
                                                       value={false} bind:group={config.value.FFA}>
                                                <label for="FFAActivatedFalse" class="text-legendary">Disabled</label>
                                            {:else}
                                                <p class:text-green={config.value.FFA === true}
                                                   class:text-accent={config.value.FFA === "maintenance"}
                                                   class:text-legendary={config.value.FFA === false}>
                                                    • {config.value.FFA === true ? 'Active' : config.value.FFA === 'maintenance' ? 'Maintenance in progress' : 'Inactive (Coming soon)'}
                                                </p>
                                            {/if}

                                        </div>
                                        <h2 class="text-3xl">2vs2</h2>
                                        <div class:flex={!config.isEditing}>
                                            {#if config.isEditing}
                                                <input type="radio" id="2vs2ActivatedTrue" name="2vs2Activated"
                                                       value={true}
                                                       bind:group={config.value['2vs2']}>
                                                <label for="2vs2ActivatedTrue" class="text-green">Activated</label><br>
                                                <input type="radio" id="2vs2ActivatedMaintenance" name="2vs2Activated"
                                                       value="maintenance" bind:group={config.value['2vs2']}>
                                                <label for="2vs2ActivatedMaintenance"
                                                       class="text-accent">Maintenance</label><br>
                                                <input type="radio" id="2vs2ActivatedFalse" name="2vs2Activated"
                                                       value={false} bind:group={config.value['2vs2']}>
                                                <label for="2vs2ActivatedFalse" class="text-legendary">Disabled</label>
                                            {:else}
                                                <p class:text-green={config.value["2vs2"] === true}
                                                   class:text-accent={config.value["2vs2"] === "maintenance"}
                                                   class:text-legendary={config.value["2vs2"] === false}>
                                                    • {config.value['2vs2'] === true ? 'Active' : config.value['2vs2'] === 'maintenance' ? 'Maintenance in progress' : 'Inactive (Coming soon)'}
                                                </p>
                                            {/if}


                                        </div>
                                    {:else if config.name === "FFA REWARDS CONFIG"}
                                        <div class="block">
                                            {#if config.isEditing}
                                                {#each config.value as reward,ii}
                                                    <div class="flex my-2px">
                                                        <p class="text-accent">{ii + 1}{ii === 0 ? "st" : ii === 1 ? "nd" : ii === 2 ? "rd" : "th"}</p>:
                                                        <input bind:value={reward} class="bg-gray-200 ml-1 text-black px-2" size="{reward.length+3}">
                                                    </div>
                                                {/each}
                                            {:else}
                                                {#each config.value as reward,ii}
                                                    <div class="flex my-2px">
                                                        <p class="text-accent">{ii + 1}{ii === 0 ? "st" : ii === 1 ? "nd" : ii === 2 ? "rd" : "th"}</p>
                                                        : {reward}$
                                                    </div>
                                                {/each}
                                            {/if}
                                        </div>
                                    {:else if config.name === "ADVICES"}
                                        <div class="flex mb-5">
                                            <p>Probability:</p>
                                            <input type="text"
                                                   class="text-2xl bg-variant rounded -mt-3 mx-2 text-center"
                                                   size="3"
                                                   bind:value={config.value.probability} />%
                                        </div>
                                        {#each config.value.advices as info,ii}
                                            <h2 class="text-4xl text-accent">{ii + 1}.</h2>
                                            <h3 class="text-3xl">Name</h3>
                                            <input class="text-2xl bg-variant rounded" size="40" type="text"
                                                   bind:value={info.name} />
                                            <h3 class="text-3xl mt-3">Strong</h3>
                                            <input class="text-xl bg-variant rounded mt-2" size="40" type="text"
                                                   bind:value={info.strong}>

                                        {/each}
                                    {:else if config.name === "INFOS"}
                                        {#each config.value as info,ii}
                                            <h2 class="text-4xl text-accent">{ii + 1}.</h2>
                                            <h3 class="text-3xl">Name</h3>
                                            <input class="text-2xl bg-variant rounded" size="40" type="text"
                                                   bind:value={info.name} />
                                            <h3 class="text-3xl">Description</h3>
                                            <input class="text-xl bg-variant rounded mt-2" size="60" type="text"
                                                   bind:value={info.description}>
                                            <!--TODO: date d'expiration-->
                                            <button
                                                on:click={()=>makePopup({text:"info",goal:"delete"},{index:ii})}>
                                                <svg class="fill-current w-4" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                                                </svg>
                                            </button>
                                        {/each}
                                        <div class="flex">
                                            <button class="m-auto  button button-brand"
                                                    on:click={()=>makePopup({text:"info",goal:"create"})}>Create
                                                info
                                            </button>
                                        </div>
                                    {:else if config.name === "POLLS"}
                                        {#each config.value as poll,ii}
                                            <div class="border-primary border-b pt-4 pb-8">
                                                <div class="flex justify-between">
                                                    <h3 class="text-primary text-3xl">Name</h3>
                                                    <button
                                                        class="hover:bg-legendary h-6 text-legendary hover:text-white rounded"
                                                        on:click={()=>makePopup({text:"poll",goal:"delete"},{index:poll._id})}>
                                                        <svg class="w-4 mx-1 fill-current" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <input class="text-2xl bg-variant rounded" size="40" type="text"
                                                       bind:value={poll.name} />
                                                {#if poll.isMCQ}
                                                    <h3 class="text-3xl text-primary">Options</h3>
                                                    {#each poll.answers as option, iii}
                                                        <div class="flex">
                                                            <input class="text-2xl bg-variant rounded mt-2"
                                                                   size="60"
                                                                   type="text"
                                                                   bind:value={option.name}>
                                                            <p class="text-primary text-2xl">Votes <strong
                                                                class="font-normal text-white">{option.nb}</strong>
                                                                Percentage <strong class="font-normal"
                                                                                   class:text-legendary={option.nb/poll.totalAnswers<0.25}
                                                                                   class:text-green={option.nb/poll.totalAnswers>=0.5}
                                                                                   class:text-accent={option.nb/poll.totalAnswers>=0.25 && option.nb/poll.totalAnswers<0.5}> {option.nb / poll.totalAnswers * 100}
                                                                    %</strong></p>
                                                        </div>
                                                    {/each}
                                                {:else}
                                                    <button class="button button-brand"
                                                            on:click={()=>poll.areAnswersShown = !poll.areAnswersShown}>{poll.areAnswersShown ? 'Hide' : 'Show'}
                                                        answers
                                                    </button>
                                                    {#if poll.areAnswersShown}
                                                        <p class="mt-8 text-accent text-3xl">Total
                                                            answers: {poll.totalAnswers}</p>
                                                        <div class="flex mt-4">
                                                            {#each poll.answers as answer, iii}
                                                                <p>
                                                                    <h class="text-primary mr-1">1.</h>{answer}</p>
                                                            {/each}
                                                        </div>

                                                    {/if}
                                                {/if}


                                            </div>
                                        {/each}
                                        <div class="flex pt-4">
                                            <button class="m-auto button button-brand"
                                                    on:click={()=>makePopup({text:"poll",goal:"create"})}>Create new
                                                poll
                                            </button>
                                        </div>
                                    {:else if config.name === "GOLD EVENT"}
                                        {#if config.value.expiration !== null }
                                            <h3 class="text-2xl">Boost of <strong
                                                class="font-normal text-accent text-3xl">{config.value.percentage - 100}
                                                %</strong></h3>
                                            <div class="hidden">
                                                {goldEvent[0] = Math.floor((config.value.expiration - Date.now()) / 1000 / 86400)}
                                                {goldEvent[1] = Math.floor((config.value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24)}
                                                {goldEvent[2] = Math.floor((config.value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60)}
                                            </div>
                                            <p class="text-2xl">

                                                Exipires in
                                                <strong
                                                    class="text-accent font-normal text-3xl">{goldEvent[0]}</strong>
                                                days,
                                                <strong
                                                    class="text-accent font-normal text-3xl">{goldEvent[1]}</strong>
                                                hours,
                                                <strong
                                                    class="text-accent font-normal text-3xl">{goldEvent[2]}</strong>
                                                minutes,

                                            </p>
                                            <!--TODO: confirmation pour chaque action-->
                                            <button class="button button-brand " style="background-color: #fc1870"
                                                    on:click={()=>makePopup({text:"event",goal:"delete"})}>Stop
                                                event
                                            </button>
                                        {:else}
                                            <div class="flex">
                                                <button class="button m-auto button-brand"
                                                        on:click={()=>makePopup({text:"event",goal:"create"})}>
                                                    Create event
                                                </button>
                                            </div>
                                        {/if}

                                    {:else if config.name === "LINKS CONFIG"}
                                        <div class="w-60">
                                            <p class="text-2xl">Players joining via an affiliated link get
                                                <strong
                                                    class="text-accent font-normal text-3xl">{config.value.boost}
                                                    %</strong>
                                                more
                                                coins for <strong
                                                    class="text-accent font-normal text-3xl">{config.value.duration}
                                                    days</strong></p>
                                        </div>
                                    {:else if config.name === "IDs BANNED"}
                                        <div class="block">
                                            {#if config.value.length !== 0}
                                                <UsersArray users="{bannedOnes}" banned="true" color="blue"
                                                            otp={otp}
                                                            pwd={pwd} />
                                            {/if}
                                        </div>
                                        <p class="text-3xl text-green">
                                            {config.value.length === 0 ? "No player has been banned" : ""}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else if activePanel === "users"}
                    {#if !loadingUsers}
                        <div class="w-full h-full block">
                            {#if normalUsersShown || suspiciousBitches.length > 0}
                                <div class="px-4 text-2xl mb-5 flex overflow-hidden">
                                    <h3 class="">Sort by:</h3>
                                    <h3 class="ml-3 ">
                                        <strong class="font-normal cursor-pointer "
                                                class:text-accent={sortBy === "alphabetic"}
                                                class:text-3xl={sortBy === "alphabetic"}
                                                on:click={()=>sort("alphabetic")}>alphabetic</strong>,
                                        <strong class="font-normal cursor-pointer"
                                                class:text-accent={sortBy === "winrate"}
                                                class:text-3xl={sortBy === "winrate"}
                                                on:click={()=>sort("winrate")}>winrate</strong>,
                                        <strong class="font-normal cursor-pointer"
                                                class:text-accent={sortBy === "coins"}
                                                class:text-3xl={sortBy === "coins"}
                                                on:click={()=>sort("coins")}>coins</strong>,
                                        <strong class="font-normal cursor-pointer"
                                                class:text-accent={sortBy === "gamesPlayed"}
                                                class:text-3xl={sortBy === "gamesPlayed"}
                                                on:click={()=>sort("gamesPlayed",true)}>games played</strong>
                                    </h3>
                                </div>
                            {/if}
                            <div class="flex">
                                <div class="block">
                                    {#if suspiciousBitches.length > 0}
                                        <div class:mb-15={normalUsersShown}>
                                            <p class="text-3xl mt-5 mb-2 ml-2">
                                                <strong class="text-accent font-normal">{suspiciousUsersFound}</strong>
                                                suspicious user{suspiciousUsersFound > 1 ? "s" : ""} found
                                            </p>
                                            <UsersArray users="{suspiciousBitches}" color="red" pwd="{pwd}" otp={otp} />
                                        </div>
                                    {:else}
                                        <div class="my-5 text-3xl mb-5 text-green">
                                            No suspicious player has been found
                                        </div>
                                    {/if}
                                    {#if normalUsersShown}
                                        <UsersArray users="{users}" color="blue" pwd="{pwd}" otp={otp} />
                                        <h2 class="text-2xl cursor-pointer ml-3 mt-2 w-22 text-gray-400 hover:text-white"
                                            on:click={()=>normalUsersShown = !normalUsersShown}>hide
                                            users</h2>
                                    {:else}
                                        <button class="button button-brand ml-3 mt-4"
                                                on:click={()=>normalUsersShown = !normalUsersShown}>Show all users
                                        </button>
                                    {/if}
                                </div>
                                {#if normalUsersShown || suspiciousBitches.length > 0}
                                    <div class="block ml-5 mt-11 mr-10%">
                                        <p class="mt-6 text-xl">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                 class="w-5 h-5 mb-2"
                                                 style="fill: #fc1870">
                                                <path
                                                    d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                                            </svg>
                                            Click to ban user (confirmation message always shows)
                                        </p>
                                        <p class="mt-6 text-xl">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                 class="w-5 h-5 mb-2"
                                                 style="fill: #3de488">
                                                <path
                                                    d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                                            </svg>
                                            Click to unmark user
                                        </p>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {:else}
                        <RefreshButton isRefreshing refreshMessage="{'Loading...'}" />
                    {/if}
                {:else if activePanel === "commands"}
                    {#if !commands}
                        <RefreshButton isRefreshing refreshMessage="{'Loading...'}" />
                    {:else}
                        <div class="content-center">
                            <UsersArray color="blue" users="{commands}" type="simple" pwd="{pwd}" otp={otp} />
                        </div>
                    {/if}
                {/if}

                {#if popup.type}
                    <div class="fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0"
                         transition:fade|local={{duration:200}}>
                    </div>
                    <div class="fixed flex w-screen h-screen z-50 left-0 top-0"
                         transition:fade|local={{duration:200}}>
                        <div
                            class="flex justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"
                            style="margin-top:20vh">
                            <div
                                class="block ">
                                <h1 class="text-5xl text-primary">{popup.type === "creation" ? `Create ${popup.thing}` : `Confirm delete ${popup.thing}`}</h1>
                                <div>
                                    <div class="overflow-auto max-h-screen-50">
                                        {#each popup.fields as field,i}
                                            {#if field.name === "Multiple choice question ?"}
                                                <div class="text-3xl mt-8">
                                                    <input type="radio" id="Normal" name="type" value="false"
                                                           bind:group={field.value}>
                                                    <label for="Normal">Normal</label><br>
                                                    <input type="radio" id="MCQ" name="type" value="true"
                                                           bind:group={field.value}>
                                                    <label for="MCQ">MCQ</label>
                                                </div>

                                                {#if field.value == "true"}
                                                    {#each popup.fields[1].special as option,ii}
                                                        <div class="my-4">
                                                            <h3 class="text-3xl">Option {ii + 1}</h3>

                                                            <input class="text-black" bind:value={option} type="text" />
                                                            <p></p>
                                                        </div>
                                                    {/each}
                                                    <p></p>
                                                    <button class="button button-brand mt-4 ml-2" on:click={addField}>
                                                        Add
                                                        option
                                                    </button>
                                                {/if}
                                            {:else}
                                                <h3 class="text-3xl mt-8">{field.name}</h3>
                                                <input type="text" class="text-black rounded"
                                                       rows="{field.name.includes('description')?5:1}" size="40"
                                                       placeholder="{field.name}" bind:value={field.value} />

                                            {/if}
                                            <p></p>
                                        {/each}
                                    </div>
                                    <div class="justify-center w-full flex">
                                        <button class="button button-brand mt-8"
                                                style="background-color:#{popup.type === 'deletion'?'fc1870':'3d72e4'}"
                                                on:click={handleConfirm}>
                                            {popup.type === "creation" ? `Create ${popup.thing}` : `Confirm delete ${popup.thing}`}
                                        </button>
                                        <button class="button button-brand mt-8 border ml-5"
                                                class:border-primary={popup.type !== 'deletion'}
                                                class:border-legendary={popup.type === 'deletion'}
                                                style="background-color: #17171a;padding: -1px"
                                                on:click={()=>popup={}}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {#if popup.thing === "poll" || popup.thing === "info" && popup.type === "creation"}
                                <div class="h-15 px-5 my-auto">
                                    <button class="button button-brand" style="background-color: #ff8f0f"
                                            on:click={handlePreview}>
                                        {popup.isPreviewing ? "Stop" : ""} Preview
                                    </button>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}
                {#if popup.isPreviewing}
                    {#if popup.thing === "poll"}
                        <div
                            class="fixed z-50 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
                            transition:fly={{ y:-200, duration: 500 }}>
                            <Poll poll="{{
                            name: popup.fields[0].value,
                            isMCQ: popup.fields[1].value === 'true',
                            options: popup.fields[1].special
                        }}" isPreviewing />
                        </div>
                    {:else if popup.thing === "info"}
                        <div
                            class="fixed z-50 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
                            transition:fly={{ y:-200, duration: 500 }}>
                            <NavAlert
                                data={[{name: popup.fields[0].value, duration: popup.fields[1].value, description: popup.fields[2].value }]}
                                isPreviewing />
                        </div>
                    {/if}
                {/if}

            </div>
        </div>
        {#if typeof configs === "string" && newConfig}
            {#if JSON.stringify(newConfig.map(e => e.value)) !== JSON.stringify(JSON.parse(configs).map(e => e.value))}
                <div
                    class="fixed top-screen-85 w-full">
                    <div transition:fly|local={{y:150, duration:500}}
                         class="flex justify-between content-center rounded mx-auto bg-black border border-legendary px-6 py-3 w-90%">
                        <p class="my-auto">You have made changes to the config</p>
                        <div class="flex">
                            <button class="button button-brand border border-primary mr-2"
                                    style="background-color: #000000;padding: -1px"
                                    on:click={resetConfig}>
                                Reset changes
                            </button>
                            <RefreshButton on:click={saveConfig} refreshMessage="Save changes"
                                           onRefreshMessage="Saving..." isRefreshing={isSavingConfig} />
                        </div>
                    </div>
                </div>
            {/if}
        {/if     }
    {/if}

{:else}
    <!--<h1 class="h1">404</h1>
    <p class="p">Not found</p>-->
{/if}