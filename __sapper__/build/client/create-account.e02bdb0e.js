import{S as a,i as s,s as t,e,a as c,t as r,d as n,f as l,h as o,n as i,g as u,j as d,x as p,k as h,l as f,y as v,m,z as x,A as y,B as w,C as E}from"./client.3daaa396.js";function j(a){let s,t,E,j,k,I,P,T,U,b,A,C;return{c(){s=e("div"),t=e("input"),E=c(),j=e("input"),k=c(),I=e("button"),P=r("Create Account"),T=c(),U=e("div"),b=r(a[0]),this.h()},l(e){s=n(e,"DIV",{});var c=l(s);t=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),E=o(c),j=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),k=o(c),I=n(c,"BUTTON",{});var r=l(I);P=i(r,"Create Account"),r.forEach(u),T=o(c),U=n(c,"DIV",{class:!0});var d=l(U);b=i(d,a[0]),d.forEach(u),c.forEach(u),this.h()},h(){d(t,"type","text"),d(t,"class","text-black svelte-1ff7f5j"),d(t,"placeholder","Username"),d(j,"type","password"),d(j,"class","text-black svelte-1ff7f5j"),d(j,"placeholder","Password"),d(U,"class","text-legendary"),p(U,"hidden",!a[0])},m(e,c){h(e,s,c),f(s,t),v(t,a[2]),f(s,E),f(s,j),v(j,a[1]),f(s,k),f(s,I),f(I,P),f(s,T),f(s,U),f(U,b),A||(C=[m(t,"input",a[4]),m(j,"input",a[5]),m(I,"click",a[3])],A=!0)},p(a,[s]){4&s&&t.value!==a[2]&&v(t,a[2]),2&s&&j.value!==a[1]&&v(j,a[1]),1&s&&x(b,a[0]),1&s&&p(U,"hidden",!a[0])},i:y,o:y,d(a){a&&u(s),A=!1,w(C)}}}function k(a,s,t){let e="",c="",r="";return[e,c,r,async function(){const a=await E("post",`/auth/createEmailPassword?username=${r}&password=${c}`);a instanceof Error&&a.response.status>=400&&a.response.status<499&&t(0,e=a.data)},function(){r=this.value,t(2,r)},function(){c=this.value,t(1,c)}]}export default class extends a{constructor(a){super(),s(this,a,k,j,t,{})}}
