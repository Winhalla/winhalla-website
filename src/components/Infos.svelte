<script>
    import {fly} from "svelte/transition"

    export let pushError;
    export let message;
</script>
<div class="z-20 absolute right-0 top-5 lg:top-30 mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary"
     transition:fly={{ x:200, duration: 400 }}>
    <h3 class="text-primary text-3xl">{message}</h3>
    <p class="text-white text-2xl">{pushError}</p>
</div>