import{S as a,i as e,s as t,c as s,k as r,D as o,E as l,F as n,g as c,r as i,G as d,C as p,W as f,I as u,J as g,K as h,A as m,L as x,e as y,t as v,a as w,d as $,f as E,n as b,h as k,j as P,l as j,z as G}from"./client.09457fc8.js";import{L}from"./Loading.eece057b.js";function W(a){let e,t;return e=new L({props:{data:"Finding game..."}}),{c(){u(e.$$.fragment)},l(a){g(e.$$.fragment,a)},m(a,s){h(e,a,s),t=!0},p:m,i(a){t||(n(e.$$.fragment,a),t=!0)},o(a){o(e.$$.fragment,a),t=!1},d(a){x(e,a)}}}function A(a){let e,t,s,o,l,n,i,d,p,f,u;return{c(){e=y("div"),t=y("h2"),s=y("p"),o=v("Wow, unexpected error occured, details for geeks below."),l=w(),n=y("p"),i=v(a[0]),d=w(),p=y("a"),f=y("p"),u=v("Go to play page"),this.h()},l(r){e=$(r,"DIV",{class:!0});var g=E(e);t=$(g,"H2",{class:!0});var h=E(t);s=$(h,"P",{class:!0});var m=E(s);o=b(m,"Wow, unexpected error occured, details for geeks below."),m.forEach(c),l=k(h),n=$(h,"P",{class:!0});var x=E(n);i=b(x,a[0]),x.forEach(c),h.forEach(c),d=k(g),p=$(g,"A",{href:!0});var y=E(p);f=$(y,"P",{class:!0});var v=E(f);u=b(v,"Go to play page"),v.forEach(c),y.forEach(c),g.forEach(c),this.h()},h(){P(s,"class","text-accent "),P(n,"class","text-2xl lg:text-3xl"),P(t,"class","lg:text-5xl text-3xl text-center"),P(f,"class","underline lg:text-3xl text-2xl  text-center text-primary"),P(p,"href","/play"),P(e,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){r(a,e,c),j(e,t),j(t,s),j(s,o),j(t,l),j(t,n),j(n,i),j(e,d),j(e,p),j(p,f),j(f,u)},p(a,e){1&e&&G(i,a[0])},i:m,o:m,d(a){a&&c(e)}}}function D(a){let e,t,i,p;const f=[A,W],u=[];function g(a,e){return a[0]?0:1}return e=g(a),t=u[e]=f[e](a),{c(){t.c(),i=s()},l(a){t.l(a),i=s()},m(a,t){u[e].m(a,t),r(a,i,t),p=!0},p(a,[s]){let r=e;e=g(a),e===r?u[e].p(a,s):(d(),o(u[r],1,1,(()=>{u[r]=null})),l(),t=u[e],t?t.p(a,s):(t=u[e]=f[e](a),t.c()),n(t,1),t.m(i.parentNode,i))},i(a){p||(n(t),p=!0)},o(a){o(t),p=!1},d(a){u[e].d(a),a&&c(i)}}}function F(a,e,t){let s;return i((async()=>{let a;try{if(a=await p("get","/lobby"),a instanceof Error)return t(0,s=a.response.data);a||f("$/login"),f(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?t(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&t(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),e(this,a,F,D,t,{})}}
