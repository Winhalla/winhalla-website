<script>
    export let data;

    const calculateRarity = (reward) => {
        if (reward < 2000) return "primary";
        if (reward < 3000) return "epic";
        if (reward <= 4000) return "legendary";
    };

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
</script>

<style>
    .quest {
        border-radius: 10px;
        @apply flex justify-between px-7 py-6 my-4 relative overflow-hidden w-full;
    }

    .quest::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 60%;
        z-index: 20;
    }

    .progress-primary::before {
        @apply border-b-2 border-primary;
    }

    .progress-epic::before {
        @apply border-b-2 border-epic;
    }

    .progress-legendary::before {
        @apply border-b-2 border-legendary;
    }

    .collected::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        border-bottom: 0px solid;
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
        @apply absolute h-full
            top-0 bg-background flex items-center justify-center text-center;
    }

    .reward {
        color: #d321e4;
    }
</style>

<div class="container lg:flex mt-7 w-auto">
    <div class="daily-container ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8">
        <h2 class="text-6xl text-center lg:text-left">Daily Quests</h2>
        <div class="quests-container">
            {#if data.finished && data.finished.daily}
                <div class="pb-1">
                    {#each data.finished.daily as quest}
                        <button
                            class="card quest finished border-2 border-{calculateRarity(quest.reward)}">
                            <span>Click to collect</span>
                            <div class="progress-container">
                                <svg
                                    class="fill-current checkbox-active text-{calculateRarity(quest.reward)}"
                                    viewBox="0 0 27 24"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z" /></svg>
                                <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                    Click to collect
                                </p>
                            </div>

                            <p class="quest-goal line-through">
                                {quest.questName}
                            </p>
                        </button>
                    {/each}
                </div>
            {/if}

            {#if data.dailyQuests}
                <div>
                    {#each data.dailyQuests as quest}
                        <div
                            class="card quest progress-{calculateRarity(quest.reward)}">
                            <span>{quest.reward}$</span>
                            <div class="progress-container">
                                <svg
                                    class="fill-current w-4"
                                    viewBox="0 0 25 24"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" /></svg>
                                <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                    {quest.progress}/{quest.goal}
                                </p>
                            </div>

                            <p class="quest-goal">{quest.questName}</p>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if data.collected && data.collected.daily}
                <div class="pt-5">
                    {#each data.collected.daily as quest}
                        <div class="card quest text-disabled italic">
                            <div class="progress-container">
                                <p class="mr-6 lg:mr-12 text-lg">Collected</p>
                            </div>

                            <p class="quest-goal line-through">
                                {quest.questName}
                            </p>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div
        class="weekly-container ml-5 mr-5 mt-12 md:ml-10 md:mr-10 lg:mr-0
            lg:mt-0">
        <h2 class="text-6xl text-center lg:text-left">Weekly Quests</h2>
        <div class="quests-container">
            {#if data.finished && data.finished.weekly}
                <div class="pb-1">
                    {#each data.finished.weekly as quest}
                        <button
                            class="card quest finished border-2 border-{calculateRarity(quest.reward)}">
                            <span>Click to collect</span>
                            <div class="progress-container">
                                <svg
                                    class="fill-current checkbox-active text-{calculateRarity(quest.reward)}"
                                    viewBox="0 0 27 24"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z" /></svg>
                                <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                    Click to collect
                                </p>
                            </div>

                            <p class="quest-goal line-through">
                                {quest.questName}
                            </p>
                        </button>
                    {/each}
                </div>
            {/if}

            {#if data.weeklyQuests}
                <div>
                    {#each data.weeklyQuests as quest}
                        <div
                            class="card quest progress-{calculateRarity(quest.reward)}">
                            <span>{quest.reward}$</span>
                            <div class="progress-container">
                                <svg
                                    class="fill-current w-4"
                                    viewBox="0 0 25 24"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" /></svg>
                                <p class="ml-2 mr-6 lg:mr-12 text-lg">
                                    {quest.progress}/{quest.goal}
                                </p>
                            </div>

                            <p class="quest-goal">{quest.questName}</p>
                        </div>
                    {/each}
                </div>
            {/if}
            {#if data.collected && data.collected.weekly}
                <div class="pt-5">
                    {#each data.collected.weekly as quest}
                        <div class="card quest text-disabled italic">
                            <div class="progress-container">
                                <p class="mr-6 lg:mr-12 text-lg">Collected</p>
                            </div>

                            <p class="quest-goal line-through">
                                {quest.questName}
                            </p>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
