import{S as s,i as r,s as a,e as t,t as e,a as o,d as i,f as n,n as h,g as l,h as u,j as c,k as d,l as p,O as g,H as m,r as x,I as f}from"./client.7db9a267.js";function E(s){let r,a,E,b,v,y,I,j;return{c(){r=t("div"),a=t("h3"),E=e(s[1]),b=o(),v=t("p"),y=e(s[0]),this.h()},l(t){r=i(t,"DIV",{class:!0});var e=n(r);a=i(e,"H3",{class:!0});var o=n(a);E=h(o,s[1]),o.forEach(l),b=u(e),v=i(e,"P",{class:!0});var c=n(v);y=h(c,s[0]),c.forEach(l),e.forEach(l),this.h()},h(){c(a,"class","text-primary text-3xl"),c(v,"class","text-white text-2xl"),c(r,"class","z-20 fixed right-0 top-5 lg:top-30 mr-5 lg:mr-8 lg:mr-6 w-auto h-auto p-7 bg-background border rounded-lg border-primary")},m(s,t){d(s,r,t),p(r,a),p(a,E),p(r,b),p(r,v),p(v,y),j=!0},p(s,[r]){(!j||2&r)&&g(E,s[1]),(!j||1&r)&&g(y,s[0])},i(s){j||(m((()=>{I||(I=x(r,f,{y:-200,duration:400},!0)),I.run(1)})),j=!0)},o(s){I||(I=x(r,f,{y:-200,duration:400},!1)),I.run(0),j=!1},d(s){s&&l(r),s&&I&&I.end()}}}function b(s,r,a){let{pushError:t}=r,{message:e}=r;return s.$$set=s=>{"pushError"in s&&a(0,t=s.pushError),"message"in s&&a(1,e=s.message)},[t,e]}class v extends s{constructor(s){super(),r(this,s,b,E,a,{pushError:0,message:1})}}export{v as I};
