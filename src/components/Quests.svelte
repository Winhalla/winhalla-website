<script>
    import { callApi } from "../utils/api";
    import RefreshButton from "./RefreshButton.svelte";
    import { counter } from "./store";
    let countDown = [{}, {}];
    export let data;
    const calculateRarity = (reward, daily) => {
        if (daily) {
            if (reward == 100) return "primary";
            if (reward == 200) return "epic";
            if (reward == 400) return "legendary";
        } else {
            if (reward == 300) return "primary";
            if (reward == 500) return "epic";
            if (reward == 1000) return "legendary";
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
            seconds = Math.floor(timer % 60);
            minutes = Math.floor((timer / 60) % 60);
            hours = Math.floor(timer / (60 * 60));
            days = Math.floor(hours / 24);

            hours = hours - days * 24;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

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

            if (--timer < 0) {
                timer = duration;
            }
        }
        calculateTime();
        setInterval(calculateTime, 1000);
    }
    for (let i = 0; i < 2; i++) {
        let d = new Date(i === 0 ? data.lastDaily : data.lastWeekly);
        const endsIn = -(
            (new Date().getTime() -
                new Date(
                    d.setHours(d.getHours() + i === 0 ? 24 : 168)
                ).getTime()) /
            1000
        );
        if (endsIn < 1) {
            countDown[i] = "";
        } else {
            startTimer(endsIn, i);
        }
    }

    function calculateOrder() {
        //Reorder quests by rarety
        if (data.dailyQuests) {
            data.dailyQuests.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (data.finished && data.finished.daily) {
            data.finished.daily.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (data.weeklyQuests) {
            data.weeklyQuests.sort((b, a) => {
                return a.reward - b.reward;
            });
        }

        if (data.finished && data.finished.weekly) {
            data.finished.weekly.sort((b, a) => {
                return a.reward - b.reward;
            });
        }
    }

    data = data;
    calculateOrder();
    let isRefreshingQuests = false;
    const handleRefresh = async () => {
        isRefreshingQuests = true;

        const refreshedData = await callApi("get", "solo");
        console.log(refreshedData);
        calculateOrder();
        data = refreshedData.solo;

        isRefreshingQuests = false;
    };

    async function collect(type, index) {
        await callApi("post", `solo/collect?type=${type}&index=${index}`);
        counter.set({ refresh: true });
        data.collected[type].push(...data.finished[type].splice(index, 1));
        data = data;
    }
</script>

<style>
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
</style>

<!--TODO: Afficher reward des quêtes sur mobile-->
<div>
    <div class="container lg:flex mt-7 w-auto">
        <div
            class="daily-container ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8">
            <div class="lg:flex">
                <h2 class="text-6xl text-center lg:text-left">Daily Quests</h2>
                <p
                    class="text-{countDown[0].speed} ml-5 text-3xl leading-none
                    lg:pt-6">
                    {countDown[0].timer}
                </p>
            </div>
            <div class="quests-container">
                {#if data.finished && data.finished.daily}
                    <div class="pb-1 ">
                        {#each data.finished.daily as quest, i}
                            <button
                                on:click={() => collect('daily', i)}
                                class="card quest finished border-2 border-{calculateRarity(quest.reward, true)}
                                max-w-sm mx-auto block">
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
                            <div class="relative card quest max-w-sm mx-auto">
                                <div class="quest-infos">
                                    <span
                                        class="text-{calculateRarity(quest.reward, true)}">
                                        {quest.reward}$
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
                                    style="width: {calculateProgressBarWidth(quest.progress, quest.goal)}%" />
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if data.collected && data.collected.daily}
                    <div class="pt-5">
                        {#each data.collected.daily as quest}
                            <div
                                class="card quest text-disabled italic max-w-sm
                                mx-auto">
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
            class="weekly-container ml-5 mr-5 mt-12 md:ml-10 md:mr-10 lg:mr-0
            lg:mt-0">
            <div class="lg:flex">
                <h2 class="text-6xl text-center lg:text-left">Weekly Quests</h2>
                <p
                    class="text-{countDown[1].speed} ml-5 text-3xl leading-none
                    lg:pt-6">
                    {countDown[1].timer}
                </p>
            </div>
            <div class="quests-container">
                {#if data.finished && data.finished.weekly}
                    <div class="pb-1">
                        {#each data.finished.weekly as quest, i}
                            <button
                                on:click={() => collect('weekly', i)}
                                class="card quest finished border-2 border-{calculateRarity(quest.reward, false)}
                                max-w-sm mx-auto">
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
                            <div class="relative card quest max-w-sm mx-auto">
                                <div class="quest-infos">
                                    <span
                                        class="text-{calculateRarity(quest.reward, false)}">
                                        {quest.reward}$
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
                                    style="width: {calculateProgressBarWidth(quest.progress, quest.goal)}%" />
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if data.collected && data.collected.weekly}
                    <div class="pt-5">
                        {#each data.collected.weekly as quest}
                            <div
                                class="card quest text-disabled italic max-w-sm
                                mx-auto">
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
            <p class="text-lg ml-3 lg:ml-2 tip-text text-light">
                Daily and Weekly quests data may take up to 30 minutes to
                refresh
            </p>
        </div>
    </div>
</div>
