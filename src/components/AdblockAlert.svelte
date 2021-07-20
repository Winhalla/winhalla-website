<!--
Component that detects if the adblock popup needs to be shown and if it has been bypassed
-->
<script>
    import { onMount } from "svelte";
    import AdblockAlertStyle from "./AdblockAlertStyle.svelte";

    /*export let user = {};
    export let quests = {};*/

    let unique = {};

    //if component has been destroy rebuild it
    let hasBeenDestroyed;
    $: if (hasBeenDestroyed) {
        //regenerate component cause every {} is unique
        unique = {};
    }

    let adblocker = false;
    /*onMount(() => {
        //Adblock detector
        setTimeout(()=>{
            if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
                if (!window.hasAdblockerDisabled) {
                    //Is blocking ads
                    adblocker = true;
                }
            }
        },5000)

    });*/
</script>

<svelte:head>
    <!--<script src="/ad-blocker.js" type="text/javascript"></script>-->
</svelte:head>

{#key unique}
    <AdblockAlertStyle isVisible="{adblocker}" bind:hasBeenDestroyed="{hasBeenDestroyed}" />
{/key}