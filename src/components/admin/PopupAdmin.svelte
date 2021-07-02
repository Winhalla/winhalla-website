<script>
    import NavAlert from "../Navigation/NavAlert.svelte";
    import Poll from "../Poll.svelte";
    import { fade, fly } from "svelte/transition";
    import { callApi } from "../../utils/api";
    import { config } from "./storeAdmin";
    import { counter } from "../store";

    export let popup;
    export let configs;
    export let newConfig;
    export let otp;
    export let pwd;


    function addField() {
        popup.fields[1].special.push("");
        popup = popup;
    }

    function handlePreview() {
        popup.isPreviewing = !popup.isPreviewing;
        if (popup.thing === "event" && popup.isPreviewing) handleKeyDown();
        else if (popup.thing === "event") counter.set({ content: user, refresh: false });
    }

    let user;

    function handleKeyDown() {
        setTimeout(() => {
            if (popup.thing === "event" && popup.isPreviewing) {

                let unsub = counter.subscribe((v) => {
                    user = v;
                });
                unsub();
                let event = {
                    name: popup.fields[0].value,
                    duration: popup.fields[1].value,
                    percentage: parseInt(popup.fields[2].value) + 100,
                    description: popup.fields[3].value,
                    expiration: 999999999999999 // never expires
                };
                counter.set({ refresh: false, content: user, preview: event });
            }
        }, 1);
    }

    function handleConfirm() {
        if (popup.type === "creation") createThing(popup.thing);
        else if (popup.type === "deletion") delThing(popup.thing);
        popup = {};
    }

    async function delThing(thing) {
        if (thing === "event") {
            let eventIndex = configs.findIndex(e => e.name === "GOLD EVENT");
            let infosIndex = configs.findIndex(e => e.name === "INFOS");
            configs[eventIndex].value = { percentage: 100, expiration: null };
            configs[infosIndex].value.splice(configs[infosIndex].value.findIndex(e => e.type === "event"), 1);
            await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, configs.filter(e => e.name === "GOLD EVENT" || e.name === "INFOS"));
        }

        if (thing === "info") {
            let infosIndex = configs.findIndex(e => e.name === "INFOS");
            configs[infosIndex].value.splice(popup.options.index, 1);
            await callApi("post", `/feltrom/save?otp=${otp}&pwd=${pwd}`, configs.filter(e => e.name === "INFOS"));
            newConfig = configs;
            configs = JSON.stringify(configs);
            configs = JSON.parse(configs);
        }

        if (thing === "poll") {
            await callApi("post", `/feltrom/deletePoll?otp=${otp}&pwd=${pwd}`, { id: popup.options.index });
        }
        config.set({});
    }

    async function createThing(thing) {
        if (thing === "event") {
            let { duration, description, percentage, name } = {
                name: popup.fields[0].value,
                duration: popup.fields[1].value,
                percentage: popup.fields[2].value,
                description: popup.fields[3].value
            };
            await callApi("post", `/feltrom/newEvent?otp=${otp}&pwd=${pwd}`, {
                percentage: parseInt(percentage) + 100,
                expiration: Date.now() + parseFloat(duration) * 86400 * 1000,
                name,
                description
            });
        } else if (thing === "info") {
            let { duration, description, name } = {
                name: popup.fields[0].value,
                duration: popup.fields[1].value,
                description: popup.fields[2].value
            };
            await callApi("post", `/feltrom/createInformation?otp=${otp}&pwd=${pwd}`, {
                type: "info",
                expiration: parseFloat(duration) * 3600 * 1000,
                name,
                description
            });
        } else if (thing === "poll") {
            let { name, isMCQ, options } = {
                name: popup.fields[0].value,
                isMCQ: popup.fields[1].value,
                options: popup.fields[1].special
            };
            await callApi("post", `/feltrom/createPoll?otp=${otp}&pwd=${pwd}`, { name, options, isMCQ });
        }
        config.set({});
    }
</script>
{#if popup.type}
    <div class="fixed flex w-screen h-screen bg-black opacity-90 z-30 left-0 top-0"
         transition:fade={{duration:200}}>
    </div>
    <div class="fixed flex w-screen h-screen z-40 left-0 right-0 top-0"
         transition:fade={{duration:200}}>
        <div class:ml-3={window.innerWidth < 1024} class:mr-3={window.innerWidth < 1024}
             class="w-screen" class:flex={window.innerWidth>1024}>
            <div
                class="justify-evenly lg:mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"
                style="margin-top:15vh">
                <h1 class="text-5xl text-primary">{popup.type === "creation" ? `Create ${popup.thing}` : `Confirm delete ${popup.thing}`}</h1>
                <div>
                    <div class="overflow-auto max-h-screen-35 lg:max-h-screen-50">
                        {#each popup.fields as field,i}
                            {#if field.name === "Multiple choice question ?"}
                                <div class="text-3xl mt-8">
                                    <input type="radio" id="Normal" name="type" value="false"
                                           bind:group={field.value}>
                                    <label for="Normal">Normal</label><br>
                                    <input type="radio" id="MCQ" name="type" value="true"
                                           bind:group={field.value}>
                                    <label for="MCQ">MCQ</label>
                                </div>

                                {#if field.value == "true"}
                                    {#each popup.fields[1].special as option,ii}
                                        <div class="my-4">
                                            <h3 class="text-3xl">Option {ii + 1}</h3>

                                            <input class="text-black" bind:value={option} type="text" />
                                            <p></p>
                                        </div>
                                    {/each}
                                    <p></p>
                                    <button class="button button-brand mt-4 ml-2" on:click={addField}>
                                        Add
                                        option
                                    </button>
                                {/if}
                            {:else}
                                <h3 class="text-3xl mt-8">{field.name}</h3>
                                <input type="text" class="text-black rounded" on:keydown={handleKeyDown}
                                       size="{window.innerWidth > 1024 ?40:20}"
                                       placeholder="{field.name}" bind:value={field.value} />

                            {/if}
                            <p></p>
                        {/each}
                    </div>
                    <div class="lg:justify-center w-full lg:flex">
                        <div class="flex">
                            <button class="button button-brand mx-auto mt-8 w-42"
                                    style="background-color:#{popup.type === 'deletion'?'fc1870':'3d72e4'}"
                                    on:click={handleConfirm}>
                                {popup.type === "creation" ? `Create ${popup.thing}` : `Confirm delete ${popup.thing}`}
                            </button>
                        </div>
                        <div class="flex lg:ml-5">
                            <button class="button mx-auto button-brand mt-8 border w-41"
                                    class:border-primary={popup.type !== 'deletion'}
                                    class:border-legendary={popup.type === 'deletion'}
                                    style="background-color: #17171a;padding: -1px"
                                    on:click={()=>popup={}}>
                                Cancel
                            </button>
                        </div>
                        {#if (popup.thing === "poll" || popup.thing === "info" || popup.thing === "event") && popup.type === "creation"}
                            <div class="flex lg:ml-5">
                                <button class="button mx-auto button-brand mt-8 w-41" style="background-color: #ff8f0f"
                                        on:click={handlePreview}>
                                    {popup.isPreviewing ? "Stop" : ""} Preview
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {#if popup.isPreviewing || popup.thing === "event"}
            {#if popup.thing === "poll"}
                <div
                    class="fixed z-50 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
                    transition:fly={{ y:-200, duration: 500 }}>
                    <Poll poll="{{
                            name: popup.fields[0].value,
                            isMCQ: popup.fields[1].value === 'true',
                            options: popup.fields[1].special
                        }}" isPreviewing />
                </div>
            {:else if popup.thing === "info"}
                <div
                    class="fixed z-50 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
                    transition:fly={{ y:-200, duration: 500 }}>
                    <NavAlert
                        data={[{name: popup.fields[0].value, duration: popup.fields[1].value, description: popup.fields[2].value }]}
                        isPreviewing />
                </div>
            {:else if popup.thing === "event"}
                <div
                    class="fixed z-50 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"
                    transition:fly={{ y:-200, duration: 500 }}>

                </div>

            {/if}
        {/if}
    </div>
{/if}