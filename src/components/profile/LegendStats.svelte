<script>
    import formatTime from "../../utils/formatTime";
    import filterList from "../../utils/filterList";
    import { clickOutside } from "../../utils/clickOutside";
    let isDropdownOpen
    export let data;
    let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);

    //select first legend by default
    let selectedLegend = sortedData[0];

    //Handle which legend tile is open
    let openedList = {};

    function handleOpenLegendTile(legend_name) {
        openedList[legend_name] = !openedList.hasOwnProperty(legend_name) || openedList[legend_name] === false;
    }


    let chosenFilter = "time_played";
    $: if (chosenFilter) {
        openedList = {};
    }

    let displayNumber = 2;
    function changeLegend(i) {
        selectedLegend = sortedData[i];
        isDropdownOpen = false;
    }
    function handleDropDown(delay){
        if(delay){
            setTimeout(() =>{
                isDropdownOpen = false
            },1)
        }else {
            isDropdownOpen = !isDropdownOpen
        }
    }
</script>

<style>
    @media (min-width: 480px) {
        .container {
            min-width: 21rem;
        }
    }
</style>


<div class="container   relative bg-variant min-w-md rounded-xl  p-8    h-auto">
    <p class="absolute -top-3 text-xl text-mid-light">LEGENDS</p>

    <div class="md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl">
        <div class="flex items-center">
            <img class="w-12 mr-3" src="/assets/LegendIcons/{selectedLegend.legend_name_key.replace(' ', '_')}.png"
                 alt="">
            <div class="w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none"
                 on:click={() =>handleDropDown(false)}>
                {selectedLegend.legend_name_key}
                <svg
                    class="w-4 h-4 mt-2 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
                </svg>
            </div>
            {#if isDropdownOpen}
                <ul class="absolute bg-background top-30 right-14 px-3 rounded-xl z-10 overflow-y-auto" style="max-height: 45vh"
                    use:clickOutside on:click_outside={()=>handleDropDown(true)}>
                    {#each sortedData as legend,i}
                        <li on:click={() => changeLegend(i)} class="flex my-2 px-6 hover:bg-light cursor-pointer ">
                            <img class="w-10 mr-4" src="/assets/LegendIcons/{legend.legend_name_key.replace(' ', '_')}.png" alt="">
                            {legend.legend_name_key}
                        </li>
                    {/each}
                </ul>
            {/if}


        </div>
        <div class="mt-6 ml-2  text-lg md:text-xl  ">
            <p class="text-mid-light ">Time played: <b
                class="  font-normal text-primary  text-xl md:text-2xl">{formatTime(selectedLegend.matchtime)}</b>
            </p>
            <p class="text-mid-light mt-">Level: <b
                class="  font-normal text-primary  text-xl md:text-2xl">{selectedLegend.level}</b>
            </p>
            <p class="text-mid-light mt-3">Games played: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedLegend.games}</b>
            </p>
            <p class="text-mid-light mt-">Win rate: <b class="font-normal text-primary text-xl md:text-2xl">
                {parseInt(selectedLegend.wins / selectedLegend.games * 100)}%</b>
            </p>
            <p class="text-mid-light mt-3">KOs: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedLegend.kos}</b>
            </p>
            <p class="text-mid-light mt-">Damage dealt: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedLegend.damagedealt}</b>
            </p>
        </div>
    </div>


    <div class="mt-14 md:ml-2 w-full">

        <div class="flex text-xl  -mt-2  pb-2">
            <div class="flex items-center  text-lg">
                <select class="bg-background p-3  rounded-lg     focus:outline-none" name="Choose a filter"
                        bind:value={chosenFilter}>
                    {#each Object.keys(filterList) as filter}
                        <option class="" value="{filter}">{filter.replace('_', ' ')}</option>
                    {/each}
                </select>
            </div>

            <div class="flex items-center ml-5 text-lg">
                <p class="mr-2">Display:</p>
                <input class="w-12  bg-background p-3 pr-0 rounded-lg" type="number" min="1" step="1"
                       bind:value={displayNumber}>
            </div>
        </div>

        {#each data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber) as legend}
            <div class="w-full  mt-3  p-4 pl-6 bg-background rounded-xl">
                <button class="w-full flex items-center  relative"
                        on:click={handleOpenLegendTile(legend.legend_name_key)}>
                    <div>
                        <img class="-ml-1 md:ml-0 w-10"
                             src="/assets/LegendIcons/{legend.legend_name_key.replace(' ', '_')}.png" alt="">
                    </div>

                    <div class="mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default">
                        <p class="ml-2 md:ml-3">{legend.legend_name_key}</p>
                        <p class="text-green">
                            {filterList[chosenFilter].display(legend)}
                        </p>
                    </div>

                    <div class:-top-1={openedList[legend.legend_name_key] === true}
                         class:right-1={openedList[legend.legend_name_key] === true}
                         class="/-mt-2  text-2xl md:text-3xl  text-light absolute right-0"
                         style="font-family: sans-serif">
                        {openedList[legend.legend_name_key] === true ? "-" : "+"}
                    </div>
                </button>

                {#if openedList[legend.legend_name_key] === true}
                    <div class="mt-4">
                        {#each Object.entries(filterList) as [key, value]}
                            {#if key !== chosenFilter}
                                <p class="text-lg  text-mid-light ">{key.replace('_', ' ')}: <b
                                    class="font-normal text-primary text-xl">{value.display(legend)}</b>
                                </p>
                            {/if}
                        {/each}

                    </div>
                {/if}
            </div>
        {/each}
        <div class="flex lg:hidden">
            <button class="mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light" on:click={()=>displayNumber+=2}>
                Load more
            </button>
        </div>
        <!--
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

                    &lt;!&ndash;<div class="mt-4">
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
                    </div>&ndash;&gt;
                </div>
        -->

    </div>

</div>
