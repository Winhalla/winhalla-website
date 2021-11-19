<script>
    export let isScrolling
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
    <!--{#if user}
        <div class="py-1 bg-primary w-full flex  items-center lg:text-xl text-white  relative   gradient">
            <p class="text-center w-full text-3xl">
                &lt;!&ndash;<b class="text-white mr-2 font-normal text-3xl">EVENT:</b>&ndash;&gt;

            </p>
            <button class="p-1 absolute right-0" on:click={() => isEventBannerOpen = false}>
                <svg
                    class="w-5 h-5 fill-current "
                    viewBox="0 0 28 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m24 2.4-2.4-2.4-9.6
                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6
                                            2.4 2.4 9.6-9.6 9.6 9.6
                                            2.4-2.4-9.6-9.6z" />
                </svg>
            </button>

        </div>
    {/if}-->
    <nav
            class:border-primary={isScrolling}
            class:border-b-2={isScrolling}
            class="shadow-link-hover bg-background lg:flex items-center text-font
        w-full transition duration-200 border-b border-transparent">
        <div
                class="w-full lg:w-auto flex justify-between items-center py-4
            relative">
            <div class="pl-7 lg:pl-24 lg:pr-34">
                <!--LOGO-->
                <a class="" href="/">
                    <div class="relative">
                        <svg class="fill-current w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.1 152.11">
                            <g id="Calque_2" data-name="Calque 2">
                                <g id="Calque_1-2" data-name="Calque 1">
                                    <polygon
                                            points="70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"/>
                                    <rect x="97.54" y="24" width="16.38" height="104.25"/>
                                    <path
                                            d="M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"/>
                                    <path
                                            d="M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"/>
                                    <polygon
                                            points="354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"/>
                                    <polygon
                                            points="405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"/>
                                </g>
                            </g>
                        </svg>
                        <!--<span class="absolute -top-1 -right-6  text-legendary">Beta</span>-->
                    </div>

                </a>
            </div>
        </div>
    </nav>
</div>
