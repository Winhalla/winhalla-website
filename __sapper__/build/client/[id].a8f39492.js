import{S as a,i as s,s as e,a as t,I as i,q as n,g as r,h as o,J as l,k as c,K as d,A as f,F as m,D as u,L as g,r as h,u as p,w as $,W as k}from"./client.da24cd43.js";import{L as x}from"./Loading.f0ad783b.js";const{document:L}=p;function y(a){let s,e,h;return e=new x({props:{data:"Redirecting..."}}),{c(){s=t(),i(e.$$.fragment),this.h()},l(a){n('[data-svelte="svelte-1y0zdz3"]',L.head).forEach(r),s=o(a),l(e.$$.fragment,a),this.h()},h(){L.title="Redirecting..."},m(a,t){c(a,s,t),d(e,a,t),h=!0},p:f,i(a){h||(m(e.$$.fragment,a),h=!0)},o(a){u(e.$$.fragment,a),h=!1},d(a){a&&r(s),g(e,a)}}}async function z({params:a,query:s}){return{link:a.id}}function j(a,s,e){let{link:t}=s;return h((()=>{document.cookie=$.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),k("/login")})),a.$$set=a=>{"link"in a&&e(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),s(this,a,j,y,e,{link:0})}}export{z as preload};
