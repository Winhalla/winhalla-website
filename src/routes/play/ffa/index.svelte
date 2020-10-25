<script>
    import { onMount } from "svelte";
    import { callApi } from "../../../utils/api";
    import { goto } from "@sapper/app";
    import { apiUrl } from "../../../utils/config";
    import Loading from "../../../components/Loading.svelte";

    onMount(async () => {

        const id = await callApi("get", "/lobby");
        console.log("id", id);
        if (!id) {
            goto(`${apiUrl}/auth/login`);
        }

        goto(`/play/ffa/${id}`);
    });
</script>

<Loading />