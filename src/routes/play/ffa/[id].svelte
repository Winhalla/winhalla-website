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

    import FfaEnd from "../../../components/FfaEnd.svelte";

    export let id;

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

    onMount(async () => {
        user = await getUser();
        user = user.steam;

        console.log(user.id)
        match = await callApi("get", `/getMatch/${id}`);
        isMatchEnded = match.finished;

        let d = new Date(match.Date);
        const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);
        startTimer(endsIn);

        //Find user object
        userPlayer = match.players.find((p) => p.steamId === parseInt(user.id));

        //Delete primaryPlayer object from array.
        players = [...match.players];
        players.splice(
            match.players.findIndex((p) => p.steamId === parseInt(user.id)),
            1
        );
    });

    function startTimer(duration) {
        let timer = duration, hours, minutes, seconds;
        setInterval(function () {
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
    <title>FFA</title>
</svelte:head>
{#if match}
    {#if isMatchEnded}
        <FfaEnd players={match.players} winners={match.winners}/>
    {:else}
        <div class="h-full flex items-center flex-col lg:block lg:ml-24">
            <div class="mode-timer flex justify-center lg:justify-start items-end lg:mt-12 w-60 mt-7 lg:mt-0">
                <h1 class="text-6xl">FFA</h1>
                <p class="timer text-primary ml-5 text-3xl">{countDown}</p>
            </div>

            <div class="flex items-center flex-col lg:flex-row lg:items-start h-full">

                <!--Main Player-->
                {#if userPlayer}
                    <div>
                        <div class="mt-4 lg:mt-25 ffa-player card user">
                            <img
                                    src="/assets/CharactersBanners/{userPlayer.legends}.png"
                                    alt={userPlayer.legends}
                                    class="block"/>

                            <p class="player-name text-4xl">{userPlayer.username}</p>
                            <div class="stats text-2xl bottom-5 text-ultra-light">
                                <p>Games played: <b>{userPlayer.gamesPlayed}</b>/10</p>
                                <p>
                                    Games won: <b>{userPlayer.wins}</b>/{userPlayer.gamesPlayed}
                                </p>
                            </div>
                        </div>
                    </div>
                {/if}



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
                                    <p>
                                        Games won: <b>{player.wins}</b>/{player.gamesPlayed}
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
    <p>Loading...</p>
{/if}

