'use strict';

var sirv = require('sirv');
var express = require('express');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var cookie = require('cookie');
var io = require('socket.io-client');
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
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var cookie__default = /*#__PURE__*/_interopDefaultLegacy(cookie);
var io__default = /*#__PURE__*/_interopDefaultLegacy(io);
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
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
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
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
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
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}

const apiUrl = "https://api.winhalla.app";

/* src\routes\index.svelte generated by Svelte v3.31.0 */

const css = {
	code: ".video-container.svelte-8zrx6u::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.3) 0%,\r\n                rgba(23, 23, 26, 0.4),\r\n                rgba(23, 23, 26, 0.6) 75%,\r\n                rgba(23, 23, 26, 1) 100%\r\n        )}@keyframes svelte-8zrx6u-arrow{0%{transform:translateY(0rem)}100%{transform:translateY(0.55rem)}}.arrow-svg.svelte-8zrx6u{animation:svelte-8zrx6u-arrow 0.8s infinite alternate ease-in-out}.cards.svelte-8zrx6u{height:calc(100% + 5rem)}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import {fly} from \\\"svelte/transition\\\"\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .video-container::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.3) 0%,\\r\\n                rgba(23, 23, 26, 0.4),\\r\\n                rgba(23, 23, 26, 0.6) 75%,\\r\\n                rgba(23, 23, 26, 1) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    @keyframes arrow {\\r\\n        0% {\\r\\n            transform: translateY(0rem);\\r\\n        }\\r\\n\\r\\n        100% {\\r\\n            transform: translateY(0.55rem);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .arrow-svg {\\r\\n        animation: arrow 0.8s infinite alternate ease-in-out;\\r\\n    }\\r\\n\\r\\n    .cards {\\r\\n        height: calc(100% + 5rem);\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>\\r\\n    <meta\\r\\n            name=\\\"description\\\"\\r\\n            content=\\\"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\\r\\n        Mammoth Coins, Season Packs and more! | Winhalla home page\\\" />\\r\\n\\r\\n    <link rel=\\\"canonical\\\" href=\\\"https://winhalla.app\\\" />\\r\\n</svelte:head>\\r\\n<div class=\\\"pb-8 \\\" out:fly={{ y: -450, duration: 400 }}>\\r\\n    <div class=\\\"relative\\\">\\r\\n        <div class=\\\"absolute top-7 left-7 lg:left-24 lg:top-10 z-10\\\">\\r\\n            <h1 class=\\\"text-6xl lg:text-8xl text-shadow-base\\\">\\r\\n                PLAY\\r\\n                <b class=\\\"text-accent\\\">BRAWLHALLA</b>\\r\\n                <br />\\r\\n                EARN\\r\\n                <b class=\\\"text-accent\\\">REWARDS</b>\\r\\n            </h1>\\r\\n        </div>\\r\\n        <div\\r\\n                class=\\\"video-container relative z-0 overflow-hidden w-full\\r\\n            h-screen-60 lg:h-screen\\\">\\r\\n            <video\\r\\n                    class=\\\"w-full h-full object-cover\\\"\\r\\n                    preload=\\\"true\\\"\\r\\n                    loop\\r\\n                    playsinline\\r\\n                    autoplay\\r\\n                    muted>\\r\\n                <source\\r\\n                        src=\\\"/assets/video/brawlhalla-gameplay.mp4\\\"\\r\\n                        type=\\\"video/mp4\\\" />\\r\\n            </video>\\r\\n        </div>\\r\\n\\r\\n        <div\\r\\n                class=\\\"tip absolute left-0 right-0 bottom-20 text-center hidden\\r\\n            lg:block\\\">\\r\\n            <p class=\\\"text-2xl\\\">Learn more</p>\\r\\n            <svg\\r\\n                    class=\\\"fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                    viewBox=\\\"0 0 20 20\\\">\\r\\n                <path\\r\\n                        d=\\\"M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707\\r\\n                    7.778-7.778-1.414-1.414L11 16.172V0H9z\\\" />\\r\\n            </svg>\\r\\n        </div>\\r\\n    </div>\\r\\n    <div class=\\\"pt-10\\\">\\r\\n        <div\\r\\n                class=\\\"cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row\\r\\n            items-center lg:justify-around\\\">\\r\\n            <div class=\\\"pb-10 lg:pb-0\\\">\\r\\n                <div\\r\\n                        class=\\\"card p-4 w-64 h-84 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">1</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <p class=\\\"text-3xl leading-9\\\">\\r\\n                            <b class=\\\"text-primary font-normal\\\">Choose</b>\\r\\n                            a game mode\\r\\n                        </p>\\r\\n                        <p class=\\\"text-light text-xl pt-1\\\">\\r\\n                            FFA, solo, 2vs2...\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div class=\\\"pb-10 lg:pb-0\\\">\\r\\n                <div\\r\\n                        class=\\\"card p-4 w-64 h-84 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">2</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <p class=\\\"text-3xl leading-9\\\">\\r\\n                            <b class=\\\"text-primary font-normal\\\">Complete</b>\\r\\n                            the goal of the game mode\\r\\n                        </p>\\r\\n                        <p class=\\\"text-light text-xl pt-1\\\">\\r\\n                            Quests, win goals...\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div>\\r\\n                <div\\r\\n                        class=\\\"card p-4 w-64 h-84 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">3</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <p class=\\\"text-3xl leading-9\\\">\\r\\n                            <b class=\\\"text-primary font-normal\\\">Earn</b>\\r\\n                            rewards\\r\\n                        </p>\\r\\n                        <p class=\\\"text-light text-xl pt-1\\\">\\r\\n                            Earn coins that you will be able to spend in the\\r\\n                            <a class=\\\"underline\\\" href=\\\"/shop\\\">shop</a>\\r\\n                            !\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"join-us w-full text-center mt-15 lg:mt-20 pb-10\\\">\\r\\n            <h2 class=\\\"text-5xl lg:text-7xl\\\">Ready? Start now!</h2>\\r\\n            <a class=\\\"button button-brand mt-4\\\" href=\\\"{apiUrl}/auth/login\\\">\\r\\n                Create Account\\r\\n            </a>\\r\\n            <div class=\\\"pt-1 text-light\\\">\\r\\n                <a class=\\\"text-base\\\" href=\\\"{apiUrl}/auth/login\\\">\\r\\n                    Already a member? Login\\r\\n                </a>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAMI,8BAAgB,OAAO,AAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC;gBACzB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;gBACtB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI;SAC/B,AACL,CAAC,AAED,WAAW,mBAAM,CAAC,AACd,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,WAAW,IAAI,CAAC,AAC/B,CAAC,AAED,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,WAAW,OAAO,CAAC,AAClC,CAAC,AACL,CAAC,AAED,UAAU,cAAC,CAAC,AACR,SAAS,CAAE,mBAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,SAAS,CAAC,WAAW,AACxD,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,AAC7B,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Play Brawlhalla. Earn rewards. - Winhalla</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\r\n        Mammoth Coins, Season Packs and more! | Winhalla home page"}" data-svelte="svelte-756h6c"><link rel="${"canonical"}" href="${"https://winhalla.app"}" data-svelte="svelte-756h6c">`, "")}
<div class="${"pb-8 "}"><div class="${"relative"}"><div class="${"absolute top-7 left-7 lg:left-24 lg:top-10 z-10"}"><h1 class="${"text-6xl lg:text-8xl text-shadow-base"}">PLAY
                <b class="${"text-accent"}">BRAWLHALLA</b>
                <br>
                EARN
                <b class="${"text-accent"}">REWARDS</b></h1></div>
        <div class="${"video-container relative z-0 overflow-hidden w-full\r\n            h-screen-60 lg:h-screen svelte-8zrx6u"}"><video class="${"w-full h-full object-cover"}" preload="${"true"}" loop playsinline autoplay muted><source src="${"/assets/video/brawlhalla-gameplay.mp4"}" type="${"video/mp4"}"></video></div>

        <div class="${"tip absolute left-0 right-0 bottom-20 text-center hidden\r\n            lg:block"}"><p class="${"text-2xl"}">Learn more</p>
            <svg class="${"fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg svelte-8zrx6u"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}"><path d="${"M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707\r\n                    7.778-7.778-1.414-1.414L11 16.172V0H9z"}"></path></svg></div></div>
    <div class="${"pt-10"}"><div class="${"cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row\r\n            items-center lg:justify-around svelte-8zrx6u"}"><div class="${"pb-10 lg:pb-0"}"><div class="${"card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">1</p>
                    <div class="${""}"><p class="${"text-3xl leading-9"}"><b class="${"text-primary font-normal"}">Choose</b>
                            a game mode
                        </p>
                        <p class="${"text-light text-xl pt-1"}">FFA, solo, 2vs2...
                        </p></div></div></div>
            <div class="${"pb-10 lg:pb-0"}"><div class="${"card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">2</p>
                    <div class="${""}"><p class="${"text-3xl leading-9"}"><b class="${"text-primary font-normal"}">Complete</b>
                            the goal of the game mode
                        </p>
                        <p class="${"text-light text-xl pt-1"}">Quests, win goals...
                        </p></div></div></div>
            <div><div class="${"card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">3</p>
                    <div class="${""}"><p class="${"text-3xl leading-9"}"><b class="${"text-primary font-normal"}">Earn</b>
                            rewards
                        </p>
                        <p class="${"text-light text-xl pt-1"}">Earn coins that you will be able to spend in the
                            <a class="${"underline"}" href="${"/shop"}">shop</a>
                            !
                        </p></div></div></div></div>
        <div class="${"join-us w-full text-center mt-15 lg:mt-20 pb-10"}"><h2 class="${"text-5xl lg:text-7xl"}">Ready? Start now!</h2>
            <a class="${"button button-brand mt-4"}" href="${escape(apiUrl) + "/auth/login"}">Create Account
            </a>
            <div class="${"pt-1 text-light"}"><a class="${"text-base"}" href="${escape(apiUrl) + "/auth/login"}">Already a member? Login
                </a></div></div></div></div>`;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes
});

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
    }catch (e) {
        if(!url.includes("createAccount")&&!url.includes("changeEmail")&&!url.includes("exitMatch")&&!url.includes("feltrom/login")) {
            eventEmitter.set({error: e});
        }
        return e
    }
};

const getUser = async () => {
    return callApi("get", "/account");
};

let counter = writable({ content: getUser(), refresh: false });
    //counter = writable({ content: "err", refresh: false });



counter.subscribe((value) => {
    if (value.refresh === true) {
        counter.set({ content: getUser(), refresh: false });
    }
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
	: `<div class="${"z-20 absolute right-0 top-5 lg:top-30 mr-8 lg:mr-6 w-auto h-auto p-5 bg-background border rounded-lg border-legendary"}"><h3 class="${"text-legendary text-xl"}">${escape(message)}</h3>
        <p class="${"text-light text-lg"}">${escape(pushError)}</p></div>`}`;
});

const CONTEXT_KEY = {};

/* src\components\Tailwindcss.svelte generated by Svelte v3.31.0 */

const css$1 = {
	code: "@tailwind base;@tailwind components;@tailwind utilities;",
	map: "{\"version\":3,\"file\":\"Tailwindcss.svelte\",\"sources\":[\"Tailwindcss.svelte\"],\"sourcesContent\":[\"<style global>\\r\\n    @tailwind base;\\r\\n    @tailwind components;\\r\\n    @tailwind utilities;\\r\\n\\r\\n    .button {\\r\\n        display: inline-block;\\r\\n        padding: 0.5rem 2.75rem;\\r\\n        border-radius: 0.125rem;\\r\\n        font-size: 1.25rem;\\r\\n        background-color: #3d72e4;\\r\\n    }\\r\\n\\r\\n    .button-brand:hover {\\r\\n        -webkit-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative {\\r\\n        background-color: #1a1a21;\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        border: 1px solid #3d72e4;\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative:hover {\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        -webkit-box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;\\r\\n        box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;\\r\\n\\r\\n        @apply bg-variant rounded;\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar {\\r\\n        width: 18px;\\r\\n        height: 18px;\\r\\n        cursor: pointer;\\r\\n\\r\\n        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/\\r\\n\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar-thumb {\\r\\n        height: 3px;\\r\\n        border: 6px solid rgba(0, 0, 0, 0);\\r\\n        background-clip: padding-box;\\r\\n        -webkit-border-radius: 15px;\\r\\n        background-color: #1C1C2C;\\r\\n        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);\\r\\n        /*outline: 1px solid slategrey;*/\\r\\n    }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AACI,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC\"}"
};

const Tailwindcss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$1);
	return ``;
});

/* src\components\Navigation\NavAccount.svelte generated by Svelte v3.31.0 */

const css$2 = {
	code: ".username.svelte-i9vj87{margin-left:0.4rem}.dropdown.svelte-i9vj87{top:3.8rem;left:0;right:0}",
	map: "{\"version\":3,\"file\":\"NavAccount.svelte\",\"sources\":[\"NavAccount.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import { apiUrl } from \\\"../../utils/config\\\";\\r\\n\\r\\n    export let username;\\r\\n    export let avatar;\\r\\n\\r\\n    let isDropdownOpen;\\r\\n    const handleClick = () => {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n    };\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .username {\\r\\n        margin-left: 0.4rem;\\r\\n    }\\r\\n\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n        left: 0;\\r\\n        right: 0;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"lg:relative\\\">\\r\\n    <div class=\\\"flex items-center h-full\\\">\\r\\n        <button\\r\\n            class=\\\"focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded\\\"\\r\\n            use:clickOutside\\r\\n            on:click_outside={() => (isDropdownOpen = false)}\\r\\n            on:click={() => handleClick()}>\\r\\n            <div class=\\\"flex items-center\\\">\\r\\n                <img class=\\\"w-10 h-10 rounded-full\\\" src={avatar} alt=\\\"Avatar\\\" />\\r\\n                <p class=\\\"text-xl mr-2 username\\\">{username}</p>\\r\\n                <svg\\r\\n                    class=\\\"w-4 h-6 fill-current hidden lg:block\\\"\\r\\n                    viewBox=\\\"0 0 24 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n        </button>\\r\\n    </div>\\r\\n\\r\\n    <div\\r\\n        class:lg:hidden={!isDropdownOpen}\\r\\n        class=\\\"pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card\\r\\n            dropdown z-50 lg:border lg:border-primary\\\">\\r\\n        <a class=\\\"block text-lg border-l border-red-600 py-3\\r\\n                lg:hover:bg-primary lg:hover:text-font px-3 rounded-sm\\r\\n                lg:border-none\\\" href=\\\"/change-email\\\" > Change email</a>\\r\\n        <a\\r\\n            class=\\\"block text-red-500 text-lg border-l border-red-600 py-3\\r\\n                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm\\r\\n                lg:border-none mb-3 lg:mb-0\\\"\\r\\n            href=\\\"{apiUrl}/auth/logout\\\">Logout</a>\\r\\n\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAcI,SAAS,cAAC,CAAC,AACP,WAAW,CAAE,MAAM,AACvB,CAAC,AAED,SAAS,cAAC,CAAC,AACP,GAAG,CAAE,MAAM,CACX,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,AACZ,CAAC\"}"
};

const NavAccount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { username } = $$props;
	let { avatar } = $$props;

	if ($$props.username === void 0 && $$bindings.username && username !== void 0) $$bindings.username(username);
	if ($$props.avatar === void 0 && $$bindings.avatar && avatar !== void 0) $$bindings.avatar(avatar);
	$$result.css.add(css$2);

	return `<div class="${"lg:relative"}"><div class="${"flex items-center h-full"}"><button class="${"focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded"}"><div class="${"flex items-center"}"><img class="${"w-10 h-10 rounded-full"}"${add_attribute("src", avatar, 0)} alt="${"Avatar"}">
                <p class="${"text-xl mr-2 username svelte-i9vj87"}">${escape(username)}</p>
                <svg class="${"w-4 h-6 fill-current hidden lg:block"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div></button></div>

    <div class="${[
		"pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card\r\n            dropdown z-50 lg:border lg:border-primary svelte-i9vj87",
		 "lg:hidden" 
	].join(" ").trim()}"><a class="${"block text-lg border-l border-red-600 py-3\r\n                lg:hover:bg-primary lg:hover:text-font px-3 rounded-sm\r\n                lg:border-none"}" href="${"/change-email"}">Change email</a>
        <a class="${"block text-red-500 text-lg border-l border-red-600 py-3\r\n                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm\r\n                lg:border-none mb-3 lg:mb-0"}" href="${escape(apiUrl) + "/auth/logout"}">Logout</a></div></div>`;
});

/* src\components\Navigation\NavNotifications.svelte generated by Svelte v3.31.0 */

const css$3 = {
	code: ".dropdown.svelte-7szmv8.svelte-7szmv8{top:3.8rem}.bell-button.svelte-7szmv8:hover .bell.svelte-7szmv8{display:none}.bell-button.svelte-7szmv8:hover .bell-hover.svelte-7szmv8{display:block}.notification.svelte-7szmv8.svelte-7szmv8{border-radius:10px;@apply flex justify-between px-4 py-3 mt-3 mb-1 relative overflow-hidden w-full;}",
	map: "{\"version\":3,\"file\":\"NavNotifications.svelte\",\"sources\":[\"NavNotifications.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import { callApi } from \\\"../../utils/api.js\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { counter } from \\\"../store\\\";\\r\\n\\r\\n    export let data;\\r\\n    let newNotifications = false;\\r\\n    let opened = false;\\r\\n    let isDropdownOpen = false;\\r\\n    let matchesLength;\\r\\n\\r\\n    function handleClick() {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n        opened = true;\\r\\n    }\\r\\n\\r\\n    function calculateTimers() {\\r\\n        data.inGame.forEach((match, i) => {\\r\\n            let d = new Date(match.Date);\\r\\n            const endsIn = -(\\r\\n                (new Date().getTime() -\\r\\n                    new Date(d.setHours(d.getHours() + 3)).getTime()) /\\r\\n                1000\\r\\n            );\\r\\n            if (endsIn < 1) {\\r\\n                data.inGame[i].timer = \\\"\\\";\\r\\n            } else {\\r\\n                startTimer(endsIn, i);\\r\\n            }\\r\\n        });\\r\\n    }\\r\\n\\r\\n    onMount(() => {\\r\\n        if (!data.notifications) return;\\r\\n\\r\\n        let length = data.notifications.length;\\r\\n        let cookies = cookie.parse(document.cookie);\\r\\n\\r\\n        if (length > cookies.notificationNb || !cookies.notificationNb) {\\r\\n            newNotifications = true;\\r\\n        }\\r\\n\\r\\n        cookies.notificationNb = length;\\r\\n        matchesLength = data.inGame.length;\\r\\n        calculateTimers();\\r\\n\\r\\n        //document.cookie = cookie.serialize(\\\"notificationNb\\\",cookies.notificationNb,{maxAge:15552000,sameSite:\\\"lax\\\"})\\r\\n        //document.cookie = cookie.serialize(cookies)\\r\\n    });\\r\\n    //TODO: on peut opti ça en utilisant la data de export let data au lieu de resubscribe pour save de la ram\\r\\n    counter.subscribe(() => {\\r\\n        if (data.inGame) {\\r\\n            if (data.inGame.length !== matchesLength) {\\r\\n                calculateTimers();\\r\\n            }\\r\\n        }\\r\\n    });\\r\\n\\r\\n    function startTimer(duration, i) {\\r\\n        let timer = duration,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            data.inGame[i].timer = hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = duration;\\r\\n            }\\r\\n        }, 1000);\\r\\n    }\\r\\n\\r\\n    const idToType = id => {\\r\\n        if (id === 0) return \\\"match finished\\\";\\r\\n        if (id === 1) return \\\"quest finished\\\";\\r\\n        if (id === 2) return \\\"match\\\";\\r\\n    };\\r\\n\\r\\n    function delNotif(i) {\\r\\n        callApi(\\\"post\\\", \\\"/deleteNotification/\\\" + i);\\r\\n        data.notifications.splice(i, 1);\\r\\n        data = data;\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n    }\\r\\n\\r\\n    .bell-button:hover .bell {\\r\\n        display: none;\\r\\n    }\\r\\n\\r\\n    .bell-button:hover .bell-hover {\\r\\n        display: block;\\r\\n    }\\r\\n\\r\\n    .notification {\\r\\n        border-radius: 10px;\\r\\n        @apply flex justify-between px-4 py-3 mt-3 mb-1 relative overflow-hidden w-full;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"relative\\\">\\r\\n    <div class=\\\"flex items-center h-full mr-4 lg:m-0\\\">\\r\\n        <div\\r\\n            class=\\\"focus:outline-none lg:ml-3 rounded bell-button cursor-pointer\\\"\\r\\n            on:click={() => {\\r\\n                document.cookie = cookie.serialize(\\r\\n                    'notificationNb',\\r\\n                    data.notifications.length,\\r\\n                    { maxAge: 15552000, sameSite: 'lax', path: '/' }\\r\\n                );\\r\\n                newNotifications = false;\\r\\n            }}\\r\\n            on:click={handleClick}>\\r\\n            <div class=\\\"flex items-center relative\\\">\\r\\n                {#if isDropdownOpen}\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\\r\\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\\r\\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\\r\\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\\r\\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\\r\\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\\r\\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\\r\\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\\r\\n                            1.125 1.126 1.125z\\\" />\\r\\n                    </svg>\\r\\n                {:else}\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current bell\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m19.945\\r\\n                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579\\r\\n                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619\\r\\n                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404\\r\\n                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3\\r\\n                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404\\r\\n                            3.135-3.135\\r\\n                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441\\r\\n                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505\\r\\n                            1.125-1.126\\r\\n                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886\\r\\n                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612\\r\\n                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572\\r\\n                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418\\r\\n                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z\\\" />\\r\\n                    </svg>\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current hidden bell-hover\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\\r\\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\\r\\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\\r\\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\\r\\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\\r\\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\\r\\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\\r\\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\\r\\n                            1.125 1.126 1.125z\\\" />\\r\\n                    </svg>\\r\\n                {/if}\\r\\n                {#if newNotifications}\\r\\n                    <span class=\\\"flex\\\">\\r\\n                        <span\\r\\n                            class=\\\"inline-flex animate-ping absolute top-0\\r\\n                            right-0 w-2 h-2 rounded-full bg-legendary opacity-75\\\" />\\r\\n                        <span\\r\\n                            class=\\\"inline-flex absolute top-0 right-0 w-2 h-2\\r\\n                            rounded-full bg-legendary\\\" />\\r\\n                    </span>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n    <div\\r\\n        class:hidden={!isDropdownOpen}\\r\\n        class=\\\"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\\r\\n        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border\\r\\n        border-primary overflow-y-auto max-h-screen-60 scrollbar\\\"\\r\\n        use:clickOutside\\r\\n        on:click_outside={() => (isDropdownOpen = false)}>\\r\\n        <div>\\r\\n            {#if data.notifications}\\r\\n                <div\\r\\n                    on:click={() => {\\r\\n                        setTimeout(() => {\\r\\n                            if (opened === true) {\\r\\n                                document.cookie = cookie.serialize(\\r\\n                                    'notificationNb',\\r\\n                                    data.notifications.length,\\r\\n                                    {\\r\\n                                        maxAge: 15552000,\\r\\n                                        sameSite: 'lax',\\r\\n                                        path: '/'\\r\\n                                    }\\r\\n                                );\\r\\n                                newNotifications = false;\\r\\n                            }\\r\\n                        }, 10);\\r\\n                    }}>\\r\\n                    <p class=\\\"ml-1\\\">Notifications</p>\\r\\n                    <div>\\r\\n                        {#each data.notifications as notification, i}\\r\\n                            <a href=\\\"/{notification.id === 0?`play/ffa/${notification.matchId}`:notification.id === 1?'play':''}\\\"\\r\\n                                class=\\\"card notification flex items-center\\r\\n                                relative\\\" class:cursor-default={notification.id === 2}>\\r\\n                                <div class=\\\"progress-container\\\">\\r\\n                                    <p class=\\\"mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                        {notification.message}\\r\\n                                    </p>\\r\\n                                    {#if notification.tip}\\r\\n                                        <p\\r\\n                                            class=\\\" mr-6 lg:mr-12 text-light\\r\\n                                            text-lg\\\">\\r\\n                                            {notification.tip}\\r\\n                                        </p>\\r\\n                                    {/if}\\r\\n                                </div>\\r\\n                                <span\\r\\n                                    class=\\\"quest-goal text-sm text-font px-2\\r\\n                                    py-1 bg-legendary rounded-lg b\\\">\\r\\n                                    {idToType(notification.id)}\\r\\n                                </span>\\r\\n                                <button\\r\\n                                    on:click={() => delNotif(i)}\\r\\n                                    class=\\\"p-2 absolute top-0 right-0 text-light\\r\\n                                    hover:text-font\\\">\\r\\n                                    <svg\\r\\n                                        class=\\\"w-3 h-3 fill-current \\\"\\r\\n                                        viewBox=\\\"0 0 28 24\\\"\\r\\n                                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                            d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\" />\\r\\n                                    </svg>\\r\\n                                </button>\\r\\n                            </a>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/if}\\r\\n            {#if data.inGame}\\r\\n                <div class=\\\"mt-5\\\">\\r\\n                    <p class=\\\"ml-1\\\">Matchs in progress</p>\\r\\n                    <div>\\r\\n                        {#each data.inGame as match}\\r\\n                            <a\\r\\n                                class=\\\"card notification flex items-center\\\"\\r\\n                                href=\\\"/play/ffa/{match.id}\\\">\\r\\n                                <div class=\\\"progress-container\\\">\\r\\n                                    <p class=\\\"ml-2 mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                        {match.type}\\r\\n                                    </p>\\r\\n                                    <p\\r\\n                                        class=\\\"ml-2 mr-6 lg:mr-12 text-light\\r\\n                                        text-lg\\\">\\r\\n                                        {match.timer}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                                <p class=\\\"quest-goal text-xl text-primary\\\">\\r\\n                                    <!--{#if match.hasStarted}{/if}-->\\r\\n                                    {!match.isFinished ? match.progress + '/8' : 'Waiting for others to finish'}\\r\\n                                </p>\\r\\n                            </a>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/if}\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA+FI,SAAS,4BAAC,CAAC,AACP,GAAG,CAAE,MAAM,AACf,CAAC,AAED,0BAAY,MAAM,CAAC,KAAK,cAAC,CAAC,AACtB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,0BAAY,MAAM,CAAC,WAAW,cAAC,CAAC,AAC5B,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,aAAa,4BAAC,CAAC,AACX,aAAa,CAAE,IAAI,CACnB,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,AACpF,CAAC\"}"
};

const NavNotifications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let newNotifications = false;
	let matchesLength;

	function calculateTimers() {
		data.inGame.forEach((match, i) => {
			let d = new Date(match.Date);
			const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);

			if (endsIn < 1) {
				data.inGame[i].timer = "";
			} else {
				startTimer(endsIn, i);
			}
		});
	}

	onMount(() => {
		if (!data.notifications) return;
		let length = data.notifications.length;
		let cookies = cookie__default['default'].parse(document.cookie);

		if (length > cookies.notificationNb || !cookies.notificationNb) {
			newNotifications = true;
		}

		cookies.notificationNb = length;
		matchesLength = data.inGame.length;
		calculateTimers();
	}); //document.cookie = cookie.serialize("notificationNb",cookies.notificationNb,{maxAge:15552000,sameSite:"lax"})
	//document.cookie = cookie.serialize(cookies)

	//TODO: on peut opti ça en utilisant la data de export let data au lieu de resubscribe pour save de la ram
	counter.subscribe(() => {
		if (data.inGame) {
			if (data.inGame.length !== matchesLength) {
				calculateTimers();
			}
		}
	});

	function startTimer(duration, i) {
		let timer = duration, hours, minutes, seconds;

		setInterval(
			function () {
				seconds = Math.floor(timer % 60);
				minutes = Math.floor(timer / 60 % 60);
				hours = Math.floor(timer / (60 * 60));
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				data.inGame[i].timer = hours + ":" + minutes + ":" + seconds;

				if (--timer < 0) {
					timer = duration;
				}
			},
			1000
		);
	}

	const idToType = id => {
		if (id === 0) return "match finished";
		if (id === 1) return "quest finished";
		if (id === 2) return "match";
	};

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$3);

	return `<div class="${"relative"}"><div class="${"flex items-center h-full mr-4 lg:m-0"}"><div class="${"focus:outline-none lg:ml-3 rounded bell-button cursor-pointer svelte-7szmv8"}"><div class="${"flex items-center relative"}">${ `<svg class="${"pt-1 w-5 lg:p-0 fill-current bell svelte-7szmv8"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m19.945\r\n                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579\r\n                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619\r\n                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404\r\n                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3\r\n                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404\r\n                            3.135-3.135\r\n                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441\r\n                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505\r\n                            1.125-1.126\r\n                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886\r\n                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612\r\n                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572\r\n                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418\r\n                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z"}"></path></svg>
                    <svg class="${"pt-1 w-5 lg:p-0 fill-current hidden bell-hover svelte-7szmv8"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\r\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\r\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\r\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\r\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\r\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\r\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\r\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\r\n                            1.125 1.126 1.125z"}"></path></svg>`}
                ${newNotifications
	? `<span class="${"flex"}"><span class="${"inline-flex animate-ping absolute top-0\r\n                            right-0 w-2 h-2 rounded-full bg-legendary opacity-75"}"></span>
                        <span class="${"inline-flex absolute top-0 right-0 w-2 h-2\r\n                            rounded-full bg-legendary"}"></span></span>`
	: ``}</div></div></div>

    <div class="${[
		"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border\r\n        border-primary overflow-y-auto max-h-screen-60 scrollbar svelte-7szmv8",
		 "hidden" 
	].join(" ").trim()}"><div>${data.notifications
	? `<div><p class="${"ml-1"}">Notifications</p>
                    <div>${each(data.notifications, (notification, i) => `<a href="${"/" + escape(notification.id === 0
		? `play/ffa/${notification.matchId}`
		: notification.id === 1 ? "play" : "")}" class="${[
			"card notification flex items-center\r\n                                relative svelte-7szmv8",
			notification.id === 2 ? "cursor-default" : ""
		].join(" ").trim()}"><div class="${"progress-container"}"><p class="${"mr-6 lg:mr-12 text-2xl"}">${escape(notification.message)}</p>
                                    ${notification.tip
		? `<p class="${" mr-6 lg:mr-12 text-light\r\n                                            text-lg"}">${escape(notification.tip)}
                                        </p>`
		: ``}</div>
                                <span class="${"quest-goal text-sm text-font px-2\r\n                                    py-1 bg-legendary rounded-lg b"}">${escape(idToType(notification.id))}</span>
                                <button class="${"p-2 absolute top-0 right-0 text-light\r\n                                    hover:text-font"}"><svg class="${"w-3 h-3 fill-current "}" viewBox="${"0 0 28 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 2.4-2.4-2.4-9.6\r\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\r\n                                            2.4 2.4 9.6-9.6 9.6 9.6\r\n                                            2.4-2.4-9.6-9.6z"}"></path></svg></button>
                            </a>`)}</div></div>`
	: ``}
            ${data.inGame
	? `<div class="${"mt-5"}"><p class="${"ml-1"}">Matchs in progress</p>
                    <div>${each(data.inGame, match => `<a class="${"card notification flex items-center svelte-7szmv8"}" href="${"/play/ffa/" + escape(match.id)}"><div class="${"progress-container"}"><p class="${"ml-2 mr-6 lg:mr-12 text-2xl"}">${escape(match.type)}</p>
                                    <p class="${"ml-2 mr-6 lg:mr-12 text-light\r\n                                        text-lg"}">${escape(match.timer)}
                                    </p></div>
                                <p class="${"quest-goal text-xl text-primary"}">
                                    ${escape(!match.isFinished
		? match.progress + "/8"
		: "Waiting for others to finish")}</p>
                            </a>`)}</div></div>`
	: ``}</div></div></div>`;
});

/* src\components\Navigation\NavAlert.svelte generated by Svelte v3.31.0 */

const css$4 = {
	code: ".dropdown.svelte-l2gql2{top:3.8rem}.info.svelte-l2gql2{border-radius:10px;@apply flex justify-between px-4 py-3 mt-2 mb-1 relative overflow-hidden w-full;}",
	map: "{\"version\":3,\"file\":\"NavAlert.svelte\",\"sources\":[\"NavAlert.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import {clickOutside} from \\\"../../utils/clickOutside\\\";\\r\\n\\r\\n    export let data;\\r\\n\\r\\n    let isDropdownOpen;\\r\\n    const handleClick = () => {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n    };\\r\\n\\r\\n</script>\\r\\n<style>\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        border-radius: 10px;\\r\\n        @apply flex justify-between px-4 py-3 mt-2 mb-1 relative overflow-hidden w-full;\\r\\n    }\\r\\n</style>\\r\\n{#if data !== \\\"network\\\"}\\r\\n    <div class=\\\"relative\\\">\\r\\n        <div class=\\\"flex items-center h-full mr-4 lg:m-0\\\">\\r\\n            <button\\r\\n                    class=\\\"focus:outline-none\\\"\\r\\n                    use:clickOutside\\r\\n                    on:click_outside={() => (isDropdownOpen = false)}\\r\\n                    on:click={() => handleClick()}>\\r\\n                <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" class=\\\"w-6 lg:w-8 mr-2 lg:mr-4 text-legendary\\\"\\r\\n                     viewBox=\\\"0 0 576 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\\\"/>\\r\\n                </svg>\\r\\n            </button>\\r\\n        </div>\\r\\n        <div\\r\\n                class:hidden={!isDropdownOpen}\\r\\n                class=\\\"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\\r\\n            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92\\r\\n            border border-legendary\\\">\\r\\n            <div>\\r\\n\\r\\n                {#each data as information}\\r\\n                    <div\\r\\n                            class=\\\"card info flex items-center\\\">\\r\\n                        <div class=\\\"progress-container\\\">\\r\\n                            <p class=\\\"ml-2 mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                {information.name}\\r\\n                            </p>\\r\\n                            <p\\r\\n                                    class=\\\"ml-2 mr-6 lg:mr-12 text-light\\r\\n                                            text-lg\\\">\\r\\n                                {information.description}\\r\\n                            </p>\\r\\n                        </div>\\r\\n\\r\\n                    </div>\\r\\n                {/each}\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AAYI,SAAS,cAAC,CAAC,AACP,GAAG,CAAE,MAAM,AACf,CAAC,AAED,KAAK,cAAC,CAAC,AACH,aAAa,CAAE,IAAI,CACnB,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,AACpF,CAAC\"}"
};

const NavAlert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$4);

	return `${data !== "network"
	? `<div class="${"relative"}"><div class="${"flex items-center h-full mr-4 lg:m-0"}"><button class="${"focus:outline-none"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-6 lg:w-8 mr-2 lg:mr-4 text-legendary"}" viewBox="${"0 0 576 512"}"><path fill="${"currentColor"}" d="${"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"}"></path></svg></button></div>
        <div class="${[
			"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92\r\n            border border-legendary svelte-l2gql2",
			 "hidden" 
		].join(" ").trim()}"><div>${each(data, information => `<div class="${"card info flex items-center svelte-l2gql2"}"><div class="${"progress-container"}"><p class="${"ml-2 mr-6 lg:mr-12 text-2xl"}">${escape(information.name)}</p>
                            <p class="${"ml-2 mr-6 lg:mr-12 text-light\r\n                                            text-lg"}">${escape(information.description)}
                            </p></div>

                    </div>`)}</div></div></div>`
	: ``}`;
});

/* src\components\Poll.svelte generated by Svelte v3.31.0 */

const Poll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { poll } = $$props; /* = {
    name: "Should we add a 2vs2 game mode ?",
    isMCQ: true,
    options: [
        "Yes", "I don't care", "No"
    ]
};*/

	let answer;

	if ($$props.poll === void 0 && $$bindings.poll && poll !== void 0) $$bindings.poll(poll);

	return `${poll
	? `<div class="${["bg-background rounded-lg border border-primary",  ""].join(" ").trim()}"><button class="${"flex justify-between cursor-pointer focus:outline-none w-full"}"><p class="${["pl-5 pt-5",  "pb-4" ].join(" ").trim()}">${escape(poll.name)}</p>
            
            <div class="${"ml-5 mr-3 mt-6"}"><svg class="${["fill-current w-5",  ""].join(" ").trim()}" style="${"margin-bottom: 0.14rem;"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z"}"></path></svg>
                <svg class="${["fill-current w-5",  "hidden" ].join(" ").trim()}" style="${"margin-bottom: 0.14rem;"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div></button>

        <div class="${["px-5",  "hidden" ].join(" ").trim()}">${poll.isMCQ
		? `<div class="${""}">${ `${each(poll.options, (option, i) => `<div class="${[
					"p-4 bg-variant my-3 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary block flex items-center cursor-pointer",
					answer === i ? "border-primary" : ""
				].join(" ").trim()}"><input class="${"opacity-0 fixed pointer-events-none w-4 h-4"}" type="${"radio"}"${add_attribute("value", option, 0)}>

                                ${answer === i
				? `<svg class="${"w-4 fill-current text-primary"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m0 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-6.624-.008-11.992-5.376-12-11.999zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599v.001zm4 0c0-3.093 2.507-5.6 5.6-5.6s5.6 2.507 5.6 5.6-2.507 5.6-5.6 5.6c-3.093 0-5.6-2.507-5.6-5.6z"}"></path></svg>`
				: `<svg class="${"w-4 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c-.008 6.624-5.376 11.992-11.999 12zm0-21.6c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6c-.006-5.299-4.301-9.594-9.599-9.6h-.001z"}"></path></svg>`}


                                <p class="${"ml-2"}" style="${"line-height: 0; margin-bottom: -0.20rem"}">${escape(option)}</p>

                            </div>`)}
                        <button class="${"button button-brand w-24 mt-2 w-full"}">SUBMIT
                        </button>`
			}</div>`
		: ``}</div></div>`
	: ``}`;
});

/* src\components\Navigation\Nav.svelte generated by Svelte v3.31.0 */

const css$5 = {
	code: "svg.svelte-z9u5aa{@apply pr-1;;margin-bottom:3px}.nav-icon.svelte-z9u5aa{margin-bottom:-6px}.play.svelte-z9u5aa{width:1.05rem;height:1.05rem}.nav-link-container.svelte-z9u5aa{@apply pr-9 flex items-center my-3;}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { onDestroy, onMount } from \\\"svelte\\\";\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n\\r\\n    import NavAccount from \\\"./NavAccount.svelte\\\";\\r\\n    import Notifications from \\\"./NavNotifications.svelte\\\";\\r\\n    import NavAlert from \\\"./NavAlert.svelte\\\";\\r\\n    import Poll from \\\"../Poll.svelte\\\";\\r\\n    import { fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    import { apiUrl } from \\\"../../utils/config\\\";\\r\\n    import { callApi } from \\\"../../utils/api\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n    import { counter } from \\\"../store.js\\\";\\r\\n\\r\\n    export let isScrolling;\\r\\n    let isNavbarOpen;\\r\\n    let isUserLoggedIn;\\r\\n\\r\\n\\r\\n    let informations;\\r\\n    let poll;\\r\\n    let notificationsObj = {};\\r\\n\\r\\n    let user;\\r\\n    let userCoins;\\r\\n\\r\\n    let firstLoad = true;\\r\\n    let offline;\\r\\n    let loaded = false;\\r\\n\\r\\n    async function calculateProperties(value) {\\r\\n        const tempUserData = value\\r\\n        console.log(tempUserData)\\r\\n        if (tempUserData.offline) offline = true;\\r\\n        if (tempUserData instanceof Error) {\\r\\n            if (tempUserData.response) if (tempUserData.response.status === 503 ||tempUserData.response.status === 502) goto(\\\"/status\\\");\\r\\n            return isUserLoggedIn = \\\"network\\\";\\r\\n        }\\r\\n        if (tempUserData.user) {\\r\\n            notificationsObj.notifications = tempUserData.user.notifications;\\r\\n            notificationsObj.inGame = tempUserData.user.inGame;\\r\\n        }\\r\\n        user = tempUserData.steam;\\r\\n        userCoins = tempUserData.user.coins;\\r\\n\\r\\n        isUserLoggedIn = tempUserData.user\\r\\n            ? true\\r\\n            : tempUserData.steam\\r\\n                ? \\\"steam\\\"\\r\\n                : false;\\r\\n    }\\r\\n\\r\\n    const resetNav = async value => {\\r\\n        if (value.refresh === true) return;\\r\\n        user = await value.content;\\r\\n        if (firstLoad === true) return (firstLoad = false);\\r\\n        calculateProperties(user);\\r\\n    };\\r\\n\\r\\n    const unsubscribe = counter.subscribe(resetNav);\\r\\n    onDestroy(unsubscribe);\\r\\n\\r\\n    onMount(async () => {\\r\\n        try {\\r\\n            informations = await callApi(\\\"get\\\", \\\"/informations\\\");\\r\\n\\r\\n\\r\\n            if (informations instanceof Error) {\\r\\n                throw informations;\\r\\n            }\\r\\n        } catch (e) {\\r\\n            informations = \\\"network\\\";\\r\\n        }\\r\\n\\r\\n        setTimeout(async () => {\\r\\n                try {\\r\\n                    if(isUserLoggedIn === true) poll = await callApi(\\\"get\\\", \\\"/getpoll\\\");\\r\\n\\r\\n                } catch (e) {\\r\\n                    console.log(e);\\r\\n                }\\r\\n            }, 5000\\r\\n        );\\r\\n        await user\\r\\n        calculateProperties(user);\\r\\n        loaded = true;\\r\\n    });\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    svg {\\r\\n        @apply pr-1;\\r\\n        margin-bottom: 3px;\\r\\n    }\\r\\n\\r\\n    .nav-icon {\\r\\n        margin-bottom: -6px;\\r\\n    }\\r\\n\\r\\n    .play {\\r\\n        width: 1.05rem;\\r\\n        height: 1.05rem;\\r\\n    }\\r\\n\\r\\n    .nav-link-container {\\r\\n        @apply pr-9 flex items-center my-3;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"h-auto w-full fixed z-50\\\">\\r\\n    {#if offline}\\r\\n        <div class=\\\"bg-legendary w-full flex text-white text-center lg:text-xl\\\">\\r\\n            <p class=\\\"text-center w-99%\\\">\\r\\n                You are offline or our services are down, you may experience\\r\\n                bugs on the website.\\r\\n            </p>\\r\\n            <svg\\r\\n                xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                viewBox=\\\"0 0 24 24\\\"\\r\\n                width=\\\"24\\\"\\r\\n                height=\\\"24\\\"\\r\\n                on:click={() => (offline = false)}>\\r\\n                <path\\r\\n                    class=\\\"heroicon-ui\\\"\\r\\n                    d=\\\"M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1\\r\\n                    0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12\\r\\n                    10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z\\\"\\r\\n                    fill=\\\"#FFFFFF\\\" />\\r\\n            </svg>\\r\\n        </div>\\r\\n    {/if}\\r\\n    <nav\\r\\n        class:border-primary={isScrolling}\\r\\n        class:border-b-2={isScrolling}\\r\\n        class=\\\"shadow-link-hover bg-background lg:flex items-center text-font\\r\\n        w-full transition duration-200 border-b border-transparent\\\">\\r\\n        <div\\r\\n            class=\\\"w-full lg:w-auto flex justify-between items-center py-3\\r\\n            relative\\\">\\r\\n            <div class=\\\"pl-7 lg:pl-24 lg:pr-34 text-logo\\\">\\r\\n                <a class=\\\"logo\\\" href=\\\"/\\\">WINHALLA</a>\\r\\n            </div>\\r\\n            <div class=\\\"pr-6 lg:hidden flex -mt-2\\\">\\r\\n                <div class=\\\"flex lg:hidden items-center\\\">\\r\\n                    {#if informations}\\r\\n                        <NavAlert data={informations} />\\r\\n                    {/if}\\r\\n\\r\\n                    <Notifications data={notificationsObj} />\\r\\n                </div>\\r\\n                <button\\r\\n                    class=\\\"focus:outline-none\\\"\\r\\n                    use:clickOutside\\r\\n                    on:click_outside={() => (isNavbarOpen = false)}\\r\\n                    on:click={() => {\\r\\n                        isNavbarOpen = !isNavbarOpen;\\r\\n                    }}>\\r\\n                    <svg\\r\\n                        class=\\\"w-7 h-7 fill-current nav-icon\\\"\\r\\n                        viewBox=\\\"0 0 28 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        {#if !isNavbarOpen}\\r\\n                            <path\\r\\n                                d=\\\"m2.61 0h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\" />\\r\\n                        {:else}\\r\\n                            <path\\r\\n                                d=\\\"m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6\\r\\n                                9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                2.4-2.4-9.6-9.6z\\\" />\\r\\n                        {/if}\\r\\n                    </svg>\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class:hidden={!isNavbarOpen} class=\\\"lg:block w-full\\\">\\r\\n            <div\\r\\n                class=\\\"pb-3 lg:p-0 sm:flex items-center w-full justify-between\\\">\\r\\n                <div class=\\\"ml-7 links text-xl lg:flex\\\">\\r\\n                    <!--<a\\r\\n                            class=\\\"nav-link-container lg:hover:text-shadow-link-hover\\r\\n                            border-l border-primary lg:border-none pl-3\\\"\\r\\n                            href=\\\"/profile\\\">\\r\\n                        <svg\\r\\n                                class=\\\"fill-current w-5 h-5\\\"\\r\\n                                viewBox=\\\"0 0 32 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                    d=\\\"m10 12v8h-4v-8zm6-8v16h-4v-16zm16 18v2h-32v-24h2v22zm-10-14v12h-4v-12zm6-6v18h-4v-18z\\\"/>\\r\\n                        </svg>\\r\\n                        PROFILE\\r\\n                    </a>-->\\r\\n                    <a\\r\\n                        class=\\\"nav-link-container\\r\\n                        lg:hover:text-shadow-link-hover border-l border-primary\\r\\n                        lg:border-none pl-3\\\"\\r\\n                        href=\\\"/play\\\">\\r\\n                        <svg\\r\\n                            class=\\\"fill-current play\\\"\\r\\n                            viewBox=\\\"0 0 24 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                d=\\\"m.001 1.165v21.669c.052.661.601 1.177 1.271\\r\\n                                1.177.225 0 .436-.058.62-.16l-.006.003\\r\\n                                21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672\\r\\n                                0-1.223.521-1.27 1.181v.004z\\\" />\\r\\n                        </svg>\\r\\n                        PLAY\\r\\n                    </a>\\r\\n                    <a\\r\\n                        class=\\\"nav-link-container\\r\\n                        lg:hover:text-shadow-link-hover border-l border-primary\\r\\n                        lg:border-none pl-3\\\"\\r\\n                        href=\\\"/shop\\\"\\r\\n                        rel=\\\"prefetch\\\">\\r\\n                        <svg\\r\\n                            class=\\\"fill-current play\\\"\\r\\n                            viewBox=\\\"0 0 22 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                d=\\\"m14.416 24v-11.098h5.68c.181 0\\r\\n                                .328.147.328.328v10.114c0\\r\\n                                .362-.294.656-.656.656zm-12.096 0c-.362\\r\\n                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181\\r\\n                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357\\r\\n                                0-.362.294-.656.656-.656.23 0\\r\\n                                .432.118.549.296l.002.002c.028.041 1.342 1.92\\r\\n                                5.15\\r\\n                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622\\r\\n                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515\\r\\n                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391\\r\\n                                3.583 4.309.749-1.87 2.037-4.252\\r\\n                                3.74-4.252.741.039 1.388.41\\r\\n                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0\\r\\n                                .262-.04.515-.113.753l.005-.018c-.352\\r\\n                                1.035-1.466 1.823-2.653 2.391 3.472-.872\\r\\n                                4.675-2.61\\r\\n                                4.69-2.633.12-.173.318-.286.541-.286.362 0\\r\\n                                .656.294.656.656 0\\r\\n                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434\\r\\n                                2.154-5.345 3.164h6.48c.181 0\\r\\n                                .328.147.328.328v4.029c0\\r\\n                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524\\r\\n                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936\\r\\n                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315\\r\\n                                3.791c1.692-.501 3.698-1.389\\r\\n                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946\\r\\n                                0-2.103 2.226-2.813 4.21z\\\" />\\r\\n                        </svg>\\r\\n                        SHOP\\r\\n                    </a>\\r\\n                </div>\\r\\n                <!---{#if loaded && !poll}\\r\\n                    <div\\r\\n                            class=\\\"absolute top-2 \\\"\\r\\n                            style=\\\"left: 50% ; transform: translate(-50%, 0);\\\"\\r\\n                            transition:fly={{ y:-200, duration: 500 }}\\r\\n                    >\\r\\n                        <div class=\\\"flex items-center px-4\\\">\\r\\n                            <p\\r\\n                                    class=\\\"text-3xl text-center px-4 md:px-0\\r\\n                                md:text-left ml-10\\\">\\r\\n                                {poll.name}\\r\\n                            </p>\\r\\n                            <button on:click={()=>{poll.submitted = true;setTimeout(()=>{poll.submitted = false; poll = undefined},5000)}}\\r\\n                                    class=\\\"button button-brand ml-4 w-24\\\"\\r\\n                                    style=\\\"padding: 0.5rem 0.75rem\\\">\\r\\n                                SUBMIT\\r\\n                            </button>\\r\\n                        </div>\\r\\n                        <div class=\\\"mt-2 flex relative\\\" style=\\\"\\\">\\r\\n                            <div\\r\\n                                    class=\\\"z-10 h-12 w-11 bg-background\\r\\n                                rounded-bl-lg border-b-2 border-l-2 border-green\\\"/>\\r\\n\\r\\n                            <div\\r\\n                                    class=\\\"z-20 absolute top-0 left-5 w-12\\r\\n                                bg-background rounded-bl-lg\\\"\\r\\n                                    style=\\\"height: calc(3rem - 2px)\\\"/>\\r\\n                            <div class=\\\"z-20\\\">\\r\\n                                <Poll poll={poll}/>\\r\\n                            </div>\\r\\n\\r\\n                            <div\\r\\n                                    class=\\\"absolute z-10 top-1 bottom-0 left-11\\r\\n                                right-12 rounded-b-lg border-8 border-t-0\\r\\n                                border-green\\\"/>\\r\\n                            <div\\r\\n                                    class=\\\"z-20 absolute top-0 right-5 w-12\\r\\n                                bg-background rounded-br-lg\\\"\\r\\n                                    style=\\\"height: calc(3rem - 2px)\\\"/>\\r\\n                            <div\\r\\n                                    class=\\\"absolute top-0 right-5 w-12 bg-background\\r\\n                                rounded-br-lg border-b-2 border-green\\\"\\r\\n                                    style=\\\"height: calc(3rem)\\\"/>\\r\\n                            <div\\r\\n                                    class=\\\"z-10 h-12 w-12 bg-background\\r\\n                                rounded-br-lg border-b-2 border-r-2 border-green\\r\\n                                \\\"/>\\r\\n                        </div>\\r\\n\\r\\n                    </div>\\r\\n                {/if}-->\\r\\n                <div class=\\\"ml-7 mt-5 md:m-0 md:mr-7 lg:flex lg:items-center\\\">\\r\\n                    {#if informations}\\r\\n                        <div class=\\\"hidden lg:flex items-center\\\">\\r\\n                            <NavAlert data={informations} />\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                    {#if isUserLoggedIn === true}\\r\\n                        <div class=\\\"lg:flex lg:items-center\\\">\\r\\n                            {#if user.displayName && user.photos}\\r\\n                                <NavAccount\\r\\n                                    username={user.displayName}\\r\\n                                    avatar={user.photos[0].value} />\\r\\n                            {/if}\\r\\n                            {#if notificationsObj}\\r\\n                                <div class=\\\"hidden lg:flex items-center\\\">\\r\\n                                    <Notifications data={notificationsObj} />\\r\\n                                </div>\\r\\n                            {/if}\\r\\n\\r\\n                            <a class=\\\"lg:mt-0 lg:ml-8 text-2xl text-primary\\\" href=\\\"/shop\\\">\\r\\n                                <b class=\\\"font-normal \\\">{userCoins}</b>\\r\\n                                $\\r\\n                            </a>\\r\\n                        </div>\\r\\n                    {:else if isUserLoggedIn == 'steam'}\\r\\n                        <a\\r\\n                            class=\\\"button-brand button mr-3\\\"\\r\\n                            href=\\\"/create-account\\\">\\r\\n                            CREATE ACCOUNT\\r\\n                        </a>\\r\\n                    {:else if isUserLoggedIn === 'network'}\\r\\n                        <p class=\\\"text-legendary text-xl\\\">An error occured processing the account data</p>\\r\\n                    {:else}\\r\\n                        <a\\r\\n                            class=\\\"button-brand button mr-3\\\"\\r\\n                            href=\\\"{apiUrl}/auth/login\\\">\\r\\n                            CREATE ACCOUNT\\r\\n                        </a>\\r\\n                        <a\\r\\n                            class=\\\"button-brand-alternative button\\\"\\r\\n                            href=\\\"{apiUrl}/auth/login\\\">\\r\\n                            LOGIN\\r\\n                        </a>\\r\\n                    {/if}\\r\\n                </div>\\r\\n\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n    </nav>\\r\\n    {#if loaded}\\r\\n        <div\\r\\n            class=\\\"fixed z-10 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0\\\"\\r\\n            transition:fly={{ y:-200, duration: 500 }}>\\r\\n            <Poll poll={poll} />\\r\\n        </div>\\r\\n    {/if}\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA2FI,GAAG,cAAC,CAAC,AACD,OAAO,IAAI,CAAC,CACZ,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,SAAS,cAAC,CAAC,AACP,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,mBAAmB,cAAC,CAAC,AACjB,OAAO,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,IAAI,CAAC,AACvC,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isScrolling } = $$props;
	let isUserLoggedIn;
	let informations;
	let poll;
	let notificationsObj = {};
	let user;
	let userCoins;
	let firstLoad = true;
	let offline;
	let loaded = false;

	async function calculateProperties(value) {
		const tempUserData = value;
		console.log(tempUserData);
		if (tempUserData.offline) offline = true;

		if (tempUserData instanceof Error) {
			if (tempUserData.response) if (tempUserData.response.status === 503 || tempUserData.response.status === 502) goto("/status");
			return isUserLoggedIn = "network";
		}

		if (tempUserData.user) {
			notificationsObj.notifications = tempUserData.user.notifications;
			notificationsObj.inGame = tempUserData.user.inGame;
		}

		user = tempUserData.steam;
		userCoins = tempUserData.user.coins;

		isUserLoggedIn = tempUserData.user
		? true
		: tempUserData.steam ? "steam" : false;
	}

	const resetNav = async value => {
		if (value.refresh === true) return;
		user = await value.content;
		if (firstLoad === true) return firstLoad = false;
		calculateProperties(user);
	};

	const unsubscribe = counter.subscribe(resetNav);
	onDestroy(unsubscribe);

	onMount(async () => {
		try {
			informations = await callApi("get", "/informations");

			if (informations instanceof Error) {
				throw informations;
			}
		} catch(e) {
			informations = "network";
		}

		setTimeout(
			async () => {
				try {
					if (isUserLoggedIn === true) poll = await callApi("get", "/getpoll");
				} catch(e) {
					console.log(e);
				}
			},
			5000
		);

		await user;
		calculateProperties(user);
		loaded = true;
	});

	if ($$props.isScrolling === void 0 && $$bindings.isScrolling && isScrolling !== void 0) $$bindings.isScrolling(isScrolling);
	$$result.css.add(css$5);

	return `<div class="${"h-auto w-full fixed z-50"}">${offline
	? `<div class="${"bg-legendary w-full flex text-white text-center lg:text-xl"}"><p class="${"text-center w-99%"}">You are offline or our services are down, you may experience
                bugs on the website.
            </p>
            <svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" width="${"24"}" height="${"24"}" class="${"svelte-z9u5aa"}"><path class="${"heroicon-ui"}" d="${"M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1\r\n                    0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12\r\n                    10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"}" fill="${"#FFFFFF"}"></path></svg></div>`
	: ``}
    <nav class="${[
		"shadow-link-hover bg-background lg:flex items-center text-font\r\n        w-full transition duration-200 border-b border-transparent",
		(isScrolling ? "border-primary" : "") + " " + (isScrolling ? "border-b-2" : "")
	].join(" ").trim()}"><div class="${"w-full lg:w-auto flex justify-between items-center py-3\r\n            relative"}"><div class="${"pl-7 lg:pl-24 lg:pr-34 text-logo"}"><a class="${"logo"}" href="${"/"}">WINHALLA</a></div>
            <div class="${"pr-6 lg:hidden flex -mt-2"}"><div class="${"flex lg:hidden items-center"}">${informations
	? `${validate_component(NavAlert, "NavAlert").$$render($$result, { data: informations }, {}, {})}`
	: ``}

                    ${validate_component(NavNotifications, "Notifications").$$render($$result, { data: notificationsObj }, {}, {})}</div>
                <button class="${"focus:outline-none"}"><svg class="${"w-7 h-7 fill-current nav-icon svelte-z9u5aa"}" viewBox="${"0 0 28 24"}" xmlns="${"http://www.w3.org/2000/svg"}">${ `<path d="${"m2.61 0h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>
                            <path d="${"m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>
                            <path d="${"m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>`
	}</svg></button></div></div>
        <div class="${["lg:block w-full",  "hidden" ].join(" ").trim()}"><div class="${"pb-3 lg:p-0 sm:flex items-center w-full justify-between"}"><div class="${"ml-7 links text-xl lg:flex"}">
                    <a class="${"nav-link-container\r\n                        lg:hover:text-shadow-link-hover border-l border-primary\r\n                        lg:border-none pl-3 svelte-z9u5aa"}" href="${"/play"}"><svg class="${"fill-current play svelte-z9u5aa"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m.001 1.165v21.669c.052.661.601 1.177 1.271\r\n                                1.177.225 0 .436-.058.62-.16l-.006.003\r\n                                21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672\r\n                                0-1.223.521-1.27 1.181v.004z"}"></path></svg>
                        PLAY
                    </a>
                    <a class="${"nav-link-container\r\n                        lg:hover:text-shadow-link-hover border-l border-primary\r\n                        lg:border-none pl-3 svelte-z9u5aa"}" href="${"/shop"}" rel="${"prefetch"}"><svg class="${"fill-current play svelte-z9u5aa"}" viewBox="${"0 0 22 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m14.416 24v-11.098h5.68c.181 0\r\n                                .328.147.328.328v10.114c0\r\n                                .362-.294.656-.656.656zm-12.096 0c-.362\r\n                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181\r\n                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357\r\n                                0-.362.294-.656.656-.656.23 0\r\n                                .432.118.549.296l.002.002c.028.041 1.342 1.92\r\n                                5.15\r\n                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622\r\n                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515\r\n                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391\r\n                                3.583 4.309.749-1.87 2.037-4.252\r\n                                3.74-4.252.741.039 1.388.41\r\n                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0\r\n                                .262-.04.515-.113.753l.005-.018c-.352\r\n                                1.035-1.466 1.823-2.653 2.391 3.472-.872\r\n                                4.675-2.61\r\n                                4.69-2.633.12-.173.318-.286.541-.286.362 0\r\n                                .656.294.656.656 0\r\n                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434\r\n                                2.154-5.345 3.164h6.48c.181 0\r\n                                .328.147.328.328v4.029c0\r\n                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524\r\n                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936\r\n                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315\r\n                                3.791c1.692-.501 3.698-1.389\r\n                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946\r\n                                0-2.103 2.226-2.813 4.21z"}"></path></svg>
                        SHOP
                    </a></div>
                
                <div class="${"ml-7 mt-5 md:m-0 md:mr-7 lg:flex lg:items-center"}">${informations
	? `<div class="${"hidden lg:flex items-center"}">${validate_component(NavAlert, "NavAlert").$$render($$result, { data: informations }, {}, {})}</div>`
	: ``}
                    ${isUserLoggedIn === true
	? `<div class="${"lg:flex lg:items-center"}">${user.displayName && user.photos
		? `${validate_component(NavAccount, "NavAccount").$$render(
				$$result,
				{
					username: user.displayName,
					avatar: user.photos[0].value
				},
				{},
				{}
			)}`
		: ``}
                            ${notificationsObj
		? `<div class="${"hidden lg:flex items-center"}">${validate_component(NavNotifications, "Notifications").$$render($$result, { data: notificationsObj }, {}, {})}</div>`
		: ``}

                            <a class="${"lg:mt-0 lg:ml-8 text-2xl text-primary"}" href="${"/shop"}"><b class="${"font-normal "}">${escape(userCoins)}</b>
                                $
                            </a></div>`
	: `${isUserLoggedIn == "steam"
		? `<a class="${"button-brand button mr-3"}" href="${"/create-account"}">CREATE ACCOUNT
                        </a>`
		: `${isUserLoggedIn === "network"
			? `<p class="${"text-legendary text-xl"}">An error occured processing the account data</p>`
			: `<a class="${"button-brand button mr-3"}" href="${escape(apiUrl) + "/auth/login"}">CREATE ACCOUNT
                        </a>
                        <a class="${"button-brand-alternative button"}" href="${escape(apiUrl) + "/auth/login"}">LOGIN
                        </a>`}`}`}</div></div></div></nav>
    ${loaded
	? `<div class="${"fixed z-10 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0"}">${validate_component(Poll, "Poll").$$render($$result, { poll }, {}, {})}</div>`
	: ``}</div>`;
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
                        <a href="${"/help"}" class="${"block hover:text-shadow-link-hover"}">How
                            does it work</a>
                        <a href="${"/terms"}" class="${"block hover:text-shadow-link-hover"}">Terms of use</a></div></div>
                <div class="${"mt-8 lg:mt-0 lg:ml-8"}"><h3 class="${"text-primary"}">Company</h3>
                    <a href="${"/contact"}" class="${"block hover:text-shadow-link-hover"}">Contact us</a>
                    <a href="${"/about"}" class="${"block hover:text-shadow-link-hover"}">About</a></div></div></div>
        <div class="${"mt-10 flex justify-between items-center w-full"}"><div class="${"flex items-end"}"><div class="${"text-logo"}"><a class="${"logo leading-0"}" href="${"/"}">WINHALLA </a></div></div>

            <div class="${"flex items-center"}"><a href="${""}"><svg class="${"w-5 fill-current"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z"}"></path></svg></a>
                <a href="${""}"><svg class="${"ml-4 w-6 fill-current"}" viewBox="${"0 0 30 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m29.55 2.85c-.841 1.224-1.848 2.26-3.004 3.106l-.036.025q.018.262.018.787c-.004 1.736-.264 3.41-.745 4.987l.032-.122c-.534 1.773-1.272 3.32-2.206 4.724l.04-.065c-.989 1.509-2.132 2.808-3.435 3.927l-.024.02c-1.372 1.153-2.978 2.083-4.73 2.704l-.108.033c-1.765.648-3.803 1.022-5.928 1.022-.045 0-.09 0-.134 0h.007c-.038 0-.082 0-.127 0-3.41 0-6.584-1.015-9.234-2.76l.063.039c.419.048.904.075 1.396.075h.07-.004c.037 0 .082.001.126.001 2.807 0 5.386-.975 7.417-2.606l-.023.018c-2.639-.05-4.861-1.777-5.65-4.157l-.012-.043c.342.057.738.091 1.141.094h.003c.567 0 1.116-.075 1.637-.216l-.044.01c-1.412-.284-2.615-1.034-3.47-2.08l-.008-.011c-.858-1.011-1.379-2.331-1.379-3.773 0-.028 0-.056.001-.084v.004-.075c.788.452 1.726.732 2.727.768h.011c-.822-.553-1.487-1.279-1.953-2.129l-.016-.031c-.46-.835-.731-1.83-.731-2.889 0-1.126.306-2.18.84-3.084l-.015.028c1.5 1.839 3.337 3.341 5.425 4.427l.095.045c2.022 1.067 4.402 1.743 6.927 1.864l.038.001c-.093-.415-.147-.892-.149-1.382v-.001c.004-3.345 2.717-6.055 6.062-6.055 1.74 0 3.309.733 4.415 1.908l.003.003c1.448-.284 2.735-.792 3.893-1.492l-.053.03c-.455 1.431-1.4 2.596-2.635 3.323l-.028.015c1.294-.148 2.475-.479 3.569-.967l-.077.031z"}"></path></svg></a></div></div></div></div>`;
});

/* src\components\GameModeCards.svelte generated by Svelte v3.31.0 */

const css$6 = {
	code: "p.svelte-1ytjjcy b{@apply text-primary font-normal;}.game-mode-card.svelte-1ytjjcy{width:20rem;height:33rem}.game-mode-image.svelte-1ytjjcy{width:100%;height:100%;object-position:18%}.game-mode-card.svelte-1ytjjcy::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.65) 0%,\r\n                rgba(23, 23, 26, 0.83),\r\n                rgba(23, 23, 26, 0.92) 75%,\r\n                rgba(23, 23, 26, 0.97) 100%\r\n        );@apply z-0;}.locked-gradient.svelte-1ytjjcy::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.75) 0%,\r\n                rgba(23, 23, 26, 0.77),\r\n                rgba(23, 23, 26, 0.78) 75%,\r\n                rgba(23, 23, 26, 0.80) 100%\r\n        );@apply z-20;}.lock.svelte-1ytjjcy{top:50%;left:50%;transform:translate(-50%, -50%);@apply z-40;}.game-mode-image.svelte-1ytjjcy{@apply object-cover block;}.game-mode-text-container.svelte-1ytjjcy{@apply absolute z-10 top-0 bottom-0 left-0 right-0;}h3.svelte-1ytjjcy{@apply absolute text-6xl top-24 left-0 right-0 text-shadow-link-hover;}.stats.svelte-1ytjjcy{@apply absolute bottom-8 leading-5;}.desc.svelte-1ytjjcy{font-size:1.7rem;@apply text-3xl;}.goal.svelte-1ytjjcy{color:#e2e2ea;@apply text-xl mt-8 px-10;}.duration.svelte-1ytjjcy{color:#c2c2c9;@apply text-base mt-4;}.desc.svelte-1ytjjcy b{font-size:1.95rem}.goal.svelte-1ytjjcy b{@apply text-default;}.duration.svelte-1ytjjcy b{@apply text-lg;}",
	map: "{\"version\":3,\"file\":\"GameModeCards.svelte\",\"sources\":[\"GameModeCards.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    export let gameModes;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    p :global(b) {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n\\r\\n    .game-mode-card {\\r\\n        width: 20rem;\\r\\n        height: 33rem;\\r\\n    }\\r\\n\\r\\n    .game-mode-image {\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        object-position: 18%;\\r\\n    }\\r\\n\\r\\n    .game-mode-card::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.65) 0%,\\r\\n                rgba(23, 23, 26, 0.83),\\r\\n                rgba(23, 23, 26, 0.92) 75%,\\r\\n                rgba(23, 23, 26, 0.97) 100%\\r\\n        );\\r\\n        @apply z-0;\\r\\n    }\\r\\n\\r\\n    .locked-gradient::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.75) 0%,\\r\\n                rgba(23, 23, 26, 0.77),\\r\\n                rgba(23, 23, 26, 0.78) 75%,\\r\\n                rgba(23, 23, 26, 0.80) 100%\\r\\n        );\\r\\n        @apply z-20;\\r\\n    }\\r\\n\\r\\n    .lock {\\r\\n        top: 50%;\\r\\n        left: 50%;\\r\\n        transform: translate(-50%, -50%);\\r\\n        @apply z-40;\\r\\n    }\\r\\n\\r\\n\\r\\n    .game-mode-image {\\r\\n        @apply object-cover block;\\r\\n    }\\r\\n\\r\\n    .game-mode-text-container {\\r\\n        @apply absolute z-10 top-0 bottom-0 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    h3 {\\r\\n        @apply absolute text-6xl top-24 left-0 right-0 text-shadow-link-hover;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute bottom-8 leading-5;\\r\\n    }\\r\\n\\r\\n    .desc {\\r\\n        font-size: 1.7rem;\\r\\n        @apply text-3xl;\\r\\n    }\\r\\n\\r\\n    .goal {\\r\\n        color: #e2e2ea;\\r\\n        @apply text-xl mt-8 px-10;\\r\\n    }\\r\\n\\r\\n    .duration {\\r\\n        color: #c2c2c9;\\r\\n        @apply text-base mt-4;\\r\\n    }\\r\\n\\r\\n    .desc :global(b) {\\r\\n        font-size: 1.95rem;\\r\\n    }\\r\\n\\r\\n    .goal :global(b) {\\r\\n        @apply text-default;\\r\\n    }\\r\\n\\r\\n    .duration :global(b) {\\r\\n        @apply text-lg;\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n{#each gameModes as gameMode}\\r\\n    {#if gameMode.available}\\r\\n        <a\\r\\n            class=\\\"game-mode-card block relative shadow-card border\\r\\n                        border-transparent hover:border-primary\\r\\n                        hover:shadow-card-hover mb-10 md:mb-0 md:mr-15 relative\\\"\\r\\n            href=\\\"/play/{gameMode.name}\\\">\\r\\n\\r\\n            <div class=\\\"h-full\\\">\\r\\n                <img\\r\\n                    src=\\\"../assets/ModeBanners/{gameMode.name}.jpg\\\"\\r\\n                    alt={gameMode.name}\\r\\n                    class=\\\"game-mode-image object-cover block\\\" />\\r\\n                <div\\r\\n                    class=\\\"game-mode-text-container\\\">\\r\\n                    <h3\\r\\n                        class=\\\"\\\">\\r\\n                        {gameMode.name}\\r\\n                    </h3>\\r\\n                    <div class=\\\"stats\\\">\\r\\n                        <p class=\\\"desc\\\">\\r\\n                            {@html gameMode.description}\\r\\n                        </p>\\r\\n                        <p class=\\\"goal\\\">\\r\\n                            {@html gameMode.goal}\\r\\n                        </p>\\r\\n                        <p class=\\\"duration\\\">\\r\\n                            {@html gameMode.duration}\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </a>\\r\\n    {:else}\\r\\n        <div\\r\\n            class=\\\"game-mode-card block relative shadow-card border border-transparent mb-10 md:mb-0 md:mr-0 lg:mr-15 relative\\\">\\r\\n\\r\\n            <div class=\\\"h-full locked-gradient\\\">\\r\\n                <img\\r\\n                    src=\\\"../assets/ModeBanners/{gameMode.name}.jpg\\\"\\r\\n                    alt={gameMode.name}\\r\\n                    class=\\\"game-mode-image\\\" />\\r\\n\\r\\n                <div\\r\\n                    class=\\\"game-mode-text-container\\\">\\r\\n                    <h3\\r\\n                        class=\\\"\\\">\\r\\n                        {gameMode.name}\\r\\n                    </h3>\\r\\n                    <div class=\\\"stats\\\">\\r\\n                        <p class=\\\"desc\\\">\\r\\n                            {@html gameMode.description}\\r\\n                        </p>\\r\\n                        <p class=\\\"goal\\\">\\r\\n                            {@html gameMode.goal}\\r\\n                        </p>\\r\\n                        <p class=\\\"duration\\\">\\r\\n                            {@html gameMode.duration}\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div class=\\\"absolute lock\\\">\\r\\n                <!--Locked icon-->\\r\\n                <svg class=\\\"fill-current text-disabled w-12 mx-auto\\\" viewBox=\\\"0 0 20 24\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z\\\" />\\r\\n                </svg>\\r\\n\\r\\n                <p class=\\\"mt-1 text-light\\\">Coming soon</p>\\r\\n            </div>\\r\\n        </div>\\r\\n    {/if}\\r\\n{/each}\"],\"names\":[],\"mappings\":\"AAKI,gBAAC,CAAC,AAAQ,CAAC,AAAE,CAAC,AACV,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,eAAe,eAAC,CAAC,AACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AAED,gBAAgB,eAAC,CAAC,AACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,GAAG,AACxB,CAAC,AAED,8BAAe,OAAO,AAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,CACD,OAAO,GAAG,CAAC,AACf,CAAC,AAED,+BAAgB,OAAO,AAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,CACD,OAAO,IAAI,CAAC,AAChB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,OAAO,IAAI,CAAC,AAChB,CAAC,AAGD,gBAAgB,eAAC,CAAC,AACd,OAAO,YAAY,CAAC,KAAK,CAAC,AAC9B,CAAC,AAED,yBAAyB,eAAC,CAAC,AACvB,OAAO,QAAQ,CAAC,IAAI,CAAC,KAAK,CAAC,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,AACvD,CAAC,AAED,EAAE,eAAC,CAAC,AACA,OAAO,QAAQ,CAAC,QAAQ,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,sBAAsB,CAAC,AAC1E,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,QAAQ,CAAC,SAAS,CAAC,AACvC,CAAC,AAED,KAAK,eAAC,CAAC,AACH,SAAS,CAAE,MAAM,CACjB,OAAO,QAAQ,CAAC,AACpB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,OAAO,OAAO,CAAC,IAAI,CAAC,KAAK,CAAC,AAC9B,CAAC,AAED,SAAS,eAAC,CAAC,AACP,KAAK,CAAE,OAAO,CACd,OAAO,SAAS,CAAC,IAAI,CAAC,AAC1B,CAAC,AAED,oBAAK,CAAC,AAAQ,CAAC,AAAE,CAAC,AACd,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,oBAAK,CAAC,AAAQ,CAAC,AAAE,CAAC,AACd,OAAO,YAAY,CAAC,AACxB,CAAC,AAED,wBAAS,CAAC,AAAQ,CAAC,AAAE,CAAC,AAClB,OAAO,OAAO,CAAC,AACnB,CAAC\"}"
};

const GameModeCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { gameModes } = $$props;
	if ($$props.gameModes === void 0 && $$bindings.gameModes && gameModes !== void 0) $$bindings.gameModes(gameModes);
	$$result.css.add(css$6);

	return `${each(gameModes, gameMode => `${gameMode.available
	? `<a class="${"game-mode-card block relative shadow-card border\r\n                        border-transparent hover:border-primary\r\n                        hover:shadow-card-hover mb-10 md:mb-0 md:mr-15 relative svelte-1ytjjcy"}" href="${"/play/" + escape(gameMode.name)}"><div class="${"h-full"}"><img src="${"../assets/ModeBanners/" + escape(gameMode.name) + ".jpg"}"${add_attribute("alt", gameMode.name, 0)} class="${"game-mode-image object-cover block svelte-1ytjjcy"}">
                <div class="${"game-mode-text-container svelte-1ytjjcy"}"><h3 class="${" svelte-1ytjjcy"}">${escape(gameMode.name)}</h3>
                    <div class="${"stats svelte-1ytjjcy"}"><p class="${"desc svelte-1ytjjcy"}">${gameMode.description}</p>
                        <p class="${"goal svelte-1ytjjcy"}">${gameMode.goal}</p>
                        <p class="${"duration svelte-1ytjjcy"}">${gameMode.duration}
                        </p></div>
                </div></div>
        </a>`
	: `<div class="${"game-mode-card block relative shadow-card border border-transparent mb-10 md:mb-0 md:mr-0 lg:mr-15 relative svelte-1ytjjcy"}"><div class="${"h-full locked-gradient svelte-1ytjjcy"}"><img src="${"../assets/ModeBanners/" + escape(gameMode.name) + ".jpg"}"${add_attribute("alt", gameMode.name, 0)} class="${"game-mode-image svelte-1ytjjcy"}">

                <div class="${"game-mode-text-container svelte-1ytjjcy"}"><h3 class="${" svelte-1ytjjcy"}">${escape(gameMode.name)}</h3>
                    <div class="${"stats svelte-1ytjjcy"}"><p class="${"desc svelte-1ytjjcy"}">${gameMode.description}</p>
                        <p class="${"goal svelte-1ytjjcy"}">${gameMode.goal}</p>
                        <p class="${"duration svelte-1ytjjcy"}">${gameMode.duration}
                        </p></div>
                </div></div>
            <div class="${"absolute lock svelte-1ytjjcy"}">
                <svg class="${"fill-current text-disabled w-12 mx-auto"}" viewBox="${"0 0 20 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z"}"></path></svg>

                <p class="${"mt-1 text-light svelte-1ytjjcy"}">Coming soon</p></div>
        </div>`}`)}`;
});

/* src\routes\_layout.svelte generated by Svelte v3.31.0 */

const css$7 = {
	code: ".font.svelte-2ej71o{font-family:\"Bebas Neue\", sans-serif}main.svelte-2ej71o{margin-top:calc(4rem - 2px);min-height:calc(100vh - calc(4rem - 2px))}@media(min-width: 400px){}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import Tailwindcss from \\\"../components/Tailwindcss.svelte\\\";\\r\\n    import Nav from \\\"../components/Navigation/Nav.svelte\\\";\\r\\n    import Footer from \\\"../components/Footer.svelte\\\";\\r\\n    import GameModeCards from \\\"../components/GameModeCards.svelte\\\";\\r\\n    import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n    import { eventEmitter } from \\\"../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import PollTest from \\\"../components/Poll.svelte\\\";\\r\\n\\r\\n    let error;\\r\\n    onMount(() => {\\r\\n        eventEmitter.subscribe(async e => {\\r\\n            e = e.error;\\r\\n            if (!e) return;\\r\\n            if (e instanceof Error) {\\r\\n                error = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n                setTimeout(() => {\\r\\n                    error = undefined;\\r\\n                }, 8000);\\r\\n            }\\r\\n        });\\r\\n    });\\r\\n\\r\\n    let scrollY = 0;\\r\\n    //export let segment;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .font {\\r\\n        font-family: \\\"Bebas Neue\\\", sans-serif;\\r\\n    }\\r\\n\\r\\n    main {\\r\\n        margin-top: calc(4rem - 2px);\\r\\n        min-height: calc(100vh - calc(4rem - 2px));\\r\\n    }\\r\\n\\r\\n    body {\\r\\n        margin: 0;\\r\\n        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,\\r\\n        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\\r\\n        font-size: 14px;\\r\\n        line-height: 1.5;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n    h1,\\r\\n    h2,\\r\\n    h3,\\r\\n    h4,\\r\\n    h5,\\r\\n    h6 {\\r\\n        margin: 0 0 0.5em 0;\\r\\n        font-weight: 400;\\r\\n        line-height: 1.2;\\r\\n    }\\r\\n\\r\\n    h1 {\\r\\n        font-size: 2em;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        color: inherit;\\r\\n    }\\r\\n\\r\\n    code {\\r\\n        font-family: menlo, inconsolata, monospace;\\r\\n        font-size: calc(1em - 2px);\\r\\n        color: #555;\\r\\n        background-color: #f0f0f0;\\r\\n        padding: 0.2em 0.4em;\\r\\n        border-radius: 2px;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 400px) {\\r\\n        body {\\r\\n            font-size: 16px;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<Tailwindcss />\\r\\n\\r\\n<svelte:head>\\r\\n    <!-- <link rel=\\\"stylesheet\\\" href=\\\"../../fontisto-master/css/fontisto/fontisto.min.css\\\" /> -->\\r\\n    <!--Adsense-->\\r\\n</svelte:head>\\r\\n\\r\\n<svelte:window bind:scrollY={scrollY} />\\r\\n<div class=\\\"font w-full bg-background min-h-screen h-full flex flex-col relative\\\">\\r\\n    <Nav isScrolling={scrollY > 0} />\\r\\n    {#if error}\\r\\n        <ErrorAlert message=\\\"We had some trouble getting to Winhalla\\\" pushError={error} />\\r\\n    {/if}\\r\\n\\r\\n    <main class=\\\"text-font text-default min-h-screen h-full relative\\\">\\r\\n        <!--Main-->\\r\\n\\r\\n\\r\\n        <slot class=\\\"flex-grow bg-background block-grow\\\" />\\r\\n        <!--<GameModeCards page={\\\"play\\\"}/>-->\\r\\n    </main>\\r\\n    <!--<div class=\\\"fixed bottom-0 right-20 bg-background border border-b-0 border-green px-12 pt-6 rounded-t-xl\\\">\\r\\n        <Poll/>\\r\\n    </div>-->\\r\\n\\r\\n    <!--Footer-->\\r\\n    <Footer />\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA6BI,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,AACzC,CAAC,AAED,IAAI,cAAC,CAAC,AACF,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAC5B,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAC9C,CAAC,AAuCD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let error;

	onMount(() => {
		eventEmitter.subscribe(async e => {
			e = e.error;
			if (!e) return;

			if (e instanceof Error) {
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
		});
	});

	let scrollY = 0;
	$$result.css.add(css$7);

	return `${validate_component(Tailwindcss, "Tailwindcss").$$render($$result, {}, {}, {})}

${($$result.head += ``, "")}


<div class="${"font w-full bg-background min-h-screen h-full flex flex-col relative svelte-2ej71o"}">${validate_component(Nav, "Nav").$$render($$result, { isScrolling: scrollY > 0 }, {}, {})}
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

    <main class="${"text-font text-default min-h-screen h-full relative svelte-2ej71o"}">


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

const css$8 = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\texport let status;\\r\\n\\texport let error;\\r\\n\\r\\n\\tconst dev = \\\"production\\\" === 'development';\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\th1, p {\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-size: 2.8em;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmargin: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-size: 4em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>{status}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>{status}</h1>\\r\\n\\r\\n<p>{error.message}</p>\\r\\n\\r\\n{#if dev && error.stack}\\r\\n\\t<pre>{error.stack}</pre>\\r\\n{/if}\\r\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$8);

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
		// create-account.svelte
		pattern: /^\/create-account\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// change-email.svelte
		pattern: /^\/change-email\/?$/,
		parts: [
			{ i: 2 }
		]
	},

	{
		// contact.svelte
		pattern: /^\/contact\/?$/,
		parts: [
			{ i: 3 }
		]
	},

	{
		// feltrom/admin/index.svelte
		pattern: /^\/feltrom\/admin\/?$/,
		parts: [
			null,
			{ i: 4 }
		]
	},

	{
		// offline.svelte
		pattern: /^\/offline\/?$/,
		parts: [
			{ i: 5 }
		]
	},

	{
		// privacy.svelte
		pattern: /^\/privacy\/?$/,
		parts: [
			{ i: 6 }
		]
	},

	{
		// status.svelte
		pattern: /^\/status\/?$/,
		parts: [
			{ i: 7 }
		]
	},

	{
		// about.svelte
		pattern: /^\/about\/?$/,
		parts: [
			{ i: 8 }
		]
	},

	{
		// terms.svelte
		pattern: /^\/terms\/?$/,
		parts: [
			{ i: 9 }
		]
	},

	{
		// tests/[id].svelte
		pattern: /^\/tests\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 10, params: match => ({ id: d(match[1]) }) }
		]
	},

	{
		// help.svelte
		pattern: /^\/help\/?$/,
		parts: [
			{ i: 11 }
		]
	},

	{
		// link/[id].svelte
		pattern: /^\/link\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 12, params: match => ({ id: d(match[1]) }) }
		]
	},

	{
		// play/index.svelte
		pattern: /^\/play\/?$/,
		parts: [
			{ i: 13 }
		]
	},

	{
		// play/ffa/index.svelte
		pattern: /^\/play\/ffa\/?$/,
		parts: [
			null,
			{ i: 14 }
		]
	},

	{
		// play/ffa/[id].svelte
		pattern: /^\/play\/ffa\/([^/]+?)\/?$/,
		parts: [
			null,
			null,
			{ i: 15, params: match => ({ id: d(match[1]) }) }
		]
	},

	{
		// shop.svelte
		pattern: /^\/shop\/?$/,
		parts: [
			{ i: 16 }
		]
	},

	{
		// test.svelte
		pattern: /^\/test\/?$/,
		parts: [
			{ i: 17 }
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

const stores$1 = () => getContext(CONTEXT_KEY);

/* src\routes\create-account.svelte generated by Svelte v3.31.0 */

const css$9 = {
	code: "b.svelte-29gitm{@apply text-primary font-normal leading-none;}.accent.svelte-29gitm{@apply text-accent;}input.svelte-29gitm{@apply w-full text-background bg-font py-3 px-4 rounded;}button.svelte-29gitm:disabled{@apply bg-disabled;;cursor:not-allowed}.info.svelte-29gitm{@apply text-lg mt-1;}.input-header.svelte-29gitm{@apply text-primary text-3xl;;margin-bottom:0.35rem}.check.svelte-29gitm{margin-top:0.15rem;margin-right:0.4rem}",
	map: "{\"version\":3,\"file\":\"create-account.svelte\",\"sources\":[\"create-account.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\r\\n    export async function preload({ params, query }) {\\r\\n        let firstLink = query.link;\\r\\n        return { firstLink };\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<script>\\r\\n    import { counter } from \\\"../components/store\\\";\\r\\n    import Error from \\\"../components/ErrorAlert.svelte\\\"\\r\\n    export let firstLink;\\r\\n    import { callApi } from \\\"../utils/api.js\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import { fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    let account;\\r\\n    let email;\\r\\n    let link = firstLink;\\r\\n    let linkId;\\r\\n    let validLink = null;\\r\\n    let validEmail = null;\\r\\n\\r\\n    let accountCreationStep = 0;\\r\\n    let generatedLink;\\r\\n    let pushError;\\r\\n\\r\\n    const onKeyPressLink = () => {\\r\\n        setTimeout(async () => {\\r\\n            if (link.length > 0) {\\r\\n                try {\\r\\n                    linkId = new URL(link);\\r\\n                    linkId = linkId.pathname.split(\\\"/\\\")[2];\\r\\n                    if (linkId.length == 24) {\\r\\n                        const testLink = await callApi(\\r\\n                            \\\"get\\\",\\r\\n                            `/getLink/${linkId}`\\r\\n                        );\\r\\n                        if (testLink) validLink = true;\\r\\n                        else validLink = false;\\r\\n                    } else {\\r\\n                        validLink = false;\\r\\n                    }\\r\\n                } catch (err) {\\r\\n                    validLink = false;\\r\\n                }\\r\\n            } else {\\r\\n                validLink = null;\\r\\n            }\\r\\n        }, 1);\\r\\n    };\\r\\n\\r\\n    const onKeyPressEmail = () => {\\r\\n        setTimeout(() => {\\r\\n            if (email.length > 0) {\\r\\n                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])/gm;\\r\\n                let exec = regex.exec(email);\\r\\n                if (exec) validEmail = true;\\r\\n                else validEmail = false;\\r\\n            } else {\\r\\n                validEmail = null;\\r\\n            }\\r\\n        }, 1);\\r\\n    };\\r\\n    if (link && link != \\\"\\\") onKeyPressLink();\\r\\n    onMount(() => {\\r\\n        let unsub = counter.subscribe((value) => {\\r\\n            let user = value.content;\\r\\n            if (user.then) {\\r\\n                user.then((values) => {\\r\\n                    if (values.user) {\\r\\n                        goto(\\\"/\\\");\\r\\n                    }\\r\\n                });\\r\\n            } else if (user) {\\r\\n                if (!user.user) {\\r\\n                    goto(\\\"/\\\");\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n        unsub();\\r\\n    });\\r\\n\\r\\n    async function handleClick() {\\r\\n        if (accountCreationStep == 0) {\\r\\n            try {\\r\\n                linkId = new URL(link);\\r\\n                linkId = linkId.pathname.split(\\\"/\\\")[2];\\r\\n            } catch (err) {\\r\\n                console.log(err);\\r\\n            }\\r\\n            try {\\r\\n                generatedLink = await callApi(\\r\\n                    \\\"post\\\",\\r\\n                    `/auth/createAccount?email=${email}&linkId=${linkId}`\\r\\n                );\\r\\n                if (generatedLink instanceof Error) throw generatedLink;\\r\\n                accountCreationStep++;\\r\\n                counter.set({ \\\"refresh\\\": true });\\r\\n            } catch (e) {\\r\\n                pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n                setTimeout(() => {\\r\\n                    pushError = undefined;\\r\\n                }, 8000);\\r\\n            }\\r\\n\\r\\n        }\\r\\n    }\\r\\n\\r\\n    /*\\r\\n    import { tick } from \\\"svelte\\\";\\r\\n\\r\\n    let valueCopy = null;\\r\\n    export let value = null;\\r\\n    let areaDom;\\r\\n    async function copy() {\\r\\n        valueCopy = value;\\r\\n        console.log(areaDom);\\r\\n        await tick();\\r\\n        areaDom.focus();\\r\\n        areaDom.select();\\r\\n        let message = \\\"Copying text was successful\\\";\\r\\n        try {\\r\\n            const successful = document.execCommand(\\\"copy\\\");\\r\\n            if (!successful) {\\r\\n                message = \\\"Copying text was unsuccessful\\\";\\r\\n            }\\r\\n        } catch (err) {\\r\\n            message = \\\"Oops, unable to copy\\\";\\r\\n        }\\r\\n\\r\\n        // we can notifi by event or storage about copy status\\r\\n        console.log(message);\\r\\n        valueCopy = null;\\r\\n    }\\r\\n    async function handleShare() {\\r\\n        if (window.navigator.share) {\\r\\n            await window.navigator.share({\\r\\n                title: \\\"Share your affiliate link\\\",\\r\\n                url: generatedLink,\\r\\n            });\\r\\n        } else {\\r\\n            copy();\\r\\n        }\\r\\n    }*/\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply text-primary font-normal leading-none;\\r\\n    }\\r\\n\\r\\n    .accent {\\r\\n        @apply text-accent;\\r\\n    }\\r\\n\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        @apply text-lg mt-1;\\r\\n    }\\r\\n\\r\\n    .input-header {\\r\\n        @apply text-primary text-3xl;\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .check {\\r\\n        margin-top: 0.15rem;\\r\\n        margin-right: 0.4rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Create account | Winhalla, Play Brawlhalla. Earn rewards.</title>\\r\\n    <meta\\r\\n        name=\\\"description\\\"\\r\\n        content=\\\"This is where all starts | Create a Winhalla account now and\\r\\n        get a Battle Pass and Mammoth Coins FOR FREE\\\" />\\r\\n</svelte:head>\\r\\n<div>\\r\\n    {#if pushError}\\r\\n        <Error pushError={pushError} message=\\\"There was an error creating your account\\\"  type=\\\"createAccount\\\"/>\\r\\n    {/if}\\r\\n    <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n        {#if accountCreationStep === 0}\\r\\n            <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\">\\r\\n                <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                        Create your account\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"md:mt-4\\\">\\r\\n                    <p class=\\\"input-header\\\">Email</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            on:keydown={onKeyPressEmail}\\r\\n                            type=\\\"email\\\"\\r\\n                            placeholder=\\\"Your email goes here\\\"\\r\\n                            bind:value={email}\\r\\n                            class:border-legendary={validEmail == false}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n\\r\\n                        {#if validEmail}\\r\\n                            <div class=\\\"flex items-center\\\">\\r\\n                                <svg\\r\\n                                    class=\\\"fill-current text-green w-4 check\\\"\\r\\n                                    viewBox=\\\"0 0 33 24\\\"\\r\\n                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                    <path\\r\\n                                        d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                </svg>\\r\\n                                <p class=\\\"text-green info\\\">VALID EMAIL</p>\\r\\n                            </div>\\r\\n                        {:else if validEmail == false}\\r\\n                            <p class=\\\"text-legendary info \\\">INVALID EMAIL</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n\\r\\n                <div class:mt-12={validEmail == null} class=\\\"mt-4\\\">\\r\\n                    <p class=\\\"text-3xl input-header\\\">Friend link</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            on:keydown={onKeyPressLink}\\r\\n                            bind:value={link}\\r\\n                            placeholder=\\\"Paste here your affiliate link\\\"\\r\\n                            class:border-legendary={validLink == false}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary w-full placeholder-disabled\\\" />\\r\\n                        {#if validLink}\\r\\n                            <div class=\\\"flex items-center\\\">\\r\\n                                <svg\\r\\n                                    class=\\\"fill-current text-green w-4 check\\\"\\r\\n                                    viewBox=\\\"0 0 33 24\\\"\\r\\n                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                    <path\\r\\n                                        d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                </svg>\\r\\n                                <p class=\\\"text-green info\\\">VALID LINK</p>\\r\\n                            </div>\\r\\n                        {:else if validLink == false}\\r\\n                            <p class=\\\"text-legendary info\\\">INVALID LINK</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n                <button\\r\\n                    disabled={!validEmail}\\r\\n                    on:click={handleClick}\\r\\n                    class:mt-11={validLink == null}\\r\\n                    class=\\\"button button-brand mt-3\\\">\\r\\n                    Create account\\r\\n                </button>\\r\\n                <!--<div class=\\\"card pt-8 pb-11 px-10 w-100% mx-5 w-full md:w-96\\\">\\r\\n                    <p class=\\\"input-header\\\">Email</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            on:keydown={onKeyPressEmail}\\r\\n                            type=\\\"email\\\"\\r\\n                            bind:value={email}\\r\\n                            class:border-legendary={validEmail == false}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary w-full\\\" />\\r\\n\\r\\n                        {#if validEmail}\\r\\n                            <div class=\\\"flex items-center\\\">\\r\\n                                <svg\\r\\n                                    class=\\\"fill-current text-green w-4 check\\\"\\r\\n                                    viewBox=\\\"0 0 33 24\\\"\\r\\n                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                    <path\\r\\n                                        d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                </svg>\\r\\n                                <p class=\\\"text-green info\\\">VALID EMAIL</p>\\r\\n                            </div>\\r\\n                        {:else if validEmail == false}\\r\\n                            <p class=\\\"text-legendary info \\\">INVALID EMAIL</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n\\r\\n                    <p class=\\\"pt-6 text-3xl input-header\\\">Friend link</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            on:keydown={onKeyPressLink}\\r\\n                            bind:value={link}\\r\\n                            class:border-legendary={validLink == false}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary w-full\\\" />\\r\\n                        {#if validLink}\\r\\n                            <div class=\\\"flex items-center\\\">\\r\\n                                <svg\\r\\n                                    class=\\\"fill-current text-green w-4 check\\\"\\r\\n                                    viewBox=\\\"0 0 33 24\\\"\\r\\n                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                    <path\\r\\n                                        d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                </svg>\\r\\n                                <p class=\\\"text-green info\\\">VALID LINK</p>\\r\\n                            </div>\\r\\n                        {:else if validLink == false}\\r\\n                            <p class=\\\"text-legendary info\\\">INVALID LINK</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n                <button\\r\\n                    disabled={!validEmail}\\r\\n                    on:click={handleClick}\\r\\n                    class=\\\"button button-brand mt-6\\\">\\r\\n                    Create account\\r\\n                </button>-->\\r\\n            </div>\\r\\n        {:else}\\r\\n            <div class=\\\"flex flex-col items-center px-5\\\">\\r\\n                <div class=\\\"text-center mt-7 lg:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-8 lg:mb-8 leading-snug\\r\\n                        lg:leading-normal\\\">\\r\\n                        Share your affiliate link\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"flex flex-col md:flex-row items-center\\\">\\r\\n                    <div\\r\\n                        class=\\\"card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\\r\\n                        md:mr-12\\\">\\r\\n                        <p class=\\\"text-6xl mt-6\\\">You</p>\\r\\n                        <p class=\\\"leading-7 mt-13\\\">\\r\\n                            will get\\r\\n                            <b>20%</b>\\r\\n                            of what\\r\\n                            <b>each people</b>\\r\\n                            who\\r\\n                            <b>creates an account</b>\\r\\n                            with\\r\\n                            <u>your</u>\\r\\n                            link\\r\\n                            <b>wins</b>\\r\\n                            , for one month!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div class=\\\"flex items-center md:block\\\">\\r\\n                        <div class=\\\"hidden md:flex items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mr-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m19.2 2.43-2.422-2.43-11.978 12 11.978 12\\r\\n                                    2.422-2.43-9.547-9.57z\\\" />\\r\\n                            </svg>\\r\\n                            <div class=\\\"h-2px bg-accent w-40\\\" />\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -ml-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m4.8 21.57 2.422 2.43\\r\\n                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n                        <div class=\\\"flex flex-col md:hidden items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mb-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m21.57 19.2 2.43-2.422-12-11.978-12\\r\\n                                    11.978 2.43 2.422 9.57-9.547z\\\" />\\r\\n                            </svg>\\r\\n                            <div class=\\\"w-2px bg-accent h-16\\\" />\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mt-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m2.43 4.8-2.43 2.422 12 11.978\\r\\n                                    12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n\\r\\n                        <p\\r\\n                            class=\\\"text-center text-extra-light text-lg ml-4\\r\\n                            md:ml-0\\\">\\r\\n                            Everyone wins!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div\\r\\n                        class=\\\"card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0\\r\\n                        md:ml-12\\\">\\r\\n                        <p class=\\\"text-6xl\\\">Each person</p>\\r\\n                        <p class=\\\"leading-7 mt-4\\\">\\r\\n                            that will\\r\\n                            <b>create an account</b>\\r\\n                            with\\r\\n                            <u>your</u>\\r\\n                            link will get\\r\\n                            <b>20%</b>\\r\\n                            of reward\\r\\n                            <b>boost</b>\\r\\n                            , for one month!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"lg:flex justify-center\\\">\\r\\n                    <!--<textarea bind:this={areaDom}>{valueCopy}</textarea>-->\\r\\n\\r\\n                    <button\\r\\n                        class=\\\"text-background bg-font py-4 px-4 mt-14 flex items-center rounded\\\">\\r\\n                        <p class=\\\"leading-none\\\">{generatedLink}</p>\\r\\n                        <svg\\r\\n                            class=\\\"fill-current text-primary w-10 md:w-5 ml-1\\r\\n                            lg:ml-4 lg:block\\\"\\r\\n                            viewBox=\\\"0 0 24 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                d=\\\"m12.922 16.587-3.671 3.671c-.693.645-1.626\\r\\n                                1.041-2.651 1.041-2.152\\r\\n                                0-3.896-1.744-3.896-3.896 0-1.025.396-1.958\\r\\n                                1.043-2.654l-.002.002\\r\\n                                3.671-3.671c.212-.23.341-.539.341-.878\\r\\n                                0-.717-.582-1.299-1.299-1.299-.339\\r\\n                                0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108\\r\\n                                1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494\\r\\n                                6.494 6.494 1.738 0 3.316-.683\\r\\n                                4.482-1.795l-.003.002\\r\\n                                3.671-3.671c.212-.23.341-.539.341-.878\\r\\n                                0-.717-.582-1.299-1.299-1.299-.339\\r\\n                                0-.647.13-.879.342l.001-.001z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z\\\" />\\r\\n                        </svg>\\r\\n                    </button>\\r\\n                </div>\\r\\n\\r\\n                <p class=\\\"pt-4 text-lg text-center\\\">\\r\\n                    You will be able to\\r\\n                    <b class=\\\"accent\\\">access your link</b>\\r\\n                    by clicking on\\r\\n                    <b class=\\\"accent\\\">your profile</b>\\r\\n                    !\\r\\n                </p>\\r\\n                <a\\r\\n                    href=\\\"/play\\\"\\r\\n                    class=\\\"button button-brand mt-10 block mx-auto mb-6 md:mb-0\\\">\\r\\n                    Finish\\r\\n                </a>\\r\\n            </div>\\r\\n            <!--<div class=\\\" -flex flex-col items-center\\\">\\r\\n                <div class=\\\"text-center lg:text-left lg:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-8 lg:mb-8 leading-snug lg:leading-normal\\\">\\r\\n                        Share your affiliate link\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"-flex flex-col items-center lg:flex-row mt-8\\\">\\r\\n                    <div class=\\\"card py-8 px-6 text-center w-64 h-78 mr-12\\\">\\r\\n                        <p class=\\\"text-6xl\\\">Each person...</p>\\r\\n                        <p class=\\\"leading-7 mt-4\\\">\\r\\n                            ...that will\\r\\n                            <b>create an account</b>\\r\\n                            with your link will get\\r\\n                            <b>20%</b>\\r\\n                            of reward\\r\\n                            <b>boost</b>\\r\\n                            for one month.\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div>\\r\\n                        <div class=\\\"-flex items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mr-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\"><path\\r\\n                                    d=\\\"m19.2 2.43-2.422-2.43-11.978 12 11.978 12 2.422-2.43-9.547-9.57z\\\" /></svg>\\r\\n                            <div class=\\\"h-2px bg-accent w-40 join relative\\\" />\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -ml-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\"><path\\r\\n                                    d=\\\"m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z\\\" /></svg>\\r\\n                        </div>\\r\\n                        <p class=\\\"text-center text-extra-light text-lg\\\">\\r\\n                            Everyone wins !\\r\\n                        </p>\\r\\n                    </div>\\r\\n\\r\\n                    <div class=\\\"card py-8 px-6 text-center w-64 h-78 ml-12\\\">\\r\\n                        <p class=\\\"text-6xl mt-6\\\">You...</p>\\r\\n                        <p class=\\\"leading-7 mt-13\\\">\\r\\n                            ... will get\\r\\n                            <b>20%</b>\\r\\n                            of what each of your godsons wins!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div>\\r\\n                    <div\\r\\n                        class=\\\"text-background bg-font py-4 px-4 mt-14 flex justify-between items-center rounded overflow-x-scroll lg:overflow-auto w-lin\\\">\\r\\n                        <p class=\\\"leading-none\\\">{generatedLink}</p>\\r\\n                        <svg\\r\\n                            class=\\\"fill-current text-primary w-5 ml-4\\\"\\r\\n                            viewBox=\\\"0 0 24 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\"><path\\r\\n                                d=\\\"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z\\\" /></svg>\\r\\n                    </div>\\r\\n                </div>\\r\\n\\r\\n                <p class=\\\"pt-4 text-lg text-center\\\">\\r\\n                    You will be able to\\r\\n                    <b class=\\\"accent\\\">access your link</b>\\r\\n                    by clicking on\\r\\n                    <b class=\\\"accent\\\">your profile</b>!\\r\\n                </p>\\r\\n                <button on:click={handleClick} class=\\\"button button-brand mt-6\\\">\\r\\n                    Finish\\r\\n                </button>\\r\\n            </div>-->\\r\\n\\r\\n            <!--<div class=\\\"card pt-8 pb-8 px-10 w-100% mx-5 w-full md:w-96\\\">\\r\\n                    <p class=\\\"leading-7\\\">\\r\\n                        - Each person that will\\r\\n                        <b>create an account</b>\\r\\n                        with your link will get\\r\\n                        <b>20%</b>\\r\\n                        of reward\\r\\n                        <b>boost</b>\\r\\n                        for one month.\\r\\n                        <br />\\r\\n                    </p>\\r\\n                    <p class=\\\"mt-1\\\">\\r\\n                        -\\r\\n                        <u>You</u>\\r\\n                        will also get\\r\\n                        <b>20%</b>\\r\\n                        of\\r\\n                        <b>what they win</b>! Everyone wins!\\r\\n                    </p>\\r\\n                    <div\\r\\n                        class=\\\"text-background bg-font py-4 px-4 mt-7 flex justify-between items-center rounded overflow-x-scroll w-full \\\">\\r\\n                        <p class=\\\"leading-none\\\">{generatedLink}</p>\\r\\n                        <svg\\r\\n                            class=\\\"fill-current text-primary w-5\\\"\\r\\n                            viewBox=\\\"0 0 24 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\"><path\\r\\n                                d=\\\"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z\\\" />\\r\\n                            <path\\r\\n                                d=\\\"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z\\\" /></svg>\\r\\n                    </div>\\r\\n                    <p class=\\\"pt-4 text-lg text-center\\\">\\r\\n                        You will be able to\\r\\n                        <b class=\\\"accent\\\">access your link</b>\\r\\n                        by clicking on\\r\\n                        <b class=\\\"accent\\\">your profile</b>!\\r\\n                    </p>\\r\\n                </div>-->\\r\\n        {/if}\\r\\n    </div>\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAqJI,CAAC,cAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,YAAY,CAAC,AACjD,CAAC,AAED,OAAO,cAAC,CAAC,AACL,OAAO,WAAW,CAAC,AACvB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC,AAED,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,OAAO,CAAC,IAAI,CAAC,AACxB,CAAC,AAED,aAAa,cAAC,CAAC,AACX,OAAO,YAAY,CAAC,QAAQ,CAAC,CAC7B,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,UAAU,CAAE,OAAO,CACnB,YAAY,CAAE,MAAM,AACxB,CAAC\"}"
};

async function preload({ params, query }) {
	let firstLink = query.link;
	return { firstLink };
}

const Create_account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { firstLink } = $$props;
	let email;
	let link = firstLink;
	let linkId;
	let validLink = null;
	let accountCreationStep = 0;
	let generatedLink;

	const onKeyPressLink = () => {
		setTimeout(
			async () => {
				if (link.length > 0) {
					try {
						linkId = new URL(link);
						linkId = linkId.pathname.split("/")[2];

						if (linkId.length == 24) {
							const testLink = await callApi("get", `/getLink/${linkId}`);
							if (testLink) validLink = true; else validLink = false;
						} else {
							validLink = false;
						}
					} catch(err) {
						validLink = false;
					}
				} else {
					validLink = null;
				}
			},
			1
		);
	};

	if (link && link != "") onKeyPressLink();

	onMount(() => {
		let unsub = counter.subscribe(value => {
			let user = value.content;

			if (user.then) {
				user.then(values => {
					if (values.user) {
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

	if ($$props.firstLink === void 0 && $$bindings.firstLink && firstLink !== void 0) $$bindings.firstLink(firstLink);
	$$result.css.add(css$9);

	return `${($$result.head += `${($$result.title = `<title>Create account | Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}<meta name="${"description"}" content="${"This is where all starts | Create a Winhalla account now and\r\n        get a Battle Pass and Mammoth Coins FOR FREE"}" data-svelte="svelte-fwzdel">`, "")}
<div>${ ``}
    <div class="${"flex items-center justify-center md:h-screen-7"}">${accountCreationStep === 0
	? `<div class="${"flex flex-col justify-center px-5 md:p-0"}"><div class="${"text-center md:text-left mt-7 md:mt-12"}"><h1 class="${"text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"}">Create your account
                    </h1></div>
                <div class="${"md:mt-4"}"><p class="${"input-header svelte-29gitm"}">Email</p>
                    <div><input type="${"email"}" placeholder="${"Your email goes here"}" class="${[
			"input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-29gitm",
			 ""
		].join(" ").trim()}"${add_attribute("value", email, 1)}>

                        ${ `${ ``}`}</div></div>

                <div class="${["mt-4",  "mt-12" ].join(" ").trim()}"><p class="${"text-3xl input-header svelte-29gitm"}">Friend link</p>
                    <div><input placeholder="${"Paste here your affiliate link"}" class="${[
			"input-style focus:outline-none\r\n                            focus:border-primary w-full placeholder-disabled svelte-29gitm",
			validLink == false ? "border-legendary" : ""
		].join(" ").trim()}"${add_attribute("value", link, 1)}>
                        ${validLink
		? `<div class="${"flex items-center"}"><svg class="${"fill-current text-green w-4 check svelte-29gitm"}" viewBox="${"0 0 33 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z"}"></path></svg>
                                <p class="${"text-green info svelte-29gitm"}">VALID LINK</p></div>`
		: `${validLink == false
			? `<p class="${"text-legendary info svelte-29gitm"}">INVALID LINK</p>`
			: ``}`}</div></div>
                <button ${ "disabled" } class="${["button button-brand mt-3 svelte-29gitm", validLink == null ? "mt-11" : ""].join(" ").trim()}">Create account
                </button>
                </div>`
	: `<div class="${"flex flex-col items-center px-5"}"><div class="${"text-center mt-7 lg:mt-12"}"><h1 class="${"text-6xl mb-8 lg:mb-8 leading-snug\r\n                        lg:leading-normal"}">Share your affiliate link
                    </h1></div>
                <div class="${"flex flex-col md:flex-row items-center"}"><div class="${"card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\r\n                        md:mr-12"}"><p class="${"text-6xl mt-6"}">You</p>
                        <p class="${"leading-7 mt-13"}">will get
                            <b class="${"svelte-29gitm"}">20%</b>
                            of what
                            <b class="${"svelte-29gitm"}">each people</b>
                            who
                            <b class="${"svelte-29gitm"}">creates an account</b>
                            with
                            <u>your</u>
                            link
                            <b class="${"svelte-29gitm"}">wins</b>
                            , for one month!
                        </p></div>
                    <div class="${"flex items-center md:block"}"><div class="${"hidden md:flex items-center"}"><svg class="${"w-4 fill-current text-accent -mr-3"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m19.2 2.43-2.422-2.43-11.978 12 11.978 12\r\n                                    2.422-2.43-9.547-9.57z"}"></path></svg>
                            <div class="${"h-2px bg-accent w-40"}"></div>
                            <svg class="${"w-4 fill-current text-accent -ml-3"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m4.8 21.57 2.422 2.43\r\n                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z"}"></path></svg></div>
                        <div class="${"flex flex-col md:hidden items-center"}"><svg class="${"w-4 fill-current text-accent -mb-3"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m21.57 19.2 2.43-2.422-12-11.978-12\r\n                                    11.978 2.43 2.422 9.57-9.547z"}"></path></svg>
                            <div class="${"w-2px bg-accent h-16"}"></div>
                            <svg class="${"w-4 fill-current text-accent -mt-3"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978\r\n                                    12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div>

                        <p class="${"text-center text-extra-light text-lg ml-4\r\n                            md:ml-0"}">Everyone wins!
                        </p></div>
                    <div class="${"card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0\r\n                        md:ml-12"}"><p class="${"text-6xl"}">Each person</p>
                        <p class="${"leading-7 mt-4"}">that will
                            <b class="${"svelte-29gitm"}">create an account</b>
                            with
                            <u>your</u>
                            link will get
                            <b class="${"svelte-29gitm"}">20%</b>
                            of reward
                            <b class="${"svelte-29gitm"}">boost</b>
                            , for one month!
                        </p></div></div>
                <div class="${"lg:flex justify-center"}">

                    <button class="${"text-background bg-font py-4 px-4 mt-14 flex items-center rounded svelte-29gitm"}"><p class="${"leading-none"}">${escape(generatedLink)}</p>
                        <svg class="${"fill-current text-primary w-10 md:w-5 ml-1\r\n                            lg:ml-4 lg:block"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12.922 16.587-3.671 3.671c-.693.645-1.626\r\n                                1.041-2.651 1.041-2.152\r\n                                0-3.896-1.744-3.896-3.896 0-1.025.396-1.958\r\n                                1.043-2.654l-.002.002\r\n                                3.671-3.671c.212-.23.341-.539.341-.878\r\n                                0-.717-.582-1.299-1.299-1.299-.339\r\n                                0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108\r\n                                1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494\r\n                                6.494 6.494 1.738 0 3.316-.683\r\n                                4.482-1.795l-.003.002\r\n                                3.671-3.671c.212-.23.341-.539.341-.878\r\n                                0-.717-.582-1.299-1.299-1.299-.339\r\n                                0-.647.13-.879.342l.001-.001z"}"></path><path d="${"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"}"></path></svg></button></div>

                <p class="${"pt-4 text-lg text-center"}">You will be able to
                    <b class="${"accent svelte-29gitm"}">access your link</b>
                    by clicking on
                    <b class="${"accent svelte-29gitm"}">your profile</b>
                    !
                </p>
                <a href="${"/play"}" class="${"button button-brand mt-10 block mx-auto mb-6 md:mb-0"}">Finish
                </a></div>
            

            `}</div></div>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Create_account,
    preload: preload
});

/* src\routes\change-email.svelte generated by Svelte v3.31.0 */

const css$a = {
	code: "input.svelte-1ktchpc{@apply w-full text-background bg-font py-3 px-4 rounded;}button.svelte-1ktchpc:disabled{@apply bg-disabled;;cursor:not-allowed}.info.svelte-1ktchpc{@apply text-lg mt-1;}.input-header.svelte-1ktchpc{@apply text-primary text-3xl;;margin-bottom:0.35rem}.check.svelte-1ktchpc{margin-top:0.15rem;margin-right:0.4rem}",
	map: "{\"version\":3,\"file\":\"change-email.svelte\",\"sources\":[\"change-email.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../utils/api.js\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n    import { counter } from \\\"../components/store\\\";\\r\\n    import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n\\r\\n    let account;\\r\\n    let email;\\r\\n    let valid = null;\\r\\n    let pushError;\\r\\n\\r\\n    function onKeyPress() {\\r\\n        setTimeout(() => {\\r\\n            if (email.length > 0) {\\r\\n                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])/gm;\\r\\n                let exec = regex.exec(email);\\r\\n                if (exec) valid = true;\\r\\n                else valid = false;\\r\\n            } else {\\r\\n                valid = null;\\r\\n            }\\r\\n        }, 1);\\r\\n    }\\r\\n\\r\\n    let user;\\r\\n    onMount(() => {\\r\\n        let unsub = counter.subscribe(async (value) => {\\r\\n            user = value.content;\\r\\n            if (user.then) {\\r\\n                user.then((values) => {\\r\\n                    if (!values.user) {\\r\\n                        goto(\\\"/\\\");\\r\\n                    }\\r\\n                });\\r\\n            } else if (user) {\\r\\n                if (!user.user) {\\r\\n                    goto(\\\"/\\\");\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n        unsub();\\r\\n    });\\r\\n\\r\\n\\r\\n    async function onClick() {\\r\\n        try {\\r\\n            const changeEmailStatus = await callApi(\\\"patch\\\", `/auth/changeEmail?email=${email}`);\\r\\n            if (changeEmailStatus instanceof Error) throw changeEmailStatus;\\r\\n            goto(\\\"/\\\");\\r\\n        } catch (e) {\\r\\n            pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n            setTimeout(() => {\\r\\n                pushError = undefined;\\r\\n            }, 8000);\\r\\n        }\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Change email | Winhalla</title>\\r\\n</svelte:head>\\r\\n\\r\\n<style>\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        @apply text-lg mt-1;\\r\\n    }\\r\\n\\r\\n    .input-header {\\r\\n        @apply text-primary text-3xl;\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .check {\\r\\n        margin-top: 0.15rem;\\r\\n        margin-right: 0.4rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div>\\r\\n    {#if pushError}\\r\\n        <ErrorAlert pushError={pushError} message=\\\"There was an error creating your account\\\" type=\\\"createAccount\\\" />\\r\\n    {/if}\\r\\n    <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n        <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\">\\r\\n            <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                <h1\\r\\n                    class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                    Change your email\\r\\n                </h1>\\r\\n            </div>\\r\\n            <div class=\\\"md:mt-4\\\">\\r\\n                <p class=\\\"input-header\\\">Email</p>\\r\\n                <div>\\r\\n                    <input\\r\\n                        on:keydown={onKeyPress}\\r\\n                        type=\\\"email\\\"\\r\\n                        placeholder=\\\"Type here your new email\\\"\\r\\n                        bind:value={email}\\r\\n                        class:border-legendary={valid === false}\\r\\n                        class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n\\r\\n                    {#if valid}\\r\\n                        <div class=\\\"flex items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"fill-current text-green w-4 check\\\"\\r\\n                                viewBox=\\\"0 0 33 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                            </svg>\\r\\n                            <p class=\\\"text-green info\\\">VALID EMAIL</p>\\r\\n                        </div>\\r\\n                    {:else if valid === false}\\r\\n                        <p class=\\\"text-legendary info \\\">INVALID EMAIL</p>\\r\\n                    {/if}\\r\\n                </div>\\r\\n            </div>\\r\\n            <button\\r\\n                disabled={!valid}\\r\\n                on:click={onClick}\\r\\n                class:mt-11={valid == null}\\r\\n                class=\\\"button button-brand mt-3\\\">\\r\\n                Change email\\r\\n            </button>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAgEI,KAAK,eAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC,AAED,qBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,OAAO,OAAO,CAAC,IAAI,CAAC,AACxB,CAAC,AAED,aAAa,eAAC,CAAC,AACX,OAAO,YAAY,CAAC,QAAQ,CAAC,CAC7B,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,UAAU,CAAE,OAAO,CACnB,YAAY,CAAE,MAAM,AACxB,CAAC\"}"
};

const Change_email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let email;

	let user;

	onMount(() => {
		let unsub = counter.subscribe(async value => {
			user = value.content;

			if (user.then) {
				user.then(values => {
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

	$$result.css.add(css$a);

	return `${($$result.head += `${($$result.title = `<title>Change email | Winhalla</title>`, "")}`, "")}



<div>${ ``}
    <div class="${"flex items-center justify-center md:h-screen-7"}"><div class="${"flex flex-col justify-center px-5 md:p-0"}"><div class="${"text-center md:text-left mt-7 md:mt-12"}"><h1 class="${"text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"}">Change your email
                </h1></div>
            <div class="${"md:mt-4"}"><p class="${"input-header svelte-1ktchpc"}">Email</p>
                <div><input type="${"email"}" placeholder="${"Type here your new email"}" class="${[
		"input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-1ktchpc",
		 ""
	].join(" ").trim()}"${add_attribute("value", email, 1)}>

                    ${ `${ ``}`}</div></div>
            <button ${ "disabled" } class="${["button button-brand mt-3 svelte-1ktchpc",  "mt-11" ].join(" ").trim()}">Change email
            </button></div></div></div>`;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Change_email
});

/* src\routes\contact.svelte generated by Svelte v3.31.0 */

const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let subject;

	let problems = [
		"Problem with the shop",
		"Problem with the FFA gamemode",
		"Sign in/Sign up Problem",
		"Problem with the quests",
		"Other problem (please precise)"
	];

	return `${($$result.head += `${($$result.title = `<title>How to contact us | Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}`, "")}
<div class="${"lg:block lg:pl-24 lg:mt-12 h-full mb-7"}"><h1 class="${"text-6xl"}">How to contact us</h1>
    <br>
    <div class="${"flex w-full h-auto pr-24 justify-between"}"><div class="${"w-40% block mb-16 rounded shadow-full bg-variant p-6"}"><h2 class="${"text-4xl mb-2"}">BY FORM:</h2>
            <h3 class="${"text-xl text-accent"}">Subject:</h3>
            <input class="${"rounded-sm text-black p-1 focus:outline-none"}" readonly size="${"35"}"${add_attribute("value", subject, 1)}>

            <div class="${[
		"mt-1 rounded bg-white lg:absolute shadow-card dropdown\r\n                z-50 border border-primary w-60 ",
		 "lg:hidden" 
	].join(" ").trim()}">${each(problems, problem => `<p class="${"block text-black text-xl border-l border-red-600\r\n                        py-3 hover:bg-primary hover:text-font px-3 rounded-sm\r\n                        lg:border-none"}">${escape(problem)}
                    </p>`)}</div>
            <br>
            <br>
            <h3 class="${"text-accent"}">Your message:</h3>
            <textarea class="${"w-90% rounded-sm text-black p-1 h-70 focus:outline-none"}" maxlength="${"2000"}">${ ""}</textarea></div>
        <div class="${"w-40% rounded h-auto shadow-full bg-variant p-6"}"><h2 class="${"text-4xl mt-4 mb-2"}">BY MAIL
                <strong class="${"text-white font-normal"}">(FOR COMMERCIAL PURPOSE ONLY):
                </strong></h2>
            <div><h3 class="${"text-3xl"}">IF YOU ARE A
                    <strong class="${"text-accent font-normal"}">COMPANY</strong></h3>
                <p class="${"mb-4"}">Please describe
                    <strong class="${"text-primary font-normal"}">who you are
                    </strong>
                    and
                    <strong class="${"text-primary font-normal"}">what are your proposal
                    </strong>
                    ACCURATELY
                </p>
                <h3 class="${"text-3xl"}">IF YOU ARE A
                    <strong class="${"text-accent font-normal"}">CONTENT CREATOR
                    </strong></h3>
                <p>Please precise the number of average
                    <strong class="${"text-primary font-normal"}">views per video
                    </strong>
                    (or average
                    <strong class="${"text-primary font-normal"}">viewers on your stream
                    </strong>
                    )
                </p>
                <p class="${"text-3xl mt-8"}">At
                    <a class="${"text-primary font-normal underline"}" href="${"mailto:contact@winhalla.us"}">contact@winhalla.us
                    </a></p></div></div></div></div>`;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Contact
});

/* src\components\Loading.svelte generated by Svelte v3.31.0 */

const css$b = {
	code: ".loader.svelte-1r0tf3p{border:12px solid transparent;border-radius:50%;border-top:12px solid #3d72e4;width:150px;height:150px;-webkit-animation:svelte-1r0tf3p-spin 0.6s linear infinite;animation:svelte-1r0tf3p-spin 0.6s linear infinite}@-webkit-keyframes svelte-1r0tf3p-spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes svelte-1r0tf3p-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
	map: "{\"version\":3,\"file\":\"Loading.svelte\",\"sources\":[\"Loading.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .loader {\\r\\n        border: 12px solid transparent;\\r\\n        border-radius: 50%;\\r\\n        border-top: 12px solid #3d72e4;\\r\\n        width: 150px;\\r\\n        height: 150px;\\r\\n        -webkit-animation: spin 0.6s linear infinite; /* Safari */\\r\\n        animation: spin 0.6s linear infinite;\\r\\n    }\\r\\n\\r\\n    /* Safari */\\r\\n    @-webkit-keyframes spin {\\r\\n        0% {\\r\\n            -webkit-transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            -webkit-transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes spin {\\r\\n        0% {\\r\\n            transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n<script>\\r\\n    export let data;\\r\\n    export let type\\r\\n</script>\\r\\n<div  class=\\\"absolute top-20 bg-fixed z-50 bg-no-repeat flex items-center justify-center h-screen-90\\\">\\r\\n    <div class=\\\"pb-20 bg-background z-50 w-screenw-99 h-screen-99\\\">\\r\\n        <div class=\\\"mx-auto\\\">\\r\\n        <div class=\\\"loader mt-15/100 mx-auto\\\" ></div>\\r\\n        {#if data}\\r\\n            <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">{data}</h2>\\r\\n        {:else}\\r\\n            <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">Loading...</h2>\\r\\n        {/if}\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,OAAO,eAAC,CAAC,AACL,MAAM,CAAE,IAAI,CAAC,KAAK,CAAC,WAAW,CAC9B,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC9B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,iBAAiB,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,CAC5C,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AACxC,CAAC,AAGD,mBAAmB,mBAAK,CAAC,AACrB,EAAE,AAAC,CAAC,AACA,iBAAiB,CAAE,OAAO,IAAI,CAAC,AACnC,CAAC,AACD,IAAI,AAAC,CAAC,AACF,iBAAiB,CAAE,OAAO,MAAM,CAAC,AACrC,CAAC,AACL,CAAC,AAED,WAAW,mBAAK,CAAC,AACb,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,OAAO,IAAI,CAAC,AAC3B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,OAAO,MAAM,CAAC,AAC7B,CAAC,AACL,CAAC\"}"
};

const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let { type } = $$props;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	$$result.css.add(css$b);

	return `<div class="${"absolute top-20 bg-fixed z-50 bg-no-repeat flex items-center justify-center h-screen-90"}"><div class="${"pb-20 bg-background z-50 w-screenw-99 h-screen-99"}"><div class="${"mx-auto"}"><div class="${"loader mt-15/100 mx-auto svelte-1r0tf3p"}"></div>
        ${data
	? `<h2 class="${"text-center text-3xl font-bold pt-4"}">${escape(data)}</h2>`
	: `<h2 class="${"text-center text-3xl font-bold pt-4"}">Loading...</h2>`}</div></div></div>`;
});

/* src\components\UsersArray.svelte generated by Svelte v3.31.0 */

const UsersArray = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { users } = $$props;
	let { color } = $$props;
	if ($$props.users === void 0 && $$bindings.users && users !== void 0) $$bindings.users(users);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);

	return `<table class="${"card px-4 text-2xl w-3/4 overflow-scroll"}"><thead class="${[
		"rounded",
		(color === "blue" ? "bg-primary" : "") + " " + (color === "red" ? "bg-legendary" : "")
	].join(" ").trim()}"><tr><td class="${"px-8 py-3"}">#
        </td>
        <td class="${"px-8 py-3"}">Name
        </td>
        <td class="${"px-8 py-3"}">In game?
        </td>
        <td class="${"px-8 py-3"}">Games played
        </td>
        <td class="${"px-8 py-3"}">Winrate
        </td>
        <td class="${"px-8 py-3"}">Coins
        </td>
        <td class="${"px-8 py-3"}">Actions
        </td></tr></thead>
    <tbody class="${" divide-y-4 divide-background text-l"}">
    ${each(users, (user, i) => `<tr class="${"text-center"}"><td class="${"px-6 py-2"}"><b class="${"font-normal"}">${escape(i + 1)}</b></td>
            <td class="${"flex items-center px-6 py-2 overflow-x-auto"}" style="${"width: 14rem"}"><img class="${"block w-10 h-10 rounded-full"}"${add_attribute("src", user.avatarURL, 0)}${add_attribute("alt", user.brawlhallaName, 0)}>
                <p class="${[
		"pl-2",
		(user.brawlhallaName.length >= 17 && user.brawlhallaName.length < 26
		? "text-lg"
		: "") + " " + (user.isSucpicious.ffa || user.isSucpicious.solo
		? "text-legendary"
		: "")
	].join(" ").trim()}">${escape(user.brawlhallaName)}</p></td>
            <td class="${"px-6 py-2"}"><b class="${[
		"font-normal",
		(user.inGame.findIndex(e => !e.isFinished) === -1
		? "text-legendary"
		: "") + " " + (user.inGame.findIndex(e => !e.isFinished) !== -1
		? "text-green"
		: "")
	].join(" ").trim()}">${escape(user.inGame.findIndex(e => !e.isFinished) === -1
	? "No"
	: "Yes")}</b></td>
            <td class="${"px-6 py-2"}">${escape(user.stats.ffa.gamesPlayed)}</td>
            <td class="${[
		"px-6 py-2",
		(user.winrate < 14 ? "text-green" : "") + " " + (user.winrate < 25 && user.winrate >= 14
		? "text-accent"
		: "") + " " + (user.winrate >= 25 ? "text-legendary" : "")
	].join(" ").trim()}">${escape(user.winrate)}%
            </td>
            <td class="${[
		"px-6 py-2",
		(user.coins < 40000 ? "text-green" : "") + " " + (user.coins < 120000 && user.coins >= 40000
		? "text-accent"
		: "") + " " + (user.coins >= 120000 ? "text-legendary" : "")
	].join(" ").trim()}">${escape(user.coins)}$
            </td>
            <td class="${"px-6 py-2"}"><svg viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-5 h-5"}" style="${"fill: #fc1870;"}"><path d="${"m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z"}"></path></svg></td>
        </tr>`)}</tbody></table>`;
});

/* src\routes\feltrom\admin\index.svelte generated by Svelte v3.31.0 */

const css$c = {
	code: "input[type=text].svelte-1qob01w{@apply py-2 px-4;}.input.svelte-1qob01w{@apply w-full text-background bg-font py-3 px-4 rounded;}button.svelte-1qob01w:disabled{@apply bg-disabled;;cursor:not-allowed}.input-header.svelte-1qob01w{@apply text-primary text-3xl;;margin-bottom:0.35rem}@media(min-width: 480px){}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../../../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n    import Loading from \\\"../../../components/Loading.svelte\\\";\\r\\n    import UsersArray from \\\"../../../components/UsersArray.svelte\\\";\\r\\n\\r\\n    let configs;\\r\\n    let isAuthorizedUser = false;\\r\\n    let isLoggedIn = false;\\r\\n    let otp = \\\"\\\";\\r\\n    let pwd = \\\"\\\";\\r\\n    let users = new Promise(() => {\\r\\n    });\\r\\n    let newConfig;\\r\\n    let goldEvent = [\\\"\\\", \\\"\\\", \\\"\\\", \\\"\\\"];\\r\\n    let loadingUsers;\\r\\n    let sortBy = \\\"alphabetic\\\";\\r\\n    let suspiciousBitches = [];\\r\\n\\r\\n    async function login() {\\r\\n        isLoggedIn = true;\\r\\n        configs = await callApi(\\\"get\\\", `/feltrom/config?otp=${otp}&pwd=${pwd}`);\\r\\n        newConfig = configs;\\r\\n        users = await callApi(\\\"get\\\", `/feltrom/users?otp=${otp}&pwd=${pwd}`);\\r\\n        goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);\\r\\n        goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);\\r\\n        goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);\\r\\n    }\\r\\n\\r\\n    function sort(by, stats) {\\r\\n        if (stats) {\\r\\n            users.sort((a, b) => {\\r\\n                return b.stats.ffa[by] - a.stats.ffa[by];\\r\\n            });\\r\\n        } else if (by === \\\"alphabetic\\\") {\\r\\n            users.sort((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));\\r\\n        } else {\\r\\n            users.sort((a, b) => {\\r\\n                return b[by] - a[by];\\r\\n            });\\r\\n        }\\r\\n        sortBy = by;\\r\\n        users = users;\\r\\n    }\\r\\n\\r\\n\\r\\n    function loadUsers() {\\r\\n        users = callApi(\\\"get\\\", `/feltrom/users?otp=${otp}&pwd=${pwd}`);\\r\\n        loadingUsers = true;\\r\\n        users.then(result => {\\r\\n            users = result;\\r\\n            users.forEach((user, i) => {\\r\\n                users[i].winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);\\r\\n            });\\r\\n            users.sort((a, b) => {\\r\\n                return b.winrate - a.winrate;\\r\\n            });\\r\\n            loadingUsers = false;\\r\\n        });\\r\\n    }\\r\\n\\r\\n    onMount(async () => {\\r\\n        isAuthorizedUser = (await callApi(\\\"get\\\", \\\"/feltrom/login\\\")) === true;\\r\\n        isLoggedIn = true;\\r\\n        configs = await callApi(\\\"get\\\", `/feltrom/config?otp=${otp}&pwd=${pwd}`);\\r\\n        newConfig = configs;\\r\\n        users = callApi(\\\"get\\\", `/feltrom/users?otp=${otp}&pwd=${pwd}`);\\r\\n        loadingUsers = true;\\r\\n        users.then(result => {\\r\\n            users = result;\\r\\n            users.forEach((user, i) => {\\r\\n                if (user.isSucpicious.ffa === true || user.isSucpicious.solo === true) {\\r\\n                    suspiciousBitches.push(...users.splice(i, 1));\\r\\n                }\\r\\n                users[i].winrate = Math.round((user.stats.ffa.wins / user.stats.ffa.gamesPlayed) * 100);\\r\\n            });\\r\\n            console.log(users);\\r\\n            users.sort((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));\\r\\n            loadingUsers = false;\\r\\n            users = users;\\r\\n            suspiciousBitches = suspiciousBitches;\\r\\n        });\\r\\n\\r\\n\\r\\n        goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);\\r\\n        goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);\\r\\n        goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);\\r\\n\\r\\n    });\\r\\n\\r\\n</script>\\r\\n<style>\\r\\n    input[type=text] {\\r\\n        @apply py-2 px-4;\\r\\n    }\\r\\n\\r\\n    .input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        @apply text-lg mt-1;\\r\\n    }\\r\\n\\r\\n    .input-header {\\r\\n        @apply text-primary text-3xl;\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .check {\\r\\n        margin-top: 0.15rem;\\r\\n        margin-right: 0.4rem;\\r\\n    }\\r\\n\\r\\n    .h1, .p {\\r\\n        margin: 0 auto;\\r\\n    }\\r\\n\\r\\n    .h1 {\\r\\n        font-size: 2.8em;\\r\\n        font-weight: 700;\\r\\n        margin: 0 0 0.5em 0;\\r\\n    }\\r\\n\\r\\n    .p {\\r\\n        margin: 1em auto;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 480px) {\\r\\n        .h1 {\\r\\n            font-size: 4em;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n<svelte:head>\\r\\n    {#if isAuthorizedUser}\\r\\n        <title>Admin dashboard - Winhalla</title>\\r\\n    {:else}\\r\\n        <title>404</title>\\r\\n    {/if}\\r\\n</svelte:head>\\r\\n{#if isAuthorizedUser && !isLoggedIn}\\r\\n    <div>\\r\\n        <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n            <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\">\\r\\n                <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                        ADMIN DASHBOARD\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"md:mt-4\\\">\\r\\n                    <p class=\\\"input-header\\\">Password</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            placeholder=\\\"Personal password\\\"\\r\\n                            bind:value={pwd}\\r\\n                            type=\\\"password\\\"\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled input\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"md:mt-4\\\">\\r\\n                    <p class=\\\"input-header\\\">Authenticator password</p>\\r\\n                    <div>\\r\\n                        <input\\r\\n                            type=\\\"text\\\"\\r\\n                            maxlength=\\\"6\\\"\\r\\n                            placeholder=\\\"Google authenticator OTP\\\"\\r\\n                            bind:value={otp}\\r\\n                            class=\\\"input input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <!-- svelte-ignore a11y-accesskey -->\\r\\n                <button\\r\\n                    on:click={login}\\r\\n                    accesskey=\\\"enter\\\"\\r\\n                    class=\\\"button button-brand mt-3\\\">\\r\\n                    Login\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{:else if isLoggedIn}\\r\\n    {#if !configs || !users}\\r\\n        <div out:fade={{duration:100}} class=\\\"z-50 bg-background absolute\\\">\\r\\n            <Loading data=\\\"Entering super secret page...\\\" />\\r\\n        </div>\\r\\n    {/if}\\r\\n    {#if configs && users}\\r\\n        <div class=\\\"lg:block lg:pl-24 lg:pr-24 mt-7 lg:mt-12 h-full w-full\\\">\\r\\n            <h1 class=\\\"text-6xl mb-12\\\">ADMIN DASHBOARD</h1>\\r\\n            <div class=\\\"flex justify-center\\\">\\r\\n                <div class=\\\"w-1/3 mx-4 block h-full p-8\\\">\\r\\n                    {#each newConfig as config,i}\\r\\n                        <div class=\\\"mb-16\\\">\\r\\n                            <h1 class=\\\"text-5xl text-primary\\\">{config.name}</h1>\\r\\n                            <div class=\\\"pl-8 pt-4\\\">\\r\\n                                {#if config.name === \\\"GAMEMODES STATUS\\\"}\\r\\n                                    <h2 class=\\\"text-3xl\\\">2vs2</h2>\\r\\n                                    <div class=\\\"flex\\\">\\r\\n                                        <p class:text-green={config.value.FFA === true}\\r\\n                                           class:text-accent={config.value.FFA === \\\"maintenance\\\"}\\r\\n                                           class:text-legendary={config.value.FFA === false}>\\r\\n                                            • {config.value.FFA === true ? \\\"Active\\\" : config.value.FFA === \\\"maintenance\\\" ? \\\"Maintenance in progress\\\" : \\\"Inactive (Coming soon)\\\"}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                    <h2 class=\\\"text-3xl\\\">2vs2</h2>\\r\\n                                    <div class=\\\"flex\\\">\\r\\n                                        <p class:text-green={config.value[\\\"2vs2\\\"] === true}\\r\\n                                           class:text-accent={config.value[\\\"2vs2\\\"] === \\\"maintenance\\\"}\\r\\n                                           class:text-legendary={config.value[\\\"2vs2\\\"] === false}>\\r\\n                                            • {config.value[\\\"2vs2\\\"] === true ? \\\"Active\\\" : config.value[\\\"2vs2\\\"] === \\\"maintenance\\\" ? \\\"Maintenance in progress\\\" : \\\"Inactive (Coming soon)\\\"}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                {:else if config.name === \\\"FFA REWARDS CONFIG\\\"}\\r\\n                                    <div class=\\\"block\\\">\\r\\n                                        {#each config.value as reward,ii}\\r\\n                                            <div class=\\\"flex\\\">\\r\\n                                                <p class=\\\"text-accent\\\">{ii + 1}{ii === 0 ? \\\"st\\\" : ii === 1 ? \\\"nd\\\" : ii === 2 ? \\\"rd\\\" : \\\"th\\\"}</p>\\r\\n                                                : {reward}$\\r\\n                                            </div>\\r\\n                                        {/each}\\r\\n                                    </div>\\r\\n                                {:else if config.name === \\\"ADVICES\\\"}\\r\\n                                    <div class=\\\"flex mb-5\\\">\\r\\n                                        <p>Probability:</p>\\r\\n                                        <input type=\\\"text\\\" class=\\\"text-2xl bg-variant rounded -mt-3 mx-2 text-center\\\"\\r\\n                                               size=\\\"3\\\"\\r\\n                                               bind:value={config.value.probability} />%\\r\\n                                    </div>\\r\\n                                    {#each config.value.advices as info,ii}\\r\\n                                        <h2 class=\\\"text-4xl text-accent\\\">{ii + 1}.</h2>\\r\\n                                        <h3 class=\\\"text-3xl\\\">Name</h3>\\r\\n                                        <input class=\\\"text-2xl bg-variant rounded\\\" size=\\\"40\\\" type=\\\"text\\\"\\r\\n                                               bind:value={info.name} />\\r\\n                                        <h3 class=\\\"text-3xl mt-3\\\">Strong</h3>\\r\\n                                        <input class=\\\"text-xl bg-variant rounded mt-2\\\" size=\\\"40\\\" type=\\\"text\\\"\\r\\n                                               bind:value={info.strong}>\\r\\n\\r\\n                                    {/each}\\r\\n                                {:else if config.name === \\\"INFOS\\\"}\\r\\n                                    {#each config.value as info,ii}\\r\\n                                        <h2 class=\\\"text-4xl text-accent\\\">{ii + 1}.</h2>\\r\\n                                        <h3 class=\\\"text-3xl\\\">Name</h3>\\r\\n                                        <input class=\\\"text-2xl bg-variant rounded\\\" size=\\\"40\\\" type=\\\"text\\\"\\r\\n                                               bind:value={info.name} />\\r\\n                                        <h3 class=\\\"text-3xl\\\">Strong</h3>\\r\\n                                        <input class=\\\"text-xl bg-variant rounded mt-2\\\" size=\\\"60\\\" type=\\\"text\\\"\\r\\n                                               bind:value={info.description}>\\r\\n\\r\\n                                    {/each}\\r\\n                                {:else if config.name === \\\"GOLD EVENT\\\"}\\r\\n                                    <h3 class=\\\"text-2xl\\\">Boost of <strong\\r\\n                                        class=\\\"font-normal text-accent text-3xl\\\">{config.value.percentage - 100}\\r\\n                                        %</strong></h3>\\r\\n                                    <p class=\\\"text-2xl\\\">\\r\\n                                        Exipires in\\r\\n                                        <strong class=\\\"text-accent font-normal text-3xl\\\">{goldEvent[0]}</strong> days,\\r\\n                                        <strong class=\\\"text-accent font-normal text-3xl\\\">{goldEvent[1]}</strong> hours,\\r\\n                                        <strong class=\\\"text-accent font-normal text-3xl\\\">{goldEvent[2]}</strong>\\r\\n                                        minutes,\\r\\n                                    </p>\\r\\n                                {:else if config.name === \\\"LINKS CONFIG\\\"}\\r\\n                                    <p class=\\\"text-2xl\\\">Players joining via an affiliated link get\\r\\n                                        <strong class=\\\"text-accent font-normal text-3xl\\\">{config.value.boost}%</strong>\\r\\n                                        more\\r\\n                                        coins for <strong\\r\\n                                            class=\\\"text-accent font-normal text-3xl\\\">{config.value.duration}\\r\\n                                            days</strong></p>\\r\\n                                {:else if config.name === \\\"IDs BANNED\\\"}\\r\\n                                    <div class=\\\"block\\\">\\r\\n                                        {#each config.value as banned,ii}\\r\\n                                            <p>{banned}</p>\\r\\n                                        {/each}\\r\\n                                    </div>\\r\\n                                    <p class=\\\"text-3xl text-green\\\">\\r\\n                                        {config.value.length === 0 ? \\\"No player has been banned\\\" : \\\"\\\"}\\r\\n                                    </p>\\r\\n                                {/if}\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    {/each}\\r\\n                </div>\\r\\n                <div class=\\\"w-2/3 h-full block\\\">\\r\\n                    {#await users}\\r\\n                        {#if !loadingUsers}\\r\\n                            <button class=\\\"button button-brand\\\" on:click={loadUsers}>Load users (can take long and up to\\r\\n                                50 MO of data)\\r\\n                            </button>\\r\\n                        {:else}\\r\\n                            Loading user data...\\r\\n                        {/if}\\r\\n                    {:then users}\\r\\n                        <div class=\\\"px-4 text-2xl mb-5 flex overflow-hidden\\\">\\r\\n                            <h3 class=\\\"\\\">Sort by:</h3>\\r\\n                            <h3 class=\\\"ml-3 -mt-2px\\\">\\r\\n                                <strong class=\\\"font-normal cursor-pointer \\\" class:text-primary={sortBy === \\\"alphabetic\\\"}\\r\\n                                        class:text-3xl={sortBy === \\\"alphabetic\\\"}\\r\\n                                        on:click={()=>sort(\\\"alphabetic\\\")}>alphabetic</strong>,\\r\\n                                <strong class=\\\"font-normal cursor-pointer\\\" class:text-primary={sortBy === \\\"winrate\\\"}\\r\\n                                        class:text-3xl={sortBy === \\\"winrate\\\"}\\r\\n                                        on:click={()=>sort(\\\"winrate\\\")}>winrate</strong>,\\r\\n                                <strong class=\\\"font-normal cursor-pointer\\\" class:text-primary={sortBy === \\\"coins\\\"}\\r\\n                                        class:text-3xl={sortBy === \\\"coins\\\"}\\r\\n                                        on:click={()=>sort(\\\"coins\\\")}>coins</strong>,\\r\\n                                <strong class=\\\"font-normal cursor-pointer\\\" class:text-primary={sortBy === \\\"gamesPlayed\\\"}\\r\\n                                        class:text-3xl={sortBy === \\\"gamesPlayed\\\"}\\r\\n                                        on:click={()=>sort(\\\"gamesPlayed\\\",true)}>games played</strong>\\r\\n                            </h3>\\r\\n\\r\\n                        </div>\\r\\n                        <div class=\\\"flex\\\">\\r\\n                            <div class=\\\"block\\\">\\r\\n                                <UsersArray users=\\\"{suspiciousBitches}\\\" color=\\\"red\\\" class=\\\"mb-30\\\"/>\\r\\n                                <UsersArray users=\\\"{users}\\\" color=\\\"blue\\\"/>\\r\\n                            </div>\\r\\n                            <div class=\\\"block ml-4 mt-2 \\\">\\r\\n                                <p class=\\\"text-xl\\\"><strong\\r\\n                                    class=\\\"text-legendary text-2xl font-normal\\\">PLAYERNAME</strong><br> player name in\\r\\n                                    red\\r\\n                                    means that it has been considered suspicious</p>\\r\\n                                <p class=\\\"mt-6 text-xl\\\">\\r\\n                                    <svg viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" class=\\\"w-5 h-5 mb-2\\\"\\r\\n                                         style=\\\"fill: #fc1870\\\">\\r\\n                                        <path\\r\\n                                            d=\\\"m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z\\\" />\\r\\n                                    </svg>\\r\\n                                    Click to ban user (confirmation message always shows)\\r\\n                                </p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    {/await}\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    {/if}\\r\\n{:else}\\r\\n    <!--<h1 class=\\\"h1\\\">404</h1>\\r\\n    <p class=\\\"p\\\">Not found</p>-->\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AA6FI,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,eAAC,CAAC,AACd,OAAO,IAAI,CAAC,IAAI,CAAC,AACrB,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC,AAED,qBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAMD,aAAa,eAAC,CAAC,AACX,OAAO,YAAY,CAAC,QAAQ,CAAC,CAC7B,aAAa,CAAE,OAAO,AAC1B,CAAC,AAqBD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let configs;
	let isAuthorizedUser = false;
	let isLoggedIn = false;
	let otp = "";
	let pwd = "";

	let users = new Promise(() => {
			
		});

	let newConfig;
	let goldEvent = ["", "", "", ""];
	let loadingUsers;
	let suspiciousBitches = [];

	onMount(async () => {
		isAuthorizedUser = await callApi("get", "/feltrom/login") === true;
		isLoggedIn = true;
		configs = await callApi("get", `/feltrom/config?otp=${otp}&pwd=${pwd}`);
		newConfig = configs;
		users = callApi("get", `/feltrom/users?otp=${otp}&pwd=${pwd}`);
		loadingUsers = true;

		users.then(result => {
			users = result;

			users.forEach((user, i) => {
				if (user.isSucpicious.ffa === true || user.isSucpicious.solo === true) {
					suspiciousBitches.push(...users.splice(i, 1));
				}

				users[i].winrate = Math.round(user.stats.ffa.wins / user.stats.ffa.gamesPlayed * 100);
			});

			console.log(users);
			users.sort((a, b) => a.brawlhallaName.localeCompare(b.brawlhallaName));
			loadingUsers = false;
			users = users;
			suspiciousBitches = suspiciousBitches;
		});

		goldEvent[0] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 86400);
		goldEvent[1] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 3600 - goldEvent[0] * 24);
		goldEvent[2] = Math.floor((configs[4].value.expiration - Date.now()) / 1000 / 60 - goldEvent[0] * 24 * 60 - goldEvent[1] * 60);
	});

	$$result.css.add(css$c);

	return `${($$result.head += `${isAuthorizedUser
	? `${($$result.title = `<title>Admin dashboard - Winhalla</title>`, "")}`
	: `${($$result.title = `<title>404</title>`, "")}`}`, "")}
${isAuthorizedUser && !isLoggedIn
	? `<div><div class="${"flex items-center justify-center md:h-screen-7"}"><div class="${"flex flex-col justify-center px-5 md:p-0"}"><div class="${"text-center md:text-left mt-7 md:mt-12"}"><h1 class="${"text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"}">ADMIN DASHBOARD
                    </h1></div>
                <div class="${"md:mt-4"}"><p class="${"input-header svelte-1qob01w"}">Password</p>
                    <div><input placeholder="${"Personal password"}" type="${"password"}" class="${"input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled input svelte-1qob01w"}"${add_attribute("value", pwd, 1)}></div></div>
                <div class="${"md:mt-4"}"><p class="${"input-header svelte-1qob01w"}">Authenticator password</p>
                    <div><input type="${"text"}" maxlength="${"6"}" placeholder="${"Google authenticator OTP"}" class="${"input input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-1qob01w"}"${add_attribute("value", otp, 1)}></div></div>
                
                <button accesskey="${"enter"}" class="${"button button-brand mt-3 svelte-1qob01w"}">Login
                </button></div></div></div>`
	: `${isLoggedIn
		? `${!configs || !users
			? `<div class="${"z-50 bg-background absolute"}">${validate_component(Loading, "Loading").$$render($$result, { data: "Entering super secret page..." }, {}, {})}</div>`
			: ``}
    ${configs && users
			? `<div class="${"lg:block lg:pl-24 lg:pr-24 mt-7 lg:mt-12 h-full w-full"}"><h1 class="${"text-6xl mb-12"}">ADMIN DASHBOARD</h1>
            <div class="${"flex justify-center"}"><div class="${"w-1/3 mx-4 block h-full p-8"}">${each(newConfig, (config, i) => `<div class="${"mb-16"}"><h1 class="${"text-5xl text-primary"}">${escape(config.name)}</h1>
                            <div class="${"pl-8 pt-4"}">${config.name === "GAMEMODES STATUS"
				? `<h2 class="${"text-3xl"}">2vs2</h2>
                                    <div class="${"flex"}"><p${add_classes([
						(config.value.FFA === true ? "text-green" : "") + " " + (config.value.FFA === "maintenance" ? "text-accent" : "") + " " + (config.value.FFA === false ? "text-legendary" : "")
					].join(" ").trim())}>• ${escape(config.value.FFA === true
					? "Active"
					: config.value.FFA === "maintenance"
						? "Maintenance in progress"
						: "Inactive (Coming soon)")}
                                        </p></div>
                                    <h2 class="${"text-3xl"}">2vs2</h2>
                                    <div class="${"flex"}"><p${add_classes([
						(config.value["2vs2"] === true ? "text-green" : "") + " " + (config.value["2vs2"] === "maintenance"
						? "text-accent"
						: "") + " " + (config.value["2vs2"] === false ? "text-legendary" : "")
					].join(" ").trim())}>• ${escape(config.value["2vs2"] === true
					? "Active"
					: config.value["2vs2"] === "maintenance"
						? "Maintenance in progress"
						: "Inactive (Coming soon)")}</p>
                                    </div>`
				: `${config.name === "FFA REWARDS CONFIG"
					? `<div class="${"block"}">${each(config.value, (reward, ii) => `<div class="${"flex"}"><p class="${"text-accent"}">${escape(ii + 1)}${escape(ii === 0
						? "st"
						: ii === 1 ? "nd" : ii === 2 ? "rd" : "th")}</p>
                                                : ${escape(reward)}$
                                            </div>`)}
                                    </div>`
					: `${config.name === "ADVICES"
						? `<div class="${"flex mb-5"}"><p>Probability:</p>
                                        <input type="${"text"}" class="${"text-2xl bg-variant rounded -mt-3 mx-2 text-center svelte-1qob01w"}" size="${"3"}"${add_attribute("value", config.value.probability, 1)}>%
                                    </div>
                                    ${each(config.value.advices, (info, ii) => `<h2 class="${"text-4xl text-accent"}">${escape(ii + 1)}.</h2>
                                        <h3 class="${"text-3xl"}">Name</h3>
                                        <input class="${"text-2xl bg-variant rounded svelte-1qob01w"}" size="${"40"}" type="${"text"}"${add_attribute("value", info.name, 1)}>
                                        <h3 class="${"text-3xl mt-3"}">Strong</h3>
                                        <input class="${"text-xl bg-variant rounded mt-2 svelte-1qob01w"}" size="${"40"}" type="${"text"}"${add_attribute("value", info.strong, 1)}>`)}`
						: `${config.name === "INFOS"
							? `${each(config.value, (info, ii) => `<h2 class="${"text-4xl text-accent"}">${escape(ii + 1)}.</h2>
                                        <h3 class="${"text-3xl"}">Name</h3>
                                        <input class="${"text-2xl bg-variant rounded svelte-1qob01w"}" size="${"40"}" type="${"text"}"${add_attribute("value", info.name, 1)}>
                                        <h3 class="${"text-3xl"}">Strong</h3>
                                        <input class="${"text-xl bg-variant rounded mt-2 svelte-1qob01w"}" size="${"60"}" type="${"text"}"${add_attribute("value", info.description, 1)}>`)}`
							: `${config.name === "GOLD EVENT"
								? `<h3 class="${"text-2xl"}">Boost of <strong class="${"font-normal text-accent text-3xl"}">${escape(config.value.percentage - 100)}
                                        %</strong></h3>
                                    <p class="${"text-2xl"}">Exipires in
                                        <strong class="${"text-accent font-normal text-3xl"}">${escape(goldEvent[0])}</strong> days,
                                        <strong class="${"text-accent font-normal text-3xl"}">${escape(goldEvent[1])}</strong> hours,
                                        <strong class="${"text-accent font-normal text-3xl"}">${escape(goldEvent[2])}</strong>
                                        minutes,
                                    </p>`
								: `${config.name === "LINKS CONFIG"
									? `<p class="${"text-2xl"}">Players joining via an affiliated link get
                                        <strong class="${"text-accent font-normal text-3xl"}">${escape(config.value.boost)}%</strong>
                                        more
                                        coins for <strong class="${"text-accent font-normal text-3xl"}">${escape(config.value.duration)}
                                            days</strong></p>`
									: `${config.name === "IDs BANNED"
										? `<div class="${"block"}">${each(config.value, (banned, ii) => `<p>${escape(banned)}</p>`)}</div>
                                    <p class="${"text-3xl text-green"}">${escape(config.value.length === 0
											? "No player has been banned"
											: "")}
                                    </p>`
										: ``}`}`}`}`}`}`}</div>
                        </div>`)}</div>
                <div class="${"w-2/3 h-full block"}">${(function (__value) {
					if (is_promise(__value)) return `
                        ${!loadingUsers
					? `<button class="${"button button-brand svelte-1qob01w"}">Load users (can take long and up to
                                50 MO of data)
                            </button>`
					: `Loading user data...`}
                    `;

					return (function (users) {
						return `
                        <div class="${"px-4 text-2xl mb-5 flex overflow-hidden"}"><h3 class="${""}">Sort by:</h3>
                            <h3 class="${"ml-3 -mt-2px"}"><strong class="${[
							"font-normal cursor-pointer ",
							( "text-primary" ) + " " + ( "text-3xl" )
						].join(" ").trim()}">alphabetic</strong>,
                                <strong class="${[
							"font-normal cursor-pointer",
							( "") + " " + ( "")
						].join(" ").trim()}">winrate</strong>,
                                <strong class="${[
							"font-normal cursor-pointer",
							( "") + " " + ( "")
						].join(" ").trim()}">coins</strong>,
                                <strong class="${[
							"font-normal cursor-pointer",
							( "") + " " + ( "")
						].join(" ").trim()}">games played</strong></h3></div>
                        <div class="${"flex"}"><div class="${"block"}">${validate_component(UsersArray, "UsersArray").$$render(
							$$result,
							{
								users: suspiciousBitches,
								color: "red",
								class: "mb-30"
							},
							{},
							{}
						)}
                                ${validate_component(UsersArray, "UsersArray").$$render($$result, { users, color: "blue" }, {}, {})}</div>
                            <div class="${"block ml-4 mt-2 "}"><p class="${"text-xl"}"><strong class="${"text-legendary text-2xl font-normal"}">PLAYERNAME</strong><br> player name in
                                    red
                                    means that it has been considered suspicious</p>
                                <p class="${"mt-6 text-xl"}"><svg viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-5 h-5 mb-2"}" style="${"fill: #fc1870"}"><path d="${"m20.46 11.992c0-.018 0-.038 0-.059 0-1.69-.507-3.261-1.376-4.571l.019.031-11.757 11.74c1.296.87 2.89 1.388 4.606 1.388h.026-.001.029c1.182 0 2.306-.25 3.321-.699l-.052.021c3.074-1.315 5.188-4.314 5.188-7.807 0-.015 0-.03 0-.045v.002zm-15.576 4.662 11.773-11.757c-1.29-.889-2.886-1.42-4.607-1.42-.025 0-.05 0-.074 0h.004c-.019 0-.041 0-.064 0-1.546 0-2.992.423-4.231 1.159l.038-.021c-2.544 1.51-4.223 4.244-4.223 7.369 0 1.736.518 3.352 1.408 4.7l-.02-.032zm19.066-4.662v.035c0 1.678-.35 3.273-.981 4.718l.03-.076c-1.842 4.36-6.082 7.363-11.024 7.363s-9.182-3.004-10.994-7.285l-.029-.078c-.601-1.379-.951-2.985-.951-4.674s.35-3.295.981-4.751l-.03.077c1.842-4.36 6.082-7.363 11.024-7.363s9.182 3.004 10.994 7.285l.029.078c.601 1.365.952 2.957.952 4.631v.041-.002z"}"></path></svg>
                                    Click to ban user (confirmation message always shows)
                                </p></div></div>
                    `;
					})(__value);
				})(users)}</div></div></div>`
			: ``}`
		: ``}`}`;
});

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Admin
});

/* src\routes\offline.svelte generated by Svelte v3.31.0 */

const Offline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return ``;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Offline
});

/* src\routes\privacy.svelte generated by Svelte v3.31.0 */

const Privacy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>Privacy policy | Winhalla</title>`, "")}`, "")}`;
});

var component_6 = /*#__PURE__*/Object.freeze({
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

	return `${isApiDown
	? `<div class="${"flex items-center justify-center h-screen-60 px-4 w-full lg:mt-10 mt-8 lg:mx-0"}"><div class="${"text-center"}"><p class="${"text-6xl lg:text-8xl"}">Our services are down</p><br>
            <p class="${"text-3xl lg:text-4xl text-mid-light"}">We will be back as soon as possible !</p></div></div>`
	: ``}`;
});

var component_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Status
});

/* src\routes\about.svelte generated by Svelte v3.31.0 */

const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

<h1>About this site</h1>

<p>This is the &#39;about&#39; page. There&#39;s not much here.</p>`;
});

var component_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': About
});

/* src\routes\terms.svelte generated by Svelte v3.31.0 */

const Terms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>Terms of use | Winhalla</title>`, "")}`, "")}`;
});

var component_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Terms
});

/* src\routes\tests\[id].svelte generated by Svelte v3.31.0 */

const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $page;
	const { page } = stores$1();
	$page = get_store_value(page);
	let id;

	page.subscribe(value => {
		console.log(value.params.id);
		id = value.params.id;
	});

	onMount(() => {
		id = document.location.pathname.split("/");
		id = id[id.length - 1];
	});

	$page = get_store_value(page);

	return `<div class="${"block m-20"}">${each([1, 2, 3, 4, 5, 6, 7, 8, 9], number => `<a href="${"/tests/" + escape(number)}">${escape(number)}</a> <br>`)}
    ${escape(id)}
    ${escape($page)}</div>`;
});

var component_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D
});

/* src\routes\help.svelte generated by Svelte v3.31.0 */

const Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>How it works | Winhalla</title>`, "")}`, "")}`;
});

var component_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Help
});

/* src\routes\link\[id].svelte generated by Svelte v3.31.0 */

async function preload$1({ params, query }) {
	let id = params.id;
	this.redirect(302, `create-account?link=https://winhalla.appspot.com/link/${id}`);
}

const U5Bidu5D$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>Redirecting...</title>`, "")}`, "")}
Redirecting to <a href="${"https://winhalla.appspot.com/create-account"}" class="${"text-primary underline"}">https://winhalla.app.com/create-account</a>`;
});

var component_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D$1,
    preload: preload$1
});

/* src\components\RefreshButton.svelte generated by Svelte v3.31.0 */

const css$d = {
	code: ".refresh-button.svelte-rn9nnu.svelte-rn9nnu{@apply flex px-7 items-center;}.refresh-button.svelte-rn9nnu div.svelte-rn9nnu{margin-top:-0.185rem}.refresh-button.svelte-rn9nnu svg.svelte-rn9nnu{@apply fill-current text-font w-5 animate-spin left-4;}",
	map: "{\"version\":3,\"file\":\"RefreshButton.svelte\",\"sources\":[\"RefreshButton.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    export let isRefreshing;\\r\\n    export let refreshMessage;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .refresh-button {\\r\\n        @apply flex px-7 items-center;\\r\\n    }\\r\\n\\r\\n    .refresh-button div {\\r\\n        margin-top: -0.185rem;\\r\\n    }\\r\\n    .refresh-button svg {\\r\\n        @apply fill-current text-font w-5 animate-spin left-4;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<button class=\\\"button button-brand refresh-button focus:outline-none\\\" on:click>\\r\\n    <div class:hidden={!isRefreshing} class=\\\"block\\\">\\r\\n        <svg viewBox=\\\"0 0 21 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n            <path\\r\\n                d=\\\"m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z\\\" />\\r\\n        </svg>\\r\\n    </div>\\r\\n    <p class:pl-3={isRefreshing} class=\\\"pl-3\\\">\\r\\n        {isRefreshing ? 'Refreshing' : refreshMessage}\\r\\n    </p>\\r\\n</button>\\r\\n\"],\"names\":[],\"mappings\":\"AAMI,eAAe,4BAAC,CAAC,AACb,OAAO,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,AAClC,CAAC,AAED,6BAAe,CAAC,GAAG,cAAC,CAAC,AACjB,UAAU,CAAE,SAAS,AACzB,CAAC,AACD,6BAAe,CAAC,GAAG,cAAC,CAAC,AACjB,OAAO,YAAY,CAAC,SAAS,CAAC,GAAG,CAAC,YAAY,CAAC,MAAM,CAAC,AAC1D,CAAC\"}"
};

const RefreshButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isRefreshing } = $$props;
	let { refreshMessage } = $$props;
	if ($$props.isRefreshing === void 0 && $$bindings.isRefreshing && isRefreshing !== void 0) $$bindings.isRefreshing(isRefreshing);
	if ($$props.refreshMessage === void 0 && $$bindings.refreshMessage && refreshMessage !== void 0) $$bindings.refreshMessage(refreshMessage);
	$$result.css.add(css$d);

	return `<button class="${"button button-brand refresh-button focus:outline-none svelte-rn9nnu"}"><div class="${["block svelte-rn9nnu", !isRefreshing ? "hidden" : ""].join(" ").trim()}"><svg viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-rn9nnu"}"><path d="${"m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z"}"></path></svg></div>
    <p class="${["pl-3", isRefreshing ? "pl-3" : ""].join(" ").trim()}">${escape(isRefreshing ? "Refreshing" : refreshMessage)}</p></button>`;
});

/* src\components\Infos.svelte generated by Svelte v3.31.0 */

const Infos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { pushError } = $$props;
	let { message } = $$props;
	if ($$props.pushError === void 0 && $$bindings.pushError && pushError !== void 0) $$bindings.pushError(pushError);
	if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);

	return `<div class="${"z-20 absolute right-0 top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary"}"><h3 class="${"text-primary text-3xl"}">${escape(message)}</h3>
    <p class="${"text-white text-2xl"}">${escape(pushError)}</p></div>`;
});

/* src\components\Quests.svelte generated by Svelte v3.31.0 */

const css$e = {
	code: ".quest.svelte-t2bftp.svelte-t2bftp{border-radius:10px;@apply relative overflow-hidden w-full my-4;}.quest-infos.svelte-t2bftp.svelte-t2bftp{@apply flex justify-between px-7 py-6;}.progress-container.svelte-t2bftp.svelte-t2bftp{@apply flex items-center;}svg.svelte-t2bftp.svelte-t2bftp{margin-bottom:0.15rem}.checkbox-active.svelte-t2bftp.svelte-t2bftp{width:1.1rem}.quest.svelte-t2bftp:hover span.svelte-t2bftp{left:0}span.svelte-t2bftp.svelte-t2bftp{left:-100%;transition:left 0.28s ease-in-out;width:100%;@apply absolute h-full top-0 bg-background flex items-center justify-center text-center;}.tip-text.svelte-t2bftp.svelte-t2bftp{padding-top:0.15rem}.text-light.svelte-t2bftp.svelte-t2bftp{color:#e2e2ea}",
	map: "{\"version\":3,\"file\":\"Quests.svelte\",\"sources\":[\"Quests.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi, getUser } from \\\"../utils/api\\\";\\r\\n    import RefreshButton from \\\"./RefreshButton.svelte\\\";\\r\\n    import { counter } from \\\"./store\\\";\\r\\n    import { onMount, onDestroy } from \\\"svelte\\\";\\r\\n    import io from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import Infos from \\\"./Infos.svelte\\\";\\r\\n    import ErrorAlert from \\\"./ErrorAlert.svelte\\\";\\r\\n\\r\\n    let countDown = [{}, {}];\\r\\n    export let data;\\r\\n    let error;\\r\\n    let socket;\\r\\n    let adError;\\r\\n    let info;\\r\\n    let user;\\r\\n    let waitingAd;\\r\\n    let waitingAdAccept = false;\\r\\n    let interval;\\r\\n\\r\\n    const calculateRarity = (reward, daily) => {\\r\\n        if (daily) {\\r\\n            if (reward == 100) return \\\"primary\\\";\\r\\n            if (reward == 200) return \\\"epic\\\";\\r\\n            if (reward == 400) return \\\"legendary\\\";\\r\\n        } else {\\r\\n            if (reward == 300) return \\\"primary\\\";\\r\\n            if (reward == 500) return \\\"epic\\\";\\r\\n            if (reward == 1000) return \\\"legendary\\\";\\r\\n        }\\r\\n    };\\r\\n\\r\\n    const calculateProgressBarWidth = (progress, goal) => {\\r\\n        const calculatedProgress = (progress / goal) * 100;\\r\\n        if (calculatedProgress < 0) {\\r\\n            return 2;\\r\\n        } else {\\r\\n            return calculatedProgress;\\r\\n        }\\r\\n    };\\r\\n\\r\\n    function startTimer(duration, i) {\\r\\n        let timer = duration,\\r\\n            days,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n\\r\\n        function calculateTime() {\\r\\n            if (--timer < 0) {\\r\\n                countDown.finished = true;\\r\\n                countDown[i].timer = \\\"Refresh for new quests\\\";\\r\\n                return;\\r\\n            }\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n            days = Math.floor(hours / 24);\\r\\n\\r\\n            hours = hours - days * 24;\\r\\n            hours = hours < 10 ? \\\"0\\\" + hours : hours;\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n            let errDetected;\\r\\n            let vars = [hours, minutes, days, seconds];\\r\\n            for (let i = 0; i < 4; i++) {\\r\\n                if (vars[i] == undefined || isNaN(vars[i])) errDetected = true;\\r\\n            }\\r\\n            if (errDetected) {\\r\\n                countDown[i].timer = \\\"Refreshing...\\\";\\r\\n                return countDown[i].speed = \\\"legendary\\\";\\r\\n            }\\r\\n            countDown[i].timer =\\r\\n                days != 0\\r\\n                    ? days + \\\":\\\" + hours + \\\":\\\" + minutes + \\\":\\\" + seconds\\r\\n                    : hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n            countDown[i].speed =\\r\\n                hours >= 6 || days > 0\\r\\n                    ? \\\"primary\\\"\\r\\n                    : hours >= 1\\r\\n                    ? \\\"accent\\\"\\r\\n                    : \\\"legendary\\\";\\r\\n        }\\r\\n\\r\\n        calculateTime();\\r\\n        setInterval(calculateTime, 1000);\\r\\n    }\\r\\n\\r\\n    try {\\r\\n        for (let i = 0; i < 2; i++) {\\r\\n            let d = i === 0 ? data.lastDaily : data.lastWeekly;\\r\\n            const endsIn = ((i === 0 ? d + 3600000 * 24 : d + 3600000 * 168) - Date.now()) / 1000;\\r\\n            if (endsIn < 1) {\\r\\n                countDown[i] = \\\"\\\";\\r\\n            } else {\\r\\n                startTimer(endsIn, i);\\r\\n            }\\r\\n        }\\r\\n    } catch (e) {\\r\\n        error = e;\\r\\n    }\\r\\n    onMount(async () => {\\r\\n        user = await getUser();\\r\\n        socket = io.io(apiUrl);\\r\\n        let stop = 0;\\r\\n        let advideostate = 0;\\r\\n        let tempNb;\\r\\n        let goal;\\r\\n        interval = setInterval(() => {\\r\\n            try {\\r\\n                if (stop > 0) {\\r\\n                    return stop--;\\r\\n                }\\r\\n                tempNb = JSON.parse(document.getElementById(\\\"transfer\\\").value);\\r\\n                goal = tempNb.goal ? tempNb.goal : goal;\\r\\n                tempNb = tempNb.state;\\r\\n                if (tempNb !== advideostate) {\\r\\n                    socket.emit(\\\"advideo\\\", tempNb === 1 ? {\\r\\n                        state: 1,\\r\\n                        steamId: user.steam.id,\\r\\n                        shopItemId: 0,\\r\\n                        goal: goal\\r\\n                    } : { state: tempNb, steamId: user.steam.id });\\r\\n                }\\r\\n                advideostate = tempNb;\\r\\n            } catch (e) {\\r\\n                \\r\\n            }\\r\\n        }, 1200);\\r\\n        socket.on(\\\"advideo\\\", async (e) => {\\r\\n            console.log(e);\\r\\n            if (e.code === \\\"error\\\") {\\r\\n                console.log(e.message);\\r\\n                stop = 2;\\r\\n                advideostate = 0;\\r\\n                tempNb = 0;\\r\\n                adError = e.message;\\r\\n                setTimeout(() => {\\r\\n                    adError = undefined;\\r\\n                }, 12000);\\r\\n            } else if (e.code === \\\"success\\\") {\\r\\n                stop = 2;\\r\\n                info = e.message;\\r\\n                advideostate = 0;\\r\\n                tempNb;\\r\\n                setTimeout(() => {\\r\\n                    info = undefined;\\r\\n                }, 5000);\\r\\n                counter.set({ refresh: true });\\r\\n                if (waitingAd) {\\r\\n                    collect(waitingAd.type, waitingAd.index, false);\\r\\n                }\\r\\n            } else {\\r\\n                console.log(\\\"code not supported\\\");\\r\\n            }\\r\\n        });\\r\\n    });\\r\\n\\r\\n    function calculateOrder(object) {\\r\\n        //Reorder quests by rarety\\r\\n        if (object.dailyQuests) {\\r\\n            object.dailyQuests.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.finished && object.finished.daily) {\\r\\n            object.finished.daily.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.weeklyQuests) {\\r\\n            object.weeklyQuests.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.finished && object.finished.weekly) {\\r\\n            object.finished.weekly.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n    }\\r\\n\\r\\n    data = data;\\r\\n    calculateOrder(data);\\r\\n\\r\\n    let isRefreshingQuests = false;\\r\\n\\r\\n    async function handleRefresh() {\\r\\n        try {\\r\\n            isRefreshingQuests = true;\\r\\n\\r\\n            const refreshedData = await callApi(\\\"get\\\", \\\"solo\\\");\\r\\n            console.log(refreshedData);\\r\\n            calculateOrder(refreshedData.solo);\\r\\n            data = refreshedData.solo;\\r\\n\\r\\n            isRefreshingQuests = false;\\r\\n        } catch (e) {\\r\\n            isRefreshingQuests = false;\\r\\n        }\\r\\n    };\\r\\n\\r\\n    function acceptAd(accepted) {\\r\\n        if (accepted) document.getElementById(\\\"playAd\\\").onclick(\\\"earnMoreQuests\\\");\\r\\n        if (!accepted) {\\r\\n            collect(waitingAd.type,waitingAd.index,false)\\r\\n        }\\r\\n        waitingAdAccept = false;\\r\\n    }\\r\\n\\r\\n    async function collect(type, index, possibleAd) {\\r\\n        let probability;\\r\\n        if (possibleAd) probability = Math.floor(Math.random() * 3);\\r\\n        if (probability === 2) {\\r\\n            waitingAdAccept = true;\\r\\n            waitingAd = { type, index };\\r\\n            console.log(\\\"waitingAdAccept\\\");\\r\\n        } else {\\r\\n            await callApi(\\\"post\\\", `solo/collect?type=${type}&index=${index}`);\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n            data.collected[type].push(...data.finished[type].splice(index, 1));\\r\\n            data = data;\\r\\n        }\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .quest {\\r\\n        border-radius: 10px;\\r\\n        @apply relative overflow-hidden w-full my-4;\\r\\n    }\\r\\n\\r\\n    .quest-infos {\\r\\n        @apply flex justify-between px-7 py-6;\\r\\n    }\\r\\n\\r\\n    .progress-container {\\r\\n        @apply flex items-center;\\r\\n    }\\r\\n\\r\\n    svg {\\r\\n        margin-bottom: 0.15rem;\\r\\n    }\\r\\n\\r\\n    .checkbox-active {\\r\\n        width: 1.1rem;\\r\\n    }\\r\\n\\r\\n    .quest:hover span {\\r\\n        left: 0;\\r\\n    }\\r\\n\\r\\n    span {\\r\\n        left: -100%;\\r\\n        transition: left 0.28s ease-in-out;\\r\\n        width: 100%;\\r\\n        @apply absolute h-full top-0 bg-background flex items-center justify-center text-center;\\r\\n    }\\r\\n\\r\\n    .tip-text {\\r\\n        padding-top: 0.15rem;\\r\\n    }\\r\\n\\r\\n    .text-light {\\r\\n        color: #e2e2ea;\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n<!--TODO: Afficher reward des quêtes sur mobile-->\\r\\n\\r\\n\\r\\n<div>\\r\\n    {#if waitingAdAccept}\\r\\n        <div class=\\\"absolute top-1/3 left-40% rounded-lg p-16 z-30 border-primary border bg-background text-center\\\">\\r\\n            <style>\\r\\n                .button-alternative {\\r\\n                    display: inline-block;\\r\\n                    padding: calc(0.5rem - 1px) calc(2.25rem - 1px);\\r\\n                    border-radius: 0.125rem;\\r\\n                    border-width: 1px;\\r\\n                    border-color: #3d72e4;\\r\\n                    font-size: 1.25rem;\\r\\n                }\\r\\n            </style>\\r\\n            <h1 class=\\\"text-2xl\\\">Watch an ad to earn x2 coins for your next quest</h1>\\r\\n            <button on:click={()=>acceptAd(true)} class=\\\"button button-brand\\\">Play ad</button>\\r\\n            <button on:click={()=>acceptAd(false)} class=\\\"bg-background button-alternative button-brand\\\">No thanks\\r\\n            </button>\\r\\n        </div>\\r\\n    {/if}\\r\\n    {#if error}\\r\\n        <p class=\\\"text-legendary w-full\\\">An error has been detected by our fellow erroR0B0T, quests might appear\\r\\n            weirdly. </p>\\r\\n        <p class=\\\"text-xl\\\" style=\\\"color: #666666\\\"><b class=\\\"font-normal\\\" style=\\\"color: #aaaaaa\\\">Details:</b> {error}</p>\\r\\n    {/if}\\r\\n    <div class=\\\"container md:flex mt-7 md:mt-20 lg:mt-7 w-auto\\\">\\r\\n        <div\\r\\n            class=\\\"ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8\\\">\\r\\n            <div class=\\\"lg:flex\\\">\\r\\n                <h2 class=\\\"text-6xl text-center lg:text-left\\\">Daily Quests</h2>\\r\\n                <p\\r\\n                    class=\\\"text-{countDown[0].speed} text-center lg:text-center lg:ml-5 text-3xl leading-none\\r\\n                    lg:pt-6\\\" class:text-xl={countDown[0].finished}>\\r\\n                    {#if countDown[0].timer} {countDown[0].timer} {/if}\\r\\n                </p>\\r\\n            </div>\\r\\n            <div class=\\\"quests-container\\\">\\r\\n                {#if data.finished && data.finished.daily}\\r\\n                    <div class=\\\"pb-1 \\\">\\r\\n                        {#each data.finished.daily as quest, i}\\r\\n                            <button\\r\\n                                on:click={() => collect('daily', i, true)}\\r\\n                                class=\\\"card quest finished border-2 border-{calculateRarity(quest.reward, true)}\\r\\n                                max-w-sm mx-auto lg:mx-0 block\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span>Click to collect</span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current checkbox-active\\r\\n                                            text-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                            viewBox=\\\"0 0 27 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Click to collect\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"line-through\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                            </button>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.dailyQuests}\\r\\n                    <div>\\r\\n                        {#each data.dailyQuests as quest}\\r\\n                            <div class=\\\"relative card quest max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span\\r\\n                                        class=\\\"text-{calculateRarity(quest.reward, true)}\\\">\\r\\n                                        {quest.reward}$\\r\\n                                    </span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current w-4 text-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                            viewBox=\\\"0 0 25 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            {quest.progress}/{quest.goal}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                    <p class=\\\"\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                                <div\\r\\n                                    class=\\\"absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                    style=\\\"width:{calculateProgressBarWidth(quest.progress, quest.goal)}%\\\" />\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.collected && data.collected.daily}\\r\\n                    <div class=\\\"pt-5\\\">\\r\\n                        {#each data.collected.daily as quest}\\r\\n                            <div\\r\\n                                class=\\\"card quest text-disabled italic max-w-sm\\r\\n                                mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <p class=\\\"mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Collected\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div\\r\\n            class=\\\"ml-5 mr-5 mt-12 md:ml-5 md:mr-0\\r\\n            md:mt-0\\\">\\r\\n            <div class=\\\"lg:flex\\\">\\r\\n                <h2 class=\\\"text-6xl text-center lg:text-left\\\">Weekly Quests</h2>\\r\\n                <p\\r\\n                    class=\\\"text-{countDown[1].speed} text-center lg:text-center lg:ml-5 text-3xl leading-none\\r\\n                    lg:pt-6\\\" class:text-xl={countDown[1].finished}>\\r\\n                    {#if countDown[1].timer} {countDown[1].timer} {/if}\\r\\n                </p>\\r\\n            </div>\\r\\n            <div class=\\\"quests-container\\\">\\r\\n                {#if data.finished && data.finished.weekly}\\r\\n                    <div class=\\\"pb-1\\\">\\r\\n                        {#each data.finished.weekly as quest, i}\\r\\n                            <button\\r\\n                                on:click={() => collect('weekly', i)}\\r\\n                                class=\\\"card quest finished border-2 border-{calculateRarity(quest.reward, false)}\\r\\n                                max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span>Click to collect</span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current checkbox-active\\r\\n                                            text-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                            viewBox=\\\"0 0 27 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Click to collect\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </button>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.weeklyQuests}\\r\\n                    <div>\\r\\n                        {#each data.weeklyQuests as quest}\\r\\n                            <div class=\\\"relative card quest max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span\\r\\n                                        class=\\\"text-{calculateRarity(quest.reward, false)}\\\">\\r\\n                                        {quest.reward}$\\r\\n                                    </span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current w-4 text-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                            viewBox=\\\"0 0 25 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            {quest.progress}/{quest.goal}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                    <p class=\\\"quest-goal\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                                <div\\r\\n                                    class=\\\"absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                    style=\\\"width: {calculateProgressBarWidth(quest.progress, quest.goal)}%\\\" />\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n                {#if data.collected && data.collected.weekly}\\r\\n                    <div class=\\\"pt-5\\\">\\r\\n                        {#each data.collected.weekly as quest}\\r\\n                            <div\\r\\n                                class=\\\"card quest text-disabled italic max-w-sm\\r\\n                                mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <p class=\\\"mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Collected\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n    <div\\r\\n        class=\\\"flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4\\r\\n        ml-5 lg:ml-0\\\">\\r\\n        <RefreshButton\\r\\n            on:click={() => handleRefresh()}\\r\\n            isRefreshing={isRefreshingQuests}\\r\\n            refreshMessage={'Refresh quests data'} />\\r\\n        <div class=\\\"flex lg:ml-8 items-center mt-4 lg:mt-0\\\">\\r\\n            <!--<div class=\\\"flex items-center \\\">\\r\\n                <div class=\\\"py-2 px-2 rounded-full bg-primary\\\">\\r\\n                    <svg\\r\\n                        class=\\\"w-3 h-3 fill-current\\\"\\r\\n                        viewBox=\\\"0 0 17 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\"/>\\r\\n                    </svg>\\r\\n                </div>\\r\\n            </div>-->\\r\\n            <svg\\r\\n                xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                class=\\\"w-9 text-primary\\\"\\r\\n                viewBox=\\\"0 0 576 512\\\">\\r\\n                <path\\r\\n                    fill=\\\"currentColor\\\"\\r\\n                    d=\\\"M569.517 440.013C587.975 472.007 564.806 512 527.94\\r\\n                    512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423\\r\\n                    23.985c18.467-32.009 64.72-31.951 83.154 0l239.94\\r\\n                    416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46\\r\\n                    46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418\\r\\n                    136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0\\r\\n                    11.635-4.982\\r\\n                    11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884\\r\\n                    0-12.356 5.78-11.981 12.654z\\\" />\\r\\n            </svg>\\r\\n            <p class=\\\"text-lg ml-3 lg:ml-2 tip-text text-light\\\">\\r\\n                Daily and Weekly quests data may take up to 30 minutes to\\r\\n                refresh\\r\\n            </p>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n<div>\\r\\n    <input id=\\\"transfer\\\" value=\\\"0\\\" hidden />\\r\\n    {#if info}\\r\\n        <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n    {/if}\\r\\n    {#if adError}\\r\\n        <ErrorAlert message=\\\"An error occured while watching the ad\\\" pushError={adError} />\\r\\n    {/if}\\r\\n    <script data-playerPro=\\\"current\\\">\\r\\n        function playAd(goal) {\\r\\n            const init = (api) => {\\r\\n                if (api) {\\r\\n                    api.on(\\\"AdVideoStart\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 1, goal });\\r\\n                        //api.setAdVolume(1);\\r\\n                        document.body.onblur = function() {\\r\\n                            //api.pauseAd();\\r\\n                        };\\r\\n                        document.body.onfocus = function() {\\r\\n                            //api.resumeAd();\\r\\n                        };\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoFirstQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 2 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoMidpoint\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 3 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoThirdQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 4 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoComplete\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 5 });\\r\\n                        setTimeout(() => {\\r\\n                            document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 0 });\\r\\n                        }, 1200);\\r\\n                        document.body.onblur = null;\\r\\n                        document.body.onfocus = null;\\r\\n                    });\\r\\n                } else {\\r\\n                    console.log(\\\"blank\\\");\\r\\n                }\\r\\n            };\\r\\n            var s = document.querySelector(\\\"script[data-playerPro=\\\\\\\"current\\\\\\\"]\\\");\\r\\n            //s.removeAttribute(\\\"data-playerPro\\\");\\r\\n            (playerPro = window.playerPro || []).push({\\r\\n                id: \\\"oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp\\\",\\r\\n                after: s,\\r\\n                init: init\\r\\n            });\\r\\n        }\\r\\n    </script>\\r\\n</div>\\r\\n<div hidden class=\\\"bg-epic text-epic bg-legendary text-legendary xl:mt-40 xl:ml-100 h-screen-90\\\"></div>\"],\"names\":[],\"mappings\":\"AAuOI,MAAM,4BAAC,CAAC,AACJ,aAAa,CAAE,IAAI,CACnB,OAAO,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,IAAI,CAAC,AAChD,CAAC,AAED,YAAY,4BAAC,CAAC,AACV,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,AAC1C,CAAC,AAED,mBAAmB,4BAAC,CAAC,AACjB,OAAO,IAAI,CAAC,YAAY,CAAC,AAC7B,CAAC,AAED,GAAG,4BAAC,CAAC,AACD,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,gBAAgB,4BAAC,CAAC,AACd,KAAK,CAAE,MAAM,AACjB,CAAC,AAED,oBAAM,MAAM,CAAC,IAAI,cAAC,CAAC,AACf,IAAI,CAAE,CAAC,AACX,CAAC,AAED,IAAI,4BAAC,CAAC,AACF,IAAI,CAAE,KAAK,CACX,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,WAAW,CAClC,KAAK,CAAE,IAAI,CACX,OAAO,QAAQ,CAAC,MAAM,CAAC,KAAK,CAAC,aAAa,CAAC,IAAI,CAAC,YAAY,CAAC,cAAc,CAAC,WAAW,CAAC,AAC5F,CAAC,AAED,SAAS,4BAAC,CAAC,AACP,WAAW,CAAE,OAAO,AACxB,CAAC,AAED,WAAW,4BAAC,CAAC,AACT,KAAK,CAAE,OAAO,AAClB,CAAC\"}"
};

function calculateOrder(object) {
	//Reorder quests by rarety
	if (object.dailyQuests) {
		object.dailyQuests.sort((b, a) => {
			return a.reward - b.reward;
		});
	}

	if (object.finished && object.finished.daily) {
		object.finished.daily.sort((b, a) => {
			return a.reward - b.reward;
		});
	}

	if (object.weeklyQuests) {
		object.weeklyQuests.sort((b, a) => {
			return a.reward - b.reward;
		});
	}

	if (object.finished && object.finished.weekly) {
		object.finished.weekly.sort((b, a) => {
			return a.reward - b.reward;
		});
	}
}

const Quests = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let countDown = [{}, {}];
	let { data } = $$props;
	let error;
	let socket;
	let adError;
	let info;
	let user;
	let interval;

	const calculateRarity = (reward, daily) => {
		if (daily) {
			if (reward == 100) return "primary";
			if (reward == 200) return "epic";
			if (reward == 400) return "legendary";
		} else {
			if (reward == 300) return "primary";
			if (reward == 500) return "epic";
			if (reward == 1000) return "legendary";
		}
	};

	const calculateProgressBarWidth = (progress, goal) => {
		const calculatedProgress = progress / goal * 100;

		if (calculatedProgress < 0) {
			return 2;
		} else {
			return calculatedProgress;
		}
	};

	function startTimer(duration, i) {
		let timer = duration, days, hours, minutes, seconds;

		function calculateTime() {
			if (--timer < 0) {
				countDown.finished = true;
				countDown[i].timer = "Refresh for new quests";
				return;
			}

			seconds = Math.floor(timer % 60);
			minutes = Math.floor(timer / 60 % 60);
			hours = Math.floor(timer / (60 * 60));
			days = Math.floor(hours / 24);
			hours = hours - days * 24;
			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			let errDetected;
			let vars = [hours, minutes, days, seconds];

			for (let i = 0; i < 4; i++) {
				if (vars[i] == undefined || isNaN(vars[i])) errDetected = true;
			}

			if (errDetected) {
				countDown[i].timer = "Refreshing...";
				return countDown[i].speed = "legendary";
			}

			countDown[i].timer = days != 0
			? days + ":" + hours + ":" + minutes + ":" + seconds
			: hours + ":" + minutes + ":" + seconds;

			countDown[i].speed = hours >= 6 || days > 0
			? "primary"
			: hours >= 1 ? "accent" : "legendary";
		}

		calculateTime();
		setInterval(calculateTime, 1000);
	}

	try {
		for (let i = 0; i < 2; i++) {
			let d = i === 0 ? data.lastDaily : data.lastWeekly;
			const endsIn = ((i === 0 ? d + 3600000 * 24 : d + 3600000 * 168) - Date.now()) / 1000;

			if (endsIn < 1) {
				countDown[i] = "";
			} else {
				startTimer(endsIn, i);
			}
		}
	} catch(e) {
		error = e;
	}

	onMount(async () => {
		user = await getUser();
		socket = io__default['default'].io(apiUrl);
		let stop = 0;
		let advideostate = 0;
		let tempNb;
		let goal;

		interval = setInterval(
			() => {
				try {
					if (stop > 0) {
						return stop--;
					}

					tempNb = JSON.parse(document.getElementById("transfer").value);
					goal = tempNb.goal ? tempNb.goal : goal;
					tempNb = tempNb.state;

					if (tempNb !== advideostate) {
						socket.emit("advideo", tempNb === 1
						? {
								state: 1,
								steamId: user.steam.id,
								shopItemId: 0,
								goal
							}
						: { state: tempNb, steamId: user.steam.id });
					}

					advideostate = tempNb;
				} catch(e) {
					
				}
			},
			1200
		);

		socket.on("advideo", async e => {
			console.log(e);

			if (e.code === "error") {
				console.log(e.message);
				stop = 2;
				advideostate = 0;
				tempNb = 0;
				adError = e.message;

				setTimeout(
					() => {
						adError = undefined;
					},
					12000
				);
			} else if (e.code === "success") {
				stop = 2;
				info = e.message;
				advideostate = 0;

				setTimeout(
					() => {
						info = undefined;
					},
					5000
				);

				counter.set({ refresh: true });
			} else {
				console.log("code not supported");
			}
		});
	});

	data = data;
	calculateOrder(data);
	let isRefreshingQuests = false;

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$e);

	return `


<div>${ ``}
    ${error
	? `<p class="${"text-legendary w-full"}">An error has been detected by our fellow erroR0B0T, quests might appear
            weirdly. </p>
        <p class="${"text-xl"}" style="${"color: #666666"}"><b class="${"font-normal"}" style="${"color: #aaaaaa"}">Details:</b> ${escape(error)}</p>`
	: ``}
    <div class="${"container md:flex mt-7 md:mt-20 lg:mt-7 w-auto"}"><div class="${"ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8"}"><div class="${"lg:flex"}"><h2 class="${"text-6xl text-center lg:text-left"}">Daily Quests</h2>
                <p class="${[
		"text-" + escape(countDown[0].speed) + " text-center lg:text-center lg:ml-5 text-3xl leading-none\r\n                    lg:pt-6" + " svelte-t2bftp",
		countDown[0].finished ? "text-xl" : ""
	].join(" ").trim()}">${countDown[0].timer
	? `${escape(countDown[0].timer)}`
	: ``}</p></div>
            <div class="${"quests-container"}">${data.finished && data.finished.daily
	? `<div class="${"pb-1 "}">${each(data.finished.daily, (quest, i) => `<button class="${"card quest finished border-2 border-" + escape(calculateRarity(quest.reward, true)) + "\r\n                                max-w-sm mx-auto lg:mx-0 block" + " svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><span class="${"svelte-t2bftp"}">Click to collect</span>
                                    <div class="${"progress-container svelte-t2bftp"}"><svg class="${"fill-current checkbox-active\r\n                                            text-" + escape(calculateRarity(quest.reward, true)) + " svelte-t2bftp"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">Click to collect
                                        </p></div>

                                    <p class="${"line-through"}">${escape(quest.name)}</p></div>
                            </button>`)}</div>`
	: ``}

                ${data.dailyQuests
	? `<div>${each(data.dailyQuests, quest => `<div class="${"relative card quest max-w-sm mx-auto lg:mx-0 svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><span class="${"text-" + escape(calculateRarity(quest.reward, true)) + " svelte-t2bftp"}">${escape(quest.reward)}$
                                    </span>
                                    <div class="${"progress-container svelte-t2bftp"}"><svg class="${"fill-current w-4 text-" + escape(calculateRarity(quest.reward, true)) + " svelte-t2bftp"}" viewBox="${"0 0 25 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">${escape(quest.progress)}/${escape(quest.goal)}
                                        </p></div>
                                    <p class="${""}">${escape(quest.name)}</p></div>
                                <div class="${"absolute bottom-0 left-0 h-2px bg-" + escape(calculateRarity(quest.reward, true)) + " svelte-t2bftp"}" style="${"width:" + escape(calculateProgressBarWidth(quest.progress, quest.goal)) + "%"}"></div>
                            </div>`)}</div>`
	: ``}

                ${data.collected && data.collected.daily
	? `<div class="${"pt-5"}">${each(data.collected.daily, quest => `<div class="${"card quest text-disabled italic max-w-sm\r\n                                mx-auto lg:mx-0 svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><div class="${"progress-container svelte-t2bftp"}"><p class="${"mr-6 lg:mr-12 text-lg"}">Collected
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </div>`)}</div>`
	: ``}</div></div>
        <div class="${"ml-5 mr-5 mt-12 md:ml-5 md:mr-0\r\n            md:mt-0"}"><div class="${"lg:flex"}"><h2 class="${"text-6xl text-center lg:text-left"}">Weekly Quests</h2>
                <p class="${[
		"text-" + escape(countDown[1].speed) + " text-center lg:text-center lg:ml-5 text-3xl leading-none\r\n                    lg:pt-6" + " svelte-t2bftp",
		countDown[1].finished ? "text-xl" : ""
	].join(" ").trim()}">${countDown[1].timer
	? `${escape(countDown[1].timer)}`
	: ``}</p></div>
            <div class="${"quests-container"}">${data.finished && data.finished.weekly
	? `<div class="${"pb-1"}">${each(data.finished.weekly, (quest, i) => `<button class="${"card quest finished border-2 border-" + escape(calculateRarity(quest.reward, false)) + "\r\n                                max-w-sm mx-auto lg:mx-0" + " svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><span class="${"svelte-t2bftp"}">Click to collect</span>
                                    <div class="${"progress-container svelte-t2bftp"}"><svg class="${"fill-current checkbox-active\r\n                                            text-" + escape(calculateRarity(quest.reward, false)) + " svelte-t2bftp"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">Click to collect
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </button>`)}</div>`
	: ``}

                ${data.weeklyQuests
	? `<div>${each(data.weeklyQuests, quest => `<div class="${"relative card quest max-w-sm mx-auto lg:mx-0 svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><span class="${"text-" + escape(calculateRarity(quest.reward, false)) + " svelte-t2bftp"}">${escape(quest.reward)}$
                                    </span>
                                    <div class="${"progress-container svelte-t2bftp"}"><svg class="${"fill-current w-4 text-" + escape(calculateRarity(quest.reward, false)) + " svelte-t2bftp"}" viewBox="${"0 0 25 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">${escape(quest.progress)}/${escape(quest.goal)}
                                        </p></div>
                                    <p class="${"quest-goal"}">${escape(quest.name)}</p></div>
                                <div class="${"absolute bottom-0 left-0 h-2px bg-" + escape(calculateRarity(quest.reward, false)) + " svelte-t2bftp"}" style="${"width: " + escape(calculateProgressBarWidth(quest.progress, quest.goal)) + "%"}"></div>
                            </div>`)}</div>`
	: ``}
                ${data.collected && data.collected.weekly
	? `<div class="${"pt-5"}">${each(data.collected.weekly, quest => `<div class="${"card quest text-disabled italic max-w-sm\r\n                                mx-auto lg:mx-0 svelte-t2bftp"}"><div class="${"quest-infos svelte-t2bftp"}"><div class="${"progress-container svelte-t2bftp"}"><p class="${"mr-6 lg:mr-12 text-lg"}">Collected
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </div>`)}</div>`
	: ``}</div></div></div>
    <div class="${"flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4\r\n        ml-5 lg:ml-0"}">${validate_component(RefreshButton, "RefreshButton").$$render(
		$$result,
		{
			isRefreshing: isRefreshingQuests,
			refreshMessage: "Refresh quests data"
		},
		{},
		{}
	)}
        <div class="${"flex lg:ml-8 items-center mt-4 lg:mt-0"}">
            <svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-9 text-primary svelte-t2bftp"}" viewBox="${"0 0 576 512"}"><path fill="${"currentColor"}" d="${"M569.517 440.013C587.975 472.007 564.806 512 527.94\r\n                    512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423\r\n                    23.985c18.467-32.009 64.72-31.951 83.154 0l239.94\r\n                    416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46\r\n                    46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418\r\n                    136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0\r\n                    11.635-4.982\r\n                    11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884\r\n                    0-12.356 5.78-11.981 12.654z"}"></path></svg>
            <p class="${"text-lg ml-3 lg:ml-2 tip-text text-light svelte-t2bftp"}">Daily and Weekly quests data may take up to 30 minutes to
                refresh
            </p></div></div></div>
<div><input id="${"transfer"}" value="${"0"}" hidden>
    ${info
	? `${validate_component(Infos, "Infos").$$render(
			$$result,
			{
				message: "Thanks for watching a video",
				pushError: info
			},
			{},
			{}
		)}`
	: ``}
    ${adError
	? `${validate_component(ErrorAlert, "ErrorAlert").$$render(
			$$result,
			{
				message: "An error occured while watching the ad",
				pushError: adError
			},
			{},
			{}
		)}`
	: ``}
    <script data-playerPro="${"current"}">function playAd(goal) {
            const init = (api) => {
                if (api) {
                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 1, goal });
                        //api.setAdVolume(1);
                        document.body.onblur = function() {
                            //api.pauseAd();
                        };
                        document.body.onfocus = function() {
                            //api.resumeAd();
                        };
                    });
                    api.on("AdVideoFirstQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 2 });
                    });
                    api.on("AdVideoMidpoint", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 3 });
                    });
                    api.on("AdVideoThirdQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 4 });
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 5 });
                        setTimeout(() => {
                            document.getElementById("transfer").value = JSON.stringify({ state: 0 });
                        }, 1200);
                        document.body.onblur = null;
                        document.body.onfocus = null;
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\\"current\\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
    </script></div>
<div hidden class="${"bg-epic text-epic bg-legendary text-legendary xl:mt-40 xl:ml-100 h-screen-90"}"></div>`;
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

/* src\components\GuideCard.svelte generated by Svelte v3.31.0 */

const css$f = {
	code: "b.svelte-1fof41a{color:#3d72e4;font-weight:400}.scrollbar.svelte-1fof41a::-webkit-scrollbar{width:18px;height:18px;cursor:pointer}.scrollbar.svelte-1fof41a::-webkit-scrollbar-thumb{height:3px;border:6px solid rgba(0, 0, 0, 0);background-clip:padding-box;-webkit-border-radius:15px;background-color:#1C1C2C;-webkit-box-shadow:inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)}",
	map: "{\"version\":3,\"file\":\"GuideCard.svelte\",\"sources\":[\"GuideCard.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { getCookie } from \\\"../utils/getCookie\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n\\r\\n    export let page = \\\"\\\";\\r\\n    let isCardVisible = false;\\r\\n    let hiddenCardsList;\\r\\n\\r\\n    onMount(() => {\\r\\n        hiddenCardsList = JSON.parse(decodeURI(getCookie(\\\"hideCards\\\")).replace(/%2C/g, \\\",\\\"));\\r\\n\\r\\n        if (!hiddenCardsList || !hiddenCardsList.includes(page)) isCardVisible = true;\\r\\n    });\\r\\n\\r\\n\\r\\n    function handleClose() {\\r\\n        isCardVisible = false;\\r\\n\\r\\n        if (hiddenCardsList) {\\r\\n            !hiddenCardsList.includes(page) ? hiddenCardsList.push(page) : null;\\r\\n        } else {\\r\\n            hiddenCardsList = [page];\\r\\n        }\\r\\n\\r\\n        document.cookie = cookie.serialize(\\r\\n            \\\"hideCards\\\",\\r\\n            JSON.stringify(hiddenCardsList),\\r\\n            {\\r\\n                maxAge: 15552000,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            }\\r\\n        );\\r\\n\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        color: #3d72e4;\\r\\n        font-weight: 400;\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar {\\r\\n        width: 18px;\\r\\n        height: 18px;\\r\\n        cursor: pointer;\\r\\n\\r\\n        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/\\r\\n\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar-thumb {\\r\\n        height: 3px;\\r\\n        border: 6px solid rgba(0, 0, 0, 0);\\r\\n        background-clip: padding-box;\\r\\n        -webkit-border-radius: 15px;\\r\\n        background-color: #1C1C2C;\\r\\n        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);\\r\\n        /*outline: 1px solid slategrey;*/\\r\\n    }\\r\\n</style>\\r\\n\\r\\n{#if isCardVisible}\\r\\n    <div class=\\\"absolute z-50 top-0 bottom-0 left-0 right-0     h-screen\\\">\\r\\n        <div class=\\\"w-full md:w-3/4   fixed top-1/2 left-1/2  px-5 md:px-0\\\"\\r\\n             style=\\\"transform: translate(-50%, -46.5%);\\\" transition:fly={{ y: 300, duration: 350 }}>\\r\\n            <div\\r\\n                class=\\\"w-full max-h-screen-85   border border-primary rounded-lg bg-background    flex flex-col justify-center\\\">\\r\\n\\r\\n                <div class=\\\"overflow-y-auto scrollbar p-6 md:p-10 pb-7\\\">\\r\\n                    <button class=\\\"absolute top-0 right-5 xl:right-0  p-4 text-mid-light hover:text-font\\\"\\r\\n                            on:click={() => handleClose()}>\\r\\n                        <svg class=\\\"fill-current w-4\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                d=\\\"m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z\\\" />\\r\\n                        </svg>\\r\\n                    </button>\\r\\n                    {#if page === \\\"play\\\"}\\r\\n                        <h2 class=\\\"text-center text-5xl\\\">PLAY PAGE GUIDE</h2>\\r\\n\\r\\n                        <section class=\\\"md:flex justify-between mt-8\\\">\\r\\n                            <div>\\r\\n                                <p class=\\\"text-3xl text-legendary\\\">Game modes section</p>\\r\\n                                <p><b>Click </b> on the game mode <b>you want to play</b> !</p>\\r\\n                            </div>\\r\\n                            <img class=\\\"w-full mt-2 md:mt-0 md:w-1/2 md:h-41 object-cover\\\"\\r\\n                                 src=\\\"/assets/GuidesImages/game_modes_section.png\\\"\\r\\n                                 alt=\\\"Game modes section\\\">\\r\\n                        </section>\\r\\n\\r\\n                        <section class=\\\"md:flex justify-between mt-16 mb-4\\\">\\r\\n                            <img class=\\\"hidden md:block w-1/2 h-41 object-cover object-left-top\\\"\\r\\n                                 src=\\\"/assets/GuidesImages/quests_section.png\\\"\\r\\n                                 alt=\\\"\\\">\\r\\n                            <div class=\\\"md:ml-10\\\">\\r\\n                                <p class=\\\"text-3xl text-legendary\\\">Quests section</p>\\r\\n                                <p>Here you will find the <b>quests</b> that Winhalla proposes. <b>Complete them</b> by\\r\\n                                    playing\\r\\n                                    Brawlhalla, and you will <b>earn</b> W coins!\\r\\n                                    <br> <span class=\\\"text-xl leading-tight italic text-mid-light\\\">Click or hover on a quest to see how much you will earn ;)</span>\\r\\n                                </p>\\r\\n                            </div>\\r\\n                            <img class=\\\"md:hidden block w-full mt-5\\\"\\r\\n                                 src=\\\"/assets/GuidesImages/quests_section.png\\\"\\r\\n                                 alt=\\\"Quests section\\\">\\r\\n                        </section>\\r\\n                    {:else if page === \\\"ffa\\\"}\\r\\n                        <h2 class=\\\"text-center text-5xl\\\">FFA PAGE GUIDE</h2>\\r\\n\\r\\n                        <section class=\\\"mt-10 md:mt-16 text-center text-green\\\"><p>Only Brawlhalla <u>ranked games will\\r\\n                            count</u>\\r\\n                            in this game mode. You can play <u>1vs1</u> or <u>2vs2!</u></p></section>\\r\\n\\r\\n                        <section class=\\\"md:flex justify-between mt-12\\\">\\r\\n                            <div>\\r\\n                                <p class=\\\"text-3xl text-legendary\\\">Player cards</p>\\r\\n                                <p><b>Each player</b> that will join the lobby will be represented by a <b>player\\r\\n                                    card</b> ,\\r\\n                                    with a username, and the <b>number of games</b> he played in this FFA match. You\\r\\n                                    will see\\r\\n                                    your <b>number of wins</b> on <b>your</b> player card.</p>\\r\\n                            </div>\\r\\n                            <img\\r\\n                                class=\\\"mt-2 w-5/6 mx-auto block max-w-xs px-8  md:px-0 md:max-w-full  md:mt-0 md:mx-0 md:w-1/2 md:h-64 object-contain \\\"\\r\\n                                src=\\\"/assets/GuidesImages/ffa_player_card.png\\\"\\r\\n                                alt=\\\"FFA player card example\\\">\\r\\n                        </section>\\r\\n\\r\\n                        <section class=\\\"md:flex justify-between mt-8 mb-2\\\">\\r\\n                            <img class=\\\"hidden md:block  w-1/2 h-41 object-contain object-left-top\\\"\\r\\n                                 src=\\\"/assets/GuidesImages/ffa_buttons.png\\\"\\r\\n                                 alt=\\\"FFA action buttons\\\">\\r\\n                            <div class=\\\"md:ml-10\\\">\\r\\n                                <p class=\\\"text-3xl text-legendary\\\">Action buttons</p>\\r\\n                                <p>The <b>QUIT</b> button let's you <b>quit the lobby</b> when you still <b>haven't\\r\\n                                    played\\r\\n                                    any games</b>.\\r\\n                                    <br> When you <b>click</b> the <b>REFRESH DATA</b> button, your <b>player card</b>\\r\\n                                    will be\\r\\n                                    <b>updated</b> for <b>you</b> and the <b>other players</b> in the lobby.\\r\\n                                    <br> <span class=\\\"text-xl leading-tight italic text-mid-light\\\">If your data doesn't get updated when you click on the button, wait around 5 minutes before clicking it again!</span>\\r\\n                                </p>\\r\\n                            </div>\\r\\n                            <img class=\\\"block max-w-xs md:max-w-full  md:hidden   w-full mt-5 \\\"\\r\\n                                 src=\\\"/assets/GuidesImages/ffa_buttons.png\\\"\\r\\n                                 alt=\\\"FFA action buttons\\\">\\r\\n                        </section>\\r\\n                    {/if}\\r\\n\\r\\n\\r\\n                    <button class=\\\"button button-brand mt-10 w-full ml-2 md:ml-0\\\"\\r\\n                            on:click={() => handleClose()}>LET'S\\r\\n                        GO!\\r\\n                    </button>\\r\\n                </div>\\r\\n\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n\\r\\n    </div>\\r\\n{:else}\\r\\n    <div class=\\\"flex lg:block justify-center\\\">\\r\\n        <button class=\\\"absolute fixed bottom-0  flex items-center  mx-24 py-3 focus:outline-none\\\"\\r\\n                in:fly={{ y: 100, duration: 400 }} out:fly|local={{ y: 100, duration: 900 }}\\r\\n                on:click={() => isCardVisible = true}>\\r\\n\\r\\n            <div class=\\\"py-2 px-2 rounded-full bg-primary mb-1\\\">\\r\\n                <svg\\r\\n                    class=\\\"w-3 h-3 fill-current my-auto\\\"\\r\\n                    viewBox=\\\"0 0 17 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\\"ml-2 text-xl\\\">\\r\\n                Show guide\\r\\n            </div>\\r\\n        </button>\\r\\n    </div>\\r\\n\\r\\n{/if}\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AAyCI,CAAC,eAAC,CAAC,AACC,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,yBAAU,mBAAmB,AAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,AAInB,CAAC,AAED,yBAAU,yBAAyB,AAAC,CAAC,AACjC,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClC,eAAe,CAAE,WAAW,CAC5B,qBAAqB,CAAE,IAAI,CAC3B,gBAAgB,CAAE,OAAO,CACzB,kBAAkB,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AAEtG,CAAC\"}"
};

const GuideCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { page = "" } = $$props;
	let isCardVisible = false;
	let hiddenCardsList;

	onMount(() => {
		hiddenCardsList = JSON.parse(decodeURI(getCookie("hideCards")).replace(/%2C/g, ","));
		if (!hiddenCardsList || !hiddenCardsList.includes(page)) isCardVisible = true;
	});

	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	$$result.css.add(css$f);

	return `${isCardVisible
	? `<div class="${"absolute z-50 top-0 bottom-0 left-0 right-0     h-screen"}"><div class="${"w-full md:w-3/4   fixed top-1/2 left-1/2  px-5 md:px-0"}" style="${"transform: translate(-50%, -46.5%);"}"><div class="${"w-full max-h-screen-85   border border-primary rounded-lg bg-background    flex flex-col justify-center"}"><div class="${"overflow-y-auto scrollbar p-6 md:p-10 pb-7 svelte-1fof41a"}"><button class="${"absolute top-0 right-5 xl:right-0  p-4 text-mid-light hover:text-font"}"><svg class="${"fill-current w-4"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z"}"></path></svg></button>
                    ${page === "play"
		? `<h2 class="${"text-center text-5xl"}">PLAY PAGE GUIDE</h2>

                        <section class="${"md:flex justify-between mt-8"}"><div><p class="${"text-3xl text-legendary"}">Game modes section</p>
                                <p><b class="${"svelte-1fof41a"}">Click </b> on the game mode <b class="${"svelte-1fof41a"}">you want to play</b> !</p></div>
                            <img class="${"w-full mt-2 md:mt-0 md:w-1/2 md:h-41 object-cover"}" src="${"/assets/GuidesImages/game_modes_section.png"}" alt="${"Game modes section"}"></section>

                        <section class="${"md:flex justify-between mt-16 mb-4"}"><img class="${"hidden md:block w-1/2 h-41 object-cover object-left-top"}" src="${"/assets/GuidesImages/quests_section.png"}" alt="${""}">
                            <div class="${"md:ml-10"}"><p class="${"text-3xl text-legendary"}">Quests section</p>
                                <p>Here you will find the <b class="${"svelte-1fof41a"}">quests</b> that Winhalla proposes. <b class="${"svelte-1fof41a"}">Complete them</b> by
                                    playing
                                    Brawlhalla, and you will <b class="${"svelte-1fof41a"}">earn</b> W coins!
                                    <br> <span class="${"text-xl leading-tight italic text-mid-light"}">Click or hover on a quest to see how much you will earn ;)</span></p></div>
                            <img class="${"md:hidden block w-full mt-5"}" src="${"/assets/GuidesImages/quests_section.png"}" alt="${"Quests section"}"></section>`
		: `${page === "ffa"
			? `<h2 class="${"text-center text-5xl"}">FFA PAGE GUIDE</h2>

                        <section class="${"mt-10 md:mt-16 text-center text-green"}"><p>Only Brawlhalla <u>ranked games will
                            count</u>
                            in this game mode. You can play <u>1vs1</u> or <u>2vs2!</u></p></section>

                        <section class="${"md:flex justify-between mt-12"}"><div><p class="${"text-3xl text-legendary"}">Player cards</p>
                                <p><b class="${"svelte-1fof41a"}">Each player</b> that will join the lobby will be represented by a <b class="${"svelte-1fof41a"}">player
                                    card</b> ,
                                    with a username, and the <b class="${"svelte-1fof41a"}">number of games</b> he played in this FFA match. You
                                    will see
                                    your <b class="${"svelte-1fof41a"}">number of wins</b> on <b class="${"svelte-1fof41a"}">your</b> player card.</p></div>
                            <img class="${"mt-2 w-5/6 mx-auto block max-w-xs px-8  md:px-0 md:max-w-full  md:mt-0 md:mx-0 md:w-1/2 md:h-64 object-contain "}" src="${"/assets/GuidesImages/ffa_player_card.png"}" alt="${"FFA player card example"}"></section>

                        <section class="${"md:flex justify-between mt-8 mb-2"}"><img class="${"hidden md:block  w-1/2 h-41 object-contain object-left-top"}" src="${"/assets/GuidesImages/ffa_buttons.png"}" alt="${"FFA action buttons"}">
                            <div class="${"md:ml-10"}"><p class="${"text-3xl text-legendary"}">Action buttons</p>
                                <p>The <b class="${"svelte-1fof41a"}">QUIT</b> button let&#39;s you <b class="${"svelte-1fof41a"}">quit the lobby</b> when you still <b class="${"svelte-1fof41a"}">haven&#39;t
                                    played
                                    any games</b>.
                                    <br> When you <b class="${"svelte-1fof41a"}">click</b> the <b class="${"svelte-1fof41a"}">REFRESH DATA</b> button, your <b class="${"svelte-1fof41a"}">player card</b>
                                    will be
                                    <b class="${"svelte-1fof41a"}">updated</b> for <b class="${"svelte-1fof41a"}">you</b> and the <b class="${"svelte-1fof41a"}">other players</b> in the lobby.
                                    <br> <span class="${"text-xl leading-tight italic text-mid-light"}">If your data doesn&#39;t get updated when you click on the button, wait around 5 minutes before clicking it again!</span></p></div>
                            <img class="${"block max-w-xs md:max-w-full  md:hidden   w-full mt-5 "}" src="${"/assets/GuidesImages/ffa_buttons.png"}" alt="${"FFA action buttons"}"></section>`
			: ``}`}


                    <button class="${"button button-brand mt-10 w-full ml-2 md:ml-0"}">LET&#39;S
                        GO!
                    </button></div></div></div></div>`
	: `<div class="${"flex lg:block justify-center"}"><button class="${"absolute fixed bottom-0  flex items-center  mx-24 py-3 focus:outline-none"}"><div class="${"py-2 px-2 rounded-full bg-primary mb-1"}"><svg class="${"w-3 h-3 fill-current my-auto"}" viewBox="${"0 0 17 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z"}"></path></svg></div>

            <div class="${"ml-2 text-xl"}">Show guide
            </div></button></div>`}`;
});

/* src\components\AdblockAlert.svelte generated by Svelte v3.31.0 */

const AdblockAlert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { user = {} } = $$props;
	let { quests = {} } = $$props;
	let adblocker = false;

	onMount(() => {
		//Adblock detector
		setTimeout(
			() => {
				if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
					if (!document.getElementById("vdngZEmaYJWQ")) {
						//Is blocking ads
						adblocker = true;
					}
				}
			},
			7000
		);
	});

	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	if ($$props.quests === void 0 && $$bindings.quests && quests !== void 0) $$bindings.quests(quests);

	return `<div><script src="${"/adblocker.js"}"></script></div>
${adblocker
	? `<div class="${"text-legendary"}">Please disable your adblocker, we use ads revenue to gift you free items :)</div>`
	: ``}`;
});

/* src\routes\play\index.svelte generated by Svelte v3.31.0 */

const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let quests;
	let error;
	let gameModesError;
	let gameModes;

	onMount(async () => {
		gameModes = [
			{
				name: "ffa",
				description: "Fight against <b>9</b> players!",
				goal: "Be the one who has the <b>most wins</b> out of <b>10 games</b>!",
				duration: "<b>30</b> - <b>50</b> minutes",
				available: true
			},
			{
				name: "2vs2",
				description: "Fight against an other <b>team</b>!",
				goal: "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
				duration: "<b>20</b> - <b>30</b> minutes",
				available: true
			}
		];

		try {
			//Check which game mode is enabled in config, and then adapt the property available of gameModes object.
			let gameModesStatus = await callApi("get", "/status");

			if (gameModesStatus instanceof Error && gameModesStatus.response.status !== 403) {
				gameModesError = `<p class="text-accent">Wow, an unexpected error occurred while processing gamemodes data, details for geeks below.</p> <p class="text-2xl mt-4">Note : This will be fix as fast as possible!</p><p class="text-2xl text-light">${gameModesStatus.toString()}</p>`;
			}

			if (gameModesStatus && !gameModesError) {
				gameModesStatus = gameModesStatus.find(s => s.name === "GAMEMODES STATUS");
				gameModesStatus = gameModesStatus.value;

				Object.keys(gameModesStatus).forEach(gameModeName => {
					const gameMode = gameModes.find(g => g.name === gameModeName.toLowerCase());
					gameMode.available = gameModesStatus[gameModeName];
					gameModes = gameModes;
				});
			}

			//Load quests for user
			quests = await callApi("get", "/getSolo");

			if (quests instanceof Error && quests.response.status !== 403) throw quests;
			if (quests instanceof Error && quests.response.status === 403) return;

			if (!quests.solo.lastDaily || !quests.solo.lastWeekly) {
				quests = await callApi("get", "/solo");
				if (quests instanceof Error && gameModesStatus.response.status !== 403) throw quests;
				quests = quests.solo;
			} else {
				quests = quests.solo;
			}
		} catch(err) {
			if (err.response) {
				if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
					error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
					return;
				} else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
					error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
					return;
				}
			}

			error = `<p class="text-accent">Oops, a problem occurred when loading Quests data :(</p><p class="text-2xl mt-4">Note : Try to login or try to reload the page!</p> <p class="text-xl text-light mt-2">${err.toString()}</p>`;
		}
	});

	return `${($$result.head += `${($$result.title = `<title>Play - Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhala. Earn rewards. | Legit & Free In-Game objects!\r\n        | Choose your gamemode here | Winhalla Play page"}" data-svelte="svelte-10bzsa"><script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-10bzsa"></script><link rel="${"canonical"}" href="${"https://winhalla.app/play"}" data-svelte="svelte-10bzsa">`, "")}
${!quests || (!quests.lastDaily || !quests.lastWeekly)
	? `<div class="${"z-50 bg-background absolute"}">${validate_component(Loading, "Loading").$$render($$result, { type: "inline" }, {}, {})}</div>`
	: ``}
${gameModesError && error
	? `<div class="${"w-full lg:mt-60 mt-25"}"><div class="${"text-center"}"><h2 class="${"lg:text-5xl text-3xl text-center text-legendary"}">Woooow, this page entirely crashed. Did you
                broke grandma&#39;s porcelain bowls?</h2>
            <h3 class="${"text-center lg:text-3xl text-2xl"}"><a href="${"/"}" class="${"underline text-primary"}">Wanna go to
                homepage</a> then ?</h3>
            <p class="${"text-light text-center pt-10"}">If this occurs regularly, maybe clear your cookies and cache. <br>
                If nothing works, just wait! we are surely working on an <b class="${"text-primary font-normal"}">AMAZING
                    UPDATE</b></p></div>
        <div class="${"font-normal cursor-pointer button text-center"}">Click for details
        </div>
        <p class="${["text-light",  "hidden" ].join(" ").trim()}">${error} <br><br> ${gameModesError}</p></div>`
	: `<div class="${"lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full"}"><div class="${"text-center lg:text-left"}"><h1 class="${"text-6xl leading-snug lg:leading-normal"}">Choose a game mode
            </h1></div>
        ${validate_component(AdblockAlert, "AdblockAlert").$$render($$result, { quests }, {}, {})}
        <div class="${"flex flex-col items-center lg:flex-wrap\r\n        lg:flex-row"}">${gameModesError
		? `<div class="${"lg:w-40% z-50 content-center lg:mt-60 mt-25 pb-20"}"><h2 class="${"lg:text-3xl text-2xl text-center"}">${gameModesError}</h2></div>`
		: `${gameModes
			? `<div class="${"lg:mb-10 lg:mr- mt-10 text-center\r\n            flex flex-col items-center md:flex-row lg:items-start"}">${validate_component(GameModeCards, "GameModeCards").$$render($$result, { gameModes }, {}, {})}</div>`
			: ``}`}
            <div class="${"pb-16 flex-grow lg:-ml-15"}">${error
		? `<div class="${"px-5 w-full content-center md:mt-15  lg:px-0  w-full"}"><h2 class="${"lg:text-3xl text-2xl text-center"}">${error}</h2></div>`
		: `${quests
			? `
                    ${quests.lastDaily && quests.lastWeekly
				? `<div class="${"lg:ml-15"}">${validate_component(Quests, "Quests").$$render($$result, { data: quests }, {}, {})}</div>`
				: ``}`
			: ``}`}</div></div></div>

    ${validate_component(GuideCard, "GuideCard").$$render($$result, { page: "play" }, {}, {})}`}
`;
});

var component_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Play
});

/* src\routes\play\ffa\index.svelte generated by Svelte v3.31.0 */

const Ffa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let error;

	onMount(async () => {
		let id;

		try {
			id = await callApi("get", "/lobby");
			if (id instanceof Error) throw id;
			console.log("id", id);

			if (!id) {
				goto(`${apiUrl}/auth/login`);
			}

			goto(`/play/ffa/${id}`);
		} catch(err) {
			if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
				error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
			} else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
				error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
			}
		}
	});

	return `${error
	? `<div class="${"w-full content-center lg:mt-60 mt-25 "}"><h2 class="${"lg:text-4xl text-3xl text-center"}">${escape(error)}</h2>
        <a href="${"/play"}"><p class="${"underline lg:text-3xl text-2xl  text-center text-primary"}">Go to play page</p></a></div>`
	: `${validate_component(Loading, "Loading").$$render($$result, { data: "Finding game..." }, {}, {})}`}`;
});

var component_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Ffa
});

/* src\components\FfaEnd.svelte generated by Svelte v3.31.0 */

const css$g = {
	code: "b.svelte-10uecpl{@apply text-primary font-normal;}.ffa-player.svelte-10uecpl{@apply relative w-53 h-88 text-center;}.ffa-player.svelte-10uecpl::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.68) 0%,\r\n                rgba(23, 23, 26, 0.88),\r\n                rgba(23, 23, 26, 0.95) 75%,\r\n                rgba(23, 23, 26, 0.98) 100%\r\n        )}.player-name.svelte-10uecpl{text-shadow:rgba(255, 255, 255, 0.4) 0px 0px 10px;@apply absolute z-10 top-16 left-0 right-0;}.stats.svelte-10uecpl{@apply absolute left-0 right-0 z-10;}.user.svelte-10uecpl{@apply w-60 h-100;}.user.svelte-10uecpl::after{background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.55) 0%,\r\n                rgba(23, 23, 26, 0.75),\r\n                rgba(23, 23, 26, 0.85) 75%,\r\n                rgba(23, 23, 26, 0.93) 100%\r\n        )}",
	map: "{\"version\":3,\"file\":\"FfaEnd.svelte\",\"sources\":[\"FfaEnd.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    export let players;\\r\\n    export let winners;\\r\\n    const data = winners.map(w => {\\r\\n        let array = [];\\r\\n        w.forEach((e, i) => {\\r\\n            //TODO: faire la même mais avec l'array winners au lieu de players\\r\\n            if (e == \\\"\\\") return\\r\\n            const winnerInPlayers = players.find(p => p.steamId == e.steamId);\\r\\n            array.push({\\r\\n                username: winnerInPlayers.username,\\r\\n                avatarURL: winnerInPlayers.avatarURL,\\r\\n                legends: winnerInPlayers.legends,\\r\\n                wins: winnerInPlayers.wins,\\r\\n                coinsEarned: e.coins,\\r\\n                multiplier: e.multiplier\\r\\n            });\\r\\n        });\\r\\n        return array;\\r\\n    });\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n\\r\\n    .ffa-player {\\r\\n        @apply relative w-53 h-88 text-center;\\r\\n    }\\r\\n\\r\\n    .ffa-player::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.68) 0%,\\r\\n                rgba(23, 23, 26, 0.88),\\r\\n                rgba(23, 23, 26, 0.95) 75%,\\r\\n                rgba(23, 23, 26, 0.98) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .player-name {\\r\\n        text-shadow: rgba(255, 255, 255, 0.4) 0px 0px 10px;\\r\\n        @apply absolute z-10 top-16 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute left-0 right-0 z-10;\\r\\n    }\\r\\n\\r\\n    .user {\\r\\n        @apply w-60 h-100;\\r\\n    }\\r\\n\\r\\n    .user::after {\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.55) 0%,\\r\\n                rgba(23, 23, 26, 0.75),\\r\\n                rgba(23, 23, 26, 0.85) 75%,\\r\\n                rgba(23, 23, 26, 0.93) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n\\r\\n    .timer {\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"\\\">\\r\\n    <div class=\\\"pl-7 lg:pl-24 pt-8 lg:pt-12\\\">\\r\\n        <div class=\\\"mode-timer lg:flex items-end\\\">\\r\\n            <h1 class=\\\"text-6xl\\\">Match Ended</h1>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n    <div class=\\\"flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24\\\">\\r\\n\\r\\n        <div class=\\\"flex flex-col items-center lg:flex-row\\\">\\r\\n\\r\\n            <!--Winner card-->\\r\\n            {#each data[0] as winner,i}\\r\\n                <div class:lg:ml-10={i>0} >\\r\\n                    <div>\\r\\n                        <div class=\\\"ffa-player card user\\\">\\r\\n                            <img\\r\\n                                src=\\\"/assets/CharactersBanners/{winner.legends}.png\\\"\\r\\n                                alt={winner.legends}\\r\\n                                class=\\\"block\\\" />\\r\\n\\r\\n                            <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                            <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                <p>\\r\\n                                    Games won: <b>{winner.wins}</b>/8\\r\\n                                </p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/each}\\r\\n\\r\\n            <!--2nd card-->\\r\\n            <!--If there is a 2nd (impossible if there is 2 1st)-->\\r\\n            {#if data[1] !== \\\"\\\"}\\r\\n                {#each data[1] as winner,i}\\r\\n                    <div class=\\\"mt-10 lg:ml-10\\\">\\r\\n                        <div>\\r\\n                            <div class=\\\"ffa-player card user\\\">\\r\\n                                <img\\r\\n                                    src=\\\"/assets/CharactersBanners/{winner.legends}.png\\\"\\r\\n                                    alt={winner.legends}\\r\\n                                    class=\\\"block\\\" />\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                                <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games won: <b>{winner.wins}</b>/8\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {/each}\\r\\n            {/if}\\r\\n\\r\\n            <!--3rd card-->\\r\\n            <!--If there is a third (impossible if there is 2 2nd)-->\\r\\n            {#if data[2] !== \\\"\\\"}\\r\\n                {#each data[2] as winner,i}\\r\\n                    <div class=\\\"mt-10 lg:mt-20 lg:ml-10\\\">\\r\\n                        <div>\\r\\n                            <div class=\\\"ffa-player card user\\\">\\r\\n                                <img\\r\\n                                    src=\\\"/assets/CharactersBanners/{winner.legends}.png\\\"\\r\\n                                    alt={winner.legends}\\r\\n                                    class=\\\"block\\\" />\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                                <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games won: <b>{winner.wins}</b>/8\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {/each}\\r\\n            {/if}\\r\\n        </div>\\r\\n        <div>\\r\\n            <div class=\\\"overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 \\\">\\r\\n                <div>\\r\\n                    <table class=\\\"card px-4 overflow-hidden mt-10 lg:mt-20\\\">\\r\\n                        <thead class=\\\"bg-primary \\\">\\r\\n                        <tr>\\r\\n                            <td class=\\\"px-6 py-3\\\">\\r\\n                                Rank\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-3\\\">\\r\\n                                Player\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-3\\\">\\r\\n                                Wins\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-3\\\">\\r\\n                                Earned\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-3\\\">\\r\\n                                Multiplier\\r\\n                            </td>\\r\\n                        </tr>\\r\\n                        </thead>\\r\\n                        <tbody class=\\\"divide-y-4 divide-background text-l\\\">\\r\\n                        <!--For each rank-->\\r\\n                        {#each data as winners,i}\\r\\n                            <!--For each player in rank-->\\r\\n                            {#each winners as winner}\\r\\n                                {#if winner.avatarURL || winner.username}\\r\\n                                    <tr class=\\\"text-center\\\">\\r\\n                                        <td class=\\\"px-6 py-2\\\">\\r\\n                                            <b class=\\\"font-normal\\\">{i + 1}</b>\\r\\n                                        </td>\\r\\n                                        <td class=\\\"flex items-center px-6 py-2\\\">\\r\\n                                            <img class=\\\"block w-10 h-10 rounded-full\\\" src={winner.avatarURL}\\r\\n                                                 alt={winner.username}>\\r\\n                                            <p class=\\\"pl-2\\\">{winner.username}</p>\\r\\n                                        </td>\\r\\n                                        <td class=\\\"px-6 py-2\\\">\\r\\n                                            <b class=\\\"text-primary font-normal\\\">{winner.wins}</b>/8\\r\\n                                        </td>\\r\\n                                        <td class=\\\"px-6 py-2\\\">\\r\\n                                            {winner.coinsEarned}\\r\\n                                        </td>\\r\\n                                        <td class=\\\"px-6 py-2\\\">\\r\\n                                            {winner.multiplier}\\r\\n                                        </td>\\r\\n                                    </tr>\\r\\n                                {/if}\\r\\n                            {/each  }\\r\\n                        {/each}\\r\\n                        </tbody>\\r\\n                    </table>\\r\\n                </div>\\r\\n\\r\\n            </div>\\r\\n\\r\\n        </div>\\r\\n\\r\\n    </div>\\r\\n\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAuBI,CAAC,eAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,WAAW,eAAC,CAAC,AACT,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,WAAW,CAAC,AAC1C,CAAC,AAED,0BAAW,OAAO,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,YAAY,eAAC,CAAC,AACV,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAClD,OAAO,QAAQ,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,AAC/C,CAAC,AAED,MAAM,eAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,AACxC,CAAC,AAED,KAAK,eAAC,CAAC,AACH,OAAO,IAAI,CAAC,KAAK,CAAC,AACtB,CAAC,AAED,oBAAK,OAAO,AAAC,CAAC,AACV,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC\"}"
};

const FfaEnd = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { players } = $$props;
	let { winners } = $$props;

	const data = winners.map(w => {
		let array = [];

		w.forEach((e, i) => {
			//TODO: faire la même mais avec l'array winners au lieu de players
			if (e == "") return;

			const winnerInPlayers = players.find(p => p.steamId == e.steamId);

			array.push({
				username: winnerInPlayers.username,
				avatarURL: winnerInPlayers.avatarURL,
				legends: winnerInPlayers.legends,
				wins: winnerInPlayers.wins,
				coinsEarned: e.coins,
				multiplier: e.multiplier
			});
		});

		return array;
	});

	if ($$props.players === void 0 && $$bindings.players && players !== void 0) $$bindings.players(players);
	if ($$props.winners === void 0 && $$bindings.winners && winners !== void 0) $$bindings.winners(winners);
	$$result.css.add(css$g);

	return `<div class="${""}"><div class="${"pl-7 lg:pl-24 pt-8 lg:pt-12"}"><div class="${"mode-timer lg:flex items-end"}"><h1 class="${"text-6xl"}">Match Ended</h1></div></div>

    <div class="${"flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24"}"><div class="${"flex flex-col items-center lg:flex-row"}">
            ${each(data[0], (winner, i) => `<div${add_classes([i > 0 ? "lg:ml-10" : ""].join(" ").trim())}><div><div class="${"ffa-player card user svelte-10uecpl"}"><img src="${"/assets/CharactersBanners/" + escape(winner.legends) + ".png"}"${add_attribute("alt", winner.legends, 0)} class="${"block"}">

                            <p class="${"player-name text-4xl svelte-10uecpl"}">${escape(winner.username)}</p>
                            <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-10uecpl"}"><p>Games won: <b class="${"svelte-10uecpl"}">${escape(winner.wins)}</b>/8
                                </p></div>
                        </div></div>
                </div>`)}

            
            
            ${data[1] !== ""
	? `${each(data[1], (winner, i) => `<div class="${"mt-10 lg:ml-10"}"><div><div class="${"ffa-player card user svelte-10uecpl"}"><img src="${"/assets/CharactersBanners/" + escape(winner.legends) + ".png"}"${add_attribute("alt", winner.legends, 0)} class="${"block"}">

                                <p class="${"player-name text-4xl svelte-10uecpl"}">${escape(winner.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-10uecpl"}"><p>Games won: <b class="${"svelte-10uecpl"}">${escape(winner.wins)}</b>/8
                                    </p></div>
                            </div></div>
                    </div>`)}`
	: ``}

            
            
            ${data[2] !== ""
	? `${each(data[2], (winner, i) => `<div class="${"mt-10 lg:mt-20 lg:ml-10"}"><div><div class="${"ffa-player card user svelte-10uecpl"}"><img src="${"/assets/CharactersBanners/" + escape(winner.legends) + ".png"}"${add_attribute("alt", winner.legends, 0)} class="${"block"}">

                                <p class="${"player-name text-4xl svelte-10uecpl"}">${escape(winner.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-10uecpl"}"><p>Games won: <b class="${"svelte-10uecpl"}">${escape(winner.wins)}</b>/8
                                    </p></div>
                            </div></div>
                    </div>`)}`
	: ``}</div>
        <div><div class="${"overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 "}"><div><table class="${"card px-4 overflow-hidden mt-10 lg:mt-20"}"><thead class="${"bg-primary "}"><tr><td class="${"px-6 py-3"}">Rank
                            </td>
                            <td class="${"px-6 py-3"}">Player
                            </td>
                            <td class="${"px-6 py-3"}">Wins
                            </td>
                            <td class="${"px-6 py-3"}">Earned
                            </td>
                            <td class="${"px-6 py-3"}">Multiplier
                            </td></tr></thead>
                        <tbody class="${"divide-y-4 divide-background text-l"}">
                        ${each(data, (winners, i) => `
                            ${each(winners, winner => `${winner.avatarURL || winner.username
	? `<tr class="${"text-center"}"><td class="${"px-6 py-2"}"><b class="${"font-normal svelte-10uecpl"}">${escape(i + 1)}</b></td>
                                        <td class="${"flex items-center px-6 py-2"}"><img class="${"block w-10 h-10 rounded-full"}"${add_attribute("src", winner.avatarURL, 0)}${add_attribute("alt", winner.username, 0)}>
                                            <p class="${"pl-2"}">${escape(winner.username)}</p></td>
                                        <td class="${"px-6 py-2"}"><b class="${"text-primary font-normal svelte-10uecpl"}">${escape(winner.wins)}</b>/8
                                        </td>
                                        <td class="${"px-6 py-2"}">${escape(winner.coinsEarned)}</td>
                                        <td class="${"px-6 py-2"}">${escape(winner.multiplier)}</td>
                                    </tr>`
	: ``}`)}`)}</tbody></table></div></div></div></div></div>`;
});

/* src\components\FfaWatchAd.svelte generated by Svelte v3.31.0 */

const css$h = {
	code: "b.svelte-50ouvz{@apply font-normal text-primary;}strong.svelte-50ouvz{@apply font-normal text-green;}",
	map: "{\"version\":3,\"file\":\"FfaWatchAd.svelte\",\"sources\":[\"FfaWatchAd.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    let randomInfo = Math.floor(Math.random() * 2);\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply font-normal text-primary;\\r\\n    }\\r\\n\\r\\n    strong {\\r\\n        @apply font-normal text-green;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"sm:flex    absolute top-0 bottom-0 left-0 right-0 z-10 bg-background bg-opacity-70\\\">\\r\\n    <!--TRANSPARENT PART-->\\r\\n    <div class=\\\"hidden md:block md:w-1/4 lg:w-1/2 2xl:w-3/5\\\"></div>\\r\\n    <!--<svg class=\\\"hidden lg:block inset-y-0 h-full w-48 absolute text-primary transform translate-x-1/2 right-1/2\\\" fill=\\\"currentColor\\\"\\r\\n         viewBox=\\\"0 0 100 100\\\" preserveAspectRatio=\\\"none\\\" aria-hidden=\\\"true\\\" xstyle=\\\"margin-right: -10.2rem\\\">\\r\\n        <polygon class=\\\"border-l border-primary\\\" points=\\\"50,0 100,0 50,100 0,100\\\"></polygon>\\r\\n    </svg>\\r\\n    <svg class=\\\"hidden lg:block inset-y-0 h-full w-48 z-10 text-background transform translate-x-1/2\\\" fill=\\\"currentColor\\\"\\r\\n         viewBox=\\\"0 0 100 100\\\" preserveAspectRatio=\\\"none\\\" aria-hidden=\\\"true\\\">\\r\\n        <polygon class=\\\"border-l border-primary\\\" points=\\\"50,0 100,0 50,100 0,100\\\"></polygon>\\r\\n    </svg>-->\\r\\n    <!--TEXT-->\\r\\n    <div class=\\\"bg-background w-full md:w-3/4  lg:w-1/2   2xl:w-2/5    h-full   md:border-l-2 border-primary\\\">\\r\\n        <div class=\\\"sm:flex sm:flex-col items-center justify-between mx-7 h-full\\\">\\r\\n            <div class=\\\"text-center\\\">\\r\\n                <h1 class=\\\"text-center md:text-left text-6xl   mt-8 sm:mt-13\\\">MULTIPLY YOUR REWARDS</h1>\\r\\n                <p class=\\\"text-3xl mt-7 lg:mt-12 max-w-md   \\\">Want to obtain a first <b>x5 boost</b> on the <b>coins</b>\\r\\n                    you\\r\\n                    will\\r\\n                    <b>win</b> by playing this match?</p>\\r\\n                <p class=\\\"text-2xl mt-4 text-mid-light italic\\\">Watch a short video by clicking the button below!</p>\\r\\n            </div>\\r\\n            {#if randomInfo == 1}\\r\\n                <div class=\\\"card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10\\\" style=\\\"max-width: 27.5rem\\\">\\r\\n                    <p class=\\\"mb-4 text-4xl text-primary\\\">Did you know?</p>\\r\\n                    <p>Watching at least <strong>2 videos per match</strong> will <u>divide</u> the time to earn a\\r\\n                        battle\\r\\n                        pass by <strong>10\\r\\n                            hours</strong>\\r\\n                </div>\\r\\n            {:else}\\r\\n                <div class=\\\"card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10\\\" style=\\\"max-width: 27.5rem\\\">\\r\\n                    <p class=\\\"mb-4 text-4xl text-primary\\\">Did you know?</p>\\r\\n                    <p>If you are first and you watch <strong>2 videos</strong> this match you will earn <strong>1000\\r\\n                        coins</strong> vs <b style=\\\"color: #fc1870\\\">100 coins</b> if you watch <b\\r\\n                        style=\\\"color: #fc1870\\\">0 video</b>\\r\\n                </div>\\r\\n            {/if}\\r\\n\\r\\n\\r\\n            <div class=\\\"mt-12 sm:mt-0 sm:mb-24\\\">\\r\\n                <div class=\\\"mt-4 flex flex-col items-center sm:items-start sm:flex-row\\\">\\r\\n                    <button class=\\\"button button-brand sm:mr-6 text-background items-center\\\"\\r\\n                            style=\\\"display: flex; background-color: #3de488; padding: 0.75rem 1.5rem\\\">\\r\\n                        <svg class=\\\"fill-current w-4 mr-2\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                d=\\\"m.001 1.165v21.669c.052.661.601 1.177 1.271 1.177.225 0 .436-.058.62-.16l-.006.003 21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672 0-1.223.521-1.27 1.181v.004z\\\" />\\r\\n                        </svg>\\r\\n                        WATCH VIDEO\\r\\n\\r\\n                    </button>\\r\\n                    <button class=\\\"button button-brand mt-5 sm:mt-0 mb-1\\\"\\r\\n                            style=\\\"background-color: #fc1870; padding: 0.75rem 1.5rem\\\">\\r\\n                        Continue\\r\\n                        to match\\r\\n                    </button>\\r\\n                </div>\\r\\n            </div>\\r\\n\\r\\n        </div>\\r\\n\\r\\n    </div>\\r\\n\\r\\n\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAKI,CAAC,cAAC,CAAC,AACC,OAAO,WAAW,CAAC,YAAY,CAAC,AACpC,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,OAAO,WAAW,CAAC,UAAU,CAAC,AAClC,CAAC\"}"
};

const FfaWatchAd = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let randomInfo = Math.floor(Math.random() * 2);
	$$result.css.add(css$h);

	return `<div class="${"sm:flex    absolute top-0 bottom-0 left-0 right-0 z-10 bg-background bg-opacity-70"}">
    <div class="${"hidden md:block md:w-1/4 lg:w-1/2 2xl:w-3/5"}"></div>
    
    
    <div class="${"bg-background w-full md:w-3/4  lg:w-1/2   2xl:w-2/5    h-full   md:border-l-2 border-primary"}"><div class="${"sm:flex sm:flex-col items-center justify-between mx-7 h-full"}"><div class="${"text-center"}"><h1 class="${"text-center md:text-left text-6xl   mt-8 sm:mt-13"}">MULTIPLY YOUR REWARDS</h1>
                <p class="${"text-3xl mt-7 lg:mt-12 max-w-md   "}">Want to obtain a first <b class="${"svelte-50ouvz"}">x5 boost</b> on the <b class="${"svelte-50ouvz"}">coins</b>
                    you
                    will
                    <b class="${"svelte-50ouvz"}">win</b> by playing this match?</p>
                <p class="${"text-2xl mt-4 text-mid-light italic"}">Watch a short video by clicking the button below!</p></div>
            ${randomInfo == 1
	? `<div class="${"card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10"}" style="${"max-width: 27.5rem"}"><p class="${"mb-4 text-4xl text-primary"}">Did you know?</p>
                    <p>Watching at least <strong class="${"svelte-50ouvz"}">2 videos per match</strong> will <u>divide</u> the time to earn a
                        battle
                        pass by <strong class="${"svelte-50ouvz"}">10
                            hours</strong></p></div>`
	: `<div class="${"card py-6 px-6 w-full mt-10 sm:mt-0 sm:w-auto sm:py-8 sm:px-10"}" style="${"max-width: 27.5rem"}"><p class="${"mb-4 text-4xl text-primary"}">Did you know?</p>
                    <p>If you are first and you watch <strong class="${"svelte-50ouvz"}">2 videos</strong> this match you will earn <strong class="${"svelte-50ouvz"}">1000
                        coins</strong> vs <b style="${"color: #fc1870"}" class="${"svelte-50ouvz"}">100 coins</b> if you watch <b style="${"color: #fc1870"}" class="${"svelte-50ouvz"}">0 video</b></p></div>`}


            <div class="${"mt-12 sm:mt-0 sm:mb-24"}"><div class="${"mt-4 flex flex-col items-center sm:items-start sm:flex-row"}"><button class="${"button button-brand sm:mr-6 text-background items-center"}" style="${"display: flex; background-color: #3de488; padding: 0.75rem 1.5rem"}"><svg class="${"fill-current w-4 mr-2"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m.001 1.165v21.669c.052.661.601 1.177 1.271 1.177.225 0 .436-.058.62-.16l-.006.003 21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672 0-1.223.521-1.27 1.181v.004z"}"></path></svg>
                        WATCH VIDEO

                    </button>
                    <button class="${"button button-brand mt-5 sm:mt-0 mb-1"}" style="${"background-color: #fc1870; padding: 0.75rem 1.5rem"}">Continue
                        to match
                    </button></div></div></div></div></div>`;
});

/* src\routes\play\ffa\[id].svelte generated by Svelte v3.31.0 */

const css$i = {
	code: "b.svelte-70gu27{@apply text-primary font-normal;}button.svelte-70gu27{background-color:#3de488;cursor:pointer}button.svelte-70gu27:disabled{@apply bg-disabled;;@apply text-white;;padding-left:1rem;padding-right:1rem;box-shadow:none;cursor:auto}.ffa-player.svelte-70gu27{@apply relative w-53 h-88 text-center;}.ffa-player.svelte-70gu27::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.68) 0%,\r\n                rgba(23, 23, 26, 0.88),\r\n                rgba(23, 23, 26, 0.95) 75%,\r\n                rgba(23, 23, 26, 0.98) 100%\r\n        )}.player-name.svelte-70gu27{text-shadow:rgba(255, 255, 255, 0.4) 0px 0px 10px;@apply absolute z-10 top-16 left-0 right-0;}.stats.svelte-70gu27{@apply absolute left-0 right-0 z-10;}.user.svelte-70gu27{@apply w-60 h-100;}.user.svelte-70gu27::after{background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.55) 0%,\r\n                rgba(23, 23, 26, 0.75),\r\n                rgba(23, 23, 26, 0.85) 75%,\r\n                rgba(23, 23, 26, 0.93) 100%\r\n        )}.timer.svelte-70gu27{margin-bottom:0.35rem}.quit.svelte-70gu27{@apply bg-legendary px-7;}",
	map: "{\"version\":3,\"file\":\"[id].svelte\",\"sources\":[\"[id].svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { onDestroy } from \\\"svelte\\\";\\r\\n    import { callApi } from \\\"../../../utils/api\\\";\\r\\n    import { goto, stores } from \\\"@sapper/app\\\";\\r\\n\\r\\n    import RefreshButton from \\\"../../../components/RefreshButton.svelte\\\";\\r\\n    import FfaEnd from \\\"../../../components/FfaEnd.svelte\\\";\\r\\n    import Loading from \\\"../../../components/Loading.svelte\\\";\\r\\n\\r\\n    import ErrorAlert from \\\"../../../components/ErrorAlert.svelte\\\";\\r\\n    import Infos from \\\"../../../components/Infos.svelte\\\";\\r\\n    import GuideCard from \\\"../../../components/GuideCard.svelte\\\";\\r\\n    import AdblockAlert from \\\"../../../components/AdblockAlert.svelte\\\";\\r\\n\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n\\r\\n    import { counter } from \\\"../../../components/store\\\";\\r\\n    import io from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../../../utils/config\\\";\\r\\n\\r\\n    import FfaWatchAd from \\\"../../../components/FfaWatchAd.svelte\\\";\\r\\n\\r\\n    const { page } = stores();\\r\\n\\r\\n    let id;\\r\\n\\r\\n    /*export let user;\\r\\n    export let match;\\r\\n    export let isMatchEnded;\\r\\n    export let countDown;\\r\\n\\r\\n    export let userPlayer;\\r\\n    export let players;*/\\r\\n    let pages;\\r\\n    let user;\\r\\n    let match;\\r\\n    let isMatchEnded;\\r\\n    let countDown;\\r\\n\\r\\n    let userPlayer;\\r\\n    let players;\\r\\n    let info;\\r\\n    let error;\\r\\n    let pushError;\\r\\n    let socket;\\r\\n    let adError;\\r\\n    let isLoadingOpen = true;\\r\\n    pages = page.subscribe(async value => {\\r\\n        user = undefined;\\r\\n        match = undefined;\\r\\n        isMatchEnded = undefined;\\r\\n        userPlayer = undefined;\\r\\n        players = undefined;\\r\\n        error = undefined;\\r\\n        socket = undefined;\\r\\n        id = value.params.id;\\r\\n        if (!value.params.id && !value.path.includes(\\\"/ffa/\\\")) return console.log(\\\"not a ffa match\\\");\\r\\n        else console.log(\\\"ffa match\\\");\\r\\n        let unsub = counter.subscribe((user1) => {\\r\\n            user = user1.content;\\r\\n        });\\r\\n        unsub();\\r\\n        //await user\\r\\n        //user = user.steam\\r\\n        try {\\r\\n            user = await user;\\r\\n            user = user.steam;\\r\\n            match = await callApi(\\\"get\\\", `/getMatch/${id}`);\\r\\n\\r\\n            if (match instanceof Error) {\\r\\n                throw match;\\r\\n            }\\r\\n            isMatchEnded = match.finished;\\r\\n            //Start the countdown\\r\\n\\r\\n            filterUsers(false);\\r\\n            const d = new Date(userPlayer.joinDate);\\r\\n            const endsIn = -(\\r\\n                (new Date().getTime() -\\r\\n                    new Date(d.setHours(d.getHours() + 3)).getTime()) /\\r\\n                1000\\r\\n            );\\r\\n            if (endsIn < 1) {\\r\\n                countDown = \\\"Waiting for others to finish (you can start a new game from the play page)\\\";\\r\\n            } else {\\r\\n                startTimer(endsIn);\\r\\n            }\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n\\r\\n            socket = io.io(apiUrl);\\r\\n            socket.on(\\\"connection\\\", (status) => {\\r\\n                console.log(status);\\r\\n                socket.emit(\\\"match connection\\\", \\\"FFA\\\" + id);\\r\\n            });\\r\\n\\r\\n            socket.on(\\\"join match\\\", (status) => {\\r\\n                console.log(status);\\r\\n            });\\r\\n\\r\\n            socket.on(\\\"lobbyUpdate\\\", (value) => {\\r\\n                match = value;\\r\\n                filterUsers(true);\\r\\n            });\\r\\n            isLoadingOpen = false;\\r\\n        } catch (err) {\\r\\n            if (err.response) {\\r\\n                if (err.response.status === 400 && err.response.data.includes(\\\"Play at least one ranked\\\")) {\\r\\n                    error = \\\"You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)\\\";\\r\\n                    return;\\r\\n                } else if (err.response.status === 400 && err.response.data.includes(\\\"Play at least one\\\")) {\\r\\n                    error = \\\"You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)\\\";\\r\\n                    return;\\r\\n                } else if (err.response.status === 404) error = \\\"<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>\\\";\\r\\n                return;\\r\\n            }\\r\\n            error = `<p class=\\\"text-accent\\\">Wow, unexpected error occured, details for geeks below.</p> <p class=\\\"text-2xl\\\">${err.toString()}</p>`;\\r\\n        }\\r\\n\\r\\n        let adVideos = 0;\\r\\n        let stop = 0;\\r\\n        let advideostate = 0;\\r\\n        let tempNb;\\r\\n        let interval = setInterval(() => {\\r\\n            try {\\r\\n                if (stop > 0) {\\r\\n                    return stop--;\\r\\n                }\\r\\n\\r\\n                tempNb = document.getElementById(\\\"transfer\\\").value;\\r\\n                if (tempNb !== advideostate) {\\r\\n                    if (tempNb !== 0) {\\r\\n                        socket.emit(\\\"advideo\\\", tempNb === \\\"1\\\" ? {\\r\\n                            state: 1,\\r\\n                            steamId: userPlayer.steamId,\\r\\n                            room: id,\\r\\n                            goal: \\\"earnMoreFFA\\\"\\r\\n                        } : { state: tempNb, steamId: userPlayer.steamId });\\r\\n                        console.log(tempNb);\\r\\n                    }\\r\\n                }\\r\\n                /*if(adVideos < tempNb){\\r\\n\\r\\n                console.log(info)\\r\\n            }*/\\r\\n                advideostate = tempNb;\\r\\n            } catch (e) {\\r\\n\\r\\n            }\\r\\n        }, 1000);\\r\\n\\r\\n        socket.on(\\\"advideo\\\", (e) => {\\r\\n            if (e.code === \\\"error\\\") {\\r\\n                console.log(e.message);\\r\\n                clearInterval(interval);\\r\\n                advideostate = 0;\\r\\n                tempNb = 0;\\r\\n                adVideos = 0;\\r\\n                adError = e.message;\\r\\n                setTimeout(() => {\\r\\n                    adError = undefined;\\r\\n                }, 25000);\\r\\n            } else if (e.code === \\\"success\\\") {\\r\\n                stop = 5;\\r\\n                info = e.message;\\r\\n                advideostate = 0;\\r\\n                tempNb;\\r\\n                userPlayer.adsWatched++;\\r\\n                userPlayer.multiplier += userPlayer.adsWatched === 1 ? 200:300;\\r\\n                adVideos = 0;\\r\\n                setTimeout(() => {\\r\\n                    info = undefined;\\r\\n                }, 5000);\\r\\n            }\\r\\n        });\\r\\n    });\\r\\n\\r\\n    onDestroy(pages);\\r\\n\\r\\n\\r\\n    const filterUsers = (isFromSocket) => {\\r\\n        //Find user's object\\r\\n        if (!isFromSocket) {\\r\\n            userPlayer = match.players.find(p => p.steamId === parseInt(user.id));\\r\\n        } else {\\r\\n            let playerIndex = match.players.findIndex(p => p.steamId === parseInt(user.id));\\r\\n            match.players[playerIndex].wins = userPlayer.wins;\\r\\n            userPlayer = match.players[playerIndex];\\r\\n        }\\r\\n        //Delete user's object from array.\\r\\n        players = [...match.players];\\r\\n        players.splice(\\r\\n            match.players.findIndex(p => p.steamId === parseInt(user.id)),\\r\\n            1\\r\\n        );\\r\\n    };\\r\\n\\r\\n    //Function that starts a timer with a date, and refreshes it every second\\r\\n\\r\\n    function startTimer(duration) {\\r\\n        let timer = duration,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            countDown = hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = duration;\\r\\n            }\\r\\n        }, 1000);\\r\\n    }\\r\\n\\r\\n    let videoSeen = 0;\\r\\n\\r\\n    //Function that handles the refresh button on click event\\r\\n    let isRefreshingStats = false;\\r\\n    const handleRefresh = async () => {\\r\\n        isRefreshingStats = true;\\r\\n        let winNb = userPlayer.gamesPlayed;\\r\\n\\r\\n        match = await callApi(\\\"get\\\", `/getMatch/${id}`);\\r\\n\\r\\n        filterUsers(false);\\r\\n        if (userPlayer.gamesPlayed !== winNb) {\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n        } else if (match.finished && isMatchEnded === false) {\\r\\n            isMatchEnded = true;\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n        }\\r\\n        isRefreshingStats = false;\\r\\n    };\\r\\n    const handleQuit = async () => {\\r\\n        try {\\r\\n            const exitStatus = await callApi(\\\"post\\\", `/exitMatch`);\\r\\n            if (exitStatus instanceof Error) throw exitStatus;\\r\\n            goto(`/play`);\\r\\n        } catch (e) {\\r\\n            pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n            setTimeout(() => {\\r\\n                pushError = undefined;\\r\\n            }, 8000);\\r\\n        }\\r\\n    };\\r\\n\\r\\n    let isInfoDropdownOpen = false;\\r\\n\\r\\n    function handleInfoDropdown() {\\r\\n        isInfoDropdownOpen = !isInfoDropdownOpen;\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n    button{\\r\\n        background-color: #3de488;\\r\\n        cursor: pointer;\\r\\n\\r\\n    }\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        @apply text-white;\\r\\n        padding-left: 1rem;\\r\\n        padding-right: 1rem;\\r\\n        box-shadow: none;\\r\\n        cursor: auto;\\r\\n    }\\r\\n\\r\\n    .ffa-player {\\r\\n        @apply relative w-53 h-88 text-center;\\r\\n    }\\r\\n\\r\\n    .ffa-player::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.68) 0%,\\r\\n                rgba(23, 23, 26, 0.88),\\r\\n                rgba(23, 23, 26, 0.95) 75%,\\r\\n                rgba(23, 23, 26, 0.98) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .player-name {\\r\\n        text-shadow: rgba(255, 255, 255, 0.4) 0px 0px 10px;\\r\\n        @apply absolute z-10 top-16 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute left-0 right-0 z-10;\\r\\n    }\\r\\n\\r\\n    .user {\\r\\n        @apply w-60 h-100;\\r\\n    }\\r\\n\\r\\n    .user::after {\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.55) 0%,\\r\\n                rgba(23, 23, 26, 0.75),\\r\\n                rgba(23, 23, 26, 0.85) 75%,\\r\\n                rgba(23, 23, 26, 0.93) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .timer {\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .quit {\\r\\n        @apply bg-legendary px-7;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Winhalla | FFA match</title>\\r\\n\\r\\n    <script async src=\\\"https://cdn.stat-rock.com/player.js\\\"></script>\\r\\n</svelte:head>\\r\\n{#if isLoadingOpen}\\r\\n    <div out:fade={{duration:500}} class=\\\"z-50 bg-background absolute\\\">\\r\\n        <Loading data={\\\"Loading game data...\\\"} />\\r\\n    </div>\\r\\n{/if}\\r\\n{#if error}\\r\\n    <div class=\\\"w-full content-center lg:mt-60 mt-25 \\\">\\r\\n        <h2 class=\\\"lg:text-5xl text-3xl text-center\\\">{@html error}</h2>\\r\\n        <a href=\\\"/play\\\"><p class=\\\"underline lg:text-3xl pt-4 text-2xl  text-center text-primary\\\">Go to play page</p></a>\\r\\n    </div>\\r\\n{:else}\\r\\n    {#if info}\\r\\n        <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n    {/if}\\r\\n    <div class=\\\"h-full  \\\">\\r\\n\\r\\n        {#if match}\\r\\n            {#if isMatchEnded}\\r\\n                <FfaEnd players={match.players} winners={match.winners} />\\r\\n            {:else}\\r\\n                <div class=\\\"h-full flex items-center flex-col lg:block lg:ml-24 z-0\\\">\\r\\n                    <div\\r\\n                        class=\\\"flex flex-col justify-center lg:flex-row\\r\\n                    lg:justify-between items-center lg:mt-12 mt-7\\\">\\r\\n                        <div\\r\\n                            class=\\\"mode-timer flex justify-center lg:justify-start\\r\\n                        items-end w-52 \\\">\\r\\n                            <h1 class=\\\"text-6xl leading-none\\\">FFA</h1>\\r\\n                            <p\\r\\n                                class=\\\"timer text-primary ml-5 text-3xl leading-none\\\">\\r\\n                                {#if countDown}{countDown}{:else}Loading...{/if}\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <AdblockAlert user=\\\"{userPlayer}\\\" />\\r\\n                        <div\\r\\n                            class=\\\"lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\\r\\n                        items-center\\\">\\r\\n                            <p class=\\\"text-center lg:text-left mx-4 mt-1 lg:mt-0\\\">You watched <strong\\r\\n                                class=\\\"text-green font-normal text-3xl\\\">{userPlayer.adsWatched}\\r\\n                                ad{userPlayer.adsWatched > 1 ? \\\"s\\\" : \\\"\\\"}</strong>, earnings will be multiplied by\\r\\n                                <strong class=\\\"text-green text-3xl font-normal\\\">{userPlayer.multiplier / 100}</strong>!\\r\\n                            </p>\\r\\n                            <button disabled={userPlayer.adsWatched >= 8} class=\\\"button button-brand lg:mr-8 mt-2\\r\\n                                lg:mt-0 mb-5\\r\\n                                lg:mb-0  text-background\\\"\\r\\n                                    onclick=\\\"playAd()\\\">{userPlayer.adsWatched < 8 ? \\\"Play ad\\\" : \\\"Maximum ads reached\\\"}\\r\\n                            </button>\\r\\n\\r\\n                            <RefreshButton\\r\\n                                on:click={() => handleRefresh()}\\r\\n                                isRefreshing={isRefreshingStats}\\r\\n                                refreshMessage={'Refresh data'} />\\r\\n                            {#if userPlayer.gamesPlayed == 0}\\r\\n                                <button\\r\\n                                    class=\\\"button button-brand quit lg:ml-4 mt-3\\r\\n                                lg:mt-0\\\" style=\\\"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;\\\"\\r\\n\\r\\n                                    on:click={() => handleQuit()}>\\r\\n                                    Quit lobby\\r\\n                                </button>\\r\\n                                {#if pushError}\\r\\n                                    <ErrorAlert message=\\\"There was an error exiting the match\\\" pushError={pushError} />\\r\\n                                {/if}\\r\\n                            {/if}\\r\\n\\r\\n                        </div>\\r\\n                    </div>\\r\\n\\r\\n                    <div\\r\\n                        class=\\\"flex items-center flex-col lg:flex-row lg:items-start\\r\\n                    h-full lg:mt-6\\\">\\r\\n                        <!--Main Player-->\\r\\n                        {#if userPlayer}\\r\\n                            <div class=\\\"mt-8 lg:mt-25 ffa-player card user\\\">\\r\\n                                <img\\r\\n                                    src=\\\"/assets/CharactersBanners/{userPlayer.legends}.png\\\"\\r\\n                                    alt={userPlayer.legends}\\r\\n                                    class=\\\"block\\\" />\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">\\r\\n                                    {userPlayer.username}\\r\\n                                </p>\\r\\n                                <div\\r\\n                                    class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games played:\\r\\n                                        <b>{userPlayer.gamesPlayed}</b>\\r\\n                                        /8\\r\\n                                    </p>\\r\\n                                    <p>\\r\\n                                        Games won:\\r\\n                                        <b>{userPlayer.wins}</b>\\r\\n                                        /8\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/if}\\r\\n\\r\\n                        <!--Other Players-->\\r\\n                        {#if players}\\r\\n                            <div\\r\\n                                class=\\\"flex flex-col justify-center lg:justify-start\\r\\n                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0\\\">\\r\\n                                {#each players as player}\\r\\n                                    <div class=\\\"ffa-player card lg:mr-12 mb-8\\\">\\r\\n                                        <img\\r\\n                                            src=\\\"/assets/CharactersBanners/{player.legends}.png\\\"\\r\\n                                            alt={player.legends}\\r\\n                                            class=\\\"block\\\" />\\r\\n\\r\\n                                        <p class=\\\"player-name text-3xl\\\">\\r\\n                                            {player.username}\\r\\n                                        </p>\\r\\n                                        <div\\r\\n                                            class=\\\"stats text-xl bottom-5\\r\\n                                        text-ultra-light\\\">\\r\\n                                            <p>\\r\\n                                                Games played:\\r\\n                                                <b>{player.gamesPlayed}</b>\\r\\n                                                /8\\r\\n                                            </p>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                {/each}\\r\\n                            </div>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/if}\\r\\n            <input hidden value={videoSeen} id=\\\"transfer\\\" />\\r\\n            <!--<div class:pb-4={isInfoDropdownOpen} class=\\\"absolute fixed bottom-0 w-full bg-background bg-opacity-90 \\\">\\r\\n                <button class=\\\"flex lg:ml-20 px-6 py-3 items-center text-lg\\\" on:click={() => handleInfoDropdown()}>\\r\\n                    { !isInfoDropdownOpen ? \\\"Show\\\" : \\\"Hide\\\" } information\\r\\n                    <svg class:hidden={isInfoDropdownOpen} class=\\\"fill-current w-4 ml-2\\\" viewBox=\\\"0 0 24 24\\\"\\r\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path d=\\\"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z\\\" />\\r\\n                    </svg>\\r\\n                    <svg class:hidden={!isInfoDropdownOpen} class=\\\"fill-current w-4 ml-2\\\" viewBox=\\\"0 0 24 24\\\"\\r\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                    </svg>\\r\\n                </button>\\r\\n                <div class=\\\"flex justify-between lg:ml-20 px-6 py-3 bg-opacity-5\\\" class:hidden={!isInfoDropdownOpen}>\\r\\n                    <div class=\\\"w-68\\\">\\r\\n                        <p class=\\\"text-primary text-lg \\\">Ranked matches</p>\\r\\n                        <p>Only ranked games will count. You can play 1vs1 or 2vs2 ranked games.</p>\\r\\n                    </div>\\r\\n                    <div class=\\\"w-68 ml-12 xl:ml-0\\\">\\r\\n                        <p class=\\\"text-primary text-lg \\\">Delay</p>\\r\\n                        <p>Your data may take up to 5 minutes to refresh on Brawlhalla's servers, before updating when\\r\\n                            you click on the \\\"REFRESH DATA\\\" button.</p>\\r\\n                    </div>\\r\\n                    <div class=\\\"w-68 ml-12 xl:ml-0\\\">\\r\\n                        <p class=\\\"text-primary text-lg \\\">Refresh data</p>\\r\\n                        <p>The other players will see your data updated when you click on the \\\"REFRESH DATA\\\" button.</p>\\r\\n                    </div>\\r\\n\\r\\n                    <div class=\\\"w-68 ml-12 xl:ml-0 xl:mr-40\\\">\\r\\n                        <p class=\\\"text-primary text-lg \\\">Quit</p>\\r\\n                        <p>You will be able to quit the match when you click on the \\\"QUIT\\\" button, if you still didn't\\r\\n                            played.</p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>-->\\r\\n\\r\\n            <GuideCard page=\\\"ffa\\\" />\\r\\n            <FfaWatchAd />\\r\\n        {:else}\\r\\n            <Loading data={\\\"Loading game data...\\\"} />\\r\\n        {/if}\\r\\n\\r\\n\\r\\n    </div>\\r\\n{/if}\\r\\n\\r\\n<div>\\r\\n    {#if adError}\\r\\n        <ErrorAlert message=\\\"An error occured while watching the ad\\\" pushError={adError} />\\r\\n    {/if}\\r\\n    <script data-playerPro=\\\"current\\\">\\r\\n        function playAd() {\\r\\n            const init = (api) => {\\r\\n                if (api) {\\r\\n\\r\\n                    api.on(\\\"AdVideoStart\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = 1;\\r\\n                        //api.setAdVolume(1);\\r\\n                        document.body.onblur = function() {\\r\\n                            //api.pauseAd();\\r\\n                        };\\r\\n                        document.body.onfocus = function() {\\r\\n                            //api.resumeAd();\\r\\n                        };\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoFirstQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = 2;\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoMidpoint\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = 3;\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoThirdQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = 4;\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoComplete\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = 5;\\r\\n                        setTimeout(() => {\\r\\n                            document.getElementById(\\\"transfer\\\").value = 0;\\r\\n                        }, 1200);\\r\\n                        document.body.onblur = null;\\r\\n                        document.body.onfocus = null;\\r\\n                    });\\r\\n                } else {\\r\\n                    console.log(\\\"blank\\\");\\r\\n                }\\r\\n            };\\r\\n            var s = document.querySelector(\\\"script[data-playerPro=\\\\\\\"current\\\\\\\"]\\\");\\r\\n            //s.removeAttribute(\\\"data-playerPro\\\");\\r\\n            (playerPro = window.playerPro || []).push({\\r\\n                id: \\\"oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp\\\",\\r\\n                after: s,\\r\\n                init: init\\r\\n            });\\r\\n        }\\r\\n    </script>\\r\\n</div>\\r\\n<!--\\r\\n<div>\\r\\n    <script defer\\r\\n            src=\\\"https://cdn.purpleads.io/load.js?publisherId=4640a3490c1775718da6cc801e9b32e7:97737d9e720ec100f8147b22591b1a8b73d2131d6a0f6a6d744a8c67ae89f5ed71e3b94009ea0e6bf97e97e6d07853daf83ea62c0cd24822ca9cc406a85f339b\\\"\\r\\n            id=\\\"purpleads-client\\\"></script>\\r\\n</div>\\r\\n-->\"],\"names\":[],\"mappings\":\"AAmQI,CAAC,cAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AACD,oBAAM,CAAC,AACH,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,OAAO,AAEnB,CAAC,AACD,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,OAAO,UAAU,CAAC,CAClB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,WAAW,cAAC,CAAC,AACT,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,WAAW,CAAC,AAC1C,CAAC,AAED,yBAAW,OAAO,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,YAAY,cAAC,CAAC,AACV,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAClD,OAAO,QAAQ,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,AAC/C,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,AACxC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,IAAI,CAAC,KAAK,CAAC,AACtB,CAAC,AAED,mBAAK,OAAO,AAAC,CAAC,AACV,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,YAAY,CAAC,IAAI,CAAC,AAC7B,CAAC\"}"
};

let videoSeen = 0;

const U5Bidu5D$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const { page } = stores$1();
	let id;

	/*export let user;
export let match;
export let isMatchEnded;
export let countDown;

export let userPlayer;
export let players;*/
	let pages;

	let user;
	let match;
	let isMatchEnded;
	let countDown;
	let userPlayer;
	let players;
	let info;
	let error;
	let socket;
	let adError;
	let isLoadingOpen = true;

	pages = page.subscribe(async value => {
		user = undefined;
		match = undefined;
		isMatchEnded = undefined;
		userPlayer = undefined;
		players = undefined;
		error = undefined;
		socket = undefined;
		id = value.params.id;
		if (!value.params.id && !value.path.includes("/ffa/")) return console.log("not a ffa match"); else console.log("ffa match");

		let unsub = counter.subscribe(user1 => {
			user = user1.content;
		});

		unsub();

		//await user
		//user = user.steam
		try {
			user = await user;
			user = user.steam;
			match = await callApi("get", `/getMatch/${id}`);

			if (match instanceof Error) {
				throw match;
			}

			isMatchEnded = match.finished;

			//Start the countdown
			filterUsers(false);

			const d = new Date(userPlayer.joinDate);
			const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);

			if (endsIn < 1) {
				countDown = "Waiting for others to finish (you can start a new game from the play page)";
			} else {
				startTimer(endsIn);
			}

			counter.set({ "refresh": true });
			socket = io__default['default'].io(apiUrl);

			socket.on("connection", status => {
				console.log(status);
				socket.emit("match connection", "FFA" + id);
			});

			socket.on("join match", status => {
				console.log(status);
			});

			socket.on("lobbyUpdate", value => {
				match = value;
				filterUsers(true);
			});

			isLoadingOpen = false;
		} catch(err) {
			if (err.response) {
				if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
					error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)";
					return;
				} else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
					error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
					return;
				} else if (err.response.status === 404) error = "<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>";

				return;
			}

			error = `<p class="text-accent">Wow, unexpected error occured, details for geeks below.</p> <p class="text-2xl">${err.toString()}</p>`;
		}
		let stop = 0;
		let advideostate = 0;
		let tempNb;

		let interval = setInterval(
			() => {
				try {
					if (stop > 0) {
						return stop--;
					}

					tempNb = document.getElementById("transfer").value;

					if (tempNb !== advideostate) {
						if (tempNb !== 0) {
							socket.emit("advideo", tempNb === "1"
							? {
									state: 1,
									steamId: userPlayer.steamId,
									room: id,
									goal: "earnMoreFFA"
								}
							: {
									state: tempNb,
									steamId: userPlayer.steamId
								});

							console.log(tempNb);
						}
					}

					/*if(adVideos < tempNb){

console.log(info)
            }*/
					advideostate = tempNb;
				} catch(e) {
					
				}
			},
			1000
		);

		socket.on("advideo", e => {
			if (e.code === "error") {
				console.log(e.message);
				clearInterval(interval);
				advideostate = 0;
				tempNb = 0;
				adError = e.message;

				setTimeout(
					() => {
						adError = undefined;
					},
					25000
				);
			} else if (e.code === "success") {
				stop = 5;
				info = e.message;
				advideostate = 0;
				userPlayer.adsWatched++;
				userPlayer.multiplier += userPlayer.adsWatched === 1 ? 200 : 300;

				setTimeout(
					() => {
						info = undefined;
					},
					5000
				);
			}
		});
	});

	onDestroy(pages);

	const filterUsers = isFromSocket => {
		//Find user's object
		if (!isFromSocket) {
			userPlayer = match.players.find(p => p.steamId === parseInt(user.id));
		} else {
			let playerIndex = match.players.findIndex(p => p.steamId === parseInt(user.id));
			match.players[playerIndex].wins = userPlayer.wins;
			userPlayer = match.players[playerIndex];
		}

		//Delete user's object from array.
		players = [...match.players];

		players.splice(match.players.findIndex(p => p.steamId === parseInt(user.id)), 1);
	};

	//Function that starts a timer with a date, and refreshes it every second
	function startTimer(duration) {
		let timer = duration, hours, minutes, seconds;

		setInterval(
			function () {
				seconds = Math.floor(timer % 60);
				minutes = Math.floor(timer / 60 % 60);
				hours = Math.floor(timer / (60 * 60));
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				countDown = hours + ":" + minutes + ":" + seconds;

				if (--timer < 0) {
					timer = duration;
				}
			},
			1000
		);
	}

	//Function that handles the refresh button on click event
	let isRefreshingStats = false;

	$$result.css.add(css$i);

	return `${($$result.head += `${($$result.title = `<title>Winhalla | FFA match</title>`, "")}<script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-16t19ct"></script>`, "")}
${isLoadingOpen
	? `<div class="${"z-50 bg-background absolute"}">${validate_component(Loading, "Loading").$$render($$result, { data: "Loading game data..." }, {}, {})}</div>`
	: ``}
${error
	? `<div class="${"w-full content-center lg:mt-60 mt-25 "}"><h2 class="${"lg:text-5xl text-3xl text-center"}">${error}</h2>
        <a href="${"/play"}"><p class="${"underline lg:text-3xl pt-4 text-2xl  text-center text-primary"}">Go to play page</p></a></div>`
	: `${info
		? `${validate_component(Infos, "Infos").$$render(
				$$result,
				{
					message: "Thanks for watching a video",
					pushError: info
				},
				{},
				{}
			)}`
		: ``}
    <div class="${"h-full  "}">${match
		? `${isMatchEnded
			? `${validate_component(FfaEnd, "FfaEnd").$$render(
					$$result,
					{
						players: match.players,
						winners: match.winners
					},
					{},
					{}
				)}`
			: `<div class="${"h-full flex items-center flex-col lg:block lg:ml-24 z-0"}"><div class="${"flex flex-col justify-center lg:flex-row\r\n                    lg:justify-between items-center lg:mt-12 mt-7"}"><div class="${"mode-timer flex justify-center lg:justify-start\r\n                        items-end w-52 "}"><h1 class="${"text-6xl leading-none"}">FFA</h1>
                            <p class="${"timer text-primary ml-5 text-3xl leading-none svelte-70gu27"}">${countDown ? `${escape(countDown)}` : `Loading...`}</p></div>
                        ${validate_component(AdblockAlert, "AdblockAlert").$$render($$result, { user: userPlayer }, {}, {})}
                        <div class="${"lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\r\n                        items-center"}"><p class="${"text-center lg:text-left mx-4 mt-1 lg:mt-0"}">You watched <strong class="${"text-green font-normal text-3xl"}">${escape(userPlayer.adsWatched)}
                                ad${escape(userPlayer.adsWatched > 1 ? "s" : "")}</strong>, earnings will be multiplied by
                                <strong class="${"text-green text-3xl font-normal"}">${escape(userPlayer.multiplier / 100)}</strong>!
                            </p>
                            <button ${userPlayer.adsWatched >= 8 ? "disabled" : ""} class="${"button button-brand lg:mr-8 mt-2\r\n                                lg:mt-0 mb-5\r\n                                lg:mb-0  text-background svelte-70gu27"}" onclick="${"playAd()"}">${escape(userPlayer.adsWatched < 8
				? "Play ad"
				: "Maximum ads reached")}</button>

                            ${validate_component(RefreshButton, "RefreshButton").$$render(
					$$result,
					{
						isRefreshing: isRefreshingStats,
						refreshMessage: "Refresh data"
					},
					{},
					{}
				)}
                            ${userPlayer.gamesPlayed == 0
				? `<button class="${"button button-brand quit lg:ml-4 mt-3\r\n                                lg:mt-0 svelte-70gu27"}" style="${"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;"}">Quit lobby
                                </button>
                                ${ ``}`
				: ``}</div></div>

                    <div class="${"flex items-center flex-col lg:flex-row lg:items-start\r\n                    h-full lg:mt-6"}">
                        ${userPlayer
				? `<div class="${"mt-8 lg:mt-25 ffa-player card user svelte-70gu27"}"><img src="${"/assets/CharactersBanners/" + escape(userPlayer.legends) + ".png"}"${add_attribute("alt", userPlayer.legends, 0)} class="${"block"}">

                                <p class="${"player-name text-4xl svelte-70gu27"}">${escape(userPlayer.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-70gu27"}"><p>Games played:
                                        <b class="${"svelte-70gu27"}">${escape(userPlayer.gamesPlayed)}</b>
                                        /8
                                    </p>
                                    <p>Games won:
                                        <b class="${"svelte-70gu27"}">${escape(userPlayer.wins)}</b>
                                        /8
                                    </p></div></div>`
				: ``}

                        
                        ${players
				? `<div class="${"flex flex-col justify-center lg:justify-start\r\n                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0"}">${each(players, player => `<div class="${"ffa-player card lg:mr-12 mb-8 svelte-70gu27"}"><img src="${"/assets/CharactersBanners/" + escape(player.legends) + ".png"}"${add_attribute("alt", player.legends, 0)} class="${"block"}">

                                        <p class="${"player-name text-3xl svelte-70gu27"}">${escape(player.username)}</p>
                                        <div class="${"stats text-xl bottom-5\r\n                                        text-ultra-light svelte-70gu27"}"><p>Games played:
                                                <b class="${"svelte-70gu27"}">${escape(player.gamesPlayed)}</b>
                                                /8
                                            </p></div>
                                    </div>`)}</div>`
				: ``}</div></div>`}
            <input hidden${add_attribute("value", videoSeen, 0)} id="${"transfer"}">
            

            ${validate_component(GuideCard, "GuideCard").$$render($$result, { page: "ffa" }, {}, {})}
            ${validate_component(FfaWatchAd, "FfaWatchAd").$$render($$result, {}, {}, {})}`
		: `${validate_component(Loading, "Loading").$$render($$result, { data: "Loading game data..." }, {}, {})}`}</div>`}

<div>${adError
	? `${validate_component(ErrorAlert, "ErrorAlert").$$render(
			$$result,
			{
				message: "An error occured while watching the ad",
				pushError: adError
			},
			{},
			{}
		)}`
	: ``}
    <script data-playerPro="${"current"}">function playAd() {
            const init = (api) => {
                if (api) {

                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = 1;
                        //api.setAdVolume(1);
                        document.body.onblur = function() {
                            //api.pauseAd();
                        };
                        document.body.onfocus = function() {
                            //api.resumeAd();
                        };
                    });
                    api.on("AdVideoFirstQuartile", () => {
                        document.getElementById("transfer").value = 2;
                    });
                    api.on("AdVideoMidpoint", () => {
                        document.getElementById("transfer").value = 3;
                    });
                    api.on("AdVideoThirdQuartile", () => {
                        document.getElementById("transfer").value = 4;
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = 5;
                        setTimeout(() => {
                            document.getElementById("transfer").value = 0;
                        }, 1200);
                        document.body.onblur = null;
                        document.body.onfocus = null;
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\\"current\\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
    </script></div>
`;
});

var component_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D$2
});

/* src\routes\shop.svelte generated by Svelte v3.31.0 */

const css$j = {
	code: ".shop-item.svelte-34sil3{position:relative}.shop-item.svelte-34sil3::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.6) 0%,\r\n                rgba(23, 23, 26, 0.75),\r\n                rgba(23, 23, 26, 0.83) 75%,\r\n                rgba(23, 23, 26, 0.92) 100%\r\n        )}button.svelte-34sil3:disabled{@apply bg-disabled;;cursor:not-allowed}",
	map: "{\"version\":3,\"file\":\"shop.svelte\",\"sources\":[\"shop.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\r\\n    import RefreshButton from \\\"../components/RefreshButton.svelte\\\";\\r\\n\\r\\n    let featuredItem;\\r\\n    let seasonPacks;\\r\\n    let packs;\\r\\n    let error;\\r\\n\\r\\n    //* Required for videoAd\\r\\n    import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import { onDestroy, onMount } from \\\"svelte\\\";\\r\\n    import io from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import AdblockAlert from \\\"../components/AdblockAlert.svelte\\\";\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import { counter } from \\\"../components/store\\\";\\r\\n    import { fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    let adError;\\r\\n    let info;\\r\\n    let userPlayer;\\r\\n    let ticketsNb = 100;\\r\\n    let isLoadingTicket = false;\\r\\n    let countDown = \\\"Loading...\\\";\\r\\n    let interval;\\r\\n    let loaded;\\r\\n\\r\\n    function startTimer(duration) {\\r\\n        let timer = duration,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        return setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            if (hours > 0) countDown = hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n            else countDown = minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = duration;\\r\\n            }\\r\\n        }, 1000);\\r\\n    }\\r\\n\\r\\n    let unsub;\\r\\n    onMount(async () => {\\r\\n        let socket;\\r\\n        let interval;\\r\\n        let items;\\r\\n        try {\\r\\n            items = await callApi(\\\"get\\\", \\\"/shop\\\");\\r\\n            if (items instanceof Error) {\\r\\n                throw items;\\r\\n            }\\r\\n        } catch (err) {\\r\\n            if (err.response) {\\r\\n                if (err.response.status === 404) error = \\\"<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>\\\";\\r\\n            }\\r\\n            error = `<p class=\\\"text-accent\\\">Wow, unexpected error occured, details for geeks below.</p> <p class=\\\"text-2xl\\\">${err.toString()}</p>`;\\r\\n        }\\r\\n        let player;\\r\\n        unsub = counter.subscribe(async (value) => {\\r\\n            if(value.refresh === true ) return\\r\\n            player = await value.content;\\r\\n            console.log(player);\\r\\n            if (player.user) {\\r\\n                player = player.user.coins;\\r\\n            } else {\\r\\n                player = 0;\\r\\n            }\\r\\n            items.forEach((item, i) => {\\r\\n                items[i].isDescriptionToggled = false;\\r\\n\\r\\n                items[i].unBuyable = false;\\r\\n                item.name = item.name.toLowerCase().replace(/\\\\s/g, \\\"-\\\");\\r\\n                if (item.cost > player) items[i].unBuyable = true;\\r\\n            });\\r\\n\\r\\n            featuredItem = items.find((i) => i.state === 0);\\r\\n            seasonPacks = items.filter((i) => i.state === 1);\\r\\n            packs = items.filter((i) => i.state === 2);\\r\\n            if (value.refresh === true) return;\\r\\n            userPlayer = await value.content;\\r\\n            clearInterval(interval);\\r\\n            if (!userPlayer.user.lastVideoAd) return countDown = undefined;\\r\\n\\r\\n            if (userPlayer.user.lastVideoAd.earnCoins.nb < 2) return countDown = undefined;\\r\\n\\r\\n            if (userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000 > Date.now()) {\\r\\n                const endsIn = ((userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000) - Date.now()) / 1000;\\r\\n                interval = startTimer(endsIn);\\r\\n            } else {\\r\\n                countDown = undefined;\\r\\n            }\\r\\n            loaded = true;\\r\\n        });\\r\\n        socket = io.io(apiUrl);\\r\\n        let stop = 0;\\r\\n        let advideostate = 0;\\r\\n        let tempNb;\\r\\n        let goal;\\r\\n        interval = setInterval(() => {\\r\\n            console.log(\\\"interval\\\")\\r\\n            try {\\r\\n                if (stop > 0) {\\r\\n                    return stop--;\\r\\n                }\\r\\n                tempNb = JSON.parse(document.getElementById(\\\"transfer\\\").value);\\r\\n                goal = tempNb.goal ? tempNb.goal : goal;\\r\\n                tempNb = tempNb.state;\\r\\n                if (tempNb !== advideostate) {\\r\\n                    console.log(tempNb)\\r\\n                    socket.emit(\\\"advideo\\\", tempNb === 1 ? {\\r\\n                        state: 1,\\r\\n                        steamId: userPlayer.steam.id,\\r\\n                        shopItemId: 0,\\r\\n                        goal: goal\\r\\n                    } : { state: tempNb, steamId: userPlayer.steam.id });\\r\\n                }\\r\\n                advideostate = tempNb;\\r\\n            } catch (e) {\\r\\n\\r\\n            }\\r\\n        }, 1200);\\r\\n        socket.on(\\\"advideo\\\", (e) => {\\r\\n            console.log(e);\\r\\n            if (e.code === \\\"error\\\") {\\r\\n                console.log(e.message);\\r\\n                stop = 2;\\r\\n                advideostate = 0;\\r\\n                tempNb = 0;\\r\\n                adError = e.message;\\r\\n                setTimeout(() => {\\r\\n                    adError = undefined;\\r\\n                }, 12000);\\r\\n            } else if (e.code === \\\"success\\\") {\\r\\n                countDown = \\\"Wait a second...\\\";\\r\\n                stop = 2;\\r\\n                info = e.message;\\r\\n                advideostate = 0;\\r\\n                tempNb;\\r\\n                setTimeout(() => {\\r\\n                    info = undefined;\\r\\n                }, 5000);\\r\\n                counter.set({ refresh: true });\\r\\n            } else {\\r\\n                console.log(\\\"code not supported\\\");\\r\\n            }\\r\\n\\r\\n        });\\r\\n\\r\\n    });\\r\\n    onDestroy(() => {\\r\\n        if (unsub) unsub();\\r\\n    });\\r\\n\\r\\n    //* End of required for videoAd\\r\\n\\r\\n    async function buyTickets() {\\r\\n        try {\\r\\n            isLoadingTicket = true;\\r\\n            const { won, coins } = await callApi(\\\"post\\\", `/lottery/enter?nb=${ticketsNb}&id=${0}`);\\r\\n            info = `You have successfully put ${ticketsNb} ,${won > 0 ? \\\"You have won a battle pass! Check your mails for more information.\\\" : coins > 0 ? \\\"You have won \\\" + coins + \\\" coins\\\" : \\\"You have won nothing, better luck next time\\\"}`;\\r\\n            counter.set({ refresh: true });\\r\\n            isLoadingTicket = false;\\r\\n            setTimeout(() => {\\r\\n                info = undefined;\\r\\n            }, 5000);\\r\\n        } catch (e) {\\r\\n\\r\\n        }\\r\\n    }\\r\\n\\r\\n    const handleDescriptionToggle = (seasonPack) => {\\r\\n        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;\\r\\n        seasonPacks = [...seasonPacks];\\r\\n    };\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .shop-item {\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .shop-item::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.6) 0%,\\r\\n                rgba(23, 23, 26, 0.75),\\r\\n                rgba(23, 23, 26, 0.83) 75%,\\r\\n                rgba(23, 23, 26, 0.92) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    /*@media (min-width: 450px) {\\r\\n        .receive {\\r\\n            @apply mt-7 -mb-14;\\r\\n        }\\r\\n    }*/\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Shop - Winhalla, Play Brawlhalla. Earn rewards.</title>\\r\\n    <meta\\r\\n        name=\\\"description\\\"\\r\\n        content=\\\"Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\\r\\n        Battle Pass and Season packs| Exchange here your coins into rewards |\\r\\n        Winhalla Shop page \\\" />\\r\\n    <link rel=\\\"canonical\\\" href=\\\"https://winhalla.app/shop\\\" />\\r\\n    <script async src=\\\"https://cdn.stat-rock.com/player.js\\\"></script>\\r\\n</svelte:head>\\r\\n<!--\\r\\n{#if bottomItems}\\r\\n    <div class=\\\"lg:pl-24 lg:pt-6\\\">\\r\\n        <div class=\\\"flex\\\">\\r\\n            <div class=\\\"card featured\\\">\\r\\n                <img class=\\\"w-full h-full block object-cover\\\" src=\\\"assets/ShopItems/{featuredItem.name}.jpg\\\" alt=\\\"{featuredItem.name}\\\">\\r\\n            </div>\\r\\n            <div class=\\\"lg:pl-12\\\">\\r\\n                {#each [0 , 1] as i}\\r\\n                    <div class=\\\"pb-12 right\\\">\\r\\n                        <img class=\\\"w-full h-full block object-cover\\\" src=\\\"assets/ShopItems/{rightItems[i].name}.jpg\\\" alt=\\\"{rightItems[i].name}\\\">\\r\\n                    </div>\\r\\n                {/each}\\r\\n\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"flex\\\">\\r\\n            {#each [0 , 1] as i}\\r\\n                <div class=\\\"pb-8 right mr-12\\\">\\r\\n                    <img class=\\\"w-full h-full block object-cover\\\" src=\\\"assets/ShopItems/{bottomItems[i].name}.jpg\\\" alt=\\\"{bottomItems[i].name}\\\">\\r\\n                </div>\\r\\n            {/each}\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n-->\\r\\n{#if error}\\r\\n    <div class=\\\"w-full content-center lg:mt-60 mt-25 \\\">\\r\\n        <h2 class=\\\"lg:text-5xl text-3xl text-center\\\">{@html error}</h2>\\r\\n        <a href=\\\"/\\\"><p class=\\\"underline lg:text-3xl pt-4 text-2xl  text-center text-primary\\\">Go to homepage</p></a>\\r\\n    </div>\\r\\n{:else}\\r\\n    <div class=\\\"xl:flex xl:relative pb-16\\\" out:fly={{ y: -450, duration: 400 }}>\\r\\n        {#if info}\\r\\n            <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n        {/if}\\r\\n        <div>\\r\\n            {#if packs}\\r\\n                <div class=\\\"mt-7 lg:mt-12 lg:ml-24\\\">\\r\\n                    <div class=\\\"xl:w-71/100 2xl:w-62/100\\\">\\r\\n                        <h1 class=\\\"text-6xl text-center lg:text-left\\\">\\r\\n                            Battle pass\\r\\n                        </h1>\\r\\n                        <div\\r\\n                            class=\\\"card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item\\\">\\r\\n                            <img\\r\\n                                class=\\\"w-full h-full block object-cover\\\"\\r\\n                                src=\\\"assets/ShopItems/{featuredItem.name}.jpg\\\"\\r\\n                                alt={featuredItem.name} />\\r\\n                            <div\\r\\n                                class=\\\"absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full\\\">\\r\\n                                <div\\r\\n                                    class=\\\"md:flex justify-between w-full md:items-center\\\">\\r\\n                                    <p class=\\\"text-accent text-6xl\\\">\\r\\n                                        {featuredItem.name\\r\\n                                            .toLowerCase()\\r\\n                                            .replace(/\\\\-/g, ' ')}\\r\\n                                    </p>\\r\\n                                    <div class=\\\"flex justify-end md:block pb-1\\\">\\r\\n                                        <button\\r\\n                                            disabled={featuredItem.unBuyable}\\r\\n                                            on:click={() => callApi('post', `/buy/${featuredItem.id}`)}\\r\\n                                            class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                            <p class=\\\"text-2xl\\\">\\r\\n                                                <b\\r\\n                                                    class=\\\"mr-1 font-normal\\\">{featuredItem.cost}</b>$\\r\\n                                            </p>\\r\\n                                        </button>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                    <div class=\\\"pt-8 lg:pt-16\\\">\\r\\n                        <h2 class=\\\"text-6xl text-center lg:text-left\\\">\\r\\n                            Season packs\\r\\n                        </h2>\\r\\n                        <div\\r\\n                            class=\\\"mt-2 flex flex-col items-center lg:flex-row lg:items-start\\\">\\r\\n                            {#if seasonPacks.forEach}\\r\\n                                {#each seasonPacks as seasonPack, i}\\r\\n                                    <div\\r\\n                                        class=\\\"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem\\\">\\r\\n                                        <img\\r\\n                                            class=\\\"w-full h-full block \\\"\\r\\n                                            src=\\\"assets/ShopItems/{seasonPack.name}.jpg\\\"\\r\\n                                            alt={seasonPack.name} />\\r\\n                                        <div\\r\\n                                            class=\\\"absolute bottom-0 z-10 pl-5 pb-3 w-full\\\">\\r\\n                                            <p\\r\\n                                                class:hidden={seasonPack.isDescriptionToggled}\\r\\n                                                class:-mb-1={!seasonPack.isDescriptionToggled}\\r\\n                                                class=\\\"text-accent text-5xl md:mb-0 md:block\\\">\\r\\n                                                {seasonPack.name\\r\\n                                                    .toLowerCase()\\r\\n                                                    .replace(/\\\\-/g, ' ')}\\r\\n                                            </p>\\r\\n                                            <p\\r\\n                                                class:hidden={!seasonPack.isDescriptionToggled}\\r\\n                                                class=\\\"block xl:mt-0\\\">\\r\\n                                                {seasonPack.description}\\r\\n                                            </p>\\r\\n\\r\\n                                            <div\\r\\n                                                class=\\\"flex justify-between w-full items-end pr-4 md:pr-5 pb-1\\\">\\r\\n                                                <div class=\\\"-mb-2 md:mb-0\\\">\\r\\n                                                    <div>\\r\\n                                                        <p\\r\\n                                                            class=\\\"hidden xl:block mr-1 -mb-2\\\">\\r\\n                                                            {seasonPack.description}\\r\\n                                                        </p>\\r\\n                                                        <button\\r\\n                                                            class=\\\"focus:outline-none xl:hidden -mb-10\\\"\\r\\n                                                            on:click={() => handleDescriptionToggle(seasonPack)}>\\r\\n                                                            <p\\r\\n                                                                class=\\\" text-light text-lg underline leading-none\\\">\\r\\n                                                                {seasonPack.isDescriptionToggled ? 'Hide description' : 'Show description'}\\r\\n                                                            </p>\\r\\n                                                        </button>\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                                <button\\r\\n                                                    disabled={seasonPack.unBuyable}\\r\\n                                                    on:click={() => callApi('post', `/buy/${seasonPack.id}`)}\\r\\n                                                    class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                    <p class=\\\"text-2xl\\\">\\r\\n                                                        <b\\r\\n                                                            class=\\\"mr-1 font-normal\\\">{seasonPack.cost}</b>$\\r\\n                                                    </p>\\r\\n                                                </button>\\r\\n                                            </div>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                {/each}\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    </div>\\r\\n                    <div class=\\\"pt-8 lg:pt-20 lg:pb-6\\\">\\r\\n                        <h2 class=\\\"text-6xl text-center lg:text-left\\\">Packs</h2>\\r\\n                        <div\\r\\n                            class=\\\"mt-2 flex flex-col items-center lg:flex-row lg:items-start\\\">\\r\\n                            {#if packs.forEach}\\r\\n                                {#each packs as pack}\\r\\n                                    <div\\r\\n                                        class=\\\"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item\\\">\\r\\n                                        <img\\r\\n                                            class=\\\"w-full h-full block object-cover\\\"\\r\\n                                            src=\\\"assets/ShopItems/{pack.name}.jpg\\\"\\r\\n                                            alt={pack.name} />\\r\\n                                        <div\\r\\n                                            class=\\\"absolute bottom-0 z-10 px-5 pb-3 w-full\\\">\\r\\n                                            <p class=\\\"text-accent text-5xl\\\">\\r\\n                                                {pack.name\\r\\n                                                    .toLowerCase()\\r\\n                                                    .replace(/\\\\-/g, ' ')}\\r\\n                                            </p>\\r\\n\\r\\n                                            <div\\r\\n                                                class=\\\"flex justify-between w-full items-end pb-1\\\">\\r\\n                                                <div>\\r\\n                                                    <div>\\r\\n                                                        <p class=\\\"block mr-1 -mb-2\\\">\\r\\n                                                            {pack.description}\\r\\n                                                        </p>\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                                <button\\r\\n                                                    disabled={pack.unBuyable}\\r\\n                                                    on:click={() => callApi('post', `/buy/${pack.id}`)}\\r\\n                                                    class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                    <p class=\\\"text-2xl\\\">\\r\\n                                                        <b\\r\\n                                                            class=\\\"mr-1 font-normal\\\">{pack.cost}</b>$\\r\\n                                                    </p>\\r\\n                                                </button>\\r\\n                                            </div>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                {/each}\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/if}\\r\\n        </div>\\r\\n        <div\\r\\n            class=\\\"mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3\\\">\\r\\n            {#if userPlayer}\\r\\n                <AdblockAlert class=\\\"lg:mr-12 text-center lg:text-left\\\" user=\\\"{userPlayer.user}\\\" />\\r\\n            {/if}\\r\\n            <h3 class=\\\"text-5xl lg:mr-12 text-center lg:text-left\\\">\\r\\n                How does it works ?\\r\\n            </h3>\\r\\n            <div class=\\\"pt-4\\\">\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">1.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Click</p>\\r\\n                    <p\\r\\n                        class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0\\\">\\r\\n                        Click on the item you want to purchase\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">2.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Add</p>\\r\\n                    <p\\r\\n                        class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0\\\">\\r\\n                        Add the Winhalla Steam account to your friend list\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">3.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Receive</p>\\r\\n                    <p\\r\\n                        class=\\\"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7\\\">\\r\\n                        You will receive the item you purchased within 1 week to 1 month\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"mt-30\\\">\\r\\n                    <h3 class=\\\"text-5xl lg:mr-12 text-center lg:text-left\\\">\\r\\n                        Lottery\\r\\n                    </h3>\\r\\n                    <div class=\\\"pt-4\\\">\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">1.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\"><br>Buy a ticket</p>\\r\\n                            <p\\r\\n                                class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0\\\">\\r\\n                                A ticket will give you a chance to win the prize you have chosen.\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">2.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Multiple tickets</p>\\r\\n                            <p\\r\\n                                class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0\\\">\\r\\n                                The more tickets you buy, the more chances to win you have !\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">3.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Win</p>\\r\\n                            <p\\r\\n                                class=\\\"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7\\\">\\r\\n                                If you win a prize, an email will be sent to the adress you specified when you\\r\\n                                created\\r\\n                                the account\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"block mt-10\\\">\\r\\n                            <div class=\\\"flex\\\">\\r\\n                                <input class=\\\"mr-3\\\" type=\\\"range\\\" step=\\\"100\\\" min=\\\"100\\\" max=\\\"10000\\\" bind:value={ticketsNb}>\\r\\n                                <RefreshButton on:click={buyTickets}\\r\\n                                               refreshMessage={`Put ${ticketsNb} in the lottery`}\\r\\n                                               isRefreshing={isLoadingTicket} />\\r\\n                            </div>\\r\\n\\r\\n                            <div class=\\\"flex mt-8\\\">\\r\\n                                <button class=\\\"button button-brand\\\" onclick=\\\"playAd('enterLottery')\\\">Play ad for\\r\\n                                    lottery\\r\\n                                </button>\\r\\n                                <button class=\\\"button button-brand ml-4\\\" onclick=\\\"playAd('earnCoins')\\\"\\r\\n                                        disabled={!!countDown}>\\r\\n                                    {!!countDown ? countDown : \\\"Play ad for money\\\"}\\r\\n                                </button>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n<div>\\r\\n    <input id=\\\"transfer\\\" value=\\\"0\\\" hidden />\\r\\n    {#if adError}\\r\\n        <ErrorAlert message=\\\"An error occured while watching the ad\\\" pushError={adError} />\\r\\n    {/if}\\r\\n    <script data-playerPro=\\\"current\\\">\\r\\n        function playAd(goal) {\\r\\n            const init = (api) => {\\r\\n                if (api) {\\r\\n                    api.on(\\\"AdVideoStart\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 1, goal });\\r\\n                        //api.setAdVolume(1);\\r\\n                        document.body.onblur = function() {\\r\\n                            //api.pauseAd();\\r\\n                        };\\r\\n                        document.body.onfocus = function() {\\r\\n                            //api.resumeAd();\\r\\n                        };\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoFirstQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 2 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoMidpoint\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 3 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoThirdQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 4 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoComplete\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 5 });\\r\\n                        setTimeout(() => {\\r\\n                            document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 0 });\\r\\n                        }, 1200);\\r\\n                        document.body.onblur = null;\\r\\n                        document.body.onfocus = null;\\r\\n                    });\\r\\n                } else {\\r\\n                    console.log(\\\"blank\\\");\\r\\n                }\\r\\n            };\\r\\n            var s = document.querySelector(\\\"script[data-playerPro=\\\\\\\"current\\\\\\\"]\\\");\\r\\n            //s.removeAttribute(\\\"data-playerPro\\\");\\r\\n            (playerPro = window.playerPro || []).push({\\r\\n                id: \\\"oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp\\\",\\r\\n                after: s,\\r\\n                init: init\\r\\n            });\\r\\n        }\\r\\n    </script>\\r\\n</div>\\r\\n<div hidden class=\\\"-mb-1\\\"></div>\"],\"names\":[],\"mappings\":\"AA2LI,UAAU,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,wBAAU,OAAO,AAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC;gBACzB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC\"}"
};

const Shop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let featuredItem;
	let seasonPacks;
	let packs;
	let error;
	let adError;
	let info;
	let userPlayer;
	let ticketsNb = 100;
	let isLoadingTicket = false;
	let countDown = "Loading...";

	function startTimer(duration) {
		let timer = duration, hours, minutes, seconds;

		return setInterval(
			function () {
				seconds = Math.floor(timer % 60);
				minutes = Math.floor(timer / 60 % 60);
				hours = Math.floor(timer / (60 * 60));
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				if (hours > 0) countDown = hours + ":" + minutes + ":" + seconds; else countDown = minutes + ":" + seconds;

				if (--timer < 0) {
					timer = duration;
				}
			},
			1000
		);
	}

	let unsub;

	onMount(async () => {
		let socket;
		let interval;
		let items;

		try {
			items = await callApi("get", "/shop");

			if (items instanceof Error) {
				throw items;
			}
		} catch(err) {
			if (err.response) {
				if (err.response.status === 404) error = "<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>";
			}

			error = `<p class="text-accent">Wow, unexpected error occured, details for geeks below.</p> <p class="text-2xl">${err.toString()}</p>`;
		}

		let player;

		unsub = counter.subscribe(async value => {
			if (value.refresh === true) return;
			player = await value.content;
			console.log(player);

			if (player.user) {
				player = player.user.coins;
			} else {
				player = 0;
			}

			items.forEach((item, i) => {
				items[i].isDescriptionToggled = false;
				items[i].unBuyable = false;
				item.name = item.name.toLowerCase().replace(/\s/g, "-");
				if (item.cost > player) items[i].unBuyable = true;
			});

			featuredItem = items.find(i => i.state === 0);
			seasonPacks = items.filter(i => i.state === 1);
			packs = items.filter(i => i.state === 2);
			if (value.refresh === true) return;
			userPlayer = await value.content;
			clearInterval(interval);
			if (!userPlayer.user.lastVideoAd) return countDown = undefined;
			if (userPlayer.user.lastVideoAd.earnCoins.nb < 2) return countDown = undefined;

			if (userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000 > Date.now()) {
				const endsIn = (userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000 - Date.now()) / 1000;
				interval = startTimer(endsIn);
			} else {
				countDown = undefined;
			}
		});

		socket = io__default['default'].io(apiUrl);
		let stop = 0;
		let advideostate = 0;
		let tempNb;
		let goal;

		interval = setInterval(
			() => {
				console.log("interval");

				try {
					if (stop > 0) {
						return stop--;
					}

					tempNb = JSON.parse(document.getElementById("transfer").value);
					goal = tempNb.goal ? tempNb.goal : goal;
					tempNb = tempNb.state;

					if (tempNb !== advideostate) {
						console.log(tempNb);

						socket.emit("advideo", tempNb === 1
						? {
								state: 1,
								steamId: userPlayer.steam.id,
								shopItemId: 0,
								goal
							}
						: {
								state: tempNb,
								steamId: userPlayer.steam.id
							});
					}

					advideostate = tempNb;
				} catch(e) {
					
				}
			},
			1200
		);

		socket.on("advideo", e => {
			console.log(e);

			if (e.code === "error") {
				console.log(e.message);
				stop = 2;
				advideostate = 0;
				tempNb = 0;
				adError = e.message;

				setTimeout(
					() => {
						adError = undefined;
					},
					12000
				);
			} else if (e.code === "success") {
				countDown = "Wait a second...";
				stop = 2;
				info = e.message;
				advideostate = 0;

				setTimeout(
					() => {
						info = undefined;
					},
					5000
				);

				counter.set({ refresh: true });
			} else {
				console.log("code not supported");
			}
		});
	});

	onDestroy(() => {
		if (unsub) unsub();
	});

	$$result.css.add(css$j);

	return `${($$result.head += `${($$result.title = `<title>Shop - Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\r\n        Battle Pass and Season packs| Exchange here your coins into rewards |\r\n        Winhalla Shop page "}" data-svelte="svelte-1ri6x5y"><link rel="${"canonical"}" href="${"https://winhalla.app/shop"}" data-svelte="svelte-1ri6x5y"><script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-1ri6x5y"></script>`, "")}

${error
	? `<div class="${"w-full content-center lg:mt-60 mt-25 "}"><h2 class="${"lg:text-5xl text-3xl text-center"}">${error}</h2>
        <a href="${"/"}"><p class="${"underline lg:text-3xl pt-4 text-2xl  text-center text-primary"}">Go to homepage</p></a></div>`
	: `<div class="${"xl:flex xl:relative pb-16"}">${info
		? `${validate_component(Infos, "Infos").$$render(
				$$result,
				{
					message: "Thanks for watching a video",
					pushError: info
				},
				{},
				{}
			)}`
		: ``}
        <div>${packs
		? `<div class="${"mt-7 lg:mt-12 lg:ml-24"}"><div class="${"xl:w-71/100 2xl:w-62/100"}"><h1 class="${"text-6xl text-center lg:text-left"}">Battle pass
                        </h1>
                        <div class="${"card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item svelte-34sil3"}"><img class="${"w-full h-full block object-cover"}" src="${"assets/ShopItems/" + escape(featuredItem.name) + ".jpg"}"${add_attribute("alt", featuredItem.name, 0)}>
                            <div class="${"absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full"}"><div class="${"md:flex justify-between w-full md:items-center"}"><p class="${"text-accent text-6xl"}">${escape(featuredItem.name.toLowerCase().replace(/\-/g, " "))}</p>
                                    <div class="${"flex justify-end md:block pb-1"}"><button ${featuredItem.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-34sil3"}"><p class="${"text-2xl"}"><b class="${"mr-1 font-normal"}">${escape(featuredItem.cost)}</b>$
                                            </p></button></div></div></div></div></div>
                    <div class="${"pt-8 lg:pt-16"}"><h2 class="${"text-6xl text-center lg:text-left"}">Season packs
                        </h2>
                        <div class="${"mt-2 flex flex-col items-center lg:flex-row lg:items-start"}">${seasonPacks.forEach
			? `${each(seasonPacks, (seasonPack, i) => `<div class="${"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem svelte-34sil3"}"><img class="${"w-full h-full block "}" src="${"assets/ShopItems/" + escape(seasonPack.name) + ".jpg"}"${add_attribute("alt", seasonPack.name, 0)}>
                                        <div class="${"absolute bottom-0 z-10 pl-5 pb-3 w-full"}"><p class="${[
					"text-accent text-5xl md:mb-0 md:block",
					(seasonPack.isDescriptionToggled ? "hidden" : "") + " " + (!seasonPack.isDescriptionToggled ? "-mb-1" : "")
				].join(" ").trim()}">${escape(seasonPack.name.toLowerCase().replace(/\-/g, " "))}</p>
                                            <p class="${["block xl:mt-0", !seasonPack.isDescriptionToggled ? "hidden" : ""].join(" ").trim()}">${escape(seasonPack.description)}</p>

                                            <div class="${"flex justify-between w-full items-end pr-4 md:pr-5 pb-1"}"><div class="${"-mb-2 md:mb-0"}"><div><p class="${"hidden xl:block mr-1 -mb-2"}">${escape(seasonPack.description)}</p>
                                                        <button class="${"focus:outline-none xl:hidden -mb-10 svelte-34sil3"}"><p class="${" text-light text-lg underline leading-none"}">${escape(seasonPack.isDescriptionToggled
				? "Hide description"
				: "Show description")}
                                                            </p></button>
                                                    </div></div>
                                                <button ${seasonPack.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-34sil3"}"><p class="${"text-2xl"}"><b class="${"mr-1 font-normal"}">${escape(seasonPack.cost)}</b>$
                                                    </p></button>
                                            </div></div>
                                    </div>`)}`
			: ``}</div></div>
                    <div class="${"pt-8 lg:pt-20 lg:pb-6"}"><h2 class="${"text-6xl text-center lg:text-left"}">Packs</h2>
                        <div class="${"mt-2 flex flex-col items-center lg:flex-row lg:items-start"}">${packs.forEach
			? `${each(packs, pack => `<div class="${"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item svelte-34sil3"}"><img class="${"w-full h-full block object-cover"}" src="${"assets/ShopItems/" + escape(pack.name) + ".jpg"}"${add_attribute("alt", pack.name, 0)}>
                                        <div class="${"absolute bottom-0 z-10 px-5 pb-3 w-full"}"><p class="${"text-accent text-5xl"}">${escape(pack.name.toLowerCase().replace(/\-/g, " "))}</p>

                                            <div class="${"flex justify-between w-full items-end pb-1"}"><div><div><p class="${"block mr-1 -mb-2"}">${escape(pack.description)}</p>
                                                    </div></div>
                                                <button ${pack.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-34sil3"}"><p class="${"text-2xl"}"><b class="${"mr-1 font-normal"}">${escape(pack.cost)}</b>$
                                                    </p></button>
                                            </div></div>
                                    </div>`)}`
			: ``}</div></div></div>`
		: ``}</div>
        <div class="${"mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3"}">${userPlayer
		? `${validate_component(AdblockAlert, "AdblockAlert").$$render(
				$$result,
				{
					class: "lg:mr-12 text-center lg:text-left",
					user: userPlayer.user
				},
				{},
				{}
			)}`
		: ``}
            <h3 class="${"text-5xl lg:mr-12 text-center lg:text-left"}">How does it works ?
            </h3>
            <div class="${"pt-4"}"><div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">1.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Click</p>
                    <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0"}">Click on the item you want to purchase
                    </p></div>
                <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">2.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Add</p>
                    <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0"}">Add the Winhalla Steam account to your friend list
                    </p></div>
                <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">3.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Receive</p>
                    <p class="${"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7"}">You will receive the item you purchased within 1 week to 1 month
                    </p></div>
                <div class="${"mt-30"}"><h3 class="${"text-5xl lg:mr-12 text-center lg:text-left"}">Lottery
                    </h3>
                    <div class="${"pt-4"}"><div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">1.</p>
                            <p class="${"text-4xl text-primary ml-2 leading-none"}"><br>Buy a ticket</p>
                            <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0"}">A ticket will give you a chance to win the prize you have chosen.
                            </p></div>
                        <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">2.</p>
                            <p class="${"text-4xl text-primary ml-2 leading-none"}">Multiple tickets</p>
                            <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0"}">The more tickets you buy, the more chances to win you have !
                            </p></div>
                        <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">3.</p>
                            <p class="${"text-4xl text-primary ml-2 leading-none"}">Win</p>
                            <p class="${"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7"}">If you win a prize, an email will be sent to the adress you specified when you
                                created
                                the account
                            </p></div>
                        <div class="${"block mt-10"}"><div class="${"flex"}"><input class="${"mr-3"}" type="${"range"}" step="${"100"}" min="${"100"}" max="${"10000"}"${add_attribute("value", ticketsNb, 1)}>
                                ${validate_component(RefreshButton, "RefreshButton").$$render(
			$$result,
			{
				refreshMessage: `Put ${ticketsNb} in the lottery`,
				isRefreshing: isLoadingTicket
			},
			{},
			{}
		)}</div>

                            <div class="${"flex mt-8"}"><button class="${"button button-brand svelte-34sil3"}" onclick="${"playAd('enterLottery')"}">Play ad for
                                    lottery
                                </button>
                                <button class="${"button button-brand ml-4 svelte-34sil3"}" onclick="${"playAd('earnCoins')"}" ${!!countDown ? "disabled" : ""}>${escape(!!countDown ? countDown : "Play ad for money")}</button></div></div></div></div></div></div></div>`}
<div><input id="${"transfer"}" value="${"0"}" hidden>
    ${adError
	? `${validate_component(ErrorAlert, "ErrorAlert").$$render(
			$$result,
			{
				message: "An error occured while watching the ad",
				pushError: adError
			},
			{},
			{}
		)}`
	: ``}
    <script data-playerPro="${"current"}">function playAd(goal) {
            const init = (api) => {
                if (api) {
                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 1, goal });
                        //api.setAdVolume(1);
                        document.body.onblur = function() {
                            //api.pauseAd();
                        };
                        document.body.onfocus = function() {
                            //api.resumeAd();
                        };
                    });
                    api.on("AdVideoFirstQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 2 });
                    });
                    api.on("AdVideoMidpoint", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 3 });
                    });
                    api.on("AdVideoThirdQuartile", () => {
                        document.getElementById("transfer").value = JSON.stringify({ state: 4 });
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = JSON.stringify({ state: 5 });
                        setTimeout(() => {
                            document.getElementById("transfer").value = JSON.stringify({ state: 0 });
                        }, 1200);
                        document.body.onblur = null;
                        document.body.onfocus = null;
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\\"current\\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
                after: s,
                init: init
            });
        }
    </script></div>
<div hidden class="${"-mb-1"}"></div>`;
});

var component_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Shop
});

/* src\routes\test.svelte generated by Svelte v3.31.0 */

const Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	return `<body><button class="${"button"}">Refresh</button></body>`;
});

var component_17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Test
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
			// create-account.svelte
			pattern: /^\/create-account\/?$/,
			parts: [
				{ name: "create$45account", file: "create-account.svelte", component: component_1 }
			]
		},

		{
			// change-email.svelte
			pattern: /^\/change-email\/?$/,
			parts: [
				{ name: "change$45email", file: "change-email.svelte", component: component_2 }
			]
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: component_3 }
			]
		},

		{
			// feltrom/admin/index.svelte
			pattern: /^\/feltrom\/admin\/?$/,
			parts: [
				null,
				{ name: "feltrom_admin", file: "feltrom/admin/index.svelte", component: component_4 }
			]
		},

		{
			// offline.svelte
			pattern: /^\/offline\/?$/,
			parts: [
				{ name: "offline", file: "offline.svelte", component: component_5 }
			]
		},

		{
			// privacy.svelte
			pattern: /^\/privacy\/?$/,
			parts: [
				{ name: "privacy", file: "privacy.svelte", component: component_6 }
			]
		},

		{
			// status.svelte
			pattern: /^\/status\/?$/,
			parts: [
				{ name: "status", file: "status.svelte", component: component_7 }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: component_8 }
			]
		},

		{
			// terms.svelte
			pattern: /^\/terms\/?$/,
			parts: [
				{ name: "terms", file: "terms.svelte", component: component_9 }
			]
		},

		{
			// tests/[id].svelte
			pattern: /^\/tests\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "tests_$id", file: "tests/[id].svelte", component: component_10, params: match => ({ id: d(match[1]) }) }
			]
		},

		{
			// help.svelte
			pattern: /^\/help\/?$/,
			parts: [
				{ name: "help", file: "help.svelte", component: component_11 }
			]
		},

		{
			// link/[id].svelte
			pattern: /^\/link\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "link_$id", file: "link/[id].svelte", component: component_12, params: match => ({ id: d(match[1]) }) }
			]
		},

		{
			// play/index.svelte
			pattern: /^\/play\/?$/,
			parts: [
				{ name: "play", file: "play/index.svelte", component: component_13 }
			]
		},

		{
			// play/ffa/index.svelte
			pattern: /^\/play\/ffa\/?$/,
			parts: [
				null,
				{ name: "play_ffa", file: "play/ffa/index.svelte", component: component_14 }
			]
		},

		{
			// play/ffa/[id].svelte
			pattern: /^\/play\/ffa\/([^/]+?)\/?$/,
			parts: [
				null,
				null,
				{ name: "play_ffa_$id", file: "play/ffa/[id].svelte", component: component_15, params: match => ({ id: d(match[1]) }) }
			]
		},

		{
			// shop.svelte
			pattern: /^\/shop\/?$/,
			parts: [
				{ name: "shop", file: "shop.svelte", component: component_16 }
			]
		},

		{
			// test.svelte
			pattern: /^\/test\/?$/,
			parts: [
				{ name: "test", file: "test.svelte", component: component_17 }
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
const dev = NODE_ENV === "development";
let throttler = [];
express__default['default']() // You can also use Express
    .use((req, res, next) => {
        if (req.path.includes("assets") || req.path.includes("css")) return next();
        let i = throttler.findIndex(e => e.ip == req.ip);
        let user1 = throttler[i];
        if (user1) {
            if (Date.now() - 300 * 1000 > user1.timestamp) {
                user1.requests = 1;
                user1.timestamp = Date.now();
                console.log("test");
            }
            //else if (user1.requests == 75) return res.sendStatus(429)
            else user1.requests += 1;
            throttler[i] = user1;
            next();
        } else {
            throttler.push({ ip: req.ip, requests: 1, timestamp: Date.now() });
            next();
        }
    })
    .use(
        compression__default['default']({ threshold: 0 }),
        sirv__default['default']("static", { dev }),
        middleware()
    )
    .set("x-powered-by", false)
    .listen(80);
