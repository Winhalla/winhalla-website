import{S as a,i as t,s as e,c as s,k as n,v as r,J as o,u as l,g as c,z as i,K as d,I as p,W as f,n as u,p as g,r as h,D as m,x,e as y,t as v,a as $,d as w,f as b,o as E,h as j,j as k,l as G,G as P}from"./client.a0bd9dc2.js";import{L as D}from"./Loading.1326df1b.js";function I(a){let t,e;return t=new D({props:{data:"Finding game..."}}),{c(){u(t.$$.fragment)},l(a){g(t.$$.fragment,a)},m(a,s){h(t,a,s),e=!0},p:m,i(a){e||(l(t.$$.fragment,a),e=!0)},o(a){r(t.$$.fragment,a),e=!1},d(a){x(t,a)}}}function L(a){let t,e,s,r,o,l,i;return{c(){t=y("div"),e=y("h2"),s=v(a[0]),r=$(),o=y("a"),l=y("p"),i=v("Go to play page"),this.h()},l(n){t=w(n,"DIV",{class:!0});var d=b(t);e=w(d,"H2",{class:!0});var p=b(e);s=E(p,a[0]),p.forEach(c),r=j(d),o=w(d,"A",{href:!0});var f=b(o);l=w(f,"P",{class:!0});var u=b(l);i=E(u,"Go to play page"),u.forEach(c),f.forEach(c),d.forEach(c),this.h()},h(){k(e,"class","lg:text-4xl text-3xl text-center"),k(l,"class","underline lg:text-3xl text-2xl  text-center text-primary"),k(o,"href","/play"),k(t,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){n(a,t,c),G(t,e),G(e,s),G(t,r),G(t,o),G(o,l),G(l,i)},p(a,t){1&t&&P(s,a[0])},i:m,o:m,d(a){a&&c(t)}}}function Y(a){let t,e,i,p;const f=[L,I],u=[];function g(a,t){return a[0]?0:1}return t=g(a),e=u[t]=f[t](a),{c(){e.c(),i=s()},l(a){e.l(a),i=s()},m(a,e){u[t].m(a,e),n(a,i,e),p=!0},p(a,[s]){let n=t;t=g(a),t===n?u[t].p(a,s):(d(),r(u[n],1,1,(()=>{u[n]=null})),o(),e=u[t],e?e.p(a,s):(e=u[t]=f[t](a),e.c()),l(e,1),e.m(i.parentNode,i))},i(a){p||(l(e),p=!0)},o(a){r(e),p=!1},d(a){u[t].d(a),a&&c(i)}}}function z(a,t,e){let s;return i((async()=>{let a;try{if(a=await p("get","/lobby"),a instanceof Error)throw a;console.log("id",a),a||f("$/login"),f(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?e(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&e(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),t(this,a,z,Y,e,{})}}
