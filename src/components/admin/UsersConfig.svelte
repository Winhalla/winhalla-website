<script>
    export let suspiciousBitches;
    export let users;
    export let totalCoins;
    export let pwd;
    export let otp;
    export let sortArrays;
    import UsersArray from "./UsersArray.svelte"
    let sortBy = "alphabetic"
    let normalUsersShown;



    function sort(by, stats) {
        if (stats) {
            sortArrays((a, b) => {
                return b.stats.ffa[by] - a.stats.ffa[by];
            });

        } else if (by === "alphabetic") {
            sortArrays((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));
        } else {
            sortArrays((a, b) => {
                return b[by] - a[by];
            });
        }
        sortBy = by;
        users = users;
    }
</script>
<div class="w-full h-full block">
    {#if normalUsersShown || suspiciousBitches.length > 0}
        <div class="text-2xl mb-5 flex overflow-hidden">
            <h3 class="">Sort by:</h3>
            <h3 class="ml-3">
                <strong class="font-normal cursor-pointer "
                        class:text-accent={sortBy === "alphabetic"}
                        class:text-3xl={sortBy === "alphabetic"}
                        on:click={()=>sort("alphabetic")}>alphabetic</strong>,
                <strong class="font-normal cursor-pointer"
                        class:text-accent={sortBy === "winrate"}
                        class:text-3xl={sortBy === "winrate"}
                        on:click={()=>sort("winrate")}>winrate</strong>,
                <strong class="font-normal cursor-pointer"
                        class:text-accent={sortBy === "coins"}
                        class:text-3xl={sortBy === "coins"}
                        on:click={()=>sort("coins")}>coins</strong>,
                <strong class="font-normal cursor-pointer"
                        class:text-accent={sortBy === "gamesPlayed"}
                        class:text-3xl={sortBy === "gamesPlayed"}
                        on:click={()=>sort("gamesPlayed",true)}>games played</strong>
            </h3>
        </div>
    {/if}
    <div class="flex">
        <div class="block">
            <p class="text-3xl mt-5 mb-2 ml-2">
                <d class="text-accent">{totalCoins}</d>
                W In circulation equals
                <d class="text-accent">{parseFloat((totalCoins / 10750).toFixed(4))}</d>
                €
            </p>
            {#if suspiciousBitches.length > 0}
                <div class:mb-15={normalUsersShown}>
                    <p class="text-3xl mt-5 mb-2 ml-2">
                        <strong class="text-accent font-normal">{suspiciousBitches.length}</strong>
                        suspicious user{suspiciousBitches.length > 1 ? "s" : ""} found
                    </p>
                    <UsersArray users="{suspiciousBitches}" color="red" pwd="{pwd}" otp={otp} />
                </div>
            {:else}
                <div class="my-5 text-3xl mb-5 text-green">
                    No suspicious player has been found
                </div>
            {/if}
            {#if normalUsersShown}
                <UsersArray users="{users}" color="blue" pwd="{pwd}" otp={otp} />
                <h2 class="text-2xl cursor-pointer ml-3 mt-2 w-22 text-gray-400 hover:text-white"
                    on:click={()=>normalUsersShown = !normalUsersShown}>hide
                    users</h2>
            {:else}
                <button class="button button-brand ml-3 mt-4"
                        on:click={()=>normalUsersShown = !normalUsersShown}>Show all users
                </button>
            {/if}
        </div>
        {#if normalUsersShown || suspiciousBitches.length > 0}
            <div class="block ml-5 mt-11 mr-10%">
                <p class="mt-6 text-xl">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         class="w-5 h-5 mb-2"
                         style="fill: #fc1870">
                        <path
                            d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                    </svg>
                    Click to ban user (confirmation message always shows)
                </p>
                <p class="mt-6 text-xl">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         class="w-5 h-5 mb-2"
                         style="fill: #3de488">
                        <path
                            d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                    </svg>
                    Click to unmark user
                </p>
            </div>
        {/if}
    </div>
</div>