import{S as s,i as a,s as t,e,t as r,a as c,c as l,g as o,h as n,d as i,f as h,j as f,l as u,k as d,n as m,K as p,T as b,a3 as g,a4 as v,o as j}from"./client.fc00facd.js";function k(s,a,t){const e=s.slice();return e[3]=a[t],e}function x(s){let a,t,p,b,g;return{c(){a=e("a"),t=r(s[3]),b=c(),g=e("br"),this.h()},l(e){a=l(e,"A",{href:!0});var r=o(a);t=n(r,s[3]),r.forEach(i),b=h(e),g=l(e,"BR",{}),this.h()},h(){f(a,"href",p="/tests/"+s[3])},m(s,e){u(s,a,e),d(a,t),u(s,b,e),u(s,g,e)},p:m,d(s){s&&i(a),s&&i(b),s&&i(g)}}}function E(s){let a,t,g,v,j,E=[1,2,3,4,5,6,7,8,9],A=[];for(let a=0;a<9;a+=1)A[a]=x(k(s,E,a));return{c(){a=e("div");for(let s=0;s<9;s+=1)A[s].c();t=c(),g=r(s[0]),v=c(),j=r(s[1]),this.h()},l(e){a=l(e,"DIV",{class:!0});var r=o(a);for(let s=0;s<9;s+=1)A[s].l(r);t=h(r),g=n(r,s[0]),v=h(r),j=n(r,s[1]),r.forEach(i),this.h()},h(){f(a,"class","block m-20")},m(s,e){u(s,a,e);for(let s=0;s<9;s+=1)A[s].m(a,null);d(a,t),d(a,g),d(a,v),d(a,j)},p(s,[a]){1&a&&p(g,s[0]),2&a&&p(j,s[1])},i:m,o:m,d(s){s&&i(a),b(A,s)}}}function A(s,a,t){let e;const{page:r}=g();let c;return v(s,r,(s=>t(1,e=s))),r.subscribe((s=>{console.log(s.params.id),t(0,c=s.params.id)})),j((()=>{t(0,c=document.location.pathname.split("/")),t(0,c=c[c.length-1])})),[c,e,r]}export default class extends s{constructor(s){super(),a(this,s,A,E,t,{})}}
