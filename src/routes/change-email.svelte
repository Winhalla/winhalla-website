<script>
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";
    import { counter } from "../components/store";

    let account;
    let email;
    let valid = false;

    function onKeyPress() {
        setTimeout(async () => {
            //Mettre un checker email
            let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
            let exec = regex.exec(email);
            if (exec) valid = true;
            else valid = false;
        }, 1);
    }

    let user;
    onMount(()=>{
        let unsub = counter.subscribe(async (value) => {
            user = value.content
            if (user.then) {
                user.then((values) => {
                    if (!values.user) {
                        goto('/')
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


    async function onClick() {
        await callApi("post", `/auth/changeEmail?email=${email}`);
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
    <title>Change email | Winhalla</title>
</svelte:head>
<div class="p-8">
    <h2>Email</h2>
    <input on:keydown={onKeyPress} size="100" id="test" bind:value={email} class="text-black p-1" />

    {#if valid}
        <p class="text-green-700">VALID EMAIL</p>
    {:else}
        <p class="text-red-700">INVALID EMAIL</p>
    {/if}

    <br />
    <button disabled={!valid} on:click={onClick} class="px-4 py-1 mt-4 bg-primary rounded">
        Create account
    </button>
</div>
