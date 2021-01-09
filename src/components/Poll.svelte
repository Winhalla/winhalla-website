<script>
    import { callApi } from "../utils/api";

    export let poll = {
        name: "Should we add a 2vs2 game mode ?",
        isMCQ: true,
        options: [
            "Yes", "I don't care", "No"
        ]
    };


    let answer;
    let answered = false;
    let isPollOpen = true;

    function handleClick() {

        isPollOpen = !isPollOpen;

    }

    function handleChoose(number) {
        console.log("test");
        /*if(answer === number) {
            return answer = undefined;
        }*/

        answer = number;
        console.log(answer);
    }

    setInterval(() => {
        if (poll.submitted === true) handleSubmit();
        poll.submitted = false;
    }, 500);

    async function handleSubmit() {
        answered = true;
        await callApi("post", `/pollresponse?answer=${answer}&name=${poll.name}`);
    }
</script>


<div class:pb-4={isPollOpen} class="bg-background rounded-lg border border-primary">
    <button class="flex justify-between cursor-pointer focus:outline-none w-full" on:click={() => handleClick()}>
        <p class:pb-4={!isPollOpen} class="pl-5 pt-5">{poll.name}</p>
        <!--Svg icon-->
        <div class="ml-5 mr-3 mt-6">
            <svg class:hidden={isPollOpen} class="fill-current w-5" style="margin-bottom: 0.14rem;" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z" />
            </svg>
            <svg class:hidden={!isPollOpen} class="fill-current w-5" style="margin-bottom: 0.14rem;" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z" />
            </svg>
        </div>

    </button>

    <div class:hidden={!isPollOpen} class="px-5">
        {#if poll.isMCQ}
            <div class="">
                {#if answered === false}
                    {#each poll.options as option, i}
                        <div on:click={()=>{handleChoose(i)}}
                             class:border-primary={answer === i}
                             class="p-4 bg-variant my-3 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary block flex items-center cursor-pointer">

                            <input class="opacity-0 fixed pointer-events-none w-4 h-4" type="radio" value={option}>

                            {#if answer === i}
                                <svg class="w-4 fill-current text-primary" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
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

                        </div>

                    {/each}
                    <button on:submit={handleSubmit()} class="button button-brand w-24 mt-2 w-full"
                            style="">
                        SUBMIT
                    </button>
                {:else}
                    <p class="text-3xl text-center mx-auto rounded-lg focus:outline-none block text-primary mt-2">Thanks
                        for your
                        answer!</p>
                {/if}
            </div>
        {/if}
    </div>
</div>
