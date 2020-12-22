<script>
    import { onMount, onDestroy } from "svelte";
    import { clickOutside } from "../../utils/clickOutside";

    import NavAccount from "./NavAccount.svelte";
    import Notifications from "./NavNotifications.svelte";
    import NavAlert from "./NavAlert.svelte";
    import Poll from "../Poll.svelte";

    import { apiUrl } from "../../utils/config";
    import { callApi } from "../../utils/api";
    import { goto } from "@sapper/app";
    import { counter } from "../store.js";

    export let isScrolling;

    let isNavbarOpen;
    let isUserLoggedIn;
    let userCoins;
    let informations;
    let notificationsObj = {};
    let user;
    let firstLoad = true;
    let offline;
    async function calculateProperties(value) {
        const tempUserData = await value;
        if (tempUserData.offline) offline = true;
        console.log(tempUserData);
        if (tempUserData.user) {
            notificationsObj.notifications = tempUserData.user.notifications;
            notificationsObj.inGame = tempUserData.user.inGame;
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
        user = value.content;
        if (firstLoad === true) return (firstLoad = false);
        if (value.refresh === true) return;

        await calculateProperties(user);
    };
    const unsubscribe = counter.subscribe(resetNav);
    onDestroy(unsubscribe);
    onMount(async () => {
        try {
            informations = await callApi("get", "/informations");
        } catch (e) {
            goto("/status");
        }
        await calculateProperties(user);
    });

    let isShowingPoll = false;
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
        @apply pr-9 flex items-center my-3;
    }
</style>

<div class="h-auto w-full fixed z-50">
    {#if offline}
        <div class="bg-legendary w-full text-white text-center lg:text-xl">
            You are offline, you may experience bugs on the website.
        </div>
    {/if}
    <nav
        class:border-green={isScrolling || isShowingPoll}
        class:border-b-2={isShowingPoll}
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
                            class="nav-link-container lg:hover:text-shadow-link-hover
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
                        class="nav-link-container
                        lg:hover:text-shadow-link-hover border-l border-primary
                        lg:border-none pl-3"
                        href="/play"
                        rel="prefetch">
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
                        class="nav-link-container
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
                </div>
                {#if isShowingPoll}
                    <div
                        class="absolute top-2 "
                        style="left: 50% ; transform: translate(-50%, 0);">
                        <div class="flex items-center px-4">
                            <p
                                class="text-3xl text-center px-4 md:px-0
                                md:text-left">
                                Are you interested in a 2vs2 game mode ?
                            </p>
                            <button
                                class="button button-brand w-24 ml-4"
                                style="padding: 0.5rem 0.75rem">
                                SUBMIT
                            </button>
                        </div>
                        <div class="mt-2 flex relative" style="">
                            <div
                                class="z-10 h-12 w-11 bg-background
                                rounded-bl-lg border-b-2 border-l-2 border-green" />

                            <div
                                class="z-20 absolute top-0 left-5 w-12
                                bg-background rounded-bl-lg"
                                style="height: calc(3rem - 2px)" />
                            <div class="z-10 flex-grow">
                                <Poll />
                            </div>

                            <div
                                class="absolute z-10 top-1 bottom-0 left-11
                                right-12 rounded-b-lg border-2 border-t-0
                                border-green" />
                            <div
                                class="z-20 absolute top-0 right-5 w-12
                                bg-background rounded-br-lg"
                                style="height: calc(3rem - 2px)" />
                            <div
                                class="absolute top-0 right-5 w-12 bg-background
                                rounded-br-lg border-b-2 border-green"
                                style="height: calc(3rem)" />
                            <div
                                class="z-10 h-12 w-12 bg-background
                                rounded-br-lg border-b-2 border-r-2 border-green
                                " />
                        </div>

                    </div>
                {/if}
                <div class="ml-7 mt-5 md:m-0 md:mr-7">
                    {#if isUserLoggedIn === true}
                        <div class="lg:flex lg:items-center">
                            {#if informations}
                                <div class="hidden lg:flex items-center">
                                    <NavAlert data={informations} />
                                </div>
                            {/if}
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

                            <a class="ml-8 text-2xl text-primary" href="/shop">
                                <b class="font-normal ">{userCoins}</b>
                                $
                            </a>
                        </div>
                    {:else if isUserLoggedIn == 'steam'}
                        <a
                            class="button-brand button mr-3"
                            href="/create-account">
                            CREATE ACCOUNT
                        </a>
                    {:else}
                        <a
                            class="button-brand button mr-3"
                            href="{apiUrl}/auth/login">
                            CREATE ACCOUNT
                        </a>
                        <a
                            class="button-brand-alternative button"
                            href="{apiUrl}/auth/login">
                            LOGIN
                        </a>
                    {/if}
                </div>

            </div>
        </div>

    </nav>

    <div class="flex justify-center items-start absolute top-2 left-0 right-0">
        <!--
        <div class="h-px flex-grow bg-green"></div>

                <div class="relative">
                    <div class="h-0 w-0" style=" border-top : 21.15rem solid #17171a; border-left : 5rem solid transparent;"></div>
                    <div class="absolute top-0 h-0 w-0" style="right: -3.99rem; z-index: -5; border-top : 21.21rem solid #3de488; border-right: 4rem solid transparent; border-left : 5.11rem solid transparent;"></div>
                </div>        <div class="h-12 w-11 bg-background rounded-bl-lg mt-13 border-b-2 border-l-2 border-green">

        </div>
        <div class="">
            <Poll />
        </div>
        <div class="h-12 w-11 bg-background rounded-br-lg mt-13 border-b-2 border-r-2 border-green">

        </div>
        -->

        <!--
        <div class="h-full">
            <div class="w-4 bg-font h-96 max-h-full" style="clip-path: polygon(100% 0, 0 100%, 0 0);">

            </div>
        </div>
        <div class="relative max-h-20">
            <div class="h-full w-full " style=" background-image: linear-gradient(to right top, green 0%, green 50%, transparent 50%);"></div>
            <div class="absolute top-0 h-0 w-0" style="left: -3.999rem; z-index: -5; border-top : 21.21rem solid #3de488; border-left: 4rem solid transparent; border-right : 5.11rem solid transparent;"></div>
        </div>
                <div class="relative">
                    <div class="h-0 w-0 " style=" border-top : 21.15rem solid #17171a; border-right : 5rem solid transparent;"></div>
                    <div class="absolute top-0 h-0 w-0" style="left: -3.999rem; z-index: -5; border-top : 21.21rem solid #3de488; border-left: 4rem solid transparent; border-right : 5.11rem solid transparent;"></div>
                </div>


        <div class="h-px flex-grow bg-green"></div>-->
    </div>

</div>
<!--<div class=" h-2px w-72  bg-font ml-28"></div><div class=" h-2px w-72 bg-font mr-28"></div>-->
