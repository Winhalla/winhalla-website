<script>
    import GameModeCards from "../../components/GameModeCards.svelte";
    import Quests from "../../components/Quests.svelte";
    import GuideCard from "../../components/GuideCard.svelte";
    import { onMount } from "svelte";
    import { callApi } from "../../utils/api";
    import Loading from "../../components/Loading.svelte";
    import AdblockAlert from "../../components/AdblockAlert.svelte";
    import { goto } from "@sapper/app";
    import { apiUrl } from "../../utils/config";
    import { counter } from "../../components/stores";
    import Infos from "../../components/Infos.svelte";
    import GuideContainer from "../../components/GuideContainer.svelte";
    import {guideHandlerSetPage, guideHandlerStore} from "../../components/guideStore";

    let quests;
    let error;
    let gameModesError;
    let gameModes;
    let errorDetailsOpen = false;
    let info;

    //guides
    let currentGuide;

    onMount(async () => {
        let params = new URLSearchParams(window.location.search);
        if (params.get("reloadNav"))
            counter.set({ refresh: true });
        if (params.get("hasEndedMatch")) {
            setTimeout(() => {
                info = { pushError: "You can now start another one", message: "Match exited successfully" };
            }, 750);
            setTimeout(() => {
                info = null;
            }, 5000);
        }
        gameModes = [
            {
                name: "ffa",
                displayName: "Solo",
                description: "Fight against <b>7</b> players!",
                goal:
                    "Be the one who has the <b>most wins</b> out of <b>7 games</b>!",
                duration: "<b>30</b> - <b>50</b> minutes",
                available: true
            },
            {
                name: "2vs2",
                displayName: "Duos",
                description: "Fight against an other <b>team</b>!",
                goal:
                    "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
                duration: "<b>20</b> - <b>30</b> minutes",
                available: true
            }
        ];

        try {
            //Check which game mode is enabled in config, and then adapt the property available of gameModes object.
            let gameModesStatus = await callApi("get", "/GMStatus");
            if (gameModesStatus instanceof Error && gameModesStatus.response.status !== 403) {
                gameModesError = `<p class="text-accent">Wow, an unexpected error occurred while processing gamemodes data, details for geeks below.</p> <p class="text-2xl mt-4">Note : This will be fix as fast as possible!</p><p class="text-2xl text-light">${gameModesStatus.toString()}</p>`;
            }
            if (gameModesStatus && !gameModesError) {
                gameModesStatus = gameModesStatus.value;
                Object.keys(gameModesStatus).forEach(gameModeName => {
                    const gameMode = gameModes.find(
                        g => g.name === gameModeName.toLowerCase()
                    );
                    gameMode.available = gameModesStatus[gameModeName];
                    gameModes = gameModes;
                });
            }

            //Load quests for user
            quests = await callApi("get", "/getSolo");
            if (quests instanceof Error && quests.response.status === 403) await goto(`/login`);

            if (!quests.solo.lastDaily || !quests.solo.lastWeekly) {
                quests = await callApi("get", "/solo");
                if (quests instanceof Error && gameModesStatus.response.status !== 403) throw quests;
                quests = quests.solo;
            } else {
                quests = quests.solo;
            }


            //guides
            guideHandlerSetPage("play");
            guideHandlerStore.subscribe(value => {
                currentGuide = value.current;
            });

        } catch
            (err) {
            console.log(err);
            if (err.response) {
                if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                    error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
                    return;

                } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                    error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
                    return;

                }
            }
            error = `<p class="text-accent">Oops, a problem occurred when loading Quests data :(</p><p class="text-2xl mt-4">Note : Try to login or try to reload the page!</p> <p class="text-xl text-light mt-2">${err.toString()}</p>`;

        }

    });
</script>

<svelte:head>
    <title>Play - Winhalla, Play Brawlhalla. Earn rewards.</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards. | Legit & Free In-Game objects!
        | Choose your gamemode here | Winhalla Play page" />
    <script
        src="https://cdn.purpleads.io/load.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
        id="purpleads-client"></script>
</svelte:head>
{#if (!quests || (!quests.lastDaily || !quests.lastWeekly)) && (!gameModesError && !error)}
    <div>
        <Loading duration={500} />
    </div>
{/if}
{#if gameModesError && error}
    <div class="w-full lg:mt-60 mt-25">

        <div class="text-center">
            <h2 class="lg:text-5xl text-3xl text-center text-legendary">Woooow, this page entirely crashed</h2>
            <h3 class="text-center lg:text-3xl text-2xl"><a href="/" class="underline text-primary">Wanna go to
                homepage</a> then ?</h3>
            <p class="text-light text-center pt-10">If this occurs regularly, maybe clear your cookies and cache. <br>
                If nothing works, just wait (and report this bug)! we are surely working on an <b
                    class="text-primary font-normal">AMAZING
                    UPDATE</b></p>
        </div>
        <div class="font-normal cursor-pointer button text-center"
             on:click={()=>{errorDetailsOpen = !errorDetailsOpen}}>Click for details
        </div>
        <p class:hidden={!errorDetailsOpen} class="text-light">{@html error} <br><br> {@html gameModesError}</p>
    </div>
{:else}
    <AdblockAlert quests={quests} />
    <div class="lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full">
        <div class="text-center lg:text-left">
            <h1 class="text-6xl leading-snug lg:leading-normal  {currentGuide === 'game_modes' ? 'z-60  relative' : ''}">
                Choose a game mode
            </h1>
        </div>
        {#if quests}
            {#if window.innerWidth < 1024}
                <div class="flex w-full">
                    <a href="/play#quests" class="button mx-auto button-brand">Go to quests</a>
                </div>
            {/if}
        {/if}
        <div
            class="flex flex-col items-center lg:flex-wrap
        lg:flex-row xl:items-start">

            {#if gameModesError}
                <div class="lg:w-40% z-50 content-center lg:mt-60 mt-25 pb-20">
                    <h2 class="lg:text-3xl text-2xl text-center">{@html gameModesError}</h2>
                </div>
            {:else if gameModes}
                <div class="{currentGuide === 'game_modes' ? 'z-60  relative' : ''}">
                    <div
                            class="lg:mb-10 lg:mr- mt-10 text-center
            flex flex-col items-center md:flex-row lg:items-start">
                        <GameModeCards {gameModes} />
                    </div>

                    {#if currentGuide === "game_modes"}
                        <div class="absolute z-60  right-0  bottom-0         ">
                            <GuideContainer title="Game modes" previous={false}>
                                <div class="mt-1">
                                    <p class="text-3xl">Here you can find <b class="font-normal text-primary">the list</b> of the <b class="font-normal text-epic">Winhalla <br>game modes</b>
                                        with their description</p>
                                    <p class="mt-3 text-default text-mid-light italic">Note: these game modes are <b class="font-normal text-primary">unrelated</b> to
                                        <br><b class="font-normal text-primary">Brawlhalla game modes</b></p>
                                </div>
                            </GuideContainer>
                        </div>

                    {/if}

                </div>

            {/if}
            <div class="pb-8 lg:pb-16 flex-grow lg:-ml-15     /bg-background   {currentGuide === 'quests' ? 'z-60  relative' : ''}">
<!--
                <div class="h-screen-90 w-full  -top-32 absolute  bg-background " style="z-index: -1"></div>
-->
                {#if error}
                    <div class="px-5 w-full content-center md:mt-15  lg:px-0  w-full">
                        <h2 class="lg:text-3xl text-2xl text-center">{@html error}</h2>
                    </div>
                {:else if quests}
                    <!--{#if !quests.lastDaily || !quests.lastWeekly}
                        <div out:fade={{duration:1000}} class="z-20">
                            <Loading type="inline" />
                        </div>
                    {/if}-->
                    {#if quests.lastDaily && quests.lastWeekly}
                        <div id="quests" class="relative bottom-10"></div>
                        <div class="lg:ml-15">
                            <Quests data={quests} currentGuideVisible="{currentGuide}"/>
                        </div>
                    {/if}

                {/if}
            </div>
        </div>
        <GuideCard page="play" />
        <div class="mt-6">
            <script
                src="https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
                data-pa-tag async></script>
        </div>
    </div>
{/if}
{#if info}
    <Infos {...info} />
{/if}
