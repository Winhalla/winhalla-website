import{S as a,i as e,s as t,c as s,k as r,D as o,E as l,F as n,g as c,r as f,G as i,C as d,W as p,I as u,J as g,K as h,A as m,L as x,e as y,t as v,a as w,d as $,f as b,n as E,h as k,j as P,l as j,z as G}from"./client.ab28f4a8.js";import{L}from"./Loading.26ffb8fd.js";function W(a){let e,t;return e=new L({props:{data:"Finding game..."}}),{c(){u(e.$$.fragment)},l(a){g(e.$$.fragment,a)},m(a,s){h(e,a,s),t=!0},p:m,i(a){t||(n(e.$$.fragment,a),t=!0)},o(a){o(e.$$.fragment,a),t=!1},d(a){x(e,a)}}}function A(a){let e,t,s,o,l,n,f,i,d,p,u;return{c(){e=y("div"),t=y("h2"),s=y("p"),o=v("Wow, unexpected error occured, details for geeks below."),l=w(),n=y("p"),f=v(a[0]),i=w(),d=y("a"),p=y("p"),u=v("Go to play page"),this.h()},l(r){e=$(r,"DIV",{class:!0});var g=b(e);t=$(g,"H2",{class:!0});var h=b(t);s=$(h,"P",{class:!0});var m=b(s);o=E(m,"Wow, unexpected error occured, details for geeks below."),m.forEach(c),l=k(h),n=$(h,"P",{class:!0});var x=b(n);f=E(x,a[0]),x.forEach(c),h.forEach(c),i=k(g),d=$(g,"A",{href:!0});var y=b(d);p=$(y,"P",{class:!0});var v=b(p);u=E(v,"Go to play page"),v.forEach(c),y.forEach(c),g.forEach(c),this.h()},h(){P(s,"class","text-accent "),P(n,"class","text-2xl lg:text-3xl"),P(t,"class","lg:text-5xl text-3xl text-center"),P(p,"class","underline lg:text-3xl text-2xl  text-center text-primary"),P(d,"href","/play"),P(e,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,c){r(a,e,c),j(e,t),j(t,s),j(s,o),j(t,l),j(t,n),j(n,f),j(e,i),j(e,d),j(d,p),j(p,u)},p(a,e){1&e&&G(f,a[0])},i:m,o:m,d(a){a&&c(e)}}}function D(a){let e,t,f,d;const p=[A,W],u=[];function g(a,e){return a[0]?0:1}return e=g(a),t=u[e]=p[e](a),{c(){t.c(),f=s()},l(a){t.l(a),f=s()},m(a,t){u[e].m(a,t),r(a,f,t),d=!0},p(a,[s]){let r=e;e=g(a),e===r?u[e].p(a,s):(i(),o(u[r],1,1,(()=>{u[r]=null})),l(),t=u[e],t?t.p(a,s):(t=u[e]=p[e](a),t.c()),n(t,1),t.m(f.parentNode,f))},i(a){d||(n(t),d=!0)},o(a){o(t),d=!1},d(a){u[e].d(a),a&&c(f)}}}function F(a,e,t){let s;return f((async()=>{let a;try{if(a=await d("get","/lobby"),a instanceof Error)return t(0,s=a.response.data);a||p("$/login"),p(`/play/ffa/${a}`)}catch(a){400===a.response.status&&a.response.data.includes("Play at least one ranked")?t(0,s="You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"):400===a.response.status&&a.response.data.includes("Play at least one")&&t(0,s="You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)")}})),[s]}export default class extends a{constructor(a){super(),e(this,a,F,D,t,{})}}
