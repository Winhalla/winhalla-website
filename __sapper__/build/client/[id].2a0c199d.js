import{S as a,i as e,s,e as t,a as n,y as i,E as o,c as r,g as c,d as f,z as l,h as m,l as d,k as p,A as h,n as u,B as k,C as $,D as g,G as x,H as y,N as j,V as w}from"./client.ee537f47.js";import{c as z}from"./index.f2cf2075.js";import{L as A}from"./Loading.2daffe1a.js";const{document:E}=y;function L(a){let e,s,x,y;return x=new A({props:{data:"Redirecting..."}}),{c(){e=t("meta"),s=n(),i(x.$$.fragment),this.h()},l(a){const t=o('[data-svelte="svelte-1nzq84w"]',E.head);e=r(t,"META",{name:!0,content:!0}),t.forEach(c),s=f(a),l(x.$$.fragment,a),this.h()},h(){E.title="Redirecting...",m(e,"name","robots"),m(e,"content","noindex")},m(a,t){d(E.head,e),p(a,s,t),h(x,a,t),y=!0},p:u,i(a){y||(k(x.$$.fragment,a),y=!0)},o(a){$(x.$$.fragment,a),y=!1},d(a){c(e),a&&c(s),g(x,a)}}}async function q({params:a,query:e}){return{link:a.id}}function v(a,e,s){let{link:t}=e;return x((async()=>{document.cookie=z.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),await j("post","/linkCheckpoint/"+t),w("/")})),a.$$set=a=>{"link"in a&&s(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),e(this,a,v,L,s,{link:0})}}export{q as preload};
