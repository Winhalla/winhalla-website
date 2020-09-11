<script>
    export let data;
</script>

<style>
    @keyframes showAmount {
        100% {
            left: 0;
        }
    }

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
        @apply border-b-2 border-primary;
    }

    .finished::before {
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
        transform: translateX(-10%);
    }

    span {
        transform: translateX(-110%);
        transition: transform 0.3s ease-in-out;
        width: 100%;
        @apply absolute h-full
            top-0 bg-background flex items-center justify-center text-center;
    }

    .reward {
        color: #c745fa;
    }
</style>

<div class="container flex ml-5 mt-7">
    <div class="daily-container mr-12">
        <h2 class="text-6xl">Daily Quests</h2>
        <div class="quests-container">
            {#each data.dailyQuests as quest}
                {#if quest.isFinished}
                    <button class="card quest finished border border-green">
                        <span><p class="">Click to collect</p></span>
                        <div class="progress-container">
                            <svg
                                class="fill-current w-4 text-green"
                                viewBox="0 0 25 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" /></svg>
                            <p class="ml-2 mr-12 text-lg">Click to collect</p>
                        </div>

                        <p class="quest-goal line-through">{quest.goal}</p>
                    </button>
                {:else}
                    <div class="card quest">
                        <div class="progress-container">
                            <svg
                                class="fill-current w-4"
                                viewBox="0 0 25 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" /></svg>
                            <p class="ml-2 mr-12 text-lg">
                                {quest.progressValue}/{quest.endValue}
                            </p>
                        </div>

                        <p class="quest-goal">{quest.goal}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="weekly-container">
        <h2 class="text-6xl">Weekly Quests</h2>
        <div class="quests-container weekly">
            {#each data.weeklyQuests as quest}
                {#if quest.isFinished}
                    <button class="card quest finished border border-green">
                        <span><p class="reward">{quest.reward}$</p></span>
                        <div class="progress-container">
                            <svg
                                class="fill-current text-green checkbox-active"
                                viewBox="0 0 27 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z" /></svg>
                            <p class="ml-2 mr-12 text-lg">Collect</p>
                        </div>

                        <p class="quest-goal line-through">{quest.goal}</p>
                    </button>
                {:else}
                    <div class="card quest">
                        <div class="progress-container">
                            <svg
                                class="fill-current w-4"
                                viewBox="0 0 25 24"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" /></svg>
                            <p class="ml-2 mr-12 text-lg">
                                {quest.progressValue}/{quest.endValue}
                            </p>
                        </div>

                        <p class="quest-goal">{quest.goal}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
