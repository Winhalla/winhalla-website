<script>
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import cookie from "cookie";
    let isRegisterPopupOpen = false;
    let email;
    let valid = null;
    let info;
    onMount(async () => {
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.get("src")) {
            document.cookie = cookie.serialize("source", urlParams.get("src"), {
                maxAge: 15552000,
                sameSite: "lax",
                path: "/"
            });
        } else if (urlParams.get("utm_source")) {
            document.cookie = cookie.serialize("source", urlParams.get("utm_source"), {
                maxAge: 15552000,
                sameSite: "lax",
                path: "/"
            });
        }
    });
    function toggleRegisterPopup() {
        isRegisterPopupOpen = !isRegisterPopupOpen;
    }
    function toggleFAQ(entryId) {
        faq[entryId].opened = !faq[entryId].opened;
        // if(faq[entryId].opened === true) gtagEvent("FAQopened",{question:faq[entryId].question})
    }
    const faq = [
        {
            question: "How can you give us some <u>paid items</u> for <u>free</u>?",
            answer: "In life, nothing is free. We use <u>ads revenues</u> to buy the items.",
            opened: false
        },
        {
            question: "How do you get my <u>Brawlhalla stats</u>?",
            answer: "We use the official <u>Brawlhalla API</u> to get your stats.",
            opened: false
        },
        {
            question: "<u>How long</u> does it take to get a Brawlhalla Battle Pass? (10$)",
            answer: "It will take approximately <u>4 to 8 weeks</u> if used regularly. This value might change depending on the time spent on Brawlhalla and Winhalla.",
            opened: false
        },
        {
            question: "Why data refreshing takes so long?",
            answer: "The Brawlhalla API has a <u>long refreshing rate</u>. Don't worry, come back later and it will be up to date!",
            opened: false
        }
    ];

    const screens = [
        {
            file: "/assets/screens/screen1.png",
            active: true,
            previous: false,
        },
        {
            file: "/assets/screens/screen2.png",
            active: false,
            previous: false,
        },
        {
            file: "/assets/screens/screen3.png",
            active: false,
            previous: false,
        },
        {
            file: "/assets/screens/screen4.png",
            active: false,
            previous: true,
        }
    ]

    function handleSwitch() {
        let activeScreen = screens.findIndex(s => s.active === true);
        if (activeScreen === screens.length - 1) {
            screens[activeScreen].active = false;
            screens[activeScreen - 1].previous = false;
            screens[activeScreen].previous = true;
            screens[0].active = true;
        } else {
            screens[activeScreen].active = false;
            screens[activeScreen].previous = true;
            screens[activeScreen + 1].active = true;
            if (activeScreen === 0) {
                screens[screens.length - 1].previous = false;
            } else {
                screens[activeScreen - 1].previous = false;
            }
        }
    }

    setInterval(handleSwitch, 4000);
</script>

<style>
    @keyframes arrow {
        0% {
            transform: translateY(0rem);
        }
        100% {
            transform: translateY(0.55rem);
        }
    }
    .arrow-svg {
        animation: arrow 0.8s infinite alternate ease-in-out;
    }
    .cards {
        height: calc(100% + 5rem);
    }
    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }
    .button2 {
        display: inline-block;
        border-radius: 0.25rem;
        font-size: 1.25rem;
        background-color: #3d72e4;
    }

    @keyframes up-transition {
        0% {
            bottom: 0;
        }

        100% {
            bottom: 100%;
        }
    }

    .up-transition {
        animation: up-transition 0.8s ease-in-out;
    }

    @keyframes active-transition {
        0% {
            bottom: -100%;
        }

        100% {
            bottom: 0;
        }
    }

    .active-transition {
        animation: active-transition 0.8s ease-in-out;
    }

</style>

<svelte:head>
    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>
    <meta
            name="description"
            content="Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,
        Mammoth Coins, Season Packs and more! | Winhalla home page" />

    <link rel="canonical" href="https://winhalla.app" />
</svelte:head>
<div class="pb-8 mt-0 lg:px-0">
    <div style="height:94vh;font-family: 'Roboto condensed', sans-serif; font-weight:700" class="lg:flex lg:justify-center  relative">
        <div style="color: rgba(253,253,253,0.80)" class="mt-30 lg:mt-64    px-8 lg:px-0">
            <div>
                <p class="text-5xl lg:text-6.25xl">
                    Play <span class="text-primary">Brawlhalla</span>,
                </p>
                <p class="text-5xl lg:text-6.25xl mt-2 lg:mt-4">
                    Earn <span class="text-primary">Rewards</span>.
                </p>
                <p class="text-4xl lg:text-5xl mt-6 lg:mt-10  text-gray">
                    As simple as it sounds.
                </p>
            </div>
            <div class="hidden lg:flex mt-10 lg:mt-20">
                <a href="/ios">
                    <img src="/assets/app-store.png" alt="app store link" class="w-40 lg:w-55 mr-8">
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXxOb6XI5xKh4NDeicsSUWbj1W4mA5YWFk70_39ssNxbAIUQ/viewform?usp=pp_url&entry.879447017=">
                    <img src="/assets/google-play.png" alt="google play link" class="w-40 lg:w-55 mr-8">
                </a>
            </div>
        </div>
        <div class="h-11 lg:h-0 lg:w-1/3"></div>
        <div class="lg:hidden">
            <img src="/assets/screens/screen1.png" alt="screen 1" class="w-full -ml-9" style="width: 150%">
        </div>
        <div class="max-h-full overflow-hidden hidden lg:block" style="z-index: -1">
            {#if screens}
                {#each screens as screen}
                    {#if screen.previous}
                        <img src="{screen.file}" alt="screenshot" class="up-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96" style="max-height: 94%; bottom: 100%">
                    {:else if screen.active}
                        <img src="{screen.file}" alt="screenshot" class="active-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96" style="max-height: 94%; bottom: 0">
                    {:else}
                        <img src="{screen.file}" alt="screenshot" class="absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96  hidden" style="max-height: 94%; bottom: -100%;">
                    {/if}

                {/each}
            {/if}

        </div>

    </div>

</div>