'use strict';

var sirv = require('sirv');
var express = require('express');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var cookie = require('cookie');
var axios = require('axios');
require('chart.js');
var Stream = require('stream');
var http = require('http');
var Url = require('url');
var https = require('https');
var zlib = require('zlib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var cookie__default = /*#__PURE__*/_interopDefaultLegacy(cookie);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

function noop() { }
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

let eventEmitter = writable({ error:undefined });

const axiosInstance = axios__default['default'].create({
    withCredentials: true,
    baseURL: "https://api.winhalla.app"
});

const callApi = async (method, url, data) => {
    try {
        const res = await axiosInstance({
            method: method,
            url: url,
            data: data
        });
        return res.data;
    } catch (e) {
        console.log(e);

        if(!url?.includes("changeEmail")&&!url?.includes("exitMatch")&&!url?.includes("feltrom/login")) {
            eventEmitter.set({error: e});
        }
        return e
    }
};

const getUser = async () => {
    return callApi("get", "/account");
};

/* src\components\QuestsSection.svelte generated by Svelte v3.31.0 */

const css = {
	code: ".title.svelte-1qvnia7{font-size:1.65rem}.desc.svelte-1qvnia7{font-size:1.825rem}.details.svelte-1qvnia7{font-size:1.45rem}@media screen and (min-width: 740px){.title.svelte-1qvnia7{font-size:1.85rem}.desc.svelte-1qvnia7{font-size:2rem}.details.svelte-1qvnia7{font-size:1.625rem}}",
	map: "{\"version\":3,\"file\":\"QuestsSection.svelte\",\"sources\":[\"QuestsSection.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .title {\\r\\n        font-size: 1.65rem;\\r\\n    }\\r\\n    .desc {\\r\\n        font-size: 1.825rem;\\r\\n    }\\r\\n    .details {\\r\\n        font-size: 1.45rem;\\r\\n    }\\r\\n\\r\\n    @media screen and (min-width: 740px) {\\r\\n        .title {\\r\\n            font-size: 1.85rem;\\r\\n        }\\r\\n\\r\\n        .desc {\\r\\n            font-size: 2rem;\\r\\n        }\\r\\n        .details {\\r\\n            font-size: 1.625rem;\\r\\n        }\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n<div class=\\\"flex flex-col lg:flex-row items-center lg:items-start\\\">\\r\\n    <img class=\\\"hidden lg:block w-96\\\" src=\\\"/assets/screens/QUESTS.png\\\" alt=\\\"Quests page screenshot\\\">\\r\\n    <div class=\\\"mb-12 lg:mb-0 lg:ml-24 lg:mt-48\\\">\\r\\n        <h2 class=\\\" text-epic  title\\\">Earn coins</h2>\\r\\n        <div class=\\\"mt-0 w-72 lg:w-82\\\" style=\\\"font-family: 'Roboto Condensed'; font-weight: bold\\\">\\r\\n            <p class=\\\"leading-snug text-extra-light  desc\\\">Complete Brawlhalla related <b class=\\\"text-primary\\\">quests</b></p>\\r\\n            <p class=\\\"italic text-gray mt-5  leading-snug  details\\\">The app will give you quests that you will need to complete in Brawlhalla</p>\\r\\n        </div>\\r\\n    </div>\\r\\n    <img class=\\\"lg:hidden w-66 md:w-74\\\" src=\\\"/assets/screens/QUESTS.png\\\" alt=\\\"Quests page screenshot\\\">\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,QAAQ,AACvB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,QAAQ,AACvB,CAAC,AACL,CAAC\"}"
};

const QuestsSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css);

	return `<div class="${"flex flex-col lg:flex-row items-center lg:items-start"}"><img class="${"hidden lg:block w-96"}" src="${"/assets/screens/QUESTS.png"}" alt="${"Quests page screenshot"}">
    <div class="${"mb-12 lg:mb-0 lg:ml-24 lg:mt-48"}"><h2 class="${" text-epic  title svelte-1qvnia7"}">Earn coins</h2>
        <div class="${"mt-0 w-72 lg:w-82"}" style="${"font-family: 'Roboto Condensed'; font-weight: bold"}"><p class="${"leading-snug text-extra-light  desc svelte-1qvnia7"}">Complete Brawlhalla related <b class="${"text-primary"}">quests</b></p>
            <p class="${"italic text-gray mt-5  leading-snug  details svelte-1qvnia7"}">The app will give you quests that you will need to complete in Brawlhalla</p></div></div>
    <img class="${"lg:hidden w-66 md:w-74"}" src="${"/assets/screens/QUESTS.png"}" alt="${"Quests page screenshot"}"></div>`;
});

/* src\components\MatchSection.svelte generated by Svelte v3.31.0 */

const css$1 = {
	code: ".title.svelte-18uo1f5{font-size:1.65rem}.desc.svelte-18uo1f5{font-size:1.83rem}.details.svelte-18uo1f5{font-size:1.425rem}@media screen and (min-width: 740px){.title.svelte-18uo1f5{font-size:1.85rem}.desc.svelte-18uo1f5{font-size:2rem}.details.svelte-18uo1f5{font-size:1.625rem}}",
	map: "{\"version\":3,\"file\":\"MatchSection.svelte\",\"sources\":[\"MatchSection.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .title {\\r\\n        font-size: 1.65rem;\\r\\n    }\\r\\n    .desc {\\r\\n        font-size: 1.83rem;\\r\\n    }\\r\\n    .details {\\r\\n        font-size: 1.425rem;\\r\\n    }\\r\\n\\r\\n    @media screen and (min-width: 740px) {\\r\\n        .title {\\r\\n            font-size: 1.85rem;\\r\\n        }\\r\\n\\r\\n        .desc {\\r\\n            font-size: 2rem;\\r\\n        }\\r\\n        .details {\\r\\n            font-size: 1.625rem;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"flex flex-col lg:flex-row items-center lg:items-start\\\">\\r\\n    <div class=\\\"mb-12 lg:mb-0 lg:mr-24 lg:mt-38\\\">\\r\\n        <h2 class=\\\" text-epic  title\\\">Earn coins - compete</h2>\\r\\n        <div class=\\\"mt-0 w-66 lg:w-76\\\" style=\\\"font-family: 'Roboto Condensed'; font-weight: bold\\\">\\r\\n            <p class=\\\"leading-snug text-extra-light  desc\\\"><b class=\\\"text-primary\\\">Compete</b> against <br> other <b class=\\\"text-primary\\\">players</b>!</p>\\r\\n            <p class=\\\"italic text-gray mt-5  leading-snug  details\\\">The goal is simple: be the one who wins the most Brawlhalla games out of 7</p>\\r\\n        </div>\\r\\n    </div>\\r\\n    <img class=\\\"w-66 md:w-74 lg:w-90\\\" src=\\\"/assets/screens/PLAY.png\\\" alt=\\\"Match page screenshot\\\">\\r\\n\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,OAAO,AACtB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,QAAQ,AACvB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,QAAQ,AACvB,CAAC,AACL,CAAC\"}"
};

const MatchSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$1);

	return `<div class="${"flex flex-col lg:flex-row items-center lg:items-start"}"><div class="${"mb-12 lg:mb-0 lg:mr-24 lg:mt-38"}"><h2 class="${" text-epic  title svelte-18uo1f5"}">Earn coins - compete</h2>
        <div class="${"mt-0 w-66 lg:w-76"}" style="${"font-family: 'Roboto Condensed'; font-weight: bold"}"><p class="${"leading-snug text-extra-light  desc svelte-18uo1f5"}"><b class="${"text-primary"}">Compete</b> against <br> other <b class="${"text-primary"}">players</b>!</p>
            <p class="${"italic text-gray mt-5  leading-snug  details svelte-18uo1f5"}">The goal is simple: be the one who wins the most Brawlhalla games out of 7</p></div></div>
    <img class="${"w-66 md:w-74 lg:w-90"}" src="${"/assets/screens/PLAY.png"}" alt="${"Match page screenshot"}"></div>`;
});

/* src\components\ShopSection.svelte generated by Svelte v3.31.0 */

const css$2 = {
	code: ".title.svelte-1qvnia7{font-size:1.65rem}.desc.svelte-1qvnia7{font-size:1.825rem}.details.svelte-1qvnia7{font-size:1.45rem}@media screen and (min-width: 740px){.title.svelte-1qvnia7{font-size:1.85rem}.desc.svelte-1qvnia7{font-size:2rem}.details.svelte-1qvnia7{font-size:1.625rem}}",
	map: "{\"version\":3,\"file\":\"ShopSection.svelte\",\"sources\":[\"ShopSection.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .title {\\r\\n        font-size: 1.65rem;\\r\\n    }\\r\\n    .desc {\\r\\n        font-size: 1.825rem;\\r\\n    }\\r\\n    .details {\\r\\n        font-size: 1.45rem;\\r\\n    }\\r\\n\\r\\n    @media screen and (min-width: 740px) {\\r\\n        .title {\\r\\n            font-size: 1.85rem;\\r\\n        }\\r\\n\\r\\n        .desc {\\r\\n            font-size: 2rem;\\r\\n        }\\r\\n        .details {\\r\\n            font-size: 1.625rem;\\r\\n        }\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n<div class=\\\"flex flex-col lg:flex-row items-center lg:items-start\\\">\\r\\n    <img class=\\\"hidden lg:block w-96\\\" src=\\\"/assets/screens/SHOP.png\\\" alt=\\\"Quests page screenshot\\\">\\r\\n    <div class=\\\"mb-12 lg:mb-0 lg:ml-24 lg:mt-48\\\">\\r\\n        <h2 class=\\\" text-epic  title\\\">Get rewards</h2>\\r\\n        <div class=\\\"mt-0 w-64 md:w-72 lg:w-82\\\" style=\\\"font-family: 'Roboto Condensed'; font-weight: bold\\\">\\r\\n            <p class=\\\"leading-snug text-extra-light  desc\\\"><b class=\\\"text-primary\\\">Spend</b> the coins you earned in the <b class=\\\"text-primary\\\">shop</b>!</p>\\r\\n            <p class=\\\"italic text-gray mt-5  leading-snug   details\\\">Once you collected enough coins, choose from the many items available!</p>\\r\\n        </div>\\r\\n    </div>\\r\\n    <img class=\\\"lg:hidden w-66 md:w-74\\\" src=\\\"/assets/screens/SHOP.png\\\" alt=\\\"Shop page screenshot\\\">\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,QAAQ,AACvB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,MAAM,eAAC,CAAC,AACJ,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,IAAI,AACnB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,SAAS,CAAE,QAAQ,AACvB,CAAC,AACL,CAAC\"}"
};

const ShopSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$2);

	return `<div class="${"flex flex-col lg:flex-row items-center lg:items-start"}"><img class="${"hidden lg:block w-96"}" src="${"/assets/screens/SHOP.png"}" alt="${"Quests page screenshot"}">
    <div class="${"mb-12 lg:mb-0 lg:ml-24 lg:mt-48"}"><h2 class="${" text-epic  title svelte-1qvnia7"}">Get rewards</h2>
        <div class="${"mt-0 w-64 md:w-72 lg:w-82"}" style="${"font-family: 'Roboto Condensed'; font-weight: bold"}"><p class="${"leading-snug text-extra-light  desc svelte-1qvnia7"}"><b class="${"text-primary"}">Spend</b> the coins you earned in the <b class="${"text-primary"}">shop</b>!</p>
            <p class="${"italic text-gray mt-5  leading-snug   details svelte-1qvnia7"}">Once you collected enough coins, choose from the many items available!</p></div></div>
    <img class="${"lg:hidden w-66 md:w-74"}" src="${"/assets/screens/SHOP.png"}" alt="${"Shop page screenshot"}"></div>`;
});

/* src\routes\index.svelte generated by Svelte v3.31.0 */

const css$3 = {
	code: "@keyframes svelte-1q2vc19-arrow{0%{transform:translateY(0rem)}100%{transform:translateY(0.55rem)}}button.svelte-1q2vc19:disabled{@apply bg-disabled;;cursor:not-allowed}.button2.svelte-1q2vc19{display:inline-block;border-radius:0.25rem;font-size:1.25rem;background-color:#3d72e4}@keyframes svelte-1q2vc19-up-transition{0%{bottom:0}100%{bottom:100%}}.up-transition.svelte-1q2vc19{animation:svelte-1q2vc19-up-transition 0.8s ease-in-out}@keyframes svelte-1q2vc19-active-transition{0%{bottom:-100%}100%{bottom:0}}.active-transition.svelte-1q2vc19{animation:svelte-1q2vc19-active-transition 0.8s ease-in-out}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { fly, fade } from \\\"svelte/transition\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import QuestsSection from \\\"../components/QuestsSection.svelte\\\";\\r\\n    import MatchSection from \\\"../components/MatchSection.svelte\\\";\\r\\n    import ShopSection from \\\"../components/ShopSection.svelte\\\";\\r\\n    let isRegisterPopupOpen = false;\\r\\n    let email;\\r\\n    let valid = null;\\r\\n    let info;\\r\\n\\r\\n    let utms = {\\r\\n        utm_source: \\\"winhalla.app\\\",\\r\\n        utm_medium: \\\"first_button\\\"\\r\\n    }\\r\\n    let url1 = \\\"https://play.google.com/store/apps/details?id=com.winhalla.app&referrer=\\\"\\r\\n    let url2 = \\\"\\\"\\r\\n    let isFirstAddToUrl = true\\r\\n    onMount(()=>{\\r\\n        const urlParams = new URLSearchParams(location.search);\\r\\n        for(const [key, value] of urlParams){\\r\\n            if(key.startsWith(\\\"utm_\\\")){             \\r\\n                utms[key] = value + (key === \\\"utm_source\\\" ? \\\"_website\\\" : \\\"\\\") + (key === \\\"utm_medium\\\" ? \\\"_first_button\\\" : \\\"\\\")\\r\\n            }\\r\\n        }\\r\\n        for (const key of Object.keys(utms)){\\r\\n            if(isFirstAddToUrl){\\r\\n                url1 += key + \\\"%3D\\\" + utms[key]\\r\\n                isFirstAddToUrl = false\\r\\n            } else {\\r\\n                url1 += \\\"%26\\\" + key + \\\"%3D\\\" + utms[key]\\r\\n            }\\r\\n        }\\r\\n        url2 = url1.replace('first_button', \\\"second_button\\\")\\r\\n        /*\\r\\n        if (urlParams.get(\\\"src\\\")) {\\r\\n            document.cookie = cookie.serialize(\\\"source\\\", urlParams.get(\\\"src\\\"), {\\r\\n                maxAge: 15552000,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            });\\r\\n        } else if (urlParams.get(\\\"utm_source\\\")) {\\r\\n            document.cookie = cookie.serialize(\\\"source\\\", urlParams.get(\\\"utm_source\\\"), {\\r\\n                maxAge: 15552000,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            });\\r\\n        }\\r\\n        location.hash = \\\"\\\";\\r\\n        let currentPage = location.hash;\\r\\n        setInterval(() => {\\r\\n            if (currentPage !== location.hash) {\\r\\n                // page has changed, set new page as 'current'\\r\\n                location.hash = \\\"\\\"\\r\\n                currentPage = location.hash\\r\\n                toggleRegisterPopup()\\r\\n                // do your thing..\\r\\n            }\\r\\n        }, 250);*/\\r\\n    })\\r\\n        \\r\\n\\r\\n    /*async function register() {\\r\\n        toggleRegisterPopup();\\r\\n        let { source } = cookie.parse(document.cookie);\\r\\n        if ((await callApi(\\\"post\\\", `/preRegistration?email=${email}&source=${source}`)) instanceof Error) return;\\r\\n        document.cookie = \\\"source=0;maxAge=1\\\";\\r\\n        info = true;\\r\\n        setTimeout(() => {\\r\\n            info = false;\\r\\n        }, 5000);\\r\\n    }\\r\\n\\r\\n    const onKeyPressEmail = () => {\\r\\n        if (!email) return;\\r\\n        setTimeout(() => {\\r\\n            if (email.length > 0) {\\r\\n                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])/gm;\\r\\n                let exec = regex.exec(email);\\r\\n                valid = !!exec;\\r\\n            } else {\\r\\n                valid = null;\\r\\n            }\\r\\n        }, 1);\\r\\n\\r\\n    };\\r\\n    function toggleRegisterPopup() {\\r\\n        isRegisterPopupOpen = !isRegisterPopupOpen;\\r\\n    }*/\\r\\n    /* function toggleFAQ(entryId) {\\r\\n         faq[entryId].opened = !faq[entryId].opened;\\r\\n         // if(faq[entryId].opened === true) gtagEvent(\\\"FAQopened\\\",{question:faq[entryId].question})\\r\\n     }\\r\\n     const faq = [\\r\\n         {\\r\\n             question: \\\"How can you give us some <u>paid items</u> for <u>free</u>?\\\",\\r\\n             answer: \\\"In life, nothing is free. We use <u>ads revenues</u> to buy the items.\\\",\\r\\n             opened: false\\r\\n         },\\r\\n         {\\r\\n             question: \\\"How do you get my <u>Brawlhalla stats</u>?\\\",\\r\\n             answer: \\\"We use the official <u>Brawlhalla API</u> to get your stats.\\\",\\r\\n             opened: false\\r\\n         },\\r\\n         {\\r\\n             question: \\\"<u>How long</u> does it take to get a Brawlhalla Battle Pass? (10$)\\\",\\r\\n             answer: \\\"It will take approximately <u>4 to 8 weeks</u> if used regularly. This value might change depending on the time spent on Brawlhalla and Winhalla.\\\",\\r\\n             opened: false\\r\\n         },\\r\\n         {\\r\\n             question: \\\"Why data refreshing takes so long?\\\",\\r\\n             answer: \\\"The Brawlhalla API has a <u>long refreshing rate</u>. Don't worry, come back later and it will be up to date!\\\",\\r\\n             opened: false\\r\\n         }\\r\\n     ];*/\\r\\n\\r\\n    \\r\\n    const screens = [\\r\\n        {\\r\\n            file: \\\"/assets/screens/screen1.png\\\",\\r\\n            active: true,\\r\\n            previous: false,\\r\\n        },\\r\\n        {\\r\\n            file: \\\"/assets/screens/screen2.png\\\",\\r\\n            active: false,\\r\\n            previous: false,\\r\\n        },\\r\\n        {\\r\\n            file: \\\"/assets/screens/screen3.png\\\",\\r\\n            active: false,\\r\\n            previous: false,\\r\\n        },\\r\\n        {\\r\\n            file: \\\"/assets/screens/screen4.png\\\",\\r\\n            active: false,\\r\\n            previous: true,\\r\\n        }\\r\\n    ]\\r\\n\\r\\n    function handleSwitch() {\\r\\n        let activeScreen = screens.findIndex(s => s.active === true);\\r\\n        if (activeScreen === screens.length - 1) {\\r\\n            screens[activeScreen].active = false;\\r\\n            screens[activeScreen - 1].previous = false;\\r\\n            screens[activeScreen].previous = true;\\r\\n            screens[0].active = true;\\r\\n        } else {\\r\\n            screens[activeScreen].active = false;\\r\\n            screens[activeScreen].previous = true;\\r\\n            screens[activeScreen + 1].active = true;\\r\\n            if (activeScreen === 0) {\\r\\n                screens[screens.length - 1].previous = false;\\r\\n            } else {\\r\\n                screens[activeScreen - 1].previous = false;\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n\\r\\n    setInterval(handleSwitch, 4000);\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    @keyframes arrow {\\r\\n        0% {\\r\\n            transform: translateY(0rem);\\r\\n        }\\r\\n        100% {\\r\\n            transform: translateY(0.55rem);\\r\\n        }\\r\\n    }\\r\\n    .arrow-svg {\\r\\n        animation: arrow 0.8s infinite alternate ease-in-out;\\r\\n    }\\r\\n    .cards {\\r\\n        height: calc(100% + 5rem);\\r\\n    }\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n    .button2 {\\r\\n        display: inline-block;\\r\\n        border-radius: 0.25rem;\\r\\n        font-size: 1.25rem;\\r\\n        background-color: #3d72e4;\\r\\n    }\\r\\n\\r\\n    @keyframes up-transition {\\r\\n        0% {\\r\\n            bottom: 0;\\r\\n        }\\r\\n\\r\\n        100% {\\r\\n            bottom: 100%;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .up-transition {\\r\\n        animation: up-transition 0.8s ease-in-out;\\r\\n    }\\r\\n\\r\\n    @keyframes active-transition {\\r\\n        0% {\\r\\n            bottom: -100%;\\r\\n        }\\r\\n\\r\\n        100% {\\r\\n            bottom: 0;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .active-transition {\\r\\n        animation: active-transition 0.8s ease-in-out;\\r\\n    }\\r\\n\\r\\n\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>\\r\\n    <meta\\r\\n            name=\\\"description\\\"\\r\\n            content=\\\"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\\r\\n        Mammoth Coins, Season Packs and more!\\\" />\\r\\n\\r\\n    <link rel=\\\"canonical\\\" href=\\\"https://winhalla.app\\\" />\\r\\n</svelte:head>\\r\\n<div class=\\\"pb-8 mt-0 lg:px-0\\\">\\r\\n    <div style=\\\"height:94vh;font-family: 'Roboto condensed', sans-serif; font-weight:700\\\" class=\\\"md:flex md:justify-center  relative\\\">\\r\\n        <div style=\\\"color: rgba(253,253,253,0.80)\\\" class=\\\"mt-30 md:mt-64    px-8 md:pr-0 md:-mr-14 lg:px-0\\\">\\r\\n            <div>\\r\\n                <p class=\\\"text-4-5xl lg:text-6xl\\\">\\r\\n                    Play <span class=\\\"text-primary\\\">Brawlhalla</span>,\\r\\n                </p>\\r\\n                <p class=\\\"text-4-5xl lg:text-6xl -mt-2 lg:mt-4\\\">\\r\\n                    Earn <span class=\\\"text-primary\\\">Rewards</span>.\\r\\n                </p>\\r\\n                <p class=\\\"text-3xl lg:text-4-5xl mt-6 lg:mt-11  text-gray\\\">\\r\\n                    As simple as it sounds.\\r\\n                </p>\\r\\n            </div>\\r\\n            <div class=\\\"hidden lg:flex mt-10 lg:mt-20\\\">\\r\\n                <!--<a href=\\\"/ios\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                    <img src=\\\"/assets/app-store.png\\\" alt=\\\"app store link\\\" class=\\\"w-40 lg:w-55 mr-8\\\">\\r\\n                </a>-->\\r\\n                <a href=\\\"{url1}\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                    <img src=\\\"/assets/google-play.png\\\" alt=\\\"google play link\\\" class=\\\"w-40 lg:w-55 mr-8\\\">\\r\\n                </a>\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"h-11 lg:h-0 lg:w-1/3\\\"></div>\\r\\n        <div class=\\\"md:hidden\\\">\\r\\n            <img src=\\\"/assets/screens/screen1.png\\\" alt=\\\"screen 1\\\" class=\\\"w-full -ml-9\\\" style=\\\"width: 150%\\\">\\r\\n        </div>\\r\\n        <div class=\\\"hidden md:block lg:hidden mt-28\\\">\\r\\n            <img src=\\\"/assets/screens/screen1.png\\\" alt=\\\"screen 1\\\" class=\\\"-ml-9\\\" style=\\\"width: 30rem\\\">\\r\\n        </div>\\r\\n        <div class=\\\"max-h-full overflow-hidden hidden lg:block\\\" style=\\\"z-index: -1\\\">\\r\\n            {#if screens}\\r\\n                {#each screens as screen}\\r\\n                    {#if screen.previous}\\r\\n                        <img src=\\\"{screen.file}\\\" alt=\\\"screenshot\\\" class=\\\"up-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96\\\" style=\\\"max-height: 94%; bottom: 100%\\\">\\r\\n                    {:else if screen.active}\\r\\n                        <img src=\\\"{screen.file}\\\" alt=\\\"screenshot\\\" class=\\\"active-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96\\\" style=\\\"max-height: 94%; bottom: 0\\\">\\r\\n                    {:else}\\r\\n                        <img src=\\\"{screen.file}\\\" alt=\\\"screenshot\\\" class=\\\"absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96  hidden\\\" style=\\\"max-height: 94%; bottom: -100%;\\\">\\r\\n                    {/if}\\r\\n\\r\\n                {/each}\\r\\n            {/if}\\r\\n\\r\\n        </div>\\r\\n\\r\\n    </div>\\r\\n    <div class=\\\"mt-15 lg:mt-0  w-full flex justify-center bg-background -mt-20 md:-mt-64 lg:mt-0\\\">\\r\\n        <QuestsSection/>\\r\\n    </div>\\r\\n    <div class=\\\"w-full flex justify-center bg-background  pt-24 lg:pt-30 xl:pt-37\\\">\\r\\n        <MatchSection/>\\r\\n    </div>\\r\\n    <div class=\\\"w-full flex justify-center bg-background pt-24 lg:pt-30 xl:pt-37\\\">\\r\\n        <ShopSection/>\\r\\n    </div>\\r\\n\\r\\n\\r\\n    <div class=\\\"mt-14 md:mt-20 lg:mt-24 xl:mt-38 mb-8\\\">\\r\\n        <div class=\\\"w-full  flex justify-center\\\">\\r\\n            <div class=\\\"flex-col items-center\\\">\\r\\n                <p class=\\\" text-4-5xl md:text-5xl lg:text-6xl  text-extra-light  text-center\\\">Ready? Go!</p>\\r\\n                <div class=\\\"lg:flex mt-4 md:mt-7 lg:mt-10\\\">\\r\\n                    <!--<a href=\\\"/ios\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                        <img src=\\\"/assets/app-store.png\\\" alt=\\\"app store link\\\" class=\\\"w-40 lg:w-55 mr-8\\\">\\r\\n                    </a>-->\\r\\n                    <a href=\\\"{url2}\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                        <img src=\\\"/assets/google-play.png\\\" alt=\\\"google play link\\\" class=\\\"w-40 lg:w-55 mr-8\\\">\\r\\n                    </a>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n\\r\\n</div>\\r\\n{#if isRegisterPopupOpen}\\r\\n    <div class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center\\\"\\r\\n         style=\\\"z-index: 100\\\"\\r\\n         in:fade={{duration: 200}}\\r\\n         out:fade={{duration: 350}}>\\r\\n\\r\\n        <div\\r\\n                class=\\\"max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto\\\"\\r\\n                style=\\\"max-height: 95vh;\\\"\\r\\n                transition:fly={{ y: 300, duration: 350 }}>\\r\\n            <h2 class=\\\"text-4xl md:text-5xl\\\">Pre-register\\r\\n            </h2>\\r\\n\\r\\n            <p class=\\\"text-accent text-5xl md:text-6xl\\\">NOW</p>\\r\\n            <div>\\r\\n                <div class=\\\"max-h-screen-50\\\">\\r\\n                    <div>\\r\\n                        <p class=\\\"mt-7 text-font text-3xl\\\" style=\\\"margin-bottom: 0.35rem;\\\">Email</p>\\r\\n                        <div>\\r\\n                            <input\\r\\n                                    on:keydown={onKeyPressEmail}\\r\\n                                    on:change={onKeyPressEmail}\\r\\n                                    type=\\\"email\\\"\\r\\n                                    placeholder=\\\"Your email goes here\\\"\\r\\n                                    bind:value={email}\\r\\n                                    class:border-legendary={valid === false}\\r\\n                                    class=\\\"w-full text-background bg-font py-3 px-4 rounded focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled email-input\\\"\\r\\n                                    style=\\\"font-family: 'Roboto Condensed', sans-serif;\\\" />\\r\\n\\r\\n                            {#if valid}\\r\\n                                <div class=\\\"flex items-center mt-1\\\">\\r\\n                                    <svg\\r\\n                                            class=\\\"fill-current text-green w-4\\\"\\r\\n                                            style=\\\"margin-top: 0.15rem; margin-right: 0.4rem;\\\"\\r\\n                                            viewBox=\\\"0 0 33 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                                d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                    </svg>\\r\\n                                    <p class=\\\"text-green info\\\">VALID EMAIL</p>\\r\\n                                </div>\\r\\n                            {:else if valid === false}\\r\\n                                <p class=\\\"text-legendary info mt-1\\\">INVALID EMAIL</p>\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    </div>\\r\\n                    <div class=\\\"text-font flex items-center mt-4 lg:mt-3\\\">\\r\\n                        <div class=\\\"rounded-full bg-primary mb-1\\\" style=\\\"padding: 0.65rem;\\\">\\r\\n                            <svg\\r\\n                                    class=\\\"w-full h-full fill-current\\\"\\r\\n                                    style=\\\"max-width: 0.95rem; max-height: 0.95rem;\\\"\\r\\n                                    viewBox=\\\"0 0 17 24\\\"\\r\\n                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                        d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n\\r\\n                        <p class=\\\"text-primary text-xl ml-4\\\">\\r\\n                            We will email you a link to download the app in the next few days\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <p class=\\\"text-legendary text-xl\\\" style=\\\"font-family: 'Roboto condensed', sans-serif; font-weight:700\\\">\\r\\n                        Please enter here your GOOGLE ACCOUNT's email address, otherwise we won't be able to give you access to the closed beta\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"justify-center w-full flex mt-8 py-3\\\">\\r\\n                    <button class=\\\"px-8 md:px-10 button2 button-brand-alternative\\\"\\r\\n                            style=\\\"background-color: #17171a;padding: -1px\\\"\\r\\n                            on:click={toggleRegisterPopup}>\\r\\n                        Cancel\\r\\n                    </button>\\r\\n                    <button class=\\\"px-8 py-3 md:px-10 button2 ml-5\\\" class:button-brand={valid}\\r\\n                            on:click={register}\\r\\n                            disabled={!valid}>\\r\\n                        Pre-register\\r\\n                    </button>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n{#if info}\\r\\n    <Infos pushError=\\\"We will keep you in touch!\\\" message=\\\"Successfully pre-registered!\\\" />\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AAsKI,WAAW,oBAAM,CAAC,AACd,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,WAAW,IAAI,CAAC,AAC/B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,WAAW,OAAO,CAAC,AAClC,CAAC,AACL,CAAC,AAOD,qBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,OAAO,CAAE,YAAY,CACrB,aAAa,CAAE,OAAO,CACtB,SAAS,CAAE,OAAO,CAClB,gBAAgB,CAAE,OAAO,AAC7B,CAAC,AAED,WAAW,4BAAc,CAAC,AACtB,EAAE,AAAC,CAAC,AACA,MAAM,CAAE,CAAC,AACb,CAAC,AAED,IAAI,AAAC,CAAC,AACF,MAAM,CAAE,IAAI,AAChB,CAAC,AACL,CAAC,AAED,cAAc,eAAC,CAAC,AACZ,SAAS,CAAE,4BAAa,CAAC,IAAI,CAAC,WAAW,AAC7C,CAAC,AAED,WAAW,gCAAkB,CAAC,AAC1B,EAAE,AAAC,CAAC,AACA,MAAM,CAAE,KAAK,AACjB,CAAC,AAED,IAAI,AAAC,CAAC,AACF,MAAM,CAAE,CAAC,AACb,CAAC,AACL,CAAC,AAED,kBAAkB,eAAC,CAAC,AAChB,SAAS,CAAE,gCAAiB,CAAC,IAAI,CAAC,WAAW,AACjD,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	let utms = {
		utm_source: "winhalla.app",
		utm_medium: "first_button"
	};

	let url1 = "https://play.google.com/store/apps/details?id=com.winhalla.app&referrer=";
	let url2 = "";
	let isFirstAddToUrl = true;

	onMount(() => {
		const urlParams = new URLSearchParams(location.search);

		for (const [key, value] of urlParams) {
			if (key.startsWith("utm_")) {
				utms[key] = value + (key === "utm_source" ? "_website" : "") + (key === "utm_medium" ? "_first_button" : "");
			}
		}

		for (const key of Object.keys(utms)) {
			if (isFirstAddToUrl) {
				url1 += key + "%3D" + utms[key];
				isFirstAddToUrl = false;
			} else {
				url1 += "%26" + key + "%3D" + utms[key];
			}
		}

		url2 = url1.replace("first_button", "second_button");
	}); /*
if (urlParams.get("src")) {
    document.cookie = cookie.serialize("source", urlParams.get("src"), {
        maxAge: 15552000,
        sameSite: "lax",
        path: "/"
    });
} else if (urlParams.get("utm_source")) {
    document.cookie = cookie.serialize("source", urlParams.get("utm_source"), {
        maxAge: 15552000,
        sameSite: "lax",
        path: "/"
    });
}
location.hash = "";
let currentPage = location.hash;
setInterval(() => {
    if (currentPage !== location.hash) {
        // page has changed, set new page as 'current'
        location.hash = ""
        currentPage = location.hash
        toggleRegisterPopup()
        // do your thing..
    }
}, 250);*/

	/*async function register() {
    toggleRegisterPopup();
    let { source } = cookie.parse(document.cookie);
    if ((await callApi("post", `/preRegistration?email=${email}&source=${source}`)) instanceof Error) return;
    document.cookie = "source=0;maxAge=1";
    info = true;
    setTimeout(() => {
        info = false;
    }, 5000);
}

const onKeyPressEmail = () => {
    if (!email) return;
    setTimeout(() => {
        if (email.length > 0) {
            let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
            let exec = regex.exec(email);
            valid = !!exec;
        } else {
            valid = null;
        }
    }, 1);

};
function toggleRegisterPopup() {
    isRegisterPopupOpen = !isRegisterPopupOpen;
}*/
	/* function toggleFAQ(entryId) {
     faq[entryId].opened = !faq[entryId].opened;
     // if(faq[entryId].opened === true) gtagEvent("FAQopened",{question:faq[entryId].question})
 }
 const faq = [
     {
         question: "How can you give us some <u>paid items</u> for <u>free</u>?",
         answer: "In life, nothing is free. We use <u>ads revenues</u> to buy the items.",
         opened: false
     },
     {
         question: "How do you get my <u>Brawlhalla stats</u>?",
         answer: "We use the official <u>Brawlhalla API</u> to get your stats.",
         opened: false
     },
     {
         question: "<u>How long</u> does it take to get a Brawlhalla Battle Pass? (10$)",
         answer: "It will take approximately <u>4 to 8 weeks</u> if used regularly. This value might change depending on the time spent on Brawlhalla and Winhalla.",
         opened: false
     },
     {
         question: "Why data refreshing takes so long?",
         answer: "The Brawlhalla API has a <u>long refreshing rate</u>. Don't worry, come back later and it will be up to date!",
         opened: false
     }
 ];*/
	const screens = [
		{
			file: "/assets/screens/screen1.png",
			active: true,
			previous: false
		},
		{
			file: "/assets/screens/screen2.png",
			active: false,
			previous: false
		},
		{
			file: "/assets/screens/screen3.png",
			active: false,
			previous: false
		},
		{
			file: "/assets/screens/screen4.png",
			active: false,
			previous: true
		}
	];

	function handleSwitch() {
		let activeScreen = screens.findIndex(s => s.active === true);

		if (activeScreen === screens.length - 1) {
			screens[activeScreen].active = false;
			screens[activeScreen - 1].previous = false;
			screens[activeScreen].previous = true;
			screens[0].active = true;
		} else {
			screens[activeScreen].active = false;
			screens[activeScreen].previous = true;
			screens[activeScreen + 1].active = true;

			if (activeScreen === 0) {
				screens[screens.length - 1].previous = false;
			} else {
				screens[activeScreen - 1].previous = false;
			}
		}
	}

	setInterval(handleSwitch, 4000);
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>Play Brawlhalla. Earn rewards. - Winhalla</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\r\n        Mammoth Coins, Season Packs and more!"}" data-svelte="svelte-14szetg"><link rel="${"canonical"}" href="${"https://winhalla.app"}" data-svelte="svelte-14szetg">`, "")}
<div class="${"pb-8 mt-0 lg:px-0"}"><div style="${"height:94vh;font-family: 'Roboto condensed', sans-serif; font-weight:700"}" class="${"md:flex md:justify-center  relative"}"><div style="${"color: rgba(253,253,253,0.80)"}" class="${"mt-30 md:mt-64    px-8 md:pr-0 md:-mr-14 lg:px-0"}"><div><p class="${"text-4-5xl lg:text-6xl"}">Play <span class="${"text-primary"}">Brawlhalla</span>,
                </p>
                <p class="${"text-4-5xl lg:text-6xl -mt-2 lg:mt-4"}">Earn <span class="${"text-primary"}">Rewards</span>.
                </p>
                <p class="${"text-3xl lg:text-4-5xl mt-6 lg:mt-11  text-gray"}">As simple as it sounds.
                </p></div>
            <div class="${"hidden lg:flex mt-10 lg:mt-20"}">
                <a${add_attribute("href", url1, 0)} target="${"_blank"}" rel="${"noopener noreferrer"}"><img src="${"/assets/google-play.png"}" alt="${"google play link"}" class="${"w-40 lg:w-55 mr-8"}"></a></div></div>
        <div class="${"h-11 lg:h-0 lg:w-1/3"}"></div>
        <div class="${"md:hidden"}"><img src="${"/assets/screens/screen1.png"}" alt="${"screen 1"}" class="${"w-full -ml-9"}" style="${"width: 150%"}"></div>
        <div class="${"hidden md:block lg:hidden mt-28"}"><img src="${"/assets/screens/screen1.png"}" alt="${"screen 1"}" class="${"-ml-9"}" style="${"width: 30rem"}"></div>
        <div class="${"max-h-full overflow-hidden hidden lg:block"}" style="${"z-index: -1"}">${screens
	? `${each(screens, screen => `${screen.previous
		? `<img${add_attribute("src", screen.file, 0)} alt="${"screenshot"}" class="${"up-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96 svelte-1q2vc19"}" style="${"max-height: 94%; bottom: 100%"}">`
		: `${screen.active
			? `<img${add_attribute("src", screen.file, 0)} alt="${"screenshot"}" class="${"active-transition absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96 svelte-1q2vc19"}" style="${"max-height: 94%; bottom: 0"}">`
			: `<img${add_attribute("src", screen.file, 0)} alt="${"screenshot"}" class="${"absolute left-1/2 mt-0  lg:-ml-8 lg:mt-0 max-w-96  hidden"}" style="${"max-height: 94%; bottom: -100%;"}">`}`}`)}`
	: ``}</div></div>
    <div class="${"mt-15 lg:mt-0  w-full flex justify-center bg-background -mt-20 md:-mt-64 lg:mt-0"}">${validate_component(QuestsSection, "QuestsSection").$$render($$result, {}, {}, {})}</div>
    <div class="${"w-full flex justify-center bg-background  pt-24 lg:pt-30 xl:pt-37"}">${validate_component(MatchSection, "MatchSection").$$render($$result, {}, {}, {})}</div>
    <div class="${"w-full flex justify-center bg-background pt-24 lg:pt-30 xl:pt-37"}">${validate_component(ShopSection, "ShopSection").$$render($$result, {}, {}, {})}</div>


    <div class="${"mt-14 md:mt-20 lg:mt-24 xl:mt-38 mb-8"}"><div class="${"w-full  flex justify-center"}"><div class="${"flex-col items-center"}"><p class="${" text-4-5xl md:text-5xl lg:text-6xl  text-extra-light  text-center"}">Ready? Go!</p>
                <div class="${"lg:flex mt-4 md:mt-7 lg:mt-10"}">
                    <a${add_attribute("href", url2, 0)} target="${"_blank"}" rel="${"noopener noreferrer"}"><img src="${"/assets/google-play.png"}" alt="${"google play link"}" class="${"w-40 lg:w-55 mr-8"}"></a></div></div></div></div></div>
${ ``}
${ ``}`;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes
});

/* src\components\Loading.svelte generated by Svelte v3.31.0 */

const css$4 = {
	code: ".loader.svelte-1r0tf3p{border:12px solid transparent;border-radius:50%;border-top:12px solid #3d72e4;width:150px;height:150px;-webkit-animation:svelte-1r0tf3p-spin 0.6s linear infinite;animation:svelte-1r0tf3p-spin 0.6s linear infinite}@-webkit-keyframes svelte-1r0tf3p-spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes svelte-1r0tf3p-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
	map: "{\"version\":3,\"file\":\"Loading.svelte\",\"sources\":[\"Loading.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .loader {\\r\\n        border: 12px solid transparent;\\r\\n        border-radius: 50%;\\r\\n        border-top: 12px solid #3d72e4;\\r\\n        width: 150px;\\r\\n        height: 150px;\\r\\n        -webkit-animation: spin 0.6s linear infinite; /* Safari */\\r\\n        animation: spin 0.6s linear infinite;\\r\\n    }\\r\\n\\r\\n    /* Safari */\\r\\n    @-webkit-keyframes spin {\\r\\n        0% {\\r\\n            -webkit-transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            -webkit-transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes spin {\\r\\n        0% {\\r\\n            transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n<script>\\r\\n    export let data;\\r\\n    export let duration = 500;\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n</script>\\r\\n<div out:fade={{duration}}\\r\\n     class=\\\"fixed z-50 bg-background absolute top-25 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90\\\">\\r\\n    <div class=\\\"pb-20 bg-background w-screenw-99 h-screen-99\\\">\\r\\n        <div class=\\\"mx-auto\\\">\\r\\n            <div class=\\\"loader mt-15/100 mx-auto\\\"></div>\\r\\n            {#if data}\\r\\n                <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">{data}</h2>\\r\\n            {:else}\\r\\n                <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">Loading...</h2>\\r\\n            {/if}\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,OAAO,eAAC,CAAC,AACL,MAAM,CAAE,IAAI,CAAC,KAAK,CAAC,WAAW,CAC9B,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC9B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,iBAAiB,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,CAC5C,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AACxC,CAAC,AAGD,mBAAmB,mBAAK,CAAC,AACrB,EAAE,AAAC,CAAC,AACA,iBAAiB,CAAE,OAAO,IAAI,CAAC,AACnC,CAAC,AACD,IAAI,AAAC,CAAC,AACF,iBAAiB,CAAE,OAAO,MAAM,CAAC,AACrC,CAAC,AACL,CAAC,AAED,WAAW,mBAAK,CAAC,AACb,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,OAAO,IAAI,CAAC,AAC3B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,OAAO,MAAM,CAAC,AAC7B,CAAC,AACL,CAAC\"}"
};

const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let { duration = 500 } = $$props;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
	$$result.css.add(css$4);

	return `<div class="${"fixed z-50 bg-background absolute top-25 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90"}"><div class="${"pb-20 bg-background w-screenw-99 h-screen-99"}"><div class="${"mx-auto"}"><div class="${"loader mt-15/100 mx-auto svelte-1r0tf3p"}"></div>
            ${data
	? `<h2 class="${"text-center text-3xl font-bold pt-4"}">${escape(data)}</h2>`
	: `<h2 class="${"text-center text-3xl font-bold pt-4"}">Loading...</h2>`}</div></div></div>`;
});

/* src\routes\account-transfer-id.svelte generated by Svelte v3.31.0 */

const Account_transfer_id = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	return `${($$result.head += `<meta name="${"robots"}" content="${"noindex"}" data-svelte="svelte-1tdq6x3">`, "")}
<div class="${"text-4xl flex justify-center items-center flex-col mt-50 pl-12 pr-10"}">${(function (__value) {
		if (is_promise(__value)) return `
        ${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}
    `;

		return (function (user) {
			return `
        <p class="${"text-5xl lg:text-6xl"}">Your account transfer id is: </p>
        <div class="${"lg:flex justify-center"}"><div class="${"text-background bg-font py-4 px-3 mt-6 lg:mt-14 flex items-center rounded-md"}"><div id="${"link"}" class="${"flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"}" style="${"font-family:'Roboto Condensed', sans-serif"}"><p class="${"ml-1"}">${escape(user?.user?._id)}</p>
                    <div class="${"ml-2 h-5 w-5 flex"}"><div class="${"w-5 h-5 hover:text-gray-500 cursor-pointer"}"><svg viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${"w-5 h-5"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z"}"></path><path d="${"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z"}"></path><path d="${"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"}"></path></svg></div></div></div>
                ${ ``}</div></div>
    `;
		})(__value);
	})(getUser())}</div>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Account_transfer_id
});

/* src\routes\contact.svelte generated by Svelte v3.31.0 */

const css$5 = {
	code: ".category.svelte-x2vw2h{color:rgba(253, 253, 253, 0.85);@apply font-bold;}",
	map: "{\"version\":3,\"file\":\"contact.svelte\",\"sources\":[\"contact.svelte\"],\"sourcesContent\":[\"<svelte:head>\\r\\n    <title>Contact page | Winhalla</title>\\r\\n</svelte:head>\\r\\n\\r\\n<style>\\r\\n    .category {\\r\\n        color: rgba(253, 253, 253, 0.85);\\r\\n        @apply font-bold;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"ml-7 md:ml-14  mt-30 md:mt-34  mb-12\\\">\\r\\n    <h1 class=\\\"text-5xl md:text-6xl text-extra-light\\\">Contact / support</h1>\\r\\n    <div class=\\\"ml-4 md:ml-12   mt-14 md:mt-16  font-bold\\\"  style=\\\"font-family: 'Roboto Condensed', sans-serif\\\">\\r\\n        <h3 class=\\\"category text-3xl md:text-4xl \\\">Having a <b class=\\\"text-primary\\\">problem</b>?</h3>\\r\\n        <ul class=\\\"ml-6 mt-3 text-gray\\\">\\r\\n            <li>Contact our support on <a class=\\\"underline\\\" href=\\\"https://discord.gg/Yb3vNASfXf\\\">Discord</a>, or send us an <a class=\\\"  underline\\\" href=\\\"mailto:contact@winhalla.app\\\">email</a> describing your issue.</li>\\r\\n        </ul>\\r\\n    </div>\\r\\n\\r\\n    <div class=\\\"ml-4 md:ml-13 mt-14  font-bold\\\"  style=\\\"font-family: 'Roboto Condensed', sans-serif\\\">\\r\\n        <h3 class=\\\"category text-3xl md:text-4xl \\\">Do you have a <b class=\\\"text-primary\\\">question</b> or a <b class=\\\"text-primary\\\">suggestion</b>?</h3>\\r\\n        <p class=\\\"ml-6 mt-3 text-gray\\\">Chat with our team on <a class=\\\"  underline\\\" href=\\\"https://discord.gg/Yb3vNASfXf\\\">Discord</a>, or via <a class=\\\"  underline\\\" href=\\\"https://www.instagram.com/winhalla/\\\">Instagram</a>!</p>\\r\\n    </div>\\r\\n\\r\\n    <div class=\\\"ml-4 md:ml-13 mt-14  font-bold\\\"  style=\\\"font-family: 'Roboto Condensed', sans-serif\\\">\\r\\n        <h3 class=\\\"category text-3xl md:text-4xl \\\">For <b class=\\\"text-primary\\\">business</b> inquiries, partnerships:</h3>\\r\\n        <p class=\\\"ml-6 mt-3 text-gray\\\">You are a content creator interested in promoting Winhalla, or you want to discuss with our commercial team? Send us an <a class=\\\"  underline\\\" href=\\\"mailto:contact@winhalla.app\\\">email</a>.</p>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAKI,SAAS,cAAC,CAAC,AACP,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAChC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$5);

	return `${($$result.head += `${($$result.title = `<title>Contact page | Winhalla</title>`, "")}`, "")}



<div class="${"ml-7 md:ml-14  mt-30 md:mt-34  mb-12"}"><h1 class="${"text-5xl md:text-6xl text-extra-light"}">Contact / support</h1>
    <div class="${"ml-4 md:ml-12   mt-14 md:mt-16  font-bold"}" style="${"font-family: 'Roboto Condensed', sans-serif"}"><h3 class="${"category text-3xl md:text-4xl  svelte-x2vw2h"}">Having a <b class="${"text-primary"}">problem</b>?</h3>
        <ul class="${"ml-6 mt-3 text-gray"}"><li>Contact our support on <a class="${"underline"}" href="${"https://discord.gg/Yb3vNASfXf"}">Discord</a>, or send us an <a class="${"  underline"}" href="${"mailto:contact@winhalla.app"}">email</a> describing your issue.</li></ul></div>

    <div class="${"ml-4 md:ml-13 mt-14  font-bold"}" style="${"font-family: 'Roboto Condensed', sans-serif"}"><h3 class="${"category text-3xl md:text-4xl  svelte-x2vw2h"}">Do you have a <b class="${"text-primary"}">question</b> or a <b class="${"text-primary"}">suggestion</b>?</h3>
        <p class="${"ml-6 mt-3 text-gray"}">Chat with our team on <a class="${"  underline"}" href="${"https://discord.gg/Yb3vNASfXf"}">Discord</a>, or via <a class="${"  underline"}" href="${"https://www.instagram.com/winhalla/"}">Instagram</a>!</p></div>

    <div class="${"ml-4 md:ml-13 mt-14  font-bold"}" style="${"font-family: 'Roboto Condensed', sans-serif"}"><h3 class="${"category text-3xl md:text-4xl  svelte-x2vw2h"}">For <b class="${"text-primary"}">business</b> inquiries, partnerships:</h3>
        <p class="${"ml-6 mt-3 text-gray"}">You are a content creator interested in promoting Winhalla, or you want to discuss with our commercial team? Send us an <a class="${"  underline"}" href="${"mailto:contact@winhalla.app"}">email</a>.</p></div></div>`;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Contact
});

let config = writable({ users:true });

const CONTEXT_KEY = {};

/* src\components\Tailwindcss.svelte generated by Svelte v3.31.0 */

const css$6 = {
	code: "@tailwind base;@tailwind components;@tailwind utilities;",
	map: "{\"version\":3,\"file\":\"Tailwindcss.svelte\",\"sources\":[\"Tailwindcss.svelte\"],\"sourcesContent\":[\"<style global>\\r\\n    @tailwind base;\\r\\n    @tailwind components;\\r\\n    @tailwind utilities;\\r\\n\\r\\n    .ppMask {\\r\\n        opacity: 0.05;\\r\\n    }\\r\\n\\r\\n    .button {\\r\\n        display: inline-block;\\r\\n        padding: 0.75rem 2.5rem;\\r\\n        border-radius: 0.4rem;\\r\\n        font-size: 1.25rem;\\r\\n        background-color: #7172e3;\\r\\n    }\\r\\n\\r\\n    .button-brand:hover {\\r\\n        -webkit-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative {\\r\\n        background-color: #1a1a21;\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        border: 1px solid #3d72e4;\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative:hover {\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        -webkit-box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;\\r\\n        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 8px;\\r\\n        @apply bg-variant rounded-2xl;\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar {\\r\\n        width: 18px;\\r\\n        height: 18px;\\r\\n        cursor: pointer;\\r\\n\\r\\n        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/\\r\\n\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar-thumb {\\r\\n        height: 3px;\\r\\n        border: 6px solid rgba(0, 0, 0, 0);\\r\\n        background-clip: padding-box;\\r\\n        -webkit-border-radius: 15px;\\r\\n        background-color: #1b1b27;\\r\\n        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);\\r\\n        /*outline: 1px solid slategrey;*/\\r\\n    }\\r\\n\\r\\n    .scrollbar-background::-webkit-scrollbar-thumb {\\r\\n        background-color: #17171a;\\r\\n    }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AACI,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC\"}"
};

const Tailwindcss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$6);
	return ``;
});

/* src\components\Navigation\Nav.svelte generated by Svelte v3.31.0 */

const css$7 = {
	code: "svg.svelte-1frd04p{@apply pr-1;;margin-bottom:3px}@keyframes svelte-1frd04p-gradient-animation{0%{background-position:right}100%{background-position:left}}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    export let isScrolling\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n\\r\\n    let utms = {\\r\\n        utm_source: \\\"winhalla.app\\\",\\r\\n        utm_medium: \\\"nav_button\\\"\\r\\n    }\\r\\n    let url1 = `https://play.google.com/store/apps/details?id=com.winhalla.app&referrer=`\\r\\n    let isFirstAddToUrl = true\\r\\n    onMount(()=>{\\r\\n        const urlParams = new URLSearchParams(location.search);\\r\\n        for(const [key, value] of urlParams){\\r\\n            if(key.startsWith(\\\"utm_\\\")){                \\r\\n                utms[key] = value + (key === \\\"utm_source\\\" ? \\\"_website\\\" : \\\"\\\") + (key === \\\"utm_medium\\\" ? \\\"_nav_button\\\" : \\\"\\\")\\r\\n            }\\r\\n        }\\r\\n        for (const key of Object.keys(utms)){\\r\\n            if(isFirstAddToUrl){\\r\\n                url1 += key + \\\"%3D\\\" + utms[key]\\r\\n                isFirstAddToUrl = false\\r\\n            } else {\\r\\n                url1 += \\\"%26\\\" + key + \\\"%3D\\\" + utms[key]\\r\\n            }\\r\\n        }\\r\\n    })\\r\\n</script>\\r\\n<style>\\r\\n    svg {\\r\\n        @apply pr-1;\\r\\n        margin-bottom: 3px;\\r\\n    }\\r\\n\\r\\n    .nav-icon {\\r\\n        margin-bottom: -6px;\\r\\n    }\\r\\n\\r\\n    .play {\\r\\n        width: 1.05rem;\\r\\n        height: 1.05rem;\\r\\n    }\\r\\n\\r\\n    .nav-link-container {\\r\\n        @apply pr-9 flex items-center;\\r\\n    }\\r\\n\\r\\n    .gradient {\\r\\n        background-image: linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);\\r\\n        background-size: 300%;\\r\\n        animation: gradient-animation 4.5s linear infinite;\\r\\n    }\\r\\n\\r\\n    @keyframes gradient-animation {\\r\\n\\r\\n        0% {\\r\\n            background-position: right;\\r\\n        }\\r\\n        100% {\\r\\n            background-position: left;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"h-auto w-full fixed z-50\\\">\\r\\n    <!--{#if user}\\r\\n        <div class=\\\"py-1 bg-primary w-full flex  items-center lg:text-xl text-white  relative   gradient\\\">\\r\\n            <p class=\\\"text-center w-full text-3xl\\\">\\r\\n                &lt;!&ndash;<b class=\\\"text-white mr-2 font-normal text-3xl\\\">EVENT:</b>&ndash;&gt;\\r\\n\\r\\n            </p>\\r\\n            <button class=\\\"p-1 absolute right-0\\\" on:click={() => isEventBannerOpen = false}>\\r\\n                <svg\\r\\n                    class=\\\"w-5 h-5 fill-current \\\"\\r\\n                    viewBox=\\\"0 0 28 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\" />\\r\\n                </svg>\\r\\n            </button>\\r\\n\\r\\n        </div>\\r\\n    {/if}-->\\r\\n    <nav\\r\\n            class:border-primary={isScrolling}\\r\\n            class:border-b-2={isScrolling}\\r\\n            class=\\\"shadow-link-hover bg-background lg:flex items-center text-font\\r\\n        w-full transition duration-200 border-b border-transparent\\\">\\r\\n        <div\\r\\n                class=\\\"w-full lg:w-screen flex justify-between items-center py-4 lg:pt-7 lg:pb-4\\r\\n            relative\\\">\\r\\n            <div class=\\\"pl-7 lg:pl-14 lg:pr-34\\\">\\r\\n                <!--LOGO-->\\r\\n                <a href=\\\"/\\\">\\r\\n                    <div class=\\\"relative\\\">\\r\\n                        <svg class=\\\"fill-current w-34 lg:w-42\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 465.1 152.11\\\">\\r\\n                            <g id=\\\"Calque_2\\\" data-name=\\\"Calque 2\\\">\\r\\n                                <g id=\\\"Calque_1-2\\\" data-name=\\\"Calque 1\\\">\\r\\n                                    <polygon\\r\\n                                            points=\\\"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0\\\"/>\\r\\n                                    <rect x=\\\"97.54\\\" y=\\\"24\\\" width=\\\"16.38\\\" height=\\\"104.25\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37\\\"/>\\r\\n                                </g>\\r\\n                            </g>\\r\\n                        </svg>\\r\\n                        <!--<span class=\\\"absolute -top-1 -right-6  text-legendary\\\">Beta</span>-->\\r\\n                    </div>\\r\\n                    <!--<a href=\\\"/login\\\" class=\\\"mt-3 lg:mt-0 text-center lg:hidden hover:underline hover:text-font text-gray text-xl mr-20\\\">\\r\\n                        Get your account transfer ID\\r\\n                    </a>-->\\r\\n                </a>\\r\\n            </div>\\r\\n            <div class=\\\"lg:flex mx-7 lg:mr-14 lg:ml-0 items-center\\\">\\r\\n                <!--<a href=\\\"/login\\\" rel=\\\"prefetch\\\" class=\\\"hidden lg:block text-center hover:underline hover:text-font text-gray text-xl mr-20\\\">\\r\\n                    Get your account transfer ID\\r\\n                </a>-->\\r\\n                <!--<a href=\\\"/ios\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                    <img src=\\\"/assets/app-store.png\\\" alt=\\\"app store link\\\" class=\\\"w-45 mr-8\\\">\\r\\n                </a>-->\\r\\n                <a href=\\\"{url1}\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\r\\n                    <img src=\\\"/assets/google-play.png\\\" alt=\\\"google play link\\\" class=\\\"w-45 mt-2 lg:mt-0\\\">\\r\\n                </a>\\r\\n            </div>\\r\\n        </div>\\r\\n    </nav>\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA4BI,GAAG,eAAC,CAAC,AACD,OAAO,IAAI,CAAC,CACZ,aAAa,CAAE,GAAG,AACtB,CAAC,AAqBD,WAAW,iCAAmB,CAAC,AAE3B,EAAE,AAAC,CAAC,AACA,mBAAmB,CAAE,KAAK,AAC9B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,mBAAmB,CAAE,IAAI,AAC7B,CAAC,AACL,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isScrolling } = $$props;

	let utms = {
		utm_source: "winhalla.app",
		utm_medium: "nav_button"
	};

	let url1 = `https://play.google.com/store/apps/details?id=com.winhalla.app&referrer=`;
	let isFirstAddToUrl = true;

	onMount(() => {
		const urlParams = new URLSearchParams(location.search);

		for (const [key, value] of urlParams) {
			if (key.startsWith("utm_")) {
				utms[key] = value + (key === "utm_source" ? "_website" : "") + (key === "utm_medium" ? "_nav_button" : "");
			}
		}

		for (const key of Object.keys(utms)) {
			if (isFirstAddToUrl) {
				url1 += key + "%3D" + utms[key];
				isFirstAddToUrl = false;
			} else {
				url1 += "%26" + key + "%3D" + utms[key];
			}
		}
	});

	if ($$props.isScrolling === void 0 && $$bindings.isScrolling && isScrolling !== void 0) $$bindings.isScrolling(isScrolling);
	$$result.css.add(css$7);

	return `<div class="${"h-auto w-full fixed z-50"}">
    <nav class="${[
		"shadow-link-hover bg-background lg:flex items-center text-font\r\n        w-full transition duration-200 border-b border-transparent",
		(isScrolling ? "border-primary" : "") + " " + (isScrolling ? "border-b-2" : "")
	].join(" ").trim()}"><div class="${"w-full lg:w-screen flex justify-between items-center py-4 lg:pt-7 lg:pb-4\r\n            relative"}"><div class="${"pl-7 lg:pl-14 lg:pr-34"}">
                <a href="${"/"}"><div class="${"relative"}"><svg class="${"fill-current w-34 lg:w-42 svelte-1frd04p"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 465.1 152.11"}"><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><polygon points="${"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"}"></polygon><rect x="${"97.54"}" y="${"24"}" width="${"16.38"}" height="${"104.25"}"></rect><path d="${"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"}"></path><path d="${"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"}"></path><polygon points="${"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"}"></polygon><polygon points="${"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"}"></polygon></g></g></svg>
                        </div>
                    </a></div>
            <div class="${"lg:flex mx-7 lg:mr-14 lg:ml-0 items-center"}">
                
                <a${add_attribute("href", url1, 0)} target="${"_blank"}" rel="${"noopener noreferrer"}"><img src="${"/assets/google-play.png"}" alt="${"google play link"}" class="${"w-45 mt-2 lg:mt-0"}"></a></div></div></nav></div>`;
});

/* src\components\Footer.svelte generated by Svelte v3.31.0 */

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="${"w-full pt-12 pb-6\r\n             bg-variant text-font text-default flex flex-col items-center"}"><div><div class="${"flex flex-col items-center md:flex-row md:items-start justify-center"}"><div><div class="${"md:mr-14 lg:mr-34 text-4xl md:max-w-60"}">Play
                    <b class="${"text-accent font-normal"}">Brawlhalla</b>

                    <br class="${"sm:hidden lg:block"}">
                    Earn
                    <b class="${"text-accent font-normal"}">rewards</b></div></div>

            <div class="${"lg:flex justify-center mt-8 md:mt-0"}"><div class="${"flex"}"><div class="${"mr-8"}"><h3 class="${"text-primary"}">Legal</h3>
                        <a href="${"/privacy"}" class="${"block hover:text-shadow-link-hover"}">Privacy</a>
                        <a href="${"/legal"}" class="${"block hover:text-shadow-link-hover"}">Legal notice</a></div>
                    <div class="${"ml-8 lg:mx-8"}"><h3 class="${"text-primary"}">Info</h3>
                        <a href="${"/terms"}" class="${"block hover:text-shadow-link-hover"}">Terms of use</a>
                        <a href="${"/contact"}" class="${"block hover:text-shadow-link-hover"}">Support</a></div></div>
                <div class="${"mt-8 lg:mt-0 lg:ml-8"}"><h3 class="${"text-primary"}">Company</h3>
                    <a href="${"/contact"}" class="${"block hover:text-shadow-link-hover"}">Contact us</a></div></div></div>
        <div class="${"text-sm text-gray-400 ml-4 mt-8 w-75 sm:w-148 lg:w-196 "}"><p>Winhalla isn&#39;t endorsed by Blue Mammoth Games and doesn&#39;t reflect the views or opinions of Blue Mammoth
                Games or anyone
                officially involved in producing or managing Brawlhalla. Brawlhalla and Blue Mammoth Games are
                trademarks or registered trademarks of Blue Mammoth games. Brawlhalla © Blue Mammoth Games.</p>
            <div class="${"w-full h-px bg-primary  mt-4"}"></div></div>
        <div class="${"mt-6 flex justify-between items-center w-full"}"><div class="${"flex items-end"}"><a class="${"ml-4"}" href="${"/"}"><svg class="${"fill-current w-24"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 465.1 152.11"}"><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><polygon points="${"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"}"></polygon><rect x="${"97.54"}" y="${"24"}" width="${"16.38"}" height="${"104.25"}"></rect><path d="${"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"}"></path><path d="${"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"}"></path><polygon points="${"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"}"></polygon><polygon points="${"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"}"></polygon></g></g></svg></a>
                <p class="${"ml-5 pt-2 text-sm"}" style="${"margin-bottom: -0.19rem"}">© Winhalla SAS 2021</p></div>


            <div class="${"flex items-center"}"><a href="${"https://discord.gg/Yb3vNASfXf"}"><svg class="${"w-5 fill-current"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z"}"></path></svg></a>
                <a href="${"https://twitter.com/winhalla"}"><svg class="${"ml-4 w-6 fill-current"}" viewBox="${"0 0 30 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m29.55 2.85c-.841 1.224-1.848 2.26-3.004 3.106l-.036.025q.018.262.018.787c-.004 1.736-.264 3.41-.745 4.987l.032-.122c-.534 1.773-1.272 3.32-2.206 4.724l.04-.065c-.989 1.509-2.132 2.808-3.435 3.927l-.024.02c-1.372 1.153-2.978 2.083-4.73 2.704l-.108.033c-1.765.648-3.803 1.022-5.928 1.022-.045 0-.09 0-.134 0h.007c-.038 0-.082 0-.127 0-3.41 0-6.584-1.015-9.234-2.76l.063.039c.419.048.904.075 1.396.075h.07-.004c.037 0 .082.001.126.001 2.807 0 5.386-.975 7.417-2.606l-.023.018c-2.639-.05-4.861-1.777-5.65-4.157l-.012-.043c.342.057.738.091 1.141.094h.003c.567 0 1.116-.075 1.637-.216l-.044.01c-1.412-.284-2.615-1.034-3.47-2.08l-.008-.011c-.858-1.011-1.379-2.331-1.379-3.773 0-.028 0-.056.001-.084v.004-.075c.788.452 1.726.732 2.727.768h.011c-.822-.553-1.487-1.279-1.953-2.129l-.016-.031c-.46-.835-.731-1.83-.731-2.889 0-1.126.306-2.18.84-3.084l-.015.028c1.5 1.839 3.337 3.341 5.425 4.427l.095.045c2.022 1.067 4.402 1.743 6.927 1.864l.038.001c-.093-.415-.147-.892-.149-1.382v-.001c.004-3.345 2.717-6.055 6.062-6.055 1.74 0 3.309.733 4.415 1.908l.003.003c1.448-.284 2.735-.792 3.893-1.492l-.053.03c-.455 1.431-1.4 2.596-2.635 3.323l-.028.015c1.294-.148 2.475-.479 3.569-.967l-.077.031z"}"></path></svg></a>
                <a href="${"https://www.instagram.com/winhalla/"}"><svg class="${"ml-4 w-5 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m16 12v-.001c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4c1.104 0 2.104-.448 2.828-1.171.723-.701 1.172-1.682 1.172-2.768 0-.021 0-.042-.001-.063v.003zm2.16 0c-.012 3.379-2.754 6.114-6.135 6.114-3.388 0-6.135-2.747-6.135-6.135s2.747-6.135 6.135-6.135c1.694 0 3.228.687 4.338 1.797 1.109 1.08 1.798 2.587 1.798 4.256 0 .036 0 .073-.001.109v-.005zm1.687-6.406v.002c0 .795-.645 1.44-1.44 1.44s-1.44-.645-1.44-1.44.645-1.44 1.44-1.44c.398 0 .758.161 1.018.422.256.251.415.601.415.988v.029-.001zm-7.84-3.44-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014c-1.044.425-1.857 1.237-2.272 2.254l-.01.027c-.119.318-.219.695-.284 1.083l-.005.037c-.082.469-.14 1.024-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649.008 1.195-.008 1.195 0 1.649.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043c.425 1.044 1.237 1.857 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024 1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014c1.044-.425 1.857-1.237 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649-.008-1.195.008-1.195 0-1.649-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073c-.07-.425-.17-.802-.303-1.163l.014.043c-.425-1.044-1.237-1.857-2.254-2.272l-.027-.01c-.318-.119-.695-.219-1.083-.284l-.037-.005c-.469-.082-1.024-.14-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zm11.993 9.846q0 3.578-.08 4.953c.005.101.009.219.009.337 0 3.667-2.973 6.64-6.64 6.64-.119 0-.237-.003-.354-.009l.016.001q-1.375.08-4.953.08t-4.953-.08c-.101.005-.219.009-.337.009-3.667 0-6.64-2.973-6.64-6.64 0-.119.003-.237.009-.354l-.001.016q-.08-1.375-.08-4.953t.08-4.953c-.005-.101-.009-.219-.009-.337 0-3.667 2.973-6.64 6.64-6.64.119 0 .237.003.354.009l-.016-.001q1.375-.08 4.953-.08t4.953.08c.101-.005.219-.009.337-.009 3.667 0 6.64 2.973 6.64 6.64 0 .119-.003.237-.009.354l.001-.016q.08 1.374.08 4.953z"}"></path></svg></a>
                <a href="${"https://www.youtube.com/channel/UCrIHDenuTEVdbqn4SJpNn4Q"}"><svg class="${"ml-4 w-6 fill-current"}" viewBox="${"0 0 34 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m13.544 16.419 9.216-4.762-9.216-4.818zm3.524-16.419q3.2 0 6.181.086t4.371.181l1.39.08q.019 0 .32.029c.167.013.317.033.465.061l-.026-.004q.134.029.448.086c.205.035.388.088.561.158l-.018-.006q.229.095.534.248c.225.114.419.238.599.377l-.008-.006c.203.158.383.323.549.502l.003.003c.102.107.199.222.288.342l.007.01c.202.318.388.686.537 1.071l.015.044c.24.559.417 1.207.501 1.885l.004.035q.152 1.219.24 2.6t.105 2.16v3.352c.001.078.001.171.001.263 0 1.853-.125 3.678-.367 5.465l.023-.208c-.086.704-.255 1.344-.498 1.946l.018-.051c-.162.447-.368.834-.62 1.186l.01-.015-.266.32c-.169.182-.349.347-.542.497l-.01.008c-.171.134-.365.254-.571.353l-.019.008q-.305.143-.534.24c-.156.064-.338.117-.527.15l-.016.002q-.314.057-.457.086t-.438.057-.314.029q-4.775.372-11.937.372-3.943-.038-6.848-.124t-3.819-.143l-.934-.08-.686-.08c-.404-.05-.757-.117-1.102-.204l.062.013c-.376-.118-.697-.253-1.003-.415l.032.015c-.417-.205-.772-.467-1.075-.78l-.001-.001c-.102-.107-.199-.222-.288-.342l-.007-.01c-.202-.318-.388-.686-.537-1.071l-.015-.044c-.24-.559-.417-1.207-.501-1.885l-.004-.035q-.152-1.219-.24-2.6t-.105-2.16v-3.352c-.001-.078-.001-.171-.001-.263 0-1.853.125-3.678.367-5.465l-.023.208c.086-.704.255-1.344.498-1.946l-.018.051c.162-.447.368-.834.62-1.186l-.01.015.266-.32c.169-.182.349-.347.542-.497l.01-.008c.172-.134.365-.257.57-.362l.021-.01q.305-.152.534-.248c.156-.064.338-.117.527-.15l.016-.002q.314-.057.448-.086c.121-.024.271-.044.424-.056l.015-.001q.305-.029.32-.029 4.783-.35 11.946-.35z"}"></path></svg></a></div></div></div></div>`;
});

/* src\components\ErrorAlert.svelte generated by Svelte v3.31.0 */

const ErrorAlert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { pushError } = $$props;
	let { message } = $$props;
	let { type } = $$props;
	if ($$props.pushError === void 0 && $$bindings.pushError && pushError !== void 0) $$bindings.pushError(pushError);
	if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);

	return `${type === "createAccount"
	? `<div class="${"px-5 w-full lg:w-auto absolute left-0 lg:left-auto lg:right-0 2xl:right-30 z-20 top-5 lg:top-50 xl:mr-6"}"><div class="${"w-full lg:w-auto h-auto  p-5 bg-background border rounded-lg border-legendary"}"><h3 class="${"text-legendary text-xl"}">${escape(message)}</h3>
            <p class="${"text-light text-lg"}">${escape(pushError)}</p></div></div>`
	: `<div class="${"z-50 fixed right-0 top-5 lg:top-30 mr-8 lg:mr-6 w-auto h-auto p-5 bg-background border rounded-lg border-legendary"}"><h3 class="${"text-legendary text-xl"}">${escape(message)}</h3>
        <p class="${"text-light text-lg"}">${escape(pushError)}</p></div>`}`;
});

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let c of ca) {

        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/* src\components\CookiePopup.svelte generated by Svelte v3.31.0 */

const css$8 = {
	code: ".text-3xl1.svelte-1jj7xx1{font-family:Roboto Condensed, sans-serif;@apply text-2xl font-bold;}",
	map: "{\"version\":3,\"file\":\"CookiePopup.svelte\",\"sources\":[\"CookiePopup.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .text-3xl1{\\r\\n        font-family: Roboto Condensed, sans-serif;\\r\\n        @apply text-2xl font-bold;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<script>\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import {onMount} from \\\"svelte\\\";\\r\\n    import {getCookie} from \\\"../utils/getCookie\\\";\\r\\n    let isOpen = false;\\r\\n    onMount(()=>{\\r\\n        let acceptedCookies = getCookie(\\\"acceptedCookies\\\")\\r\\n        if (!acceptedCookies) isOpen = true;\\r\\n        else if (acceptedCookies !== \\\"false\\\") window.yett.unblock();\\r\\n    })\\r\\n    function acceptCookies(){\\r\\n        isOpen = false;\\r\\n        window.yett.unblock();\\r\\n        document.cookie = cookie.serialize(\\\"acceptedCookies\\\",\\r\\n            \\\"true\\\",\\r\\n            {\\r\\n                maxAge: 2147483647,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            })\\r\\n    }\\r\\n    function declineCookies(){\\r\\n        isOpen = false;\\r\\n        document.cookie = cookie.serialize(\\\"acceptedCookies\\\",\\r\\n            \\\"false\\\",\\r\\n            {\\r\\n                maxAge: 2147483647,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            })\\r\\n    }\\r\\n</script>\\r\\n{#if isOpen}\\r\\n    <div class=\\\"fixed top-0 bottom-0 left-0 right-0 bg-background bg-opacity-70 flex justify-center items-center z-60\\\">\\r\\n        <div class=\\\"bg-variant rounded-3xl px-7 pb-8 pt-7\\\" style=\\\"max-width: 32rem;\\\">\\r\\n            <div class=\\\"flex justify-end cursor-pointer\\\" on:click={acceptCookies}>\\r\\n                <svg class=\\\"w-10 cursor-pointer\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"#BEBEC2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path d=\\\"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z\\\"/>\\r\\n                </svg>\\r\\n            </div>\\r\\n            <p class=\\\"text-5xl text-center px-5 -mt-6\\\">Cookies</p>\\r\\n            <p class=\\\"pb-10 pt-5 font-bold px-5\\\" style=\\\"font-family: 'Roboto Condensed', sans-serif; font-size: 25px; line-height: 1.25; color: rgba(253,253,253,0.9)\\\">\\r\\n                We'd like to use optional cookies to analyze site traffic <span class=\\\"text-primary\\\">anonymously</span>.\\r\\n                This help us understand how to <span class=\\\"text-primary\\\">improve</span> the website.\\r\\n            </p>\\r\\n            <div class=\\\"flex justify-around flex-grow px-7\\\">\\r\\n                <button on:click={acceptCookies} class=\\\"button button-brand text-3xl1 w-full mr-12\\\" style=\\\"border-radius: 0.75rem; padding: 0.75rem 1.5rem;\\\">\\r\\n                    Ok\\r\\n                </button>\\r\\n                <button on:click={declineCookies} class=\\\"button button-brand text-3xl1 w-full\\\" style=\\\"background-color: #000000; border-radius: 0.75rem; padding: 0.75rem 1.5rem;\\\">\\r\\n                    No thanks\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AACI,yBAAU,CAAC,AACP,WAAW,CAAE,MAAM,CAAC,SAAS,CAAC,CAAC,UAAU,CACzC,OAAO,QAAQ,CAAC,SAAS,CAAC,AAC9B,CAAC\"}"
};

const CookiePopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let isOpen = false;

	onMount(() => {
		let acceptedCookies = getCookie("acceptedCookies");
		if (!acceptedCookies) isOpen = true; else if (acceptedCookies !== "false") window.yett.unblock();
	});

	$$result.css.add(css$8);

	return `${isOpen
	? `<div class="${"fixed top-0 bottom-0 left-0 right-0 bg-background bg-opacity-70 flex justify-center items-center z-60"}"><div class="${"bg-variant rounded-3xl px-7 pb-8 pt-7"}" style="${"max-width: 32rem;"}"><div class="${"flex justify-end cursor-pointer"}"><svg class="${"w-10 cursor-pointer"}" viewBox="${"0 0 24 24"}" fill="${"#BEBEC2"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"}"></path></svg></div>
            <p class="${"text-5xl text-center px-5 -mt-6"}">Cookies</p>
            <p class="${"pb-10 pt-5 font-bold px-5"}" style="${"font-family: 'Roboto Condensed', sans-serif; font-size: 25px; line-height: 1.25; color: rgba(253,253,253,0.9)"}">We&#39;d like to use optional cookies to analyze site traffic <span class="${"text-primary"}">anonymously</span>.
                This help us understand how to <span class="${"text-primary"}">improve</span> the website.
            </p>
            <div class="${"flex justify-around flex-grow px-7"}"><button class="${"button button-brand text-3xl1 w-full mr-12 svelte-1jj7xx1"}" style="${"border-radius: 0.75rem; padding: 0.75rem 1.5rem;"}">Ok
                </button>
                <button class="${"button button-brand text-3xl1 w-full svelte-1jj7xx1"}" style="${"background-color: #000000; border-radius: 0.75rem; padding: 0.75rem 1.5rem;"}">No thanks
                </button></div></div></div>`
	: ``}`;
});

/* src\routes\_layout.svelte generated by Svelte v3.31.0 */

const css$9 = {
	code: ".font.svelte-2ej71o{font-family:\"Bebas Neue\", sans-serif}main.svelte-2ej71o{margin-top:calc(4rem - 2px);min-height:calc(100vh - calc(4rem - 2px))}@media(min-width: 400px){}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import Tailwindcss from \\\"../components/Tailwindcss.svelte\\\";\\r\\n    import Nav from \\\"../components/Navigation/Nav.svelte\\\";\\r\\n    import Footer from \\\"../components/Footer.svelte\\\";\\r\\n    import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n    import { eventEmitter } from \\\"../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { getCookie } from \\\"../utils/getCookie\\\";\\r\\n    import CookiePopup from \\\"../components/CookiePopup.svelte\\\";\\r\\n\\r\\n    //Show error to the user if there is one from an api request\\r\\n    let error;\\r\\n    let isShowingGuide\\r\\n    onMount(() => {\\r\\n        eventEmitter.subscribe(async e => {\\r\\n            e = e.error;\\r\\n            if (!e) return;\\r\\n            if (e instanceof Error) {\\r\\n                if (e.response) {\\r\\n                    error = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n                    setTimeout(() => {\\r\\n                        error = undefined;\\r\\n                    }, 8000);\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n\\r\\n        /*const acceptedCookieList = getCookie(\\\"acceptedCookieList\\\");\\r\\n        if (acceptedCookieList === \\\"true\\\") {\\r\\n            window.yett.unblock();\\r\\n        } else if (getCookie(\\\"hideCookiePopup\\\")) {\\r\\n            window.yett.unblock(JSON.parse(decodeURI(acceptedCookieList).replace(/%2C/g, \\\",\\\").replace(/%2F/g, \\\"/\\\")));\\r\\n        }*/\\r\\n    });\\r\\n\\r\\n    let scrollY = 0;\\r\\n    //export let segment;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .font {\\r\\n        font-family: \\\"Bebas Neue\\\", sans-serif;\\r\\n    }\\r\\n\\r\\n    main {\\r\\n        margin-top: calc(4rem - 2px);\\r\\n        min-height: calc(100vh - calc(4rem - 2px));\\r\\n    }\\r\\n\\r\\n    body {\\r\\n        margin: 0;\\r\\n        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,\\r\\n        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\\r\\n        font-size: 14px;\\r\\n        line-height: 1.5;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n    h1,\\r\\n    h2,\\r\\n    h3,\\r\\n    h4,\\r\\n    h5,\\r\\n    h6 {\\r\\n        margin: 0 0 0.5em 0;\\r\\n        font-weight: 400;\\r\\n        line-height: 1.2;\\r\\n    }\\r\\n\\r\\n    h1 {\\r\\n        font-size: 2em;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        color: inherit;\\r\\n    }\\r\\n\\r\\n    code {\\r\\n        font-family: menlo, inconsolata, monospace;\\r\\n        font-size: calc(1em - 2px);\\r\\n        color: #555;\\r\\n        background-color: #f0f0f0;\\r\\n        padding: 0.2em 0.4em;\\r\\n        border-radius: 2px;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 400px) {\\r\\n        body {\\r\\n            font-size: 16px;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<Tailwindcss />\\r\\n\\r\\n<svelte:head>\\r\\n\\r\\n    <!-- <link rel=\\\"stylesheet\\\" href=\\\"../../fontisto-master/css/fontisto/fontisto.min.css\\\" /> -->\\r\\n    <!--Adsense-->\\r\\n\\r\\n    <!-- Global site tag (gtag.js) - Google Analytics -->\\r\\n\\r\\n</svelte:head>\\r\\n\\r\\n<svelte:window bind:scrollY={scrollY} />\\r\\n<div class=\\\"font w-full bg-background min-h-screen h-full flex flex-col relative\\\" style=\\\"z-index: 0\\\">\\r\\n    {#if isShowingGuide}\\r\\n        <div class=\\\"fixed top-0 bottom-0 left-0 right-0   bg-background /bg-black bg-opacity-80 \\\" style=\\\"z-index: 55\\\"></div>\\r\\n    {/if}\\r\\n\\r\\n\\r\\n    <Nav isScrolling={scrollY > 0} />\\r\\n    {#if error}\\r\\n        <ErrorAlert message=\\\"We had some trouble getting to Winhalla\\\" pushError={error} />\\r\\n    {/if}\\r\\n\\r\\n    <main class=\\\"text-font text-default min-h-screen h-full relative z-1\\\">\\r\\n        <CookiePopup/>\\r\\n        <!--Main-->\\r\\n\\r\\n\\r\\n        <slot class=\\\"flex-grow bg-background block-grow\\\" />\\r\\n        <!--<GameModeCards page={\\\"play\\\"}/>-->\\r\\n    </main>\\r\\n    <!--<div class=\\\"fixed bottom-0 right-20 bg-background border border-b-0 border-green px-12 pt-6 rounded-t-xl\\\">\\r\\n        <Poll/>\\r\\n    </div>-->\\r\\n\\r\\n    <!--Footer-->\\r\\n    <Footer />\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAwCI,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,AACzC,CAAC,AAED,IAAI,cAAC,CAAC,AACF,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAC5B,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAC9C,CAAC,AAuCD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let error;

	onMount(() => {
		eventEmitter.subscribe(async e => {
			e = e.error;
			if (!e) return;

			if (e instanceof Error) {
				if (e.response) {
					error = e.response.data.message
					? e.response.data.message
					: e.response.data
						? e.response.data.toString()
						: e.toString();

					setTimeout(
						() => {
							error = undefined;
						},
						8000
					);
				}
			}
		});
	}); /*const acceptedCookieList = getCookie("acceptedCookieList");
if (acceptedCookieList === "true") {
    window.yett.unblock();
} else if (getCookie("hideCookiePopup")) {
    window.yett.unblock(JSON.parse(decodeURI(acceptedCookieList).replace(/%2C/g, ",").replace(/%2F/g, "/")));
}*/

	let scrollY = 0;
	$$result.css.add(css$9);

	return `${validate_component(Tailwindcss, "Tailwindcss").$$render($$result, {}, {}, {})}

${($$result.head += ``, "")}


<div class="${"font w-full bg-background min-h-screen h-full flex flex-col relative svelte-2ej71o"}" style="${"z-index: 0"}">${ ``}


    ${validate_component(Nav, "Nav").$$render($$result, { isScrolling: scrollY > 0 }, {}, {})}
    ${error
	? `${validate_component(ErrorAlert, "ErrorAlert").$$render(
			$$result,
			{
				message: "We had some trouble getting to Winhalla",
				pushError: error
			},
			{},
			{}
		)}`
	: ``}

    <main class="${"text-font text-default min-h-screen h-full relative z-1 svelte-2ej71o"}">${validate_component(CookiePopup, "CookiePopup").$$render($$result, {}, {}, {})}
        


        ${slots.default
	? slots.default({
			class: "flex-grow bg-background block-grow"
		})
	: ``}
        </main>
    

    
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout
});

/* src\routes\_error.svelte generated by Svelte v3.31.0 */

const css$a = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\texport let status;\\r\\n\\texport let error;\\r\\n\\r\\n\\tconst dev = undefined === 'development';\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\th1, p {\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-size: 2.8em;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmargin: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-size: 4em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>{status}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>{status}</h1>\\r\\n\\r\\n<p>{error.message}</p>\\r\\n\\r\\n{#if dev && error.stack}\\r\\n\\t<pre>{error.stack}</pre>\\r\\n{/if}\\r\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$a);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ ``}`;
});

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.31.0 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

// This file is generated by Sapper — do not edit it!

const ignore = [];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// account-transfer-id.svelte
		pattern: /^\/account-transfer-id\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// contact.svelte
		pattern: /^\/contact\/?$/,
		parts: [
			{ i: 2 }
		]
	},

	{
		// feltrom/admin.svelte
		pattern: /^\/feltrom\/admin\/?$/,
		parts: [
			null,
			{ i: 3 }
		]
	},

	{
		// privacy.svelte
		pattern: /^\/privacy\/?$/,
		parts: [
			{ i: 4 }
		]
	},

	{
		// status.svelte
		pattern: /^\/status\/?$/,
		parts: [
			{ i: 5 }
		]
	},

	{
		// legal.svelte
		pattern: /^\/legal\/?$/,
		parts: [
			{ i: 6 }
		]
	},

	{
		// login.svelte
		pattern: /^\/login\/?$/,
		parts: [
			{ i: 7 }
		]
	},

	{
		// terms.svelte
		pattern: /^\/terms\/?$/,
		parts: [
			{ i: 8 }
		]
	},

	{
		// link/[id].svelte
		pattern: /^\/link\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 9, params: match => ({ id: d(match[1]) }) }
		]
	},

	{
		// ios.svelte
		pattern: /^\/ios\/?$/,
		parts: [
			{ i: 10 }
		]
	}
])(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

let uid = 1;
let cid;
const _history = typeof history !== 'undefined' ? history : {
    pushState: () => { },
    replaceState: () => { },
    scrollRestoration: 'auto'
};
const scroll_history = {};
let base_url;
let handle_target;
function extract_query(search) {
    const query = Object.create(null);
    if (search.length > 0) {
        search.slice(1).split('&').forEach(searchParam => {
            const [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
            if (typeof query[key] === 'string')
                query[key] = [query[key]];
            if (typeof query[key] === 'object')
                query[key].push(value);
            else
                query[key] = value;
        });
    }
    return query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(base_url))
        return null;
    let path = url.pathname.slice(base_url.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const match = route.pattern.exec(path);
        if (match) {
            const query = extract_query(url.search);
            const part = route.parts[route.parts.length - 1];
            const params = part.params ? part.params(match) : {};
            const page = { host: location.host, path, query, params };
            return { href: url.href, route, match, page };
        }
    }
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const popstate = !!id;
        if (popstate) {
            cid = id;
        }
        else {
            const current_scroll = scroll_state();
            // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
        }
        yield handle_target();
        if (document.activeElement && (document.activeElement instanceof HTMLElement))
            document.activeElement.blur();
        if (!noscroll) {
            let scroll = scroll_history[id];
            let deep_linked;
            if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));
                if (deep_linked) {
                    scroll = {
                        x: 0,
                        y: deep_linked.getBoundingClientRect().top + scrollY
                    };
                }
            }
            scroll_history[cid] = scroll;
            if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
            }
            else {
                scrollTo(0, 0);
            }
        }
    });
}

function get_base_uri(window_document) {
    let baseURI = window_document.baseURI;
    if (!baseURI) {
        const baseTags = window_document.getElementsByTagName('base');
        baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
    }
    return baseURI;
}

function goto(href, opts = { noscroll: false, replaceState: false }) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target, null, opts.noscroll);
    }
    location.href = href;
    return new Promise(() => {
        /* never resolves */
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
stores.session.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    return;
}));

/* src\routes\feltrom\admin.svelte generated by Svelte v3.31.0 */

const css$b = {
	code: "input[type=text].svelte-19m6snl{@apply py-1 px-2;}.input.svelte-19m6snl{@apply w-full text-background bg-font py-3 px-4 rounded;}button.svelte-19m6snl:disabled{@apply bg-disabled;;cursor:not-allowed}.input-header.svelte-19m6snl{@apply text-primary text-3xl;;margin-bottom:0.35rem}.h1.svelte-19m6snl,.p.svelte-19m6snl{margin:0 auto}.h1.svelte-19m6snl{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}.p.svelte-19m6snl{margin:1em auto}@media(min-width: 480px){.h1.svelte-19m6snl{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"admin.svelte\",\"sources\":[\"admin.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { fade, fly } from \\\"svelte/transition\\\";\\r\\n    import Loading from \\\"../../components/Loading.svelte\\\";\\r\\n    import UsersArray from \\\"../../components/admin/UsersArray.svelte\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n    import { config } from \\\"../../components/admin/storeAdmin.js\\\";\\r\\n    import RefreshButton from \\\"../../components/RefreshButton.svelte\\\";\\r\\n    import ConfigEditor from \\\"../../components/admin/ConfigEditor.svelte\\\";\\r\\n    import UsersConfig from \\\"../../components/admin/UsersConfig.svelte\\\";\\r\\n    import PopupAdmin from \\\"../../components/admin/PopupAdmin.svelte\\\";\\r\\n    import StatsPanel from \\\"../../components/admin/StatsPanel.svelte\\\";\\r\\n\\r\\n    let configs;\\r\\n    let isAuthorizedUser = false;\\r\\n    let isLoggedIn = false;\\r\\n    let otp = \\\"\\\";\\r\\n    let pwd = \\\"\\\";\\r\\n    let users;\\r\\n    let activePanel = \\\"stats\\\";\\r\\n    let newConfig;\\r\\n    let goldEvent = [];\\r\\n    let loadingUsers;\\r\\n    let suspiciousBitches = [];\\r\\n    let suspiciousUsersFound = 0;\\r\\n    let bannedOnes = [];\\r\\n    let commands;\\r\\n    let popup = {};\\r\\n    let isSavingConfig;\\r\\n    let infoDates = [];\\r\\n    let totalCoins = 0;\\r\\n    let paypalCommands = [];\\r\\n\\r\\n    async function loadUsers() {\\r\\n        loadingUsers = true;\\r\\n        suspiciousBitches = [];\\r\\n        suspiciousUsersFound = 0;\\r\\n        bannedOnes = [];\\r\\n        users = await callApi(\\\"get\\\", `/feltrom/users?otp=${otp}&pwd=${pwd}`);\\r\\n\\r\\n        for (let i = 0; i < users.length * 2; i++) {\\r\\n            if (!users[i - suspiciousUsersFound]) continue;\\r\\n            totalCoins += users[i - suspiciousUsersFound].coins;\\r\\n            users[i - suspiciousUsersFound].winrate = Math.round((users[i - suspiciousUsersFound].stats?.solo.wins / users[i - suspiciousUsersFound].stats.solo.gamesPlayed) * 100);\\r\\n            if (isNaN(users[i - suspiciousUsersFound].winrate)) users[i - suspiciousUsersFound].winrate = 0;\\r\\n            if (users[i - suspiciousUsersFound].isSucpicious.ffa === true || users[i - suspiciousUsersFound].isSucpicious.solo === true) {\\r\\n                suspiciousBitches.push(...users.splice(i - suspiciousUsersFound, 1));\\r\\n                suspiciousUsersFound += 1;\\r\\n            }\\r\\n        }\\r\\n        sortArrays((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));\\r\\n\\r\\n        bannedOnes = configs.find(e => e.name === \\\"IDs BANNED\\\").value;\\r\\n        bannedOnes.forEach((ban, i) => {\\r\\n            let user = users.splice(users.findIndex(e => e.steamId === ban.id), 1)[0];\\r\\n            let winrate = Math.round((user.stats?.solo?.wins / user.stats?.solo?.gamesPlayed) * 100);\\r\\n            if (isNaN(winrate)) winrate = 0;\\r\\n            bannedOnes[i] = user;\\r\\n            bannedOnes[i].reason = ban.reason;\\r\\n            users = users;\\r\\n            suspiciousBitches = suspiciousBitches;\\r\\n        });\\r\\n\\r\\n\\r\\n        loadingUsers = false;\\r\\n    }\\r\\n\\r\\n    async function loadCommands() {\\r\\n        commands = await callApi(\\\"get\\\", `/feltrom/commands?otp=${otp}&pwd=${pwd}`);\\r\\n        paypalCommands = commands.filter(e => e.type === \\\"paypal\\\");\\r\\n        commands = commands.filter(e => e.type !== \\\"paypal\\\");\\r\\n        commands.sort((a, b) => a.date - b.date);\\r\\n    }\\r\\n\\r\\n    async function login(refresh) {\\r\\n        if (!pwd) return;\\r\\n        goldEvent = [\\\"\\\", \\\"\\\", \\\"\\\", \\\"\\\"];\\r\\n        isLoggedIn = true;\\r\\n        configs = await callApi(\\\"get\\\", `/feltrom/config?otp=${otp}&pwd=${pwd}`);\\r\\n        otp = configs.tempKey;\\r\\n        configs = configs.configs;\\r\\n        let polls = await callApi(\\\"get\\\", `/feltrom/getAllPolls?otp=${otp}&pwd=${pwd}`);\\r\\n        configs.push({ name: \\\"POLLS\\\", value: polls });\\r\\n        newConfig = configs;\\r\\n        configs = JSON.stringify(configs);\\r\\n        configs = JSON.parse(configs);\\r\\n        newConfig[3].value.forEach((e, i) => {\\r\\n            infoDates[i] = new Date(e.expiration);\\r\\n        });\\r\\n        if (refresh.users === true) loadUsers();\\r\\n        if (refresh.commands === true) loadCommands();\\r\\n    }\\r\\n\\r\\n\\r\\n    function logout() {\\r\\n        callApi(\\\"post\\\", `/feltrom/logout?otp=${otp}&pwd=${pwd}`);\\r\\n        goto(\\\"/\\\");\\r\\n    }\\r\\n\\r\\n    function sortArrays(fx) {\\r\\n        users.sort(fx);\\r\\n        suspiciousBitches.sort(fx);\\r\\n    }\\r\\n\\r\\n\\r\\n    onMount(async () => {\\r\\n        isAuthorizedUser = (await callApi(\\\"get\\\", \\\"/feltrom/login\\\")) === true;\\r\\n        config.subscribe(login);\\r\\n    });\\r\\n\\r\\n    function resetConfig() {\\r\\n        newConfig = configs;\\r\\n        configs = JSON.stringify(configs);\\r\\n        configs = JSON.parse(configs);\\r\\n    }\\r\\n\\r\\n    async function saveConfig() {\\r\\n        isSavingConfig = true;\\r\\n        //Handle event changes\\r\\n        if (newConfig[4].value.expTime) {\\r\\n            let expiration = Date.parse(newConfig[4].value.expDate + \\\"T\\\" + newConfig[4].value.expTime);\\r\\n            delete newConfig[4].value.expTime;\\r\\n            delete newConfig[4].value.expDate;\\r\\n            newConfig[4].value.expiration = expiration;\\r\\n            newConfig[3].value[newConfig[3].value.findIndex(e => e.type === \\\"event\\\")].expiration = expiration;\\r\\n        }\\r\\n        await callApi(\\\"post\\\", `/feltrom/save?otp=${otp}&pwd=${pwd}`, newConfig);\\r\\n        login({ users: true, commands: false });\\r\\n        isSavingConfig = false;\\r\\n    }\\r\\n</script>\\r\\n<style global>\\r\\n    input[type=text] {\\r\\n        @apply py-1 px-2;\\r\\n    }\\r\\n\\r\\n    .input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        @apply text-lg mt-1;\\r\\n    }\\r\\n\\r\\n    .input-header {\\r\\n        @apply text-primary text-3xl;\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .check {\\r\\n        margin-top: 0.15rem;\\r\\n        margin-right: 0.4rem;\\r\\n    }\\r\\n\\r\\n    .h1, .p {\\r\\n        margin: 0 auto;\\r\\n    }\\r\\n\\r\\n    .h1 {\\r\\n        font-size: 2.8em;\\r\\n        font-weight: 700;\\r\\n        margin: 0 0 0.5em 0;\\r\\n    }\\r\\n\\r\\n    .p {\\r\\n        margin: 1em auto;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 480px) {\\r\\n        .h1 {\\r\\n            font-size: 4em;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n<svelte:head>\\r\\n    {#if isAuthorizedUser}\\r\\n        <title>Admin dashboard - Winhalla</title>\\r\\n    {:else}\\r\\n        <title>404</title>\\r\\n    {/if}\\r\\n</svelte:head>\\r\\n{#if isAuthorizedUser && !isLoggedIn}\\r\\n    <div>\\r\\n        <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n            <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\">\\r\\n                <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                        ADMIN DASHBOARD\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"md:mt-4\\\">\\r\\n                    <p class=\\\"input-header\\\">Password</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            placeholder=\\\"Personal password\\\"\\r\\n                            bind:value={pwd}\\r\\n                            type=\\\"password\\\"\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled input\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"md:mt-4\\\">\\r\\n                    <p class=\\\"input-header\\\">Authenticator password</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            type=\\\"text\\\"\\r\\n                            maxlength=\\\"6\\\"\\r\\n                            placeholder=\\\"Google authenticator OTP\\\"\\r\\n                            bind:value={otp}\\r\\n                            class=\\\"input input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <button\\r\\n                    on:click={login}\\r\\n                    class=\\\"button button-brand mt-3\\\">\\r\\n                    Login\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{:else if isLoggedIn}\\r\\n    {#if !configs}\\r\\n        <div out:fade={{duration:100}} class=\\\"z-50 bg-background absolute\\\">\\r\\n            <Loading data=\\\"Entering super secret page...\\\" />\\r\\n        </div>\\r\\n    {/if}\\r\\n    {#if newConfig }\\r\\n        <div class=\\\"lg:block px-4 lg:px-24 mt-7 lg:mt-12 h-full w-full\\\">\\r\\n            <div class=\\\"lg:flex lg:justify-between mb-12\\\">\\r\\n                <div class=\\\"flex\\\">\\r\\n                    <h1 class=\\\"text-6xl mx-auto\\\">ADMIN DASHBOARD</h1></div>\\r\\n                <div class=\\\"flex\\\">\\r\\n                    <button class=\\\"button button-brand mx-auto\\\" on:click={logout}>Logout</button>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n            <h2 class=\\\"text-3xl mb-2\\\">View :\\r\\n                <strong class=\\\"text-3xl cursor-pointer font-normal\\\" class:text-primary={activePanel === \\\"config\\\"}\\r\\n                        class:text-4xl={activePanel === \\\"config\\\"} on:click={()=>activePanel = \\\"config\\\"}>CONFIG</strong>,\\r\\n                <strong class=\\\"text-3xl cursor-pointer font-normal\\\" class:text-primary={activePanel === \\\"users\\\"}\\r\\n                        class:text-4xl={activePanel === \\\"users\\\"}\\r\\n                        on:click={()=>{activePanel = \\\"users\\\";if(!users)loadUsers()}}>USERS</strong>,\\r\\n                <strong class=\\\"text-3xl cursor-pointer font-normal\\\" class:text-primary={activePanel === \\\"commands\\\"}\\r\\n                        class:text-4xl={activePanel === \\\"commands\\\"}\\r\\n                        on:click={()=>{activePanel = \\\"commands\\\";if(!commands)loadCommands()}}>COMMANDS</strong>,\\r\\n                <strong class=\\\"text-3xl cursor-pointer font-normal\\\" class:text-primary={activePanel === \\\"stats\\\"}\\r\\n                        class:text-4xl={activePanel === \\\"stats\\\"}\\r\\n                        on:click={()=>{activePanel = \\\"stats\\\";if(!commands)loadCommands()}}>STATS</strong>\\r\\n            </h2>\\r\\n            <div class=\\\"w-full\\\">\\r\\n                {#if configs && activePanel === \\\"config\\\"}\\r\\n                    <ConfigEditor bind:popup={popup} bind:newConfig={newConfig} bind:goldEvent={goldEvent}\\r\\n                                  bind:bannedOnes={bannedOnes} otp={otp} pwd={pwd} bind:infoDates={infoDates} />\\r\\n                {:else if activePanel === \\\"users\\\"}\\r\\n                    {#if !loadingUsers}\\r\\n                        <UsersConfig bind:users={users} bind:suspiciousBitches={suspiciousBitches}\\r\\n                                     totalCoins={totalCoins} pwd={pwd} otp={otp} sortArrays={sortArrays} />\\r\\n                    {:else}\\r\\n                        <RefreshButton isRefreshing refreshMessage=\\\"{'Loading...'}\\\" />\\r\\n                    {/if}\\r\\n                {:else if activePanel === \\\"commands\\\"}\\r\\n                    {#if !commands}\\r\\n                        <RefreshButton isRefreshing refreshMessage=\\\"{'Loading...'}\\\" />\\r\\n                    {:else}\\r\\n                        <div class=\\\"content-center\\\">\\r\\n                            {#if paypalCommands.length > 0}\\r\\n                                <div class=\\\"mb-10\\\">\\r\\n                                    <UsersArray color=\\\"blue\\\" bind:users=\\\"{paypalCommands}\\\" paypal={true} type=\\\"simple\\\"\\r\\n                                                pwd=\\\"{pwd}\\\" otp={otp} />\\r\\n                                </div>\\r\\n                            {:else}\\r\\n                                <p class=\\\"text-3xl text-green\\\"> No paypal orders waiting</p>\\r\\n                            {/if}\\r\\n                            {#if commands.length > 0}\\r\\n                                <div>\\r\\n\\r\\n                                    <UsersArray color=\\\"blue\\\" users=\\\"{commands}\\\" type=\\\"simple\\\" pwd=\\\"{pwd}\\\" otp={otp} />\\r\\n                                </div>\\r\\n                                {:else}\\r\\n                                <p class=\\\"text-3xl text-green\\\"> No commands waiting</p>\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                {:else if activePanel === \\\"stats\\\"}\\r\\n                    <StatsPanel pwd=\\\"{pwd}\\\" otp={otp} />\\r\\n                {/if}\\r\\n\\r\\n\\r\\n                <PopupAdmin bind:popup={popup} bind:configs={configs} bind:newConfig={newConfig} pwd={pwd} otp={otp} />\\r\\n            </div>\\r\\n        </div>\\r\\n        {#if JSON.stringify(newConfig.filter(e => e.name !== \\\"IDs BANNED\\\").map(e => e.value)) !== JSON.stringify(configs.filter(e => e.name !== \\\"IDs BANNED\\\").map(e => e.value))}\\r\\n            <div\\r\\n                class=\\\"fixed top-screen-90 w-full\\\">\\r\\n                <div transition:fly|local={{y:150, duration:500}}\\r\\n                     class=\\\"flex justify-between content-center rounded mx-auto bg-black border border-legendary px-6 py-3 w-90%\\\">\\r\\n                    <p class=\\\"my-auto\\\">Carefully, you have unsaved changes</p>\\r\\n                    <div class=\\\"flex\\\">\\r\\n                        <button class=\\\"button button-brand border border-primary mr-2\\\"\\r\\n                                style=\\\"background-color: #000000;padding: -1px\\\"\\r\\n                                on:click={resetConfig}>\\r\\n                            Reset changes\\r\\n                        </button>\\r\\n                        <RefreshButton on:click={saveConfig} refreshMessage=\\\"Save changes\\\"\\r\\n                                       onRefreshMessage=\\\"Saving...\\\" isRefreshing={isSavingConfig} />\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        {/if}\\r\\n    {/if}\\r\\n\\r\\n{:else}\\r\\n    <h1 class=\\\"h1\\\">404</h1>\\r\\n    <p class=\\\"p\\\">Not found</p>\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AAqII,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,eAAC,CAAC,AACd,OAAO,IAAI,CAAC,IAAI,CAAC,AACrB,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC,AAED,qBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAMD,aAAa,eAAC,CAAC,AACX,OAAO,YAAY,CAAC,QAAQ,CAAC,CAC7B,aAAa,CAAE,OAAO,AAC1B,CAAC,AAOD,kBAAG,CAAE,EAAE,eAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AAED,GAAG,eAAC,CAAC,AACD,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACvB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,MAAM,CAAE,GAAG,CAAC,IAAI,AACpB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACvB,GAAG,eAAC,CAAC,AACD,SAAS,CAAE,GAAG,AAClB,CAAC,AACL,CAAC\"}"
};

const Admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let isAuthorizedUser = false;
	let isLoggedIn = false;
	let otp = "";
	let pwd = "";

	async function login(refresh) {
		return;
	}

	onMount(async () => {
		isAuthorizedUser = await callApi("get", "/feltrom/login") === true;
		config.subscribe(login);
	});

	$$result.css.add(css$b);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `${($$result.head += `${isAuthorizedUser
		? `${($$result.title = `<title>Admin dashboard - Winhalla</title>`, "")}`
		: `${($$result.title = `<title>404</title>`, "")}`}`, "")}
${isAuthorizedUser && !isLoggedIn
		? `<div><div class="${"flex items-center justify-center md:h-screen-7"}"><div class="${"flex flex-col justify-center px-5 md:p-0"}"><div class="${"text-center md:text-left mt-7 md:mt-12"}"><h1 class="${"text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"}">ADMIN DASHBOARD
                    </h1></div>
                <div class="${"md:mt-4"}"><p class="${"input-header svelte-19m6snl"}">Password</p>
                    <div><input placeholder="${"Personal password"}" type="${"password"}" class="${"input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled input svelte-19m6snl"}"${add_attribute("value", pwd, 1)}></div></div>
                <div class="${"md:mt-4"}"><p class="${"input-header svelte-19m6snl"}">Authenticator password</p>
                    <div><input type="${"text"}" maxlength="${"6"}" placeholder="${"Google authenticator OTP"}" class="${"input input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-19m6snl"}"${add_attribute("value", otp, 1)}></div></div>
                <button class="${"button button-brand mt-3 svelte-19m6snl"}">Login
                </button></div></div></div>`
		: `${ `<h1 class="${"h1 svelte-19m6snl"}">404</h1>
    <p class="${"p svelte-19m6snl"}">Not found</p>`}`}`;
	} while (!$$settled);

	return $$rendered;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Admin
});

/* src\routes\privacy.svelte generated by Svelte v3.31.0 */

const css$c = {
	code: "h2.svelte-1fbtrh0{@apply text-4xl mt-6 mb-3 underline;}.div.svelte-1fbtrh0{background-color:#FFFFFF;color:#000000\r\n    }p.svelte-1fbtrh0{@apply py-2px;}a.svelte-1fbtrh0{@apply underline;}",
	map: "{\"version\":3,\"file\":\"privacy.svelte\",\"sources\":[\"privacy.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n\\r\\n    let confirmationPopupOpen;\\r\\n    let pushError;\\r\\n    let message;\\r\\n\\r\\n    /*function makePopup(whatFor) {\\r\\n        confirmationPopupOpen = whatFor;\\r\\n    }\\r\\n\\r\\n    async function confirm(what) {\\r\\n        if (what === \\\"delete account\\\") {\\r\\n            await callApi(\\\"delete\\\", \\\"/auth/deleteAccount\\\");\\r\\n            actionDone(\\\"account deleted\\\");\\r\\n        } else if (what === \\\"restrict processing\\\") {\\r\\n            await callApi(\\\"patch\\\", \\\"/auth/moveAccount\\\");\\r\\n            actionDone(\\\"account moved\\\");\\r\\n        }\\r\\n        confirmationPopupOpen = undefined;\\r\\n    }\\r\\n\\r\\n    function actionDone(action) {\\r\\n        if (action === \\\"cookieConsentReset\\\") {\\r\\n            document.cookie = \\\"hideCookiePopup=;expires=Thu, 01 Jan 1970 00:00:00 GMT\\\";\\r\\n            pushError = \\\"Refresh the page to edit your cookies consent\\\";\\r\\n            message = \\\"One more step\\\";\\r\\n        } else if (action === \\\"account deleted\\\") {\\r\\n            pushError = \\\"Steam data may take up to 30 days to be deleted\\\";\\r\\n            message = \\\"Account successfully deleted\\\";\\r\\n        } else if (action === \\\"account moved\\\") {\\r\\n            pushError = \\\"\\\";\\r\\n            message = \\\"Data process restriction applied\\\";\\r\\n        }\\r\\n        setTimeout(() => {\\r\\n            pushError = undefined;\\r\\n            message = undefined;\\r\\n        }, 10000);\\r\\n    }*/\\r\\n</script>\\r\\n<svelte:head>\\r\\n    <title>Privacy policy | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n\\r\\n    ul {\\r\\n        list-style-type: disc;\\r\\n        @apply ml-6 my-3;\\r\\n    }\\r\\n\\r\\n    .div {\\r\\n        background-color: #FFFFFF;\\r\\n        color: #000000\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n\\r\\n    .btn {\\r\\n        background-color: #FFFFFF;\\r\\n        border: 1px solid #000000;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8 \\\"\\r\\n     style=\\\"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);\\\">\\r\\n    <h1 class=\\\"text-5xl underline mb-4\\\">Privacy Policy</h1>\\r\\n    <p>Winhalla SAS operates the Winhalla app (\\\"App\\\"), which provides the SERVICE.</p>\\r\\n\\r\\n    <p>This page is used to inform the Site visitors and App users regarding our policies with the collection, use, and disclosure of\\r\\n        Personal Information if anyone decided to use our Service, the App. </p>\\r\\n    <p>We therefore only use your personal data within the scope of legal regulations, in particular the General Data\\r\\n        Protection Regulation (\\\"GDPR\\\")</p>\\r\\n    <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this\\r\\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\\r\\n        use or share your information with anyone except as described in this Privacy Policy.</p>\\r\\n    \\r\\n    <h2>Premamble.</h2>\\r\\n    <p>This website (https://winhalla.app) is only for presentation purposes of the App, only analytical anonymised data is collected. \\r\\n        Cookies may be deposited in order to provide this analytical data.\\r\\n        This analytical data is collected by Google Analytics, but only accessible to Winhalla.</p>\\r\\n\\r\\n    <h2>I. Account data</h2>\\r\\n    <p>NO DATA REGARDING YOUR ACCOUNT IS SOLD, RENT, OR SHARED WITH ANY THIRD-PARTY</p>\\r\\n    <p>To use the App, you have the option between login with Apple ID and login with a Google Account. Only email, name and, if applicable, profile picture, are collected</p>\\r\\n    <p>Next, you are prompted to enter a Brawlhalla ID, which may be shared with Brawlhalla's API (<a\\r\\n        href=\\\"https://api.brawlhalla.com\\\">https://api.brawlhalla.com</a>) to provide the Service</p>\\r\\n    <p>If you choose another platform than Steam, you will be prompted to enter your Brawlhalla ID. By\\r\\n        submitting the Brawlhalla ID, you certify that you own the Brawlhalla account with the Brawlhalla ID you mentioned.\\r\\n        Otherwise your account and access to the Service may be terminated</p>\\r\\n    <p>If you choose Steam as a platform when logging in, your SteamID may be collected and stored in order to ensure your account is a real one</p>\\r\\n    <p id=\\\"analytical\\\">All your account data is kept until you delete your account and may be processed by our servers to provide the Service in its entirety</p>\\r\\n\\r\\n    <h2>II. Analytical software</h2>\\r\\n    <p>We are using - like any other app - an analytical software. This software helps us to understand our traffic\\r\\n        and its fluctuations</p>\\r\\n    <p id=\\\"advertising\\\">This analytical software collects data and links it to your account. The data is linked to your account for the sole purpose of understanding automatic crash reports better, or providing better help if you have problems regarding the app.\\r\\n        However this data is sent to Google Analytics which will process the data (and may process it outside the European Economic Area (EEA)) in order\\r\\n        to allow us to use this data </p>\\r\\n\\r\\n    <h2>III. Advertising</h2>\\r\\n    <p>We are using ads, because a app doesn't update and hosts itself! Our ads are provided by third-party services\\r\\n        (To read our policy about thrd-party services, <a href=\\\"/terms#3rdParty\\\">click here</a>)</p>\\r\\n\\r\\n    <p>We use Google AdMob as our ad provider. They might access your IDFA (Advertising ID) in order to serve personalized ads. Refer to your device's specific method to mask and deactivate IDFA.</p>\\r\\n    <p>You can read AdMob's privacy policy here : <a href=\\\"https://policies.google.com/privacy\\\">https://policies.google.com/privacy</a>\\r\\n    </p>\\r\\n\\r\\n    <h2>IV. Crash reports</h2>\\r\\n    <p>If an error occurs in the App's code, an error report is automatically sent to Firebase Crashlytics, which allows us to analyse these crash reports</p>\\r\\n    <p>Crash reports are linked to your account, in order to help us resolve potential bugs faster.</p>\\r\\n    <!--<h2 id=\\\"edit_consent\\\">V. Edit your consent and claim your rights</h2>\\r\\n    <div class=\\\"\\\">\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\"\\r\\n                on:click={()=>actionDone(\\\"cookieConsentReset\\\")}>Edit cookie\\r\\n            consent\\r\\n        </button>\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\" on:click={()=>makePopup(\\\"delete account\\\")}>Delete Account</button>\\r\\n        <a class=\\\"btn px-2 py-2 mx-6\\\" style=\\\"text-decoration: none\\\" href=\\\"{apiUrl}/auth/downloadData\\\" download>Download\\r\\n            Data</a>\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\" on:click={() =>makePopup('restrict processing')}>Restrict Processing</button>\\r\\n        (Restrict processing\\r\\n        will make your account unusable but we still keep your data)\\r\\n    </div>\\r\\n    <h3 class=\\\"text-2xl\\\">Other GDPR-related user rights can be claimed via email <a href=\\\"mailto:contact@winhalla.app\\\">here</a>\\r\\n    </h3>-->\\r\\n\\r\\n    <h2>VI. Changes to This Privacy Policy</h2>\\r\\n    <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\\r\\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\\r\\n        change in the App. These changes are effective immediately, after they are posted on this page.</p>\\r\\n\\r\\n    <h2>VII. Contact Us</h2>\\r\\n\\r\\n    <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a\\r\\n        href=\\\"mailto:contact@winhalla.app\\\">contact@winhalla.app</a></p>\\r\\n</div>\\r\\n{#if confirmationPopupOpen}\\r\\n    <div class=\\\"fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0\\\"\\r\\n         transition:fade={{duration:200}}>\\r\\n    </div>\\r\\n    <div class=\\\"fixed flex w-screen h-screen z-50 left-0 top-0\\\"\\r\\n         transition:fade={{duration:200}}>\\r\\n        <div\\r\\n            class=\\\"justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8\\\"\\r\\n            style=\\\"margin-top:20vh\\\">\\r\\n            <h1 class=\\\"text-5xl text-primary\\\">Confirm {confirmationPopupOpen}</h1>\\r\\n            {#if confirmationPopupOpen === \\\"delete account\\\"}\\r\\n                <p class=\\\"ml-4 text-3xl mt-6\\\">Warning: this action is <u>not cancellable</u>. <br> All data will be lost\\r\\n                    <u>forever</u></p>\\r\\n            {:else if confirmationPopupOpen === \\\"restrict processing\\\"}\\r\\n                <p class=\\\"ml-4 text-3xl mt-6\\\">Warning: this action will make your account <u>unusable</u>. <br>However,\\r\\n                    we will still keep your account data and will be able to restore it if you ask us <a\\r\\n                        href=\\\"mailto:contact@winhalla.app\\\">here</a> with you account ID you can obtain by downloading\\r\\n                    you data (download it before restricting processing of your account)</p>\\r\\n            {/if}\\r\\n            <div>\\r\\n                <div class=\\\"overflow-auto max-h-screen-50\\\">\\r\\n                    <div class=\\\"justify-center w-full flex\\\">\\r\\n                        <button class=\\\"button button-brand mt-8\\\"\\r\\n                                style=\\\"background-color:#fc1870\\\"\\r\\n                                on:click={()=>confirm(confirmationPopupOpen)}>\\r\\n                            Confirm {confirmationPopupOpen}\\r\\n                        </button>\\r\\n                        <button class=\\\"button button-brand mt-8 border ml-5 border-legendary\\\"\\r\\n                                style=\\\"background-color: #17171a;padding: -1px\\\"\\r\\n                                on:click={()=>confirmationPopupOpen=undefined}>\\r\\n                            Cancel\\r\\n                        </button>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n{#if message}\\r\\n    <Infos pushError={pushError} message={message} />\\r\\n{/if}\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA6CI,EAAE,eAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAOD,IAAI,eAAC,CAAC,AACF,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO;IAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Privacy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$c);

	return `${($$result.head += `${($$result.title = `<title>Privacy policy | Winhalla</title>`, "")}`, "")}

<div class="${"h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-1fbtrh0"}" style="${"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);"}"><h1 class="${"text-5xl underline mb-4"}">Privacy Policy</h1>
    <p class="${"svelte-1fbtrh0"}">Winhalla SAS operates the Winhalla app (&quot;App&quot;), which provides the SERVICE.</p>

    <p class="${"svelte-1fbtrh0"}">This page is used to inform the Site visitors and App users regarding our policies with the collection, use, and disclosure of
        Personal Information if anyone decided to use our Service, the App. </p>
    <p class="${"svelte-1fbtrh0"}">We therefore only use your personal data within the scope of legal regulations, in particular the General Data
        Protection Regulation (&quot;GDPR&quot;)</p>
    <p class="${"svelte-1fbtrh0"}">If you choose to use our Service, then you agree to the collection and use of information in relation with this
        policy. The Personal Information that we collect are used for providing and improving the Service. We will not
        use or share your information with anyone except as described in this Privacy Policy.</p>
    
    <h2 class="${"svelte-1fbtrh0"}">Premamble.</h2>
    <p class="${"svelte-1fbtrh0"}">This website (https://winhalla.app) is only for presentation purposes of the App, only analytical anonymised data is collected. 
        Cookies may be deposited in order to provide this analytical data.
        This analytical data is collected by Google Analytics, but only accessible to Winhalla.</p>

    <h2 class="${"svelte-1fbtrh0"}">I. Account data</h2>
    <p class="${"svelte-1fbtrh0"}">NO DATA REGARDING YOUR ACCOUNT IS SOLD, RENT, OR SHARED WITH ANY THIRD-PARTY</p>
    <p class="${"svelte-1fbtrh0"}">To use the App, you have the option between login with Apple ID and login with a Google Account. Only email, name and, if applicable, profile picture, are collected</p>
    <p class="${"svelte-1fbtrh0"}">Next, you are prompted to enter a Brawlhalla ID, which may be shared with Brawlhalla&#39;s API (<a href="${"https://api.brawlhalla.com"}" class="${"svelte-1fbtrh0"}">https://api.brawlhalla.com</a>) to provide the Service</p>
    <p class="${"svelte-1fbtrh0"}">If you choose another platform than Steam, you will be prompted to enter your Brawlhalla ID. By
        submitting the Brawlhalla ID, you certify that you own the Brawlhalla account with the Brawlhalla ID you mentioned.
        Otherwise your account and access to the Service may be terminated</p>
    <p class="${"svelte-1fbtrh0"}">If you choose Steam as a platform when logging in, your SteamID may be collected and stored in order to ensure your account is a real one</p>
    <p id="${"analytical"}" class="${"svelte-1fbtrh0"}">All your account data is kept until you delete your account and may be processed by our servers to provide the Service in its entirety</p>

    <h2 class="${"svelte-1fbtrh0"}">II. Analytical software</h2>
    <p class="${"svelte-1fbtrh0"}">We are using - like any other app - an analytical software. This software helps us to understand our traffic
        and its fluctuations</p>
    <p id="${"advertising"}" class="${"svelte-1fbtrh0"}">This analytical software collects data and links it to your account. The data is linked to your account for the sole purpose of understanding automatic crash reports better, or providing better help if you have problems regarding the app.
        However this data is sent to Google Analytics which will process the data (and may process it outside the European Economic Area (EEA)) in order
        to allow us to use this data </p>

    <h2 class="${"svelte-1fbtrh0"}">III. Advertising</h2>
    <p class="${"svelte-1fbtrh0"}">We are using ads, because a app doesn&#39;t update and hosts itself! Our ads are provided by third-party services
        (To read our policy about thrd-party services, <a href="${"/terms#3rdParty"}" class="${"svelte-1fbtrh0"}">click here</a>)</p>

    <p class="${"svelte-1fbtrh0"}">We use Google AdMob as our ad provider. They might access your IDFA (Advertising ID) in order to serve personalized ads. Refer to your device&#39;s specific method to mask and deactivate IDFA.</p>
    <p class="${"svelte-1fbtrh0"}">You can read AdMob&#39;s privacy policy here : <a href="${"https://policies.google.com/privacy"}" class="${"svelte-1fbtrh0"}">https://policies.google.com/privacy</a></p>

    <h2 class="${"svelte-1fbtrh0"}">IV. Crash reports</h2>
    <p class="${"svelte-1fbtrh0"}">If an error occurs in the App&#39;s code, an error report is automatically sent to Firebase Crashlytics, which allows us to analyse these crash reports</p>
    <p class="${"svelte-1fbtrh0"}">Crash reports are linked to your account, in order to help us resolve potential bugs faster.</p>
    

    <h2 class="${"svelte-1fbtrh0"}">VI. Changes to This Privacy Policy</h2>
    <p class="${"svelte-1fbtrh0"}">We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these
        change in the App. These changes are effective immediately, after they are posted on this page.</p>

    <h2 class="${"svelte-1fbtrh0"}">VII. Contact Us</h2>

    <p class="${"svelte-1fbtrh0"}">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="${"mailto:contact@winhalla.app"}" class="${"svelte-1fbtrh0"}">contact@winhalla.app</a></p></div>
${ ``}
${ ``}`;
});

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Privacy
});

/* src\routes\status.svelte generated by Svelte v3.31.0 */

const Status = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let isApiDown = false;

	onMount(async () => {
		try {
			const testError = await getUser();

			if (!(testError instanceof Error)) {
				return goto("/");
			}

			isApiDown = true;
		} catch(e) {
			isApiDown = true;
		}
	});

	return `${($$result.head += `<meta name="${"robots"}" content="${"noindex"}" data-svelte="svelte-1tdq6x3">`, "")}

${isApiDown
	? `<div class="${"flex items-center justify-center h-screen-60 px-4 w-full lg:mt-10 mt-8 lg:mx-0"}"><div class="${"text-center"}"><p class="${"text-6xl lg:text-8xl"}">Our services are down</p><br>
            <p class="${"text-3xl lg:text-4xl text-mid-light"}">We will be back as soon as possible !</p></div></div>`
	: ``}`;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Status
});

/* src\routes\legal.svelte generated by Svelte v3.31.0 */

const css$d = {
	code: "h2.svelte-1i8br0p{@apply text-4xl mt-6 mb-3 underline;}p.svelte-1i8br0p{@apply py-2px;}a.svelte-1i8br0p{@apply underline;}",
	map: "{\"version\":3,\"file\":\"legal.svelte\",\"sources\":[\"legal.svelte\"],\"sourcesContent\":[\"<svelte:head>\\r\\n    <title>Legal mentions | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n    ul{\\r\\n        list-style-type:disc;\\r\\n        @apply ml-6 my-3;\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"lg:px-100 lg:pt-20 px-8 py-4\\\">\\r\\n    <h1 class=\\\"text-5xl text-primary pb-1\\\">Legal</h1>\\r\\n    <h2>Host provider info</h2>\\r\\n    <p>Leafcloud B.V.</p>\\r\\n    <p>Moezelhavenweg 9 1043AM Amsterdam The Netherlands</p>\\r\\n\\r\\n    <h2>Publisher info</h2>\\r\\n    <p>Winhalla SAS</p>\\r\\n    <p>Address: 10 rue Minfeld - 91470 Limours - France</p>\\r\\n    <a class=\\\"underline\\\" href=\\\"mailto:contact@winhalla.app\\\">Contact email</a>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAII,EAAE,eAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAMD,CAAC,eAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Legal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$d);

	return `${($$result.head += `${($$result.title = `<title>Legal mentions | Winhalla</title>`, "")}`, "")}

<div class="${"lg:px-100 lg:pt-20 px-8 py-4"}"><h1 class="${"text-5xl text-primary pb-1"}">Legal</h1>
    <h2 class="${"svelte-1i8br0p"}">Host provider info</h2>
    <p class="${"svelte-1i8br0p"}">Leafcloud B.V.</p>
    <p class="${"svelte-1i8br0p"}">Moezelhavenweg 9 1043AM Amsterdam The Netherlands</p>

    <h2 class="${"svelte-1i8br0p"}">Publisher info</h2>
    <p class="${"svelte-1i8br0p"}">Winhalla SAS</p>
    <p class="${"svelte-1i8br0p"}">Address: 10 rue Minfeld - 91470 Limours - France</p>
    <a class="${"underline svelte-1i8br0p"}" href="${"mailto:contact@winhalla.app"}">Contact email</a></div>`;
});

var component_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Legal
});

const apiUrl = "https://api.winhalla.app";

/* src\routes\login.svelte generated by Svelte v3.31.0 */

const css$e = {
	code: "input.svelte-6s0wf7{@apply w-full text-background bg-font py-3 px-4 rounded;}",
	map: "{\"version\":3,\"file\":\"login.svelte\",\"sources\":[\"login.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import {callApi, getUser} from \\\"../utils/api\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n    import {onMount} from \\\"svelte\\\";\\r\\n\\r\\n    let isLoggingIn;\\r\\n    let usernameSent;\\r\\n    let username;\\r\\n    let password;\\r\\n    let status;\\r\\n\\r\\n    function startLogin() {\\r\\n        isLoggingIn = true;\\r\\n    }\\r\\n\\r\\n    onMount(async ()=>{\\r\\n        const user = await getUser();\\r\\n        if(user?.user?._id) goto(\\\"/account-transfer-id\\\");\\r\\n    })\\r\\n\\r\\n    async function createAccount() {\\r\\n        const result = await callApi(\\\"post\\\", `/auth/login/local?username=${username}&password=${password}`);\\r\\n        if (result instanceof Error) return status = result.response.data;\\r\\n        goto(\\\"/account-transfer-id\\\");\\r\\n    }\\r\\n</script>\\r\\n<svelte:head>\\r\\n    <meta name=\\\"robots\\\" content=\\\"noindex\\\">\\r\\n</svelte:head>\\r\\n<style>\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full w-full flex items-center justify-center\\\">\\r\\n    {#if !isLoggingIn}\\r\\n        <div class=\\\"mt-48 flex flex-col\\\">\\r\\n            <h2 class=\\\"text-6xl text-center  mb-10\\\">LOGIN</h2>\\r\\n            <p class=\\\"font-ultra-light text-green text-center text-lg mt-1 mb-2\\\">\\r\\n                PC players:\\r\\n            </p>\\r\\n            <a\\r\\n                    class=\\\"button-brand button\\\" style=\\\"display: flex !important;\\\"\\r\\n                    href=\\\"{apiUrl}/auth/login/steam\\\">\\r\\n                <svg class=\\\"-ml-4 mr-3 w-6\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"fab\\\" data-icon=\\\"steam\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 496 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                Login with Steam\\r\\n            </a>\\r\\n\\r\\n            <p class=\\\"font-ultra-light text-green text-center text-lg mt-10 mb-2\\\">\\r\\n                Console/mobile players:\\r\\n            </p>\\r\\n            <a\\r\\n                    class=\\\"button-brand-alternative button mb-6\\\" style=\\\"display: flex !important;\\\"\\r\\n                    href=\\\"{apiUrl}/auth/login/google\\\">\\r\\n                <svg class=\\\"-ml-4 mr-3 w-5\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"fab\\\" data-icon=\\\"google\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 488 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                <p>Login with Google</p>\\r\\n            </a>\\r\\n\\r\\n            <button\\r\\n                    class=\\\"button-brand-alternative button\\\" style=\\\"display: flex !important;\\\"\\r\\n                    on:click={startLogin}>\\r\\n                <svg class=\\\"-ml-4 mr-3 w-6\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"far\\\" data-icon=\\\"envelope\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 512 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                <p>Login with Username/password</p>\\r\\n            </button>\\r\\n        </div>\\r\\n    {:else if !usernameSent}\\r\\n        <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n            <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\" style=\\\"min-width: 20rem\\\">\\r\\n                <div class=\\\"text-center mt-7 md:mt-12\\\">\\r\\n                    <h1\\r\\n                            class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        \\\">Login\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"\\\">\\r\\n                    <div>\\r\\n                        <input\\r\\n                                type=\\\"email\\\"\\r\\n                                placeholder=\\\"Enter your username\\\"\\r\\n                                bind:value={username}\\r\\n                                style=\\\"font-family: 'Roboto condensed', sans-serif; font-weight:700\\\"\\r\\n                                class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"mt-6\\\">\\r\\n                    <div>\\r\\n                        <input\\r\\n                                type=\\\"email\\\"\\r\\n                                placeholder=\\\"Enter your password\\\"\\r\\n                                style=\\\"font-family: 'Roboto condensed', sans-serif; font-weight:700\\\"\\r\\n                                bind:value={password}\\r\\n                                class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n\\r\\n                        {#if status}\\r\\n                            <p class=\\\"text-legendary info \\\">{status}</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n                <button\\r\\n                        on:click={createAccount}\\r\\n                        class=\\\"button button-brand mt-10\\\">\\r\\n                    Get account transfer ID\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n        <!--<div>\\r\\n            <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                <h1\\r\\n                    class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                    {action === \\\"login\\\" ? \\\"Login\\\" : \\\"Create account\\\"}\\r\\n                </h1>\\r\\n            </div>\\r\\n            <p class=\\\"text-green\\\" class:hidden={!accountCreated}>Account created successfully, you can now login.</p>\\r\\n            <input bind:value={username} class=\\\"my-4\\\" placeholder=\\\"Enter your username\\\">\\r\\n            <p></p>\\r\\n            <input bind:value={password} type=\\\"password\\\" class=\\\"my-4\\\" placeholder=\\\"Enter your password\\\">\\r\\n            <p></p>\\r\\n            <p class:hidden={!status} class=\\\"text-legendary\\\">{status}</p>\\r\\n            <button class=\\\"button button-brand my-4\\\" on:click={createAccount}>continue</button>\\r\\n            {#if action === \\\"login\\\"}\\r\\n                <p>Don't have an account?\\r\\n                    <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>create an account</button>\\r\\n                </p>\\r\\n            {:else}\\r\\n                <p>Already have an account ?\\r\\n                    <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>login</button>\\r\\n                </p>\\r\\n            {/if}\\r\\n        </div>-->\\r\\n    {/if}\\r\\n\\r\\n</div>\"],\"names\":[],\"mappings\":\"AA+BI,KAAK,cAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC\"}"
};

const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	onMount(async () => {
		const user = await getUser();
		if (user?.user?._id) goto("/account-transfer-id");
	});

	$$result.css.add(css$e);

	return `${($$result.head += `<meta name="${"robots"}" content="${"noindex"}" data-svelte="svelte-1tdq6x3">`, "")}

<div class="${"h-full w-full flex items-center justify-center"}">${ `<div class="${"mt-48 flex flex-col"}"><h2 class="${"text-6xl text-center  mb-10"}">LOGIN</h2>
            <p class="${"font-ultra-light text-green text-center text-lg mt-1 mb-2"}">PC players:
            </p>
            <a class="${"button-brand button"}" style="${"display: flex !important;"}" href="${escape(apiUrl) + "/auth/login/steam"}"><svg class="${"-ml-4 mr-3 w-6"}" aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"fab"}" data-icon="${"steam"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 496 512"}"><path fill="${"currentColor"}" d="${"M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"}" class="${""}"></path></svg>
                Login with Steam
            </a>

            <p class="${"font-ultra-light text-green text-center text-lg mt-10 mb-2"}">Console/mobile players:
            </p>
            <a class="${"button-brand-alternative button mb-6"}" style="${"display: flex !important;"}" href="${escape(apiUrl) + "/auth/login/google"}"><svg class="${"-ml-4 mr-3 w-5"}" aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"fab"}" data-icon="${"google"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 488 512"}"><path fill="${"currentColor"}" d="${"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"}" class="${""}"></path></svg>
                <p>Login with Google</p></a>

            <button class="${"button-brand-alternative button"}" style="${"display: flex !important;"}"><svg class="${"-ml-4 mr-3 w-6"}" aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"far"}" data-icon="${"envelope"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 512 512"}"><path fill="${"currentColor"}" d="${"M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"}" class="${""}"></path></svg>
                <p>Login with Username/password</p></button></div>`
	}</div>`;
});

var component_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Login
});

/* src\routes\terms.svelte generated by Svelte v3.31.0 */

const css$f = {
	code: "h2.svelte-n1bhyj{@apply text-4xl mt-6 mb-3 underline;}div.svelte-n1bhyj{background-color:#FFFFFF;color:#000000\r\n    }p.svelte-n1bhyj{@apply py-2px;}a.svelte-n1bhyj{@apply underline;}",
	map: "{\"version\":3,\"file\":\"terms.svelte\",\"sources\":[\"terms.svelte\"],\"sourcesContent\":[\"<svelte:head>\\r\\n    <title>Terms of use | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n\\r\\n    div {\\r\\n        background-color: #FFFFFF;\\r\\n        color: #000000\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full lg:px-100 px-5 lg:pt-30 pb-30 pt-8 \\\"\\r\\n     style=\\\"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);\\\">\\r\\n    <p>Please read these Terms of Service (\\\"Terms\\\", \\\"Terms of Service\\\") carefully before using the Winhalla app (the \\\"Service\\\") operated by Winhalla SAS (\\\"us\\\", \\\"we\\\", or \\\"our\\\").\\r\\n\\r\\n        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.\\r\\n        These Terms apply to all visitors, users and others who access or use the Service.</p>\\r\\n    <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the\\r\\n        terms then you may not access the Service.</p>\\r\\n    <h2 id=\\\"3rdParty\\\">Links To Other Websites</h2>\\r\\n\\r\\n    <p>Our Service may contain links to third-party websites or services that are not owned or controlled by\\r\\n        Winhalla SAS.</p>\\r\\n\\r\\n    <p>Winhalla SAS has no control over, and assumes no responsibility for, the content, privacy policies, or practices\\r\\n        of any third party websites or services. You further acknowledge and agree that Winhalla SAS shall not be\\r\\n        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in\\r\\n        connection with use of or reliance on any such content, goods or services available on or through any such\\r\\n        websites or services.</p>\\r\\n\\r\\n    <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or\\r\\n        services that you visit.</p>\\r\\n    <h2>Limitations</h2>\\r\\n\\r\\n    <p>Automated queries (including screen and database scraping, spiders, robots, crawlers and any other automated\\r\\n        activity with the purpose of obtaining information from the Service) are strictly prohibited on the Service,\\r\\n        unless you have received express written permission from Winhalla SAS's owner. As a limited exception, publicly\\r\\n        available search engines and similar Internet navigation tools (\\\"Search Engines\\\") may query the Services and\\r\\n        provide an index with links to the Service's Web pages, only to the extent such unlicensed \\\"fair use\\\" is allowed\\r\\n        by applicable copyright law. Search Engines are not permitted to query or search information protected by a\\r\\n        security verification system (\\\"captcha\\\") which limits access to human users.</p>\\r\\n\\r\\n    <p>Trying to harm in any way the service (including but not limited to : DDOS, XSS, CSRF) or buying items in the\\r\\n        <a href=\\\"/shop\\\">shop</a> with coins earned via hacking or without having enough coins is strictly prohibited</p>\\r\\n\\r\\n    <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use and enjoy the Service\\r\\n        for your individual, non-commercial, expressly\\r\\n        conditioned upon your compliance with these Terms. If we terminate your account, any license granted by us to\\r\\n        you in the Service ends immediately. Unless otherwise expressly authorized by us\\r\\n        in a signed written contract, you may not sell, copy, exchange, loan, reverse engineer, decompile, derive source\\r\\n        code from, translate, lease, grant a security interest in, transfer, publish, assign or otherwise distribute any\\r\\n        of the Service or any of Winhalla SAS's intellectual property, including any of our computer code </p>\\r\\n\\r\\n    <h2>Termination</h2>\\r\\n\\r\\n    <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason\\r\\n        whatsoever, including without limitation if you breach the Terms.</p>\\r\\n\\r\\n    <p>All provisions of the Terms which by their nature should survive termination shall survive termination,\\r\\n        including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of\\r\\n        liability.</p>\\r\\n    <h2>Limitation of Liability</h2>\\r\\n\\r\\n    <p>Subject to applicable law, under no circumstances, including negligence, will Winhalla SAS, its directors,\\r\\n        employees or agents be liable for any loss of profits, direct or indirect losses including punitive, exemplary,\\r\\n        special or consequential damages that result from the access to, use of, or the inability to use, the materials\\r\\n        in this app, even if Winhalla SAS or a Winhalla SAS authorised representative has been advised of the\\r\\n        possibility of such damages.</p>\\r\\n    <p>Winhalla works with ad revenue. If our advertisers fails to pay us, we won't be able to send any rewards to players.</p>\\r\\n    <h2>Governing Law</h2>\\r\\n\\r\\n    <p>These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict\\r\\n        of law provisions.</p>\\r\\n\\r\\n    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If\\r\\n        any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of\\r\\n        these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,\\r\\n        and supersede and replace any prior agreements we might have between us regarding the Service.</p>\\r\\n    \\r\\n    <h2>Changes</h2>\\r\\n\\r\\n    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>\\r\\n\\r\\n    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the\\r\\n        revised terms. If you do not agree to the new terms, please stop using the Service.</p>\\r\\n\\r\\n    <h2>Account</h2>\\r\\n    <p>In order to use the App, you have to provide a Brawlhalla ID, or get it automatically via a Steam login </p>\\r\\n    <p>We may transmit this Brawlhalla ID to the Brawlhalla API (<a\\r\\n        href=\\\"https://api.brawlhalla.com\\\">https://api.brawlhalla.com</a>) in order to process your Brawlhalla\\r\\n        statistics.</p>\\r\\n    <p>If you choose another platform than Steam, you will be prompted to enter your Brawlhalla ID. By\\r\\n        submitting the Brawlhalla ID, you certify that you own the Brawlhalla account with the Brawlhalla ID you mentioned.\\r\\n        Otherwise your account and access to the Service may be terminated without prior notice</p>\\r\\n\\r\\n    <h2>Coins and rewards</h2>\\r\\n    <p><strong>Coins. </strong> Coins in this app are fictional money, they can only be exchanged in our in-app Shop.\\r\\n        This is a currency only limited to this app and selling this\\r\\n        currency and/or Accounts for real money is forbidden.</p>\\r\\n    <p>If we suspect you of cheating, abusing bugs or exploits or abnormal earning of Coins, we may terminate your Account and\\r\\n        your right to access the app, causing you to loose all data associated with your account, including but not\\r\\n        limited to Coins.</p>\\r\\n    <p><strong>Rewards. </strong> Rewards are given only if you have enough Coins AND if you have earned them without\\r\\n        cheating or abuse of any kind. After buying an item in our Store, you will receive an email in the e-mail\\r\\n        address you\\r\\n        specified when buying the item. The Service is not responsible if the e-mail address you entered is not correct\\r\\n        or is not yours.</p>\\r\\n\\r\\n    <h2>Contact Us</h2>\\r\\n\\r\\n    <p>If you have any questions about these Terms or about the app, please <a href=\\\"mailto:contact@winhalla.app\\\">contact\\r\\n        us</a>.</p>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAII,EAAE,cAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAED,GAAG,cAAC,CAAC,AACD,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO;IAClB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Terms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$f);

	return `${($$result.head += `${($$result.title = `<title>Terms of use | Winhalla</title>`, "")}`, "")}

<div class="${"h-full lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-n1bhyj"}" style="${"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);"}"><p class="${"svelte-n1bhyj"}">Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the Winhalla app (the &quot;Service&quot;) operated by Winhalla SAS (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).

        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
        These Terms apply to all visitors, users and others who access or use the Service.</p>
    <p class="${"svelte-n1bhyj"}">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
        terms then you may not access the Service.</p>
    <h2 id="${"3rdParty"}" class="${"svelte-n1bhyj"}">Links To Other Websites</h2>

    <p class="${"svelte-n1bhyj"}">Our Service may contain links to third-party websites or services that are not owned or controlled by
        Winhalla SAS.</p>

    <p class="${"svelte-n1bhyj"}">Winhalla SAS has no control over, and assumes no responsibility for, the content, privacy policies, or practices
        of any third party websites or services. You further acknowledge and agree that Winhalla SAS shall not be
        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in
        connection with use of or reliance on any such content, goods or services available on or through any such
        websites or services.</p>

    <p class="${"svelte-n1bhyj"}">We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or
        services that you visit.</p>
    <h2 class="${"svelte-n1bhyj"}">Limitations</h2>

    <p class="${"svelte-n1bhyj"}">Automated queries (including screen and database scraping, spiders, robots, crawlers and any other automated
        activity with the purpose of obtaining information from the Service) are strictly prohibited on the Service,
        unless you have received express written permission from Winhalla SAS&#39;s owner. As a limited exception, publicly
        available search engines and similar Internet navigation tools (&quot;Search Engines&quot;) may query the Services and
        provide an index with links to the Service&#39;s Web pages, only to the extent such unlicensed &quot;fair use&quot; is allowed
        by applicable copyright law. Search Engines are not permitted to query or search information protected by a
        security verification system (&quot;captcha&quot;) which limits access to human users.</p>

    <p class="${"svelte-n1bhyj"}">Trying to harm in any way the service (including but not limited to : DDOS, XSS, CSRF) or buying items in the
        <a href="${"/shop"}" class="${"svelte-n1bhyj"}">shop</a> with coins earned via hacking or without having enough coins is strictly prohibited</p>

    <p class="${"svelte-n1bhyj"}">We grant you a limited, non-exclusive, non-transferable, revocable license to use and enjoy the Service
        for your individual, non-commercial, expressly
        conditioned upon your compliance with these Terms. If we terminate your account, any license granted by us to
        you in the Service ends immediately. Unless otherwise expressly authorized by us
        in a signed written contract, you may not sell, copy, exchange, loan, reverse engineer, decompile, derive source
        code from, translate, lease, grant a security interest in, transfer, publish, assign or otherwise distribute any
        of the Service or any of Winhalla SAS&#39;s intellectual property, including any of our computer code </p>

    <h2 class="${"svelte-n1bhyj"}">Termination</h2>

    <p class="${"svelte-n1bhyj"}">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason
        whatsoever, including without limitation if you breach the Terms.</p>

    <p class="${"svelte-n1bhyj"}">All provisions of the Terms which by their nature should survive termination shall survive termination,
        including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.</p>
    <h2 class="${"svelte-n1bhyj"}">Limitation of Liability</h2>

    <p class="${"svelte-n1bhyj"}">Subject to applicable law, under no circumstances, including negligence, will Winhalla SAS, its directors,
        employees or agents be liable for any loss of profits, direct or indirect losses including punitive, exemplary,
        special or consequential damages that result from the access to, use of, or the inability to use, the materials
        in this app, even if Winhalla SAS or a Winhalla SAS authorised representative has been advised of the
        possibility of such damages.</p>
    <p class="${"svelte-n1bhyj"}">Winhalla works with ad revenue. If our advertisers fails to pay us, we won&#39;t be able to send any rewards to players.</p>
    <h2 class="${"svelte-n1bhyj"}">Governing Law</h2>

    <p class="${"svelte-n1bhyj"}">These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict
        of law provisions.</p>

    <p class="${"svelte-n1bhyj"}">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If
        any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
        these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,
        and supersede and replace any prior agreements we might have between us regarding the Service.</p>
    
    <h2 class="${"svelte-n1bhyj"}">Changes</h2>

    <p class="${"svelte-n1bhyj"}">We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>

    <p class="${"svelte-n1bhyj"}">By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
        revised terms. If you do not agree to the new terms, please stop using the Service.</p>

    <h2 class="${"svelte-n1bhyj"}">Account</h2>
    <p class="${"svelte-n1bhyj"}">In order to use the App, you have to provide a Brawlhalla ID, or get it automatically via a Steam login </p>
    <p class="${"svelte-n1bhyj"}">We may transmit this Brawlhalla ID to the Brawlhalla API (<a href="${"https://api.brawlhalla.com"}" class="${"svelte-n1bhyj"}">https://api.brawlhalla.com</a>) in order to process your Brawlhalla
        statistics.</p>
    <p class="${"svelte-n1bhyj"}">If you choose another platform than Steam, you will be prompted to enter your Brawlhalla ID. By
        submitting the Brawlhalla ID, you certify that you own the Brawlhalla account with the Brawlhalla ID you mentioned.
        Otherwise your account and access to the Service may be terminated without prior notice</p>

    <h2 class="${"svelte-n1bhyj"}">Coins and rewards</h2>
    <p class="${"svelte-n1bhyj"}"><strong>Coins. </strong> Coins in this app are fictional money, they can only be exchanged in our in-app Shop.
        This is a currency only limited to this app and selling this
        currency and/or Accounts for real money is forbidden.</p>
    <p class="${"svelte-n1bhyj"}">If we suspect you of cheating, abusing bugs or exploits or abnormal earning of Coins, we may terminate your Account and
        your right to access the app, causing you to loose all data associated with your account, including but not
        limited to Coins.</p>
    <p class="${"svelte-n1bhyj"}"><strong>Rewards. </strong> Rewards are given only if you have enough Coins AND if you have earned them without
        cheating or abuse of any kind. After buying an item in our Store, you will receive an email in the e-mail
        address you
        specified when buying the item. The Service is not responsible if the e-mail address you entered is not correct
        or is not yours.</p>

    <h2 class="${"svelte-n1bhyj"}">Contact Us</h2>

    <p class="${"svelte-n1bhyj"}">If you have any questions about these Terms or about the app, please <a href="${"mailto:contact@winhalla.app"}" class="${"svelte-n1bhyj"}">contact
        us</a>.</p></div>`;
});

var component_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Terms
});

/* src\routes\link\[id].svelte generated by Svelte v3.31.0 */

async function preload({ params, query }) {
	return { link: params.id };
}

const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { link } = $$props;

	onMount(async () => {
		document.cookie = cookie__default['default'].serialize("affiliateLinkId", link, {
			maxAge: 15552000,
			sameSite: "lax",
			path: "/"
		});

		await callApi("post", "/linkCheckpoint/" + link);
		goto("/");
	});

	if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);

	return `${($$result.head += `${($$result.title = `<title>Redirecting...</title>`, "")}<meta name="${"robots"}" content="${"noindex"}" data-svelte="svelte-1nzq84w">`, "")}
${validate_component(Loading, "Loading").$$render($$result, { data: "Redirecting..." }, {}, {})}`;
});

var component_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D,
    preload: preload
});

/* src\routes\ios.svelte generated by Svelte v3.31.0 */

const Ios = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="${"mt-40 ml-4 lg:ml-12  text-3xl "}" style="${"font-family: 'Roboto condensed', sans-serif;  font-weight:700"}">iOS version of the app coming soon! Beta is only available on Android for now.
</div>`;
});

var component_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Ios
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// account-transfer-id.svelte
			pattern: /^\/account-transfer-id\/?$/,
			parts: [
				{ name: "account$45transfer$45id", file: "account-transfer-id.svelte", component: component_1 }
			]
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: component_2 }
			]
		},

		{
			// feltrom/admin.svelte
			pattern: /^\/feltrom\/admin\/?$/,
			parts: [
				null,
				{ name: "feltrom_admin", file: "feltrom/admin.svelte", component: component_3 }
			]
		},

		{
			// privacy.svelte
			pattern: /^\/privacy\/?$/,
			parts: [
				{ name: "privacy", file: "privacy.svelte", component: component_4 }
			]
		},

		{
			// status.svelte
			pattern: /^\/status\/?$/,
			parts: [
				{ name: "status", file: "status.svelte", component: component_5 }
			]
		},

		{
			// legal.svelte
			pattern: /^\/legal\/?$/,
			parts: [
				{ name: "legal", file: "legal.svelte", component: component_6 }
			]
		},

		{
			// login.svelte
			pattern: /^\/login\/?$/,
			parts: [
				{ name: "login", file: "login.svelte", component: component_7 }
			]
		},

		{
			// terms.svelte
			pattern: /^\/terms\/?$/,
			parts: [
				{ name: "terms", file: "terms.svelte", component: component_8 }
			]
		},

		{
			// link/[id].svelte
			pattern: /^\/link\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "link_$id", file: "link/[id].svelte", component: component_9, params: match => ({ id: d(match[1]) }) }
			]
		},

		{
			// ios.svelte
			pattern: /^\/ios\/?$/,
			parts: [
				{ name: "ios", file: "ios.svelte", component: component_10 }
			]
		}
	],

	root_comp,
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter$1(this, void 0, void 0, function* () {
            req.params = route.params(route.pattern.exec(req.path));
            const method = req.method.toLowerCase();
            // 'delete' cannot be exported from a module because it is a keyword,
            // so check for 'del' instead
            const method_export = method === 'delete' ? 'del' : method;
            const handle_method = route.handlers[method_export];
            if (handle_method) {
                if (process.env.SAPPER_EXPORT) {
                    const { write, end, setHeader } = res;
                    const chunks = [];
                    const headers = {};
                    // intercept data so that it can be exported
                    res.write = function (chunk) {
                        chunks.push(Buffer.from(chunk));
                        return write.apply(res, [chunk]);
                    };
                    res.setHeader = function (name, value) {
                        headers[name.toLowerCase()] = value;
                        setHeader.apply(res, [name, value]);
                    };
                    res.end = function (chunk) {
                        if (chunk)
                            chunks.push(Buffer.from(chunk));
                        end.apply(res, [chunk]);
                        process.send({
                            __sapper__: true,
                            event: 'file',
                            url: req.url,
                            method: req.method,
                            status: res.statusCode,
                            type: headers['content-type'],
                            body: Buffer.concat(chunks)
                        });
                    };
                }
                const handle_next = (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.message);
                    }
                    else {
                        process.nextTick(next);
                    }
                };
                try {
                    yield handle_method(req, res, handle_next);
                }
                catch (err) {
                    console.error(err);
                    handle_next(err);
                }
            }
            else {
                // no matching handler for method
                process.nextTick(next);
            }
        });
    }
    return function find_route(req, res, next) {
        for (const route of routes) {
            if (route.pattern.test(req.path)) {
                handle_route(route, req, res, next);
                return;
            }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$1 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$2 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$1,
	decode: decode$2
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$1.fromArray(names.map(String), true);
  this._sources = ArraySet$1.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$1.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$1.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;

function get_sourcemap_url(contents) {
    const reversed = contents
        .split('\n')
        .reverse()
        .join('\n');
    const match = /\/[/*]#[ \t]+sourceMappingURL=([^\s'"]+?)(?:[ \t]+|$)/gm.exec(reversed);
    if (match)
        return match[1];
    return undefined;
}
const file_cache = new Map();
function get_file_contents(file_path) {
    if (file_cache.has(file_path)) {
        return file_cache.get(file_path);
    }
    try {
        const data = fs__default['default'].readFileSync(file_path, 'utf8');
        file_cache.set(file_path, data);
        return data;
    }
    catch (_a) {
        return undefined;
    }
}
function sourcemap_stacktrace(stack) {
    const replace = (line) => line.replace(/^ {4}at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?)\)?/, (input, var_name, file_path, line_num, column) => {
        if (!file_path)
            return input;
        const contents = get_file_contents(file_path);
        if (!contents)
            return input;
        const sourcemap_url = get_sourcemap_url(contents);
        if (!sourcemap_url)
            return input;
        let dir = path__default['default'].dirname(file_path);
        let sourcemap_data;
        if (/^data:application\/json[^,]+base64,/.test(sourcemap_url)) {
            const raw_data = sourcemap_url.slice(sourcemap_url.indexOf(',') + 1);
            try {
                sourcemap_data = Buffer.from(raw_data, 'base64').toString();
            }
            catch (_a) {
                return input;
            }
        }
        else {
            const sourcemap_path = path__default['default'].resolve(dir, sourcemap_url);
            const data = get_file_contents(sourcemap_path);
            if (!data)
                return input;
            sourcemap_data = data;
            dir = path__default['default'].dirname(sourcemap_path);
        }
        let raw_sourcemap;
        try {
            raw_sourcemap = JSON.parse(sourcemap_data);
        }
        catch (_b) {
            return input;
        }
        const consumer = new SourceMapConsumer$1(raw_sourcemap);
        const pos = consumer.originalPositionFor({
            line: Number(line_num),
            column: Number(column),
            bias: SourceMapConsumer$1.LEAST_UPPER_BOUND
        });
        if (!pos.source)
            return input;
        const source_path = path__default['default'].resolve(dir, pos.source);
        const source = `${source_path}:${pos.line || 0}:${pos.column || 0}`;
        if (!var_name)
            return `    at ${source}`;
        return `    at ${var_name} (${source})`;
    });
    file_cache.clear();
    return stack
        .split('\n')
        .map(replace)
        .join('\n');
}

function get_page_handler(manifest, session_getter) {
    const get_build_info =  (assets => () => assets)(JSON.parse(fs__default['default'].readFileSync(path__default['default'].join(build_dir, 'build.json'), 'utf-8')));
    const template =  (str => () => str)(read_template(build_dir));
    const has_service_worker = fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js'));
    const { pages, error: error_route } = manifest;
    function bail(res, err) {
        console.error(err);
        const message =  'Internal server error';
        res.statusCode = 500;
        res.end(`<pre>${message}</pre>`);
    }
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: { default: error_route } }
            ]
        }, req, res, statusCode, error || 'Unknown error');
    }
    function handle_page(page, req, res, status = 200, error = null) {
        var _a, _b;
        return __awaiter$1(this, void 0, void 0, function* () {
            const is_service_worker_index = req.path === '/service-worker-index.html';
            const build_info = get_build_info();
            res.setHeader('Content-Type', 'text/html');
            // preload main js and css
            // TODO detect other stuff we can preload like fonts?
            let preload_files = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
            if ((_a = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _a === void 0 ? void 0 : _a.main) {
                preload_files = preload_files.concat((_b = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _b === void 0 ? void 0 : _b.main);
            }
            let es6_preload = false;
            if (build_info.bundler === 'rollup') {
                es6_preload = true;
                const route = page.parts[page.parts.length - 1].file;
                const deps = build_info.dependencies[route];
                if (deps) {
                    preload_files = preload_files.concat(deps);
                }
            }
            else if (!error && !is_service_worker_index) {
                page.parts.forEach(part => {
                    if (!part)
                        return;
                    // using concat because it could be a string or an array. thanks webpack!
                    preload_files = preload_files.concat(build_info.assets[part.name]);
                });
            }
            const link = preload_files
                .filter((v, i, a) => a.indexOf(v) === i) // remove any duplicates
                .filter(file => file && !file.match(/\.map$/)) // exclude source maps
                .map((file) => {
                const as = /\.css$/.test(file) ? 'style' : 'script';
                const rel = es6_preload && as === 'script' ? 'modulepreload' : 'preload';
                return `<${req.baseUrl}/client/${file}>;rel="${rel}";as="${as}"`;
            })
                .join(', ');
            res.setHeader('Link', link);
            let session;
            try {
                session = yield session_getter(req, res);
            }
            catch (err) {
                return bail(res, err);
            }
            let redirect;
            let preload_error;
            const preload_context = {
                redirect: (statusCode, location) => {
                    if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                        throw new Error('Conflicting redirects');
                    }
                    location = location.replace(/^\//g, ''); // leading slash (only)
                    redirect = { statusCode, location };
                },
                error: (statusCode, message) => {
                    preload_error = { statusCode, message };
                },
                fetch: (url, opts) => {
                    const protocol = req.socket.encrypted ? 'https' : 'http';
                    const parsed = new Url__default['default'].URL(url, `${protocol}://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' : ''}`);
                    opts = Object.assign({}, opts);
                    const include_credentials = (opts.credentials === 'include' ||
                        opts.credentials !== 'omit' && parsed.origin === `${protocol}://127.0.0.1:${process.env.PORT}`);
                    if (include_credentials) {
                        opts.headers = Object.assign({}, opts.headers);
                        const cookies = Object.assign({}, parse_1(req.headers.cookie || ''), parse_1(opts.headers.cookie || ''));
                        const set_cookie = res.getHeader('Set-Cookie');
                        (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach((s) => {
                            const m = /([^=]+)=([^;]+)/.exec(s);
                            if (m)
                                cookies[m[1]] = m[2];
                        });
                        const str = Object.keys(cookies)
                            .map(key => `${key}=${cookies[key]}`)
                            .join('; ');
                        opts.headers.cookie = str;
                        if (!opts.headers.authorization && req.headers.authorization) {
                            opts.headers.authorization = req.headers.authorization;
                        }
                    }
                    return fetch(parsed.href, opts);
                }
            };
            let preloaded;
            let match;
            let params;
            try {
                const root_preload = manifest.root_comp.preload || (() => { });
                const root_preloaded = root_preload.call(preload_context, {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params: {}
                }, session);
                match = error ? null : page.pattern.exec(req.path);
                let toPreload = [root_preloaded];
                if (!is_service_worker_index) {
                    toPreload = toPreload.concat(page.parts.map(part => {
                        if (!part)
                            return null;
                        // the deepest level is used below, to initialise the store
                        params = part.params ? part.params(match) : {};
                        return part.component.preload
                            ? part.component.preload.call(preload_context, {
                                host: req.headers.host,
                                path: req.path,
                                query: req.query,
                                params
                            }, session)
                            : {};
                    }));
                }
                preloaded = yield Promise.all(toPreload);
            }
            catch (err) {
                if (error) {
                    return bail(res, err);
                }
                preload_error = { statusCode: 500, message: err };
                preloaded = []; // appease TypeScript
            }
            try {
                if (redirect) {
                    const location = Url__default['default'].resolve((req.baseUrl || '') + '/', redirect.location);
                    res.statusCode = redirect.statusCode;
                    res.setHeader('Location', location);
                    res.end();
                    return;
                }
                if (preload_error) {
                    if (!error) {
                        handle_error(req, res, preload_error.statusCode, preload_error.message);
                    }
                    else {
                        bail(res, preload_error.message);
                    }
                    return;
                }
                const segments = req.path.split('/').filter(Boolean);
                // TODO make this less confusing
                const layout_segments = [segments[0]];
                let l = 1;
                page.parts.forEach((part, i) => {
                    layout_segments[l] = segments[i + 1];
                    if (!part)
                        return null;
                    l++;
                });
                if (error instanceof Error && error.stack) {
                    error.stack = sourcemap_stacktrace(error.stack);
                }
                const pageContext = {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params,
                    error: error
                        ? error instanceof Error
                            ? error
                            : { message: error, name: 'PreloadError' }
                        : null
                };
                const props = {
                    stores: {
                        page: {
                            subscribe: writable(pageContext).subscribe
                        },
                        preloading: {
                            subscribe: writable(null).subscribe
                        },
                        session: writable(session)
                    },
                    segments: layout_segments,
                    status: error ? status : 200,
                    error: pageContext.error,
                    level0: {
                        props: preloaded[0]
                    },
                    level1: {
                        segment: segments[0],
                        props: {}
                    }
                };
                if (!is_service_worker_index) {
                    let level_index = 1;
                    for (let i = 0; i < page.parts.length; i += 1) {
                        const part = page.parts[i];
                        if (!part)
                            continue;
                        props[`level${level_index++}`] = {
                            component: part.component.default,
                            props: preloaded[i + 1] || {},
                            segment: segments[i]
                        };
                    }
                }
                const { html, head, css } = App.render(props);
                const serialized = {
                    preloaded: `[${preloaded.map(data => try_serialize(data, err => {
                        console.error(`Failed to serialize preloaded data to transmit to the client at the /${segments.join('/')} route: ${err.message}`);
                        console.warn('The client will re-render over the server-rendered page fresh instead of continuing where it left off. See https://sapper.svelte.dev/docs#Return_value for more information');
                    })).join(',')}]`,
                    session: session && try_serialize(session, err => {
                        throw new Error(`Failed to serialize session data: ${err.message}`);
                    }),
                    error: error && serialize_error(props.error)
                };
                let script = `__SAPPER__={${[
                    error && `error:${serialized.error},status:${status}`,
                    `baseUrl:"${req.baseUrl}"`,
                    serialized.preloaded && `preloaded:${serialized.preloaded}`,
                    serialized.session && `session:${serialized.session}`
                ].filter(Boolean).join(',')}};`;
                if (has_service_worker) {
                    script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
                }
                const file = [].concat(build_info.assets.main).filter(f => f && /\.js$/.test(f))[0];
                const main = `${req.baseUrl}/client/${file}`;
                // users can set a CSP nonce using res.locals.nonce
                const nonce_value = (res.locals && res.locals.nonce) ? res.locals.nonce : '';
                const nonce_attr = nonce_value ? ` nonce="${nonce_value}"` : '';
                if (build_info.bundler === 'rollup') {
                    if (build_info.legacy_assets) {
                        const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
                        script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
                    }
                    else {
                        script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
                    }
                }
                else {
                    script += `</script><script${nonce_attr} src="${main}" defer>`;
                }
                let styles;
                // TODO make this consistent across apps
                // TODO embed build_info in placeholder.ts
                if (build_info.css && build_info.css.main) {
                    const css_chunks = new Set(build_info.css.main);
                    page.parts.forEach(part => {
                        if (!part || !build_info.dependencies)
                            return;
                        const deps_for_part = build_info.dependencies[part.file];
                        if (deps_for_part) {
                            deps_for_part.filter(d => d.endsWith('.css')).forEach(chunk => {
                                css_chunks.add(chunk);
                            });
                        }
                    });
                    styles = Array.from(css_chunks)
                        .map(href => `<link rel="stylesheet" href="client/${href}">`)
                        .join('');
                }
                else {
                    styles = (css && css.code ? `<style${nonce_attr}>${css.code}</style>` : '');
                }
                const body = template()
                    .replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
                    .replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
                    .replace('%sapper.html%', () => html)
                    .replace('%sapper.head%', () => head)
                    .replace('%sapper.styles%', () => styles)
                    .replace(/%sapper\.cspnonce%/g, () => nonce_value);
                res.statusCode = status;
                res.end(body);
            }
            catch (err) {
                if (error) {
                    bail(res, err);
                }
                else {
                    handle_error(req, res, 500, err);
                }
            }
        });
    }
    return function find_route(req, res, next) {
        const path = req.path === '/service-worker-index.html' ? '/' : req.path;
        const page = pages.find(page => page.pattern.test(path));
        if (page) {
            handle_page(page, req, res);
        }
        else {
            handle_error(req, res, 404, 'Not found');
        }
    };
}
function read_template(dir = build_dir) {
    return fs__default['default'].readFileSync(`${dir}/template.html`, 'utf-8');
}
function try_serialize(data, fail) {
    try {
        return devalue(data);
    }
    catch (err) {
        if (fail)
            fail(err);
        return null;
    }
}
// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
    if (!error)
        return null;
    let serialized = try_serialize(error);
    if (!serialized) {
        const { name, message, stack } = error;
        serialized = try_serialize({ name, message, stack });
    }
    if (!serialized) {
        serialized = '{}';
    }
    return serialized;
}

function middleware(opts = {}) {
    const { session, ignore } = opts;
    let emitted_basepath = false;
    return compose_handlers(ignore, [
        (req, res, next) => {
            if (req.baseUrl === undefined) {
                let originalUrl = req.originalUrl || req.url;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control:  'max-age=31536000, immutable'
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, session || noop$1)
    ].filter(Boolean));
}
function compose_handlers(ignore, handlers) {
    const total = handlers.length;
    function nth_handler(n, req, res, next) {
        if (n >= total) {
            return next();
        }
        handlers[n](req, res, () => nth_handler(n + 1, req, res, next));
    }
    return !ignore
        ? (req, res, next) => nth_handler(0, req, res, next)
        : (req, res, next) => {
            if (should_ignore(req.path, ignore)) {
                next();
            }
            else {
                nth_handler(0, req, res, next);
            }
        };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(x => should_ignore(uri, x));
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}
function serve({ prefix, pathname, cache_control }) {
    const filter = pathname
        ? (req) => req.path === pathname
        : (req) => req.path.startsWith(prefix);
    const cache = new Map();
    const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs__default['default'].readFileSync(path__default['default'].join(build_dir, file)))).get(file);
    return (req, res, next) => {
        if (filter(req)) {
            const type = lite.getType(req.path);
            try {
                const file = path__default['default'].posix.normalize(decodeURIComponent(req.path));
                const data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    next();
                }
                else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('an error occurred while reading a static file from disk');
                }
            }
        }
        else {
            next();
        }
    };
}
function noop$1() { }

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
let throttler = [];
let app = express__default['default'](); // You can also use Express
	app.use((req, res, next) => {

		if (req.path.includes("assets")) return next()
		let i = throttler.findIndex(e => e.ip == req.ip);
		let user1 = throttler[i];
		if (user1) {
			if (Date.now() - 300 * 1000 > user1.timestamp) {
				user1.requests = 1;
				user1.timestamp = Date.now();
			}
			//else if (user1.requests == 75) return res.sendStatus(429)
			else user1.requests += 1;
			throttler[i] = user1;
			next();
		} else {
			throttler.push({ ip: req.ip, requests: 1, timestamp: Date.now() });
			next();
		}
	});
	app.use(
		compression__default['default']({ threshold: 0 }),
		sirv__default['default']('static', { dev }),
		middleware()
	);
/*require('https').createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/api.winhalla.app/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/api.winhalla.app/fullchain.pem')
},app).listen(443)*/
app.listen(3000);
