<script>
    import { fly } from "svelte/transition";

    export let page = "";
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

    .scrollbar::-webkit-scrollbar {
        width: 18px;
        height: 18px;
        cursor: pointer;

        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/

    }

    .scrollbar::-webkit-scrollbar-thumb {
        height: 3px;
        border: 6px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        -webkit-border-radius: 15px;
        background-color: #1C1C2C;
        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
        /*outline: 1px solid slategrey;*/
    }
</style>

{#if isCardVisible}
    <div class="absolute z-50 top-0 bottom-0 left-0 right-0     h-screen"
         transition:fly={{ y: 200, duration: 250 }}>
        <div class="w-full md:w-3/4 2xl:w-3/5   fixed top-1/2 left-1/2  px-5 md:px-0"
             style="transform: translate(-50%, -46.5%);">
            <div
                class="w-full max-h-screen-85   border border-primary rounded-lg bg-background    flex flex-col justify-center">

                <div class="overflow-y-auto scrollbar p-6 md:p-10 pb-7">
                    <button class="absolute top-0 right-5 xl:right-0  p-4 text-mid-light hover:text-font"
                            on:click={() => handleClose()}>
                        <svg class="fill-current w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z" />
                        </svg>
                    </button>
                    {#if page === "play"}
                        <h2 class="text-center text-5xl pt-8">PLAY PAGE GUIDE</h2>

                        <section class="md:flex justify-between mt-8">
                            <div>
                                <p class="text-3xl text-legendary">Game modes section</p>
                                <p><b>Click </b> on the game mode <b>you want to play</b> !</p>
                            </div>
                            <img class="w-full mt-2 md:mt-0 md:w-1/2 md:h-41 object-cover" src="/assets/GuidesImages/game_modes_section.png"
                                 alt="Game modes section">
                        </section>

                        <section class="md:flex justify-between mt-16">
                            <img class="hidden md:block w-1/2 h-41 object-cover object-left-top"
                                 src="/assets/GuidesImages/quests_section.png"
                                 alt="">
                            <div class="md:ml-10">
                                <p class="text-3xl text-legendary">Quests section</p>
                                <p>Here you will find the <b>quests</b> that Winhalla proposes. <b>Complete them</b> by
                                    playing
                                    Brawlhalla, and you will <b>earn</b> W coins!
                                    <br> <span class="text-xl leading-tight italic text-mid-light">Click or hover on a quest to see how much you will earn ;)</span>
                                </p>
                            </div>
                            <img class="md:hidden block w-full mt-5"
                                 src="/assets/GuidesImages/quests_section.png"
                                 alt="Quests section">
                        </section>
                    {:else if page === "ffa"}
                        <h2 class="text-center text-5xl">FFA PAGE GUIDE</h2>

                        <section class="mt-10 md:mt-16 text-center text-green"><p>Only Brawlhalla <u>ranked games will count</u>
                            in this game mode. You can play <u>1vs1</u> or <u>2vs2!</u></p></section>

                        <section class="md:flex justify-between mt-12">
                            <div>
                                <p class="text-3xl text-legendary">Player cards</p>
                                <p><b>Each player</b> that will join the lobby will be represented by a <b>player
                                    card</b> ,
                                    with a username, and the <b>number of games</b> he played in this FFA match. You
                                    will see
                                    your <b>number of wins</b> on <b>your</b> player card.</p>
                            </div>
                            <img class="mt-2 w-5/6 mx-auto block max-w-xs px-8  md:px-0 md:max-w-full  md:mt-0 md:mx-0 md:w-1/2 md:h-64 object-contain " src="/assets/GuidesImages/ffa_player_card.png"
                                 alt="FFA player card example">
                        </section>

                        <section class="md:flex justify-between mt-8">
                            <img class="hidden md:block  w-1/2 h-41 object-contain object-left-top"
                                 src="/assets/GuidesImages/ffa_buttons.png"
                                 alt="FFA action buttons">
                            <div class="md:ml-10">
                                <p class="text-3xl text-legendary">Action buttons</p>
                                <p>The <b>QUIT</b> button let's you <b>quit the lobby</b> when you still <b>haven't
                                    played
                                    any games</b>.
                                    <br> When you <b>click</b> the <b>REFRESH DATA</b> button, your <b>player card</b>
                                    will be
                                    <b>updated</b> for <b>you</b> and the <b>other players</b> in the lobby.
                                    <br> <span class="text-xl leading-tight italic text-mid-light">If your data doesn't get updated when you click on the button, wait around 5 minutes before clicking it again!</span>
                                </p>
                            </div>
                            <img class="block max-w-xs md:max-w-full  md:hidden   w-full mt-5 "
                                 src="/assets/GuidesImages/ffa_buttons.png"
                                 alt="FFA action buttons">
                        </section>
                    {/if}


                    <button class="button button-brand mt-14 w-full ml-2 md:ml-0" on:click={() => handleClose()}>LET'S GO!</button>
                </div>

            </div>
        </div>


    </div>
{/if}

