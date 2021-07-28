<script>
    import {fade, fly} from "svelte/transition"
    import {goto} from "@sapper/app";

    let isSearchOpen = true;

    function handleSearchPopup() {
        isSearchOpen = !isSearchOpen;
    }
</script>

<button class="block" on:click={handleSearchPopup}>
    <svg class="fill-current text-font w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m22.241 24-7.414-7.414c-1.559 1.169-3.523 1.875-5.652 1.885h-.002c-.032 0-.07.001-.108.001-5.006 0-9.065-4.058-9.065-9.065 0-.038 0-.076.001-.114v.006c0-5.135 4.163-9.298 9.298-9.298s9.298 4.163 9.298 9.298c-.031 2.129-.733 4.088-1.904 5.682l.019-.027 7.414 7.414zm-12.942-21.487c-3.72.016-6.73 3.035-6.73 6.758 0 3.732 3.025 6.758 6.758 6.758s6.758-3.025 6.758-6.758c0-1.866-.756-3.555-1.979-4.778-1.223-1.223-2.912-1.979-4.778-1.979-.01 0-.02 0-.03 0h.002z"/>
    </svg>
</button>

{#if isSearchOpen === true}
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center "
         style="z-index: 100"
         in:fade={{duration: 200}}
         out:fade={{duration: 350}}>

        <div
                class=" w-full max-w-xl    mx-5 my-1 md:mx-0  p-10    bg-variant   border-2 border-primary    rounded-xl    overflow-y-scroll md:overflow-y-auto"
                style="max-height: 95vh;"
                transition:fly={{ y: 300, duration: 350 }}>

            <div>
                <h3 class="ml-1 mb-2 text-xl  text-mid-light">Search for a player</h3>
                <form role="search">
                <input class="w-full text-2xl text-font bg-background py-4 px-4 rounded-lg  focus:outline-none"
                       placeholder="Type the exact username" type="text" on:submit={(e) => goto(`/profile/${e.data}`)}>
                </form>
                <div class="mt-8">
                    <p class="ml-1 mb-1  text-mid-light">Recent players:</p>

                    <div class="flex flex-wrap">
                        <a href="" class="  rounded-lg px-6 py-3 bg-background">
                            23Felons23
                        </a>
                        <a href="" class="ml-5 rounded-lg px-6 py-3 bg-background">
                            porobolo
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
{/if}


