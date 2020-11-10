<script>
    import Quests from "../../components/Quests.svelte";
    import { onMount } from "svelte";
    import { callApi } from "../../utils/api";
    import GameModeCard from "../../components/GameModeCard.svelte";

    let gameModes = [
        {
            name: "ffa",
            description: "Fight against <b>9</b> players!",
            goal:
                "Be the one who has the <b>most wins</b> out of <b>10 games</b> to win!",
            duration: "<b>30</b> - <b>50</b> minutes",
            available: false
        },
        {
            name: "2vs2",
            description: "Fight agains't an other <b>team</b>!",
            goal:
                "Be the team that has the <b>most wins</b> out of <b>5 games</b> to win!",
            duration: "<b>20</b> - <b>30</b> minutes",
            available: false
        }
    ];

    /*const quests = {
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
    };*/

    let quests;
    onMount(async () => {
        //Check wich game mode is enabled in config, and then adapt the property available of gameModes object.
        let gameModesStatus = await callApi("get", "/status");
        if (gameModesStatus) {
            gameModesStatus = gameModesStatus.find(s => s.name === "GAMEMODES STATUS");
            gameModesStatus = gameModesStatus.value;

            Object.keys(gameModesStatus).forEach(gameModeName => {
                const gameMode = gameModes.find(g => g.name === gameModeName.toLowerCase());
                gameMode.available = gameModesStatus[gameModeName];
                gameModes = gameModes;
            });
        }

        //Load quests for user
        quests = await callApi("get", "/getSolo");
        quests = quests.solo;

        if (!quests.lastDaily || !quests.lastWeekly) {
            quests = await callApi("get", "/solo");
            quests = quests.solo;
        }
    });

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
        @apply z-0;
    }

    .locked-gradient::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
                to bottom,
                rgba(23, 23, 26, 0.75) 0%,
                rgba(23, 23, 26, 0.77),
                rgba(23, 23, 26, 0.78) 75%,
                rgba(23, 23, 26, 0.80) 100%
        );
        @apply z-20;
    }

    .lock {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply z-40;
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
    <title>Play | Winhalla</title>
</svelte:head>
<div class="lg:block lg:pl-24 pt-8 lg:pt-12 h-full w-full">
    <div class="text-center lg:text-left">
        <h1 class="text-6xl">Choose a game mode</h1>
    </div>

    <div
            class="flex flex-col items-center lg:items-start lg:flex-wrap
            lg:flex-row">
        <div
                class="game-mode-card-container lg:mb-10 lg:mr-15 mt-10 text-center
                flex flex-col items-center lg:flex-row lg:items-start">

            <GameModeCard gameModes={gameModes}/>
        </div>
        <div>
            {#if quests}
                <Quests data={quests}/>
            {/if}
        </div>
    </div>
</div>
