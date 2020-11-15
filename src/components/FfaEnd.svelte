<script>
    export let players;
    export let winners;

    const data = winners.map(w => {
        //TODO: faire la même mais avec l'array winners au lieu de players
        const winnerInPlayers = players.find(p => p.steamId === w.steamId);
        return {
            username: winnerInPlayers.username,
            avatarURL: winnerInPlayers.avatarURL,
            legends: winnerInPlayers.legends,
            wins: winnerInPlayers.wins,
            coinsEarned: w.coinsEarned,
            multiplier: w.multiplier
        };
    });

    console.log(data);
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

<div class="">
    <div class="pl-7 lg:pl-24 pt-8 lg:pt-12">
        <div class="mode-timer lg:flex items-end">
            <h1 class="text-6xl">Match Ended</h1>
            <p class="timer text-primary lg:ml-5 text-3xl">2:45:23</p>
        </div>
    </div>

    <div class="flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24">

        <div class="flex flex-col items-center lg:flex-row">

            <!--Winner card-->
            <div>
                <div>
                    <div class="ffa-player card user">
                        <img
                                src="/assets/CharactersBanners/{data[0].legends}.png"
                                alt={data[0].legends}
                                class="block"/>

                        <p class="player-name text-4xl">{data[0].username}</p>
                        <div class="stats text-2xl bottom-5 text-ultra-light">
                            <p>
                                Games won: <b>{data[0].wins}</b>/10
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!--2nd card-->
            <div class="mt-10 lg:mx-10">
                <div>
                    <div class="ffa-player card user">
                        <img
                                src="/assets/CharactersBanners/{data[1].legends}.png"
                                alt={data[1].legends}
                                class="block"/>

                        <p class="player-name text-4xl">{data[1].username}</p>
                        <div class="stats text-2xl bottom-5 text-ultra-light">
                            <p>
                                Games won: <b>{data[1].wins}</b>/10
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!--3rd card-->
            <div class="mt-10 lg:mt-20">
                <div>
                    <div class="ffa-player card user">
                        <img
                                src="/assets/CharactersBanners/{data[2].legends}.png"
                                alt={data[2].legends}
                                class="block"/>

                        <p class="player-name text-4xl">{data[2].username}</p>
                        <div class="stats text-2xl bottom-5 text-ultra-light">
                            <p>
                                Games won: <b>{data[2].wins}</b>/10
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 ">
                <div>
                    <table class="card px-4 overflow-hidden mt-10 lg:mt-20">
                        <thead class="bg-primary ">
                        <tr>
                            <td class="px-6 py-3">
                                Player
                            </td>
                            <td class="px-6 py-3">
                                Wins
                            </td>
                            <td class="px-6 py-3">
                                Earned
                            </td>
                            <td class="px-6 py-3">
                                Multiplier
                            </td>
                        </tr>
                        </thead>
                        <tbody class="divide-y-4 divide-background text-l">
                        {#each data as winner}
                            <tr>
                                <td class="flex items-center px-6 py-2">
                                    <img class="block w-10 h-10 rounded-full" src={winner.avatarURL}
                                         alt={winner.legends}>
                                    <p class="pl-2">{winner.username}</p>
                                </td>
                                <td class="px-6 py-2">
                                    <b class="text-primary font-normal">{winner.wins}</b>/10
                                </td>
                                <td class="px-6 py-2">
                                    {winner.coinsEarned}
                                </td>
                                <td class="px-6 py-2">
                                    {winner.multiplier}
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    </div>

</div>
