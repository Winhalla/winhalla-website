<script>
    import Button from "./Button.svelte";
    let isNavbarOpen;
</script>

<style>
    i {
        @apply pr-1;
        margin-bottom: 3px;
    }

    .nav-link-container {
        @apply pr-9 flex items-center my-3;
    }
</style>

<nav class="lg:flex items-center bg-background text-font w-full">
    <div class="w-full lg:w-auto flex justify-between items-center py-3">
        <div class="logo-container pl-7 lg:pl-24 lg:pr-34 text-logo">
            <a class="logo" href="/" alt="Artemis"> WINHALLA </a>
        </div>
        <div class="pr-6 lg:hidden">
            <button
                on:click={() => {
                    isNavbarOpen = !isNavbarOpen;
                }}>
                <i class="fi fi-nav-icon-a text-lg" />
            </button>
        </div>
    </div>
    <div class:hidden={!isNavbarOpen} class="lg:block w-full">
        <div class="pb-3 lg:p-0 md:flex items-center w-full justify-between">
            <div class="ml-7 links text-xl lg:flex">
                <a
                    class="nav-link-container hover:text-shadow-link-hover border-l border-primary lg:border-none pl-3"
                    href="/profile">
                    <i class="fi fi-bar-chart text-sm" /> PROFILE
                </a>
                <a
                    class="nav-link-container hover:text-shadow-link-hover border-l border-primary lg:border-none pl-3"
                    href="/play">
                    <i class="fi fi-play text-sm" /> PLAY
                </a>
                <a
                    class="nav-link-container hover:text-shadow-link-hover border-l border-primary lg:border-none pl-3"
                    href="/shop">
                    <i class="fi fi-person text-sm" /> SHOP
                </a>
            </div>

            <div class="ml-7 md:mr-7">
                <a class="button-brand button mr-3" href="/signup">
                    CREATE ACCOUNT
                </a>
                <a class="button-brand-alternative button" href="/login"> LOGIN </a>
            </div>
        </div> 
    </div>
    
</nav>
