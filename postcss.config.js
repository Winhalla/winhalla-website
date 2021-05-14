const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./**/**/*.html", "./**/**/*.svelte"],
    options: {
        safelist: [
            "text-epic", "border-epic",
            "from-primary", "from-epic", "from-green", "from-legendary", "to-epic", "to-green", "to-legendary", "to-primary"]
    },
    whitelistPatterns: [/svelte-/],

    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const production = process.env.NODE_ENV !== "development";

module.exports = {
    plugins: [require("tailwindcss"), ...(production ? [purgecss] : [])],
};
