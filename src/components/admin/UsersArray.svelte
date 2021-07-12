<script>

    import { callApi } from "../../utils/api";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { config } from "./storeAdmin";

    export let users;
    export let color;
    export let pwd;
    export let banned = false;
    export let type = "full";
    export let otp;
    let isDoingAction;
    let scrollY;
    let player;
    let action;
    let reason;
    let tempSteamId;
    let isVerifyingSteamId = { isDoing: false, steamId: null };

    function isSteamIdValid() {
        setTimeout(() => {
            isVerifyingSteamId.isValid = parseInt(isVerifyingSteamId.tempSteamId) === isVerifyingSteamId.steamId;
        }, 1);
    }

    async function unsuspicious(id, state) {
        setTimeout(() => {
            users[users.findIndex(e=>e.steamId === id)].isDetailsOpen = false
        },1)
        if (state === 0) {
            isDoingAction = true;
            player = id;
            action = "Mark as unsuspicious";
        }
        if (state === 1) {
            await callApi("post", `/feltrom/unsuspicious?otp=${otp}&pwd=${pwd}&user=${id}`);
            config.set({ users: true });
            isDoingAction = false;
            player = undefined;
        }
    }

    async function ban(id, state, ban) {

        setTimeout(() => {
            users[users.findIndex(e=>e.steamId === id)].isDetailsOpen = false
        },1)
        if (state === 0) {
            isDoingAction = true;
            player = id;
            action = ban === true ? "ban" : "unban";
        }
        if (state === 1) {
            await callApi("post", `/feltrom/ban?otp=${otp}&pwd=${pwd}`, { ban: ban === "ban", id : id, reason });
            config.set({ users: true });
            isDoingAction = false;
            player = undefined;
        }
    }
</script>

<svelte:window bind:scrollY={scrollY} />

<table class="card px-4 text-2xl rounded-lg overflow-scroll">
    <thead class="rounded-lg" class:bg-primary={color==="blue"} class:bg-legendary={color === "red"}>
    <tr>
        <td class="px-4 py-3">
            #
        </td>
        <td class="px-4 py-3">
            Name
        </td>
        {#if type !== "simple"}
            <td class="px-4 py-3">
                Games played
            </td>
            <td class="px-4 py-3">
                Winrate
            </td>
            <td class="px-4 py-3">
                Coins
            </td>
        {/if}
        {#if banned}
            <td class="px-4 py-3">
                Reason
            </td>
        {/if}
        {#if type !== "simple"}
            <td class="px-4 py-3">
                Join date
            </td>
            <td class="px-4 py-3">
                Actions
            </td>
        {/if}
        {#if type === "simple"}
            <!--<td class="px-4 py-3">
                Source
            </td>-->
            <td class="px-4 py-3">
                Product
            </td>
            <td class="px-4 py-3">
                Since
            </td>
            <td class="px-4 py-3">
                SteamId
            </td>
            <td class="px-4 py-3">
                Email
            </td>

        {/if}
    </tr>
    </thead>
    <tbody class=" divide-y-4 divide-background rounded-lg">
    <!--For each rank-->
    {#each users as user,i}
        <tr class="text-center" class:cursor-pointer={type !== "simple"}
            on:click={()=>{if(type !== "simple")user.isDetailsOpen = !user.isDetailsOpen}}>
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
            {#if type !== "simple"}
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
            {/if}
            {#if banned}
                <td class="px-2 py-2 overflow-x-auto text-start -pt-8" style="width: 10rem;"
                    class:text-base={user.reason?.length > 15} class:text-xs={user.reason?.length > 30}>
                    {user.reason}
                </td>
            {/if}
            {#if !banned && type !== "simple"}
                <td>
                    <p hidden>{user.date = new Date(user.joinDate)}</p>
                    {user.date?.getDate() < 10 ? "0" + user.date?.getDate() : user.date?.getDate()}
                    /{user.date?.getMonth() + 1 < 10 ? "0" + (user.date?.getMonth() + 1) : user.date?.getMonth() + 1}
                    /{user.date?.getFullYear()}
                </td>
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
            {:else if type !== "simple"}
                <td>
                    <p hidden>{user.date = new Date(user.joinDate)}</p>
                    {user.date?.getDate() < 10 ? "0" + user.date?.getDate() : user.date?.getDate()}
                    / {user.date?.getMonth() + 1 < 10 ? "0" + (user.date?.getMonth() + 1) : user.date?.getMonth() + 1}
                    / {user.date?.getFullYear()}
                </td>
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
            {#if type === "simple"}
                <!--<td class="px-4 py-3" class:text-legendary={user.source === "Shop"} class:text-green={user.source}>
                    {user.source}
                </td>-->
                <td class="px-4 py-3 text-primary">
                    {user.product}
                </td>
                <p hidden>{user.time = (Date.now() - user.date) / 1000}{user.days = Math.floor(user.time / 86400)}{user.hours = Math.floor(user.time / 3600 - user.days * 24)}</p>
                <td class="px-4 py-3 text-green" class:text-legendary={user.days>14} class:text-accent={user.days>7}>
                    {user.days} days, {user.hours} hours
                </td>
                <td class="px-4 py-3 text-xl cursor-pointer text-gray-400 hover:text-white"
                    on:click={()=>isVerifyingSteamId = {isDoing:true,steamId: user.steamId}}>
                    {user.steamId}
                </td>
                <td class="px-4 py-3">{user.email}</td>
            {/if}
        </tr>
        {#if user.isDetailsOpen}
            <tr class="w-full py-5 ">
                <td></td>
                <td class="w-full" colspan="3">
                    {#if user.solo?.logs.length !== 0}
                        <div class="w-full">
                            <h1 class="text-green text-4xl p-4">Quests History</h1>
                            {#each user.solo?.logs as quest, ii}
                                {#if ii < 5}
                                    <div class="p-2 pl-4">
                                        <p>Total earned via quests:<span class="text-primary">{user.solo.logs.reduce((a,b)=>a+b.reward)}</span></p>
                                        <h3 class="text-3xl text-primary">Quest {ii + 1}:</h3>
                                        <p class="text-xl">Type : {quest.type}</p>
                                        <p class="text-xl">Goal : {quest.name}</p>
                                        <p class="text-xl"
                                           class:text-legendary={Math.floor(quest.time / 60) < 1 && quest.time - Math.floor(quest.time / 60) * 60 < 30}
                                           class:text-accent={Math.floor(quest.time / 60) < 1}
                                           class:text-green={Math.floor(quest.time / 60) > 1}>
                                            Time : {Math.floor(quest.time / 60)}
                                            h {quest.time - Math.floor(quest.time / 60) * 60}m</p>
                                        <p class="text-xl">Reward: {quest.reward}</p>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {:else}
                        <h1 class="text-4xl p-4" class:text-primary={color==="red"}
                            class:text-legendary={color==="blue"}>No history</h1>
                    {/if}

                </td>
                <td class="w-full h-auto" colspan="3">
                    {#if user.lastGames.length !== 0}
                        <div class="w-full">
                            <h1 class="text-green text-4xl p-4">Match History</h1>
                            {#each user.lastGames as game, ii}
                                {#if ii < 5}
                                    <div class="p-2 pl-4">
                                        <a class="text-xl"
                                           href="/play/ffa/{game.id}?spectator=true">
                                            <h1 class="text-3xl hover:underline text-primary">
                                                Game {ii + 1}:</h1>
                                        </a>
                                        <p class="text-2xl">Games played:
                                            <d class="font-normal text-primary">{game.games}</d>
                                        </p>
                                        <p class="text-2xl">Wins:
                                            <d class:text-green={game.rank < 4}
                                               class:text-accent={game.wins < 7 && game.wins >= 4}
                                               class:text-legendary={game.wins >= 7}>{game.wins}</d>
                                        </p>
                                        <p class="text-2xl">Rank:
                                            <d class:text-green={game.rank > 2}
                                               class:text-legendary={game.rank <= 2}>{game.rank + 1}</d>
                                        </p>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {:else}
                        <h1 class="text-4xl p-4" class:text-primary={color==="red"}
                            class:text-legendary={color==="blue"}>No history</h1>
                    {/if}
                </td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
{#if isVerifyingSteamId.isDoing === true}
    <div class="fixed w-screenw-99 h-screen bg-black opacity-90 z-50 left-0 top-0"
         transition:fade|local={{duration:200}}></div>
    <div
        class="fixed content-center block -pl-4 z-50 bg-background left-1/3 top-1/4 rounded-lg border border-primary mx-auto px-14 py-8"
        transition:fade|local={{duration:200}}>
        <h2 class="text-4xl mt-10 text-primary">Verify steamId</h2>
        <input type="text" class="text-black px-3 py-1" placeholder="Enter steamID" on:keydown={isSteamIdValid}
               bind:value={isVerifyingSteamId.tempSteamId}>
        <button class="button button-brand mt-8 ml-5" style="background-color: #fc1870"
                on:click={()=>isVerifyingSteamId = {isDoing: false,steamId: null}}>
            Close
        </button>
        <p class:text-legendary={!isVerifyingSteamId.isValid}
           class:text-green={isVerifyingSteamId.isValid}>{isVerifyingSteamId.isValid ? "Valid" : "Invalid"}</p>
    </div>
{/if}
{#if isDoingAction}
    <div class="absolute w-screenw-99 h-screen bg-black opacity-90 z-50 left-0" style="top: {scrollY}px;"
         transition:fade|local={{duration:200}}></div>
    <div class="absolute block -pl-4 z-50 bg-background rounded-lg border border-primary mx-auto px-14 py-8"
         style="top: {scrollY + 100}px;" class:lg:left-screenw-38={action === "unban"}
         transition:fade|local={{duration:200}}>
        <h2 class="text-4xl mt-10 text-primary">
            Confirm {action}:
        </h2>

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