<script>
    export let text;
    export let alternative;
</script>

{#if !alternative}
    <a
        href="/signup"
        class="inline-block py-3 px-11 rounded-sm hover:shadow-button-hover bg-primary">{text}</a>
{:else}
    <a
        href="/login"
        class="inline-block py-3 px-11 rounded-sm hover:shadow-button-alternative-hover bg-variant">{text}</a>
{/if}
