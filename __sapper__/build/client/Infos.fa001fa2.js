import{S as s,i as r,s as a,e as t,t as e,a as o,c,g as i,h,d as l,f as n,j as u,l as p,k as d,J as g,T as m,V as x,p as f}from"./client.7561a60c.js";function E(s){let r,a,E,b,v,y,j,k;return{c(){r=t("div"),a=t("h3"),E=e(s[1]),b=o(),v=t("p"),y=e(s[0]),this.h()},l(t){r=c(t,"DIV",{class:!0});var e=i(r);a=c(e,"H3",{class:!0});var o=i(a);E=h(o,s[1]),o.forEach(l),b=n(e),v=c(e,"P",{class:!0});var u=i(v);y=h(u,s[0]),u.forEach(l),e.forEach(l),this.h()},h(){u(a,"class","text-primary text-3xl"),u(v,"class","text-white text-2xl"),u(r,"class","z-20 fixed right-0 top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary")},m(s,t){p(s,r,t),d(r,a),d(a,E),d(r,b),d(r,v),d(v,y),k=!0},p(s,[r]){(!k||2&r)&&g(E,s[1]),(!k||1&r)&&g(y,s[0])},i(s){k||(m((()=>{j||(j=x(r,f,{y:-200,duration:400},!0)),j.run(1)})),k=!0)},o(s){j||(j=x(r,f,{y:-200,duration:400},!1)),j.run(0),k=!1},d(s){s&&l(r),s&&j&&j.end()}}}function b(s,r,a){let{pushError:t}=r,{message:e}=r;return s.$$set=s=>{"pushError"in s&&a(0,t=s.pushError),"message"in s&&a(1,e=s.message)},[t,e]}class v extends s{constructor(s){super(),r(this,s,b,E,a,{pushError:0,message:1})}}export{v as I};
