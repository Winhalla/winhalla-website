<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";
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

<Tailwindcss />

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet" />
    <link
        rel="stylesheet"
        href="../../fontisto-master/css/fontisto/fontisto.min.css" />
</svelte:head>

<div class="font w-full min-h-screen h-full flex flex-col">
    <Nav />

    <main class="bg-background text-font text-default min-h-screen h-full">
        <slot class="flex-grow bg-background" />
    </main>
</div>
