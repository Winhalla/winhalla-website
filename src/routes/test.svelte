<script>
    import io from "socket.io-client";
    import { apiUrl } from "../utils/config";

    let variable;
    let update = (update) => {
        variable = update;
        console.log(update)
    };
    let socket = io(apiUrl+":9000");
    socket.on("test", update);


</script>
<div class="m-40">
    {variable}
</div>
