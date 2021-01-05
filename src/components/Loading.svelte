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
    export let type
</script>
<div class:xl:mt-40={type==="inline"} class:xl:ml-100={type==="inline"} class:h-screen-90={!type} class="bg-fixed bg-no-repeat flex items-center justify-center">
    <div class="pb-20">
        <div class="loader"></div>
        {#if data}
            <h2 class="text-center text-3xl font-bold pt-4">{data}</h2>
        {:else}
            <h2 class="text-center text-3xl font-bold pt-4">Loading...</h2>
        {/if}
    </div>
</div>