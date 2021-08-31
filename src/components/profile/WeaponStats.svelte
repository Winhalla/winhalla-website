<script>
    import formatTime from "../../utils/formatTime";
    import filterList from "../../utils/filterList";
    import { clickOutside } from "../../utils/clickOutside";

    export let data;
    let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);
    let isDropdownOpen;
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

    function changeWeapon(i) {
        selectedWeapon = sortedData[i];
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

<div class="container relative bg-variant rounded-xl p-8 mt-12 md:mt-0 md:ml-12 lg:ml-18 xl:ml-10 h-auto">
    <p class="absolute -top-3 text-xl text-mid-light">WEAPONS</p>

    <div class="md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl">
        <div class="flex items-center">
            <img class="w-10 mr-4" src="/assets/WeaponIcons/{selectedWeapon.name.replace(' ', '_').toLowerCase()}.png" alt="">
            <div class="w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none"
                 on:click={() =>handleDropDown(false)}>
                {selectedWeapon.name}
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
                    {#each sortedData as weapon,i}
                        <li on:click={() => changeWeapon(i)} class="flex my-2 px-6 hover:bg-light cursor-pointer ">
                            <img class="w-10 mr-4" src="/assets/WeaponIcons/{weapon.name.replace(' ', '_').toLowerCase()}.png" alt="">
                            {weapon.name}
                        </li>
                    {/each}
                </ul>
            {/if}


        </div>
        <div class="mt-6 ml-2  text-lg md:text-xl  ">
            <p class="text-mid-light mt-">Time held: <b
                class="  font-normal text-primary  text-xl md:text-2xl">{formatTime(selectedWeapon.matchtime)}</b>
            </p>
            <p class="text-mid-light mt-">Games played: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.games}</b>
            </p>

            <p class="text-mid-light mt-3">KOs: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.kos}</b>
            </p>
            <p class="text-mid-light mt-">Damage dealt: <b
                class="font-normal text-primary  text-xl md:text-2xl">{selectedWeapon.damagedealt}</b>
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
                        <img class="-ml-1 md:ml-0 w-8" src="/assets/WeaponIcons/{weapon.name.replace('_', ' ').toLowerCase()}.png"
                             alt="">
                    </div>

                    <div class="mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default">
                        <p class="ml-2 md:ml-3">{weapon.name}</p>
                        <p class="text-green">
                            {filterList[chosenFilter].display(weapon)}
                        </p>
                    </div>

                    <div class:-top-1={openedList[weapon.name] === true}
                         class:right-1={openedList[weapon.name] === true}
                         class="/-mt-2  text-2xl md:text-3xl  text-light absolute right-0"
                         style="font-family: sans-serif">
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

        <div class="flex lg:hidden">
            <button class="mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light" on:click={()=>displayNumber+=2}>
                Load more
            </button>
        </div>


    </div>

</div>