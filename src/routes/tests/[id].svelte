<script>
    import {onMount} from "svelte"
    import {stores} from "@sapper/app"
    const {page} = stores()
    let id
    page.subscribe((value)=>{
        console.log(value.params.id)
        id = value.params.id
    })
    onMount(()=>{
        id = document.location.pathname.split('/')
        id = id[id.length -1]
    })
</script>
<div class="block m-20">
    {#each [1,2,3,4,5,6,7,8,9] as number}
        <a href="/tests/{number}">
            {number}
        </a> <br>
    {/each}
    {id}
    {$page}
</div>