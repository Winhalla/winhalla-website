<script>

    import RefreshButton from "../components/RefreshButton.svelte";

    let featuredItem;
    let seasonPacks;
    let packs;
    let error;

    //* Required for videoAd
    import ErrorAlert from "../components/ErrorAlert.svelte";
    import Infos from "../components/Infos.svelte";
    import { onDestroy, onMount } from "svelte";
    import io from "socket.io-client";
    import { apiUrl } from "../utils/config";
    import AdblockAlert from "../components/AdblockAlert.svelte";
    import { callApi } from "../utils/api";
    import { counter } from "../components/store";
    import { fly } from "svelte/transition";

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
        socket = io.io(apiUrl);
        let stop = 0;
        let advideostate = 0;
        let tempNb;
        let goal;
        interval = setInterval(() => {
            console.log("interval")
            try {
                if (stop > 0) {
                    return stop--;
                }
                tempNb = JSON.parse(document.getElementById("transfer").value);
                goal = tempNb.goal ? tempNb.goal : goal;
                tempNb = tempNb.state;
                if (tempNb !== advideostate) {
                    console.log(tempNb)
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
    });

    //* End of required for videoAd

    async function buyTickets() {
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
    }

    const handleDescriptionToggle = (seasonPack) => {
        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;
        seasonPacks = [...seasonPacks];
    };
    async function buyItem (id) {
        const itemBuyed = await callApi('post', `/buy/${id}`)
        if(itemBuyed instanceof Error) console.log("ERR")
        else {
            counter.set({refresh:true})
            console.log("SUCCESSFULLY BOUGHT")
        }
    }
</script>

<style>
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

    /*@media (min-width: 450px) {
        .receive {
            @apply mt-7 -mb-14;
        }
    }*/
</style>

<svelte:head>
    <title>Shop | Winhalla</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,
        Battle Pass and Season packs| Exchange here your coins into rewards |
        Winhalla Shop page " />
    <link rel="canonical" href="https://winhalla.app/shop" />
    <script async src="https://cdn.stat-rock.com/player.js"></script>
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
        {#if info}
            <Infos message="Thanks for watching a video" pushError={info} />
        {/if}
        <div>
            {#if packs}
                <div class="mt-7 lg:mt-12 lg:ml-24">
                    <div>
                        <h1 class="text-6xl text-center lg:text-left">
                            Battle pass
                        </h1>
                        <div
                            class="card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item">
                            <img
                                class="w-full h-full block object-cover"
                                src="assets/ShopItems/{featuredItem.name}.jpg"
                                alt={featuredItem.name} />
                            <div
                                class="absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full">
                                <div
                                    class="md:flex justify-between w-full md:items-center">
                                    <p class="text-accent text-6xl">
                                        {featuredItem.name
                                            .toLowerCase()
                                            .replace(/\-/g, ' ')}
                                    </p>
                                    <div class="flex justify-end md:block pb-1">
                                        <button
                                            disabled={featuredItem.unBuyable}
                                            on:click={() => buyItem(featuredItem.id)}
                                            class="px-4 py-1 bg-primary rounded">
                                            <p class="text-2xl">
                                                <b
                                                    class="mr-1 font-normal">{featuredItem.cost}</b>$
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-8 lg:pt-16">
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
                                                class="text-accent text-5xl md:mb-0 md:block">
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
                                                            class="hidden xl:block mr-1 -mb-2">
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
                                                <button
                                                    disabled={seasonPack.unBuyable}
                                                    on:click={() => callApi('post', `/buy/${seasonPack.id}`)}
                                                    class="px-4 py-1 bg-primary rounded">
                                                    <p class="text-2xl">
                                                        <b
                                                            class="mr-1 font-normal">{seasonPack.cost}</b>$
                                                    </p>
                                                </button>
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
                                                        <p class="block mr-1 -mb-2">
                                                            {pack.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    disabled={pack.unBuyable}
                                                    on:click={() => callApi('post', `/buy/${pack.id}`)}
                                                    class="px-4 py-1 bg-primary rounded">
                                                    <p class="text-2xl">
                                                        <b
                                                            class="mr-1 font-normal">{pack.cost}</b>$
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div
            class="mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3">
            {#if userPlayer}
                <AdblockAlert class="lg:mr-12 text-center lg:text-left" user="{userPlayer.user}" />
            {/if}
            <h3 class="text-5xl lg:mr-12 text-center lg:text-left">
                How does it works ?
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
                    <p class="text-4xl text-primary ml-2 leading-none">Add</p>
                    <p
                        class="-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0">
                        Add the Winhalla Steam account to your friend list
                    </p>
                </div>
                <div class="mt-4 flex items-end">
                    <p class="text-4xl leading-none text-accent">3.</p>
                    <p class="text-4xl text-primary ml-2 leading-none">Receive</p>
                    <p
                        class="receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7">
                        You will receive the item you purchased within 1 week to 1 month
                    </p>
                </div>
                <div class="mt-30">
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

                </div>
            </div>
        </div>
    </div>
{/if}
<div>
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
</div>