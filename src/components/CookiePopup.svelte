<script>
    import cookie from "cookie";
    import { getCookie } from "../utils/getCookie";
    import { onMount } from "svelte";

    let isPopupOpened;
    let areSettingsOpened;
    let acceptedCookieList = [];

    onMount(() => {
        isPopupOpened = !getCookie("hideCookiePopup");
    });


    let settings = {
        necessary: {
            description: "Necessary cookies make the website usable by enabling user authentication and other useful features. The website may not function properly without these cookies.",
            opened: false,
            accepted: true,
            urls: []
        },
        analytics: {
            description: "Analytic cookies help the website owners to understand how users interact with the website by collecting and reporting information anonymously.",
            opened: false,
            accepted: false,
            urls: ["/www\\.googletagmanager\\.com/"]
        },
        "ads personalization": {
            description: "These cookies are used to display ads that are relevant and engaging for the user.",
            opened: false,
            accepted: false,
            urls: []
        }
    };

    function handleClose(accepted) {
        let acceptedCookieCount = 0;

        if (accepted === true) {
            //Unblock all cookies
            window.yett.unblock();
            setNecessaryCookies(true);

        } else if (accepted instanceof Array) {
            //Unblock only the accepted cookies

            for (const [key, value] of Object.entries(settings)) {
                console.log(key, value);

                if (value.accepted) {
                    acceptedCookieList = acceptedCookieList.concat(value.urls);
                    acceptedCookieCount++;
                }
            }

            if (acceptedCookieCount === Object.keys(settings).length) {
                //Avoid setting array to acceptedCookieList if all checkbox are checked
                window.yett.unblock();
                setNecessaryCookies(true);

            } else {
                if (settings.necessary.accepted) setNecessaryCookies();
                window.yett.unblock(acceptedCookieList);
            }
        }

        isPopupOpened = false;
    }

    function setNecessaryCookies(allAccepted) {
        document.cookie = cookie.serialize(
            "hideCookiePopup",
            "true",
            {
                maxAge: 2147483647,
                sameSite: "lax",
                path: "/"
            }
        );
        const cookieValue = allAccepted ? true : JSON.stringify(acceptedCookieList);

        document.cookie = cookie.serialize(
            "acceptedCookieList",
            cookieValue,
            {
                maxAge: 2147483647,
                sameSite: "lax",
                path: "/"
            }
        );
    }

    function handleSettingsButton() {
        areSettingsOpened = !areSettingsOpened;
    }
</script>

<style>
</style>

{#if isPopupOpened}
    <!--Dark background-->
    <div class="fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"
         style="z-index: 100">

        <div
            class="max-w-xl    mx-5 my-1 md:mx-0  px-8 pt-10 pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto"
            style="max-height: 95vh;">
            {#if !areSettingsOpened}
                <div>
                    <h1 class="text-5xl md:text-6xl text-center text-font">This website uses cookies</h1>
                    <p class="mt-7    text-2xl md:text-3xl text-mid-light  leading-8">We and our partners use cookies to
                        authenticate users, to add functionalities to the website, to measure audience, and to
                        personalize ads.</p>
                    <p class="mt-4    text-default md:text-2xl text-light    leading-7">Note that if you don't consent
                        to the use of
                        every cookies, you might experience some bugs, or you may not be able to have access to all the
                        features of the website.</p>

                    <!--Mobile buttons-->
                    <div class="md:hidden    mt-8     flex flex-col items-center">
                        <button class="w-45 button button-brand" on:click={() => handleClose()}
                                style="background-color: #3de488">ACCEPT ALL
                        </button>
                        <button class="mt-4    w-45 md:w-auto    button button-brand    text-font"
                                on:click={() => handleSettingsButton()}>SETTINGS
                        </button>
                        <button class="mt-4    w-45 button button-brand    text-font">REJECT ALL</button>

                    </div>

                    <!--Desktop buttons-->
                    <div class="hidden  mt-8    md:flex justify-between">
                        <button class="/w-40 button button-brand    text-font" on:click={() => handleClose()}>REJECT
                            ALL
                        </button>
                        <button class="/w-40 button button-brand    text-font"
                                on:click={() => handleSettingsButton()}>SETTINGS
                        </button>
                        <button class="/w-40 button button-brand" on:click={() => handleClose(true)}
                                style="background-color: #3de488">ACCEPT ALL
                        </button>
                    </div>
                </div>
            {:else}
                <div>
                    <h1 class="text-6xl text-center text-font">This website uses cookies</h1>
                    <div class="mt-7 px-1 md:px-6">
                        {#each Object.entries(settings) as [key, value]}
                            <div class="w-full pl-1 md:pl-2 py-1 text-2xl text-font flex justify-between items-center">

                                <!--Checkbox-->
                                <button disabled={key === 'necessary'}
                                        class="{key !== 'necessary' ? 'hover:text-primary' : ''} p-1    focus:outline-none"
                                        on:click={() => settings[key].accepted = !value.accepted}>
                                    {#if value.accepted}
                                        <svg
                                            class="w-6 fill-current checkbox-active"
                                            viewBox="0 0 27 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                    24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42
                                                    1.807-1.807 5.422 5.422
                                                    13.68-13.68 1.811 1.803-15.491
                                                    15.491z" />
                                        </svg>
                                    {:else}
                                        <svg
                                            class="fill-current w-6 "
                                            viewBox="0 0 25 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m24
                                                    24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z" />
                                        </svg>
                                    {/if}
                                </button>

                                <!--Text + arrow-->
                                <div class="w-full">
                                    <button
                                        class="w-full flex justify-between items-center  ml-2 p-2  pr-3 md:pr-6  focus:outline-none"
                                        on:click={() => settings[key].opened = !settings[key].opened}>

                                        {key}

                                        {#if value.opened}
                                            <svg class="w-4 h-6 fill-current"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z" />
                                            </svg>
                                        {:else}
                                            <svg
                                                class="w-4 h-6 fill-current"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
                                            </svg>
                                        {/if}
                                    </button>
                                </div>

                            </div>

                            <!--Cookie description-->
                            {#if value.opened}
                                <div class="ml-14 mb-5  text-default text-light">
                                    <p>{value.description}</p>
                                </div>
                            {/if}
                        {/each}
                    </div>

                    <!--Settings page buttons-->
                    <div class="mt-8     flex flex-col items-center md:flex-row md:justify-between md:items-start">
                        <button class="w-45    button button-brand    text-font"
                                on:click={() => handleSettingsButton()}>
                            CLOSE SETTINGS
                        </button>
                        <button class="mt-3 md:mt-0  w-45    button button-brand"
                                on:click={() => handleClose([])}
                                style="background-color: #3de488">
                            SAVE
                        </button>
                    </div>
                </div>
            {/if}

        </div>

    </div>
{/if}
