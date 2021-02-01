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

    import { fade } from "svelte/transition";

    import { counter } from "../../../components/store";
    import io from "socket.io-client";
    import { apiUrl } from "../../../utils/config";
    import PlayAdButton from "../../../components/PlayAdButton.svelte";
    import FfaWatchAd from "../../../components/FfaWatchAd.svelte";

    const { page } = stores();

    let id;


    let pages;
    let user;
    let match;
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

    let error;
    let pushError;
    let socket;
    let isSpectator;
    let isLoadingOpen = true;

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


            if (!value.params.id && !value.path.includes("/ffa/")) return console.log("not a ffa match");
            else console.log("ffa match");
            let unsub = counter.subscribe((user1) => {
                user = user1.content;
            });

            unsub();


            try {
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
                    countDown = "Waiting for others to finish (you can start a new game from the play page)";
                } else {
                    startTimer(endsIn);
                }
                counter.set({ "refresh": true });

                socket = io.io(apiUrl);
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
                isLoadingOpen = false;
            } catch (err) {
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

    let isInfoDropdownOpen = false;

    function handleInfoDropdown() {
        isInfoDropdownOpen = !isInfoDropdownOpen;
    }
</script>

<style>
    b {
        @apply text-primary font-normal;
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
                rgba(23, 23, 26, 0.68) 0%,
                rgba(23, 23, 26, 0.88),
                rgba(23, 23, 26, 0.95) 75%,
                rgba(23, 23, 26, 0.98) 100%
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

    .user::after {
        background: linear-gradient(
                to bottom,
                rgba(23, 23, 26, 0.55) 0%,
                rgba(23, 23, 26, 0.75),
                rgba(23, 23, 26, 0.85) 75%,
                rgba(23, 23, 26, 0.93) 100%
        );
    }

    .timer {
        margin-bottom: 0.35rem;
    }

</style>


<svelte:head>
    <title>Winhalla | FFA match</title>
    <script async src="https://cdn.stat-rock.com/player.js"></script>
</svelte:head>


{#if isLoadingOpen && !error}
    <div out:fade={{duration:500}} class="z-50 bg-background absolute">
        <Loading data={"Loading game data..."} />
    </div>
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
    <div class="h-full  ">

        {#if match}
            {#if isMatchEnded}
                <FfaEnd players={match.players} winners={match.winners} />
            {:else}
                <div class="h-full flex items-center flex-col lg:block lg:ml-24 z-0">
                    <div
                        class="flex flex-col justify-center lg:flex-row
                    lg:justify-between items-center lg:mt-12 mt-7">
                        <div
                            class="mode-timer flex justify-center lg:justify-start
                        items-end w-52 ">
                            <h1 class="text-6xl leading-none">FFA</h1>
                            <p
                                class="timer text-primary ml-5 text-3xl leading-none">
                                {#if countDown}{countDown}{:else}Loading...{/if}
                            </p>
                        </div>
                        <AdblockAlert user="{userPlayer}" />
                        <div
                            class="lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row
                        items-center">
                            <p class="text-center lg:text-left mx-4 mt-1 lg:mt-0">You watched <strong
                                class="text-green font-normal text-3xl">{userPlayer.adsWatched}
                                ad{userPlayer.adsWatched > 1 ? "s" : ""}</strong>, earnings will be multiplied by
                                <strong class="text-green text-3xl font-normal">{userPlayer.multiplier / 100}</strong>!
                            </p>

                            <PlayAdButton socket={socket} bind:userPlayer={userPlayer} bind:adError={adError}
                                          bind:info={info} id={id} />
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
                                    <ErrorAlert message="There was an error exiting the match" pushError={pushError} />
                                {/if}
                            {/if}

                        </div>
                    </div>

                    <div
                        class="flex items-center flex-col lg:flex-row lg:items-start
                    h-full lg:mt-6">
                        <!--Main Player-->
                        {#if userPlayer}
                            <div class="mt-8 lg:mt-25 ffa-player card user">
                                <img
                                    src="/assets/CharactersBanners/{userPlayer.legends}.png"
                                    alt={userPlayer.legends}
                                    class="block" />

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
                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0">
                                {#each players as player}
                                    <div class="ffa-player card lg:mr-12 mb-8">
                                        <img
                                            src="/assets/CharactersBanners/{player.legends}.png"
                                            alt={player.legends}
                                            class="block" />

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
                </div>
            {/if}

            <GuideCard page="ffa" />
            <FfaWatchAd socket={socket} id={id} bind:userPlayer={userPlayer} bind:adError={adError} bind:info={info} />
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
<!--
<div>
    <script defer
            src="https://cdn.purpleads.io/load.js?publisherId=4640a3490c1775718da6cc801e9b32e7:97737d9e720ec100f8147b22591b1a8b73d2131d6a0f6a6d744a8c67ae89f5ed71e3b94009ea0e6bf97e97e6d07853daf83ea62c0cd24822ca9cc406a85f339b"
            id="purpleads-client"></script>
</div>
-->