<script>
    import { callApi } from "../utils/api";
    import Infos from "../components/Infos.svelte";
    import { fade } from "svelte/transition";
    import { apiUrl } from "../utils/config";

    let isEditingConsent = false;
    let confirmationPopupOpen;
    let pushError;
    let message;

    function makePopup(whatFor) {
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
    }
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
    <p>Winhalla operates the https://winhalla.app website ("Site"), which provides the SERVICE.</p>

    <p>This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of
        Personal Information if anyone decided to use our Service, the Site. </p>
    <p>We therefore only use your personal data within the scope of legal regulations, in particular the General Data
        Protection Regulation ("GDPR")</p>
    <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this
        policy. The Personal Information that we collect are used for providing and improving the Service. We will not
        use or share your information with anyone except as described in this Privacy Policy.</p>

    <h2>I. Account data</h2>
    <p>To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with
        your Steam Account and clicking on "Accept Terms And Conditions", we automatically create an account containing
        : </p>
    <ul>
        <li>Your SteamID64</li>
        <li>Your profile picture URL</li>
        <li>Your username</li>
        <li>And other data (including but not limited to : your coins number, your quest in progress...) This
            information is internal to the Site, is used only by us and in no case disclosed
        </li>
    </ul>
    <p>Your STEAMID64 may be sent to Brawlhalla's API (<a
        href="https://api.brawlhalla.com">https://api.brawlhalla.com</a>) to track your progress in the game and give
        you coins according to your performance</p>
    <p>Other account data will not be sent, sold, rented, or traded to any third-party.</p>
    <p id="analytical">All your account data is kept until you <a href="https://winhalla.app/deleteAccount">delete your
        account</a> and
        may be processed by our servers to provide the Service in its entirety</p>
    <p>If you choose to login with Google, you accept that we will store your Email in the top of the data mentioned
        above (excluding SteamID)</p>
    <p>If you choose to login with another provider than Steam, you will be prompted to enter your Brawlhalla ID. By
        submitting the Brawlhalla ID, you certify that you own the account with the Brawlhalla ID you mentioned.
        Otherwise your account and access to the Service may be terminated</p>

    <h2>II. Analytical software</h2>
    <p>We are using - like any other website - an analytical software. This software helps us to understand our traffic
        and its fluctuations</p>
    <p>Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You
        can edit your consent following <a href="/privacy#edit_consent">this</a> instructions</p>
    <p id="advertising">This analytical software can deposits cookies and collect data ; this data is kept strictly
        anonymous. However
        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order
        to allow us to use this data </p>

    <h2>III. Advertising</h2>
    <p>We are using ads, because a website doesn't update and hosts itself! Our ads are provided by third-party services
        (To read our policy about thrd-party services, <a href="/terms#3rdParty">click here</a>)</p>

    <p>We use prupleads as our banner ad provider</p>
    <p>You can read their privacy policy here : <a href="https://adplayer.pro/privacy">https://purpleads.io/privacy/</a>
    </p>

    <p>We also use adplayer.pro as rewarded ads provider.</p>
    <p>You can read their privacy policy here : <a href="https://adplayer.pro/privacy">https://adplayer.pro/privacy</a>
    </p>

    <h2>IV. Cookies</h2>
    <p>We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly
        used an anonymous unique identifier. They are stored in your computer's hard drive</p>
    <p>We use cookies for : </p>
    <ul>
        <li>Authenticating : required, else you cannot use most of the Site's functionalities</li>
        <li>Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are
            required, since they will have a major impact on your experience
        </li>
        <li>Analytical : as said <a href="/privacy#analytical">here</a>, these cookies are not required an can be
            disabled
        </li>
    </ul>
    <p>For more general information on cookies, please read <a
        href="https://www.privacypolicyonline.com/what-are-cookies/" class="underline">"What Are Cookies"</a>.</p>

    <h2 id="edit_consent">V. Edit your consent and claim your rights</h2>
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
    </h3>

    <h2>VI. Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these
        change in the Site. These changes are effective immediately, after they are posted on this page.</p>

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

