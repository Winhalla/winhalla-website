<script>
    import {goToNextGuide, goToPreviousGuide} from "./guideStore";

    export let title;
    export let previous = true;
</script>

<div class="px-9 pt-8 pb-6 bg-background border-2 border-primary rounded-xl  max-w-max">
    <h3 class="text-5xl">{title}</h3>
    <div class="mt-5">
        <slot></slot>

    </div>
    <div class="flex justify-between  w-full">
        <div>
            {#if previous}
                <button class="mt-8  button button-brand-alternative"  on:click={goToPreviousGuide}>
                    Previous
                </button>
            {/if}
        </div>


        <button class="mt-8  button button-brand"  on:click={goToNextGuide}>
            Next
        </button>
    </div>

</div>
