import{S as s,i as a,s as r,e as t,t as e,a as o,d as i,f as l,n,g as h,h as u,j as c,k as p,l as d,z as g,N as m,O as x,v as f}from"./client.ab72bae8.js";function E(s){let a,r,E,b,v,y,j,k;return{c(){a=t("div"),r=t("h3"),E=e(s[1]),b=o(),v=t("p"),y=e(s[0]),this.h()},l(t){a=i(t,"DIV",{class:!0});var e=l(a);r=i(e,"H3",{class:!0});var o=l(r);E=n(o,s[1]),o.forEach(h),b=u(e),v=i(e,"P",{class:!0});var c=l(v);y=n(c,s[0]),c.forEach(h),e.forEach(h),this.h()},h(){c(r,"class","text-primary text-3xl"),c(v,"class","text-white text-2xl"),c(a,"class","z-20 fixed right-0 top-30 lg:top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary")},m(s,t){p(s,a,t),d(a,r),d(r,E),d(a,b),d(a,v),d(v,y),k=!0},p(s,[a]){(!k||2&a)&&g(E,s[1]),(!k||1&a)&&g(y,s[0])},i(s){k||(m((()=>{j||(j=x(a,f,{y:-200,duration:400},!0)),j.run(1)})),k=!0)},o(s){j||(j=x(a,f,{y:-200,duration:400},!1)),j.run(0),k=!1},d(s){s&&h(a),s&&j&&j.end()}}}function b(s,a,r){let{pushError:t}=a,{message:e}=a;return s.$$set=s=>{"pushError"in s&&r(0,t=s.pushError),"message"in s&&r(1,e=s.message)},[t,e]}class v extends s{constructor(s){super(),a(this,s,b,E,r,{pushError:0,message:1})}}export{v as I};
