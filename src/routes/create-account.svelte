<script context="module">
    export async function preload({ params, query }) {
        let firstLink = query.link;
        return { firstLink };
    }
</script>

<script>
    import { counter } from "../components/store";

    export let firstLink;
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { apiUrl } from "../utils/config";

    let account;
    let email;
    let link = firstLink;
    let linkId;
    let validLink = null;
    let validEmail = null;

    let accountCreationStep = 0;
    let generatedLink;

    const onKeyPressLink = () => {
        setTimeout(async () => {
            if (link.length > 0) {
                try {
                    linkId = new URL(link);
                    linkId = linkId.pathname.split("/")[2];
                    if (linkId.length == 24) {
                        const testLink = await callApi(
                            "get",
                            `/getLink/${linkId}`
                        );
                        if (testLink) validLink = true;
                        else validLink = false;
                    } else {
                        validLink = false;
                    }
                } catch (err) {
                    validLink = false;
                }
            } else {
                validLink = null;
            }
        }, 1);
    };

    const onKeyPressEmail = () => {
        setTimeout(() => {
            if (email.length > 0) {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                let exec = regex.exec(email);
                if (exec) validEmail = true;
                else validEmail = false;
            } else {
                validEmail = null;
            }
        }, 1);
    };
    if (link && link != "") onKeyPressLink();
    onMount(()=>{
        let unsub = counter.subscribe((value) => {
            let user = value.content;
            if (user.then) {
                user.then((values) => {
                    if (values.user) {
                        goto("/");
                    }
                });
            } else if (user) {
                if (!user.user) {
                    goto("/");
                }
            }
        });
        unsub()
    })

    async function handleClick() {
        if (accountCreationStep == 0) {
            try {
                linkId = new URL(link);
                linkId = linkId.pathname.split("/")[2];
            } catch (err) {
                console.log(err);
            }
            generatedLink = await callApi(
                "post",
                `/auth/createAccount?email=${email}&linkId=${linkId}`
            );
            accountCreationStep++;

            counter.set({ "refresh": true });

        }
    }

    import { tick } from "svelte";
    import { goto } from "@sapper/app";

    /*let valueCopy = null;
    export let value = null;
    let areaDom;
    async function copy() {
        valueCopy = value;
        console.log(areaDom);
        await tick();
        areaDom.focus();
        areaDom.select();
        let message = "Copying text was successful";
        try {
            const successful = document.execCommand("copy");
            if (!successful) {
                message = "Copying text was unsuccessful";
            }
        } catch (err) {
            message = "Oops, unable to copy";
        }

        // we can notifi by event or storage about copy status
        console.log(message);
        valueCopy = null;
    }
    async function handleShare() {
        if (window.navigator.share) {
            await window.navigator.share({
                title: "Share your affiliate link",
                url: generatedLink,
            });
        } else {
            copy();
        }
    }*/
</script>

<style>
    b {
        @apply text-primary font-normal leading-none;
    }

    .accent {
        @apply text-accent;
    }

    input {
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
</style>

<svelte:head>
    <title>Create account | Winhalla, Play Brawlhalla. Earn rewards.</title>
    <meta
        name="description"
        content="This is where all starts | Create a Winhalla account now and
        get a Battle Pass and Mammoth Coins FOR FREE" />
</svelte:head>
<div>
    <div class="flex items-center justify-center md:h-screen-7">
        {#if accountCreationStep === 0}
            <div class="flex flex-col justify-center px-5 md:p-0">
                <div class="text-center md:text-left mt-7 md:mt-12">
                    <h1
                        class="text-6xl mb-6 md:mb-8 leading-snug
                        md:leading-normal">
                        Create your account
                    </h1>
                </div>
                <div class="md:mt-4">
                    <p class="input-header">Email</p>
                    <div>
                        <input
                            on:keydown={onKeyPressEmail}
                            type="email"
                            placeholder="Your email goes here"
                            bind:value={email}
                            class:border-legendary={validEmail == false}
                            class="input-style focus:outline-none
                            focus:border-primary placeholder-disabled" />

                        {#if validEmail}
                            <div class="flex items-center">
                                <svg
                                    class="fill-current text-green w-4 check"
                                    viewBox="0 0 33 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                </svg>
                                <p class="text-green info">VALID EMAIL</p>
                            </div>
                        {:else if validEmail == false}
                            <p class="text-legendary info ">INVALID EMAIL</p>
                        {/if}
                    </div>
                </div>

                <div class:mt-12={validEmail == null} class="mt-4">
                    <p class="text-3xl input-header">Friend link</p>
                    <div>
                        <input
                            on:keydown={onKeyPressLink}
                            bind:value={link}
                            placeholder="Paste here your affiliate link"
                            class:border-legendary={validLink == false}
                            class="input-style focus:outline-none
                            focus:border-primary w-full placeholder-disabled" />
                        {#if validLink}
                            <div class="flex items-center">
                                <svg
                                    class="fill-current text-green w-4 check"
                                    viewBox="0 0 33 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                </svg>
                                <p class="text-green info">VALID LINK</p>
                            </div>
                        {:else if validLink == false}
                            <p class="text-legendary info">INVALID LINK</p>
                        {/if}
                    </div>
                </div>
                <button
                    disabled={!validEmail}
                    on:click={handleClick}
                    class:mt-11={validLink == null}
                    class="button button-brand mt-3">
                    Create account
                </button>
                <!--<div class="card pt-8 pb-11 px-10 w-100% mx-5 w-full md:w-96">
                    <p class="input-header">Email</p>
                    <div>
                        <input
                            on:keydown={onKeyPressEmail}
                            type="email"
                            bind:value={email}
                            class:border-legendary={validEmail == false}
                            class="input-style focus:outline-none
                            focus:border-primary w-full" />

                        {#if validEmail}
                            <div class="flex items-center">
                                <svg
                                    class="fill-current text-green w-4 check"
                                    viewBox="0 0 33 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                </svg>
                                <p class="text-green info">VALID EMAIL</p>
                            </div>
                        {:else if validEmail == false}
                            <p class="text-legendary info ">INVALID EMAIL</p>
                        {/if}
                    </div>

                    <p class="pt-6 text-3xl input-header">Friend link</p>
                    <div>
                        <input
                            on:keydown={onKeyPressLink}
                            bind:value={link}
                            class:border-legendary={validLink == false}
                            class="input-style focus:outline-none
                            focus:border-primary w-full" />
                        {#if validLink}
                            <div class="flex items-center">
                                <svg
                                    class="fill-current text-green w-4 check"
                                    viewBox="0 0 33 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                </svg>
                                <p class="text-green info">VALID LINK</p>
                            </div>
                        {:else if validLink == false}
                            <p class="text-legendary info">INVALID LINK</p>
                        {/if}
                    </div>
                </div>
                <button
                    disabled={!validEmail}
                    on:click={handleClick}
                    class="button button-brand mt-6">
                    Create account
                </button>-->
            </div>
        {:else}
            <div class="flex flex-col items-center px-5">
                <div class="text-center mt-7 lg:mt-12">
                    <h1
                        class="text-6xl mb-8 lg:mb-8 leading-snug
                        lg:leading-normal">
                        Share your affiliate link
                    </h1>
                </div>
                <div class="flex flex-col md:flex-row items-center">
                    <div
                        class="card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0
                        md:mr-12">
                        <p class="text-6xl mt-6">You</p>
                        <p class="leading-7 mt-13">
                            will get
                            <b>20%</b>
                            of what
                            <b>each people</b>
                            who
                            <b>creates an account</b>
                            with
                            <u>your</u>
                            link
                            <b>wins</b>
                            , for one month!
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
                        <p class="leading-7 mt-4">
                            that will
                            <b>create an account</b>
                            with
                            <u>your</u>
                            link will get
                            <b>20%</b>
                            of reward
                            <b>boost</b>
                            , for one month!
                        </p>
                    </div>
                </div>
                <div class="lg:flex justify-center">
                    <!--<textarea bind:this={areaDom}>{valueCopy}</textarea>-->

                    <button
                        class="text-background bg-font py-4 px-4 mt-14 flex items-center rounded">
                        <p class="leading-none">{generatedLink}</p>
                        <svg
                            class="fill-current text-primary w-10 md:w-5 ml-1
                            lg:ml-4 lg:block"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m12.922 16.587-3.671 3.671c-.693.645-1.626
                                1.041-2.651 1.041-2.152
                                0-3.896-1.744-3.896-3.896 0-1.025.396-1.958
                                1.043-2.654l-.002.002
                                3.671-3.671c.212-.23.341-.539.341-.878
                                0-.717-.582-1.299-1.299-1.299-.339
                                0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108
                                1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494
                                6.494 6.494 1.738 0 3.316-.683
                                4.482-1.795l-.003.002
                                3.671-3.671c.212-.23.341-.539.341-.878
                                0-.717-.582-1.299-1.299-1.299-.339
                                0-.647.13-.879.342l.001-.001z" />
                            <path
                                d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z" />
                        </svg>
                    </button>
                </div>

                <p class="pt-4 text-lg text-center">
                    You will be able to
                    <b class="accent">access your link</b>
                    by clicking on
                    <b class="accent">your profile</b>
                    !
                </p>
                <a
                    href="{apiUrl}/auth/redirect-after-account"
                    class="button button-brand mt-10 block mx-auto mb-6 md:mb-0">
                    Finish
                </a>
            </div>
            <!--<div class=" -flex flex-col items-center">
                <div class="text-center lg:text-left lg:mt-12">
                    <h1
                        class="text-6xl mb-8 lg:mb-8 leading-snug lg:leading-normal">
                        Share your affiliate link
                    </h1>
                </div>
                <div class="-flex flex-col items-center lg:flex-row mt-8">
                    <div class="card py-8 px-6 text-center w-64 h-78 mr-12">
                        <p class="text-6xl">Each person...</p>
                        <p class="leading-7 mt-4">
                            ...that will
                            <b>create an account</b>
                            with your link will get
                            <b>20%</b>
                            of reward
                            <b>boost</b>
                            for one month.
                        </p>
                    </div>
                    <div>
                        <div class="-flex items-center">
                            <svg
                                class="w-4 fill-current text-accent -mr-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m19.2 2.43-2.422-2.43-11.978 12 11.978 12 2.422-2.43-9.547-9.57z" /></svg>
                            <div class="h-2px bg-accent w-40 join relative" />
                            <svg
                                class="w-4 fill-current text-accent -ml-3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" /></svg>
                        </div>
                        <p class="text-center text-extra-light text-lg">
                            Everyone wins !
                        </p>
                    </div>

                    <div class="card py-8 px-6 text-center w-64 h-78 ml-12">
                        <p class="text-6xl mt-6">You...</p>
                        <p class="leading-7 mt-13">
                            ... will get
                            <b>20%</b>
                            of what each of your godsons wins!
                        </p>
                    </div>
                </div>
                <div>
                    <div
                        class="text-background bg-font py-4 px-4 mt-14 flex justify-between items-center rounded overflow-x-scroll lg:overflow-auto w-lin">
                        <p class="leading-none">{generatedLink}</p>
                        <svg
                            class="fill-current text-primary w-5 ml-4"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"><path
                                d="m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z" />
                            <path
                                d="m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z" />
                            <path
                                d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z" /></svg>
                    </div>
                </div>

                <p class="pt-4 text-lg text-center">
                    You will be able to
                    <b class="accent">access your link</b>
                    by clicking on
                    <b class="accent">your profile</b>!
                </p>
                <button on:click={handleClick} class="button button-brand mt-6">
                    Finish
                </button>
            </div>-->

            <!--<div class="card pt-8 pb-8 px-10 w-100% mx-5 w-full md:w-96">
                    <p class="leading-7">
                        - Each person that will
                        <b>create an account</b>
                        with your link will get
                        <b>20%</b>
                        of reward
                        <b>boost</b>
                        for one month.
                        <br />
                    </p>
                    <p class="mt-1">
                        -
                        <u>You</u>
                        will also get
                        <b>20%</b>
                        of
                        <b>what they win</b>! Everyone wins!
                    </p>
                    <div
                        class="text-background bg-font py-4 px-4 mt-7 flex justify-between items-center rounded overflow-x-scroll w-full ">
                        <p class="leading-none">{generatedLink}</p>
                        <svg
                            class="fill-current text-primary w-5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"><path
                                d="m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z" />
                            <path
                                d="m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z" />
                            <path
                                d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z" /></svg>
                    </div>
                    <p class="pt-4 text-lg text-center">
                        You will be able to
                        <b class="accent">access your link</b>
                        by clicking on
                        <b class="accent">your profile</b>!
                    </p>
                </div>-->
        {/if}
    </div>
</div>
