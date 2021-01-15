<script>
    import { callApi } from "../utils/api.js";
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";
    import { counter } from "../components/store";
    import ErrorAlert from "../components/ErrorAlert.svelte";

    let account;
    let email;
    let valid = null;
    let pushError;

    function onKeyPress() {
        setTimeout(() => {
            if (email.length > 0) {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                let exec = regex.exec(email);
                if (exec) valid = true;
                else valid = false;
            } else {
                valid = null;
            }
        }, 1);
    }

    let user;
    onMount(() => {
        let unsub = counter.subscribe(async (value) => {
            user = value.content;
            if (user.then) {
                user.then((values) => {
                    if (!values.user) {
                        goto("/");
                    }
                });
            } else if (user) {
                if (!user.user) {
                    goto("/");
                }
            }
        });
        unsub();
    });


    async function onClick() {
        try {
            const changeEmailStatus = await callApi("patch", `/auth/changeEmail?email=${email}`);
            if (changeEmailStatus instanceof Error) throw changeEmailStatus;
            goto("/");
        } catch (e) {
            pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();
            setTimeout(() => {
                pushError = undefined;
            }, 8000);
        }
    }
</script>

<svelte:head>
    <title>Change email | Winhalla</title>
</svelte:head>

<style>
    input {
        @apply w-full text-background bg-font py-3 px-4 rounded;
    }

    button:disabled {
        @apply bg-disabled;
        cursor: not-allowed;
    }

    .info {
        @apply text-lg mt-1;
    }

    .input-header {
        @apply text-primary text-3xl;
        margin-bottom: 0.35rem;
    }

    .check {
        margin-top: 0.15rem;
        margin-right: 0.4rem;
    }
</style>

<div>
    {#if pushError}
        <ErrorAlert pushError={pushError} message="There was an error creating your account" type="createAccount" />
    {/if}
    <div class="flex items-center justify-center md:h-screen-7">
        <div class="flex flex-col justify-center px-5 md:p-0">
            <div class="text-center md:text-left mt-7 md:mt-12">
                <h1
                    class="text-6xl mb-6 md:mb-8 leading-snug
                        md:leading-normal">
                    Change your email
                </h1>
            </div>
            <div class="md:mt-4">
                <p class="input-header">Email</p>
                <div>
                    <input
                        on:keydown={onKeyPress}
                        type="email"
                        placeholder="Your new email goes here"
                        bind:value={email}
                        class:border-legendary={valid == false}
                        class="input-style focus:outline-none
                            focus:border-primary placeholder-disabled" />

                    {#if valid}
                        <div class="flex items-center">
                            <svg
                                class="fill-current text-green w-4 check"
                                viewBox="0 0 33 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m0 10.909 4.364-4.364 8.727 8.727
                                        15.273-15.273 4.364 4.364-19.636 19.636z" />
                            </svg>
                            <p class="text-green info">VALID EMAIL</p>
                        </div>
                    {:else if valid == false}
                        <p class="text-legendary info ">INVALID EMAIL</p>
                    {/if}
                </div>
            </div>
            <button
                disabled={!valid}
                on:click={onClick}
                class:mt-11={valid == null}
                class="button button-brand mt-3">
                Change email
            </button>
        </div>
    </div>
</div>