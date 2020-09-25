module.exports = {
    purge: [],
    theme: {
        extend: {
            spacing: {
                1: "0.25rem",
                2: "0.50rem",
                3: "0.75rem",
                4: "1rem",
                5: "1.25rem",
                7: "1.75rem",
                9: "2.25rem",
                11: "2.75rem",
                13: "3.25rem",
                14: "3.5rem",
                15: "3.75rem",
                17: "4.25rem",
                18: "4.5rem",
                19: "4.75rem",
                21: "5.25rem",
                22: "5.5rem",
                23: "5.75rem",
                25: "6.25rem",
                26: "6.5rem",
                27: "6.75rem",
                28: "7rem",
                29: "7.25rem",
                30: "7.5rem",
                31: "7.75rem",
                33: "8.25rem",
                34: "8.5rem",
                35: "8.75rem",
                36: "9rem",
                37: "9.25rem",
                38: "9.5rem",
                39: "9.75rem",
                41: "10.25rem",
                42: "10.5rem",
                43: "10.75rem",
                44: "11rem",
                45: "11.25rem",
                46: "11.5rem",
                47: "11.75rem",
                49: "12.25rem",
                50: "12.5rem",
                51: "12.75rem",
                52: "13rem",
                53: "13.25rem",
                54: "13.5rem",
                55: "13.75rem",
                57: "14.25rem",
                58: "14.5rem",
                59: "14.75rem",
                60: "15rem",
                61: "15.25rem",
                62: "15.5rem",
                63: "15.75rem",
                65: "16.25rem",
                66: "16.5rem",
                67: "16.75rem",
                68: "17rem",
                69: "17.25rem",
                70: "17.5rem",
                71: "17.75rem",
                72: "18rem",
                73: "18.25rem",
                74: "18.5rem",
                75: "18.75rem",
                76: "19rem",
                77: "19.25rem",
                78: "19.5rem",
                79: "19.75rem",
                80: "20rem",
                81: "20.25rem",
                82: "20.5rem",
                83: "20.75rem",
                84: "21rem",
                85: "21.25rem",
                86: "21.5rem",
                87: "21.75rem",
                88: "22rem",
                89: "22.25rem",
                90: "22.5rem",
                91: "22.75rem",
                92: "23rem",
                93: "23.25rem",
                94: "23.5rem",
                95: "23.75rem",
                96: "24rem",
                97: "24.25rem",
                98: "24.50rem",
                99: "24.75rem",
                100: "25rem",
                "screen-60": "60vh"
            },
            boxShadow: {
                card: "0px 0px 8px rgba(0, 0, 0, 0.125)",
                "card-hover": "0px 0px 10px rgba(255, 255, 255, 0.225)",
                "button-hover": "0px 0px 10px rgba(255, 255, 255, 0.2)",
                "button-alternative-hover":
                    "0px 0px 8px rgba(255, 255, 255, 0.125)",
            },
            textShadow: {
                "link-hover": "0px 0px 10px rgba(255, 255, 255, 0.5)",
                "base": "0px 0px 8px rgba(0, 0, 0, 0.160)"
            },

            fontSize: {
                '7xl': '5rem',
                '8xl': '6rem',
                '9xl': '7rem',
                logo: '1.6rem',
                default: '1.4rem',

            },
            colors: {
                background: "#17171a",
                variant: "#1a1a21",

                primary: "#3d72e4",
                accent: "#ff8f0f",
                green: "#3de488",
                epic: "#ee38ff",
                legendary: "#fc1870",
                
                font: "#fdfdfd",
                "ultra-light": "rgba(253, 253, 253, 0.9)",
                light: "#afafb4",
                disabled: "#79797f",
            },

            inset: {
                "minus-10": "-2.5rem",
                1: "0.25rem",
                2: "0.50rem",
                3: "0.75rem",
                4: "1rem",
                5: "1.25rem",
                6: "1.5rem",
                7: "1.75rem",
                8: "2rem",
                9: "2.25rem",
                10: "2.5rem",
                16:"4rem",
                20: "5rem",
                24: "6rem"
            }
        },

        
    },
    variants: {},
    plugins: [require("tailwindcss-textshadow")],
};
