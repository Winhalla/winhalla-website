import{S as a,i as e,s,a as t,E as n,q as i,d as r,f as o,F as l,l as c,G as d,n as f,z as m,x as u,H as p,o as h,p as $,v as g,C as k,r as x}from"./client.1480e113.js";import{L as z}from"./Loading.a0c4ef39.js";const{document:v}=$;function y(a){let e,s,h;return s=new z({props:{data:"Redirecting..."}}),{c(){e=t(),n(s.$$.fragment),this.h()},l(a){i('[data-svelte="svelte-1y0zdz3"]',v.head).forEach(r),e=o(a),l(s.$$.fragment,a),this.h()},h(){v.title="Redirecting..."},m(a,t){c(a,e,t),d(s,a,t),h=!0},p:f,i(a){h||(m(s.$$.fragment,a),h=!0)},o(a){u(s.$$.fragment,a),h=!1},d(a){a&&r(e),p(s,a)}}}async function L({params:a,query:e}){return{link:a.id}}function j(a,e,s){let{link:t}=e;return h((()=>{document.cookie=g.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),k(x+"/auth/login")})),a.$$set=a=>{"link"in a&&s(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),e(this,a,j,y,s,{link:0})}}export{L as preload};