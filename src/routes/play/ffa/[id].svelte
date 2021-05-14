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

    const { page } = stores();

    let id;


    let pages;
    let user;
    let match;
    let quests;
    let isMatchEnded;
    let countDown;

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

    let isFfaWatchAdVisible = true;
    $: if (isFfaWatchAdVisible) {
        console.log(isFfaWatchAdVisible);
    }

    let error;
    let pushError;
    let socket;
    let isSpectator;
    let isLoadingOpen = true;
    let isToolTipVisible = false;

    let gradientList;
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
                const d = new Date(userPlayer.joinDate);
                const endsIn = -(
                    (new Date().getTime() -
                        new Date(d.setHours(d.getHours() + 3)).getTime()) /
                    1000
                );
                if (endsIn < 1) {
                    countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
                } else {
                    startTimer(endsIn);
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
        setInterval(function() {
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countDown = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
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
        } else if (match.finished && isMatchEnded === false) {
            isMatchEnded = true;
            counter.set({ "refresh": true });
        }
        isRefreshingStats = false;
    };

    const handleQuit = async () => {
        try {
            const exitStatus = await callApi("post", `/exitMatch`);
            if (exitStatus instanceof Error) throw exitStatus;
            goto(`/play`);
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
    <title>Winhalla | FFA match</title>
    <script async src="https://cdn.stat-rock.com/player.js"></script>
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
                            <h1 class="text-6xl leading-none">FFA</h1>
                            <p
                                class="timer text-primary ml-5 text-3xl leading-none">
                                {#if countDown}{@html countDown}{:else}Loading...{/if}
                            </p>
                        </div>
                        {#if !isSpectator}
                            <div
                                class="lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row
                        items-center">
                                <p class="text-center lg:text-left mx-4 mt-1 lg:mt-0">You watched <strong
                                    class="text-green font-normal text-3xl">{userPlayer.adsWatched}
                                    ad{userPlayer.adsWatched > 1 ? "s" : ""}</strong>, earnings will be multiplied by
                                    <strong
                                        class="text-green text-3xl font-normal">{userPlayer.multiplier / 100}</strong>!
                                </p>

                                <PlayAdButton socket={socket} bind:userPlayer={userPlayer} bind:adError={adError}
                                              bind:info={info} />
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
                                {/if}

                            </div>
                        {/if}
                    </div>

                    <div
                        class="flex items-center flex-col lg:flex-row lg:items-start
                    h-full lg:mt-6 ">
                        <!--Main Player-->
                        {#if userPlayer}
                            <div class="mt-8 lg:mt-25 ffa-player card user">
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
                                        /8
                                    </p>
                                    <p>
                                        Games won:
                                        <b>{userPlayer.wins}</b>
                                        /8
                                    </p>
                                </div>
                            </div>
                        {/if}

                        <!--Other Players-->
                        {#if players}
                            <div
                                class="flex flex-col justify-center lg:justify-start
                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0     mb-12">
                                {#each players as player, i}
                                    <div class="ffa-player card lg:mr-12 mb-8">
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
                                                /8
                                            </p>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                    <GuideCard page="ffa" />
                </div>

            {/if}


            {#if !isSpectator && !isMatchEnded}
                <FfaWatchAd socket={socket} id={id} bind:userPlayer={userPlayer} bind:adError={adError}
                            bind:info={info} bind:visible={isFfaWatchAdVisible} />
            {/if}
            {#if quests}
                {#if isQuestsPanelOpen}
                    <div class="lg:flex md:absolute top-0 bottom-0 left-0 right-0 z-10 overflow-x-hidden">

                        <!--TRANSPARENT PART-->
                        <div class="hidden lg:block lg:w-1/2 2xl:w-full bg-background bg-opacity-70"
                             out:fade={{duration: 350}}></div>
                        <div
                            class="bg-background w-full h-full lg:w-auto  lg:min-w-max   h-full   lg:border-l-2 border-primary flex justify-center items-center"
                            in:fly={{x: 500, duration: 600}} out:fly={{x: 900, duration: 700}}>
                            <div class="lg:-mt-32 lg:flex items-center h-full">
                                <button
                                    class="fixed lg:static z-40 top-24 right-4 lg:block focus:outline-none lg:h-full"
                                    on:click={() => handleQuestsPanel()}>
                                    <svg class="hidden lg:block w-6 fill-current ml-8 text-font" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z" />
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