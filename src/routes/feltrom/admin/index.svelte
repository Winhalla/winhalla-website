<script>
    import { callApi } from "../../../utils/api";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Loading from "../../../components/Loading.svelte";
    import UsersArray from "../../../components/UsersArray.svelte";

    let configs;
    let isAuthorizedUser = false;
    let isLoggedIn = false;
    let otp = "";
    let pwd = "";
    let users = new Promise(() => {
    });
    let newConfig;
    let goldEvent = ["", "", "", ""];
    let loadingUsers;
    let sortBy = "alphabetic";
    let suspiciousBitches = [];
    let suspiciousUsersFound = 0;
    let bannedOnes = [];
    let normalUsersShown;

    async function login() {
        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        newConfig = configs;
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);
        goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);
        goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);
    }

    function sortArrays(fx) {
        users.sort(fx);
        suspiciousBitches.sort(fx);
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


    function loadUsers() {
        users = callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        loadingUsers = true;
        users.then(result => {
            users = result;
            users.forEach((user, i) => {
                users[i].winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);
                if (isNaN(users[i].winrate)) {
                    users[i].winrate = 0;
                }
            });
            users.sort((a, b) => {
                return b.winrate - a.winrate;
            });
            loadingUsers = false;
        });
    }

    onMount(async () => {
        isAuthorizedUser = (await callApi("get", "/feltrom/login")) === true;
        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        newConfig = configs;
        users = callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        loadingUsers = true;
        users.then(result => {
            users = result;
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
                let { avatarURL, brawlhallaName, stats, coins } = users.find(user => user.steamId === ban);
                let winrate = Math.round((stats.ffa.wins / stats.ffa.gamesPlayed) * 100);
                if (isNaN(winrate)) winrate = 0;
                bannedOnes[i] = { avatarURL, steamId: ban, brawlhallaName, stats, coins, winrate };
                users.splice(users.findIndex(e => e.steamId === ban), 1);
            });

            loadingUsers = false;
            users = users;
            suspiciousBitches = suspiciousBitches;
        });


        goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);
        goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);
        goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);

    });

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

    .info {
        @apply text-lg mt-1;
    }

    .input-header {
        @apply text-primary text-3xl;
        margin-bottom: 0.35rem;
    }

    .check {
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
    }
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
                <!-- svelte-ignore a11y-accesskey -->
                <button
                    on:click={login}
                    accesskey="enter"
                    class="button button-brand mt-3">
                    Login
                </button>
            </div>
        </div>
    </div>
{:else if isLoggedIn}
    {#if !configs || !users}
        <div out:fade={{duration:100}} class="z-50 bg-background absolute">
            <Loading data="Entering super secret page..." />
        </div>
    {/if}
    {#if configs && users}
        <div class="lg:block lg:pl-24 lg:pr-24 mt-7 lg:mt-12 h-full w-full">
            <h1 class="text-6xl mb-12">ADMIN DASHBOARD</h1>
            <div class="flex justify-center">
                <div class="w-1/3 mx-4 block h-full p-8">
                    {#each newConfig as config,i}
                        <div class="mb-16">
                            <h1 class="text-5xl text-primary">{config.name}</h1>
                            <div class="pl-8 pt-4">
                                {#if config.name === "GAMEMODES STATUS"}
                                    <h2 class="text-3xl">2vs2</h2>
                                    <div class="flex">
                                        <p class:text-green={config.value.FFA === true}
                                           class:text-accent={config.value.FFA === "maintenance"}
                                           class:text-legendary={config.value.FFA === false}>
                                            • {config.value.FFA === true ? "Active" : config.value.FFA === "maintenance" ? "Maintenance in progress" : "Inactive (Coming soon)"}
                                        </p>
                                    </div>
                                    <h2 class="text-3xl">2vs2</h2>
                                    <div class="flex">
                                        <p class:text-green={config.value["2vs2"] === true}
                                           class:text-accent={config.value["2vs2"] === "maintenance"}
                                           class:text-legendary={config.value["2vs2"] === false}>
                                            • {config.value["2vs2"] === true ? "Active" : config.value["2vs2"] === "maintenance" ? "Maintenance in progress" : "Inactive (Coming soon)"}
                                        </p>
                                    </div>
                                {:else if config.name === "FFA REWARDS CONFIG"}
                                    <div class="block">
                                        {#each config.value as reward,ii}
                                            <div class="flex">
                                                <p class="text-accent">{ii + 1}{ii === 0 ? "st" : ii === 1 ? "nd" : ii === 2 ? "rd" : "th"}</p>
                                                : {reward}$
                                            </div>
                                        {/each}
                                    </div>
                                {:else if config.name === "ADVICES"}
                                    <div class="flex mb-5">
                                        <p>Probability:</p>
                                        <input type="text" class="text-2xl bg-variant rounded -mt-3 mx-2 text-center"
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
                                        <h3 class="text-3xl">Strong</h3>
                                        <input class="text-xl bg-variant rounded mt-2" size="60" type="text"
                                               bind:value={info.description}>

                                    {/each}
                                {:else if config.name === "GOLD EVENT"}
                                    <h3 class="text-2xl">Boost of <strong
                                        class="font-normal text-accent text-3xl">{config.value.percentage - 100}
                                        %</strong></h3>
                                    <p class="text-2xl">
                                        Exipires in
                                        <strong class="text-accent font-normal text-3xl">{goldEvent[0]}</strong> days,
                                        <strong class="text-accent font-normal text-3xl">{goldEvent[1]}</strong> hours,
                                        <strong class="text-accent font-normal text-3xl">{goldEvent[2]}</strong>
                                        minutes,
                                    </p>
                                {:else if config.name === "LINKS CONFIG"}
                                    <p class="text-2xl">Players joining via an affiliated link get
                                        <strong class="text-accent font-normal text-3xl">{config.value.boost}%</strong>
                                        more
                                        coins for <strong
                                            class="text-accent font-normal text-3xl">{config.value.duration}
                                            days</strong></p>
                                {:else if config.name === "IDs BANNED"}
                                    <div class="block">
                                        {#if config.value.length !== 0}
                                            <UsersArray users="{bannedOnes}" banned="true" color="blue" pwd={pwd} />
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
                <div class="w-2/3 h-full block">
                    {#await users}
                        {#if !loadingUsers}
                            <button class="button button-brand" on:click={loadUsers}>
                                Load users
                            </button>
                        {:else}
                            Loading user data...
                        {/if}
                    {:then users}
                        <div class="px-4 text-2xl mb-5 flex overflow-hidden">
                            <h3 class="">Sort by:</h3>
                            <h3 class="ml-3 -mt-2px">
                                <strong class="font-normal cursor-pointer " class:text-primary={sortBy === "alphabetic"}
                                        class:text-3xl={sortBy === "alphabetic"}
                                        on:click={()=>sort("alphabetic")}>alphabetic</strong>,
                                <strong class="font-normal cursor-pointer" class:text-primary={sortBy === "winrate"}
                                        class:text-3xl={sortBy === "winrate"}
                                        on:click={()=>sort("winrate")}>winrate</strong>,
                                <strong class="font-normal cursor-pointer" class:text-primary={sortBy === "coins"}
                                        class:text-3xl={sortBy === "coins"}
                                        on:click={()=>sort("coins")}>coins</strong>,
                                <strong class="font-normal cursor-pointer" class:text-primary={sortBy === "gamesPlayed"}
                                        class:text-3xl={sortBy === "gamesPlayed"}
                                        on:click={()=>sort("gamesPlayed",true)}>games played</strong>
                            </h3>

                        </div>
                        <div class="flex">
                            <div class="block">
                                {#if suspiciousBitches.length > 0}
                                    <div class:mb-15={normalUsersShown}>
                                        <p class="text-3xl mt-5 mb-2 ml-2">
                                            <strong class="text-accent font-normal">{suspiciousUsersFound}</strong>
                                            suspicious user{suspiciousUsersFound > 1 ? "s" : ""} found
                                        </p>
                                        <UsersArray users="{suspiciousBitches}" color="red" pwd="{pwd}" />
                                    </div>
                                {:else}
                                    <div class="my-5 mb-5">
                                        No suspicious player has been found
                                    </div>
                                {/if}
                                {#if normalUsersShown}
                                    <UsersArray users="{users}" color="blue" pwd="{pwd}" />
                                    <h2 class="text-2xl hover:underline ml-3 mt-4 text-gray-300 hover:text-white" on:click={()=>normalUsersShown = !normalUsersShown}>Click to hide users</h2>
                                    {:else}
                                    <h2 class="text-2xl hover:underline ml-3 mt-4 text-gray-300 hover:text-white" on:click={()=>normalUsersShown = !normalUsersShown}>Click to display all users</h2>
                                {/if}
                            </div>
                            <div class="block ml-5 mt-11 ">
                                <p class="mt-6 text-xl">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mb-2"
                                         style="fill: #fc1870">
                                        <path
                                            d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                                    </svg>
                                    Click to ban user (confirmation message always shows)
                                </p>
                            </div>
                        </div>
                    {/await}
                </div>
            </div>
        </div>
    {/if}
{:else}
    <!--<h1 class="h1">404</h1>
    <p class="p">Not found</p>-->
{/if}