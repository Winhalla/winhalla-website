import{S as a,i as s,s as t,e,a as n,c as r,b as c,g as l,d as o,h as i,k as d,l as h,w as u,L as f,t as x,f as m,n as p,O as b}from"./client.7728d850.js";function v(a){let s,t;return{c(){s=e("h2"),t=x("Loading..."),this.h()},l(a){s=r(a,"H2",{class:!0});var e=c(s);t=m(e,"Loading..."),e.forEach(l),this.h()},h(){i(s,"class","text-center text-3xl font-bold pt-4")},m(a,e){d(a,s,e),h(s,t)},p:p,d(a){a&&l(s)}}}function g(a){let s,t;return{c(){s=e("h2"),t=x(a[0]),this.h()},l(e){s=r(e,"H2",{class:!0});var n=c(s);t=m(n,a[0]),n.forEach(l),this.h()},h(){i(s,"class","text-center text-3xl font-bold pt-4")},m(a,e){d(a,s,e),h(s,t)},p(a,s){1&s&&b(t,a[0])},d(a){a&&l(s)}}}function E(a){let s,t,x,m,p,b,E;function D(a,s){return a[0]?g:v}let I=D(a),L=I(a);return{c(){s=e("div"),t=e("div"),x=e("div"),m=e("div"),p=n(),L.c(),this.h()},l(a){s=r(a,"DIV",{class:!0});var e=c(s);t=r(e,"DIV",{class:!0});var n=c(t);x=r(n,"DIV",{class:!0});var i=c(x);m=r(i,"DIV",{class:!0}),c(m).forEach(l),p=o(i),L.l(i),i.forEach(l),n.forEach(l),e.forEach(l),this.h()},h(){i(m,"class","loader mt-15/100 mx-auto svelte-1xfmsfi"),i(x,"class","mx-auto"),i(t,"class","pb-20 bg-background w-screenw-99 h-screen-99"),i(s,"class","fixed z-50 bg-background absolute top-25 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90")},m(a,e){d(a,s,e),h(s,t),h(t,x),h(x,m),h(x,p),L.m(x,null),E=!0},p(s,[t]){I===(I=D(a=s))&&L?L.p(a,t):(L.d(1),L=I(a),L&&(L.c(),L.m(x,null)))},i(a){E||(b&&b.end(1),E=!0)},o(t){b=u(s,f,{duration:a[1]}),E=!1},d(a){a&&l(s),L.d(),a&&b&&b.end()}}}function D(a,s,t){let{data:e}=s,{duration:n=500}=s;return a.$$set=a=>{"data"in a&&t(0,e=a.data),"duration"in a&&t(1,n=a.duration)},[e,n]}class I extends a{constructor(a){super(),s(this,a,D,E,t,{data:0,duration:1})}}export{I as L};
