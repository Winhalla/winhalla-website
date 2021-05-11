<script>
    import PlayAdButton from "./PlayAdButton.svelte";
    import { fade, fly } from "svelte/transition";

    let randomInfo = Math.floor(Math.random() * 2);

    export let socket;
    export let userPlayer;
    export let id;
    export let adError;
    export let info;

    let finished;
</script>

<style>
    b {
        @apply font-normal text-primary;
    }

    strong {
        @apply font-normal text-green;
    }
</style>

{#if !finished}
    <div class="sm:flex absolute top-0 bottom-0 left-0 right-0 z-10 overflow-x-hidden">

        <!--TRANSPARENT PART-->
        <div class="hidden md:block md:w-1/4 lg:w-1/2 2xl:w-3/5 bg-background bg-opacity-70"
             out:fade={{duration: 350}}></div>
        <!--<svg class="hidden lg:block inset-y-0 h-full w-48 absolute text-primary transform translate-x-1/2 right-1/2" fill="currentColor"
             viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" xstyle="margin-right: -10.2rem">
            <polygon class="border-l border-primary" points="50,0 100,0 50,100 0,100"></polygon>
        </svg>
        <svg class="hidden lg:block inset-y-0 h-full w-48 z-10 text-background transform translate-x-1/2" fill="currentColor"
             viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon class="border-l border-primary" points="50,0 100,0 50,100 0,100"></polygon>
        </svg>-->

        <!--TEXT-->
        <div class="bg-background w-full md:w-3/4  lg:w-1/2   2xl:w-2/5    h-full   md:border-l-2 border-primary"
             in:fly={{x: 500, duration: 400}} out:fly={{x: 500, duration: 350}}>
            <div class="sm:flex sm:flex-col items-center justify-between mx-7 h-full">
                <div class="text-center md:text-left">
                    <h1 class=" text-6xl   mt-8 sm:mt-13">MULTIPLY YOUR REWARDS</h1>
                    <p class="text-3xl mt-7 lg:mt-12 max-w-md   ">Want to obtain a first <b>x5 boost</b> on the
                        <b>coins</b>
                        you
                        will
                        <b>win</b> by playing this match?</p>
                    <p class="text-2xl mt-4 text-mid-light italic">Watch a short video by clicking the button below!</p>
                </div>
                {#if randomInfo == 1}
                    <div class="card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10"
                         style="max-width: 27.5rem">
<!--                        <p class="mb-4 text-4xl text-primary">Did you know?</p>-->
                        <p>Watching at least <strong>2 videos per match</strong> will <u>divide</u> the time to earn a
                            reward by <strong style="color: #fc1870">10</strong>
                    </div>
                {:else}
                    <div class="card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10"
                         style="max-width: 27.5rem">
<!--                        <p class="mb-4 text-4xl text-primary">Did you know?</p>-->
                        <p>Watching <strong>2 videos</strong> this match will raise your rewards by <strong style="color: #fc1870"> 600%</strong>
                    </div>
                {/if}


                <div class="mt-12 sm:mt-0 sm:mb-24">
                    <div class="mt-4 flex flex-col items-center sm:items-start sm:flex-row">
                        <PlayAdButton socket={socket} id={id} page="FfaWatchAd" bind:userPlayer={userPlayer}
                                      bind:adError={adError} bind:info={info} bind:finished={finished} />
                        <button class="button button-brand mt-5 sm:mt-0 mb-1"
                                style="background-color: #fc1870; padding: 0.75rem 1.5rem"
                                on:click={() => finished = true}>
                            Continue
                            to match
                        </button>
                    </div>
                </div>

            </div>

        </div>
    </div>
{/if}
