<style>
    .text-3xl1{
        font-family: Roboto Condensed, sans-serif;
        @apply text-2xl font-bold;
    }
</style>

<script>
    import cookie from "cookie";
    import {onMount} from "svelte";
    import {getCookie} from "../utils/getCookie";
    let isOpen = false;
    onMount(()=>{
        let acceptedCookies = getCookie("acceptedCookies")
        if (!acceptedCookies) isOpen = true;
        else if (acceptedCookies !== "false") window.yett.unblock();
    })
    function acceptCookies(){
        isOpen = false;
        window.yett.unblock();
        document.cookie = cookie.serialize("acceptedCookies",
            "true",
            {
                maxAge: 2147483647,
                sameSite: "lax",
                path: "/"
            })
    }
    function declineCookies(){
        isOpen = false;
        document.cookie = cookie.serialize("acceptedCookies",
            "false",
            {
                maxAge: 2147483647,
                sameSite: "lax",
                path: "/"
            })
    }
</script>
{#if isOpen}
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-background bg-opacity-70 flex justify-center items-center z-60">
        <div class="bg-variant rounded-3xl px-7 pb-8 pt-7" style="max-width: 32rem;">
            <div class="flex justify-end cursor-pointer" on:click={acceptCookies}>
                <svg class="w-10 cursor-pointer" viewBox="0 0 24 24" fill="#BEBEC2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                </svg>
            </div>
            <p class="text-5xl text-center px-5 -mt-6">Cookies</p>
            <p class="pb-10 pt-5 font-bold px-5" style="font-family: 'Roboto Condensed', sans-serif; font-size: 25px; line-height: 1.25; color: rgba(253,253,253,0.9)">
                We'd like to use optional cookies to analyze site traffic <span class="text-primary">anonymously</span>.
                This help us understand how to <span class="text-primary">improve</span> the website.
            </p>
            <div class="flex justify-around flex-grow px-7">
                <button on:click={acceptCookies} class="button button-brand text-3xl1 w-full mr-12" style="border-radius: 0.75rem; padding: 0.75rem 1.5rem;">
                    Ok
                </button>
                <button on:click={declineCookies} class="button button-brand text-3xl1 w-full" style="background-color: #000000; border-radius: 0.75rem; padding: 0.75rem 1.5rem;">
                    No thanks
                </button>
            </div>
        </div>
    </div>
{/if}