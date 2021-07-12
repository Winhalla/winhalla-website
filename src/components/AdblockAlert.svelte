<!--
Component that detects if the adblock popup needs to be shown and if it has been bypassed
-->
<script>
    import { onMount } from "svelte";
    import AdblockAlertStyle from "./AdblockAlertStyle.svelte";
    import axios from "axios";

    export let user = {};
    export let quests = {};

    let unique = {};

    //if component has been destroy rebuild it
    let hasBeenDestroyed;
    $: if (hasBeenDestroyed) {
        //regenerate component cause every {} is unique
        unique = {};
    }

    let adblocker = false;
    onMount(() => {
        //Adblock detector

        setTimeout( async ()=>{
            if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
                try {
                    await axios.get(`https://winhalla.app/ads.txt`)
                } catch (e) {
                    adblocker = true
                }
            }
        },2500)

    });

</script>

{#key unique}
    <AdblockAlertStyle isVisible="{adblocker}" bind:hasBeenDestroyed="{hasBeenDestroyed}" />
{/key}