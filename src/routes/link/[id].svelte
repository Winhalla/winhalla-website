<script context="module">
    export async function preload({ params, query }) {

        return { link: params.id };
    }
</script>
<script>
    import { goto } from "@sapper/app";
    import { onMount } from "svelte";
    import cookie from "cookie";
    import { apiUrl } from "../../utils/config";
    import Loading from "../../components/Loading.svelte";
    import { callApi } from "../../utils/api";

    export let link;
    onMount(async () => {
        document.cookie = cookie.serialize("affiliateLinkId", link, { maxAge: 15552000, sameSite: "lax", path: "/" });
        await callApi("post", "/linkCheckpoint/"+link)
        goto("/");
    });


</script>
<svelte:head>
    <title>Redirecting...</title>
    <meta name="robots" content="noindex">
</svelte:head>
<Loading data="Redirecting..." />
