<script>
    import io from "socket.io-client";
    import { apiUrl } from "../utils/config";

    let variable;
    let update = (update) => {
        variable = update;
        console.log(update)
    };
    let socket = io.io(apiUrl);
    socket.on("connection", (status) => {
        console.log(status);
        socket.emit("match connection","ID")
    });
    socket.on('join match',(status)=>{
        console.log(status)
    })
    socket.on("update",(value)=>{
        console.log(value)
    })

    //socket.on("test", update);
</script>

<div class="m-40">{variable}</div>
