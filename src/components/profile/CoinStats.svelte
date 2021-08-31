<script>
    export let user;
    export let data;
</script>

<div class="relative bg-variant  rounded-2xl   p-8  mt-12 xl:ml-5   h-auto w-full md:w-auto">
    <p class="absolute -top-3 text-xl text-mid-light">COINS</p>

    <div class="md:ml-2">
        <div class="xl:flex  justify-between items-center   w-full">
            <div class="">
                <h3 class="font-bold text-default" style="font-family: 'Roboto Condensed', sans-serif">Total coins
                    earned:</h3>
                <p class="text-primary text-3xl">{Math.floor((data.beta+data.link+data.solo+data.dailyQuests+data.weeklyQuests)*10)/10}</p>
            </div>
            {#if data.beta}
                <div class="mt-6 xl:mt-0">
                    <h3 class="font-bold text-xl" style="font-family: 'Roboto Condensed', sans-serif">Coins from beta:</h3>
                    <p class="text-accent text-2xl">{Math.floor(data.beta * 10) / 10}</p>
                </div>
            {/if}

        </div>

        {#if data}
            <div class="xl:flex  {data.beta ? 'mt-10' : 'mt-6'}">
                <div class="">
                    <div class="flex items-center  xl:block">
                        <h3 class="text-xl">SOLO coins:</h3>
                        <p class="text-xl   text-epic   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                                              style="margin-right: 0.15rem">{Math.round(data.solo * 10) / 10}</strong>
                            ({(Math.round(data.solo / user.coins * 1000) / 10) || 0} %)</p>
                    </div>


                    <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                        <p class="text-mid-light mt-">Games played: <b
                            class="font-normal text-primary text-xl">{user.stats.solo.gamesPlayed}</b>
                        </p>
                        <p class="text-mid-light mt-">Games won: <b
                            class="font-normal text-primary text-xl">{user.stats.solo.wins}</b>
                        </p>
                    </div>
                </div>


                <div class="mt-8 xl:mt-0  xl:ml-12 2xl:ml-17">
                    <div class="flex items-center  xl:block">
                        <h3 class="text-xl">Quests coins:</h3>
                        <p class="text-xl   text-legendary   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                                                   style="margin-right: 0.15rem">{Math.round(data.dailyQuests + data.weeklyQuests * 10) / 10}</strong>
                            ({(Math.round((data.dailyQuests + data.weeklyQuests) / user.coins * 1000) / 10) || 0}%)</p>
                    </div>


                    <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                        <p class="text-mid-light mt-">From dailies: <b
                            class="font-normal text-primary text-xl">{Math.round(data.dailyQuests * 10) / 10}</b>
                        </p>
                        <p class="text-mid-light mt-">From weeklies: <b
                            class="font-normal text-primary text-xl">{Math.round(data.weeklyQuests * 10) / 10}</b>
                        </p>
                    </div>
                </div>


                <div class="mt-8 xl:mt-0  xl:ml-12 2xl:ml-17">
                    <div class="flex items-center  xl:block">
                        <h3 class="text-xl">Referral link coins:</h3>
                        <p class="text-xl   text-green   ml-2 xl:ml-0"><strong class="font-normal  text-2xl"
                                                                               style="margin-right: 0.15rem">{Math.round(data.link * 10) / 10}</strong>
                            ({(Math.round(data.link / user.coins * 1000) / 10) || 0}%)</p>
                    </div>

                    <div class="mt-2  p-4 pl-6 bg-background rounded-xl  text-lg">
                        <p class="text-mid-light mt-">Friends invited: <b
                            class="font-normal text-primary text-xl">{user.friendsInvited}</b>
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>