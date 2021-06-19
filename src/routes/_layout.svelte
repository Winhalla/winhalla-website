<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";
    import Footer from "../components/Footer.svelte";
    import ErrorAlert from "../components/ErrorAlert.svelte";
    import { eventEmitter } from "../utils/api";
    import { onMount } from "svelte";
    import CookiePopup from "../components/CookiePopup.svelte";
    import { getCookie } from "../utils/getCookie";

    //Show error to the user if there is one from an api request
    let error;
    onMount(() => {
        eventEmitter.subscribe(async e => {
            e = e.error;
            if (!e) return;
            if (e instanceof Error) {
                if (e.response) {
                    error = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();
                    setTimeout(() => {
                        error = undefined;
                    }, 8000);
                }
            }
        });

        const acceptedCookieList = getCookie("acceptedCookieList");
        if (acceptedCookieList === "true") {
            window.yett.unblock();
        } else if (getCookie("hideCookiePopup")) {
            window.yett.unblock(JSON.parse(decodeURI(acceptedCookieList).replace(/%2C/g, ",").replace(/%2F/g, "/")));
        }
    });

    let scrollY = 0;
    //export let segment;
</script>

<style>
    .font {
        font-family: "Bebas Neue", sans-serif;
    }

    main {
        margin-top: calc(4rem - 2px);
        min-height: calc(100vh - calc(4rem - 2px));
    }

    body {
        margin: 0;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0 0 0.5em 0;
        font-weight: 400;
        line-height: 1.2;
    }

    h1 {
        font-size: 2em;
    }

    a {
        color: inherit;
    }

    code {
        font-family: menlo, inconsolata, monospace;
        font-size: calc(1em - 2px);
        color: #555;
        background-color: #f0f0f0;
        padding: 0.2em 0.4em;
        border-radius: 2px;
    }

    @media (min-width: 400px) {
        body {
            font-size: 16px;
        }
    }
</style>

<Tailwindcss />

<svelte:head>

    <!-- <link rel="stylesheet" href="../../fontisto-master/css/fontisto/fontisto.min.css" /> -->
    <!--Adsense-->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!--<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=G-2X5EEDMTZE"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2X5EEDMTZE');
    </script>-->

</svelte:head>

<svelte:window bind:scrollY={scrollY} />
<div class="font w-full bg-background min-h-screen h-full flex flex-col relative">
    <CookiePopup />
    <Nav isScrolling={scrollY > 0} />
    {#if error}
        <ErrorAlert message="We had some trouble getting to Winhalla" pushError={error} />
    {/if}

    <main class="text-font text-default min-h-screen h-full relative">
        <!--Main-->


        <slot class="flex-grow bg-background block-grow" />
        <!--<GameModeCards page={"play"}/>-->
    </main>
    <!--<div class="fixed bottom-0 right-20 bg-background border border-b-0 border-green px-12 pt-6 rounded-t-xl">
        <Poll/>
    </div>-->

    <!--Footer-->
    <Footer />
</div>
