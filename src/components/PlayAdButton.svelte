<script>
    import { counter } from "./stores";
    import { fade } from "svelte/transition";

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
    let videoSeen, noAd;
    $: if (typeof videoSeen === "string") {
        console.log(videoSeen);
        if (videoSeen === "noAd") {
            noAd = "No ad is available for now, please try again later.";
            setTimeout(() => noAd = undefined, 2500);
        }
        if (videoSeen === "error") {
            noAd = "An error occurred, please contact us if the error persists";
            setTimeout(() => noAd = undefined, 2500);
        }
        try {
            socket.emit("advideo", videoSeen === "started" ? {
                state: "started",
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
            setTimeout(() => adError = e.message, 500);
            finished = true;
            started = false;
        } else if (e.code === "success" && goal === "earnMoreFFA") {
            setTimeout(() => info = e.message, 1000);
            userPlayer.adsWatched++;
            userPlayer.multiplier += userPlayer.adsWatched === 1 ? 200 : 300;
            finished = true;
            started = false;
        } else if (e.code === "success" && goal === "earnMoreQuests") {
            setTimeout(() => info = e.message, 1000);
            collect(waitingAd.type, waitingAd.index, false);
        }
        setTimeout(() => {
            info = undefined;
            adError = undefined;
        }, 5000);
    });

</script>

<style>

    .button-green {
        background-color: #3de488;
        @apply text-background;
    }

    button:disabled {
        @apply bg-disabled text-white;
        box-shadow: none;
        cursor: not-allowed;
    }

    .FfaWatchAd {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 46%;
        border-width: 10px;
        border-style: solid;
        border-color: #fc1870 transparent transparent transparent;
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
    <button class="button button-brand w-38" class:button-green={color==="green"}
            class:FfaWatchAd={page === "FfaWatchAd"}
            style=""
            onclick="playAd()"
            on:click={() => started = true}>Play Ad
    </button>
{/if}

{#if true}
    <span
        class="tooltip absolute top-30 lg:top-1 lg:right-48 lg:left-auto right-4 left-4 px-6 py-2 bg-legendary text-background rounded text-left flex items-center justify-center" style="z-index: 60"
        transition:fade>No ad is available for now, please try again later.
    </span>
{/if}
<input hidden bind:value={videoSeen} id={started ? 'transfer' : Math.random() * 1000} />

<div>
    <script data-playerPro="current">
        function playAd() {
            const init = (api) => {
                if (api) {
                    document.getElementById("transfer").value = undefined;
                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = "started";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                        if (document.location.hostname === "winhalla.app") api.setAdVolume(1);
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = "finished";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdSkipped", function() {
                        document.getElementById("transfer").value = "finished";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdError", function(message, error) {
                        console.log(message);
                        if (message?.g?.errorCode === 1009) {
                            document.getElementById("transfer").value = "noAd";
                            document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));

                        }
                        document.getElementById("transfer").value = "error";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\"current\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "CIUTML6hCY6U",
                after: s,
                init: init
            });
        }
    </script>
</div>
