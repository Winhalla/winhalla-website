import{S as a,i as e,s,a as t,I as i,q as n,g as r,h as o,J as l,k as c,K as d,A as f,F as m,D as u,L as g,r as h,u as p,w as $,W as k}from"./client.2a7e64ff.js";import{L as x}from"./Loading.b3ad2d81.js";const{document:L}=p;function y(a){let e,s,h;return s=new x({props:{data:"Redirecting..."}}),{c(){e=t(),i(s.$$.fragment),this.h()},l(a){n('[data-svelte="svelte-1y0zdz3"]',L.head).forEach(r),e=o(a),l(s.$$.fragment,a),this.h()},h(){L.title="Redirecting..."},m(a,t){c(a,e,t),d(s,a,t),h=!0},p:f,i(a){h||(m(s.$$.fragment,a),h=!0)},o(a){u(s.$$.fragment,a),h=!1},d(a){a&&r(e),g(s,a)}}}async function z({params:a,query:e}){return{link:a.id}}function j(a,e,s){let{link:t}=e;return h((()=>{document.cookie=$.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),k("/login")})),a.$$set=a=>{"link"in a&&s(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),e(this,a,j,y,s,{link:0})}}export{z as preload};
