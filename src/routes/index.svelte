<script>
    import { fly, fade } from "svelte/transition";
    import { onMount } from "svelte";
    import cookie from "cookie";
    import { callApi } from "../utils/api";
    import Infos from "../components/Infos.svelte";
    import QuestsSection from "../components/QuestsSection.svelte";
    import MatchSection from "../components/MatchSection.svelte";
    import ShopSection from "../components/ShopSection.svelte";
    let isRegisterPopupOpen = false;
    let email;
    let valid = null;
    let info;

    let utms = {
        utm_source: "winhalla.app",
        utm_medium: "first_button"
    }
    let url1 = "https://play.google.com/store/apps/details?id=com.winhalla.app&referrer="
    let url2 = ""
    let isFirstAddToUrl = true
    onMount(()=>{
        const urlParams = new URLSearchParams(location.search);
        for(const [key, value] of urlParams){
            if(key.startsWith("utm_")){             
                utms[key] = value + (key === "utm_source" ? "_website" : "") + (key === "utm_medium" ? "_first_button" : "")
            }
        }
        for (const key of Object.keys(utms)){
            if(isFirstAddToUrl){
                url1 += key + "%3D" + utms[key]
                isFirstAddToUrl = false
            } else {
                url1 += "%26" + key + "%3D" + utms[key]
            }
        }
        url2 = url1.replace('first_button', "second_button")
        /*
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
        location.hash = "";
        let currentPage = location.hash;
        setInterval(() => {
            if (currentPage !== location.hash) {
                // page has changed, set new page as 'current'
                location.hash = ""
                currentPage = location.hash
                toggleRegisterPopup()
                // do your thing..
            }
        }, 250);*/
    })
        

    /*async function register() {
        toggleRegisterPopup();
        let { source } = cookie.parse(document.cookie);
        if ((await callApi("post", `/preRegistration?email=${email}&source=${source}`)) instanceof Error) return;
        document.cookie = "source=0;maxAge=1";
        info = true;
        setTimeout(() => {
            info = false;
        }, 5000);
    }

    const onKeyPressEmail = () => {
        if (!email) return;
        setTimeout(() => {
            if (email.length > 0) {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                let exec = regex.exec(email);
                valid = !!exec;
            } else {
                valid = null;
            }
        }, 1);

    };
    function toggleRegisterPopup() {
        isRegisterPopupOpen = !isRegisterPopupOpen;
    }*/
    /* function toggleFAQ(entryId) {
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
     ];*/

    
    const screens = [
        {
            file: "/assets/screens/screen1.png",
            active: true,
            previous: false,
        },
        {
            file: "/assets/screens/screen2.png",
            active: false,
            previous: false,
        },
        {
            file: "/assets/screens/screen3.png",
            active: false,
            previous: false,
        },
        {
            file: "/assets/screens/screen4.png",
            active: false,
            previous: true,
        }
    ]

    function handleSwitch() {
        let activeScreen = screens.findIndex(s => s.active === true);
        if (activeScreen === screens.length - 1) {
            screens[activeScreen].active = false;
            screens[activeScreen - 1].previous = false;
            screens[activeScreen].previous = true;
            screens[0].active = true;
        } else {
            screens[activeScreen].active = false;
            screens[activeScreen].previous = true;
            screens[activeScreen + 1].active = true;
            if (activeScreen === 0) {
                screens[screens.length - 1].previous = false;
            } else {
                screens[activeScreen - 1].previous = false;
            }
        }
    }

    setInterval(handleSwitch, 4000);
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

    @keyframes up-transition {
        0% {
            bottom: 0;
        }

        100% {
            bottom: 100%;
        }
    }

    .up-transition {
        animation: up-transition 0.8s ease-in-out;
    }

    @keyframes active-transition {
        0% {
            bottom: -100%;
        }

        100% {
            bottom: 0;
        }
    }

    .active-transition {
        animation: active-transition 0.8s ease-in-out;
    }


</style>

<svelte:head>
    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>
    <meta
            name="description"
            content="Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,
        Mammoth Coins, Season Packs and more!" />

    <link rel="canonical" href="https://winhalla.app" />
</svelte:head>
<div class="pb-8 mt-0 lg:px-0">
    <div style="height:94vh;font-family: 'Roboto condensed', sans-serif; font-weight:700" class="md:flex md:justify-center  relative">
        <div style="color: rgba(253,253,253,0.80)" class="mt-30 md:mt-64    px-8 md:pr-0 md:-mr-14 lg:px-0">
            <div>
                <p class="text-4-5xl lg:text-6xl">
                    Play <span class="text-primary">Brawlhalla</span>,
                </p>
                <p class="text-4-5xl lg:text-6xl -mt-2 lg:mt-4">
                    Earn <span class="text-primary">Rewards</span>.
                </p>
                <p class="text-3xl lg:text-4-5xl mt-6 lg:mt-11  text-gray">
                    As simple as it sounds.
                </p>
            </div>
            <div class="hidden lg:flex mt-10 lg:mt-20">
                <!--<a href="/ios" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/app-store.png" alt="app store link" class="w-40 lg:w-55 mr-8">
                </a>-->
                <a href="{url1}" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/google-play.png" alt="google play link" class="w-40 lg:w-55 mr-8">
                </a>
            </div>
        </div>
        <div class="h-11 lg:h-0 lg:w-1/3"></div>
        <div class="md:hidden">
            <img src="/assets/screens/screen1.png" alt="screen 1" class="w-full -ml-9" style="width: 150%">
        </div>
        <div class="hidden md:block lg:hidden mt-28">
            <img src="/assets/screens/screen1.png" alt="screen 1" class="-ml-9" style="width: 30rem">
        </div>
        <div class="max-h-full overflow-hidden hidden lg:block" style="z-index: -1">
            {#if screens}
                {#each screens as screen}
                    {#if screen.previous}
                        <img src="{screen.file}" alt="screenshot" class="up-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96" style="max-height: 94%; bottom: 100%">
                    {:else if screen.active}
                        <img src="{screen.file}" alt="screenshot" class="active-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96" style="max-height: 94%; bottom: 0">
                    {:else}
                        <img src="{screen.file}" alt="screenshot" class="absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96  hidden" style="max-height: 94%; bottom: -100%;">
                    {/if}

                {/each}
            {/if}

        </div>

    </div>
    <div class="mt-15 lg:mt-0  w-full flex justify-center bg-background -mt-20 md:-mt-64 lg:mt-0">
        <QuestsSection/>
    </div>
    <div class="w-full flex justify-center bg-background  pt-24 lg:pt-30 xl:pt-37">
        <MatchSection/>
    </div>
    <div class="w-full flex justify-center bg-background pt-24 lg:pt-30 xl:pt-37">
        <ShopSection/>
    </div>


    <div class="mt-14 md:mt-20 lg:mt-24 xl:mt-38 mb-8">
        <div class="w-full  flex justify-center">
            <div class="flex-col items-center">
                <p class=" text-4-5xl md:text-5xl lg:text-6xl  text-extra-light  text-center">Ready? Go!</p>
                <div class="lg:flex mt-4 md:mt-7 lg:mt-10">
                    <!--<a href="/ios" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/app-store.png" alt="app store link" class="w-40 lg:w-55 mr-8">
                    </a>-->
                    <a href="{url2}" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/google-play.png" alt="google play link" class="w-40 lg:w-55 mr-8">
                    </a>
                </div>
            </div>

        </div>
    </div>


</div>
{#if isRegisterPopupOpen}
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
         style="z-index: 100"
         in:fade={{duration: 200}}
         out:fade={{duration: 350}}>

        <div
                class="max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto"
                style="max-height: 95vh;"
                transition:fly={{ y: 300, duration: 350 }}>
            <h2 class="text-4xl md:text-5xl">Pre-register
            </h2>

            <p class="text-accent text-5xl md:text-6xl">NOW</p>
            <div>
                <div class="max-h-screen-50">
                    <div>
                        <p class="mt-7 text-font text-3xl" style="margin-bottom: 0.35rem;">Email</p>
                        <div>
                            <input
                                    on:keydown={onKeyPressEmail}
                                    on:change={onKeyPressEmail}
                                    type="email"
                                    placeholder="Your email goes here"
                                    bind:value={email}
                                    class:border-legendary={valid === false}
                                    class="w-full text-background bg-font py-3 px-4 rounded focus:outline-none
                            focus:border-primary placeholder-disabled email-input"
                                    style="font-family: 'Roboto Condensed', sans-serif;" />

                            {#if valid}
                                <div class="flex items-center mt-1">
                                    <svg
                                            class="fill-current text-green w-4"
                                            style="margin-top: 0.15rem; margin-right: 0.4rem;"
                                            viewBox="0 0 33 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                                    </svg>
                                    <p class="text-green info">VALID EMAIL</p>
                                </div>
                            {:else if valid === false}
                                <p class="text-legendary info mt-1">INVALID EMAIL</p>
                            {/if}
                        </div>
                    </div>
                    <div class="text-font flex items-center mt-4 lg:mt-3">
                        <div class="rounded-full bg-primary mb-1" style="padding: 0.65rem;">
                            <svg
                                    class="w-full h-full fill-current"
                                    style="max-width: 0.95rem; max-height: 0.95rem;"
                                    viewBox="0 0 17 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z" />
                            </svg>
                        </div>

                        <p class="text-primary text-xl ml-4">
                            We will email you a link to download the app in the next few days
                        </p>
                    </div>
                    <p class="text-legendary text-xl" style="font-family: 'Roboto condensed', sans-serif; font-weight:700">
                        Please enter here your GOOGLE ACCOUNT's email address, otherwise we won't be able to give you access to the closed beta
                    </p>
                </div>
                <div class="justify-center w-full flex mt-8 py-3">
                    <button class="px-8 md:px-10 button2 button-brand-alternative"
                            style="background-color: #17171a;padding: -1px"
                            on:click={toggleRegisterPopup}>
                        Cancel
                    </button>
                    <button class="px-8 py-3 md:px-10 button2 ml-5" class:button-brand={valid}
                            on:click={register}
                            disabled={!valid}>
                        Pre-register
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
{#if info}
    <Infos pushError="We will keep you in touch!" message="Successfully pre-registered!" />
{/if}