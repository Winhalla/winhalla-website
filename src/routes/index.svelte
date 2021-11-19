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
        <div class="h-screen">

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
        <section id="mob-pre-register" class="join-us w-full text-center mt-22 lg:mt-28 pb-10">
            <h2 class="text-5xl md:text-6xl lg:text-7xl">Ready? Get the app now</h2>
            <button class="button button-brand mt-8">
                Get the app
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
</div>