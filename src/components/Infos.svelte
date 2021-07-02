<script>
    import {fly} from "svelte/transition"

    export let pushError;
    export let message;
</script>
<div class="z-20 fixed right-0 top-30 lg:top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary"
     transition:fly={{ y:-200, duration: 400 }}>
    <h3 class="text-primary text-3xl">{message}</h3>
    <p class="text-white text-2xl">{pushError}</p>
</div>