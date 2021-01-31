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
        @apply z-40;
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
    {#if gameMode.available}
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
            <div class="absolute lock">
                <!--Locked icon-->
                <svg class="fill-current text-disabled w-12 mx-auto" viewBox="0 0 20 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z" />
                </svg>

                <p class="mt-1 text-light">Coming soon</p>
            </div>
        </div>
    {/if}
{/each}