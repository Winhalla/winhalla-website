import{S as r,i as n,s as o,e as a,a as e,t,q as s,d as c,f as l,g as i,h as d,n as p,j as u,l as h,k as f,A as m}from"./client.77756a40.js";function y(r){let n,o,y,g,v,A,P,k,V,S,b,j;return{c(){n=a("script"),y=e(),g=a("div"),v=a("script"),A=t('function init(api) {\r\n            if (api) {\r\n                api.on("AdStarted", function() {\r\n                    console.log("AdStarted");\r\n                });\r\n\r\n                api.on("AdError", (message, error) => {\r\n                    console.log(message);\r\n                    console.log(error);\r\n                });\r\n\r\n                api.on("AdVideoComplete", function() {\r\n                        console.log("AdVideoComplete");\r\n                    }\r\n                );\r\n            } else {\r\n                console.log("blank");\r\n            }\r\n        }'),P=e(),k=a("script"),V=t('function playAd() {\r\n        var s = document.querySelector("script[data-playerPro=\\"current\\"]");\r\n        s.removeAttribute("data-playerPro");\r\n        (playerPro = window.playerPro || []).push({\r\n            id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",\r\n            after: s,\r\n            init: init\r\n        });\r\n    };'),S=e(),b=a("button"),j=t("Play ad"),this.h()},l(r){const o=s('[data-svelte="svelte-q4vv9u"]',document.head);n=c(o,"SCRIPT",{async:!0,src:!0}),l(n).forEach(i),o.forEach(i),y=d(r),g=c(r,"DIV",{});var a=l(g);v=c(a,"SCRIPT",{});var e=l(v);A=p(e,'function init(api) {\r\n            if (api) {\r\n                api.on("AdStarted", function() {\r\n                    console.log("AdStarted");\r\n                });\r\n\r\n                api.on("AdError", (message, error) => {\r\n                    console.log(message);\r\n                    console.log(error);\r\n                });\r\n\r\n                api.on("AdVideoComplete", function() {\r\n                        console.log("AdVideoComplete");\r\n                    }\r\n                );\r\n            } else {\r\n                console.log("blank");\r\n            }\r\n        }'),e.forEach(i),P=d(a),k=c(a,"SCRIPT",{"data-playerPro":!0});var t=l(k);V=p(t,'function playAd() {\r\n        var s = document.querySelector("script[data-playerPro=\\"current\\"]");\r\n        s.removeAttribute("data-playerPro");\r\n        (playerPro = window.playerPro || []).push({\r\n            id: "oOMhJ7zhhrjUgiJx4ZxVYPvrXaDjI3VFmkVHIzxJ2nYvXX8krkzp",\r\n            after: s,\r\n            init: init\r\n        });\r\n    };'),t.forEach(i),a.forEach(i),S=d(r),b=c(r,"BUTTON",{onclick:!0,class:!0});var u=l(b);j=p(u,"Play ad"),u.forEach(i),this.h()},h(){n.async=!0,n.src!==(o="https://cdn.stat-rock.com/player.js")&&u(n,"src","https://cdn.stat-rock.com/player.js"),u(k,"data-playerpro","current"),u(b,"onclick","playAd()"),u(b,"class","mt-10 button button-brand")},m(r,o){h(document.head,n),f(r,y,o),f(r,g,o),h(g,v),h(v,A),h(g,P),h(g,k),h(k,V),f(r,S,o),f(r,b,o),h(b,j)},p:m,i:m,o:m,d(r){i(n),r&&i(y),r&&i(g),r&&i(S),r&&i(b)}}}export default class extends r{constructor(r){super(),n(this,r,null,y,o,{})}}
