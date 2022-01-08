<script>
    import {getUser} from "../utils/api";
    import Loading from "../components/Loading.svelte";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";
    import copyText from "../utils/copyText";

    let toolTipOpen = false
</script>
<svelte:head>
    <meta name="robots" content="noindex">
</svelte:head>
<div class="text-4xl flex justify-center items-center flex-col mt-50 pl-12 pr-10">
    {#await getUser()}
        <Loading />
    {:then user}
        <p class="text-5xl lg:text-6xl">Your account transfer id is: </p>
        <div class="lg:flex justify-center">
            <div class="text-background bg-font py-4 px-3 mt-6 lg:mt-14 flex items-center rounded-md">
                <div id="link"
                     class="flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"
                     style="font-family:'Roboto Condensed', sans-serif"><p class="ml-1">{user?.user?._id}</p>
                    <div class="ml-2 h-5 w-5 flex">

                        <div class="w-5 h-5 hover:text-gray-500 cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"
                                 on:click={() => copyText(user?.user?._id, function () {toolTipOpen = true;
                                            setTimeout(() => {
                                                toolTipOpen = false;
                                            }, 3000);
                                         })}
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z"/>
                                <path
                                        d="m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z"/>
                                <path
                                        d="m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"/>
                            </svg>
                        </div>

                    </div>
                </div>
                {#if toolTipOpen}
                    <div class="relative">
                        <span
                                class="tooltip text-xl absolute px-6 py-2 bg-primary rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40"
                                transition:fade={{duration:250}}>
                                Copied!
                        </span>
                    </div>
                {/if}
            </div>
        </div>
    {:catch error}
        <p class="text-legendary">{error.message}</p>
    {/await}
</div>