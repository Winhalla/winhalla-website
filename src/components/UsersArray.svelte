<script>

    import { callApi } from "../utils/api";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { config } from "./storeAdmin";

    export let users;
    export let color;
    export let pwd;
    export let banned = false;
    let isDoingAction;
    let otp;
    let scrollY;
    let player;
    let action;
    let reason;

    async function unsuspicious(id, state) {
        if (state === 0) {
            isDoingAction = true;
            player = id;
            action = "Mark as unsuspicious";
        }
        if (state === 1) {
            await callApi("post", `/feltrom/unsuspicious?otp=${otp}&pwd=${pwd}&user=${id}`);
            config.set({ refresh: true });
            isDoingAction = false;
            player = undefined;
        }
    }

    async function ban(id, state, ban) {
        if (state === 0) {
            isDoingAction = true;
            player = id;
            action = ban === true ? "ban" : "unban";
        }
        if (state === 1) {
            await callApi("post", `/feltrom/ban?otp=${otp}&pwd=${pwd}`, { ban: ban === "ban", id, reason });
            config.set({ refresh: true });
            isDoingAction = false;
            player = undefined;
        }
    }
</script>

<svelte:window bind:scrollY={scrollY} />

<table class="card px-4 text-2xl w-3/4 overflow-scroll">
    <thead class="rounded" class:bg-primary={color==="blue"} class:bg-legendary={color === "red"}>
    <tr>
        <td class="px-4 py-3">
            #
        </td>
        <td class="px-4 py-3">
            Name
        </td>
        {#if !banned}
            <td class="px-4 py-3">
                In game?
            </td>
        {/if}
        <td class="px-4 py-3">
            Games played
        </td>
        <td class="px-4 py-3">
            Winrate
        </td>
        <td class="px-4 py-3">
            Coins
        </td>
        {#if banned}
            <td class="px-4 py-3">
                Reason
            </td>
        {/if}
        <td class="px-4 py-3">
            Actions
        </td>
    </tr>
    </thead>
    <tbody class=" divide-y-4 divide-background text-l">
    <!--For each rank-->
    {#each users as user,i}
        <tr class="text-center cursor-pointer" on:click={()=>user.isDetailsOpen = !user.isDetailsOpen}>
            <td class="px-2 py-2">
                <b class="font-normal">{i + 1}</b>
            </td>
            <td class="h-full px-2 py-2">
                <div class="flex items-center my-auto  overflow-x-auto" style="width: 13rem">
                    <img class="w-10 h-10 rounded-full" src={user.avatarURL}
                         alt="PP">
                    <p class="pl-2" class:text-lg={user.brawlhallaName?.length>=17 && user.brawlhallaName?.length<26}>
                        {user.brawlhallaName}
                    </p>
                </div>
            </td>
            {#if !banned}
                <td class="px-2 py-2">
                    <b class:text-legendary={user.inGame.findIndex(e => !e.isFinished) === -1}
                       class:text-green={user.inGame.findIndex(e => !e.isFinished) !== -1}
                       class="font-normal">{user.inGame.findIndex(e => !e.isFinished) === -1 ? "No" : "Yes"}</b>
                </td>
            {/if}
            <td class="px-2 py-2">
                {user.stats.ffa.gamesPlayed}
            </td>
            <td class:text-green={user.winrate<14}
                class:text-accent={user.winrate<25 && user.winrate>=14}
                class:text-legendary={user.winrate>=25} class="px-2 py-2">
                {user.winrate}%
            </td>
            <td class:text-green={user.coins<40000}
                class:text-accent={user.coins<120000 && user.coins>=40000}
                class:text-legendary={user.coins>=120000} class="px-2 py-2">
                {user.coins}$
            </td>
            {#if banned}
                <td class="px-2 py-2 overflow-x-auto -pt-8" style="width: 10rem;"
                    class:text-base={user.reason?.length > 15} class:text-xs={user.reason?.length > 30}>
                    {user.reason}
                </td>
            {/if}
            {#if !banned}
                <td class="px-2 py-2 block w-15">
                    <div class="flex items-center">
                        <button on:click={ban(user.steamId,0,true)} class="cursor-pointer mr-2">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
                                 style="fill: #fc1870;">
                                <path
                                    d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                            </svg>
                        </button>
                        {#if color === "red"}
                            <button on:click={unsuspicious(user.steamId,0)} class="cursor-pointer">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
                                     style="fill: #3de488;">
                                    <path
                                        d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                                </svg>
                            </button>
                        {/if}
                    </div>
                </td>
            {:else}
                <td class="px-2 py-2">
                    <div on:click={ban(user.steamId,0,false)} class="cursor-pointer">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
                             style="fill: #3de488;">
                            <path
                                d="m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z" />
                        </svg>
                    </div>
                </td>
            {/if}
        </tr>
        {#if user.isDetailsOpen}
            <tr class="w-full py-5 ">
                <td class="w-full" colspan="2">
                    <div class="w-full">
                        {#each user.solo?.logs as quest, ii}
                            {#if ii < 5}
                                <p class="p-4">{quest.name}</p>
                                <p class="text-accent text-xl">{quest.time/60}: {quest.time-quest.time/60}</p>
                            {/if}
                        {/each}
                    </div>
                </td>
                <td class="w-full" colspan="5">
                    <div class="w-full">
                        {#each user.lastGames as game, ii}
                            {#if ii < 5}
                                <a class="p-4" href="/play/ffa/{game.id}?spectator=true">{game.id}</a>
                            {/if}
                        {/each}
                    </div>
                </td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
{#if isDoingAction}
    <div class="absolute w-screenw-99 h-screen bg-black opacity-90 z-50 left-0" style="top: {scrollY}px;"
         transition:fade|local={{duration:200}}></div>
    <div class="absolute block -pl-4 z-50 bg-background rounded-lg border border-primary mx-auto px-14 py-8"
         style="top: {scrollY + 100}px;" class:lg:left-screenw-38={action === "unban"}
         transition:fade|local={{duration:200}}>
        <h2 class="text-4xl mt-10 text-primary">
            Confirm {action}:
        </h2>
        <h1 class="text-2xl mt-10 text-accent">
            Enter google authenticator OTP
        </h1>
        <input type="text"
               class="px-4 py-1 text-black rounded-sm"
               maxlength="6"
               placeholder="Google authenticator OTP"
               bind:value={otp} /><br>
        {#if action === "ban"}
            <h1 class="text-2xl mt-10 text-accent">
                Reason
            </h1>
            <input type="text"
                   class="px-4 py-1 text-black rounded-sm" size="50"
                   placeholder="Reason for the {action}"
                   bind:value={reason}>
            <p></p>
        {/if}
        <div class="justify-center w-full flex">
            <button class="button button-brand mt-8" style="background-color: #fc1870"
                    on:click={()=>{if(action === "Mark as unsuspicious"){unsuspicious(player,1)}else{ban(player,1,action)}}}>
                Confirm {action}
            </button>
            <button class="button button-brand mt-8 border border-legendary ml-5" style="background-color: #17171a;"
                    on:click={()=>{isDoingAction = false;player = undefined;}}>
                Cancel
            </button>
        </div>
    </div>
{/if}