export default function formatTime(seconds) {
    return [
            parseInt(seconds / 60 / 60),
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
        ]
            .join(":")
            .replace(":", "h ")
            .replace(":", "m ")
            .replace(/\b(\d)\b/g, "0$1") //add a 0 in front of number if necessary
        + "s"
}