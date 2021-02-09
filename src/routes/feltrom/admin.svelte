<script>
    import { callApi } from "../../utils/api";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Loading from "../../components/Loading.svelte";
    import UsersArray from "../../components/UsersArray.svelte";
    import { config } from "../../components/storeAdmin";
    import { goto } from "@sapper/app";
    import RefreshButton from "../../components/RefreshButton.svelte";
    import Poll from "../../components/Poll.svelte";
    import NavAlert from "../../components/Navigation/NavAlert.svelte";
    import ConfigEditor from "../../components/configEditor.svelte";

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
    let infoDates = [];
    let totalCoins = 0;

    async function loadUsers() {
        loadingUsers = true;
        suspiciousBitches = [];
        suspiciousUsersFound = 0;
        bannedOnes = [];
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        for (let i = 0; i < users.length * 2; i++) {
            if (!users[i - suspiciousUsersFound]) continue;
            totalCoins += users[i - suspiciousUsersFound].coins;
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
        let polls = await callApi("get", `/feltrom/getAllPolls?otp=${otp}&pwd=${pwd}`);
        configs.push({ name: "POLLS", value: polls });
        newConfig = configs;
        configs = JSON.stringify(configs);
        configs = JSON.parse(configs);
        newConfig[3].value.forEach((e, i) => {
            infoDates[i] = new Date(e.expiration);
        });
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
            configs = JSON.stringify(configs);
            configs = JSON.parse(configs);
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
        newConfig = configs;
        console.log(configs);
        configs = JSON.stringify(configs);
        configs = JSON.parse(configs);
        console.log(configs);
    }

    async function saveConfig() {
        isSavingConfig = true;
        //Handle event changes
        if (newConfig[4].value.expTime) {
            let expiration = Date.parse(newConfig[4].value.expDate + "T" + newConfig[4].value.expTime);
            delete newConfig[4].value.expTime;
            delete newConfig[4].value.expDate;
            newConfig[4].value.expiration = expiration;
            newConfig[3].value[newConfig[3].value.findIndex(e => e.type === "event")].expiration = expiration;
            console.log(expiration);
        }
        await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, newConfig);
        login(true);
        isSavingConfig = false;
    }
</script>
<style>
    input[type=text] {
        @apply py-1 px-2;
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
    {#if newConfig}
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
                    <ConfigEditor bind:popup={popup} bind:newConfig={newConfig} bind:goldEvent={goldEvent}
                                  bind:bannedOnes={bannedOnes} otp={otp} pwd={pwd} bind:infoDates={infoDates} />
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
                                    <p class="text-3xl mt-5 mb-2 ml-2">
                                        <d class="text-accent">{totalCoins}</d>
                                        W In circulation equals
                                        <d class="text-accent">{parseFloat((totalCoins / 10750).toFixed(4))}</d>
                                        $
                                    </p>
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
                            class="justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"
                            style="margin-top:20vh">
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
                                    {#if (popup.thing === "poll" || popup.thing === "info") && popup.type === "creation"}
                                        <button class="button button-brand mt-8 ml-5" style="background-color: #ff8f0f"
                                                on:click={handlePreview}>
                                            {popup.isPreviewing ? "Stop" : ""} Preview
                                        </button>
                                    {/if}
                                </div>
                            </div>
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
        {#if JSON.stringify(newConfig.map(e => e.value)) !== JSON.stringify(configs.map(e => e.value))}
            <div
                class="fixed top-screen-90 w-full">
                <div transition:fly|local={{y:150, duration:500}}
                     class="flex justify-between content-center rounded mx-auto bg-black border border-legendary px-6 py-3 w-90%">
                    <p class="my-auto">Carefully, you have unsaved changes</p>
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
    {/if}

{:else}
    <!--<h1 class="h1">404</h1>
    <p class="p">Not found</p>-->
{/if}