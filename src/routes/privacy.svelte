<script>
    import Infos from "../components/Infos.svelte";

    let pushError;
    let message;

    function actionDone(action) {
        if (action === "cookieConsentReset") {
            document.cookie = "hideCookiePopup=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            pushError = "Refresh the page to edit your cookies consent";
            message = "One more step";
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
    <h2>I. Pre-registration</h2>
    <p>On the main page of the Site, you have access to a button called "Pre-register now"</p>
    <p>This button when clicked prompts for an email. This email will then be stored on the Site's servers for up to ninety (90) days. The purpose of storing the email is to notify the user when the next version of the Site is released </p>

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
    <p>We are using ads, because a website doesn't update and hosts itself!</p>
    <p>You can choose to enable or disable ad personalization via cookies on your first visit (you can always edit your
        consent <a href="/privacy#edit_consent">here</a>). Disabling ad personalisation still deposits cookies, but
        these are
        necessary for the Site, since advertising is.</p>
    <p>You can read their privacy policy here :<a href="https://policies.google.com/technologies/partner-sites">https://policies.google.com/technologies/partner-sites</a>
    </p>

    <p>We also use adplayer.pro as rewarded ads provider. They declared they doesn't use any personal information or
        cookies</p>
    <p>You can read their privacy policy here : <a href="https://adplayer.pro/privacy">https://adplayer.pro/privacy</a>
    </p>

    <h2>IV. Cookies</h2>
    <p>We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly
        used an anonymous unique identifier. They are stored in your computer's hard drive</p>
    <p>We use cookies for : </p>
    <ul>
        <li>Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are
            required, since they will have a major impact on your experience
        </li>
        <li>Analytical : as said <a href="/privacy#analytical">here</a>, they are not required an can be disabled</li>
        <li>Advertising cookies : as said <a href="/privacy#advertising">here</a> they are not required and can be
            disabled,
            however you
            cannot disable ads, they will be un-personalized if you opt-out to cookies
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
{#if message}
    <Infos pushError={pushError} message={message} />
{/if}

