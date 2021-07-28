<script>
    import { fly, fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { callApi } from "../utils/api";
    import Infos from "../components/Infos.svelte";
    import cookie from "cookie";
    import { gtagEvent } from "../utils/gtagEvent";
    import { apiUrl } from "../utils/config";


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

    async function register() {
        toggleRegisterPopup();
        let { source } = cookie.parse(document.cookie);
        if ((await callApi("post", `/preRegistration?email=${email}&source=${source}`)) instanceof Error) return;
        document.cookie = "source=0;maxAge=1";
        info = true;
        setTimeout(() => {
            info = false;
        }, 5000);
    }

    const onKeyPressEmail = () => {
        if (!email) return;
        setTimeout(() => {
            if (email.length > 0) {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                let exec = regex.exec(email);
                valid = !!exec;
            } else {
                valid = null;
            }
        }, 1);

    };

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
</script>

<style>
    .video-container::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
                to bottom,
                rgba(23, 23, 26, 0.3) 0%,
                rgba(23, 23, 26, 0.4),
                rgba(23, 23, 26, 0.6) 75%,
                rgba(23, 23, 26, 1) 100%
        );
    }

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
</style>

<svelte:head>
    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>
    <meta
        name="description"
        content="Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,
        Mammoth Coins, Season Packs and more! | Winhalla home page" />

    <link rel="canonical" href="https://winhalla.app" />
</svelte:head>
<div class="pb-8 " out:fly={{ y: -450, duration: 400 }}>
    <div class="relative">
        <div class="absolute top-7 left-7 lg:left-24 lg:top-10 z-10">
            <h1 class="text-6xl lg:text-8xl text-shadow-base">
                PLAY
                <b class="text-accent">BRAWLHALLA</b>
                <br />
                EARN
                <b class="text-accent">REWARDS</b>
            </h1>
        </div>
        <div
            class="video-container relative z-0 overflow-hidden w-full
            h-screen-60 lg:h-screen">
            <video
                class="w-full h-full object-cover"
                preload="true"
                loop
                playsinline
                autoplay
                muted>
                <source
                    src="/assets/video/brawlhalla-gameplay.mp4"
                    type="video/mp4" />
            </video>
        </div>

        <div id="pre-register"

             class="tip absolute left-0 right-0 bottom-20 text-center hidden
            lg:block">
            <p class="text-2xl">Learn more</p>
            <svg
                class="fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path
                    d="M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707
                    7.778-7.778-1.414-1.414L11 16.172V0H9z" />
            </svg>
        </div>
    </div>
    <div class="pt-14 lg:pt-24">
        <section
            class="cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row
            items-center lg:justify-around">
            <div class="pb-18 lg:pb-0">
                <div
                    class="card p-4 w-78 h-106 hover:shadow-card-hover border
                    border-transparent hover:border-primary">
                    <p class="text-9xl">1</p>
                    <div class="">
                        <h3 class="text-4xl leading-9">
                            <b class="text-primary font-normal">Choose</b>
                            a game mode
                        </h3>
                        <ul class="text-extra-light text-2xl text-left pt-8 px-4">
                            <li><b class="text-green font-normal">SOLO</b>: Each participant Play’s <u>7</u> brawlhalla
                                <u>games</u>: be the one with the <u>most wins</u>.
                            </li>
                            <li class="mt-3"><b class="text-green font-normal">DUOS</b>: Work in progress</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pb-18 lg:pb-0">
                <div
                    class="card p-4 w-78 h-106 hover:shadow-card-hover border
                    border-transparent hover:border-primary">
                    <p class="text-9xl">2</p>
                    <div class="">
                        <h3 class="text-4xl leading-9">
                            Earn
                            <b class="text-primary font-normal">coins</b>...
                        </h3>
                        <ul class="text-extra-light text-2xl text-left pt-8 px-6">
                            <li><b class="text-green font-normal">By playing</b> some <u>solo</u> and <u>Duo</u> games
                            </li>
                            <li class="mt-3"><b class="text-green font-normal">By completing</b> the <u>quests</u>
                                available on the website
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="card p-4 w-78 h-106 hover:shadow-card-hover border
                    border-transparent hover:border-primary">
                    <p class="text-9xl">3</p>
                    <div class="">
                        <p class="text-4xl leading-9 px-2">
                            ...and <b class="text-primary font-normal">Spend</b> them in the <b
                            class="text-primary font-normal">shop</b>!
                        </p>
                        <p class="text-extra-light text-2xl text-left pt-8 px-4">
                            <b class="text-green font-normal">Exchange</b> the <u>coins</u> you earned for some well
                            deserved <b class="text-legendary font-normal">rewards</b>:
                            <a class="text-primary text-xl ml-1" href="/shop">Click here</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="ml-8 lg:mx-0 mt-20 lg:mt-28  lg:w-full  flex flex-col items-center">
            <div class="md:flex items-end">
                <h3 class="text-4/5xl md:text-5xl"><b class="text-legendary font-normal">No download</b> required:</h3>
                <p class="mt-1 md:mt-0 ml-0 md:ml-3 text-3xl md:text-4xl">
                    <b class="text-accent font-normal">Use winhalla</b> directly <b class="text-primary font-normal">in
                    your browser</b>
                </p>
            </div>
            <ul class="mt-7 lg:ml-108 text-2xl pr-2">
                <li class="flex items-center">
                    <svg
                        class="fill-current w-7 mr-2
                                            text-green"
                        viewBox="0 0 27 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m24
                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                1.807-1.807 5.422 5.422
                                                13.68-13.68 1.811 1.803-15.491
                                                15.491z" />
                    </svg>
                    <p><b class="text-primary font-normal">Saves</b> your <u> computer's resources</u></p></li>

                <li class="flex items-center mt-3 lg:mt-2">
                    <svg
                        class="fill-current w-7 mr-2
                                            text-green"
                        viewBox="0 0 27 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m24
                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                1.807-1.807 5.422 5.422
                                                13.68-13.68 1.811 1.803-15.491
                                                15.491z" />
                    </svg>
                    <p><b class="text-primary font-normal">Access</b> the website <u>on your phone</u></p></li>

                <li class="flex items-center mt-3 lg:mt-2">
                    <svg
                        class="fill-current w-9 md:w-7 mr-2
                                            text-green"
                        viewBox="0 0 27 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m24
                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                1.807-1.807 5.422 5.422
                                                13.68-13.68 1.811 1.803-15.491
                                                15.491z" />
                    </svg>
                    <p><b class="text-primary font-normal">Available</b> for <u>computer</u>, <u>console</u> and <u>mobile</u>
                        players</p></li>
            </ul>
        </section>
        <section id="mob-pre-register" class="join-us w-full text-center mt-22 lg:mt-28 pb-10">
            <h2 class="text-5xl md:text-6xl lg:text-7xl">Ready? Create an account now (no email required)</h2>
            <button class="button button-brand mt-8">
                Login NOW
            </button>

        </section>

        <section class="mt-9 pl-8 md:ml-0 w-full flex justify-center">
            <div class="md:w-3/4 xl:w-1/2">
                <h2 class="text-7xl mb-3 text-primary">FAQ</h2>
                {#each faq as entry,i}
                    <button
                        class="w-full flex justify-start items-center  p-3  pr-3 md:pr-6  focus:outline-none"
                        on:click={()=>toggleFAQ(i)}>

                        <p class="text-3xl text-left w-95% md:w-full">{@html entry.question}</p>

                        <svg class="w-7 h-11 md:w-4 md:h-6 fill-current md:-mt-2 md:-ml-4 md:mr-3"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {#if entry.opened}
                                <path
                                    d="m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z" />
                            {:else}
                                <path
                                    d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
                            {/if}
                        </svg>
                    </button>
                    {#if entry.opened}
                        <div class="ml-8 md:ml-14 mb-5  text-default text-light ">
                            <p class="text-2xl text-left">{@html entry.answer}</p>
                        </div>
                    {/if}
                {/each}
            </div>

        </section>
    </div>

    Bidvertiser2058315
</div>