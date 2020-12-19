<!--

! Tester socket.io

<script>
    import io from "socket.io-client";
    import { apiUrl } from "../utils/config";

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
</div>-->

<script>
    import { counter } from "../components/store.js";

    function incrementCounter() {
        counter.set({"refresh":true})
    }
    function resetCounter() {
        counter.set(1);
    }
</script>

<div>
    <button on:click={resetCounter}>Reset</button>
    <button on:click={incrementCounter}>Update</button>
    {$counter.content}
</div>