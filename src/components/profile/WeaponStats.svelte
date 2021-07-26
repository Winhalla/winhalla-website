<script>
    import formatTime from "../../utils/formatTime";
    import filterList from "../../utils/filterList";

    export let data;
    let sortedData = data.sort((a, b) => b.matchtime - a.matchtime)

    //select first legend by default
    let selectedWeapon = sortedData[0];

    //Handle which legend tile is open
    let openedList = {};

    function handleOpenWeaponTile(weapon_name) {
        openedList[weapon_name] = !openedList.hasOwnProperty(weapon_name) || openedList[weapon_name] === false;
    }


    let chosenFilter = "time_played";
    $: if (chosenFilter) {
        openedList = {};
    }

    let displayNumber = 3;
</script>


<style>


    @media (min-width: 480px) {
        .container {
            min-width: 21rem;
        }
    }
</style>

<div class="container   relative bg-variant rounded-xl  p-8 mt-12 md:mt-0  md:ml-12 lg:ml-18 xl:ml-10   h-auto">
    <p class="absolute -top-3 text-xl text-mid-light">WEAPONS</p>

    <div class="md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl">
        <div class="flex items-center">
            <img class="w-10 mr-4" src="/assets/WeaponIcons/{selectedWeapon.name.replace(' ', '_')}.png" alt="">
            <select class="w-full bg-background p-3 pl-4  rounded-xl  border-4 border-variant     focus:outline-none"
                    name="Choose a Weapon" bind:value={selectedWeapon}>
                {#each sortedData as weapon}
                    <option value={weapon}>{weapon.name}</option>
                {/each}
            </select>


        </div>
        <div class="mt-6 ml-2  text-lg md:text-xl  ">
            <p class="text-mid-light mt-">Time held: <b class="  font-normal text-primary  text-xl md:text-2xl">{formatTime(selectedWeapon.matchtime)}</b>
            </p>
            <p class="text-mid-light mt-">Games played: <b
                    class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.games}</b>
            </p>

            <p class="text-mid-light mt-3">KOs: <b class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.kos}</b>
            </p>
            <p class="text-mid-light mt-">Damage dealt: <b class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.damagedealt}</b>
            </p>
        </div>
    </div>


    <div class="mt-14  md:ml-2 w-full">
        <div class="flex text-xl  -mt-2 pb-2">
            <div class="flex items-center  text-lg">
                <select class="bg-background p-3  rounded-lg     focus:outline-none" name="Choose a filter"
                        bind:value={chosenFilter}>
                    {#each Object.keys(filterList) as filter}
                        {#if !filterList[filter].onlyLegends}
                            <option class="" value="{filter}">{filter.replace('_', ' ')}</option>
                        {/if}
                    {/each}
                </select>
            </div>

            <div class="flex items-center ml-5  text-lg">
                <p class="mr-2">Display:</p>
                <input class="w-12  bg-background p-3 pr-0 rounded-lg" type="number" min="1" step="1"
                       bind:value={displayNumber}>
            </div>
        </div>

        {#each data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber) as weapon}
            <div class="w-full  mt-3  p-4 pl-6 bg-background rounded-xl">
                <button class="w-full flex items-center  relative"
                        on:click={handleOpenWeaponTile(weapon.name)}>
                    <div>
                        <img class="-ml-1 md:ml-0 w-8" src="/assets/WeaponIcons/{weapon.name.replace('_', ' ')}.png" alt="">
                    </div>

                    <div class="mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default">
                        <p class="ml-2 md:ml-3">{weapon.name}</p>
                        <p class="text-green">
                            {filterList[chosenFilter].display(weapon)}
                        </p>
                    </div>

                    <div class:-top-1={openedList[weapon.name] === true}
                         class:right-1={openedList[weapon.name] === true}
                         class="/-mt-2  text-2xl md:text-3xl  text-light absolute right-0" style="font-family: sans-serif">
                        {openedList[weapon.name] === true ? "-" : "+"}
                    </div>
                </button>

                {#if openedList[weapon.name] === true}
                    <div class="mt-4">
                        {#each Object.entries(filterList) as [key, value]}
                            {#if key !== chosenFilter && !filterList[key].onlyLegends}
                                <p class="text-lg text-mid-light ">{key.replace('_', ' ')}: <b
                                        class="font-normal text-primary text-xl">{value.display(weapon)}</b>
                                </p>
                            {/if}
                        {/each}

                    </div>
                {/if}
            </div>
        {/each}


    </div>

</div>