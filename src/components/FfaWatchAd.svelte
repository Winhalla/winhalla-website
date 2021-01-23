<script>
    let randomInfo = Math.floor(Math.random() * 2);
</script>

<style>
    b {
        @apply font-normal text-primary;
    }

    strong {
        @apply font-normal text-green;
    }
</style>

<div class="sm:flex    absolute top-0 bottom-0 left-0 right-0 z-10 bg-background bg-opacity-70">
    <!--TRANSPARENT PART-->
    <div class="hidden md:block md:w-1/4 lg:w-1/2 2xl:w-3/5"></div>
    <!--<svg class="hidden lg:block inset-y-0 h-full w-48 absolute text-primary transform translate-x-1/2 right-1/2" fill="currentColor"
         viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" xstyle="margin-right: -10.2rem">
        <polygon class="border-l border-primary" points="50,0 100,0 50,100 0,100"></polygon>
    </svg>
    <svg class="hidden lg:block inset-y-0 h-full w-48 z-10 text-background transform translate-x-1/2" fill="currentColor"
         viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon class="border-l border-primary" points="50,0 100,0 50,100 0,100"></polygon>
    </svg>-->
    <!--TEXT-->
    <div class="bg-background w-full md:w-3/4  lg:w-1/2   2xl:w-2/5    h-full   md:border-l-2 border-primary">
        <div class="sm:flex sm:flex-col items-center justify-between mx-7 h-full">
            <div class="text-center">
                <h1 class="text-center md:text-left text-6xl   mt-8 sm:mt-13">MULTIPLY YOUR REWARDS</h1>
                <p class="text-3xl mt-7 lg:mt-12 max-w-md   ">Want to obtain a first <b>x5 boost</b> on the <b>coins</b>
                    you
                    will
                    <b>win</b> by playing this match?</p>
                <p class="text-2xl mt-4 text-mid-light italic">Watch a short video by clicking the button below!</p>
            </div>
            {#if randomInfo == 1}
                <div class="card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10" style="max-width: 27.5rem">
                    <p class="mb-4 text-4xl text-primary">Did you know?</p>
                    <p>Watching at least <strong>2 videos per match</strong> will <u>divide</u> the time to earn a
                        battle
                        pass by <strong>10
                            hours</strong>
                </div>
            {:else}
                <div class="card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10" style="max-width: 27.5rem">
                    <p class="mb-4 text-4xl text-primary">Did you know?</p>
                    <p>If you are first and you watch <strong>2 videos</strong> this match you will earn <strong>1000
                        coins</strong> vs <b style="color: #fc1870">100 coins</b> if you watch <b
                        style="color: #fc1870">0 video</b>
                </div>
            {/if}


            <div class="mt-12 sm:mt-0 sm:mb-24">
                <div class="mt-4 flex flex-col items-center sm:items-start sm:flex-row">
                    <button class="button button-brand sm:mr-6 text-background items-center"
                            style="display: flex; background-color: #3de488; padding: 0.75rem 1.5rem">
                        <svg class="fill-current w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m.001 1.165v21.669c.052.661.601 1.177 1.271 1.177.225 0 .436-.058.62-.16l-.006.003 21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672 0-1.223.521-1.27 1.181v.004z" />
                        </svg>
                        WATCH VIDEO

                    </button>
                    <button class="button button-brand mt-5 sm:mt-0 mb-1"
                            style="background-color: #fc1870; padding: 0.75rem 1.5rem">
                        Continue
                        to match
                    </button>
                </div>
            </div>

        </div>

    </div>


</div>