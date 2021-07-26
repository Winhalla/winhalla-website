<script>
    export let data;
    console.log(data)
    data.losses = data.games - data.wins;
    data.winRate = (data.wins / data.games) * 100;
    data.lossRate = 100 - data.winRate;
    
    
    function determineTeammateName(teamname) {
        const regex = /(.+)\+(.+)/g;
        const currentName = regex.exec(teamname);

        if(currentName[2] === data.name) return currentName[1]
        return currentName[2];
    }
</script>

<div class="md:flex items-start  /xl:mr-24">
    <div class="relative bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full">
        <p class="absolute -top-3 text-xl text-mid-light">RANKED</p>
        <div class="flex">
            <div>
                <img class="w-26 md:w-32" src="/assets/RankedBanners/{data.tier.replace(' ', '_')}.png" alt="">

            </div>
            <div class="ml-6">
                <div class="ml-2">
                    <h3 class="font-bold  text-lg md:text-xl" style="font-family: 'Roboto Condensed', sans-serif">Ranking
                        Solo:</h3>
                    <p class="text-primary   text-2xl md:text-3xl">{data.tier}</p>

                </div>
                <div class="hidden lg:block  ml-2 mt-5  p-4 pl-6 bg-background rounded-xl">
                    <p class="text-lg text-mid-light  ">Current elo: <b
                            class="font-normal text-primary text-xl">{data.rating}</b>
                    </p>
                    <p class="text-lg text-mid-light">Best elo: <b
                            class="font-normal text-epic text-xl">{data.peak_rating}</b>
                    </p>
                </div>
            </div>

        </div>

        <!--Mobile ranked stats-->
        <div class="lg:hidden  mt-5  p-4 pl-6 bg-background rounded-xl">
            <p class="text-lg text-mid-light  ">Current elo: <b
                    class="font-normal text-primary text-xl">{data.rating}</b>
            </p>
            <p class="text-lg text-mid-light">Best elo: <b
                    class="font-normal text-epic text-xl">{data.peak_rating}</b>
            </p>
        </div>


        <div class="mt-8">
            <h3 class="font-bold text-lg" style="font-family: 'Roboto Condensed', sans-serif">Games played: <b
                    class="text-primary text-xl">{data.games}</b></h3>

            <!--Win rate details-->
            <div class="md:mr-18">
                <div class="flex w-full  mt-4 ">
                    <div class="rounded-l h-1 bg-green" style="width: {data.winRate}%"></div>
                    <div class="rounded-r h-1 bg-legendary" style="width: {data.lossRate}%"></div>
                </div>
                <div class="flex justify-between text-lg mt-1">
                    <p class="text-green">{data.wins} <b class="font-normal ml-1">({parseInt(data.winRate)}%)</b></p>
                    <p class="text-legendary">{data.losses}</p>

                </div>
            </div>
        </div>


        <div class="mt-12">
            <h3>Best Teams:</h3>

            <div class="-mt-2">
                {#each data["2v2"].sort((a, b) => b.rating - a.rating).slice(0, 3) as duo}
                    <div class="team-container  lg:flex justify-between  my-6">
                        <div class="flex">
                            <img class="w-14" src="/assets/RankedBanners/{duo.tier.replace(' ', '_')}.png" alt="">
                            <div>
                                <div class="ml-4 pr-6  flex  lg:block">
                                    <p class="text-primary text-2xl">{duo.tier}</p>
                                    <p class="ml-4   lg:ml-0   text-mid-light text-xl">{duo.rating} Elo</p>
                                </div>
                                <p class="lg:hidden ml-4 mt-1  text-base text-mid-light">With: <b
                                        class="font-normal text-font  text-lg lg:text-xl">{determineTeammateName(duo.teamname)}</b>
                                </p>
                            </div>

                        </div>
                        <div>
                            <p class="hidden lg:block  text-lg text-mid-light">With: <b
                                    class="font-normal text-font text-xl">{determineTeammateName(duo.teamname)}</b>
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>