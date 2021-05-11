<script>
    export let isRefreshing;
    export let refreshMessage;
    export let onRefreshMessage = "Refreshing"
</script>

<style>
    .refresh-button {
        @apply flex px-7 items-center;
    }

    .refresh-button div {
        margin-top: -0.185rem;
    }
    .refresh-button svg {
        @apply fill-current text-font w-5 animate-spin left-4;
    }
</style>

<button class="button button-brand refresh-button focus:outline-none" on:click>
    <div class:hidden={!isRefreshing} class="block">
        <svg viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z" />
        </svg>
    </div>
    <p class:pl-3={isRefreshing} class="pl-3">
        {isRefreshing ? onRefreshMessage : refreshMessage}
    </p>
</button>
