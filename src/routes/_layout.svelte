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

<div class="font w-full bg-background min-h-screen h-full flex flex-col">
    <Nav />

    <main class="text-font text-default min-h-screen h-full">
        <!--Main-->
        <slot class="flex-grow bg-background block-grow" />
    </main>

    <!--Footer-->
    <!--<div
        class="w-full flex py-28 pt-12
             bg-variant text-font text-default justify-center">
        <div>
            <div class="lo o-container  lg:pr-34 text-4xl">
                Play
                <b class="text-accent font-normal">Brawlhalla</b>
                <br />
                Earn

                <b class="text-accent font-normal">rewards</b>
            </div>
            <div class="lo o-container  lg:pr-34 text-4xl">
                <a class="logo" href="/"> WINHALLA </a>
                <div />
            </div>
        </div>
        <div class="flex justify-around pt-3">
            <div class="px-8">
                <h3 class="text-primary">Legal</h3>
                <a
                    href="/privacy"
                    class="block hover:text-shadow-link-hover">Privacy</a>
                <a
                    href="/legal"
                    class="block hover:text-shadow-link-hover">Legal notice</a>
            </div>
            <div class="px-8">
                <h3 class="text-primary">Info</h3>
                <a href="/help" class="block hover:text-shadow-link-hover">How
                    does it work</a>
                <a
                    href="/terms"
                    class="block hover:text-shadow-link-hover">Terms of use</a>
            </div>
            <div class="px-8">
                <h3 class="text-primary">Company</h3>
                <a
                    href="/contact"
                    class="block hover:text-shadow-link-hover">Contact us</a>
                <a
                    href="/about"
                    class="block hover:text-shadow-link-hover">About</a>
            </div>
        </div>
    </div>-->
</div>
