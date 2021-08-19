<script>
    import CoinIcon from "../CoinIcon.svelte";
    import addSuffixTo from "../../utils/addSuffixTo";
    import tims from "tims";

    export let data;
    console.log(data);

    function formatTime(sec) {
        let timeString = tims.since(new Date(sec), { locale: "en" });

        if (timeString.includes("year")) {
            timeString = timeString.slice(0, timeString.indexOf("year") - 1) + "y";

        } else if (timeString.includes("years")) {
            timeString = timeString.slice(0, timeString.indexOf("years") - 1) + "y";

        } else if (timeString.includes("month")) {
            timeString = timeString.slice(0, timeString.indexOf("month") - 1) + "month";

        } else if (timeString.includes("months")) {
            timeString = timeString.slice(0, timeString.indexOf("months") - 1) + "months";

        } else if (timeString.includes("days")) {
            timeString = timeString.slice(0, timeString.indexOf("days") - 1) + "d";

        } else if (timeString.includes("hours")) {
            timeString = timeString.slice(0, timeString.indexOf("hours") - 1) + "h";

        } else if (timeString.includes("minutes")) {
            timeString = timeString.slice(0, timeString.indexOf("minutes") - 1) + "m";
        }

        return timeString.replace("one hour", "1h") + " ago";
    }
</script>

<div class="relative bg-variant  rounded-2xl   p-8  mt-12 md:ml-12 2xl:ml-20     lg:w-7/12 xl:w-2/5 2xl:w-1/2">
    <p class="absolute -top-3 text-xl text-mid-light">HISTORY</p>

    <div class="-mt-1  w-full h-full max-h-screen-70 rounded-lg overflow-y-auto scrollbar scrollbar-background">
        {#if data.length < 1}
            <div class="py-4 px-6 bg-background rounded-xl  text-xl  mt-3 text-center">
                No history
            </div>
        {:else}
            {#each data.sort((a, b) => b.timestamp - a.timestamp) as entry}
                <div class="md:flex justify-between  py-4 px-6 bg-background rounded-xl  text-xl  mt-3">
                    <div class="flex">
                        <div class="flex items-center  mr-6 text-legendary">
                            <p class=" text-2xl">{entry.data.reward}</p>
                            <div class="ml-1 mb-1  w-6">
                                <CoinIcon />
                            </div>
                        </div>
                        <p class="text-xl l:text-default  font-bold mt-px"
                           style="font-family: 'Roboto Condensed', sans-serif;">{entry.displayName}</p>


                        <p class="hidden md:block md:ml-8  ml-12 2xl:ml-28 text-primary  text-xl 2xl:text-2xl">{entry.type.includes("Quest") ? `"${entry.data.name}"` : entry.data.name ? entry.data.name : ""}</p>
                    </div>

                    <div class="flex justify-between md:block  mt-2 md:mt-0">
                        <p class="md:hidden   text-primary text-xl">{entry.type.includes("Quest") ? `"${entry.data.name}"` : entry.data.name ? entry.data.name : ""}</p>

                        <p class="ml-2 md:ml-4 lg:ml-0 md:mt-0 text-mid-light  text-xl 2xl:text-2xl  flex-shrink-0">{formatTime(entry.timestamp)}</p>
                    </div>
                </div>
            {/each}
        {/if}

    </div>

</div>