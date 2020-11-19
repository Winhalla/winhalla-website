<script context=module>
    export async function preload({ params, query }) {
        let id = params.id;
        this.redirect(302,`create-account?link=https://winhalla.appspot.com/link/${id}`)
        return { id };
    }
</script>

<script>
   /* export let id;
    import { goto } from "@sapper/app";
    goto(`/create-account?link=https://winhalla.appspot.com/link/`)*/;
</script>
Redirecting to <a href="https://winhalla.appspot.com/create-account">https://winhalla.appspot.com/create-account</a>
