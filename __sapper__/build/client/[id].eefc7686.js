import{S as a,i as s,s as e,a as t,E as n,q as i,d as r,f as o,F as l,l as c,G as d,n as f,z as m,x as u,H as p,o as h,p as $,v as g,C as k,r as x}from"./client.3a20bf1e.js";import{L as z}from"./Loading.4bdbc6dc.js";const{document:b}=$;function v(a){let s,e,h;return e=new z({props:{data:"Redirecting..."}}),{c(){s=t(),n(e.$$.fragment),this.h()},l(a){i('[data-svelte="svelte-1y0zdz3"]',b.head).forEach(r),s=o(a),l(e.$$.fragment,a),this.h()},h(){b.title="Redirecting..."},m(a,t){c(a,s,t),d(e,a,t),h=!0},p:f,i(a){h||(m(e.$$.fragment,a),h=!0)},o(a){u(e.$$.fragment,a),h=!1},d(a){a&&r(s),p(e,a)}}}async function y({params:a,query:s}){return{link:a.id}}function L(a,s,e){let{link:t}=s;return h((()=>{document.cookie=g.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),k(x+"/auth/login")})),a.$$set=a=>{"link"in a&&e(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),s(this,a,L,v,e,{link:0})}}export{y as preload};
