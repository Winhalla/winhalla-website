<script>
    import {apiUrl} from "../utils/config";
</script>
<svelte:head>
    <title>Login | Winhalla - Play Brawlhalla, Earn rewards.</title>
</svelte:head>
<div>
    <div class="text-5xl lg:text-6xl">Login</div>
    <a href="{apiUrl}/auth/login/google" class="button button-brand">Login with Google</a>
</div>
