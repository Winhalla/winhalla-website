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
</style>

<svelte:head>
    <title>Winhalla</title>
</svelte:head>

<div class="relative">
    <div class="absolute top-7 left-7 lg:left-24 lg:top-10 z-10">
        <h1 class="text-6xl lg:text-8xl text-shadow-base">
            PLAY <b class="text-accent">BRAWLHALLA</b>
            <br /> EARN <b class="text-accent">REWARDS</b>
        </h1>
    </div>
    <div
        class="video-container relative z-0 overflow-hidden w-full h-screen-60
            lg:h-screen">
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
        class="tip absolute left-0 right-0 bottom-20 text-center hidden lg:block">
        <p class="text-2xl">Learn more</p>
        <svg
            class="fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
                d="M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707 7.778-7.778-1.414-1.414L11 16.172V0H9z" />
        </svg>
    </div>
</div>
<div class="container">
    <div class="cards">
        <div class="card">
            <h2>1</h2>
            <div>
                <p><b class="text-primary">Choose</b> a game mode</p>
                <p>FFA, solo, 2vs2...</p>
            </div>
        </div>
        <div class="card">
            <h2>2</h2>
            <div>
                <p>
                    <b class="text-primary">Complete</b> the goal of the game mode
                </p>
                <p>Quests, win goals...</p>
            </div>
        </div>
        <div class="card">
            <h2>3</h2>
            <div>
                <p><b class="text-primary">Earn</b> rewards</p>
                <p>
                    Earn coins that you will be able to spend in the <a>shop</a>!
                </p>
            </div>
        </div>
    </div>
    <div class="join-us">
        <h2>Ready? Start now!</h2>
        <div><a class="button button-brand" href="#"> Create Account </a></div>
        <div><a href="#"> Already a member? Login </a></div>
    </div>
</div>
