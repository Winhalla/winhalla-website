<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";
</script>

<style>
    .font {
        font-family: "Bebas Neue", sans-serif;
    }

    main {
        padding-top: calc(4rem - 3px);
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

<div class="font w-full">
    <Nav />

    <main class="bg-background text-font text-default pt-16">
        <slot />
    </main>
</div>
