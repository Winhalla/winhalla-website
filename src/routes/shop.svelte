<script context="module">
    import { callApi } from "../utils/api";
    import { onMount } from "svelte";
    import { counter } from "../components/store";
    import { goto } from "@sapper/app";

    export async function preload() {
        let items = await callApi("get", "/shop");
        let player;
        let unsub = counter.subscribe((value) => {
            player = value.content;
        });
        unsub();

        if (player.user) {
            player = player.user.coins;
        } else {
            player = 0;
        }

        items.forEach((item, i) => {
            items[i].isDescriptionToggled = false;

            items[i].unBuyable = false;
            item.name = item.name.toLowerCase().replace(/\s/g, "-");
            if (item.cost >= player) items[i].unBuyable = true;
        });

        let featuredItem = await items.find((i) => i.state === 0);
        let seasonPacks = await items.filter((i) => i.state === 1);
        let packs = await items.filter((i) => i.state === 2);

        return { featuredItem, seasonPacks, packs };
    }
</script>

<script>
    export let featuredItem;
    export let seasonPacks;
    export let packs;

    const handleDescriptionToggle = (seasonPack) => {
        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;
        seasonPacks = [...seasonPacks];
    };
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
    <title>Shop - Winhalla, Play Brawlhalla. Earn rewards.</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,
        Battle Pass and Season packs| Exchange here your coins into rewards |
        Winhalla Shop page " />
    <link rel="canonical" href="https://winhalla.app/shop" />
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
<div class="xl:flex xl:relative pb-16">
    <div>
        {#if packs}
            <div class="mt-7 lg:mt-12 lg:ml-24 ">
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
                                        on:click={() => callApi('post', `/buy/${featuredItem.id}`)}
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
        </div>
    </div>
</div>
<div hidden class="-mb-1"></div>