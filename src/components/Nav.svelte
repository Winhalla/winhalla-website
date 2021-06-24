<script>
    export let isScrolling
    import { clickOutside } from "../utils/clickOutside";
    let isNavbarOpen


</script>
<style>
    svg {
        @apply pr-1;
        margin-bottom: 3px;
    }

    .nav-icon {
        margin-bottom: -6px;
    }

    .play {
        width: 1.05rem;
        height: 1.05rem;
    }

    .nav-link-container {
        @apply pr-9 flex items-center;
    }

    .gradient {
        background-image: linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);
        background-size: 300%;
        animation: gradient-animation 4.5s linear infinite;
    }

    @keyframes gradient-animation {

        0% {
            background-position: right;
        }
        100% {
            background-position: left;
        }
    }
</style>

<div class="h-auto w-full fixed z-50">
     <nav
        class:border-primary={isScrolling}
        class:border-b-2={isScrolling}
        class="shadow-link-hover bg-background lg:flex items-center text-font
        w-full transition duration-200 border-b border-transparent">
        <div
            class="w-full lg:w-auto flex justify-between items-center py-4
            relative">
            <div class="pl-5 lg:pl-24 lg:pr-34">
                <!--LOGO-->
                <a class="" href="/">
                    <svg class="fill-current w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.1 152.11">
                        <g id="Calque_2" data-name="Calque 2">
                            <g id="Calque_1-2" data-name="Calque 1">
                                <polygon
                                    points="70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0" />
                                <rect x="97.54" y="24" width="16.38" height="104.25" />
                                <path
                                    d="M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z" />
                                <path
                                    d="M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z" />
                                <polygon
                                    points="354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37" />
                                <polygon
                                    points="405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37" />
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
            <div class="lg:hidden">
                <a href="/#mob-pre-register" class="button button-brand">Pre-register</a>
            </div>
            <div class="pr-4 lg:hidden flex -mt-2">
                <button
                    class="focus:outline-none"
                    use:clickOutside
                    on:click_outside={() => (isNavbarOpen = false)}
                    on:click={() => {
                        isNavbarOpen = !isNavbarOpen;
                    }}>
                    <svg
                        class="w-7 h-7 fill-current nav-icon"
                        viewBox="0 0 28 24"
                        xmlns="http://www.w3.org/2000/svg">
                        {#if !isNavbarOpen}
                            <path
                                d="m2.61 0h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                            <path
                                d="m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                            <path
                                d="m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61
                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441
                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z" />
                        {:else}
                            <path
                                d="m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6
                                9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6
                                2.4-2.4-9.6-9.6z" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
        <div class:hidden={!isNavbarOpen} class="lg:block w-full">
            <div
                class="pb-3 lg:p-0 sm:flex items-center w-full justify-between">
                <div class="ml-7 links text-xl lg:flex">
                    <!--<a
                            class="nav-link-container my-3 lg:hover:text-shadow-link-hover
                            border-l border-primary lg:border-none pl-3"
                            href="/profile">
                        <svg
                                class="fill-current w-5 h-5"
                                viewBox="0 0 32 24"
                                xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="m10 12v8h-4v-8zm6-8v16h-4v-16zm16 18v2h-32v-24h2v22zm-10-14v12h-4v-12zm6-6v18h-4v-18z"/>
                        </svg>
                        PROFILE
                    </a>-->
                    <a
                        class="nav-link-container my-3 mb-6 lg:mb-3
                        lg:hover:text-shadow-link-hover border-l border-primary
                        lg:border-none pl-3"
                        href="/shop"
                        rel="prefetch">
                        <svg
                            class="fill-current play"
                            viewBox="0 0 22 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m14.416 24v-11.098h5.68c.181 0
                                .328.147.328.328v10.114c0
                                .362-.294.656-.656.656zm-12.096 0c-.362
                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181
                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357
                                0-.362.294-.656.656-.656.23 0
                                .432.118.549.296l.002.002c.028.041 1.342 1.92
                                5.15
                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622
                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515
                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391
                                3.583 4.309.749-1.87 2.037-4.252
                                3.74-4.252.741.039 1.388.41
                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0
                                .262-.04.515-.113.753l.005-.018c-.352
                                1.035-1.466 1.823-2.653 2.391 3.472-.872
                                4.675-2.61
                                4.69-2.633.12-.173.318-.286.541-.286.362 0
                                .656.294.656.656 0
                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434
                                2.154-5.345 3.164h6.48c.181 0
                                .328.147.328.328v4.029c0
                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524
                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936
                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315
                                3.791c1.692-.501 3.698-1.389
                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946
                                0-2.103 2.226-2.813 4.21z" />
                        </svg>
                        SHOP
                    </a>
                </div>
                <div class="hidden lg:block">
                    <a href="/#pre-register" class="button button-brand mr-4">Pre-register now</a>
                </div>

            </div>
        </div>

    </nav>
</div>