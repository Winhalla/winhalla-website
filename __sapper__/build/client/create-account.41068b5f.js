import{S as s,i as a,s as t,e,a as c,t as r,d as n,f as l,h as o,n as i,g as u,j as d,x as p,k as h,l as f,y as v,m,z as x,A as y,B as w,C as E}from"./client.7ed26d95.js";function j(s){let a,t,E,j,k,I,P,T,U,b,A,C;return{c(){a=e("div"),t=e("input"),E=c(),j=e("input"),k=c(),I=e("button"),P=r("Create Account"),T=c(),U=e("div"),b=r(s[0]),this.h()},l(e){a=n(e,"DIV",{});var c=l(a);t=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),E=o(c),j=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),k=o(c),I=n(c,"BUTTON",{});var r=l(I);P=i(r,"Create Account"),r.forEach(u),T=o(c),U=n(c,"DIV",{class:!0});var d=l(U);b=i(d,s[0]),d.forEach(u),c.forEach(u),this.h()},h(){d(t,"type","text"),d(t,"class","text-black svelte-1ff7f5j"),d(t,"placeholder","Username"),d(j,"type","password"),d(j,"class","text-black svelte-1ff7f5j"),d(j,"placeholder","Password"),d(U,"class","text-legendary"),p(U,"hidden",!s[0])},m(e,c){h(e,a,c),f(a,t),v(t,s[2]),f(a,E),f(a,j),v(j,s[1]),f(a,k),f(a,I),f(I,P),f(a,T),f(a,U),f(U,b),A||(C=[m(t,"input",s[4]),m(j,"input",s[5]),m(I,"click",s[3])],A=!0)},p(s,[a]){4&a&&t.value!==s[2]&&v(t,s[2]),2&a&&j.value!==s[1]&&v(j,s[1]),1&a&&x(b,s[0]),1&a&&p(U,"hidden",!s[0])},i:y,o:y,d(s){s&&u(a),A=!1,w(C)}}}function k(s,a,t){let e="",c="",r="";return[e,c,r,async function(){const s=await E("post",`/auth/createEmailPassword?username=${r}&password=${c}`);s instanceof Error&&s.response.status>=400&&s.response.status<499&&t(0,e=s.data)},function(){r=this.value,t(2,r)},function(){c=this.value,t(1,c)}]}export default class extends s{constructor(s){super(),a(this,s,k,j,t,{})}}
