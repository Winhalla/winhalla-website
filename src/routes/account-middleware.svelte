<script>
    import { onMount } from "svelte";
    import cookie from "cookie";
    import { callApi } from "../utils/api";
    import { goto } from "@sapper/app";
    import { counter } from "../components/store";
    import Loading from "../components/Loading.svelte";

    onMount(async () => {
        let cookies = cookie.parse(document.cookie);
        const user = await callApi("get", "/account");
        if (!user) return goto("/play");
        if (!user.user) await callApi("post", "/auth/createAccount?linkId=" + cookies.affiliateLinkId);
        console.log(document.cookie = cookie.serialize("affiliateLinkId", 0, { maxAge: 1 }));
        counter.set({ refresh: true });
        goto("/play");
    });
</script>
<Loading data="Logging in..." />