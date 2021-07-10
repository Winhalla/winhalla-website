<script>
    import { callApi } from "../utils/api";
    import RefreshButton from "./RefreshButton.svelte";
    import { counter } from "./store";
    import { io } from "socket.io-client";
    import { apiUrl } from "../utils/config";
    import PlayAdButton from "./PlayAdButton.svelte";
    import CoinIcon from "./CoinIcon.svelte";
    import { fade, fly } from "svelte/transition";
    import { serialize } from "cookie";
    import {getCookie} from "../utils/getCookie";

    let countDown = [{}, {}];
    export let data;
    console.log(data);
    let error;
    let socket;
    let adError;
    let info;
    let waitingAd;
    let waitingAdAccept = false;
    let interval;
    let questsAlertAlreadyShown;
    let isAlertNoRefreshOpen;

    const calculateRarity = (reward, daily) => {
        if (daily) {
            if (reward === 10) return "primary";
            if (reward === 20) return "epic";
            if (reward === 30) return "legendary";
        } else {
            if (reward === 50) return "primary";
            if (reward === 100) return "epic";
            if (reward === 200) return "legendary";
        }
    };

    const calculateProgressBarWidth = (progress, goal) => {
        const calculatedProgress = (progress / goal) * 100;
        if (calculatedProgress < 0) {
            return 2;
        } else {
            return calculatedProgress;
        }
    };

    function startTimer(duration, i) {
        let timer = duration,
            days,
            hours,
            minutes,
            seconds;

        function calculateTime() {
            if (--timer < 0) {
                countDown.finished = true;
                countDown[i].timer = "Refresh for new quests";
                return;
            }
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));
            days = Math.floor(hours / 24);

            hours = hours - days * 24;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            let errDetected;
            let vars = [hours, minutes, days, seconds];
            for (let i = 0; i < 4; i++) {
                if (vars[i] == undefined || isNaN(vars[i])) errDetected = true;
            }
            if (errDetected) {
                countDown[i].timer = "Refreshing...";
                return countDown[i].speed = "legendary";
            }
            countDown[i].timer =
                days != 0
                    ? days + ":" + hours + ":" + minutes + ":" + seconds
                    : hours + ":" + minutes + ":" + seconds;
            countDown[i].speed =
                hours >= 6 || days > 0
                    ? "primary"
                    : hours >= 1
                    ? "accent"
                    : "legendary";
        }

        calculateTime();
        return setInterval(calculateTime, 1000);
    }

    let countDownIds = [];

    function initTimers() {
        countDownIds.forEach(e => {
            clearInterval(e);
        });
        try {
            for (let i = 0; i < 2; i++) {
                let d = i === 0 ? data.lastDaily : data.lastWeekly;
                const endsIn = ((i === 0 ? d + 3600000 * 24 : d + 3600000 * 168) - Date.now()) / 1000;
                if (endsIn < 1) {
                    countDown[i] = "";
                } else {
                    countDownIds.push(startTimer(endsIn, i));
                }
            }
        } catch (e) {
            error = e;
        }
    }

    initTimers();

    function calculateOrder(object) {
        //Reorder quests by rarety
        if (object.dailyQuests) {
            object.dailyQuests.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (object.finished && object.finished.daily) {
            object.finished.daily.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (object.weeklyQuests) {
            object.weeklyQuests.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (object.finished && object.finished.weekly) {
            object.finished.weekly.sort((b, a) => {
                return a.reward - b.reward;
            });
        }
    }

    data = data;
    calculateOrder(data);

    let isRefreshingQuests = false;

    async function handleRefresh() {
        try {
            let lastData = JSON.stringify(data);
            isRefreshingQuests = true;
            const refreshedData = await callApi("get", "solo");
            console.log(refreshedData);
            calculateOrder(refreshedData.solo);
            data = refreshedData.solo;

            let questsAlertCookie = getCookie("questsAlertState");
            if (lastData === JSON.stringify(data) && questsAlertCookie !== "disabled" && !questsAlertAlreadyShown) {
                isAlertNoRefreshOpen = true;
                questsAlertAlreadyShown = true;
            }

            initTimers();
            isRefreshingQuests = false;
        } catch (e) {
            isRefreshingQuests = false;
        }
    };

    function denyAd() {
        collect(waitingAd.type, waitingAd.index, false);
        waitingAd = undefined;
        waitingAdAccept = false;
    }

    async function collect(type, id, possibleAd) {
        if (possibleAd) {
            // if (!socket) socket = io(apiUrl);
            // waitingAdAccept = true;
            // waitingAd = { type, index: id };
            //* to remove to reactivate ads
            collect(type, id, false); //*
            //*
        } else {
            await callApi("post", `solo/collect?type=${type}&id=${id}`);
            waitingAd = undefined;
            waitingAdAccept = undefined;
            counter.set({ "refresh": true });
            data.collected[type].push(...data.finished[type].splice(data.finished[type].findIndex(e => e.id === id), 1));
            data = data;
        }
    }

    function deactivateAlert() {
        isAlertNoRefreshOpen = false;
        document.cookie = serialize("questsAlertState", "disabled", {
            maxAge: 15552000,
            sameSite: "lax",
            path: "/"
        });

        isAlertNoRefreshOpen = false;
    }
</script>

<style>
    b {
        @apply font-normal text-primary;
    }

    .quest {
        border-radius: 10px;
        @apply relative overflow-hidden w-full my-4;
    }

    .quest-infos {
        @apply flex justify-between px-7 py-6;
    }

    .progress-container {
        @apply flex items-center;
    }

    svg {
        margin-bottom: 0.15rem;
    }

    .checkbox-active {
        width: 1.1rem;
    }

    .quest:hover span {
        left: 0;
    }

    span {
        left: -100%;
        transition: left 0.28s ease-in-out;
        width: 100%;
        @apply absolute h-full top-0 bg-background flex items-center justify-center text-center;
    }

    .tip-text {
        padding-top: 0.15rem;
    }

    .text-light {
        color: #e2e2ea;
    }

    .button-alternative {
        display: inline-block;
        padding: calc(0.5rem - 1px) calc(2.25rem - 1px);
        border-radius: 0.125rem;
        border-width: 1px;
        border-color: #3d72e4;
        font-size: 1.25rem;
    }
</style>

<!--TODO: Afficher reward des quêtes sur mobile-->
<svelte:head>
    <!--Video ads-->
    {#if waitingAd}
        <script async src="https://cdn.stat-rock.com/player.js"></script>
    {/if}
</svelte:head>

<div>
    {#if waitingAdAccept && socket }
        <div
            class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
            style="z-index: 100"
            in:fade={{duration: 200}}
            out:fade={{duration: 350}}>
            <div
                class="mx-5 my-1 md:mx-0  rounded-lg   px-8 py-8 md:p-12 pb-8  z-30 border-primary border-2 bg-background text-center    max-w-xl   overflow-y-scroll md:overflow-y-auto"
                transition:fly={{ y: 300, duration: 350 }}>
                <h2 class=" text-6xl ">MULTIPLY YOUR REWARDS</h2>
                <p class="mt-8  mx-1    text-3xl">Want to obtain a <b>x2 boost</b> on the
                    <b>coins</b>
                    you
                    will
                    <b>earn</b> on this quest?</p>
                <p class="text-2xl mt-3 text-mid-light italic">Watch a short video by clicking the button below!</p>

                <div class="mt-6 md:mt-8  md:flex justify-center">
                    <PlayAdButton socket={socket} bind:data={data} bind:adError={adError}
                                  bind:info={info} collect={collect} goal="earnMoreQuests" color="green"
                                  bind:waitingAd={waitingAd} bind:waitingAdAccept={waitingAdAccept} />
                    <button on:click={()=>denyAd()}
                            class="w-38 mt-4 md:mt-0 md:ml-4    button button-brand-alternative ">No
                        thanks
                    </button>
                </div>
            </div>
        </div>
    {/if}
    {#if error}
        <p class="text-legendary w-full">An error has been detected by our fellow erroR0B0T, quests might appear
            weirdly. </p>
        <p class="text-xl" style="color: #666666"><b class="font-normal" style="color: #aaaaaa">Details:</b> {error}</p>
    {/if}
    <div class="container md:flex mt-7 md:mt-20 lg:mt-7 w-auto">
        <div
            class="ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8">
            <div class="">
                <h2 class="text-6xl text-center lg:text-left">Daily Quests</h2>
                <p
                    class="text-{countDown[0].speed} text-center lg:text-left text-3xl leading-none" class:text-xl={countDown[0].finished}>
                    {#if countDown[0].timer} {countDown[0].timer} {/if}
                </p>
            </div>
            <div class="quests-container mt-1">
                {#if data.finished && data.finished.daily}
                    <div class="pb-1 ">
                        {#each data.finished.daily as quest, i}
                            <button
                                on:click={() => collect('daily', quest.id, true)}
                                class="card quest finished border-2 border-{calculateRarity(quest.reward, true)}
                                max-w-sm mx-auto lg:mx-0 block">
                                <div class="quest-infos">
                                    <span>Click to collect</span>
                                    <div class="progress-container">
                                        <svg
                                            class="fill-current checkbox-active
                                            text-{calculateRarity(quest.reward, true)}"
                                            viewBox="0 0 27 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                1.807-1.807 5.422 5.422
                                                13.68-13.68 1.811 1.803-15.491
                                                15.491z" />
                                        </svg>
                                        <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                            Click to collect
                                        </p>
                                    </div>

                                    <p class="line-through">{quest.name}</p>
                                </div>
                            </button>
                        {/each}
                    </div>
                {/if}

                {#if data.dailyQuests}
                    <div>
                        {#each data.dailyQuests as quest}
                            <div class="relative card quest max-w-sm mx-auto lg:mx-0">
                                <div class="quest-infos">
                                    <span
                                        class="text-3xl text-{calculateRarity(quest.reward, true)}">
                                        {quest.reward}
                                        <div class="w-9 ml-2 mt-1"
                                             style="margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem">
                                            <CoinIcon />
                                        </div>
                                    </span>
                                    <div class="progress-container">
                                        <svg
                                            class="fill-current w-4 text-{calculateRarity(quest.reward, true)}"
                                            viewBox="0 0 25 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" />
                                        </svg>
                                        <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                            {quest.progress}/{quest.goal}
                                        </p>
                                    </div>
                                    <p class="">{quest.name}</p>
                                </div>
                                <div
                                    class="absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, true)}"
                                    style="width:{calculateProgressBarWidth(quest.progress, quest.goal)}%"></div>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if data.collected && data.collected.daily}
                    <div class="pt-5">
                        {#each data.collected.daily as quest}
                            <div
                                class="card quest text-disabled italic max-w-sm
                                mx-auto lg:mx-0">
                                <div class="quest-infos">
                                    <div class="progress-container">
                                        <p class="mr-6 lg:mr-12 text-lg">
                                            Collected
                                        </p>
                                    </div>

                                    <p class="quest-goal line-through">
                                        {quest.name}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div
            class="ml-5 mr-5 mt-12 md:ml-5 md:mr-0
            md:mt-0">
            <div class="">
                <h2 class="text-6xl text-center lg:text-left">Weekly Quests</h2>
                <p
                    class="text-{countDown[1].speed} text-center lg:text-left text-3xl leading-none" class:text-xl={countDown[1].finished}>
                    {#if countDown[1].timer} {countDown[1].timer} {/if}
                </p>
            </div>
            <div class="quests-container mt-1">
                {#if data.finished && data.finished.weekly}
                    <div class="pb-1">
                        {#each data.finished.weekly as quest, i}
                            <button
                                on:click={() => collect('weekly', quest.id, true)}
                                class="card quest finished border-2 border-{calculateRarity(quest.reward, false)}
                                max-w-sm mx-auto lg:mx-0">
                                <div class="quest-infos">
                                    <span>Click to collect</span>
                                    <div class="progress-container">
                                        <svg
                                            class="fill-current checkbox-active
                                            text-{calculateRarity(quest.reward, false)}"
                                            viewBox="0 0 27 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                1.807-1.807 5.422 5.422
                                                13.68-13.68 1.811 1.803-15.491
                                                15.491z" />
                                        </svg>
                                        <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                            Click to collect
                                        </p>
                                    </div>

                                    <p class="quest-goal line-through">
                                        {quest.name}
                                    </p>
                                </div>
                            </button>
                        {/each}
                    </div>
                {/if}

                {#if data.weeklyQuests}
                    <div>
                        {#each data.weeklyQuests as quest}
                            <div class="relative card quest max-w-sm mx-auto lg:mx-0">
                                <div class="quest-infos">
                                    <span class="text-3xl text-{calculateRarity(quest.reward, false)}">
                                        {quest.reward}
                                        <div class="w-9 ml-2 mt-1"
                                             style="margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem">
                                            <CoinIcon />
                                        </div>
                                    </span>
                                    <div class="progress-container">
                                        <svg
                                            class="fill-current w-4 text-{calculateRarity(quest.reward, false)}"
                                            viewBox="0 0 25 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" />
                                        </svg>
                                        <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                            {quest.progress}/{quest.goal}
                                        </p>
                                    </div>
                                    <p class="quest-goal">{quest.name}</p>
                                </div>
                                <div
                                    class="absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, false)}"
                                    style="width: {calculateProgressBarWidth(quest.progress, quest.goal)}%"></div>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if data.collected && data.collected.weekly}
                    <div class="pt-5">
                        {#each data.collected.weekly as quest}
                            <div
                                class="card quest text-disabled italic max-w-sm
                                mx-auto lg:mx-0">
                                <div class="quest-infos">
                                    <div class="progress-container">
                                        <p class="mr-6 lg:mr-12 text-lg">
                                            Collected
                                        </p>
                                    </div>

                                    <p class="quest-goal line-through">
                                        {quest.name}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div
        class="flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4
        ml-5 lg:ml-0">
        <RefreshButton
            on:click={() => handleRefresh()}
            isRefreshing={isRefreshingQuests}
            refreshMessage={'Refresh quests data'} />
        <div class="flex lg:ml-8 items-center mt-4 lg:mt-0">
            <!--<div class="flex items-center ">
                <div class="py-2 px-2 rounded-full bg-primary">
                    <svg
                        class="w-3 h-3 fill-current"
                        viewBox="0 0 17 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z"/>
                    </svg>
                </div>
            </div>-->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-9 text-primary"
                viewBox="0 0 576 512">
                <path
                    fill="currentColor"
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94
                    512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423
                    23.985c18.467-32.009 64.72-31.951 83.154 0l239.94
                    416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46
                    46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418
                    136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0
                    11.635-4.982
                    11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884
                    0-12.356 5.78-11.981 12.654z" />
            </svg>
            <p class="text-lg ml-3 lg:ml-2 tip-text text-light  max-w-lg">
                If the quests doesn't refresh, don't worry, come back later to collect them: Brawlhalla's API takes time
                to refresh
            </p>
        </div>
    </div>
</div>
{#if isAlertNoRefreshOpen}
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
         style="z-index: 100"
         in:fade={{duration: 200}}
         out:fade={{duration: 350}}>

        <div
            class="max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-auto md:overflow-y-auto"
            style="max-height: 95vh;"
            transition:fly={{ y: 300, duration: 350 }}>
            <h2 class="text-4xl md:text-5xl">The quests data hasn't been <b style="color: #fc1870">updated</b>
            </h2>

            <p class="mt-1 text-green    text-4xl">Why ?</p>
            <div class="ml-6 my-6 text-mid-light text-2xl">
                <p>- The quests takes on average <u>3 hours</u> to update, but it can be <u>longer</u></p>
                <p class="mt-3 font-normal">- Don't worry if they don't refresh, we <b style="color: #3d72e4">automatically
                    collect them</b> just before the <b style="color: #3d72e4">timer expires</b>: Come tomorrow to collect them!</p>
            </div>
            <div class="mt-8">
                <button class="button button-brand w-full md:w-auto" on:click={() =>isAlertNoRefreshOpen = false}>Got
                    it!
                </button>
                <button class="button button-brand-alternative /hover:underline md:ml-4 w-full md:w-auto mt-4 md:mt-0"
                        on:click={deactivateAlert}>Don't show this again
                </button>
            </div>
        </div>
    </div>
{/if}