<script>
    import io from "socket.io-client";

    let variable;
    let update = (update) => {
        variable = update;
        console.log(update)
    };
    let socket = io("http://localhost:9000");
    socket.on("test", update);


</script>
<div class="m-40">
    {variable}
</div>
