<script>
    export let gameModes;
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
        @apply z-30;
    }


    .game-mode-image {
        @apply object-cover block;
    }

    .game-mode-text-container {
        @apply absolute z-10 top-0 bottom-0 left-0 right-0;
    }

    h3 {
        @apply absolute text-6xl top-24 left-0 right-0 text-shadow-link-hover;
    }

    .stats {
        @apply absolute bottom-8 leading-5;
    }

    .desc {
        font-size: 1.7rem;
        @apply text-3xl;
    }

    .goal {
        color: #e2e2ea;
        @apply text-xl mt-8 px-10;
    }

    .duration {
        color: #c2c2c9;
        @apply text-base mt-4;
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

{#each gameModes as gameMode}
    {#if gameMode.available === true}
        <a
                class="game-mode-card block relative shadow-card border
                    border-transparent hover:border-primary
                    hover:shadow-card-hover mb-10 md:mb-0 md:mr-15 relative"
                href="/play/{gameMode.name}">

            <div class="h-full">
                <img
                        src="../assets/ModeBanners/{gameMode.name}.jpg"
                        alt={gameMode.name}
                        class="game-mode-image object-cover block" />
                <div
                        class="game-mode-text-container">
                    <h3
                            class="">
                        {gameMode.displayName}
                    </h3>
                    <div class="stats">
                        <p class="desc">
                            {@html gameMode.description}
                        </p>
                        <p class="goal">
                            {@html gameMode.goal}
                        </p>
                        <p class="duration">
                            {@html gameMode.duration}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    {:else}
        <div
                class="game-mode-card block relative shadow-card border border-transparent mb-10 md:mb-0 md:mr-0 lg:mr-15 relative">

            <div class="h-full locked-gradient">
                <img
                        src="../assets/ModeBanners/{gameMode.name}.jpg"
                        alt={gameMode.name}
                        class="game-mode-image" />

                <div
                        class="game-mode-text-container">
                    <h3
                            class="">
                        {gameMode.displayName}
                    </h3>
                    <div class="stats">
                        <p class="desc">
                            {@html gameMode.description}
                        </p>
                        <p class="goal">
                            {@html gameMode.goal}
                        </p>
                        <p class="duration">
                            {@html gameMode.duration}
                        </p>
                    </div>
                </div>
            </div>
            {#if gameMode.available === "maintenance"}
                <div class="absolute lock">
                    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In-->
                    <svg version="1.1" class="fill-current text-disabled w-12 mx-auto"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 479.554 479.554" style="enable-background:new 0 0 479.554 479.554;"
                         xml:space="preserve">
                    <g>
                        <path d="M324.782,277.035l-65.068,65.06l84.962,84.953c17.968,17.968,47.078,17.968,65.046,0
                            c17.974-17.974,17.982-47.077,0.014-65.068L324.782,277.035z" />
                        <path d="M125.819,208.207l50.672,50.672l65.068-65.067l-50.664-50.666l61.271-61.279c5.032-5.031,5.032-13.2,0-18.24L240.83,52.299
                            c-6.227-6.227-15.07-9.099-23.767-7.701l-97.945,15.7c-5.714,0.916-10.987,3.61-15.078,7.693l-4.333,4.341l-3.54-3.549
                            c-5.031-5.031-13.2-5.031-18.232,0L51.45,95.27c-5.039,5.031-5.039,13.2,0,18.232l3.54,3.548L3.774,168.258
                            c-5.031,5.031-5.031,13.2,0,18.232l62.771,62.771c5.031,5.031,13.2,5.031,18.232,0L125.819,208.207z" />
                        <path d="M467.096,113.758c-1.78-1.778-4.107-2.672-6.429-2.672c-2.322,0-4.651,0.894-6.429,2.672l-36.114,36.09
                            c-3.168,3.184-7.331,4.767-11.484,4.767c-4.154,0-8.315-1.584-11.485-4.767l-26.423-26.431c-3.068-3.028-4.759-7.167-4.759-11.477
                            s1.692-8.439,4.752-11.491l36.114-36.106c3.549-3.549,3.549-9.311,0-12.852c-8.237-8.229-19.132-12.461-30.103-12.461
                            c-8.535,0-17.114,2.562-24.521,7.795l-19.622,13.86c-18.652,13.161-30.228,34.148-31.454,56.946l-2.322,43.405L90.653,367.213
                            c-16.772,16.78-16.772,43.949,0,60.721c8.393,8.387,19.38,12.587,30.368,12.587c10.987,0,21.966-4.193,30.359-12.579
                            l206.186-206.176l43.389-2.322c22.789-1.22,43.769-12.796,56.938-31.448l13.868-19.628
                            C483.712,151.455,481.732,128.394,467.096,113.758z M123.149,413.453c-10.056,0-18.21-8.153-18.21-18.21
                            c0-10.055,8.153-18.208,18.21-18.208c10.055,0,18.208,8.153,18.208,18.208C141.357,405.3,133.204,413.453,123.149,413.453z" />
                    </g>
                </svg>
                    <p class="mt-1 text-light">Maintenance in progress</p>
                </div>

            {:else}
                <div class="absolute lock">
                    <!--Locked icon-->
                    <svg class="fill-current text-disabled w-12 mx-auto" viewBox="0 0 20 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                                d="m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z" />
                    </svg>

                    <p class="mt-1 text-light">Coming soon</p>
                </div>
            {/if}
        </div>
    {/if}
{/each}