<script>
    import Tailwindcss from "../components/Tailwindcss.svelte";
    import Nav from "../components/Navigation/Nav.svelte";

    //export let segment;
</script>

<style>
    .font {
        font-family: "Bebas Neue", sans-serif;
    }

    main {
        margin-top: calc(4rem - 2px);
        min-height: calc(100vh - calc(4rem - 2px));
    }

    body {
        margin: 0;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0 0 0.5em 0;
        font-weight: 400;
        line-height: 1.2;
    }

    h1 {
        font-size: 2em;
    }

    a {
        color: inherit;
    }

    code {
        font-family: menlo, inconsolata, monospace;
        font-size: calc(1em - 2px);
        color: #555;
        background-color: #f0f0f0;
        padding: 0.2em 0.4em;
        border-radius: 2px;
    }

    @media (min-width: 400px) {
        body {
            font-size: 16px;
        }
    }
</style>

<Tailwindcss />

<svelte:head>
    <!-- <link rel="stylesheet" href="../../fontisto-master/css/fontisto/fontisto.min.css" /> -->
    <!--Adsense-->
</svelte:head>

<div class="font w-full bg-background min-h-screen h-full flex flex-col">
    <Nav />

    <main class="text-font text-default min-h-screen h-full">
        <!--Main-->
        <slot class="flex-grow bg-background block-grow" />
    </main>

    <!--Footer-->
    <div
        class="w-full pt-12 pb-6
             bg-variant text-font text-default flex flex-col items-center">
        <div>
            <div class="flex flex-col items-center md:flex-row md:items-start justify-center">
                <div>
                    <div class="md:mr-14 lg:mr-34 text-4xl md:max-w-60">
                        Play
                        <b class="text-accent font-normal">Brawlhalla</b>

                        <br class="sm:hidden lg:block"/>
                        Earn
                        <b class="text-accent font-normal">rewards</b>
                    </div>
                </div>

                <div class="lg:flex justify-center mt-8 md:mt-0">
                    <div class="flex">
                        <div class="mr-8">
                            <h3 class="text-primary">Legal</h3>
                            <a
                                href="/privacy"
                                class="block hover:text-shadow-link-hover">Privacy</a>
                            <a
                                href="/legal"
                                class="block hover:text-shadow-link-hover">Legal notice</a>
                        </div>
                        <div class="ml-8 lg:mx-8">
                            <h3 class="text-primary">Info</h3>
                            <a href="/help" class="block hover:text-shadow-link-hover">How
                                does it work</a>
                            <a
                                href="/terms"
                                class="block hover:text-shadow-link-hover">Terms of use</a>
                        </div>
                    </div>
                    <div class="mt-8 lg:mt-0 lg:ml-8">
                        <h3 class="text-primary">Company</h3>
                        <a
                            href="/contact"
                            class="block hover:text-shadow-link-hover">Contact us</a>
                        <a
                            href="/about"
                            class="block hover:text-shadow-link-hover">About</a>
                    </div>
                </div>
            </div>
            <div class="mt-10 flex justify-between items-center w-full">
                <div class="flex items-end">
                    <div class="text-logo">
                        <a class="logo leading-0" href="/"> WINHALLA </a>
                    </div>
                    <p class="text-lg ml-3" style="padding-bottom: 0.2rem">© 2020</p>
                </div>

                <div class="flex items-center">
                    <a href="">
                        <svg class="w-5 fill-current" viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z" />
                        </svg>
                    </a>
                    <a href="">
                        <svg class="ml-4 w-6 fill-current" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m29.55 2.85c-.841 1.224-1.848 2.26-3.004 3.106l-.036.025q.018.262.018.787c-.004 1.736-.264 3.41-.745 4.987l.032-.122c-.534 1.773-1.272 3.32-2.206 4.724l.04-.065c-.989 1.509-2.132 2.808-3.435 3.927l-.024.02c-1.372 1.153-2.978 2.083-4.73 2.704l-.108.033c-1.765.648-3.803 1.022-5.928 1.022-.045 0-.09 0-.134 0h.007c-.038 0-.082 0-.127 0-3.41 0-6.584-1.015-9.234-2.76l.063.039c.419.048.904.075 1.396.075h.07-.004c.037 0 .082.001.126.001 2.807 0 5.386-.975 7.417-2.606l-.023.018c-2.639-.05-4.861-1.777-5.65-4.157l-.012-.043c.342.057.738.091 1.141.094h.003c.567 0 1.116-.075 1.637-.216l-.044.01c-1.412-.284-2.615-1.034-3.47-2.08l-.008-.011c-.858-1.011-1.379-2.331-1.379-3.773 0-.028 0-.056.001-.084v.004-.075c.788.452 1.726.732 2.727.768h.011c-.822-.553-1.487-1.279-1.953-2.129l-.016-.031c-.46-.835-.731-1.83-.731-2.889 0-1.126.306-2.18.84-3.084l-.015.028c1.5 1.839 3.337 3.341 5.425 4.427l.095.045c2.022 1.067 4.402 1.743 6.927 1.864l.038.001c-.093-.415-.147-.892-.149-1.382v-.001c.004-3.345 2.717-6.055 6.062-6.055 1.74 0 3.309.733 4.415 1.908l.003.003c1.448-.284 2.735-.792 3.893-1.492l-.053.03c-.455 1.431-1.4 2.596-2.635 3.323l-.028.015c1.294-.148 2.475-.479 3.569-.967l-.077.031z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>
