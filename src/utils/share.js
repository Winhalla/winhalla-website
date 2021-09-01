export default function share(url) {
    window.navigator.share({ url: url });
}