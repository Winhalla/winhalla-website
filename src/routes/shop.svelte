<script>
    import { onMount } from "svelte";
    import { callApi } from "../utils/api";

    let items;
    let featuredItem;
    let rightItems;
    let bottomItems;

    onMount(async () => {
        items = await callApi("get", "/shop");
        featuredItem = await items.find(i => i.state === 0);
        rightItems = await items.filter(i => i.state === 1);
        bottomItems = await items.filter(i => i.state === 2);

        items.forEach(item => {
            item.name = item.name.toLowerCase().replace(/\s/g, "-");
        });

        //featuredItem = featuredItem.name
        console.log(items, featuredItem, rightItems[0], bottomItems);
    });
</script>

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
{#if bottomItems}
    <div class="pt-7 lg:pl-24 lg:pt-12">
        <div>
            <h1 class="text-6xl text-center lg:text-left">
                Battle pass
            </h1>
            <div class="card xl:w-60% xl:h-80% mt-2 mx-7 mb-7 lg:ml-0 lg:mb-0">
                <img class="w-full h-full block object-cover" src="assets/ShopItems/{featuredItem.name}.jpg"
                     alt="{featuredItem.name}">
            </div>
        </div>
        <div class="pt-8 lg:pt-16">
            <h2 class="text-6xl text-center lg:text-left">
                Season packs
            </h2>
            <div class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                    {#each [0 , 1] as i}
                        <div class="mx-7 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem">
                            <img class="w-full h-full block " src="assets/ShopItems/{rightItems[i].name}.jpg" alt="{rightItems[i].name}">
                        </div>
                    {/each}
            </div>
        </div>
        <div class="pt-8 lg:pt-20">
            <h2 class="text-6xl text-center lg:text-left">
                Packs
            </h2>
            <div class="mt-2 flex flex-col items-center lg:flex-row lg:items-start">
                {#each [0 , 1] as i}
                    <div class="mx-7 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem">
                        <img class="w-full h-full block object-cover" src="assets/ShopItems/{bottomItems[i].name}.jpg" alt="{bottomItems[i].name}">
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}
