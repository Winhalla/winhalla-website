import{S as s,i as a,s as t,e,t as r,a as l,c as o,g as c,h as n,d as i,f,j as h,l as u,k as m,n as p,J as d,P as b,a3 as g,a4 as v,x}from"./client.f3722ffb.js";function j(s,a,t){const e=s.slice();return e[3]=a[t],e}function k(s){let a,t,d,b,g;return{c(){a=e("a"),t=r(s[3]),b=l(),g=e("br"),this.h()},l(e){a=o(e,"A",{href:!0});var r=c(a);t=n(r,s[3]),r.forEach(i),b=f(e),g=o(e,"BR",{}),this.h()},h(){h(a,"href",d="/tests/"+s[3])},m(s,e){u(s,a,e),m(a,t),u(s,b,e),u(s,g,e)},p:p,d(s){s&&i(a),s&&i(b),s&&i(g)}}}function E(s){let a,t,g,v,x,E=[1,2,3,4,5,6,7,8,9],A=[];for(let a=0;a<9;a+=1)A[a]=k(j(s,E,a));return{c(){a=e("div");for(let s=0;s<9;s+=1)A[s].c();t=l(),g=r(s[0]),v=l(),x=r(s[1]),this.h()},l(e){a=o(e,"DIV",{class:!0});var r=c(a);for(let s=0;s<9;s+=1)A[s].l(r);t=f(r),g=n(r,s[0]),v=f(r),x=n(r,s[1]),r.forEach(i),this.h()},h(){h(a,"class","block m-20")},m(s,e){u(s,a,e);for(let s=0;s<9;s+=1)A[s].m(a,null);m(a,t),m(a,g),m(a,v),m(a,x)},p(s,[a]){1&a&&d(g,s[0]),2&a&&d(x,s[1])},i:p,o:p,d(s){s&&i(a),b(A,s)}}}function A(s,a,t){let e;const{page:r}=g();let l;return v(s,r,(s=>t(1,e=s))),r.subscribe((s=>{console.log(s.params.id),t(0,l=s.params.id)})),x((()=>{t(0,l=document.location.pathname.split("/")),t(0,l=l[l.length-1])})),[l,e,r]}export default class extends s{constructor(s){super(),a(this,s,A,E,t,{})}}
