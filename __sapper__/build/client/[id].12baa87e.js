import{S as a,i as e,s,a as t,E as n,q as i,d as r,f as o,F as l,l as c,G as d,n as f,w as m,u,H as h,x as p,y as $,D as g,B as k,o as x}from"./client.838138de.js";import{L as y}from"./Loading.67e3bb92.js";const{document:z}=$;function L(a){let e,s,p;return s=new y({props:{data:"Redirecting..."}}),{c(){e=t(),n(s.$$.fragment),this.h()},l(a){i('[data-svelte="svelte-1y0zdz3"]',z.head).forEach(r),e=o(a),l(s.$$.fragment,a),this.h()},h(){z.title="Redirecting..."},m(a,t){c(a,e,t),d(s,a,t),p=!0},p:f,i(a){p||(m(s.$$.fragment,a),p=!0)},o(a){u(s.$$.fragment,a),p=!1},d(a){a&&r(e),h(s,a)}}}async function b({params:a,query:e}){return{link:a.id}}function j(a,e,s){let{link:t}=e;return p((()=>{document.cookie=g.serialize("affiliateLinkId",t,{maxAge:15552e3,sameSite:"lax",path:"/"}),k(x+"/auth/login")})),a.$$set=a=>{"link"in a&&s(0,t=a.link)},[t]}export default class extends a{constructor(a){super(),e(this,a,j,L,s,{link:0})}}export{b as preload};
