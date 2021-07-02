<script>
    import { apiUrl } from "../utils/config";
</script>

<div class="h-full w-full flex items-center justify-center">
    <div class="mt-48 flex flex-col">
        <h2 class="text-6xl text-center  mb-10">LOGIN</h2>
        <a
            class="button-brand button" style="display: flex !important;"
            href="{apiUrl}/auth/login/steam">
            <svg class="-ml-4 mr-3 w-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="steam" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path fill="currentColor"
                      d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"
                      class=""></path>
            </svg>
            Login with Steam
        </a>
        <p class="font-ultra-light text-center text-lg mt-1">
            Only for pc players
        </p>

        <a
            class="button-brand-alternative button my-8" style="display: flex !important;"
            href="{apiUrl}/auth/login/google">
            <svg class="-ml-4 mr-3 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      class=""></path>
            </svg>
            <p>Login with Google</p>
        </a>

        <a
            class="button-brand-alternative button" style="display: flex !important;"
            href="{apiUrl}/auth/login/email">
            <svg class="-ml-4 mr-3 w-6" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            >
                <path fill="currentColor"
                      d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                      class=""></path>
            </svg>
            <p>Login with Email</p>
        </a>
    </div>

</div>