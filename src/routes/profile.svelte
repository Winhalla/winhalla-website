<script>
    import {apiUrl} from "../utils/config";
    import {callApi} from "../utils/api";

    const legendObj = {
        bodvar: {weapon_one: 'Hammer', weapon_two: 'Sword'},
        cassidy: {weapon_one: 'Pistol', weapon_two: 'Hammer'},
        orion: {weapon_one: 'RocketLance', weapon_two: 'Spear'},
        'lord vraxx': {weapon_one: 'RocketLance', weapon_two: 'Pistol'},
        gnash: {weapon_one: 'Hammer', weapon_two: 'Spear'},
        'queen nai': {weapon_one: 'Spear', weapon_two: 'Katar'},
        hattori: {weapon_one: 'Sword', weapon_two: 'Spear'},
        'sir roland': {weapon_one: 'RocketLance', weapon_two: 'Sword'},
        scarlet: {weapon_one: 'Hammer', weapon_two: 'RocketLance'},
        thatch: {weapon_one: 'Sword', weapon_two: 'Pistol'},
        ada: {weapon_one: 'Pistol', weapon_two: 'Spear'},
        sentinel: {weapon_one: 'Hammer', weapon_two: 'Katar'},
        lucien: {weapon_one: 'Katar', weapon_two: 'Pistol'},
        teros: {weapon_one: 'Axe', weapon_two: 'Hammer'},
        brynn: {weapon_one: 'Axe', weapon_two: 'Spear'},
        asuri: {weapon_one: 'Katar', weapon_two: 'Sword'},
        barraza: {weapon_one: 'Axe', weapon_two: 'Pistol'},
        ember: {weapon_one: 'Bow', weapon_two: 'Katar'},
        azoth: {weapon_one: 'Bow', weapon_two: 'Axe'},
        koji: {weapon_one: 'Bow', weapon_two: 'Sword'},
        ulgrim: {weapon_one: 'Axe', weapon_two: 'RocketLance'},
        diana: {weapon_one: 'Bow', weapon_two: 'Pistol'},
        jhala: {weapon_one: 'Axe', weapon_two: 'Sword'},
        kor: {weapon_one: 'Fists', weapon_two: 'Hammer'},
        'wu shang': {weapon_one: 'Fists', weapon_two: 'Spear'},
        val: {weapon_one: 'Fists', weapon_two: 'Sword'},
        ragnir: {weapon_one: 'Katar', weapon_two: 'Axe'},
        cross: {weapon_one: 'Pistol', weapon_two: 'Fists'},
        mirage: {weapon_one: 'Scythe', weapon_two: 'Spear'},
        nix: {weapon_one: 'Scythe', weapon_two: 'Pistol'},
        mordex: {weapon_one: 'Scythe', weapon_two: 'Fists'},
        yumiko: {weapon_one: 'Bow', weapon_two: 'Hammer'},
        artemis: {weapon_one: 'RocketLance', weapon_two: 'Scythe'},
        caspian: {weapon_one: 'Fists', weapon_two: 'Katar'},
        sidra: {weapon_one: 'Cannon', weapon_two: 'Sword'},
        xull: {weapon_one: 'Cannon', weapon_two: 'Axe'},
        kaya: {weapon_one: 'Spear', weapon_two: 'Bow'},
        isaiah: {weapon_one: 'Cannon', weapon_two: 'Pistol'},
        jiro: {weapon_one: 'Sword', weapon_two: 'Scythe'},
        'lin fei': {weapon_one: 'Katar', weapon_two: 'Cannon'},
        zariel: {weapon_one: 'Fists', weapon_two: 'Bow'},
        rayman: {weapon_one: 'Fists', weapon_two: 'Axe'},
        dusk: {weapon_one: 'Spear', weapon_two: 'Orb'},
        fait: {weapon_one: 'Scythe', weapon_two: 'Orb'},
        thor: {weapon_one: 'Hammer', weapon_two: 'Orb'},
        petra: {weapon_one: 'Fists', weapon_two: 'Orb'},
        vector: {weapon_one: 'RocketLance', weapon_two: 'Bow'},
        volkov: {weapon_one: 'Axe', weapon_two: 'Scythe'},
        onyx: {weapon_one: 'Fists', weapon_two: 'Cannon'},
        jaeyun: {weapon_one: 'Sword', weapon_two: 'Greatsword'},
        mako: {weapon_one: 'Katar', weapon_two: 'Greatsword'},
        magyar: {weapon_one: 'Hammer', weapon_two: 'Greatsword'},
        reno: {weapon_one: 'Pistol', weapon_two: 'Orb'}
    }
    const weaponObj = {
        "Hammer": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Sword": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Pistol": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "RocketLance": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Spear": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Katar": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Axe": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Fists": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Bow": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Cannon": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Orb": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Scythe": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        },
        "Greatsword": {
            time_held: 0,
            games_played: 0,
            kos: 0,
            damage: 0,
        }
    }

    const res = new Promise(async () => {
        const playerId = await callApi("get", `${apiUrl}/stats/username/23felons23`);

        const data = await callApi("get", `${apiUrl}/stats/${playerId}`);
        const playerData = data.player;
        playerData.matchtime = 0;
        const rankedData = data.ranked;

        for (let l of playerData.legends) {
            playerData.matchtime += l.matchtime

            const legendWeaponOne = legendObj[l.legend_name_key].weapon_one;
            const legendWeaponTwo = legendObj[l.legend_name_key].weapon_two;

            weaponObj[legendWeaponOne].time_held += l.timeheldweaponone;
            weaponObj[legendWeaponOne].games_played += l.games;
            weaponObj[legendWeaponOne].kos += l.koweaponone;
            weaponObj[legendWeaponOne].damage += parseInt(l.damageweaponone);


            weaponObj[legendWeaponTwo].time_held += l.timeheldweapontwo;
            weaponObj[legendWeaponTwo].games_played += l.games;
            weaponObj[legendWeaponTwo].kos += l.koweapontwo;
            weaponObj[legendWeaponTwo].damage += parseInt(l.damageweapontwo);
        }
    });
</script>


<section class="h-64 bg-variant pl-23 pr-18   flex flex-col justify-between">
    <div class="flex items-center justify-between   mt-21">
        <div>
            <p class="text-3xl">
                Felons
            </p>
            <p class="mt-1 text-mid-light">
                Les Poros
            </p>
        </div>


        <div class="text-ultra-light mt-2">
            <p>Level: <b class="font-normal text-primary text-2xl">59</b></p>
            <p class="mt-1">Time spent in online games: <b class="font-normal text-primary text-2xl">148h 42m 21s</b>
            </p>
        </div>
    </div>

    <div class="flex">
        <a class="text-primary  border-b-2 border-primary" href="/profile?d=brawlhalla">Bralhalla</a>

        <a class="ml-11" href="/profile?d=winhalla">Winhalla</a>
    </div>
</section>
<section class="px-18 pb-12 lg:flex justify-between flex-wrap items-start">
    <div class="mt-12  md:flex items-start  /xl:mr-24">
        <div class="relative bg-variant max-w-max rounded-xl  p-8 h-auto">
            <p class="absolute -top-3 text-xl text-mid-light">RANKED</p>
            <div class="flex">
                <div>
                    <img class="w-32" src="/assets/RankedBanners/Gold_1.png" alt="">

                </div>
                <div class="ml-6">
                    <div class="ml-2">
                        <h3 class="font-bold text-xl" style="font-family: 'Roboto Condensed', sans-serif">Ranking
                            Solo:</h3>
                        <p class="text-primary text-3xl">GOLD 1</p>

                    </div>
                    <div class="ml-2 mt-5  p-4 pl-6 bg-background rounded-xl">
                        <p class="text-lg text-mid-light  ">Current elo: <b
                                class="font-normal text-primary text-xl">1438</b>
                        </p>
                        <p class="text-lg text-mid-light">Best elo: <b class="font-normal text-epic text-xl">1592</b>
                        </p>
                    </div>
                    <!--<div class="ml-2 mt-4  p-4 pl-6 bg-background rounded-xl">
                        <p class="text-lg text-mid-light">Games played: <b
                                class="font-normal text-primary text-xl">491</b>
                        </p>
                        <p class="text-lg text-mid-light">Win rate: <b class="font-normal text-primary text-xl">54%</b> (<b
                                class="font-normal text-green text-xl">251</b>/<b
                                class="font-normal text-legendary text-xl">241</b>)</p></div>-->


                </div>

            </div>

            <div class="mt-8">
                <h3 class="font-bold text-lg" style="font-family: 'Roboto Condensed', sans-serif">Games played: <b
                        class="text-primary text-xl">14</b></h3>

                <!--Win rate details-->
                <div class="mr-18">
                    <div class="flex w-full  mt-4 ">
                        <div class="rounded-l h-1 bg-green" style="width: 74%"></div>
                        <div class="rounded-r h-1 bg-legendary" style="width: 26%"></div>
                    </div>
                    <div class="flex justify-between text-lg mt-1">
                        <p class="text-green">11 <b class="font-normal ml-1">(74%)</b></p>
                        <p class="text-legendary">3</p>

                    </div>
                </div>
            </div>


            <div class="mt-12">
                <h3>Best Teams:</h3>

                <div class="mt-0">
                    <div class="team-container flex justify-between  my-4">
                        <div class="flex">
                            <img class="w-18" src="/assets/RankedIcons/Silver_1.png" alt="">
                            <div class="ml-4">
                                <p class="text-primary text-2xl">Silver 5</p>
                                <p class="text-mid-light text-xl">1385 Elo</p>
                            </div>
                        </div>
                        <div>
                            <p class="text-lg text-mid-light">With: <b
                                    class="font-normal text-font text-xl">StPersan</b>
                            </p>
                        </div>
                    </div>
                    <div class="team-container flex justify-between  mt-8">
                        <div class="flex">
                            <img class="w-18" src="/assets/RankedIcons/Silver_1.png" alt="">
                            <div class="ml-4">
                                <p class="text-primary text-2xl">Silver 6</p>
                                <p class="text-mid-light text-xl">1400 Elo</p>
                            </div>
                        </div>
                        <div>
                            <p class="text-lg text-mid-light">With: <b
                                    class="font-normal text-font text-xl">Philtrom</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative bg-variant max-w-max rounded-xl  p-8 ml-18 xl:ml-10   h-auto">
            <p class="absolute -top-3 text-xl text-mid-light">GLOBAL</p>
            <div class="flex">
                <div class="">
                    <div class="ml-2">
                        <h3 class="font-bold text-xl" style="font-family: 'Roboto Condensed', sans-serif">Total games
                            played:</h3>
                        <p class="text-primary text-3xl">2571</p>

                        <!--Win rate details-->
                        <div>
                            <div class="flex w-full  mt-4">
                                <div class="rounded-l h-1 bg-green" style="width: 28%"></div>
                                <div class="rounded-r h-1 bg-legendary" style="width: 72%"></div>
                            </div>
                            <div class="flex justify-between text-xl mt-1">
                                <p class="text-green">848 <b class="font-normal ml-1">(28%)</b></p>
                                <p class="text-legendary">1723</p>

                            </div>
                        </div>


                    </div>
                    <!--Stats-->
                    <div>
                        <p class="ml-2 mt-9  text-xl ">KOs: <b
                                class="font-normal text-epic text-2xl">5632</b>
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
                                        class="font-normal text-primary text-xl">104</b></p>
                                <p class="text-lg text-mid-light mt-">Spikeball: <b
                                        class="font-normal text-primary text-xl">27</b></p>
                                <p class="text-lg text-mid-light mt-">Snowball: <b
                                        class="font-normal text-primary text-xl">3</b>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="ml-2 mt-7  text-xl ">Damage: <b
                                class="font-normal text-epic text-2xl">54 023</b>
                        <div class="ml-2 mt-1  p-4 pl-6 bg-background rounded-xl  flex">
                            <div>
                                <p class="text-lg text-mid-light mt-">Unarmed: <b
                                        class="font-normal text-primary text-xl">864</b>
                                </p>
                                <p class="text-lg text-mid-light mt-">Bomb: <b
                                        class="font-normal text-primary text-xl">212</b></p>
                                <p class="text-lg text-mid-light mt-">Mine: <b
                                        class="font-normal text-primary text-xl">113</b></p>

                            </div>
                            <div class="ml-8">
                                <p class="text-lg text-mid-light mt-">Weapon throw: <b
                                        class="font-normal text-primary text-xl">312</b></p>
                                <p class="text-lg text-mid-light mt-">Spikeball: <b
                                        class="font-normal text-primary text-xl">1024</b></p>
                                <p class="text-lg text-mid-light mt-">Snowball: <b
                                        class="font-normal text-primary text-xl">38</b>
                                </p>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>


    <div class="pt-12 mt-6 xl:mt-0    md:flex items-start">
        <div class="relative bg-variant min-w-md rounded-xl  p-8    h-auto" style="min-width: 22rem;">
            <p class="absolute -top-3 text-xl text-mid-light">LEGENDS</p>

            <div class="ml-2 mt-1  bg-background p-6 pt-4  rounded-xl">
                <div class="flex items-center">
                    <img class="w-12 mr-3" src="/assets/LegendIcons/ada.png" alt="">
                    <select class="w-full bg-background p-3 pl-4  rounded-xl  border-4 border-variant     focus:outline-none"
                            name="Choose a Weapon">
                        <option value="">Ada</option>
                        <option class="" value="">
                            Nix
                        </option>
                        <option value="">Orion</option>
                        <option value="">Petra</option>
                        <option value="">Wu Shang</option>
                    </select>


                </div>
                <div class="mt-6 ml-2  text-xl  ">
                    <p class="text-mid-light mt-">Time played: <b class="  font-normal text-primary text-2xl">18h
                        10m 36s</b>
                    </p>
                    <p class="text-mid-light mt-">Level: <b class="  font-normal text-primary text-2xl">28</b>
                    </p>
                    <p class="text-mid-light mt-3">Games played: <b
                            class="font-normal text-primary text-2xl">54</b>
                    </p>
                    <p class="text-mid-light mt-">Win rate: <b class="font-normal text-primary text-2xl">
                        58%</b>
                    </p>
                    <p class="text-mid-light mt-3">KOs: <b class="font-normal text-primary text-2xl">330</b>
                    </p>
                    <p class="text-mid-light mt-">Damage dealt: <b class="font-normal text-primary text-2xl">16845</b>
                    </p>
                </div>
            </div>


            <div class="mt-14 ml-2 w-full">

                <div class="flex text-xl  -mt-2  ">
                    <div class="flex items-center  text-lg">
                        <select class="bg-background p-3  rounded-lg     focus:outline-none" name="Choose a Weapon"
                                id="">
                            <option class="" value="">Win rate</option>
                            <option value="">Time played</option>
                            <option value="">Games Played</option>
                            <option value="">KOs</option>
                            <option value="">Damage</option>

                        </select>
                    </div>

                    <div class="flex items-center ml-5 text-lg">
                        <p class="mr-2">Display:</p>
                        <input class="w-12  bg-background p-3 pr-0 rounded-lg" value="2" type="number" min="1" step="1">
                    </div>
                </div>
                <div class="w-full  mt-5  p-4 pl-6 bg-background rounded-xl">
                    <button class="w-full flex items-center">

                        <div>
                            <img class="w-10" src="/assets/LegendIcons/ada.png" alt="">
                        </div>
                        <div class="flex justify-between w-full">
                            <p class="ml-3">ADA</p>
                            <p class="text-green">
                                58%
                            </p>
                        </div>

                        <div class="ml-3 /-mt-2 text-3xl text-light" style="font-family: sans-serif">
                            +
                        </div>
                    </button>

                    <!--<div class="mt-4">
                        <p class="text-lg text-mid-light mt-">Time played: <b class="font-normal text-primary text-xl">28h
                            24m 31s</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Games played: <b
                                class="font-normal text-primary text-xl">54</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">KOs: <b class="font-normal text-primary text-xl">68</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Damage dealt: <b class="font-normal text-primary text-xl">16845</b>
                        </p>
                    </div>-->
                </div>
                <div class="w-full  mt-3  p-4 pl-6 bg-background rounded-xl">
                    <button class="w-full flex items-center">

                        <div>
                            <img class="w-10" src="/assets/LegendIcons/nix.png" alt="">
                        </div>
                        <div class="flex justify-between w-full">
                            <p class="ml-3">NIX</p>
                            <p class="text-green">
                                52%
                            </p>
                        </div>

                        <div class="ml-3 /-mt-2 text-3xl text-light" style="font-family: sans-serif">
                            +
                        </div>
                    </button>

                    <!--<div class="mt-4">
                        <p class="text-lg text-mid-light mt-">Time played: <b class="font-normal text-primary text-xl">28h
                            24m 31s</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Games played: <b
                                class="font-normal text-primary text-xl">54</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">KOs: <b class="font-normal text-primary text-xl">68</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Damage dealt: <b class="font-normal text-primary text-xl">16845</b>
                        </p>
                    </div>-->
                </div>

            </div>

        </div>
        <div class="relative bg-variant rounded-xl  p-8 ml-18 xl:ml-10   h-auto" style="min-width: 21rem">
            <p class="absolute -top-3 text-xl text-mid-light">WEAPONS</p>

            <div class="ml-2 mt-1  bg-background p-6 pt-4  rounded-xl">
                <div class="flex items-center">
                    <img class="w-10 mr-4" src="/assets/WeaponIcons/blasters.png" alt="">
                    <select class="w-full bg-background p-3 pl-4  rounded-xl  border-4 border-variant     focus:outline-none"
                            name="Choose a Weapon">
                        <option value="">Blasters</option>
                        <option class="" value="">
                            Nix
                        </option>
                        <option value="">Orion</option>
                        <option value="">Petra</option>
                        <option value="">Wu Shang</option>
                    </select>


                </div>
                <div class="mt-6 ml-2  text-xl  ">
                    <p class="text-mid-light mt-">Time held: <b class="  font-normal text-primary text-2xl">18h
                        10m 36s</b>
                    </p>
                    <p class="text-mid-light mt-">Games played: <b
                            class="font-normal text-primary text-2xl">54</b>
                    </p>

                    <p class="text-mid-light mt-3">KOs: <b class="font-normal text-primary text-2xl">330</b>
                    </p>
                    <p class="text-mid-light mt-">Damage dealt: <b class="font-normal text-primary text-2xl">16845</b>
                    </p>
                </div>
            </div>


            <div class="mt-14  ml-2 w-full">
                <div class="flex text-xl  -mt-2">
                    <div class="flex items-center  text-lg">
                        <select class="bg-background p-3  rounded-lg     focus:outline-none" name="Choose a Weapon">
                            <option class="p-2" value="">Win rate</option>
                            <option value="">Time held</option>
                            <option value="">Games Played</option>
                            <option value="">KOs</option>
                            <option value="">Damage</option>

                        </select>
                    </div>

                    <div class="flex items-center ml-5  text-lg">
                        <p class="mr-2">Display:</p>
                        <input class="w-12  bg-background p-3 pr-0 rounded-lg" value="3" type="number" min="1" step="1">
                    </div>
                </div>
                <div class="w-full  mt-6  p-4 pl-6 bg-background rounded-xl">
                    <button class="w-full flex items-center">

                        <div>
                            <img class="w-8" src="/assets/WeaponIcons/blasters.png" alt="">
                        </div>
                        <div class="flex justify-between w-full">
                            <p class="ml-3">Blasters</p>
                            <p class="text-green">
                                58%
                            </p>
                        </div>

                        <div class="ml-3 -mt-2 text-3xl text-light" style="font-family: sans-serif">
                            -
                        </div>
                    </button>

                    <div class="mt-4">
                        <p class="text-lg text-mid-light mt-">Time held: <b class="font-normal text-primary text-xl">28h
                            24m
                            31s</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Games played: <b
                                class="font-normal text-primary text-xl">54</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Kos: <b class="font-normal text-primary text-xl">68</b>
                        </p>
                        <p class="text-lg text-mid-light mt-">Damage dealt: <b class="font-normal text-primary text-xl">16845</b>
                        </p>
                    </div>
                </div>


                <button class="w-full  mt-2  p-4 pl-6 bg-background rounded-xl  flex items-center">

                    <div>
                        <img class="w-8" src="/assets/WeaponIcons/axe.png" alt="">
                    </div>
                    <div class="flex justify-between w-full">
                        <p class="ml-3">Axe</p>
                        <p class="text-green">
                            52%
                        </p>
                    </div>

                    <div class="ml-3 text-3xl text-light" style="font-family: sans-serif">
                        +
                    </div>
                </button>
                <button class="w-full  mt-2  p-4 pl-6 bg-background rounded-xl  flex items-center">

                    <div>
                        <img class="w-8" src="/assets/WeaponIcons/lance.png" alt="">
                    </div>
                    <div class="flex justify-between w-full">
                        <p class="ml-3">Lance</p>
                        <p class="text-green">
                            46%
                        </p>
                    </div>

                    <div class="ml-3 text-3xl text-light" style="font-family: sans-serif">
                        +
                    </div>
                </button>
                <!--Win rate details-->


            </div>

        </div>
    </div>
</section>
<section></section>


<style>
    .team-container {
        @apply rounded-xl;
    }
</style>
