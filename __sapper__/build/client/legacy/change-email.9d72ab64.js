import{_ as t,a as n,b as a,c,i as e,d as r,S as s,s as i,f as u,e as o,t as f,q as l,j as x,k as h,h as p,l as d,m as v,n as m,p as b,o as z,E,F as y,x as I,r as A,G as w,y as L,v as k,w as D,A as g,B as R,z as V}from"./client.0380536d.js";function M(t){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=n(t);if(c){var s=n(this).constructor;e=Reflect.construct(r,arguments,s)}else e=r.apply(this,arguments);return a(this,e)}}function N(t){var n,a;return{c:function(){n=o("p"),a=f("INVALID EMAIL"),this.h()},l:function(t){n=p(t,"P",{class:!0});var c=d(n);a=v(c,"INVALID EMAIL"),c.forEach(x),this.h()},h:function(){m(n,"class","text-red-700")},m:function(t,c){b(t,n,c),z(n,a)},d:function(t){t&&x(n)}}}function P(t){var n,a;return{c:function(){n=o("p"),a=f("VALID EMAIL"),this.h()},l:function(t){n=p(t,"P",{class:!0});var c=d(n);a=v(c,"VALID EMAIL"),c.forEach(x),this.h()},h:function(){m(n,"class","text-green-700")},m:function(t,c){b(t,n,c),z(n,a)},d:function(t){t&&x(n)}}}function T(t){var n,a,c,e,r,s,i,L,k,D,g,R,V,M,T;function B(t,n){return t[1]?P:N}var C=B(t),_=C(t);return{c:function(){n=u(),a=o("div"),c=o("h2"),e=f("Email"),r=u(),s=o("input"),i=u(),_.c(),L=u(),k=o("br"),D=u(),g=o("button"),R=f("Create account"),this.h()},l:function(t){l('[data-svelte="svelte-1r944zp"]',document.head).forEach(x),n=h(t),a=p(t,"DIV",{class:!0});var u=d(a);c=p(u,"H2",{});var o=d(c);e=v(o,"Email"),o.forEach(x),r=h(u),s=p(u,"INPUT",{size:!0,id:!0,class:!0}),i=h(u),_.l(u),L=h(u),k=p(u,"BR",{}),D=h(u),g=p(u,"BUTTON",{disabled:!0,class:!0});var f=d(g);R=v(f,"Create account"),f.forEach(x),u.forEach(x),this.h()},h:function(){document.title="Change email | Winhalla",m(s,"size","100"),m(s,"id","test"),m(s,"class","text-black p-1"),g.disabled=V=!t[1],m(g,"class","px-4 py-1 mt-4 bg-primary rounded svelte-lu74bc"),m(a,"class","p-8")},m:function(u,o){b(u,n,o),b(u,a,o),z(a,c),z(c,e),z(a,r),z(a,s),E(s,t[0]),z(a,i),_.m(a,null),z(a,L),z(a,k),z(a,D),z(a,g),z(g,R),M||(T=[y(s,"keydown",t[2]),y(s,"input",t[4]),y(g,"click",t[3])],M=!0)},p:function(t,n){var c=I(n,1)[0];1&c&&s.value!==t[0]&&E(s,t[0]),C!==(C=B(t))&&(_.d(1),(_=C(t))&&(_.c(),_.m(a,L))),2&c&&V!==(V=!t[1])&&(g.disabled=V)},i:A,o:A,d:function(t){t&&x(n),t&&x(a),_.d(),M=!1,w(T)}}}function B(t,n,a){var c,e,r=!1;function s(){return(s=k(D.mark((function t(){return D.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V("post","/auth/changeEmail?email=".concat(c));case 2:R("/");case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return L((function(){g.subscribe(function(){var t=k(D.mark((function t(n){return D.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(e=n.content).then?e.then((function(t){t.user||R("/")})):e&&(e.user||R("/"));case 2:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}())()})),[c,r,function(){setTimeout(k(D.mark((function t(){var n;return D.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm.exec(c),a(1,r=!!n);case 3:case"end":return t.stop()}}),t)}))),1)},function(){return s.apply(this,arguments)},function(){c=this.value,a(0,c)}]}var C=function(n){t(u,s);var a=M(u);function u(t){var n;return c(this,u),n=a.call(this),e(r(n),t,B,T,i,{}),n}return u}();export default C;
