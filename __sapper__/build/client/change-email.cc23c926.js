import{S as a,i as s,s as t,a as e,e as c,t as n,q as l,d as i,f as x,c as r,g as u,h,j as o,l as d,k as f,D as m,E as b,n as p,F as z,w as E,A as I,B as v,z as A}from"./client.cf17be4f.js";function L(a){let s,t;return{c(){s=c("p"),t=n("INVALID EMAIL"),this.h()},l(a){s=r(a,"P",{class:!0});var e=u(s);t=h(e,"INVALID EMAIL"),e.forEach(i),this.h()},h(){o(s,"class","text-red-700")},m(a,e){d(a,s,e),f(s,t)},d(a){a&&i(s)}}}function g(a){let s,t;return{c(){s=c("p"),t=n("VALID EMAIL"),this.h()},l(a){s=r(a,"P",{class:!0});var e=u(s);t=h(e,"VALID EMAIL"),e.forEach(i),this.h()},h(){o(s,"class","text-green-700")},m(a,e){d(a,s,e),f(s,t)},d(a){a&&i(s)}}}function y(a){let s,t,E,I,v,A,y,D,V,k,M,N,T,w,B;function C(a,s){return a[1]?g:L}let P=C(a),$=P(a);return{c(){s=e(),t=c("div"),E=c("h2"),I=n("Email"),v=e(),A=c("input"),y=e(),$.c(),D=e(),V=c("br"),k=e(),M=c("button"),N=n("Create account"),this.h()},l(a){l('[data-svelte="svelte-1r944zp"]',document.head).forEach(i),s=x(a),t=r(a,"DIV",{class:!0});var e=u(t);E=r(e,"H2",{});var c=u(E);I=h(c,"Email"),c.forEach(i),v=x(e),A=r(e,"INPUT",{size:!0,id:!0,class:!0}),y=x(e),$.l(e),D=x(e),V=r(e,"BR",{}),k=x(e),M=r(e,"BUTTON",{disabled:!0,class:!0});var n=u(M);N=h(n,"Create account"),n.forEach(i),e.forEach(i),this.h()},h(){document.title="Change email | Winhalla",o(A,"size","100"),o(A,"id","test"),o(A,"class","text-black p-1"),M.disabled=T=!a[1],o(M,"class","px-4 py-1 mt-4 bg-primary rounded svelte-lu74bc"),o(t,"class","p-8")},m(e,c){d(e,s,c),d(e,t,c),f(t,E),f(E,I),f(t,v),f(t,A),m(A,a[0]),f(t,y),$.m(t,null),f(t,D),f(t,V),f(t,k),f(t,M),f(M,N),w||(B=[b(A,"keydown",a[2]),b(A,"input",a[4]),b(M,"click",a[3])],w=!0)},p(a,[s]){1&s&&A.value!==a[0]&&m(A,a[0]),P!==(P=C(a))&&($.d(1),$=P(a),$&&($.c(),$.m(t,D))),2&s&&T!==(T=!a[1])&&(M.disabled=T)},i:p,o:p,d(a){a&&i(s),a&&i(t),$.d(),w=!1,z(B)}}}function D(a,s,t){let e,c,n=!1;return E((()=>{I.subscribe((async a=>{c=a.content,c.then?c.then((a=>{a.user||v("/")})):c&&(c.user||v("/"))}))()})),[e,n,function(){setTimeout((async()=>{let a=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm.exec(e);t(1,n=!!a)}),1)},async function(){await A("post",`/auth/changeEmail?email=${e}`),v("/")},function(){e=this.value,t(0,e)}]}export default class extends a{constructor(a){super(),s(this,a,D,y,t,{})}}
