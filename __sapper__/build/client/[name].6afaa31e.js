import{S as a,i as s,s as t,e as n,a as e,p as r,x as i,c as o,g as c,d as m,q as u,h as d,l,k as f,r as p,n as h,u as $,v as g,w as k,y as x,L as y}from"./client.ec834397.js";import{L as q}from"./Loading.5c5127ff.js";function v(a){let s,t,x,y;return x=new q({props:{data:"Redirecting..."}}),{c(){s=n("meta"),t=e(),r(x.$$.fragment),this.h()},l(a){const n=i('[data-svelte="svelte-1nzq84w"]',document.head);s=o(n,"META",{name:!0,content:!0}),n.forEach(c),t=m(a),u(x.$$.fragment,a),this.h()},h(){document.title="Redirecting...",d(s,"name","robots"),d(s,"content","noindex")},m(a,n){l(document.head,s),f(a,t,n),p(x,a,n),y=!0},p:h,i(a){y||($(x.$$.fragment,a),y=!0)},o(a){g(x.$$.fragment,a),y=!1},d(a){c(s),a&&c(t),k(x,a)}}}async function w({params:a,query:s}){return{link:a.name}}function L(a,s,t){let{link:n}=s;return x((async()=>{y("/?utm_source=sponsorship&utm_medium="+n+"&utm_campaign="+n)})),a.$$set=a=>{"link"in a&&t(0,n=a.link)},[n]}export default class extends a{constructor(a){super(),s(this,a,L,v,t,{link:0})}}export{w as preload};
