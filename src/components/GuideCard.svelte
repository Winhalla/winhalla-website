<script>
    import { fly } from "svelte/transition";
    export let page ="";
    export let isCardVisible = true;


    function handleClose() {
        isCardVisible = false;
    }
</script>

<style>
    b {
        color: #3d72e4;
        font-weight: 400;
    }
</style>

{#if isCardVisible}
    <div class="absolute z-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center"
         transition:fly={{ y: 200, duration: 250 }}>

        <div
            class="p-10 pb-7 rounded-lg w-1/2 border border-primary bg-background  relative flex flex-col justify-center">

            <button class="absolute top-0 right-0  p-3 text-mid-light hover:text-font" on:click={() => handleClose()}>
                <svg class="fill-current w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                </svg>
            </button>
            {#if page === "play"}
                <h2 class="text-center text-5xl">PLAY PAGE GUIDE</h2>

                <section class="flex justify-between mt-8">
                    <div>
                        <p class="text-3xl text-legendary">Game modes section</p>
                        <p><b>Click </b> on the game mode <b>you want to play</b> !</p>
                    </div>
                    <img class="w-1/2 h-41 object-cover" src="/assets/GuidesImages/game_modes_section.png" alt="">
                </section>

                <section class="flex justify-between mt-16">
                    <img class="w-1/2 h-41 object-cover object-left-top" src="/assets/GuidesImages/quests_section.png"
                         alt="">
                    <div class="ml-10">
                        <p class="text-3xl text-legendary">Quests section</p>
                        <p>Here you will find the <b>quests</b> that Winhalla proposes. <b>Complete them</b> by playing
                            Brawlhalla, and you will <b>earn</b> W coins!</p>
                    </div>

                </section>
            {:else if page === "ffa"}
                <h2 class="text-center text-5xl">FFA PAGE GUIDE</h2>
                <section class="mt-16 text-center text-green"><p>Only Brawlhalla <u>ranked games will count</u> in this game mode. You can play <u>1vs1</u> or <u>2vs2!</u> </p></section>
                <section class="flex justify-between mt-12">
                    <div>
                        <p class="text-3xl text-legendary">Player cards</p>
                        <p><b>Each player</b> that will join the lobby will be represented by a <b>player card</b> ,
                            with a username, and the <b>number of games</b> he played in this FFA match. You will see
                            your <b>number of wins</b> on <b>your</b> player card.</p>
                    </div>
                    <img class="w-1/2 h-64 object-contain" src="/assets/GuidesImages/ffa_player_card.png" alt="">
                </section>

                <section class="flex justify-between mt-8">
                    <img class="w-1/2 h-41 object-contain object-left-top" src="/assets/GuidesImages/ffa_buttons.png"
                         alt="">
                    <div class="ml-10">
                        <p class="text-3xl text-legendary">Action buttons</p>
                        <p>The <b>QUIT</b> button let's you <b>quit the lobby</b> when you still <b>haven't played
                            any games</b>.
                            <br> When you <b>click</b> the <b>REFRESH DATA</b> button, your <b>player card</b> will be
                            <b>updated</b> for <b>you</b> and the <b>other players</b> in the lobby.
                            <br> <span class="text-xl leading-tight italic text-mid-light">If your data doesn't get updated when you click on the button, wait around 5 minutes before clicking it again!</span>
                        </p>
                    </div>

                </section>
            {/if}


            <button class="button button-brand mt-14" on:click={() => handleClose()}>LET'S GO!</button>
        </div>

    </div>
{/if}

