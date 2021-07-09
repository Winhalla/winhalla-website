<script>

    import { onDestroy, onMount } from "svelte";
    import { callApi } from "../../../utils/api";
    import { goto, stores } from "@sapper/app";

    import RefreshButton from "../../../components/RefreshButton.svelte";
    import FfaEnd from "../../../components/FfaEnd.svelte";
    import Loading from "../../../components/Loading.svelte";

    import ErrorAlert from "../../../components/ErrorAlert.svelte";
    import Infos from "../../../components/Infos.svelte";
    import GuideCard from "../../../components/GuideCard.svelte";
    import AdblockAlert from "../../../components/AdblockAlert.svelte";

    import { fade, fly } from "svelte/transition";

    import { counter } from "../../../components/store";
    import { io } from "socket.io-client";
    import { apiUrl } from "../../../utils/config";
    import PlayAdButton from "../../../components/PlayAdButton.svelte";
    import FfaWatchAd from "../../../components/FfaWatchAd.svelte";
    import Quests from "../../../components/Quests.svelte";
    import gradientGenerator from "../../../utils/gradientGenerator";
    import { getCookie } from "../../../utils/getCookie";
    import { serialize } from "cookie";

    const { page } = stores();

    let id;


    let pages;
    let user;
    let match;
    let quests;
    let isMatchEnded;
    let countDown;
    let tooltipOpen = false;

    let userPlayer;
    let players;
    let info;
    $: if (info) {
        setTimeout(() => {
            info = undefined;
        }, 5000);
    }

    let adError;
    $: if (adError) {
        setTimeout(() => {
            adError = undefined;
        }, 25000);
    }

    let isFfaWatchAdVisible = false;
    $: if (isFfaWatchAdVisible) {
        console.log(isFfaWatchAdVisible);
    }

    let error;
    let pushError;
    let socket;
    let isSpectator;
    let isLoadingOpen = true;
    let isToolTipVisible = false;
    let timerId;
    let gradientList;
    let isGamesAlertPopupOpen;

    onMount(() => {
        pages = page.subscribe(async value => {
            isSpectator = value.query.spectator === "true";
            user = undefined;
            match = undefined;
            isMatchEnded = undefined;
            userPlayer = undefined;
            players = undefined;
            error = undefined;
            socket = undefined;
            id = value.params.id;
            quests = undefined;

            if (!value.params.id && !value.path.includes("/ffa/")) return console.log("not a ffa match");
            let unsub = counter.subscribe((user1) => {
                user = user1.content;
            });
            unsub();


            try {
                //Generate gradients
                gradientList = gradientGenerator(8);

                user = await user;
                user = user.steam;
                match = await callApi("get", `/getMatch/${id}`);

                if (match instanceof Error) {
                    throw match;
                }
                isMatchEnded = match.finished;

                //Start the countdown
                filterUsers(false);
                if (userPlayer.gamesPlayed === 7) {
                    countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
                } else {
                    const d = new Date(userPlayer.joinDate);
                    const endsIn = -(
                        (new Date().getTime() -
                            new Date(d.setHours(d.getHours() + 1)).getTime()) /
                        1000
                    );
                    if (endsIn < 1) {
                        countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
                    } else {
                        startTimer(endsIn);
                    }
                }


                counter.set({ "refresh": true });

                socket = io(apiUrl);
                socket.on("connection", (status) => {
                    console.log(status);
                    socket.emit("match connection", "FFA" + id);
                });

                socket.on("join match", (status) => {
                    console.log(status);
                });

                socket.on("lobbyUpdate", (value) => {
                    match = value;
                    filterUsers(true);
                });
                if (!isMatchEnded) {
                    quests = await callApi("get", "/getSolo");
                    quests = quests.solo;
                }
                isLoadingOpen = false;
            } catch (err) {
                console.log(err);
                if (err.response) {
                    if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                        error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
                        return;
                    } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                        error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
                        return;
                    } else if (err.response.status === 404) error = "<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>";
                    return;
                }
                error = `<p class="text-accent">Wow, unexpected error occured, details for geeks below.</p> <p class="text-2xl">${err.toString()}</p>`;
            }


        });
    });

    onDestroy(() => {
        if (pages) pages();
    });


    const filterUsers = (isFromSocket) => {
        //Find user's object
        if (isSpectator === true) {
            players = [...match.players];
            userPlayer = players.splice(0, 1)[0];
            return;
        }
        if (!isFromSocket) {
            userPlayer = match.players.find(p => p.steamId === user.id);
        } else {
            let playerIndex = match.players.findIndex(p => p.steamId === user.id);
            match.players[playerIndex].wins = userPlayer.wins;
            userPlayer = match.players[playerIndex];
        }
        //Delete user's object from array.
        players = [...match.players];
        players.splice(
            match.players.findIndex(p => p.steamId === user.id),
            1
        );
    };

    //Function that starts a timer with a date, and refreshes it every second
    function startTimer(duration) {
        let timer = duration,
            hours,
            minutes,
            seconds;
        if (timerId) clearInterval(timerId);
        timerId = setInterval(function() {
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countDown = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
            }
        }, 1000);
    }


    //Function that handles the refresh button on click event
    let isRefreshingStats = false;
    const handleRefresh = async () => {
        isRefreshingStats = true;
        let winNb = userPlayer.gamesPlayed;

        match = await callApi("get", `/getMatch/${id}`);

        filterUsers(false);
        if (userPlayer.gamesPlayed !== winNb) {
            counter.set({ "refresh": true });
            clearInterval(timerId);
            if (userPlayer.gamesPlayed === 7) countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";

        } else if (match.finished && isMatchEnded === false) {
            isMatchEnded = true;
            counter.set({ "refresh": true });
        }
        let gamesAlert = getCookie("gamesAlertState");
        if (userPlayer.gamesPlayed === 0 && gamesAlert !== "disabled") {
            isGamesAlertPopupOpen = true;
        }
        isRefreshingStats = false;
    };
    const deactivate0GamesAlert = () => {
        isGamesAlertPopupOpen = false;
        serialize("gamesAlertState", "disabled", {
            maxAge: 15552000,
            sameSite: "lax",
            path: "/"
        });
    };
    const handleQuit = async () => {
        try {
            const exitStatus = await callApi("post", `/exitMatch`);
            if (exitStatus instanceof Error) throw exitStatus;
            goto(`/play?reloadNav=true`);
        } catch (e) {
            pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();
            setTimeout(() => {
                pushError = undefined;
            }, 8000);
        }
    };

    let isQuestsPanelOpen = false;

    function handleQuestsPanel() {
        isQuestsPanelOpen = !isQuestsPanelOpen;
    }

    async function endMatch() {
        const result = await callApi("post", "/endMatch");
        if (result instanceof Error) return;
        goto("/play?reloadNav=true&hasEndedMatch=true");
    }
</script>

<style>
    b {
        @apply text-variant font-normal;
    }

    .card {
        box-shadow: rgba(0, 0, 0, 0.55) 5px 5px 8px;
    }

    .ffa-player {
        @apply relative w-53 h-88 text-center;
    }

    .ffa-player::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
                to bottom,
                rgba(23, 23, 26, 0.25) 0%,
                rgba(23, 23, 26, 0.39),
                rgba(23, 23, 26, 0.33) 75%,
                rgba(23, 23, 26, 0.38) 100%
        );
    }

    .player-name {
        text-shadow: rgba(255, 255, 255, 0.4) 0px 0px 10px;
        @apply absolute z-10 top-16 left-0 right-0;
    }

    .stats {
        @apply absolute left-0 right-0 z-10;
    }

    .user {
        @apply w-60 h-100;
    }

    .timer {
        margin-bottom: 0.35rem;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        top: 98%;
        right: 20%;
        margin-left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: #3d72e4 transparent transparent transparent;
    }
</style>


<svelte:head>
    <script
        src="https://cdn.purpleads.io/load.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
        id="purpleads-client"></script>
    <title>Winhalla | Solo match</title>
    <!--    <script async src="https://cdn.stat-rock.com/player.js"></script>-->
</svelte:head>


{#if isLoadingOpen && !error }
    <Loading data={"Loading game data..."} duration={500} />
{/if}

{#if error}
    <div class="w-full content-center lg:mt-60 mt-25 ">
        <h2 class="lg:text-5xl text-3xl text-center">{@html error}</h2>
        <a href="/play"><p class="underline lg:text-3xl pt-4 text-2xl  text-center text-primary">Go to play page</p></a>
    </div>
{:else}
    {#if info}
        <Infos message="Thanks for watching a video" pushError={info} />
    {/if}
    <AdblockAlert user="{userPlayer}" />
    <div class="h-full  ">

        {#if match}

            {#if isMatchEnded}
                <FfaEnd players={match.players} winners={match.winners} />
            {:else}
                <div class="h-full flex items-center flex-col lg:block lg:ml-24 z-0"
                     class:hidden={isFfaWatchAdVisible || isQuestsPanelOpen}>
                    <div
                        class="flex flex-col justify-center lg:flex-row
                    lg:justify-between items-center lg:mt-12 mt-7">
                        <div
                            class="flex justify-center lg:justify-start
                        items-end ">
                            <h1 class="text-6xl leading-none">Solo</h1>
                            <p
                                class="timer text-primary ml-5 text-3xl leading-none">
                                {#if countDown}{@html countDown}{:else}Loading...{/if}
                            </p>
                        </div>
                        {#if !isSpectator}
                            <div
                                class="lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row
                        items-center">
                                <!--<p class="text-center lg:text-left mx-4 mt-1 lg:mt-0">You watched <strong
                                    class="text-green font-normal text-3xl">{userPlayer.adsWatched}
                                    ad{userPlayer.adsWatched > 1 ? "s" : ""}</strong>, earnings will be multiplied by
                                    <strong
                                        class="text-green text-3xl font-normal">{userPlayer.multiplier / 100}</strong>!
                                </p>

                                <PlayAdButton socket={socket} bind:userPlayer={userPlayer} bind:adError={adError}
                                              bind:info={info} />-->
                                <RefreshButton
                                    on:click={() => handleRefresh()}
                                    isRefreshing={isRefreshingStats}
                                    refreshMessage={'Refresh data'} />
                                {#if userPlayer.gamesPlayed == 0}
                                    <button
                                        class="button button-brand quit lg:ml-4 mt-3
                                lg:mt-0" style="background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;"
                                        on:click={() => handleQuit()}>
                                        Quit lobby
                                    </button>
                                    {#if pushError}
                                        <ErrorAlert message="There was an error exiting the match"
                                                    pushError={pushError} />
                                    {/if}
                                {:else if userPlayer.gamesPlayed !== 7}
                                    <button
                                        class="button button-brand quit lg:ml-4 mt-3
                                lg:mt-0" style="background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;"
                                        on:click={() => endMatch()}>
                                        <div class="flex">
                                            <p>End match</p>
                                            <div class="py-2 px-2 ml-2 rounded-full bg-primary mb-1"
                                                 on:mouseover={() => tooltipOpen = true}
                                                 on:mouseout={() => tooltipOpen = false}>
                                                <svg
                                                    class="w-3 h-3 fill-current my-auto"
                                                    viewBox="0 0 17 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z" />
                                                </svg>
                                            </div>
                                            {#if tooltipOpen}
                                                <span
                                                    class="absolute right-24 w-50 top-4 px-6 py-2 bg-green text-background rounded text-left flex items-center justify-center z-40"
                                                    transition:fade>Exit the match before it ends to start another one, useful if you want to start another match before this one ended
                                                </span>
                                            {/if}
                                        </div>
                                    </button>
                                {:else}
                                    <a href="/play/ffa" class="button button-brand text-background lg:ml-4 mt-3
                                    lg:mt-0" style="background-color: #3de488;">Start another match</a>
                                {/if}

                            </div>
                        {/if}
                    </div>

                    <div
                        class="flex items-center flex-col lg:flex-row lg:items-start
                    h-full lg:mt-6 ">
                        <!--Main Player-->
                        {#if userPlayer}
                            <div class="mt-8 lg:mt-25 ffa-player card user " style="min-width: 14rem">
                                <div class="max-w-full h-full bg-gradient-to-b {gradientList[0]} rounded-lg"></div>
                                <div
                                    class="block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"></div>
                                <img
                                    class="block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    src="{userPlayer.avatarURL}" alt="">


                                <p class="player-name text-4xl">
                                    {userPlayer.username}
                                </p>
                                <div
                                    class="stats text-2xl bottom-5 text-ultra-light">
                                    <p>
                                        Games played:
                                        <b>{userPlayer.gamesPlayed}</b>
                                        /7
                                    </p>
                                    <p>
                                        Games won:
                                        <b>{userPlayer.wins}</b>
                                        /7
                                    </p>
                                </div>
                            </div>
                        {/if}

                        <!--Other Players-->
                        {#if players}
                            <div
                                class="flex flex-col justify-center lg:justify-start
                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0 mb-12">
                                <div class="mx-auto lg:mx-0 my-5 lg:my:0" style="flex-basis: 21%">
                                    <div style="max-width: 13rem; max-height: 28rem">
                                        <script
                                            src="https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
                                            data-pa-tag async></script>
                                    </div>
                                </div>
                                {#each players as player, i}
                                    <div style="flex-basis: 21%">
                                        <div class="ffa-player card lg:mr-12 mb-8 mx-auto lg:mx-0"
                                             style="max-width: 13rem">
                                            <div
                                                class="max-w-full h-full bg-gradient-to-b {gradientList[i + 1]}  rounded-lg"
                                            ></div>
                                            <div
                                                class="ppMask block w-24 h-24 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
                                            <img
                                                class="block w-24 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                                                src="{player.avatarURL}" alt="">


                                            <p class="player-name text-3xl">
                                                {player.username}
                                            </p>
                                            <div
                                                class="stats text-xl bottom-5
                                        text-ultra-light">
                                                <p>
                                                    Games played:
                                                    <b>{player.gamesPlayed}</b>
                                                    /7
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                                <div class="flex justify-center items-center flex-col">
                                    {#if players.length < 8}
                                        <p class="text-4xl mx-6 my-4">Waiting for players, you can start playing
                                            Brawlhalla</p>
                                    {/if}
                                    <div class="hidden lg:block">
                                        <script
                                            src="https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
                                            data-pa-tag async></script>
                                    </div>

                                </div>
                            </div>
                        {/if}
                    </div>
                    <GuideCard page="ffa" />
                    {#if isGamesAlertPopupOpen}
                        <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
                             style="z-index: 100"
                             in:fade={{duration: 200}}
                             out:fade={{duration: 350}}>

                            <div
                                class="max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto"
                                style="max-height: 95vh;"
                                transition:fly={{ y: 300, duration: 350 }}>
                                <h2 class="text-4xl md:text-5xl">The number of games has not been updated
                                </h2>

                                <p class="text-accent text-5xl md:text-6xl">What happened ?</p>
                                <div class="ml-6 my-6">
                                <p>The data takes on average 10 minutes to refresh, but it can be longer</p>
                                <p>We observed that it usually instantly refreshes after the 7th game, try to play the 7 games then click the refresh button</p>
                                </div>
                                <div>
                                    <button class="button button-brand" on:click={() =>isGamesAlertPopupOpen = false}>Got it!</button>
                                    <button class="hover:underline ml-4" on:click={() =>deactivate0GamesAlert}>Don't show this again</button>
                                </div>
                            </div>
                        </div>
                    {/if}
                    <div class="block lg:hidden mt-6">
                        <script
                            src="https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"
                            data-pa-tag async></script>
                    </div>
                </div>

            {/if}


            {#if !isSpectator && !isMatchEnded}
                <FfaWatchAd socket={socket} id={id} bind:userPlayer={userPlayer} bind:adError={adError}
                            bind:info={info} bind:visible={isFfaWatchAdVisible} />
            {/if}
            {#if quests}
                {#if isQuestsPanelOpen}
                    <div class="lg:flex md:absolute top-0 bottom-0 left-0 right-0 z-40 overflow-x-hidden">

                        <!--TRANSPARENT PART-->
                        <div class="hidden lg:block lg:w-1/2 2xl:w-full bg-background bg-opacity-70"
                             in:fly={{x: 1000, duration: 800}} out:fly={{x: 1800, duration: 1400}}></div>
                        <div
                            class="bg-background w-full h-full lg:w-auto  lg:min-w-max   h-full  z-10 lg:border-l-2 border-primary flex justify-center items-center"
                            in:fly={{x: 500, duration: 600}} out:fly={{x: 900, duration: 700}}>
                            <div class="lg:-mt-32 lg:flex items-center h-full">
                                <button
                                    class="fixed lg:static z-40 top-24 right-4 lg:block focus:outline-none lg:h-full"
                                    on:click={() => handleQuestsPanel()}>
                                    <svg class="hidden lg:block w-6 fill-current ml-8 text-font"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
                                    </svg>
                                    <svg
                                        class="lg:hidden w-8 h-8 fill-current text-mid-light"
                                        viewBox="0 0 28 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m24 2.4-2.4-2.4-9.6
                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6
                                            2.4 2.4 9.6-9.6 9.6 9.6
                                            2.4-2.4-9.6-9.6z" />
                                    </svg>
                                </button>
                                <div class="bg-background lg:pl-14 lg:pr-24">
                                    <Quests data={quests} />
                                </div>
                            </div>

                        </div>
                    </div>
                {:else}
                    <div class="fixed md:absolute right-0 top-1/2 transform -translate-y-1/2     mr-4"
                         class:hidden={isFfaWatchAdVisible}>
                        <div class="relative">
                            {#if isToolTipVisible}
                                <span
                                    class="hidden lg:block tooltip absolute -left-16 bottom-14 px-6 py-2 bg-primary rounded text-left flex items-center justify-center z-40"
                                    transition:fade>
                                    Quests
                                </span>
                            {/if}

                            <button class="focus:outline-none" on:click={() => handleQuestsPanel()}
                                    on:mouseover={() => isToolTipVisible = true}
                                    on:mouseout={() => isToolTipVisible = false}>
                                <svg class="w-8 fill-current text-mid-light" viewBox="0 0 27 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z" />
                                </svg>
                            </button>
                        </div>
                    </div>


                {/if}

            {/if}

        {:else}
            <Loading data={"Loading game data..."} />
        {/if}


    </div>

{/if}

<div>
    {#if adError}
        <ErrorAlert message="An error occurred while watching the ad" pushError={adError} />
    {/if}
</div>
<div hidden
     class="text-epic bg-epic border-epic from-primary from-epic from-green from-legendary to-epic to-green to-legendary to-primary"></div>
