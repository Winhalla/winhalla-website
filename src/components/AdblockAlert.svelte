<script>
    import { onMount } from "svelte";

    export let user = {}
    export let quests = {}
    let adblocker = false;
    onMount(() => {
        //Adblock detector
        setTimeout(() => {
            if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
                if (!document.getElementById("vdngZEmaYJWQ")) {
                    //Is blocking ads
                    adblocker = true;
                }
            }
        }, 7000);
    });
</script>
<svelte:head>
    <script src="/ad-blocker.js" type="text/javascript"></script>
</svelte:head>
{#if adblocker}
    <div class="text-legendary">Please disable your adblocker, we use ads revenue to gift you free items :)</div>
{/if}