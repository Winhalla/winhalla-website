import{S as a,i as e,s,r as t,u as r,v as l,w as c,x as n,y as o,a as i,e as m,t as h,q as d,d as u,f as x,c as f,g as v,h as p,j as g,H as b,l as E,k as y,I,J as w,z,K as D,A as $,E as V,B as j,D as A,F as L,C as q,b as T}from"./client.b308da00.js";function C(a){let e,s;return e=new V({props:{pushError:a[2],message:"There was an error creating your account",type:"createAccount"}}),{c(){t(e.$$.fragment)},l(a){r(e.$$.fragment,a)},m(a,t){l(e,a,t),s=!0},p(a,s){const t={};4&s&&(t.pushError=a[2]),e.$set(t)},i(a){s||(c(e.$$.fragment,a),s=!0)},o(a){n(e.$$.fragment,a),s=!1},d(a){o(e,a)}}}function k(a){let e,s;return{c(){e=m("p"),s=h("INVALID EMAIL"),this.h()},l(a){e=f(a,"P",{class:!0});var t=v(e);s=p(t,"INVALID EMAIL"),t.forEach(u),this.h()},h(){g(e,"class","text-legendary info  svelte-cmjbqm")},m(a,t){E(a,e,t),y(e,s)},d(a){a&&u(e)}}}function B(a){let e,s,t,r,l,c;return{c(){e=m("div"),s=T("svg"),t=T("path"),r=i(),l=m("p"),c=h("VALID EMAIL"),this.h()},l(a){e=f(a,"DIV",{class:!0});var n=v(e);s=f(n,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var o=v(s);t=f(o,"path",{d:!0},1),v(t).forEach(u),o.forEach(u),r=x(n),l=f(n,"P",{class:!0});var i=v(l);c=p(i,"VALID EMAIL"),i.forEach(u),n.forEach(u),this.h()},h(){g(t,"d","m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z"),g(s,"class","fill-current text-green w-4 check svelte-cmjbqm"),g(s,"viewBox","0 0 33 24"),g(s,"xmlns","http://www.w3.org/2000/svg"),g(l,"class","text-green info svelte-cmjbqm"),g(e,"class","flex items-center")},m(a,n){E(a,e,n),y(e,s),y(s,t),y(e,r),y(e,l),y(l,c)},d(a){a&&u(e)}}}function M(a){let e,s,t,r,l,o,$,V,A,L,q,T,M,N,P,S,H,U,_,F,J,K,O,W=a[2]&&C(a);function G(a,e){return a[1]?B:!1===a[1]?k:void 0}let Q=G(a),R=Q&&Q(a);return{c(){e=i(),s=m("div"),W&&W.c(),t=i(),r=m("div"),l=m("div"),o=m("div"),$=m("h1"),V=h("Change your email"),A=i(),L=m("div"),q=m("p"),T=h("Email"),M=i(),N=m("div"),P=m("input"),S=i(),R&&R.c(),H=i(),U=m("button"),_=h("Change email"),this.h()},l(a){d('[data-svelte="svelte-1r944zp"]',document.head).forEach(u),e=x(a),s=f(a,"DIV",{});var c=v(s);W&&W.l(c),t=x(c),r=f(c,"DIV",{class:!0});var n=v(r);l=f(n,"DIV",{class:!0});var i=v(l);o=f(i,"DIV",{class:!0});var m=v(o);$=f(m,"H1",{class:!0});var h=v($);V=p(h,"Change your email"),h.forEach(u),m.forEach(u),A=x(i),L=f(i,"DIV",{class:!0});var g=v(L);q=f(g,"P",{class:!0});var b=v(q);T=p(b,"Email"),b.forEach(u),M=x(g),N=f(g,"DIV",{});var E=v(N);P=f(E,"INPUT",{type:!0,placeholder:!0,class:!0}),S=x(E),R&&R.l(E),E.forEach(u),g.forEach(u),H=x(i),U=f(i,"BUTTON",{disabled:!0,class:!0});var y=v(U);_=p(y,"Change email"),y.forEach(u),i.forEach(u),n.forEach(u),c.forEach(u),this.h()},h(){document.title="Change email | Winhalla",g($,"class","text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"),g(o,"class","text-center md:text-left mt-7 md:mt-12"),g(q,"class","input-header svelte-cmjbqm"),g(P,"type","email"),g(P,"placeholder","Type here your new email"),g(P,"class","input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-cmjbqm"),b(P,"border-legendary",!1===a[1]),g(L,"class","md:mt-4"),U.disabled=F=!a[1],g(U,"class","button button-brand mt-3 svelte-cmjbqm"),b(U,"mt-11",null==a[1]),g(l,"class","flex flex-col justify-center px-5 md:p-0"),g(r,"class","flex items-center justify-center md:h-screen-7")},m(c,n){E(c,e,n),E(c,s,n),W&&W.m(s,null),y(s,t),y(s,r),y(r,l),y(l,o),y(o,$),y($,V),y(l,A),y(l,L),y(L,q),y(q,T),y(L,M),y(L,N),y(N,P),I(P,a[0]),y(N,S),R&&R.m(N,null),y(l,H),y(l,U),y(U,_),J=!0,K||(O=[w(P,"keydown",a[3]),w(P,"input",a[5]),w(U,"click",a[4])],K=!0)},p(a,[e]){a[2]?W?(W.p(a,e),4&e&&c(W,1)):(W=C(a),W.c(),c(W,1),W.m(s,t)):W&&(j(),n(W,1,1,(()=>{W=null})),z()),1&e&&P.value!==a[0]&&I(P,a[0]),2&e&&b(P,"border-legendary",!1===a[1]),Q!==(Q=G(a))&&(R&&R.d(1),R=Q&&Q(a),R&&(R.c(),R.m(N,null))),(!J||2&e&&F!==(F=!a[1]))&&(U.disabled=F),2&e&&b(U,"mt-11",null==a[1])},i(a){J||(c(W),J=!0)},o(a){n(W),J=!1},d(a){a&&u(e),a&&u(s),W&&W.d(),R&&R.d(),K=!1,D(O)}}}function N(a,e,s){let t,r,l,c=null;return $((()=>{A.subscribe((async a=>{l=a.content,l.then?l.then((a=>{a.user||L("/")})):l&&(l.user||L("/"))}))()})),[t,c,r,function(){setTimeout((()=>{if(t.length>0){let a=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm.exec(t);s(1,c=!!a)}else s(1,c=null)}),1)},async function(){try{const a=await q("patch",`/auth/changeEmail?email=${t}`);if(a instanceof Error)throw a;L("/")}catch(a){s(2,r=a.response.data.message?a.response.data.message:a.response.data?a.response.data.toString():a.toString()),setTimeout((()=>{s(2,r=void 0)}),8e3)}},function(){t=this.value,s(0,t)}]}export default class extends a{constructor(a){super(),e(this,a,N,M,s,{})}}
