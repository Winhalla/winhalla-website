<script context="module">
    export async function preload({ query }) {
        //console.log(query.visible)
        return { isVisible: query.visible };
    }
</script>

<script>
    import { onMount } from "svelte";
    import cookie from "cookie";
    import { callApi } from "../utils/api";
    import { goto } from "@sapper/app";
    import { counter } from "../components/store";
    import Loading from "../components/Loading.svelte";
    import { apiUrl } from "../utils/config";
    import { fade } from "svelte/transition";

    export let isVisible;
    let waitingTermsAcceptations;
    let generatedLink;
    let waitingBID;
    let isValidBrawlhallaID = null;
    let brawlhallaIDError;

    let error;
    let toolTipOpen;
    let hasShareFunction;
    let linkConfig;
    let brawlhallaID = "";
    let lastInterval;
    onMount(async () => {
        if ((new URLSearchParams(document.location.search)).get("needBrawlhallaID") === "true") waitingBID = true;

        hasShareFunction = !!window.navigator.share;
        linkConfig = callApi("get", "/linkConfig");
        let user = callApi("get", "/account");
        user = await user;
        linkConfig = await linkConfig;
        if (!user || (user.user && !isVisible)) {
            isVisible = true;
            generatedLink = `http://localhost:3000/link/${user.user.linkId}`;
        }
        if (!user.user) {
            waitingTermsAcceptations = true;
        } else {
            generatedLink = user.user.linkId;
        }
        generatedLink = `http://localhost:3000/link/${generatedLink}`;
        counter.set({ refresh: true });
    });

    async function createAccount() {
        waitingTermsAcceptations = false;
        let { source, affiliateLinkId } = cookie.parse(document.cookie);
        generatedLink = await callApi("post", `/auth/createAccount?linkId=${affiliateLinkId}&source=${source}&BID=${brawlhallaID}`);
        if (generatedLink instanceof Error) return { error, isVisible } = { error: true, isVisible: true };
        document.cookie = cookie.serialize("affiliateLinkId", 0, { maxAge: 1 });
        document.cookie = cookie.serialize("source", 0, { maxAge: 1 });
        isVisible = true;
        generatedLink = `http://localhost:3000/link/${generatedLink}`;
        counter.set({ refresh: true });
    }

    function copyText() {
        let temp = document.createElement("textarea");
        temp.value = generatedLink;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        toolTipOpen = true;
        setTimeout(() => {
            toolTipOpen = false;
        }, 3000);
    }

    function share() {
        window.navigator.share({ url: generatedLink });
    }

    async function testBrawlhallaID() {
        const { isValid, reason } = await callApi("get", `/auth/isBIDvalid/${brawlhallaID}`);
        console.log(isValid, reason);
        if (isValid) {
            waitingBID = false;
        } else {
            brawlhallaIDError = reason;
            isValidBrawlhallaID = false;
        }
        clearInterval(lastInterval);
        lastInterval = setTimeout(() => isValidBrawlhallaID = null, 4000);
    }
</script>
<!--
<Loading data="Logging in..." />
-->
<svelte:head>
    <title>Invite friends and earn rewards | Winhalla, Play Brawlhalla. Earn rewards.</title>
</svelte:head>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');

    b {
        @apply text-primary font-normal leading-none;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        top: 98%;
        right: 20%;
        margin-left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: #3d72e4 transparent transparent transparent;
    }

    .accent {
        @apply text-accent;
    }

    input {
        @apply w-full text-background bg-font py-3 px-4 rounded;
    }
</style>

{#if isVisible && linkConfig?.boost}
    {#if !error}
        <div class="flex items-center justify-center md:h-screen-7">
            <div class="flex flex-col items-center px-5">
                <div class="text-center mt-7 lg:mt-12">
                    <h1
                        class="text-6xl mb-8 lg:mb-8 leading-snug
                        lg:leading-normal">
                        Invite friends and earn rewards
                    </h1>
                </div>
                <div class="flex flex-col md:flex-row items-center">
                    <div
                        class="card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0
                        md:mr-12">
                        <p class="text-6xl mt-6">You</p>
                        <p class="leading-7 mt-13 text-2xl">
                            will get
                            <b>{linkConfig.boost}%</b>
                            of the coins that
                            <b>each people</b>
                            who
                            <b>creates an account</b>
                            with your link wins, for {linkConfig.duration} days!
                        </p>
                    </div>
                    <div class="flex items-center md:block">
                        <div class="hidden md:flex items-center">
                            <svg
                                class="w-4 fill-current text-accent -mr-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m19.2 2.43-2.422-2.43-11.978 12 11.978 12
                                    2.422-2.43-9.547-9.57z" />
                            </svg>
                            <div class="h-2px bg-accent w-40" />
                            <svg
                                class="w-4 fill-current text-accent -ml-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m4.8 21.57 2.422 2.43
                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                            </svg>
                        </div>
                        <div class="flex flex-col md:hidden items-center">
                            <svg
                                class="w-4 fill-current text-accent -mb-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m21.57 19.2 2.43-2.422-12-11.978-12
                                    11.978 2.43 2.422 9.57-9.547z" />
                            </svg>
                            <div class="w-2px bg-accent h-16" />
                            <svg
                                class="w-4 fill-current text-accent -mt-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m2.43 4.8-2.43 2.422 12 11.978
                                    12-11.978-2.43-2.422-9.57 9.547z" />
                            </svg>
                        </div>

                        <p
                            class="text-center text-extra-light text-lg ml-4
                            md:ml-0">
                            Everyone wins!
                        </p>
                    </div>
                    <div
                        class="card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0
                        md:ml-12">
                        <p class="text-6xl">Each person</p>
                        <p class="leading-7 mt-4 text-2xl">
                            that will
                            <b>create an account</b>
                            with
                            <u>your</u>
                            link will get
                            <b>{linkConfig.boost}%</b>
                            more coins for {linkConfig.duration} days!
                        </p>
                    </div>
                </div>
                <div class="lg:flex justify-center">
                    {#if generatedLink}
                        <div
                            class="text-background  bg-font py-4 px-3 mt-14 flex items-center rounded">
                            <div id="link"
                                 class="flex leading-none focus:outline-none text-lg lg:text-default focus:border-none"
                                 style="font-family:'Open Sans', sans-serif"><p>{generatedLink}</p>
                                <div class="ml-2 h-5  flex"
                                     class:w-5={!hasShareFunction} class:w-12={hasShareFunction}>
                                    {#if hasShareFunction}
                                        <div class="w-5 h-5 hover:text-gray-500 cursor-pointer">
                                            <svg viewBox="0 0 24 24" fill="currentColor" on:click={share}
                                                 class="w-5 h-5"
                                                 class:mr-1={hasShareFunction}
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z" />
                                            </svg>
                                        </div>
                                    {/if}
                                    <div class="w-5 h-5 hover:text-gray-500 cursor-pointer">
                                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"
                                             class:ml-1={hasShareFunction}
                                             on:click={copyText}
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z" />
                                            <path
                                                d="m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z" />
                                            <path
                                                d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z" />
                                        </svg>
                                    </div>

                                </div>
                            </div>
                            {#if toolTipOpen}
                                <div class="relative">
                                    <span
                                        class="tooltip absolute px-6 py-2 bg-primary hidden md:block rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40"
                                        transition:fade>
                                            Copied!
                                    </span>
                                </div>
                            {/if}

                        </div>
                    {/if}
                </div>

                <p class="pt-4 text-default text-center">
                    You will be able to
                    <b class="accent">access your link</b>
                    by clicking on
                    <b class="accent">your profile</b>
                    !
                </p>
                <a
                    href="/play"
                    class="button button-brand mt-10 block mx-auto mb-6 md:mb-0">
                    Finish
                </a>
            </div>
        </div>
    {:else}
        <div class="w-full content-center lg:mt-60 mt-25 ">
            <h2 class="lg:text-5xl text-3xl text-center">Account creation didn't work. Please try again
                later.</h2>
            <a href="/"><p class="underline lg:text-3xl pt-4 text-2xl  text-center text-primary">Go to
                home page</p></a>
        </div>
    {/if}
{:else if waitingTermsAcceptations && waitingBID}
    <div class="flex items-center justify-center md:h-screen-7">
        <div class="flex flex-col justify-center px-5 md:p-0">
            <div class="text-center md:text-left mt-7 md:mt-12">
                <h1
                    class="text-6xl mb-6 md:mb-8 leading-snug
                        md:leading-tight">
                    Register your <br> Brawlhalla ID
                </h1>
            </div>
            <div class="md:mt-4">
                <div>
                    <input
                        type="email"
                        placeholder="Your Brawlhalla ID goes here"
                        bind:value={brawlhallaID}
                        class:border-legendary={isValidBrawlhallaID === false}
                        class="input-style focus:outline-none
                            focus:border-primary placeholder-disabled" />

                    {#if isValidBrawlhallaID === false}
                        <p class="text-legendary info ">{brawlhallaIDError}</p>
                    {/if}
                </div>
            </div>
            <button
                on:click={testBrawlhallaID}
                class:mt-11={isValidBrawlhallaID == null}
                class="button button-brand mt-3">
                Continue
            </button>
            <p class="mt-8 italic font-xl" style="max-width: 17rem; font-size: 1.25rem; font-family: 'Roboto Condensed', sans-serif">This is your Brawlhalla user id. You will find it by clicking on the box under your username (in Brawlhalla):
                and then in the top right corner!</p>
        </div>
    </div>
{:else if waitingTermsAcceptations && !waitingBID}
    <div class="flex items-center justify-center mt-30 flex-col">
        <p class="text-3xl">By clicking the button below you accept our <a href="/terms"
                                                                           class="underline text-primary">terms
            and conditions </a>,
            our <a href="/privacy" class="underline text-primary">Privacy policy</a> and the creation of an account
        </p>
        <button on:click={createAccount} class="button button-brand mt-10">Create account</button>
    </div>
{:else}
    <Loading data={waitingTermsAcceptations === false?"Creating account...":"Logging in..."} />
{/if}


