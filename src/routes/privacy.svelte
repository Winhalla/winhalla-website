<script>
    import Infos from "../components/Infos.svelte";
    import { fade } from "svelte/transition";

    let confirmationPopupOpen;
    let pushError;
    let message;

    /*function makePopup(whatFor) {
        confirmationPopupOpen = whatFor;
    }

    async function confirm(what) {
        if (what === "delete account") {
            await callApi("delete", "/auth/deleteAccount");
            actionDone("account deleted");
        } else if (what === "restrict processing") {
            await callApi("patch", "/auth/moveAccount");
            actionDone("account moved");
        }
        confirmationPopupOpen = undefined;
    }

    function actionDone(action) {
        if (action === "cookieConsentReset") {
            document.cookie = "hideCookiePopup=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            pushError = "Refresh the page to edit your cookies consent";
            message = "One more step";
        } else if (action === "account deleted") {
            pushError = "Steam data may take up to 30 days to be deleted";
            message = "Account successfully deleted";
        } else if (action === "account moved") {
            pushError = "";
            message = "Data process restriction applied";
        }
        setTimeout(() => {
            pushError = undefined;
            message = undefined;
        }, 10000);
    }*/
</script>
<svelte:head>
    <title>Privacy policy | Winhalla</title>
</svelte:head>
<style>
    h2 {
        @apply text-4xl mt-6 mb-3 underline;
    }

    ul {
        list-style-type: disc;
        @apply ml-6 my-3;
    }

    .div {
        background-color: #FFFFFF;
        color: #000000
    }

    p {
        @apply py-2px;
    }

    a {
        @apply underline;
    }

    .btn {
        background-color: #FFFFFF;
        border: 1px solid #000000;
    }
</style>
<div class="h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8 "
     style="font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);">
    <h1 class="text-5xl underline mb-4">Privacy Policy</h1>
    <p>Winhalla SAS operates the Winhalla app ("App"), which provides the SERVICE.</p>

    <p>This page is used to inform the Site visitors and App users regarding our policies with the collection, use, and disclosure of
        Personal Information if anyone decided to use our Service, the App. </p>
    <p>We therefore only use your personal data within the scope of legal regulations, in particular the General Data
        Protection Regulation ("GDPR")</p>
    <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this
        policy. The Personal Information that we collect are used for providing and improving the Service. We will not
        use or share your information with anyone except as described in this Privacy Policy.</p>
    
    <h2>Premamble.</h2>
    <p>This website (https://winhalla.app) is only for presentation purposes of the App, only analytical anonymised data is collected. 
        Cookies may be deposited in order to provide this analytical data.
        This analytical data is collected by Google Analytics, but only accessible to Winhalla.</p>

    <h2>I. Account data</h2>
    <p>NO DATA REGARDING YOUR ACCOUNT IS SOLD, RENT, OR SHARED WITH ANY THIRD-PARTY</p>
    <p>To use the App, you have the option between login with Apple ID and login with a Google Account. Only email, name and, if applicable, profile picture, are collected</p>
    <p>Next, you are prompted to enter a Brawlhalla ID, which may be shared with Brawlhalla's API (<a
        href="https://api.brawlhalla.com">https://api.brawlhalla.com</a>) to provide the Service</p>
    <p>If you choose another platform than Steam, you will be prompted to enter your Brawlhalla ID. By
        submitting the Brawlhalla ID, you certify that you own the Brawlhalla account with the Brawlhalla ID you mentioned.
        Otherwise your account and access to the Service may be terminated</p>
    <p>If you choose Steam as a platform when logging in, your SteamID may be collected and stored in order to ensure your account is a real one</p>
    <p id="analytical">All your account data is kept until you delete your account and may be processed by our servers to provide the Service in its entirety</p>

    <h2>II. Analytical software</h2>
    <p>We are using - like any other app - an analytical software. This software helps us to understand our traffic
        and its fluctuations</p>
    <p id="advertising">This analytical software collects data and links it to your account. The data is linked to your account for the sole purpose of understanding automatic crash reports better, or providing better help if you have problems regarding the app.
        However this data is sent to Google Analytics which will process the data (and may process it outside the European Economic Area (EEA)) in order
        to allow us to use this data </p>

    <h2>III. Advertising</h2>
    <p>We are using ads, because a app doesn't update and hosts itself! Our ads are provided by third-party services
        (To read our policy about thrd-party services, <a href="/terms#3rdParty">click here</a>)</p>

    <p>We use Google AdMob as our ad provider. They might access your IDFA (Advertising ID) in order to serve personalized ads. Refer to your device's specific method to mask and deactivate IDFA.</p>
    <p>You can read AdMob's privacy policy here : <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>
    </p>

    <h2>IV. Crash reports</h2>
    <p>If an error occurs in the App's code, an error report is automatically sent to Firebase Crashlytics, which allows us to analyse these crash reports</p>
    <p>Crash reports are linked to your account, in order to help us resolve potential bugs faster.</p>
    <!--<h2 id="edit_consent">V. Edit your consent and claim your rights</h2>
    <div class="">
        <button class="btn px-2 py-1 mx-6"
                on:click={()=>actionDone("cookieConsentReset")}>Edit cookie
            consent
        </button>
        <button class="btn px-2 py-1 mx-6" on:click={()=>makePopup("delete account")}>Delete Account</button>
        <a class="btn px-2 py-2 mx-6" style="text-decoration: none" href="{apiUrl}/auth/downloadData" download>Download
            Data</a>
        <button class="btn px-2 py-1 mx-6" on:click={() =>makePopup('restrict processing')}>Restrict Processing</button>
        (Restrict processing
        will make your account unusable but we still keep your data)
    </div>
    <h3 class="text-2xl">Other GDPR-related user rights can be claimed via email <a href="mailto:contact@winhalla.app">here</a>
    </h3>-->

    <h2>VI. Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these
        change in the App. These changes are effective immediately, after they are posted on this page.</p>

    <h2>VII. Contact Us</h2>

    <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a
        href="mailto:contact@winhalla.app">contact@winhalla.app</a></p>
</div>
{#if confirmationPopupOpen}
    <div class="fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0"
         transition:fade={{duration:200}}>
    </div>
    <div class="fixed flex w-screen h-screen z-50 left-0 top-0"
         transition:fade={{duration:200}}>
        <div
            class="justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"
            style="margin-top:20vh">
            <h1 class="text-5xl text-primary">Confirm {confirmationPopupOpen}</h1>
            {#if confirmationPopupOpen === "delete account"}
                <p class="ml-4 text-3xl mt-6">Warning: this action is <u>not cancellable</u>. <br> All data will be lost
                    <u>forever</u></p>
            {:else if confirmationPopupOpen === "restrict processing"}
                <p class="ml-4 text-3xl mt-6">Warning: this action will make your account <u>unusable</u>. <br>However,
                    we will still keep your account data and will be able to restore it if you ask us <a
                        href="mailto:contact@winhalla.app">here</a> with you account ID you can obtain by downloading
                    you data (download it before restricting processing of your account)</p>
            {/if}
            <div>
                <div class="overflow-auto max-h-screen-50">
                    <div class="justify-center w-full flex">
                        <button class="button button-brand mt-8"
                                style="background-color:#fc1870"
                                on:click={()=>confirm(confirmationPopupOpen)}>
                            Confirm {confirmationPopupOpen}
                        </button>
                        <button class="button button-brand mt-8 border ml-5 border-legendary"
                                style="background-color: #17171a;padding: -1px"
                                on:click={()=>confirmationPopupOpen=undefined}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
{#if message}
    <Infos pushError={pushError} message={message} />
{/if}

