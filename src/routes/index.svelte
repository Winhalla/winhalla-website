<script>
    import { apiUrl } from "../utils/config";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { callApi } from "../utils/api";
    import cookie from "cookie";

    onMount(async () => {
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.get("source"))
            document.cookie = cookie.serialize("source", urlParams.get("source"), { maxAge: 15552000, sameSite: "lax", path: "/" });
    });
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

        <div
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
        <div
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
                            <li><b class="text-green font-normal">SOLO</b>: Each participant Play’s <u>8</u> brawlhalla
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
        </div>
        <div class="join-us w-full text-center mt-22 lg:mt-28 pb-10">
            <h2 class="text-5xl lg:text-7xl">Ready? Start now!</h2>
            <a class="button button-brand mt-8" href="{apiUrl}/auth/login">
                Login
            </a>
        </div>
    </div>
</div>
