<script>
    import { apiUrl } from "../utils/config";
    import { callApi } from "../utils/api";
    import { goto } from "@sapper/app";

    let isLoggingIn;
    let usernameSent;
    let username;
    let password;
    let action = "login";
    let status;
    let accountCreated = false;

    function startLogin() {
        isLoggingIn = true;
    }

    async function switchToCreateAccount() {
        action = action === "login" ? "createAccount" : "login";
    }

    async function createAccount() {
        if (action === "createAccount") {
            const result = await callApi("post", `/auth/createEmailPassword?username=${username}&password=${password}`);
            if (result instanceof Error) return status = result.response.data;
            action = "login";
            accountCreated = true;
        } else {
            const result = await callApi("post", `/auth/login/local?username=${username}&password=${password}`);
            if(result instanceof Error) return status = result.response.data;
            goto("/referral-link?needBrawlhallaID=true")
        }
    }
</script>
<style>
    input {
        @apply text-background bg-font py-3 px-4 rounded;
        font-family: 'Roboto', sans-serif;
    }
</style>
<div class="h-full w-full flex items-center justify-center mt-10">
    {#if !isLoggingIn}
        <div class="mt-48 flex flex-col">
            <h2 class="text-6xl text-center  mb-10">LOGIN</h2>
            <p class="font-ultra-light text-green text-center text-lg mt-1">
                Recommended for PC players
            </p>
            <a
                class="button-brand button text-center"
                href="{apiUrl}/auth/login/steam">
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fdfdfd" xmlns:xlink="http://www.w3.org/1999/xlink"
                         version="1.1" id="mdi-steam"
                         class="w-7" viewBox="0 0 24 24">
                        <path
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C7.4,22 3.55,18.92 2.36,14.73L6.19,16.31C6.45,17.6 7.6,18.58 8.97,18.58C10.53,18.58 11.8,17.31 11.8,15.75V15.62L15.2,13.19H15.28C17.36,13.19 19.05,11.5 19.05,9.42C19.05,7.34 17.36,5.65 15.28,5.65C13.2,5.65 11.5,7.34 11.5,9.42V9.47L9.13,12.93L8.97,12.92C8.38,12.92 7.83,13.1 7.38,13.41L2,11.2C2.43,6.05 6.73,2 12,2M8.28,17.17C9.08,17.5 10,17.13 10.33,16.33C10.66,15.53 10.28,14.62 9.5,14.29L8.22,13.76C8.71,13.58 9.26,13.57 9.78,13.79C10.31,14 10.72,14.41 10.93,14.94C11.15,15.46 11.15,16.04 10.93,16.56C10.5,17.64 9.23,18.16 8.15,17.71C7.65,17.5 7.27,17.12 7.06,16.67L8.28,17.17M17.8,9.42C17.8,10.81 16.67,11.94 15.28,11.94C13.9,11.94 12.77,10.81 12.77,9.42A2.5,2.5 0 0,1 15.28,6.91C16.67,6.91 17.8,8.04 17.8,9.42M13.4,9.42C13.4,10.46 14.24,11.31 15.29,11.31C16.33,11.31 17.17,10.46 17.17,9.42C17.17,8.38 16.33,7.53 15.29,7.53C14.24,7.53 13.4,8.38 13.4,9.42Z" />
                    </svg>
                    <p class="ml-2">Login with Steam</p>
                </div>
            </a>
            <p class="font-ultra-light text-legendary text-center text-lg mt-1">
                Only for pc players
            </p>
            <p class="font-ultra-light text-green text-center text-lg mt-9">
                Recommended for console/mobile players
            </p>
            <a
                class="button-brand-alternative button mb-8"
                href="{apiUrl}/auth/login/google">
                <div class="flex justify-center">
                    <svg class="w-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google"
                         role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill="#fdfdfd">
                        <path
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            class=""></path>
                    </svg>
                    <p class="ml-3">Login with Google</p>
                </div>
            </a>
            <button
                class="button-brand-alternative button mt-5 text-center" on:click={startLogin}>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="#fdfdfd" viewBox="0 0 24 24">
                        <path
                            d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                    </svg>
                    <p class="ml-3">Login with Username/Password</p>
                </div>
            </button>
        </div>
    {:else if !usernameSent}
        <div>
            <div class="text-center md:text-left mt-7 md:mt-12">
                <h1
                    class="text-6xl mb-6 md:mb-8 leading-snug
                        md:leading-normal">
                    {action === "login" ? "Login with Username/password" : "Create account"}
                </h1>
            </div>
            <p class="text-green" class:hidden={!accountCreated}>Account created successfully, you can now login.</p>
            <input bind:value={username} class="my-4" placeholder="Enter your username">
            <p></p>
            <input bind:value={password} type="password" class="my-4" placeholder="Enter your password">
            <p></p>
            <p class:hidden={!status} class="text-legendary">{status}</p>
            <button class="button button-brand my-4" on:click={createAccount}>continue</button>
            {#if action === "login"}
                <p>Don't have an account?
                    <button class="text-primary underline" on:click={switchToCreateAccount}>create an account</button>
                </p>
                {:else}
                <p>Already have an account ?
                    <button class="text-primary underline" on:click={switchToCreateAccount}>login</button>
                </p>
            {/if}
        </div>
    {/if}

</div>