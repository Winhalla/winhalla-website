<script>
    export let user;
    export let data;
    console.log(data)
</script>

<div class="relative bg-variant  rounded-2xl   p-8  mt-12 xl:ml-5   h-auto w-full md:w-auto">
    <p class="absolute -top-3 text-xl text-mid-light">COINS</p>

    <div class="md:ml-2">
        <div class="">
            <h3 class="font-bold text-default" style="font-family: 'Roboto Condensed', sans-serif">Total coins
                earned:</h3>
            <p class="text-primary text-3xl">{Math.floor(user.coins * 10) / 10}</p>
        </div>

        <div class="xl:flex  mt-6">
            <div class="">
                <div class="flex items-center  xl:block">
                    <h3 class="text-xl">SOLO coins:</h3>
                    <p class="text-xl   text-epic   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                                          style="margin-right: 0.15rem">{data.solo}</strong>
                        ({data.solo / user.coins * 100} %)</p>
                </div>


                <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                    <p class="text-mid-light mt-">Games played: <b
                            class="font-normal text-primary text-xl">178</b>
                    </p>
                    <p class="text-mid-light mt-">Games won: <b
                            class="font-normal text-primary text-xl">71</b>
                    </p>
                </div>
            </div>


            <div class="mt-8 xl:mt-0  xl:ml-12 2xl:ml-17">
                <div class="flex items-center  xl:block">
                    <h3 class="text-xl">Quests coins:</h3>
                    <p class="text-xl   text-legendary   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                                               style="margin-right: 0.15rem">{data.dailyQuests + data.weeklyQuests}</strong>
                        ({parseInt((data.dailyQuests + data.weeklyQuests) / user.coins * 100)}%)</p>
                </div>


                <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                    <p class="text-mid-light mt-">From dailies: <b
                            class="font-normal text-primary text-xl">{data.dailyQuests}</b>
                    </p>
                    <p class="text-mid-light mt-">From weeklies: <b
                            class="font-normal text-primary text-xl">{data.weeklyQuests}</b>
                    </p>
                </div>
            </div>


            <div class="mt-8 xl:mt-0  xl:ml-12 2xl:ml-17">
                <div class="flex items-center  xl:block">
                    <h3 class="text-xl">Referral link coins:</h3>
                    <p class="text-xl   text-green   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                             style="margin-right: 0.15rem">{data.link}</strong>
                        ({data.link / user.coins * 100}%)</p>
                </div>

                <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                    <p class="text-mid-light mt-">Friends invited: <b
                            class="font-normal text-primary text-xl">6</b>
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>