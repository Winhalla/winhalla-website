<script>
    import { onMount } from "svelte";
    import { getUser } from "../utils/api";
    import { goto } from "@sapper/app";

    //export let segment;

    let isApiDown = false;

    onMount(async () => {
        try {
            const testError = await getUser();
            if(!(testError instanceof Error)){
                return goto("/")
            }
            isApiDown = true

        } catch (e) {
            isApiDown = true;
        }
    });
</script>


{#if isApiDown}
    <div class="flex items-center justify-center h-screen-60 px-4 w-full lg:mt-10 mt-8 lg:mx-0">
        <div class="text-center">
            <p class="text-6xl lg:text-8xl">Our services are down</p><br>
            <p class="text-3xl lg:text-4xl text-mid-light">We will be back as soon as possible !</p>
        </div>
    </div>
{/if}
