<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";

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

<div class="font w-full min-h-screen h-full flex flex-col">
    <Nav />

    <main class="bg-background text-font text-default min-h-screen h-full">
        <slot class="flex-grow bg-background block-grow" />
        <div class="w-full flex justify-between text-footer shadow-footer pt-4">
            <div class="ml-16">
                <h3 class="text-footer-h3">Legal</h3>
                <a href="/privacy" class="block text-base">Privacy</a>
                <a href="/legal" class="block text-base">Legal notice</a>
            </div>
            <div>
                <h3 class="text-footer-h3">Info</h3>
                <a href="/help" class="block text-base">How it works</a>
                <a href="/terms" class="block text-base">Terms of use</a>
            </div>
            <div class="mr-16">
                <h3 class="text-footer-h3">Contact</h3>
                <a href="/contact" class="block text-base">Contact us</a>
                <a href="/about" class="block text-base">About us</a>
            </div>

        </div>
    </main>

</div>
