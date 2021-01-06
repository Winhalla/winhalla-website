<script context=module>
    export async function preload({ params, query }) {
        let id = params.id;
        this.redirect(302,`create-account?link=https://winhalla.appspot.com/link/${id}`)
    }
</script>
<svelte:head>
    <title>Redirecting...</title>
</svelte:head>
Redirecting to <a href="https://winhalla.appspot.com/create-account" class="text-primary underline">https://winhalla.app.com/create-account</a>
