import{_ as t,a as n,b as a,c,i as s,s as r,d as o,S as e,e as i,f,h as u,l,j as h,k as d,n as v,p,o as m,F as x,r as b,t as g,m as y,N as D}from"./client.59f2f372.js";function E(t){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,r=n(t);if(c){var o=n(this).constructor;s=Reflect.construct(r,arguments,o)}else s=r.apply(this,arguments);return a(this,s)}}function R(t){var n,a;return{c:function(){n=i("h2"),a=g("Loading..."),this.h()},l:function(t){n=u(t,"H2",{class:!0});var c=l(n);a=y(c,"Loading..."),c.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,c){p(t,n,c),m(n,a)},p:b,d:function(t){t&&h(n)}}}function I(t){var n,a;return{c:function(){n=i("h2"),a=g(t[0]),this.h()},l:function(c){n=u(c,"H2",{class:!0});var s=l(n);a=y(s,t[0]),s.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,c){p(t,n,c),m(n,a)},p:function(t,n){1&n&&D(a,t[0])},d:function(t){t&&h(n)}}}function V(t){var n,a,c,s,r;function o(t,n){return t[0]?I:R}var e=o(t),g=e(t);return{c:function(){n=i("div"),a=i("div"),c=i("div"),s=i("div"),r=f(),g.c(),this.h()},l:function(t){n=u(t,"DIV",{class:!0});var o=l(n);a=u(o,"DIV",{class:!0});var e=l(a);c=u(e,"DIV",{class:!0});var i=l(c);s=u(i,"DIV",{class:!0}),l(s).forEach(h),r=d(i),g.l(i),i.forEach(h),e.forEach(h),o.forEach(h),this.h()},h:function(){v(s,"class","loader mt-15/100 mx-auto svelte-1xfmsfi"),v(c,"class","mx-auto"),v(a,"class","pb-20 bg-background z-50 w-screenw-99 h-screen-99"),v(n,"class","absolute top-20 bg-fixed z-50 bg-no-repeat flex items-center justify-center h-screen-90")},m:function(t,o){p(t,n,o),m(n,a),m(a,c),m(c,s),m(c,r),g.m(c,null)},p:function(t,n){var a=x(n,1)[0];e===(e=o(t))&&g?g.p(t,a):(g.d(1),(g=e(t))&&(g.c(),g.m(c,null)))},i:b,o:b,d:function(t){t&&h(n),g.d()}}}function j(t,n,a){var c=n.data;return t.$$set=function(t){"data"in t&&a(0,c=t.data)},[c]}var L=function(n){t(i,e);var a=E(i);function i(t){var n;return c(this,i),n=a.call(this),s(o(n),t,j,V,r,{data:0}),n}return i}();export{L};
