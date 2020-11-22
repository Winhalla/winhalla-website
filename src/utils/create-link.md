```html
<script>
    import { callApi } from "../../utils/api.js";
    let error;
    let hint = "";
    let resolved;
    let link = "";
    async function createLink() {
        try {
            resolved = false;
            const createdLink = await callApi("post", "createLink");
            link = createdLink;
            resolved = true;
        } catch (err) {
            error = true;
        }
    }
</script>

Click here to create an invite link for your friends
<button class="button button-brand" on:click={createLink}>CREATE LINK</button>
{#if resolved == true}
<p>Link is <strong class="text-primary font-normal">https://winhalla.appspot.com/link/{link}</strong></p>

{:else if resolved == false}
<p class="text-primary">Loading...</p>
{/if}



{#if error}
    <p>
        Error occured. Most current problem is that you are not authenticated.
    </p>
{/if}




<svelte:head>
    <title>
        Create friend invite link | Winhalla, Play Brawlhalla. Earn rewards.
    </title>
</svelte:head>
```