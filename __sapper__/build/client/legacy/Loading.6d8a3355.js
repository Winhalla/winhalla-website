import{_ as t,a as n,b as c,c as a,i as s,s as r,d as e,S as o,e as i,f,h as u,l,j as h,k as d,n as v,p,o as m,F as x,r as y,t as b,m as g,N as D}from"./client.f1c952e0.js";function E(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,r=n(t);if(a){var e=n(this).constructor;s=Reflect.construct(r,arguments,e)}else s=r.apply(this,arguments);return c(this,s)}}function I(t){var n,c;return{c:function(){n=i("h2"),c=b("Loading..."),this.h()},l:function(t){n=u(t,"H2",{class:!0});var a=l(n);c=g(a,"Loading..."),a.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),m(n,c)},p:y,d:function(t){t&&h(n)}}}function R(t){var n,c;return{c:function(){n=i("h2"),c=b(t[0]),this.h()},l:function(a){n=u(a,"H2",{class:!0});var s=l(n);c=g(s,t[0]),s.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),m(n,c)},p:function(t,n){1&n&&D(c,t[0])},d:function(t){t&&h(n)}}}function V(t){var n,c,a,s,r,e,o;function b(t,n){return t[0]?R:I}var g=b(t),D=g(t);return{c:function(){n=i("div"),c=i("div"),a=i("div"),s=i("div"),r=f(),D.c(),e=f(),o=i("div"),this.h()},l:function(t){n=u(t,"DIV",{class:!0});var i=l(n);c=u(i,"DIV",{class:!0});var f=l(c);a=u(f,"DIV",{class:!0});var v=l(a);s=u(v,"DIV",{class:!0}),l(s).forEach(h),r=d(v),D.l(v),v.forEach(h),f.forEach(h),i.forEach(h),e=d(t),o=u(t,"DIV",{class:!0}),l(o).forEach(h),this.h()},h:function(){v(s,"class","loader mt-15% mx-auto svelte-1xfmsfi"),v(a,"class","mx-auto"),v(c,"class","pb-20 bg-background z-50 w-screenw-99 h-screen-99"),v(n,"class","absolute top-20 bg-fixed z-50 bg-no-repeat flex items-center justify-center h-screen-90"),v(o,"class","")},m:function(t,i){p(t,n,i),m(n,c),m(c,a),m(a,s),m(a,r),D.m(a,null),p(t,e,i),p(t,o,i)},p:function(t,n){var c=x(n,1)[0];g===(g=b(t))&&D?D.p(t,c):(D.d(1),(D=g(t))&&(D.c(),D.m(a,null)))},i:y,o:y,d:function(t){t&&h(n),D.d(),t&&h(e),t&&h(o)}}}function j(t,n,c){var a=n.data,s=n.type;return t.$$set=function(t){"data"in t&&c(0,a=t.data),"type"in t&&c(1,s=t.type)},[a,s]}var L=function(n){t(i,o);var c=E(i);function i(t){var n;return a(this,i),n=c.call(this),s(e(n),t,j,V,r,{data:0,type:1}),n}return i}();export{L};
