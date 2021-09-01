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
    import share from "../../utils/share";
    import copyText from "../../utils/copyText";
    import { fade } from 'svelte/transition'
    import {counter} from "../../components/stores";

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

    let link;
    let hasShareFunction;
    let toolTipOpen;
    let currUser;
    onMount(() => {
        pages = page.subscribe(async value => {
            hasShareFunction = !!window.navigator.share;

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
                    } else {
                        await counter.subscribe(async (value) => {
                            if (value.refresh === true) return;
                            currUser = await value.content;
                            if(!currUser.user) return;
                            currUser = currUser.user;
                        });

                        link = currUser.linkId ? `http://localhost:3000/link/${currUser.linkId}` : undefined;
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
                        <b class="font-normal text-primary text-2xl">{isDisplayingWinhalla ? "" : playerData?.clan? playerData.clan.clan_name:"No clan"}</b>
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
        {:else if link}
            <section class="w-full px-4 md:px-0">
                <div class=" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full">
                    <p class="text-2xl  md:text-3xl">
                        <b class="text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1">{username}</b> has no Winhalla account!
                    </p>
                    <p class="mt-6 text-2xl"><b class="font-normal  text-green">Help us grow</b> Winhalla <b class="font-normal  text-green">by sharing</b>
                        <br> your referral link!</p>


                    <div
                            class="text-background  bg-font py-4 px-3 mt-6 flex items-center rounded-md">
                        <div id="link"
                             class="flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"
                             style="font-family:'Roboto Condensed', sans-serif">

                            <p class="md:ml-1">{link}</p>

                            <div class="ml-2 h-5  flex"
                                 class:w-5={!hasShareFunction} class:w-12={hasShareFunction}>
                                {#if hasShareFunction}
                                    <div class="w-5 h-5 hover:text-gray-500 cursor-pointer  md:mr-1">
                                        <svg viewBox="0 0 24 24" fill="currentColor" on:click={() => share(link)}
                                             class="w-5 h-5"
                                             class:mr-1={hasShareFunction}
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                    d="m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z" />
                                        </svg>
                                    </div>
                                {/if}
                                <div class="w-5 h-5 hover:text-gray-500 cursor-pointer">
                                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"
                                         class:ml-1={hasShareFunction}
                                         on:click={() => copyText(link, function () {toolTipOpen = true;
                                                setTimeout(() => {
                                                    toolTipOpen = false;
                                                }, 3000);
                                             })}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z" />
                                        <path
                                                d="m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z" />
                                        <path
                                                d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                        {#if toolTipOpen}
                            <div class="relative">
                                    <span
                                            class="tooltip absolute px-6 py-2 bg-primary hidden md:block rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40"
                                            transition:fade>
                                            Copied!
                                    </span>
                            </div>
                        {/if}

                    </div>                        <p class="mt-5 text-xl"><b class="font-normal text-accent">You</b> and <b class="font-normal text-accent">your friend</b> will get a
                    <a href="/referral-link"><u class="text-mid-light">reward boost</u></a></p>

                </div>
            </section>
        {:else}
            <section class="w-full px-4 md:px-0">
                <div class=" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 pb-4 h-auto">
                    <p class="text-2xl  md:text-3xl">
                        <b class="text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1">{username}</b> has no Winhalla account!
                    </p>

                    <div class="mt-6  p-6 bg-background rounded-xl w-full   flex flex-col  items-center">
                        <svg class="mx-auto text-primary  fill-current w-26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.1 152.11">
                            <g id="Calque_2" data-name="Calque 2">
                                <g id="Calque_1-2" data-name="Calque 1">
                                    <polygon
                                            points="70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"/>
                                    <rect x="97.54" y="24" width="16.38" height="104.25"/>
                                    <path
                                            d="M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"/>
                                    <path
                                            d="M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"/>
                                    <polygon
                                            points="354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"/>
                                    <polygon
                                            points="405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"/>
                                </g>
                            </g>
                        </svg>
                        <p class="text-center mt-5 text-2xl"><b class="font-normal text-green">Play</b> Brawlhalla, <b class="font-normal  text-legendary">Earn</b> rewards</p>
                        <!---->
                        <a class="mt-6 text-center w-full  button button-brand" style="display: block"  href="/login">Login now</a>
                    </div>
                    <p class="mt-3 text-xl  text-center">Start <b class="font-normal text-legendary">earning</b> now! It's <b class="font-normal  text-accent">free</b>!</p>

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

