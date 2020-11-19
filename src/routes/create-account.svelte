<script context=module>
    export async function preload({ params, query }) {
        let firstLink = query.link;
        return { firstLink };
    }
</script>

<script>
    export let firstLink;
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";
    let account;
    let email;
    let link = firstLink;
    let linkId;
    let validLink = null;
    let validEmail = null;
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
                        else validLink = false
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
    onMount(async () => {
        account = await callApi("get", "/account");
        //if (account.user) goto("/");
    });

    const onClick = async () => {
        try {
            linkId = new URL(link);
            linkId = linkId.pathname.split("/")[2];
        } catch (err) {
            console.log(err);
        }
        await callApi(
            "post",
            `/auth/createAccount?email=${email}&linkId=${linkId}`
        );
        goto("/");
    };
</script>

<style>
    input {
        @apply text-background pl-2 text-lg py-1 bg-font rounded border-2;
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
    <meta name="description" content="This is where all starts | Create Winhalla account now and get Battle Pass and Mammoth Coins FOR FREE">
</svelte:head>
<div>
    <div class="flex items-center justify-center md:h-screen-70">
        <div class="flex flex-col items-center px-5 pt-8">
            <div class="text-center lg:text-left">
                <h1
                    class="text-6xl mb-8 lg:mb-8 leading-snug lg:leading-normal
                    lg:">
                    Create your account
                </h1>
            </div>

            <div class="card pt-8 pb-11 px-10 w-100% mx-5 w-full">
                <p class="input-header">Email</p>
                <div>
                    <input
                        on:keydown={onKeyPressEmail}
                        type="email"
                        bind:value={email}
                        class:border-legendary={validEmail == false}
                        class="input-style focus:outline-none
                        focus:border-primary w-full md:w-96" />

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
                        focus:border-primary w-full md:w-96" />
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
                on:click={onClick}
                class="button button-brand mt-6">
                Create account
            </button>
        </div>
    </div>
</div>
