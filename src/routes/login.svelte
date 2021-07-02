<script>
    import { apiUrl } from "../utils/config";
</script>

<div class="h-full w-full flex items-center justify-center">
    <div class="mt-48 flex flex-col">
        <h2 class="text-6xl text-center  mb-10">LOGIN</h2>
        <a
            class="button-brand button"
            href="{apiUrl}/auth/login/steam">
            Login with Steam
        </a>
        <p class="font-ultra-light text-center text-lg mt-1">
            Only for pc players
        </p>
        <!--        <a
                    class="button-brand-alternative button my-8  flex"
                    href="{apiUrl}/auth/login/google">
                    <svg class="w-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" class=""></path></svg>
                    Login with Google
                </a>-->
        <a
            class="button-brand-alternative button mt-5"
            href="{apiUrl}/auth/login/email">
            Login with Email
        </a>
    </div>

</div>