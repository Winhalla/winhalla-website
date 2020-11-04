<script context=module>
    let id;

    export async function preload({ params }) {
        id = params.id;
        return { id };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { callApi, getUser } from "../../../utils/api";
    import { goto } from "@sapper/app";

    import FfaEnd from "../../../components/FfaEnd.svelte";
    import Loading from "../../../components/Loading.svelte";
    import { apiUrl } from "../../../utils/config";


    export let id;

    let user = {};
    let match;
    let isMatchEnded = false;
    let countDown = "01:23:06";

    let userPlayer;
    let players;

    match = {
        players: [
            {
                steamId: "76561198860469702",
                brawlhallaId: 13465463,
                username: "WeAreNoobs65",
                wins: 5,
                gamesPlayed: 5,
                legends: "artemis",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469701",
                brawlhallaId: 13465463,
                username: "Ghom",
                wins: 1,
                gamesPlayed: 4,
                legends: "wu-shang",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469700",
                brawlhallaId: 13465463,
                username: "Felons",
                wins: 2,
                gamesPlayed: 3,
                legends: "petra",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469702",
                brawlhallaId: 13465463,
                username: "Philtrom",
                wins: 0,
                gamesPlayed: 2,
                legends: "azoth",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469701",
                brawlhallaId: 13465463,
                username: "Persan",
                wins: 4,
                gamesPlayed: 6,
                legends: "wu-shang",
                "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
            },
            {
                steamId: "76561198860469702",
                brawlhallaId: 13465463,
                username: "PoroBolo",
                wins: 2,
                gamesPlayed: 2,
                legends: "val",
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
    };

    onMount(async () => {
        /*
        user = await getUser();
        user = user.steam;

        match = await callApi("get", `/getMatch/${id}`);
        isMatchEnded = match.finished;

        //Start the countdown
        let d = new Date(match.Date);
        const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);
        startTimer(endsIn);
        */

        user.id = "76561198860469700";

        filterUsers();
    });

    const filterUsers = () => {
        //Find user's object
        userPlayer = match.players.find((p) => p.steamId === user.id);//remettre le parseInt
        console.log(userPlayer)
        //Delete user's object from array.
        players = [...match.players];
        players.splice(
            match.players.findIndex((p) => p.steamId === user.id),//remettre le parseInt
            1
        );
    };

    //Function that starts a timer with a date, and refreshes it every second

    function startTimer(duration) {
        let timer = duration, hours, minutes, seconds;
        setInterval(function() {
            seconds = Math.floor((timer) % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor((timer / (60 * 60)));

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countDown = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    //Funtion that handles the refresh button on click event

    let isRefreshingStats = false;
    const handleRefresh = async () => {
        isRefreshingStats = true;

        //match = await callApi("get", `/getMatch/${id}`);
        filterUsers();
        isRefreshingStats = false;
    };

    const handleQuit = async () => {
        //await callApi("post", `/exitMatch`);
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

    .refresh {
        @apply flex px-7;
    }

    .refresh div {
        margin-top: -0.185rem;
    }
</style>

<svelte:head>
    <title>FFA</title>
</svelte:head>

<div class="h-full">
    {#if match}
        {#if isMatchEnded}
            <FfaEnd players={match.players} winners={match.winners}/>
        {:else}
            <div class="h-full flex items-center flex-col lg:block lg:ml-24">
                <div class="flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:mt-12 lg:mt-0 mt-7">
                    <div class="mode-timer flex justify-center lg:justify-start items-end w-60 ">
                        <h1 class="text-6xl">FFA</h1>
                        <p class="timer text-primary ml-5 text-3xl">{countDown}</p>
                    </div>

                    <div class="lg:mr-7">
                        {#if match.started}
                            <button class="button button-brand refresh flex items-center focus:outline-none"
                                    on:click={() => handleRefresh()}>
                                <div class:hidden={!isRefreshingStats} class="block">
                                    <svg class="fill-current text-font w-5 animate-spin left-4" viewBox="0 0 21 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z"/>
                                    </svg>
                                </div>
                                <p class:pl-3={isRefreshingStats}
                                   class="pl-3">{isRefreshingStats ? "Refreshing" : "Refresh stats"}</p>
                            </button>
                        {:else}
                            <button class="button button-brand quit" on:click={() => handleQuit()}>
                                Quit lobby
                            </button>
                        {/if}
                    </div>
                </div>


                <div class="flex items-center flex-col lg:flex-row lg:items-start h-full">

                    <!--Main Player-->
                    {#if userPlayer}
                        <div class="mt-8 lg:mt-25 ffa-player card user">
                            <img
                                    src="/assets/CharactersBanners/{userPlayer.legends}.png"
                                    alt={userPlayer.legends}
                                    class="block"/>

                            <p class="player-name text-4xl">{userPlayer.username}</p>
                            <div class="stats text-2xl bottom-5 text-ultra-light">
                                <p>Games played: <b>{userPlayer.gamesPlayed}</b>/10</p>
                            </div>
                        </div>
                    {/if}
                    <!--TODO: FIX LE RESPONSIVE DE LA CARD POUR TOUTES LES TAILLES D ECRAN-->


                    <!--Other Players-->
                    {#if players}
                        <div
                                class="flex flex-col justify-center lg:justify-start lg:flex-row
                    lg:flex-wrap lg:ml-33 mt-14 lg:mt-0">
                            {#each players as player}
                                <div class="ffa-player card lg:mr-12 mb-8">
                                    <img
                                            src="/assets/CharactersBanners/{player.legends}.png"
                                            alt={player.legends}
                                            class="block"/>

                                    <p class="player-name text-3xl">{player.username}</p>
                                    <div class="stats text-xl bottom-5 text-ultra-light">
                                        <p>Games played: <b>{player.gamesPlayed}</b>/10</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}

                </div>
            </div>

        {/if}
    {:else}
        <Loading/>
    {/if}
</div>


