<script context="module">
    export async function preload({ params, query }) {

        return { link: params.name };
    }
</script>
<script>
    import { goto } from "@sapper/app";
    import { onMount } from "svelte";
    import Loading from "../../components/Loading.svelte";

    export let link;
    onMount(async () => {
        goto(`https://link.winhalla.app/${link}redirect`);            
    });


</script>
<svelte:head>
    <title>Redirecting...</title>
    <meta name="robots" content="noindex">
</svelte:head>
<Loading data="Redirecting..." />
