<!--
<script>
    import CoinIcon from "../components/CoinIcon.svelte";
    import { onMount } from "svelte";
    import { getUser, callApi } from "../utils/api";

    let user;
    let leaderboard;
    let player;
    let config;
    let loaded = false;
    onMount(async () => {
        user = await getUser();
        user = user.user;
        leaderboard = await callApi("get", "/leaderboard");
        player = leaderboard.player;
        console.log(player.index, player.array);
        config = leaderboard.config;
        leaderboard = leaderboard.leaderboard;
        leaderboard.baseLengths = [];
        console.log(leaderboard);
        leaderboard.players.forEach((e, i) => {
            if (e.length === 0) return leaderboard.baseLengths.push(e.length);

            if (i === 0)
                leaderboard.baseLengths.push(e.length);
            else
                leaderboard.baseLengths.push(e.length + leaderboard.baseLengths.reduce((a, b) => a + b));
        });
        loaded = true;
    });
    let indexes = ["top 3", "top 10", "top 10%", "top 25%", "top 50%"];
</script>

{#if loaded === true}
    <div class="lg:ml-24 mt-14  ml-8 md:mx-8 mb-10">
        <div class="md:flex items-end">
            <h1 class="text-6xl">Weekly Leaderboard</h1>
            <p
                class="timer text-primary   mt-1 md:mt-0 md:ml-5 text-4xl leading-none" style="margin-bottom: 0.35rem">
                4:08:46:23
            </p>
        </div>

        <div class="md:flex items-center   mt-8 md:mt-5">
            <div class="flex items-center">
                <h2 class="text-3xl text-mid-light">Total reward: <b
                    class="ml-1 text-4xl  font-normal  text-primary">{config.value.coinsPerUser*leaderboard.players.reduce((a,b)=>typeof a === "number"?a+b.length:a.length+b.length)}</b>
                </h2>
                <div class="ml-1 pb-2  w-10 text-primary">
                    <CoinIcon />
                </div>
            </div>

            <h2 class="mt-1 md:mt-0  md:ml-3 text-3xl text-mid-light">for <b
                class="mx-1 text-4xl  font-normal  text-primary">{leaderboard.players.reduce((a,b)=>typeof a === "number"?a+b.length:a.length+b.length)}</b> participants
            </h2>
        </div>

        <div class="overflow-x-scroll md:overflow-x-hidden  w-auto md:w-full  lg:w-3/4 2xl:w-1/2">
            <div class="mt-14 md:mt-16    relative  bg-variant  rounded-2xl   p-8   w-max md:w-auto">

                <div class="w-full  absolute -top-3 text-xl text-mid-light">
                    <p class="ml-2">Ranking</p>
                </div>

                <div
                    class="py-4 px-6 bg-background rounded-xl  text-xl text-mid-light font-bold  /mt-3    flex items-center  justify-between  relative"
                    style="font-family: 'Roboto Condensed', sans-serif;">
                    <p>
                        Username:
                    </p>

                    <p class="absolute  left-62 lg:left-74">
                        Coins earned this week:
                    </p>

                    <p class="pl-94">
                        Current reward:
                    </p>
                </div>
                {#if player?.player}
                    <div class="w-full relative z-10 -bottom-8 text-xl text-mid-light">
                        <p class="ml-6 text-primary">You</p>
                    </div>
                    <div
                        class="py-4 px-6 bg-background rounded-xl text-2xl mt-4 flex items-center md:justify-between relative">
                        <div class="flex items-center">

                            {#if player.array > 0}
                                <p class="text-legendary  /font-bold">{player.index + 1 + leaderboard.baseLengths[player.array - 1]}</p>
                            {:else if player.array === 0}
                                <p class="text-legendary  /font-bold ml-1 mt-1">{player.index + 1}</p>
                            {:else}
                                <p class="text-legendary  /font-bold ml-1 mt-1">&#45;&#45;</p>

                            {/if}
                            <div class="ml-6  flex  w-38 md:w-auto">
                                <img class="rounded  w-8" src="{player.player.avatarURL}" alt="">
                                <p class="ml-2 text-primary">{player.player.brawlhallaName}</p>
                            </div>
                        </div>

                        <div class="absolute  left-62 lg:left-74   flex  items-center   text-light">
                            <p class="text-default">{Math.round(player.player.coinsThisWeek * 10) / 10}</p>
                            <div class="ml-1 pb-1  w-6 ">
                                <CoinIcon />
                            </div>
                        </div>

                        <div class="pl-94  flex  items-center   text-legendary">
                            {#if player.player.coinsEarned}
                                <p class="">{Math.round(player.player.coinsEarned * 10) / 10}</p>
                            {:else }
                                <p class="mr-2">&#45;&#45;</p>
                            {/if}
                            <div class="ml-1 pb-1  w-8 ">
                                <CoinIcon />
                            </div>
                        </div>
                    </div>
                {/if}

                {#each leaderboard.players as leaderboard1,i}
                        {#each leaderboard1 as player,ii}
                            {#if ii === 0}
                                <div class="w-full relative z-10 -bottom-8 text-xl text-mid-light">
                                    <p class="ml-6">{indexes[i]}</p>
                                </div>
                            {/if}
                            <div
                                class="py-4 px-6 bg-background rounded-t-xl  text-2xl  mt-4    flex items-center  md:justify-between  relative"
                                class:mt-0={ii===0}>
                                <div class="flex items-center">
                                    {#if i === 0}
                                        <p class="text-legendary  /font-bold">{ii + 1}</p>
                                    {:else }
                                        <p class="text-legendary  /font-bold">{ii + 1 + leaderboard.baseLengths[i - 1]}</p>
                                    {/if}

                                    <div class="ml-6  flex  w-38 md:w-auto">
                                        <img class="rounded  w-8" src="{player.avatarURL}" alt="">
                                        <p class="ml-2">{player.brawlhallaName}</p>
                                    </div>
                                </div>

                                <div class="absolute  left-62 lg:left-74   flex  items-center   text-light">
                                    <p class="text-default">{Math.round(player.coinsThisWeek * 10) / 10}</p>
                                    <div class="ml-1 pb-1  w-6 ">
                                        <CoinIcon />
                                    </div>
                                </div>

                                <div class="pl-94  flex  items-center   text-legendary">
                                    <p class="">{Math.round(player.coinsEarned * 10) / 10}</p>
                                    <div class="ml-1 pb-1  w-8 ">
                                        <CoinIcon />
                                    </div>
                                </div>
                            </div>
                        {/each}
                {/each}
                &lt;!&ndash;<div class="py-4 px-6 bg-background  text-2xl  /mt-3    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-epic  /font-bold">2</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Philtrom</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">2598</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-epic">
                        <p class="">1500</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>

                <div class="py-4 px-6 bg-background   rounded-b-xl  text-2xl  /mt-3    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-green  /font-bold">3</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">2316</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-green">
                        <p class="">750</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>

                <div class="py-4 px-6 bg-background rounded-xl    text-2xl  mt-10    flex items-center  justify-between  relative">
                    <p class="absolute text-base text-mid-light  -top-2  /-left-2 /transform  -rotate-90">You</p>
                    <div class="flex items-center">
                        <p class="text-accent  /font-bold">89</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">ElPoro</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1346</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-accent">
                        <p class="">24</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>

                <div class="py-4 px-6 bg-background rounded-t-xl    text-2xl  mt-10    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-primary  /font-bold">4</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1895</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-primary">
                        <p class="">250</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-6 bg-background   text-2xl  /mt-6    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-primary  /font-bold">5</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1838</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-primary">
                        <p class="">235</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-6 bg-background   text-2xl  /mt-6    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-primary  /font-bold">6</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1759</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-primary">
                        <p class="">215</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-6 bg-background   text-2xl  /mt-6    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-primary  /font-bold">7</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1698</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-primary">
                        <p class="">180</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-6 bg-background rounded-b-xl  text-2xl  /mt-6    flex items-center  justify-between  relative">
                    <div class="flex items-center">
                        <p class="text-primary  /font-bold">8</p>

                        <div class="ml-6  flex">
                            <img class="rounded  w-8" src="{user.avatarURL}" alt="">
                            <p class="ml-2">Persan</p>
                        </div>
                    </div>

                    <div class="absolute  left-74   flex  items-center   text-light">
                        <p class="text-default">1646</p>
                        <div class="ml-1 pb-1  w-6 ">
                            <CoinIcon/>
                        </div>
                    </div>

                    <div class="flex  items-center   text-primary">
                        <p class="">150</p>
                        <div class="ml-1 pb-1  w-8 ">
                            <CoinIcon/>
                        </div>
                    </div>
                </div>&ndash;&gt;
            </div>
        </div>

    </div>
{/if}
-->
