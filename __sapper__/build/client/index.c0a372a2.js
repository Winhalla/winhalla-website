import{S as a,i as t,s as e,w as s,l as n,x as r,y as o,z as l,d as c,o as i,A as f,B as p,C as u,r as d,E as h,F as g,G as m,n as x,H as y,e as $,t as v,a as w,c as E,g as b,h as j,f as k,j as G,k as P,K as A}from"./client.1480e113.js";import{L as F}from"./Loading.a0c4ef39.js";function H(a){let t,e;return t=new F({props:{data:"Finding game..."}}),{c(){h(t.$$.fragment)},l(a){g(t.$$.fragment,a)},m(a,s){m(t,a,s),e=!0},p:x,i(a){e||(l(t.$$.fragment,a),e=!0)},o(a){r(t.$$.fragment,a),e=!1},d(a){y(t,a)}}}function L(a){let t,e,s,r,o,l,i;return{c(){t=$("div"),e=$("h2"),s=v(a[0]),r=w(),o=$("a"),l=$("p"),i=v("Go to play page"),this.h()},l(n){t=E(n,"DIV",{class:!0});var f=b(t);e=E(f,"H2",{class:!0});var p=b(e);s=j(p,a[0]),p.forEach(c),r=k(f),o=E(f,"A",{href:!0});var u=b(o);l=E(u,"P",{class:!0});var d=b(l);i=j(d,"Go to play page"),d.forEach(c),u.forEach(c),f.forEach(c),this.h()},h(){G(e,"class","lg:text-4xl text-3xl text-center"),G(l,"class","underline lg:text-3xl text-2xl  text-center text-primary"),G(o,"href","/play"),G(t,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){n(a,t,c),P(t,e),P(e,s),P(t,r),P(t,o),P(o,l),P(l,i)},p(a,t){1&t&&A(s,a[0])},i:x,o:x,d(a){a&&c(t)}}}function Y(a){let t,e,i,p;const u=[L,H],d=[];function h(a,t){return a[0]?0:1}return t=h(a),e=d[t]=u[t](a),{c(){e.c(),i=s()},l(a){e.l(a),i=s()},m(a,e){d[t].m(a,e),n(a,i,e),p=!0},p(a,[s]){let n=t;t=h(a),t===n?d[t].p(a,s):(f(),r(d[n],1,1,(()=>{d[n]=null})),o(),e=d[t],e?e.p(a,s):(e=d[t]=u[t](a),e.c()),l(e,1),e.m(i.parentNode,i))},i(a){p||(l(e),p=!0)},o(a){r(e),p=!1},d(a){d[t].d(a),a&&c(i)}}}function z(a,t,e){let s;return i((async()=>{let a;try{if(a=await p("get","/lobby"),a instanceof Error)throw a;console.log("id",a),a||u(`${d}/auth/login`),u(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?e(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&e(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),t(this,a,z,Y,e,{})}}
