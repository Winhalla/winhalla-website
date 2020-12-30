<script>
    export let isCardVisible = true;

    function handleClose() {
        isCardVisible = false
    }
</script>

<style>
    b {
        color: #3d72e4;
        font-weight: 400;
    }
</style>

{#if isCardVisible}
    <div class="absolute z-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center">

        <div class="p-10 pb-7 rounded-lg w-1/2 border border-primary bg-background  relative flex flex-col justify-center">

            <button class="absolute top-0 right-0  p-3 text-mid-light hover:text-font" on:click={() => handleClose()}>
                <svg class="fill-current w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z"/></svg>
            </button>

            <h2 class="text-center text-5xl">PLAY PAGE GUIDE</h2>

            <section class="flex justify-between mt-8">
                <div>
                    <p class="text-3xl text-legendary">Game modes section</p>
                    <p> <b>Click </b> on the game mode <b>you want to play</b> !</p>
                </div>
                <img class="w-1/2 h-41 object-cover" src="/assets/GuidesImages/game_modes_section.png" alt="">
            </section>

            <section class="flex justify-between mt-16">
                <img class="w-1/2 h-41 object-cover object-left-top" src="/assets/GuidesImages/quests_section.png" alt="">
                <div class="ml-10">
                    <p class="text-3xl text-legendary">Quests section</p>
                    <p>Here you will find the <b>quests</b> that Winhalla proposes. <b>Complete them</b> by playing Brawlhalla, and you will <b>earn</b> W coins!</p>
                </div>

            </section>

            <button class="button button-brand mt-14" on:click={() => handleClose()}>LET'S GO!</button>
        </div>

    </div>
{/if}

