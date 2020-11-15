<script>
    import { onMount } from "svelte";
    import { getUser } from "../utils/api";
    import { goto } from "@sapper/app";

    //export let segment;

    let isApiDown = false;

    onMount(async () => {
        try {
            await getUser();
            goto("/");
        } catch (e) {
            isApiDown = true;
        }
    });
</script>


{#if isApiDown}
    <div class="flex items-center justify-center h-screen-60 w-full mt-24 lg:mt-0 mx-7 lg:mr-0">
        <div class="text-center">
            <p class="text-8xl">Our services are down</p>
            <p class="text-4xl text-mid-light">We will be back as soon as possible !</p>
        </div>
    </div>
{/if}
