<script>
    import { callApi } from "../../../utils/api";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Loading from "../../../components/Loading.svelte";

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

    async function login() {
        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        newConfig = configs;
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);
        goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);
        goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);
    }

    function loadUsers() {
        users = callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
        loadingUsers = true;
        users.then(result => {
            users = result;
            users.forEach((user, i) => {
                users[i].winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);
                if ((users[i].winrate > 40/* && user.stats.gamesPlayed > 10*/) || user.coins > 300000) {
                    user.isSuspiciousByClient = true;
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
                                        {#each config.value as banned,ii}
                                            <p>{banned}</p>
                                        {/each}
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
                            <button class="button button-brand" on:click={loadUsers}>Load users (can take long and up to
                                50 MO of data)
                            </button>
                        {:else}
                            Loading user data...
                        {/if}
                    {:then users}
                        <div class="px-4 text-2xl overflow-hidden mt-10 lg:mt-20">
                            <h3>Sort by: <strong class="font-normal">winrate</strong>, <strong
                                class="font-normal">coins</strong>, <strong class="font-normal">wins</strong>, <strong
                                class="font-normal">games played</strong></h3>
                        </div>
                        <table class="card px-4 text-2xl overflow-hidden mt-10 lg:mt-20">
                            <thead class="bg-primary ">
                            <tr>
                                <td class="px-6 py-3">

                                </td>
                                <td class="px-6 py-3">
                                    Name
                                </td>
                                <td class="px-6 py-3">
                                    In game ?
                                </td>
                                <td class="px-6 py-3">
                                    Wins
                                </td>
                                <td class="px-6 py-3">
                                    Losses
                                </td>
                                <td class="px-6 py-3">
                                    Winrate
                                </td>
                                <td class="px-6 py-3">
                                    Coins
                                </td>
                            </tr>
                            </thead>
                            <tbody class="  text-l">
                            <!--For each rank-->
                            {#each users as user,i}
                                <tr class="border border-background text-center"
                                    class:border-legendary={user.isSuspiciousByClient || user.isSucpicious.ffa ||user.isSucpicious.solo}
                                >
                                    <td class="px-6 py-2">
                                        <b class="font-normal">{i + 1}</b>
                                    </td>
                                    <td class="flex items-center px-6 py-2">
                                        <img class="block w-10 h-10 rounded-full" src={user.avatarURL}
                                             alt={user.brawlhallaName}>
                                        <p class="pl-2">{user.brawlhallaName}</p>
                                    </td>
                                    <td class="px-6 py-2">
                                        <b class:text-legendary={user.inGame.findIndex(e => !e.isFinished) === -1}
                                           class:text-green={user.inGame.findIndex(e => !e.isFinished) !== -1}
                                           class="font-normal">{user.inGame.findIndex(e => !e.isFinished) === -1 ? "No" : "Yes"}</b>
                                    </td>
                                    <td class="px-6 py-2">
                                        {user.stats.ffa.wins}
                                    </td>
                                    <td class="px-6 py-2">
                                        {user.stats.ffa.gamesPlayed}
                                    </td>
                                    <td class:text-green={user.winrate<14}
                                        class:text-accent={user.winrate<25 && user.winrate>=14}
                                        class:text-legendary={user.winrate>=25} class="px-6 py-2">
                                        {user.winrate}%
                                    </td>
                                    <td class:text-green={user.coins<40000}
                                        class:text-accent={user.coins<120000 && user.coins>=40000}
                                        class:text-legendary={user.coins>=120000} class="px-6 py-2">
                                        {user.coins}$
                                    </td>
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                    {/await}
                </div>
            </div>
        </div>
    {/if}
{:else}
    <!--<h1 class="h1">404</h1>
    <p class="p">Not found</p>-->
{/if}