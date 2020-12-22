<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";
    import Footer from "../components/Footer.svelte";

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
</svelte:head>

<svelte:window bind:scrollY={scrollY} />
<div class="font w-full bg-background min-h-screen h-full flex flex-col relative">
    <Nav isScrolling={scrollY > 0} />

    <main class="text-font text-default min-h-screen h-full">
        <!--Main-->
        <slot class="flex-grow bg-background block-grow" />
    </main>
    <!--<div class="fixed bottom-0 right-20 bg-background border border-b-0 border-green px-12 pt-6 rounded-t-xl">
        <Poll/>
    </div>-->

    <!--Footer-->
    <Footer />
</div>
