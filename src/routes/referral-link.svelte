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

    export let isVisible;
    let waitingTermsAcceptations;
    let generatedLink;
    let error;
    onMount(async () => {

        const user = await callApi("get", "/account");
        if (!user || (user.user && !isVisible)) {
            console.log("lol");
            return goto("/play");
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
        let cookies = cookie.parse(document.cookie);
        generatedLink = await callApi("post", "/auth/createAccount?linkId=" + cookies.affiliateLinkId);
        if (generatedLink instanceof Error) return { error, isVisible } = { error: true, isVisible: true };
        document.cookie = cookie.serialize("affiliateLinkId", 0, { maxAge: 1 });
        isVisible = true;
        generatedLink = `http://localhost:3000/link/${generatedLink}`;
        counter.set({ refresh: true });
    }
</script>
<!--
<Loading data="Logging in..." />
-->
<style>
    b {
        @apply text-primary font-normal leading-none;
    }

    .accent {
        @apply text-accent;
    }
</style>

{#if isVisible}
    {#if !error}
        <div class="flex items-center justify-center md:h-screen-7">
            <div class="flex flex-col items-center px-5">
                <div class="text-center mt-7 lg:mt-12">
                    <h1
                        class="text-6xl mb-8 lg:mb-8 leading-snug
                        lg:leading-normal">
                        Share your referral link
                    </h1>
                </div>
                <div class="flex flex-col md:flex-row items-center">
                    <div
                        class="card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0
                        md:mr-12">
                        <p class="text-6xl mt-6">You</p>
                        <p class="leading-7 mt-13 text-2xl">
                            will get
                            <b>20%</b>
                            of what
                            <b>each people</b>
                            who
                            <b>creates an account</b>
                            with
                            <u>your</u>
                            link
                            <b>wins</b>, for one month!
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
                            <b>20%</b>
                            of reward
                            <b>boost</b> for one month!
                        </p>
                    </div>
                </div>
                <div class="lg:flex justify-center">
                    <!--<textarea bind:this={areaDom}>{valueCopy}</textarea>-->

                    <div
                        class="text-background bg-font py-4 px-4 mt-14 flex items-center rounded">
                        <p class="leading-none">{generatedLink}</p>
                    </div>
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
            <h2 class="lg:text-5xl text-3xl text-center">Account creation didn't work. Please try again later.</h2>
            <a href="/"><p class="underline lg:text-3xl pt-4 text-2xl  text-center text-primary">Go to home page</p></a>
        </div>
    {/if}
{:else if waitingTermsAcceptations}
    <div class="flex items-center justify-center mt-30 flex-col">
        <p class="text-3xl">By clicking the button below you accept our <a href="/terms" class="underline text-primary">terms
            and conditions </a>,
            our <a href="/privacy" class="underline text-primary">Privacy policy</a> and the creation of an account</p>
        <button on:click={createAccount} class="button button-brand mt-10">Create account</button>
    </div>
{:else}
    <Loading data={waitingTermsAcceptations === false?"Creating account...":"Logging in..."} />
{/if}


