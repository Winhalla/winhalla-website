<script>
    import { onMount } from "svelte";
    import { callApi } from "../../../utils/api";
    import { goto } from "@sapper/app";
    import { apiUrl } from "../../../utils/config";
    import Loading from "../../../components/Loading.svelte";

    let error;
    onMount(async () => {
        let id;
        try {
            id = await callApi("get", "/lobby");


        console.log("id", id);
        if (!id) {
            goto(`${apiUrl}/auth/login`);
        }


        goto(`/play/ffa/${id}`);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
                error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
            } else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
                error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account) ";
            }
        }
    });
</script>
{#if error}
    <div class="w-full content-center lg:mt-60 mt-25 ">
        <h2 class="lg:text-4xl text-3xl text-center">{error}</h2>
        <a href="/play"><p class="underline lg:text-3xl text-2xl  text-center text-primary">Go to play page</p></a>
    </div>
{:else}
    <Loading data={"Finding game..."}/>
{/if}
