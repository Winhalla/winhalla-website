import{S as a,i as e,s,o as t,p as r,r as l,u as n,v as c,w as o,a as i,e as h,t as d,q as u,d as m,f as x,c as f,g as p,h as v,j as g,F as E,l as b,k as y,G as I,H as w,x as z,I as $,y as D,E as V,z as k,B as A,C as L,A as C,b as T}from"./client.5817a755.js";function j(a){let e,s;return e=new V({props:{pushError:a[2],message:"There was an error creating your account",type:"createAccount"}}),{c(){t(e.$$.fragment)},l(a){r(e.$$.fragment,a)},m(a,t){l(e,a,t),s=!0},p(a,s){const t={};4&s&&(t.pushError=a[2]),e.$set(t)},i(a){s||(n(e.$$.fragment,a),s=!0)},o(a){c(e.$$.fragment,a),s=!1},d(a){o(e,a)}}}function B(a){let e,s;return{c(){e=h("p"),s=d("INVALID EMAIL"),this.h()},l(a){e=f(a,"P",{class:!0});var t=p(e);s=v(t,"INVALID EMAIL"),t.forEach(m),this.h()},h(){g(e,"class","text-legendary info  svelte-1lk8p62")},m(a,t){b(a,e,t),y(e,s)},d(a){a&&m(e)}}}function M(a){let e,s,t,r,l,n;return{c(){e=h("div"),s=T("svg"),t=T("path"),r=i(),l=h("p"),n=d("VALID EMAIL"),this.h()},l(a){e=f(a,"DIV",{class:!0});var c=p(e);s=f(c,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var o=p(s);t=f(o,"path",{d:!0},1),p(t).forEach(m),o.forEach(m),r=x(c),l=f(c,"P",{class:!0});var i=p(l);n=v(i,"VALID EMAIL"),i.forEach(m),c.forEach(m),this.h()},h(){g(t,"d","m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z"),g(s,"class","fill-current text-green w-4 check svelte-1lk8p62"),g(s,"viewBox","0 0 33 24"),g(s,"xmlns","http://www.w3.org/2000/svg"),g(l,"class","text-green info svelte-1lk8p62"),g(e,"class","flex items-center")},m(a,c){b(a,e,c),y(e,s),y(s,t),y(e,r),y(e,l),y(l,n)},d(a){a&&m(e)}}}function N(a){let e,s,t,r,l,o,D,V,A,L,C,T,N,P,S,H,U,_,q,F,G,O,W,Y=a[2]&&j(a);function J(a,e){return a[1]?M:0==a[1]?B:void 0}let K=J(a),Q=K&&K(a);return{c(){e=i(),s=h("div"),Y&&Y.c(),t=i(),r=h("div"),l=h("div"),o=h("div"),D=h("h1"),V=d("Change your email"),A=i(),L=h("div"),C=h("p"),T=d("Email"),N=i(),P=h("div"),S=h("input"),H=i(),Q&&Q.c(),U=i(),_=h("button"),q=d("Change email"),this.h()},l(a){u('[data-svelte="svelte-1r944zp"]',document.head).forEach(m),e=x(a),s=f(a,"DIV",{});var n=p(s);Y&&Y.l(n),t=x(n),r=f(n,"DIV",{class:!0});var c=p(r);l=f(c,"DIV",{class:!0});var i=p(l);o=f(i,"DIV",{class:!0});var h=p(o);D=f(h,"H1",{class:!0});var d=p(D);V=v(d,"Change your email"),d.forEach(m),h.forEach(m),A=x(i),L=f(i,"DIV",{class:!0});var g=p(L);C=f(g,"P",{class:!0});var E=p(C);T=v(E,"Email"),E.forEach(m),N=x(g),P=f(g,"DIV",{});var b=p(P);S=f(b,"INPUT",{type:!0,placeholder:!0,class:!0}),H=x(b),Q&&Q.l(b),b.forEach(m),g.forEach(m),U=x(i),_=f(i,"BUTTON",{disabled:!0,class:!0});var y=p(_);q=v(y,"Change email"),y.forEach(m),i.forEach(m),c.forEach(m),n.forEach(m),this.h()},h(){document.title="Change email | Winhalla",g(D,"class","text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal"),g(o,"class","text-center md:text-left mt-7 md:mt-12"),g(C,"class","input-header svelte-1lk8p62"),g(S,"type","email"),g(S,"placeholder","Your new email goes here"),g(S,"class","input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-1lk8p62"),E(S,"border-legendary",0==a[1]),g(L,"class","md:mt-4"),_.disabled=F=!a[1],g(_,"class","button button-brand mt-3 svelte-1lk8p62"),E(_,"mt-11",null==a[1]),g(l,"class","flex flex-col justify-center px-5 md:p-0"),g(r,"class","flex items-center justify-center md:h-screen-7")},m(n,c){b(n,e,c),b(n,s,c),Y&&Y.m(s,null),y(s,t),y(s,r),y(r,l),y(l,o),y(o,D),y(D,V),y(l,A),y(l,L),y(L,C),y(C,T),y(L,N),y(L,P),y(P,S),I(S,a[0]),y(P,H),Q&&Q.m(P,null),y(l,U),y(l,_),y(_,q),G=!0,O||(W=[w(S,"keydown",a[3]),w(S,"input",a[5]),w(_,"click",a[4])],O=!0)},p(a,[e]){a[2]?Y?(Y.p(a,e),4&e&&n(Y,1)):(Y=j(a),Y.c(),n(Y,1),Y.m(s,t)):Y&&(k(),c(Y,1,1,(()=>{Y=null})),z()),1&e&&S.value!==a[0]&&I(S,a[0]),2&e&&E(S,"border-legendary",0==a[1]),K!==(K=J(a))&&(Q&&Q.d(1),Q=K&&K(a),Q&&(Q.c(),Q.m(P,null))),(!G||2&e&&F!==(F=!a[1]))&&(_.disabled=F),2&e&&E(_,"mt-11",null==a[1])},i(a){G||(n(Y),G=!0)},o(a){c(Y),G=!1},d(a){a&&m(e),a&&m(s),Y&&Y.d(),Q&&Q.d(),O=!1,$(W)}}}function P(a,e,s){let t,r,l,n=!1;return D((()=>{A.subscribe((async a=>{l=a.content,l.then?l.then((a=>{a.user||L("/")})):l&&(l.user||L("/"))}))()})),[t,n,r,function(){setTimeout((async()=>{let a=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm.exec(t);s(1,n=!!a)}),1)},async function(){try{const a=await C("patch",`/auth/changeEmail?email=${t}`);if(a instanceof Error)throw a;L("/")}catch(a){s(2,r=a.response.data.message?a.response.data.message:a.response.data?a.response.data.toString():a.toString()),setTimeout((()=>{s(2,r=void 0)}),8e3)}},function(){t=this.value,s(0,t)}]}export default class extends a{constructor(a){super(),e(this,a,P,N,s,{})}}
