'use strict';

var sirv = require('sirv');
var express = require('express');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var cookie = require('cookie');
require('chart.js');
var socket_ioClient = require('socket.io-client');
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
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

function noop() { }
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
function null_to_empty(value) {
    return value == null ? '' : value;
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

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
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

/* src\components\Infos.svelte generated by Svelte v3.31.0 */

const Infos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { pushError } = $$props;
	let { message } = $$props;
	if ($$props.pushError === void 0 && $$bindings.pushError && pushError !== void 0) $$bindings.pushError(pushError);
	if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);

	return `<div class="${"z-20 fixed right-0 top-30 lg:top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary"}"><h3 class="${"text-primary text-3xl"}">${escape(message)}</h3>
    <p class="${"text-white text-2xl"}">${escape(pushError)}</p></div>`;
});

const apiUrl = "https://api.winhalla.app";

/* src\routes\index.svelte generated by Svelte v3.31.0 */

const css = {
	code: ".video-container.svelte-6bsoza::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.3) 0%,\r\n                rgba(23, 23, 26, 0.4),\r\n                rgba(23, 23, 26, 0.6) 75%,\r\n                rgba(23, 23, 26, 1) 100%\r\n        )}@keyframes svelte-6bsoza-arrow{0%{transform:translateY(0rem)}100%{transform:translateY(0.55rem)}}.arrow-svg.svelte-6bsoza{animation:svelte-6bsoza-arrow 0.8s infinite alternate ease-in-out}.cards.svelte-6bsoza{height:calc(100% + 5rem)}button.svelte-6bsoza:disabled{@apply bg-disabled;;cursor:not-allowed}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { fly, fade } from \\\"svelte/transition\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { gtagEvent } from \\\"../utils/gtagEvent\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n\\r\\n\\r\\n    let isRegisterPopupOpen = false;\\r\\n    let email;\\r\\n    let valid = null; \\r\\n    let info;\\r\\n    onMount(async () => {\\r\\n        const urlParams = new URLSearchParams(location.search);\\r\\n        if (urlParams.get(\\\"src\\\")) {\\r\\n            document.cookie = cookie.serialize(\\\"source\\\", urlParams.get(\\\"src\\\"), {\\r\\n                maxAge: 15552000,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            });\\r\\n        } else if (urlParams.get(\\\"utm_source\\\")) {\\r\\n            document.cookie = cookie.serialize(\\\"source\\\", urlParams.get(\\\"utm_source\\\"), {\\r\\n                maxAge: 15552000,\\r\\n                sameSite: \\\"lax\\\",\\r\\n                path: \\\"/\\\"\\r\\n            });\\r\\n        }\\r\\n    });\\r\\n\\r\\n    function toggleRegisterPopup() {\\r\\n        isRegisterPopupOpen = !isRegisterPopupOpen;\\r\\n    }\\r\\n\\r\\n    function toggleFAQ(entryId) {\\r\\n        faq[entryId].opened = !faq[entryId].opened;\\r\\n        // if(faq[entryId].opened === true) gtagEvent(\\\"FAQopened\\\",{question:faq[entryId].question})\\r\\n    }\\r\\n\\r\\n    async function register() {\\r\\n        toggleRegisterPopup();\\r\\n        let { source } = cookie.parse(document.cookie);\\r\\n        if ((await callApi(\\\"post\\\", `/preRegistration?email=${email}&source=${source}`)) instanceof Error) return;\\r\\n        document.cookie = \\\"source=0;maxAge=1\\\";\\r\\n        info = true;\\r\\n        setTimeout(() => {\\r\\n            info = false;\\r\\n        }, 5000);\\r\\n    }\\r\\n\\r\\n    const onKeyPressEmail = () => {\\r\\n        if (!email) return;\\r\\n        setTimeout(() => {\\r\\n            if (email.length > 0) {\\r\\n                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])/gm;\\r\\n                let exec = regex.exec(email);\\r\\n                valid = !!exec;\\r\\n            } else {\\r\\n                valid = null;\\r\\n            }\\r\\n        }, 1);\\r\\n\\r\\n    };\\r\\n\\r\\n    const faq = [\\r\\n        {\\r\\n            question: \\\"How can you give us some <u>paid items</u> for <u>free</u>?\\\",\\r\\n            answer: \\\"In life, nothing is free. We use <u>ads revenues</u> to buy the items.\\\",\\r\\n            opened: false\\r\\n        },\\r\\n\\r\\n        {\\r\\n            question: \\\"How do you get my <u>Brawlhalla stats</u>?\\\",\\r\\n            answer: \\\"We use the official <u>Brawlhalla API</u> to get your stats.\\\",\\r\\n            opened: false\\r\\n        },\\r\\n        {\\r\\n            question: \\\"<u>How long</u> does it take to get a Brawlhalla Battle Pass? (10$)\\\",\\r\\n            answer: \\\"It will take approximately <u>4 to 8 weeks</u> if used regularly. This value might change depending on the time spent on Brawlhalla and Winhalla.\\\",\\r\\n            opened: false\\r\\n        },\\r\\n        {\\r\\n            question: \\\"Why data refreshing takes so long?\\\",\\r\\n            answer: \\\"The Brawlhalla API has a <u>long refreshing rate</u>. Don't worry, come back later and it will be up to date!\\\",\\r\\n            opened: false\\r\\n        }\\r\\n    ];\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .video-container::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.3) 0%,\\r\\n                rgba(23, 23, 26, 0.4),\\r\\n                rgba(23, 23, 26, 0.6) 75%,\\r\\n                rgba(23, 23, 26, 1) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    @keyframes arrow {\\r\\n        0% {\\r\\n            transform: translateY(0rem);\\r\\n        }\\r\\n\\r\\n        100% {\\r\\n            transform: translateY(0.55rem);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .arrow-svg {\\r\\n        animation: arrow 0.8s infinite alternate ease-in-out;\\r\\n    }\\r\\n\\r\\n    .cards {\\r\\n        height: calc(100% + 5rem);\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .button2 {\\r\\n        display: inline-block;\\r\\n        border-radius: 0.25rem;\\r\\n        font-size: 1.25rem;\\r\\n        background-color: #3d72e4;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Play Brawlhalla. Earn rewards. - Winhalla</title>\\r\\n    <meta\\r\\n        name=\\\"description\\\"\\r\\n        content=\\\"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\\r\\n        Mammoth Coins, Season Packs and more! | Winhalla home page\\\" />\\r\\n\\r\\n    <link rel=\\\"canonical\\\" href=\\\"https://winhalla.app\\\" />\\r\\n</svelte:head>\\r\\n<div class=\\\"pb-8 \\\" out:fly={{ y: -450, duration: 400 }}>\\r\\n    <div class=\\\"relative\\\">\\r\\n        <div class=\\\"absolute top-7 left-7 lg:left-24 lg:top-10 z-10\\\">\\r\\n            <h1 class=\\\"text-6xl lg:text-8xl text-shadow-base\\\">\\r\\n                PLAY\\r\\n                <b class=\\\"text-accent\\\">BRAWLHALLA</b>\\r\\n                <br />\\r\\n                EARN\\r\\n                <b class=\\\"text-accent\\\">REWARDS</b>\\r\\n            </h1>\\r\\n        </div>\\r\\n        <div\\r\\n            class=\\\"video-container relative z-0 overflow-hidden w-full\\r\\n            h-screen-60 lg:h-screen\\\">\\r\\n            <video\\r\\n                class=\\\"w-full h-full object-cover\\\"\\r\\n                preload=\\\"true\\\"\\r\\n                loop\\r\\n                playsinline\\r\\n                autoplay\\r\\n                muted>\\r\\n                <source\\r\\n                    src=\\\"/assets/video/brawlhalla-gameplay.mp4\\\"\\r\\n                    type=\\\"video/mp4\\\" />\\r\\n            </video>\\r\\n        </div>\\r\\n\\r\\n        <div id=\\\"pre-register\\\"\\r\\n\\r\\n             class=\\\"tip absolute left-0 right-0 bottom-20 text-center hidden\\r\\n            lg:block\\\">\\r\\n            <p class=\\\"text-2xl\\\">Learn more</p>\\r\\n            <svg\\r\\n                class=\\\"fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg\\\"\\r\\n                xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                viewBox=\\\"0 0 20 20\\\">\\r\\n                <path\\r\\n                    d=\\\"M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707\\r\\n                    7.778-7.778-1.414-1.414L11 16.172V0H9z\\\" />\\r\\n            </svg>\\r\\n        </div>\\r\\n    </div>\\r\\n    <div class=\\\"pt-14 lg:pt-24\\\">\\r\\n        <section\\r\\n            class=\\\"cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row\\r\\n            items-center lg:justify-around\\\">\\r\\n            <div class=\\\"pb-18 lg:pb-0\\\">\\r\\n                <div\\r\\n                    class=\\\"card p-4 w-78 h-106 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">1</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <h3 class=\\\"text-4xl leading-9\\\">\\r\\n                            <b class=\\\"text-primary font-normal\\\">Choose</b>\\r\\n                            a game mode\\r\\n                        </h3>\\r\\n                        <ul class=\\\"text-extra-light text-2xl text-left pt-8 px-4\\\">\\r\\n                            <li><b class=\\\"text-green font-normal\\\">SOLO</b>: Each participant Play’s <u>7</u> brawlhalla\\r\\n                                <u>games</u>: be the one with the <u>most wins</u>.\\r\\n                            </li>\\r\\n                            <li class=\\\"mt-3\\\"><b class=\\\"text-green font-normal\\\">DUOS</b>: Work in progress</li>\\r\\n                        </ul>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div class=\\\"pb-18 lg:pb-0\\\">\\r\\n                <div\\r\\n                    class=\\\"card p-4 w-78 h-106 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">2</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <h3 class=\\\"text-4xl leading-9\\\">\\r\\n                            Earn\\r\\n                            <b class=\\\"text-primary font-normal\\\">coins</b>...\\r\\n                        </h3>\\r\\n                        <ul class=\\\"text-extra-light text-2xl text-left pt-8 px-6\\\">\\r\\n                            <li><b class=\\\"text-green font-normal\\\">By playing</b> some <u>solo</u> and <u>Duo</u> games\\r\\n                            </li>\\r\\n                            <li class=\\\"mt-3\\\"><b class=\\\"text-green font-normal\\\">By completing</b> the <u>quests</u>\\r\\n                                available on the website\\r\\n                            </li>\\r\\n                        </ul>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            <div>\\r\\n                <div\\r\\n                    class=\\\"card p-4 w-78 h-106 hover:shadow-card-hover border\\r\\n                    border-transparent hover:border-primary\\\">\\r\\n                    <p class=\\\"text-9xl\\\">3</p>\\r\\n                    <div class=\\\"\\\">\\r\\n                        <p class=\\\"text-4xl leading-9 px-2\\\">\\r\\n                            ...and <b class=\\\"text-primary font-normal\\\">Spend</b> them in the <b\\r\\n                            class=\\\"text-primary font-normal\\\">shop</b>!\\r\\n                        </p>\\r\\n                        <p class=\\\"text-extra-light text-2xl text-left pt-8 px-4\\\">\\r\\n                            <b class=\\\"text-green font-normal\\\">Exchange</b> the <u>coins</u> you earned for some well\\r\\n                            deserved <b class=\\\"text-legendary font-normal\\\">rewards</b>:\\r\\n                            <a class=\\\"text-primary text-xl ml-1\\\" href=\\\"/shop\\\">Click here</a>\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </section>\\r\\n        <section class=\\\"ml-8 lg:mx-0 mt-20 lg:mt-28  lg:w-full  flex flex-col items-center\\\">\\r\\n            <div class=\\\"md:flex items-end\\\">\\r\\n                <h3 class=\\\"text-4/5xl md:text-5xl\\\"><b class=\\\"text-legendary font-normal\\\">No download</b> required:</h3>\\r\\n                <p class=\\\"mt-1 md:mt-0 ml-0 md:ml-3 text-3xl md:text-4xl\\\">\\r\\n                    <b class=\\\"text-accent font-normal\\\">Use winhalla</b> directly <b class=\\\"text-primary font-normal\\\">in\\r\\n                    your browser</b>\\r\\n                </p>\\r\\n            </div>\\r\\n            <ul class=\\\"mt-7 lg:ml-108 text-2xl pr-2\\\">\\r\\n                <li class=\\\"flex items-center\\\">\\r\\n                    <svg\\r\\n                        class=\\\"fill-current w-7 mr-2\\r\\n                                            text-green\\\"\\r\\n                        viewBox=\\\"0 0 27 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                    </svg>\\r\\n                    <p><b class=\\\"text-primary font-normal\\\">Saves</b> your <u> computer's resources</u></p></li>\\r\\n\\r\\n                <li class=\\\"flex items-center mt-3 lg:mt-2\\\">\\r\\n                    <svg\\r\\n                        class=\\\"fill-current w-7 mr-2\\r\\n                                            text-green\\\"\\r\\n                        viewBox=\\\"0 0 27 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                    </svg>\\r\\n                    <p><b class=\\\"text-primary font-normal\\\">Access</b> the website <u>on your phone</u></p></li>\\r\\n\\r\\n                <li class=\\\"flex items-center mt-3 lg:mt-2\\\">\\r\\n                    <svg\\r\\n                        class=\\\"fill-current w-9 md:w-7 mr-2\\r\\n                                            text-green\\\"\\r\\n                        viewBox=\\\"0 0 27 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                    </svg>\\r\\n                    <p><b class=\\\"text-primary font-normal\\\">Available</b> for <u>computer</u>, <u>console</u> and <u>mobile</u>\\r\\n                        players</p></li>\\r\\n            </ul>\\r\\n        </section>\\r\\n        <section id=\\\"mob-pre-register\\\" class=\\\"join-us w-full text-center mt-22 lg:mt-28 pb-10\\\">\\r\\n            <h2 class=\\\"text-5xl md:text-6xl lg:text-7xl\\\">Ready? Create an account now (no email required)</h2>\\r\\n            <button class=\\\"button button-brand mt-8\\\">\\r\\n                Login NOW\\r\\n            </button>\\r\\n\\r\\n        </section>\\r\\n\\r\\n        <section class=\\\"mt-9 pl-8 md:ml-0 w-full flex justify-center\\\">\\r\\n            <div class=\\\"md:w-3/4 xl:w-1/2\\\">\\r\\n                <h2 class=\\\"text-7xl mb-3 text-primary\\\">FAQ</h2>\\r\\n                {#each faq as entry,i}\\r\\n                    <button\\r\\n                        class=\\\"w-full flex justify-start items-center  p-3  pr-3 md:pr-6  focus:outline-none\\\"\\r\\n                        on:click={()=>toggleFAQ(i)}>\\r\\n\\r\\n                        <p class=\\\"text-3xl text-left w-95% md:w-full\\\">{@html entry.question}</p>\\r\\n\\r\\n                        <svg class=\\\"w-7 h-11 md:w-4 md:h-6 fill-current md:-mt-2 md:-ml-4 md:mr-3\\\"\\r\\n                             viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            {#if entry.opened}\\r\\n                                <path\\r\\n                                    d=\\\"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z\\\" />\\r\\n                            {:else}\\r\\n                                <path\\r\\n                                    d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                            {/if}\\r\\n                        </svg>\\r\\n                    </button>\\r\\n                    {#if entry.opened}\\r\\n                        <div class=\\\"ml-8 md:ml-14 mb-5  text-default text-light \\\">\\r\\n                            <p class=\\\"text-2xl text-left\\\">{@html entry.answer}</p>\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                {/each}\\r\\n            </div>\\r\\n\\r\\n        </section>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AA2FI,8BAAgB,OAAO,AAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC;gBACzB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;gBACtB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI;SAC/B,AACL,CAAC,AAED,WAAW,mBAAM,CAAC,AACd,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,WAAW,IAAI,CAAC,AAC/B,CAAC,AAED,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,WAAW,OAAO,CAAC,AAClC,CAAC,AACL,CAAC,AAED,UAAU,cAAC,CAAC,AACR,SAAS,CAAE,mBAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,SAAS,CAAC,WAAW,AACxD,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,AAC7B,CAAC,AAED,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	onMount(async () => {
		const urlParams = new URLSearchParams(location.search);

		if (urlParams.get("src")) {
			document.cookie = cookie__default['default'].serialize("source", urlParams.get("src"), {
				maxAge: 15552000,
				sameSite: "lax",
				path: "/"
			});
		} else if (urlParams.get("utm_source")) {
			document.cookie = cookie__default['default'].serialize("source", urlParams.get("utm_source"), {
				maxAge: 15552000,
				sameSite: "lax",
				path: "/"
			});
		}
	});

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
	];

	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Play Brawlhalla. Earn rewards. - Winhalla</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\r\n        Mammoth Coins, Season Packs and more! | Winhalla home page"}" data-svelte="svelte-19tqu7o"><link rel="${"canonical"}" href="${"https://winhalla.app"}" data-svelte="svelte-19tqu7o">`, "")}
<div class="${"pb-8 "}"><div class="${"relative"}"><div class="${"absolute top-7 left-7 lg:left-24 lg:top-10 z-10"}"><h1 class="${"text-6xl lg:text-8xl text-shadow-base"}">PLAY
                <b class="${"text-accent"}">BRAWLHALLA</b>
                <br>
                EARN
                <b class="${"text-accent"}">REWARDS</b></h1></div>
        <div class="${"video-container relative z-0 overflow-hidden w-full\r\n            h-screen-60 lg:h-screen svelte-6bsoza"}"><video class="${"w-full h-full object-cover"}" preload="${"true"}" loop playsinline autoplay muted><source src="${"/assets/video/brawlhalla-gameplay.mp4"}" type="${"video/mp4"}"></video></div>

        <div id="${"pre-register"}" class="${"tip absolute left-0 right-0 bottom-20 text-center hidden\r\n            lg:block"}"><p class="${"text-2xl"}">Learn more</p>
            <svg class="${"fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg svelte-6bsoza"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}"><path d="${"M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707\r\n                    7.778-7.778-1.414-1.414L11 16.172V0H9z"}"></path></svg></div></div>
    <div class="${"pt-14 lg:pt-24"}"><section class="${"cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row\r\n            items-center lg:justify-around svelte-6bsoza"}"><div class="${"pb-18 lg:pb-0"}"><div class="${"card p-4 w-78 h-106 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">1</p>
                    <div class="${""}"><h3 class="${"text-4xl leading-9"}"><b class="${"text-primary font-normal"}">Choose</b>
                            a game mode
                        </h3>
                        <ul class="${"text-extra-light text-2xl text-left pt-8 px-4"}"><li><b class="${"text-green font-normal"}">SOLO</b>: Each participant Play’s <u>7</u> brawlhalla
                                <u>games</u>: be the one with the <u>most wins</u>.
                            </li>
                            <li class="${"mt-3"}"><b class="${"text-green font-normal"}">DUOS</b>: Work in progress</li></ul></div></div></div>
            <div class="${"pb-18 lg:pb-0"}"><div class="${"card p-4 w-78 h-106 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">2</p>
                    <div class="${""}"><h3 class="${"text-4xl leading-9"}">Earn
                            <b class="${"text-primary font-normal"}">coins</b>...
                        </h3>
                        <ul class="${"text-extra-light text-2xl text-left pt-8 px-6"}"><li><b class="${"text-green font-normal"}">By playing</b> some <u>solo</u> and <u>Duo</u> games
                            </li>
                            <li class="${"mt-3"}"><b class="${"text-green font-normal"}">By completing</b> the <u>quests</u>
                                available on the website
                            </li></ul></div></div></div>
            <div><div class="${"card p-4 w-78 h-106 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary"}"><p class="${"text-9xl"}">3</p>
                    <div class="${""}"><p class="${"text-4xl leading-9 px-2"}">...and <b class="${"text-primary font-normal"}">Spend</b> them in the <b class="${"text-primary font-normal"}">shop</b>!
                        </p>
                        <p class="${"text-extra-light text-2xl text-left pt-8 px-4"}"><b class="${"text-green font-normal"}">Exchange</b> the <u>coins</u> you earned for some well
                            deserved <b class="${"text-legendary font-normal"}">rewards</b>:
                            <a class="${"text-primary text-xl ml-1"}" href="${"/shop"}">Click here</a></p></div></div></div></section>
        <section class="${"ml-8 lg:mx-0 mt-20 lg:mt-28  lg:w-full  flex flex-col items-center"}"><div class="${"md:flex items-end"}"><h3 class="${"text-4/5xl md:text-5xl"}"><b class="${"text-legendary font-normal"}">No download</b> required:</h3>
                <p class="${"mt-1 md:mt-0 ml-0 md:ml-3 text-3xl md:text-4xl"}"><b class="${"text-accent font-normal"}">Use winhalla</b> directly <b class="${"text-primary font-normal"}">in
                    your browser</b></p></div>
            <ul class="${"mt-7 lg:ml-108 text-2xl pr-2"}"><li class="${"flex items-center"}"><svg class="${"fill-current w-7 mr-2\r\n                                            text-green"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                    <p><b class="${"text-primary font-normal"}">Saves</b> your <u>computer&#39;s resources</u></p></li>

                <li class="${"flex items-center mt-3 lg:mt-2"}"><svg class="${"fill-current w-7 mr-2\r\n                                            text-green"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                    <p><b class="${"text-primary font-normal"}">Access</b> the website <u>on your phone</u></p></li>

                <li class="${"flex items-center mt-3 lg:mt-2"}"><svg class="${"fill-current w-9 md:w-7 mr-2\r\n                                            text-green"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                    <p><b class="${"text-primary font-normal"}">Available</b> for <u>computer</u>, <u>console</u> and <u>mobile</u>
                        players</p></li></ul></section>
        <section id="${"mob-pre-register"}" class="${"join-us w-full text-center mt-22 lg:mt-28 pb-10"}"><h2 class="${"text-5xl md:text-6xl lg:text-7xl"}">Ready? Create an account now (no email required)</h2>
            <button class="${"button button-brand mt-8 svelte-6bsoza"}">Login NOW
            </button></section>

        <section class="${"mt-9 pl-8 md:ml-0 w-full flex justify-center"}"><div class="${"md:w-3/4 xl:w-1/2"}"><h2 class="${"text-7xl mb-3 text-primary"}">FAQ</h2>
                ${each(faq, (entry, i) => `<button class="${"w-full flex justify-start items-center  p-3  pr-3 md:pr-6  focus:outline-none svelte-6bsoza"}"><p class="${"text-3xl text-left w-95% md:w-full"}">${entry.question}</p>

                        <svg class="${"w-7 h-11 md:w-4 md:h-6 fill-current md:-mt-2 md:-ml-4 md:mr-3"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}">${entry.opened
	? `<path d="${"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z"}"></path>`
	: `<path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path>`}</svg></button>
                    ${entry.opened
	? `<div class="${"ml-8 md:ml-14 mb-5  text-default text-light "}"><p class="${"text-2xl text-left"}">${entry.answer}</p>
                        </div>`
	: ``}`)}</div></section></div></div>`;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes
});

/* src\routes\create-account.svelte generated by Svelte v3.31.0 */

const css$1 = {
	code: "input.svelte-6s0wf7{@apply w-full text-background bg-font py-3 px-4 rounded;}",
	map: "{\"version\":3,\"file\":\"create-account.svelte\",\"sources\":[\"create-account.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n\\r\\n    let status = \\\"\\\"\\r\\n    let password = ''\\r\\n    let username = ''\\r\\n    async function createAccount(){\\r\\n        const result = await callApi('post',`/auth/createEmailPassword?username=${username}&password=${password}`)\\r\\n        if(result instanceof Error && result.response.status >=400 && result.response.status < 499) status = result.data\\r\\n    }\\r\\n</script>\\r\\n<style>\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n</style>\\r\\n<div >\\r\\n    <input type=\\\"text\\\" class=\\\"text-black\\\" bind:value={username} placeholder=\\\"Username\\\">\\r\\n    <input type=\\\"password\\\" class=\\\"text-black\\\"  bind:value={password} placeholder=\\\"Password\\\">\\r\\n    <button on:click={createAccount}>Create Account</button>\\r\\n    <div class=\\\"text-legendary\\\" class:hidden={!status}>{status}</div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAYI,KAAK,cAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC\"}"
};

const Create_account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let status = "";
	let password = "";
	let username = "";

	$$result.css.add(css$1);

	return `<div><input type="${"text"}" class="${"text-black svelte-6s0wf7"}" placeholder="${"Username"}"${add_attribute("value", username, 1)}>
    <input type="${"password"}" class="${"text-black svelte-6s0wf7"}" placeholder="${"Password"}"${add_attribute("value", password, 1)}>
    <button>Create Account</button>
    <div class="${["text-legendary",  "hidden" ].join(" ").trim()}">${escape(status)}</div></div>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Create_account
});

const CONTEXT_KEY = {};

/* src\components\Tailwindcss.svelte generated by Svelte v3.31.0 */

const css$2 = {
	code: "@tailwind base;@tailwind components;@tailwind utilities;",
	map: "{\"version\":3,\"file\":\"Tailwindcss.svelte\",\"sources\":[\"Tailwindcss.svelte\"],\"sourcesContent\":[\"<style global>\\r\\n    @tailwind base;\\r\\n    @tailwind components;\\r\\n    @tailwind utilities;\\r\\n\\r\\n    .ppMask {\\r\\n        opacity: 0.05;\\r\\n    }\\r\\n\\r\\n    .button {\\r\\n        display: inline-block;\\r\\n        padding: 0.75rem 2.5rem;\\r\\n        border-radius: 0.4rem;\\r\\n        font-size: 1.25rem;\\r\\n        background-color: #3d72e4;\\r\\n    }\\r\\n\\r\\n    .button-brand:hover {\\r\\n        -webkit-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative {\\r\\n        background-color: #1a1a21;\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);\\r\\n        border: 1px solid #3d72e4;\\r\\n    }\\r\\n\\r\\n    .button-brand-alternative:hover {\\r\\n        -webkit-box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n        box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.125);\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        -webkit-box-shadow: rgba(0, 0, 0, 0.125) 0px 0px 8px;\\r\\n        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 8px;\\r\\n        @apply bg-variant rounded-2xl;\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar {\\r\\n        width: 18px;\\r\\n        height: 18px;\\r\\n        cursor: pointer;\\r\\n\\r\\n        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/\\r\\n\\r\\n    }\\r\\n\\r\\n    .scrollbar::-webkit-scrollbar-thumb {\\r\\n        height: 3px;\\r\\n        border: 6px solid rgba(0, 0, 0, 0);\\r\\n        background-clip: padding-box;\\r\\n        -webkit-border-radius: 15px;\\r\\n        background-color: #1b1b27;\\r\\n        -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);\\r\\n        /*outline: 1px solid slategrey;*/\\r\\n    }\\r\\n\\r\\n    .scrollbar-background::-webkit-scrollbar-thumb {\\r\\n        background-color: #17171a;\\r\\n    }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AACI,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC\"}"
};

const Tailwindcss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$2);
	return ``;
});

/* src\components\Navigation\NavAccount.svelte generated by Svelte v3.31.0 */

const css$3 = {
	code: ".username.svelte-i9vj87{margin-left:0.4rem}.dropdown.svelte-i9vj87{top:3.8rem;left:0;right:0}",
	map: "{\"version\":3,\"file\":\"NavAccount.svelte\",\"sources\":[\"NavAccount.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import { apiUrl } from \\\"../../utils/config\\\";\\r\\n\\r\\n    export let username;\\r\\n    export let avatar;\\r\\n\\r\\n    let isDropdownOpen;\\r\\n    const handleClick = () => {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n    };\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .username {\\r\\n        margin-left: 0.4rem;\\r\\n    }\\r\\n\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n        left: 0;\\r\\n        right: 0;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"lg:relative\\\">\\r\\n    <div class=\\\"flex items-center h-full\\\">\\r\\n        <button\\r\\n            class=\\\"focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded\\\"\\r\\n            use:clickOutside\\r\\n            on:click_outside={() => (isDropdownOpen = false)}\\r\\n            on:click={() => handleClick()}>\\r\\n            <div class=\\\"flex items-center\\\">\\r\\n                <img class=\\\"w-10 h-10 rounded-full\\\" src={avatar} alt=\\\"Avatar\\\" />\\r\\n                <p class=\\\"text-xl mr-2 username\\\">{username}</p>\\r\\n                <svg\\r\\n                    class=\\\"w-4 h-6 fill-current hidden lg:block\\\"\\r\\n                    viewBox=\\\"0 0 24 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n        </button>\\r\\n    </div>\\r\\n\\r\\n    <div\\r\\n        class:lg:hidden={!isDropdownOpen}\\r\\n        class=\\\"pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card\\r\\n            dropdown z-50 lg:border lg:border-primary\\\">\\r\\n        <a class=\\\"block text-lg border-l border-red-600 py-3\\r\\n                lg:hover:bg-primary lg:hover:text-font px-3 rounded-sm\\r\\n                lg:border-none\\\" href=\\\"/referral-link?visible=true\\\">Invite friends and earn rewards</a>\\r\\n        <a\\r\\n            class=\\\"block text-red-500 text-lg border-l border-red-600 py-3\\r\\n                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm\\r\\n                lg:border-none mb-3 lg:mb-0\\\"\\r\\n            href=\\\"{apiUrl}/auth/logout\\\">Logout</a>\\r\\n\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAcI,SAAS,cAAC,CAAC,AACP,WAAW,CAAE,MAAM,AACvB,CAAC,AAED,SAAS,cAAC,CAAC,AACP,GAAG,CAAE,MAAM,CACX,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,AACZ,CAAC\"}"
};

const NavAccount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { username } = $$props;
	let { avatar } = $$props;

	if ($$props.username === void 0 && $$bindings.username && username !== void 0) $$bindings.username(username);
	if ($$props.avatar === void 0 && $$bindings.avatar && avatar !== void 0) $$bindings.avatar(avatar);
	$$result.css.add(css$3);

	return `<div class="${"lg:relative"}"><div class="${"flex items-center h-full"}"><button class="${"focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded"}"><div class="${"flex items-center"}"><img class="${"w-10 h-10 rounded-full"}"${add_attribute("src", avatar, 0)} alt="${"Avatar"}">
                <p class="${"text-xl mr-2 username svelte-i9vj87"}">${escape(username)}</p>
                <svg class="${"w-4 h-6 fill-current hidden lg:block"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div></button></div>

    <div class="${[
		"pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card\r\n            dropdown z-50 lg:border lg:border-primary svelte-i9vj87",
		 "lg:hidden" 
	].join(" ").trim()}"><a class="${"block text-lg border-l border-red-600 py-3\r\n                lg:hover:bg-primary lg:hover:text-font px-3 rounded-sm\r\n                lg:border-none"}" href="${"/referral-link?visible=true"}">Invite friends and earn rewards</a>
        <a class="${"block text-red-500 text-lg border-l border-red-600 py-3\r\n                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm\r\n                lg:border-none mb-3 lg:mb-0"}" href="${escape(apiUrl) + "/auth/logout"}">Logout</a></div></div>`;
});

let counter = writable({ content: getUser(), refresh: false });
    //counter = writable({ content: "err", refresh: false });


counter.subscribe((value) => {
    if (value.refresh === true) {
        counter.set({ content: getUser(), refresh: false });
    }
});

/* src\components\Navigation\NavNotifications.svelte generated by Svelte v3.31.0 */

const css$4 = {
	code: ".dropdown.svelte-1dh8p3n.svelte-1dh8p3n{top:3.8rem}.bell-button.svelte-1dh8p3n:hover .bell.svelte-1dh8p3n{display:none}.bell-button.svelte-1dh8p3n:hover .bell-hover.svelte-1dh8p3n{display:block}.notification.svelte-1dh8p3n.svelte-1dh8p3n{border-radius:10px;@apply flex justify-between px-4 py-3 mt-3 mb-1 relative overflow-hidden w-full;}.gradient.svelte-1dh8p3n.svelte-1dh8p3n{background-image:linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);background-size:300%;animation:svelte-1dh8p3n-gradient-animation 4.5s linear infinite}@keyframes svelte-1dh8p3n-gradient-animation{0%{background-position:right}100%{background-position:left}}",
	map: "{\"version\":3,\"file\":\"NavNotifications.svelte\",\"sources\":[\"NavNotifications.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import { callApi } from \\\"../../utils/api.js\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { counter } from \\\"../stores\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n\\r\\n    export let page;\\r\\n    export let data;\\r\\n    let newNotifications = false;\\r\\n    let isDropdownOpen = false;\\r\\n    let matchesLength;\\r\\n    let timerIds = [];\\r\\n    let dontGo = false;\\r\\n\\r\\n    function go(id, matchId) {\\r\\n        setTimeout(() => {\\r\\n            if(dontGo === true) return dontGo = false\\r\\n            if (id === 0) goto(\\\"/play/ffa/\\\" + matchId);\\r\\n            else if (id === 1) goto(\\\"/play\\\");\\r\\n        },5)\\r\\n    }\\r\\n\\r\\n    function handleClick() {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n    }\\r\\n\\r\\n    function toggleDropDown() {\\r\\n        setTimeout(() => {\\r\\n            isDropdownOpen = false;\\r\\n        }, 1);\\r\\n    }\\r\\n\\r\\n    function calculateTimers(e) {\\r\\n        if (!e) e = data;\\r\\n        matchesLength = e.inGame.length;\\r\\n        e.inGame.forEach((match, i) => {\\r\\n            let d = new Date(match.Date);\\r\\n            const endsIn = -(\\r\\n                (new Date().getTime() -\\r\\n                    new Date(d.setHours(d.getHours() + 1)).getTime()) /\\r\\n                1000\\r\\n            );\\r\\n            if (endsIn < 1) {\\r\\n                e.inGame[i].timer = \\\"\\\";\\r\\n            } else {\\r\\n                startTimer(endsIn, i);\\r\\n            }\\r\\n        });\\r\\n    }\\r\\n\\r\\n    onMount(() => {\\r\\n        if (!data.notifications) return;\\r\\n\\r\\n        let length = data.notifications.length;\\r\\n        let cookies = cookie.parse(document.cookie);\\r\\n\\r\\n        if (length > cookies.notificationNb || !cookies.notificationNb) {\\r\\n            newNotifications = true;\\r\\n        }\\r\\n\\r\\n        cookies.notificationNb = length;\\r\\n        matchesLength = data.inGame.length;\\r\\n        calculateTimers();\\r\\n\\r\\n        counter.subscribe(async (e) => {\\r\\n            if (e.refresh) return;\\r\\n            e = await e.content;\\r\\n            if (e.inGame) {\\r\\n                if (e.inGame.length !== matchesLength) {\\r\\n                    calculateTimers(e);\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n        //document.cookie = cookie.serialize(\\\"notificationNb\\\",cookies.notificationNb,{maxAge:15552000,sameSite:\\\"lax\\\"})\\r\\n        //document.cookie = cookie.serialize(cookies)\\r\\n    });\\r\\n\\r\\n    //TODO: on peut opti ça en utilisant la data de export let data au lieu de resubscribe pour save de la ram\\r\\n\\r\\n    function startTimer(duration, i) {\\r\\n        for (const ii in timerIds) {\\r\\n            clearInterval(ii);\\r\\n        }\\r\\n        timerIds = [];\\r\\n        let timer = duration,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        timerIds.push(setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            data.inGame[i].timer = hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = duration;\\r\\n            }\\r\\n        }, 1000));\\r\\n    }\\r\\n\\r\\n    const idToType = id => {\\r\\n        if (id === 0) return \\\"match finished\\\";\\r\\n        if (id === 1) return \\\"quest finished\\\";\\r\\n        if (id === 2) return \\\"match\\\";\\r\\n    };\\r\\n\\r\\n    function delNotif(id, index) {\\r\\n        callApi(\\\"post\\\", \\\"/deleteNotification/\\\" + id);\\r\\n        dontGo = true\\r\\n        data.notifications.splice(index, 1);\\r\\n        data = data;\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n    }\\r\\n\\r\\n    .bell-button:hover .bell {\\r\\n        display: none;\\r\\n    }\\r\\n\\r\\n    .bell-button:hover .bell-hover {\\r\\n        display: block;\\r\\n    }\\r\\n\\r\\n    .notification {\\r\\n        border-radius: 10px;\\r\\n        @apply flex justify-between px-4 py-3 mt-3 mb-1 relative overflow-hidden w-full;\\r\\n    }\\r\\n\\r\\n    .gradient {\\r\\n        background-image: linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);\\r\\n        background-size: 300%;\\r\\n        animation: gradient-animation 4.5s linear infinite;\\r\\n    }\\r\\n\\r\\n    @keyframes gradient-animation {\\r\\n\\r\\n        0% {\\r\\n            background-position: right;\\r\\n        }\\r\\n        100% {\\r\\n            background-position: left;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"relative\\\">\\r\\n    <div class=\\\"flex items-center h-full mr-4 lg:m-0\\\">\\r\\n        <div\\r\\n            class=\\\"focus:outline-none lg:ml-3 rounded bell-button cursor-pointer\\\"\\r\\n            on:click={() => {\\r\\n                document.cookie = cookie.serialize(\\r\\n                    'notificationNb',\\r\\n                    data.notifications.length,\\r\\n                    { maxAge: 15552000, sameSite: 'lax', path: '/' }\\r\\n                );\\r\\n                newNotifications = false;\\r\\n            }}\\r\\n            on:click={handleClick}>\\r\\n            <div class=\\\"flex items-center relative\\\">\\r\\n                {#if isDropdownOpen}\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\\r\\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\\r\\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\\r\\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\\r\\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\\r\\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\\r\\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\\r\\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\\r\\n                            1.125 1.126 1.125z\\\" />\\r\\n                    </svg>\\r\\n                {:else}\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current bell\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m19.945\\r\\n                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579\\r\\n                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619\\r\\n                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404\\r\\n                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3\\r\\n                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404\\r\\n                            3.135-3.135\\r\\n                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441\\r\\n                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505\\r\\n                            1.125-1.126\\r\\n                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886\\r\\n                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612\\r\\n                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572\\r\\n                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418\\r\\n                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z\\\" />\\r\\n                    </svg>\\r\\n                    <svg\\r\\n                        class=\\\"pt-1 w-5 lg:p-0 fill-current hidden bell-hover\\\"\\r\\n                        viewBox=\\\"0 0 21 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\\r\\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\\r\\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\\r\\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\\r\\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\\r\\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\\r\\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\\r\\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\\r\\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\\r\\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\\r\\n                            1.125 1.126 1.125z\\\" />\\r\\n                    </svg>\\r\\n                {/if}\\r\\n                {#if newNotifications}\\r\\n                    <span class=\\\"flex\\\">\\r\\n                        <span\\r\\n                            class=\\\"inline-flex animate-ping absolute top-0\\r\\n                            right-0 w-2 h-2 rounded-full bg-legendary opacity-75\\\"></span>\\r\\n                        <span\\r\\n                            class=\\\"inline-flex absolute top-0 right-0 w-2 h-2\\r\\n                            rounded-full bg-legendary\\\"></span>\\r\\n                    </span>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n    {#if isDropdownOpen || data?.event?.autoShow}\\r\\n        <div\\r\\n            class=\\\"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\\r\\n        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border\\r\\n        border-primary overflow-y-scroll max-h-screen-60 scrollbar\\\"\\r\\n            use:clickOutside\\r\\n            on:click_outside={toggleDropDown}>\\r\\n            <div>\\r\\n                {#if data.event}\\r\\n                    <div class=\\\"\\\">\\r\\n                        <p class=\\\"ml-1\\\">EVENTS</p>\\r\\n                        <div class=\\\"card notification flex items-center gradient\\\">\\r\\n\\r\\n                            <div class=\\\"\\\">\\r\\n                                {#if data.event.name}\\r\\n                                    <p class=\\\"ml-2 mr-6 lg:mr-12 text-3xl text-extra-light\\\">\\r\\n                                        {data.event.name}\\r\\n                                    </p>\\r\\n                                {/if}\\r\\n                                <p\\r\\n                                    class=\\\"ml-2 mr-6 lg:mr-12\\r\\n                                text-default\\\">\\r\\n                                    {data.event.descParts[0]}<u>{data.event.percentage - 100}\\r\\n                                    %</u>{data.event.descParts[1]}\\r\\n                                </p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {/if}\\r\\n                {#if data.notifications}\\r\\n                    <div\\r\\n                        class=\\\"mt-5\\\"\\r\\n                        on:click={() => {\\r\\n                        setTimeout(() => {\\r\\n                            if (isDropdownOpen === true) {\\r\\n                                document.cookie = cookie.serialize(\\r\\n                                    'notificationNb',\\r\\n                                    data.notifications.length,\\r\\n                                    {\\r\\n                                        maxAge: 15552000,\\r\\n                                        sameSite: 'lax',\\r\\n                                        path: '/'\\r\\n                                    }\\r\\n                                );\\r\\n                                newNotifications = false;\\r\\n                            }\\r\\n                        }, 1);\\r\\n                    }}>\\r\\n                        {#if data.notifications.length > 0}\\r\\n                            <p class=\\\"ml-1\\\">Notifications</p>\\r\\n                            <div>\\r\\n                                {#each data.notifications as notification, i}\\r\\n                                    <button\\r\\n                                        on:click={()=>go(notification.id,notification?.matchId)}\\r\\n                                        class=\\\"card notification flex items-center\\r\\n                                relative\\\" class:cursor-default={notification.id === 2}>\\r\\n                                        <div class=\\\"progress-container\\\">\\r\\n                                            <p class=\\\"mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                                {notification.message}\\r\\n                                            </p>\\r\\n                                            {#if notification.tip}\\r\\n                                                <p\\r\\n                                                    class=\\\" mr-6 lg:mr-12 text-light\\r\\n                                            text-lg\\\">\\r\\n                                                    {notification.tip}\\r\\n                                                </p>\\r\\n                                            {/if}\\r\\n                                        </div>\\r\\n                                        {#if idToType(notification.id)}\\r\\n                                        <span\\r\\n                                            class=\\\"quest-goal text-sm text-font px-2\\r\\n                                            py-1 bg-legendary rounded-lg b\\\">\\r\\n                                            {idToType(notification.id)}\\r\\n                                        </span>\\r\\n                                        {/if}\\r\\n                                        <button\\r\\n                                            on:click={() => delNotif(notification._id,i)}\\r\\n                                            class=\\\"-mt-2 -mr-2 lg:mt-0 lg:mr-0 absolute top-0 right-0 text-light\\r\\n                                    hover:text-font\\\">\\r\\n                                            <svg\\r\\n                                                class=\\\"m-3 lg:m-1 w-5 h-5 lg:w-4 lg:h-4 fill-current \\\"\\r\\n                                                viewBox=\\\"0 0 28 24\\\"\\r\\n                                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                                <path\\r\\n                                                    d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\" />\\r\\n                                            </svg>\\r\\n                                        </button>\\r\\n                                    </button>\\r\\n                                {/each}\\r\\n                            </div>\\r\\n                        {:else}\\r\\n                            <p class=\\\"ml-1 text-center mt-4 text-green text-3xl\\\">No new notifications</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                {/if}\\r\\n                {#if data.inGame}\\r\\n                    <div class=\\\"mt-5\\\">\\r\\n                        {#if data.inGame.length > 0}\\r\\n                            <p class=\\\"ml-1\\\">Matchs in progress</p>\\r\\n                            <div>\\r\\n                                {#each data.inGame as match}\\r\\n                                    <a\\r\\n                                        class=\\\"card notification flex items-center\\\"\\r\\n                                        href=\\\"/play/ffa/{match.id}\\\">\\r\\n                                        <div class=\\\"progress-container\\\">\\r\\n                                            <p class=\\\"ml-2 mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                                {match.type}\\r\\n                                            </p>\\r\\n                                            {#if match.timer}\\r\\n                                                <p\\r\\n                                                    class=\\\"ml-2 mr-6 lg:mr-12 text-light\\r\\n                                                text-lg\\\">\\r\\n                                                    {match.timer}\\r\\n                                                </p>\\r\\n                                            {/if}\\r\\n                                        </div>\\r\\n                                        <p class=\\\"quest-goal text-xl text-primary\\\">\\r\\n                                            <!--{#if match.hasStarted}{/if}-->\\r\\n                                            {!match.isFinished ? match.progress + '/7' : 'Waiting for others to finish'}\\r\\n                                        </p>\\r\\n                                    </a>\\r\\n                                {/each}\\r\\n                            </div>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n    {/if}\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAyHI,SAAS,8BAAC,CAAC,AACP,GAAG,CAAE,MAAM,AACf,CAAC,AAED,2BAAY,MAAM,CAAC,KAAK,eAAC,CAAC,AACtB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,2BAAY,MAAM,CAAC,WAAW,eAAC,CAAC,AAC5B,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,aAAa,8BAAC,CAAC,AACX,aAAa,CAAE,IAAI,CACnB,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,AACpF,CAAC,AAED,SAAS,8BAAC,CAAC,AACP,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAC/E,eAAe,CAAE,IAAI,CACrB,SAAS,CAAE,iCAAkB,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AACtD,CAAC,AAED,WAAW,iCAAmB,CAAC,AAE3B,EAAE,AAAC,CAAC,AACA,mBAAmB,CAAE,KAAK,AAC9B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,mBAAmB,CAAE,IAAI,AAC7B,CAAC,AACL,CAAC\"}"
};

const NavNotifications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { page } = $$props;
	let { data } = $$props;
	let newNotifications = false;
	let matchesLength;
	let timerIds = [];

	function calculateTimers(e) {
		if (!e) e = data;
		matchesLength = e.inGame.length;

		e.inGame.forEach((match, i) => {
			let d = new Date(match.Date);
			const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 1)).getTime()) / 1000);

			if (endsIn < 1) {
				e.inGame[i].timer = "";
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

		counter.subscribe(async e => {
			if (e.refresh) return;
			e = await e.content;

			if (e.inGame) {
				if (e.inGame.length !== matchesLength) {
					calculateTimers(e);
				}
			}
		});
	}); //document.cookie = cookie.serialize("notificationNb",cookies.notificationNb,{maxAge:15552000,sameSite:"lax"})
	//document.cookie = cookie.serialize(cookies)

	//TODO: on peut opti ça en utilisant la data de export let data au lieu de resubscribe pour save de la ram
	function startTimer(duration, i) {
		for (const ii in timerIds) {
			clearInterval(ii);
		}

		timerIds = [];
		let timer = duration, hours, minutes, seconds;

		timerIds.push(setInterval(
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
		));
	}

	const idToType = id => {
		if (id === 0) return "match finished";
		if (id === 1) return "quest finished";
		if (id === 2) return "match";
	};

	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$4);

	return `<div class="${"relative"}"><div class="${"flex items-center h-full mr-4 lg:m-0"}"><div class="${"focus:outline-none lg:ml-3 rounded bell-button cursor-pointer svelte-1dh8p3n"}"><div class="${"flex items-center relative"}">${ `<svg class="${"pt-1 w-5 lg:p-0 fill-current bell svelte-1dh8p3n"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m19.945\r\n                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579\r\n                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619\r\n                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404\r\n                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3\r\n                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404\r\n                            3.135-3.135\r\n                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441\r\n                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505\r\n                            1.125-1.126\r\n                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886\r\n                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612\r\n                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572\r\n                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418\r\n                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z"}"></path></svg>
                    <svg class="${"pt-1 w-5 lg:p-0 fill-current hidden bell-hover svelte-1dh8p3n"}" viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\r\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\r\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\r\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\r\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\r\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\r\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\r\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\r\n                            1.125 1.126 1.125z"}"></path></svg>`}
                ${newNotifications
	? `<span class="${"flex"}"><span class="${"inline-flex animate-ping absolute top-0\r\n                            right-0 w-2 h-2 rounded-full bg-legendary opacity-75"}"></span>
                        <span class="${"inline-flex absolute top-0 right-0 w-2 h-2\r\n                            rounded-full bg-legendary"}"></span></span>`
	: ``}</div></div></div>
    ${ data?.event?.autoShow
	? `<div class="${"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border\r\n        border-primary overflow-y-scroll max-h-screen-60 scrollbar svelte-1dh8p3n"}"><div>${data.event
		? `<div class="${""}"><p class="${"ml-1"}">EVENTS</p>
                        <div class="${"card notification flex items-center gradient svelte-1dh8p3n"}"><div class="${""}">${data.event.name
			? `<p class="${"ml-2 mr-6 lg:mr-12 text-3xl text-extra-light"}">${escape(data.event.name)}</p>`
			: ``}
                                <p class="${"ml-2 mr-6 lg:mr-12\r\n                                text-default"}">${escape(data.event.descParts[0])}<u>${escape(data.event.percentage - 100)}
                                    %</u>${escape(data.event.descParts[1])}</p></div></div></div>`
		: ``}
                ${data.notifications
		? `<div class="${"mt-5"}">${data.notifications.length > 0
			? `<p class="${"ml-1"}">Notifications</p>
                            <div>${each(data.notifications, (notification, i) => `<button class="${[
					"card notification flex items-center\r\n                                relative svelte-1dh8p3n",
					notification.id === 2 ? "cursor-default" : ""
				].join(" ").trim()}"><div class="${"progress-container"}"><p class="${"mr-6 lg:mr-12 text-2xl"}">${escape(notification.message)}</p>
                                            ${notification.tip
				? `<p class="${" mr-6 lg:mr-12 text-light\r\n                                            text-lg"}">${escape(notification.tip)}
                                                </p>`
				: ``}</div>
                                        ${idToType(notification.id)
				? `<span class="${"quest-goal text-sm text-font px-2\r\n                                            py-1 bg-legendary rounded-lg b"}">${escape(idToType(notification.id))}
                                        </span>`
				: ``}
                                        <button class="${"-mt-2 -mr-2 lg:mt-0 lg:mr-0 absolute top-0 right-0 text-light\r\n                                    hover:text-font"}"><svg class="${"m-3 lg:m-1 w-5 h-5 lg:w-4 lg:h-4 fill-current "}" viewBox="${"0 0 28 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 2.4-2.4-2.4-9.6\r\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\r\n                                            2.4 2.4 9.6-9.6 9.6 9.6\r\n                                            2.4-2.4-9.6-9.6z"}"></path></svg></button>
                                    </button>`)}</div>`
			: `<p class="${"ml-1 text-center mt-4 text-green text-3xl"}">No new notifications</p>`}</div>`
		: ``}
                ${data.inGame
		? `<div class="${"mt-5"}">${data.inGame.length > 0
			? `<p class="${"ml-1"}">Matchs in progress</p>
                            <div>${each(data.inGame, match => `<a class="${"card notification flex items-center svelte-1dh8p3n"}" href="${"/play/ffa/" + escape(match.id)}"><div class="${"progress-container"}"><p class="${"ml-2 mr-6 lg:mr-12 text-2xl"}">${escape(match.type)}</p>
                                            ${match.timer
				? `<p class="${"ml-2 mr-6 lg:mr-12 text-light\r\n                                                text-lg"}">${escape(match.timer)}
                                                </p>`
				: ``}</div>
                                        <p class="${"quest-goal text-xl text-primary"}">
                                            ${escape(!match.isFinished
				? match.progress + "/7"
				: "Waiting for others to finish")}</p>
                                    </a>`)}</div>`
			: ``}</div>`
		: ``}</div></div>`
	: ``}</div>`;
});

/* src\components\Navigation\NavAlert.svelte generated by Svelte v3.31.0 */

const css$5 = {
	code: ".dropdown.svelte-l2gql2{top:3.8rem}.info.svelte-l2gql2{border-radius:10px;@apply flex justify-between px-4 py-3 mt-2 mb-1 relative overflow-hidden w-full;}",
	map: "{\"version\":3,\"file\":\"NavAlert.svelte\",\"sources\":[\"NavAlert.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n\\r\\n    export let data;\\r\\n    export let isPreviewing;\\r\\n    let isDropdownOpen;\\r\\n    onMount(() => {\\r\\n        let length = data.length;\\r\\n        let cookies = cookie.parse(document.cookie);\\r\\n        if (length > parseInt(cookies.infosNb) || !cookies.infosNb) {\\r\\n            isDropdownOpen = true;\\r\\n        }\\r\\n        document.cookie = cookie.serialize(\\r\\n            \\\"infosNb\\\",\\r\\n            data.length,\\r\\n            { maxAge: 15552000, sameSite: \\\"lax\\\", path: \\\"/\\\" }\\r\\n        );\\r\\n    })\\r\\n\\r\\n    if (isPreviewing) {\\r\\n        isDropdownOpen = isPreviewing;\\r\\n    }\\r\\n    const handleClick = () => {\\r\\n        isDropdownOpen = !isDropdownOpen;\\r\\n    };\\r\\n\\r\\n</script>\\r\\n<style>\\r\\n    .dropdown {\\r\\n        top: 3.8rem;\\r\\n    }\\r\\n\\r\\n    .info {\\r\\n        border-radius: 10px;\\r\\n        @apply flex justify-between px-4 py-3 mt-2 mb-1 relative overflow-hidden w-full;\\r\\n    }\\r\\n</style>\\r\\n{#if data !== \\\"network\\\"}\\r\\n    {#if data?.length > 0}\\r\\n        <div class=\\\"relative\\\">\\r\\n            <div class=\\\"flex items-center h-full mr-4 lg:m-0\\\">\\r\\n                <button\\r\\n                    class=\\\"focus:outline-none\\\"\\r\\n                    use:clickOutside\\r\\n                    on:click_outside={() =>{if(!isPreviewing)isDropdownOpen = false}}\\r\\n                    on:click={() => handleClick()}>\\r\\n                    <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" class=\\\"w-6 lg:w-8 mr-2 lg:mr-4 text-legendary hover:opacity-80\\\" class:opacity-60={isDropdownOpen}\\r\\n                         viewBox=\\\"0 0 576 512\\\">\\r\\n                        <path fill=\\\"currentColor\\\"\\r\\n                              d=\\\"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\\\" />\\r\\n                    </svg>\\r\\n                </button>\\r\\n            </div>\\r\\n            <div\\r\\n                class:hidden={!isDropdownOpen}\\r\\n                class=\\\"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\\r\\n            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92\\r\\n            border border-legendary\\\">\\r\\n                <div>\\r\\n\\r\\n                    {#each data as information}\\r\\n                        <div\\r\\n                            class=\\\"card info flex items-center\\\">\\r\\n                            <div class=\\\"progress-container\\\">\\r\\n                                <p class=\\\"ml-2 mr-6 lg:mr-12 text-2xl\\\">\\r\\n                                    {information.name}\\r\\n                                </p>\\r\\n                                <p\\r\\n                                    class=\\\"ml-2 mr-6 lg:mr-12 text-light\\r\\n                                            text-lg\\\">\\r\\n                                    {information.description}\\r\\n                                </p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    {/each}\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n    {/if}\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AA8BI,SAAS,cAAC,CAAC,AACP,GAAG,CAAE,MAAM,AACf,CAAC,AAED,KAAK,cAAC,CAAC,AACH,aAAa,CAAE,IAAI,CACnB,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,AACpF,CAAC\"}"
};

const NavAlert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let { isPreviewing } = $$props;
	let isDropdownOpen;

	onMount(() => {
		let length = data.length;
		let cookies = cookie__default['default'].parse(document.cookie);

		if (length > parseInt(cookies.infosNb) || !cookies.infosNb) {
			isDropdownOpen = true;
		}

		document.cookie = cookie__default['default'].serialize("infosNb", data.length, {
			maxAge: 15552000,
			sameSite: "lax",
			path: "/"
		});
	});

	if (isPreviewing) {
		isDropdownOpen = isPreviewing;
	}

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.isPreviewing === void 0 && $$bindings.isPreviewing && isPreviewing !== void 0) $$bindings.isPreviewing(isPreviewing);
	$$result.css.add(css$5);

	return `${data !== "network"
	? `${data?.length > 0
		? `<div class="${"relative"}"><div class="${"flex items-center h-full mr-4 lg:m-0"}"><button class="${"focus:outline-none"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${[
				"w-6 lg:w-8 mr-2 lg:mr-4 text-legendary hover:opacity-80",
				isDropdownOpen ? "opacity-60" : ""
			].join(" ").trim()}" viewBox="${"0 0 576 512"}"><path fill="${"currentColor"}" d="${"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"}"></path></svg></button></div>
            <div class="${[
				"pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92\r\n            border border-legendary svelte-l2gql2",
				!isDropdownOpen ? "hidden" : ""
			].join(" ").trim()}"><div>${each(data, information => `<div class="${"card info flex items-center svelte-l2gql2"}"><div class="${"progress-container"}"><p class="${"ml-2 mr-6 lg:mr-12 text-2xl"}">${escape(information.name)}</p>
                                <p class="${"ml-2 mr-6 lg:mr-12 text-light\r\n                                            text-lg"}">${escape(information.description)}
                                </p></div>
                        </div>`)}</div></div></div>`
		: ``}`
	: ``}`;
});

/* src\components\Poll.svelte generated by Svelte v3.31.0 */

const css$6 = {
	code: ".answer-container.svelte-npzzeg{max-height:70vh}@media screen and (max-height: 600px){.answer-container.svelte-npzzeg{max-height:65vh !important}}",
	map: "{\"version\":3,\"file\":\"Poll.svelte\",\"sources\":[\"Poll.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import { fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    export let poll;\\r\\n    export let preview = false;\\r\\n\\r\\n\\r\\n    let answer;\\r\\n    let answered = false;\\r\\n\\r\\n    let isPollOpen = preview;\\r\\n\\r\\n    function handleClick() {\\r\\n        isPollOpen = !isPollOpen;\\r\\n    }\\r\\n\\r\\n    function handleChoose(number) {\\r\\n        answer = number;\\r\\n    }\\r\\n\\r\\n    async function handleSubmit() {\\r\\n        answered = true;\\r\\n        await callApi(\\\"post\\\", `/pollresponse?answer=${answer}&name=${poll.name}`);\\r\\n        setTimeout(() => {\\r\\n            poll = undefined;\\r\\n        }, 2000);\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .answer-container {\\r\\n        max-height: 70vh;\\r\\n    }\\r\\n\\r\\n    @media screen and (max-height: 600px) {\\r\\n        .answer-container {\\r\\n            max-height: 65vh !important;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n{#if poll && poll !== \\\"network err\\\"}\\r\\n    <div class:pb-4={isPollOpen} class=\\\"bg-background rounded-lg border border-primary\\\"\\r\\n         transition:fly={{ x:200, duration: 300 }}>\\r\\n        <button class=\\\"flex justify-between cursor-pointer focus:outline-none w-full\\\" on:click={() => handleClick()}>\\r\\n            <p class=\\\"text-xl pl-3 pt-1.5 text-gray-400\\\">POLL</p>\\r\\n            <p class:pb-4={!isPollOpen} class=\\\"pl-2 pt-5\\\">{poll.name}</p>\\r\\n            <!--Svg icon-->\\r\\n            <div class=\\\"ml-5 mr-3 mt-6\\\">\\r\\n                <svg class:hidden={isPollOpen} class=\\\"fill-current w-5\\\" style=\\\"margin-bottom: 0.14rem;\\\"\\r\\n                     viewBox=\\\"0 0 24 24\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path d=\\\"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z\\\" />\\r\\n                </svg>\\r\\n                <svg class:hidden={!isPollOpen} class=\\\"fill-current w-5\\\" style=\\\"margin-bottom: 0.14rem;\\\"\\r\\n                     viewBox=\\\"0 0 24 24\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n\\r\\n        </button>\\r\\n\\r\\n        <div class:hidden={!isPollOpen} class=\\\"px-5 answer-container overflow-y-auto scrollbar\\\">\\r\\n            {#if answered === false}\\r\\n                {#if poll.isMCQ}\\r\\n                    <div class=\\\"\\\">\\r\\n\\r\\n                        {#each poll.options as option, i}\\r\\n                            <div on:click={()=>{handleChoose(i)}}\\r\\n                                 class:border-primary={answer === i}\\r\\n                                 class=\\\"p-4 bg-variant my-3 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary block flex items-center cursor-pointer\\\">\\r\\n                                <div class=\\\"w-4\\\">\\r\\n                                    <input class=\\\"opacity-0 fixed pointer-events-none w-4 h-4\\\"\\r\\n                                           type=\\\"radio\\\" value={option}>\\r\\n\\r\\n                                    {#if answer === i}\\r\\n                                        <svg class=\\\"w-4 fill-current text-primary\\\" viewBox=\\\"0 0 24 24\\\"\\r\\n                                             xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m0 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-6.624-.008-11.992-5.376-12-11.999zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599v.001zm4 0c0-3.093 2.507-5.6 5.6-5.6s5.6 2.507 5.6 5.6-2.507 5.6-5.6 5.6c-3.093 0-5.6-2.507-5.6-5.6z\\\" />\\r\\n                                        </svg>\\r\\n                                    {:else}\\r\\n                                        <svg class=\\\"w-4 fill-current\\\" viewBox=\\\"0 0 24 24\\\"\\r\\n                                             xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c-.008 6.624-5.376 11.992-11.999 12zm0-21.6c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6c-.006-5.299-4.301-9.594-9.599-9.6h-.001z\\\" />\\r\\n                                        </svg>\\r\\n                                    {/if}\\r\\n                                </div>\\r\\n\\r\\n                                <p class=\\\"ml-2\\\" style=\\\"line-height: 1; margin-bottom: -0.20rem\\\">{option}</p>\\r\\n\\r\\n                            </div>\\r\\n\\r\\n                        {/each}\\r\\n\\r\\n                    </div>\\r\\n                {:else}\\r\\n                    <textarea class=\\\"px-3 py-2 text-black\\\" bind:value={answer}></textarea>\\r\\n                {/if}\\r\\n                <button on:click={()=>{ if(!preview){handleSubmit()}}} class=\\\"button button-brand w-24 mt-2 w-full\\\">\\r\\n                    SUBMIT\\r\\n                </button>\\r\\n            {:else}\\r\\n                <p class=\\\"text-3xl text-center mx-auto rounded-lg focus:outline-none block text-primary mt-2\\\">\\r\\n                    Thanks\\r\\n                    for your\\r\\n                    answer!</p>\\r\\n            {/if}\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n{/if}\\r\\n\"],\"names\":[],\"mappings\":\"AA+BI,iBAAiB,cAAC,CAAC,AACf,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AACnC,iBAAiB,cAAC,CAAC,AACf,UAAU,CAAE,IAAI,CAAC,UAAU,AAC/B,CAAC,AACL,CAAC\"}"
};

const Poll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { poll } = $$props;
	let { preview = false } = $$props;
	let answer;
	let isPollOpen = preview;

	if ($$props.poll === void 0 && $$bindings.poll && poll !== void 0) $$bindings.poll(poll);
	if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0) $$bindings.preview(preview);
	$$result.css.add(css$6);

	return `${poll && poll !== "network err"
	? `<div class="${["bg-background rounded-lg border border-primary", isPollOpen ? "pb-4" : ""].join(" ").trim()}"><button class="${"flex justify-between cursor-pointer focus:outline-none w-full"}"><p class="${"text-xl pl-3 pt-1.5 text-gray-400"}">POLL</p>
            <p class="${["pl-2 pt-5", !isPollOpen ? "pb-4" : ""].join(" ").trim()}">${escape(poll.name)}</p>
            
            <div class="${"ml-5 mr-3 mt-6"}"><svg class="${["fill-current w-5", isPollOpen ? "hidden" : ""].join(" ").trim()}" style="${"margin-bottom: 0.14rem;"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z"}"></path></svg>
                <svg class="${["fill-current w-5", !isPollOpen ? "hidden" : ""].join(" ").trim()}" style="${"margin-bottom: 0.14rem;"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div></button>

        <div class="${[
			"px-5 answer-container overflow-y-auto scrollbar svelte-npzzeg",
			!isPollOpen ? "hidden" : ""
		].join(" ").trim()}">${ `${poll.isMCQ
			? `<div class="${""}">${each(poll.options, (option, i) => `<div class="${[
					"p-4 bg-variant my-3 rounded-lg border-2 border-transparent hover:border-primary focus:outline-none focus:border-primary block flex items-center cursor-pointer",
					answer === i ? "border-primary" : ""
				].join(" ").trim()}"><div class="${"w-4"}"><input class="${"opacity-0 fixed pointer-events-none w-4 h-4"}" type="${"radio"}"${add_attribute("value", option, 0)}>

                                    ${answer === i
				? `<svg class="${"w-4 fill-current text-primary"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m0 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-6.624-.008-11.992-5.376-12-11.999zm2.4 0c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6c-5.299.006-9.594 4.301-9.6 9.599v.001zm4 0c0-3.093 2.507-5.6 5.6-5.6s5.6 2.507 5.6 5.6-2.507 5.6-5.6 5.6c-3.093 0-5.6-2.507-5.6-5.6z"}"></path></svg>`
				: `<svg class="${"w-4 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12c-.008 6.624-5.376 11.992-11.999 12zm0-21.6c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6c-.006-5.299-4.301-9.594-9.599-9.6h-.001z"}"></path></svg>`}</div>

                                <p class="${"ml-2"}" style="${"line-height: 1; margin-bottom: -0.20rem"}">${escape(option)}</p>

                            </div>`)}</div>`
			: `<textarea class="${"px-3 py-2 text-black"}">${ ""}</textarea>`}
                <button class="${"button button-brand w-24 mt-2 w-full"}">SUBMIT
                </button>`
		}</div></div>`
	: ``}`;
});

/* src\components\CoinIcon.svelte generated by Svelte v3.31.0 */

const CoinIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="${"xw-8    fill-current"}">
    <svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 278.5 278.5"}"><defs><style>.cls-1 {
                fill: none;
                stroke-miterlimit: 10;
                stroke-width: 22px;
            }
            </style></defs><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><rect x="${"144.52"}" y="${"104"}" width="${"16.38"}" height="${"104.25"}"></rect><polygon points="${"117.15 80 117.15 178.57 107.26 80 85.27 80 75.74 178.57 66.4 80 46.98 80 59.99 208.25 86.74 208.25 95.9 121.77 105.42 208.25 134.02 208.25 134.02 93.56 209.71 93.56 209.71 166.44 193.5 104.1 172.97 104.1 172.97 208.25 187.55 208.25 187.55 132.22 207.48 208.25 224.29 208.25 224.29 80 117.15 80"}"></polygon><circle class="${"cls-1 stroke-current"}" cx="${"139.25"}" cy="${"139.25"}" r="${"128.25"}"></circle></g></g></svg>
    </div>`;
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

/* src\components\profile\Search.svelte generated by Svelte v3.31.0 */

const css$7 = {
	code: ".search-history.svelte-3qcd1y:first-child{margin-left:0}",
	map: "{\"version\":3,\"file\":\"Search.svelte\",\"sources\":[\"Search.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { fade, fly } from \\\"svelte/transition\\\";\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    import { callApi } from \\\"../../utils/api\\\";\\r\\n    import { getCookie } from \\\"../../utils/getCookie\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n\\r\\n    let isSearchOpen = false;\\r\\n    let loading;\\r\\n    let searchHistory;\\r\\n    onMount(() => {\\r\\n        searchHistory = JSON.parse(decodeURI(getCookie(\\\"searchHistory\\\")).replace(/%2C/g, \\\",\\\"));\\r\\n        if (!searchHistory) searchHistory = [];\\r\\n    });\\r\\n\\r\\n    function handleSearchPopup(resultUsername) {\\r\\n        if (typeof resultUsername === \\\"string\\\" && resultUsername.length >= 1) {\\r\\n            if (searchHistory.includes(resultUsername)) {\\r\\n                searchHistory.splice(searchHistory.indexOf(resultUsername), 1);\\r\\n                searchHistory.push(resultUsername);\\r\\n\\r\\n            } else {\\r\\n                if (searchHistory.length >= 4) {\\r\\n                    searchHistory.pop();\\r\\n                }\\r\\n                searchHistory.push(resultUsername);\\r\\n                document.cookie = cookie.serialize(\\r\\n                    \\\"searchHistory\\\",\\r\\n                    JSON.stringify(searchHistory),\\r\\n                    {\\r\\n                        maxAge: 15552000,\\r\\n                        sameSite: \\\"lax\\\",\\r\\n                        path: \\\"/\\\"\\r\\n                    }\\r\\n                );\\r\\n\\r\\n            }\\r\\n        }\\r\\n\\r\\n        username = \\\"\\\";\\r\\n        isSearchOpen = !isSearchOpen;\\r\\n\\r\\n\\r\\n    }\\r\\n\\r\\n\\r\\n    let username;\\r\\n    $: if (username || username === \\\"\\\") {\\r\\n        if (username === \\\"\\\") {\\r\\n            data = false;\\r\\n            clearTimeout(interval);\\r\\n        } else {\\r\\n            handleInputChange();\\r\\n        }\\r\\n    }\\r\\n\\r\\n    let interval;\\r\\n    let data = false;\\r\\n\\r\\n    function handleInputChange() {\\r\\n        data = false;\\r\\n        clearTimeout(interval);\\r\\n\\r\\n        interval = setTimeout(searchUsername, 750);\\r\\n    }\\r\\n\\r\\n    async function searchUsername() {\\r\\n        loading = true;\\r\\n        data = await callApi(\\\"get\\\", `/stats/username/${username}`);\\r\\n        console.log(data.length);\\r\\n        loading = false;\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .search-history:first-child {\\r\\n        margin-left: 0;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\\r\\n<button class=\\\"block\\\" on:click={handleSearchPopup}>\\r\\n    <svg class=\\\"fill-current text-font w-5\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n        <path\\r\\n            d=\\\"m22.241 24-7.414-7.414c-1.559 1.169-3.523 1.875-5.652 1.885h-.002c-.032 0-.07.001-.108.001-5.006 0-9.065-4.058-9.065-9.065 0-.038 0-.076.001-.114v.006c0-5.135 4.163-9.298 9.298-9.298s9.298 4.163 9.298 9.298c-.031 2.129-.733 4.088-1.904 5.682l.019-.027 7.414 7.414zm-12.942-21.487c-3.72.016-6.73 3.035-6.73 6.758 0 3.732 3.025 6.758 6.758 6.758s6.758-3.025 6.758-6.758c0-1.866-.756-3.555-1.979-4.778-1.223-1.223-2.912-1.979-4.778-1.979-.01 0-.02 0-.03 0h.002z\\\" />\\r\\n    </svg>\\r\\n</button>\\r\\n\\r\\n{#if isSearchOpen === true}\\r\\n    <div class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center \\\"\\r\\n         style=\\\"z-index: 100\\\"\\r\\n\\r\\n         in:fade={{duration: 200}}\\r\\n         out:fade={{duration: 350}}>\\r\\n\\r\\n        <div\\r\\n            class=\\\" w-full max-w-xl    mx-5 my-1 md:mx-0  p-10    bg-variant   border-2 border-primary    rounded-xl    overflow-y-scroll md:overflow-y-auto  relative\\\"\\r\\n            style=\\\"max-height: 95vh;\\\"\\r\\n            transition:fly={{ y: 300, duration: 350 }}\\r\\n            use:clickOutside\\r\\n            on:click_outside={() => handleSearchPopup()}>\\r\\n\\r\\n            <button class=\\\"absolute top-0 right-0  p-4 text-mid-light hover:text-font\\\"\\r\\n                    on:click={() => handleSearchPopup()}>\\r\\n                <svg class=\\\"fill-current w-4\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z\\\" />\\r\\n                </svg>\\r\\n            </button>\\r\\n            <div>\\r\\n                <h3 class=\\\"ml-1 mb-2 text-xl  text-mid-light\\\">Search for a player</h3>\\r\\n                <div class=\\\"relative\\\">\\r\\n                    <input class=\\\"w-full text-2xl text-font bg-background py-4 px-4 rounded-lg  focus:outline-none\\\"\\r\\n                           placeholder=\\\"Type the exact username\\\" type=\\\"text\\\" bind:value={username}>\\r\\n                    {#if loading}\\r\\n                        <div class=\\\"w-full absolute top-15 border-t border-epic\\\">\\r\\n                            <div\\r\\n                                class=\\\"flex  justify-between pl-4 pr-8 py-4  bg-background  text-xl\\\">\\r\\n                                <div class=\\\"mx-auto\\\">\\r\\n                                    Loading...\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                    {#if data || data.length < 1}\\r\\n                        <div class=\\\"w-full absolute top-15 border-t border-epic\\\">\\r\\n                            {#if data.length < 1}\\r\\n                                <p class=\\\"bg-background py-4 text-center text-xl text-mid-light\\\">No result</p>\\r\\n                            {:else}\\r\\n                                <div class=\\\"max-h-32 overflow-y-auto\\\">\\r\\n                                    {#each data as player}\\r\\n                                        <a on:click={() => handleSearchPopup(player.name)}\\r\\n                                           class=\\\"flex justify-between pl-4 pr-8 py-4  bg-background  text-xl\\\"\\r\\n                                           href=\\\"/profile/{player.name}?bid={player.brawlhalla_id}\\\">\\r\\n                                            <div class=\\\"flex items-center\\\">\\r\\n                                                <p class=\\\"text-primary text-default\\\"\\r\\n                                                   style=\\\"margin-top: 0.15rem\\\">{player.region}</p>\\r\\n                                                <p class=\\\"ml-4\\\">{player.name}</p>\\r\\n                                            </div>\\r\\n                                            <p>\\r\\n                                                {player.tier}\\r\\n                                            </p>\\r\\n                                        </a>\\r\\n                                    {/each}\\r\\n                                </div>\\r\\n                            {/if}\\r\\n\\r\\n\\r\\n                        </div>\\r\\n                    {/if}\\r\\n\\r\\n                </div>\\r\\n\\r\\n\\r\\n                <div class=\\\"mt-8\\\">\\r\\n                    <p class=\\\"ml-1 mb-1  text-mid-light\\\">Recent players:</p>\\r\\n\\r\\n                    <div class=\\\"flex flex-wrap\\\">\\r\\n                        {#each searchHistory.reverse() as username}\\r\\n                            <a on:click={() => handleSearchPopup(username)} href=\\\"/profile/{username}\\\"\\r\\n                               class=\\\"search-history mr-5 mt-3 md:ml-5 md:mr-0  rounded-lg px-6 py-3 bg-background\\\">\\r\\n                                {username}\\r\\n                            </a>\\r\\n                        {/each}\\r\\n\\r\\n                    </div>\\r\\n\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA4EI,6BAAe,YAAY,AAAC,CAAC,AACzB,WAAW,CAAE,CAAC,AAClB,CAAC\"}"
};

const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let searchHistory;

	onMount(() => {
		searchHistory = JSON.parse(decodeURI(getCookie("searchHistory")).replace(/%2C/g, ","));
		if (!searchHistory) searchHistory = [];
	});

	$$result.css.add(css$7);

	return `<button class="${"block"}"><svg class="${"fill-current text-font w-5"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m22.241 24-7.414-7.414c-1.559 1.169-3.523 1.875-5.652 1.885h-.002c-.032 0-.07.001-.108.001-5.006 0-9.065-4.058-9.065-9.065 0-.038 0-.076.001-.114v.006c0-5.135 4.163-9.298 9.298-9.298s9.298 4.163 9.298 9.298c-.031 2.129-.733 4.088-1.904 5.682l.019-.027 7.414 7.414zm-12.942-21.487c-3.72.016-6.73 3.035-6.73 6.758 0 3.732 3.025 6.758 6.758 6.758s6.758-3.025 6.758-6.758c0-1.866-.756-3.555-1.979-4.778-1.223-1.223-2.912-1.979-4.778-1.979-.01 0-.02 0-.03 0h.002z"}"></path></svg></button>

${ ``}`;
});

/* src\components\Navigation\Nav.svelte generated by Svelte v3.31.0 */

const css$8 = {
	code: "svg.svelte-1frd04p{@apply pr-1;;margin-bottom:3px}.nav-icon.svelte-1frd04p{margin-bottom:-6px}.play.svelte-1frd04p{width:1.05rem;height:1.05rem}.nav-link-container.svelte-1frd04p{@apply pr-9 flex items-center;}.gradient.svelte-1frd04p{background-image:linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);background-size:300%;animation:svelte-1frd04p-gradient-animation 4.5s linear infinite}@keyframes svelte-1frd04p-gradient-animation{0%{background-position:right}100%{background-position:left}}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import {onDestroy, onMount} from \\\"svelte\\\";\\r\\n    import {clickOutside} from \\\"../../utils/clickOutside\\\";\\r\\n\\r\\n    import NavAccount from \\\"./NavAccount.svelte\\\";\\r\\n    import Notifications from \\\"./NavNotifications.svelte\\\";\\r\\n    import NavAlert from \\\"./NavAlert.svelte\\\";\\r\\n    import Poll from \\\"../Poll.svelte\\\";\\r\\n    import {fly} from \\\"svelte/transition\\\";\\r\\n    import {config} from \\\"../storeAdmin\\\";\\r\\n    import {apiUrl} from \\\"../../utils/config\\\";\\r\\n    import {callApi} from \\\"../../utils/api\\\";\\r\\n    import {goto, stores} from \\\"@sapper/app\\\";\\r\\n    import {counter} from \\\"../stores.js\\\";\\r\\n    import CoinIcon from \\\"../CoinIcon.svelte\\\";\\r\\n    import Search from \\\"../profile/Search.svelte\\\";\\r\\n\\r\\n    const {page} = stores();\\r\\n    export let isScrolling;\\r\\n    let isNavbarOpen;\\r\\n    let isUserLoggedIn;\\r\\n    let isAdmin;\\r\\n\\r\\n    let infos;\\r\\n    let poll;\\r\\n    let notificationsObj = {};\\r\\n\\r\\n    let user;\\r\\n    let bhUser;\\r\\n    let userCoins;\\r\\n\\r\\n    let offline;\\r\\n    let loaded = false;\\r\\n\\r\\n    let currEvent;\\r\\n    let isEventBannerOpen = false;\\r\\n    let currentMatch;\\r\\n\\r\\n    function calculateProperties(user1) {\\r\\n        if (!user1) return isUserLoggedIn = false;\\r\\n        if (user1.offline) offline = true;\\r\\n        if (user1 instanceof Error) {\\r\\n            if (user1.response) if (user1.response.status === 503 || user1.response.status === 502) goto(\\\"/status\\\");\\r\\n            return isUserLoggedIn = \\\"network\\\";\\r\\n        }\\r\\n\\r\\n        if (user1.user) {\\r\\n            notificationsObj.notifications = user1.user.notifications;\\r\\n            notificationsObj.inGame = user1.user.inGame;\\r\\n            currentMatch = notificationsObj.inGame?.filter(g => g.isFinished === false)[0]?.id;\\r\\n            userCoins = Math.floor(user1.user.coins * 10) / 10;\\r\\n        }\\r\\n        bhUser = user1.user;\\r\\n        user = user1.steam;\\r\\n        if (user.id === \\\"76561198417157310\\\" || user.id === \\\"76561198417157310\\\") {\\r\\n            isAdmin = true;\\r\\n        }\\r\\n\\r\\n        isUserLoggedIn = !!user1.user;\\r\\n    }\\r\\n\\r\\n    const resetNav = async value => {\\r\\n        if (value.refresh === true) return;\\r\\n        if (isAdmin && value.preview) return onMountFx(value.preview);\\r\\n        calculateProperties(await value.content);\\r\\n    };\\r\\n\\r\\n\\r\\n    function handlePopupClose() {\\r\\n        if (offline) {\\r\\n            offline = false;\\r\\n        }\\r\\n        if (isEventBannerOpen) {\\r\\n            notificationsObj.event = {\\r\\n                id: \\\"event\\\",\\r\\n                name: currEvent.name,\\r\\n                descParts: currEvent.descParts,\\r\\n                percentage: currEvent.percentage,\\r\\n                type: \\\"event\\\"\\r\\n            };\\r\\n            isEventBannerOpen = false;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    async function onMountFx(adminData) {\\r\\n        counter.subscribe(resetNav);\\r\\n        try {\\r\\n            if (!adminData)\\r\\n                infos = await callApi(\\\"get\\\", \\\"/informations\\\");\\r\\n            else {\\r\\n                infos = {event: adminData};\\r\\n            }\\r\\n\\r\\n            /*currEvent = information.filter(i => i.type === \\\"event\\\")[0];\\r\\n            isEventBannerOpen = true;\\r\\n            notificationsObj.event = currEvent;*/\\r\\n            if (Date.now() <= infos.event.expiration) {\\r\\n                let {name, description, percentage} = infos.event;\\r\\n                let descParts = description.split(\\\"%%\\\");\\r\\n                currEvent = {name, descParts, percentage};\\r\\n                isEventBannerOpen = true;\\r\\n                if (isAdmin) {\\r\\n                    notificationsObj.event = {\\r\\n                        id: \\\"event\\\",\\r\\n                        name: currEvent.name,\\r\\n                        descParts: currEvent.descParts,\\r\\n                        percentage: currEvent.percentage,\\r\\n                        type: \\\"event\\\",\\r\\n                        autoShow: true\\r\\n                    };\\r\\n                }\\r\\n            }\\r\\n            infos = infos.information;\\r\\n            if (infos instanceof Error) {\\r\\n                throw infos;\\r\\n            }\\r\\n        } catch (e) {\\r\\n            infos = \\\"network\\\";\\r\\n        }\\r\\n        if (adminData) return;\\r\\n        setTimeout(async () => {\\r\\n            try {\\r\\n                if (isUserLoggedIn === true) poll = await callApi(\\\"get\\\", \\\"/getpoll\\\");\\r\\n                if (poll instanceof Error) {\\r\\n                    throw poll;\\r\\n                }\\r\\n            } catch (e) {\\r\\n                poll = \\\"network err\\\";\\r\\n            }\\r\\n        }, 1);\\r\\n        loaded = true;\\r\\n    }\\r\\n\\r\\n    onMount(onMountFx);\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    svg {\\r\\n        @apply pr-1;\\r\\n        margin-bottom: 3px;\\r\\n    }\\r\\n\\r\\n    .nav-icon {\\r\\n        margin-bottom: -6px;\\r\\n    }\\r\\n\\r\\n    .play {\\r\\n        width: 1.05rem;\\r\\n        height: 1.05rem;\\r\\n    }\\r\\n\\r\\n    .nav-link-container {\\r\\n        @apply pr-9 flex items-center;\\r\\n    }\\r\\n\\r\\n    .gradient {\\r\\n        background-image: linear-gradient(to right, #3d72e4, #ee38ff, #3d72e4, #ee38ff);\\r\\n        background-size: 300%;\\r\\n        animation: gradient-animation 4.5s linear infinite;\\r\\n    }\\r\\n\\r\\n    @keyframes gradient-animation {\\r\\n\\r\\n        0% {\\r\\n            background-position: right;\\r\\n        }\\r\\n        100% {\\r\\n            background-position: left;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"h-auto w-full fixed z-50\\\">\\r\\n    {#if offline || isEventBannerOpen}\\r\\n        <div class=\\\"bg-legendary w-full flex  items-center lg:text-xl text-white  relative\\\"\\r\\n             class:gradient={isEventBannerOpen && !offline}>\\r\\n            <p class=\\\"text-center w-full text-3xl px-12\\\">\\r\\n                {#if offline}\\r\\n                    You are offline or our services are down, you may experience\\r\\n                    bugs on the website.\\r\\n                {:else if currEvent}\\r\\n                    {currEvent.descParts[0]}<u>{currEvent.percentage - 100}%</u>{currEvent.descParts[1]}\\r\\n                {/if}\\r\\n            </p>\\r\\n            <button class=\\\"p-1 absolute right-0\\\" on:click={handlePopupClose}>\\r\\n                <svg\\r\\n                        class=\\\"w-8 h-8 md:w-6 md:h-6 fill-current \\\"\\r\\n                        viewBox=\\\"0 0 28 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                            d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\"/>\\r\\n                </svg>\\r\\n            </button>\\r\\n\\r\\n        </div>\\r\\n    {/if}\\r\\n    <!--{#if user}\\r\\n        <div class=\\\"py-1 bg-primary w-full flex  items-center lg:text-xl text-white  relative   gradient\\\">\\r\\n            <p class=\\\"text-center w-full text-3xl\\\">\\r\\n                &lt;!&ndash;<b class=\\\"text-white mr-2 font-normal text-3xl\\\">EVENT:</b>&ndash;&gt;\\r\\n\\r\\n            </p>\\r\\n            <button class=\\\"p-1 absolute right-0\\\" on:click={() => isEventBannerOpen = false}>\\r\\n                <svg\\r\\n                    class=\\\"w-5 h-5 fill-current \\\"\\r\\n                    viewBox=\\\"0 0 28 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\" />\\r\\n                </svg>\\r\\n            </button>\\r\\n\\r\\n        </div>\\r\\n    {/if}-->\\r\\n    <nav\\r\\n            class:border-primary={isScrolling}\\r\\n            class:border-b-2={isScrolling}\\r\\n            class=\\\"shadow-link-hover bg-background lg:flex items-center text-font\\r\\n        w-full transition duration-200 border-b border-transparent\\\">\\r\\n        <div\\r\\n                class=\\\"w-full lg:w-auto flex justify-between items-center py-4\\r\\n            relative\\\">\\r\\n            <div class=\\\"pl-7 lg:pl-24 lg:pr-34\\\">\\r\\n                <!--LOGO-->\\r\\n                <a class=\\\"\\\" href=\\\"/\\\">\\r\\n                    <div class=\\\"relative\\\">\\r\\n                        <svg class=\\\"fill-current w-24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 465.1 152.11\\\">\\r\\n                            <g id=\\\"Calque_2\\\" data-name=\\\"Calque 2\\\">\\r\\n                                <g id=\\\"Calque_1-2\\\" data-name=\\\"Calque 1\\\">\\r\\n                                    <polygon\\r\\n                                            points=\\\"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0\\\"/>\\r\\n                                    <rect x=\\\"97.54\\\" y=\\\"24\\\" width=\\\"16.38\\\" height=\\\"104.25\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37\\\"/>\\r\\n                                </g>\\r\\n                            </g>\\r\\n                        </svg>\\r\\n                        <!--<span class=\\\"absolute -top-1 -right-6  text-legendary\\\">Beta</span>-->\\r\\n                    </div>\\r\\n\\r\\n                </a>\\r\\n            </div>\\r\\n            <div class=\\\"pr-6 lg:hidden flex -mt-2\\\">\\r\\n                <div class=\\\"flex lg:hidden items-center\\\">\\r\\n                    {#if loaded && window.innerWidth < 1024}\\r\\n                        <div class=\\\"-mb-1 md:mb-0\\\">\\r\\n                            <NavAlert data={infos}/>\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                    <div class=\\\"mr-4  -mb-1  md:mb-0\\\">\\r\\n                        <Search/>\\r\\n                    </div>\\r\\n                    <Notifications data={notificationsObj}/>\\r\\n                </div>\\r\\n                <button\\r\\n                        class=\\\"focus:outline-none\\\"\\r\\n                        use:clickOutside\\r\\n                        on:click_outside={() => (isNavbarOpen = false)}\\r\\n                        on:click={() => {\\r\\n                        isNavbarOpen = !isNavbarOpen;\\r\\n                    }}>\\r\\n                    <svg\\r\\n                            class=\\\"w-7 h-7 fill-current nav-icon\\\"\\r\\n                            viewBox=\\\"0 0 28 24\\\"\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        {#if !isNavbarOpen}\\r\\n                            <path\\r\\n                                    d=\\\"m2.61 0h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\"/>\\r\\n                            <path\\r\\n                                    d=\\\"m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\"/>\\r\\n                            <path\\r\\n                                    d=\\\"m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61\\r\\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\\r\\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z\\\"/>\\r\\n                        {:else}\\r\\n                            <path\\r\\n                                    d=\\\"m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6\\r\\n                                9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                2.4-2.4-9.6-9.6z\\\"/>\\r\\n                        {/if}\\r\\n                    </svg>\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class:hidden={!isNavbarOpen} class=\\\"lg:block w-full\\\">\\r\\n            <div\\r\\n                    class=\\\"pb-3 lg:p-0 sm:flex items-center w-full justify-between\\\">\\r\\n                <div class=\\\"ml-7 links text-xl lg:flex\\\">\\r\\n                    <!--<a\\r\\n                            class=\\\"nav-link-container my-3 lg:hover:text-shadow-link-hover\\r\\n                            border-l border-primary lg:border-none pl-3\\\"\\r\\n                            href=\\\"/profile\\\">\\r\\n                        <svg\\r\\n                                class=\\\"fill-current w-5 h-5\\\"\\r\\n                                viewBox=\\\"0 0 32 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                    d=\\\"m10 12v8h-4v-8zm6-8v16h-4v-16zm16 18v2h-32v-24h2v22zm-10-14v12h-4v-12zm6-6v18h-4v-18z\\\"/>\\r\\n                        </svg>\\r\\n                        PROFILE\\r\\n                    </a>-->\\r\\n                    <a\\r\\n                            class=\\\"nav-link-container my-3\\r\\n                        lg:hover:text-shadow-link-hover border-l border-primary\\r\\n                        lg:border-none pl-3\\\"\\r\\n                            href=\\\"/play\\\">\\r\\n                        <svg\\r\\n                                class=\\\"fill-current play\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                    d=\\\"m.001 1.165v21.669c.052.661.601 1.177 1.271\\r\\n                                1.177.225 0 .436-.058.62-.16l-.006.003\\r\\n                                21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672\\r\\n                                0-1.223.521-1.27 1.181v.004z\\\"/>\\r\\n                        </svg>\\r\\n                        PLAY\\r\\n                    </a>\\r\\n                    <a\\r\\n                            class=\\\"nav-link-container my-3\\r\\n                        lg:hover:text-shadow-link-hover border-l border-primary\\r\\n                        lg:border-none pl-3\\\"\\r\\n                            href=\\\"/shop\\\"\\r\\n                            rel=\\\"prefetch\\\">\\r\\n                        <svg\\r\\n                                class=\\\"fill-current play\\\"\\r\\n                                viewBox=\\\"0 0 22 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                            <path\\r\\n                                    d=\\\"m14.416 24v-11.098h5.68c.181 0\\r\\n                                .328.147.328.328v10.114c0\\r\\n                                .362-.294.656-.656.656zm-12.096 0c-.362\\r\\n                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181\\r\\n                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357\\r\\n                                0-.362.294-.656.656-.656.23 0\\r\\n                                .432.118.549.296l.002.002c.028.041 1.342 1.92\\r\\n                                5.15\\r\\n                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622\\r\\n                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515\\r\\n                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391\\r\\n                                3.583 4.309.749-1.87 2.037-4.252\\r\\n                                3.74-4.252.741.039 1.388.41\\r\\n                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0\\r\\n                                .262-.04.515-.113.753l.005-.018c-.352\\r\\n                                1.035-1.466 1.823-2.653 2.391 3.472-.872\\r\\n                                4.675-2.61\\r\\n                                4.69-2.633.12-.173.318-.286.541-.286.362 0\\r\\n                                .656.294.656.656 0\\r\\n                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434\\r\\n                                2.154-5.345 3.164h6.48c.181 0\\r\\n                                .328.147.328.328v4.029c0\\r\\n                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524\\r\\n                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936\\r\\n                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315\\r\\n                                3.791c1.692-.501 3.698-1.389\\r\\n                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946\\r\\n                                0-2.103 2.226-2.813 4.21z\\\"/>\\r\\n                        </svg>\\r\\n                        SHOP\\r\\n                    </a>\\r\\n\\r\\n                    {#if user && bhUser}\\r\\n\\r\\n                        <a\\r\\n                                class=\\\"nav-link-container my-3 mb-6 lg:mb-3\\r\\n                            lg:hover:text-shadow-link-hover border-l border-primary\\r\\n                            lg:border-none pl-3\\\"\\r\\n                                href=\\\"/profile/{user.name}?bid={bhUser.brawlhallaId}&prefer_bid=true\\\"\\r\\n                                rel=\\\"prefetch\\\">\\r\\n                            <svg class=\\\"fill-current play\\\" style=\\\"margin-bottom: -.04rem\\\" viewBox=\\\"0 0 20 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path d=\\\"m18.845 17.295c-1.008-1.345-2.437-2.327-4.089-2.754l-.051-.011-1.179 1.99c-.002.552-.448.998-1 1-.55 0-1-.45-1.525-1.774 0-.009 0-.021 0-.032 0-.691-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v.033-.002c-.56 1.325-1.014 1.774-1.563 1.774-.552-.002-.998-.448-1-1l-1.142-1.994c-1.702.44-3.13 1.421-4.126 2.746l-.014.019c-.388.629-.628 1.386-.655 2.197v.007c.005.15 0 .325 0 .5v2c0 1.105.895 2 2 2h15.5c1.105 0 2-.895 2-2v-2c0-.174-.005-.35 0-.5-.028-.817-.268-1.573-.666-2.221l.011.02zm-14.345-12.005c0 2.92 1.82 7.21 5.25 7.21 3.37 0 5.25-4.29 5.25-7.21 0-.019 0-.042 0-.065 0-2.9-2.351-5.25-5.25-5.25s-5.25 2.351-5.25 5.25v.068z\\\"/>\\r\\n                            </svg>\\r\\n                            PROFILE\\r\\n                        </a>\\r\\n                    {/if}\\r\\n\\r\\n                    {#if currentMatch && $page.path !== `/play/ffa/${currentMatch}`}\\r\\n                        <a class=\\\"lg:hidden py-1 px-3 text-xl bg-primary rounded  mt-4 lg:mb-0 lg:mr-8 w-auto\\\"\\r\\n                           href=\\\"/play/ffa/{currentMatch}\\\">Rejoin\\r\\n                            match</a>\\r\\n                    {/if}\\r\\n                </div>\\r\\n                <div class=\\\"ml-7 mt-5 md:m-0 md:mr-7 lg:flex lg:items-center\\\">\\r\\n                    {#if currentMatch && $page.path !== `/play/ffa/${currentMatch}`}\\r\\n                        <a class=\\\"hidden lg:block py-1 px-3 text-xl bg-primary rounded  mb-4 lg:mb-0 lg:mr-8 w-auto\\\"\\r\\n                           href=\\\"/play/ffa/{currentMatch}\\\">Rejoin\\r\\n                            match</a>\\r\\n                    {/if}\\r\\n                    {#if infos && window.innerWidth >= 1024}\\r\\n                        <div class=\\\"hidden lg:flex items-center\\\">\\r\\n                            <NavAlert data={infos}/>\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                    <div class=\\\"hidden lg:block mr-4\\\">\\r\\n                        <Search/>\\r\\n                    </div>\\r\\n                    {#if isUserLoggedIn}\\r\\n                        <div class=\\\"lg:flex lg:items-center //mt-5 md:mt-0\\\">\\r\\n                            {#if user.name && user.pictureMini}\\r\\n                                <NavAccount\\r\\n                                        username={user.name}\\r\\n                                        avatar={user.pictureMini}/>\\r\\n                            {/if}\\r\\n                            {#if notificationsObj}\\r\\n                                <div class=\\\"hidden lg:flex items-center\\\">\\r\\n                                    <Notifications data={notificationsObj} page=\\\"{$page.path}\\\"/>\\r\\n                                </div>\\r\\n                            {/if}\\r\\n\\r\\n                            <a class=\\\"lg:mt-0 lg:ml-9 text-2xl text-primary  flex items-center  pt-1\\\" href=\\\"/shop\\\">\\r\\n                                <b class=\\\"font-normal \\\">{userCoins}</b>\\r\\n                                <div class=\\\"w-7\\\" style=\\\"margin-bottom: 0.18rem; margin-left: 0.40rem\\\">\\r\\n                                    <CoinIcon/>\\r\\n                                </div>\\r\\n                            </a>\\r\\n                        </div>\\r\\n                    {:else if isUserLoggedIn === 'network'}\\r\\n                        <p class=\\\"text-legendary text-xl\\\">An error occured processing the account data</p>\\r\\n                    {:else}\\r\\n                        <a\\r\\n                                class=\\\"button-brand button mr-3\\\"\\r\\n                                href=\\\"/login\\\">\\r\\n                            Login\\r\\n                        </a>\\r\\n                    {/if}\\r\\n                </div>\\r\\n\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n    </nav>\\r\\n    {#if loaded}\\r\\n        <div\\r\\n                class=\\\"fixed z-10 left-1/2 w-full md:left-auto md:right-8 top-19 text-font text-default max-w-sm transform -translate-x-1/2 md:translate-x-0 px-5 md:px-0\\\"\\r\\n                transition:fly={{ y:-200, duration: 500 }}>\\r\\n            <Poll poll={poll}/>\\r\\n        </div>\\r\\n    {/if}\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA0II,GAAG,eAAC,CAAC,AACD,OAAO,IAAI,CAAC,CACZ,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,SAAS,eAAC,CAAC,AACP,aAAa,CAAE,IAAI,AACvB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,mBAAmB,eAAC,CAAC,AACjB,OAAO,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,AAClC,CAAC,AAED,SAAS,eAAC,CAAC,AACP,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAC/E,eAAe,CAAE,IAAI,CACrB,SAAS,CAAE,iCAAkB,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AACtD,CAAC,AAED,WAAW,iCAAmB,CAAC,AAE3B,EAAE,AAAC,CAAC,AACA,mBAAmB,CAAE,KAAK,AAC9B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,mBAAmB,CAAE,IAAI,AAC7B,CAAC,AACL,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $page;
	const { page } = stores$1();
	$page = get_store_value(page);
	let { isScrolling } = $$props;
	let isUserLoggedIn;
	let isAdmin;
	let infos;
	let poll;
	let notificationsObj = {};
	let user;
	let bhUser;
	let userCoins;
	let offline;
	let loaded = false;
	let currEvent;
	let isEventBannerOpen = false;
	let currentMatch;

	function calculateProperties(user1) {
		if (!user1) return isUserLoggedIn = false;
		if (user1.offline) offline = true;

		if (user1 instanceof Error) {
			if (user1.response) if (user1.response.status === 503 || user1.response.status === 502) goto("/status");
			return isUserLoggedIn = "network";
		}

		if (user1.user) {
			notificationsObj.notifications = user1.user.notifications;
			notificationsObj.inGame = user1.user.inGame;
			currentMatch = notificationsObj.inGame?.filter(g => g.isFinished === false)[0]?.id;
			userCoins = Math.floor(user1.user.coins * 10) / 10;
		}

		bhUser = user1.user;
		user = user1.steam;

		if (user.id === "76561198417157310" || user.id === "76561198417157310") {
			isAdmin = true;
		}

		isUserLoggedIn = !!user1.user;
	}

	const resetNav = async value => {
		if (value.refresh === true) return;
		if (isAdmin && value.preview) return onMountFx(value.preview);
		calculateProperties(await value.content);
	};

	async function onMountFx(adminData) {
		counter.subscribe(resetNav);

		try {
			if (!adminData) infos = await callApi("get", "/informations"); else {
				infos = { event: adminData };
			}

			/*currEvent = information.filter(i => i.type === "event")[0];
isEventBannerOpen = true;
notificationsObj.event = currEvent;*/
			if (Date.now() <= infos.event.expiration) {
				let { name, description, percentage } = infos.event;
				let descParts = description.split("%%");
				currEvent = { name, descParts, percentage };
				isEventBannerOpen = true;

				if (isAdmin) {
					notificationsObj.event = {
						id: "event",
						name: currEvent.name,
						descParts: currEvent.descParts,
						percentage: currEvent.percentage,
						type: "event",
						autoShow: true
					};
				}
			}

			infos = infos.information;

			if (infos instanceof Error) {
				throw infos;
			}
		} catch(e) {
			infos = "network";
		}

		if (adminData) return;

		setTimeout(
			async () => {
				try {
					if (isUserLoggedIn === true) poll = await callApi("get", "/getpoll");

					if (poll instanceof Error) {
						throw poll;
					}
				} catch(e) {
					poll = "network err";
				}
			},
			1
		);

		loaded = true;
	}

	onMount(onMountFx);
	if ($$props.isScrolling === void 0 && $$bindings.isScrolling && isScrolling !== void 0) $$bindings.isScrolling(isScrolling);
	$$result.css.add(css$8);
	$page = get_store_value(page);

	return `<div class="${"h-auto w-full fixed z-50"}">${offline || isEventBannerOpen
	? `<div class="${[
			"bg-legendary w-full flex  items-center lg:text-xl text-white  relative svelte-1frd04p",
			isEventBannerOpen && !offline ? "gradient" : ""
		].join(" ").trim()}"><p class="${"text-center w-full text-3xl px-12"}">${offline
		? `You are offline or our services are down, you may experience
                    bugs on the website.`
		: `${currEvent
			? `${escape(currEvent.descParts[0])}<u>${escape(currEvent.percentage - 100)}%</u>${escape(currEvent.descParts[1])}`
			: ``}`}</p>
            <button class="${"p-1 absolute right-0"}"><svg class="${"w-8 h-8 md:w-6 md:h-6 fill-current  svelte-1frd04p"}" viewBox="${"0 0 28 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 2.4-2.4-2.4-9.6\r\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\r\n                                            2.4 2.4 9.6-9.6 9.6 9.6\r\n                                            2.4-2.4-9.6-9.6z"}"></path></svg></button></div>`
	: ``}
    
    <nav class="${[
		"shadow-link-hover bg-background lg:flex items-center text-font\r\n        w-full transition duration-200 border-b border-transparent",
		(isScrolling ? "border-primary" : "") + " " + (isScrolling ? "border-b-2" : "")
	].join(" ").trim()}"><div class="${"w-full lg:w-auto flex justify-between items-center py-4\r\n            relative"}"><div class="${"pl-7 lg:pl-24 lg:pr-34"}">
                <a class="${""}" href="${"/"}"><div class="${"relative"}"><svg class="${"fill-current w-24 svelte-1frd04p"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 465.1 152.11"}"><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><polygon points="${"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"}"></polygon><rect x="${"97.54"}" y="${"24"}" width="${"16.38"}" height="${"104.25"}"></rect><path d="${"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"}"></path><path d="${"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"}"></path><polygon points="${"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"}"></polygon><polygon points="${"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"}"></polygon></g></g></svg>
                        </div></a></div>
            <div class="${"pr-6 lg:hidden flex -mt-2"}"><div class="${"flex lg:hidden items-center"}">${loaded && window.innerWidth < 1024
	? `<div class="${"-mb-1 md:mb-0"}">${validate_component(NavAlert, "NavAlert").$$render($$result, { data: infos }, {}, {})}</div>`
	: ``}
                    <div class="${"mr-4  -mb-1  md:mb-0"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</div>
                    ${validate_component(NavNotifications, "Notifications").$$render($$result, { data: notificationsObj }, {}, {})}</div>
                <button class="${"focus:outline-none"}"><svg class="${"w-7 h-7 fill-current nav-icon svelte-1frd04p"}" viewBox="${"0 0 28 24"}" xmlns="${"http://www.w3.org/2000/svg"}">${ `<path d="${"m2.61 0h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>
                            <path d="${"m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>
                            <path d="${"m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61\r\n                                2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441\r\n                                0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"}"></path>`
	}</svg></button></div></div>
        <div class="${["lg:block w-full",  "hidden" ].join(" ").trim()}"><div class="${"pb-3 lg:p-0 sm:flex items-center w-full justify-between"}"><div class="${"ml-7 links text-xl lg:flex"}">
                    <a class="${"nav-link-container my-3\r\n                        lg:hover:text-shadow-link-hover border-l border-primary\r\n                        lg:border-none pl-3 svelte-1frd04p"}" href="${"/play"}"><svg class="${"fill-current play svelte-1frd04p"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m.001 1.165v21.669c.052.661.601 1.177 1.271\r\n                                1.177.225 0 .436-.058.62-.16l-.006.003\r\n                                21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672\r\n                                0-1.223.521-1.27 1.181v.004z"}"></path></svg>
                        PLAY
                    </a>
                    <a class="${"nav-link-container my-3\r\n                        lg:hover:text-shadow-link-hover border-l border-primary\r\n                        lg:border-none pl-3 svelte-1frd04p"}" href="${"/shop"}" rel="${"prefetch"}"><svg class="${"fill-current play svelte-1frd04p"}" viewBox="${"0 0 22 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m14.416 24v-11.098h5.68c.181 0\r\n                                .328.147.328.328v10.114c0\r\n                                .362-.294.656-.656.656zm-12.096 0c-.362\r\n                                0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181\r\n                                0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357\r\n                                0-.362.294-.656.656-.656.23 0\r\n                                .432.118.549.296l.002.002c.028.041 1.342 1.92\r\n                                5.15\r\n                                2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622\r\n                                0-.761.334-1.443.862-1.91l.003-.002c.425-.515\r\n                                1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391\r\n                                3.583 4.309.749-1.87 2.037-4.252\r\n                                3.74-4.252.741.039 1.388.41\r\n                                1.799.966l.005.006c.48.464.779 1.113.779 1.832 0\r\n                                .262-.04.515-.113.753l.005-.018c-.352\r\n                                1.035-1.466 1.823-2.653 2.391 3.472-.872\r\n                                4.675-2.61\r\n                                4.69-2.633.12-.173.318-.286.541-.286.362 0\r\n                                .656.294.656.656 0\r\n                                .127-.036.246-.099.347l.002-.003c-.07.11-1.434\r\n                                2.154-5.345 3.164h6.48c.181 0\r\n                                .328.147.328.328v4.029c0\r\n                                .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524\r\n                                1.127-.48 1.27.298 1.035 2.268 2.018 3.936\r\n                                2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315\r\n                                3.791c1.692-.501 3.698-1.389\r\n                                4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946\r\n                                0-2.103 2.226-2.813 4.21z"}"></path></svg>
                        SHOP
                    </a>

                    ${user && bhUser
	? `<a class="${"nav-link-container my-3 mb-6 lg:mb-3\r\n                            lg:hover:text-shadow-link-hover border-l border-primary\r\n                            lg:border-none pl-3 svelte-1frd04p"}" href="${"/profile/" + escape(user.name) + "?bid=" + escape(bhUser.brawlhallaId) + "&prefer_bid=true"}" rel="${"prefetch"}"><svg class="${"fill-current play svelte-1frd04p"}" style="${"margin-bottom: -.04rem"}" viewBox="${"0 0 20 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m18.845 17.295c-1.008-1.345-2.437-2.327-4.089-2.754l-.051-.011-1.179 1.99c-.002.552-.448.998-1 1-.55 0-1-.45-1.525-1.774 0-.009 0-.021 0-.032 0-.691-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v.033-.002c-.56 1.325-1.014 1.774-1.563 1.774-.552-.002-.998-.448-1-1l-1.142-1.994c-1.702.44-3.13 1.421-4.126 2.746l-.014.019c-.388.629-.628 1.386-.655 2.197v.007c.005.15 0 .325 0 .5v2c0 1.105.895 2 2 2h15.5c1.105 0 2-.895 2-2v-2c0-.174-.005-.35 0-.5-.028-.817-.268-1.573-.666-2.221l.011.02zm-14.345-12.005c0 2.92 1.82 7.21 5.25 7.21 3.37 0 5.25-4.29 5.25-7.21 0-.019 0-.042 0-.065 0-2.9-2.351-5.25-5.25-5.25s-5.25 2.351-5.25 5.25v.068z"}"></path></svg>
                            PROFILE
                        </a>`
	: ``}

                    ${currentMatch && $page.path !== `/play/ffa/${currentMatch}`
	? `<a class="${"lg:hidden py-1 px-3 text-xl bg-primary rounded  mt-4 lg:mb-0 lg:mr-8 w-auto"}" href="${"/play/ffa/" + escape(currentMatch)}">Rejoin
                            match</a>`
	: ``}</div>
                <div class="${"ml-7 mt-5 md:m-0 md:mr-7 lg:flex lg:items-center"}">${currentMatch && $page.path !== `/play/ffa/${currentMatch}`
	? `<a class="${"hidden lg:block py-1 px-3 text-xl bg-primary rounded  mb-4 lg:mb-0 lg:mr-8 w-auto"}" href="${"/play/ffa/" + escape(currentMatch)}">Rejoin
                            match</a>`
	: ``}
                    ${infos && window.innerWidth >= 1024
	? `<div class="${"hidden lg:flex items-center"}">${validate_component(NavAlert, "NavAlert").$$render($$result, { data: infos }, {}, {})}</div>`
	: ``}
                    <div class="${"hidden lg:block mr-4"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</div>
                    ${isUserLoggedIn
	? `<div class="${"lg:flex lg:items-center //mt-5 md:mt-0"}">${user.name && user.pictureMini
		? `${validate_component(NavAccount, "NavAccount").$$render(
				$$result,
				{
					username: user.name,
					avatar: user.pictureMini
				},
				{},
				{}
			)}`
		: ``}
                            ${notificationsObj
		? `<div class="${"hidden lg:flex items-center"}">${validate_component(NavNotifications, "Notifications").$$render($$result, { data: notificationsObj, page: $page.path }, {}, {})}</div>`
		: ``}

                            <a class="${"lg:mt-0 lg:ml-9 text-2xl text-primary  flex items-center  pt-1"}" href="${"/shop"}"><b class="${"font-normal "}">${escape(userCoins)}</b>
                                <div class="${"w-7"}" style="${"margin-bottom: 0.18rem; margin-left: 0.40rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}</div></a></div>`
	: `${isUserLoggedIn === "network"
		? `<p class="${"text-legendary text-xl"}">An error occured processing the account data</p>`
		: `<a class="${"button-brand button mr-3"}" href="${"/login"}">Login
                        </a>`}`}</div></div></div></nav>
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
                        <a href="${"/terms"}" class="${"block hover:text-shadow-link-hover"}">Terms of use</a></div></div>
                <div class="${"mt-8 lg:mt-0 lg:ml-8"}"><h3 class="${"text-primary"}">Company</h3>
                    <a href="${"mailto:contact@winhalla.app"}" class="${"block hover:text-shadow-link-hover"}">Contact us</a></div></div></div>
        <div class="${"text-sm text-gray-400 ml-4 mt-8 w-75 sm:w-148 lg:w-196 "}"><p>Winhalla isn&#39;t endorsed by Blue Mammoth Games and doesn&#39;t reflect the views or opinions of Blue Mammoth
                Games or anyone
                officially involved in producing or managing Brawlhalla. Brawlhalla and Blue Mammoth Games are
                trademarks or registered trademarks of Blue Mammoth games. Brawlhalla © Blue Mammoth Games.</p>
            <div class="${"w-full h-px bg-primary  mt-4"}"></div></div>
        <div class="${"mt-6 flex justify-between items-center w-full"}"><div class="${"flex items-end"}"><a class="${"ml-4"}" href="${"/"}"><svg class="${"fill-current w-24"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 465.1 152.11"}"><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><polygon points="${"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"}"></polygon><rect x="${"97.54"}" y="${"24"}" width="${"16.38"}" height="${"104.25"}"></rect><path d="${"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"}"></path><path d="${"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"}"></path><polygon points="${"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"}"></polygon><polygon points="${"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"}"></polygon></g></g></svg></a></div>


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

/* src\components\CookiePopup.svelte generated by Svelte v3.31.0 */

const CookiePopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isForEdit = false } = $$props;
	let isPopupOpened;

	onMount(() => {
		isPopupOpened = !getCookie("hideCookiePopup");

		if (isPopupOpened || isForEdit) {
			let cookies = document.cookie.split(";");

			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i];
				let eqPos = cookie.indexOf("=");
				let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
		}
	});

	if ($$props.isForEdit === void 0 && $$bindings.isForEdit && isForEdit !== void 0) $$bindings.isForEdit(isForEdit);

	return `${isPopupOpened || isForEdit
	? `
    <div class="${"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"}" style="${"z-index: 100"}"><div class="${"max-w-xl    mx-5 my-1 md:mx-0  px-8 pt-10 pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto"}" style="${"max-height: 95vh;"}">${ `<div><h1 class="${"text-5xl md:text-6xl text-center text-font"}">This website uses cookies</h1>
                    <p class="${"mt-7    text-2xl md:text-3xl text-mid-light  leading-8"}">We and our partners use cookies to
                        authenticate users, to add functionalities to the website, to measure audience, and to
                        personalize ads.</p>
                    <p class="${"mt-4    text-default md:text-2xl text-light    leading-7"}">Note that if you don&#39;t consent
                        to the use of
                        every cookies, you might experience some bugs, or you may not be able to have access to all the
                        features of the website.</p>

                    
                    <div class="${"md:hidden    mt-8     flex flex-col items-center"}"><button class="${"w-45 button button-brand"}" style="${"background-color: #3de488"}">ACCEPT ALL
                        </button>
                        <button class="${"mt-4    w-45 md:w-auto    button button-brand    text-font"}">SETTINGS
                        </button>
                        <button class="${"mt-4    w-45 button button-brand    text-font"}">REJECT ALL</button></div>

                    
                    <div class="${"hidden  mt-8    md:flex justify-between"}"><button class="${"/w-40 button button-brand    text-font"}">REJECT
                            ALL
                        </button>
                        <button class="${"/w-40 button button-brand    text-font"}">SETTINGS
                        </button>
                        <button class="${"/w-40 button button-brand"}" style="${"background-color: #3de488"}">ACCEPT ALL
                        </button></div></div>`
		}</div></div>`
	: ``}`;
});

let guidesList = {
    "play": [
        "game_modes",
        "quests",
        "quests_refresh"
    ],
    "solo": [
        "main",
        "play_ad",
        "refresh_data",
        //"quit_lobby", pas sûr que y'a besoin
    ]
};
let guidesOpenedList;
counter.subscribe(async (value) => {
    if (value.refresh === true) return;
    let user = await value.content;
    if(!user.user) return
    guidesOpenedList = user.user.guidesOpenedList ? user.user.guidesOpenedList : {};
});


function determineCurrentGuide(page) {
    return guidesOpenedList.hasOwnProperty(page) || guidesOpenedList[page]?.length > 1 //if the corresponding page array doesn't exist or has no items
        ? guidesList[page][guidesList[page]
            .indexOf(
                guidesOpenedList[page][guidesOpenedList[page].length - 1] //get last opened guide in guidesOpened array
            ) + 1]
        : guidesList[page][0];
}


let guideHandlerStore = writable({
    page: "",
    list: guidesOpenedList,
    current: false,
});

function guideHandlerSetPage(page) {
    let list;
    guideHandlerStore.subscribe(value => {
       list = value.list;
    });
    guideHandlerStore.set({page: page, list: list, current: determineCurrentGuide(page)});
}

/* src\routes\_layout.svelte generated by Svelte v3.31.0 */

const css$9 = {
	code: ".font.svelte-2ej71o{font-family:\"Bebas Neue\", sans-serif}main.svelte-2ej71o{margin-top:calc(4rem - 2px);min-height:calc(100vh - calc(4rem - 2px))}@media(min-width: 400px){}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import Tailwindcss from \\\"../components/Tailwindcss.svelte\\\";\\r\\n    import Nav from \\\"../components/Navigation/Nav.svelte\\\";\\r\\n    import Footer from \\\"../components/Footer.svelte\\\";\\r\\n    import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n    import { eventEmitter } from \\\"../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import CookiePopup from \\\"../components/CookiePopup.svelte\\\";\\r\\n    import { getCookie } from \\\"../utils/getCookie\\\";\\r\\n    import {guideHandlerStore} from \\\"../components/guideStore\\\";\\r\\n\\r\\n    //Show error to the user if there is one from an api request\\r\\n    let error;\\r\\n    let isShowingGuide\\r\\n    onMount(() => {\\r\\n        eventEmitter.subscribe(async e => {\\r\\n            e = e.error;\\r\\n            if (!e) return;\\r\\n            if (e instanceof Error) {\\r\\n                if (e.response) {\\r\\n                    error = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n                    setTimeout(() => {\\r\\n                        error = undefined;\\r\\n                    }, 8000);\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n\\r\\n        const acceptedCookieList = getCookie(\\\"acceptedCookieList\\\");\\r\\n        if (acceptedCookieList === \\\"true\\\") {\\r\\n            window.yett.unblock();\\r\\n        } else if (getCookie(\\\"hideCookiePopup\\\")) {\\r\\n            window.yett.unblock(JSON.parse(decodeURI(acceptedCookieList).replace(/%2C/g, \\\",\\\").replace(/%2F/g, \\\"/\\\")));\\r\\n        }\\r\\n\\r\\n        guideHandlerStore.subscribe(value => {\\r\\n            isShowingGuide = !!value.current;\\r\\n        });\\r\\n    });\\r\\n\\r\\n    let scrollY = 0;\\r\\n    //export let segment;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .font {\\r\\n        font-family: \\\"Bebas Neue\\\", sans-serif;\\r\\n    }\\r\\n\\r\\n    main {\\r\\n        margin-top: calc(4rem - 2px);\\r\\n        min-height: calc(100vh - calc(4rem - 2px));\\r\\n    }\\r\\n\\r\\n    body {\\r\\n        margin: 0;\\r\\n        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,\\r\\n        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\\r\\n        font-size: 14px;\\r\\n        line-height: 1.5;\\r\\n        color: #333;\\r\\n    }\\r\\n\\r\\n    h1,\\r\\n    h2,\\r\\n    h3,\\r\\n    h4,\\r\\n    h5,\\r\\n    h6 {\\r\\n        margin: 0 0 0.5em 0;\\r\\n        font-weight: 400;\\r\\n        line-height: 1.2;\\r\\n    }\\r\\n\\r\\n    h1 {\\r\\n        font-size: 2em;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        color: inherit;\\r\\n    }\\r\\n\\r\\n    code {\\r\\n        font-family: menlo, inconsolata, monospace;\\r\\n        font-size: calc(1em - 2px);\\r\\n        color: #555;\\r\\n        background-color: #f0f0f0;\\r\\n        padding: 0.2em 0.4em;\\r\\n        border-radius: 2px;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 400px) {\\r\\n        body {\\r\\n            font-size: 16px;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<Tailwindcss />\\r\\n\\r\\n<svelte:head>\\r\\n\\r\\n    <!-- <link rel=\\\"stylesheet\\\" href=\\\"../../fontisto-master/css/fontisto/fontisto.min.css\\\" /> -->\\r\\n    <!--Adsense-->\\r\\n\\r\\n    <!-- Global site tag (gtag.js) - Google Analytics -->\\r\\n\\r\\n</svelte:head>\\r\\n\\r\\n<svelte:window bind:scrollY={scrollY} />\\r\\n<div class=\\\"font w-full bg-background min-h-screen h-full flex flex-col relative\\\">\\r\\n    {#if isShowingGuide}\\r\\n        <div class=\\\"fixed top-0 bottom-0 left-0 right-0   bg-background /bg-black bg-opacity-80 \\\" style=\\\"z-index: 55\\\"></div>\\r\\n    {/if}\\r\\n\\r\\n    <CookiePopup />\\r\\n    <Nav isScrolling={scrollY > 0} />\\r\\n    {#if error}\\r\\n        <ErrorAlert message=\\\"We had some trouble getting to Winhalla\\\" pushError={error} />\\r\\n    {/if}\\r\\n\\r\\n    <main class=\\\"text-font text-default min-h-screen h-full relative\\\">\\r\\n        <!--Main-->\\r\\n\\r\\n\\r\\n        <slot class=\\\"flex-grow bg-background block-grow\\\" />\\r\\n        <!--<GameModeCards page={\\\"play\\\"}/>-->\\r\\n    </main>\\r\\n    <!--<div class=\\\"fixed bottom-0 right-20 bg-background border border-b-0 border-green px-12 pt-6 rounded-t-xl\\\">\\r\\n        <Poll/>\\r\\n    </div>-->\\r\\n\\r\\n    <!--Footer-->\\r\\n    <Footer />\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA6CI,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,AACzC,CAAC,AAED,IAAI,cAAC,CAAC,AACF,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAC5B,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAC9C,CAAC,AAuCD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let error;
	let isShowingGuide;

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

		const acceptedCookieList = getCookie("acceptedCookieList");

		if (acceptedCookieList === "true") {
			window.yett.unblock();
		} else if (getCookie("hideCookiePopup")) {
			window.yett.unblock(JSON.parse(decodeURI(acceptedCookieList).replace(/%2C/g, ",").replace(/%2F/g, "/")));
		}

		guideHandlerStore.subscribe(value => {
			isShowingGuide = !!value.current;
		});
	});

	let scrollY = 0;
	$$result.css.add(css$9);

	return `${validate_component(Tailwindcss, "Tailwindcss").$$render($$result, {}, {}, {})}

${($$result.head += ``, "")}


<div class="${"font w-full bg-background min-h-screen h-full flex flex-col relative svelte-2ej71o"}">${isShowingGuide
	? `<div class="${"fixed top-0 bottom-0 left-0 right-0   bg-background /bg-black bg-opacity-80 "}" style="${"z-index: 55"}"></div>`
	: ``}

    ${validate_component(CookiePopup, "CookiePopup").$$render($$result, {}, {}, {})}
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
		// create-account.svelte
		pattern: /^\/create-account\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// referral-link.svelte
		pattern: /^\/referral-link\/?$/,
		parts: [
			{ i: 2 }
		]
	},

	{
		// leaderboard.svelte
		pattern: /^\/leaderboard\/?$/,
		parts: [
			{ i: 3 }
		]
	},

	{
		// feltrom/admin.svelte
		pattern: /^\/feltrom\/admin\/?$/,
		parts: [
			null,
			{ i: 4 }
		]
	},

	{
		// privacy.svelte
		pattern: /^\/privacy\/?$/,
		parts: [
			{ i: 5 }
		]
	},

	{
		// profile/[username].svelte
		pattern: /^\/profile\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 6, params: match => ({ username: d(match[1]) }) }
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
		// legal.svelte
		pattern: /^\/legal\/?$/,
		parts: [
			{ i: 8 }
		]
	},

	{
		// login.svelte
		pattern: /^\/login\/?$/,
		parts: [
			{ i: 9 }
		]
	},

	{
		// terms.svelte
		pattern: /^\/terms\/?$/,
		parts: [
			{ i: 10 }
		]
	},

	{
		// test2.svelte
		pattern: /^\/test2\/?$/,
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

/* src\components\Loading.svelte generated by Svelte v3.31.0 */

const css$b = {
	code: ".loader.svelte-1r0tf3p{border:12px solid transparent;border-radius:50%;border-top:12px solid #3d72e4;width:150px;height:150px;-webkit-animation:svelte-1r0tf3p-spin 0.6s linear infinite;animation:svelte-1r0tf3p-spin 0.6s linear infinite}@-webkit-keyframes svelte-1r0tf3p-spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes svelte-1r0tf3p-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
	map: "{\"version\":3,\"file\":\"Loading.svelte\",\"sources\":[\"Loading.svelte\"],\"sourcesContent\":[\"<style>\\r\\n    .loader {\\r\\n        border: 12px solid transparent;\\r\\n        border-radius: 50%;\\r\\n        border-top: 12px solid #3d72e4;\\r\\n        width: 150px;\\r\\n        height: 150px;\\r\\n        -webkit-animation: spin 0.6s linear infinite; /* Safari */\\r\\n        animation: spin 0.6s linear infinite;\\r\\n    }\\r\\n\\r\\n    /* Safari */\\r\\n    @-webkit-keyframes spin {\\r\\n        0% {\\r\\n            -webkit-transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            -webkit-transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes spin {\\r\\n        0% {\\r\\n            transform: rotate(0deg);\\r\\n        }\\r\\n        100% {\\r\\n            transform: rotate(360deg);\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n<script>\\r\\n    export let data;\\r\\n    export let duration = 500;\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n</script>\\r\\n<div out:fade={{duration}}\\r\\n     class=\\\"fixed z-50 bg-background absolute top-10 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90\\\">\\r\\n    <div class=\\\"pb-20 bg-background w-screenw-99 h-screen-99\\\">\\r\\n        <div class=\\\"mx-auto\\\">\\r\\n            <div class=\\\"loader mt-15/100 mx-auto\\\"></div>\\r\\n            {#if data}\\r\\n                <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">{data}</h2>\\r\\n            {:else}\\r\\n                <h2 class=\\\"text-center text-3xl font-bold pt-4\\\">Loading...</h2>\\r\\n            {/if}\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AACI,OAAO,eAAC,CAAC,AACL,MAAM,CAAE,IAAI,CAAC,KAAK,CAAC,WAAW,CAC9B,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC9B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,iBAAiB,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,CAC5C,SAAS,CAAE,mBAAI,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AACxC,CAAC,AAGD,mBAAmB,mBAAK,CAAC,AACrB,EAAE,AAAC,CAAC,AACA,iBAAiB,CAAE,OAAO,IAAI,CAAC,AACnC,CAAC,AACD,IAAI,AAAC,CAAC,AACF,iBAAiB,CAAE,OAAO,MAAM,CAAC,AACrC,CAAC,AACL,CAAC,AAED,WAAW,mBAAK,CAAC,AACb,EAAE,AAAC,CAAC,AACA,SAAS,CAAE,OAAO,IAAI,CAAC,AAC3B,CAAC,AACD,IAAI,AAAC,CAAC,AACF,SAAS,CAAE,OAAO,MAAM,CAAC,AAC7B,CAAC,AACL,CAAC\"}"
};

const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let { duration = 500 } = $$props;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
	$$result.css.add(css$b);

	return `<div class="${"fixed z-50 bg-background absolute top-10 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90"}"><div class="${"pb-20 bg-background w-screenw-99 h-screen-99"}"><div class="${"mx-auto"}"><div class="${"loader mt-15/100 mx-auto svelte-1r0tf3p"}"></div>
            ${data
	? `<h2 class="${"text-center text-3xl font-bold pt-4"}">${escape(data)}</h2>`
	: `<h2 class="${"text-center text-3xl font-bold pt-4"}">Loading...</h2>`}</div></div></div>`;
});

/* src\routes\referral-link.svelte generated by Svelte v3.31.0 */

const css$c = {
	code: "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');b.svelte-1kcrz1w{@apply text-primary font-normal leading-none;}.tooltip.svelte-1kcrz1w::after{content:\"\";position:absolute;top:98%;right:20%;margin-left:-6px;border-width:6px;border-style:solid;border-color:#3d72e4 transparent transparent transparent}.accent.svelte-1kcrz1w{@apply text-accent;}input.svelte-1kcrz1w{@apply w-full text-background bg-font py-3 px-4 rounded;}",
	map: "{\"version\":3,\"file\":\"referral-link.svelte\",\"sources\":[\"referral-link.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\r\\n    export async function preload({ query }) {\\r\\n        //console.log(query.visible)\\r\\n        return { isVisible: query.visible };\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<script>\\r\\n    import {onMount} from \\\"svelte\\\";\\r\\n    import cookie from \\\"cookie\\\";\\r\\n    import {callApi} from \\\"../utils/api\\\";\\r\\n    import {goto} from \\\"@sapper/app\\\";\\r\\n    import {counter} from \\\"../components/stores\\\";\\r\\n    import Loading from \\\"../components/Loading.svelte\\\";\\r\\n\\r\\n    import { gtagEvent } from \\\"../utils/gtagEvent\\\";\\r\\n    import {apiUrl} from \\\"../utils/config\\\";\\r\\n    import {fade} from \\\"svelte/transition\\\";\\r\\n    import share from \\\"../utils/share\\\";\\r\\n    import copyText from \\\"../utils/copyText\\\";\\r\\n\\r\\n    export let isVisible;\\r\\n    let waitingTermsAcceptations;\\r\\n    let generatedLink;\\r\\n    let waitingBID;\\r\\n    let isValidBrawlhallaID = null;\\r\\n    let brawlhallaIDError;\\r\\n\\r\\n    let error;\\r\\n    let toolTipOpen;\\r\\n    let hasShareFunction;\\r\\n    let linkConfig;\\r\\n    let brawlhallaID = \\\"\\\";\\r\\n    let lastInterval;\\r\\n    onMount(async () => {\\r\\n        if ((new URLSearchParams(document.location.search)).get(\\\"needBrawlhallaID\\\") === \\\"true\\\") waitingBID = true;\\r\\n\\r\\n        hasShareFunction = !!window.navigator.share;\\r\\n        linkConfig = callApi(\\\"get\\\", \\\"/linkConfig\\\");\\r\\n        let user = callApi(\\\"get\\\", \\\"/account\\\");\\r\\n        user = await user;\\r\\n        linkConfig = await linkConfig;\\r\\n        if (!user || (user.user && !isVisible)) {\\r\\n            isVisible = true;\\r\\n            generatedLink = `https://winhalla.app/link/${user.user.linkId}`;\\r\\n        }\\r\\n        if (!user.user) {\\r\\n            waitingTermsAcceptations = true;\\r\\n        } else {\\r\\n            generatedLink = user.user.linkId;\\r\\n        }\\r\\n        generatedLink = `https://winhalla.app/link/${generatedLink}`;\\r\\n        counter.set({ refresh: true });\\r\\n    });\\r\\n\\r\\n    async function createAccount() {\\r\\n        waitingTermsAcceptations = false;\\r\\n        let { source, affiliateLinkId } = cookie.parse(document.cookie);\\r\\n        if (source === \\\"youtube\\\") {\\r\\n            function gtag_report_conversion(url) {\\r\\n                var callback = function() {\\r\\n                    if (typeof (url) != \\\"undefined\\\") {\\r\\n                        window.location = url;\\r\\n                    }\\r\\n                };\\r\\n                gtagEvent(\\\"event\\\", \\\"conversion\\\", {\\r\\n                    \\\"send_to\\\": \\\"AW-344543876/SNoCCNfa5NgCEISlpaQB\\\",\\r\\n                    \\\"event_callback\\\": callback\\r\\n                });\\r\\n                return false;\\r\\n            }\\r\\n        }\\r\\n        generatedLink = await callApi(\\\"post\\\", `/auth/createAccount?linkId=${affiliateLinkId}&source=${source}&BID=${brawlhallaID}`);\\r\\n        if (generatedLink instanceof Error) return { error, isVisible } = { error: true, isVisible: true };\\r\\n        document.cookie = cookie.serialize(\\\"affiliateLinkId\\\", 0, { maxAge: 1 });\\r\\n        document.cookie = cookie.serialize(\\\"source\\\", 0, { maxAge: 1 });\\r\\n        isVisible = true;\\r\\n        generatedLink = `https://winhalla.app/link/${generatedLink}`;\\r\\n        counter.set({ refresh: true });\\r\\n    }\\r\\n\\r\\n\\r\\n\\r\\n    async function testBrawlhallaID() {\\r\\n        if (isNaN(parseInt(brawlhallaID))) {\\r\\n            brawlhallaIDError = \\\"The brawlhalla id is a number (not your brawlhalla username)\\\"\\r\\n            isValidBrawlhallaID = false\\r\\n            return;\\r\\n        }\\r\\n        const { isValid, reason } = await callApi(\\\"get\\\", `/auth/isBIDvalid/${brawlhallaID}`);\\r\\n        if (isValid) {\\r\\n            waitingBID = false;\\r\\n        } else {\\r\\n            brawlhallaIDError = reason;\\r\\n            isValidBrawlhallaID = false;\\r\\n        }\\r\\n        clearInterval(lastInterval);\\r\\n        lastInterval = setTimeout(() => isValidBrawlhallaID = null, 4000);\\r\\n    }\\r\\n</script>\\r\\n<!--\\r\\n<Loading data=\\\"Logging in...\\\" />\\r\\n-->\\r\\n<svelte:head>\\r\\n    <title>Invite friends and earn rewards | Winhalla, Play Brawlhalla. Earn rewards.</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');\\r\\n\\r\\n    b {\\r\\n        @apply text-primary font-normal leading-none;\\r\\n    }\\r\\n\\r\\n    .tooltip::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 98%;\\r\\n        right: 20%;\\r\\n        margin-left: -6px;\\r\\n        border-width: 6px;\\r\\n        border-style: solid;\\r\\n        border-color: #3d72e4 transparent transparent transparent;\\r\\n    }\\r\\n\\r\\n    .accent {\\r\\n        @apply text-accent;\\r\\n    }\\r\\n\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n{#if isVisible && linkConfig?.boost}\\r\\n    {#if !error}\\r\\n        <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n            <div class=\\\"flex flex-col items-center px-5\\\">\\r\\n                <div class=\\\"text-center mt-7 lg:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-8 lg:mb-8 leading-snug\\r\\n                        lg:leading-normal\\\">\\r\\n                        Invite friends and earn rewards\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"flex flex-col md:flex-row items-center\\\">\\r\\n                    <div\\r\\n                        class=\\\"card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\\r\\n                        md:mr-12\\\">\\r\\n                        <p class=\\\"text-6xl mt-6\\\">You</p>\\r\\n                        <p class=\\\"leading-7 mt-13 text-2xl\\\">\\r\\n                            will get\\r\\n                            <b>{linkConfig.boost/2}%</b>\\r\\n                            of the coins that\\r\\n                            <b>each people</b>\\r\\n                            who\\r\\n                            <b>creates an account</b>\\r\\n                            with your link wins, for {linkConfig.duration} days!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div class=\\\"flex items-center md:block\\\">\\r\\n                        <div class=\\\"hidden md:flex items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mr-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m19.2 2.43-2.422-2.43-11.978 12 11.978 12\\r\\n                                    2.422-2.43-9.547-9.57z\\\" />\\r\\n                            </svg>\\r\\n                            <div class=\\\"h-2px bg-accent w-40\\\" />\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -ml-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m4.8 21.57 2.422 2.43\\r\\n                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n                        <div class=\\\"flex flex-col md:hidden items-center\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mb-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m21.57 19.2 2.43-2.422-12-11.978-12\\r\\n                                    11.978 2.43 2.422 9.57-9.547z\\\" />\\r\\n                            </svg>\\r\\n                            <div class=\\\"w-2px bg-accent h-16\\\" />\\r\\n                            <svg\\r\\n                                class=\\\"w-4 fill-current text-accent -mt-3\\\"\\r\\n                                viewBox=\\\"0 0 24 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m2.43 4.8-2.43 2.422 12 11.978\\r\\n                                    12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n\\r\\n                        <p\\r\\n                            class=\\\"text-center text-extra-light text-lg ml-4\\r\\n                            md:ml-0\\\">\\r\\n                            Everyone wins!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div\\r\\n                        class=\\\"card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0\\r\\n                        md:ml-12\\\">\\r\\n                        <p class=\\\"text-6xl\\\">Each person</p>\\r\\n                        <p class=\\\"leading-7 mt-4 text-2xl\\\">\\r\\n                            that will\\r\\n                            <b>create an account</b>\\r\\n                            with\\r\\n                            <u>your</u>\\r\\n                            link will get\\r\\n                            <b>{linkConfig.boost}%</b>\\r\\n                            more coins for {linkConfig.duration} days!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"lg:flex justify-center\\\">\\r\\n                    {#if generatedLink}\\r\\n                        <div\\r\\n                            class=\\\"text-background  bg-font py-4 px-3 mt-14 flex items-center rounded\\\">\\r\\n                            <div id=\\\"link\\\"\\r\\n                                 class=\\\"flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none\\\"\\r\\n                                 style=\\\"font-family:'Roboto Condensed', sans-serif\\\"><p class=\\\"ml-1\\\">{generatedLink}</p>\\r\\n                                <div class=\\\"ml-2 h-5  flex\\\"\\r\\n                                     class:w-5={!hasShareFunction} class:w-12={hasShareFunction}>\\r\\n                                    {#if hasShareFunction}\\r\\n                                        <div class=\\\"w-5 h-5 hover:text-gray-500 cursor-pointer  mr-1\\\">\\r\\n                                            <svg viewBox=\\\"0 0 24 24\\\" fill=\\\"currentColor\\\"\\r\\n                                                 on:click={() => share(generatedLink)}\\r\\n                                                 class=\\\"w-5 h-5\\\"\\r\\n                                                 class:mr-1={hasShareFunction}\\r\\n                                                 xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                                <path\\r\\n                                                        d=\\\"m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z\\\"/>\\r\\n                                            </svg>\\r\\n                                        </div>\\r\\n                                    {/if}\\r\\n                                    <div class=\\\"w-5 h-5 hover:text-gray-500 cursor-pointer\\\">\\r\\n                                        <svg viewBox=\\\"0 0 24 24\\\" fill=\\\"currentColor\\\" class=\\\"w-5 h-5\\\"\\r\\n                                             class:ml-1={hasShareFunction}\\r\\n                                             on:click={() => copyText(generatedLink, function () {toolTipOpen = true;\\r\\n                                                setTimeout(() => {\\r\\n                                                    toolTipOpen = false;\\r\\n                                                }, 3000);\\r\\n                                             })}\\r\\n                                             xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                    d=\\\"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z\\\"/>\\r\\n                                            <path\\r\\n                                                    d=\\\"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z\\\"/>\\r\\n                                            <path\\r\\n                                                    d=\\\"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z\\\"/>\\r\\n                                        </svg>\\r\\n                                    </div>\\r\\n\\r\\n                                </div>\\r\\n                            </div>\\r\\n                            {#if toolTipOpen}\\r\\n                                <div class=\\\"relative\\\">\\r\\n                                    <span\\r\\n                                            class=\\\"tooltip absolute px-6 py-2 bg-primary hidden md:block rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40\\\"\\r\\n                                            transition:fade>\\r\\n                                            Copied!\\r\\n                                    </span>\\r\\n                                </div>\\r\\n                            {/if}\\r\\n\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                </div>\\r\\n\\r\\n                <p class=\\\"pt-4 text-default text-center\\\">\\r\\n                    You will be able to\\r\\n                    <b class=\\\"accent\\\">access your link</b>\\r\\n                    by clicking on\\r\\n                    <b class=\\\"accent\\\">your profile</b>\\r\\n                    !\\r\\n                </p>\\r\\n                <a\\r\\n                        href=\\\"/play\\\"\\r\\n                        class=\\\"button button-brand mt-10 block mx-auto mb-6 md:mb-0\\\">\\r\\n                    Finish\\r\\n                </a>\\r\\n            </div>\\r\\n        </div>\\r\\n    {:else}\\r\\n        <div class=\\\"w-full content-center lg:mt-60 mt-25 \\\">\\r\\n            <h2 class=\\\"lg:text-5xl text-3xl text-center\\\">Account creation didn't work. Please try again\\r\\n                later.</h2>\\r\\n            <a href=\\\"/\\\"><p class=\\\"underline lg:text-3xl pt-4 text-2xl  text-center text-primary\\\">Go to\\r\\n                home page</p></a>\\r\\n        </div>\\r\\n    {/if}\\r\\n{:else if waitingTermsAcceptations && waitingBID}\\r\\n    <div class=\\\"flex items-center justify-center md:h-screen-7  relative\\\">\\r\\n        <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\">\\r\\n            <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                <h1\\r\\n                        class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-tight\\\">\\r\\n                    Register your <br> Brawlhalla ID\\r\\n                </h1>\\r\\n            </div>\\r\\n            <div class=\\\"md:mt-4\\\">\\r\\n                <div>\\r\\n                    <input\\r\\n                            type=\\\"email\\\"\\r\\n                            placeholder=\\\"Your Brawlhalla ID goes here\\\"\\r\\n                            bind:value={brawlhallaID}\\r\\n                            class:border-legendary={isValidBrawlhallaID === false}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\"/>\\r\\n\\r\\n                    {#if isValidBrawlhallaID === false}\\r\\n                        <p class=\\\"text-legendary info \\\">{brawlhallaIDError}</p>\\r\\n                    {/if}\\r\\n                </div>\\r\\n            </div>\\r\\n            <button\\r\\n                    on:click={testBrawlhallaID}\\r\\n                    class:mt-11={isValidBrawlhallaID == null}\\r\\n                    class=\\\"button button-brand mt-3\\\">\\r\\n                Continue\\r\\n            </button>\\r\\n            <p class=\\\"mt-8 italic font-xl\\\"\\r\\n               style=\\\"max-width: 17rem; font-size: 1.25rem; font-family: 'Roboto Condensed', sans-serif\\\">This is your\\r\\n                Brawlhalla user id. You will find it by clicking on the box under your username (in Brawlhalla):\\r\\n                and then in the top right corner!</p>\\r\\n\\r\\n            <img class=\\\"my-8  md:hidden\\\" src=\\\"assets/bid.jpg\\\" style=\\\"max-width: 18rem\\\" alt=\\\"BID example\\\">\\r\\n        </div>\\r\\n        <img class=\\\"-bottom-70  absolute hidden md:block\\\" src=\\\"assets/bidCut.jpg\\\" style=\\\"max-width: 36rem\\\"\\r\\n             alt=\\\"BID example\\\">\\r\\n\\r\\n    </div>\\r\\n{:else if waitingTermsAcceptations && !waitingBID}\\r\\n    <div class=\\\"flex items-center justify-center mt-30 flex-col\\\">\\r\\n        <p class=\\\"text-3xl\\\">By clicking the button below you accept our <a href=\\\"/terms\\\"\\r\\n                                                                           class=\\\"underline text-primary\\\">terms\\r\\n            and conditions </a>,\\r\\n            our <a href=\\\"/privacy\\\" class=\\\"underline text-primary\\\">Privacy policy</a> and the creation of an account\\r\\n        </p>\\r\\n        <button on:click={createAccount} class=\\\"button button-brand mt-10\\\">Create account</button>\\r\\n    </div>\\r\\n{:else}\\r\\n    <Loading data={waitingTermsAcceptations === false?\\\"Creating account...\\\":\\\"Logging in...\\\"} />\\r\\n{/if}\\r\\n\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA2GI,QAAQ,IAAI,0EAA0E,CAAC,CAAC,AAExF,CAAC,eAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,YAAY,CAAC,AACjD,CAAC,AAED,uBAAQ,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC7D,CAAC,AAED,OAAO,eAAC,CAAC,AACL,OAAO,WAAW,CAAC,AACvB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC\"}"
};

async function preload({ query }) {
	//console.log(query.visible)
	return { isVisible: query.visible };
}

const Referral_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isVisible } = $$props;
	let waitingTermsAcceptations;
	let generatedLink;
	let waitingBID;
	let hasShareFunction;
	let linkConfig;
	let brawlhallaID = "";

	onMount(async () => {
		if (new URLSearchParams(document.location.search).get("needBrawlhallaID") === "true") waitingBID = true;
		hasShareFunction = !!window.navigator.share;
		linkConfig = callApi("get", "/linkConfig");
		let user = callApi("get", "/account");
		user = await user;
		linkConfig = await linkConfig;

		if (!user || user.user && !isVisible) {
			isVisible = true;
			generatedLink = `https://winhalla.app/link/${user.user.linkId}`;
		}

		if (!user.user) {
			waitingTermsAcceptations = true;
		} else {
			generatedLink = user.user.linkId;
		}

		generatedLink = `https://winhalla.app/link/${generatedLink}`;
		counter.set({ refresh: true });
	});

	if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0) $$bindings.isVisible(isVisible);
	$$result.css.add(css$c);

	return `
${($$result.head += `${($$result.title = `<title>Invite friends and earn rewards | Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}`, "")}


${isVisible && linkConfig?.boost
	? `${ `<div class="${"flex items-center justify-center md:h-screen-7"}"><div class="${"flex flex-col items-center px-5"}"><div class="${"text-center mt-7 lg:mt-12"}"><h1 class="${"text-6xl mb-8 lg:mb-8 leading-snug\r\n                        lg:leading-normal"}">Invite friends and earn rewards
                    </h1></div>
                <div class="${"flex flex-col md:flex-row items-center"}"><div class="${"card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\r\n                        md:mr-12"}"><p class="${"text-6xl mt-6"}">You</p>
                        <p class="${"leading-7 mt-13 text-2xl"}">will get
                            <b class="${"svelte-1kcrz1w"}">${escape(linkConfig.boost / 2)}%</b>
                            of the coins that
                            <b class="${"svelte-1kcrz1w"}">each people</b>
                            who
                            <b class="${"svelte-1kcrz1w"}">creates an account</b>
                            with your link wins, for ${escape(linkConfig.duration)} days!
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
                        <p class="${"leading-7 mt-4 text-2xl"}">that will
                            <b class="${"svelte-1kcrz1w"}">create an account</b>
                            with
                            <u>your</u>
                            link will get
                            <b class="${"svelte-1kcrz1w"}">${escape(linkConfig.boost)}%</b>
                            more coins for ${escape(linkConfig.duration)} days!
                        </p></div></div>
                <div class="${"lg:flex justify-center"}">${generatedLink
			? `<div class="${"text-background  bg-font py-4 px-3 mt-14 flex items-center rounded"}"><div id="${"link"}" class="${"flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"}" style="${"font-family:'Roboto Condensed', sans-serif"}"><p class="${"ml-1"}">${escape(generatedLink)}</p>
                                <div class="${[
					"ml-2 h-5  flex",
					(!hasShareFunction ? "w-5" : "") + " " + (hasShareFunction ? "w-12" : "")
				].join(" ").trim()}">${hasShareFunction
				? `<div class="${"w-5 h-5 hover:text-gray-500 cursor-pointer  mr-1"}"><svg viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${["w-5 h-5", hasShareFunction ? "mr-1" : ""].join(" ").trim()}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z"}"></path></svg></div>`
				: ``}
                                    <div class="${"w-5 h-5 hover:text-gray-500 cursor-pointer"}"><svg viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${["w-5 h-5", hasShareFunction ? "ml-1" : ""].join(" ").trim()}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z"}"></path><path d="${"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z"}"></path><path d="${"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"}"></path></svg></div></div></div>
                            ${ ``}</div>`
			: ``}</div>

                <p class="${"pt-4 text-default text-center"}">You will be able to
                    <b class="${"accent svelte-1kcrz1w"}">access your link</b>
                    by clicking on
                    <b class="${"accent svelte-1kcrz1w"}">your profile</b>
                    !
                </p>
                <a href="${"/play"}" class="${"button button-brand mt-10 block mx-auto mb-6 md:mb-0"}">Finish
                </a></div></div>`
		}`
	: `${waitingTermsAcceptations && waitingBID
		? `<div class="${"flex items-center justify-center md:h-screen-7  relative"}"><div class="${"flex flex-col justify-center px-5 md:p-0"}"><div class="${"text-center md:text-left mt-7 md:mt-12"}"><h1 class="${"text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-tight"}">Register your <br> Brawlhalla ID
                </h1></div>
            <div class="${"md:mt-4"}"><div><input type="${"email"}" placeholder="${"Your Brawlhalla ID goes here"}" class="${[
				"input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-1kcrz1w",
				 ""
			].join(" ").trim()}"${add_attribute("value", brawlhallaID, 1)}>

                    ${ ``}</div></div>
            <button class="${["button button-brand mt-3",  "mt-11" ].join(" ").trim()}">Continue
            </button>
            <p class="${"mt-8 italic font-xl"}" style="${"max-width: 17rem; font-size: 1.25rem; font-family: 'Roboto Condensed', sans-serif"}">This is your
                Brawlhalla user id. You will find it by clicking on the box under your username (in Brawlhalla):
                and then in the top right corner!</p>

            <img class="${"my-8  md:hidden"}" src="${"assets/bid.jpg"}" style="${"max-width: 18rem"}" alt="${"BID example"}"></div>
        <img class="${"-bottom-70  absolute hidden md:block"}" src="${"assets/bidCut.jpg"}" style="${"max-width: 36rem"}" alt="${"BID example"}"></div>`
		: `${waitingTermsAcceptations && !waitingBID
			? `<div class="${"flex items-center justify-center mt-30 flex-col"}"><p class="${"text-3xl"}">By clicking the button below you accept our <a href="${"/terms"}" class="${"underline text-primary"}">terms
            and conditions </a>,
            our <a href="${"/privacy"}" class="${"underline text-primary"}">Privacy policy</a> and the creation of an account
        </p>
        <button class="${"button button-brand mt-10"}">Create account</button></div>`
			: `${validate_component(Loading, "Loading").$$render(
					$$result,
					{
						data: waitingTermsAcceptations === false
						? "Creating account..."
						: "Logging in..."
					},
					{},
					{}
				)}`}`}`}`;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Referral_link,
    preload: preload
});

/* src\routes\leaderboard.svelte generated by Svelte v3.31.0 */

const Leaderboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return ``;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Leaderboard
});

let config = writable({ users:true });

/* src\components\RefreshButton.svelte generated by Svelte v3.31.0 */

const css$d = {
	code: ".refresh-button.svelte-mld06t.svelte-mld06t{@apply flex px-7 items-center;}.refresh-button.svelte-mld06t div.svelte-mld06t{margin-top:-0.185rem}.refresh-button.svelte-mld06t svg.svelte-mld06t{@apply fill-current text-font w-5 animate-spin left-4;}.refresh-button.svelte-mld06t.svelte-mld06t:disabled{@apply bg-disabled;;cursor:not-allowed\r\n    }",
	map: "{\"version\":3,\"file\":\"RefreshButton.svelte\",\"sources\":[\"RefreshButton.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\r\\n\\r\\n    export let isRefreshing;\\r\\n    export let refreshMessage;\\r\\n    export let onRefreshMessage = \\\"Refreshing\\\"\\r\\n    export let deactivated = false\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .refresh-button {\\r\\n        @apply flex px-7 items-center;\\r\\n    }\\r\\n\\r\\n    .refresh-button div {\\r\\n        margin-top: -0.185rem;\\r\\n    }\\r\\n    .refresh-button svg {\\r\\n        @apply fill-current text-font w-5 animate-spin left-4;\\r\\n    }\\r\\n    .refresh-button:disabled{\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<button class=\\\"button button-brand refresh-button focus:outline-none\\\"  disabled={deactivated}>\\r\\n    <div class:hidden={!isRefreshing} class=\\\"block\\\">\\r\\n        <svg viewBox=\\\"0 0 21 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n            <path\\r\\n                d=\\\"m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z\\\" />\\r\\n        </svg>\\r\\n    </div>\\r\\n    <p class:pl-3={isRefreshing} class=\\\"pl-3\\\">\\r\\n        {isRefreshing ? onRefreshMessage : refreshMessage}\\r\\n    </p>\\r\\n</button>\\r\\n\"],\"names\":[],\"mappings\":\"AAUI,eAAe,4BAAC,CAAC,AACb,OAAO,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,AAClC,CAAC,AAED,6BAAe,CAAC,GAAG,cAAC,CAAC,AACjB,UAAU,CAAE,SAAS,AACzB,CAAC,AACD,6BAAe,CAAC,GAAG,cAAC,CAAC,AACjB,OAAO,YAAY,CAAC,SAAS,CAAC,GAAG,CAAC,YAAY,CAAC,MAAM,CAAC,AAC1D,CAAC,AACD,2CAAe,SAAS,CAAC,AACrB,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW;IACvB,CAAC\"}"
};

const RefreshButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isRefreshing } = $$props;
	let { refreshMessage } = $$props;
	let { onRefreshMessage = "Refreshing" } = $$props;
	let { deactivated = false } = $$props;
	if ($$props.isRefreshing === void 0 && $$bindings.isRefreshing && isRefreshing !== void 0) $$bindings.isRefreshing(isRefreshing);
	if ($$props.refreshMessage === void 0 && $$bindings.refreshMessage && refreshMessage !== void 0) $$bindings.refreshMessage(refreshMessage);
	if ($$props.onRefreshMessage === void 0 && $$bindings.onRefreshMessage && onRefreshMessage !== void 0) $$bindings.onRefreshMessage(onRefreshMessage);
	if ($$props.deactivated === void 0 && $$bindings.deactivated && deactivated !== void 0) $$bindings.deactivated(deactivated);
	$$result.css.add(css$d);

	return `<button class="${"button button-brand refresh-button focus:outline-none svelte-mld06t"}" ${deactivated ? "disabled" : ""}><div class="${["block svelte-mld06t", !isRefreshing ? "hidden" : ""].join(" ").trim()}"><svg viewBox="${"0 0 21 24"}" xmlns="${"http://www.w3.org/2000/svg"}" class="${"svelte-mld06t"}"><path d="${"m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z"}"></path></svg></div>
    <p class="${["pl-3", isRefreshing ? "pl-3" : ""].join(" ").trim()}">${escape(isRefreshing ? onRefreshMessage : refreshMessage)}</p></button>`;
});

/* src\routes\feltrom\admin.svelte generated by Svelte v3.31.0 */

const css$e = {
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

	$$result.css.add(css$e);
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

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Admin
});

/* src\routes\privacy.svelte generated by Svelte v3.31.0 */

const css$f = {
	code: "h2.svelte-1fbtrh0{@apply text-4xl mt-6 mb-3 underline;}ul.svelte-1fbtrh0{list-style-type:disc;@apply ml-6 my-3;}.div.svelte-1fbtrh0{background-color:#FFFFFF;color:#000000\r\n    }p.svelte-1fbtrh0{@apply py-2px;}a.svelte-1fbtrh0{@apply underline;}.btn.svelte-1fbtrh0{background-color:#FFFFFF;border:1px solid #000000}",
	map: "{\"version\":3,\"file\":\"privacy.svelte\",\"sources\":[\"privacy.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n\\r\\n    let isEditingConsent = false;\\r\\n    let confirmationPopupOpen;\\r\\n    let pushError;\\r\\n    let message;\\r\\n\\r\\n    function makePopup(whatFor) {\\r\\n        confirmationPopupOpen = whatFor;\\r\\n    }\\r\\n\\r\\n    async function confirm(what) {\\r\\n        if (what === \\\"delete account\\\") {\\r\\n            await callApi(\\\"delete\\\", \\\"/auth/deleteAccount\\\");\\r\\n            actionDone(\\\"account deleted\\\");\\r\\n        } else if (what === \\\"restrict processing\\\") {\\r\\n            await callApi(\\\"patch\\\", \\\"/auth/moveAccount\\\");\\r\\n            actionDone(\\\"account moved\\\");\\r\\n        }\\r\\n        confirmationPopupOpen = undefined;\\r\\n    }\\r\\n\\r\\n    function actionDone(action) {\\r\\n        if (action === \\\"cookieConsentReset\\\") {\\r\\n            document.cookie = \\\"hideCookiePopup=;expires=Thu, 01 Jan 1970 00:00:00 GMT\\\";\\r\\n            pushError = \\\"Refresh the page to edit your cookies consent\\\";\\r\\n            message = \\\"One more step\\\";\\r\\n        } else if (action === \\\"account deleted\\\") {\\r\\n            pushError = \\\"Steam data may take up to 30 days to be deleted\\\";\\r\\n            message = \\\"Account successfully deleted\\\";\\r\\n        } else if (action === \\\"account moved\\\") {\\r\\n            pushError = \\\"\\\";\\r\\n            message = \\\"Data process restriction applied\\\";\\r\\n        }\\r\\n        setTimeout(() => {\\r\\n            pushError = undefined;\\r\\n            message = undefined;\\r\\n        }, 10000);\\r\\n    }\\r\\n</script>\\r\\n<svelte:head>\\r\\n    <title>Privacy policy | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n\\r\\n    ul {\\r\\n        list-style-type: disc;\\r\\n        @apply ml-6 my-3;\\r\\n    }\\r\\n\\r\\n    .div {\\r\\n        background-color: #FFFFFF;\\r\\n        color: #000000\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n\\r\\n    .btn {\\r\\n        background-color: #FFFFFF;\\r\\n        border: 1px solid #000000;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8 \\\"\\r\\n     style=\\\"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);\\\">\\r\\n    <h1 class=\\\"text-5xl underline mb-4\\\">Privacy Policy</h1>\\r\\n    <p>Winhalla operates the https://winhalla.app website (\\\"Site\\\"), which provides the SERVICE.</p>\\r\\n\\r\\n    <p>This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of\\r\\n        Personal Information if anyone decided to use our Service, the Site. </p>\\r\\n    <p>We therefore only use your personal data within the scope of legal regulations, in particular the General Data\\r\\n        Protection Regulation (\\\"GDPR\\\")</p>\\r\\n    <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this\\r\\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\\r\\n        use or share your information with anyone except as described in this Privacy Policy.</p>\\r\\n\\r\\n    <h2>I. Account data</h2>\\r\\n    <p>To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with\\r\\n        your Steam Account and clicking on \\\"Accept Terms And Conditions\\\", we automatically create an account containing\\r\\n        : </p>\\r\\n    <ul>\\r\\n        <li>Your SteamID64</li>\\r\\n        <li>Your profile picture URL</li>\\r\\n        <li>Your username</li>\\r\\n        <li>And other data (including but not limited to : your coins number, your quest in progress...) This\\r\\n            information is internal to the Site, is used only by us and in no case disclosed\\r\\n        </li>\\r\\n    </ul>\\r\\n    <p>Your STEAMID64 may be sent to Brawlhalla's API (<a\\r\\n        href=\\\"https://api.brawlhalla.com\\\">https://api.brawlhalla.com</a>) to track your progress in the game and give\\r\\n        you coins according to your performance</p>\\r\\n    <p>Other account data will not be sent, sold, rented, or traded to any third-party.</p>\\r\\n    <p id=\\\"analytical\\\">All your account data is kept until you <a href=\\\"https://winhalla.app/deleteAccount\\\">delete your\\r\\n        account</a> and\\r\\n        may be processed by our servers to provide the Service in its entirety</p>\\r\\n    <p>If you choose to login with Google, you accept that we will store your Email in the top of the data mentioned\\r\\n        above (excluding SteamID)</p>\\r\\n    <p>If you choose to login with another provider than Steam, you will be prompted to enter your Brawlhalla ID. By\\r\\n        submitting the Brawlhalla ID, you certify that you own the account with the Brawlhalla ID you mentioned.\\r\\n        Otherwise your account and access to the Service may be terminated</p>\\r\\n\\r\\n    <h2>II. Analytical software</h2>\\r\\n    <p>We are using - like any other website - an analytical software. This software helps us to understand our traffic\\r\\n        and its fluctuations</p>\\r\\n    <p>Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You\\r\\n        can edit your consent following <a href=\\\"/privacy#edit_consent\\\">this</a> instructions</p>\\r\\n    <p id=\\\"advertising\\\">This analytical software can deposits cookies and collect data ; this data is kept strictly\\r\\n        anonymous. However\\r\\n        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order\\r\\n        to allow us to use this data </p>\\r\\n\\r\\n    <h2>III. Advertising</h2>\\r\\n    <p>We are using ads, because a website doesn't update and hosts itself! Our ads are provided by third-party services\\r\\n        (To read our policy about thrd-party services, <a href=\\\"/terms#3rdParty\\\">click here</a>)</p>\\r\\n\\r\\n    <p>We use prupleads as our banner ad provider</p>\\r\\n    <p>You can read their privacy policy here : <a href=\\\"https://adplayer.pro/privacy\\\">https://purpleads.io/privacy/</a>\\r\\n    </p>\\r\\n\\r\\n    <p>We also use adplayer.pro as rewarded ads provider.</p>\\r\\n    <p>You can read their privacy policy here : <a href=\\\"https://adplayer.pro/privacy\\\">https://adplayer.pro/privacy</a>\\r\\n    </p>\\r\\n\\r\\n    <h2>IV. Cookies</h2>\\r\\n    <p>We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly\\r\\n        used an anonymous unique identifier. They are stored in your computer's hard drive</p>\\r\\n    <p>We use cookies for : </p>\\r\\n    <ul>\\r\\n        <li>Authenticating : required, else you cannot use most of the Site's functionalities</li>\\r\\n        <li>Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are\\r\\n            required, since they will have a major impact on your experience\\r\\n        </li>\\r\\n        <li>Analytical : as said <a href=\\\"/privacy#analytical\\\">here</a>, these cookies are not required an can be\\r\\n            disabled\\r\\n        </li>\\r\\n    </ul>\\r\\n    <p>For more general information on cookies, please read <a\\r\\n        href=\\\"https://www.privacypolicyonline.com/what-are-cookies/\\\" class=\\\"underline\\\">\\\"What Are Cookies\\\"</a>.</p>\\r\\n\\r\\n    <h2 id=\\\"edit_consent\\\">V. Edit your consent and claim your rights</h2>\\r\\n    <div class=\\\"\\\">\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\"\\r\\n                on:click={()=>actionDone(\\\"cookieConsentReset\\\")}>Edit cookie\\r\\n            consent\\r\\n        </button>\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\" on:click={()=>makePopup(\\\"delete account\\\")}>Delete Account</button>\\r\\n        <a class=\\\"btn px-2 py-2 mx-6\\\" style=\\\"text-decoration: none\\\" href=\\\"{apiUrl}/auth/downloadData\\\" download>Download\\r\\n            Data</a>\\r\\n        <button class=\\\"btn px-2 py-1 mx-6\\\" on:click={() =>makePopup('restrict processing')}>Restrict Processing</button>\\r\\n        (Restrict processing\\r\\n        will make your account unusable but we still keep your data)\\r\\n    </div>\\r\\n    <h3 class=\\\"text-2xl\\\">Other GDPR-related user rights can be claimed via email <a href=\\\"mailto:contact@winhalla.app\\\">here</a>\\r\\n    </h3>\\r\\n\\r\\n    <h2>VI. Changes to This Privacy Policy</h2>\\r\\n    <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\\r\\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\\r\\n        change in the Site. These changes are effective immediately, after they are posted on this page.</p>\\r\\n\\r\\n    <h2>VII. Contact Us</h2>\\r\\n\\r\\n    <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a\\r\\n        href=\\\"mailto:contact@winhalla.app\\\">contact@winhalla.app</a></p>\\r\\n</div>\\r\\n{#if confirmationPopupOpen}\\r\\n    <div class=\\\"fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0\\\"\\r\\n         transition:fade={{duration:200}}>\\r\\n    </div>\\r\\n    <div class=\\\"fixed flex w-screen h-screen z-50 left-0 top-0\\\"\\r\\n         transition:fade={{duration:200}}>\\r\\n        <div\\r\\n            class=\\\"justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8\\\"\\r\\n            style=\\\"margin-top:20vh\\\">\\r\\n            <h1 class=\\\"text-5xl text-primary\\\">Confirm {confirmationPopupOpen}</h1>\\r\\n            {#if confirmationPopupOpen === \\\"delete account\\\"}\\r\\n                <p class=\\\"ml-4 text-3xl mt-6\\\">Warning: this action is <u>not cancellable</u>. <br> All data will be lost\\r\\n                    <u>forever</u></p>\\r\\n            {:else if confirmationPopupOpen === \\\"restrict processing\\\"}\\r\\n                <p class=\\\"ml-4 text-3xl mt-6\\\">Warning: this action will make your account <u>unusable</u>. <br>However,\\r\\n                    we will still keep your account data and will be able to restore it if you ask us <a\\r\\n                        href=\\\"mailto:contact@winhalla.app\\\">here</a> with you account ID you can obtain by downloading\\r\\n                    you data (download it before restricting processing of your account)</p>\\r\\n            {/if}\\r\\n            <div>\\r\\n                <div class=\\\"overflow-auto max-h-screen-50\\\">\\r\\n                    <div class=\\\"justify-center w-full flex\\\">\\r\\n                        <button class=\\\"button button-brand mt-8\\\"\\r\\n                                style=\\\"background-color:#fc1870\\\"\\r\\n                                on:click={()=>confirm(confirmationPopupOpen)}>\\r\\n                            Confirm {confirmationPopupOpen}\\r\\n                        </button>\\r\\n                        <button class=\\\"button button-brand mt-8 border ml-5 border-legendary\\\"\\r\\n                                style=\\\"background-color: #17171a;padding: -1px\\\"\\r\\n                                on:click={()=>confirmationPopupOpen=undefined}>\\r\\n                            Cancel\\r\\n                        </button>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n{#if message}\\r\\n    <Infos pushError={pushError} message={message} />\\r\\n{/if}\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AAgDI,EAAE,eAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAED,EAAE,eAAC,CAAC,AACA,eAAe,CAAE,IAAI,CACrB,OAAO,IAAI,CAAC,IAAI,CAAC,AACrB,CAAC,AAED,IAAI,eAAC,CAAC,AACF,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO;IAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC,AAED,IAAI,eAAC,CAAC,AACF,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAC7B,CAAC\"}"
};

const Privacy = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	$$result.css.add(css$f);

	return `${($$result.head += `${($$result.title = `<title>Privacy policy | Winhalla</title>`, "")}`, "")}

<div class="${"h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-1fbtrh0"}" style="${"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);"}"><h1 class="${"text-5xl underline mb-4"}">Privacy Policy</h1>
    <p class="${"svelte-1fbtrh0"}">Winhalla operates the https://winhalla.app website (&quot;Site&quot;), which provides the SERVICE.</p>

    <p class="${"svelte-1fbtrh0"}">This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of
        Personal Information if anyone decided to use our Service, the Site. </p>
    <p class="${"svelte-1fbtrh0"}">We therefore only use your personal data within the scope of legal regulations, in particular the General Data
        Protection Regulation (&quot;GDPR&quot;)</p>
    <p class="${"svelte-1fbtrh0"}">If you choose to use our Service, then you agree to the collection and use of information in relation with this
        policy. The Personal Information that we collect are used for providing and improving the Service. We will not
        use or share your information with anyone except as described in this Privacy Policy.</p>

    <h2 class="${"svelte-1fbtrh0"}">I. Account data</h2>
    <p class="${"svelte-1fbtrh0"}">To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with
        your Steam Account and clicking on &quot;Accept Terms And Conditions&quot;, we automatically create an account containing
        : </p>
    <ul class="${"svelte-1fbtrh0"}"><li>Your SteamID64</li>
        <li>Your profile picture URL</li>
        <li>Your username</li>
        <li>And other data (including but not limited to : your coins number, your quest in progress...) This
            information is internal to the Site, is used only by us and in no case disclosed
        </li></ul>
    <p class="${"svelte-1fbtrh0"}">Your STEAMID64 may be sent to Brawlhalla&#39;s API (<a href="${"https://api.brawlhalla.com"}" class="${"svelte-1fbtrh0"}">https://api.brawlhalla.com</a>) to track your progress in the game and give
        you coins according to your performance</p>
    <p class="${"svelte-1fbtrh0"}">Other account data will not be sent, sold, rented, or traded to any third-party.</p>
    <p id="${"analytical"}" class="${"svelte-1fbtrh0"}">All your account data is kept until you <a href="${"https://winhalla.app/deleteAccount"}" class="${"svelte-1fbtrh0"}">delete your
        account</a> and
        may be processed by our servers to provide the Service in its entirety</p>
    <p class="${"svelte-1fbtrh0"}">If you choose to login with Google, you accept that we will store your Email in the top of the data mentioned
        above (excluding SteamID)</p>
    <p class="${"svelte-1fbtrh0"}">If you choose to login with another provider than Steam, you will be prompted to enter your Brawlhalla ID. By
        submitting the Brawlhalla ID, you certify that you own the account with the Brawlhalla ID you mentioned.
        Otherwise your account and access to the Service may be terminated</p>

    <h2 class="${"svelte-1fbtrh0"}">II. Analytical software</h2>
    <p class="${"svelte-1fbtrh0"}">We are using - like any other website - an analytical software. This software helps us to understand our traffic
        and its fluctuations</p>
    <p class="${"svelte-1fbtrh0"}">Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You
        can edit your consent following <a href="${"/privacy#edit_consent"}" class="${"svelte-1fbtrh0"}">this</a> instructions</p>
    <p id="${"advertising"}" class="${"svelte-1fbtrh0"}">This analytical software can deposits cookies and collect data ; this data is kept strictly
        anonymous. However
        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order
        to allow us to use this data </p>

    <h2 class="${"svelte-1fbtrh0"}">III. Advertising</h2>
    <p class="${"svelte-1fbtrh0"}">We are using ads, because a website doesn&#39;t update and hosts itself! Our ads are provided by third-party services
        (To read our policy about thrd-party services, <a href="${"/terms#3rdParty"}" class="${"svelte-1fbtrh0"}">click here</a>)</p>

    <p class="${"svelte-1fbtrh0"}">We use prupleads as our banner ad provider</p>
    <p class="${"svelte-1fbtrh0"}">You can read their privacy policy here : <a href="${"https://adplayer.pro/privacy"}" class="${"svelte-1fbtrh0"}">https://purpleads.io/privacy/</a></p>

    <p class="${"svelte-1fbtrh0"}">We also use adplayer.pro as rewarded ads provider.</p>
    <p class="${"svelte-1fbtrh0"}">You can read their privacy policy here : <a href="${"https://adplayer.pro/privacy"}" class="${"svelte-1fbtrh0"}">https://adplayer.pro/privacy</a></p>

    <h2 class="${"svelte-1fbtrh0"}">IV. Cookies</h2>
    <p class="${"svelte-1fbtrh0"}">We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly
        used an anonymous unique identifier. They are stored in your computer&#39;s hard drive</p>
    <p class="${"svelte-1fbtrh0"}">We use cookies for : </p>
    <ul class="${"svelte-1fbtrh0"}"><li>Authenticating : required, else you cannot use most of the Site&#39;s functionalities</li>
        <li>Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are
            required, since they will have a major impact on your experience
        </li>
        <li>Analytical : as said <a href="${"/privacy#analytical"}" class="${"svelte-1fbtrh0"}">here</a>, these cookies are not required an can be
            disabled
        </li></ul>
    <p class="${"svelte-1fbtrh0"}">For more general information on cookies, please read <a href="${"https://www.privacypolicyonline.com/what-are-cookies/"}" class="${"underline svelte-1fbtrh0"}">&quot;What Are Cookies&quot;</a>.</p>

    <h2 id="${"edit_consent"}" class="${"svelte-1fbtrh0"}">V. Edit your consent and claim your rights</h2>
    <div class="${""}"><button class="${"btn px-2 py-1 mx-6 svelte-1fbtrh0"}">Edit cookie
            consent
        </button>
        <button class="${"btn px-2 py-1 mx-6 svelte-1fbtrh0"}">Delete Account</button>
        <a class="${"btn px-2 py-2 mx-6 svelte-1fbtrh0"}" style="${"text-decoration: none"}" href="${escape(apiUrl) + "/auth/downloadData"}" download>Download
            Data</a>
        <button class="${"btn px-2 py-1 mx-6 svelte-1fbtrh0"}">Restrict Processing</button>
        (Restrict processing
        will make your account unusable but we still keep your data)
    </div>
    <h3 class="${"text-2xl"}">Other GDPR-related user rights can be claimed via email <a href="${"mailto:contact@winhalla.app"}" class="${"svelte-1fbtrh0"}">here</a></h3>

    <h2 class="${"svelte-1fbtrh0"}">VI. Changes to This Privacy Policy</h2>
    <p class="${"svelte-1fbtrh0"}">We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these
        change in the Site. These changes are effective immediately, after they are posted on this page.</p>

    <h2 class="${"svelte-1fbtrh0"}">VII. Contact Us</h2>

    <p class="${"svelte-1fbtrh0"}">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="${"mailto:contact@winhalla.app"}" class="${"svelte-1fbtrh0"}">contact@winhalla.app</a></p></div>
${ ``}
${ ``}`;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Privacy
});

function formatTime(seconds) {
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

/* src\components\profile\GlobalStats.svelte generated by Svelte v3.31.0 */

const GlobalStats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	data.losses = data.games - data.wins;
	data.winRate = data.wins / data.games * 100;
	data.lossRate = 100 - data.winRate;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);

	return `<div class="${"relative bg-variant md:max-w-max rounded-xl   p-8  mt-12 md:mt-0 md:ml-18 xl:ml-10   h-auto w-full md:w-auto"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">GLOBAL</p>
    <div class="${"flex"}"><div class="${"w-full"}"><div class="${"md:ml-2"}"><h3 class="${"font-bold text-xl"}" style="${"font-family: 'Roboto Condensed', sans-serif"}">Total games
                    played:</h3>
                <p class="${"text-primary text-3xl"}">${escape(data.games)}</p>

                
                <div><div class="${"flex w-full  mt-4"}"><div class="${"rounded-l h-1 bg-green"}" style="${"width: " + escape(data.winRate) + "%"}"></div>
                        <div class="${"rounded-r h-1 bg-legendary"}" style="${"width: " + escape(data.lossRate) + "%"}"></div></div>
                    <div class="${"flex justify-between text-xl mt-1"}"><p class="${"text-green"}">${escape(data.wins)} <b class="${"font-normal ml-1"}">(${escape(parseInt(data.winRate))}%)</b></p>
                        <p class="${"text-legendary"}">${escape(data.losses)}</p></div></div></div>
            
            <div class="${"md:ml-2"}"><p class="${"mt-9  text-xl "}">KOs: <b class="${"font-normal text-epic text-2xl"}">${escape(data.kos)}</b>
                </p><div class="${"mt-1  p-4 pl-6 bg-background rounded-xl  md:flex"}"><div class="${"text-lg"}"><p class="${"text-mid-light mt-"}">Unarmed: <b class="${"font-normal text-primary text-xl"}">${escape(data.kosunarmed)}</b></p>
                        <p class="${"text-mid-light mt-"}">Bomb: <b class="${"font-normal text-primary text-xl"}">${escape(data.kobomb)}</b></p>
                        <p class="${"text-mid-light mt-"}">Mine: <b class="${"font-normal text-primary text-xl"}">${escape(data.komine)}</b></p></div>
                    <div class="${"mt-4 md:mt-0 md:ml-8 text-lg"}"><p class="${"text-lg text-mid-light "}">Weapon throw: <b class="${"font-normal text-primary text-xl"}">TBA</b></p>
                        <p class="${"text-lg text-mid-light "}">Spikeball: <b class="${"font-normal text-primary text-xl"}">27</b></p></div></div></div>
            <div class="${"md:ml-2"}"><p class="${" mt-7  text-xl "}">Damage: <b class="${"font-normal text-epic text-2xl"}">${escape(data.damagedealt)}</b>
                </p><div class="${" mt-1  p-4 pl-6 bg-background rounded-xl  md:flex"}"><div class="${"text-lg"}"><p class="${"text-mid-light "}">Unarmed: <b class="${"font-normal text-primary text-xl"}">${escape(data.damageunarmed)}</b></p>
                        <p class="${"text-mid-light "}">Bomb: <b class="${"font-normal text-primary text-xl"}">${escape(data.damagebomb)}</b></p>
                        <p class="${"text-mid-light "}">Mine: <b class="${"font-normal text-primary text-xl"}">${escape(data.damagemine)}</b></p></div>

                    <div class="${"mt-4 md:mt-0 md:ml-8 text-lg"}"><p class="${"text-mid-light"}">Weapon throw: <b class="${"font-normal text-primary text-xl"}">TBA</b></p>
                        <p class="${"text-mid-light"}">Spikeball: <b class="${"font-normal text-primary text-xl"}">${escape(data.damagespikeball)}</b></p></div></div></div></div></div></div>`;
});

/* src\components\profile\RankedStats.svelte generated by Svelte v3.31.0 */

const RankedStats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	data.losses = data.games - data.wins;
	data.winRate = data.wins / data.games * 100;
	data.lossRate = 100 - data.winRate;

	function determineTeammateName(teamname) {
		const regex = /(.+)\+(.+)/g;
		const currentName = regex.exec(teamname);
		if (currentName[2] === data.name) return currentName[1];
		return currentName[2];
	}

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);

	return `<div class="${"md:flex items-start  /xl:mr-24"}"><div class="${"relative bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">RANKED</p>
        <div class="${"flex"}"><div><img class="${"w-26 md:w-32"}" src="${"/assets/RankedBanners/" + escape(data.tier.replace(" ", "_")) + ".png"}" alt="${""}"></div>
            <div class="${"ml-6"}"><div class="${"ml-2"}"><h3 class="${"font-bold  text-lg md:text-xl"}" style="${"font-family: 'Roboto Condensed', sans-serif"}">Ranking
                        Solo:</h3>
                    <p class="${"text-primary   text-2xl md:text-3xl"}">${escape(data.tier)}</p></div>
                <div class="${"hidden lg:block  ml-2 mt-5  p-4 pl-6 bg-background rounded-xl"}"><p class="${"text-lg text-mid-light  "}">Current elo: <b class="${"font-normal text-primary text-xl"}">${escape(data.rating)}</b></p>
                    <p class="${"text-lg text-mid-light"}">Best elo: <b class="${"font-normal text-epic text-xl"}">${escape(data.peak_rating)}</b></p></div></div></div>

        
        <div class="${"lg:hidden  mt-5  p-4 pl-6 bg-background rounded-xl"}"><p class="${"text-lg text-mid-light  "}">Current elo: <b class="${"font-normal text-primary text-xl"}">${escape(data.rating)}</b></p>
            <p class="${"text-lg text-mid-light"}">Best elo: <b class="${"font-normal text-epic text-xl"}">${escape(data.peak_rating)}</b></p></div>


        <div class="${"mt-8"}"><h3 class="${"font-bold text-lg"}" style="${"font-family: 'Roboto Condensed', sans-serif"}">Games played: <b class="${"text-primary text-xl"}">${escape(data.games)}</b></h3>

            
            <div class="${"md:mr-18"}"><div class="${"flex w-full  mt-4 "}"><div class="${"rounded-l h-1 bg-green"}" style="${"width: " + escape(data.winRate) + "%"}"></div>
                    <div class="${"rounded-r h-1 bg-legendary"}" style="${"width: " + escape(data.lossRate) + "%"}"></div></div>
                <div class="${"flex justify-between text-lg mt-1"}"><p class="${"text-green"}">${escape(data.wins)} <b class="${"font-normal ml-1"}">(${escape(parseInt(data.winRate))}%)</b></p>
                    <p class="${"text-legendary"}">${escape(data.losses)}</p></div></div></div>


        <div class="${"mt-12"}"><h3>Best Teams:</h3>

            <div class="${"-mt-2"}">${each(data["2v2"].sort((a, b) => b.rating - a.rating).slice(0, 3), duo => `<div class="${"team-container  lg:flex justify-between  my-6"}"><div class="${"flex"}"><img class="${"w-14"}" src="${"/assets/RankedBanners/" + escape(duo.tier.replace(" ", "_")) + ".png"}" alt="${""}">
                            <div><div class="${"ml-4 pr-6  flex  lg:block"}"><p class="${"text-primary text-2xl"}">${escape(duo.tier)}</p>
                                    <p class="${"ml-4   lg:ml-0   text-mid-light text-xl"}">${escape(duo.rating)} Elo</p></div>
                                <p class="${"lg:hidden ml-4 mt-1  text-base text-mid-light"}">With: <b class="${"font-normal text-font  text-lg lg:text-xl"}">${escape(determineTeammateName(duo.teamname))}</b></p>
                            </div></div>
                        <div><p class="${"hidden lg:block  text-lg text-mid-light"}">With: <a href="${"/profile/" + escape(determineTeammateName(duo.teamname))}"><b class="${"font-normal text-font text-xl"}">${escape(determineTeammateName(duo.teamname))}</b></a>
                            </p></div>
                    </div>`)}</div></div></div></div>`;
});

const filterList = {

    time_played: {
        filterFunction: function (a, b) {
            return b.matchtime - a.matchtime
        },
        display: function (object) {
            return formatTime(object.matchtime);
        },
    },

    level: {
        filterFunction: function (a, b) {
            return b.level - a.level
        },
        display: function (object) {
            return object.level;
        },
        onlyLegends: true
    },

    games_played: {
        filterFunction: function (a, b) {
            return b.games - a.games
        },
        display: function (object) {
            return object.games;
        }
    },

    win_rate: {
        filterFunction: function (a, b) {
            return (b.wins / b.games) - (a.wins / a.games)
        },
        display: function (object) {
            return parseInt(object.wins / object.games * 100).toString() + "%";
        },
        onlyLegends: true
    },

    kos: {
        filterFunction: function (a, b) {
            return b.kos - a.kos
        },
        display: function (object) {
            return object.kos;
        }
    },

    damage_dealt: {
        filterFunction: function (a, b) {
            return b.damagedealt - a.damagedealt
        },
        display: function (object) {
            return object.damagedealt;
        }
    },

};

/* src\components\profile\LegendStats.svelte generated by Svelte v3.31.0 */

const css$g = {
	code: "@media(min-width: 480px){.container.svelte-n4ksn1{min-width:21rem}}",
	map: "{\"version\":3,\"file\":\"LegendStats.svelte\",\"sources\":[\"LegendStats.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import formatTime from \\\"../../utils/formatTime\\\";\\r\\n    import filterList from \\\"../../utils/filterList\\\";\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n    let isDropdownOpen\\r\\n    export let data;\\r\\n    let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);\\r\\n\\r\\n    //select first legend by default\\r\\n    let selectedLegend = sortedData[0];\\r\\n\\r\\n    //Handle which legend tile is open\\r\\n    let openedList = {};\\r\\n\\r\\n    function handleOpenLegendTile(legend_name) {\\r\\n        openedList[legend_name] = !openedList.hasOwnProperty(legend_name) || openedList[legend_name] === false;\\r\\n    }\\r\\n\\r\\n\\r\\n    let chosenFilter = \\\"time_played\\\";\\r\\n    $: if (chosenFilter) {\\r\\n        openedList = {};\\r\\n    }\\r\\n\\r\\n    let displayNumber = 2;\\r\\n    function changeLegend(i) {\\r\\n        selectedLegend = sortedData[i];\\r\\n        isDropdownOpen = false;\\r\\n    }\\r\\n    function handleDropDown(delay){\\r\\n        if(delay){\\r\\n            setTimeout(() =>{\\r\\n                isDropdownOpen = false\\r\\n            },1)\\r\\n        }else {\\r\\n            isDropdownOpen = !isDropdownOpen\\r\\n        }\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    @media (min-width: 480px) {\\r\\n        .container {\\r\\n            min-width: 21rem;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\\r\\n<div class=\\\"container   relative bg-variant min-w-md rounded-xl  p-8    h-auto\\\">\\r\\n    <p class=\\\"absolute -top-3 text-xl text-mid-light\\\">LEGENDS</p>\\r\\n\\r\\n    <div class=\\\"md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl\\\">\\r\\n        <div class=\\\"flex items-center\\\">\\r\\n            <img class=\\\"w-12 mr-3\\\" src=\\\"/assets/LegendIcons/{selectedLegend.legend_name_key.replace(' ', '_')}.png\\\"\\r\\n                 alt=\\\"\\\">\\r\\n            <div class=\\\"w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none\\\"\\r\\n                 on:click={() =>handleDropDown(false)}>\\r\\n                {selectedLegend.legend_name_key}\\r\\n                <svg\\r\\n                    class=\\\"w-4 h-4 mt-2 fill-current\\\"\\r\\n                    viewBox=\\\"0 0 24 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n            {#if isDropdownOpen}\\r\\n                <ul class=\\\"absolute bg-background top-30 right-14 px-3 rounded-xl z-10 overflow-y-auto\\\" style=\\\"max-height: 45vh\\\"\\r\\n                    use:clickOutside on:click_outside={()=>handleDropDown(true)}>\\r\\n                    {#each sortedData as legend,i}\\r\\n                        <li on:click={() => changeLegend(i)} class=\\\"flex my-2 px-6 hover:bg-light cursor-pointer \\\">\\r\\n                            <img class=\\\"w-10 mr-4\\\" src=\\\"/assets/LegendIcons/{legend.legend_name_key.replace(' ', '_')}.png\\\" alt=\\\"\\\">\\r\\n                            {legend.legend_name_key}\\r\\n                        </li>\\r\\n                    {/each}\\r\\n                </ul>\\r\\n            {/if}\\r\\n\\r\\n\\r\\n        </div>\\r\\n        <div class=\\\"mt-6 ml-2  text-lg md:text-xl  \\\">\\r\\n            <p class=\\\"text-mid-light \\\">Time played: <b\\r\\n                class=\\\"  font-normal text-primary  text-xl md:text-2xl\\\">{formatTime(selectedLegend.matchtime)}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-\\\">Level: <b\\r\\n                class=\\\"  font-normal text-primary  text-xl md:text-2xl\\\">{selectedLegend.level}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-3\\\">Games played: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedLegend.games}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-\\\">Win rate: <b class=\\\"font-normal text-primary text-xl md:text-2xl\\\">\\r\\n                {parseInt(selectedLegend.wins / selectedLegend.games * 100)}%</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-3\\\">KOs: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedLegend.kos}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-\\\">Damage dealt: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedLegend.damagedealt}</b>\\r\\n            </p>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n\\r\\n    <div class=\\\"mt-14 md:ml-2 w-full\\\">\\r\\n\\r\\n        <div class=\\\"flex text-xl  -mt-2  pb-2\\\">\\r\\n            <div class=\\\"flex items-center  text-lg\\\">\\r\\n                <select class=\\\"bg-background p-3  rounded-lg     focus:outline-none\\\" name=\\\"Choose a filter\\\"\\r\\n                        bind:value={chosenFilter}>\\r\\n                    {#each Object.keys(filterList) as filter}\\r\\n                        <option class=\\\"\\\" value=\\\"{filter}\\\">{filter.replace('_', ' ')}</option>\\r\\n                    {/each}\\r\\n                </select>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\\"flex items-center ml-5 text-lg\\\">\\r\\n                <p class=\\\"mr-2\\\">Display:</p>\\r\\n                <input class=\\\"w-12  bg-background p-3 pr-0 rounded-lg\\\" type=\\\"number\\\" min=\\\"1\\\" step=\\\"1\\\"\\r\\n                       bind:value={displayNumber}>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        {#each data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber) as legend}\\r\\n            <div class=\\\"w-full  mt-3  p-4 pl-6 bg-background rounded-xl\\\">\\r\\n                <button class=\\\"w-full flex items-center  relative\\\"\\r\\n                        on:click={handleOpenLegendTile(legend.legend_name_key)}>\\r\\n                    <div>\\r\\n                        <img class=\\\"-ml-1 md:ml-0 w-10\\\"\\r\\n                             src=\\\"/assets/LegendIcons/{legend.legend_name_key.replace(' ', '_')}.png\\\" alt=\\\"\\\">\\r\\n                    </div>\\r\\n\\r\\n                    <div class=\\\"mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default\\\">\\r\\n                        <p class=\\\"ml-2 md:ml-3\\\">{legend.legend_name_key}</p>\\r\\n                        <p class=\\\"text-green\\\">\\r\\n                            {filterList[chosenFilter].display(legend)}\\r\\n                        </p>\\r\\n                    </div>\\r\\n\\r\\n                    <div class:-top-1={openedList[legend.legend_name_key] === true}\\r\\n                         class:right-1={openedList[legend.legend_name_key] === true}\\r\\n                         class=\\\"/-mt-2  text-2xl md:text-3xl  text-light absolute right-0\\\"\\r\\n                         style=\\\"font-family: sans-serif\\\">\\r\\n                        {openedList[legend.legend_name_key] === true ? \\\"-\\\" : \\\"+\\\"}\\r\\n                    </div>\\r\\n                </button>\\r\\n\\r\\n                {#if openedList[legend.legend_name_key] === true}\\r\\n                    <div class=\\\"mt-4\\\">\\r\\n                        {#each Object.entries(filterList) as [key, value]}\\r\\n                            {#if key !== chosenFilter}\\r\\n                                <p class=\\\"text-lg  text-mid-light \\\">{key.replace('_', ' ')}: <b\\r\\n                                    class=\\\"font-normal text-primary text-xl\\\">{value.display(legend)}</b>\\r\\n                                </p>\\r\\n                            {/if}\\r\\n                        {/each}\\r\\n\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        {/each}\\r\\n        <div class=\\\"flex lg:hidden\\\">\\r\\n            <button class=\\\"mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light\\\" on:click={()=>displayNumber+=2}>\\r\\n                Load more\\r\\n            </button>\\r\\n        </div>\\r\\n        <!--\\r\\n                <div class=\\\"w-full  mt-3  p-4 pl-6 bg-background rounded-xl\\\">\\r\\n                    <button class=\\\"w-full flex items-center\\\">\\r\\n\\r\\n                        <div>\\r\\n                            <img class=\\\"w-10\\\" src=\\\"/assets/LegendIcons/nix.png\\\" alt=\\\"\\\">\\r\\n                        </div>\\r\\n                        <div class=\\\"flex justify-between w-full\\\">\\r\\n                            <p class=\\\"ml-3\\\">NIX</p>\\r\\n                            <p class=\\\"text-green\\\">\\r\\n                                52%\\r\\n                            </p>\\r\\n                        </div>\\r\\n\\r\\n                        <div class=\\\"ml-3 /-mt-2 text-3xl text-light\\\" style=\\\"font-family: sans-serif\\\">\\r\\n                            +\\r\\n                        </div>\\r\\n                    </button>\\r\\n\\r\\n                    &lt;!&ndash;<div class=\\\"mt-4\\\">\\r\\n                        <p class=\\\"text-lg text-mid-light mt-\\\">Time played: <b class=\\\"font-normal text-primary text-xl\\\">28h\\r\\n                            24m 31s</b>\\r\\n                        </p>\\r\\n                        <p class=\\\"text-lg text-mid-light mt-\\\">Games played: <b\\r\\n                                class=\\\"font-normal text-primary text-xl\\\">54</b>\\r\\n                        </p>\\r\\n                        <p class=\\\"text-lg text-mid-light mt-\\\">KOs: <b class=\\\"font-normal text-primary text-xl\\\">68</b>\\r\\n                        </p>\\r\\n                        <p class=\\\"text-lg text-mid-light mt-\\\">Damage dealt: <b class=\\\"font-normal text-primary text-xl\\\">16845</b>\\r\\n                        </p>\\r\\n                    </div>&ndash;&gt;\\r\\n                </div>\\r\\n        -->\\r\\n\\r\\n    </div>\\r\\n\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAyCI,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACvB,UAAU,cAAC,CAAC,AACR,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const LegendStats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);

	//select first legend by default
	let selectedLegend = sortedData[0];

	//Handle which legend tile is open
	let openedList = {};

	let chosenFilter = "time_played";
	let displayNumber = 2;

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$g);

	 {
		{
			openedList = {};
		}
	}

	return `<div class="${"container   relative bg-variant min-w-md rounded-xl  p-8    h-auto svelte-n4ksn1"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">LEGENDS</p>

    <div class="${"md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl"}"><div class="${"flex items-center"}"><img class="${"w-12 mr-3"}" src="${"/assets/LegendIcons/" + escape(selectedLegend.legend_name_key.replace(" ", "_")) + ".png"}" alt="${""}">
            <div class="${"w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none"}">${escape(selectedLegend.legend_name_key)}
                <svg class="${"w-4 h-4 mt-2 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div>
            ${ ``}</div>
        <div class="${"mt-6 ml-2  text-lg md:text-xl  "}"><p class="${"text-mid-light "}">Time played: <b class="${"  font-normal text-primary  text-xl md:text-2xl"}">${escape(formatTime(selectedLegend.matchtime))}</b></p>
            <p class="${"text-mid-light mt-"}">Level: <b class="${"  font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedLegend.level)}</b></p>
            <p class="${"text-mid-light mt-3"}">Games played: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedLegend.games)}</b></p>
            <p class="${"text-mid-light mt-"}">Win rate: <b class="${"font-normal text-primary text-xl md:text-2xl"}">${escape(parseInt(selectedLegend.wins / selectedLegend.games * 100))}%</b></p>
            <p class="${"text-mid-light mt-3"}">KOs: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedLegend.kos)}</b></p>
            <p class="${"text-mid-light mt-"}">Damage dealt: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedLegend.damagedealt)}</b></p></div></div>


    <div class="${"mt-14 md:ml-2 w-full"}"><div class="${"flex text-xl  -mt-2  pb-2"}"><div class="${"flex items-center  text-lg"}"><select class="${"bg-background p-3  rounded-lg     focus:outline-none"}" name="${"Choose a filter"}"${add_attribute("value", chosenFilter, 1)}>${each(Object.keys(filterList), filter => `<option class="${""}"${add_attribute("value", filter, 0)}>${escape(filter.replace("_", " "))}</option>`)}</select></div>

            <div class="${"flex items-center ml-5 text-lg"}"><p class="${"mr-2"}">Display:</p>
                <input class="${"w-12  bg-background p-3 pr-0 rounded-lg"}" type="${"number"}" min="${"1"}" step="${"1"}"${add_attribute("value", displayNumber, 1)}></div></div>

        ${each(data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber), legend => `<div class="${"w-full  mt-3  p-4 pl-6 bg-background rounded-xl"}"><button class="${"w-full flex items-center  relative"}"><div><img class="${"-ml-1 md:ml-0 w-10"}" src="${"/assets/LegendIcons/" + escape(legend.legend_name_key.replace(" ", "_")) + ".png"}" alt="${""}"></div>

                    <div class="${"mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default"}"><p class="${"ml-2 md:ml-3"}">${escape(legend.legend_name_key)}</p>
                        <p class="${"text-green"}">${escape(filterList[chosenFilter].display(legend))}
                        </p></div>

                    <div class="${[
		"/-mt-2  text-2xl md:text-3xl  text-light absolute right-0",
		(openedList[legend.legend_name_key] === true
		? "-top-1"
		: "") + " " + (openedList[legend.legend_name_key] === true
		? "right-1"
		: "")
	].join(" ").trim()}" style="${"font-family: sans-serif"}">${escape(openedList[legend.legend_name_key] === true ? "-" : "+")}
                    </div></button>

                ${openedList[legend.legend_name_key] === true
	? `<div class="${"mt-4"}">${each(Object.entries(filterList), ([key, value]) => `${key !== chosenFilter
		? `<p class="${"text-lg  text-mid-light "}">${escape(key.replace("_", " "))}: <b class="${"font-normal text-primary text-xl"}">${escape(value.display(legend))}</b>
                                </p>`
		: ``}`)}

                    </div>`
	: ``}
            </div>`)}
        <div class="${"flex lg:hidden"}"><button class="${"mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light"}">Load more
            </button></div>
        </div></div>`;
});

/* src\components\profile\WeaponStats.svelte generated by Svelte v3.31.0 */

const css$h = {
	code: "@media(min-width: 480px){.container.svelte-1rjzekd{min-width:21rem}}",
	map: "{\"version\":3,\"file\":\"WeaponStats.svelte\",\"sources\":[\"WeaponStats.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import formatTime from \\\"../../utils/formatTime\\\";\\r\\n    import filterList from \\\"../../utils/filterList\\\";\\r\\n    import { clickOutside } from \\\"../../utils/clickOutside\\\";\\r\\n\\r\\n    export let data;\\r\\n    let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);\\r\\n    let isDropdownOpen;\\r\\n    //select first legend by default\\r\\n    let selectedWeapon = sortedData[0];\\r\\n\\r\\n    //Handle which legend tile is open\\r\\n    let openedList = {};\\r\\n\\r\\n    function handleOpenWeaponTile(weapon_name) {\\r\\n        openedList[weapon_name] = !openedList.hasOwnProperty(weapon_name) || openedList[weapon_name] === false;\\r\\n    }\\r\\n\\r\\n\\r\\n    let chosenFilter = \\\"time_played\\\";\\r\\n    $: if (chosenFilter) {\\r\\n        openedList = {};\\r\\n    }\\r\\n\\r\\n    let displayNumber = 3;\\r\\n\\r\\n    function changeWeapon(i) {\\r\\n        selectedWeapon = sortedData[i];\\r\\n        isDropdownOpen = false;\\r\\n    }\\r\\n    function handleDropDown(delay){\\r\\n        if(delay){\\r\\n            setTimeout(() =>{\\r\\n                isDropdownOpen = false\\r\\n            },1)\\r\\n        }else {\\r\\n            isDropdownOpen = !isDropdownOpen\\r\\n        }\\r\\n    }\\r\\n</script>\\r\\n\\r\\n\\r\\n<style>\\r\\n\\r\\n\\r\\n    @media (min-width: 480px) {\\r\\n        .container {\\r\\n            min-width: 21rem;\\r\\n        }\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"container relative bg-variant rounded-xl p-8 mt-12 md:mt-0 md:ml-12 lg:ml-18 xl:ml-10 h-auto\\\">\\r\\n    <p class=\\\"absolute -top-3 text-xl text-mid-light\\\">WEAPONS</p>\\r\\n\\r\\n    <div class=\\\"md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl\\\">\\r\\n        <div class=\\\"flex items-center\\\">\\r\\n            <img class=\\\"w-10 mr-4\\\" src=\\\"/assets/WeaponIcons/{selectedWeapon.name.replace(' ', '_').toLowerCase()}.png\\\" alt=\\\"\\\">\\r\\n            <div class=\\\"w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none\\\"\\r\\n                 on:click={() =>handleDropDown(false)}>\\r\\n                {selectedWeapon.name}\\r\\n                <svg\\r\\n                    class=\\\"w-4 h-4 mt-2 fill-current\\\"\\r\\n                    viewBox=\\\"0 0 24 24\\\"\\r\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                    <path\\r\\n                        d=\\\"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z\\\" />\\r\\n                </svg>\\r\\n            </div>\\r\\n            {#if isDropdownOpen}\\r\\n                <ul class=\\\"absolute bg-background top-30 right-14 px-3 rounded-xl z-10 overflow-y-auto\\\" style=\\\"max-height: 45vh\\\"\\r\\n                    use:clickOutside on:click_outside={()=>handleDropDown(true)}>\\r\\n                    {#each sortedData as weapon,i}\\r\\n                        <li on:click={() => changeWeapon(i)} class=\\\"flex my-2 px-6 hover:bg-light cursor-pointer \\\">\\r\\n                            <img class=\\\"w-10 mr-4\\\" src=\\\"/assets/WeaponIcons/{weapon.name.replace(' ', '_').toLowerCase()}.png\\\" alt=\\\"\\\">\\r\\n                            {weapon.name}\\r\\n                        </li>\\r\\n                    {/each}\\r\\n                </ul>\\r\\n            {/if}\\r\\n\\r\\n\\r\\n        </div>\\r\\n        <div class=\\\"mt-6 ml-2  text-lg md:text-xl  \\\">\\r\\n            <p class=\\\"text-mid-light mt-\\\">Time held: <b\\r\\n                class=\\\"  font-normal text-primary  text-xl md:text-2xl\\\">{formatTime(selectedWeapon.matchtime)}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-\\\">Games played: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedWeapon.games}</b>\\r\\n            </p>\\r\\n\\r\\n            <p class=\\\"text-mid-light mt-3\\\">KOs: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedWeapon.kos}</b>\\r\\n            </p>\\r\\n            <p class=\\\"text-mid-light mt-\\\">Damage dealt: <b\\r\\n                class=\\\"font-normal text-primary  text-xl md:text-2xl\\\">{selectedWeapon.damagedealt}</b>\\r\\n            </p>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n\\r\\n    <div class=\\\"mt-14  md:ml-2 w-full\\\">\\r\\n        <div class=\\\"flex text-xl  -mt-2 pb-2\\\">\\r\\n            <div class=\\\"flex items-center  text-lg\\\">\\r\\n                <select class=\\\"bg-background p-3  rounded-lg     focus:outline-none\\\" name=\\\"Choose a filter\\\"\\r\\n                        bind:value={chosenFilter}>\\r\\n                    {#each Object.keys(filterList) as filter}\\r\\n                        {#if !filterList[filter].onlyLegends}\\r\\n                            <option class=\\\"\\\" value=\\\"{filter}\\\">{filter.replace('_', ' ')}</option>\\r\\n                        {/if}\\r\\n                    {/each}\\r\\n                </select>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\\"flex items-center ml-5  text-lg\\\">\\r\\n                <p class=\\\"mr-2\\\">Display:</p>\\r\\n                <input class=\\\"w-12  bg-background p-3 pr-0 rounded-lg\\\" type=\\\"number\\\" min=\\\"1\\\" step=\\\"1\\\"\\r\\n                       bind:value={displayNumber}>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        {#each data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber) as weapon}\\r\\n            <div class=\\\"w-full  mt-3  p-4 pl-6 bg-background rounded-xl\\\">\\r\\n                <button class=\\\"w-full flex items-center  relative\\\"\\r\\n                        on:click={handleOpenWeaponTile(weapon.name)}>\\r\\n                    <div>\\r\\n                        <img class=\\\"-ml-1 md:ml-0 w-8\\\" src=\\\"/assets/WeaponIcons/{weapon.name.replace('_', ' ').toLowerCase()}.png\\\"\\r\\n                             alt=\\\"\\\">\\r\\n                    </div>\\r\\n\\r\\n                    <div class=\\\"mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default\\\">\\r\\n                        <p class=\\\"ml-2 md:ml-3\\\">{weapon.name}</p>\\r\\n                        <p class=\\\"text-green\\\">\\r\\n                            {filterList[chosenFilter].display(weapon)}\\r\\n                        </p>\\r\\n                    </div>\\r\\n\\r\\n                    <div class:-top-1={openedList[weapon.name] === true}\\r\\n                         class:right-1={openedList[weapon.name] === true}\\r\\n                         class=\\\"/-mt-2  text-2xl md:text-3xl  text-light absolute right-0\\\"\\r\\n                         style=\\\"font-family: sans-serif\\\">\\r\\n                        {openedList[weapon.name] === true ? \\\"-\\\" : \\\"+\\\"}\\r\\n                    </div>\\r\\n                </button>\\r\\n\\r\\n                {#if openedList[weapon.name] === true}\\r\\n                    <div class=\\\"mt-4\\\">\\r\\n                        {#each Object.entries(filterList) as [key, value]}\\r\\n                            {#if key !== chosenFilter && !filterList[key].onlyLegends}\\r\\n                                <p class=\\\"text-lg text-mid-light \\\">{key.replace('_', ' ')}: <b\\r\\n                                    class=\\\"font-normal text-primary text-xl\\\">{value.display(weapon)}</b>\\r\\n                                </p>\\r\\n                            {/if}\\r\\n                        {/each}\\r\\n\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        {/each}\\r\\n\\r\\n        <div class=\\\"flex lg:hidden\\\">\\r\\n            <button class=\\\"mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light\\\" on:click={()=>displayNumber+=2}>\\r\\n                Load more\\r\\n            </button>\\r\\n        </div>\\r\\n\\r\\n\\r\\n    </div>\\r\\n\\r\\n</div>\"],\"names\":[],\"mappings\":\"AA6CI,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACvB,UAAU,eAAC,CAAC,AACR,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC\"}"
};

const WeaponStats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	let sortedData = data.sort((a, b) => b.matchtime - a.matchtime);

	//select first legend by default
	let selectedWeapon = sortedData[0];

	//Handle which legend tile is open
	let openedList = {};

	let chosenFilter = "time_played";
	let displayNumber = 3;

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$h);

	 {
		{
			openedList = {};
		}
	}

	return `<div class="${"container relative bg-variant rounded-xl p-8 mt-12 md:mt-0 md:ml-12 lg:ml-18 xl:ml-10 h-auto svelte-1rjzekd"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">WEAPONS</p>

    <div class="${"md:ml-2 mt-1  bg-background p-6 pt-4  rounded-xl"}"><div class="${"flex items-center"}"><img class="${"w-10 mr-4"}" src="${"/assets/WeaponIcons/" + escape(selectedWeapon.name.replace(" ", "_").toLowerCase()) + ".png"}" alt="${""}">
            <div class="${"w-full bg-background p-3 pl-4  rounded-xl flex justify-between border-4 border-variant     focus:outline-none"}">${escape(selectedWeapon.name)}
                <svg class="${"w-4 h-4 mt-2 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg></div>
            ${ ``}</div>
        <div class="${"mt-6 ml-2  text-lg md:text-xl  "}"><p class="${"text-mid-light mt-"}">Time held: <b class="${"  font-normal text-primary  text-xl md:text-2xl"}">${escape(formatTime(selectedWeapon.matchtime))}</b></p>
            <p class="${"text-mid-light mt-"}">Games played: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedWeapon.games)}</b></p>

            <p class="${"text-mid-light mt-3"}">KOs: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedWeapon.kos)}</b></p>
            <p class="${"text-mid-light mt-"}">Damage dealt: <b class="${"font-normal text-primary  text-xl md:text-2xl"}">${escape(selectedWeapon.damagedealt)}</b></p></div></div>


    <div class="${"mt-14  md:ml-2 w-full"}"><div class="${"flex text-xl  -mt-2 pb-2"}"><div class="${"flex items-center  text-lg"}"><select class="${"bg-background p-3  rounded-lg     focus:outline-none"}" name="${"Choose a filter"}"${add_attribute("value", chosenFilter, 1)}>${each(Object.keys(filterList), filter => `${!filterList[filter].onlyLegends
	? `<option class="${""}"${add_attribute("value", filter, 0)}>${escape(filter.replace("_", " "))}</option>`
	: ``}`)}</select></div>

            <div class="${"flex items-center ml-5  text-lg"}"><p class="${"mr-2"}">Display:</p>
                <input class="${"w-12  bg-background p-3 pr-0 rounded-lg"}" type="${"number"}" min="${"1"}" step="${"1"}"${add_attribute("value", displayNumber, 1)}></div></div>

        ${each(data.sort(filterList[chosenFilter].filterFunction).slice(0, displayNumber), weapon => `<div class="${"w-full  mt-3  p-4 pl-6 bg-background rounded-xl"}"><button class="${"w-full flex items-center  relative"}"><div><img class="${"-ml-1 md:ml-0 w-8"}" src="${"/assets/WeaponIcons/" + escape(weapon.name.replace("_", " ").toLowerCase()) + ".png"}" alt="${""}"></div>

                    <div class="${"mr-6 md:mr-8  flex justify-between w-full  text-lg md:text-default"}"><p class="${"ml-2 md:ml-3"}">${escape(weapon.name)}</p>
                        <p class="${"text-green"}">${escape(filterList[chosenFilter].display(weapon))}
                        </p></div>

                    <div class="${[
		"/-mt-2  text-2xl md:text-3xl  text-light absolute right-0",
		(openedList[weapon.name] === true ? "-top-1" : "") + " " + (openedList[weapon.name] === true ? "right-1" : "")
	].join(" ").trim()}" style="${"font-family: sans-serif"}">${escape(openedList[weapon.name] === true ? "-" : "+")}
                    </div></button>

                ${openedList[weapon.name] === true
	? `<div class="${"mt-4"}">${each(Object.entries(filterList), ([key, value]) => `${key !== chosenFilter && !filterList[key].onlyLegends
		? `<p class="${"text-lg text-mid-light "}">${escape(key.replace("_", " "))}: <b class="${"font-normal text-primary text-xl"}">${escape(value.display(weapon))}</b>
                                </p>`
		: ``}`)}

                    </div>`
	: ``}
            </div>`)}

        <div class="${"flex lg:hidden"}"><button class="${"mx-auto lg:mb-0 lg:mt-0 -mb-4 mt-3 text-xl text-light"}">Load more
            </button></div></div></div>`;
});

/* src\components\profile\CoinStats.svelte generated by Svelte v3.31.0 */

const CoinStats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { user } = $$props;
	let { data } = $$props;
	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);

	return `<div class="${"relative bg-variant  rounded-2xl   p-8  mt-12 xl:ml-5   h-auto w-full md:w-auto"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">COINS</p>

    <div class="${"md:ml-2"}"><div class="${"xl:flex  justify-between items-center   w-full"}"><div class="${""}"><h3 class="${"font-bold text-default"}" style="${"font-family: 'Roboto Condensed', sans-serif"}">Total coins
                    earned:</h3>
                <p class="${"text-primary text-3xl"}">${escape(Math.round((data.beta + data.link + data.solo + data.dailyQuests + data.weeklyQuests) * 10) / 10)}</p></div>
            ${data.beta
	? `<div class="${"mt-6 xl:mt-0"}"><h3 class="${"font-bold text-xl"}" style="${"font-family: 'Roboto Condensed', sans-serif"}">Coins from beta:</h3>
                    <p class="${"text-accent text-2xl"}">${escape(Math.floor(data.beta * 10) / 10)}</p></div>`
	: ``}</div>

        ${data
	? `<div class="${"xl:flex  " + escape(data.beta ? "mt-10" : "mt-6")}"><div class="${""}"><div class="${"flex items-center  xl:block"}"><h3 class="${"text-xl"}">SOLO coins:</h3>
                        <p class="${"text-xl   text-epic   ml-2 xl:ml-0"}"><strong class="${"font-normal  text-2xl"}" style="${"margin-right: 0.15rem"}">${escape(Math.round(data.solo * 10) / 10)}</strong>
                            (${escape(Math.round(data.solo / user.coins * 1000) / 10 || 0)} %)</p></div>


                    <div class="${"mt-2  p-4 pl-6 bg-background rounded-xl  text-lg"}"><p class="${"text-mid-light mt-"}">Games played: <b class="${"font-normal text-primary text-xl"}">${escape(user.stats.solo.gamesPlayed)}</b></p>
                        <p class="${"text-mid-light mt-"}">Games won: <b class="${"font-normal text-primary text-xl"}">${escape(user.stats.solo.wins)}</b></p></div></div>


                <div class="${"mt-8 xl:mt-0  xl:ml-12 2xl:ml-17"}"><div class="${"flex items-center  xl:block"}"><h3 class="${"text-xl"}">Quests coins:</h3>
                        <p class="${"text-xl   text-legendary   ml-2 xl:ml-0"}"><strong class="${"font-normal  text-2xl"}" style="${"margin-right: 0.15rem"}">${escape(Math.round(data.dailyQuests + data.weeklyQuests * 10) / 10)}</strong>
                            (${escape(Math.round((data.dailyQuests + data.weeklyQuests) / user.coins * 1000) / 10 || 0)}%)</p></div>


                    <div class="${"mt-2  p-4 pl-6 bg-background rounded-xl  text-lg"}"><p class="${"text-mid-light mt-"}">From dailies: <b class="${"font-normal text-primary text-xl"}">${escape(Math.round(data.dailyQuests * 10) / 10)}</b></p>
                        <p class="${"text-mid-light mt-"}">From weeklies: <b class="${"font-normal text-primary text-xl"}">${escape(Math.round(data.weeklyQuests * 10) / 10)}</b></p></div></div>


                <div class="${"mt-8 xl:mt-0  xl:ml-12 2xl:ml-17"}"><div class="${"flex items-center  xl:block"}"><h3 class="${"text-xl"}">Referral link coins:</h3>
                        <p class="${"text-xl   text-green   ml-2 xl:ml-0"}"><strong class="${"font-normal  text-2xl"}" style="${"margin-right: 0.15rem"}">${escape(Math.round(data.link * 10) / 10)}</strong>
                            (${escape(Math.round(data.link / user.coins * 1000) / 10 || 0)}%)</p></div>

                    <div class="${"mt-2  p-4 pl-6 bg-background rounded-xl  text-lg"}"><p class="${"text-mid-light mt-"}">Friends invited: <b class="${"font-normal text-primary text-xl"}">${escape(user.friendsInvited)}</b></p></div></div></div>`
	: ``}</div></div>`;
});

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

var languages = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.languages = void 0;
exports.languages = {
    fr: {
        and: "et",
        quantifiers: {
            one: "un",
            nothing: "aucun",
        },
        singular: {
            year: "{quantifier}e année",
            month: "{quantifier} mois",
            day: "{quantifier}e journée",
            hour: "{quantifier}e heure",
            minute: "{quantifier}e minute",
            second: "{quantifier}e seconde",
            ms: "{quantifier} millième de seconde",
        },
        plural: {
            year: "{quantifier} ans",
            month: "{quantifier} mois",
            day: "{quantifier} jours",
            hour: "{quantifier} heures",
            minute: "{quantifier} minutes",
            second: "{quantifier} secondes",
            ms: "{quantifier} millièmes de seconde",
        },
    },
    en: {
        and: "and",
        quantifiers: {
            one: "one",
            nothing: "nothing",
        },
        singular: {
            year: "{quantifier} year",
            month: "{quantifier} month",
            day: "{quantifier} day",
            hour: "{quantifier} hour",
            minute: "{quantifier} minute",
            second: "{quantifier} second",
            ms: "{quantifier} thousand of a second",
        },
        plural: {
            year: "{quantifier} years",
            month: "{quantifier} months",
            day: "{quantifier} days",
            hour: "{quantifier} hours",
            minute: "{quantifier} minutes",
            second: "{quantifier} seconds",
            ms: "{quantifier} thousandths of a second",
        },
    },
    es: {
        and: "y",
        quantifiers: {
            one: "un",
            nothing: "no",
        },
        singular: {
            year: "{quantifier}o año",
            month: "{quantifier}o mes",
            day: "{quantifier}o día",
            hour: "{quantifier}a hora",
            minute: "{quantifier}a minutos",
            second: "{quantifier}a segundo",
            ms: "{quantifier}o milésima de segundo",
        },
        plural: {
            year: "{quantifier} año",
            month: "{quantifier} mes",
            day: "{quantifier} días",
            hour: "{quantifier} horas",
            minute: "{quantifier} minotos",
            second: "{quantifier} segundos",
            ms: "{quantifier} milésimas de segundo",
        },
    },
};
});

var durations = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuration = exports.durations = void 0;
const day = 1000 * 60 * 60 * 24;
exports.durations = {
    day,
    year: day * 365.25,
    month: day * 30.4167,
    hour: day / 24,
    minute: day / 24 / 60,
    second: 1000,
    ms: 1,
};
function isDuration(key) {
    return exports.durations.hasOwnProperty(key);
}
exports.isDuration = isDuration;
});

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.duration = exports.between = exports.since = void 0;


function resolve(date) {
    return typeof date === "number" ? date : date.getTime();
}
/** Get the sentence of time past since given moment */
function since(date, options) {
    return duration(Date.now() - resolve(date), options);
}
exports.since = since;
/** Get the sentence of time between given moments */
function between(date1, date2, options) {
    const time1 = resolve(date1), time2 = resolve(date2);
    return duration(Math.max(time1, time2) - Math.min(time1, time2), options);
}
exports.between = between;
/** Get the sentence of given duration */
function duration(date, options = {}) {
    let ms = resolve(date);
    let { format, locale, full, maxPartCount } = options;
    const cache = {};
    const counters = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        ms: 0,
    };
    if (!format)
        format = "second";
    if (!locale)
        locale = "en";
    for (const key of Object.keys(counters)) {
        if (!durations.isDuration(key))
            continue;
        while (ms >= durations.durations[key]) {
            ms -= durations.durations[key];
            counters[key]++;
        }
        while (ms <= durations.durations[key] * -1) {
            ms += durations.durations[key];
            counters[key]++;
        }
        if (!full && !counters[key]) {
            cache[key] = false;
        }
        else {
            const plural = counters[key] > 1;
            const empty = counters[key] === 0;
            cache[key] = languages.languages[locale][plural ? "plural" : "singular"][key].replace("{quantifier}", plural
                ? String(Math.floor(counters[key]))
                : languages.languages[locale].quantifiers[empty ? "nothing" : "one"]);
        }
    }
    const output = [];
    for (const key of Object.keys(cache)) {
        if (!durations.isDuration(key))
            continue;
        if (cache[key]) {
            output.push(cache[key]);
        }
        if (key === format) {
            break;
        }
    }
    if (maxPartCount)
        output.splice(maxPartCount);
    if (output.length > 1) {
        let last = output.pop();
        output[output.length - 1] += ` ${languages.languages[locale].and} ${last}`;
    }
    else if (output.length === 0) {
        return languages.languages[locale].singular[format].replace("{quantifier}", languages.languages[locale].quantifiers.nothing);
    }
    return output.join(", ");
}
exports.duration = duration;
const output = {
    since,
    ago: since,
    fromNow: since,
    between,
    diff: between,
    duration,
    value: duration,
};
exports.default = output;
module.exports = output;
});

/* src\components\profile\CoinHistory.svelte generated by Svelte v3.31.0 */

const CoinHistory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props;
	console.log(data);

	function formatTime(sec) {
		let timeString = dist.since(new Date(sec), { locale: "en" });

		if (timeString.includes("year")) {
			timeString = timeString.slice(0, timeString.indexOf("year") - 1) + "y";
		} else if (timeString.includes("years")) {
			timeString = timeString.slice(0, timeString.indexOf("years") - 1) + "y";
		} else if (timeString.includes("month")) {
			timeString = timeString.slice(0, timeString.indexOf("month") - 1) + "month";
		} else if (timeString.includes("months")) {
			timeString = timeString.slice(0, timeString.indexOf("months") - 1) + "months";
		} else if (timeString.includes("days")) {
			timeString = timeString.slice(0, timeString.indexOf("days") - 1) + "d";
		} else if (timeString.includes("hours")) {
			timeString = timeString.slice(0, timeString.indexOf("hours") - 1) + "h";
		} else if (timeString.includes("minutes")) {
			timeString = timeString.slice(0, timeString.indexOf("minutes") - 1) + "m";
		}

		return timeString.replace("one hour", "1h") + " ago";
	}

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);

	return `<div class="${"relative bg-variant  rounded-2xl   p-8  mt-12 md:ml-12 2xl:ml-20     lg:w-7/12 xl:w-2/5 2xl:w-1/2"}"><p class="${"absolute -top-3 text-xl text-mid-light"}">HISTORY</p>

    <div class="${"-mt-1  w-full h-full max-h-screen-70 rounded-lg overflow-y-auto scrollbar scrollbar-background"}">${data.length < 1
	? `<div class="${"py-4 px-6 bg-background rounded-xl  text-xl  mt-3 text-center"}">No history
            </div>`
	: `${each(data.sort((a, b) => b.timestamp - a.timestamp), entry => `<div class="${"md:flex justify-between  py-4 px-6 bg-background rounded-xl  text-xl  mt-3"}"><div class="${"flex"}"><div class="${"flex items-center  mr-6 text-legendary"}"><p class="${" text-2xl"}">${escape(entry.data.reward)}</p>
                            <div class="${"ml-1 mb-1  w-6"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}
                            </div></div>
                        <p class="${"text-xl l:text-default  font-bold mt-px"}" style="${"font-family: 'Roboto Condensed', sans-serif;"}">${escape(entry.displayName)}</p>


                        <p class="${"hidden md:block md:ml-8  ml-12 2xl:ml-28 text-primary  text-xl 2xl:text-2xl"}">${escape(entry.type.includes("Quest")
		? `"${entry.data.name}"`
		: entry.data.name ? entry.data.name : "")}</p></div>

                    <div class="${"flex justify-between md:block  mt-2 md:mt-0"}"><p class="${"md:hidden   text-primary text-xl"}">${escape(entry.type.includes("Quest")
		? `"${entry.data.name}"`
		: entry.data.name ? entry.data.name : "")}</p>

                        <p class="${"ml-2 md:ml-4 lg:ml-0 md:mt-0 text-mid-light  text-xl 2xl:text-2xl  flex-shrink-0"}">${escape(formatTime(entry.timestamp))}</p></div>
                </div>`)}`}</div></div>`;
});

/* src\routes\profile\[username].svelte generated by Svelte v3.31.0 */

const css$i = {
	code: ".active.svelte-6cn6it{@apply text-primary  border-b-2 border-primary;}",
	map: "{\"version\":3,\"file\":\"[username].svelte\",\"sources\":[\"[username].svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { apiUrl } from \\\"../../utils/config\\\";\\r\\n    import { callApi, getUser } from \\\"../../utils/api\\\";\\r\\n    import formatTime from \\\"../../utils/formatTime\\\";\\r\\n\\r\\n    import GlobalStats from \\\"../../components/profile/GlobalStats.svelte\\\";\\r\\n    import RankedStats from \\\"../../components/profile/RankedStats.svelte\\\";\\r\\n    import LegendWeaponStats from \\\"../../components/profile/LegendStats.svelte\\\";\\r\\n    import LegendStats from \\\"../../components/profile/LegendStats.svelte\\\";\\r\\n    import WeaponStats from \\\"../../components/profile/WeaponStats.svelte\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import { stores } from \\\"@sapper/app\\\";\\r\\n    import CoinStats from \\\"../../components/profile/CoinStats.svelte\\\";\\r\\n    import CoinHistory from \\\"../../components/profile/CoinHistory.svelte\\\";\\r\\n    import Loading from \\\"../../components/Loading.svelte\\\";\\r\\n    import Search from \\\"../../components/profile/Search.svelte\\\";\\r\\n    import share from \\\"../../utils/share\\\";\\r\\n    import copyText from \\\"../../utils/copyText\\\";\\r\\n    import { fade } from 'svelte/transition'\\r\\n    import {counter} from \\\"../../components/stores\\\";\\r\\n\\r\\n    const { page } = stores();\\r\\n\\r\\n\\r\\n    const legendObj = {\\r\\n        bodvar: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"Sword\\\" },\\r\\n        cassidy: { weapon_one: \\\"Pistol\\\", weapon_two: \\\"Hammer\\\" },\\r\\n        orion: { weapon_one: \\\"RocketLance\\\", weapon_two: \\\"Spear\\\" },\\r\\n        \\\"lord vraxx\\\": { weapon_one: \\\"RocketLance\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        gnash: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"Spear\\\" },\\r\\n        \\\"queen nai\\\": { weapon_one: \\\"Spear\\\", weapon_two: \\\"Katar\\\" },\\r\\n        hattori: { weapon_one: \\\"Sword\\\", weapon_two: \\\"Spear\\\" },\\r\\n        \\\"sir roland\\\": { weapon_one: \\\"RocketLance\\\", weapon_two: \\\"Sword\\\" },\\r\\n        scarlet: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"RocketLance\\\" },\\r\\n        thatch: { weapon_one: \\\"Sword\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        ada: { weapon_one: \\\"Pistol\\\", weapon_two: \\\"Spear\\\" },\\r\\n        sentinel: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"Katar\\\" },\\r\\n        lucien: { weapon_one: \\\"Katar\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        teros: { weapon_one: \\\"Axe\\\", weapon_two: \\\"Hammer\\\" },\\r\\n        brynn: { weapon_one: \\\"Axe\\\", weapon_two: \\\"Spear\\\" },\\r\\n        asuri: { weapon_one: \\\"Katar\\\", weapon_two: \\\"Sword\\\" },\\r\\n        barraza: { weapon_one: \\\"Axe\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        ember: { weapon_one: \\\"Bow\\\", weapon_two: \\\"Katar\\\" },\\r\\n        azoth: { weapon_one: \\\"Bow\\\", weapon_two: \\\"Axe\\\" },\\r\\n        koji: { weapon_one: \\\"Bow\\\", weapon_two: \\\"Sword\\\" },\\r\\n        ulgrim: { weapon_one: \\\"Axe\\\", weapon_two: \\\"RocketLance\\\" },\\r\\n        diana: { weapon_one: \\\"Bow\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        jhala: { weapon_one: \\\"Axe\\\", weapon_two: \\\"Sword\\\" },\\r\\n        kor: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Hammer\\\" },\\r\\n        \\\"wu shang\\\": { weapon_one: \\\"Fists\\\", weapon_two: \\\"Spear\\\" },\\r\\n        val: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Sword\\\" },\\r\\n        ragnir: { weapon_one: \\\"Katar\\\", weapon_two: \\\"Axe\\\" },\\r\\n        cross: { weapon_one: \\\"Pistol\\\", weapon_two: \\\"Fists\\\" },\\r\\n        mirage: { weapon_one: \\\"Scythe\\\", weapon_two: \\\"Spear\\\" },\\r\\n        nix: { weapon_one: \\\"Scythe\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        mordex: { weapon_one: \\\"Scythe\\\", weapon_two: \\\"Fists\\\" },\\r\\n        yumiko: { weapon_one: \\\"Bow\\\", weapon_two: \\\"Hammer\\\" },\\r\\n        artemis: { weapon_one: \\\"RocketLance\\\", weapon_two: \\\"Scythe\\\" },\\r\\n        caspian: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Katar\\\" },\\r\\n        sidra: { weapon_one: \\\"Cannon\\\", weapon_two: \\\"Sword\\\" },\\r\\n        xull: { weapon_one: \\\"Cannon\\\", weapon_two: \\\"Axe\\\" },\\r\\n        kaya: { weapon_one: \\\"Spear\\\", weapon_two: \\\"Bow\\\" },\\r\\n        isaiah: { weapon_one: \\\"Cannon\\\", weapon_two: \\\"Pistol\\\" },\\r\\n        jiro: { weapon_one: \\\"Sword\\\", weapon_two: \\\"Scythe\\\" },\\r\\n        \\\"lin fei\\\": { weapon_one: \\\"Katar\\\", weapon_two: \\\"Cannon\\\" },\\r\\n        zariel: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Bow\\\" },\\r\\n        rayman: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Axe\\\" },\\r\\n        dusk: { weapon_one: \\\"Spear\\\", weapon_two: \\\"Orb\\\" },\\r\\n        fait: { weapon_one: \\\"Scythe\\\", weapon_two: \\\"Orb\\\" },\\r\\n        thor: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"Orb\\\" },\\r\\n        petra: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Orb\\\" },\\r\\n        vector: { weapon_one: \\\"RocketLance\\\", weapon_two: \\\"Bow\\\" },\\r\\n        volkov: { weapon_one: \\\"Axe\\\", weapon_two: \\\"Scythe\\\" },\\r\\n        onyx: { weapon_one: \\\"Fists\\\", weapon_two: \\\"Cannon\\\" },\\r\\n        jaeyun: { weapon_one: \\\"Sword\\\", weapon_two: \\\"Greatsword\\\" },\\r\\n        mako: { weapon_one: \\\"Katar\\\", weapon_two: \\\"Greatsword\\\" },\\r\\n        magyar: { weapon_one: \\\"Hammer\\\", weapon_two: \\\"Greatsword\\\" },\\r\\n        reno: { weapon_one: \\\"Pistol\\\", weapon_two: \\\"Orb\\\" }\\r\\n    };\\r\\n    const weaponList = [\\r\\n        {\\r\\n            name: \\\"Hammer\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Sword\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Pistol\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"RocketLance\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Spear\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Katar\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Axe\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Fists\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Bow\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Cannon\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Orb\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Scythe\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        },\\r\\n        {\\r\\n            name: \\\"Greatsword\\\",\\r\\n            matchtime: 0,\\r\\n            games: 0,\\r\\n            kos: 0,\\r\\n            damagedealt: 0\\r\\n        }\\r\\n    ];\\r\\n\\r\\n    let pages;\\r\\n    let username;\\r\\n    let bid;\\r\\n    let url;\\r\\n\\r\\n    //404 display\\r\\n    let isDisplaying404;\\r\\n    let isSearchOpen;\\r\\n\\r\\n    let loaded;\\r\\n\\r\\n    //Reload UI on query parameter change\\r\\n    let isDisplayingWinhalla;\\r\\n    $: if (isDisplayingWinhalla) {\\r\\n        console.log(\\\"Switched Display\\\");\\r\\n    }\\r\\n\\r\\n\\r\\n    let data;\\r\\n    let user;\\r\\n    let playerData;\\r\\n    let rankedData;\\r\\n    let urlData;\\r\\n    let alreadyLoaded = false;\\r\\n\\r\\n    let link;\\r\\n    let hasShareFunction;\\r\\n    let toolTipOpen;\\r\\n    let currUser;\\r\\n    onMount(() => {\\r\\n        pages = page.subscribe(async value => {\\r\\n            hasShareFunction = !!window.navigator.share;\\r\\n\\r\\n            if (urlData?.host !== value?.host || urlData?.path !== value?.path || alreadyLoaded === false) loaded = false;\\r\\n            urlData = value;\\r\\n            //Determines witch page to display: brawlhalla or winhalla\\r\\n            isDisplayingWinhalla = value.query?.d === \\\"winhalla\\\";\\r\\n\\r\\n            //brawlhalla id if there is one\\r\\n            bid = value.query?.bid;\\r\\n            username = value.params.username;\\r\\n\\r\\n            url = bid ? value.path + `?bid=${bid}` : value.path;\\r\\n\\r\\n            if (!loaded) {\\r\\n                const res = new Promise(async () => {\\r\\n                    if (bid) {\\r\\n                        data = await callApi(\\\"get\\\", `${apiUrl}/stats/${bid}`);\\r\\n\\r\\n                        if (value.query?.prefer_bid === \\\"true\\\") {\\r\\n                            username = data.player.name;\\r\\n                            console.log(data)\\r\\n                        } else if (data.player.name !== username) {\\r\\n                            console.log(\\\"mmmm\\\")\\r\\n                            const player = await callApi(\\\"get\\\", `/stats/username/${username}`);\\r\\n                            bid = player.find(p => p.name === username)?.brawlhalla_id;\\r\\n                            if (!bid) return isDisplaying404 = true;\\r\\n\\r\\n                            data = await callApi(\\\"get\\\", `${apiUrl}/stats/${bid}`);\\r\\n                        }\\r\\n\\r\\n                    } else {\\r\\n                        const player = await callApi(\\\"get\\\", `/stats/username/${username}`);\\r\\n                        if (!player) return isDisplaying404 = true;\\r\\n\\r\\n                        bid = player.find(p => p.name === username).brawlhalla_id;\\r\\n                        data = await callApi(\\\"get\\\", `${apiUrl}/stats/${bid}`);\\r\\n                    }\\r\\n\\r\\n                    user = await callApi(\\\"get\\\", \\\"/auth/getUserData/\\\" + bid);\\r\\n\\r\\n                    if (user) {\\r\\n                        user.user.friendsInvited = user.link;\\r\\n                        user = user.user;\\r\\n                    } else {\\r\\n                        await counter.subscribe(async (value) => {\\r\\n                            if (value.refresh === true) return;\\r\\n                            currUser = await value.content;\\r\\n                            if(!currUser.user) return;\\r\\n                            currUser = currUser.user;\\r\\n                        });\\r\\n\\r\\n                        link = currUser.linkId ? `https://winhalla.app/link/${currUser.linkId}` : undefined;\\r\\n                    }\\r\\n\\r\\n                    playerData = data.player;\\r\\n                    playerData.matchtime = 0;\\r\\n                    playerData.damageunarmed = 0;\\r\\n                    playerData.kosunarmed = 0;\\r\\n                    playerData.kos = 0;\\r\\n                    playerData.damagedealt = 0;\\r\\n\\r\\n                    rankedData = data.ranked;\\r\\n\\r\\n                    for (let l of playerData.legends) {\\r\\n                        //faut voir si damagethrownitem c que pour les armes si oui faut add\\r\\n                        playerData.matchtime += l.matchtime;\\r\\n                        playerData.damageunarmed += parseInt(l.damageunarmed);\\r\\n                        playerData.kosunarmed += parseInt(l.kounarmed);\\r\\n                        playerData.kos += l.kos;\\r\\n                        playerData.damagedealt += parseInt(l.damagedealt);\\r\\n\\r\\n                        const legendWeaponOne = legendObj[l.legend_name_key].weapon_one;\\r\\n                        const legendWeaponTwo = legendObj[l.legend_name_key].weapon_two;\\r\\n\\r\\n                        let weaponOneInList = weaponList.find(w => w.name === legendWeaponOne);\\r\\n                        weaponOneInList.matchtime += l.timeheldweaponone;\\r\\n                        weaponOneInList.games += l.games;\\r\\n                        weaponOneInList.kos += l.koweaponone;\\r\\n                        weaponOneInList.damagedealt += parseInt(l.damageweaponone);\\r\\n\\r\\n                        let weaponTwoInList = weaponList.find(w => w.name === legendWeaponTwo);\\r\\n                        weaponTwoInList.matchtime += l.timeheldweapontwo;\\r\\n                        weaponTwoInList.games += l.games;\\r\\n                        weaponTwoInList.kos += l.koweapontwo;\\r\\n                        weaponTwoInList.damagedealt += parseInt(l.damageweapontwo);\\r\\n                    }\\r\\n                    loaded = true;\\r\\n                });\\r\\n\\r\\n            }\\r\\n            alreadyLoaded = true;\\r\\n        });\\r\\n    });\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .active {\\r\\n        @apply text-primary  border-b-2 border-primary;\\r\\n    }\\r\\n</style>\\r\\n<svelte:head>\\r\\n    <title>{username ? username + \\\"'s\\\" : \\\"\\\"} Profile Page - Winhalla</title>\\r\\n</svelte:head>\\r\\n\\r\\n{#if loaded}\\r\\n    <section class=\\\"md:h-64 bg-variant  pl-7  md:pl-10 md:pr-10 lg:pl-23 lg:pr-18   flex flex-col justify-between\\\">\\r\\n        <div class=\\\"md:flex items-center justify-between  mt-10 md:mt-21\\\">\\r\\n            <div>\\r\\n                <p class=\\\"text-3xl\\\">\\r\\n                    {username}\\r\\n                </p>\\r\\n\\r\\n                {#if !isDisplayingWinhalla}\\r\\n                    <p class=\\\"mt-1 text-mid-light\\\">\\r\\n                        {isDisplayingWinhalla ? \\\"Winhalla clan\\\" : \\\"Brawlhalla clan\\\"}:\\r\\n                        <b class=\\\"font-normal text-primary text-2xl\\\">{isDisplayingWinhalla ? \\\"\\\" : playerData?.clan? playerData.clan.clan_name:\\\"No clan\\\"}</b>\\r\\n                    </p>\\r\\n                {/if}\\r\\n            </div>\\r\\n            {#if !isDisplayingWinhalla}\\r\\n                <div class=\\\"text-ultra-light mt-7 md:mt-2  text-xl md:text-default\\\">\\r\\n                    <p>Level: <b\\r\\n                        class=\\\"font-normal text-primary text-2xl\\\">{isDisplayingWinhalla ? \\\"\\\" : playerData.level}</b></p>\\r\\n                    <p class=\\\"mt-1\\\">Time spent in online games: <b\\r\\n                        class=\\\"font-normal text-primary text-2xl\\\">\\r\\n                        {isDisplayingWinhalla ? \\\"\\\" : formatTime(playerData.matchtime)}</b>\\r\\n                    </p>\\r\\n                </div>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <div class=\\\"flex  mt-6 md:mt-0   text-xl md:text-default\\\">\\r\\n            <a class=\\\"{!isDisplayingWinhalla ? 'active' : ''}\\\"\\r\\n               href=\\\"{urlData.query.bid ? url + '&d=brawlhalla' : url + '?d=brawlhalla'}\\\">Brawlhalla</a>\\r\\n\\r\\n            <a class=\\\"ml-8  md:ml-11 {isDisplayingWinhalla ? 'active' : ''}\\\"\\r\\n               href=\\\"{urlData.query.bid ? url + '&d=winhalla' : url + '?d=winhalla'}\\\">Winhalla</a>\\r\\n        </div>\\r\\n    </section>\\r\\n    {#if isDisplayingWinhalla}\\r\\n        {#if user}\\r\\n            <section class=\\\"px-7 md:px-10 lg:px-18 pb-12  md:flex items-start\\\">\\r\\n                <CoinStats user=\\\"{user}\\\" data=\\\"{user?.coinLogs?.total}\\\" />\\r\\n                <CoinHistory data=\\\"{user.coinLogs.history}\\\" />\\r\\n            </section>\\r\\n        {:else if link}\\r\\n            <section class=\\\"w-full px-4 md:px-0\\\">\\r\\n                <div class=\\\" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full\\\">\\r\\n                    <p class=\\\"text-2xl  md:text-3xl\\\">\\r\\n                        <b class=\\\"text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1\\\">{username}</b> has no Winhalla account!\\r\\n                    </p>\\r\\n                    <p class=\\\"mt-6 text-2xl\\\"><b class=\\\"font-normal  text-green\\\">Help us grow</b> Winhalla <b class=\\\"font-normal  text-green\\\">by sharing</b>\\r\\n                        <br> your referral link!</p>\\r\\n\\r\\n\\r\\n                    <div\\r\\n                            class=\\\"text-background  bg-font py-4 px-3 mt-6 flex items-center rounded-md\\\">\\r\\n                        <div id=\\\"link\\\"\\r\\n                             class=\\\"flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none\\\"\\r\\n                             style=\\\"font-family:'Roboto Condensed', sans-serif\\\">\\r\\n\\r\\n                            <p class=\\\"md:ml-1\\\">{link}</p>\\r\\n\\r\\n                            <div class=\\\"ml-2 h-5  flex\\\"\\r\\n                                 class:w-5={!hasShareFunction} class:w-12={hasShareFunction}>\\r\\n                                {#if hasShareFunction}\\r\\n                                    <div class=\\\"w-5 h-5 hover:text-gray-500 cursor-pointer  md:mr-1\\\">\\r\\n                                        <svg viewBox=\\\"0 0 24 24\\\" fill=\\\"currentColor\\\" on:click={() => share(link)}\\r\\n                                             class=\\\"w-5 h-5\\\"\\r\\n                                             class:mr-1={hasShareFunction}\\r\\n                                             xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                    d=\\\"m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z\\\" />\\r\\n                                        </svg>\\r\\n                                    </div>\\r\\n                                {/if}\\r\\n                                <div class=\\\"w-5 h-5 hover:text-gray-500 cursor-pointer\\\">\\r\\n                                    <svg viewBox=\\\"0 0 24 24\\\" fill=\\\"currentColor\\\" class=\\\"w-5 h-5\\\"\\r\\n                                         class:ml-1={hasShareFunction}\\r\\n                                         on:click={() => copyText(link, function () {toolTipOpen = true;\\r\\n                                                setTimeout(() => {\\r\\n                                                    toolTipOpen = false;\\r\\n                                                }, 3000);\\r\\n                                             })}\\r\\n                                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                                d=\\\"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z\\\" />\\r\\n                                        <path\\r\\n                                                d=\\\"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z\\\" />\\r\\n                                        <path\\r\\n                                                d=\\\"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z\\\" />\\r\\n                                    </svg>\\r\\n                                </div>\\r\\n\\r\\n                            </div>\\r\\n                        </div>\\r\\n                        {#if toolTipOpen}\\r\\n                            <div class=\\\"relative\\\">\\r\\n                                    <span\\r\\n                                            class=\\\"tooltip absolute px-6 py-2 bg-primary hidden md:block rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40\\\"\\r\\n                                            transition:fade>\\r\\n                                            Copied!\\r\\n                                    </span>\\r\\n                            </div>\\r\\n                        {/if}\\r\\n\\r\\n                    </div>                        <p class=\\\"mt-5 text-xl\\\"><b class=\\\"font-normal text-accent\\\">You</b> and <b class=\\\"font-normal text-accent\\\">your friend</b> will get a\\r\\n                    <a href=\\\"/referral-link\\\"><u class=\\\"text-mid-light\\\">reward boost</u></a></p>\\r\\n\\r\\n                </div>\\r\\n            </section>\\r\\n        {:else}\\r\\n            <section class=\\\"w-full px-4 md:px-0\\\">\\r\\n                <div class=\\\" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 pb-4 h-auto\\\">\\r\\n                    <p class=\\\"text-2xl  md:text-3xl\\\">\\r\\n                        <b class=\\\"text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1\\\">{username}</b> has no Winhalla account!\\r\\n                    </p>\\r\\n\\r\\n                    <div class=\\\"mt-6  p-6 bg-background rounded-xl w-full   flex flex-col  items-center\\\">\\r\\n                        <svg class=\\\"mx-auto text-primary  fill-current w-26\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 465.1 152.11\\\">\\r\\n                            <g id=\\\"Calque_2\\\" data-name=\\\"Calque 2\\\">\\r\\n                                <g id=\\\"Calque_1-2\\\" data-name=\\\"Calque 1\\\">\\r\\n                                    <polygon\\r\\n                                            points=\\\"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0\\\"/>\\r\\n                                    <rect x=\\\"97.54\\\" y=\\\"24\\\" width=\\\"16.38\\\" height=\\\"104.25\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z\\\"/>\\r\\n                                    <path\\r\\n                                            d=\\\"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37\\\"/>\\r\\n                                    <polygon\\r\\n                                            points=\\\"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37\\\"/>\\r\\n                                </g>\\r\\n                            </g>\\r\\n                        </svg>\\r\\n                        <p class=\\\"text-center mt-5 text-2xl\\\"><b class=\\\"font-normal text-green\\\">Play</b> Brawlhalla, <b class=\\\"font-normal  text-legendary\\\">Earn</b> rewards</p>\\r\\n                        <!---->\\r\\n                        <a class=\\\"mt-6 text-center w-full  button button-brand\\\" style=\\\"display: block\\\"  href=\\\"/login\\\">Login now</a>\\r\\n                    </div>\\r\\n                    <p class=\\\"mt-3 text-xl  text-center\\\">Start <b class=\\\"font-normal text-legendary\\\">earning</b> now! It's <b class=\\\"font-normal  text-accent\\\">free</b>!</p>\\r\\n\\r\\n                </div>\\r\\n            </section>\\r\\n        {/if}\\r\\n    {:else}\\r\\n        <section class=\\\"px-7 md:px-10 lg:px-18 pb-12 lg:flex justify-between flex-wrap items-start\\\">\\r\\n            <div class=\\\"mt-12  md:flex items-start\\\">\\r\\n                <RankedStats data=\\\"{rankedData}\\\" />\\r\\n                <GlobalStats data=\\\"{playerData}\\\" />\\r\\n            </div>\\r\\n\\r\\n\\r\\n            <div class=\\\"pt-12 mt-6 xl:mt-0    md:flex items-start\\\">\\r\\n                <LegendStats data={playerData.legends} />\\r\\n                <WeaponStats data={weaponList} />\\r\\n            </div>\\r\\n        </section>\\r\\n    {/if}\\r\\n\\r\\n{:else if isDisplaying404}\\r\\n    <div class=\\\"w-full h-full flex flex-col justify-center items-center\\\">\\r\\n        <h2 class=\\\"text-9xl  mt-48\\\">404</h2>\\r\\n        <p class=\\\"text-3xl  text-mid-light  -mt-4\\\">Player not found</p>\\r\\n\\r\\n        <a class=\\\"text-primary italic mt-1\\\" href=\\\"/\\\">Return to home page</a>\\r\\n    </div>\\r\\n{:else}\\r\\n    <Loading />\\r\\n{/if}\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA6SI,OAAO,cAAC,CAAC,AACL,OAAO,YAAY,EAAE,UAAU,CAAC,cAAc,CAAC,AACnD,CAAC\"}"
};

const U5Busernameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const { page } = stores$1();

	const legendObj = {
		bodvar: {
			weapon_one: "Hammer",
			weapon_two: "Sword"
		},
		cassidy: {
			weapon_one: "Pistol",
			weapon_two: "Hammer"
		},
		orion: {
			weapon_one: "RocketLance",
			weapon_two: "Spear"
		},
		"lord vraxx": {
			weapon_one: "RocketLance",
			weapon_two: "Pistol"
		},
		gnash: {
			weapon_one: "Hammer",
			weapon_two: "Spear"
		},
		"queen nai": { weapon_one: "Spear", weapon_two: "Katar" },
		hattori: { weapon_one: "Sword", weapon_two: "Spear" },
		"sir roland": {
			weapon_one: "RocketLance",
			weapon_two: "Sword"
		},
		scarlet: {
			weapon_one: "Hammer",
			weapon_two: "RocketLance"
		},
		thatch: {
			weapon_one: "Sword",
			weapon_two: "Pistol"
		},
		ada: {
			weapon_one: "Pistol",
			weapon_two: "Spear"
		},
		sentinel: {
			weapon_one: "Hammer",
			weapon_two: "Katar"
		},
		lucien: {
			weapon_one: "Katar",
			weapon_two: "Pistol"
		},
		teros: { weapon_one: "Axe", weapon_two: "Hammer" },
		brynn: { weapon_one: "Axe", weapon_two: "Spear" },
		asuri: { weapon_one: "Katar", weapon_two: "Sword" },
		barraza: { weapon_one: "Axe", weapon_two: "Pistol" },
		ember: { weapon_one: "Bow", weapon_two: "Katar" },
		azoth: { weapon_one: "Bow", weapon_two: "Axe" },
		koji: { weapon_one: "Bow", weapon_two: "Sword" },
		ulgrim: {
			weapon_one: "Axe",
			weapon_two: "RocketLance"
		},
		diana: { weapon_one: "Bow", weapon_two: "Pistol" },
		jhala: { weapon_one: "Axe", weapon_two: "Sword" },
		kor: {
			weapon_one: "Fists",
			weapon_two: "Hammer"
		},
		"wu shang": { weapon_one: "Fists", weapon_two: "Spear" },
		val: { weapon_one: "Fists", weapon_two: "Sword" },
		ragnir: { weapon_one: "Katar", weapon_two: "Axe" },
		cross: {
			weapon_one: "Pistol",
			weapon_two: "Fists"
		},
		mirage: {
			weapon_one: "Scythe",
			weapon_two: "Spear"
		},
		nix: {
			weapon_one: "Scythe",
			weapon_two: "Pistol"
		},
		mordex: {
			weapon_one: "Scythe",
			weapon_two: "Fists"
		},
		yumiko: { weapon_one: "Bow", weapon_two: "Hammer" },
		artemis: {
			weapon_one: "RocketLance",
			weapon_two: "Scythe"
		},
		caspian: { weapon_one: "Fists", weapon_two: "Katar" },
		sidra: {
			weapon_one: "Cannon",
			weapon_two: "Sword"
		},
		xull: { weapon_one: "Cannon", weapon_two: "Axe" },
		kaya: { weapon_one: "Spear", weapon_two: "Bow" },
		isaiah: {
			weapon_one: "Cannon",
			weapon_two: "Pistol"
		},
		jiro: {
			weapon_one: "Sword",
			weapon_two: "Scythe"
		},
		"lin fei": {
			weapon_one: "Katar",
			weapon_two: "Cannon"
		},
		zariel: { weapon_one: "Fists", weapon_two: "Bow" },
		rayman: { weapon_one: "Fists", weapon_two: "Axe" },
		dusk: { weapon_one: "Spear", weapon_two: "Orb" },
		fait: { weapon_one: "Scythe", weapon_two: "Orb" },
		thor: { weapon_one: "Hammer", weapon_two: "Orb" },
		petra: { weapon_one: "Fists", weapon_two: "Orb" },
		vector: {
			weapon_one: "RocketLance",
			weapon_two: "Bow"
		},
		volkov: { weapon_one: "Axe", weapon_two: "Scythe" },
		onyx: {
			weapon_one: "Fists",
			weapon_two: "Cannon"
		},
		jaeyun: {
			weapon_one: "Sword",
			weapon_two: "Greatsword"
		},
		mako: {
			weapon_one: "Katar",
			weapon_two: "Greatsword"
		},
		magyar: {
			weapon_one: "Hammer",
			weapon_two: "Greatsword"
		},
		reno: { weapon_one: "Pistol", weapon_two: "Orb" }
	};

	const weaponList = [
		{
			name: "Hammer",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Sword",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Pistol",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "RocketLance",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Spear",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Katar",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Axe",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Fists",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Bow",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Cannon",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Orb",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Scythe",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		},
		{
			name: "Greatsword",
			matchtime: 0,
			games: 0,
			kos: 0,
			damagedealt: 0
		}
	];

	let pages;
	let username;
	let bid;
	let url;

	//404 display
	let isDisplaying404;
	let loaded;

	//Reload UI on query parameter change
	let isDisplayingWinhalla;

	let data;
	let user;
	let playerData;
	let rankedData;
	let urlData;
	let alreadyLoaded = false;
	let link;
	let hasShareFunction;
	let currUser;

	onMount(() => {
		pages = page.subscribe(async value => {
			hasShareFunction = !!window.navigator.share;
			if (urlData?.host !== value?.host || urlData?.path !== value?.path || alreadyLoaded === false) loaded = false;
			urlData = value;

			//Determines witch page to display: brawlhalla or winhalla
			isDisplayingWinhalla = value.query?.d === "winhalla";

			//brawlhalla id if there is one
			bid = value.query?.bid;

			username = value.params.username;
			url = bid ? value.path + `?bid=${bid}` : value.path;

			if (!loaded) {
				const res = new Promise(async () => {
						if (bid) {
							data = await callApi("get", `${apiUrl}/stats/${bid}`);

							if (value.query?.prefer_bid === "true") {
								username = data.player.name;
								console.log(data);
							} else if (data.player.name !== username) {
								console.log("mmmm");
								const player = await callApi("get", `/stats/username/${username}`);
								bid = player.find(p => p.name === username)?.brawlhalla_id;
								if (!bid) return isDisplaying404 = true;
								data = await callApi("get", `${apiUrl}/stats/${bid}`);
							}
						} else {
							const player = await callApi("get", `/stats/username/${username}`);
							if (!player) return isDisplaying404 = true;
							bid = player.find(p => p.name === username).brawlhalla_id;
							data = await callApi("get", `${apiUrl}/stats/${bid}`);
						}

						user = await callApi("get", "/auth/getUserData/" + bid);

						if (user) {
							user.user.friendsInvited = user.link;
							user = user.user;
						} else {
							await counter.subscribe(async value => {
								if (value.refresh === true) return;
								currUser = await value.content;
								if (!currUser.user) return;
								currUser = currUser.user;
							});

							link = currUser.linkId
							? `https://winhalla.app/link/${currUser.linkId}`
							: undefined;
						}

						playerData = data.player;
						playerData.matchtime = 0;
						playerData.damageunarmed = 0;
						playerData.kosunarmed = 0;
						playerData.kos = 0;
						playerData.damagedealt = 0;
						rankedData = data.ranked;

						for (let l of playerData.legends) {
							//faut voir si damagethrownitem c que pour les armes si oui faut add
							playerData.matchtime += l.matchtime;

							playerData.damageunarmed += parseInt(l.damageunarmed);
							playerData.kosunarmed += parseInt(l.kounarmed);
							playerData.kos += l.kos;
							playerData.damagedealt += parseInt(l.damagedealt);
							const legendWeaponOne = legendObj[l.legend_name_key].weapon_one;
							const legendWeaponTwo = legendObj[l.legend_name_key].weapon_two;
							let weaponOneInList = weaponList.find(w => w.name === legendWeaponOne);
							weaponOneInList.matchtime += l.timeheldweaponone;
							weaponOneInList.games += l.games;
							weaponOneInList.kos += l.koweaponone;
							weaponOneInList.damagedealt += parseInt(l.damageweaponone);
							let weaponTwoInList = weaponList.find(w => w.name === legendWeaponTwo);
							weaponTwoInList.matchtime += l.timeheldweapontwo;
							weaponTwoInList.games += l.games;
							weaponTwoInList.kos += l.koweapontwo;
							weaponTwoInList.damagedealt += parseInt(l.damageweapontwo);
						}

						loaded = true;
					});
			}

			alreadyLoaded = true;
		});
	});

	$$result.css.add(css$i);

	 {
		if (isDisplayingWinhalla) {
			console.log("Switched Display");
		}
	}

	return `${($$result.head += `${($$result.title = `<title>${escape(username ? username + "'s" : "")} Profile Page - Winhalla</title>`, "")}`, "")}

${loaded
	? `<section class="${"md:h-64 bg-variant  pl-7  md:pl-10 md:pr-10 lg:pl-23 lg:pr-18   flex flex-col justify-between"}"><div class="${"md:flex items-center justify-between  mt-10 md:mt-21"}"><div><p class="${"text-3xl"}">${escape(username)}</p>

                ${!isDisplayingWinhalla
		? `<p class="${"mt-1 text-mid-light"}">${escape(isDisplayingWinhalla
			? "Winhalla clan"
			: "Brawlhalla clan")}:
                        <b class="${"font-normal text-primary text-2xl"}">${escape(isDisplayingWinhalla
			? ""
			: (playerData?.clan)
				? playerData.clan.clan_name
				: "No clan")}</b></p>`
		: ``}</div>
            ${!isDisplayingWinhalla
		? `<div class="${"text-ultra-light mt-7 md:mt-2  text-xl md:text-default"}"><p>Level: <b class="${"font-normal text-primary text-2xl"}">${escape(isDisplayingWinhalla ? "" : playerData.level)}</b></p>
                    <p class="${"mt-1"}">Time spent in online games: <b class="${"font-normal text-primary text-2xl"}">${escape(isDisplayingWinhalla
			? ""
			: formatTime(playerData.matchtime))}</b></p></div>`
		: ``}</div>

        <div class="${"flex  mt-6 md:mt-0   text-xl md:text-default"}"><a class="${escape(null_to_empty(!isDisplayingWinhalla ? "active" : "")) + " svelte-6cn6it"}"${add_attribute(
			"href",
			urlData.query.bid
			? url + "&d=brawlhalla"
			: url + "?d=brawlhalla",
			0
		)}>Brawlhalla</a>

            <a class="${"ml-8  md:ml-11 " + escape(isDisplayingWinhalla ? "active" : "") + " svelte-6cn6it"}"${add_attribute(
			"href",
			urlData.query.bid
			? url + "&d=winhalla"
			: url + "?d=winhalla",
			0
		)}>Winhalla</a></div></section>
    ${isDisplayingWinhalla
		? `${user
			? `<section class="${"px-7 md:px-10 lg:px-18 pb-12  md:flex items-start"}">${validate_component(CoinStats, "CoinStats").$$render($$result, { user, data: user?.coinLogs?.total }, {}, {})}
                ${validate_component(CoinHistory, "CoinHistory").$$render($$result, { data: user.coinLogs.history }, {}, {})}</section>`
			: `${link
				? `<section class="${"w-full px-4 md:px-0"}"><div class="${" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 h-auto  w-full"}"><p class="${"text-2xl  md:text-3xl"}"><b class="${"text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1"}">${escape(username)}</b> has no Winhalla account!
                    </p>
                    <p class="${"mt-6 text-2xl"}"><b class="${"font-normal  text-green"}">Help us grow</b> Winhalla <b class="${"font-normal  text-green"}">by sharing</b>
                        <br> your referral link!</p>


                    <div class="${"text-background  bg-font py-4 px-3 mt-6 flex items-center rounded-md"}"><div id="${"link"}" class="${"flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"}" style="${"font-family:'Roboto Condensed', sans-serif"}"><p class="${"md:ml-1"}">${escape(link)}</p>

                            <div class="${[
						"ml-2 h-5  flex",
						(!hasShareFunction ? "w-5" : "") + " " + (hasShareFunction ? "w-12" : "")
					].join(" ").trim()}">${hasShareFunction
					? `<div class="${"w-5 h-5 hover:text-gray-500 cursor-pointer  md:mr-1"}"><svg viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${["w-5 h-5", hasShareFunction ? "mr-1" : ""].join(" ").trim()}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z"}"></path></svg></div>`
					: ``}
                                <div class="${"w-5 h-5 hover:text-gray-500 cursor-pointer"}"><svg viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${["w-5 h-5", hasShareFunction ? "ml-1" : ""].join(" ").trim()}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z"}"></path><path d="${"m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z"}"></path><path d="${"m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"}"></path></svg></div></div></div>
                        ${ ``}</div>                        <p class="${"mt-5 text-xl"}"><b class="${"font-normal text-accent"}">You</b> and <b class="${"font-normal text-accent"}">your friend</b> will get a
                    <a href="${"/referral-link"}"><u class="${"text-mid-light"}">reward boost</u></a></p></div></section>`
				: `<section class="${"w-full px-4 md:px-0"}"><div class="${" md:mx-auto  mt-28  bg-variant  md:max-w-max rounded-xl  p-8 pb-4 h-auto"}"><p class="${"text-2xl  md:text-3xl"}"><b class="${"text-3xl md:text-4xl -mb-1 font-normal  text-primary mr-1"}">${escape(username)}</b> has no Winhalla account!
                    </p>

                    <div class="${"mt-6  p-6 bg-background rounded-xl w-full   flex flex-col  items-center"}"><svg class="${"mx-auto text-primary  fill-current w-26"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 465.1 152.11"}"><g id="${"Calque_2"}" data-name="${"Calque 2"}"><g id="${"Calque_1-2"}" data-name="${"Calque 1"}"><polygon points="${"70.17 0 70.17 98.57 60.28 0 38.29 0 28.76 98.57 19.42 0 0 0 13.01 128.25 39.76 128.25 48.92 41.77 58.44 128.25 87.04 128.25 87.04 13.56 162.74 13.56 162.74 24.1 162.74 86.44 146.52 24.1 125.99 24.1 125.99 128.25 140.57 128.25 140.57 52.22 160.5 128.25 177.31 128.25 177.31 24.1 177.31 13.56 177.31 0 87.04 0 70.17 0"}"></polygon><rect x="${"97.54"}" y="${"24"}" width="${"16.38"}" height="${"104.25"}"></rect><path d="${"M265.84,107.87l18.6-.32,3,20.7h16.36l-17-104.15H264.64L247.7,128.25h15.18Zm9.37-66.45,7.3,51.48H267.79Z"}"></path><path d="${"M448.13,24.1H426L409,128.25H424.2l3-20.38,18.6-.32,3,20.7v10.31H204.88V81.38h17.55v46.87H238.8V24.1H222.43V66.5H204.88V24.1H188.51V128.25h0v23.86H465.1V128.25Zm-19,68.8,7.42-51.48,7.31,51.48Z"}"></path><polygon points="${"354.39 113.37 327.46 113.37 327.46 24.1 311.1 24.1 311.1 128.25 354.39 128.25 354.39 113.37"}"></polygon><polygon points="${"405.78 113.37 378.85 113.37 378.85 24.1 362.49 24.1 362.49 128.25 405.78 128.25 405.78 113.37"}"></polygon></g></g></svg>
                        <p class="${"text-center mt-5 text-2xl"}"><b class="${"font-normal text-green"}">Play</b> Brawlhalla, <b class="${"font-normal  text-legendary"}">Earn</b> rewards</p>
                        
                        <a class="${"mt-6 text-center w-full  button button-brand"}" style="${"display: block"}" href="${"/login"}">Login now</a></div>
                    <p class="${"mt-3 text-xl  text-center"}">Start <b class="${"font-normal text-legendary"}">earning</b> now! It&#39;s <b class="${"font-normal  text-accent"}">free</b>!</p></div></section>`}`}`
		: `<section class="${"px-7 md:px-10 lg:px-18 pb-12 lg:flex justify-between flex-wrap items-start"}"><div class="${"mt-12  md:flex items-start"}">${validate_component(RankedStats, "RankedStats").$$render($$result, { data: rankedData }, {}, {})}
                ${validate_component(GlobalStats, "GlobalStats").$$render($$result, { data: playerData }, {}, {})}</div>


            <div class="${"pt-12 mt-6 xl:mt-0    md:flex items-start"}">${validate_component(LegendStats, "LegendStats").$$render($$result, { data: playerData.legends }, {}, {})}
                ${validate_component(WeaponStats, "WeaponStats").$$render($$result, { data: weaponList }, {}, {})}</div></section>`}`
	: `${isDisplaying404
		? `<div class="${"w-full h-full flex flex-col justify-center items-center"}"><h2 class="${"text-9xl  mt-48"}">404</h2>
        <p class="${"text-3xl  text-mid-light  -mt-4"}">Player not found</p>

        <a class="${"text-primary italic mt-1"}" href="${"/"}">Return to home page</a></div>`
		: `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}`}`;
});

var component_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Busernameu5D
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

/* src\routes\legal.svelte generated by Svelte v3.31.0 */

const css$j = {
	code: "h2.svelte-1i8br0p{@apply text-4xl mt-6 mb-3 underline;}p.svelte-1i8br0p{@apply py-2px;}a.svelte-1i8br0p{@apply underline;}",
	map: "{\"version\":3,\"file\":\"legal.svelte\",\"sources\":[\"legal.svelte\"],\"sourcesContent\":[\"<svelte:head>\\r\\n    <title>Legal mentions | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n    ul{\\r\\n        list-style-type:disc;\\r\\n        @apply ml-6 my-3;\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"lg:px-100 lg:pt-20 px-8 py-4\\\">\\r\\n    <h1 class=\\\"text-5xl text-primary pb-1\\\">Legal</h1>\\r\\n    <h2>Host provider info</h2>\\r\\n    <p>Leafcloud B.V.</p>\\r\\n    <p>Moezelhavenweg 9 1043AM Amsterdam The Netherlands</p>\\r\\n\\r\\n    <h2>Publisher info</h2>\\r\\n    <p>Winhalla SAS</p>\\r\\n    <p>Address: 10 rue Minfeld - 91470 Limours - France</p>\\r\\n    <p>SIREN: 900 419 086</p>\\r\\n    <a class=\\\"underline\\\" href=\\\"mailto:contact@winhalla.app\\\">Contact email</a>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAII,EAAE,eAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAMD,CAAC,eAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Legal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$j);

	return `${($$result.head += `${($$result.title = `<title>Legal mentions | Winhalla</title>`, "")}`, "")}

<div class="${"lg:px-100 lg:pt-20 px-8 py-4"}"><h1 class="${"text-5xl text-primary pb-1"}">Legal</h1>
    <h2 class="${"svelte-1i8br0p"}">Host provider info</h2>
    <p class="${"svelte-1i8br0p"}">Leafcloud B.V.</p>
    <p class="${"svelte-1i8br0p"}">Moezelhavenweg 9 1043AM Amsterdam The Netherlands</p>

    <h2 class="${"svelte-1i8br0p"}">Publisher info</h2>
    <p class="${"svelte-1i8br0p"}">Winhalla SAS</p>
    <p class="${"svelte-1i8br0p"}">Address: 10 rue Minfeld - 91470 Limours - France</p>
    <p class="${"svelte-1i8br0p"}">SIREN: 900 419 086</p>
    <a class="${"underline svelte-1i8br0p"}" href="${"mailto:contact@winhalla.app"}">Contact email</a></div>`;
});

var component_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Legal
});

/* src\routes\login.svelte generated by Svelte v3.31.0 */

const css$k = {
	code: "input.svelte-6s0wf7{@apply w-full text-background bg-font py-3 px-4 rounded;}",
	map: "{\"version\":3,\"file\":\"login.svelte\",\"sources\":[\"login.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import { goto } from \\\"@sapper/app\\\";\\r\\n\\r\\n    let isLoggingIn;\\r\\n    let usernameSent;\\r\\n    let username;\\r\\n    let password;\\r\\n    let action = \\\"login\\\";\\r\\n    let status;\\r\\n    let accountCreated = false;\\r\\n\\r\\n    function startLogin() {\\r\\n        isLoggingIn = true;\\r\\n    }\\r\\n\\r\\n    async function switchToCreateAccount() {\\r\\n        action = action === \\\"login\\\" ? \\\"createAccount\\\" : \\\"login\\\";\\r\\n    }\\r\\n\\r\\n    async function createAccount() {\\r\\n        if (action === \\\"createAccount\\\") {\\r\\n            const result = await callApi(\\\"post\\\", `/auth/createEmailPassword?username=${username}&password=${password}`);\\r\\n            if (result instanceof Error) return status = result.response.data;\\r\\n            action = \\\"login\\\";\\r\\n            accountCreated = true;\\r\\n        } else {\\r\\n            const result = await callApi(\\\"post\\\", `/auth/login/local?username=${username}&password=${password}`);\\r\\n            if (result instanceof Error) return status = result.response.data;\\r\\n            goto(\\\"/referral-link?needBrawlhallaID=true\\\");\\r\\n        }\\r\\n    }\\r\\n</script>\\r\\n<style>\\r\\n    input {\\r\\n        @apply w-full text-background bg-font py-3 px-4 rounded;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full w-full flex items-center justify-center\\\">\\r\\n    {#if !isLoggingIn}\\r\\n        <div class=\\\"mt-48 flex flex-col\\\">\\r\\n            <h2 class=\\\"text-6xl text-center  mb-10\\\">LOGIN</h2>\\r\\n            <p class=\\\"font-ultra-light text-green text-center text-lg mt-1 mb-2\\\">\\r\\n                PC players:\\r\\n            </p>\\r\\n            <a\\r\\n                class=\\\"button-brand button\\\" style=\\\"display: flex !important;\\\"\\r\\n                href=\\\"{apiUrl}/auth/login/steam\\\">\\r\\n                <svg class=\\\"-ml-4 mr-3 w-6\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"fab\\\" data-icon=\\\"steam\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 496 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                Login with Steam\\r\\n            </a>\\r\\n\\r\\n            <p class=\\\"font-ultra-light text-green text-center text-lg mt-10 mb-2\\\">\\r\\n                Console/mobile players:\\r\\n            </p>\\r\\n            <a\\r\\n                class=\\\"button-brand-alternative button mb-6\\\" style=\\\"display: flex !important;\\\"\\r\\n                href=\\\"{apiUrl}/auth/login/google\\\">\\r\\n                <svg class=\\\"-ml-4 mr-3 w-5\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"fab\\\" data-icon=\\\"google\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 488 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                <p>Login with Google</p>\\r\\n            </a>\\r\\n\\r\\n            <button\\r\\n                class=\\\"button-brand-alternative button\\\" style=\\\"display: flex !important;\\\"\\r\\n                on:click={startLogin}>\\r\\n                <svg class=\\\"-ml-4 mr-3 w-6\\\" aria-hidden=\\\"true\\\" focusable=\\\"false\\\" data-prefix=\\\"far\\\" data-icon=\\\"envelope\\\"\\r\\n                     role=\\\"img\\\"\\r\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 512 512\\\">\\r\\n                    <path fill=\\\"currentColor\\\"\\r\\n                          d=\\\"M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z\\\"\\r\\n                          class=\\\"\\\"></path>\\r\\n                </svg>\\r\\n                <p>Login with Username/password</p>\\r\\n            </button>\\r\\n        </div>\\r\\n    {:else if !usernameSent}\\r\\n        <div class=\\\"flex items-center justify-center md:h-screen-7\\\">\\r\\n            <div class=\\\"flex flex-col justify-center px-5 md:p-0\\\" style=\\\"min-width: 20rem\\\">\\r\\n                <div class=\\\"text-center mt-7 md:mt-12\\\">\\r\\n                    <h1\\r\\n                        class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        \\\">\\r\\n                        {action === \\\"login\\\" ? \\\"Login\\\" : \\\"Create account\\\"}\\r\\n                    </h1>\\r\\n                </div>\\r\\n                <div class=\\\"\\\">\\r\\n                    <div>\\r\\n                        <input\\r\\n                            type=\\\"email\\\"\\r\\n                            placeholder=\\\"Enter your username\\\"\\r\\n                            bind:value={username}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"mt-6\\\">\\r\\n                    <div>\\r\\n                        <input\\r\\n                            type=\\\"email\\\"\\r\\n                            placeholder=\\\"Enter your password\\\"\\r\\n                            bind:value={password}\\r\\n                            class=\\\"input-style focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled\\\" />\\r\\n\\r\\n                        {#if status}\\r\\n                            <p class=\\\"text-legendary info \\\">{status}</p>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                </div>\\r\\n                <button\\r\\n                    on:click={createAccount}\\r\\n                    class=\\\"button button-brand mt-10\\\">\\r\\n                    Continue\\r\\n                </button>\\r\\n\\r\\n                <div class=\\\"mt-4\\\">\\r\\n                    {#if action === \\\"login\\\"}\\r\\n                        <p>Don't have an account?\\r\\n                            <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>create an account</button>\\r\\n                        </p>\\r\\n                    {:else}\\r\\n                        <p>Already have an account ?\\r\\n                            <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>login</button>\\r\\n                        </p>\\r\\n                    {/if}\\r\\n                </div>\\r\\n\\r\\n            </div>\\r\\n        </div>\\r\\n        <!--<div>\\r\\n            <div class=\\\"text-center md:text-left mt-7 md:mt-12\\\">\\r\\n                <h1\\r\\n                    class=\\\"text-6xl mb-6 md:mb-8 leading-snug\\r\\n                        md:leading-normal\\\">\\r\\n                    {action === \\\"login\\\" ? \\\"Login\\\" : \\\"Create account\\\"}\\r\\n                </h1>\\r\\n            </div>\\r\\n            <p class=\\\"text-green\\\" class:hidden={!accountCreated}>Account created successfully, you can now login.</p>\\r\\n            <input bind:value={username} class=\\\"my-4\\\" placeholder=\\\"Enter your username\\\">\\r\\n            <p></p>\\r\\n            <input bind:value={password} type=\\\"password\\\" class=\\\"my-4\\\" placeholder=\\\"Enter your password\\\">\\r\\n            <p></p>\\r\\n            <p class:hidden={!status} class=\\\"text-legendary\\\">{status}</p>\\r\\n            <button class=\\\"button button-brand my-4\\\" on:click={createAccount}>continue</button>\\r\\n            {#if action === \\\"login\\\"}\\r\\n                <p>Don't have an account?\\r\\n                    <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>create an account</button>\\r\\n                </p>\\r\\n            {:else}\\r\\n                <p>Already have an account ?\\r\\n                    <button class=\\\"text-primary underline\\\" on:click={switchToCreateAccount}>login</button>\\r\\n                </p>\\r\\n            {/if}\\r\\n        </div>-->\\r\\n    {/if}\\r\\n\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAmCI,KAAK,cAAC,CAAC,AACH,OAAO,MAAM,CAAC,eAAe,CAAC,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,OAAO,CAAC,AAC5D,CAAC\"}"
};

const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	$$result.css.add(css$k);

	return `<div class="${"h-full w-full flex items-center justify-center"}">${ `<div class="${"mt-48 flex flex-col"}"><h2 class="${"text-6xl text-center  mb-10"}">LOGIN</h2>
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

var component_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Login
});

/* src\routes\terms.svelte generated by Svelte v3.31.0 */

const css$l = {
	code: "h2.svelte-n1bhyj{@apply text-4xl mt-6 mb-3 underline;}div.svelte-n1bhyj{background-color:#FFFFFF;color:#000000\r\n    }p.svelte-n1bhyj{@apply py-2px;}a.svelte-n1bhyj{@apply underline;}",
	map: "{\"version\":3,\"file\":\"terms.svelte\",\"sources\":[\"terms.svelte\"],\"sourcesContent\":[\"<svelte:head>\\r\\n    <title>Terms of use | Winhalla</title>\\r\\n</svelte:head>\\r\\n<style>\\r\\n    h2 {\\r\\n        @apply text-4xl mt-6 mb-3 underline;\\r\\n    }\\r\\n\\r\\n    div {\\r\\n        background-color: #FFFFFF;\\r\\n        color: #000000\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        @apply py-2px;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        @apply underline;\\r\\n    }\\r\\n</style>\\r\\n<div class=\\\"h-full lg:px-100 px-5 lg:pt-30 pb-30 pt-8 \\\"\\r\\n     style=\\\"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);\\\">\\r\\n    <p>Please read these Terms of Service (\\\"Terms\\\", \\\"Terms of Service\\\") carefully before using the https://winhalla.app\\r\\n        website (the \\\"Service\\\") operated by winhalla.app (\\\"us\\\", \\\"we\\\", or \\\"our\\\").\\r\\n\\r\\n        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.\\r\\n        These Terms apply to all visitors, users and others who access or use the Service.</p>\\r\\n    <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the\\r\\n        terms then you may not access the Service.</p>\\r\\n    <h2 id=\\\"3rdParty\\\">Links To Other Websites</h2>\\r\\n\\r\\n    <p>Our Service may contain links to third-party websites or services that are not owned or controlled by\\r\\n        winhalla.app.</p>\\r\\n\\r\\n    <p>winhalla.app has no control over, and assumes no responsibility for, the content, privacy policies, or practices\\r\\n        of any third party websites or services. You further acknowledge and agree that winhalla.app shall not be\\r\\n        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in\\r\\n        connection with use of or reliance on any such content, goods or services available on or through any such\\r\\n        websites or services.</p>\\r\\n\\r\\n    <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or\\r\\n        services that you visit.</p>\\r\\n    <h2>Limitations</h2>\\r\\n\\r\\n    <p>Automated queries (including screen and database scraping, spiders, robots, crawlers and any other automated\\r\\n        activity with the purpose of obtaining information from the Service) are strictly prohibited on the Service,\\r\\n        unless you have received express written permission from winhalla.app's owner. As a limited exception, publicly\\r\\n        available search engines and similar Internet navigation tools (\\\"Search Engines\\\") may query the Services and\\r\\n        provide an index with links to the Service's Web pages, only to the extent such unlicensed \\\"fair use\\\" is allowed\\r\\n        by applicable copyright law. Search Engines are not permitted to query or search information protected by a\\r\\n        security verification system (\\\"captcha\\\") which limits access to human users.</p>\\r\\n\\r\\n    <p>Trying to harm in any way the service (including but not limited to : DDOS, XSS, CSRF) or buying items in the\\r\\n        <a href=\\\"/shop\\\">shop</a> with coins earned via hacking or without having enough coins is strictly prohibited</p>\\r\\n\\r\\n    <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use and enjoy the Service\\r\\n        for your individual, non-commercial, expressly\\r\\n        conditioned upon your compliance with these Terms. If we terminate your account, any license granted by us to\\r\\n        you in the Service ends immediately. Unless otherwise expressly authorized by us\\r\\n        in a signed written contract, you may not sell, copy, exchange, loan, reverse engineer, decompile, derive source\\r\\n        code from, translate, lease, grant a security interest in, transfer, publish, assign or otherwise distribute any\\r\\n        of the Service or any of winhalla.app's intellectual property, including any of our computer code </p>\\r\\n\\r\\n    <h2>Termination</h2>\\r\\n\\r\\n    <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason\\r\\n        whatsoever, including without limitation if you breach the Terms.</p>\\r\\n\\r\\n    <p>All provisions of the Terms which by their nature should survive termination shall survive termination,\\r\\n        including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of\\r\\n        liability.</p>\\r\\n    <h2>Limitation of Liability</h2>\\r\\n\\r\\n    <p>Subject to applicable law, under no circumstances, including negligence, will winhalla.app, its directors,\\r\\n        employees or agents be liable for any loss of profits, direct or indirect losses including punitive, exemplary,\\r\\n        special or consequential damages that result from the access to, use of, or the inability to use, the materials\\r\\n        in this website, even if winhalla.app or a winhalla.app authorised representative has been advised of the\\r\\n        possibility of such damages.</p>\\r\\n    <p>Winhalla works with ad revenue. If our advertisers fails to pay us, we won't be able to send any rewards to players.</p>\\r\\n    <h2>Governing Law</h2>\\r\\n\\r\\n    <p>These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict\\r\\n        of law provisions.</p>\\r\\n\\r\\n    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If\\r\\n        any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of\\r\\n        these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,\\r\\n        and supersede and replace any prior agreements we might have between us regarding the Service.\\r\\n        Changes\\r\\n\\r\\n    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is\\r\\n        material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a\\r\\n        material change will be determined at our sole discretion.</p>\\r\\n\\r\\n    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the\\r\\n        revised terms. If you do not agree to the new terms, please stop using the Service.</p>\\r\\n    <h2>Account</h2>\\r\\n    <p>In order to use the website, you will have to login with an already existing Steam account. By logging in with\\r\\n        your\\r\\n        Steam account, you agree that we will create your Account in the website, using the data Steam transmitted to\\r\\n        the\\r\\n        website by logging in (STEAMID64 and profile picture URI).</p>\\r\\n    <p></p>\\r\\n    <p>We may transmit this data to the Brawlhalla API (<a\\r\\n        href=\\\"https://api.brawlhalla.com\\\">https://api.brawlhalla.com</a>) in order to process your Brawlhalla\\r\\n        statistics.</p>\\r\\n\\r\\n    <h2>Coins and rewards</h2>\\r\\n    <p><strong>Coins. </strong> Coins in this website are fictional money, they can only be exchanged in our <a\\r\\n        href=\\\"/shop\\\" class=\\\"underline\\\">Shop</a>. This is a currency only limited to this website and selling this\\r\\n        currency and/or Accounts for real money is forbidden.</p>\\r\\n    <p>If we suspect you of cheating, abusing bugs or abnormal earning of Coins, we may terminate your Account and\\r\\n        your right to access the website, causing you to loose all data associated with your account, including but not\\r\\n        limited to Coins.</p>\\r\\n    <p><strong>Rewards. </strong> Rewards are given only if you have enough Coins AND if you have earned them without\\r\\n        cheating or abuse of any kind. After buying an item in our Store, you will receive an email in the e-mail\\r\\n        address you\\r\\n        specified when buying the item. The Service is not responsible if the e-mail address you entered is not correct\\r\\n        or is not yours.</p>\\r\\n\\r\\n    <h2>Contact Us</h2>\\r\\n\\r\\n    <p>If you have any questions about these Terms or about the website, please <a href=\\\"mailto:contact@winhalla.app\\\">contact\\r\\n        us</a>.</p>\\r\\n</div>\"],\"names\":[],\"mappings\":\"AAII,EAAE,cAAC,CAAC,AACA,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAAC,AACxC,CAAC,AAED,GAAG,cAAC,CAAC,AACD,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO;IAClB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,OAAO,MAAM,CAAC,AAClB,CAAC,AAED,CAAC,cAAC,CAAC,AACC,OAAO,SAAS,CAAC,AACrB,CAAC\"}"
};

const Terms = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$l);

	return `${($$result.head += `${($$result.title = `<title>Terms of use | Winhalla</title>`, "")}`, "")}

<div class="${"h-full lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-n1bhyj"}" style="${"font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:calc(99vw + 2px);"}"><p class="${"svelte-n1bhyj"}">Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the https://winhalla.app
        website (the &quot;Service&quot;) operated by winhalla.app (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).

        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
        These Terms apply to all visitors, users and others who access or use the Service.</p>
    <p class="${"svelte-n1bhyj"}">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
        terms then you may not access the Service.</p>
    <h2 id="${"3rdParty"}" class="${"svelte-n1bhyj"}">Links To Other Websites</h2>

    <p class="${"svelte-n1bhyj"}">Our Service may contain links to third-party websites or services that are not owned or controlled by
        winhalla.app.</p>

    <p class="${"svelte-n1bhyj"}">winhalla.app has no control over, and assumes no responsibility for, the content, privacy policies, or practices
        of any third party websites or services. You further acknowledge and agree that winhalla.app shall not be
        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in
        connection with use of or reliance on any such content, goods or services available on or through any such
        websites or services.</p>

    <p class="${"svelte-n1bhyj"}">We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or
        services that you visit.</p>
    <h2 class="${"svelte-n1bhyj"}">Limitations</h2>

    <p class="${"svelte-n1bhyj"}">Automated queries (including screen and database scraping, spiders, robots, crawlers and any other automated
        activity with the purpose of obtaining information from the Service) are strictly prohibited on the Service,
        unless you have received express written permission from winhalla.app&#39;s owner. As a limited exception, publicly
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
        of the Service or any of winhalla.app&#39;s intellectual property, including any of our computer code </p>

    <h2 class="${"svelte-n1bhyj"}">Termination</h2>

    <p class="${"svelte-n1bhyj"}">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason
        whatsoever, including without limitation if you breach the Terms.</p>

    <p class="${"svelte-n1bhyj"}">All provisions of the Terms which by their nature should survive termination shall survive termination,
        including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.</p>
    <h2 class="${"svelte-n1bhyj"}">Limitation of Liability</h2>

    <p class="${"svelte-n1bhyj"}">Subject to applicable law, under no circumstances, including negligence, will winhalla.app, its directors,
        employees or agents be liable for any loss of profits, direct or indirect losses including punitive, exemplary,
        special or consequential damages that result from the access to, use of, or the inability to use, the materials
        in this website, even if winhalla.app or a winhalla.app authorised representative has been advised of the
        possibility of such damages.</p>
    <p class="${"svelte-n1bhyj"}">Winhalla works with ad revenue. If our advertisers fails to pay us, we won&#39;t be able to send any rewards to players.</p>
    <h2 class="${"svelte-n1bhyj"}">Governing Law</h2>

    <p class="${"svelte-n1bhyj"}">These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict
        of law provisions.</p>

    <p class="${"svelte-n1bhyj"}">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If
        any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
        these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,
        and supersede and replace any prior agreements we might have between us regarding the Service.
        Changes

    </p><p class="${"svelte-n1bhyj"}">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
        material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a
        material change will be determined at our sole discretion.</p>

    <p class="${"svelte-n1bhyj"}">By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
        revised terms. If you do not agree to the new terms, please stop using the Service.</p>
    <h2 class="${"svelte-n1bhyj"}">Account</h2>
    <p class="${"svelte-n1bhyj"}">In order to use the website, you will have to login with an already existing Steam account. By logging in with
        your
        Steam account, you agree that we will create your Account in the website, using the data Steam transmitted to
        the
        website by logging in (STEAMID64 and profile picture URI).</p>
    <p class="${"svelte-n1bhyj"}"></p>
    <p class="${"svelte-n1bhyj"}">We may transmit this data to the Brawlhalla API (<a href="${"https://api.brawlhalla.com"}" class="${"svelte-n1bhyj"}">https://api.brawlhalla.com</a>) in order to process your Brawlhalla
        statistics.</p>

    <h2 class="${"svelte-n1bhyj"}">Coins and rewards</h2>
    <p class="${"svelte-n1bhyj"}"><strong>Coins. </strong> Coins in this website are fictional money, they can only be exchanged in our <a href="${"/shop"}" class="${"underline svelte-n1bhyj"}">Shop</a>. This is a currency only limited to this website and selling this
        currency and/or Accounts for real money is forbidden.</p>
    <p class="${"svelte-n1bhyj"}">If we suspect you of cheating, abusing bugs or abnormal earning of Coins, we may terminate your Account and
        your right to access the website, causing you to loose all data associated with your account, including but not
        limited to Coins.</p>
    <p class="${"svelte-n1bhyj"}"><strong>Rewards. </strong> Rewards are given only if you have enough Coins AND if you have earned them without
        cheating or abuse of any kind. After buying an item in our Store, you will receive an email in the e-mail
        address you
        specified when buying the item. The Service is not responsible if the e-mail address you entered is not correct
        or is not yours.</p>

    <h2 class="${"svelte-n1bhyj"}">Contact Us</h2>

    <p class="${"svelte-n1bhyj"}">If you have any questions about these Terms or about the website, please <a href="${"mailto:contact@winhalla.app"}" class="${"svelte-n1bhyj"}">contact
        us</a>.</p></div>`;
});

var component_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Terms
});

/* src\routes\test2.svelte generated by Svelte v3.31.0 */

const Test2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `<script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-q4vv9u"></script>`, "")}
<div><script data-playerPro="${"current"}">(function() {
        var s = document.querySelector("script[data-playerPro=\\"current\\"]");
        s.removeAttribute("data-playerPro");
        (playerPro = window.playerPro || []).push({ id: "7rYaA2Kc71uu", after: s });
    })();
    </script></div>`;
});

var component_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Test2
});

/* src\routes\link\[id].svelte generated by Svelte v3.31.0 */

async function preload$1({ params, query }) {
	return { link: params.id };
}

const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { link } = $$props;

	onMount(() => {
		document.cookie = cookie__default['default'].serialize("affiliateLinkId", link, {
			maxAge: 15552000,
			sameSite: "lax",
			path: "/"
		});

		goto("/login");
	});

	if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);

	return `${($$result.head += `${($$result.title = `<title>Redirecting...</title>`, "")}`, "")}
${validate_component(Loading, "Loading").$$render($$result, { data: "Redirecting..." }, {}, {})}`;
});

var component_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D,
    preload: preload$1
});

/* src\components\GameModeCards.svelte generated by Svelte v3.31.0 */

const css$m = {
	code: "p.svelte-dlig1f b{@apply text-primary font-normal;}.game-mode-card.svelte-dlig1f{width:20rem;height:33rem}.game-mode-image.svelte-dlig1f{width:100%;height:100%;object-position:18%}.game-mode-card.svelte-dlig1f::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.65) 0%,\r\n                rgba(23, 23, 26, 0.83),\r\n                rgba(23, 23, 26, 0.92) 75%,\r\n                rgba(23, 23, 26, 0.97) 100%\r\n        );@apply z-0;}.locked-gradient.svelte-dlig1f::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.75) 0%,\r\n                rgba(23, 23, 26, 0.77),\r\n                rgba(23, 23, 26, 0.78) 75%,\r\n                rgba(23, 23, 26, 0.80) 100%\r\n        );@apply z-20;}.lock.svelte-dlig1f{top:50%;left:50%;transform:translate(-50%, -50%);@apply z-30;}.game-mode-image.svelte-dlig1f{@apply object-cover block;}.game-mode-text-container.svelte-dlig1f{@apply absolute z-10 top-0 bottom-0 left-0 right-0;}h3.svelte-dlig1f{@apply absolute text-6xl top-24 left-0 right-0 text-shadow-link-hover;}.stats.svelte-dlig1f{@apply absolute bottom-8 leading-5;}.desc.svelte-dlig1f{font-size:1.7rem;@apply text-3xl;}.goal.svelte-dlig1f{color:#e2e2ea;@apply text-xl mt-8 px-10;}.duration.svelte-dlig1f{color:#c2c2c9;@apply text-base mt-4;}.desc.svelte-dlig1f b{font-size:1.95rem}.goal.svelte-dlig1f b{@apply text-default;}.duration.svelte-dlig1f b{@apply text-lg;}",
	map: "{\"version\":3,\"file\":\"GameModeCards.svelte\",\"sources\":[\"GameModeCards.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    export let gameModes;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    p :global(b) {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n\\r\\n    .game-mode-card {\\r\\n        width: 20rem;\\r\\n        height: 33rem;\\r\\n    }\\r\\n\\r\\n    .game-mode-image {\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        object-position: 18%;\\r\\n    }\\r\\n\\r\\n    .game-mode-card::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.65) 0%,\\r\\n                rgba(23, 23, 26, 0.83),\\r\\n                rgba(23, 23, 26, 0.92) 75%,\\r\\n                rgba(23, 23, 26, 0.97) 100%\\r\\n        );\\r\\n        @apply z-0;\\r\\n    }\\r\\n\\r\\n    .locked-gradient::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.75) 0%,\\r\\n                rgba(23, 23, 26, 0.77),\\r\\n                rgba(23, 23, 26, 0.78) 75%,\\r\\n                rgba(23, 23, 26, 0.80) 100%\\r\\n        );\\r\\n        @apply z-20;\\r\\n    }\\r\\n\\r\\n    .lock {\\r\\n        top: 50%;\\r\\n        left: 50%;\\r\\n        transform: translate(-50%, -50%);\\r\\n        @apply z-30;\\r\\n    }\\r\\n\\r\\n\\r\\n    .game-mode-image {\\r\\n        @apply object-cover block;\\r\\n    }\\r\\n\\r\\n    .game-mode-text-container {\\r\\n        @apply absolute z-10 top-0 bottom-0 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    h3 {\\r\\n        @apply absolute text-6xl top-24 left-0 right-0 text-shadow-link-hover;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute bottom-8 leading-5;\\r\\n    }\\r\\n\\r\\n    .desc {\\r\\n        font-size: 1.7rem;\\r\\n        @apply text-3xl;\\r\\n    }\\r\\n\\r\\n    .goal {\\r\\n        color: #e2e2ea;\\r\\n        @apply text-xl mt-8 px-10;\\r\\n    }\\r\\n\\r\\n    .duration {\\r\\n        color: #c2c2c9;\\r\\n        @apply text-base mt-4;\\r\\n    }\\r\\n\\r\\n    .desc :global(b) {\\r\\n        font-size: 1.95rem;\\r\\n    }\\r\\n\\r\\n    .goal :global(b) {\\r\\n        @apply text-default;\\r\\n    }\\r\\n\\r\\n    .duration :global(b) {\\r\\n        @apply text-lg;\\r\\n    }\\r\\n\\r\\n</style>\\r\\n\\r\\n{#each gameModes as gameMode,i}\\r\\n    {#if gameMode.available === true}\\r\\n        <a\\r\\n            class=\\\"game-mode-card block relative shadow-card border\\r\\n                        border-transparent hover:border-primary\\r\\n                        hover:shadow-card-hover mb-10 md:mb-0 md:mr-15 relative\\\"\\r\\n            class:lg:mr-8={i===0}\\r\\n            href=\\\"/play/{gameMode.name}\\\">\\r\\n\\r\\n            <div class=\\\"h-full\\\">\\r\\n                <img\\r\\n                        src=\\\"../assets/ModeBanners/{gameMode.name}.jpg\\\"\\r\\n                        alt={gameMode.name}\\r\\n                        class=\\\"game-mode-image object-cover block\\\" />\\r\\n                <div\\r\\n                        class=\\\"game-mode-text-container\\\">\\r\\n                    <h3\\r\\n                        class=\\\"\\\">\\r\\n                        {gameMode.displayName}\\r\\n                    </h3>\\r\\n                    <div class=\\\"stats\\\">\\r\\n                        <p class=\\\"desc\\\">\\r\\n                            {@html gameMode.description}\\r\\n                        </p>\\r\\n                        <p class=\\\"goal\\\">\\r\\n                            {@html gameMode.goal}\\r\\n                        </p>\\r\\n                        <p class=\\\"duration\\\">\\r\\n                            {@html gameMode.duration}\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </a>\\r\\n    {:else}\\r\\n        <div\\r\\n            class=\\\"game-mode-card block relative shadow-card border border-transparent lg:mr-15 mb-10 md:mb-0 md:mr-0 relative\\\"\\r\\n        >\\r\\n\\r\\n            <div class=\\\"h-full locked-gradient\\\">\\r\\n                <img\\r\\n                        src=\\\"../assets/ModeBanners/{gameMode.name}.jpg\\\"\\r\\n                        alt={gameMode.name}\\r\\n                        class=\\\"game-mode-image\\\" />\\r\\n\\r\\n                <div\\r\\n                        class=\\\"game-mode-text-container\\\">\\r\\n                    <h3\\r\\n                            class=\\\"\\\">\\r\\n                        {gameMode.displayName}\\r\\n                    </h3>\\r\\n                    <div class=\\\"stats\\\">\\r\\n                        <p class=\\\"desc\\\">\\r\\n                            {@html gameMode.description}\\r\\n                        </p>\\r\\n                        <p class=\\\"goal\\\">\\r\\n                            {@html gameMode.goal}\\r\\n                        </p>\\r\\n                        <p class=\\\"duration\\\">\\r\\n                            {@html gameMode.duration}\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n            {#if gameMode.available === \\\"maintenance\\\"}\\r\\n                <div class=\\\"absolute lock\\\">\\r\\n                    <svg class=\\\"fill-current text-disabled w-12 mx-auto\\\"\\r\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                         xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\" x=\\\"0px\\\" y=\\\"0px\\\"\\r\\n                         viewBox=\\\"0 0 479.554 479.554\\\" style=\\\"enable-background:new 0 0 479.554 479.554;\\\"\\r\\n                         xml:space=\\\"preserve\\\">\\r\\n                    <g>\\r\\n                        <path d=\\\"M324.782,277.035l-65.068,65.06l84.962,84.953c17.968,17.968,47.078,17.968,65.046,0\\r\\n                            c17.974-17.974,17.982-47.077,0.014-65.068L324.782,277.035z\\\" />\\r\\n                        <path d=\\\"M125.819,208.207l50.672,50.672l65.068-65.067l-50.664-50.666l61.271-61.279c5.032-5.031,5.032-13.2,0-18.24L240.83,52.299\\r\\n                            c-6.227-6.227-15.07-9.099-23.767-7.701l-97.945,15.7c-5.714,0.916-10.987,3.61-15.078,7.693l-4.333,4.341l-3.54-3.549\\r\\n                            c-5.031-5.031-13.2-5.031-18.232,0L51.45,95.27c-5.039,5.031-5.039,13.2,0,18.232l3.54,3.548L3.774,168.258\\r\\n                            c-5.031,5.031-5.031,13.2,0,18.232l62.771,62.771c5.031,5.031,13.2,5.031,18.232,0L125.819,208.207z\\\" />\\r\\n                        <path d=\\\"M467.096,113.758c-1.78-1.778-4.107-2.672-6.429-2.672c-2.322,0-4.651,0.894-6.429,2.672l-36.114,36.09\\r\\n                            c-3.168,3.184-7.331,4.767-11.484,4.767c-4.154,0-8.315-1.584-11.485-4.767l-26.423-26.431c-3.068-3.028-4.759-7.167-4.759-11.477\\r\\n                            s1.692-8.439,4.752-11.491l36.114-36.106c3.549-3.549,3.549-9.311,0-12.852c-8.237-8.229-19.132-12.461-30.103-12.461\\r\\n                            c-8.535,0-17.114,2.562-24.521,7.795l-19.622,13.86c-18.652,13.161-30.228,34.148-31.454,56.946l-2.322,43.405L90.653,367.213\\r\\n                            c-16.772,16.78-16.772,43.949,0,60.721c8.393,8.387,19.38,12.587,30.368,12.587c10.987,0,21.966-4.193,30.359-12.579\\r\\n                            l206.186-206.176l43.389-2.322c22.789-1.22,43.769-12.796,56.938-31.448l13.868-19.628\\r\\n                            C483.712,151.455,481.732,128.394,467.096,113.758z M123.149,413.453c-10.056,0-18.21-8.153-18.21-18.21\\r\\n                            c0-10.055,8.153-18.208,18.21-18.208c10.055,0,18.208,8.153,18.208,18.208C141.357,405.3,133.204,413.453,123.149,413.453z\\\" />\\r\\n                    </g>\\r\\n                </svg>\\r\\n                    <p class=\\\"mt-1 text-light\\\">Maintenance in progress</p>\\r\\n                </div>\\r\\n\\r\\n            {:else}\\r\\n                <div class=\\\"absolute lock\\\">\\r\\n                    <!--Locked icon-->\\r\\n                    <svg class=\\\"fill-current text-disabled w-12 mx-auto\\\" viewBox=\\\"0 0 20 24\\\"\\r\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                                d=\\\"m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z\\\" />\\r\\n                    </svg>\\r\\n\\r\\n                    <p class=\\\"mt-1 text-light\\\">Coming soon</p>\\r\\n                </div>\\r\\n            {/if}\\r\\n        </div>\\r\\n    {/if}\\r\\n{/each}\"],\"names\":[],\"mappings\":\"AAKI,eAAC,CAAC,AAAQ,CAAC,AAAE,CAAC,AACV,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,eAAe,cAAC,CAAC,AACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AAED,gBAAgB,cAAC,CAAC,AACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,GAAG,AACxB,CAAC,AAED,6BAAe,OAAO,AAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,CACD,OAAO,GAAG,CAAC,AACf,CAAC,AAED,8BAAgB,OAAO,AAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,CACD,OAAO,IAAI,CAAC,AAChB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,OAAO,IAAI,CAAC,AAChB,CAAC,AAGD,gBAAgB,cAAC,CAAC,AACd,OAAO,YAAY,CAAC,KAAK,CAAC,AAC9B,CAAC,AAED,yBAAyB,cAAC,CAAC,AACvB,OAAO,QAAQ,CAAC,IAAI,CAAC,KAAK,CAAC,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,AACvD,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,QAAQ,CAAC,QAAQ,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,sBAAsB,CAAC,AAC1E,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,QAAQ,CAAC,SAAS,CAAC,AACvC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,SAAS,CAAE,MAAM,CACjB,OAAO,QAAQ,CAAC,AACpB,CAAC,AAED,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,OAAO,OAAO,CAAC,IAAI,CAAC,KAAK,CAAC,AAC9B,CAAC,AAED,SAAS,cAAC,CAAC,AACP,KAAK,CAAE,OAAO,CACd,OAAO,SAAS,CAAC,IAAI,CAAC,AAC1B,CAAC,AAED,mBAAK,CAAC,AAAQ,CAAC,AAAE,CAAC,AACd,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,mBAAK,CAAC,AAAQ,CAAC,AAAE,CAAC,AACd,OAAO,YAAY,CAAC,AACxB,CAAC,AAED,uBAAS,CAAC,AAAQ,CAAC,AAAE,CAAC,AAClB,OAAO,OAAO,CAAC,AACnB,CAAC\"}"
};

const GameModeCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { gameModes } = $$props;
	if ($$props.gameModes === void 0 && $$bindings.gameModes && gameModes !== void 0) $$bindings.gameModes(gameModes);
	$$result.css.add(css$m);

	return `${each(gameModes, (gameMode, i) => `${gameMode.available === true
	? `<a class="${[
			"game-mode-card block relative shadow-card border\r\n                        border-transparent hover:border-primary\r\n                        hover:shadow-card-hover mb-10 md:mb-0 md:mr-15 relative svelte-dlig1f",
			i === 0 ? "lg:mr-8" : ""
		].join(" ").trim()}" href="${"/play/" + escape(gameMode.name)}"><div class="${"h-full"}"><img src="${"../assets/ModeBanners/" + escape(gameMode.name) + ".jpg"}"${add_attribute("alt", gameMode.name, 0)} class="${"game-mode-image object-cover block svelte-dlig1f"}">
                <div class="${"game-mode-text-container svelte-dlig1f"}"><h3 class="${" svelte-dlig1f"}">${escape(gameMode.displayName)}</h3>
                    <div class="${"stats svelte-dlig1f"}"><p class="${"desc svelte-dlig1f"}">${gameMode.description}</p>
                        <p class="${"goal svelte-dlig1f"}">${gameMode.goal}</p>
                        <p class="${"duration svelte-dlig1f"}">${gameMode.duration}
                        </p></div>
                </div></div>
        </a>`
	: `<div class="${"game-mode-card block relative shadow-card border border-transparent lg:mr-15 mb-10 md:mb-0 md:mr-0 relative svelte-dlig1f"}"><div class="${"h-full locked-gradient svelte-dlig1f"}"><img src="${"../assets/ModeBanners/" + escape(gameMode.name) + ".jpg"}"${add_attribute("alt", gameMode.name, 0)} class="${"game-mode-image svelte-dlig1f"}">

                <div class="${"game-mode-text-container svelte-dlig1f"}"><h3 class="${" svelte-dlig1f"}">${escape(gameMode.displayName)}</h3>
                    <div class="${"stats svelte-dlig1f"}"><p class="${"desc svelte-dlig1f"}">${gameMode.description}</p>
                        <p class="${"goal svelte-dlig1f"}">${gameMode.goal}</p>
                        <p class="${"duration svelte-dlig1f"}">${gameMode.duration}
                        </p></div>
                </div></div>
            ${gameMode.available === "maintenance"
		? `<div class="${"absolute lock svelte-dlig1f"}"><svg class="${"fill-current text-disabled w-12 mx-auto"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 479.554 479.554"}" style="${"enable-background:new 0 0 479.554 479.554;"}" xml:space="${"preserve"}"><g><path d="${"M324.782,277.035l-65.068,65.06l84.962,84.953c17.968,17.968,47.078,17.968,65.046,0\r\n                            c17.974-17.974,17.982-47.077,0.014-65.068L324.782,277.035z"}"></path><path d="${"M125.819,208.207l50.672,50.672l65.068-65.067l-50.664-50.666l61.271-61.279c5.032-5.031,5.032-13.2,0-18.24L240.83,52.299\r\n                            c-6.227-6.227-15.07-9.099-23.767-7.701l-97.945,15.7c-5.714,0.916-10.987,3.61-15.078,7.693l-4.333,4.341l-3.54-3.549\r\n                            c-5.031-5.031-13.2-5.031-18.232,0L51.45,95.27c-5.039,5.031-5.039,13.2,0,18.232l3.54,3.548L3.774,168.258\r\n                            c-5.031,5.031-5.031,13.2,0,18.232l62.771,62.771c5.031,5.031,13.2,5.031,18.232,0L125.819,208.207z"}"></path><path d="${"M467.096,113.758c-1.78-1.778-4.107-2.672-6.429-2.672c-2.322,0-4.651,0.894-6.429,2.672l-36.114,36.09\r\n                            c-3.168,3.184-7.331,4.767-11.484,4.767c-4.154,0-8.315-1.584-11.485-4.767l-26.423-26.431c-3.068-3.028-4.759-7.167-4.759-11.477\r\n                            s1.692-8.439,4.752-11.491l36.114-36.106c3.549-3.549,3.549-9.311,0-12.852c-8.237-8.229-19.132-12.461-30.103-12.461\r\n                            c-8.535,0-17.114,2.562-24.521,7.795l-19.622,13.86c-18.652,13.161-30.228,34.148-31.454,56.946l-2.322,43.405L90.653,367.213\r\n                            c-16.772,16.78-16.772,43.949,0,60.721c8.393,8.387,19.38,12.587,30.368,12.587c10.987,0,21.966-4.193,30.359-12.579\r\n                            l206.186-206.176l43.389-2.322c22.789-1.22,43.769-12.796,56.938-31.448l13.868-19.628\r\n                            C483.712,151.455,481.732,128.394,467.096,113.758z M123.149,413.453c-10.056,0-18.21-8.153-18.21-18.21\r\n                            c0-10.055,8.153-18.208,18.21-18.208c10.055,0,18.208,8.153,18.208,18.208C141.357,405.3,133.204,413.453,123.149,413.453z"}"></path></g></svg>
                    <p class="${"mt-1 text-light svelte-dlig1f"}">Maintenance in progress</p>
                </div>`
		: `<div class="${"absolute lock svelte-dlig1f"}">
                    <svg class="${"fill-current text-disabled w-12 mx-auto"}" viewBox="${"0 0 20 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z"}"></path></svg>

                    <p class="${"mt-1 text-light svelte-dlig1f"}">Coming soon</p>
                </div>`}
        </div>`}`)}`;
});

/* src\components\PlayAdButton.svelte generated by Svelte v3.31.0 */

const css$n = {
	code: "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');.button-green.svelte-15u3jwd{background-color:#3de488;@apply text-background;}button.svelte-15u3jwd:disabled{@apply bg-disabled text-white;;box-shadow:none;cursor:not-allowed}.FfaWatchAd.svelte-15u3jwd{padding-top:0.75rem;padding-bottom:0.75rem}.tooltip.svelte-15u3jwd::after{content:\"\";position:absolute;top:100%;right:46%;border-width:10px;border-style:solid;border-color:#fc1870 transparent transparent transparent}",
	map: "{\"version\":3,\"file\":\"PlayAdButton.svelte\",\"sources\":[\"PlayAdButton.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { counter } from \\\"./stores\\\";\\r\\n    import { fade } from \\\"svelte/transition\\\";\\r\\n\\r\\n    export let waitingAdAccept;\\r\\n    export let socket;\\r\\n    export let userPlayer;\\r\\n    export let id;\\r\\n    export let adError;\\r\\n    export let info;\\r\\n    export let finished;\\r\\n    export let page;\\r\\n    export let goal = \\\"earnMoreFFA\\\";\\r\\n    export let collect;\\r\\n    export let waitingAd;\\r\\n    export let data;\\r\\n    export let color = \\\"green\\\";\\r\\n    //TODO: reste une erreur cheloue \\\"userPlayer is undefined\\\"\\r\\n    if (goal === \\\"earnMoreQuests\\\") {\\r\\n        counter.subscribe(async (value) => {\\r\\n            userPlayer = await value.content;\\r\\n            userPlayer = userPlayer.user;\\r\\n        });\\r\\n\\r\\n    }\\r\\n    let started;\\r\\n    let videoSeen, noAd;\\r\\n    $: if (typeof videoSeen === \\\"string\\\") {\\r\\n        console.log(videoSeen);\\r\\n        if (videoSeen === \\\"noAd\\\") {\\r\\n            noAd = \\\"No ad is available for now, please try again later.\\\";\\r\\n            setTimeout(() => noAd = undefined, 2500);\\r\\n        }\\r\\n        if (videoSeen === \\\"error\\\") {\\r\\n            noAd = \\\"An error occurred, please contact us if the error persists\\\";\\r\\n            setTimeout(() => noAd = undefined, 2500);\\r\\n        }\\r\\n        try {\\r\\n            socket.emit(\\\"advideo\\\", videoSeen === \\\"started\\\" ? {\\r\\n                state: \\\"started\\\",\\r\\n                steamId: userPlayer.steamId,\\r\\n                room: id,\\r\\n                goal\\r\\n            } : { state: videoSeen, steamId: userPlayer.steamId });\\r\\n        } catch (e) {\\r\\n            console.log(e);\\r\\n        }\\r\\n    }\\r\\n    socket.on(\\\"advideo\\\", (e) => {\\r\\n        if (!started) return;\\r\\n        if (e.code === \\\"error\\\") {\\r\\n            console.log(e.message);\\r\\n            setTimeout(() => adError = e.message, 500);\\r\\n            finished = true;\\r\\n            started = false;\\r\\n        } else if (e.code === \\\"success\\\" && goal === \\\"earnMoreFFA\\\") {\\r\\n            setTimeout(() => info = e.message, 1000);\\r\\n            userPlayer.adsWatched++;\\r\\n            //userPlayer.multiplier += userPlayer.adsWatched === 1 ? 100 : 200;\\r\\n            userPlayer.multiplier +=  100;\\r\\n\\r\\n            finished = true;\\r\\n            started = false;\\r\\n        } else if (e.code === \\\"success\\\" && goal === \\\"earnMoreQuests\\\") {\\r\\n            setTimeout(() => info = e.message, 1000);\\r\\n            collect(waitingAd.type, waitingAd.index, false);\\r\\n        }\\r\\n        setTimeout(() => {\\r\\n            info = undefined;\\r\\n            adError = undefined;\\r\\n        }, 5000);\\r\\n    });\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');\\r\\n\\r\\n    .button-green {\\r\\n        background-color: #3de488;\\r\\n        @apply text-background;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled text-white;\\r\\n        box-shadow: none;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .FfaWatchAd {\\r\\n        padding-top: 0.75rem;\\r\\n        padding-bottom: 0.75rem;\\r\\n    }\\r\\n\\r\\n    .tooltip::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 100%;\\r\\n        right: 46%;\\r\\n        border-width: 10px;\\r\\n        border-style: solid;\\r\\n        border-color: #fc1870 transparent transparent transparent;\\r\\n    }\\r\\n</style>\\r\\n{#if goal === \\\"earnMoreFFA\\\"}\\r\\n    <button disabled={userPlayer.adsWatched >= 8} class=\\\"button button-brand lg:mr-8 mt-2\\r\\n                            lg:mt-0 mb-5\\r\\n                            lg:mb-0  text-background\\\" class:button-green={color===\\\"green\\\"}\\r\\n            class:FfaWatchAd={page === \\\"FfaWatchAd\\\"}\\r\\n            style=\\\"\\\"\\r\\n            onclick=\\\"playAd()\\\"\\r\\n            on:click={() => started = true}>{userPlayer.adsWatched < 8 ? \\\"Play ad\\\" : \\\"Maximum ads reached\\\"}\\r\\n    </button>\\r\\n{:else}\\r\\n    <button class=\\\"button button-brand w-38\\\" class:button-green={color===\\\"green\\\"}\\r\\n            class:FfaWatchAd={page === \\\"FfaWatchAd\\\"}\\r\\n            style=\\\"\\\"\\r\\n            onclick=\\\"playAd()\\\"\\r\\n            on:click={() => started = true}>Play Ad\\r\\n    </button>\\r\\n{/if}\\r\\n\\r\\n{#if noAd}\\r\\n    <span\\r\\n        class=\\\"tooltip absolute text-lg top-30 lg:top-3 lg:right-46 lg:left-auto right-4 left-4 px-6 py-2 bg-legendary text-background rounded text-left flex items-center justify-center\\\"\\r\\n        style=\\\"font-family: 'Roboto', sans-serif;z-index: 60\\\"\\r\\n\\r\\n        transition:fade>{noAd}\\r\\n    </span>\\r\\n{/if}\\r\\n<input hidden bind:value={videoSeen} id={started ? 'transfer' : Math.random() * 1000} />\\r\\n\\r\\n<div>\\r\\n    <script data-playerPro=\\\"current\\\">\\r\\n        function playAd() {\\r\\n            const init = (api) => {\\r\\n                if (api) {\\r\\n                    document.getElementById(\\\"transfer\\\").value = undefined;\\r\\n                    api.on(\\\"AdVideoStart\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = \\\"started\\\";\\r\\n                        document.getElementById(\\\"transfer\\\").dispatchEvent(new CustomEvent(\\\"input\\\"));\\r\\n                        if (document.location.hostname === \\\"winhalla.app\\\") api.setAdVolume(1);\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoComplete\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = \\\"finished\\\";\\r\\n                        document.getElementById(\\\"transfer\\\").dispatchEvent(new CustomEvent(\\\"input\\\"));\\r\\n                    });\\r\\n                    api.on(\\\"AdSkipped\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = \\\"finished\\\";\\r\\n                        document.getElementById(\\\"transfer\\\").dispatchEvent(new CustomEvent(\\\"input\\\"));\\r\\n                    });\\r\\n                    api.on(\\\"AdError\\\", function(message, error) {\\r\\n                        console.log(message, message?.g, message?.g?.errorCode);\\r\\n                        if (message?.g?.errorCode === 1009) {\\r\\n                            document.getElementById(\\\"transfer\\\").value = \\\"noAd\\\";\\r\\n                            document.getElementById(\\\"transfer\\\").dispatchEvent(new CustomEvent(\\\"input\\\"));\\r\\n                            return;\\r\\n                        }\\r\\n                        document.getElementById(\\\"transfer\\\").value = \\\"error\\\";\\r\\n                        document.getElementById(\\\"transfer\\\").dispatchEvent(new CustomEvent(\\\"input\\\"));\\r\\n                    });\\r\\n                } else {\\r\\n                    console.log(\\\"blank\\\");\\r\\n                }\\r\\n            };\\r\\n            var s = document.querySelector(\\\"script[data-playerPro=\\\\\\\"current\\\\\\\"]\\\");\\r\\n            //s.removeAttribute(\\\"data-playerPro\\\");\\r\\n            (playerPro = window.playerPro || []).push({\\r\\n                id: \\\"CIUTML6hCY6U\\\",\\r\\n                after: s,\\r\\n                init: init\\r\\n            });\\r\\n        }\\r\\n    </script>\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA4EI,QAAQ,IAAI,uEAAuE,CAAC,CAAC,AAErF,aAAa,eAAC,CAAC,AACX,gBAAgB,CAAE,OAAO,CACzB,OAAO,eAAe,CAAC,AAC3B,CAAC,AAED,qBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,UAAU,CAAC,CAC9B,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,WAAW,AACvB,CAAC,AAED,WAAW,eAAC,CAAC,AACT,WAAW,CAAE,OAAO,CACpB,cAAc,CAAE,OAAO,AAC3B,CAAC,AAED,uBAAQ,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,CAClB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC7D,CAAC\"}"
};

const PlayAdButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { waitingAdAccept } = $$props;
	let { socket } = $$props;
	let { userPlayer } = $$props;
	let { id } = $$props;
	let { adError } = $$props;
	let { info } = $$props;
	let { finished } = $$props;
	let { page } = $$props;
	let { goal = "earnMoreFFA" } = $$props;
	let { collect } = $$props;
	let { waitingAd } = $$props;
	let { data } = $$props;
	let { color = "green" } = $$props;

	//TODO: reste une erreur cheloue "userPlayer is undefined"
	if (goal === "earnMoreQuests") {
		counter.subscribe(async value => {
			userPlayer = await value.content;
			userPlayer = userPlayer.user;
		});
	}
	let videoSeen;

	socket.on("advideo", e => {
		return;
	});

	if ($$props.waitingAdAccept === void 0 && $$bindings.waitingAdAccept && waitingAdAccept !== void 0) $$bindings.waitingAdAccept(waitingAdAccept);
	if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0) $$bindings.socket(socket);
	if ($$props.userPlayer === void 0 && $$bindings.userPlayer && userPlayer !== void 0) $$bindings.userPlayer(userPlayer);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.adError === void 0 && $$bindings.adError && adError !== void 0) $$bindings.adError(adError);
	if ($$props.info === void 0 && $$bindings.info && info !== void 0) $$bindings.info(info);
	if ($$props.finished === void 0 && $$bindings.finished && finished !== void 0) $$bindings.finished(finished);
	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	if ($$props.goal === void 0 && $$bindings.goal && goal !== void 0) $$bindings.goal(goal);
	if ($$props.collect === void 0 && $$bindings.collect && collect !== void 0) $$bindings.collect(collect);
	if ($$props.waitingAd === void 0 && $$bindings.waitingAd && waitingAd !== void 0) $$bindings.waitingAd(waitingAd);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	$$result.css.add(css$n);

	return `${goal === "earnMoreFFA"
	? `<button ${userPlayer.adsWatched >= 8 ? "disabled" : ""} class="${[
			"button button-brand lg:mr-8 mt-2\r\n                            lg:mt-0 mb-5\r\n                            lg:mb-0  text-background svelte-15u3jwd",
			(color === "green" ? "button-green" : "") + " " + (page === "FfaWatchAd" ? "FfaWatchAd" : "")
		].join(" ").trim()}" style="${""}" onclick="${"playAd()"}">${escape(userPlayer.adsWatched < 8
		? "Play ad"
		: "Maximum ads reached")}</button>`
	: `<button class="${[
			"button button-brand w-38 svelte-15u3jwd",
			(color === "green" ? "button-green" : "") + " " + (page === "FfaWatchAd" ? "FfaWatchAd" : "")
		].join(" ").trim()}" style="${""}" onclick="${"playAd()"}">Play Ad
    </button>`}

${ ``}
<input hidden${add_attribute("id",  Math.random() * 1000, 0)}${add_attribute("value", videoSeen, 1)}>

<div><script data-playerPro="${"current"}">function playAd() {
            const init = (api) => {
                if (api) {
                    document.getElementById("transfer").value = undefined;
                    api.on("AdVideoStart", function() {
                        document.getElementById("transfer").value = "started";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                        if (document.location.hostname === "winhalla.app") api.setAdVolume(1);
                    });
                    api.on("AdVideoComplete", function() {
                        document.getElementById("transfer").value = "finished";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdSkipped", function() {
                        document.getElementById("transfer").value = "finished";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                    api.on("AdError", function(message, error) {
                        console.log(message, message?.g, message?.g?.errorCode);
                        if (message?.g?.errorCode === 1009) {
                            document.getElementById("transfer").value = "noAd";
                            document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                            return;
                        }
                        document.getElementById("transfer").value = "error";
                        document.getElementById("transfer").dispatchEvent(new CustomEvent("input"));
                    });
                } else {
                    console.log("blank");
                }
            };
            var s = document.querySelector("script[data-playerPro=\\"current\\"]");
            //s.removeAttribute("data-playerPro");
            (playerPro = window.playerPro || []).push({
                id: "CIUTML6hCY6U",
                after: s,
                init: init
            });
        }
    </script></div>`;
});

/* src\components\GuideContainer.svelte generated by Svelte v3.31.0 */

const GuideContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { title } = $$props;
	let { previous = true } = $$props;
	let { scroll } = $$props;
	let { scrollMd } = $$props;
	let { scrollLg } = $$props;

	onMount(() => {
		if (document.body.scrollWidth < 624) {
			window.scrollTo({ top: scroll, behavior: "smooth" });
		} else if (document.body.scrollWidth < 1234) {
			window.scrollTo({ top: scrollMd, behavior: "smooth" });
		} else if (document.body.scrollHeight > 1500) {
			window.scrollTo({ top: scrollLg, behavior: "smooth" });
		}
	});

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.previous === void 0 && $$bindings.previous && previous !== void 0) $$bindings.previous(previous);
	if ($$props.scroll === void 0 && $$bindings.scroll && scroll !== void 0) $$bindings.scroll(scroll);
	if ($$props.scrollMd === void 0 && $$bindings.scrollMd && scrollMd !== void 0) $$bindings.scrollMd(scrollMd);
	if ($$props.scrollLg === void 0 && $$bindings.scrollLg && scrollLg !== void 0) $$bindings.scrollLg(scrollLg);

	return `

<div class="${"px-9 pt-8 pb-6 bg-background border-2 border-primary rounded-xl  max-w-max"}"><h3 class="${"text-4xl md:text-5xl"}">${escape(title)}</h3>
    <div class="${"mt-5"}">${slots.default ? slots.default({}) : ``}</div>
    <div class="${"flex justify-between  w-full"}"><div>${previous
	? `<button class="${"mt-8  button button-brand-alternative"}">Previous
                </button>`
	: ``}</div>


        <button class="${"mt-8  button button-brand"}">Next
        </button></div></div>`;
});

/* src\components\Quests.svelte generated by Svelte v3.31.0 */

const css$o = {
	code: "b.svelte-1sdlpcn.svelte-1sdlpcn{@apply font-normal text-primary;}.quest.svelte-1sdlpcn.svelte-1sdlpcn{border-radius:10px;@apply relative overflow-hidden w-full my-4;}.quest-infos.svelte-1sdlpcn.svelte-1sdlpcn{@apply flex justify-between px-7 py-6;}.progress-container.svelte-1sdlpcn.svelte-1sdlpcn{@apply flex items-center;}svg.svelte-1sdlpcn.svelte-1sdlpcn{margin-bottom:0.15rem}.checkbox-active.svelte-1sdlpcn.svelte-1sdlpcn{width:1.1rem}.quest.svelte-1sdlpcn:hover span.svelte-1sdlpcn{left:0}span.svelte-1sdlpcn.svelte-1sdlpcn{left:-100%;transition:left 0.28s ease-in-out;width:100%;@apply absolute h-full top-0 bg-background flex items-center justify-center text-center;}.tip-text.svelte-1sdlpcn.svelte-1sdlpcn{padding-top:0.15rem}.text-light.svelte-1sdlpcn.svelte-1sdlpcn{color:#e2e2ea}.button-alternative.svelte-1sdlpcn.svelte-1sdlpcn{display:inline-block;padding:calc(0.5rem - 1px) calc(2.25rem - 1px);border-radius:0.125rem;border-width:1px;border-color:#3d72e4;font-size:1.25rem}",
	map: "{\"version\":3,\"file\":\"Quests.svelte\",\"sources\":[\"Quests.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import RefreshButton from \\\"./RefreshButton.svelte\\\";\\r\\n    import { counter } from \\\"./stores\\\";\\r\\n    import { io } from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import PlayAdButton from \\\"./PlayAdButton.svelte\\\";\\r\\n    import CoinIcon from \\\"./CoinIcon.svelte\\\";\\r\\n    import { fade, fly } from \\\"svelte/transition\\\";\\r\\n    import { serialize } from \\\"cookie\\\";\\r\\n    import { getCookie } from \\\"../utils/getCookie\\\";\\r\\n    import Infos from \\\"./Infos.svelte\\\";\\r\\n    import GuideContainer from \\\"./GuideContainer.svelte\\\";\\r\\n\\r\\n    let countDown = [{}, {}];\\r\\n    export let data;\\r\\n    let error;\\r\\n    let socket;\\r\\n    let adError;\\r\\n    let info;\\r\\n    let waitingAd;\\r\\n    let waitingAdAccept = false;\\r\\n    let interval;\\r\\n    let questsAlertAlreadyShown;\\r\\n    let isAlertNoRefreshOpen;\\r\\n\\r\\n    export let currentGuideVisible;\\r\\n\\r\\n    const calculateRarity = (reward, daily) => {\\r\\n        if (daily) {\\r\\n            if (reward === 10) return \\\"primary\\\";\\r\\n            if (reward === 20) return \\\"epic\\\";\\r\\n            if (reward === 30) return \\\"legendary\\\";\\r\\n        } else {\\r\\n            if (reward === 50) return \\\"primary\\\";\\r\\n            if (reward === 100) return \\\"epic\\\";\\r\\n            if (reward === 200) return \\\"legendary\\\";\\r\\n        }\\r\\n    };\\r\\n\\r\\n    const calculateProgressBarWidth = (progress, goal) => {\\r\\n        const calculatedProgress = (progress / goal) * 100;\\r\\n        if (calculatedProgress < 0) {\\r\\n            return 2;\\r\\n        } else {\\r\\n            return calculatedProgress;\\r\\n        }\\r\\n    };\\r\\n\\r\\n    function startTimer(duration, i) {\\r\\n        let timer = duration,\\r\\n            days,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n\\r\\n        function calculateTime() {\\r\\n            if (--timer < 0) {\\r\\n                countDown.finished = true;\\r\\n                countDown[i].timer = \\\"Refresh for new quests\\\";\\r\\n                return;\\r\\n            }\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n            days = Math.floor(hours / 24);\\r\\n\\r\\n            hours = hours - days * 24;\\r\\n            hours = hours < 10 ? \\\"0\\\" + hours : hours;\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n            let errDetected;\\r\\n            let vars = [hours, minutes, days, seconds];\\r\\n            for (let i = 0; i < 4; i++) {\\r\\n                if (vars[i] == undefined || isNaN(vars[i])) errDetected = true;\\r\\n            }\\r\\n            if (errDetected) {\\r\\n                countDown[i].timer = \\\"Refreshing...\\\";\\r\\n                return countDown[i].speed = \\\"legendary\\\";\\r\\n            }\\r\\n            countDown[i].timer =\\r\\n                days != 0\\r\\n                    ? days + \\\":\\\" + hours + \\\":\\\" + minutes + \\\":\\\" + seconds\\r\\n                    : hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n            countDown[i].speed =\\r\\n                hours >= 6 || days > 0\\r\\n                    ? \\\"primary\\\"\\r\\n                    : hours >= 1\\r\\n                    ? \\\"accent\\\"\\r\\n                    : \\\"legendary\\\";\\r\\n        }\\r\\n\\r\\n        calculateTime();\\r\\n        return setInterval(calculateTime, 1000);\\r\\n    }\\r\\n\\r\\n    let countDownIds = [];\\r\\n\\r\\n    function initTimers() {\\r\\n        countDownIds.forEach(e => {\\r\\n            clearInterval(e);\\r\\n        });\\r\\n        try {\\r\\n            for (let i = 0; i < 2; i++) {\\r\\n                let d = i === 0 ? data.lastDaily : data.lastWeekly;\\r\\n                const endsIn = ((i === 0 ? d + 3600000 * 24 : d + 3600000 * 168) - Date.now()) / 1000;\\r\\n                if (endsIn < 1) {\\r\\n                    countDown[i] = \\\"\\\";\\r\\n                } else {\\r\\n                    countDownIds.push(startTimer(endsIn, i));\\r\\n                }\\r\\n            }\\r\\n        } catch (e) {\\r\\n            error = e;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    initTimers();\\r\\n\\r\\n    function calculateOrder(object) {\\r\\n        //Reorder quests by rarety\\r\\n        if (object.dailyQuests) {\\r\\n            object.dailyQuests.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.finished && object.finished.daily) {\\r\\n            object.finished.daily.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.weeklyQuests) {\\r\\n            object.weeklyQuests.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n\\r\\n        if (object.finished && object.finished.weekly) {\\r\\n            object.finished.weekly.sort((b, a) => {\\r\\n                return a.reward - b.reward;\\r\\n            });\\r\\n        }\\r\\n    }\\r\\n\\r\\n    data = data;\\r\\n    calculateOrder(data);\\r\\n\\r\\n    let isRefreshingQuests = false;\\r\\n\\r\\n    async function handleRefresh() {\\r\\n        try {\\r\\n            let lastData = JSON.stringify(data);\\r\\n            isRefreshingQuests = true;\\r\\n            const refreshedData = await callApi(\\\"get\\\", \\\"solo\\\");\\r\\n            calculateOrder(refreshedData.solo);\\r\\n            data = refreshedData.solo;\\r\\n\\r\\n            let questsAlertCookie = getCookie(\\\"questsAlertState\\\");\\r\\n            if (lastData === JSON.stringify(data) && questsAlertCookie !== \\\"disabled\\\" && !questsAlertAlreadyShown) {\\r\\n                isAlertNoRefreshOpen = true;\\r\\n                questsAlertAlreadyShown = true;\\r\\n            }\\r\\n\\r\\n            initTimers();\\r\\n            isRefreshingQuests = false;\\r\\n        } catch (e) {\\r\\n            isRefreshingQuests = false;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    function denyAd() {\\r\\n        collect(waitingAd.type, waitingAd.index, false);\\r\\n    }\\r\\n\\r\\n    async function collect(type, id, possibleAd) {\\r\\n        /*if (possibleAd) {\\r\\n            if (!socket) socket = io(apiUrl);\\r\\n            waitingAdAccept = true;\\r\\n            waitingAd = { type, index: id };\\r\\n        } else {*/\\r\\n            await callApi(\\\"post\\\", `solo/collect?type=${type}&id=${id}`);\\r\\n            waitingAd = undefined;\\r\\n            waitingAdAccept = undefined;\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n            data.collected[type].push(...data.finished[type].splice(data.finished[type].findIndex(e => e.id === id), 1));\\r\\n            data = data;\\r\\n        //}\\r\\n    }\\r\\n\\r\\n    function deactivateAlert() {\\r\\n        isAlertNoRefreshOpen = false;\\r\\n        document.cookie = serialize(\\\"questsAlertState\\\", \\\"disabled\\\", {\\r\\n            maxAge: 15552000,\\r\\n            sameSite: \\\"lax\\\",\\r\\n            path: \\\"/\\\"\\r\\n        });\\r\\n\\r\\n        isAlertNoRefreshOpen = false;\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply font-normal text-primary;\\r\\n    }\\r\\n\\r\\n    .quest {\\r\\n        border-radius: 10px;\\r\\n        @apply relative overflow-hidden w-full my-4;\\r\\n    }\\r\\n\\r\\n    .quest-infos {\\r\\n        @apply flex justify-between px-7 py-6;\\r\\n    }\\r\\n\\r\\n    .progress-container {\\r\\n        @apply flex items-center;\\r\\n    }\\r\\n\\r\\n    svg {\\r\\n        margin-bottom: 0.15rem;\\r\\n    }\\r\\n\\r\\n    .checkbox-active {\\r\\n        width: 1.1rem;\\r\\n    }\\r\\n\\r\\n    .quest:hover span {\\r\\n        left: 0;\\r\\n    }\\r\\n\\r\\n    span {\\r\\n        left: -100%;\\r\\n        transition: left 0.28s ease-in-out;\\r\\n        width: 100%;\\r\\n        @apply absolute h-full top-0 bg-background flex items-center justify-center text-center;\\r\\n    }\\r\\n\\r\\n    .tip-text {\\r\\n        padding-top: 0.15rem;\\r\\n    }\\r\\n\\r\\n    .text-light {\\r\\n        color: #e2e2ea;\\r\\n    }\\r\\n\\r\\n    .button-alternative {\\r\\n        display: inline-block;\\r\\n        padding: calc(0.5rem - 1px) calc(2.25rem - 1px);\\r\\n        border-radius: 0.125rem;\\r\\n        border-width: 1px;\\r\\n        border-color: #3d72e4;\\r\\n        font-size: 1.25rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<!--TODO: Afficher reward des quêtes sur mobile-->\\r\\n<svelte:head>\\r\\n    <!--Video ads-->\\r\\n    {#if waitingAd}\\r\\n        <script async src=\\\"https://serving.stat-rock.com/player.js\\\"></script>\\r\\n    {/if}\\r\\n</svelte:head>\\r\\n\\r\\n<div>\\r\\n    {#if currentGuideVisible === \\\"quests\\\"}\\r\\n        <div class=\\\"absolute  mx-4 md:mx-0  bottom-56 md:right-8 md:bottom-4 lg:right-98 lg:top-18  2x:-bottom-12 2xl:right-32  z-30\\\">\\r\\n            <GuideContainer title=\\\"Quests\\\" scroll=\\\"{1500}\\\" scrollMd={600}>\\r\\n                <div>\\r\\n                    <p class=\\\"text-2xl md:text-3xl\\\"><b>Complete</b> these quests to <b>earn coins</b>!</p>\\r\\n                    <p class=\\\"text-2xl md:text-2xl mt-1\\\">Quests have <b>3</b> rarity: <b>Normal</b>, <b style=\\\"color: #ee38ff\\\">Epic</b>, and <b style=\\\"color: #fc1870\\\">Legendary</b></p>\\r\\n                    <p class=\\\"mt-2 text-default text-mid-light italic\\\">Tip: hover or click on a quest to view the reward ;)</p>\\r\\n                </div>\\r\\n            </GuideContainer>\\r\\n        </div>\\r\\n\\r\\n    {/if}\\r\\n\\r\\n    {#if waitingAdAccept && socket }\\r\\n        <div\\r\\n            class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center\\\"\\r\\n            style=\\\"z-index: 100\\\"\\r\\n            in:fade={{duration: 200}}\\r\\n            out:fade={{duration: 350}}>\\r\\n            <div\\r\\n                class=\\\"mx-5 my-1 md:mx-0  rounded-lg   px-8 py-8 md:p-12 pb-8  z-30 border-primary border-2 bg-background text-center    max-w-xl   overflow-y-scroll md:overflow-y-auto\\\"\\r\\n                transition:fly={{ y: 300, duration: 350 }}>\\r\\n                <h2 class=\\\" text-6xl \\\">MULTIPLY YOUR REWARDS</h2>\\r\\n                <p class=\\\"mt-8  mx-1    text-3xl\\\">Want to obtain a <b>x2 boost</b> on the\\r\\n                    <b>coins</b>\\r\\n                    you\\r\\n                    will\\r\\n                    <b>earn</b> on this quest?</p>\\r\\n                <p class=\\\"text-2xl mt-3 text-mid-light italic\\\">Watch a short video by clicking the button below!</p>\\r\\n\\r\\n                <div class=\\\"mt-6 md:mt-8  md:flex justify-center\\\">\\r\\n                    <PlayAdButton socket={socket} bind:data={data} bind:adError={adError}\\r\\n                                  bind:info={info} collect={collect} goal=\\\"earnMoreQuests\\\" color=\\\"green\\\"\\r\\n                                  bind:waitingAd={waitingAd} bind:waitingAdAccept={waitingAdAccept} />\\r\\n                    <button on:click={()=>denyAd()}\\r\\n                            class=\\\"w-38 mt-4 md:mt-0 md:ml-4    button button-brand-alternative \\\">No\\r\\n                        thanks\\r\\n                    </button>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    {/if}\\r\\n    {#if error}\\r\\n        <p class=\\\"text-legendary w-full\\\">An error has been detected ,quests might appear\\r\\n            weirdly. </p>\\r\\n        <p class=\\\"text-xl\\\" style=\\\"color: #666666\\\"><b class=\\\"font-normal\\\" style=\\\"color: #aaaaaa\\\">Details:</b> {error}</p>\\r\\n    {/if}\\r\\n    <div class=\\\"container md:flex mt-7 md:mt-20 lg:mt-7 w-auto\\\">\\r\\n\\r\\n\\r\\n        <div\\r\\n            class=\\\"ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8\\\">\\r\\n            <div class=\\\"\\\">\\r\\n                <h2 class=\\\"text-6xl text-center lg:text-left\\\">Daily Quests</h2>\\r\\n                <p\\r\\n                    class=\\\"text-{countDown[0].speed} text-center lg:text-left text-3xl leading-none\\\"\\r\\n                    class:text-xl={countDown[0].finished}>\\r\\n                    {#if countDown[0].timer} {countDown[0].timer} {/if}\\r\\n                </p>\\r\\n            </div>\\r\\n            <div class=\\\"quests-container mt-1\\\">\\r\\n                {#if data.finished && data.finished.daily}\\r\\n                    <div class=\\\"pb-1 block\\\">\\r\\n                        {#each data.finished.daily as quest, i}\\r\\n                            <button\\r\\n                                on:click={() => collect('daily', quest.id, true)}\\r\\n                                class=\\\"card quest finished border-2 border-{calculateRarity(quest.reward, true)}\\r\\n                                max-w-sm mx-auto lg:mx-0 block\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span>Click to collect</span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current checkbox-active\\r\\n                                            text-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                            viewBox=\\\"0 0 27 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Click to collect\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"line-through\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                            </button>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.dailyQuests}\\r\\n                    <div>\\r\\n                        {#each data.dailyQuests as quest}\\r\\n                            <div class=\\\"relative card quest max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span\\r\\n                                        class=\\\"text-3xl text-{calculateRarity(quest.reward, true)}\\\">\\r\\n                                        {quest.reward}\\r\\n                                        <div class=\\\"w-9 ml-2 mt-1\\\"\\r\\n                                             style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem\\\">\\r\\n                                            <CoinIcon />\\r\\n                                        </div>\\r\\n                                    </span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current w-4 text-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                            viewBox=\\\"0 0 25 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            {quest.progress}/{quest.goal}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                    <p class=\\\"\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                                <div\\r\\n                                    class=\\\"absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, true)}\\\"\\r\\n                                    style=\\\"width:{calculateProgressBarWidth(quest.progress, quest.goal)}%\\\"></div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.collected && data.collected.daily}\\r\\n                    <div class=\\\"pt-5\\\">\\r\\n                        {#each data.collected.daily as quest}\\r\\n                            <div\\r\\n                                class=\\\"card quest text-disabled italic max-w-sm\\r\\n                                mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <p class=\\\"mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Collected\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div\\r\\n            class=\\\"ml-5 mr-5 mt-12 md:ml-5 md:mr-0\\r\\n            md:mt-0\\\">\\r\\n            <div class=\\\"\\\">\\r\\n                <h2 class=\\\"text-6xl text-center lg:text-left\\\">Weekly Quests</h2>\\r\\n                <p\\r\\n                    class=\\\"text-{countDown[1].speed} text-center lg:text-left text-3xl leading-none\\\"\\r\\n                    class:text-xl={countDown[1].finished}>\\r\\n                    {#if countDown[1].timer} {countDown[1].timer} {/if}\\r\\n                </p>\\r\\n            </div>\\r\\n            <div class=\\\"quests-container mt-1\\\">\\r\\n                {#if data.finished && data.finished.weekly}\\r\\n                    <div class=\\\"pb-1 block\\\">\\r\\n                        {#each data.finished.weekly as quest, i}\\r\\n                            <button\\r\\n                                on:click={() => collect('weekly', quest.id, true)}\\r\\n                                class=\\\"card quest finished border-2 border-{calculateRarity(quest.reward, false)}\\r\\n                                max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span>Click to collect</span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current checkbox-active\\r\\n                                            text-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                            viewBox=\\\"0 0 27 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\\r\\n                                                1.807-1.807 5.422 5.422\\r\\n                                                13.68-13.68 1.811 1.803-15.491\\r\\n                                                15.491z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Click to collect\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </button>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n\\r\\n                {#if data.weeklyQuests}\\r\\n                    <div>\\r\\n                        {#each data.weeklyQuests as quest}\\r\\n                            <div class=\\\"relative card quest max-w-sm mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <span class=\\\"text-3xl text-{calculateRarity(quest.reward, false)}\\\">\\r\\n                                        {quest.reward}\\r\\n                                        <div class=\\\"w-9 ml-2 mt-1\\\"\\r\\n                                             style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem\\\">\\r\\n                                            <CoinIcon />\\r\\n                                        </div>\\r\\n                                    </span>\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <svg\\r\\n                                            class=\\\"fill-current w-4 text-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                            viewBox=\\\"0 0 25 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m24\\r\\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z\\\" />\\r\\n                                        </svg>\\r\\n                                        <p class=\\\"ml-2 mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            {quest.progress}/{quest.goal}\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n                                    <p class=\\\"quest-goal\\\">{quest.name}</p>\\r\\n                                </div>\\r\\n                                <div\\r\\n                                    class=\\\"absolute bottom-0 left-0 h-2px bg-{calculateRarity(quest.reward, false)}\\\"\\r\\n                                    style=\\\"width: {calculateProgressBarWidth(quest.progress, quest.goal)}%\\\"></div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n                {#if data.collected && data.collected.weekly}\\r\\n                    <div class=\\\"pt-5\\\">\\r\\n                        {#each data.collected.weekly as quest}\\r\\n                            <div\\r\\n                                class=\\\"card quest text-disabled italic max-w-sm\\r\\n                                mx-auto lg:mx-0\\\">\\r\\n                                <div class=\\\"quest-infos\\\">\\r\\n                                    <div class=\\\"progress-container\\\">\\r\\n                                        <p class=\\\"mr-6 lg:mr-12 text-lg\\\">\\r\\n                                            Collected\\r\\n                                        </p>\\r\\n                                    </div>\\r\\n\\r\\n                                    <p class=\\\"quest-goal line-through\\\">\\r\\n                                        {quest.name}\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n    <div\\r\\n        class=\\\"flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4\\r\\n        ml-5 lg:ml-0   {currentGuideVisible === 'quests_refresh' ? 'z-60  relative' : ''}\\\">\\r\\n        <div on:click={() => handleRefresh()}>\\r\\n        <RefreshButton\\r\\n            isRefreshing={isRefreshingQuests}\\r\\n            refreshMessage={'Refresh quests data'} />\\r\\n        </div>\\r\\n        {#if currentGuideVisible === \\\"quests_refresh\\\"}\\r\\n            <div class=\\\"absolute   mr-4 md:mx-0  -bottom-91  md:-bottom-83 md:left-46 lg:-bottom-48 lg:left-54 2xl:-bottom-44 2xl:right-38  z-30\\\">\\r\\n                <GuideContainer title=\\\"Refresh button\\\" scroll={2100} scrollMd={900}>\\r\\n                    <div>\\r\\n                        <p class=\\\"text-2xl  md:text-3xl\\\"><b>Click</b> this button to <b>refresh the quests</b> data!</p>\\r\\n                        <p class=\\\"leading-7 md:leading-normal   text-default md:text-2xl mt-2\\\">Due to the <b>Brawlhalla API latency</b>, quests may take <br class=\\\"hidden md:block\\\"> up to\\r\\n                            <br class=\\\"md:hidden\\\"><b style=\\\"color: #fc1870\\\">3-4 hours</b> <b>to refresh</b></p>\\r\\n                        <p class=\\\"mt-3 text-xl md:text-default text-mid-light italic\\\">Info: we will <b style=\\\"color: #3de488;\\\">automatically collect</b> the quests\\r\\n                            <br class=\\\"hidden md:block\\\"> you finished before they expire :D</p>\\r\\n                    </div>\\r\\n                </GuideContainer>\\r\\n            </div>\\r\\n\\r\\n        {/if}\\r\\n        <div class=\\\"flex lg:ml-8 items-center mt-4 lg:mt-0\\\">\\r\\n            <!--<div class=\\\"flex items-center \\\">\\r\\n                <div class=\\\"py-2 px-2 rounded-full bg-primary\\\">\\r\\n                    <svg\\r\\n                        class=\\\"w-3 h-3 fill-current\\\"\\r\\n                        viewBox=\\\"0 0 17 24\\\"\\r\\n                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                        <path\\r\\n                            d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\"/>\\r\\n                    </svg>\\r\\n                </div>\\r\\n            </div>-->\\r\\n            <svg\\r\\n                xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                class=\\\"w-9 text-primary\\\"\\r\\n                viewBox=\\\"0 0 576 512\\\">\\r\\n                <path\\r\\n                    fill=\\\"currentColor\\\"\\r\\n                    d=\\\"M569.517 440.013C587.975 472.007 564.806 512 527.94\\r\\n                    512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423\\r\\n                    23.985c18.467-32.009 64.72-31.951 83.154 0l239.94\\r\\n                    416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46\\r\\n                    46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418\\r\\n                    136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0\\r\\n                    11.635-4.982\\r\\n                    11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884\\r\\n                    0-12.356 5.78-11.981 12.654z\\\" />\\r\\n            </svg>\\r\\n            <p class=\\\"text-lg ml-3 lg:ml-2 tip-text text-light  max-w-lg\\\">\\r\\n                If the quests doesn't refresh, don't worry, come back later to collect them: Brawlhalla's API takes time\\r\\n                to refresh\\r\\n            </p>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n{#if isAlertNoRefreshOpen}\\r\\n    <div class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center\\\"\\r\\n         style=\\\"z-index: 100\\\"\\r\\n         in:fade={{duration: 200}}\\r\\n         out:fade={{duration: 350}}>\\r\\n\\r\\n        <div\\r\\n            class=\\\"max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-auto md:overflow-y-auto\\\"\\r\\n            style=\\\"max-height: 95vh;\\\"\\r\\n            transition:fly={{ y: 300, duration: 350 }}>\\r\\n            <h2 class=\\\"text-4xl md:text-5xl\\\">The quests data hasn't been <b style=\\\"color: #fc1870\\\">updated</b>\\r\\n            </h2>\\r\\n\\r\\n            <p class=\\\"mt-1 text-green    text-4xl\\\">Why ?</p>\\r\\n            <div class=\\\"ml-6 my-6 text-mid-light text-2xl\\\">\\r\\n                <p>- The quests takes on average <u>3 hours</u> to update, but it can be <u>longer</u></p>\\r\\n                <p class=\\\"mt-3 font-normal\\\">- Don't worry if they don't refresh, we <b style=\\\"color: #3d72e4\\\">automatically\\r\\n                    collect them</b> just before the <b style=\\\"color: #3d72e4\\\">timer expires</b>: Come tomorrow to\\r\\n                    collect them!</p>\\r\\n            </div>\\r\\n            <div class=\\\"mt-8\\\">\\r\\n                <button class=\\\"button button-brand w-full md:w-auto\\\" on:click={() =>isAlertNoRefreshOpen = false}>Got\\r\\n                    it!\\r\\n                </button>\\r\\n                <button class=\\\"button button-brand-alternative /hover:underline md:ml-4 w-full md:w-auto mt-4 md:mt-0\\\"\\r\\n                        on:click={deactivateAlert}>Don't show this again\\r\\n                </button>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n{#if info}\\r\\n    <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AA4MI,CAAC,8BAAC,CAAC,AACC,OAAO,WAAW,CAAC,YAAY,CAAC,AACpC,CAAC,AAED,MAAM,8BAAC,CAAC,AACJ,aAAa,CAAE,IAAI,CACnB,OAAO,QAAQ,CAAC,eAAe,CAAC,MAAM,CAAC,IAAI,CAAC,AAChD,CAAC,AAED,YAAY,8BAAC,CAAC,AACV,OAAO,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,AAC1C,CAAC,AAED,mBAAmB,8BAAC,CAAC,AACjB,OAAO,IAAI,CAAC,YAAY,CAAC,AAC7B,CAAC,AAED,GAAG,8BAAC,CAAC,AACD,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,gBAAgB,8BAAC,CAAC,AACd,KAAK,CAAE,MAAM,AACjB,CAAC,AAED,qBAAM,MAAM,CAAC,IAAI,eAAC,CAAC,AACf,IAAI,CAAE,CAAC,AACX,CAAC,AAED,IAAI,8BAAC,CAAC,AACF,IAAI,CAAE,KAAK,CACX,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,WAAW,CAClC,KAAK,CAAE,IAAI,CACX,OAAO,QAAQ,CAAC,MAAM,CAAC,KAAK,CAAC,aAAa,CAAC,IAAI,CAAC,YAAY,CAAC,cAAc,CAAC,WAAW,CAAC,AAC5F,CAAC,AAED,SAAS,8BAAC,CAAC,AACP,WAAW,CAAE,OAAO,AACxB,CAAC,AAED,WAAW,8BAAC,CAAC,AACT,KAAK,CAAE,OAAO,AAClB,CAAC,AAED,mBAAmB,8BAAC,CAAC,AACjB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CAC/C,aAAa,CAAE,QAAQ,CACvB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,OAAO,CACrB,SAAS,CAAE,OAAO,AACtB,CAAC\"}"
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
	let { currentGuideVisible } = $$props;

	const calculateRarity = (reward, daily) => {
		if (daily) {
			if (reward === 10) return "primary";
			if (reward === 20) return "epic";
			if (reward === 30) return "legendary";
		} else {
			if (reward === 50) return "primary";
			if (reward === 100) return "epic";
			if (reward === 200) return "legendary";
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
		return setInterval(calculateTime, 1000);
	}

	let countDownIds = [];

	function initTimers() {
		countDownIds.forEach(e => {
			clearInterval(e);
		});

		try {
			for (let i = 0; i < 2; i++) {
				let d = i === 0 ? data.lastDaily : data.lastWeekly;
				const endsIn = ((i === 0 ? d + 3600000 * 24 : d + 3600000 * 168) - Date.now()) / 1000;

				if (endsIn < 1) {
					countDown[i] = "";
				} else {
					countDownIds.push(startTimer(endsIn, i));
				}
			}
		} catch(e) {
			error = e;
		}
	}

	initTimers();
	data = data;
	calculateOrder(data);
	let isRefreshingQuests = false;

	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.currentGuideVisible === void 0 && $$bindings.currentGuideVisible && currentGuideVisible !== void 0) $$bindings.currentGuideVisible(currentGuideVisible);
	$$result.css.add(css$o);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `
${($$result.head += `${ ``}`, "")}

<div>${currentGuideVisible === "quests"
		? `<div class="${"absolute  mx-4 md:mx-0  bottom-56 md:right-8 md:bottom-4 lg:right-98 lg:top-18  2x:-bottom-12 2xl:right-32  z-30"}">${validate_component(GuideContainer, "GuideContainer").$$render(
				$$result,
				{
					title: "Quests",
					scroll: 1500,
					scrollMd: 600
				},
				{},
				{
					default: () => `<div><p class="${"text-2xl md:text-3xl"}"><b class="${"svelte-1sdlpcn"}">Complete</b> these quests to <b class="${"svelte-1sdlpcn"}">earn coins</b>!</p>
                    <p class="${"text-2xl md:text-2xl mt-1"}">Quests have <b class="${"svelte-1sdlpcn"}">3</b> rarity: <b class="${"svelte-1sdlpcn"}">Normal</b>, <b style="${"color: #ee38ff"}" class="${"svelte-1sdlpcn"}">Epic</b>, and <b style="${"color: #fc1870"}" class="${"svelte-1sdlpcn"}">Legendary</b></p>
                    <p class="${"mt-2 text-default text-mid-light italic"}">Tip: hover or click on a quest to view the reward ;)</p></div>`
				}
			)}</div>`
		: ``}

    ${ ``}
    ${error
		? `<p class="${"text-legendary w-full"}">An error has been detected ,quests might appear
            weirdly. </p>
        <p class="${"text-xl"}" style="${"color: #666666"}"><b class="${"font-normal svelte-1sdlpcn"}" style="${"color: #aaaaaa"}">Details:</b> ${escape(error)}</p>`
		: ``}
    <div class="${"container md:flex mt-7 md:mt-20 lg:mt-7 w-auto"}"><div class="${"ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8"}"><div class="${""}"><h2 class="${"text-6xl text-center lg:text-left"}">Daily Quests</h2>
                <p class="${[
			"text-" + escape(countDown[0].speed) + " text-center lg:text-left text-3xl leading-none" + " svelte-1sdlpcn",
			countDown[0].finished ? "text-xl" : ""
		].join(" ").trim()}">${countDown[0].timer
		? `${escape(countDown[0].timer)}`
		: ``}</p></div>
            <div class="${"quests-container mt-1"}">${data.finished && data.finished.daily
		? `<div class="${"pb-1 block"}">${each(data.finished.daily, (quest, i) => `<button class="${"card quest finished border-2 border-" + escape(calculateRarity(quest.reward, true)) + "\r\n                                max-w-sm mx-auto lg:mx-0 block" + " svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><span class="${"svelte-1sdlpcn"}">Click to collect</span>
                                    <div class="${"progress-container svelte-1sdlpcn"}"><svg class="${"fill-current checkbox-active\r\n                                            text-" + escape(calculateRarity(quest.reward, true)) + " svelte-1sdlpcn"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">Click to collect
                                        </p></div>

                                    <p class="${"line-through"}">${escape(quest.name)}</p></div>
                            </button>`)}</div>`
		: ``}

                ${data.dailyQuests
		? `<div>${each(data.dailyQuests, quest => `<div class="${"relative card quest max-w-sm mx-auto lg:mx-0 svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><span class="${"text-3xl text-" + escape(calculateRarity(quest.reward, true)) + " svelte-1sdlpcn"}">${escape(quest.reward)}
                                        <div class="${"w-9 ml-2 mt-1"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}
                                        </div></span>
                                    <div class="${"progress-container svelte-1sdlpcn"}"><svg class="${"fill-current w-4 text-" + escape(calculateRarity(quest.reward, true)) + " svelte-1sdlpcn"}" viewBox="${"0 0 25 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">${escape(quest.progress)}/${escape(quest.goal)}
                                        </p></div>
                                    <p class="${""}">${escape(quest.name)}</p></div>
                                <div class="${"absolute bottom-0 left-0 h-2px bg-" + escape(calculateRarity(quest.reward, true)) + " svelte-1sdlpcn"}" style="${"width:" + escape(calculateProgressBarWidth(quest.progress, quest.goal)) + "%"}"></div>
                            </div>`)}</div>`
		: ``}

                ${data.collected && data.collected.daily
		? `<div class="${"pt-5"}">${each(data.collected.daily, quest => `<div class="${"card quest text-disabled italic max-w-sm\r\n                                mx-auto lg:mx-0 svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><div class="${"progress-container svelte-1sdlpcn"}"><p class="${"mr-6 lg:mr-12 text-lg"}">Collected
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </div>`)}</div>`
		: ``}</div></div>
        <div class="${"ml-5 mr-5 mt-12 md:ml-5 md:mr-0\r\n            md:mt-0"}"><div class="${""}"><h2 class="${"text-6xl text-center lg:text-left"}">Weekly Quests</h2>
                <p class="${[
			"text-" + escape(countDown[1].speed) + " text-center lg:text-left text-3xl leading-none" + " svelte-1sdlpcn",
			countDown[1].finished ? "text-xl" : ""
		].join(" ").trim()}">${countDown[1].timer
		? `${escape(countDown[1].timer)}`
		: ``}</p></div>
            <div class="${"quests-container mt-1"}">${data.finished && data.finished.weekly
		? `<div class="${"pb-1 block"}">${each(data.finished.weekly, (quest, i) => `<button class="${"card quest finished border-2 border-" + escape(calculateRarity(quest.reward, false)) + "\r\n                                max-w-sm mx-auto lg:mx-0" + " svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><span class="${"svelte-1sdlpcn"}">Click to collect</span>
                                    <div class="${"progress-container svelte-1sdlpcn"}"><svg class="${"fill-current checkbox-active\r\n                                            text-" + escape(calculateRarity(quest.reward, false)) + " svelte-1sdlpcn"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42\r\n                                                1.807-1.807 5.422 5.422\r\n                                                13.68-13.68 1.811 1.803-15.491\r\n                                                15.491z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">Click to collect
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </button>`)}</div>`
		: ``}

                ${data.weeklyQuests
		? `<div>${each(data.weeklyQuests, quest => `<div class="${"relative card quest max-w-sm mx-auto lg:mx-0 svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><span class="${"text-3xl text-" + escape(calculateRarity(quest.reward, false)) + " svelte-1sdlpcn"}">${escape(quest.reward)}
                                        <div class="${"w-9 ml-2 mt-1"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem; margin-left: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}
                                        </div></span>
                                    <div class="${"progress-container svelte-1sdlpcn"}"><svg class="${"fill-current w-4 text-" + escape(calculateRarity(quest.reward, false)) + " svelte-1sdlpcn"}" viewBox="${"0 0 25 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24\r\n                                                24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z"}"></path></svg>
                                        <p class="${"ml-2 mr-6 lg:mr-12 text-lg"}">${escape(quest.progress)}/${escape(quest.goal)}
                                        </p></div>
                                    <p class="${"quest-goal"}">${escape(quest.name)}</p></div>
                                <div class="${"absolute bottom-0 left-0 h-2px bg-" + escape(calculateRarity(quest.reward, false)) + " svelte-1sdlpcn"}" style="${"width: " + escape(calculateProgressBarWidth(quest.progress, quest.goal)) + "%"}"></div>
                            </div>`)}</div>`
		: ``}
                ${data.collected && data.collected.weekly
		? `<div class="${"pt-5"}">${each(data.collected.weekly, quest => `<div class="${"card quest text-disabled italic max-w-sm\r\n                                mx-auto lg:mx-0 svelte-1sdlpcn"}"><div class="${"quest-infos svelte-1sdlpcn"}"><div class="${"progress-container svelte-1sdlpcn"}"><p class="${"mr-6 lg:mr-12 text-lg"}">Collected
                                        </p></div>

                                    <p class="${"quest-goal line-through"}">${escape(quest.name)}
                                    </p></div>
                            </div>`)}</div>`
		: ``}</div></div></div>
    <div class="${"flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4\r\n        ml-5 lg:ml-0   " + escape(currentGuideVisible === "quests_refresh"
		? "z-60  relative"
		: "")}"><div>${validate_component(RefreshButton, "RefreshButton").$$render(
			$$result,
			{
				isRefreshing: isRefreshingQuests,
				refreshMessage: "Refresh quests data"
			},
			{},
			{}
		)}</div>
        ${currentGuideVisible === "quests_refresh"
		? `<div class="${"absolute   mr-4 md:mx-0  -bottom-91  md:-bottom-83 md:left-46 lg:-bottom-48 lg:left-54 2xl:-bottom-44 2xl:right-38  z-30"}">${validate_component(GuideContainer, "GuideContainer").$$render(
				$$result,
				{
					title: "Refresh button",
					scroll: 2100,
					scrollMd: 900
				},
				{},
				{
					default: () => `<div><p class="${"text-2xl  md:text-3xl"}"><b class="${"svelte-1sdlpcn"}">Click</b> this button to <b class="${"svelte-1sdlpcn"}">refresh the quests</b> data!</p>
                        <p class="${"leading-7 md:leading-normal   text-default md:text-2xl mt-2"}">Due to the <b class="${"svelte-1sdlpcn"}">Brawlhalla API latency</b>, quests may take <br class="${"hidden md:block"}"> up to
                            <br class="${"md:hidden"}"><b style="${"color: #fc1870"}" class="${"svelte-1sdlpcn"}">3-4 hours</b> <b class="${"svelte-1sdlpcn"}">to refresh</b></p>
                        <p class="${"mt-3 text-xl md:text-default text-mid-light italic"}">Info: we will <b style="${"color: #3de488;"}" class="${"svelte-1sdlpcn"}">automatically collect</b> the quests
                            <br class="${"hidden md:block"}"> you finished before they expire :D</p></div>`
				}
			)}</div>`
		: ``}
        <div class="${"flex lg:ml-8 items-center mt-4 lg:mt-0"}">
            <svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-9 text-primary svelte-1sdlpcn"}" viewBox="${"0 0 576 512"}"><path fill="${"currentColor"}" d="${"M569.517 440.013C587.975 472.007 564.806 512 527.94\r\n                    512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423\r\n                    23.985c18.467-32.009 64.72-31.951 83.154 0l239.94\r\n                    416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46\r\n                    46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418\r\n                    136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0\r\n                    11.635-4.982\r\n                    11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884\r\n                    0-12.356 5.78-11.981 12.654z"}"></path></svg>
            <p class="${"text-lg ml-3 lg:ml-2 tip-text text-light  max-w-lg svelte-1sdlpcn"}">If the quests doesn&#39;t refresh, don&#39;t worry, come back later to collect them: Brawlhalla&#39;s API takes time
                to refresh
            </p></div></div></div>
${ ``}
${ ``}`;
	} while (!$$settled);

	return $$rendered;
});

/* src\components\GuideCard.svelte generated by Svelte v3.31.0 */

const GuideCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return ``;
});

/* src\components\AdblockAlertStyle.svelte generated by Svelte v3.31.0 */

const AdblockAlertStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { isVisible = false } = $$props;
	let { hasBeenDestroyed } = $$props;

	onMount(() => {
		setTimeout(
			() => {
				if (isVisible === true) {
					setInterval(
						() => {
							//check if elements exists
							hasBeenDestroyed = !document.getElementById("ampfaPde15Sq532maJs");
						},
						1000
					);
				}
			},
			5001
		);
	});

	let guides = {
		"ADBLOCK-like": {
			steps: [
				"Click on your adblocker extension icon",
				"Click on the button to turn it off on this website",
				"That's it!"
			],
			opened: false
		},
		"Opera native adblocker": {
			steps: [
				"Click on the shield icon next to the page URL",
				"Click on the button to turn it off on this website",
				"That's it!"
			],
			opened: false
		},
		"Kaspersky native adblocker": {
			steps: [
				"On your windows task bar, click on the arrow icon",
				"Click on the kaspersky total security icon",
				"In the kaspersky app, click on the settings icon",
				"Then access the PROTECTION tab",
				"Scroll down and chose \"Anti Banner\", then click on \"Website with allowed banners\"",
				"Then add the website URL to the \"Website with allowed banner\" list",
				"Click the OK button",
				"Then press SAVE",
				"That's it!"
			],
			opened: false
		}
	};

	if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0) $$bindings.isVisible(isVisible);
	if ($$props.hasBeenDestroyed === void 0 && $$bindings.hasBeenDestroyed && hasBeenDestroyed !== void 0) $$bindings.hasBeenDestroyed(hasBeenDestroyed);

	return `${isVisible
	? `
    <div class="${"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center"}" id="${"ampfaPde15Sq532maJs"}" style="${"z-index: 100"}"><div class="${"max-w-xl    mx-5 my-1 md:mx-0  pl-6 pr-2 md:px-12 pt-10 pb-8    bg-variant    border-2 border-legendary  rounded-lg    overflow-y-scroll md:overflow-y-auto scrollbar"}" style="${"max-height: 95vh;"}"><h1 class="${"text-5xl md:text-6xl text-center text-font"}">Please disable your adblocker</h1>
            <p class="${"mt-8    text-3xl md:text-4xl text-green text-center leading-8"}">We use ads revenue to make this
                website happen!</p>

            <p class="${"mt-6    text-default md:text-2xl text-primary    leading-7"}">Here are some guides to help you turn
                off your adblocker!</p>

            <div class="${"mt-1 /px-1"}" style="${"padding: 0 0.10rem"}">${each(Object.entries(guides), ([key, value]) => `<div class="${"w-full  py-1 text-2xl text-font flex justify-between items-center"}">
                        <div class="${"w-full"}"><button class="${"w-full flex justify-between items-center  focus:outline-none"}">${escape(key)}

                                ${value.opened
		? `<svg class="${"w-4 h-6 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m21.57 19.2 2.43-2.422-12-11.978-12 11.978 2.43 2.422 9.57-9.547z"}"></path></svg>`
		: `<svg class="${"w-4 h-6 fill-current"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z"}"></path></svg>`}</button>
                        </div></div>

                    
                    ${value.opened
		? `<div class="${"ml-8 mb-5  text-default text-light"}"><ol class="${"list-outside list-decimal"}">${each(value.steps, step => `<li class="${"mt-2 text-primary"}"><b class="${"font-normal text-light"}">${escape(step)}</b>
                                    </li>`)}</ol>
                        </div>`
		: ``}`)}</div>
            <div class="${"flex mt-8"}"><button class="${"button button-brand mx-auto"}" onClick="${"window.location.href=window.location.href"}">Refresh Page
                </button></div></div></div>`
	: ``}`;
});

/* src\components\AdblockAlert.svelte generated by Svelte v3.31.0 */

const AdblockAlert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { user = {} } = $$props;
	let { quests = {} } = $$props;

	//if component has been destroy rebuild it
	let hasBeenDestroyed;

	let adblocker = false;

	onMount(() => {
		//Adblock detector
		setTimeout(
			async () => {
				if (quests.dailyQuests || quests.weeklyQuests || user.steamId) {
					try {
						await axios__default['default'].get(`https://winhalla.app/ads.txt`);
					} catch(e) {
						adblocker = true;
					}
				}
			},
			2500
		);
	});

	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	if ($$props.quests === void 0 && $$bindings.quests && quests !== void 0) $$bindings.quests(quests);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `


${validate_component(AdblockAlertStyle, "AdblockAlertStyle").$$render(
			$$result,
			{ isVisible: adblocker, hasBeenDestroyed },
			{
				hasBeenDestroyed: $$value => {
					hasBeenDestroyed = $$value;
					$$settled = false;
				}
			},
			{}
		)}`;
	} while (!$$settled);

	return $$rendered;
});

/* src\routes\play\index.svelte generated by Svelte v3.31.0 */

const { Object: Object_1 } = globals;

const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let quests;
	let error;
	let gameModesError;
	let gameModes;
	let info;

	//guides
	let currentGuide;

	onMount(async () => {
		let params = new URLSearchParams(window.location.search);
		if (params.get("reloadNav")) counter.set({ refresh: true });

		if (params.get("hasEndedMatch")) {
			setTimeout(
				() => {
					info = {
						pushError: "You can now start another one",
						message: "Match exited successfully"
					};
				},
				750
			);

			setTimeout(
				() => {
					info = null;
				},
				5000
			);
		}

		gameModes = [
			{
				name: "ffa",
				displayName: "Solo",
				description: "Fight against <b>7</b> players!",
				goal: "Be the one who has the <b>most wins</b> out of <b>7 games</b>!",
				duration: "<b>30</b> - <b>50</b> minutes",
				available: true
			},
			{
				name: "2vs2",
				displayName: "Duos",
				description: "Fight against an other <b>team</b>!",
				goal: "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
				duration: "<b>20</b> - <b>30</b> minutes",
				available: true
			}
		];

		try {
			//Check which game mode is enabled in config, and then adapt the property available of gameModes object.
			let gameModesStatus = await callApi("get", "/GMStatus");

			if (gameModesStatus instanceof Error && gameModesStatus.response.status !== 403) {
				gameModesError = `<p class="text-accent">Wow, an unexpected error occurred while processing gamemodes data, details for geeks below.</p> <p class="text-2xl mt-4">Note : This will be fix as fast as possible!</p><p class="text-2xl text-light">${gameModesStatus.toString()}</p>`;
			}

			if (gameModesStatus && !gameModesError) {
				gameModesStatus = gameModesStatus.value;

				Object.keys(gameModesStatus).forEach(gameModeName => {
					const gameMode = gameModes.find(g => g.name === gameModeName.toLowerCase());
					gameMode.available = gameModesStatus[gameModeName];
					gameModes = gameModes;
				});
			}

			//Load quests for user
			quests = await callApi("get", "/getSolo");

			if (quests instanceof Error && quests.response.status === 403) await goto(`/login`);

			if (!quests.solo.lastDaily || !quests.solo.lastWeekly) {
				quests = await callApi("get", "/solo");
				if (quests instanceof Error && gameModesStatus.response.status !== 403) throw quests;
				quests = quests.solo;
			} else {
				quests = quests.solo;
			}

			//guides
			guideHandlerSetPage("play");

			guideHandlerStore.subscribe(value => {
				currentGuide = value.current;
			});
		} catch(err) {
			console.log(err);

			if (err.response) {
				if (err.response.status === 400 && err.response.data.includes("Play at least one ranked")) {
					error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter). The data may take up to 30m to refresh.";
					return;
				} else if (err.response.status === 400 && err.response.data.includes("Play at least one")) {
					error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)";
					return;
				}
			}

			error = `<p class="text-accent">Oops, a problem occurred when loading Quests data :(</p><p class="text-2xl mt-4">Note : Try to login or try to reload the page!</p> <p class="text-xl text-light mt-2">${err.toString()}</p>`;
		}
	});

	return `${($$result.head += `${($$result.title = `<title>Play - Winhalla, Play Brawlhalla. Earn rewards.</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards. | Legit & Free In-Game objects!\r\n        | Choose your gamemode here | Winhalla Play page"}" data-svelte="svelte-1wbv8p4"><script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-1wbv8p4"></script>`, "")}
${(!quests || (!quests.lastDaily || !quests.lastWeekly)) && (!gameModesError && !error)
	? `<div>${validate_component(Loading, "Loading").$$render($$result, { duration: 500 }, {}, {})}</div>`
	: ``}
${gameModesError && error
	? `<div class="${"w-full lg:mt-60 mt-25"}"><div class="${"text-center"}"><h2 class="${"lg:text-5xl text-3xl text-center text-legendary"}">Woooow, this page entirely crashed</h2>
            <h3 class="${"text-center lg:text-3xl text-2xl"}"><a href="${"/"}" class="${"underline text-primary"}">Wanna go to
                homepage</a> then ?</h3>
            <p class="${"text-light text-center pt-10"}">If this occurs regularly, maybe clear your cookies and cache. <br>
                If nothing works, just wait (and report this bug)! we are surely working on an <b class="${"text-primary font-normal"}">AMAZING
                    UPDATE</b></p></div>
        <div class="${"font-normal cursor-pointer button text-center"}">Click for details
        </div>
        <p class="${["text-light",  "hidden" ].join(" ").trim()}">${error} <br><br> ${gameModesError}</p></div>`
	: `${validate_component(AdblockAlert, "AdblockAlert").$$render($$result, { quests }, {}, {})}
    <div class="${"lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full"}"><div class="${"my-6"}"><script src="${"https://cdn.purpleads.io/agent.js?publisherId=314da1819089ebe69cd42311ab4f004b:215d0a33f49770770015c765d6674dffe97cbf852e57e24456e6344c5e3632799738f136478d248e0c423a643b6ab46123a2e3a7f85b668dc4c1bd10f144d9fa"}" data-pa-tag async></script></div>
        <div class="${"text-center lg:text-left"}"><h1 class="${"text-6xl leading-snug lg:leading-normal  " + escape(currentGuide === "game_modes" ? "z-60  relative" : "")}">Choose a game mode
            </h1></div>
        ${quests
		? `${window.innerWidth < 1024
			? `<div class="${"flex w-full"}"><a href="${"/play#quests"}" class="${"button mx-auto button-brand"}">Go to quests</a></div>`
			: ``}`
		: ``}
        <div class="${"flex flex-col items-center lg:flex-wrap\r\n        lg:flex-row xl:items-start"}">${gameModesError
		? `<div class="${"lg:w-40% z-50 content-center lg:mt-60 mt-25 pb-20"}"><h2 class="${"lg:text-3xl text-2xl text-center"}">${gameModesError}</h2></div>`
		: `${gameModes
			? `<div${add_attribute("class", currentGuide === "game_modes" ? "z-60  relative" : "", 0)}><div class="${"lg:mb-10 lg:mr- mt-10 text-center\r\n            flex flex-col items-center md:flex-row lg:items-start"}">${validate_component(GameModeCards, "GameModeCards").$$render($$result, { gameModes }, {}, {})}</div>

                    ${currentGuide === "game_modes"
				? `<div class="${"absolute z-60  bottom-76 -right-4 md:-bottom-12 lg:right-0  lg:bottom-0"}">${validate_component(GuideContainer, "GuideContainer").$$render(
						$$result,
						{
							title: "Game modes",
							previous: false,
							scroll: 390,
							scrollMd: 0
						},
						{},
						{
							default: () => `<div class="${"mt-1"}"><p class="${"text-2xl md:text-3xl"}">Here you can find <b class="${"font-normal text-primary"}">the list</b> of the <b class="${"font-normal text-epic"}">Winhalla <br class="${"hidden md:block"}">game
                                        modes</b>
                                        with their description</p>
                                    <p class="${"mt-3  text-xl md:text-default text-mid-light italic"}">Note: these game
                                        modes are <b class="${"font-normal text-primary"}">unrelated</b> to
                                        <br class="${"hidden md:block"}"><b class="${"font-normal text-primary"}">Brawlhalla game
                                            modes</b></p></div>`
						}
					)}</div>`
				: ``}</div>`
			: ``}`}
            <div class="${"pb-8 lg:pb-16 flex-grow lg:-ml-15     /bg-background   " + escape(currentGuide === "quests" ? "z-60  relative" : "")}">
                ${error
		? `<div class="${"px-5 w-full content-center md:mt-15  lg:px-0  w-full"}"><h2 class="${"lg:text-3xl text-2xl text-center"}">${error}</h2></div>`
		: `${quests
			? `
                    ${quests.lastDaily && quests.lastWeekly
				? `<div id="${"quests"}" class="${"relative bottom-10"}"></div>
                        <div class="${"lg:ml-15"}">${validate_component(Quests, "Quests").$$render(
						$$result,
						{
							data: quests,
							currentGuideVisible: currentGuide
						},
						{},
						{}
					)}
                            <div class="${"mt-10 flex"}"><script data-playerPro="${"current"}">(function() {
                                    var s = document.querySelector("script[data-playerPro=\\"current\\"]");
                                    s.removeAttribute("data-playerPro");
                                    (playerPro = window.playerPro || []).push({ id: "7rYaA2Kc71uu", after: s });
                                })();
                                </script></div></div>`
				: ``}`
			: ``}`}</div></div>
        ${validate_component(GuideCard, "GuideCard").$$render($$result, { page: "play" }, {}, {})}
        <div class="${"mt-6"}"><script src="${"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"}" data-pa-tag async></script></div></div>`}
${info
	? `${validate_component(Infos, "Infos").$$render($$result, Object_1.assign(info), {}, {})}`
	: ``}`;
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
			if (id instanceof Error) return error = id.response.data;

			if (!id) {
				goto(`$/login`);
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
	? `<div class="${"w-full content-center lg:mt-60 mt-25 "}"><h2 class="${"lg:text-5xl text-3xl text-center"}"><p class="${"text-accent "}">Wow, unexpected error occured, details for geeks below.</p>
        <p class="${"text-2xl lg:text-3xl"}">${escape(error)}</p></h2>
        <a href="${"/play"}"><p class="${"underline lg:text-3xl text-2xl  text-center text-primary"}">Go to play page</p></a></div>`
	: `${validate_component(Loading, "Loading").$$render($$result, { data: "Finding game..." }, {}, {})}`}`;
});

var component_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Ffa
});

/* src\components\FfaEnd.svelte generated by Svelte v3.31.0 */

const css$p = {
	code: "b.svelte-qzckga{@apply text-primary font-normal;}.card.svelte-qzckga{box-shadow:rgba(0, 0, 0, 0.55) 5px 5px 8px}.ffa-player.svelte-qzckga{@apply relative w-53 h-88 text-center;}.ffa-player.svelte-qzckga::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.25) 0%,\r\n                rgba(23, 23, 26, 0.35),\r\n                rgba(23, 23, 26, 0.45) 75%,\r\n                rgba(23, 23, 26, 0.5) 100%\r\n        )}.player-name.svelte-qzckga{text-shadow:rgba(255, 255, 255, 0.4) 0px 0px 10px;@apply absolute z-10 top-16 left-0 right-0;}.stats.svelte-qzckga{@apply absolute left-0 right-0 z-10;}.user.svelte-qzckga{@apply w-60 h-100;}.user.svelte-qzckga::after{background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.25) 0%,\r\n                rgba(23, 23, 26, 0.35),\r\n                rgba(23, 23, 26, 0.45) 75%,\r\n                rgba(23, 23, 26, 0.5) 100%\r\n        )}.tooltip.svelte-qzckga::after{content:\"\";position:absolute;top:100%;right:20%;margin-left:-5px;border-width:5px;border-style:solid;border-color:black transparent transparent transparent}li.svelte-qzckga{@apply leading-tight;}",
	map: "{\"version\":3,\"file\":\"FfaEnd.svelte\",\"sources\":[\"FfaEnd.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\r\\n    export let players;\\r\\n    export let winners;\\r\\n    players.sort((a, b) => b.wins - a.wins);\\r\\n    const data = players.map(e => {\\r\\n        return {\\r\\n            username: e.username,\\r\\n            avatarURL: e.avatarURL,\\r\\n            wins: e.wins,\\r\\n            gamesPlayed:e.gamesPlayed,\\r\\n            rank: e.rank,\\r\\n            coinsEarned: Math.round(e.rewards * 10) / 10,\\r\\n            multiplier: e.multiplier,\\r\\n            baseMultiplier: e.multiplierDetails.base,\\r\\n            adMultiplier: e.multiplierDetails.ad,\\r\\n            linkMultiplier: e.multiplierDetails.link,\\r\\n            eventMultiplier: e.multiplierDetails.event\\r\\n        };\\r\\n    });\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        box-shadow: rgba(0, 0, 0, 0.55) 5px 5px 8px;\\r\\n    }\\r\\n\\r\\n    .ffa-player {\\r\\n        @apply relative w-53 h-88 text-center;\\r\\n    }\\r\\n\\r\\n    .ffa-player::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.25) 0%,\\r\\n                rgba(23, 23, 26, 0.35),\\r\\n                rgba(23, 23, 26, 0.45) 75%,\\r\\n                rgba(23, 23, 26, 0.5) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .player-name {\\r\\n        text-shadow: rgba(255, 255, 255, 0.4) 0px 0px 10px;\\r\\n        @apply absolute z-10 top-16 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute left-0 right-0 z-10;\\r\\n    }\\r\\n\\r\\n    .user {\\r\\n        @apply w-60 h-100;\\r\\n    }\\r\\n\\r\\n    .user::after {\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.25) 0%,\\r\\n                rgba(23, 23, 26, 0.35),\\r\\n                rgba(23, 23, 26, 0.45) 75%,\\r\\n                rgba(23, 23, 26, 0.5) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .tooltip::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 100%;\\r\\n        right: 20%;\\r\\n        margin-left: -5px;\\r\\n        border-width: 5px;\\r\\n        border-style: solid;\\r\\n        border-color: black transparent transparent transparent;\\r\\n    }\\r\\n\\r\\n    li {\\r\\n        @apply leading-tight;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"\\\">\\r\\n    <div class=\\\"pl-7 lg:pl-24 pt-8 lg:pt-12\\\">\\r\\n        <div class=\\\"mode-timer lg:flex items-end\\\">\\r\\n            <h1 class=\\\"text-6xl\\\">Match Ended</h1>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n    <div class=\\\"flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24\\\">\\r\\n\\r\\n        <div class=\\\"flex flex-col items-center lg:flex-row\\\">\\r\\n\\r\\n            <!--Winner card-->\\r\\n            {#each [data.find(e => e.rank === 0)] as winner,i}\\r\\n                <div class:lg:ml-10={i>0}>\\r\\n                    <div>\\r\\n                        <div class=\\\"ffa-player card user\\\">\\r\\n                            <div class=\\\"max-w-full h-full bg-gradient-to-b from-primary to-legendary rounded-lg\\\"></div>\\r\\n                            <div\\r\\n                                class=\\\"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask\\\"></div>\\r\\n                            <img\\r\\n                                class=\\\"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full\\\"\\r\\n                                src=\\\"{winner.avatarURL}\\\" alt=\\\"\\\">\\r\\n\\r\\n                            <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                            <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                <p>\\r\\n                                    Games won: <b>{winner.wins}</b>/7\\r\\n                                </p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/each}\\r\\n\\r\\n            <!--2nd card-->\\r\\n            <!--If there is a 2nd (impossible if there is 2 1st)-->\\r\\n            {#if data.find(e => e.rank === 1)}\\r\\n                {#each [data.find(e => e.rank === 1)] as winner,i}\\r\\n                    <div class=\\\"mt-10 lg:ml-10\\\">\\r\\n                        <div>\\r\\n                            <div class=\\\"ffa-player card user\\\">\\r\\n                                <div class=\\\"max-w-full h-full bg-gradient-to-b from-primary to-epic  rounded-lg\\\"></div>\\r\\n                                <div\\r\\n                                    class=\\\"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask\\\"></div>\\r\\n                                <img\\r\\n                                    class=\\\"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full\\\"\\r\\n                                    src=\\\"{winner.avatarURL}\\\" alt=\\\"\\\">\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                                <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games won: <b>{winner.wins}</b>/7\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {/each}\\r\\n            {/if}\\r\\n\\r\\n            <!--3rd card-->\\r\\n            {#if data.find(e => e.rank === 2) }\\r\\n                {#each [data.find(e => e.rank === 2)] as winner,i}\\r\\n                    <div class=\\\"mt-10 lg:mt-20 lg:ml-10\\\">\\r\\n                        <div>\\r\\n                            <div class=\\\"ffa-player card user\\\">\\r\\n                                <div class=\\\"max-w-full h-full bg-gradient-to-b from-primary to-green  rounded-lg\\\"></div>\\r\\n                                <div\\r\\n                                    class=\\\"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask\\\"></div>\\r\\n                                <img\\r\\n                                    class=\\\"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full\\\"\\r\\n                                    src=\\\"{winner.avatarURL}\\\" alt=\\\"\\\">\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">{winner.username}</p>\\r\\n                                <div class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games won: <b>{winner.wins}</b>/7\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {/each}\\r\\n\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <div class=\\\"overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-20 lg:pb-8 lg:w-full\\\">\\r\\n            <table class=\\\"card px-4 /overflow-hidden mt-20 lg:mx-auto\\\">\\r\\n                <thead class=\\\"bg-primary \\\">\\r\\n                <tr>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Rank\\r\\n                    </td>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Player\\r\\n                    </td>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Wins\\r\\n                    </td>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Games played\\r\\n                    </td>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Earned\\r\\n                    </td>\\r\\n                    <td class=\\\"px-6 py-3\\\">\\r\\n                        Multiplier\\r\\n                    </td>\\r\\n                </tr>\\r\\n                </thead>\\r\\n                <tbody class=\\\"divide-y-4 divide-background text-l\\\">\\r\\n                <!--For each rank-->\\r\\n                {#each data as winner,i}\\r\\n                    <!--For each player in rank-->\\r\\n                    {#if winner.avatarURL || winner.username}\\r\\n                        <tr class=\\\"text-center \\\">\\r\\n                            <td class=\\\"px-6 py-2\\\">\\r\\n                                <strong class=\\\"font-normal\\\" class:text-legendary={winner.rank === 0}\\r\\n                                        class:text-epic={winner.rank === 1}\\r\\n                                        class:text-green={winner.rank === 2}>{winner.rank + 1}</strong>\\r\\n                            </td>\\r\\n                            <td class=\\\"flex items-center px-6 py-2\\\">\\r\\n                                <img class=\\\"block w-10 h-10 rounded-full\\\" src={winner.avatarURL}\\r\\n                                     alt={winner.username}>\\r\\n                                <p class=\\\"pl-2\\\">{winner.username}</p>\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-2\\\">\\r\\n                                <b class=\\\"font-normal\\\">{winner.wins}</b>/7\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-2\\\">\\r\\n                                <b class=\\\"font-normal\\\">{winner.gamesPlayed}</b>/7\\r\\n                            </td>\\r\\n                            <td class=\\\"px-6 py-2\\\">\\r\\n                                {winner.coinsEarned}\\r\\n                            </td>\\r\\n\\r\\n                            <td class=\\\"px-6 py-2 relative\\\">\\r\\n                                <div class=\\\"flex\\\">\\r\\n                                    <p>{winner.multiplier}</p>\\r\\n                                    <div class=\\\"py-2 ml-3 px-2 rounded-full bg-primary mb-1\\\"\\r\\n                                         on:mouseenter={() =>winner.areDetailsShown = true}\\r\\n                                         on:mouseleave={() =>winner.areDetailsShown = false}>\\r\\n                                        <svg\\r\\n                                            class=\\\"w-3 h-3 fill-current my-auto\\\"\\r\\n                                            viewBox=\\\"0 0 17 24\\\"\\r\\n                                            xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path\\r\\n                                                d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\" />\\r\\n                                        </svg>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                                {#if winner.areDetailsShown === true}\\r\\n                                    <span\\r\\n                                        class=\\\"tooltip absolute -left-22 bottom-14     px-4 py-2 bg-black  rounded  text-left h-33 w-58     flex items-center justify-center z-40\\\">\\r\\n                                        <ul>\\r\\n\\r\\n                                            <li><b>BASE REWARD:</b>  {winner.baseMultiplier} </li>\\r\\n                                            <li><b style=\\\"color: #fc1870\\\">ADS:</b> X{winner.adMultiplier/100 !== 0?winner.adMultiplier/100:1}</li>\\r\\n\\r\\n                                            <li class:line-through={!winner.linkMultiplier}><b style=\\\"color: #3de488\\\">Invited by a friend:</b> +{winner.linkMultiplier}\\r\\n                                                %</li>\\r\\n\\r\\n                                            <li class:line-through={!winner.eventMultiplier}><b style=\\\"color: #ee38ff\\\">EVENT:</b> +{winner.eventMultiplier}\\r\\n                                                %</li>\\r\\n                                        </ul>\\r\\n                                    </span>\\r\\n                                {/if}\\r\\n                            </td>\\r\\n                        </tr>\\r\\n                    {/if}\\r\\n                {/each}\\r\\n                </tbody>\\r\\n            </table>\\r\\n\\r\\n        </div>\\r\\n\\r\\n    </div>\\r\\n\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AAuBI,CAAC,cAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,AAC/C,CAAC,AAED,WAAW,cAAC,CAAC,AACT,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,WAAW,CAAC,AAC1C,CAAC,AAED,yBAAW,OAAO,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI;SACjC,AACL,CAAC,AAED,YAAY,cAAC,CAAC,AACV,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAClD,OAAO,QAAQ,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,AAC/C,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,AACxC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,IAAI,CAAC,KAAK,CAAC,AACtB,CAAC,AAED,mBAAK,OAAO,AAAC,CAAC,AACV,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI;SACjC,AACL,CAAC,AAED,sBAAQ,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,KAAK,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC3D,CAAC,AAED,EAAE,cAAC,CAAC,AACA,OAAO,aAAa,CAAC,AACzB,CAAC\"}"
};

const FfaEnd = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { players } = $$props;
	let { winners } = $$props;
	players.sort((a, b) => b.wins - a.wins);

	const data = players.map(e => {
		return {
			username: e.username,
			avatarURL: e.avatarURL,
			wins: e.wins,
			gamesPlayed: e.gamesPlayed,
			rank: e.rank,
			coinsEarned: Math.round(e.rewards * 10) / 10,
			multiplier: e.multiplier,
			baseMultiplier: e.multiplierDetails.base,
			adMultiplier: e.multiplierDetails.ad,
			linkMultiplier: e.multiplierDetails.link,
			eventMultiplier: e.multiplierDetails.event
		};
	});

	if ($$props.players === void 0 && $$bindings.players && players !== void 0) $$bindings.players(players);
	if ($$props.winners === void 0 && $$bindings.winners && winners !== void 0) $$bindings.winners(winners);
	$$result.css.add(css$p);

	return `<div class="${""}"><div class="${"pl-7 lg:pl-24 pt-8 lg:pt-12"}"><div class="${"mode-timer lg:flex items-end"}"><h1 class="${"text-6xl"}">Match Ended</h1></div></div>

    <div class="${"flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24"}"><div class="${"flex flex-col items-center lg:flex-row"}">
            ${each([data.find(e => e.rank === 0)], (winner, i) => `<div${add_classes([i > 0 ? "lg:ml-10" : ""].join(" ").trim())}><div><div class="${"ffa-player card user svelte-qzckga"}"><div class="${"max-w-full h-full bg-gradient-to-b from-primary to-legendary rounded-lg"}"></div>
                            <div class="${"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"}"></div>
                            <img class="${"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"}"${add_attribute("src", winner.avatarURL, 0)} alt="${""}">

                            <p class="${"player-name text-4xl svelte-qzckga"}">${escape(winner.username)}</p>
                            <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-qzckga"}"><p>Games won: <b class="${"svelte-qzckga"}">${escape(winner.wins)}</b>/7
                                </p></div>
                        </div></div>
                </div>`)}

            
            
            ${data.find(e => e.rank === 1)
	? `${each([data.find(e => e.rank === 1)], (winner, i) => `<div class="${"mt-10 lg:ml-10"}"><div><div class="${"ffa-player card user svelte-qzckga"}"><div class="${"max-w-full h-full bg-gradient-to-b from-primary to-epic  rounded-lg"}"></div>
                                <div class="${"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"}"></div>
                                <img class="${"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"}"${add_attribute("src", winner.avatarURL, 0)} alt="${""}">

                                <p class="${"player-name text-4xl svelte-qzckga"}">${escape(winner.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-qzckga"}"><p>Games won: <b class="${"svelte-qzckga"}">${escape(winner.wins)}</b>/7
                                    </p></div>
                            </div></div>
                    </div>`)}`
	: ``}

            
            ${data.find(e => e.rank === 2)
	? `${each([data.find(e => e.rank === 2)], (winner, i) => `<div class="${"mt-10 lg:mt-20 lg:ml-10"}"><div><div class="${"ffa-player card user svelte-qzckga"}"><div class="${"max-w-full h-full bg-gradient-to-b from-primary to-green  rounded-lg"}"></div>
                                <div class="${"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"}"></div>
                                <img class="${"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"}"${add_attribute("src", winner.avatarURL, 0)} alt="${""}">

                                <p class="${"player-name text-4xl svelte-qzckga"}">${escape(winner.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-qzckga"}"><p>Games won: <b class="${"svelte-qzckga"}">${escape(winner.wins)}</b>/7
                                    </p></div>
                            </div></div>
                    </div>`)}`
	: ``}</div>

        <div class="${"overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-20 lg:pb-8 lg:w-full"}"><table class="${"card px-4 /overflow-hidden mt-20 lg:mx-auto svelte-qzckga"}"><thead class="${"bg-primary "}"><tr><td class="${"px-6 py-3"}">Rank
                    </td>
                    <td class="${"px-6 py-3"}">Player
                    </td>
                    <td class="${"px-6 py-3"}">Wins
                    </td>
                    <td class="${"px-6 py-3"}">Games played
                    </td>
                    <td class="${"px-6 py-3"}">Earned
                    </td>
                    <td class="${"px-6 py-3"}">Multiplier
                    </td></tr></thead>
                <tbody class="${"divide-y-4 divide-background text-l"}">
                ${each(data, (winner, i) => `
                    ${winner.avatarURL || winner.username
	? `<tr class="${"text-center "}"><td class="${"px-6 py-2"}"><strong class="${[
			"font-normal",
			(winner.rank === 0 ? "text-legendary" : "") + " " + (winner.rank === 1 ? "text-epic" : "") + " " + (winner.rank === 2 ? "text-green" : "")
		].join(" ").trim()}">${escape(winner.rank + 1)}</strong></td>
                            <td class="${"flex items-center px-6 py-2"}"><img class="${"block w-10 h-10 rounded-full"}"${add_attribute("src", winner.avatarURL, 0)}${add_attribute("alt", winner.username, 0)}>
                                <p class="${"pl-2"}">${escape(winner.username)}</p></td>
                            <td class="${"px-6 py-2"}"><b class="${"font-normal svelte-qzckga"}">${escape(winner.wins)}</b>/7
                            </td>
                            <td class="${"px-6 py-2"}"><b class="${"font-normal svelte-qzckga"}">${escape(winner.gamesPlayed)}</b>/7
                            </td>
                            <td class="${"px-6 py-2"}">${escape(winner.coinsEarned)}</td>

                            <td class="${"px-6 py-2 relative"}"><div class="${"flex"}"><p>${escape(winner.multiplier)}</p>
                                    <div class="${"py-2 ml-3 px-2 rounded-full bg-primary mb-1"}"><svg class="${"w-3 h-3 fill-current my-auto"}" viewBox="${"0 0 17 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z"}"></path></svg>
                                    </div></div>
                                ${winner.areDetailsShown === true
		? `<span class="${"tooltip absolute -left-22 bottom-14     px-4 py-2 bg-black  rounded  text-left h-33 w-58     flex items-center justify-center z-40 svelte-qzckga"}"><ul><li class="${"svelte-qzckga"}"><b class="${"svelte-qzckga"}">BASE REWARD:</b>  ${escape(winner.baseMultiplier)}</li>
                                            <li class="${"svelte-qzckga"}"><b style="${"color: #fc1870"}" class="${"svelte-qzckga"}">ADS:</b> X${escape(winner.adMultiplier / 100 !== 0
			? winner.adMultiplier / 100
			: 1)}</li>

                                            <li class="${["svelte-qzckga", !winner.linkMultiplier ? "line-through" : ""].join(" ").trim()}"><b style="${"color: #3de488"}" class="${"svelte-qzckga"}">Invited by a friend:</b> +${escape(winner.linkMultiplier)}
                                                %</li>

                                            <li class="${["svelte-qzckga", !winner.eventMultiplier ? "line-through" : ""].join(" ").trim()}"><b style="${"color: #ee38ff"}" class="${"svelte-qzckga"}">EVENT:</b> +${escape(winner.eventMultiplier)}
                                                %</li></ul>
                                    </span>`
		: ``}</td>
                        </tr>`
	: ``}`)}</tbody></table></div></div></div>`;
});

function gradientGenerator(length) {
    const gradientList = ["from-primary to-epic", "from-primary to-green", "from-primary to-legendary", "from-epic to-legendary", "from-epic to-primary", "from-green to-primary", "from-legendary to-primary", "from-legendary to-epic"];
    const returnList = [];

    for(let i = 0; i <= length - 1; i++) {
        const randomGradient = gradientList.splice(Math.floor(Math.random() * gradientList.length), 1);
        returnList.push(randomGradient[0]);
    }

    return returnList;
}

/* src\routes\play\ffa\[id].svelte generated by Svelte v3.31.0 */

const css$q = {
	code: "b.svelte-xhfoph{@apply text-variant font-normal;}.b-primary.svelte-xhfoph{@apply text-primary font-normal;}.b-epic.svelte-xhfoph{@apply text-epic font-normal;}.b-legendary.svelte-xhfoph{@apply text-legendary font-normal;}.card.svelte-xhfoph{box-shadow:rgba(0, 0, 0, 0.55) 5px 5px 8px}.ffa-player.svelte-xhfoph{@apply relative w-53 h-88 text-center;}.ffa-player.svelte-xhfoph::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.25) 0%,\r\n                rgba(23, 23, 26, 0.39),\r\n                rgba(23, 23, 26, 0.33) 75%,\r\n                rgba(23, 23, 26, 0.38) 100%\r\n        )}.player-name.svelte-xhfoph{text-shadow:rgba(255, 255, 255, 0.4) 0 0 10px;@apply absolute z-10 top-16 left-0 right-0;}.stats.svelte-xhfoph{@apply absolute left-0 right-0 z-10;}.user.svelte-xhfoph{@apply w-60 h-100;}.timer.svelte-xhfoph{margin-bottom:0.35rem}.tooltip.svelte-xhfoph::after{content:\"\";position:absolute;top:100%;right:50%;border-width:10px;border-style:solid;border-color:#3d72e4 transparent transparent transparent}",
	map: "{\"version\":3,\"file\":\"[id].svelte\",\"sources\":[\"[id].svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\r\\n    import { onDestroy, onMount } from \\\"svelte\\\";\\r\\n    import { callApi } from \\\"../../../utils/api\\\";\\r\\n    import { goto, stores } from \\\"@sapper/app\\\";\\r\\n\\r\\n    import RefreshButton from \\\"../../../components/RefreshButton.svelte\\\";\\r\\n    import FfaEnd from \\\"../../../components/FfaEnd.svelte\\\";\\r\\n    import Loading from \\\"../../../components/Loading.svelte\\\";\\r\\n\\r\\n    import ErrorAlert from \\\"../../../components/ErrorAlert.svelte\\\";\\r\\n    import Infos from \\\"../../../components/Infos.svelte\\\";\\r\\n    import GuideCard from \\\"../../../components/GuideCard.svelte\\\";\\r\\n    import AdblockAlert from \\\"../../../components/AdblockAlert.svelte\\\";\\r\\n\\r\\n    import { fade, fly } from \\\"svelte/transition\\\";\\r\\n\\r\\n    import { counter } from \\\"../../../components/stores\\\";\\r\\n    import { io } from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../../../utils/config\\\";\\r\\n    import PlayAdButton from \\\"../../../components/PlayAdButton.svelte\\\";\\r\\n    import Quests from \\\"../../../components/Quests.svelte\\\";\\r\\n    import gradientGenerator from \\\"../../../utils/gradientGenerator\\\";\\r\\n    import { getCookie } from \\\"../../../utils/getCookie\\\";\\r\\n    import { serialize } from \\\"cookie\\\";\\r\\n    import { guideHandlerSetPage, guideHandlerStore } from \\\"../../../components/guideStore\\\";\\r\\n    import GuideContainer from \\\"../../../components/GuideContainer.svelte\\\";\\r\\n\\r\\n    const { page } = stores();\\r\\n\\r\\n    let id;\\r\\n\\r\\n    let matchFinishedTooltip;\\r\\n    let pages;\\r\\n    let user;\\r\\n    let match;\\r\\n    let quests;\\r\\n    let noAd\\r\\n    let isMatchEnded;\\r\\n    let countDown;\\r\\n    let tooltipOpen = false;\\r\\n\\r\\n    let userPlayer;\\r\\n    let players;\\r\\n    let info;\\r\\n    $: if (info) {\\r\\n        setTimeout(() => {\\r\\n            info = undefined;\\r\\n        }, 5000);\\r\\n    }\\r\\n\\r\\n    let adError;\\r\\n    $: if (adError) {\\r\\n        setTimeout(() => {\\r\\n            adError = undefined;\\r\\n        }, 25000);\\r\\n    }\\r\\n\\r\\n    let isFfaWatchAdVisible = false;\\r\\n    $: if (isFfaWatchAdVisible) {\\r\\n        console.log(isFfaWatchAdVisible);\\r\\n    }\\r\\n\\r\\n    let error;\\r\\n    let pushError;\\r\\n    let socket;\\r\\n    let isSpectator;\\r\\n    let isLoadingOpen = true;\\r\\n    let isToolTipVisible = false;\\r\\n    let timerId;\\r\\n    let gradientList;\\r\\n    let isGamesAlertPopupOpen;\\r\\n    let gameAlertAlreadyShown;\\r\\n\\r\\n    //guides\\r\\n    let currentGuide;\\r\\n\\r\\n    onMount(() => {\\r\\n        pages = page.subscribe(async value => {\\r\\n            isSpectator = value.query.spectator === \\\"true\\\";\\r\\n            user = undefined;\\r\\n            match = undefined;\\r\\n            isMatchEnded = undefined;\\r\\n            userPlayer = undefined;\\r\\n            players = undefined;\\r\\n            error = undefined;\\r\\n            socket = undefined;\\r\\n            id = value.params.id;\\r\\n            quests = undefined;\\r\\n\\r\\n            if (!value.params.id && !value.path.includes(\\\"/ffa/\\\")) return console.log(\\\"not a ffa match\\\");\\r\\n            let unsub = counter.subscribe((user1) => {\\r\\n                user = user1.content;\\r\\n            });\\r\\n            unsub();\\r\\n\\r\\n\\r\\n            try {\\r\\n                //Generate gradients\\r\\n                gradientList = gradientGenerator(8);\\r\\n\\r\\n                user = await user;\\r\\n                user = user.steam;\\r\\n                match = await callApi(\\\"get\\\", `/getMatch/${id}`);\\r\\n\\r\\n                if (match instanceof Error) {\\r\\n                    throw match;\\r\\n                }\\r\\n                isMatchEnded = match.finished;\\r\\n\\r\\n                //Start the countdown\\r\\n                filterUsers(false);\\r\\n                if (userPlayer.gamesPlayed === 7) {\\r\\n                    countDown = \\\"<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>\\\";\\r\\n                } else {\\r\\n                    const d = new Date(userPlayer.joinDate);\\r\\n                    const endsIn = -(\\r\\n                        (new Date().getTime() -\\r\\n                            new Date(d.setHours(d.getHours() + 1)).getTime()) /\\r\\n                        1000\\r\\n                    );\\r\\n                    if (endsIn < 1) {\\r\\n                        countDown = \\\"<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>\\\";\\r\\n                    } else {\\r\\n                        startTimer(endsIn);\\r\\n                    }\\r\\n                }\\r\\n\\r\\n\\r\\n                counter.set({ \\\"refresh\\\": true });\\r\\n\\r\\n                socket = io(apiUrl);\\r\\n                socket.on(\\\"connection\\\", (status) => {\\r\\n                    console.log(status);\\r\\n                    socket.emit(\\\"match connection\\\", \\\"FFA\\\" + id);\\r\\n                });\\r\\n\\r\\n                socket.on(\\\"join match\\\", (status) => {\\r\\n                    console.log(status);\\r\\n                });\\r\\n\\r\\n                socket.on(\\\"lobbyUpdate\\\", (value) => {\\r\\n                    match = value;\\r\\n                    filterUsers(true);\\r\\n                });\\r\\n                if (!isMatchEnded) {\\r\\n                    quests = await callApi(\\\"get\\\", \\\"/getSolo\\\");\\r\\n                    quests = quests.solo;\\r\\n                }\\r\\n                isLoadingOpen = false;\\r\\n            } catch (err) {\\r\\n                console.log(err);\\r\\n                if (err.response) {\\r\\n                    if (err.response.status === 400 && err.response.data.includes(\\\"Play at least one ranked\\\")) {\\r\\n                        error = \\\"You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)\\\";\\r\\n                        return;\\r\\n                    } else if (err.response.status === 400 && err.response.data.includes(\\\"Play at least one\\\")) {\\r\\n                        error = \\\"You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)\\\";\\r\\n                        return;\\r\\n                    } else if (err.response.status === 404) error = \\\"<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>\\\";\\r\\n                    return;\\r\\n                }\\r\\n                error = `<p class=\\\"text-accent\\\">Wow, unexpected error occured, details for geeks below.</p> <p class=\\\"text-2xl\\\">${err.toString()}</p>`;\\r\\n            }\\r\\n\\r\\n            //guides\\r\\n            guideHandlerSetPage(\\\"solo\\\");\\r\\n            guideHandlerStore.subscribe(value => {\\r\\n                currentGuide = value.current;\\r\\n                console.log(value.list);\\r\\n            });\\r\\n        });\\r\\n    });\\r\\n\\r\\n    onDestroy(() => {\\r\\n        if (pages) pages();\\r\\n    });\\r\\n\\r\\n\\r\\n    const filterUsers = (isFromSocket) => {\\r\\n        //Find user's object\\r\\n        if (isSpectator === true) {\\r\\n            players = [...match.players];\\r\\n            userPlayer = players.splice(0, 1)[0];\\r\\n            return;\\r\\n        }\\r\\n        let wins;\\r\\n        if (isFromSocket) wins = userPlayer.wins;\\r\\n        userPlayer = match.players.find(p => p.steamId === user.id);\\r\\n        if (isFromSocket) userPlayer.wins = wins;\\r\\n        //Delete user's object from array.\\r\\n        players = [...match.players];\\r\\n        players.splice(\\r\\n            match.players.findIndex(p => p.steamId === user.id),\\r\\n            1\\r\\n        );\\r\\n    };\\r\\n\\r\\n    //Function that starts a timer with a date, and refreshes it every second\\r\\n    function startTimer(duration) {\\r\\n        let timer = duration,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        if (timerId) clearInterval(timerId);\\r\\n        timerId = setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            countDown = minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = \\\"<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>\\\";\\r\\n            }\\r\\n        }, 1000);\\r\\n    }\\r\\n\\r\\n\\r\\n    //Function that handles the refresh button on click event\\r\\n    let isRefreshingStats = false;\\r\\n    const handleRefresh = async (isFromButton) => {\\r\\n        if ((userPlayer.gamesPlayed === 7 || userPlayer.joinDate + 3600 * 3 * 1000 < Date.now()) && isFromButton === true) return;\\r\\n        isRefreshingStats = true;\\r\\n        let winNb = userPlayer.gamesPlayed;\\r\\n\\r\\n        match = await callApi(\\\"get\\\", `/getMatch/${id}`);\\r\\n\\r\\n        filterUsers(false);\\r\\n        if (userPlayer.gamesPlayed !== winNb) {\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n            clearInterval(timerId);\\r\\n            if (userPlayer.gamesPlayed === 7) countDown = \\\"<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>\\\";\\r\\n\\r\\n        } else if (match.finished && isMatchEnded === false) {\\r\\n            isMatchEnded = true;\\r\\n            counter.set({ \\\"refresh\\\": true });\\r\\n        }\\r\\n\\r\\n        //0 games refreshed MODAL\\r\\n        let gamesAlertCookie = getCookie(\\\"gamesAlertState\\\");\\r\\n        if (userPlayer.gamesPlayed === 0 && gamesAlertCookie !== \\\"disabled\\\" && !gameAlertAlreadyShown) {\\r\\n            isGamesAlertPopupOpen = true;\\r\\n            gameAlertAlreadyShown = true;\\r\\n        }\\r\\n\\r\\n        isRefreshingStats = false;\\r\\n    };\\r\\n\\r\\n    const deactivate0GamesAlert = () => {\\r\\n        document.cookie = serialize(\\\"gamesAlertState\\\", \\\"disabled\\\", {\\r\\n            maxAge: 15552000,\\r\\n            sameSite: \\\"lax\\\",\\r\\n            path: \\\"/\\\"\\r\\n        });\\r\\n        isGamesAlertPopupOpen = false;\\r\\n    };\\r\\n\\r\\n    const handleQuit = async () => {\\r\\n        try {\\r\\n            const exitStatus = await callApi(\\\"post\\\", `/exitMatch`);\\r\\n            if (exitStatus instanceof Error) throw exitStatus;\\r\\n            goto(`/play?reloadNav=true`);\\r\\n        } catch (e) {\\r\\n            pushError = e.response.data.message ? e.response.data.message : e.response.data ? e.response.data.toString() : e.toString();\\r\\n            setTimeout(() => {\\r\\n                pushError = undefined;\\r\\n            }, 8000);\\r\\n        }\\r\\n    };\\r\\n\\r\\n    let isQuestsPanelOpen = false;\\r\\n\\r\\n    function handleQuestsPanel() {\\r\\n        isQuestsPanelOpen = !isQuestsPanelOpen;\\r\\n    }\\r\\n\\r\\n    async function endMatch() {\\r\\n        const result = await callApi(\\\"post\\\", \\\"/endMatch\\\");\\r\\n        if (result instanceof Error) return;\\r\\n        goto(\\\"/play?reloadNav=true&hasEndedMatch=true\\\");\\r\\n    }\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    b {\\r\\n        @apply text-variant font-normal;\\r\\n    }\\r\\n\\r\\n    .b-primary {\\r\\n        @apply text-primary font-normal;\\r\\n    }\\r\\n\\r\\n    .b-epic {\\r\\n        @apply text-epic font-normal;\\r\\n    }\\r\\n\\r\\n    .b-legendary {\\r\\n        @apply text-legendary font-normal;\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        box-shadow: rgba(0, 0, 0, 0.55) 5px 5px 8px;\\r\\n    }\\r\\n\\r\\n    .ffa-player {\\r\\n        @apply relative w-53 h-88 text-center;\\r\\n    }\\r\\n\\r\\n    .ffa-player::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.25) 0%,\\r\\n                rgba(23, 23, 26, 0.39),\\r\\n                rgba(23, 23, 26, 0.33) 75%,\\r\\n                rgba(23, 23, 26, 0.38) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    .player-name {\\r\\n        text-shadow: rgba(255, 255, 255, 0.4) 0 0 10px;\\r\\n        @apply absolute z-10 top-16 left-0 right-0;\\r\\n    }\\r\\n\\r\\n    .stats {\\r\\n        @apply absolute left-0 right-0 z-10;\\r\\n    }\\r\\n\\r\\n    .user {\\r\\n        @apply w-60 h-100;\\r\\n    }\\r\\n\\r\\n    .timer {\\r\\n        margin-bottom: 0.35rem;\\r\\n    }\\r\\n\\r\\n    .tooltip::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 100%;\\r\\n        right: 50%;\\r\\n        border-width: 10px;\\r\\n        border-style: solid;\\r\\n        border-color: #3d72e4 transparent transparent transparent;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Winhalla | Solo match</title>\\r\\n    <script async src=\\\"https://cdn.stat-rock.com/player.js\\\"></script>\\r\\n</svelte:head>\\r\\n\\r\\n\\r\\n{#if isLoadingOpen && !error }\\r\\n    <Loading data={\\\"Loading game data...\\\"} duration={500} />\\r\\n{/if}\\r\\n\\r\\n{#if error}\\r\\n    <div class=\\\"w-full content-center lg:mt-60 mt-25 \\\">\\r\\n        <h2 class=\\\"lg:text-5xl text-3xl text-center\\\">{@html error}</h2>\\r\\n        <a href=\\\"/play\\\"><p class=\\\"underline lg:text-3xl pt-4 text-2xl  text-center text-primary\\\">Go to play page</p></a>\\r\\n    </div>\\r\\n{:else}\\r\\n    {#if info}\\r\\n        <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n    {/if}\\r\\n    <AdblockAlert user=\\\"{userPlayer}\\\" />\\r\\n    <div class=\\\"h-full  \\\">\\r\\n\\r\\n        {#if currentGuide === \\\"main\\\"}\\r\\n            <div\\r\\n                class=\\\"absolute z-60  mx-4 mb-12 bottom-1/2 md:m-0  md:bottom-auto md:left-1/2 md:top-1/2  transform md:-translate-x-1/2 md:-translate-y-1/2\\\">\\r\\n\\r\\n                <GuideContainer title=\\\"SOLO match\\\" previous={false} scroll={0}>\\r\\n                    <div class=\\\"mt-1\\\">\\r\\n                        <p class=\\\"text-2xl md:text-3xl\\\">Welcome to the <b class=\\\"b-primary\\\">solo match</b> lobby!</p>\\r\\n                        <p class=\\\"mt-2 text-default md:text-2xl\\\"><b class=\\\"b-primary\\\">Play</b> some <b class=\\\"b-epic\\\">Brawlhalla\\r\\n                            ranked\\r\\n                            games</b> (1vs1 or 2vs2) <br class=\\\"hidden lg:block\\\"> to qualify for rewards</p>\\r\\n                    </div>\\r\\n                </GuideContainer>\\r\\n            </div>\\r\\n        {/if}\\r\\n\\r\\n        {#if match}\\r\\n\\r\\n            {#if isMatchEnded}\\r\\n                <FfaEnd players={match.players} winners={match.winners} />\\r\\n            {:else}\\r\\n                <div class=\\\"h-full flex items-center flex-col lg:block lg:ml-24 z-0\\\"\\r\\n                     class:hidden={isFfaWatchAdVisible || isQuestsPanelOpen}>\\r\\n                    <div\\r\\n                        class=\\\"flex flex-col justify-center lg:flex-row\\r\\n                    lg:justify-between items-center lg:mt-12 mt-7\\\">\\r\\n                        <div\\r\\n                            class=\\\"flex justify-center lg:justify-start\\r\\n                        items-end \\\">\\r\\n                            <h1 class=\\\"text-6xl leading-none\\\">Solo</h1>\\r\\n                            <p\\r\\n                                class=\\\"timer text-primary ml-5 text-3xl leading-none\\\">\\r\\n                                {#if countDown}{@html countDown}{:else}Loading...{/if}\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        {#if !isSpectator}\\r\\n                            <div\\r\\n                                class=\\\"lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\\r\\n                        items-center\\\">\\r\\n                                {#if currentGuide === \\\"play_ad\\\"}\\r\\n                                    <div class=\\\"absolute z-60  mx-4 top-64 md:m-0 md:top-56 lg:right-64  lg:top-34\\\">\\r\\n\\r\\n                                        <GuideContainer title=\\\"Multiply your rewards\\\" scroll={85}>\\r\\n                                            <div class=\\\"mt-1\\\">\\r\\n                                                <p class=\\\"text-2xl md:text-3xl\\\"><b class=\\\"b-primary\\\">Each ad</b> you\\r\\n                                                    watch gives you a <b class=\\\"b-epic\\\">x1 boost</b> <!-- adboost -->\\r\\n                                                    <br class=\\\"hidden md:block\\\"> on your <b class=\\\"b-primary\\\">final\\r\\n                                                        reward</b></p>\\r\\n                                                <p class=\\\"mt-2  text-default md:text-2xl\\\">You can watch up to <b\\r\\n                                                    class=\\\"b-primary\\\">8\\r\\n                                                    ads</b> (<b class=\\\"b-epic\\\">x24 boost</b>)</p>\\r\\n\\r\\n                                                <p class=\\\"mt-4  text-xl md:text-default text-mid-light italic\\\">Note:\\r\\n                                                    having a 10 coin reward, and watching 8 ads,\\r\\n                                                    <br class=\\\"hidden md:block\\\"> will give you 240 coins! (10 * 24 =\\r\\n                                                    240)\\r\\n                                            </div>\\r\\n                                        </GuideContainer>\\r\\n                                    </div>\\r\\n                                {/if}\\r\\n\\r\\n                                {#if currentGuide === \\\"refresh_data\\\"}\\r\\n                                    <div class=\\\"absolute z-60  mx-4 top-82  md:m-0 md:top-73  lg:right-32  lg:top-34\\\">\\r\\n\\r\\n                                        <GuideContainer title=\\\"Refresh data\\\" scroll={250}>\\r\\n                                            <div class=\\\"mt-1\\\">\\r\\n                                                <p class=\\\"text-2xl md:text-3xl\\\">Use this button to <b class=\\\"b-epic\\\">refresh</b>\\r\\n                                                    your <b class=\\\"b-primary\\\">displayed data</b>!</p>\\r\\n                                                <p class=\\\"mt-4 text-default md:text-2xl\\\">Due to the <b\\r\\n                                                    class=\\\"b-primary\\\">Brawlhalla API latency</b>, your\\r\\n                                                    data may <br class=\\\"hidden md:block\\\"> take up to <b\\r\\n                                                        class=\\\"b-legendary\\\">15-20 minutes</b> to refresh.</p>\\r\\n                                                <p class=\\\"mt-3 text-default md:text-2xl\\\"> We usually observe that it <b\\r\\n                                                    class=\\\"b-epic\\\">refreshes instantly</b>\\r\\n                                                    <br class=\\\"hidden md:block\\\">after the <b class=\\\"b-primary\\\">7th\\r\\n                                                        game</b> you play</p>\\r\\n                                                <p class=\\\"mt-6  text-xl md:text-default text-mid-light italic\\\">Info:\\r\\n                                                    We will automatically refresh your data every 30 minutes\\r\\n                                            </div>\\r\\n                                        </GuideContainer>\\r\\n                                    </div>\\r\\n\\r\\n                                {/if}\\r\\n                                <p class=\\\"text-center lg:text-left mx-4 mt-1 lg:mt-0   {currentGuide === 'play_ad' ? 'z-60  relative' : ''}\\\">\\r\\n                                    You watched <strong\\r\\n                                    class=\\\"text-green font-normal text-3xl\\\">{userPlayer.adsWatched}\\r\\n                                    ad{userPlayer.adsWatched > 1 ? \\\"s\\\" : \\\"\\\"}</strong>, earnings will be multiplied\\r\\n                                    by\\r\\n                                    <strong\\r\\n                                        class=\\\"text-green text-3xl font-normal\\\">{userPlayer.multiplier / 100}</strong>!\\r\\n                                </p>\\r\\n                                <div class=\\\"{currentGuide === 'play_ad' ? 'z-60  relative' : ''}\\\">\\r\\n                                    <PlayAdButton socket={socket} id={id} bind:userPlayer={userPlayer}\\r\\n                                                  bind:adError={adError}\\r\\n                                                  bind:info={info} />\\r\\n                                </div>\\r\\n\\r\\n\\r\\n                                <div class=\\\"{currentGuide === 'refresh_data' ? 'z-60 relative' : ''}\\\"\\r\\n                                     on:click={() => handleRefresh(true)}\\r\\n                                     on:mouseenter={() => matchFinishedTooltip = true}\\r\\n                                     on:mouseleave={() => matchFinishedTooltip = false}>\\r\\n                                    <RefreshButton\\r\\n\\r\\n                                        isRefreshing={isRefreshingStats}\\r\\n                                        refreshMessage={\\\"Refresh data\\\"}\\r\\n                                        deactivated={userPlayer.gamesPlayed === 7 || userPlayer.joinDate+ 3600 * 3 * 1000 < Date.now()} />\\r\\n                                    {#if matchFinishedTooltip && user.gamesPlayed >= 7}\\r\\n                                        <span\\r\\n                                            class=\\\"absolute right-5 left-5 lg:left-74/100 lg:right-30 lg:-top-6 top-60 lg:-top-6 px-6 py-2 tooltip bg-primary rounded flex items-center justify-center\\\"\\r\\n                                            style=\\\"z-index: 60\\\"\\r\\n                                            transition:fade> You have already finished this match. Start another one!\\r\\n                                        </span>\\r\\n                                    {/if}\\r\\n                                </div>\\r\\n\\r\\n\\r\\n                                {#if userPlayer.gamesPlayed === 0}\\r\\n                                    <button\\r\\n                                        class=\\\"button button-brand quit lg:ml-4 mt-3\\r\\n                                lg:mt-0\\\" style=\\\"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;\\\"\\r\\n                                        on:click={() => handleQuit()}>\\r\\n                                        Quit lobby\\r\\n                                    </button>\\r\\n                                    {#if pushError}\\r\\n                                        <ErrorAlert message=\\\"There was an error exiting the match\\\"\\r\\n                                                    pushError={pushError} />\\r\\n                                    {/if}\\r\\n                                {:else if userPlayer.gamesPlayed !== 7 && userPlayer.joinDate + 3600 * 3 * 1000 > Date.now()}\\r\\n                                    <button\\r\\n                                        class=\\\"button button-brand quit lg:ml-4 mt-3\\r\\n                                lg:mt-0\\\" style=\\\"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;\\\"\\r\\n                                        on:click={() => endMatch()}>\\r\\n                                        <div class=\\\"flex\\\">\\r\\n                                            <p>End match</p>\\r\\n                                            <div class=\\\"py-2 px-2 ml-2 rounded-full bg-primary mb-1\\\"\\r\\n                                                 on:mouseenter={() => tooltipOpen = true}\\r\\n                                                 on:mouseleave={() => tooltipOpen = false}>\\r\\n                                                <svg\\r\\n                                                    class=\\\"w-3 h-3 fill-current my-auto\\\"\\r\\n                                                    viewBox=\\\"0 0 17 24\\\"\\r\\n                                                    xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                                    <path\\r\\n                                                        d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\" />\\r\\n                                                </svg>\\r\\n                                            </div>\\r\\n                                            {#if tooltipOpen}\\r\\n                                                <span\\r\\n                                                    class=\\\"absolute right-24 w-50 top-4 px-6 py-2 bg-green text-background rounded text-left flex items-center justify-center z-40\\\"\\r\\n                                                    transition:fade>Exit the match before it ends to start another one, useful if you want to start another match before this one ended\\r\\n                                                </span>\\r\\n                                            {/if}\\r\\n                                        </div>\\r\\n                                    </button>\\r\\n                                {:else}\\r\\n                                    <a href=\\\"/play/ffa\\\" class=\\\"button button-brand text-background lg:ml-4 mt-3\\r\\n                                    lg:mt-0\\\" style=\\\"background-color: #3de488;\\\">Start another match</a>\\r\\n                                {/if}\\r\\n\\r\\n                            </div>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n\\r\\n                    <div\\r\\n                        class=\\\"flex items-center flex-col lg:flex-row lg:items-start\\r\\n                    h-full lg:mt-6 \\\">\\r\\n                        <!--Main Player-->\\r\\n                        {#if userPlayer}\\r\\n                            <div class=\\\"mt-8 lg:mt-25 ffa-player card user \\\" style=\\\"min-width: 14rem\\\">\\r\\n                                <div class=\\\"max-w-full h-full bg-gradient-to-b {gradientList[0]} rounded-lg\\\"></div>\\r\\n                                <div\\r\\n                                    class=\\\"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask\\\"></div>\\r\\n                                <img\\r\\n                                    class=\\\"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full\\\"\\r\\n                                    src=\\\"{userPlayer.avatarURL}\\\" alt=\\\"\\\">\\r\\n\\r\\n\\r\\n                                <p class=\\\"player-name text-4xl\\\">\\r\\n                                    {userPlayer.username}\\r\\n                                </p>\\r\\n                                <div\\r\\n                                    class=\\\"stats text-2xl bottom-5 text-ultra-light\\\">\\r\\n                                    <p>\\r\\n                                        Games played:\\r\\n                                        <b>{userPlayer.gamesPlayed}</b>\\r\\n                                        /7\\r\\n                                    </p>\\r\\n                                    <p>\\r\\n                                        Games won:\\r\\n                                        <b>{userPlayer.wins}</b>\\r\\n                                        /7\\r\\n                                    </p>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/if}\\r\\n\\r\\n                        <!--Other Players-->\\r\\n                        {#if players}\\r\\n                            <div\\r\\n                                class=\\\"flex flex-col justify-center lg:justify-start\\r\\n                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0 mb-12\\\">\\r\\n                                <div class=\\\"mx-auto lg:mx-0 my-5 lg:my:0\\\" style=\\\"flex-basis: 21%\\\">\\r\\n                                    <div style=\\\"max-width: 13rem; max-height: 28rem\\\">\\r\\n                                        <script\\r\\n                                            src=\\\"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b\\\"\\r\\n                                            data-pa-tag async></script>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                                {#each players as player, i}\\r\\n                                    <div style=\\\"flex-basis: 21%\\\">\\r\\n                                        <div class=\\\"ffa-player card lg:mr-12 mb-8 mx-auto lg:mx-0\\\"\\r\\n                                             style=\\\"max-width: 13rem\\\">\\r\\n                                            <div\\r\\n                                                class=\\\"max-w-full h-full bg-gradient-to-b {gradientList[i + 1]}  rounded-lg\\\"\\r\\n                                            ></div>\\r\\n                                            <div\\r\\n                                                class=\\\"ppMask block w-24 h-24 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black\\\"></div>\\r\\n                                            <img\\r\\n                                                class=\\\"block w-24 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full\\\"\\r\\n                                                src=\\\"{player.avatarURL}\\\" alt=\\\"\\\">\\r\\n\\r\\n\\r\\n                                            <p class=\\\"player-name text-3xl\\\">\\r\\n                                                {player.username}\\r\\n                                            </p>\\r\\n                                            <div\\r\\n                                                class=\\\"stats text-xl bottom-5\\r\\n                                        text-ultra-light\\\">\\r\\n                                                <p>\\r\\n                                                    Games played:\\r\\n                                                    <b>{player.gamesPlayed}</b>\\r\\n                                                    /7\\r\\n                                                </p>\\r\\n                                            </div>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                {/each}\\r\\n                                <div class=\\\"flex justify-center items-center flex-col\\\">\\r\\n                                    {#if players.length < 8}\\r\\n                                        <p class=\\\"text-4xl mx-6 my-4\\\">Waiting for players, you can start playing\\r\\n                                            Brawlhalla</p>\\r\\n                                    {/if}\\r\\n                                    <div class=\\\"hidden lg:block\\\">\\r\\n                                        <script\\r\\n                                            src=\\\"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b\\\"\\r\\n                                            data-pa-tag async></script>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                    <GuideCard page=\\\"ffa\\\" />\\r\\n\\r\\n                    {#if isGamesAlertPopupOpen}\\r\\n                        <div\\r\\n                            class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center\\\"\\r\\n                            style=\\\"z-index: 100\\\"\\r\\n                            in:fade={{duration: 200}}\\r\\n                            out:fade={{duration: 350}}>\\r\\n\\r\\n                            <div\\r\\n                                class=\\\"max-w-xl    mx-5 my-1 md:mx-0  px-6 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-auto md:overflow-y-auto\\\"\\r\\n                                style=\\\"max-height: 95vh;\\\"\\r\\n                                transition:fly={{ y: 300, duration: 350 }}>\\r\\n                                <h2 class=\\\"text-4xl md:text-5xl\\\">The number of games hasn't been <b\\r\\n                                    style=\\\"color: #fc1870\\\">updated</b>\\r\\n                                </h2>\\r\\n\\r\\n                                <p class=\\\"mt-1 text-green    text-4xl\\\">Why ?</p>\\r\\n                                <div class=\\\"ml-6 my-6 text-mid-light text-2xl\\\">\\r\\n                                    <p>- The number of games takes on average <u>10 minutes</u> to actualise, but it can\\r\\n                                        be <u>longer</u></p>\\r\\n                                    <p class=\\\"mt-3 font-normal\\\">- We observed that it usually <b style=\\\"color: #3d72e4\\\">instantly\\r\\n                                        updates</b> after the <b style=\\\"color: #3d72e4\\\">7th game</b>: try to play the 7\\r\\n                                        games then click the refresh button</p>\\r\\n                                </div>\\r\\n                                <div class=\\\"mt-8\\\">\\r\\n                                    <button class=\\\"button button-brand w-full md:w-auto\\\"\\r\\n                                            on:click={() =>isGamesAlertPopupOpen = false}>Got it!\\r\\n                                    </button>\\r\\n                                    <button\\r\\n                                        class=\\\"button button-brand-alternative /hover:underline md:ml-4 w-full md:w-auto mt-4 md:mt-0\\\"\\r\\n                                        on:click={deactivate0GamesAlert}>Don't show this again\\r\\n                                    </button>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    {/if}\\r\\n                    <div class=\\\"block lg:hidden mt-6\\\">\\r\\n                        <script\\r\\n                            src=\\\"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b\\\"\\r\\n                            data-pa-tag async></script>\\r\\n                    </div>\\r\\n                </div>\\r\\n\\r\\n            {/if}\\r\\n            {#if quests}\\r\\n                {#if isQuestsPanelOpen}\\r\\n                    <div class=\\\"lg:flex md:absolute top-0 bottom-0 left-0 right-0 z-40 overflow-x-hidden\\\">\\r\\n\\r\\n                        <!--TRANSPARENT PART-->\\r\\n                        <div class=\\\"hidden lg:block lg:w-1/2 2xl:w-full bg-background bg-opacity-70\\\"\\r\\n                             in:fly={{x: 1000, duration: 800}} out:fly={{x: 1800, duration: 1400}}></div>\\r\\n                        <div\\r\\n                            class=\\\"bg-background w-full h-full lg:w-auto  lg:min-w-max   h-full  z-10 lg:border-l-2 border-primary flex justify-center items-center\\\"\\r\\n                            in:fly={{x: 500, duration: 600}} out:fly={{x: 900, duration: 700}}>\\r\\n                            <div class=\\\"lg:-mt-32 lg:flex items-center h-full\\\">\\r\\n                                <button\\r\\n                                    class=\\\"fixed lg:static z-40 top-24 right-4 lg:block focus:outline-none lg:h-full\\\"\\r\\n                                    on:click={() => handleQuestsPanel()}>\\r\\n                                    <svg class=\\\"hidden lg:block w-6 fill-current ml-8 text-font\\\"\\r\\n                                         viewBox=\\\"0 0 24 24\\\"\\r\\n                                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                            d=\\\"m4.8 21.57 2.422 2.43 11.978-12-11.978-12-2.422 2.43 9.547 9.57z\\\" />\\r\\n                                    </svg>\\r\\n                                    <svg\\r\\n                                        class=\\\"lg:hidden w-8 h-8 fill-current text-mid-light\\\"\\r\\n                                        viewBox=\\\"0 0 28 24\\\"\\r\\n                                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                            d=\\\"m24 2.4-2.4-2.4-9.6\\r\\n                                            9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6\\r\\n                                            2.4 2.4 9.6-9.6 9.6 9.6\\r\\n                                            2.4-2.4-9.6-9.6z\\\" />\\r\\n                                    </svg>\\r\\n                                </button>\\r\\n                                <div class=\\\"bg-background lg:pl-14 lg:pr-24\\\">\\r\\n                                    <Quests data={quests} />\\r\\n                                </div>\\r\\n                            </div>\\r\\n\\r\\n                        </div>\\r\\n                    </div>\\r\\n                {:else}\\r\\n                    <div class=\\\"fixed md:absolute right-0 top-1/2 transform -translate-y-1/2     mr-4\\\"\\r\\n                         class:hidden={isFfaWatchAdVisible}>\\r\\n                        <div class=\\\"relative\\\">\\r\\n                            {#if isToolTipVisible}\\r\\n                                <span\\r\\n                                    class=\\\"hidden lg:block tooltip absolute -left-16 bottom-14 px-6 py-2 bg-primary rounded text-left flex items-center justify-center z-40\\\"\\r\\n                                    transition:fade>\\r\\n                                    Quests\\r\\n                                </span>\\r\\n                            {/if}\\r\\n\\r\\n                            <button class=\\\"focus:outline-none\\\" on:click={() => handleQuestsPanel()}\\r\\n                                    on:mouseenter={() => isToolTipVisible = true}\\r\\n                                    on:mouseleave={() => isToolTipVisible = false}>\\r\\n                                <svg class=\\\"w-8 fill-current text-mid-light\\\" viewBox=\\\"0 0 27 24\\\"\\r\\n                                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                    <path\\r\\n                                        d=\\\"m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z\\\" />\\r\\n                                </svg>\\r\\n                            </button>\\r\\n                        </div>\\r\\n                    </div>\\r\\n\\r\\n\\r\\n                {/if}\\r\\n\\r\\n            {/if}\\r\\n\\r\\n        {:else}\\r\\n            <Loading data={\\\"Loading game data...\\\"} />\\r\\n        {/if}\\r\\n\\r\\n\\r\\n    </div>\\r\\n\\r\\n{/if}\\r\\n\\r\\n<div>\\r\\n    {#if adError}\\r\\n        <ErrorAlert message=\\\"An error occurred while watching the ad\\\" pushError={adError} />\\r\\n    {/if}\\r\\n</div>\\r\\n<div hidden\\r\\n     class=\\\"text-epic bg-epic border-epic from-primary from-epic from-green from-legendary to-epic to-green to-legendary to-primary\\\"></div>\\r\\n\"],\"names\":[],\"mappings\":\"AA+RI,CAAC,cAAC,CAAC,AACC,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,UAAU,cAAC,CAAC,AACR,OAAO,YAAY,CAAC,WAAW,CAAC,AACpC,CAAC,AAED,OAAO,cAAC,CAAC,AACL,OAAO,SAAS,CAAC,WAAW,CAAC,AACjC,CAAC,AAED,YAAY,cAAC,CAAC,AACV,OAAO,cAAc,CAAC,WAAW,CAAC,AACtC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,AAC/C,CAAC,AAED,WAAW,cAAC,CAAC,AACT,OAAO,QAAQ,CAAC,IAAI,CAAC,IAAI,CAAC,WAAW,CAAC,AAC1C,CAAC,AAED,yBAAW,OAAO,AAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC;gBAC1B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,YAAY,cAAC,CAAC,AACV,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC9C,OAAO,QAAQ,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,OAAO,CAAC,AAC/C,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,OAAO,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,AACxC,CAAC,AAED,KAAK,cAAC,CAAC,AACH,OAAO,IAAI,CAAC,KAAK,CAAC,AACtB,CAAC,AAED,MAAM,cAAC,CAAC,AACJ,aAAa,CAAE,OAAO,AAC1B,CAAC,AAED,sBAAQ,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,CAClB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC7D,CAAC\"}"
};

const U5Bidu5D$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const { page } = stores$1();
	let id;
	let pages;
	let user;
	let match;
	let quests;
	let isMatchEnded;
	let countDown;
	let userPlayer;
	let players;
	let info;
	let adError;
	let error;
	let socket;
	let isSpectator;
	let isLoadingOpen = true;
	let timerId;
	let gradientList;

	//guides
	let currentGuide;

	onMount(() => {
		pages = page.subscribe(async value => {
			isSpectator = value.query.spectator === "true";
			user = undefined;
			match = undefined;
			isMatchEnded = undefined;
			userPlayer = undefined;
			players = undefined;
			error = undefined;
			socket = undefined;
			id = value.params.id;
			quests = undefined;
			if (!value.params.id && !value.path.includes("/ffa/")) return console.log("not a ffa match");

			let unsub = counter.subscribe(user1 => {
				user = user1.content;
			});

			unsub();

			try {
				//Generate gradients
				gradientList = gradientGenerator(8);

				user = await user;
				user = user.steam;
				match = await callApi("get", `/getMatch/${id}`);

				if (match instanceof Error) {
					throw match;
				}

				isMatchEnded = match.finished;

				//Start the countdown
				filterUsers(false);

				if (userPlayer.gamesPlayed === 7) {
					countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
				} else {
					const d = new Date(userPlayer.joinDate);
					const endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 1)).getTime()) / 1000);

					if (endsIn < 1) {
						countDown = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
					} else {
						startTimer(endsIn);
					}
				}

				counter.set({ "refresh": true });
				socket = socket_ioClient.io(apiUrl);

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

				if (!isMatchEnded) {
					quests = await callApi("get", "/getSolo");
					quests = quests.solo;
				}

				isLoadingOpen = false;
			} catch(err) {
				console.log(err);

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

			//guides
			guideHandlerSetPage("solo");

			guideHandlerStore.subscribe(value => {
				currentGuide = value.current;
				console.log(value.list);
			});
		});
	});

	onDestroy(() => {
		if (pages) pages();
	});

	const filterUsers = isFromSocket => {
		//Find user's object
		if (isSpectator === true) {
			players = [...match.players];
			userPlayer = players.splice(0, 1)[0];
			return;
		}

		let wins;
		if (isFromSocket) wins = userPlayer.wins;
		userPlayer = match.players.find(p => p.steamId === user.id);
		if (isFromSocket) userPlayer.wins = wins;

		//Delete user's object from array.
		players = [...match.players];

		players.splice(match.players.findIndex(p => p.steamId === user.id), 1);
	};

	//Function that starts a timer with a date, and refreshes it every second
	function startTimer(duration) {
		let timer = duration, minutes, seconds;
		if (timerId) clearInterval(timerId);

		timerId = setInterval(
			function () {
				seconds = Math.floor(timer % 60);
				minutes = Math.floor(timer / 60 % 60);
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				countDown = minutes + ":" + seconds;

				if (--timer < 0) {
					timer = "<p class='text-2xl'>Waiting for others to finish <br>(you can start a new game from the play page)</p>";
				}
			},
			1000
		);
	}

	//Function that handles the refresh button on click event
	let isRefreshingStats = false;

	$$result.css.add(css$q);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		 {
			if (info) {
				setTimeout(
					() => {
						info = undefined;
					},
					5000
				);
			}
		}

		 {
			if (adError) {
				setTimeout(
					() => {
						adError = undefined;
					},
					25000
				);
			}
		}

		$$rendered = `${($$result.head += `${($$result.title = `<title>Winhalla | Solo match</title>`, "")}<script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-y61q99"></script>`, "")}


${isLoadingOpen && !error
		? `${validate_component(Loading, "Loading").$$render(
				$$result,
				{
					data: "Loading game data...",
					duration: 500
				},
				{},
				{}
			)}`
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
    ${validate_component(AdblockAlert, "AdblockAlert").$$render($$result, { user: userPlayer }, {}, {})}
    <div class="${"h-full  "}">${currentGuide === "main"
			? `<div class="${"absolute z-60  mx-4 mb-12 bottom-1/2 md:m-0  md:bottom-auto md:left-1/2 md:top-1/2  transform md:-translate-x-1/2 md:-translate-y-1/2"}">${validate_component(GuideContainer, "GuideContainer").$$render(
					$$result,
					{
						title: "SOLO match",
						previous: false,
						scroll: 0
					},
					{},
					{
						default: () => `<div class="${"mt-1"}"><p class="${"text-2xl md:text-3xl"}">Welcome to the <b class="${"b-primary svelte-xhfoph"}">solo match</b> lobby!</p>
                        <p class="${"mt-2 text-default md:text-2xl"}"><b class="${"b-primary svelte-xhfoph"}">Play</b> some <b class="${"b-epic svelte-xhfoph"}">Brawlhalla
                            ranked
                            games</b> (1vs1 or 2vs2) <br class="${"hidden lg:block"}"> to qualify for rewards</p></div>`
					}
				)}</div>`
			: ``}

        ${match
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
				: `<div class="${[
						"h-full flex items-center flex-col lg:block lg:ml-24 z-0",
						 ""
					].join(" ").trim()}"><div class="${"flex flex-col justify-center lg:flex-row\r\n                    lg:justify-between items-center lg:mt-12 mt-7"}"><div class="${"flex justify-center lg:justify-start\r\n                        items-end "}"><h1 class="${"text-6xl leading-none"}">Solo</h1>
                            <p class="${"timer text-primary ml-5 text-3xl leading-none svelte-xhfoph"}">${countDown ? `${countDown}` : `Loading...`}</p></div>
                        ${!isSpectator
					? `<div class="${"lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\r\n                        items-center"}">${currentGuide === "play_ad"
						? `<div class="${"absolute z-60  mx-4 top-64 md:m-0 md:top-56 lg:right-64  lg:top-34"}">${validate_component(GuideContainer, "GuideContainer").$$render(
								$$result,
								{
									title: "Multiply your rewards",
									scroll: 85
								},
								{},
								{
									default: () => `<div class="${"mt-1"}"><p class="${"text-2xl md:text-3xl"}"><b class="${"b-primary svelte-xhfoph"}">Each ad</b> you
                                                    watch gives you a <b class="${"b-epic svelte-xhfoph"}">x1 boost</b> 
                                                    <br class="${"hidden md:block"}"> on your <b class="${"b-primary svelte-xhfoph"}">final
                                                        reward</b></p>
                                                <p class="${"mt-2  text-default md:text-2xl"}">You can watch up to <b class="${"b-primary svelte-xhfoph"}">8
                                                    ads</b> (<b class="${"b-epic svelte-xhfoph"}">x24 boost</b>)</p>

                                                <p class="${"mt-4  text-xl md:text-default text-mid-light italic"}">Note:
                                                    having a 10 coin reward, and watching 8 ads,
                                                    <br class="${"hidden md:block"}"> will give you 240 coins! (10 * 24 =
                                                    240)
                                            </p></div>`
								}
							)}</div>`
						: ``}

                                ${currentGuide === "refresh_data"
						? `<div class="${"absolute z-60  mx-4 top-82  md:m-0 md:top-73  lg:right-32  lg:top-34"}">${validate_component(GuideContainer, "GuideContainer").$$render($$result, { title: "Refresh data", scroll: 250 }, {}, {
								default: () => `<div class="${"mt-1"}"><p class="${"text-2xl md:text-3xl"}">Use this button to <b class="${"b-epic svelte-xhfoph"}">refresh</b>
                                                    your <b class="${"b-primary svelte-xhfoph"}">displayed data</b>!</p>
                                                <p class="${"mt-4 text-default md:text-2xl"}">Due to the <b class="${"b-primary svelte-xhfoph"}">Brawlhalla API latency</b>, your
                                                    data may <br class="${"hidden md:block"}"> take up to <b class="${"b-legendary svelte-xhfoph"}">15-20 minutes</b> to refresh.</p>
                                                <p class="${"mt-3 text-default md:text-2xl"}">We usually observe that it <b class="${"b-epic svelte-xhfoph"}">refreshes instantly</b>
                                                    <br class="${"hidden md:block"}">after the <b class="${"b-primary svelte-xhfoph"}">7th
                                                        game</b> you play</p>
                                                <p class="${"mt-6  text-xl md:text-default text-mid-light italic"}">Info:
                                                    We will automatically refresh your data every 30 minutes
                                            </p></div>`
							})}</div>`
						: ``}
                                <p class="${"text-center lg:text-left mx-4 mt-1 lg:mt-0   " + escape(currentGuide === "play_ad" ? "z-60  relative" : "")}">You watched <strong class="${"text-green font-normal text-3xl"}">${escape(userPlayer.adsWatched)}
                                    ad${escape(userPlayer.adsWatched > 1 ? "s" : "")}</strong>, earnings will be multiplied
                                    by
                                    <strong class="${"text-green text-3xl font-normal"}">${escape(userPlayer.multiplier / 100)}</strong>!
                                </p>
                                <div${add_attribute("class", currentGuide === "play_ad" ? "z-60  relative" : "", 0)}>${validate_component(PlayAdButton, "PlayAdButton").$$render(
							$$result,
							{ socket, id, userPlayer, adError, info },
							{
								userPlayer: $$value => {
									userPlayer = $$value;
									$$settled = false;
								},
								adError: $$value => {
									adError = $$value;
									$$settled = false;
								},
								info: $$value => {
									info = $$value;
									$$settled = false;
								}
							},
							{}
						)}</div>


                                <div${add_attribute("class", currentGuide === "refresh_data" ? "z-60 relative" : "", 0)}>${validate_component(RefreshButton, "RefreshButton").$$render(
							$$result,
							{
								isRefreshing: isRefreshingStats,
								refreshMessage: "Refresh data",
								deactivated: userPlayer.gamesPlayed === 7 || userPlayer.joinDate + 3600 * 3 * 1000 < Date.now()
							},
							{},
							{}
						)}
                                    ${ ``}</div>


                                ${userPlayer.gamesPlayed === 0
						? `<button class="${"button button-brand quit lg:ml-4 mt-3\r\n                                lg:mt-0"}" style="${"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;"}">Quit lobby
                                    </button>
                                    ${ ``}`
						: `${userPlayer.gamesPlayed !== 7 && userPlayer.joinDate + 3600 * 3 * 1000 > Date.now()
							? `<button class="${"button button-brand quit lg:ml-4 mt-3\r\n                                lg:mt-0"}" style="${"background-color: #fc1870; padding-left: 1.5rem; padding-right: 1.5rem;"}"><div class="${"flex"}"><p>End match</p>
                                            <div class="${"py-2 px-2 ml-2 rounded-full bg-primary mb-1"}"><svg class="${"w-3 h-3 fill-current my-auto"}" viewBox="${"0 0 17 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z"}"></path></svg></div>
                                            ${ ``}</div></button>`
							: `<a href="${"/play/ffa"}" class="${"button button-brand text-background lg:ml-4 mt-3\r\n                                    lg:mt-0"}" style="${"background-color: #3de488;"}">Start another match</a>`}`}</div>`
					: ``}</div>

                    <div class="${"flex items-center flex-col lg:flex-row lg:items-start\r\n                    h-full lg:mt-6 "}">
                        ${userPlayer
					? `<div class="${"mt-8 lg:mt-25 ffa-player card user  svelte-xhfoph"}" style="${"min-width: 14rem"}"><div class="${"max-w-full h-full bg-gradient-to-b " + escape(gradientList[0]) + " rounded-lg" + " svelte-xhfoph"}"></div>
                                <div class="${"block w-28 h-28 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ppMask"}"></div>
                                <img class="${"block w-28 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"}"${add_attribute("src", userPlayer.avatarURL, 0)} alt="${""}">


                                <p class="${"player-name text-4xl svelte-xhfoph"}">${escape(userPlayer.username)}</p>
                                <div class="${"stats text-2xl bottom-5 text-ultra-light svelte-xhfoph"}"><p>Games played:
                                        <b class="${"svelte-xhfoph"}">${escape(userPlayer.gamesPlayed)}</b>
                                        /7
                                    </p>
                                    <p>Games won:
                                        <b class="${"svelte-xhfoph"}">${escape(userPlayer.wins)}</b>
                                        /7
                                    </p></div></div>`
					: ``}

                        
                        ${players
					? `<div class="${"flex flex-col justify-center lg:justify-start\r\n                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0 mb-12"}"><div class="${"mx-auto lg:mx-0 my-5 lg:my:0"}" style="${"flex-basis: 21%"}"><div style="${"max-width: 13rem; max-height: 28rem"}"><script src="${"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"}" data-pa-tag async></script></div></div>
                                ${each(players, (player, i) => `<div style="${"flex-basis: 21%"}"><div class="${"ffa-player card lg:mr-12 mb-8 mx-auto lg:mx-0 svelte-xhfoph"}" style="${"max-width: 13rem"}"><div class="${"max-w-full h-full bg-gradient-to-b " + escape(gradientList[i + 1]) + "  rounded-lg" + " svelte-xhfoph"}"></div>
                                            <div class="${"ppMask block w-24 h-24 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"}"></div>
                                            <img class="${"block w-24 z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"}"${add_attribute("src", player.avatarURL, 0)} alt="${""}">


                                            <p class="${"player-name text-3xl svelte-xhfoph"}">${escape(player.username)}</p>
                                            <div class="${"stats text-xl bottom-5\r\n                                        text-ultra-light svelte-xhfoph"}"><p>Games played:
                                                    <b class="${"svelte-xhfoph"}">${escape(player.gamesPlayed)}</b>
                                                    /7
                                                </p>
                                            </div></div>
                                    </div>`)}
                                <div class="${"flex justify-center items-center flex-col"}">${players.length < 8
						? `<p class="${"text-4xl mx-6 my-4"}">Waiting for players, you can start playing
                                            Brawlhalla</p>`
						: ``}
                                    <div class="${"hidden lg:block"}"><script src="${"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"}" data-pa-tag async></script></div></div></div>`
					: ``}</div>
                    ${validate_component(GuideCard, "GuideCard").$$render($$result, { page: "ffa" }, {}, {})}

                    ${ ``}
                    <div class="${"block lg:hidden mt-6"}"><script src="${"https://cdn.purpleads.io/agent.js?publisherId=4c614b49b1ea091717ee7674965ed444:36f81c29df2903d19389e0b048959ef43687b22b120b65ad7a71fd5759a14acce6123150f93d3b2d50d912d07d871d9b1680703a9e1af6238c5424fe2004de2b"}" data-pa-tag async></script></div></div>`}
            ${quests
				? `${ `<div class="${[
							"fixed md:absolute right-0 top-1/2 transform -translate-y-1/2     mr-4",
							 ""
						].join(" ").trim()}"><div class="${"relative"}">${ ``}

                            <button class="${"focus:outline-none"}"><svg class="${"w-8 fill-current text-mid-light"}" viewBox="${"0 0 27 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z"}"></path></svg></button></div></div>`}`
				: ``}`
			: `${validate_component(Loading, "Loading").$$render($$result, { data: "Loading game data..." }, {}, {})}`}</div>`}

<div>${adError
		? `${validate_component(ErrorAlert, "ErrorAlert").$$render(
				$$result,
				{
					message: "An error occurred while watching the ad",
					pushError: adError
				},
				{},
				{}
			)}`
		: ``}</div>
<div hidden class="${"text-epic bg-epic border-epic from-primary from-epic from-green from-legendary to-epic to-green to-legendary to-primary"}"></div>`;
	} while (!$$settled);

	return $$rendered;
});

var component_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bidu5D$1
});

/* src\routes\shop.svelte generated by Svelte v3.31.0 */

const css$r = {
	code: "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');.shop-item.svelte-qti7op{position:relative}.shop-item.svelte-qti7op::after{position:absolute;content:\"\";height:100%;width:100%;top:0;left:0;background:linear-gradient(\r\n                to bottom,\r\n                rgba(23, 23, 26, 0.6) 0%,\r\n                rgba(23, 23, 26, 0.75),\r\n                rgba(23, 23, 26, 0.83) 75%,\r\n                rgba(23, 23, 26, 0.92) 100%\r\n        )}button.svelte-qti7op:disabled{@apply bg-disabled;;cursor:not-allowed}.info.svelte-qti7op{@apply text-lg mt-1;}button.svelte-qti7op:disabled{@apply bg-disabled;;cursor:not-allowed}.email-input.svelte-qti7op::placeholder{font-family:\"Bebas Neue\", sans-serif}.tooltip.svelte-qti7op::after{content:\"\";position:absolute;top:100%;right:25%;border-width:10px;border-style:solid;border-color:#fc1870 transparent transparent transparent}.tooltip-alt.svelte-qti7op::after{content:\"\";position:absolute;top:100%;right:40%;border-width:10px;border-style:solid;border-color:#fc1870 transparent transparent transparent}",
	map: "{\"version\":3,\"file\":\"shop.svelte\",\"sources\":[\"shop.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import { fade, fly } from \\\"svelte/transition\\\";\\r\\n    import { counter } from \\\"../components/stores\\\";\\r\\n    import { callApi } from \\\"../utils/api\\\";\\r\\n    import { onMount } from \\\"svelte\\\";\\r\\n    import CoinIcon from \\\"../components/CoinIcon.svelte\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n\\r\\n    let featuredItem;\\r\\n    let seasonPacks;\\r\\n    let packs;\\r\\n    let error;\\r\\n    let info;\\r\\n    let isBuying;\\r\\n    let player;\\r\\n    let coinsPerDollar;\\r\\n    let paypalItemId;\\r\\n\\r\\n    onMount(async () => {\\r\\n        let unsub;\\r\\n        let items;\\r\\n        try {\\r\\n            items = await callApi(\\\"get\\\", \\\"/shop\\\");\\r\\n            if (items instanceof Error) {\\r\\n                throw items;\\r\\n            }\\r\\n        } catch (err) {\\r\\n            if (err.response) {\\r\\n                if (err.response.status === 404) error = \\\"<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>\\\";\\r\\n            }\\r\\n            error = `<p class=\\\"text-accent\\\">Wow, unexpected error occured, details for geeks below.</p> <p class=\\\"text-2xl\\\">${err.toString()}</p>`;\\r\\n        }\\r\\n        unsub = counter.subscribe(async (value) => {\\r\\n            if (value.refresh === true) return;\\r\\n            player = await value.content;\\r\\n            if (!player?.user) player = { user: { coins: 0 } };\\r\\n            let playerPlatform = /([a-zA-Z]+)(.+)/gm.exec(player.steam.id)[1];\\r\\n            items.forEach((item, i) => {\\r\\n                if (item.type === \\\"paypal\\\") {\\r\\n                    paypalItemId = item.id;\\r\\n                    coinsPerDollar = item.cost;\\r\\n                    return;\\r\\n                }\\r\\n                items[i].isDescriptionToggled = false;\\r\\n\\r\\n                items[i].unBuyable = false;\\r\\n                item.name = item.name.toLowerCase().replace(/\\\\s/g, \\\"-\\\");\\r\\n                if (item.cost > player.user.coins)\\r\\n                    items[i].unBuyable = \\\"Not enough coins\\\";\\r\\n\\r\\n                if (!item.platforms.some(name => name === playerPlatform || name === \\\"all\\\"))\\r\\n                    items[i].unBuyable = \\\"Platform not compatible\\\";\\r\\n\\r\\n            });\\r\\n\\r\\n            featuredItem = items.find((i) => i.state === 0);\\r\\n            seasonPacks = items.filter((i) => i.state === 1);\\r\\n            packs = items.filter((i) => i.state === 2);\\r\\n            player = player.user;\\r\\n        });\\r\\n    });\\r\\n    //* Required for videoAd\\r\\n    /*import ErrorAlert from \\\"../components/ErrorAlert.svelte\\\";\\r\\n    import Infos from \\\"../components/Infos.svelte\\\";\\r\\n    import { onDestroy, onMount } from \\\"svelte\\\";\\r\\n    import io from \\\"socket.io-client\\\";\\r\\n    import { apiUrl } from \\\"../utils/config\\\";\\r\\n    import AdblockAlert from \\\"../components/AdblockAlert.svelte\\\";\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n    let adError;\\r\\n    let info;\\r\\n    let userPlayer;\\r\\n    let ticketsNb = 100;\\r\\n    let isLoadingTicket = false;\\r\\n    let countDown = \\\"Loading...\\\";\\r\\n    let interval;\\r\\n    let loaded;\\r\\n\\r\\n    function startTimer(duration) {\\r\\n        let timer = duration,\\r\\n            hours,\\r\\n            minutes,\\r\\n            seconds;\\r\\n        return setInterval(function() {\\r\\n            seconds = Math.floor(timer % 60);\\r\\n            minutes = Math.floor((timer / 60) % 60);\\r\\n            hours = Math.floor(timer / (60 * 60));\\r\\n\\r\\n            minutes = minutes < 10 ? \\\"0\\\" + minutes : minutes;\\r\\n            seconds = seconds < 10 ? \\\"0\\\" + seconds : seconds;\\r\\n\\r\\n            if (hours > 0) countDown = hours + \\\":\\\" + minutes + \\\":\\\" + seconds;\\r\\n            else countDown = minutes + \\\":\\\" + seconds;\\r\\n\\r\\n            if (--timer < 0) {\\r\\n                timer = duration;\\r\\n            }\\r\\n        }, 1000);\\r\\n    }\\r\\n\\r\\n    let unsub;\\r\\n    onMount(async () => {\\r\\n        let socket;\\r\\n        let interval;\\r\\n        let items;\\r\\n        try {\\r\\n            items = await callApi(\\\"get\\\", \\\"/shop\\\");\\r\\n            if (items instanceof Error) {\\r\\n                throw items;\\r\\n            }\\r\\n        } catch (err) {\\r\\n            if (err.response) {\\r\\n                if (err.response.status === 404) error = \\\"<p class='text-accent'>404, that's an error.</p> <p>Match not found</p>\\\";\\r\\n            }\\r\\n            error = `<p class=\\\"text-accent\\\">Wow, unexpected error occured, details for geeks below.</p> <p class=\\\"text-2xl\\\">${err.toString()}</p>`;\\r\\n        }\\r\\n        let player;\\r\\n        unsub = counter.subscribe(async (value) => {\\r\\n            if(value.refresh === true ) return\\r\\n            player = await value.content;\\r\\n            console.log(player);\\r\\n            if (player.user) {\\r\\n                player = player.user.coins;\\r\\n            } else {\\r\\n                player = 0;\\r\\n            }\\r\\n            items.forEach((item, i) => {\\r\\n                items[i].isDescriptionToggled = false;\\r\\n\\r\\n                items[i].unBuyable = false;\\r\\n                item.name = item.name.toLowerCase().replace(/\\\\s/g, \\\"-\\\");\\r\\n                if (item.cost > player) items[i].unBuyable = true;\\r\\n            });\\r\\n\\r\\n            featuredItem = items.find((i) => i.state === 0);\\r\\n            seasonPacks = items.filter((i) => i.state === 1);\\r\\n            packs = items.filter((i) => i.state === 2);\\r\\n            if (value.refresh === true) return;\\r\\n            userPlayer = await value.content;\\r\\n            clearInterval(interval);\\r\\n            if (!userPlayer.user.lastVideoAd) return countDown = undefined;\\r\\n\\r\\n            if (userPlayer.user.lastVideoAd.earnCoins.nb < 2) return countDown = undefined;\\r\\n\\r\\n            if (userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000 > Date.now()) {\\r\\n                const endsIn = ((userPlayer.user.lastVideoAd.earnCoins.timestamp + 3600 * 1000) - Date.now()) / 1000;\\r\\n                interval = startTimer(endsIn);\\r\\n            } else {\\r\\n                countDown = undefined;\\r\\n            }\\r\\n            loaded = true;\\r\\n        });\\r\\n        // socket = io.io(apiUrl);\\r\\n        let stop = 0;\\r\\n        let advideostate = 0;\\r\\n        let tempNb;\\r\\n        let goal;\\r\\n        interval = setInterval(() => {\\r\\n            console.log(\\\"interval\\\");\\r\\n            try {\\r\\n                if (stop > 0) {\\r\\n                    return stop--;\\r\\n                }\\r\\n                tempNb = JSON.parse(document.getElementById(\\\"transfer\\\").value);\\r\\n                goal = tempNb.goal ? tempNb.goal : goal;\\r\\n                tempNb = tempNb.state;\\r\\n                if (tempNb !== advideostate) {\\r\\n                    console.log(tempNb);\\r\\n                    socket.emit(\\\"advideo\\\", tempNb === 1 ? {\\r\\n                        state: 1,\\r\\n                        steamId: userPlayer.steam.id,\\r\\n                        shopItemId: 0,\\r\\n                        goal: goal\\r\\n                    } : { state: tempNb, steamId: userPlayer.steam.id });\\r\\n                }\\r\\n                advideostate = tempNb;\\r\\n            } catch (e) {\\r\\n\\r\\n            }\\r\\n        }, 1200);\\r\\n        socket.on(\\\"advideo\\\", (e) => {\\r\\n            console.log(e);\\r\\n            if (e.code === \\\"error\\\") {\\r\\n                console.log(e.message);\\r\\n                stop = 2;\\r\\n                advideostate = 0;\\r\\n                tempNb = 0;\\r\\n                adError = e.message;\\r\\n                setTimeout(() => {\\r\\n                    adError = undefined;\\r\\n                }, 12000);\\r\\n            } else if (e.code === \\\"success\\\") {\\r\\n                countDown = \\\"Wait a second...\\\";\\r\\n                stop = 2;\\r\\n                info = e.message;\\r\\n                advideostate = 0;\\r\\n                tempNb;\\r\\n                setTimeout(() => {\\r\\n                    info = undefined;\\r\\n                }, 5000);\\r\\n                counter.set({ refresh: true });\\r\\n            } else {\\r\\n                console.log(\\\"code not supported\\\");\\r\\n            }\\r\\n\\r\\n        });\\r\\n\\r\\n    });\\r\\n    onDestroy(() => {\\r\\n        if (unsub) unsub();\\r\\n    });*/\\r\\n\\r\\n    //* End of required for videoAd\\r\\n\\r\\n    /*async function buyTickets() {\\r\\n        try {\\r\\n            isLoadingTicket = true;\\r\\n            const { won, coins } = await callApi(\\\"post\\\", `/lottery/enter?nb=${ticketsNb}&id=${0}`);\\r\\n            info = `You have successfully put ${ticketsNb} ,${won > 0 ? \\\"You have won a battle pass! Check your mails for more information.\\\" : coins > 0 ? \\\"You have won \\\" + coins + \\\" coins\\\" : \\\"You have won nothing, better luck next time\\\"}`;\\r\\n            counter.set({ refresh: true });\\r\\n            isLoadingTicket = false;\\r\\n            setTimeout(() => {\\r\\n                info = undefined;\\r\\n            }, 5000);\\r\\n        } catch (e) {\\r\\n\\r\\n        }\\r\\n    }*/\\r\\n    const onKeyPressEmail = () => {\\r\\n        if (!isBuying.email) return;\\r\\n        setTimeout(() => {\\r\\n            if (isBuying.email.length > 0) {\\r\\n                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])/gm;\\r\\n                let exec = regex.exec(isBuying.email);\\r\\n                if (exec) isBuying.valid = true;\\r\\n                else isBuying.valid = false;\\r\\n            } else {\\r\\n                isBuying.valid = null;\\r\\n            }\\r\\n        }, 1);\\r\\n    };\\r\\n    const handleDescriptionToggle = (seasonPack, type) => {\\r\\n        seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;\\r\\n        if (type === \\\"featured\\\")\\r\\n            featuredItem = featuredItem;\\r\\n        else\\r\\n            seasonPacks = [...seasonPacks];\\r\\n    };\\r\\n\\r\\n    async function buyItem(id, name, step) {\\r\\n        if (!step) return isBuying = { id, name };\\r\\n        const numberStr = id === paypalItemId ? `&number=${currentAmount}` : \\\"\\\";\\r\\n        const itemBuyed = await callApi(\\\"post\\\", `/buy/${id}?email=${isBuying.email}${numberStr}`);\\r\\n        if (itemBuyed instanceof Error) isBuying = { id, name, error: itemBuyed?.response.data };\\r\\n        else {\\r\\n            counter.set({ refresh: true });\\r\\n            isBuying = false;\\r\\n            info = true;\\r\\n            setTimeout(() => {\\r\\n                info = false;\\r\\n            }, 5000);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    let currentAmount = 0;\\r\\n    $: if (currentAmount) {\\r\\n        handlePaypalConversion();\\r\\n    }\\r\\n    let amountToCoins = { text: 0, isBuyable: false };\\r\\n\\r\\n    function handlePaypalConversion() {\\r\\n        if (currentAmount < 1) {\\r\\n            console.log(currentAmount);\\r\\n            return amountToCoins = { text: \\\"Min 1 $\\\", isBuyable: false };\\r\\n        }\\r\\n        amountToCoins = {\\r\\n            text: currentAmount * coinsPerDollar,\\r\\n            isBuyable: player.coins >= currentAmount * coinsPerDollar\\r\\n        };\\r\\n\\r\\n    }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');\\r\\n\\r\\n    .shop-item {\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .shop-item::after {\\r\\n        position: absolute;\\r\\n        content: \\\"\\\";\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        background: linear-gradient(\\r\\n                to bottom,\\r\\n                rgba(23, 23, 26, 0.6) 0%,\\r\\n                rgba(23, 23, 26, 0.75),\\r\\n                rgba(23, 23, 26, 0.83) 75%,\\r\\n                rgba(23, 23, 26, 0.92) 100%\\r\\n        );\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n\\r\\n    .info {\\r\\n        @apply text-lg mt-1;\\r\\n    }\\r\\n\\r\\n    button:disabled {\\r\\n        @apply bg-disabled;\\r\\n        cursor: not-allowed;\\r\\n    }\\r\\n\\r\\n    .email-input::placeholder {\\r\\n        font-family: \\\"Bebas Neue\\\", sans-serif;\\r\\n    }\\r\\n\\r\\n    .tooltip::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 100%;\\r\\n        right: 25%;\\r\\n        border-width: 10px;\\r\\n        border-style: solid;\\r\\n        border-color: #fc1870 transparent transparent transparent;\\r\\n    }\\r\\n\\r\\n    .tooltip-alt::after {\\r\\n        content: \\\"\\\";\\r\\n        position: absolute;\\r\\n        top: 100%;\\r\\n        right: 40%;\\r\\n        border-width: 10px;\\r\\n        border-style: solid;\\r\\n        border-color: #fc1870 transparent transparent transparent;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n    <title>Shop | Winhalla</title>\\r\\n    <meta\\r\\n        name=\\\"description\\\"\\r\\n        content=\\\"Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\\r\\n        Battle Pass and Season packs| Exchange here your coins into rewards |\\r\\n        Winhalla Shop page \\\" />\\r\\n    <link rel=\\\"canonical\\\" href=\\\"https://winhalla.app/shop\\\" />\\r\\n    <!--    <script async src=\\\"https://cdn.stat-rock.com/player.js\\\"></script>-->\\r\\n</svelte:head>\\r\\n\\r\\n{#if error}\\r\\n    <div class=\\\"w-full content-center lg:mt-60 mt-25 \\\">\\r\\n        <h2 class=\\\"lg:text-5xl text-3xl text-center\\\">{@html error}</h2>\\r\\n        <a href=\\\"/\\\"><p class=\\\"underline lg:text-3xl pt-4 text-2xl  text-center text-primary\\\">Go to homepage</p></a>\\r\\n    </div>\\r\\n{:else}\\r\\n    <div class=\\\"xl:flex xl:relative pb-16\\\" out:fly={{ y: -450, duration: 400 }}>\\r\\n        <!-- {#if info}\\r\\n             <Infos message=\\\"Thanks for watching a video\\\" pushError={info} />\\r\\n         {/if}-->\\r\\n        <div>\\r\\n            {#if packs}\\r\\n                <div class=\\\"mt-7 lg:mt-12 lg:ml-24\\\">\\r\\n                    <div>\\r\\n                        <h1 class=\\\"text-6xl text-center lg:text-left\\\">\\r\\n                            Featured\\r\\n                        </h1>\\r\\n                        <div\\r\\n                            class=\\\"card xl:w-70/100 2xl:w-60/100 xl:h-85/100 2xl:h-80/100 mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item\\\">\\r\\n                            <img\\r\\n                                class=\\\"w-full h-full block object-cover\\\"\\r\\n                                src=\\\"assets/ShopItems/{featuredItem.name\\r\\n                                            .toLowerCase()\\r\\n                                            .replace(/\\\\s/g, '-')}.jpg\\\"\\r\\n                                alt={featuredItem.name} />\\r\\n                            <div\\r\\n                                class=\\\"absolute bottom-0 z-10 px-5 md:pr-10 pb-3 w-full\\\">\\r\\n                                <div\\r\\n                                    class=\\\"justify-between w-full md:items-center\\\">\\r\\n                                    <p class=\\\"text-accent text-5xl lg:text-6.5xl\\\" style=\\\"line-height:1\\\"\\r\\n                                       class:hidden={featuredItem.isDescriptionToggled}>\\r\\n                                        {featuredItem.name\\r\\n                                            .toLowerCase()\\r\\n                                            .replace(/\\\\-/g, ' ')}\\r\\n                                    </p>\\r\\n                                    <p\\r\\n                                        class:hidden={!featuredItem.isDescriptionToggled}\\r\\n                                        class=\\\"block xl:mt-0\\\">\\r\\n                                        {featuredItem.description}\\r\\n                                    </p>\\r\\n\\r\\n                                    <div\\r\\n                                        class=\\\"flex justify-between w-full items-end md:pr-5 pb-1\\\">\\r\\n                                        <div>\\r\\n\\r\\n                                        </div>\\r\\n                                        <div\\r\\n                                            on:mouseenter={() => featuredItem.tooltipOpen = true}\\r\\n                                            on:mouseleave={() => featuredItem.tooltipOpen = false}>\\r\\n                                            <button\\r\\n                                                disabled={!!featuredItem.unBuyable}\\r\\n                                                on:click={() => buyItem(featuredItem.id, featuredItem.name)}\\r\\n                                                on:mouseenter={() => featuredItem.tooltipOpen = true}\\r\\n                                                on:mouseleave={() => featuredItem.tooltipOpen = false}\\r\\n                                                class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                <div class=\\\"flex  items-center  text-2xl\\\">\\r\\n                                                    <b\\r\\n                                                        class=\\\"mr-2 font-normal\\\"\\r\\n                                                        style=\\\"padding-top: 0.12rem\\\">{featuredItem.cost.toLocaleString()}</b>\\r\\n                                                    <div class=\\\"w-8 mt-1 text-font\\\"\\r\\n                                                         style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem\\\">\\r\\n                                                        <CoinIcon />\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                                {#if featuredItem.tooltipOpen && featuredItem.unBuyable}\\r\\n                                                    <span\\r\\n                                                        class=\\\"tooltip absolute bottom-15 right-1 lg:right-11 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40\\\"\\r\\n                                                        style=\\\"width:fit-content;\\\"\\r\\n                                                        transition:fade>\\r\\n                                                        {featuredItem.unBuyable}\\r\\n                                                    </span>\\r\\n                                                {/if}\\r\\n                                            </button>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                        <div class=\\\"pt-8 lg:pt-16\\\">\\r\\n                            <div class=\\\"flex items-center\\\">\\r\\n                                <h2 class=\\\"text-6xl text-center w-full lg:w-auto lg:text-left\\\">\\r\\n                                    Paypal Credit\\r\\n                                </h2>\\r\\n                                <img class=\\\"hidden lg:block  w-24 -ml-2 -mt-2\\\" src=\\\"/assets/Paypal_Logo.png\\\" alt=\\\"\\\">\\r\\n                            </div>\\r\\n\\r\\n\\r\\n                            <div class=\\\"px-5 lg:px-0\\\">\\r\\n                                <div\\r\\n                                    class=\\\"bg-variant max-w-max rounded-xl  p-8 relative  mt-6 md:mt-10  mx-auto lg:mx-0\\\">\\r\\n                                    <p class=\\\"absolute -top-3 left-8 text-primary  text-2xl\\\">Coin TRADER</p>\\r\\n                                    <p class=\\\"text-3xl mt-4\\\">Exchange your <b class=\\\"font-normal text-epic\\\">coins</b>\\r\\n                                        for <b\\r\\n                                            class=\\\"font-normal text-epic\\\">real money</b></p>\\r\\n                                    <p class=\\\"text-mid-light\\\">Min amount: 1$</p>\\r\\n                                    <p class=\\\"mt-3\\\">You need to have a <a href=\\\"https://www.paypal.com/\\\"\\r\\n                                                                          class=\\\"text-primary\\\">Paypal account</a></p>\\r\\n                                    <div class=\\\"flex items-center  mt-2\\\">\\r\\n\\r\\n                                        <div class=\\\"flex\\\">\\r\\n                                            <input bind:value={currentAmount}\\r\\n                                                   class=\\\"p-2 pl-4 text-background  rounded w-16 w-18\\\"\\r\\n                                                   type=\\\"number\\\" min=\\\"1\\\" step=\\\"any\\\" placeholder=\\\"Amount in $\\\" />\\r\\n                                            <p class=\\\"text-4xl ml-1 my-auto\\\">$</p>\\r\\n                                        </div>\\r\\n                                        <svg class=\\\"mx-4 fill-current w-8\\\" viewBox=\\\"0 0 24 24\\\"\\r\\n                                             xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                            <path d=\\\"m24 12.16-5.76-5.76v4.24h-18.24v3.04h18.24v4.24z\\\" />\\r\\n                                        </svg>\\r\\n\\r\\n\\r\\n                                        <div>\\r\\n                                            <button\\r\\n                                                disabled={!amountToCoins.isBuyable}\\r\\n                                                on:click={() => buyItem(paypalItemId, \\\"paypal credit\\\")}\\r\\n                                                class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                <div class=\\\"flex  items-center  text-2xl\\\">\\r\\n                                                    <b\\r\\n                                                        class=\\\"mr-2 font-normal\\\"\\r\\n                                                        style=\\\"padding-top: 0.12rem\\\">{parseInt(amountToCoins.text)}</b>\\r\\n                                                    <div class=\\\"w-8 mt-1 text-font\\\"\\r\\n                                                         style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem\\\">\\r\\n                                                        <CoinIcon />\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                            </button>\\r\\n                                        </div>\\r\\n                                    </div>\\r\\n                                </div>\\r\\n                            </div>\\r\\n\\r\\n\\r\\n                        </div>\\r\\n                        <div class=\\\"pt-8 lg:pt-14 lg:pb-6\\\">\\r\\n                            <h2 class=\\\"text-6xl text-center lg:text-left\\\">\\r\\n                                Season packs\\r\\n                            </h2>\\r\\n                            <div\\r\\n                                class=\\\"mt-2 flex flex-col items-center lg:flex-row lg:items-start\\\">\\r\\n                                {#if seasonPacks.forEach}\\r\\n                                    {#each seasonPacks as seasonPack, i}\\r\\n                                        {#if seasonPack.type !== \\\"paypal\\\"}\\r\\n                                            <div\\r\\n                                                class=\\\"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem\\\">\\r\\n                                                <img\\r\\n                                                    class=\\\"w-full h-full block \\\"\\r\\n                                                    src=\\\"assets/ShopItems/{seasonPack.name}.jpg\\\"\\r\\n                                                    alt={seasonPack.name} />\\r\\n                                                <div\\r\\n                                                    class=\\\"absolute bottom-0 z-10 pl-5 pb-3 w-full\\\">\\r\\n                                                    <p\\r\\n                                                        class:hidden={seasonPack.isDescriptionToggled}\\r\\n                                                        class:-mb-1={!seasonPack.isDescriptionToggled}\\r\\n                                                        class=\\\"text-accent text-4xl lg:text-5xl md:mb-0 md:block\\\">\\r\\n                                                        {seasonPack.name\\r\\n                                                            .toLowerCase()\\r\\n                                                            .replace(/\\\\-/g, ' ')}\\r\\n                                                    </p>\\r\\n                                                    <p\\r\\n                                                        class:hidden={!seasonPack.isDescriptionToggled}\\r\\n                                                        class=\\\"block xl:mt-0\\\">\\r\\n                                                        {seasonPack.description}\\r\\n                                                    </p>\\r\\n\\r\\n                                                    <div\\r\\n                                                        class=\\\"flex justify-between w-full items-end pr-4 md:pr-5 pb-1\\\">\\r\\n                                                        <div class=\\\"-mb-2 md:mb-0\\\">\\r\\n                                                            <div>\\r\\n                                                                <p\\r\\n                                                                    class=\\\"hidden lg:block mr-1 -mb-2\\\">\\r\\n                                                                    {seasonPack.description}\\r\\n                                                                </p>\\r\\n                                                                <button\\r\\n                                                                    class=\\\"focus:outline-none xl:hidden -mb-10\\\"\\r\\n                                                                    on:click={() => handleDescriptionToggle(seasonPack)}>\\r\\n                                                                    <p\\r\\n                                                                        class=\\\" text-light text-lg underline leading-none\\\">\\r\\n                                                                        {seasonPack.isDescriptionToggled ? 'Hide description' : 'Show description'}\\r\\n                                                                    </p>\\r\\n                                                                </button>\\r\\n                                                            </div>\\r\\n                                                        </div>\\r\\n                                                        <div on:mouseenter={() => seasonPack.tooltipOpen = true}\\r\\n                                                             on:mouseleave={() => seasonPack.tooltipOpen = false}>\\r\\n                                                            <button\\r\\n                                                                disabled={!!seasonPack.unBuyable}\\r\\n                                                                on:click={() => buyItem(seasonPack.id,seasonPack.name)}\\r\\n                                                                class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                                <div class=\\\"flex  items-center  text-2xl\\\">\\r\\n                                                                    <b\\r\\n                                                                        class=\\\"mr-2 font-normal\\\"\\r\\n                                                                        style=\\\"padding-top: 0.12rem\\\">{seasonPack.cost.toLocaleString()}</b>\\r\\n                                                                    <div class=\\\"w-8 mt-1 text-font\\\"\\r\\n                                                                         style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem\\\">\\r\\n                                                                        <CoinIcon />\\r\\n                                                                    </div>\\r\\n                                                                </div>\\r\\n                                                                {#if seasonPack.tooltipOpen && seasonPack.unBuyable}\\r\\n\\r\\n                                                                <span\\r\\n                                                                    class=\\\"tooltip text-center absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40\\\"\\r\\n                                                                    class:tooltip={window.innerWidth < 1024}\\r\\n                                                                    class:tooltip-alt={window.innerWidth > 1024}\\r\\n                                                                    style=\\\"width:fit-content;\\\"\\r\\n                                                                    transition:fade>\\r\\n                                                                    {seasonPack.unBuyable}\\r\\n                                                                </span>\\r\\n                                                                {/if}\\r\\n                                                            </button>\\r\\n                                                        </div>\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                            </div>\\r\\n                                        {/if}\\r\\n                                    {/each}\\r\\n                                {/if}\\r\\n                            </div>\\r\\n                        </div>\\r\\n                        <div class=\\\"pt-8 lg:pt-20 lg:pb-6\\\">\\r\\n                            <h2 class=\\\"text-6xl text-center lg:text-left\\\">Packs</h2>\\r\\n                            <div\\r\\n                                class=\\\"mt-2 flex flex-col items-center lg:flex-row lg:items-start\\\">\\r\\n                                {#if packs.forEach}\\r\\n                                    {#each packs as pack}\\r\\n                                        <div\\r\\n                                            class=\\\"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item\\\">\\r\\n                                            <img\\r\\n                                                class=\\\"w-full h-full block object-cover\\\"\\r\\n                                                src=\\\"assets/ShopItems/{pack.name}.jpg\\\"\\r\\n                                                alt={pack.name} />\\r\\n                                            <div\\r\\n                                                class=\\\"absolute bottom-0 z-10 px-5 pb-3 w-full\\\">\\r\\n                                                <p class=\\\"text-accent text-5xl\\\">\\r\\n                                                    {pack.name\\r\\n                                                        .toLowerCase()\\r\\n                                                        .replace(/\\\\-/g, ' ')}\\r\\n                                                </p>\\r\\n\\r\\n                                                <div\\r\\n                                                    class=\\\"flex justify-between w-full items-end pb-1\\\">\\r\\n                                                    <div>\\r\\n                                                        <div>\\r\\n                                                            <p class=\\\"mr-1 -mb-2\\\">\\r\\n                                                                {pack.description}\\r\\n                                                            </p>\\r\\n                                                        </div>\\r\\n                                                    </div>\\r\\n                                                    <div\\r\\n                                                        on:mouseenter={() => pack.tooltipOpen = true}\\r\\n                                                        on:mouseleave={() => pack.tooltipOpen = false}>\\r\\n                                                        <button\\r\\n                                                            disabled={!!pack.unBuyable}\\r\\n                                                            on:click={() => buyItem(pack.id,pack.name)}\\r\\n                                                            class=\\\"px-4 py-1 bg-primary rounded\\\">\\r\\n                                                            <div class=\\\"flex  items-center  text-2xl\\\">\\r\\n                                                                <b\\r\\n                                                                    class=\\\"mr-2 font-normal\\\"\\r\\n                                                                    style=\\\"padding-top: 0.12rem\\\">{pack.cost.toLocaleString()}</b>\\r\\n                                                                <div class=\\\"w-8 mt-1 text-font\\\"\\r\\n                                                                     style=\\\"margin-top: 0.25rem; margin-bottom: 0.35rem\\\">\\r\\n                                                                    <CoinIcon />\\r\\n                                                                </div>\\r\\n\\r\\n                                                            </div>\\r\\n                                                            {#if pack.tooltipOpen && pack.unBuyable}\\r\\n                                                                <span\\r\\n                                                                    class=\\\"tooltip absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40\\\"\\r\\n                                                                    style=\\\"width:fit-content;\\\"\\r\\n                                                                    transition:fade>\\r\\n                                                                    {pack.unBuyable}\\r\\n                                                                </span>\\r\\n                                                            {/if}\\r\\n                                                        </button>\\r\\n                                                    </div>\\r\\n                                                </div>\\r\\n                                            </div>\\r\\n                                        </div>\\r\\n                                    {/each}\\r\\n                                {/if}\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            {/if}\\r\\n        </div>\\r\\n        <div\\r\\n            class=\\\"mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3\\\">\\r\\n            <h3 class=\\\"text-5xl lg:mr-12 text-center lg:text-left\\\">\\r\\n                How does it work?\\r\\n            </h3>\\r\\n            <div class=\\\"pt-4\\\">\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">1.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Click</p>\\r\\n                    <p\\r\\n                        class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0\\\">\\r\\n                        Click on the item you want to purchase\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">2.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Follow</p>\\r\\n                    <p\\r\\n                        class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0\\\">\\r\\n                        Follow the instructions we'll send you by email\\r\\n                    </p>\\r\\n                </div>\\r\\n                <div class=\\\"mt-4 flex items-end\\\">\\r\\n                    <p class=\\\"text-4xl leading-none text-accent\\\">3.</p>\\r\\n                    <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Receive</p>\\r\\n                    <p\\r\\n                        class=\\\"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7\\\">\\r\\n                        Receive what you buyed (it may take an average time of a week depending of the item)\\r\\n                    </p>\\r\\n                </div>\\r\\n                <!--<div class=\\\"mt-30\\\">\\r\\n                    <h3 class=\\\"text-5xl lg:mr-12 text-center lg:text-left\\\">\\r\\n                        Lottery\\r\\n                    </h3>\\r\\n                    <div class=\\\"pt-4\\\">\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">1.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\"><br>Buy a ticket</p>\\r\\n                            <p\\r\\n                                class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0\\\">\\r\\n                                A ticket will give you a chance to win the prize you have chosen.\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">2.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Multiple tickets</p>\\r\\n                            <p\\r\\n                                class=\\\"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0\\\">\\r\\n                                The more tickets you buy, the more chances to win you have !\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"mt-4 flex items-end\\\">\\r\\n                            <p class=\\\"text-4xl leading-none text-accent\\\">3.</p>\\r\\n                            <p class=\\\"text-4xl text-primary ml-2 leading-none\\\">Win</p>\\r\\n                            <p\\r\\n                                class=\\\"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7\\\">\\r\\n                                If you win a prize, an email will be sent to the adress you specified when you\\r\\n                                created\\r\\n                                the account\\r\\n                            </p>\\r\\n                        </div>\\r\\n                        <div class=\\\"block mt-10\\\">\\r\\n                            <div class=\\\"flex\\\">\\r\\n                                <input class=\\\"mr-3\\\" type=\\\"range\\\" step=\\\"100\\\" min=\\\"100\\\" max=\\\"10000\\\" bind:value={ticketsNb}>\\r\\n                                <RefreshButton on:click={buyTickets}\\r\\n                                               refreshMessage={`Put ${ticketsNb} in the lottery`}\\r\\n                                               isRefreshing={isLoadingTicket} />\\r\\n                            </div>\\r\\n\\r\\n                            <div class=\\\"flex mt-8\\\">\\r\\n                                <button class=\\\"button button-brand\\\" onclick=\\\"playAd('enterLottery')\\\">Play ad for\\r\\n                                    lottery\\r\\n                                </button>\\r\\n                                <button class=\\\"button button-brand ml-4\\\" onclick=\\\"playAd('earnCoins')\\\"\\r\\n                                        disabled={!!countDown}>\\r\\n                                    {!!countDown ? countDown : \\\"Play ad for money\\\"}\\r\\n                                </button>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>-->\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n{#if isBuying}\\r\\n    <div class=\\\"fixed top-0 bottom-0 left-0 right-0    bg-background bg-opacity-60    flex justify-center items-center\\\"\\r\\n         style=\\\"z-index: 100\\\"\\r\\n         in:fade={{duration: 200}}\\r\\n         out:fade={{duration: 350}}>\\r\\n\\r\\n        <div\\r\\n            class=\\\"max-w-xl    mx-5 my-1 md:mx-0  px-8 pt-7 pb-5 md:px-11 md:pt-10 md:pb-8    bg-variant    border-2 border-primary  rounded-lg    overflow-y-scroll md:overflow-y-auto\\\"\\r\\n            style=\\\"max-height: 95vh;\\\"\\r\\n            transition:fly={{ y: 300, duration: 350 }}>\\r\\n            <h2 class=\\\"text-4xl md:text-5xl\\\">Where should we send\\r\\n            </h2>\\r\\n\\r\\n            <p class=\\\"text-accent text-5xl md:text-6xl\\\">{isBuying.name.toLowerCase().replace(/\\\\-/g, ' ')}</p>\\r\\n            <div>\\r\\n                <div class=\\\"max-h-screen-50\\\">\\r\\n                    <div>\\r\\n                        <p class=\\\"mt-7 text-font text-3xl\\\" style=\\\"margin-bottom: 0.35rem;\\\">Email</p>\\r\\n                        <div>\\r\\n                            <input\\r\\n                                on:change={onKeyPressEmail}\\r\\n                                on:keydown={onKeyPressEmail}\\r\\n                                type=\\\"email\\\"\\r\\n                                placeholder=\\\"Your {isBuying.id === paypalItemId?'PayPal':''} email goes here\\\"\\r\\n                                bind:value={isBuying.email}\\r\\n                                class:border-legendary={isBuying.valid === false}\\r\\n                                class=\\\"w-full text-background bg-font py-3 px-4 rounded focus:outline-none\\r\\n                            focus:border-primary placeholder-disabled email-input\\\"\\r\\n                                style=\\\"font-family: 'Roboto', sans-serif;\\\" />\\r\\n\\r\\n                            {#if isBuying.valid}\\r\\n                                <div class=\\\"flex items-center\\\">\\r\\n                                    <svg\\r\\n                                        class=\\\"fill-current text-green w-4\\\"\\r\\n                                        style=\\\"margin-top: 0.15rem; margin-right: 0.4rem;\\\"\\r\\n                                        viewBox=\\\"0 0 33 24\\\"\\r\\n                                        xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                        <path\\r\\n                                            d=\\\"m0 10.909 4.364-4.364 8.727 8.727\\r\\n                                        15.273-15.273 4.364 4.364-19.636 19.636z\\\" />\\r\\n                                    </svg>\\r\\n                                    <p class=\\\"text-green info\\\">VALID EMAIL</p>\\r\\n                                </div>\\r\\n                            {:else if isBuying.valid === false}\\r\\n                                <p class=\\\"text-legendary info \\\">INVALID EMAIL</p>\\r\\n                            {/if}\\r\\n                            {#if isBuying.error}\\r\\n                                <p class=\\\"text-legendary mt-8\\\" in:fade={{delay:100}}>{isBuying.error}</p>\\r\\n                            {/if}\\r\\n                        </div>\\r\\n                    </div>\\r\\n                    <div\\r\\n                        class=\\\"text-legendary flex items-center {isBuying.valid || isBuying.valid === false ? 'mt-5' : 'mt-8' }\\\">\\r\\n                        <svg\\r\\n                            xmlns=\\\"http://www.w3.org/2000/svg\\\"\\r\\n                            class=\\\"w-full\\\"\\r\\n                            style=\\\"max-width: 2.25rem;\\\"\\r\\n                            viewBox=\\\"0 0 576 512\\\">\\r\\n                            <path\\r\\n                                fill=\\\"currentColor\\\"\\r\\n                                d=\\\"M569.517 440.013C587.975 472.007 564.806 512 527.94\\r\\n                                512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423\\r\\n                                23.985c18.467-32.009 64.72-31.951 83.154 0l239.94\\r\\n                                416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46\\r\\n                                46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418\\r\\n                                136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0\\r\\n                                11.635-4.982\\r\\n                                11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884\\r\\n                                0-12.356 5.78-11.981 12.654z\\\" />\\r\\n                        </svg>\\r\\n                        <p class=\\\"text-xl ml-4\\\">\\r\\n                            No refund will be possible after clicking the BUY button. Please make sure it's the proper\\r\\n                            email!\\r\\n                        </p>\\r\\n                    </div>\\r\\n                    <div class=\\\"text-font flex items-center mt-4 lg:mt-3\\\">\\r\\n                        <div class=\\\"rounded-full bg-primary mb-1\\\" style=\\\"padding: 0.65rem;\\\">\\r\\n                            <svg\\r\\n                                class=\\\"w-full h-full fill-current\\\"\\r\\n                                style=\\\"max-width: 0.95rem; max-height: 0.95rem;\\\"\\r\\n                                viewBox=\\\"0 0 17 24\\\"\\r\\n                                xmlns=\\\"http://www.w3.org/2000/svg\\\">\\r\\n                                <path\\r\\n                                    d=\\\"m11.403 18.751v4.499c-.01.41-.34.74-.748.75h-.001-4.495c-.41-.01-.739-.34-.749-.748v-.001-4.499c.01-.41.34-.739.749-.749h.001 4.499c.41.01.74.34.75.749v.001zm5.923-11.247c-.001 1.232-.353 2.382-.962 3.354l.015-.026c-.297.426-.637.793-1.021 1.108l-.01.008c-.321.282-.672.55-1.042.794l-.036.022q-.413.253-1.144.665c-.526.302-.957.713-1.275 1.204l-.009.014c-.272.348-.456.776-.515 1.243l-.001.012c-.004.233-.088.445-.226.611l.001-.002c-.115.171-.306.284-.524.29h-.001-4.499c-.217-.015-.399-.153-.479-.343l-.001-.004c-.121-.201-.194-.443-.197-.702v-.845c.025-1.142.485-2.172 1.219-2.935l-.001.001c.729-.849 1.622-1.535 2.633-2.013l.048-.02c.615-.25 1.139-.606 1.574-1.049l.001-.001c.293-.359.471-.822.471-1.327 0-.034-.001-.068-.002-.102v.005c-.035-.597-.374-1.108-.863-1.382l-.009-.004c-.546-.376-1.222-.6-1.95-.6-.023 0-.046 0-.068.001h.003c-.04-.002-.087-.003-.134-.003-.701 0-1.355.204-1.905.555l.014-.009c-.748.641-1.408 1.349-1.981 2.125l-.025.035c-.133.181-.343.297-.581.3-.175-.006-.337-.061-.472-.152l.003.002-3.074-2.343c-.151-.111-.257-.275-.29-.464l-.001-.004c-.007-.039-.011-.084-.011-.129 0-.147.043-.283.116-.398l-.002.003c1.657-2.999 4.799-4.996 8.409-4.996.103 0 .205.002.307.005h-.015c1.088.007 2.124.22 3.074.602l-.057-.02c1.047.402 1.952.926 2.757 1.571l-.02-.016c.809.653 1.474 1.447 1.966 2.349l.02.041c.483.857.768 1.881.769 2.971z\\\" />\\r\\n                            </svg>\\r\\n                        </div>\\r\\n\\r\\n\\r\\n                        <p class=\\\"text-primary text-xl ml-4\\\">\\r\\n                            Your email will not be saved <br>\\r\\n                            Delay to receive:\\r\\n                            {#if isBuying.id === paypalItemId}3 days to a week\\r\\n                            {:else}1 week to 1\\r\\n                                month\\r\\n                            {/if}\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"justify-center w-full flex mt-8 \\\">\\r\\n                    <button class=\\\"button button-brand-alternative w-32\\\"\\r\\n                            style=\\\"background-color: #17171a;padding: -1px\\\"\\r\\n                            on:click={()=>isBuying=undefined}>\\r\\n                        Cancel\\r\\n                    </button>\\r\\n                    <button class=\\\"button ml-5 w-32\\\" class:button-brand={isBuying.valid}\\r\\n                            on:click={()=>buyItem(isBuying.id,isBuying.name,1)}\\r\\n                            disabled={!isBuying.valid}>\\r\\n                        Buy\\r\\n                    </button>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n{/if}\\r\\n<!--<div>\\r\\n    <input id=\\\"transfer\\\" value=\\\"0\\\" hidden />\\r\\n    {#if adError}\\r\\n        <ErrorAlert message=\\\"An error occured while watching the ad\\\" pushError={adError} />\\r\\n    {/if}\\r\\n    <script data-playerPro=\\\"current\\\">\\r\\n        function playAd(goal) {\\r\\n            const init = (api) => {\\r\\n                if (api) {\\r\\n                    api.on(\\\"AdVideoStart\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 1, goal });\\r\\n                        //api.setAdVolume(1);\\r\\n                        document.body.onblur = function() {\\r\\n                            //api.pauseAd();\\r\\n                        };\\r\\n                        document.body.onfocus = function() {\\r\\n                            //api.resumeAd();\\r\\n                        };\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoFirstQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 2 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoMidpoint\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 3 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoThirdQuartile\\\", () => {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 4 });\\r\\n                    });\\r\\n                    api.on(\\\"AdVideoComplete\\\", function() {\\r\\n                        document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 5 });\\r\\n                        setTimeout(() => {\\r\\n                            document.getElementById(\\\"transfer\\\").value = JSON.stringify({ state: 0 });\\r\\n                        }, 1200);\\r\\n                        document.body.onblur = null;\\r\\n                        document.body.onfocus = null;\\r\\n                    });\\r\\n                } else {\\r\\n                    console.log(\\\"blank\\\");\\r\\n                }\\r\\n            };\\r\\n            var s = document.querySelector(\\\"script[data-playerPro=\\\\\\\"current\\\\\\\"]\\\");\\r\\n            //s.removeAttribute(\\\"data-playerPro\\\");\\r\\n            (playerPro = window.playerPro || []).push({\\r\\n                id: \\\"oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp\\\",\\r\\n                after: s,\\r\\n                init: init\\r\\n            });\\r\\n        }\\r\\n    </script>\\r\\n</div>-->\\r\\n{#if info}\\r\\n    <Infos message=\\\"Thanks for your purchase\\\"\\r\\n           pushError=\\\"Check your mails, instructions should be emailed to you shortly!\\\" />\\r\\n{/if}\"],\"names\":[],\"mappings\":\"AA+RI,QAAQ,IAAI,uEAAuE,CAAC,CAAC,AAErF,UAAU,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,wBAAU,OAAO,AAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,UAAU,CAAE;gBACJ,EAAE,CAAC,MAAM,CAAC;gBACV,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC;gBACzB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC;gBACvB,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC;gBAC3B,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI;SAClC,AACL,CAAC,AAED,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAGD,KAAK,cAAC,CAAC,AACH,OAAO,OAAO,CAAC,IAAI,CAAC,AACxB,CAAC,AAED,oBAAM,SAAS,AAAC,CAAC,AACb,OAAO,WAAW,CAAC,CACnB,MAAM,CAAE,WAAW,AACvB,CAAC,AAED,0BAAY,aAAa,AAAC,CAAC,AACvB,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,AACzC,CAAC,AAED,sBAAQ,OAAO,AAAC,CAAC,AACb,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,CAClB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC7D,CAAC,AAED,0BAAY,OAAO,AAAC,CAAC,AACjB,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,CAClB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,WAAW,AAC7D,CAAC\"}"
};

const Shop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let featuredItem;
	let seasonPacks;
	let packs;
	let error;
	let player;
	let coinsPerDollar;
	let paypalItemId;

	onMount(async () => {
		let unsub;
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

		unsub = counter.subscribe(async value => {
			if (value.refresh === true) return;
			player = await value.content;
			if (!player?.user) player = { user: { coins: 0 } };
			let playerPlatform = (/([a-zA-Z]+)(.+)/gm).exec(player.steam.id)[1];

			items.forEach((item, i) => {
				if (item.type === "paypal") {
					paypalItemId = item.id;
					coinsPerDollar = item.cost;
					return;
				}

				items[i].isDescriptionToggled = false;
				items[i].unBuyable = false;
				item.name = item.name.toLowerCase().replace(/\s/g, "-");
				if (item.cost > player.user.coins) items[i].unBuyable = "Not enough coins";
				if (!item.platforms.some(name => name === playerPlatform || name === "all")) items[i].unBuyable = "Platform not compatible";
			});

			featuredItem = items.find(i => i.state === 0);
			seasonPacks = items.filter(i => i.state === 1);
			packs = items.filter(i => i.state === 2);
			player = player.user;
		});
	});

	let currentAmount = 0;
	let amountToCoins = { text: 0, isBuyable: false };

	$$result.css.add(css$r);

	return `${($$result.head += `${($$result.title = `<title>Shop | Winhalla</title>`, "")}<meta name="${"description"}" content="${"Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\r\n        Battle Pass and Season packs| Exchange here your coins into rewards |\r\n        Winhalla Shop page "}" data-svelte="svelte-ni18fy"><link rel="${"canonical"}" href="${"https://winhalla.app/shop"}" data-svelte="svelte-ni18fy">`, "")}

${error
	? `<div class="${"w-full content-center lg:mt-60 mt-25 "}"><h2 class="${"lg:text-5xl text-3xl text-center"}">${error}</h2>
        <a href="${"/"}"><p class="${"underline lg:text-3xl pt-4 text-2xl  text-center text-primary"}">Go to homepage</p></a></div>`
	: `<div class="${"xl:flex xl:relative pb-16"}">
        <div>${packs
		? `<div class="${"mt-7 lg:mt-12 lg:ml-24"}"><div><h1 class="${"text-6xl text-center lg:text-left"}">Featured
                        </h1>
                        <div class="${"card xl:w-70/100 2xl:w-60/100 xl:h-85/100 2xl:h-80/100 mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item svelte-qti7op"}"><img class="${"w-full h-full block object-cover"}" src="${"assets/ShopItems/" + escape(featuredItem.name.toLowerCase().replace(/\s/g, "-")) + ".jpg"}"${add_attribute("alt", featuredItem.name, 0)}>
                            <div class="${"absolute bottom-0 z-10 px-5 md:pr-10 pb-3 w-full"}"><div class="${"justify-between w-full md:items-center"}"><p class="${[
				"text-accent text-5xl lg:text-6.5xl",
				featuredItem.isDescriptionToggled ? "hidden" : ""
			].join(" ").trim()}" style="${"line-height:1"}">${escape(featuredItem.name.toLowerCase().replace(/\-/g, " "))}</p>
                                    <p class="${["block xl:mt-0", !featuredItem.isDescriptionToggled ? "hidden" : ""].join(" ").trim()}">${escape(featuredItem.description)}</p>

                                    <div class="${"flex justify-between w-full items-end md:pr-5 pb-1"}"><div></div>
                                        <div><button ${!!featuredItem.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-qti7op"}"><div class="${"flex  items-center  text-2xl"}"><b class="${"mr-2 font-normal"}" style="${"padding-top: 0.12rem"}">${escape(featuredItem.cost.toLocaleString())}</b>
                                                    <div class="${"w-8 mt-1 text-font"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}</div></div>
                                                ${featuredItem.tooltipOpen && featuredItem.unBuyable
			? `<span class="${"tooltip absolute bottom-15 right-1 lg:right-11 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40 svelte-qti7op"}" style="${"width:fit-content;"}">${escape(featuredItem.unBuyable)}</span>`
			: ``}</button></div></div></div></div></div>
                        <div class="${"pt-8 lg:pt-16"}"><div class="${"flex items-center"}"><h2 class="${"text-6xl text-center w-full lg:w-auto lg:text-left"}">Paypal Credit
                                </h2>
                                <img class="${"hidden lg:block  w-24 -ml-2 -mt-2"}" src="${"/assets/Paypal_Logo.png"}" alt="${""}"></div>


                            <div class="${"px-5 lg:px-0"}"><div class="${"bg-variant max-w-max rounded-xl  p-8 relative  mt-6 md:mt-10  mx-auto lg:mx-0"}"><p class="${"absolute -top-3 left-8 text-primary  text-2xl"}">Coin TRADER</p>
                                    <p class="${"text-3xl mt-4"}">Exchange your <b class="${"font-normal text-epic"}">coins</b>
                                        for <b class="${"font-normal text-epic"}">real money</b></p>
                                    <p class="${"text-mid-light"}">Min amount: 1$</p>
                                    <p class="${"mt-3"}">You need to have a <a href="${"https://www.paypal.com/"}" class="${"text-primary"}">Paypal account</a></p>
                                    <div class="${"flex items-center  mt-2"}"><div class="${"flex"}"><input class="${"p-2 pl-4 text-background  rounded w-16 w-18"}" type="${"number"}" min="${"1"}" step="${"any"}" placeholder="${"Amount in $"}"${add_attribute("value", currentAmount, 1)}>
                                            <p class="${"text-4xl ml-1 my-auto"}">$</p></div>
                                        <svg class="${"mx-4 fill-current w-8"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m24 12.16-5.76-5.76v4.24h-18.24v3.04h18.24v4.24z"}"></path></svg>


                                        <div><button ${ "disabled" } class="${"px-4 py-1 bg-primary rounded svelte-qti7op"}"><div class="${"flex  items-center  text-2xl"}"><b class="${"mr-2 font-normal"}" style="${"padding-top: 0.12rem"}">${escape(parseInt(amountToCoins.text))}</b>
                                                    <div class="${"w-8 mt-1 text-font"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}</div></div></button></div></div></div></div></div>
                        <div class="${"pt-8 lg:pt-14 lg:pb-6"}"><h2 class="${"text-6xl text-center lg:text-left"}">Season packs
                            </h2>
                            <div class="${"mt-2 flex flex-col items-center lg:flex-row lg:items-start"}">${seasonPacks.forEach
			? `${each(seasonPacks, (seasonPack, i) => `${seasonPack.type !== "paypal"
				? `<div class="${"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem svelte-qti7op"}"><img class="${"w-full h-full block "}" src="${"assets/ShopItems/" + escape(seasonPack.name) + ".jpg"}"${add_attribute("alt", seasonPack.name, 0)}>
                                                <div class="${"absolute bottom-0 z-10 pl-5 pb-3 w-full"}"><p class="${[
						"text-accent text-4xl lg:text-5xl md:mb-0 md:block",
						(seasonPack.isDescriptionToggled ? "hidden" : "") + " " + (!seasonPack.isDescriptionToggled ? "-mb-1" : "")
					].join(" ").trim()}">${escape(seasonPack.name.toLowerCase().replace(/\-/g, " "))}</p>
                                                    <p class="${["block xl:mt-0", !seasonPack.isDescriptionToggled ? "hidden" : ""].join(" ").trim()}">${escape(seasonPack.description)}</p>

                                                    <div class="${"flex justify-between w-full items-end pr-4 md:pr-5 pb-1"}"><div class="${"-mb-2 md:mb-0"}"><div><p class="${"hidden lg:block mr-1 -mb-2"}">${escape(seasonPack.description)}</p>
                                                                <button class="${"focus:outline-none xl:hidden -mb-10 svelte-qti7op"}"><p class="${" text-light text-lg underline leading-none"}">${escape(seasonPack.isDescriptionToggled
					? "Hide description"
					: "Show description")}
                                                                    </p></button>
                                                            </div></div>
                                                        <div><button ${!!seasonPack.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-qti7op"}"><div class="${"flex  items-center  text-2xl"}"><b class="${"mr-2 font-normal"}" style="${"padding-top: 0.12rem"}">${escape(seasonPack.cost.toLocaleString())}</b>
                                                                    <div class="${"w-8 mt-1 text-font"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}
                                                                    </div></div>
                                                                ${seasonPack.tooltipOpen && seasonPack.unBuyable
					? `<span class="${[
							"tooltip text-center absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40 svelte-qti7op",
							(window.innerWidth < 1024 ? "tooltip" : "") + " " + (window.innerWidth > 1024 ? "tooltip-alt" : "")
						].join(" ").trim()}" style="${"width:fit-content;"}">${escape(seasonPack.unBuyable)}
                                                                </span>`
					: ``}
                                                            </button></div>
                                                    </div></div>
                                            </div>`
				: ``}`)}`
			: ``}</div></div>
                        <div class="${"pt-8 lg:pt-20 lg:pb-6"}"><h2 class="${"text-6xl text-center lg:text-left"}">Packs</h2>
                            <div class="${"mt-2 flex flex-col items-center lg:flex-row lg:items-start"}">${packs.forEach
			? `${each(packs, pack => `<div class="${"mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item svelte-qti7op"}"><img class="${"w-full h-full block object-cover"}" src="${"assets/ShopItems/" + escape(pack.name) + ".jpg"}"${add_attribute("alt", pack.name, 0)}>
                                            <div class="${"absolute bottom-0 z-10 px-5 pb-3 w-full"}"><p class="${"text-accent text-5xl"}">${escape(pack.name.toLowerCase().replace(/\-/g, " "))}</p>

                                                <div class="${"flex justify-between w-full items-end pb-1"}"><div><div><p class="${"mr-1 -mb-2"}">${escape(pack.description)}</p>
                                                        </div></div>
                                                    <div><button ${!!pack.unBuyable ? "disabled" : ""} class="${"px-4 py-1 bg-primary rounded svelte-qti7op"}"><div class="${"flex  items-center  text-2xl"}"><b class="${"mr-2 font-normal"}" style="${"padding-top: 0.12rem"}">${escape(pack.cost.toLocaleString())}</b>
                                                                <div class="${"w-8 mt-1 text-font"}" style="${"margin-top: 0.25rem; margin-bottom: 0.35rem"}">${validate_component(CoinIcon, "CoinIcon").$$render($$result, {}, {}, {})}
                                                                </div></div>
                                                            ${pack.tooltipOpen && pack.unBuyable
				? `<span class="${"tooltip absolute bottom-15 right-1 px-3 py-2 bg-legendary text-background rounded text-left flex items-center justify-center z-40 svelte-qti7op"}" style="${"width:fit-content;"}">${escape(pack.unBuyable)}
                                                                </span>`
				: ``}
                                                        </button></div>
                                                </div></div>
                                        </div>`)}`
			: ``}</div></div></div></div>`
		: ``}</div>
        <div class="${"mb-20 md:mb-8 mx-5 xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3"}"><h3 class="${"text-5xl lg:mr-12 text-center lg:text-left"}">How does it work?
            </h3>
            <div class="${"pt-4"}"><div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">1.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Click</p>
                    <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0"}">Click on the item you want to purchase
                    </p></div>
                <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">2.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Follow</p>
                    <p class="${"-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0"}">Follow the instructions we&#39;ll send you by email
                    </p></div>
                <div class="${"mt-4 flex items-end"}"><p class="${"text-4xl leading-none text-accent"}">3.</p>
                    <p class="${"text-4xl text-primary ml-2 leading-none"}">Receive</p>
                    <p class="${"receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7"}">Receive what you buyed (it may take an average time of a week depending of the item)
                    </p></div>
                </div></div></div>`}
${ ``}

${ ``}`;
});

var component_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Shop
});

/* src\routes\test.svelte generated by Svelte v3.31.0 */

const Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `<script async src="${"https://cdn.stat-rock.com/player.js"}" data-svelte="svelte-q4vv9u"></script>`, "")}
<div><script>function init(api) {
            if (api) {
                api.on("AdStarted", function() {
                    console.log("AdStarted");
                });

                api.on("AdError", (message, error) => {
                    console.log(message);
                    console.log(error);
                });

                api.on("AdVideoComplete", function() {
                        console.log("AdVideoComplete");
                    }
                );
            } else {
                console.log("blank");
            }
        }
    </script>

    <script data-playerPro="${"current"}">function playAd() {
        var s = document.querySelector("script[data-playerPro=\\"current\\"]");
        s.removeAttribute("data-playerPro");
        (playerPro = window.playerPro || []).push({
            id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",
            after: s,
            init: init
        });
    };
    </script></div>
<button onclick="${"playAd()"}" class="${"mt-10 button button-brand"}">Play ad
</button>`;
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
			// referral-link.svelte
			pattern: /^\/referral-link\/?$/,
			parts: [
				{ name: "referral$45link", file: "referral-link.svelte", component: component_2 }
			]
		},

		{
			// leaderboard.svelte
			pattern: /^\/leaderboard\/?$/,
			parts: [
				{ name: "leaderboard", file: "leaderboard.svelte", component: component_3 }
			]
		},

		{
			// feltrom/admin.svelte
			pattern: /^\/feltrom\/admin\/?$/,
			parts: [
				null,
				{ name: "feltrom_admin", file: "feltrom/admin.svelte", component: component_4 }
			]
		},

		{
			// privacy.svelte
			pattern: /^\/privacy\/?$/,
			parts: [
				{ name: "privacy", file: "privacy.svelte", component: component_5 }
			]
		},

		{
			// profile/[username].svelte
			pattern: /^\/profile\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "profile_$username", file: "profile/[username].svelte", component: component_6, params: match => ({ username: d(match[1]) }) }
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
			// legal.svelte
			pattern: /^\/legal\/?$/,
			parts: [
				{ name: "legal", file: "legal.svelte", component: component_8 }
			]
		},

		{
			// login.svelte
			pattern: /^\/login\/?$/,
			parts: [
				{ name: "login", file: "login.svelte", component: component_9 }
			]
		},

		{
			// terms.svelte
			pattern: /^\/terms\/?$/,
			parts: [
				{ name: "terms", file: "terms.svelte", component: component_10 }
			]
		},

		{
			// test2.svelte
			pattern: /^\/test2\/?$/,
			parts: [
				{ name: "test2", file: "test2.svelte", component: component_11 }
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

function createCommonjsModule$1(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire$1(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire$1 () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule$1(function (module, exports) {
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

var binarySearch = createCommonjsModule$1(function (module, exports) {
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
	app.use((req,res,next)=>{
		if (req.subdomains[0] === "www") return res.redirect('https://winhalla.app'+req.path)
		if(req.protocol === "http") return res.redirect("https://winhalla.app"+req.path)
		next();
	});
	app.use((req, res, next) => {

		if (req.path.includes("assets")) return next()
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
	});
	app.use(
		compression__default['default']({ threshold: 0 }),
		sirv__default['default']('static', { dev }),
		middleware()
	);
require('https').createServer({
	key: fs__default['default'].readFileSync('/etc/letsencrypt/live/www.winhalla.app/privkey.pem'),
	cert: fs__default['default'].readFileSync('/etc/letsencrypt/live/www.winhalla.app/fullchain.pem')
},app).listen(443);
