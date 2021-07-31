<script>
    import CoinIcon from "../CoinIcon.svelte";
    import addSuffixTo from "../../utils/addSuffixTo";
</script>

<div class="relative bg-variant  rounded-2xl   p-8  mt-12 xl:ml-20   h-auto w-1/2">
    <p class="absolute -top-3 text-xl text-mid-light">HISTORY</p>

    <div class="-mt-1  w-full">
        <div class="flex justify-between  p-4 pl-6 bg-background rounded-xl  text-xl  mt-3">

            <div class="flex">
                <div class="flex items-center  mr-6 text-epic">
                    <p class=" text-2xl">10</p>
                    <div class="ml-1 mb-1  w-6">
                        <CoinIcon/>
                    </div>
                </div>
                <p class="text-default  font-bold mt-px" style="font-family: 'Roboto Condensed', sans-serif;">Daily
                    Quest</p>


                <p class="ml-28 text-primary text-2xl">"Do 25 KOs"</p>
            </div>

            <p class="text-mid-light text-2xl">10:32</p>
        </div>


        <div class="flex justify-between  p-4 pl-6 bg-background rounded-xl  text-xl  mt-3">

            <div class="flex">
                <div class="flex items-center  mr-6 text-epic">
                    <p class=" text-2xl">24</p>
                    <div class="ml-1 mb-1  w-6">
                        <CoinIcon/>
                    </div>
                </div>
                <p class="text-default  font-bold mt-px" style="font-family: 'Roboto Condensed', sans-serif;">Solo match</p>


                <p class="ml-28 text-primary text-2xl">{addSuffixTo(1)} place</p>
            </div>

            <p class="text-mid-light text-2xl">9:46</p>
        </div>
    </div>

</div>