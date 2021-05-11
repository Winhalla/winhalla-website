
<script>
    import { counter } from "../components/store";

    function click(){
        counter.set({refresh: true})
    }
</script>
<body>
    <button class="button" on:click={click}>Refresh</button>
</body>