export const gtagEvent = (event, parameters) => {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag("event", event, parameters);
};