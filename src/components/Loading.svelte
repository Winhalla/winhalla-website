<style>
    .loader {
        border: 12px solid transparent;
        border-radius: 50%;
        border-top: 12px solid #3d72e4;
        width: 150px;
        height: 150px;
        -webkit-animation: spin 0.6s linear infinite; /* Safari */
        animation: spin 0.6s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<script>
    export let data;
    export let duration = 500;
    import { fade } from "svelte/transition";
</script>
<div out:fade={{duration}}
     class="fixed z-50 bg-background absolute top-10 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90">
    <div class="pb-20 bg-background w-screenw-99 h-screen-99">
        <div class="mx-auto">
            <div class="loader mt-15/100 mx-auto"></div>
            {#if data}
                <h2 class="text-center text-3xl font-bold pt-4">{data}</h2>
            {:else}
                <h2 class="text-center text-3xl font-bold pt-4">Loading...</h2>
            {/if}
        </div>
    </div>
</div>