<script context="module">
    //Start the countdown

    //Function that starts a timer with a date, and refreshes it every second
    /*let countDown;
    function startTimer(duration) {
        let timer = duration,
            hours,
            minutes,
            seconds;
        setInterval(function () {
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
    }*/
    export async function preload({ params }) {
        let id = params.id;
        /*let user = await getUser();
        user = user.steam;

        let match = await callApi("get", `/getMatch/${id}`);
        let isMatchEnded = match.finished;
        let d = new Date(match.Date);
        const endsIn = -(
            (new Date().getTime() -
                new Date(d.setHours(d.getHours() + 3)).getTime()) /
            1000
        );

        startTimer(endsIn);

        let userPlayer;
        let players;
        const filterUsers = () => {
            //Find user's object
            userPlayer = match.players.find(
                (p) => p.steamId === parseInt(user.id)
            );

            //Delete user's object from array.
            players = [...match.players];
            players.splice(
                match.players.findIndex((p) => p.steamId === parseInt(user.id)),
                1
            );
        };
        filterUsers();
        console.log(id, match);*/
        return {
            id
            /*user,
            match,
            isMatchEnded,
            countDown,
            userPlayer,
            players,*/
        };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { callApi } from "../../../utils/api";
    import { goto } from "@sapper/app";

    import RefreshButton from "../../../components/RefreshButton.svelte";
    import FfaEnd from "../../../components/FfaEnd.svelte";
    import Loading from "../../../components/Loading.svelte";
    import { counter } from "../../../components/store";
    import io from "socket.io-client";
    import { apiUrl } from "../../../utils/config";

    export let id;

    /*export let user;
    export let match;
    export let isMatchEnded;
    export let countDown;

    export let userPlayer;
    export let players;*/

    let user;
    let match;
    let isMatchEnded;
    let countDown;

    let userPlayer;
    let players;
    /*const data = {
        players: [
            {
                steamId: "76561198860469702",
                brawlhallaId: 13465463,
                username: "WeAreNoobs65",
                wins: 0,
                gamesPlayed: 0,
                legends: "artemis",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469701",
                brawlhallaId: 13465463,
                username: "Ghom",
                wins: 0,
                gamesPlayed: 0,
                legends: "wu-shang",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469700",
                brawlhallaId: 13465463,
                username: "Felons",
                wins: 0,
                gamesPlayed: 0,
                legends: "petra",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
        ],
        winners: [
            {
                steamId: "76561198860469700",
                coinsEarned: 4000,
                multiplier: "x10"
            },
            {
                steamId: "76561198860469701",
                coinsEarned: 2000,
                multiplier: "x5"
            },
            {
                steamId: "76561198860469702",
                coinsEarned: 2000,
                multiplier: "x10"
            },
        ]
    };*/
    let error;
    onMount(async () => {
        let unsub = counter.subscribe((value) => {
            user = value.content;

        });
        unsub();

        //await user
        //user = user.steam
        try {
            user = await user;
            user = user.steam
            match = await callApi("get", `/getMatch/${id}`);
            isMatchEnded = match.finished;
            //Start the countdown

            filterUsers(false);
            const d = new Date(userPlayer.joinDate);
            const endsIn = -(
                (new Date().getTime() -
                    new Date(d.setHours(d.getHours() + 3)).getTime()) /
                1000
            );
            if(endsIn < 1){
                countDown = "Waiting for others to finish (you can start a new game from the play page)"
            }else{
                startTimer(endsIn);
            }
            counter.set({ "refresh": true });
            let socket = io.io(apiUrl);
            socket.on("connection", (status) => {
                console.log(status);
                socket.emit("match connection","FFA"+id)
            });
            socket.on('join match',(status)=>{
                console.log(status)
            })
            socket.on("lobbyUpdate",(value)=>{
                match = value
                filterUsers(true)
            })
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                    error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
                } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                    error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
                }
            }
        }

    });

    const filterUsers = (isFromSocket) => {
        //Find user's object
        if(isFromSocket === false) {
            userPlayer = match.players.find(p => p.steamId === parseInt(user.id));
        } else {
            let playerIndex = match.players.findIndex(p => p.steamId === parseInt(user.id));
            match.players[playerIndex].wins = userPlayer.wins
            userPlayer = match.players[playerIndex]
        }
        //Delete user's object from array.
        players = [...match.players];
        players.splice(
            match.players.findIndex(p => p.steamId === parseInt(user.id)),
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
        //! err ici ?
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
        console.log("quit");
        await callApi("post", `/exitMatch`);
        goto(`/play`);
    };
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

    .quit {
        @apply bg-legendary px-7;
    }
</style>

<svelte:head>
    <title>Winhalla | FFA match</title>
</svelte:head>
{#if error}
    <div class="w-full content-center lg:mt-60 mt-25 ">
        <h2 class="lg:text-4xl text-3xl text-center">{error}</h2>
        <a href="/play"><p class="underline lg:text-3xl text-2xl  text-center text-primary">Go to play page</p></a>
    </div>
{:else}
    <div class="h-full">
        {#if match}
            {#if isMatchEnded}
                <FfaEnd players={match.players} winners={match.winners} />
            {:else}
                <div class="h-full flex items-center flex-col lg:block lg:ml-24">
                    <div
                        class="flex flex-col justify-center lg:flex-row
                    lg:justify-between items-center lg:mt-12 mt-7">
                        <div
                            class="mode-timer flex justify-center lg:justify-start
                        items-end w-60 ">
                            <h1 class="text-6xl leading-none">FFA</h1>
                            <p
                                class="timer text-primary ml-5 text-3xl leading-none">
                                {#if countDown}{countDown}{:else}Loading...{/if}
                            </p>
                        </div>

                        <div
                            class="lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row
                        items-center">
                            <RefreshButton
                                on:click={() => handleRefresh()}
                                isRefreshing={isRefreshingStats}
                                refreshMessage={'Refresh data'} />
                            {#if userPlayer.gamesPlayed == 0}
                                <button
                                    class="button button-brand quit lg:ml-4 mt-2
                                lg:mt-0"
                                    on:click={() => handleQuit()}>
                                    Quit lobby
                                </button>
                            {/if}
                        </div>
                    </div>

                    <div
                        class="flex items-center flex-col lg:flex-row lg:items-start
                    h-full">
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
        {:else}
            <Loading data={"Loading game data..."} />
        {/if}
    </div>
{/if}
