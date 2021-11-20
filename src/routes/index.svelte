<script>
    import { onMount } from "svelte";
    import cookie from "cookie";


    let isRegisterPopupOpen = false;
    let info;
    let isTransitioningImg;
    let isTransitioningText;
    let items = [
        {
            file:"screen1.png",
            text:"<p class=\"text-5xl lg:text-6.5xl\"> Play <span class=\"text-primary\">Brawlhalla</span>, </p> <p class=\"text-5xl lg:text-6.5xl mt-4\"> Earn <span class=\"text-primary\">Rewards</span>. </p> <p class=\"text-4xl lg:text-5.5xl mt-6 lg:mt-14\"> As simple as it sounds. </p>"
        },{
            file:"screen2.png",
            text:"<p class=\"text-5xl lg:text-6.5xl\"> Earn <span class=\"text-primary\">Coins</span>, </p> <p class=\"text-5xl lg:text-6.5xl mt-4\"> Just by <span class=\"text-primary\">Playing</span>. </p> <p class=\"text-4xl lg:text-5.5xl mt-6 text-background lg:mt-14\">.</p>"
        },{
            file:"screen3.png",
            text:"<p class=\"text-5xl lg:text-6.5xl\"> Compete against, </p> <p class=\"text-5xl lg:text-6.5xl mt-4\"> Other <span class=\"text-primary\">Players</span>. </p> <p class=\"text-4xl lg:text-5.5xl mt-6 lg:mt-14\">And earn more coins</p>"
        },{
            file:"screen4.png",
            text:"<p class=\"text-5xl lg:text-6.5xl\"> Redeem your <span class=\"text-primary\">coins</span>, </p> <p class=\"text-5xl lg:text-6.5xl mt-4\"> In the <span class=\"text-primary\">shop</span>. </p> <p class=\"text-4xl lg:text-5.5xl mt-6 lg:mt-14\"> Battle pass, season packs, gift cards... </p>"
        },
    ]
    let FlexSlider
    let isDocumentLoaded = false
    onMount(async () => {
        isDocumentLoaded = true
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

        FlexSlider = {
            changeOrder: function() {
                // sliderIndex = sliderIndex === items.length - 1 ? 0 : sliderIndex + 1
                let item = items.shift();
                items.push(item);
                items = items
                isTransitioningText = false
                setTimeout(()=>{
                    isTransitioningImg = false
                },1)
            },

            gotoNext: function() {
                isTransitioningImg = true
                setTimeout(()=>{
                    isTransitioningText = true
                },250)
            }
        };
        /*setInterval(()=>{
            FlexSlider.gotoNext();
        },10000)*/
    });

    function toggleRegisterPopup() {
        isRegisterPopupOpen = !isRegisterPopupOpen;
    }

</script>

<style>
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
    @keyframes slide1 {
        0% {
            transform: translateY(0%);
        }
        100% {
            transform: translateY(-25%);
        }
    }

    .slider-container-transition {
        animation: slide1 0.8s ease-in-out;
        animation-fill-mode:forwards;
    }

    .slider-item {
        width: 100%;
        flex-shrink: 0;
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
<div class="pb-8 mt-10 px-4 lg:px-0">
        <div style="height:94vh;font-family: 'Roboto condensed', sans-serif; font-weight:700;" class="lg:flex lg:justify-center" >
            <div style="color: rgba(253,253,252,0.85);" class="mt-35 lg:mt-48">
                <div class="overflow-hidden" style=" height:{!isDocumentLoaded?'40%':`${document.getElementById('firstChildText').clientHeight+20}px`}">
                    <div class:slider-container-transition={isTransitioningText} on:animationend={FlexSlider.changeOrder}  class="flex flex-nowrap flex-col">
                        {#each items as item,i}
                            <div id="{i===0?'firstChildText':''}" class="slider-item pt-10">
                                {@html item.text}
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="flex mt-10 lg:mt-20">
                    <a href="">
                        <img src="/assets/app-store.png" alt="app store link" class="w-40 lg:w-60 mr-8">
                    </a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXxOb6XI5xKh4NDeicsSUWbj1W4mA5YWFk70_39ssNxbAIUQ/viewform?usp=pp_url&entry.879447017=">
                        <img src="/assets/google-play.png" alt="google play link" class="w-40 lg:w-60 mr-8">
                    </a>
                </div>
            </div>
            <div class="overflow-hidden ml-30"  style="height:{!isDocumentLoaded?'90%':`${document.getElementById('firstChildImg').clientHeight+20}px`}">
                <div class:slider-container-transition={isTransitioningImg} class="flex flex-nowrap flex-col">
                    {#each items as item,i}
                        <div class="slider-item" id="{i===0?'firstChildImg':''}">
                            <img src="/assets/screens/{item.file}" alt="screenshot" class="mt-15 lg:mt-10">
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    <button class="button button-brand" on:click={FlexSlider.gotoNext}>
        Move
    </button>
    <!--<div class="relative">
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
    </div>-->
</div>