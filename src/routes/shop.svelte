<script>
    import { fade, fly } from "svelte/transition";
    import { counter } from "../components/stores";
    import { callApi } from "../utils/api";
    import { onMount } from "svelte";
    import CoinIcon from "../components/CoinIcon.svelte";
    import Infos from "../components/Infos.svelte";

    let featuredItem;
    let seasonPacks;
    let packs;
    let error;
    let info;
    let isBuying;
    let player;
    let coinsPerDollar;
    let paypalItemId;

    onMount(async () => {
        let unsub;
        let items;
        try {
            items = await callApi("get", "/shop");
            if (items instanceof Error) {
                throw items;
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) error = "<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>";
            }
            error = `<p class="text-accent">Wow, unexpected error occured, details for geeks below.</p> <p class="text-2xl">${err.toString()}</p>`;
        }
        unsub = counter.subscribe(async (value) => {
            if (value.refresh === true) return;
            player = await value.content;
            if (!player?.user) player = { user: { coins: 0 } };
            let playerPlatform = /([a-zA-Z]+)(.+)/gm.exec(player.steam.id)[1];
            console.log(player.steam.id);
            console.log(playerPlatform);
            items.forEach((item, i) => {
                if (item.type === "paypal") {
                    items.splice(i, 1);
                    paypalItemId = item.id;
                    coinsPerDollar = item.cost;
                    return;
                }
                items[i].isDescriptionToggled = false;

                items[i].unBuyable = false;
                item.name = item.name.toLowerCase().replace(/\s/g, "-");
                if (item.cost > player.user.coins)
                    items[i].unBuyable = "Not enough coins";

                if (!item.platforms.some(name => name === playerPlatform || name === "all"))
                    items[i].unBuyable = "Platform not compatible";

            });

            featuredItem = items.find((i) => i.state === 0);
            seasonPacks = items.filter((i) => i.state === 1);
            packs = items.filter((i) => i.state === 2);
            player = player.user;
        });
    });
    //* Required for videoAd
    /*import ErrorAlert from "../components/ErrorAlert.svelte";
    import Infos from "../components/Infos.svelte";
    import { onDestroy, onMount } from "svelte";
    import io from "socket.io-client";
    import { apiUrl } from "../utils/config";
    import AdblockAlert from "../components/AdblockAlert.svelte";




    let adError;
    let info;
    let userPlayer;
    let ticketsNb = 100;
    let isLoadingTicket = false;
    let countDown = "Loading...";
    let interval;
    let loaded;

    function startTimer(duration) {
        let timer = duration,
            hours,
            minutes,
            seconds;
        return setInterval(function() {
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (hours > 0) countDown = hours + ":" + minutes + ":" + seconds;
            else countDown = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    let unsub;
    onMount(async () => {
        let socket;
        let interval;
        let items;
        try {
            items = await callApi("get", "/shop");
            if (items instanceof Error) {
                throw items;
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) error = "<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>";
            }
            error = `<p class="text-accent">Wow, unexpected error occured, details for geeks below.</p> <p class="text-2xl">${err.toString()}</p>`;
        }
        let player;
        unsub = counter.subscribe(async (value) => {
            if(value.refresh === true ) return
            player = await value.content;
            console.log(player);
            if (player.user) {
                player = player.user.coins;
            } else {
                player = 0;
            }
            items.forEach((item, i) => {
                items[i].isDescriptionToggled = false;

                items[i].unBuyable = false;
                item.name = item.name.toLowerCase().replace(/\s/g, "-");
                if (item.cost > player) items[i].unBuyable = true;
            });

            featuredItem = items.find((i) => i.state === 0);
            seasonPacks = items.filter((i) => i.state === 1);
            packs = items.filter((i) => i.state === 2);
            if (value.refresh === true) return;
            userPlayer = await value.content;
            clearInterval(interval);
            if (!userPlayer.user.lastVideoAd) return countDown = undefined;

            if (userPlayer.user.lastVideoAd.earnCoins.nb < 2) return countDown = undefined;

            if (userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000 > Date.now()) {
                const endsIn = ((userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000) - Date.now()) / 1000;
                interval = startTimer(endsIn);
            } else {
                countDown = undefined;
            }
            loaded = true;
        });
        // socket = io.io(apiUrl);
        let stop = 0;
        let advideostate = 0;
        let tempNb;
        let goal;
        interval = setInterval(() => {
            console.log("interval");
            try {
                if (stop > 0) {
                    return stop--;
                }
                tempNb = JSON.parse(document.getElementById("transfer").value);
                goal = tempNb.goal ? tempNb.goal : goal;
                tempNb = tempNb.state;
                if (tempNb !== advideostate) {
                    console.log(tempNb);
                    socket.emit("advideo", tempNb === 1 ? {
                        state: 1,
                        steamId: userPlayer.steam.id,
                        shopItemId: 0,
                        goal: goal
                    } : { state: tempNb, steamId: userPlayer.steam.id });
                }
                advideostate = tempNb;
            } catch (e) {

            }
        }, 1200);
        socket.on("advideo", (e) => {
            console.log(e);
            if (e.code === "error") {
                console.log(e.message);
                stop = 2;
                advideostate = 0;
                tempNb = 0;
                adError = e.message;
                setTimeout(() => {
                    adError = undefined;
                }, 12000);
            } else if (e.code === "success") {
                countDown = "Wait a second...";
                stop = 2;
                info = e.message;
                advideostate = 0;
                tempNb;
                setTimeout(() => {
                    info = undefined;
                }, 5000);
                counter.set({ refresh: true });
            } else {
                console.log("code not supported");
            }

        });

    });
    onDestroy(() => {
        if (unsub) unsub();
    });*/

    //* End of required for videoAd

    /*async function buyTickets() {
        try {
            isLoadingTicket = true;
            const { won, coins } = await callApi("post", `/lottery/enter?nb=${ticketsNb}&id=${0}`);
            info = `You have successfully put ${ticketsNb} ,${won > 0 ? "You have won a battle pass! Check your mails for more information." : coins > 0 ? "You have won " + coins + " coins" : "You have won nothing, better luck next time"}`;
            counter.set({ refresh: true });
            isLoadingTicket = false;
            setTimeout(() => {
                info = undefined;
            }, 5000);
        } catch (e) {

        }
    }*/
    const onKeyPressEmail = () => {
        if (!isBuying.email) return;
        setTimeout(() => {
            if (isBuying.email.length > 0) {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                let exec = regex.exec(isBuying.email);
                if (exec) isBuying.valid = true;
                else isBuying.valid = false;
            } else {
                isBuying.valid = null;
            }
        }, 1);
    };
    const handleDescriptionToggle = (seasonPack, type) => {
        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;
        if (type === "featured")
            featuredItem = featuredItem;
        else
            seasonPacks = [...seasonPacks];
    };

    async function buyItem(id, name, step) {
        if (!step) return isBuying = { id, name };
        const numberStr = id === paypalItemId ? `&number=${currentAmount}` : "";
        const itemBuyed = await callApi("post", `/buy/${id}?email=${isBuying.email}${numberStr}`);
        if (itemBuyed instanceof Error) isBuying = { id, name, error: itemBuyed?.response.data };
        else {
            counter.set({ refresh: true });
            isBuying = false;
            info = true;
            setTimeout(() => {
                info = false;
            }, 5000);
        }
    }

    let currentAmount = 0;
    $: if (currentAmount) {
        handlePaypalConversion();
    }
    let amountToCoins = { text: 0, isBuyable: false };

    function handlePaypalConversion() {
        if (currentAmount < 1) {
            console.log(currentAmount);
            return amountToCoins = { text: "Min 1 $", isBuyable: false };
        }
        amountToCoins = {
            text: currentAmount * coinsPerDollar,
            isBuyable: player.coins > currentAmount * coinsPerDollar
        };

    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

    .shop-item {
        position: relative;
    }

    .shop-item::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
                to bottom,
                rgba(23, 23, 26, 0.6) 0%,
                rgba(23, 23, 26, 0.75),
                rgba(23, 23, 26, 0.83) 75%,
                rgba(23, 23, 26, 0.92) 100%
        );
    }

    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }


    .info {
        @apply text-lg mt-1;
    }

    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }

    .email-input::placeholder {
        font-family: "Bebas Neue", sans-serif;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 25%;
        border-width: 10px;
        border-style: solid;
        border-color: #fc1870 transparent transparent transparent;
    }

    .tooltip-alt::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 40%;
        border-width: 10px;
        border-style: solid;
        border-color: #fc1870 transparent transparent transparent;
    }
</style>

<svelte:head>
    <title>Shop | Winhalla</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,
        Battle Pass and Season packs| Exchange here your coins into rewards |
        Winhalla Shop page " />
    <link rel="canonical" href="https://winhalla.app/shop" />
    <!--    <script async src="https://cdn.stat-rock.com/player.js"></script>-->
</svelte:head>
<!--
{#if bottomItems}
    <div class="lg:pl-24 lg:pt-6">
        <div class="flex">
            <div class="card featured">
                <img class="w-full h-full block object-cover" src="assets/ShopItems/{featuredItem.name}.jpg" alt="{featuredItem.name}">
            </div>
            <div class="lg:pl-12">
                {#each [0 , 1] as i}
                    <div class="pb-12 right">
                        <img class="w-full h-full block object-cover" src="assets/ShopItems/{rightItems[i].name}.jpg" alt="{rightItems[i].name}">
                    </div>
                {/each}

            </div>
        </div>
        <div class="flex">
            {#each [0 , 1] as i}
                <div class="pb-8 right mr-12">
                    <img class="w-full h-full block object-cover" src="assets/ShopItems/{bottomItems[i].name}.jpg" alt="{bottomItems[i].name}">
                </div>
            {/each}
        </div>
    </div>
{/if}
-->
{#if error}
    <div class="w-full content-center lg:mt-60 mt-25 ">
        <h2 class="lg:text-5xl text-3xl text-center">{@html error}</h2>
        <a href="/"><p class="underline lg:text-3xl pt-4 text-2xl  text-center text-primary">Go to homepage</p></a>
    </div>
{:else}
    <div class="xl:flex xl:relative pb-16" out:fly={{ y: -450, duration: 400 }}>
        <!-- {#if info}
             <Infos message="Thanks for watching a video" pushError={info} />
         {/if}-->
        <div>
            {#if packs}
                <div class="mt-7 lg:mt-12 lg:ml-24">
                    <div>
                        <h1 class="text-6xl text-center lg:text-left">
                            Featured
                        </h1>
                        <div
                            class="card xl:w-70/100 2xl:w-60/100 xl:h-85/100 2xl:h-80/100 mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item">
                            <img
                                class="w-full h-full block object-cover"
                                src="assets/ShopItems/{featuredItem.name}.jpg"
                                alt={featuredItem.name} />
                            <div
                                class="absolute bottom-0 z-10 px-5 md:pr-10 pb-3 w-full">
                                <div
                                    class="justify-between w-full md:items-center">
                                    <p class="text-accent text-5xl lg:text-6xl" style="line-height:1"
                                       class:hidden={featuredItem.isDescriptionToggled}>
                                        {featuredItem.name
                                            .toLowerCase()
                                            .replace(/\-/g, ' ')}
                                    </p>
                                    <p
                                        class:hidden={!featuredItem.isDescriptionToggled}
                                        class="block xl:mt-0">
                                        {featuredItem.description}a
                                    </p>

                                    <div
                                        class="flex justify-between w-full items-end md:pr-5 pb-1">
                                        <div>

                                        </div>
                                        <div
                                            on:mouseenter={() => featuredItem.tooltipOpen = true}
                                            on:mouseleave={() => featuredItem.tooltipOpen = false}>
                                            <button
                                                disabled={!!featuredItem.unBuyable}
                                                on:click={() => buyItem(featuredItem.id, featuredItem.name)}
                                                on:mouseenter={() => featuredItem.tooltipOpen = true}
                                                on:mouseleave={() => featuredItem.tooltipOpen = false}
                                                class="px-4 py-1 bg-primary rounded">
                                                <div class="flex  items-center  text-2xl">
                                                    <b
                                                        class="mr-2 font-normal"
                                                        style="padding-top: 0.12rem">{featuredItem.cost.toLocaleString()}</b>
                                                    <div class="w-8 mt-1 text-font"
                                                         style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                        <CoinIcon />
                                                    </div>
                                                </div>
                                                {#if featuredItem.tooltipOpen && featuredItem.unBuyable}
                                                    <span
                                                        class="tooltip absolute bottom-15 right-1 lg:right-11 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40"
                                                        style="width:fit-content;"
                                                        transition:fade>
                                                        {featuredItem.unBuyable}
                                                    </span>
                                                {/if}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pt-8 lg:pt-16">
                            <div class="flex items-center">
                                <h2 class="text-6xl text-center w-full lg:w-auto lg:text-left">
                                    Paypal Credit
                                </h2>
                                <img class="hidden lg:block  w-24 -ml-2 -mt-2" src="/assets/Paypal_Logo.png" alt="">
                            </div>


                            <div class="px-5 lg:px-0">
                                <div class="bg-variant max-w-max rounded-xl  p-8 relative  mt-6 md:mt-10  mx-auto lg:mx-0">
                                    <p class="absolute -top-3 left-8 text-primary  text-2xl">Coin TRADER</p>
                                    <p class="text-3xl mt-4">Exchange your <b class="font-normal text-epic">coins</b> for <b
                                            class="font-normal text-epic">real money</b></p>
                                    <p class="text-mid-light">Min amount: 1$</p>
                                    <p class="mt-3">You need to have a <a href="https://www.paypal.com/"
                                                                          class="text-primary">Paypal account</a></p>
                                    <div class="flex items-center  mt-2">

                                        <div class="flex">
                                            <input bind:value={currentAmount} class="p-2 pl-4 text-background  rounded w-16 w-18"
                                                   type="number" min="1" step="any" placeholder="Amount in $" />
                                            <p class="text-4xl ml-1 my-auto">$</p>
                                        </div>
                                        <svg class="mx-4 fill-current w-8" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="m24 12.16-5.76-5.76v4.24h-18.24v3.04h18.24v4.24z" />
                                        </svg>


                                        <div>
                                            <button
                                                    disabled={!amountToCoins.isBuyable}
                                                    on:click={() => buyItem(paypalItemId, "paypal credit")}
                                                    class="px-4 py-1 bg-primary rounded">
                                                <div class="flex  items-center  text-2xl">
                                                    <b
                                                            class="mr-2 font-normal"
                                                            style="padding-top: 0.12rem">{amountToCoins.text}</b>
                                                    <div class="w-8 mt-1 text-font"
                                                         style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                        <CoinIcon />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="pt-8 lg:pt-14 lg:pb-6">
                            <h2 class="text-6xl text-center lg:text-left">
                                Season packs
                            </h2>
                            <div
                                class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                                {#if seasonPacks.forEach}
                                    {#each seasonPacks as seasonPack, i}
                                        <div
                                            class="mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem">
                                            <img
                                                class="w-full h-full block "
                                                src="assets/ShopItems/{seasonPack.name}.jpg"
                                                alt={seasonPack.name} />
                                            <div
                                                class="absolute bottom-0 z-10 pl-5 pb-3 w-full">
                                                <p
                                                    class:hidden={seasonPack.isDescriptionToggled}
                                                    class:-mb-1={!seasonPack.isDescriptionToggled}
                                                    class="text-accent text-4xl lg:text-5xl md:mb-0 md:block">
                                                    {seasonPack.name
                                                        .toLowerCase()
                                                        .replace(/\-/g, ' ')}
                                                </p>
                                                <p
                                                    class:hidden={!seasonPack.isDescriptionToggled}
                                                    class="block xl:mt-0">
                                                    {seasonPack.description}
                                                </p>

                                                <div
                                                    class="flex justify-between w-full items-end pr-4 md:pr-5 pb-1">
                                                    <div class="-mb-2 md:mb-0">
                                                        <div>
                                                            <p
                                                                class="hidden lg:block mr-1 -mb-2">
                                                                {seasonPack.description}
                                                            </p>
                                                            <button
                                                                class="focus:outline-none xl:hidden -mb-10"
                                                                on:click={() => handleDescriptionToggle(seasonPack)}>
                                                                <p
                                                                    class=" text-light text-lg underline leading-none">
                                                                    {seasonPack.isDescriptionToggled ? 'Hide description' : 'Show description'}
                                                                </p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div on:mouseenter={() => seasonPack.tooltipOpen = true}
                                                         on:mouseleave={() => seasonPack.tooltipOpen = false}>
                                                        <button
                                                            disabled={!!seasonPack.unBuyable}
                                                            on:click={() => buyItem(seasonPack.id,seasonPack.name)}
                                                            class="px-4 py-1 bg-primary rounded">
                                                            <div class="flex  items-center  text-2xl">
                                                                <b
                                                                    class="mr-2 font-normal"
                                                                    style="padding-top: 0.12rem">{seasonPack.cost.toLocaleString()}</b>
                                                                <div class="w-8 mt-1 text-font"
                                                                     style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                                    <CoinIcon />
                                                                </div>
                                                            </div>
                                                            {#if seasonPack.tooltipOpen && seasonPack.unBuyable}

                                                                <span
                                                                    class="tooltip text-center absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40"
                                                                    class:tooltip={window.innerWidth < 1024}
                                                                    class:tooltip-alt={window.innerWidth > 1024}
                                                                    style="width:fit-content;"
                                                                    transition:fade>
                                                                    {seasonPack.unBuyable}
                                                                </span>
                                                            {/if}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                        <div class="pt-8 lg:pt-20 lg:pb-6">
                            <h2 class="text-6xl text-center lg:text-left">Packs</h2>
                            <div
                                class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                                {#if packs.forEach}
                                    {#each packs as pack}
                                        <div
                                            class="mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item">
                                            <img
                                                class="w-full h-full block object-cover"
                                                src="assets/ShopItems/{pack.name}.jpg"
                                                alt={pack.name} />
                                            <div
                                                class="absolute bottom-0 z-10 px-5 pb-3 w-full">
                                                <p class="text-accent text-5xl">
                                                    {pack.name
                                                        .toLowerCase()
                                                        .replace(/\-/g, ' ')}
                                                </p>

                                                <div
                                                    class="flex justify-between w-full items-end pb-1">
                                                    <div>
                                                        <div>
                                                            <p class="mr-1 -mb-2">
                                                                {pack.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        on:mouseenter={() => pack.tooltipOpen = true}
                                                        on:mouseleave={() => pack.tooltipOpen = false}>
                                                        <button
                                                            disabled={!!pack.unBuyable}
                                                            on:click={() => buyItem(pack.id,pack.name)}
                                                            class="px-4 py-1 bg-primary rounded">
                                                            <div class="flex  items-center  text-2xl">
                                                                <b
                                                                    class="mr-2 font-normal"
                                                                    style="padding-top: 0.12rem">{pack.cost.toLocaleString()}</b>
                                                                <div class="w-8 mt-1 text-font"
                                                                     style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                                    <CoinIcon />
                                                                </div>

                                                            </div>
                                                            {#if pack.tooltipOpen && pack.unBuyable}
                                                                <span
                                                                    class="tooltip absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40"
                                                                    style="width:fit-content;"
                                                                    transition:fade>
                                                                    {pack.unBuyable}
                                                                </span>
                                                            {/if}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div
            class="mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3">
            <h3 class="text-5xl lg:mr-12 text-center lg:text-left">
                How does it work?
            </h3>
            <div class="pt-4">
                <div class="mt-4 flex items-end">
                    <p class="text-4xl leading-none text-accent">1.</p>
                    <p class="text-4xl text-primary ml-2 leading-none">Click</p>
                    <p
                        class="-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0">
                        Click on the item you want to purchase
                    </p>
                </div>
                <div class="mt-4 flex items-end">
                    <p class="text-4xl leading-none text-accent">2.</p>
                    <p class="text-4xl text-primary ml-2 leading-none">Follow</p>
                    <p
                        class="-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0">
                        Follow the instructions we'll send you by email
                    </p>
                </div>
                <div class="mt-4 flex items-end">
                    <p class="text-4xl leading-none text-accent">3.</p>
                    <p class="text-4xl text-primary ml-2 leading-none">Receive</p>
                    <p
                        class="receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7">
                        Recieved what you buyed (it may take an average time of a week depending of the item)
                    </p>
                </div>
                <!--<div class="mt-30">
                    <h3 class="text-5xl lg:mr-12 text-center lg:text-left">
                        Lottery
                    </h3>
                    <div class="pt-4">
                        <div class="mt-4 flex items-end">
                            <p class="text-4xl leading-none text-accent">1.</p>
                            <p class="text-4xl text-primary ml-2 leading-none"><br>Buy a ticket</p>
                            <p
                                class="-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0">
                                A ticket will give you a chance to win the prize you have chosen.
                            </p>
                        </div>
                        <div class="mt-4 flex items-end">
                            <p class="text-4xl leading-none text-accent">2.</p>
                            <p class="text-4xl text-primary ml-2 leading-none">Multiple tickets</p>
                            <p
                                class="-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0">
                                The more tickets you buy, the more chances to win you have !
                            </p>
                        </div>
                        <div class="mt-4 flex items-end">
                            <p class="text-4xl leading-none text-accent">3.</p>
                            <p class="text-4xl text-primary ml-2 leading-none">Win</p>
                            <p
                                class="receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7">
                                If you win a prize, an email will be sent to the adress you specified when you
                                created
                                the account
                            </p>
                        </div>
                        <div class="block mt-10">
                            <div class="flex">
                                <input class="mr-3" type="range" step="100" min="100" max="10000" bind:value={ticketsNb}>
                                <RefreshButton on:click={buyTickets}
                                               refreshMessage={`Put ${ticketsNb} in the lottery`}
                                               isRefreshing={isLoadingTicket} />
                            </div>

                            <div class="flex mt-8">
                                <button class="button button-brand" onclick="playAd('enterLottery')">Play ad for
                                    lottery
                                </button>
                                <button class="button button-brand ml-4" onclick="playAd('earnCoins')"
                                        disabled={!!countDown}>
                                    {!!countDown ? countDown : "Play ad for money"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
{/if}
{#if isBuying}
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
         style="z-index: 100"
         in:fade={{duration: 200}}
         out:fade={{duration: 350}}>

        <div
            class="max-w-xl    mx-5 my-1 md:mx-0  px-8 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto"
            style="max-height: 95vh;"
            transition:fly={{ y: 300, duration: 350 }}>
            <h2 class="text-4xl md:text-5xl">Where should we send
            </h2>

            <p class="text-accent text-5xl md:text-6xl">{isBuying.name.toLowerCase().replace(/\-/g, ' ')}</p>
            <div>
                <div class="max-h-screen-50">
                    <div>
                        <p class="mt-7 text-font text-3xl" style="margin-bottom: 0.35rem;">Email</p>
                        <div>
                            <input
                                on:change={onKeyPressEmail}
                                on:keydown={onKeyPressEmail}
                                type="email"
                                placeholder="Your {isBuying.id === paypalItemId?'PayPal':''} email goes here"
                                bind:value={isBuying.email}
                                class:border-legendary={isBuying.valid === false}
                                class="w-full text-background bg-font py-3 px-4 rounded focus:outline-none
                            focus:border-primary placeholder-disabled email-input"
                                    style="font-family: 'Roboto', sans-serif;"/>

                            {#if isBuying.valid}
                                <div class="flex items-center">
                                    <svg
                                        class="fill-current text-green w-4"
                                        style="margin-top: 0.15rem; margin-right: 0.4rem;"
                                        viewBox="0 0 33 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                    </svg>
                                    <p class="text-green info">VALID EMAIL</p>
                                </div>
                            {:else if isBuying.valid === false}
                                <p class="text-legendary info ">INVALID EMAIL</p>
                            {/if}
                            {#if isBuying.error}
                                <p class="text-legendary mt-8" in:fade={{delay:100}}>{isBuying.error}</p>
                            {/if}
                        </div>
                    </div>
                    <div
                        class="text-legendary flex items-center {isBuying.valid || isBuying.valid === false ? 'mt-5' : 'mt-8' }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-full"
                            style="max-width: 2.25rem;"
                            viewBox="0 0 576 512">
                            <path
                                fill="currentColor"
                                d="M569.517 440.013C587.975 472.007 564.806 512 527.94
                                512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423
                                23.985c18.467-32.009 64.72-31.951 83.154 0l239.94
                                416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46
                                46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418
                                136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0
                                11.635-4.982
                                11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884
                                0-12.356 5.78-11.981 12.654z" />
                        </svg>
                        <p class="text-xl ml-4">
                            No refund will be possible after clicking the BUY button. Please make sure it's the proper
                            email!
                        </p>
                    </div>
                    <div class="text-font flex items-center mt-4 lg:mt-3">
                        <div class="rounded-full bg-primary mb-1" style="padding: 0.65rem;">
                            <svg
                                class="w-full h-full fill-current"
                                style="max-width: 0.95rem; max-height: 0.95rem;"
                                viewBox="0 0 17 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z" />
                            </svg>
                        </div>


                        <p class="text-primary text-xl ml-4">
                            Your email will not be saved <br>
                            Delay to receive:
                            {#if isBuying.id === paypalItemId && currentAmount > 10}3 days to a week
                            {:else if currentAmount < 10 && isBuying.id === paypalItemId }<span
                                class="text-green text-xl">instant</span>
                            {:else}1 week to 1
                                month
                            {/if}
                        </p>
                    </div>
                </div>
                <div class="justify-center w-full flex mt-8 ">
                    <button class="button button-brand-alternative w-32"
                            style="background-color: #17171a;padding: -1px"
                            on:click={()=>isBuying=undefined}>
                        Cancel
                    </button>
                    <button class="button ml-5 w-32" class:button-brand={isBuying.valid}
                            on:click={()=>buyItem(isBuying.id,isBuying.name,1)}
                            disabled={!isBuying.valid}>
                        Buy
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
<!--<div>
    <input id="transfer" value="0" hidden />
    {#if adError}
        <ErrorAlert message="An error occured while watching the ad" pushError={adError} />
    {/if}
    <script data-playerPro="current">
        function playAd(goal) {
            const init = (api) => {
                if (api) {
                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 1, goal });
                        //api.setAdVolume(1);
                        document.body.onblur = function() {
                            //api.pauseAd();
                        };
                        document.body.onfocus = function() {
                            //api.resumeAd();
                        };
                    });
                    api.on("AdVideoFirstQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 2 });
                    });
                    api.on("AdVideoMidpoint", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 3 });
                    });
                    api.on("AdVideoThirdQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 4 });
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 5 });
                        setTimeout(() => {
                            document.getElementById("transfer").value = JSON.stringify({ state: 0 });
                        }, 1200);
                        document.body.onblur = null;
                        document.body.onfocus = null;
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\"current\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
    </script>
</div>-->
{#if info}
    <Infos message="Thanks for your purchase"
           pushError="Check your mails, instructions should be emailed to you shortly!" />
{/if}