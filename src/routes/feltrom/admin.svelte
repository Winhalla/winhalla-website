<script>
    import { callApi } from "../../utils/api";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Loading from "../../components/Loading.svelte";
    import UsersArray from "../../components/admin/UsersArray.svelte";
    import { goto } from "@sapper/app";
    import { config } from "../../components/admin/storeAdmin.js";
    import RefreshButton from "../../components/RefreshButton.svelte";
    import ConfigEditor from "../../components/admin/ConfigEditor.svelte";
    import UsersConfig from "../../components/admin/UsersConfig.svelte";
    import PopupAdmin from "../../components/admin/PopupAdmin.svelte";
    import StatsPanel from "../../components/admin/StatsPanel.svelte";

    let configs;
    let isAuthorizedUser = false;
    let isLoggedIn = false;
    let otp = "";
    let pwd = "a";
    let users;
    let activePanel = "stats";
    let newConfig;
    let goldEvent = [];
    let loadingUsers;
    let suspiciousBitches = [];
    let suspiciousUsersFound = 0;
    let bannedOnes = [];
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
            let user = users.splice(users.findIndex(e => e.steamId === ban.id), 1)[0];
            let winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);
            if (isNaN(winrate)) winrate = 0;
            bannedOnes[i] = user;
            bannedOnes[i].reason = ban.reason;
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
        if (refresh.users === true) loadUsers();
        if (refresh.commands === true) loadCommands();
    }


    function logout() {
        callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`);
        goto("/");
    }

    function sortArrays(fx) {
        users.sort(fx);
        suspiciousBitches.sort(fx);
    }


    onMount(async () => {
        isAuthorizedUser = (await callApi("get", "/feltrom/login")) === true;
        config.subscribe(login);
    });

    function resetConfig() {
        newConfig = configs;
        configs = JSON.stringify(configs);
        configs = JSON.parse(configs);
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
        login({ users: true, commands: false });
        isSavingConfig = false;
    }
</script>
<style global>
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
    {#if newConfig }
        <div class="lg:block px-4 lg:px-24 mt-7 lg:mt-12 h-full w-full">
            <div class="lg:flex lg:justify-between mb-12">
                <div class="flex">
                    <h1 class="text-6xl mx-auto">ADMIN DASHBOARD</h1></div>
                <div class="flex">
                    <button class="button button-brand mx-auto" on:click={logout}>Logout</button>
                </div>
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
                <strong class="text-3xl cursor-pointer font-normal" class:text-primary={activePanel === "stats"}
                        class:text-4xl={activePanel === "stats"}
                        on:click={()=>{activePanel = "stats";if(!commands)loadCommands()}}>STATS</strong>
            </h2>
            <div class="w-full">
                {#if configs && activePanel === "config"}
                    <ConfigEditor bind:popup={popup} bind:newConfig={newConfig} bind:goldEvent={goldEvent}
                                  bind:bannedOnes={bannedOnes} otp={otp} pwd={pwd} bind:infoDates={infoDates} />
                {:else if activePanel === "users"}
                    {#if !loadingUsers}
                        <UsersConfig bind:users={users} bind:suspiciousBitches={suspiciousBitches}
                                     totalCoins={totalCoins} pwd={pwd} otp={otp} sortArrays={sortArrays} />
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
                    {:else if activePanel === "stats"}
                    <StatsPanel pwd="{pwd}" otp={otp}/>
                {/if}


                <PopupAdmin bind:popup={popup} bind:configs={configs} bind:newConfig={newConfig} pwd={pwd} otp={otp} />
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
    <h1 class="h1">404</h1>
    <p class="p">Not found</p>
{/if}