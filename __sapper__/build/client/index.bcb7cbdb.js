import{S as a,i as t,s as e,r as s,l as n,u as r,v as o,w as l,d as c,x as i,z as u,A as d,B as f,o as p,E as h,F as g,G as m,n as x,H as y,e as v,t as $,a as w,c as E,g as b,h as j,f as k,j as G,k as P,J as A}from"./client.04a2df83.js";import{L as F}from"./Loading.04420a60.js";function H(a){let t,e;return t=new F({props:{data:"Finding game..."}}),{c(){h(t.$$.fragment)},l(a){g(t.$$.fragment,a)},m(a,s){m(t,a,s),e=!0},p:x,i(a){e||(l(t.$$.fragment,a),e=!0)},o(a){r(t.$$.fragment,a),e=!1},d(a){y(t,a)}}}function L(a){let t,e,s,r,o,l,i;return{c(){t=v("div"),e=v("h2"),s=$(a[0]),r=w(),o=v("a"),l=v("p"),i=$("Go to play page"),this.h()},l(n){t=E(n,"DIV",{class:!0});var u=b(t);e=E(u,"H2",{class:!0});var d=b(e);s=j(d,a[0]),d.forEach(c),r=k(u),o=E(u,"A",{href:!0});var f=b(o);l=E(f,"P",{class:!0});var p=b(l);i=j(p,"Go to play page"),p.forEach(c),f.forEach(c),u.forEach(c),this.h()},h(){G(e,"class","lg:text-4xl text-3xl text-center"),G(l,"class","underline lg:text-3xl text-2xl  text-center text-primary"),G(o,"href","/play"),G(t,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){n(a,t,c),P(t,e),P(e,s),P(t,r),P(t,o),P(o,l),P(l,i)},p(a,t){1&t&&A(s,a[0])},i:x,o:x,d(a){a&&c(t)}}}function Y(a){let t,e,i,d;const f=[L,H],p=[];function h(a,t){return a[0]?0:1}return t=h(a),e=p[t]=f[t](a),{c(){e.c(),i=s()},l(a){e.l(a),i=s()},m(a,e){p[t].m(a,e),n(a,i,e),d=!0},p(a,[s]){let n=t;t=h(a),t===n?p[t].p(a,s):(u(),r(p[n],1,1,(()=>{p[n]=null})),o(),e=p[t],e?e.p(a,s):(e=p[t]=f[t](a),e.c()),l(e,1),e.m(i.parentNode,i))},i(a){d||(l(e),d=!0)},o(a){r(e),d=!1},d(a){p[t].d(a),a&&c(i)}}}function z(a,t,e){let s;return i((async()=>{let a;try{if(a=await d("get","/lobby"),a instanceof Error)throw a;console.log("id",a),a||f(`${p}/auth/login`),f(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?e(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&e(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),t(this,a,z,Y,e,{})}}
