import{S as e,i as a,s,r as t,u as r,v as l,w as c,x as n,y as o,a as i,e as m,t as h,q as d,d as u,f,c as x,g as v,h as p,j as g,H as b,l as E,k as y,I,J as w,z,K as D,A as $,E as V,B as j,D as A,F as L,C as q,b as T}from"./client.ee9bf36a.js";function C(e){let a,s;return a=new V({props:{pushError:e[2],message:"There was an error creating your account",type:"createAccount"}}),{c(){t(a.$$.fragment)},l(e){r(a.$$.fragment,e)},m(e,t){l(a,e,t),s=!0},p(e,s){const t={};4&s&&(t.pushError=e[2]),a.$set(t)},i(e){s||(c(a.$$.fragment,e),s=!0)},o(e){n(a.$$.fragment,e),s=!1},d(e){o(a,e)}}}function k(e){let a,s;return{c(){a=m("p"),s=h("INVALID EMAIL"),this.h()},l(e){a=x(e,"P",{class:!0});var t=v(a);s=p(t,"INVALID EMAIL"),t.forEach(u),this.h()},h(){g(a,"class","text-legendary info  svelte-cmjbqm")},m(e,t){E(e,a,t),y(a,s)},d(e){e&&u(a)}}}function B(e){let a,s,t,r,l,c;return{c(){a=m("div"),s=T("svg"),t=T("path"),r=i(),l=m("p"),c=h("VALID EMAIL"),this.h()},l(e){a=x(e,"DIV",{class:!0});var n=v(a);s=x(n,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var o=v(s);t=x(o,"path",{d:!0},1),v(t).forEach(u),o.forEach(u),r=f(n),l=x(n,"P",{class:!0});var i=v(l);c=p(i,"VALID EMAIL"),i.forEach(u),n.forEach(u),this.h()},h(){g(t,"d","m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z"),g(s,"class","fill-current text-green w-4 check svelte-cmjbqm"),g(s,"viewBox","0 0 33 24"),g(s,"xmlns","http://www.w3.org/2000/svg"),g(l,"class","text-green info svelte-cmjbqm"),g(a,"class","flex items-center")},m(e,n){E(e,a,n),y(a,s),y(s,t),y(a,r),y(a,l),y(l,c)},d(e){e&&u(a)}}}function M(e){let a,s,t,r,l,o,$,V,A,L,q,T,M,N,P,S,H,U,_,F,J,K,O,W=e[2]&&C(e);function G(e,a){return e[1]?B:!1===e[1]?k:void 0}let Q=G(e),R=Q&&Q(e);return{c(){a=i(),s=m("div"),W&&W.c(),t=i(),r=m("div"),l=m("div"),o=m("div"),$=m("h1"),V=h("Change your email"),A=i(),L=m("div"),q=m("p"),T=h("Email"),M=i(),N=m("div"),P=m("input"),S=i(),R&&R.c(),H=i(),U=m("button"),_=h("Change email"),this.h()},l(e){d('[data-svelte="svelte-1r944zp"]',document.head).forEach(u),a=f(e),s=x(e,"DIV",{});var c=v(s);W&&W.l(c),t=f(c),r=x(c,"DIV",{class:!0});var n=v(r);l=x(n,"DIV",{class:!0});var i=v(l);o=x(i,"DIV",{class:!0});var m=v(o);$=x(m,"H1",{class:!0});var h=v($);V=p(h,"Change your email"),h.forEach(u),m.forEach(u),A=f(i),L=x(i,"DIV",{class:!0});var g=v(L);q=x(g,"P",{class:!0});var b=v(q);T=p(b,"Email"),b.forEach(u),M=f(g),N=x(g,"DIV",{});var E=v(N);P=x(E,"INPUT",{type:!0,placeholder:!0,class:!0}),S=f(E),R&&R.l(E),E.forEach(u),g.forEach(u),H=f(i),U=x(i,"BUTTON",{disabled:!0,class:!0});var y=v(U);_=p(y,"Change email"),y.forEach(u),i.forEach(u),n.forEach(u),c.forEach(u),this.h()},h(){document.title="Change email | Winhalla",g($,"class","text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"),g(o,"class","text-center md:text-left mt-7 md:mt-12"),g(q,"class","input-header svelte-cmjbqm"),g(P,"type","email"),g(P,"placeholder","Type here your new email"),g(P,"class","input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-cmjbqm"),b(P,"border-legendary",!1===e[1]),g(L,"class","md:mt-4"),U.disabled=F=!e[1],g(U,"class","button button-brand mt-3 svelte-cmjbqm"),b(U,"mt-11",null==e[1]),g(l,"class","flex flex-col justify-center px-5 md:p-0"),g(r,"class","flex items-center justify-center md:h-screen-7")},m(c,n){E(c,a,n),E(c,s,n),W&&W.m(s,null),y(s,t),y(s,r),y(r,l),y(l,o),y(o,$),y($,V),y(l,A),y(l,L),y(L,q),y(q,T),y(L,M),y(L,N),y(N,P),I(P,e[0]),y(N,S),R&&R.m(N,null),y(l,H),y(l,U),y(U,_),J=!0,K||(O=[w(P,"keydown",e[3]),w(P,"input",e[5]),w(U,"click",e[4])],K=!0)},p(e,[a]){e[2]?W?(W.p(e,a),4&a&&c(W,1)):(W=C(e),W.c(),c(W,1),W.m(s,t)):W&&(j(),n(W,1,1,(()=>{W=null})),z()),1&a&&P.value!==e[0]&&I(P,e[0]),2&a&&b(P,"border-legendary",!1===e[1]),Q!==(Q=G(e))&&(R&&R.d(1),R=Q&&Q(e),R&&(R.c(),R.m(N,null))),(!J||2&a&&F!==(F=!e[1]))&&(U.disabled=F),2&a&&b(U,"mt-11",null==e[1])},i(e){J||(c(W),J=!0)},o(e){n(W),J=!1},d(e){e&&u(a),e&&u(s),W&&W.d(),R&&R.d(),K=!1,D(O)}}}function N(e,a,s){let t,r,l,c=null;return $((()=>{A.subscribe((async e=>{l=e.content,l.then?l.then((e=>{e.user||L("/")})):l&&(l.user||L("/"))}))()})),[t,c,r,function(){setTimeout((()=>{if(t.length>0){let e=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm.exec(t);s(1,c=!!e)}else s(1,c=null)}),1)},async function(){try{const e=await q("patch",`/auth/changeEmail?email=${t}`);if(e instanceof Error)throw e;L("/")}catch(e){s(2,r=e.response.data.message?e.response.data.message:e.response.data?e.response.data.toString():e.toString()),setTimeout((()=>{s(2,r=void 0)}),8e3)}},function(){t=this.value,s(0,t)}]}export default class extends e{constructor(e){super(),a(this,e,N,M,s,{})}}
