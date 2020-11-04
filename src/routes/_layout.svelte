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
</style>

<Tailwindcss/>

<svelte:head>
    <!--Google Analytics-->
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag("js", new Date());

        gtag("config", "G-MQ7J8EE2E5");
    </script>
    <!--Adsense-->
    <script data-ad-client="ca-pub-6149483070204658" async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>


    <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"/>
    <link
            rel="stylesheet"
            href="../../fontisto-master/css/fontisto/fontisto.min.css"/>


</svelte:head>

<div class="font w-full min-h-screen h-full flex flex-col">
    <Nav/>

    <main class="bg-background text-font text-default min-h-screen h-full">
        <slot class="flex-grow bg-background"/>
    </main>
</div>
