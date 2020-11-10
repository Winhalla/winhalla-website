<script>
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";
    let account;
    let email;
    let link;
    let linkId;
    let valid;
    function onKeyPress(e) {
        setTimeout(async () => {
            try {
                linkId = new URL(link);
                console.log(linkId.pathname);
                linkId = linkId.pathname.split("/")[2];
                if (linkId.length == 24) {
                    const testLink = await callApi("get", `/getLink/${linkId}`);
                    if (testLink) valid = true;
                } else {
                    valid = false;
                }
            } catch (err) {
                valid = false;
            }
        },100);
    }
    onMount(async () => {
        account = await callApi("get", "/account");
        if (account.user) goto("/");
    });
    async function onClick() {
        try {
            linkId = new URL(link);
            linkId = linkId.pathname.split("/")[2];
            await callApi("post",`/auth/createAccount?email=${email}&linkId=${linkId}`);
            goto("/");
        } catch (err) {
            console.log(err);
        }
    }
</script>

<svelte:head>
    <title>Create account | Winhalla</title>
</svelte:head>
<div class="p-8">
    <h2>Email</h2>
    <input size="100" id="test" bind:value={email} class="text-black p-1" />
    <h2 class="pt-8">Friend link</h2>
    <input
        on:keydown={onKeyPress}
        size="100"
        bind:value={link}
        class="text-black p-1" />
    {#if valid}
        <p class="text-green-700">VALID INPUT</p>
    {:else}
        <p class="text-red-700">INVALID INPUT</p>
    {/if}

    <br />
    <button on:click={onClick} class="px-4 py-1 mt-4 bg-primary rounded">
        Create account
    </button>
</div>
