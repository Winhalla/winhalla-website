<script>
    export let data;
    data.losses = data.games - data.wins;
    data.winRate = (data.wins / data.games) * 100;
    data.lossRate = 100 - data.winRate;


</script>


<div class="relative bg-variant max-w-max rounded-xl  p-8 ml-18 xl:ml-10   h-auto">
    <p class="absolute -top-3 text-xl text-mid-light">GLOBAL</p>
    <div class="flex">
        <div class="">
            <div class="ml-2">
                <h3 class="font-bold text-xl" style="font-family: 'Roboto Condensed', sans-serif">Total games
                    played:</h3>
                <p class="text-primary text-3xl">{data.games}</p>

                <!--Win rate details-->
                <div>
                    <div class="flex w-full  mt-4">
                        <div class="rounded-l h-1 bg-green" style="width: {data.winRate}%"></div>
                        <div class="rounded-r h-1 bg-legendary" style="width: {data.lossRate}%"></div>
                    </div>
                    <div class="flex justify-between text-xl mt-1">
                        <p class="text-green">{data.wins} <b class="font-normal ml-1">({parseInt(data.winRate)}%)</b></p>
                        <p class="text-legendary">{data.losses}</p>

                    </div>
                </div>


            </div>
            <!--Stats-->
            <div>
                <p class="ml-2 mt-9  text-xl ">KOs: <b
                        class="font-normal text-epic text-2xl">{data.kos}</b>
                <div class="ml-2 mt-1  p-4 pl-6 bg-background rounded-xl  flex">
                    <div>
                        <p class="text-lg text-mid-light mt-">Unarmed: <b
                                class="font-normal text-primary text-xl">486</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Bomb: <b
                                class="font-normal text-primary text-xl">63</b></p>
                        <p class="text-lg text-mid-light mt-">Mine: <b
                                class="font-normal text-primary text-xl">14</b></p>

                    </div>
                    <div class="ml-8">
                        <p class="text-lg text-mid-light mt-">Weapon throw: <b
                                class="font-normal text-primary text-xl">TBA</b></p>
                        <p class="text-lg text-mid-light mt-">Spikeball: <b
                                class="font-normal text-primary text-xl">27</b></p>

                    </div>
                </div>
            </div>
            <div>
                <p class="ml-2 mt-7  text-xl ">Damage: <b
                        class="font-normal text-epic text-2xl">{data.damagedealt}</b>
                <div class="ml-2 mt-1  p-4 pl-6 bg-background rounded-xl  flex">
                    <div>
                        <p class="text-lg text-mid-light mt-">Unarmed: <b
                                class="font-normal text-primary text-xl">{data.damageunarmed}</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Bomb: <b
                                class="font-normal text-primary text-xl">{data.damagebomb}</b></p>
                        <p class="text-lg text-mid-light mt-">Mine: <b
                                class="font-normal text-primary text-xl">{data.damagemine}</b></p>

                    </div>
                    <div class="ml-8">
                        <p class="text-lg text-mid-light mt-">Weapon throw: <b
                                class="font-normal text-primary text-xl">TBA</b></p>
                        <p class="text-lg text-mid-light mt-">Spikeball: <b
                                class="font-normal text-primary text-xl">{data.damagespikeball}</b></p>

                    </div>
                </div>
            </div>


        </div>
    </div>
</div>