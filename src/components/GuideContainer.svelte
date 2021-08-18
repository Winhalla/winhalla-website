<script>
    import {goToNextGuide, goToPreviousGuide} from "./guideStore";
    import {onMount} from "svelte";

    export let title;
    export let previous = true;
    export let scroll;
    export let scrollMd;
    export let scrollLg;

    let scrollY;
    onMount(() => {
        if (document.body.scrollWidth < 624) {
            window.scrollTo({top: scroll, behavior: "smooth"});
        } else if (document.body.scrollWidth < 1234) {
            window.scrollTo({top: scrollMd, behavior: "smooth"});
        } else if (document.body.scrollHeight > 1500) {
            window.scrollTo({top: scrollLg, behavior: "smooth"});
        }
    })
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="px-9 pt-8 pb-6 bg-background border-2 border-primary rounded-xl  max-w-max">
    <h3 class="text-4xl md:text-5xl">{title}</h3>
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
