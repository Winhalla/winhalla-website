<script>
    import {apiUrl} from "../utils/config";
    import {callApi} from "../utils/api";
    import GlobalStats from "../components/profile/GlobalStats.svelte";
    import RankedStats from "../components/profile/RankedStats.svelte";
    import LegendWeaponStats from "../components/profile/LegendStats.svelte";
    import LegendStats from "../components/profile/LegendStats.svelte";
    import WeaponStats from "../components/profile/WeaponStats.svelte";

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


    let loaded;

    let data;
    let playerData;
    let rankedData;

    const res = new Promise(async () => {
        const playerId = await callApi("get", `${apiUrl}/stats/username/philtrom`);

        data = await callApi("get", `${apiUrl}/stats/${playerId}`);
        playerData = data.player;

        playerData.matchtime = 0;
        playerData.damageunarmed = 0;
        playerData.kosunarmed = 0;
        playerData.kos = 0;
        playerData.damagedealt = 0;

        rankedData = data.ranked;

        for (let l of playerData.legends) {
            //faut voir si damagethrownitem c que pour les armes si oui faut add
            playerData.matchtime += l.matchtime;
            playerData.damageunarmed += parseInt(l.damageunarmed);
            playerData.kosunarmed += l.damageunarmed;
            playerData.kos += l.kos;
            playerData.damagedealt += parseInt(l.damagedealt);

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
        console.log(playerData.matchtime)
        loaded = true;
    });

    function formatTime(seconds) {
        return [
                parseInt(seconds / 60 / 60),
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60)
            ]
                .join(":")
                .replace(":", "h ")
                .replace(":", "m ")
                .replace(/\b(\d)\b/g, "0$1") //add a 0 in front of number if necessary
            + "s"
    }
</script>

{#if loaded}
    <section class="h-64 bg-variant pl-23 pr-18   flex flex-col justify-between">
        <div class="flex items-center justify-between   mt-21">
            <div>
                <p class="text-3xl">
                    {playerData.name}
                </p>
                <p class="mt-1 text-mid-light">
                    {playerData.clan.clan_name}
                </p>
            </div>


            <div class="text-ultra-light mt-2">
                <p>Level: <b class="font-normal text-primary text-2xl">{playerData.level}</b></p>
                <p class="mt-1">Time spent in online games: <b
                        class="font-normal text-primary text-2xl">{formatTime(playerData.matchtime)}</b>
                </p>
            </div>
        </div>

        <div class="flex">
            <a class="text-primary  border-b-2 border-primary" href="/profile?d=brawlhalla">Bralhalla</a>

            <a class="ml-11" href="/profile?d=winhalla">Winhalla</a>
        </div>
    </section>


    <section class="px-18 pb-12 lg:flex justify-between flex-wrap items-start">
        <div class="mt-12  md:flex items-start">
            <RankedStats data="{rankedData}"/>
            <GlobalStats data="{playerData}"/>
        </div>


        <div class="pt-12 mt-6 xl:mt-0    md:flex items-start">
            <LegendStats data={playerData.legends}/>
            <WeaponStats data={weaponObj}/>
        </div>
    </section>
{/if}

