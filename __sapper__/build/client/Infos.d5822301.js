import{S as s,i as r,s as a,e as t,t as e,a as o,c,b as i,f as l,g as h,d as n,h as u,k as p,l as d,z as g,A as m,B as x,C as f}from"./client.ec834397.js";function E(s){let r,a,E,b,v,y,k,w;return{c(){r=t("div"),a=t("h3"),E=e(s[1]),b=o(),v=t("p"),y=e(s[0]),this.h()},l(t){r=c(t,"DIV",{class:!0});var e=i(r);a=c(e,"H3",{class:!0});var o=i(a);E=l(o,s[1]),o.forEach(h),b=n(e),v=c(e,"P",{class:!0});var u=i(v);y=l(u,s[0]),u.forEach(h),e.forEach(h),this.h()},h(){u(a,"class","text-primary text-3xl"),u(v,"class","text-white text-2xl"),u(r,"class","z-20 fixed right-0 top-30 lg:top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary")},m(s,t){p(s,r,t),d(r,a),d(a,E),d(r,b),d(r,v),d(v,y),w=!0},p(s,[r]){(!w||2&r)&&g(E,s[1]),(!w||1&r)&&g(y,s[0])},i(s){w||(m((()=>{k||(k=x(r,f,{y:-200,duration:400},!0)),k.run(1)})),w=!0)},o(s){k||(k=x(r,f,{y:-200,duration:400},!1)),k.run(0),w=!1},d(s){s&&h(r),s&&k&&k.end()}}}function b(s,r,a){let{pushError:t}=r,{message:e}=r;return s.$$set=s=>{"pushError"in s&&a(0,t=s.pushError),"message"in s&&a(1,e=s.message)},[t,e]}class v extends s{constructor(s){super(),r(this,s,b,E,a,{pushError:0,message:1})}}export{v as I};
