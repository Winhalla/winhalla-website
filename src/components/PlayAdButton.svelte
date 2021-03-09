<script>
    import { counter } from "./store";

    export let waitingAdAccept;
    export let socket;
    export let userPlayer;
    export let id;
    export let adError;
    export let info;
    export let finished;
    export let page;
    export let goal = "earnMoreFFA";
    export let collect;
    export let waitingAd;
    export let data;
    export let color = "green";
    //TODO: reste une erreur cheloue "userPlayer is undefined"
    if (goal === "earnMoreQuests") {
        counter.subscribe(async (value) => {
            userPlayer = await value.content;
            userPlayer = userPlayer.user;
        });

    }
    let started;
    let videoSeen;
    $: if (videoSeen > 0) {
        console.log("nn");
        try {
            socket.emit("advideo", videoSeen === "1" ? {
                state: 1,
                steamId: userPlayer.steamId,
                room: id,
                goal
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
        } else if (e.code === "success" && goal === "earnMoreFFA") {
            info = e.message;
            userPlayer.adsWatched++;
            userPlayer.multiplier += userPlayer.adsWatched === 1 ? 200 : 300;
            finished = true;
            started = false;
        } else if (e.code === "success" && goal === "earnMoreQuests") {
            info = e.message;
            collect(waitingAd.type, waitingAd.index, false);
            setTimeout(() => {
                info = undefined;
            }, 5000);

        }
    });

</script>

<style>
    .button-green {
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

{#if goal === "earnMoreFFA"}
    <button disabled={userPlayer.adsWatched >= 8} class="button button-brand lg:mr-8 mt-2
                            lg:mt-0 mb-5
                            lg:mb-0  text-background" class:button-green={color==="green"}
            class:FfaWatchAd={page === "FfaWatchAd"}
            style=""
            onclick="playAd()"
            on:click={() => started = true}>{userPlayer.adsWatched < 8 ? "Play ad" : "Maximum ads reached"}
    </button>
{:else}
    <button class="button button-brand" class:button-green={color==="green"} class:FfaWatchAd={page === "FfaWatchAd"}
            style=""
            onclick="playAd()"
            on:click={() => started = true}>Play Ad
    </button>
{/if}

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
