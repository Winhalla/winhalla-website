import{x as t,y as n,_ as r,a,b as e,c as i,i as s,d as c,S as o,s as u,f,L as l,q as p,j as h,k as d,M as m,p as v,N as y,r as g,D as $,B as k,O as x,E as R,F as L,K as b,I as j,v as w}from"./client.e7b75fd4.js";import{L as z}from"./Loading.907e9679.js";function D(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,i=a(t);if(n){var s=a(this).constructor;r=Reflect.construct(i,arguments,s)}else r=i.apply(this,arguments);return e(this,r)}}var S=L.document;function q(t){var n,r,a;return r=new z({props:{data:"Redirecting..."}}),{c:function(){n=f(),l(r.$$.fragment),this.h()},l:function(t){p('[data-svelte="svelte-1y0zdz3"]',S.head).forEach(h),n=d(t),m(r.$$.fragment,t),this.h()},h:function(){S.title="Redirecting..."},m:function(t,e){v(t,n,e),y(r,t,e),a=!0},p:g,i:function(t){a||($(r.$$.fragment,t),a=!0)},o:function(t){k(r.$$.fragment,t),a=!1},d:function(t){t&&h(n),x(r,t)}}}function E(t){return I.apply(this,arguments)}function I(){return(I=t(n.mark((function t(r){var a;return n.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.params,r.query,t.abrupt("return",{link:a.id});case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(t,n,r){var a=n.link;return R((function(){document.cookie=b.serialize("affiliateLinkId",a,{maxAge:15552e3,sameSite:"lax",path:"/"}),j(w+"/auth/login")})),t.$$set=function(t){"link"in t&&r(0,a=t.link)},[a]}var B=function(t){r(a,o);var n=D(a);function a(t){var r;return i(this,a),r=n.call(this),s(c(r),t,A,q,u,{link:0}),r}return a}();export default B;export{E as preload};