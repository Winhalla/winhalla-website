<svelte:head>
    <script async src="https://cdn.stat-rock.com/player.js"></script>
</svelte:head>
<div>
    <script>
        function init(api) {
            if (api) {
                api.on("AdStarted", function() {
                        console.log("AdStarted");
                    }
                );


                api.on("AdVideoComplete", function() {
                        console.log("AdVideoComplete");
                    }
                );
            } else {
                console.log("blank");
            }
        }
    </script>

    <script data-playerPro="current">(function() {
        var s = document.querySelector("script[data-playerPro=\"current\"]");
        s.removeAttribute("data-playerPro");
        (playerPro = window.playerPro || []).push({
            id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
            after: s,
            init: init
        });
    })();
    </script>
</div>
<button onclick="init()" class="button button-brand">
    Play ad
</button>