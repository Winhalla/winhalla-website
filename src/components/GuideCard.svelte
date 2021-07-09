<script>
    import { fly } from "svelte/transition";

    import cookie from "cookie";
    import { getCookie } from "../utils/getCookie";
    import { onMount } from "svelte";
    import Infos from "./Infos.svelte";
    import Checkbox from "./Checkbox.svelte";

    let heplsArray = ['Only 1v1 or 2v2 <span class="text-primary">ranked games</span> will count',
        'You have to play at least <span class="text-primary">1 game</span> to qualify for rewards',
        'Click on Refresh Data <span class="text-primary">after each game</span> (It might not work everytime, it usually refreshes after the 7th game)',
        'Once you have played <span class="text-primary">7 games</span>, you can start another match']

    export let page = "";
    let isCardVisible = false;
    let hiddenCardsList;

    onMount(() => {
        hiddenCardsList = JSON.parse(decodeURI(getCookie("hideCards")).replace(/%2C/g, ","));

        if (!hiddenCardsList || !hiddenCardsList.includes(page)) isCardVisible = true;
    });


    function handleClose() {
        isCardVisible = false;

        if (hiddenCardsList) {
            !hiddenCardsList.includes(page) ? hiddenCardsList.push(page) : null;
        } else {
            hiddenCardsList = [page];
        }

        document.cookie = cookie.serialize(
            "hideCards",
            JSON.stringify(hiddenCardsList),
            {
                maxAge: 15552000,
                sameSite: "lax",
                path: "/"
            }
        );

    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

    b {
        color: #3d72e4;
        font-weight: 400;
    }
</style>

{#if isCardVisible}
    <div class="fixed z-50 top-0 bottom-0 left-0 right-0 flex w-screen h-screen">
        <div class="mx-auto my-auto w-full top px-5 md:px-0 w-screen md:w-screenw-90" transition:fly={{ y: 300, duration: 350 }}>
            <div
                class="w-full max-h-screen-85   border border-primary rounded-lg bg-background    flex flex-col justify-center">

                <div class="overflow-y-auto scrollbar p-2 md:p-10 pb-7">
                    <div class="flex justify-between">
                        <div></div>
                        <button class="p-4 text-mid-light hover:text-font"
                                on:click={() => handleClose()}>
                            <svg class="fill-current w-4 md:w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                            </svg>
                        </button>
                    </div>
                    {#if page === "play"}
                        <h2 class="text-center text-5xl">PLAY PAGE GUIDE</h2>

                        <section class="md:flex justify-between mt-8">
                            <div>
                                <p class="text-3xl text-legendary">Game modes section</p>
                                <p><b>Click </b> on the game mode <b>you want to play</b> !</p>
                            </div>
                            <img class="w-full mt-2 md:mt-0 md:w-1/2 md:h-41 object-cover"
                                 src="/assets/GuidesImages/game_modes_section.png"
                                 alt="Game modes section">
                        </section>

                        <section class="md:flex justify-between mt-16 mb-4">
                            <img class="hidden md:block w-1/2 h-41 object-cover object-left-top"
                                 src="/assets/GuidesImages/quests_section.png"
                                 alt="">
                            <div class="md:ml-10">
                                <p class="text-3xl text-legendary">Quests section</p>
                                <p>Here you will find the <b>quests</b> that Winhalla proposes. <b>Complete them</b> by
                                    playing
                                    Brawlhalla, and you will <b>earn</b> W coins!
                                    <br> <span class="text-xl leading-tight italic text-mid-light">Click or hover on a quest to see how much you will earn</span>
                                </p>
                            </div>
                            <img class="md:hidden block w-full mt-5"
                                 src="/assets/GuidesImages/quests_section.png"
                                 alt="Quests section">
                        </section>
                    {:else if page === "ffa"}
                        <h2 class="text-center text-5xl">SOLO MATCHES GUIDE</h2>
                        <ul class="mt-7 lg:ml-108 text-2xl pr-2 flex flex-col justify-between">
                            {#each heplsArray as text,i}
                                <li class="flex items-center {i > 0?'mt-5 lg:mt-4':''}">
                                    <Checkbox />
                                    <p>{@html text}</p>
                                </li>
                            {/each}
                        </ul>
                    {/if}


                    <button class="button button-brand mt-10 w-full"
                            on:click={() => handleClose()}>LET'S
                        GO!
                    </button>
                </div>

            </div>
        </div>


    </div>
{:else}
    <div class="flex lg:block justify-center">
        <button class="lg:absolute bottom-0  flex items-center  mx-24 md:mx-0 py-3 focus:outline-none"
                in:fly={{ y: 100, duration: 400 }} out:fly|local={{ y: 100, duration: 900 }}
                on:click={() => isCardVisible = true}>

            <div class="py-2 px-2 rounded-full bg-primary mb-1">
                <svg
                    class="w-3 h-3 fill-current my-auto"
                    viewBox="0 0 17 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z" />
                </svg>
            </div>

            <div class="ml-2 text-xl">
                Show guide
            </div>
        </button>
    </div>

{/if}

