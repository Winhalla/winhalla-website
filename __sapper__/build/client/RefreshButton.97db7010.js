import{S as s,i as e,s as a,e as r,b as n,a as t,t as h,c,g as i,d as o,f as l,h as f,j as g,H as v,l as d,k as u,J as w,G as p,n as R,Z as x}from"./client.03f4d82d.js";function M(s){let e,a,x,M,b,m,E,k,B,j=(s[0]?s[2]:s[1])+"";return{c(){e=r("button"),a=r("div"),x=n("svg"),M=n("path"),b=t(),m=r("p"),E=h(j),this.h()},l(s){e=c(s,"BUTTON",{class:!0});var r=i(e);a=c(r,"DIV",{class:!0});var n=i(a);x=c(n,"svg",{viewBox:!0,xmlns:!0,class:!0},1);var t=i(x);M=c(t,"path",{d:!0},1),i(M).forEach(o),t.forEach(o),n.forEach(o),b=l(r),m=c(r,"P",{class:!0});var h=i(m);E=f(h,j),h.forEach(o),r.forEach(o),this.h()},h(){g(M,"d","m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z"),g(x,"viewBox","0 0 21 24"),g(x,"xmlns","http://www.w3.org/2000/svg"),g(x,"class","svelte-10w5wxs"),g(a,"class","block svelte-10w5wxs"),v(a,"hidden",!s[0]),g(m,"class","pl-3"),v(m,"pl-3",s[0]),g(e,"class","button button-brand refresh-button focus:outline-none svelte-10w5wxs")},m(r,n){d(r,e,n),u(e,a),u(a,x),u(x,M),u(e,b),u(e,m),u(m,E),k||(B=w(e,"click",s[3]),k=!0)},p(s,[e]){1&e&&v(a,"hidden",!s[0]),7&e&&j!==(j=(s[0]?s[2]:s[1])+"")&&p(E,j),1&e&&v(m,"pl-3",s[0])},i:R,o:R,d(s){s&&o(e),k=!1,B()}}}function b(s,e,a){let{isRefreshing:r}=e,{refreshMessage:n}=e,{onRefreshMessage:t="Refreshing"}=e;return s.$$set=s=>{"isRefreshing"in s&&a(0,r=s.isRefreshing),"refreshMessage"in s&&a(1,n=s.refreshMessage),"onRefreshMessage"in s&&a(2,t=s.onRefreshMessage)},[r,n,t,function(e){x(s,e)}]}class m extends s{constructor(s){super(),e(this,s,b,M,a,{isRefreshing:0,refreshMessage:1,onRefreshMessage:2})}}export{m as R};
