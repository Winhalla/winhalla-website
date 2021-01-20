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
    let users;
    let newConfig;

    async function login() {
        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        newConfig = configs;
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
    }

    onMount(async () => {
        isAuthorizedUser = (await callApi("get", "/feltrom/login")) === true;

        isLoggedIn = true;
        configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
        newConfig = configs;
        users = await callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
    });

</script>
<style>
    input[type=text] {
        @apply py-3 px-4;
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
                <div class="w-1/2 mx-4 block h-full p-8">
                    {#each newConfig as config,i}
                        <div class="mb-20">
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

                                {:else if config.name === "ADVICES"}
                                    <div class="flex">
                                        <p>Probability:</p>
                                        <input type="number" class="ml-2 rounded text-black w-15"
                                               bind:value={config.value.probability} />%
                                    </div>
                                    {#each config.value.advices as info,ii}
                                        <h2 class="text-4xl text-accent">1.</h2>
                                        <h3 class="text-3xl">Name</h3>
                                        <input class="text-2xl bg-variant rounded" size="40" type="text"
                                               bind:value={info.name} />
                                        <h3 class="text-3xl">Strong</h3>
                                        <input class="text-xl bg-variant rounded mt-2" size="40" type="text"
                                               bind:value={info.strong}>

                                    {/each}
                                {:else if config.name === "INFOS"}
                                    {#each config.value as info,ii}
                                        <h2 class="text-4xl text-accent">1.</h2>
                                        <h3 class="text-3xl">Name</h3>
                                        <input class="text-2xl bg-variant rounded" size="40" type="text"
                                               bind:value={info.name} />
                                        <h3 class="text-3xl">Strong</h3>
                                        <input class="text-xl bg-variant rounded mt-2" size="60" type="text"
                                               bind:value={info.description}>

                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
                <div class="w-1/4 h-full">b</div>
                <div class="w-1/4 mx-4 h-full">c</div>
            </div>
        </div>
    {/if}
{:else}
    <!--<h1 class="h1">404</h1>
    <p class="p">Not found</p>-->
{/if}