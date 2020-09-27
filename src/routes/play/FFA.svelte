<script>
    const players = [
        {
            steamId: 16438487,
            brawlhallaId: 13465463,
            username: "WeAreNoobs65",
            wins: 0,
            gamesPlayed: 0,
            legends: "artemis"
        },
        {
            steamId: 16438487,
            brawlhallaId: 13465463,
            username: "Ghom",
            wins: 0,
            gamesPlayed: 0,
            legends: "wu-shang"
        },
        {
            steamId: 16438497,
            brawlhallaId: 13465463,
            username: "Felons",
            wins: 0,
            gamesPlayed: 0,
            legends: "petra"
        },
        {
            steamId: 16438467,
            brawlhallaId: 13465463,
            username: "Ayfri",
            wins: 0,
            gamesPlayed: 0,
            legends: "jhala"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Reddo Shi",
            wins: 0,
            gamesPlayed: 0,
            legends: "rayman"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Drakium",
            wins: 0,
            gamesPlayed: 0,
            legends: "asuri"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Persan",
            wins: 0,
            gamesPlayed: 0,
            legends: "azoth"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Philtrom",
            wins: 0,
            gamesPlayed: 0,
            legends: "dusk"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Ludmix",
            wins: 0,
            gamesPlayed: 0,
            legends: "diana"
        },
        {
            steamId: 16438457,
            brawlhallaId: 13465463,
            username: "Swooz",
            wins: 0,
            gamesPlayed: 0,
            legends: "orion"
        }
    ];

    //Find user object
    const user = players.find((p) => p.steamId === 16438497);

    //Delete primaryPlayer object from array.
    players.splice(
        players.findIndex((p) => p.steamId === 16438497),
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
        margin-bottom: 0.32rem;
    }
</style>

<svelte:head>
    <title>FFA</title>
</svelte:head>
<div class="h-full flex items-center flex-col lg:block lg:ml-24">
    <div class="mode-timer flex justify-center lg:justify-start items-end lg:mt-12 border-primary w-60 mt-7 lg:mt-0">
        <h1 class="text-6xl">FFA</h1>
        <p class="timer text-primary  ml-5 text-3xl">2:45:23</p>
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
