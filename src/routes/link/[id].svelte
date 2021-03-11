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

    export let link;
    onMount(() => {
        document.cookie = cookie.serialize("affiliateLinkId", link, { maxAge: 15552000, sameSite: "lax", path: "/" });
        goto(apiUrl + "/auth/login");
    });


</script>
<svelte:head>
    <title>Redirecting...</title>
</svelte:head>
<Loading data="Redirecting..." />
