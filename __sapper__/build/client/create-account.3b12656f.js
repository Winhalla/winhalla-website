import{S as s,i as a,s as t,e,a as c,t as r,d as n,f as l,h as o,n as i,g as u,j as p,x as d,k as h,l as f,y as v,m,z as x,A as y,B as w,C as E}from"./client.20b6e636.js";function b(s){let a,t,E,b,j,k,I,P,T,U,A,C;return{c(){a=e("div"),t=e("input"),E=c(),b=e("input"),j=c(),k=e("button"),I=r("Create Account"),P=c(),T=e("div"),U=r(s[0]),this.h()},l(e){a=n(e,"DIV",{});var c=l(a);t=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),E=o(c),b=n(c,"INPUT",{type:!0,class:!0,placeholder:!0}),j=o(c),k=n(c,"BUTTON",{});var r=l(k);I=i(r,"Create Account"),r.forEach(u),P=o(c),T=n(c,"DIV",{class:!0});var p=l(T);U=i(p,s[0]),p.forEach(u),c.forEach(u),this.h()},h(){p(t,"type","text"),p(t,"class","text-black svelte-1ff7f5j"),p(t,"placeholder","Username"),p(b,"type","password"),p(b,"class","text-black svelte-1ff7f5j"),p(b,"placeholder","Password"),p(T,"class","text-legendary"),d(T,"hidden",!s[0])},m(e,c){h(e,a,c),f(a,t),v(t,s[2]),f(a,E),f(a,b),v(b,s[1]),f(a,j),f(a,k),f(k,I),f(a,P),f(a,T),f(T,U),A||(C=[m(t,"input",s[4]),m(b,"input",s[5]),m(k,"click",s[3])],A=!0)},p(s,[a]){4&a&&t.value!==s[2]&&v(t,s[2]),2&a&&b.value!==s[1]&&v(b,s[1]),1&a&&x(U,s[0]),1&a&&d(T,"hidden",!s[0])},i:y,o:y,d(s){s&&u(a),A=!1,w(C)}}}function j(s,a,t){let e="",c="",r="";return[e,c,r,async function(){const s=await E("post",`/auth/createEmailPassword?username=${r}&password=${c}`);s instanceof Error&&s.response.status>=400&&s.response.status<499&&t(0,e=s.data)},function(){r=this.value,t(2,r)},function(){c=this.value,t(1,c)}]}export default class extends s{constructor(s){super(),a(this,s,j,b,t,{})}}
