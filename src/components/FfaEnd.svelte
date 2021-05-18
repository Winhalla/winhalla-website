<script>

    export let players;
    export let winners;
    const data = winners.map(w => {
        let array = [];
        w.forEach((e, i) => {
            if (e == "") return;
            const winnerInPlayers = players.find(p => p.steamId == e.steamId);
            array.push({
                username: winnerInPlayers.username,
                avatarURL: winnerInPlayers.avatarURL,
                legends: winnerInPlayers.legends,
                wins: winnerInPlayers.wins,
                coinsEarned: Math.floor(e.coins*10)/10,
                multiplier: e.multiplier,
                adMultiplier: e.multiplierDetails.ad / 100,
                linkMultiplier: e.multiplierDetails.link,
                eventMultiplier: e.multiplierDetails.event
            });
        });
        return array;
    });
</script>

<style>
    b {
        @apply text-primary font-normal;
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
                rgba(23, 23, 26, 0.35),
                rgba(23, 23, 26, 0.45) 75%,
                rgba(23, 23, 26, 0.5) 100%
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
                rgba(23, 23, 26, 0.25) 0%,
                rgba(23, 23, 26, 0.35),
                rgba(23, 23, 26, 0.45) 75%,
                rgba(23, 23, 26, 0.5) 100%
        );
    }

    .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 20%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

    li {
        @apply leading-tight;
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
                <div class:lg:ml-10={i>0}>
                    <div>
                        <div class="ffa-player card user">
                            <div class="max-w-full h-full bg-gradient-to-b from-primary to-legendary rounded-lg"></div>
                            <div
                                class="block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"></div>
                            <img
                                class="block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                                src="{winner.avatarURL}" alt="">

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
                                <div class="max-w-full h-full bg-gradient-to-b from-primary to-epic  rounded-lg"></div>
                                <div
                                    class="block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"></div>
                                <img
                                    class="block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    src="{winner.avatarURL}" alt="">

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
                                <div class="max-w-full h-full bg-gradient-to-b from-primary to-green  rounded-lg"></div>
                                <div
                                    class="block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"></div>
                                <img
                                    class="block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    src="{winner.avatarURL}" alt="">

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

        <div class="overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-20 lg:pb-8 lg:w-full">
            <table class="card px-4 /overflow-hidden mt-20 lg:mx-auto">
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
                            <tr class="text-center ">
                                <td class="px-6 py-2">
                                    <strong class="font-normal" class:text-legendary={i === 0} class:text-epic={i === 1}
                                            class:text-green={i === 2}>{i + 1}</strong>
                                </td>
                                <td class="flex items-center px-6 py-2">
                                    <img class="block w-10 h-10 rounded-full" src={winner.avatarURL}
                                         alt={winner.username}>
                                    <p class="pl-2">{winner.username}</p>
                                </td>
                                <td class="px-6 py-2">
                                    <b class="font-normal">{winner.wins}</b>/8
                                </td>
                                <td class="px-6 py-2">
                                    {winner.coinsEarned}
                                </td>

                                <td class="px-6 py-2 relative">
                                    <div class="flex">
                                        <p>{winner.multiplier}</p>
                                        <div class="py-2 ml-3 px-2 rounded-full bg-primary mb-1"
                                             on:mouseover={() =>winner.areDetailsShown = true}
                                             on:mouseout={() =>winner.areDetailsShown = false}>
                                            <svg
                                                class="w-3 h-3 fill-current my-auto"
                                                viewBox="0 0 17 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {#if winner.areDetailsShown === true}
                                    <span
                                        class="tooltip absolute -left-20 bottom-14     px-4 py-2 bg-black  rounded  text-left h-33 w-48     flex items-center justify-center z-40">
                                        <ul>

                                            <li><b>BASE REWARD:</b>  {winner.coinsEarned ? Math.round(((winner.coinsEarned / winner.adMultiplier) * (1 - (winner.linkMultiplier / 100)) * (1 - (winner.eventMultiplier / 100))) * 10) / 10 : 0 }</li>
                                            <li><b style="color: #fc1870">ADS:</b> X{winner.adMultiplier + 1}</li>

                                            <li class:line-through={!winner.linkMultiplier}><b style="color: #3de488">FRIENDS INVITED:</b> +{winner.linkMultiplier}
                                                %</li>

                                            <li class:line-through={!winner.eventMultiplier}><b style="color: #ee38ff">EVENT:</b> +{winner.eventMultiplier}
                                                %</li>
                                        </ul>
                                    </span>
                                    {/if}
                                </td>
                            </tr>
                        {/if}
                    {/each}
                {/each}
                </tbody>
            </table>

        </div>

    </div>

</div>
