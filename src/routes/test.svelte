<svelte:head>
    <script async src="http://localhost:3000/adplayerpro.js"></script>

</svelte:head>
<div>

</div>
<div>
    <script data-playerPro="current">
        function playAd() {
            const init = (api) => {
                if (api) {
                    api.on('AdStarted', function () {
                            console.log('AdStarted')
                        }
                    );


                    api.on('AdVideoComplete', function () {
                            console.log('AdVideoComplete')
                        }
                    );
                } else {
                    console.log('blank');
                }
            }
            var s = document.querySelector('script[data-playerPro="current"]');
            s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
        playAd()
    </script>
</div>
