<script>
    import FfaEnd from "../../components/FfaEnd.svelte";

    let matchEnded = true;

    const data = {
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
    };


    //Find user object
    const user = data.players.find((p) => p.steamId === "76561198860469700");

    //Delete primaryPlayer object from array.
    let players = [...data.players];
    players.splice(
        data.players.findIndex((p) => p.steamId === "76561198860469700"),
        1
    );
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
{#if matchEnded}
    <FfaEnd players={data.players} winners={data.winners}/>
{:else}
    <div class="h-full flex items-center flex-col lg:block lg:ml-24">
        <div class="mode-timer flex justify-center lg:justify-start items-end lg:mt-12 w-60 mt-7 lg:mt-0">
            <h1 class="text-6xl">FFA</h1>
            <p class="timer text-primary ml-5 text-3xl">2:45:23</p>
        </div>

        <div class="flex items-center flex-col lg:flex-row lg:items-start h-full">

            <!--Main Player-->
            <div>
                <div class="mt-4 lg:mt-25 ffa-player card user">
                    <img
                            src="/assets/CharactersBanners/{user.legends}.png"
                            alt={user.legends}
                            class="block"/>

                    <p class="player-name text-4xl">{user.username}</p>
                    <div class="stats text-2xl bottom-5 text-ultra-light">
                        <p>Games played: <b>{user.gamesPlayed}</b>/10</p>
                        <p>
                            Games won: <b>{user.wins}</b>/{user.gamesPlayed}
                        </p>
                    </div>
                </div>
            </div>


            <!--Other Players-->
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
        </div>
    </div>

{/if}
