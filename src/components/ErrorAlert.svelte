<script>
    import {fly} from "svelte/transition"

    export let pushError;
    export let message;
    export let type;
</script>
{#if type === "createAccount"}
    <div class="px-5 w-full lg:w-auto absolute left-0 lg:left-auto lg:right-0 2xl:right-30 z-20 top-5 lg:top-50 xl:mr-6">
        <div
                class="w-full lg:w-auto h-auto  p-5 bg-background border rounded-lg border-legendary"
                transition:fly={{ x:200, duration: 400 }}>
            <h3 class="text-legendary text-xl">{message}</h3>
            <p class="text-light text-lg">{pushError}</p>
        </div>
    </div>
{:else}
    <div class="z-50 fixed right-0 top-5 lg:top-30 mr-8 lg:mr-6 w-auto h-auto p-5 bg-background border rounded-lg border-legendary"
         transition:fly={{ x:200, duration: 400 }}>
        <h3 class="text-legendary text-xl">{message}</h3>
        <p class="text-light text-lg">{pushError}</p>
    </div>
{/if}