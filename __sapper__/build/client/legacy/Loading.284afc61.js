import{_ as t,a as n,b as c,c as a,i as r,s,d as i,S as e,e as o,f,h as u,l,j as h,k as d,n as v,p,o as x,x as m,r as y,t as b,m as g,C as D}from"./client.de0c72f1.js";function E(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,s=n(t);if(a){var i=n(this).constructor;r=Reflect.construct(s,arguments,i)}else r=s.apply(this,arguments);return c(this,r)}}function R(t){var n,c;return{c:function(){n=o("h2"),c=b("Loading..."),this.h()},l:function(t){n=u(t,"H2",{class:!0});var a=l(n);c=g(a,"Loading..."),a.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),x(n,c)},p:y,d:function(t){t&&h(n)}}}function j(t){var n,c;return{c:function(){n=o("h2"),c=b(t[0]),this.h()},l:function(a){n=u(a,"H2",{class:!0});var r=l(n);c=g(r,t[0]),r.forEach(h),this.h()},h:function(){v(n,"class","text-center text-3xl font-bold pt-4")},m:function(t,a){p(t,n,a),x(n,c)},p:function(t,n){1&n&&D(c,t[0])},d:function(t){t&&h(n)}}}function I(t){var n,c,a,r;function s(t,n){return t[0]?j:R}var i=s(t),e=i(t);return{c:function(){n=o("div"),c=o("div"),a=o("div"),r=f(),e.c(),this.h()},l:function(t){n=u(t,"DIV",{class:!0});var s=l(n);c=u(s,"DIV",{class:!0});var i=l(c);a=u(i,"DIV",{class:!0}),l(a).forEach(h),r=d(i),e.l(i),i.forEach(h),s.forEach(h),this.h()},h:function(){v(a,"class","loader svelte-1xfmsfi"),v(c,"class","pb-20"),v(n,"class","h-screen-90 bg-fixed bg-no-repeat flex items-center justify-center")},m:function(t,s){p(t,n,s),x(n,c),x(c,a),x(c,r),e.m(c,null)},p:function(t,n){var a=m(n,1)[0];i===(i=s(t))&&e?e.p(t,a):(e.d(1),(e=i(t))&&(e.c(),e.m(c,null)))},i:y,o:y,d:function(t){t&&h(n),e.d()}}}function L(t,n,c){var a=n.data;return t.$$set=function(t){"data"in t&&c(0,a=t.data)},[a]}var V=function(n){t(o,e);var c=E(o);function o(t){var n;return a(this,o),n=c.call(this),r(i(n),t,L,I,s,{data:0}),n}return o}();export{V as L};
