<script>
    import { clickOutside } from "../../utils/clickOutside";
    import cookie from "cookie";
    import { onMount } from "svelte";

    export let data;
    export let isPreviewing;
    let isDropdownOpen;
    onMount(() => {
        let length = data.length;
        let cookies = cookie.parse(document.cookie);
        if (length > parseInt(cookies.infosNb) || !cookies.infosNb) {
            isDropdownOpen = true;
        }
        document.cookie = cookie.serialize(
            "infosNb",
            data.length,
            { maxAge: 15552000, sameSite: "lax", path: "/" }
        );
    })

    if (isPreviewing) {
        isDropdownOpen = isPreviewing;
    }
    const handleClick = () => {
        isDropdownOpen = !isDropdownOpen;
    };

</script>
<style>
    .dropdown {
        top: 3.8rem;
    }

    .info {
        border-radius: 10px;
        @apply flex justify-between px-4 py-3 mt-2 mb-1 relative overflow-hidden w-full;
    }
</style>
{#if data !== "network"}
    {#if data?.length > 0}
        <div class="relative">
            <div class="flex items-center h-full mr-4 lg:m-0">
                <button
                    class="focus:outline-none"
                    use:clickOutside
                    on:click_outside={() =>{if(!isPreviewing)isDropdownOpen = false}}
                    on:click={() => handleClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 lg:w-8 mr-2 lg:mr-4 text-legendary hover:opacity-80" class:opacity-60={isDropdownOpen}
                         viewBox="0 0 576 512">
                        <path fill="currentColor"
                              d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                    </svg>
                </button>
            </div>
            <div
                class:hidden={!isDropdownOpen}
                class="pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute
            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92
            border border-legendary">
                <div>

                    {#each data as information}
                        <div
                            class="card info flex items-center">
                            <div class="progress-container">
                                <p class="ml-2 mr-6 lg:mr-12 text-2xl">
                                    {information.name}
                                </p>
                                <p
                                    class="ml-2 mr-6 lg:mr-12 text-light
                                            text-lg">
                                    {information.description}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

    {/if}
{/if}