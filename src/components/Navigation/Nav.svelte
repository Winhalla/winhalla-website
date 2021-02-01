<script>
    import { onDestroy, onMount } from "svelte";
    import { clickOutside } from "../../utils/clickOutside";

    import NavAccount from "./NavAccount.svelte";
    import Notifications from "./NavNotifications.svelte";
    import NavAlert from "./NavAlert.svelte";
    import Poll from "../Poll.svelte";
    import { fly } from "svelte/transition";

    import { apiUrl } from "../../utils/config";
    import { callApi } from "../../utils/api";
    import { goto, stores } from "@sapper/app";
    import { counter } from "../store.js";

    const { page } = stores();
    export let isScrolling;
    let isNavbarOpen;
    let isUserLoggedIn;


    let informations;
    let poll;
    let notificationsObj = {};

    let user;
    let userCoins;

    let firstLoad = true;
    let offline;
    let loaded = false;

    let currentMatch;
    function calculateProperties(value) {
        const tempUserData = value;
        console.log(tempUserData);
        if (tempUserData.offline) offline = true;
        if (tempUserData instanceof Error) {
            if (tempUserData.response) if (tempUserData.response.status === 503 || tempUserData.response.status === 502) goto("/status");
            return isUserLoggedIn = "network";
        }
        if (tempUserData.user) {
            notificationsObj.notifications = tempUserData.user.notifications;
            notificationsObj.inGame = tempUserData.user.inGame;
            currentMatch = notificationsObj.inGame?.filter(g => g.isFinished === false)[0]?.id;
        }
        user = tempUserData.steam;
        userCoins = tempUserData.user.coins;

        isUserLoggedIn = tempUserData.user
            ? true
            : tempUserData.steam
                ? "steam"
                : false;
    }

    const resetNav = async value => {
        if (value.refresh === true) return;
        user = await value.content;
        if (firstLoad === true) return (firstLoad = false);
        calculateProperties(user);
    };

    const unsubscribe = counter.subscribe(resetNav);
    onDestroy(unsubscribe);

    onMount(async () => {
        try {
            informations = await callApi("get", "/informations");


            if (informations instanceof Error) {
                throw informations;
            }
        } catch (e) {
            informations = "network";
        }

        setTimeout(async () => {
                try {
                    if (isUserLoggedIn === true) poll = await callApi("get", "/getpoll");

                } catch (e) {
                    console.log(e);
                }
            }, 5000
        );
        await user;
        calculateProperties(user);
        loaded = true;
    });
</script>

<style>
    svg {
        @apply pr-1;
        margin-bottom: 3px;
    }

    .nav-icon {
        margin-bottom: -6px;
    }

    .play {
        width: 1.05rem;
        height: 1.05rem;
    }

    .nav-link-container {
        @apply pr-9 flex items-center;
    }
</style>

<div class="h-auto w-full fixed z-50">
    {#if offline}
        <div class="bg-legendary w-full flex text-white text-center lg:text-xl">
            <p class="text-center w-99%">
                You are offline or our services are down, you may experience
                bugs on the website.
            </p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                on:click={() => (offline = false)}>
                <path
                    class="heroicon-ui"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1
                    0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12
                    10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                    fill="#FFFFFF" />
            </svg>
        </div>
    {/if}
    <nav
        class:border-primary={isScrolling}
        class:border-b-2={isScrolling}
        class="shadow-link-hover bg-background lg:flex items-center text-font
        w-full transition duration-200 border-b border-transparent">
        <div
            class="w-full lg:w-auto flex justify-between items-center py-3
            relative">
            <div class="pl-7 lg:pl-24 lg:pr-34 text-logo">
                <a class="logo" href="/">WINHALLA</a>
            </div>
            <div class="pr-6 lg:hidden flex -mt-2">
                <div class="flex lg:hidden items-center">
                    {#if informations}
                        <NavAlert data={informations} />
                    {/if}

                    <Notifications data={notificationsObj} />
                </div>
                <button
                    class="focus:outline-none"
                    use:clickOutside
                    on:click_outside={() => (isNavbarOpen = false)}
                    on:click={() => {
                        isNavbarOpen = !isNavbarOpen;
                    }}>
                    <svg
                        class="w-7 h-7 fill-current nav-icon"
                        viewBox="0 0 28 24"
                        xmlns="http://www.w3.org/2000/svg">
                        {#if !isNavbarOpen}
                            <path
                                d="m2.61 0h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                            <path
                                d="m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                            <path
                                d="m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                        {:else}
                            <path
                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6
                                9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6
                                2.4-2.4-9.6-9.6z" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
        <div class:hidden={!isNavbarOpen} class="lg:block w-full">
            <div
                class="pb-3 lg:p-0 sm:flex items-center w-full justify-between">
                <div class="ml-7 links text-xl lg:flex">
                    <!--<a
                            class="nav-link-container my-3 lg:hover:text-shadow-link-hover
                            border-l border-primary lg:border-none pl-3"
                            href="/profile">
                        <svg
                                class="fill-current w-5 h-5"
                                viewBox="0 0 32 24"
                                xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="m10 12v8h-4v-8zm6-8v16h-4v-16zm16 18v2h-32v-24h2v22zm-10-14v12h-4v-12zm6-6v18h-4v-18z"/>
                        </svg>
                        PROFILE
                    </a>-->
                    <a
                        class="nav-link-container my-3
                        lg:hover:text-shadow-link-hover border-l border-primary
                        lg:border-none pl-3"
                        href="/play">
                        <svg
                            class="fill-current play"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m.001 1.165v21.669c.052.661.601 1.177 1.271
                                1.177.225 0 .436-.058.62-.16l-.006.003
                                21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672
                                0-1.223.521-1.27 1.181v.004z" />
                        </svg>
                        PLAY
                    </a>
                    <a
                        class="nav-link-container my-3 mb-6 lg:mb-3
                        lg:hover:text-shadow-link-hover border-l border-primary
                        lg:border-none pl-3"
                        href="/shop"
                        rel="prefetch">
                        <svg
                            class="fill-current play"
                            viewBox="0 0 22 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m14.416 24v-11.098h5.68c.181 0
                                .328.147.328.328v10.114c0
                                .362-.294.656-.656.656zm-12.096 0c-.362
                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181
                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357
                                0-.362.294-.656.656-.656.23 0
                                .432.118.549.296l.002.002c.028.041 1.342 1.92
                                5.15
                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622
                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515
                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391
                                3.583 4.309.749-1.87 2.037-4.252
                                3.74-4.252.741.039 1.388.41
                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0
                                .262-.04.515-.113.753l.005-.018c-.352
                                1.035-1.466 1.823-2.653 2.391 3.472-.872
                                4.675-2.61
                                4.69-2.633.12-.173.318-.286.541-.286.362 0
                                .656.294.656.656 0
                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434
                                2.154-5.345 3.164h6.48c.181 0
                                .328.147.328.328v4.029c0
                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524
                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936
                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315
                                3.791c1.692-.501 3.698-1.389
                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946
                                0-2.103 2.226-2.813 4.21z" />
                        </svg>
                        SHOP
                    </a>

                    {#if currentMatch && $page.path !== `/play/ffa/${currentMatch}`}
                        <a class="lg:hidden py-1 px-3 text-xl bg-primary rounded  mt-4 lg:mb-0 lg:mr-8 w-auto"
                           href="/play/ffa/{currentMatch}">Rejoin
                            match</a>
                    {/if}
                </div>
                <div class="ml-7 mt-5 md:m-0 md:mr-7 lg:flex lg:items-center">
                    {#if currentMatch && $page.path !== `/play/ffa/${currentMatch}`}
                        <a class="hidden lg:block py-1 px-3 text-xl bg-primary rounded  mb-4 lg:mb-0 lg:mr-8 w-auto"
                           href="/play/ffa/{currentMatch}">Rejoin
                            match</a>
                    {/if}
                    {#if informations}
                        <div class="hidden lg:flex items-center">
                            <NavAlert data={informations} />
                        </div>
                    {/if}
                    {#if isUserLoggedIn === true}
                        <div class="lg:flex lg:items-center //mt-5 md:mt-0">
                            {#if user.displayName && user.photos}
                                <NavAccount
                                    username={user.displayName}
                                    avatar={user.photos[0].value} />
                            {/if}
                            {#if notificationsObj}
                                <div class="hidden lg:flex items-center">
                                    <Notifications data={notificationsObj} />
                                </div>
                            {/if}

                            <a class="lg:mt-0 lg:ml-8 text-2xl text-primary" href="/shop">
                                <b class="font-normal ">{userCoins}</b>
                                $
                            </a>
                        </div>
                    {:else if isUserLoggedIn == 'steam'}
                        <a
                            class="button-brand button mr-3"
                            href="/create-account">
                            Register email
                        </a>
                    {:else if isUserLoggedIn === 'network'}
                        <p class="text-legendary text-xl">An error occured processing the account data</p>
                    {:else}
                        <a
                            class="button-brand button mr-3"
                            href="{apiUrl}/auth/login">
                            Login with steam
                        </a>
                    {/if}
                </div>

            </div>
        </div>

    </nav>
    {#if loaded}
        <div
            class="fixed z-10 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
            transition:fly={{ y:-200, duration: 500 }}>
            <Poll poll={poll} />
        </div>
    {/if}
</div>
