<script>
    export let socket;
    export let userPlayer;
    export let id;
    export let adError;
    export let info;
    export let finished;
    export let page;

    let started;
    let videoSeen;
    $: if (videoSeen > 0) {
        console.log("nn");
        try {
            socket.emit("advideo", videoSeen === "1" ? {
                state: 1,
                steamId: userPlayer.steamId,
                room: id,
                goal: "earnMoreFFA"
            } : { state: videoSeen, steamId: userPlayer.steamId });
        } catch (e) {
            console.log(e);
        }
    }

    socket.on("advideo", (e) => {
        if (!started) return;
        if (e.code === "error") {
            console.log(e.message);
            adError = e.message;
            finished = true;
            started = false;
        } else if (e.code === "success") {
            info = e.message;
            userPlayer.adsWatched++;
            userPlayer.multiplier += userPlayer.adsWatched === 1 ? 200 : 300;
            finished = true;
            started = false;
        }
    });


</script>

<style>
    button {
        background-color: #3de488;
    }

    button:disabled {
        @apply bg-disabled text-white;
        padding-left: 1rem;
        padding-right: 1rem;
        box-shadow: none;
        cursor: auto;
    }

    .FfaWatchAd {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
</style>


<button disabled={userPlayer.adsWatched >= 8} class="button button-brand lg:mr-8 mt-2
                            lg:mt-0 mb-5
                            lg:mb-0  text-background" class:FfaWatchAd={page === "FfaWatchAd"}
        style=""
        onclick="playAd()"
        on:click={() => started = true}>{userPlayer.adsWatched < 8 ? "Play ad" : "Maximum ads reached"}
</button>

<input hidden bind:value={videoSeen} id={started ? 'transfer' : Math.random() * 1000} />

<div>
    <script data-playerPro="current">
        function playAd() {
            const init = (api) => {
                if (api) {

                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = 1;
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                        //api.setAdVolume(1);
                        document.body.onblur = function() {
                            //api.pauseAd();
                        };
                        document.body.onfocus = function() {
                            //api.resumeAd();
                        };
                    });
                    api.on("AdVideoFirstQuartile", () => {
                        document.getElementById("transfer").value = 2;
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdVideoMidpoint", () => {
                        document.getElementById("transfer").value = 3;
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdVideoThirdQuartile", () => {
                        document.getElementById("transfer").value = 4;
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = 5;
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                        document.body.onblur = null;
                        document.body.onfocus = null;
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\"current\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
    </script>
</div>
