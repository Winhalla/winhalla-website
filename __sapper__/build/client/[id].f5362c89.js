import{S as a,i as s,s as t,f as e,x as i,D as n,d as r,l as o,y as c,a as l,z as f,Q as d,A as m,B as p,C as u,F as h,G as $,M as k,V as g}from"./client.c4c5a342.js";import{c as x}from"./index.f2cf2075.js";import{L as y}from"./Loading.24eb6798.js";const{document:z}=$;function j(a){let s,t,h;return t=new y({props:{data:"Redirecting..."}}),{c(){s=e(),i(t.$$.fragment),this.h()},l(a){n('[data-svelte="svelte-1y0zdz3"]',z.head).forEach(r),s=o(a),c(t.$$.fragment,a),this.h()},h(){z.title="Redirecting..."},m(a,e){l(a,s,e),f(t,a,e),h=!0},p:d,i(a){h||(m(t.$$.fragment,a),h=!0)},o(a){p(t.$$.fragment,a),h=!1},d(a){a&&r(s),u(t,a)}}}async function L({params:a,query:s}){return{link:a.id}}function v(a,s,t){let{link:e}=s;return h((async()=>{document.cookie=x.serialize("affiliateLinkId",e,{maxAge:15552e3,sameSite:"lax",path:"/"}),await k("post","/linkCheckpoint/"+e),g("/")})),a.$$set=a=>{"link"in a&&t(0,e=a.link)},[e]}export default class extends a{constructor(a){super(),s(this,a,v,j,t,{link:0})}}export{L as preload};
