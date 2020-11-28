<script>
    import { clickOutside } from "../utils/clickOutside";
    let subject;
    let message;
    let isPickerOpen = false;
    let problems = [
        "Problem with the shop",
        "Problem with the FFA gamemode",
        "Sign in/Sign up Problem",
        "Problem with the quests",
        "Other problem (please precise)"
    ];
</script>

<svelte:head>
    <title>How to contact us | Winhalla, Play Brawlhalla. Earn rewards.</title>
</svelte:head>
<div class="lg:block lg:pl-24 lg:mt-12 h-full mb-7">
    <h1 class="text-6xl">How to contact us</h1>
    <br />
    <div class="flex w-full h-auto pr-24 justify-between">
        <div class="w-40% block mb-16 rounded shadow-full bg-variant p-6">
            <h2 class="text-4xl mb-2">BY FORM:</h2>
            <h3 class="text-xl text-accent">Subject:</h3>
            <input
                bind:value={subject}
                class="rounded-sm text-black p-1 focus:outline-none"
                readonly
                size="35"
                use:clickOutside
                on:click={() => (isPickerOpen = !isPickerOpen)}
                on:click_outside={() => (isPickerOpen = false)} />

            <div
                class:lg:hidden={!isPickerOpen}
                class="mt-1 rounded bg-white lg:absolute shadow-card dropdown
                z-50 border border-primary w-60 ">
                {#each problems as problem}
                    <p
                        class="block text-black text-xl border-l border-red-600
                        py-3 hover:bg-primary hover:text-font px-3 rounded-sm
                        lg:border-none"
                        on:click={() => (subject = problem)}>
                        {problem}
                    </p>
                {/each}
            </div>
            <br />
            <br />
            <h3 class="text-accent">Your message:</h3>
            <textarea
                class="w-90% rounded-sm text-black p-1 h-70 focus:outline-none"
                maxlength="2000"
                bind:value={message} />
        </div>
        <div class="w-40% rounded h-auto shadow-full bg-variant p-6">
            <h2 class="text-4xl mt-4 mb-2">
                BY MAIL
                <strong class="text-white font-normal">
                    (FOR COMMERCIAL PURPOSE ONLY):
                </strong>
            </h2>
            <div>
                <h3 class="text-3xl">
                    IF YOU ARE A
                    <strong class="text-accent font-normal">COMPANY</strong>
                </h3>
                <p class="mb-4">
                    Please describe
                    <strong class="text-primary font-normal">
                        who you are
                    </strong>
                    and
                    <strong class="text-primary font-normal">
                        what are your proposal
                    </strong>
                    ACCURATELY
                </p>
                <h3 class="text-3xl">
                    IF YOU ARE A
                    <strong class="text-accent font-normal">
                        CONTENT CREATOR
                    </strong>
                </h3>
                <p>
                    Please precise the number of average
                    <strong class="text-primary font-normal">
                        views per video
                    </strong>
                    (or average
                    <strong class="text-primary font-normal">
                        viewers on your stream
                    </strong>
                    )
                </p>
                <p class="text-3xl mt-8">
                    At
                    <a
                        class="text-primary font-normal underline"
                        href="mailto:contact@winhalla.us">
                        contact@winhalla.us
                    </a>
                </p>
            </div>
        </div>
    </div>

</div>
