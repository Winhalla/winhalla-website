import{_ as t,a as n,b as a,c,i as r,s,d as o,S as i,e,f as u,h as f,l,j as d,k as h,n as v,p,o as m,F as x,u as b,a0 as g,t as y,m as D,r as E,N as R}from"./client.bfe1efa1.js";function I(t){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,s=n(t);if(c){var o=n(this).constructor;r=Reflect.construct(s,arguments,o)}else r=s.apply(this,arguments);return a(this,r)}}function V(t){var n,a;return{c:function(){n=e("h2"),a=y("Loading..."),this.h()},l:function(t){n=f(t,"H2",{class:!0});var c=l(n);a=D(c,"Loading..."),c.forEach(d),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,c){p(t,n,c),m(n,a)},p:E,d:function(t){t&&d(n)}}}function j(t){var n,a;return{c:function(){n=e("h2"),a=y(t[0]),this.h()},l:function(c){n=f(c,"H2",{class:!0});var r=l(n);a=D(r,t[0]),r.forEach(d),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,c){p(t,n,c),m(n,a)},p:function(t,n){1&n&&R(a,t[0])},d:function(t){t&&d(n)}}}function k(t){var n,a,c,r,s,o,i;function y(t,n){return t[0]?j:V}var D=y(t),E=D(t);return{c:function(){n=e("div"),a=e("div"),c=e("div"),r=e("div"),s=u(),E.c(),this.h()},l:function(t){n=f(t,"DIV",{class:!0});var o=l(n);a=f(o,"DIV",{class:!0});var i=l(a);c=f(i,"DIV",{class:!0});var e=l(c);r=f(e,"DIV",{class:!0}),l(r).forEach(d),s=h(e),E.l(e),e.forEach(d),i.forEach(d),o.forEach(d),this.h()},h:function(){v(r,"class","loader mt-15/100 mx-auto svelte-1xfmsfi"),v(c,"class","mx-auto"),v(a,"class","pb-20 bg-background w-screenw-99 h-screen-99"),v(n,"class","fixed z-50 bg-background absolute top-10 bg-fixed z-40 bg-no-repeat flex items-center justify-center h-screen-90")},m:function(t,o){p(t,n,o),m(n,a),m(a,c),m(c,r),m(c,s),E.m(c,null),i=!0},p:function(n,a){var r=x(a,1)[0];D===(D=y(t=n))&&E?E.p(t,r):(E.d(1),(E=D(t))&&(E.c(),E.m(c,null)))},i:function(t){i||(o&&o.end(1),i=!0)},o:function(a){o=b(n,g,{duration:t[1]}),i=!1},d:function(t){t&&d(n),E.d(),t&&o&&o.end()}}}function L(t,n,a){var c=n.data,r=n.duration,s=void 0===r?500:r;return t.$$set=function(t){"data"in t&&a(0,c=t.data),"duration"in t&&a(1,s=t.duration)},[c,s]}var w=function(n){t(e,i);var a=I(e);function e(t){var n;return c(this,e),n=a.call(this),r(o(n),t,L,k,s,{data:0,duration:1}),n}return e}();export{w as L};
