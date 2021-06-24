<script>
    import { fade, fly } from "svelte/transition";
    import { callApi } from "../utils/api";
    import { onMount } from "svelte";
    import CoinIcon from "../components/CoinIcon.svelte";

    let featuredItem;
    let seasonPacks;
    let packs;
    let error;

    let isBuying;
    let userPlayer;

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
        let player;
        items.forEach((item, i) => {
            items[i].isDescriptionToggled = false;
            items[i].unBuyable = true;
            item.name = item.name.toLowerCase().replace(/\s/g, "-");
        });
        featuredItem = items.find((i) => i.state === 0);
        seasonPacks = items.filter((i) => i.state === 1);
        packs = items.filter((i) => i.state === 2);
    });

    const handleDescriptionToggle = (seasonPack, type) => {
        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;
        if (type === "featured")
            featuredItem = featuredItem;
        else
            seasonPacks = [...seasonPacks];
    };
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
</style>

<svelte:head>
    <title>Shop - Winhalla, Play Brawlhalla. Earn rewards.</title>
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
                            Featured item
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
                                        class="flex justify-between w-full items-end pr-4 md:pr-5 pb-1">
                                        <div class="-mb-2 md:mb-0">
                                            <div>
                                                <p
                                                    class="hidden text-3xl lg:block mr-1 -mb-2">
                                                    {featuredItem.description}
                                                </p>
                                                <button
                                                    class="focus:outline-none xl:hidden -mb-10"
                                                    on:click={() => handleDescriptionToggle(featuredItem,"featured")}>
                                                    <p
                                                        class=" text-light text-lg underline leading-none">
                                                        {featuredItem.isDescriptionToggled ? 'Hide description' : 'Show description'}
                                                    </p>
                                                </button>
                                            </div>

                                        </div>
                                        <button
                                            disabled
                                            class="px-4 py-1 bg-primary rounded">
                                            <div class="flex  items-center  text-2xl">
                                                <b
                                                    class="mr-2 font-normal"
                                                    style="padding-top: 0.12rem">XXXXXXX</b>
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
                                                    <button
                                                        disabled
                                                        class="px-4 py-1 bg-primary rounded">
                                                        <div class="flex  items-center  text-2xl">
                                                            <b
                                                                class="mr-2 font-normal"
                                                                style="padding-top: 0.12rem">XXXXXXX</b>
                                                            <div class="w-8 mt-1 text-font"
                                                                 style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                                <CoinIcon />
                                                            </div>
                                                        </div>
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
                                                        disabled
                                                        class="px-4 py-1 bg-primary rounded">
                                                        <div class="flex  items-center  text-2xl">
                                                            <b
                                                                class="mr-2 font-normal"
                                                                style="padding-top: 0.12rem">XXXXXXX</b>
                                                            <div class="w-8 mt-1 text-font"
                                                                 style="margin-top: 0.25rem; margin-bottom: 0.35rem">
                                                                <CoinIcon />
                                                            </div>
                                                        </div>
                                                    </button>
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
<div class="\32xl\:w-60\% \32xl\:h-80\% xl\:w-70\% xl\:h-85\%" hidden></div>