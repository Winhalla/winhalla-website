import{S as a,i as t,s as e,D as s,l as n,L as l,N as o,K as r,d as c,o as i,O as f,p,u,m as d,H as g,I as h,J as m,n as x,M as y,e as v,t as $,a as w,c as b,g as E,h as j,f as k,j as L,k as P,v as D}from"./client.09fcf86f.js";import{L as G}from"./Loading.4608faa5.js";function H(a){let t,e;return t=new G({props:{data:"Finding game..."}}),{c(){g(t.$$.fragment)},l(a){h(t.$$.fragment,a)},m(a,s){m(t,a,s),e=!0},p:x,i(a){e||(r(t.$$.fragment,a),e=!0)},o(a){l(t.$$.fragment,a),e=!1},d(a){y(t,a)}}}function I(a){let t,e,s,l,o,r,i;return{c(){t=v("div"),e=v("h2"),s=$(a[0]),l=w(),o=v("a"),r=v("p"),i=$("Go to play page"),this.h()},l(n){t=b(n,"DIV",{class:!0});var f=E(t);e=b(f,"H2",{class:!0});var p=E(e);s=j(p,a[0]),p.forEach(c),l=k(f),o=b(f,"A",{href:!0});var u=E(o);r=b(u,"P",{class:!0});var d=E(r);i=j(d,"Go to play page"),d.forEach(c),u.forEach(c),f.forEach(c),this.h()},h(){L(e,"class","lg:text-4xl text-3xl text-center"),L(r,"class","underline lg:text-3xl text-2xl  text-center text-primary"),L(o,"href","/play"),L(t,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){n(a,t,c),P(t,e),P(e,s),P(t,l),P(t,o),P(o,r),P(r,i)},p(a,t){1&t&&D(s,a[0])},i:x,o:x,d(a){a&&c(t)}}}function N(a){let t,e,i,p;const u=[I,H],d=[];function g(a,t){return a[0]?0:1}return t=g(a),e=d[t]=u[t](a),{c(){e.c(),i=s()},l(a){e.l(a),i=s()},m(a,e){d[t].m(a,e),n(a,i,e),p=!0},p(a,[s]){let n=t;t=g(a),t===n?d[t].p(a,s):(f(),l(d[n],1,1,(()=>{d[n]=null})),o(),e=d[t],e?e.p(a,s):(e=d[t]=u[t](a),e.c()),r(e,1),e.m(i.parentNode,i))},i(a){p||(r(e),p=!0)},o(a){l(e),p=!1},d(a){d[t].d(a),a&&c(i)}}}function Y(a,t,e){let s;return i((async()=>{let a;try{a=await p("get","/lobby"),console.log("id",a),a||u(`${d}/auth/login`),u(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?e(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&e(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),t(this,a,Y,N,e,{})}}
