import{S as s,i as a,s as e,c as t,t as l,f as r,h as c,j as n,k as i,d as o,l as f,m as u,a as x,p as d,e as h,Q as m,F as p,P as v,V as b}from"./client.7cade568.js";function w(s){let a,e,h,m,p,v,b,w;return{c(){a=t("div"),e=t("div"),h=t("p"),m=l("Our services are down"),p=t("br"),v=r(),b=t("p"),w=l("We will be back as soon as possible !"),this.h()},l(s){a=c(s,"DIV",{class:!0});var t=n(a);e=c(t,"DIV",{class:!0});var l=n(e);h=c(l,"P",{class:!0});var r=n(h);m=i(r,"Our services are down"),r.forEach(o),p=c(l,"BR",{}),v=f(l),b=c(l,"P",{class:!0});var u=n(b);w=i(u,"We will be back as soon as possible !"),u.forEach(o),l.forEach(o),t.forEach(o),this.h()},h(){u(h,"class","text-6xl lg:text-8xl"),u(b,"class","text-3xl lg:text-4xl text-mid-light"),u(e,"class","text-center"),u(a,"class","flex items-center justify-center h-screen-60 px-4 w-full lg:mt-10 mt-8 lg:mx-0")},m(s,t){x(s,a,t),d(a,e),d(e,h),d(h,m),d(e,p),d(e,v),d(e,b),d(b,w)},d(s){s&&o(a)}}}function g(s){let a,e=s[0]&&w();return{c(){e&&e.c(),a=h()},l(s){e&&e.l(s),a=h()},m(s,t){e&&e.m(s,t),x(s,a,t)},p(s,[t]){s[0]?e||(e=w(),e.c(),e.m(a.parentNode,a)):e&&(e.d(1),e=null)},i:m,o:m,d(s){e&&e.d(s),s&&o(a)}}}function E(s,a,e){let t=!1;return p((async()=>{try{if(!(await v()instanceof Error))return b("/");e(0,t=!0)}catch(s){e(0,t=!0)}})),[t]}export default class extends s{constructor(s){super(),a(this,s,E,g,e,{})}}
