<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Nav.svelte";
</script>

<style>
    .font {
        font-family: "Bebas Neue", sans-serif;
    }
</style>

<Tailwindcss />


<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/fontisto-master/css/fontisto/fontisto.min.css">
</svelte:head>

<div class="font w-full">
    <Nav />

    <main>
        <slot />
    </main>
</div>