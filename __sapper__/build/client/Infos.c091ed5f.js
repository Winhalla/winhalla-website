import{S as s,i as r,s as a,e as t,t as e,a as o,c,d as i,f as n,g as h,h as u,j as l,m as d,n as p,N as m,G as g,q as x,H as f}from"./client.ab9d0c70.js";function E(s){let r,a,E,b,v,y,j,w;return{c(){r=t("div"),a=t("h3"),E=e(s[1]),b=o(),v=t("p"),y=e(s[0]),this.h()},l(t){r=c(t,"DIV",{class:!0});var e=i(r);a=c(e,"H3",{class:!0});var o=i(a);E=n(o,s[1]),o.forEach(h),b=u(e),v=c(e,"P",{class:!0});var l=i(v);y=n(l,s[0]),l.forEach(h),e.forEach(h),this.h()},h(){l(a,"class","text-primary text-3xl"),l(v,"class","text-white text-2xl"),l(r,"class","z-20 fixed right-0 top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary")},m(s,t){d(s,r,t),p(r,a),p(a,E),p(r,b),p(r,v),p(v,y),w=!0},p(s,[r]){(!w||2&r)&&m(E,s[1]),(!w||1&r)&&m(y,s[0])},i(s){w||(g((()=>{j||(j=x(r,f,{y:-200,duration:400},!0)),j.run(1)})),w=!0)},o(s){j||(j=x(r,f,{y:-200,duration:400},!1)),j.run(0),w=!1},d(s){s&&h(r),s&&j&&j.end()}}}function b(s,r,a){let{pushError:t}=r,{message:e}=r;return s.$$set=s=>{"pushError"in s&&a(0,t=s.pushError),"message"in s&&a(1,e=s.message)},[t,e]}class v extends s{constructor(s){super(),r(this,s,b,E,a,{pushError:0,message:1})}}export{v as I};
