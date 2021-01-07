<script>
    import {callApi} from "../utils/api";

    export let poll = {
        name: "Should we add a 2vs2 game mode ?",
        isMCQ: true,
        options: [
            "Yes", "I don't care", "No"
        ]
    };


    let answer;
    let answered = false;

    function handleChoose(number) {
        console.log("test")
        /*if(answer === number) {
            return answer = undefined;
        }*/

        answer = number;
        console.log(answer)
    }

    setInterval(() => {
        if (poll.submitted === true) handleSubmit()
        poll.submitted = false
    }, 500)

    async function handleSubmit() {
        answered = true
        //await callApi("post",`/pollresponse?answer=${answer}&name=${poll.name}`)

    }
</script>

<style>

</style>

<div class="text-default bg-background px-6 border-b-2 border-l-2 border-r-2 border-background text-font mb-2px mx-2px /py-8 flex flex-col items-center justify-center gxl:w-1/3 g2xl:w-1/4 poll-container rounded-b-lg">
    <!--
    <p class="text-3xl mb-2 text-center px-4  md:px-0 md:text-left">{poll.name}</p>

    {#if poll.isMCQ}
        <div class="w-full">
            {#each poll.options as option, i}
                <button
                    class:border-primary={answer === i}
                    class="w-full p-4 bg-variant my-3 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary"
                    on:click={() => handleChoose(i)}>

                    <label class="block flex items-center cursor-pointer">
                        <input class="opacity-0 fixed pointer-events-none w-4 h-4" type="radio" value={option}>

                        {#if answer === i}
                            <svg class="w-4 fill-current text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m0 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-6.624-.008-11.992-5.376-12-11.999zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599v.001zm4 0c0-3.093 2.507-5.6 5.6-5.6s5.6 2.507 5.6 5.6-2.507 5.6-5.6 5.6c-3.093 0-5.6-2.507-5.6-5.6z" />
                            </svg>
                        {:else}
                            <svg class="w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c-.008 6.624-5.376 11.992-11.999 12zm0-21.6c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6c-.006-5.299-4.301-9.594-9.599-9.6h-.001z" />
                            </svg>
                        {/if}


                        <p class="ml-2" style="line-height: 0; margin-bottom: -0.20rem">{option}</p>
                    </label>

                </button>

            {/each}
        </div>

    {:else}
        <div class="py-3 w-full h-42">
            <textarea class="text-background w-full h-full  px-2 py-1 rounded-sm" name={poll.name} id="" ></textarea>
        </div>

    {/if}
    <button on:submit={handleSubmit()} class="button button-brand mt-4 w-full">
        SUBMIT
    </button>
    <div class="flex items-center">
        <p class="text-3xl text-center px-4  md:px-0 md:text-left">{poll.name}</p>
        <button on:submit={handleSubmit()} class="button button-brand w-24 ml-4" style="padding: 0.5rem 0.75rem">
            SUBMIT
        </button>
    </div>-->
    {#if poll.isMCQ}
        <div class="w-full flex justify-around py-4">
            {#if answered === false}
                {#each poll.options as option, i}
                    <div on:click={()=>{handleChoose(i)}}
                         class:border-primary={answer === i}
                         class="p-4 bg-variant my-3 mx-1 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary block flex items-center cursor-pointer"
                    >

                        <input class="opacity-0 fixed pointer-events-none w-4 h-4" type="radio" value={option}>

                        {#if answer === i}
                            <svg class="w-4 fill-current text-primary" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="m0 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-6.624-.008-11.992-5.376-12-11.999zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599v.001zm4 0c0-3.093 2.507-5.6 5.6-5.6s5.6 2.507 5.6 5.6-2.507 5.6-5.6 5.6c-3.093 0-5.6-2.507-5.6-5.6z"/>
                            </svg>
                        {:else}
                            <svg class="w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="m12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c-.008 6.624-5.376 11.992-11.999 12zm0-21.6c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6c-.006-5.299-4.301-9.594-9.599-9.6h-.001z"/>
                            </svg>
                        {/if}


                        <p class="ml-2" style="line-height: 0; margin-bottom: -0.20rem">{option}</p>

                    </div>

                {/each}
            {:else}
                <h2 class="text-3xl p-4 my-3 mx-4 rounded-lg focus:outline-none block flex items-center"> Thanks for your answer!</h2>
            {/if}

        </div>

    {:else}
        <div class="py-3 w-full h-30">
            <textarea class="text-background w-full h-full  px-2 py-1 rounded-sm" name={poll.name} id=""></textarea>
        </div>

    {/if}
</div>