<script context="module">
    import Quests from "../../components/Quests.svelte";
    import { callApi } from "../../utils/api";
    import GameModeCard from "../../components/GameModeCards.svelte";

    let gameModes = [
        {
            name: "ffa",
            description: "Fight against <b>9</b> players!",
            goal:
                "Be the one who has the <b>most wins</b> out of <b>10 games</b>!",
            duration: "<b>30</b> - <b>50</b> minutes",
            available: false
        },
        {
            name: "2vs2",
            description: "Fight against an other <b>team</b>!",
            goal:
                "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
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

    export async function preload() {
        try {
            //Check wich game mode is enabled in config, and then adapt the property available of gameModes object.
            let gameModesStatus = await callApi("get", "/status");
            if (gameModesStatus) {
                gameModesStatus = gameModesStatus.find(
                    s => s.name === "GAMEMODES STATUS"
                );
                gameModesStatus = gameModesStatus.value;

                Object.keys(gameModesStatus).forEach(gameModeName => {
                    const gameMode = gameModes.find(
                        g => g.name === gameModeName.toLowerCase()
                    );
                    gameMode.available = gameModesStatus[gameModeName];
                    gameModes = gameModes;
                });
            }

            //Load quests for user
            let quests = await callApi("get", "/getSolo");
            quests = quests.solo;

            if (!quests.lastDaily || !quests.lastWeekly) {
                quests = await callApi("get", "/solo");
                quests = quests.solo;
            }
            return { quests };
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                    return { error: "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)" };
                } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                    return { error: "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)" };
                }
            }
        }
    }
</script>

<script>
    export let quests;
    export let error;
</script>

<svelte:head>
    <title>Play - Winhalla, Play Brawlhalla. Earn rewards.</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards. | Legit & Free In-Game objects!
        | Choose your game mode here | Winhalla play page " />

    <link rel="canonical" href="https://winhalla.appspot.com/play" />
</svelte:head>
<div class="lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full">
    <div class="text-center lg:text-left">
        <h1 class="text-6xl leading-snug lg:leading-normal">
            Choose a game mode
        </h1>
    </div>

    <div
        class="flex flex-col items-center lg:items-start lg:flex-wrap
        lg:flex-row">
        <div
            class="game-mode-card-container lg:mb-10 lg:mr-15 mt-10 text-center
            flex flex-col items-center lg:flex-row lg:items-start">
            <GameModeCard {gameModes} />
        </div>
        <div>
            {#if quests}
                <Quests data={quests} />
            {:else if error}
                {error}
            {:else}
                Here are the quests
            {/if}
        </div>
    </div>
</div>
