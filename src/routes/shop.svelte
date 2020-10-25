<script>
    import { onMount } from "svelte";
    import { callApi } from "../utils/api";

    let items;
    let featuredItem;
    let seasonPacks;
    let packs;

    onMount(async () => {
        items = await callApi("get", "/shop");
        items.forEach(item => {
            item.name = item.name.toLowerCase().replace(/\s/g, "-");
        });
        featuredItem = await items.find(i => i.state === 0);
        seasonPacks = await items.filter(i => i.state === 1);
        packs = await items.filter(i => i.state === 2);


        //featuredItem = featuredItem.name
        console.log(packs);
    });
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
                rgba(23, 23, 26, 0.60) 0%,
                rgba(23, 23, 26, 0.75),
                rgba(23, 23, 26, 0.83) 75%,
                rgba(23, 23, 26, 0.92) 100%
        );
    }
</style>

<svelte:head>
    <title>Shop | Winhalla</title>
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
<!--TODO:Renamme les var rightItems etc... si on garde ce layout-->
{#if packs}
    <div class="pt-7 lg:pl-24 lg:pt-12">
        <div>
            <h1 class="text-6xl text-center lg:text-left">
                Battle pass
            </h1>
            <div class="card xl:w-60% xl:h-80% mt-2 mx-7 mb-7 lg:ml-0 lg:mb-0 shop-item">
                <img class="w-full h-full block object-cover" src="assets/ShopItems/{featuredItem.name}.jpg"
                     alt="{featuredItem.name}">
                <div class="absolute bottom-0 z-10 px-10 pb-3 w-full">
                    <div class="flex justify-between w-full items-center">
                            <p class="text-accent text-6xl">{featuredItem.name.toLowerCase().replace(/\-/g, " ")}</p>
                        <div class="px-4 py-1 bg-primary rounded">
                            <p class="text-2xl"><b class="mr-1 font-normal">{featuredItem.cost}</b>$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-8 lg:pt-16">
            <h2 class="text-6xl text-center lg:text-left">
                Season packs
            </h2>
            <div class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                {#each seasonPacks as seasonPack}
                    <div class="mx-7 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item">
                        <img class="w-full h-full block " src="assets/ShopItems/{seasonPack.name}.jpg"
                             alt="{seasonPack.name}">
                        <div class="absolute bottom-0 z-10 px-5 pb-3 w-full">
                            <div class="flex justify-between w-full items-center">
                                <div>
                                    <p class="text-accent text-5xl">{seasonPack.name.toLowerCase().replace(/\-/g, " ")}</p>
                                    <div>
                                        button
                                        <p class="-mt-2 text-light text-lg underline">Show description</p>
                                        <p class="-mt-2">{seasonPack.description}</p>
                                    </div>

                                </div>
                                <div class="px-4 py-1 bg-primary rounded">
                                    <p class="text-2xl"><b class="mr-1 font-normal">{seasonPack.cost}</b>$</p>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="pt-8 lg:pt-20 lg:pb-6">
            <h2 class="text-6xl text-center lg:text-left">
                Packs
            </h2>
            <div class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                {#each packs as pack}
                    <div class="mx-7 mb-7 lg:ml-0 lg:mb-0 lg:mr-12  xl:w-shopItem shop-item">

                        <img class="w-full h-full block object-cover" src="assets/ShopItems/{pack.name}.jpg"
                             alt="{pack.name}">
                        <div class="absolute bottom-0 z-10 px-5 pb-3 w-full">
                            <div class="flex justify-between w-full items-center">
                                <div>
                                    <p class="text-accent text-5xl">{pack.name.toLowerCase().replace(/\-/g, " ")}</p>
                                    <p class="-mt-2">{pack.description}</p>
                                </div>
                                <div class="px-4 py-1 bg-primary rounded">
                                    <p class="text-2xl"><b class="mr-1 font-normal">{pack.cost}</b>$</p>
                                </div>
                            </div>
                        </div>

                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}
