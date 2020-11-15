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
    function onKeyPressLink() {
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
    }
    function onKeyPressEmail() {
        setTimeout(() => {
        let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
        let exec = regex.exec(email);
        console.log(exec);
        if (exec) valid = true;
        else valid = false;
        },1)
    }
    onMount(async () => {
        account = await callApi("get", "/account");
        if (account.user) goto("/");
    });
    async function onClick() {
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
    }
</script>

<style>
    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }
</style>

<svelte:head>
    <title>Create account | Winhalla</title>
</svelte:head>
<div class="p-8">
    <h2>Email</h2>
    <input on:keydown={onKeyPressEmail} size="100" id="test" bind:value={email} class="text-black p-1" />
    {#if valid}
        <p class="text-green-700">VALID EMAIL</p>
    {:else}
        <p class="text-red-700">INVALID EMAIL</p>
    {/if}
    <h2 class="pt-8">Friend link</h2>
    <input
        on:keydown={onKeyPressLink}
        size="100"
        bind:value={link}
        class="text-black p-1" />
    {#if validLink}
        <p class="text-green-700">VALID INPUT</p>
    {:else}
        <p class="text-red-700">INVALID INPUT</p>
    {/if}

    <br />
    <button disabled={!valid} on:click={onClick} class="button button-brand">
        Create account
    </button>
</div>
