import{S as s,i as a,s as t,e,t as r,a as l,c,g as o,h as n,d as i,f as h,j as f,l as u,k as m,n as p,G as d,N as b,$ as g,a0 as v,A as j}from"./client.cf441884.js";function k(s,a,t){const e=s.slice();return e[3]=a[t],e}function x(s){let a,t,d,b,g;return{c(){a=e("a"),t=r(s[3]),b=l(),g=e("br"),this.h()},l(e){a=c(e,"A",{href:!0});var r=o(a);t=n(r,s[3]),r.forEach(i),b=h(e),g=c(e,"BR",{}),this.h()},h(){f(a,"href",d="/tests/"+s[3])},m(s,e){u(s,a,e),m(a,t),u(s,b,e),u(s,g,e)},p:p,d(s){s&&i(a),s&&i(b),s&&i(g)}}}function A(s){let a,t,g,v,j,A=[1,2,3,4,5,6,7,8,9],E=[];for(let a=0;a<9;a+=1)E[a]=x(k(s,A,a));return{c(){a=e("div");for(let s=0;s<9;s+=1)E[s].c();t=l(),g=r(s[0]),v=l(),j=r(s[1]),this.h()},l(e){a=c(e,"DIV",{class:!0});var r=o(a);for(let s=0;s<9;s+=1)E[s].l(r);t=h(r),g=n(r,s[0]),v=h(r),j=n(r,s[1]),r.forEach(i),this.h()},h(){f(a,"class","block m-20")},m(s,e){u(s,a,e);for(let s=0;s<9;s+=1)E[s].m(a,null);m(a,t),m(a,g),m(a,v),m(a,j)},p(s,[a]){1&a&&d(g,s[0]),2&a&&d(j,s[1])},i:p,o:p,d(s){s&&i(a),b(E,s)}}}function E(s,a,t){let e;const{page:r}=g();let l;return v(s,r,(s=>t(1,e=s))),r.subscribe((s=>{console.log(s.params.id),t(0,l=s.params.id)})),j((()=>{t(0,l=document.location.pathname.split("/")),t(0,l=l[l.length-1])})),[l,e,r]}export default class extends s{constructor(s){super(),a(this,s,E,A,t,{})}}
