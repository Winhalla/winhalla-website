<script>
    import { callApi } from "../utils/api";

    let status = ""
    let password = ''
    let username = ''
    async function createAccount(){
        const result = await callApi('post',`/auth/createEmailPassword?username=${username}&password=${password}`)
        if(result instanceof Error && result.response.status >=400 && result.response.status < 499) status = result.data
    }
</script>
<style>
    input {
        @apply w-full text-background bg-font py-3 px-4 rounded;
    }
</style>
<div >
    <input type="text" class="text-black" bind:value={username} placeholder="Username">
    <input type="password" class="text-black"  bind:value={password} placeholder="Password">
    <button on:click={createAccount}>Create Account</button>
    <div class="text-legendary" class:hidden={!status}>{status}</div>
</div>