import{_ as t,a as n,b as c,c as a,i as r,s,d as i,S as o,e,f,h as u,l,j as h,k as d,n as v,p,o as x,x as m,r as y,t as b,m as g,C as D}from"./client.94999d6d.js";function E(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,s=n(t);if(a){var i=n(this).constructor;r=Reflect.construct(s,arguments,i)}else r=s.apply(this,arguments);return c(this,r)}}function R(t){var n,c;return{c:function(){n=e("h2"),c=b("Loading..."),this.h()},l:function(t){n=u(t,"H2",{class:!0});var a=l(n);c=g(a,"Loading..."),a.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),x(n,c)},p:y,d:function(t){t&&h(n)}}}function j(t){var n,c;return{c:function(){n=e("h2"),c=b(t[0]),this.h()},l:function(a){n=u(a,"H2",{class:!0});var r=l(n);c=g(r,t[0]),r.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),x(n,c)},p:function(t,n){1&n&&D(c,t[0])},d:function(t){t&&h(n)}}}function I(t){var n,c,a,r;function s(t,n){return t[0]?j:R}var i=s(t),o=i(t);return{c:function(){n=e("div"),c=e("div"),a=e("div"),r=f(),o.c(),this.h()},l:function(t){n=u(t,"DIV",{class:!0});var s=l(n);c=u(s,"DIV",{class:!0});var i=l(c);a=u(i,"DIV",{class:!0}),l(a).forEach(h),r=d(i),o.l(i),i.forEach(h),s.forEach(h),this.h()},h:function(){v(a,"class","loader svelte-1xfmsfi"),v(c,"class","pb-20"),v(n,"class","h-screen-90 bg-fixed bg-no-repeat flex items-center justify-center")},m:function(t,s){p(t,n,s),x(n,c),x(c,a),x(c,r),o.m(c,null)},p:function(t,n){var a=m(n,1)[0];i===(i=s(t))&&o?o.p(t,a):(o.d(1),(o=i(t))&&(o.c(),o.m(c,null)))},i:y,o:y,d:function(t){t&&h(n),o.d()}}}function L(t,n,c){var a=n.data;return t.$$set=function(t){"data"in t&&c(0,a=t.data)},[a]}var V=function(n){t(e,o);var c=E(e);function e(t){var n;return a(this,e),n=c.call(this),r(i(n),t,L,I,s,{data:0}),n}return e}();export{V as L};
