<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    export let user = {};
    export let quests = {};

    let guides = {
        "ADBLOCK-like": {
            steps: [
                "Click on your adblocker extension icon",
                "Click on the button to turn it off on this website",
                "That's it!"
            ],
            opened: false
        },
        "Opera native adblocker": {
            steps: [
                "Click on the shield icon next to the page URL",
                "Click on the button to turn it off on this website",
                "That's it!"
            ],
            opened: false
        },
        "Kaspersky native adblocker": {
            steps: [
                "On your windows task bar, click on the arrow icon",
                "Click on the kaspersky total security icon",
                "In the kaspersky app, click on the settings icon",
                "Then access the PROTECTION tab",
                "Scroll down and chose \"Anti Banner\", then click on \"Website with allowed banners\"",
                "Then add the website URL to the \"Website with allowed banner\" list",
                "Click the OK button",
                "Then press SAVE",
                "That's it!"
            ],
            opened: false
        }
    };
    let adblocker = false;
    onMount(() => {
        //Adblock detector
        setTimeout(() => {
            if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
                if (!window.hasAdblockerDisabled) {
                    //Is blocking ads
                    adblocker = true;
                }
            }
        }, 7000);
    });
</script>

<style>
    /*    ol {
            counter-reset: item;
        }
        ol li::before {
            content: counter(item) ". ";
            counter-increment: item;
            @apply text-primary mr-4;
        }*/
</style>

<svelte:head>
    <script src="/ad-blocker.js" type="text/javascript"></script>
</svelte:head>

{#if adblocker}
    <!--<div class="text-legendary">Please disable your adblocker, we use ads revenue to gift you free items :)</div>-->
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
         style="z-index: 100"
         in:fade={{duration: 200}}
         out:fade={{duration: 350}}>

        <div
            class="max-w-xl    mx-5 my-1 md:mx-0  pl-6 pr-2 md:px-12 pt-10 pb-8    bg-variant    border-2 border-legendary  rounded-lg    overflow-y-scroll md:overflow-y-auto scrollbar"
            style="max-height: 95vh;"
            transition:fly={{ y: 300, duration: 350 }}>

            <h1 class="text-5xl md:text-6xl text-center text-font">Please disable your adblocker</h1>
            <p class="mt-7    text-3xl md:text-4xl text-green text-center leading-8">We use ads revenue to make this
                website happen!</p>

            <p class="mt-6    text-default md:text-2xl text-primary    leading-7">Here are some guides to help you turn
                off your adblocker!</p>

            <div class="mt-1 /px-1" style="padding: 0 0.10rem">
                {#each Object.entries(guides) as [key, value]}
                    <div class="w-full  py-1 text-2xl text-font flex justify-between items-center">

                        <!--Text + arrow-->
                        <div class="w-full">
                            <button
                                class="w-full flex justify-between items-center  focus:outline-none"
                                on:click={() => guides[key].opened = !guides[key].opened}>

                                {key}

                                {#if value.opened}
                                    <svg class="w-4 h-6 fill-current"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z" />
                                    </svg>
                                {:else}
                                    <svg
                                        class="w-4 h-6 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
                                    </svg>
                                {/if}
                            </button>
                        </div>

                    </div>

                    <!--Cookie description-->
                    {#if value.opened}
                        <div class="ml-8 mb-5  text-default text-light">
                            <ol class="list-outside list-decimal">
                                {#each value.steps as step}
                                    <li class="mt-2 text-primary">
                                        <b class="font-normal text-light">
                                            {step}
                                        </b>
                                    </li>
                                {/each}
                            </ol>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>

    </div>
{/if}