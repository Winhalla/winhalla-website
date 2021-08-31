<script>
    import { apiUrl } from "../../utils/config";
    import { callApi, getUser } from "../../utils/api";
    import formatTime from "../../utils/formatTime";

    import GlobalStats from "../../components/profile/GlobalStats.svelte";
    import RankedStats from "../../components/profile/RankedStats.svelte";
    import LegendWeaponStats from "../../components/profile/LegendStats.svelte";
    import LegendStats from "../../components/profile/LegendStats.svelte";
    import WeaponStats from "../../components/profile/WeaponStats.svelte";
    import { onMount } from "svelte";
    import { stores } from "@sapper/app";
    import CoinStats from "../../components/profile/CoinStats.svelte";
    import CoinHistory from "../../components/profile/CoinHistory.svelte";
    import Loading from "../../components/Loading.svelte";
    import Search from "../../components/profile/Search.svelte";

    const { page } = stores();


    const legendObj = {
        bodvar: { weapon_one: "Hammer", weapon_two: "Sword" },
        cassidy: { weapon_one: "Pistol", weapon_two: "Hammer" },
        orion: { weapon_one: "RocketLance", weapon_two: "Spear" },
        "lord vraxx": { weapon_one: "RocketLance", weapon_two: "Pistol" },
        gnash: { weapon_one: "Hammer", weapon_two: "Spear" },
        "queen nai": { weapon_one: "Spear", weapon_two: "Katar" },
        hattori: { weapon_one: "Sword", weapon_two: "Spear" },
        "sir roland": { weapon_one: "RocketLance", weapon_two: "Sword" },
        scarlet: { weapon_one: "Hammer", weapon_two: "RocketLance" },
        thatch: { weapon_one: "Sword", weapon_two: "Pistol" },
        ada: { weapon_one: "Pistol", weapon_two: "Spear" },
        sentinel: { weapon_one: "Hammer", weapon_two: "Katar" },
        lucien: { weapon_one: "Katar", weapon_two: "Pistol" },
        teros: { weapon_one: "Axe", weapon_two: "Hammer" },
        brynn: { weapon_one: "Axe", weapon_two: "Spear" },
        asuri: { weapon_one: "Katar", weapon_two: "Sword" },
        barraza: { weapon_one: "Axe", weapon_two: "Pistol" },
        ember: { weapon_one: "Bow", weapon_two: "Katar" },
        azoth: { weapon_one: "Bow", weapon_two: "Axe" },
        koji: { weapon_one: "Bow", weapon_two: "Sword" },
        ulgrim: { weapon_one: "Axe", weapon_two: "RocketLance" },
        diana: { weapon_one: "Bow", weapon_two: "Pistol" },
        jhala: { weapon_one: "Axe", weapon_two: "Sword" },
        kor: { weapon_one: "Fists", weapon_two: "Hammer" },
        "wu shang": { weapon_one: "Fists", weapon_two: "Spear" },
        val: { weapon_one: "Fists", weapon_two: "Sword" },
        ragnir: { weapon_one: "Katar", weapon_two: "Axe" },
        cross: { weapon_one: "Pistol", weapon_two: "Fists" },
        mirage: { weapon_one: "Scythe", weapon_two: "Spear" },
        nix: { weapon_one: "Scythe", weapon_two: "Pistol" },
        mordex: { weapon_one: "Scythe", weapon_two: "Fists" },
        yumiko: { weapon_one: "Bow", weapon_two: "Hammer" },
        artemis: { weapon_one: "RocketLance", weapon_two: "Scythe" },
        caspian: { weapon_one: "Fists", weapon_two: "Katar" },
        sidra: { weapon_one: "Cannon", weapon_two: "Sword" },
        xull: { weapon_one: "Cannon", weapon_two: "Axe" },
        kaya: { weapon_one: "Spear", weapon_two: "Bow" },
        isaiah: { weapon_one: "Cannon", weapon_two: "Pistol" },
        jiro: { weapon_one: "Sword", weapon_two: "Scythe" },
        "lin fei": { weapon_one: "Katar", weapon_two: "Cannon" },
        zariel: { weapon_one: "Fists", weapon_two: "Bow" },
        rayman: { weapon_one: "Fists", weapon_two: "Axe" },
        dusk: { weapon_one: "Spear", weapon_two: "Orb" },
        fait: { weapon_one: "Scythe", weapon_two: "Orb" },
        thor: { weapon_one: "Hammer", weapon_two: "Orb" },
        petra: { weapon_one: "Fists", weapon_two: "Orb" },
        vector: { weapon_one: "RocketLance", weapon_two: "Bow" },
        volkov: { weapon_one: "Axe", weapon_two: "Scythe" },
        onyx: { weapon_one: "Fists", weapon_two: "Cannon" },
        jaeyun: { weapon_one: "Sword", weapon_two: "Greatsword" },
        mako: { weapon_one: "Katar", weapon_two: "Greatsword" },
        magyar: { weapon_one: "Hammer", weapon_two: "Greatsword" },
        reno: { weapon_one: "Pistol", weapon_two: "Orb" }
    };
    const weaponList = [
        {
            name: "Hammer",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Sword",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Pistol",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "RocketLance",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Spear",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Katar",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Axe",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Fists",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Bow",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Cannon",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Orb",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Scythe",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        },
        {
            name: "Greatsword",
            matchtime: 0,
            games: 0,
            kos: 0,
            damagedealt: 0
        }
    ];

    let pages;
    let username;
    let bid;
    let url;

    //404 display
    let isDisplaying404;
    let isSearchOpen;

    let loaded;

    //Reload UI on query parameter change
    let isDisplayingWinhalla;
    $: if (isDisplayingWinhalla) {
        console.log("Switched Display");
    }


    let data;
    let user;
    let playerData;
    let rankedData;
    let urlData;
    let alreadyLoaded = false;
    onMount(() => {
        pages = page.subscribe(async value => {
            console.log(value);
            if (urlData?.host !== value?.host || urlData?.path !== value?.path || alreadyLoaded === false) loaded = false;
            urlData = value;
            //Determines witch page to display: brawlhalla or winhalla
            isDisplayingWinhalla = value.query?.d === "winhalla";

            //brawlhalla id if there is one
            bid = value.query?.bid;
            username = value.params.username;

            url = bid ? value.path + `?bid=${bid}` : value.path;

            if (!loaded) {
                const res = new Promise(async () => {
                    if (bid) {
                        data = await callApi("get", `${apiUrl}/stats/${bid}`);

                        if (data.name !== username) {
                            const player = await callApi("get", `/stats/username/${username}`);
                            bid = player.find(p => p.name === username)?.brawlhalla_id;
                            if (!bid) return isDisplaying404 = true;

                            data = await callApi("get", `${apiUrl}/stats/${bid}`);
                        }

                    } else {
                        const player = await callApi("get", `/stats/username/${username}`);
                        if (!player) return isDisplaying404 = true;

                        bid = player.find(p => p.name === username).brawlhalla_id;
                        data = await callApi("get", `${apiUrl}/stats/${bid}`);
                    }

                    user = await callApi("get", "/auth/getUserData/" + bid);

                    if (user) {
                        user.user.friendsInvited = user.link;
                        user = user.user;
                    }

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
                        playerData.kosunarmed += parseInt(l.kounarmed);
                        playerData.kos += l.kos;
                        playerData.damagedealt += parseInt(l.damagedealt);

                        const legendWeaponOne = legendObj[l.legend_name_key].weapon_one;
                        const legendWeaponTwo = legendObj[l.legend_name_key].weapon_two;

                        let weaponOneInList = weaponList.find(w => w.name === legendWeaponOne);
                        weaponOneInList.matchtime += l.timeheldweaponone;
                        weaponOneInList.games += l.games;
                        weaponOneInList.kos += l.koweaponone;
                        weaponOneInList.damagedealt += parseInt(l.damageweaponone);

                        let weaponTwoInList = weaponList.find(w => w.name === legendWeaponTwo);
                        weaponTwoInList.matchtime += l.timeheldweapontwo;
                        weaponTwoInList.games += l.games;
                        weaponTwoInList.kos += l.koweapontwo;
                        weaponTwoInList.damagedealt += parseInt(l.damageweapontwo);
                    }
                    loaded = true;
                });

            }
            alreadyLoaded = true;
        });
    });

</script>

<style>
    .active {
        @apply text-primary  border-b-2 border-primary;
    }
</style>
<svelte:head>
    <title>{username ? username + "'s" : ""} Profile Page - Winhalla</title>
</svelte:head>

{#if loaded}
    <section class="md:h-64 bg-variant  pl-7  md:pl-10 md:pr-10 lg:pl-23 lg:pr-18   flex flex-col justify-between">
        <div class="md:flex items-center justify-between  mt-10 md:mt-21">
            <div>
                <p class="text-3xl">
                    {username}
                </p>

                {#if !isDisplayingWinhalla}
                    <p class="mt-1 text-mid-light">
                        {isDisplayingWinhalla ? "Winhalla clan" : "Brawlhalla clan"}:
                        <b class="font-normal text-primary text-2xl">{isDisplayingWinhalla ? "" : playerData.clan.clan_name}</b>
                    </p>
                {/if}
            </div>
            {#if !isDisplayingWinhalla}
                <div class="text-ultra-light mt-7 md:mt-2  text-xl md:text-default">
                    <p>Level: <b
                        class="font-normal text-primary text-2xl">{isDisplayingWinhalla ? "" : playerData.level}</b></p>
                    <p class="mt-1">Time spent in online games: <b
                        class="font-normal text-primary text-2xl">
                        {isDisplayingWinhalla ? "" : formatTime(playerData.matchtime)}</b>
                    </p>
                </div>
            {/if}
        </div>

        <div class="flex  mt-6 md:mt-0   text-xl md:text-default">
            <a class="{!isDisplayingWinhalla ? 'active' : ''}"
               href="{urlData.query.bid ? url + '&d=brawlhalla' : url + '?d=brawlhalla'}">Brawlhalla</a>

            <a class="ml-8  md:ml-11 {isDisplayingWinhalla ? 'active' : ''}"
               href="{urlData.query.bid ? url + '&d=winhalla' : url + '?d=winhalla'}">Winhalla</a>
        </div>
    </section>
    {#if isDisplayingWinhalla}
        {#if user}
            <section class="px-7 md:px-10 lg:px-18 pb-12  md:flex items-start">
                <CoinStats user="{user}" data="{user?.coinLogs?.total}" />
                <CoinHistory data="{user.coinLogs.history}" />
            </section>
        {:else}
            <section class="w-full px-4 md:px-0">
                <div class=" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full">
                    <p class="text-2xl  md:text-3xl">
                        <b class="text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1">{username}</b> has no Winhalla account!
                    </p>
                </div>
            </section>
        {/if}
    {:else}
        <section class="px-7 md:px-10 lg:px-18 pb-12 lg:flex justify-between flex-wrap items-start">
            <div class="mt-12  md:flex items-start">
                <RankedStats data="{rankedData}" />
                <GlobalStats data="{playerData}" />
            </div>


            <div class="pt-12 mt-6 xl:mt-0    md:flex items-start">
                <LegendStats data={playerData.legends} />
                <WeaponStats data={weaponList} />
            </div>
        </section>
    {/if}

{:else if isDisplaying404}
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h2 class="text-9xl  mt-48">404</h2>
        <p class="text-3xl  text-mid-light  -mt-4">Player not found</p>

        <a class="text-primary italic mt-1" href="/">Return to home page</a>
    </div>
{:else}
    <Loading />
{/if}

