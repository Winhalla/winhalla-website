<script>
    export let players;
    export let winners;
    const data = winners.map(w => {
        let array = [];
        w.forEach((e, i) => {
            //TODO: faire la même mais avec l'array winners au lieu de players
            if (e == "") return
            const winnerInPlayers = players.find(p => p.steamId == e.steamId);
            array.push({
                username: winnerInPlayers.username,
                avatarURL: winnerInPlayers.avatarURL,
                legends: winnerInPlayers.legends,
                wins: winnerInPlayers.wins,
                coinsEarned: e.coins,
                multiplier: e.multiplier
            });
        });
        return array;
    });
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
        </div>
    </div>

    <div class="flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24">

        <div class="flex flex-col items-center lg:flex-row">

            <!--Winner card-->
            {#each data[0] as winner,i}
                <div class:lg:ml-10={i>0} >
                    <div>
                        <div class="ffa-player card user">
                            <img
                                src="/assets/CharactersBanners/{winner.legends}.png"
                                alt={winner.legends}
                                class="block" />

                            <p class="player-name text-4xl">{winner.username}</p>
                            <div class="stats text-2xl bottom-5 text-ultra-light">
                                <p>
                                    Games won: <b>{winner.wins}</b>/8
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}

            <!--2nd card-->
            <!--If there is a 2nd (impossible if there is 2 1st)-->
            {#if data[1] !== ""}
                {#each data[1] as winner,i}
                    <div class="mt-10 lg:ml-10">
                        <div>
                            <div class="ffa-player card user">
                                <img
                                    src="/assets/CharactersBanners/{winner.legends}.png"
                                    alt={winner.legends}
                                    class="block" />

                                <p class="player-name text-4xl">{winner.username}</p>
                                <div class="stats text-2xl bottom-5 text-ultra-light">
                                    <p>
                                        Games won: <b>{winner.wins}</b>/8
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}

            <!--3rd card-->
            <!--If there is a third (impossible if there is 2 2nd)-->
            {#if data[2] !== ""}
                {#each data[2] as winner,i}
                    <div class="mt-10 lg:mt-20 lg:ml-10">
                        <div>
                            <div class="ffa-player card user">
                                <img
                                    src="/assets/CharactersBanners/{winner.legends}.png"
                                    alt={winner.legends}
                                    class="block" />

                                <p class="player-name text-4xl">{winner.username}</p>
                                <div class="stats text-2xl bottom-5 text-ultra-light">
                                    <p>
                                        Games won: <b>{winner.wins}</b>/8
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
        <div>
            <div class="overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 ">
                <div>
                    <table class="card px-4 overflow-hidden mt-10 lg:mt-20">
                        <thead class="bg-primary ">
                        <tr>
                            <td class="px-6 py-3">
                                Rank
                            </td>
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
                        <!--For each rank-->
                        {#each data as winners,i}
                            <!--For each player in rank-->
                            {#each winners as winner}
                                {#if winner.avatarURL || winner.username}
                                    <tr>
                                        <td class="px-6 py-2">
                                            <b class="font-normal">{i+1}</b>
                                        </td>
                                        <td class="flex items-center px-6 py-2">
                                            <img class="block w-10 h-10 rounded-full" src={winner.avatarURL}
                                                 alt={winner.legends}>
                                            <p class="pl-2">{winner.username}</p>
                                        </td>
                                        <td class="px-6 py-2">
                                            <b class="text-primary font-normal">{winner.wins}</b>/8
                                        </td>
                                        <td class="px-6 py-2">
                                            {winner.coinsEarned}
                                        </td>
                                        <td class="px-6 py-2">
                                            {winner.multiplier}
                                        </td>
                                    </tr>
                                {/if}
                            {/each  }
                        {/each}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    </div>

</div>
