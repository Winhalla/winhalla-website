<script>
    import GameModeCards from "../../components/GameModeCards.svelte";
    import Quests from "../../components/Quests.svelte";
    import GuideCard from "../../components/GuideCard.svelte";
    import {onMount} from "svelte"
    import {callApi} from "../../utils/api";

    let quests;
    let error;
    let gameModesError;
    let gameModes;
    let errorDetailsOpen = false
    onMount(async () => {
        gameModes = [
            {
                name: "ffa",
                description: "Fight against <b>9</b> players!",
                goal:
                    "Be the one who has the <b>most wins</b> out of <b>10 games</b>!",
                duration: "<b>30</b> - <b>50</b> minutes",
                available: false
            },
            {
                name: "2vs2",
                description: "Fight against an other <b>team</b>!",
                goal:
                    "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
                duration: "<b>20</b> - <b>30</b> minutes",
                available: false
            }
        ];

        try {
            //Check which game mode is enabled in config, and then adapt the property available of gameModes object.
            let gameModesStatus = await callApi("get", "/status");
            if (gameModesStatus instanceof Error && gameModesStatus.response.status !== 403) {
                gameModesError = `<p class='text-accent'>Wow, unexpected error occured while processing gamemodes data, details for geeks below.</p> <p class="text-2xl mt-4">Note : We'll fix this ASAP. But let us finish our cup of tea first </p><p class='text-2xl text-light'>${gameModesStatus.toString()}</p>`
            }
            if (gameModesStatus && !gameModesError) {
                gameModesStatus = gameModesStatus.find(
                    s => s.name === "GAMEMODES STATUS"
                );
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
            if (quests instanceof Error && quests.response.status !== 403) throw quests
            if (quests instanceof Error && quests.response.status === 403) return
            quests = quests.solo;

            if (!quests.lastDaily || !quests.lastWeekly) {
                quests = await callApi("get", "/solo");
                if (quests instanceof Error && gameModesStatus.response.status !== 403) throw quests
                quests = quests.solo;
            }
        } catch
            (err) {
            if (err.response) {
                if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                    error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"
                    return

                } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                    error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)"
                    return

                }
            }
            error = `<p class='text-accent'>Wow, unexpected error occured while processing quests data, details for geeks below.</p><p class="text-2xl mt-4">Note : This often means that an incompetent trainee broke something, let us fire him, then fix this ASAP</p> <p class='text-xl text-light mt-2'>${err.toString()}</p>`

        }
    })
</script>

<svelte:head>
    <title>Play | Winhalla</title>
    <meta
            name="description"
            content="Play Brawlhalla. Earn rewards. | Legit & Free In-Game objects!
        | Exchange here your coins into rewards | Winhalla Shop page "/>
</svelte:head>
{#if gameModesError && error}
    <div class="w-full content-center lg:mt-60 mt-25">
        <div class="text-center">
            <h2 class="lg:text-5xl text-3xl text-center text-legendary">Woooow, this page entirely crashed. Did you
                broke grandma's porcelain bowls ?</h2>
            <h3 class="text-center lg:text-3xl text-2xl"><a href="/" class="underline text-primary">Wanna go to
                homepage</a> then ?</h3>
            <p class="text-light text-center pt-10">If this occurs regularly, maybe clear your cookies and cache. <br>
                If nothing works, just wait! we are surely working on an <b class="text-primary font-normal">AMAZING
                    UPDATE</b></p>
        </div>
        <div class="font-normal cursor-pointer button text-center"
             on:click={()=>{errorDetailsOpen = !errorDetailsOpen}}>Click for details
        </div>
        <p class:hidden={!errorDetailsOpen} class="text-light">{@html error} <br><br> {@html gameModesError}</p>
    </div>
{:else}
    <div class="lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full">
        <div class="text-center lg:text-left">
            <h1 class="text-6xl leading-snug lg:leading-normal">
                Choose a game mode
            </h1>
        </div>

        <div
                class="flex flex-col items-center lg:items-start lg:flex-wrap
        lg:flex-row">

            {#if gameModesError}
                <div class="lg:w-40% content-center lg:mt-60 mt-25 pb-20">
                    <h2 class="lg:text-3xl text-2xl text-center">{@html gameModesError}</h2>
                </div>
            {:else if gameModes}
                <div
                        class="lg:mb-10 lg:mr- mt-10 text-center
            flex flex-col items-center md:flex-row lg:items-start">
                    <GameModeCards {gameModes}/>
                </div>
            {/if}
            <div class="pb-16">
                {#if error}
                    <div class="w-full content-center lg:mt-60 mt-25 ">
                        <h2 class="lg:text-3xl text-2xl text-center">{@html error}</h2>
                    </div>
                {:else if quests}
                    <Quests data={quests}/>
                {/if}
            </div>
        </div>
    </div>
    <GuideCard page="ffa"/>
{/if}