<script>
    import Quests from "../../components/Quests.svelte";

    const gameModes = [
        {
            name: "FFA",
            description: "Fight against <b>9</b> players!",
            goal:
                "Be the one who has the <b>most wins</b> out of <b>10 games</b> to win!",
            duration: "<b>30</b> - <b>50</b> minutes",
        },
        {
            name: "2vs2",
            description: "Fight agains't an other <b>team</b>!",
            goal:
                "Be the team that has the <b>most wins</b> out of <b>5 games</b> to win!",
            duration: "<b>20</b> - <b>30</b> minutes",
        },
    ];

    const quests = {
        dailyQuests: [
            {
                questName: "Do 10 Orb KOs",
                progress: 6,
                goal: 10,
                reward: 500,
            },
            {
                questName: "Do 20 KOs",
                progress: 12,
                goal: 20,
                reward: 3500,
            },
            {
                questName: "Do 10 KOs",
                progress: 6,
                goal: 10,
                reward: 2500,
            },
        ],

        weeklyQuests: [
            {
                questName: "Do 10 Orb KOs",
                progress: 6,
                goal: 10,
                reward: 500,
            },
            {
                questName: "Do 20 KOs",
                progress: 12,
                goal: 20,
                reward: 3500,
            },
            {
                questName: "Do 10 KOs",
                progress: 6,
                goal: 10,
                reward: 2500,
            },
        ],
        finished: {
            daily: [
                {
                    questName: "Do 5 Orbs KOs",
                    reward: 500,
                },
                {
                    questName: "Do 5 Axe KOs",
                    reward: 500,
                },
            ],
            weekly: [
                {
                    questName: "Do 5 Orbs KOs",
                    reward: 500,
                },
                {
                    questName: "Do 5 Axe KOs",
                    reward: 500,
                },
            ],
        },
        collected: {
            daily: [
                {
                    questName: "Do 5 Orbs KOs",
                },
                {
                    questName: "Do 5 Axe KOs",
                },
            ],
            weekly: [
                {
                    questName: "Do 5 Orbs KOs",
                },
                {
                    questName: "Do 5 Axe KOs",
                },
            ],
        },
    };
</script>

<style>
    p :global(b) {
        @apply text-primary font-normal;
    }

    .game-mode-card {
        width: 20rem;
        height: 33rem;
    }

    .game-mode-image {
        width: 100%;
        height: 100%;
        object-position: 18%;
    }

    .game-mode-card::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
            to bottom,
            rgba(23, 23, 26, 0.65) 0%,
            rgba(23, 23, 26, 0.83),
            rgba(23, 23, 26, 0.92) 75%,
            rgba(23, 23, 26, 0.97) 100%
        );
    }

    h3 {
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
    }
    .desc {
        font-size: 1.7rem;
    }
    .goal {
        color: #e2e2ea;
    }

    .duration {
        color: #c2c2c9;
    }
    .desc :global(b) {
        font-size: 1.95rem;
    }
    .goal :global(b) {
        @apply text-default;
    }
    .duration :global(b) {
        @apply text-lg;
    }
</style>

<svelte:head>
    <title>Play</title>
</svelte:head>
<div class="lg:block lg:pl-24 pt-8 lg:pt-10 h-full w-full">
    <div class="page-title text-center lg:text-left">
        <h1 class="text-6xl">Choose a game mode</h1>
    </div>
    <div
        class="flex flex-col items-center lg:items-start lg:flex-wrap
            lg:flex-row">
        <div
            class="game-mode-card-container lg:mb-10 lg:mr-15 mt-10 text-center
                flex flex-col items-center lg:flex-row lg:items-start">
            {#each gameModes as gameMode}
                <a
                    class="game-mode-card block relative shadow-card border
                        border-transparent hover:border-primary
                        hover:shadow-card-hover mb-10 lg:mb-0 lg:mr-15"
                    href="/play/{gameMode.name}">
                    <img
                        src="../assets/ModeBanners/{gameMode.name}.jpg"
                        alt={gameMode.name}
                        class="game-mode-image object-cover block" />
                    <div
                        class="game-mode-text-container absolute z-10 top-0
                            bottom-0 left-0 right-0">
                        <h3
                            class="absolute text-6xl top-24 left-0 right-0
                                text-shadow-link-hover">
                            {gameMode.name}
                        </h3>
                        <div class="stats absolute bottom-8 leading-5">
                            <p class="desc text-3xl">
                                {@html gameMode.description}
                            </p>
                            <p class="goal text-xl mt-8 px-10">
                                {@html gameMode.goal}
                            </p>
                            <p class="duration text-base mt-4">
                                {@html gameMode.duration}
                            </p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <div>
            <Quests data={quests} />
        </div>
    </div>
</div>
