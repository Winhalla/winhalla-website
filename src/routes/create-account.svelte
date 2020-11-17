<script>
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";
    let account;
    let email;
    let link;
    let linkId;
    let validLink;
    let valid = false;

    const onKeyPressLink = () => {
        setTimeout(async () => {
            try {
                linkId = new URL(link);
                linkId = linkId.pathname.split("/")[2];
                if (linkId.length == 24) {
                    const testLink = await callApi("get", `/getLink/${linkId}`);
                    if (testLink) validLink = true;
                } else {
                    validLink = false;
                }
            } catch (err) {
                validLink = false;
            }
        }, 1);
    };

    const onKeyPressEmail = () => {
        setTimeout(() => {
            let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
            let exec = regex.exec(email);
            console.log(exec);
            if (exec) valid = true;
            else valid = false;
        }, 1);
    };

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
        @apply text-background pl-2 text-lg py-1 bg-font w-96 rounded border-2 border-transparent;
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
    <title>Change email | Winhalla</title>
</svelte:head>
<div class="flex items-center justify-center h-screen-70">
    <div class="flex flex-col items-center">
        <h1 class="text-6xl mb-8">Create your account</h1>
        <div class="mx-auto card py-8 px-10">
            <p class="input-header">Email</p>
            <div>
                <input
                    on:keydown={onKeyPressEmail}
                    type="email"
                    bind:value={email}
                    class="input-style focus:outline-none focus:border-primary" />

                {#if valid}
                    <div class="flex items-center">
                        <svg
                            class="fill-current text-green w-4 check"
                            viewBox="0 0 33 24"
                            xmlns="http://www.w3.org/2000/svg"><path
                                d="m0 10.909 4.364-4.364 8.727 8.727 15.273-15.273 4.364 4.364-19.636 19.636z" /></svg>
                        <p class="text-green info">VALID EMAIL</p>
                    </div>
                {:else}
                    <p class="text-legendary info ">INVALID EMAIL</p>
                {/if}
            </div>

            <p class="pt-6 text-3xl input-header">Friend link</p>
            <div>
                <input
                    on:keydown={onKeyPressLink}
                    bind:value={link}
                    class="input-style focus:outline-none focus:border-primary" />
                {#if validLink}
                    <p class="text-green info">VALID INPUT</p>
                {:else}
                    <p class="text-legendary info">INVALID INPUT</p>
                {/if}
            </div>
        </div>
        <button
            disabled={!valid}
            on:click={onClick}
            class="button button-brand mt-6">
            Create account
        </button>
    </div>
</div>
