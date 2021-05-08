<script>
    import UsersArray from "./UsersArray.svelte";

    export let newConfig;
    export let goldEvent;
    export let popup;
    export let bannedOnes;
    export let otp;
    export let pwd;
    export let infoDates;

    function makePopup(reason, options) {
        popup.type = reason.goal === "create" ? "creation" : "deletion";
        popup.thing = reason.text;
        if (reason.text === "event" && reason.goal === "create") {
            popup.fields = [{ name: "Name (reason of the event)", value: null }, {
                name: "Duration (in days)",
                value: null
            }, {
                name: "Percentage of boost (20 equals all rewards to be raised by 20%)",
                value: null
            }, { name: "description (additional infos)", value: null }];
        } else if (reason.text === "info" && reason.goal === "create") {
            popup.fields = [{ name: "Name", value: null }, {
                name: "Duration (in hours)",
                value: null
            }, { name: "description", value: null }];
        } else if (reason.text === "info" || reason.text === "event" || reason.text === "poll" && reason.goal === "delete") {
            popup.options = options;
            popup.fields = [];
        } else if (reason.text === "poll") {
            popup.fields = [{ name: "name", value: null }, {
                name: "Multiple choice question ?",
                value: null,
                special: []
            }];
            popup.special = "poll";
        }
    }
</script>
<style>
    /*Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    .gradient {
        background-image: linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);
        background-size: 300%;
        animation: gradient-animation 4.5s linear infinite;
    }
</style>
<div class="lg:justify-evenly w-full lg:flex h-full lg:flex-wrap ">
    {#each newConfig as config,i}
        {#if config.name !== "ADVICES"}
            <div class="mb-16 border-t-2 border-primary bg-variant rounded-lg mx-4 p-4">
                <div class="flex flex-justify">
                    <h1 class="text-5xl text-primary w-full">{config.name}</h1>
                    {#if config.name !== "IDs BANNED"}
                        <div>
                            <button
                                class="flex m-3 mt-1.5 p-2 pt-1 focus:outline-none text-gray-500 hover:text-white"
                                on:click={()=>config.isEditing = !config.isEditing}>
                                <svg version="1.1" class="w-5 h-5"
                                     xmlns="http://www.w3.org/2000/svg"
                                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                                     xml:space="preserve">
                                <g><g class="fill-current" transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M7681.7,4992.8c-223.8-57.1-328.5-138.1-840.3-649.9c-278.5-276.1-507-514.2-507-528.5c0-30.9,2337.6-2368.5,2370.9-2368.5c11.9,0,254.7,233.3,535.6,518.9c552.2,557,599.8,623.7,647.5,902.2c31,178.5,0,376.1-90.4,571.3c-50,111.9-164.3,240.4-626.1,704.6c-645.1,649.9-737.9,730.8-926,802.2C8088.7,5004.7,7819.8,5026.1,7681.7,4992.8z"/><path
                                    d="M3704,1207.9L1299.7-1196.4l285.6-285.7c157.1-157.1,295.2-285.7,309.5-285.7c11.9,0,1099.8,1076,2416.1,2392.3L6703.3,3017l-297.5,297.6l-297.6,297.6L3704,1207.9z" /><path
                                    d="M4418.1,493.7L2013.9-1910.5l483.2-480.8l480.9-483.2L5382.2-470.4l2404.2,2404.2l-483.2,483.2L6822.4,2898L4418.1,493.7z" /><path
                                    d="M5506-584.6c-1311.6-1311.6-2385.2-2397.1-2385.2-2409c0-14.3,128.5-152.4,285.7-309.5l285.6-285.6l2404.3,2404.2l2404.2,2404.2l-290.4,290.4C8048.3,1672,7912.6,1803,7905.5,1803C7898.3,1803,6820,729.4,5506-584.6z" /><path
                                    d="M959.3-2284.2C826-2700.8,716.5-3053.1,716.5-3065c0-33.3,1078.3-1106.9,1111.7-1106.9c30.9,0,1511.6,476.1,1530.6,492.8c9.5,9.5-2121,2149.5-2142.4,2149.5C1209.3-1529.6,1092.6-1870,959.3-2284.2z" /><path
                                    d="M588-3429.2c-7.1-11.9-66.7-173.8-133.3-359.5c-64.3-185.7-171.4-485.6-235.7-666.5l-119-333.3l290.4,104.7c159.5,57.1,461.8,164.3,671.3,238c209.5,73.8,388,142.8,397.5,152.4c9.5,9.5-178.5,211.8-419,452.3C799.8-3600.6,597.5-3415,588-3429.2z" /></g></g>
                                                </svg>
                            </button>
                        </div>
                    {/if}
                </div>
                <div class="pt-4 block">
                    {#if config.name === "GAMEMODES STATUS"}
                        <h2 class="text-3xl">FFA</h2>
                        <div class:flex={!config.isEditing}>
                            {#if config.isEditing}
                                <input type="radio" id="FFAActivatedTrue" name="FFAActivated"
                                       value={true}
                                       bind:group={config.value.FFA}>
                                <label for="FFAActivatedTrue" class="text-green">Activated</label><br>
                                <input type="radio" id="FFAActivatedMaintenance" name="FFAActivated"
                                       value="maintenance" bind:group={config.value.FFA}>
                                <label for="FFAActivatedMaintenance"
                                       class="text-accent">Maintenance</label><br>
                                <input type="radio" id="FFAActivatedFalse" name="FFAActivated"
                                       value={false} bind:group={config.value.FFA}>
                                <label for="FFAActivatedFalse" class="text-legendary">Disabled</label>
                            {:else}
                                <p class:text-green={config.value.FFA === true}
                                   class:text-accent={config.value.FFA === "maintenance"}
                                   class:text-legendary={config.value.FFA === false}>
                                    • {config.value.FFA === true ? 'Active' : config.value.FFA === 'maintenance' ? 'Maintenance in progress' : 'Inactive (Coming soon)'}
                                </p>
                            {/if}

                        </div>
                        <h2 class="text-3xl">2vs2</h2>
                        <div class:flex={!config.isEditing}>
                            {#if config.isEditing}
                                <input type="radio" id="2vs2ActivatedTrue" name="2vs2Activated"
                                       value={true}
                                       bind:group={config.value['2vs2']}>
                                <label for="2vs2ActivatedTrue" class="text-green">Activated</label><br>
                                <input type="radio" id="2vs2ActivatedMaintenance" name="2vs2Activated"
                                       value="maintenance" bind:group={config.value['2vs2']}>
                                <label for="2vs2ActivatedMaintenance"
                                       class="text-accent">Maintenance</label><br>
                                <input type="radio" id="2vs2ActivatedFalse" name="2vs2Activated"
                                       value={false} bind:group={config.value['2vs2']}>
                                <label for="2vs2ActivatedFalse" class="text-legendary">Disabled</label>
                            {:else}
                                <p class:text-green={config.value["2vs2"] === true}
                                   class:text-accent={config.value["2vs2"] === "maintenance"}
                                   class:text-legendary={config.value["2vs2"] === false}>
                                    • {config.value['2vs2'] === true ? 'Active' : config.value['2vs2'] === 'maintenance' ? 'Maintenance in progress' : 'Inactive (Coming soon)'}
                                </p>
                            {/if}


                        </div>
                    {:else if config.name === "FFA REWARDS CONFIG"}
                        <div class="block">
                            {#if config.isEditing}
                                {#each config.value as reward,ii}
                                    <div class="flex my-2px">
                                        <p class="text-accent">{ii + 1}{ii === 0 ? "st" : ii === 1 ? "nd" : ii === 2 ? "rd" : "th"}</p>
                                        :
                                        <input bind:value={reward} type="number"
                                               class="bg-gray-200 ml-1 text-black px-2"
                                               size="4">
                                    </div>
                                {/each}
                            {:else}
                                {#each config.value as reward,ii}
                                    <div class="flex my-2px">
                                        <p class="text-accent">{ii + 1}{ii === 0 ? "st" : ii === 1 ? "nd" : ii === 2 ? "rd" : "th"}</p>
                                        : {reward}$
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    {:else if config.name === "ADVICES"}
                        <div class="flex mb-5">
                            <p>Probability:</p>
                            <input type="text"
                                   class="text-2xl bg-variant rounded -mt-3 mx-2 text-center"
                                   size="3"
                                   bind:value={config.value.probability} />%
                        </div>
                        {#each config.value.advices as info,ii}
                            <h2 class="text-4xl text-accent">{ii + 1}.</h2>
                            <h3 class="text-3xl">Name</h3>
                            <input class="text-2xl bg-variant rounded" size="40" type="text"
                                   bind:value={info.name} />
                            <h3 class="text-3xl mt-3">Strong</h3>
                            <input class="text-xl bg-variant rounded mt-2" size="40" type="text"
                                   bind:value={info.strong}>

                        {/each}
                    {:else if config.name === "INFOS"}
                        {#each config.value as info,ii}
                            <div class="border-primary border-b pb-8 mb-6">
                                <div class="flex justify-between">
                                    <h2 class="text-4xl text-accent">{ii + 1}.</h2>
                                    <button
                                        class="hover:bg-legendary h-6 text-legendary hover:text-white rounded"
                                        on:click={()=>makePopup({text:"info",goal:"delete"},{index:ii})}>
                                        <svg class="w-4 mx-1 fill-current" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                                        </svg>
                                    </button>
                                </div>
                                <h3 class="text-3xl text-primary">Name</h3>
                                {#if config.isEditing === true}
                                                <textarea class="text-xl px-3 py-2 bg-background rounded" type="text"
                                                          cols="40" rows="3"
                                                          bind:value={info.name} />
                                {:else}
                                    <p class="text-2xl mb-4">{info.name}</p>
                                {/if}
                                <h3 class="text-3xl text-primary">Description</h3>
                                {#if config.isEditing === true}
                                            <textarea class="text-xl px-3 py-2 bg-background rounded mt-2" type="text"
                                                      bind:value={info.description} cols="40" rows="3" />
                                {:else}
                                    <p class="text-xl mb-4">{info.description}</p>
                                {/if}
                                <h3 class="text-3xl text-primary">Expires</h3>
                                {#if info.expiration < Date.now()}
                                    <h3 class="text-2xl text-legendary">Expired</h3>
                                {:else}
                                    <p>{infoDates[ii].getDate() < 10 ? "0" + infoDates[ii].getDate() : infoDates[ii].getDate()}
                                        / {infoDates[ii].getMonth() + 1 < 10 ? "0" + (infoDates[ii].getMonth() + 1) : infoDates[ii].getMonth() + 1}
                                        / {infoDates[ii].getFullYear()}
                                    <p>{infoDates[ii].getHours() < 10 ? "0" + infoDates[ii].getHours() : infoDates[ii].getHours()}
                                        : {infoDates[ii].getMinutes() < 10 ? "0" + infoDates[ii].getMinutes() : infoDates[ii].getMinutes()}</p>
                                {/if}
                            </div>
                        {/each}
                        <div class="flex">
                            <button class="m-auto  button button-brand"
                                    on:click={()=>makePopup({text:"info",goal:"create"})}>Create
                                info
                            </button>
                        </div>
                    {:else if config.name === "POLLS"}
                        {#each config.value as poll,ii}
                            <div class="border-primary border-b pt-4 pb-8">
                                <div class="flex justify-between">
                                    <h3 class="text-primary text-3xl">Name</h3>
                                    <button
                                        class="hover:bg-legendary h-6 text-legendary hover:text-white rounded"
                                        on:click={()=>makePopup({text:"poll",goal:"delete"},{index:poll._id})}>
                                        <svg class="w-4 mx-1 fill-current" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                                        </svg>
                                    </button>
                                </div>
                                {#if config.isEditing === true}
                                                <textarea class="text-xl px-3 py-2 bg-background rounded" type="text"
                                                          cols="40" rows="3"
                                                          bind:value={poll.name}></textarea>
                                {:else}
                                    <p class="text-2xl ml-4 mb-4">{poll.name}</p>
                                {/if}
                                {#if poll.isMCQ}
                                    <h3 class="text-3xl text-primary">Options</h3>
                                    {#each poll.answers as option, iii}
                                        <div class="flex">
                                            <input class="text-2xl bg-variant rounded mt-2"
                                                   size="{window.innerWidth <1024 ? 15:60}"
                                                   type="text"
                                                   bind:value={option.name}>
                                            <p class="text-primary text-2xl">Votes <strong
                                                class="font-normal text-white">{option.nb}</strong>
                                                Percentage <strong class="font-normal"
                                                                   class:text-legendary={(option.nb/poll.totalAnswers ||0)<0.25}
                                                                   class:text-green={(option.nb/poll.totalAnswers ||0)>=0.5}
                                                                   class:text-accent={(option.nb/poll.totalAnswers ||0)>=0.25 && option.nb/poll.totalAnswers<0.5}> {option.nb / poll.totalAnswers * 100 || 0}
                                                    %</strong></p>
                                        </div>
                                    {/each}
                                {:else}
                                    <button class="button button-brand"
                                            on:click={()=>poll.areAnswersShown = !poll.areAnswersShown}>{poll.areAnswersShown ? 'Hide' : 'Show'}
                                        answers
                                    </button>
                                    {#if poll.areAnswersShown}
                                        <p class="mt-8 text-accent text-3xl">Total
                                            answers: {poll.totalAnswers}</p>
                                        <div class="flex mt-4">
                                            {#each poll.answers as answer, iii}
                                                <p>
                                                    <h class="text-primary mr-1">1.</h>{answer}</p>
                                            {/each}
                                        </div>

                                    {/if}
                                {/if}


                            </div>
                        {/each}
                        <div class="flex pt-4">
                            <button class="m-auto button button-brand"
                                    on:click={()=>makePopup({text:"poll",goal:"create"})}>Create new
                                poll
                            </button>
                        </div>
                    {:else if config.name === "GOLD EVENT"}
                        <div class="hidden">
                            {goldEvent[0] = Math.floor((config.value.expiration - Date.now()) / 1000 / 86400)}
                            {goldEvent[1] = Math.floor((config.value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24)}
                            {goldEvent[2] = Math.floor((config.value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60)}
                        </div>
                        {#if config.value.expiration !== null && goldEvent[0] >= 0}

                            {#if config.isEditing}
                                <div class="block">
                                    <label>
                                        Boost of:
                                        <input type="number" class="text-black" size="4"
                                               bind:value={config.value.percentage}>

                                    </label><br>
                                    <p class="text-accent">Example : 120 equals all rewards to be raised
                                        by 20%</p><br>
                                    <label>
                                        Expiration:<br>
                                        <input type="date" class="text-black"
                                               bind:value={config.value.expDate}><br>
                                        <input type="time" class="text-black my-2"
                                               bind:value={config.value.expTime}><br>
                                    </label>
                                </div>
                            {:else}
                                <h3 class="text-2xl">Boost of <strong
                                    class="font-normal text-accent text-3xl">{config.value.percentage - 100}
                                    %</strong></h3>

                                <p class="text-2xl">
                                    Expires in
                                    <strong
                                        class="text-accent font-normal text-3xl">{goldEvent[0]}</strong>
                                    days,
                                    <strong
                                        class="text-accent font-normal text-3xl">{goldEvent[1]}</strong>
                                    hours,
                                    <strong
                                        class="text-accent font-normal text-3xl">{goldEvent[2]}</strong>
                                    minutes,
                                </p>
                                <h3 class="text-2xl">Name: <strong
                                    class="font-normal text-accent text-3xl">{config.value.name}
                                </strong></h3>
                                <h3 class="text-2xl">Description: <strong
                                    class="font-normal text-accent text-xl">{config.value.description}
                                </strong></h3>
                            {/if}
                            <div class="flex">
                                <button class="button button-brand mx-auto mt-4"
                                        style="background-color: #fc1870"
                                        on:click={()=>makePopup({text:"event",goal:"delete"})}>Stop
                                    event
                                </button>
                            </div>
                        {:else}
                            <div class="flex">
                                <button class="button m-auto button-brand"
                                        on:click={()=>makePopup({text:"event",goal:"create"})}>
                                    Create event
                                </button>
                            </div>
                        {/if}

                    {:else if config.name === "LINKS CONFIG"}
                        <div class="w-60">
                            <p class="text-2xl">Players joining via an affiliated link get
                                {#if config.isEditing}
                                    <strong
                                        class="text-accent font-normal text-3xl">
                                        <input type="number" class="bg-background" size="4"
                                               bind:value|number={config.value.boost}>%</strong>
                                    more coins for
                                    <strong
                                        class="text-accent font-normal text-3xl">
                                        <input type="number" class="bg-background" size="4"
                                               bind:value={config.value.duration}>days</strong>

                                {:else}
                                    <strong
                                        class="text-accent font-normal text-3xl">{config.value.boost}
                                        %</strong>
                                    more
                                    coins for <strong
                                    class="text-accent font-normal text-3xl">{config.value.duration}
                                    days</strong>
                                {/if}
                            </p>
                        </div>
                    {:else if config.name === "IDs BANNED"}
                        <div class="block">
                            {#if config.value.length !== 0}
                                <UsersArray users="{bannedOnes}" banned="true" color="blue"
                                            otp={otp}
                                            pwd={pwd} />
                            {/if}
                        </div>
                        <p class="text-3xl text-green">
                            {config.value.length === 0 ? "No player has been banned" : ""}
                        </p>
                    {/if}
                </div>
            </div>
        {/if}
    {/each}
</div>