<script>
    import { onMount } from "svelte";
    import AdblockAlertStyle from "./AdblockAlertStyle.svelte";

    export let user = {};
    export let quests = {};

    let unique = {};

    let hasBeenDestroyed;
    $: if (hasBeenDestroyed) {
        unique = {};
    }
    let adblocker = false;
    onMount(() => {
        //Adblock detector
        setTimeout(() => {
            if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
                if (!window.hasAdblockerDisabled) {
                    //Is blocking ads
                    adblocker = true;
                }
            }
        }, 5000);
    });
</script>

<style>

</style>

<svelte:head>
    <script src="/ad-blocker.js" type="text/javascript"></script>
</svelte:head>

{#key unique}
    <AdblockAlertStyle isVisible="{adblocker}" bind:hasBeenDestroyed="{hasBeenDestroyed}" />
{/key}