import{p as s,r as a,S as e,i as l,s as t,e as c,t as r,a as o,c as n,g as i,h as m,d as h,f as d,j as f,l as p,k as g,y as x,v as u,w as v,z as b,C as E,q as w,n as I}from"./client.feb1973c.js";function D(s,a,e){const l=s.slice();return l[8]=a[e],l}function k(s,a,e){const l=s.slice();return l[11]=a[e],l[13]=e,l}function y(s){let a,e,l,t,v,b,w,I,y,B,T,S,j,C,L,H,$,A,M,N,z,O,U,W,G,R,Y,q,F,K,J,Q,X,Z,_,ss,as=s[1].name.toLowerCase().replace(/\-/g," ")+"",es=s[1].cost+"",ls=s[0],ts=[];for(let a=0;a<ls.length;a+=1)ts[a]=P(k(s,ls,a));let cs=s[2],rs=[];for(let a=0;a<cs.length;a+=1)rs[a]=V(D(s,cs,a));return{c(){a=c("div"),e=c("div"),l=c("h1"),t=r("Battle pass"),v=o(),b=c("div"),w=c("img"),B=o(),T=c("div"),S=c("div"),j=c("p"),C=r(as),L=o(),H=c("div"),$=c("button"),A=c("p"),M=c("b"),N=r(es),z=r("$"),U=o(),W=c("div"),G=c("h2"),R=r("Season packs"),Y=o(),q=c("div");for(let s=0;s<ts.length;s+=1)ts[s].c();F=o(),K=c("div"),J=c("h2"),Q=r("Packs"),X=o(),Z=c("div");for(let s=0;s<rs.length;s+=1)rs[s].c();this.h()},l(s){a=n(s,"DIV",{class:!0});var c=i(a);e=n(c,"DIV",{});var r=i(e);l=n(r,"H1",{class:!0});var o=i(l);t=m(o,"Battle pass"),o.forEach(h),v=d(r),b=n(r,"DIV",{class:!0});var f=i(b);w=n(f,"IMG",{class:!0,src:!0,alt:!0}),B=d(f),T=n(f,"DIV",{class:!0});var p=i(T);S=n(p,"DIV",{class:!0});var g=i(S);j=n(g,"P",{class:!0});var x=i(j);C=m(x,as),x.forEach(h),L=d(g),H=n(g,"DIV",{class:!0});var u=i(H);$=n(u,"BUTTON",{disabled:!0,class:!0});var E=i($);A=n(E,"P",{class:!0});var I=i(A);M=n(I,"B",{class:!0});var D=i(M);N=m(D,es),D.forEach(h),z=m(I,"$"),I.forEach(h),E.forEach(h),u.forEach(h),g.forEach(h),p.forEach(h),f.forEach(h),r.forEach(h),U=d(c),W=n(c,"DIV",{class:!0});var k=i(W);G=n(k,"H2",{class:!0});var y=i(G);R=m(y,"Season packs"),y.forEach(h),Y=d(k),q=n(k,"DIV",{class:!0});var P=i(q);for(let s=0;s<ts.length;s+=1)ts[s].l(P);P.forEach(h),k.forEach(h),F=d(c),K=n(c,"DIV",{class:!0});var V=i(K);J=n(V,"H2",{class:!0});var O=i(J);Q=m(O,"Packs"),O.forEach(h),X=d(V),Z=n(V,"DIV",{class:!0});var _=i(Z);for(let s=0;s<rs.length;s+=1)rs[s].l(_);_.forEach(h),V.forEach(h),c.forEach(h),this.h()},h(){f(l,"class","text-6xl text-center lg:text-left"),f(w,"class","w-full h-full block object-cover"),w.src!==(I="assets/ShopItems/"+s[1].name+".jpg")&&f(w,"src",I),f(w,"alt",y=s[1].name),f(j,"class","text-accent text-6xl"),f(M,"class","mr-1 font-normal"),f(A,"class","text-2xl"),$.disabled=O=s[1].unBuyable,f($,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(H,"class","flex justify-end md:block pb-1"),f(S,"class","md:flex justify-between w-full md:items-center"),f(T,"class","absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full"),f(b,"class","card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item svelte-9agtho"),f(G,"class","text-6xl text-center lg:text-left"),f(q,"class","mt-2 flex flex-col items-center lg:flex-row lg:items-start"),f(W,"class","pt-8 lg:pt-16"),f(J,"class","text-6xl text-center lg:text-left"),f(Z,"class","mt-2 flex flex-col items-center lg:flex-row lg:items-start"),f(K,"class","pt-8 lg:pt-20 lg:pb-6"),f(a,"class","mt-7 lg:mt-12 lg:ml-24")},m(c,r){p(c,a,r),g(a,e),g(e,l),g(l,t),g(e,v),g(e,b),g(b,w),g(b,B),g(b,T),g(T,S),g(S,j),g(j,C),g(S,L),g(S,H),g(H,$),g($,A),g(A,M),g(M,N),g(A,z),g(a,U),g(a,W),g(W,G),g(G,R),g(W,Y),g(W,q);for(let s=0;s<ts.length;s+=1)ts[s].m(q,null);g(a,F),g(a,K),g(K,J),g(J,Q),g(K,X),g(K,Z);for(let s=0;s<rs.length;s+=1)rs[s].m(Z,null);_||(ss=x($,"click",s[4]),_=!0)},p(s,a){if(2&a&&w.src!==(I="assets/ShopItems/"+s[1].name+".jpg")&&f(w,"src",I),2&a&&y!==(y=s[1].name)&&f(w,"alt",y),2&a&&as!==(as=s[1].name.toLowerCase().replace(/\-/g," ")+"")&&u(C,as),2&a&&es!==(es=s[1].cost+"")&&u(N,es),2&a&&O!==(O=s[1].unBuyable)&&($.disabled=O),9&a){let e;for(ls=s[0],e=0;e<ls.length;e+=1){const l=k(s,ls,e);ts[e]?ts[e].p(l,a):(ts[e]=P(l),ts[e].c(),ts[e].m(q,null))}for(;e<ts.length;e+=1)ts[e].d(1);ts.length=ls.length}if(4&a){let e;for(cs=s[2],e=0;e<cs.length;e+=1){const l=D(s,cs,e);rs[e]?rs[e].p(l,a):(rs[e]=V(l),rs[e].c(),rs[e].m(Z,null))}for(;e<rs.length;e+=1)rs[e].d(1);rs.length=cs.length}},d(s){s&&h(a),E(ts,s),E(rs,s),_=!1,ss()}}}function P(s){let a,e,l,t,E,w,I,D,k,y,P,V,B,T,S,j,C,L,H,$,A,M,N,z,O,U,W,G,R,Y,q,F=s[11].name.toLowerCase().replace(/\-/g," ")+"",K=s[11].description+"",J=s[11].description+"",Q=s[11].isDescriptionToggled?"Hide description":"Show description",X=s[11].cost+"";function Z(...a){return s[5](s[11],...a)}function _(...a){return s[6](s[11],...a)}return{c(){a=c("div"),e=c("img"),E=o(),w=c("div"),I=c("p"),D=r(F),k=o(),y=c("p"),P=r(K),V=o(),B=c("div"),T=c("div"),S=c("div"),j=c("p"),C=r(J),L=o(),H=c("button"),$=c("p"),A=r(Q),M=o(),N=c("button"),z=c("p"),O=c("b"),U=r(X),W=r("$"),R=o(),this.h()},l(s){a=n(s,"DIV",{class:!0});var l=i(a);e=n(l,"IMG",{class:!0,src:!0,alt:!0}),E=d(l),w=n(l,"DIV",{class:!0});var t=i(w);I=n(t,"P",{class:!0});var c=i(I);D=m(c,F),c.forEach(h),k=d(t),y=n(t,"P",{class:!0});var r=i(y);P=m(r,K),r.forEach(h),V=d(t),B=n(t,"DIV",{class:!0});var o=i(B);T=n(o,"DIV",{class:!0});var f=i(T);S=n(f,"DIV",{});var p=i(S);j=n(p,"P",{class:!0});var g=i(j);C=m(g,J),g.forEach(h),L=d(p),H=n(p,"BUTTON",{class:!0});var x=i(H);$=n(x,"P",{class:!0});var u=i($);A=m(u,Q),u.forEach(h),x.forEach(h),p.forEach(h),f.forEach(h),M=d(o),N=n(o,"BUTTON",{disabled:!0,class:!0});var v=i(N);z=n(v,"P",{class:!0});var b=i(z);O=n(b,"B",{class:!0});var G=i(O);U=m(G,X),G.forEach(h),W=m(b,"$"),b.forEach(h),v.forEach(h),o.forEach(h),t.forEach(h),R=d(l),l.forEach(h),this.h()},h(){f(e,"class","w-full h-full block "),e.src!==(l="assets/ShopItems/"+s[11].name+".jpg")&&f(e,"src",l),f(e,"alt",t=s[11].name),f(I,"class","text-accent text-5xl md:mb-0 md:block"),v(I,"hidden",s[11].isDescriptionToggled),v(I,"-mb-1",!s[11].isDescriptionToggled),f(y,"class","block xl:mt-0"),v(y,"hidden",!s[11].isDescriptionToggled),f(j,"class","hidden xl:block mr-1 -mb-2"),f($,"class"," text-light text-lg underline leading-none"),f(H,"class","focus:outline-none xl:hidden -mb-10 svelte-9agtho"),f(T,"class","-mb-2 md:mb-0"),f(O,"class","mr-1 font-normal"),f(z,"class","text-2xl"),N.disabled=G=s[11].unBuyable,f(N,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(B,"class","flex justify-between w-full items-end pr-4 md:pr-5 pb-1"),f(w,"class","absolute bottom-0 z-10 pl-5 pb-3 w-full"),f(a,"class","mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem svelte-9agtho")},m(s,l){p(s,a,l),g(a,e),g(a,E),g(a,w),g(w,I),g(I,D),g(w,k),g(w,y),g(y,P),g(w,V),g(w,B),g(B,T),g(T,S),g(S,j),g(j,C),g(S,L),g(S,H),g(H,$),g($,A),g(B,M),g(B,N),g(N,z),g(z,O),g(O,U),g(z,W),g(a,R),Y||(q=[x(H,"click",Z),x(N,"click",_)],Y=!0)},p(a,c){s=a,1&c&&e.src!==(l="assets/ShopItems/"+s[11].name+".jpg")&&f(e,"src",l),1&c&&t!==(t=s[11].name)&&f(e,"alt",t),1&c&&F!==(F=s[11].name.toLowerCase().replace(/\-/g," ")+"")&&u(D,F),1&c&&v(I,"hidden",s[11].isDescriptionToggled),1&c&&v(I,"-mb-1",!s[11].isDescriptionToggled),1&c&&K!==(K=s[11].description+"")&&u(P,K),1&c&&v(y,"hidden",!s[11].isDescriptionToggled),1&c&&J!==(J=s[11].description+"")&&u(C,J),1&c&&Q!==(Q=s[11].isDescriptionToggled?"Hide description":"Show description")&&u(A,Q),1&c&&X!==(X=s[11].cost+"")&&u(U,X),1&c&&G!==(G=s[11].unBuyable)&&(N.disabled=G)},d(s){s&&h(a),Y=!1,b(q)}}}function V(s){let a,e,l,t,v,b,E,w,I,D,k,y,P,V,B,T,S,j,C,L,H,$,A,M,N=s[8].name.toLowerCase().replace(/\-/g," ")+"",z=s[8].description+"",O=s[8].cost+"";function U(...a){return s[7](s[8],...a)}return{c(){a=c("div"),e=c("img"),v=o(),b=c("div"),E=c("p"),w=r(N),I=o(),D=c("div"),k=c("div"),y=c("div"),P=c("p"),V=r(z),B=o(),T=c("button"),S=c("p"),j=c("b"),C=r(O),L=r("$"),$=o(),this.h()},l(s){a=n(s,"DIV",{class:!0});var l=i(a);e=n(l,"IMG",{class:!0,src:!0,alt:!0}),v=d(l),b=n(l,"DIV",{class:!0});var t=i(b);E=n(t,"P",{class:!0});var c=i(E);w=m(c,N),c.forEach(h),I=d(t),D=n(t,"DIV",{class:!0});var r=i(D);k=n(r,"DIV",{});var o=i(k);y=n(o,"DIV",{});var f=i(y);P=n(f,"P",{class:!0});var p=i(P);V=m(p,z),p.forEach(h),f.forEach(h),o.forEach(h),B=d(r),T=n(r,"BUTTON",{disabled:!0,class:!0});var g=i(T);S=n(g,"P",{class:!0});var x=i(S);j=n(x,"B",{class:!0});var u=i(j);C=m(u,O),u.forEach(h),L=m(x,"$"),x.forEach(h),g.forEach(h),r.forEach(h),t.forEach(h),$=d(l),l.forEach(h),this.h()},h(){f(e,"class","w-full h-full block object-cover"),e.src!==(l="assets/ShopItems/"+s[8].name+".jpg")&&f(e,"src",l),f(e,"alt",t=s[8].name),f(E,"class","text-accent text-5xl"),f(P,"class","block mr-1 -mb-2"),f(j,"class","mr-1 font-normal"),f(S,"class","text-2xl"),T.disabled=H=s[8].unBuyable,f(T,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(D,"class","flex justify-between w-full items-end pb-1"),f(b,"class","absolute bottom-0 z-10 px-5 pb-3 w-full"),f(a,"class","mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item svelte-9agtho")},m(s,l){p(s,a,l),g(a,e),g(a,v),g(a,b),g(b,E),g(E,w),g(b,I),g(b,D),g(D,k),g(k,y),g(y,P),g(P,V),g(D,B),g(D,T),g(T,S),g(S,j),g(j,C),g(S,L),g(a,$),A||(M=x(T,"click",U),A=!0)},p(a,c){s=a,4&c&&e.src!==(l="assets/ShopItems/"+s[8].name+".jpg")&&f(e,"src",l),4&c&&t!==(t=s[8].name)&&f(e,"alt",t),4&c&&N!==(N=s[8].name.toLowerCase().replace(/\-/g," ")+"")&&u(w,N),4&c&&z!==(z=s[8].description+"")&&u(V,z),4&c&&O!==(O=s[8].cost+"")&&u(C,O),4&c&&H!==(H=s[8].unBuyable)&&(T.disabled=H)},d(s){s&&h(a),A=!1,M()}}}function B(s){let a,e,l,t,x,u,v,b,E,D,k,P,V,B,T,S,j,C,L,H,$,A,M,N,z,O,U,W,G,R,Y,q,F,K,J,Q,X,Z,_,ss,as=s[2]&&y(s);return{c(){a=c("meta"),e=c("link"),l=o(),t=c("div"),x=c("div"),as&&as.c(),u=o(),v=c("div"),b=c("h3"),E=r("How does it works ?"),D=o(),k=c("div"),P=c("div"),V=c("p"),B=r("1."),T=o(),S=c("p"),j=r("Click"),C=o(),L=c("p"),H=r("Click on the item you want to purchase"),$=o(),A=c("div"),M=c("p"),N=r("2."),z=o(),O=c("p"),U=r("Add"),W=o(),G=c("p"),R=r("Add the Winhalla Steam account to your friend list"),Y=o(),q=c("div"),F=c("p"),K=r("3."),J=o(),Q=c("p"),X=r("Receive"),Z=o(),_=c("p"),ss=r("You will receive the item you purchased within 1 week to 1\r\n                    month"),this.h()},l(s){const c=w('[data-svelte="svelte-i7b2h7"]',document.head);a=n(c,"META",{name:!0,content:!0}),e=n(c,"LINK",{rel:!0,href:!0}),c.forEach(h),l=d(s),t=n(s,"DIV",{class:!0});var r=i(t);x=n(r,"DIV",{});var o=i(x);as&&as.l(o),o.forEach(h),u=d(r),v=n(r,"DIV",{class:!0});var f=i(v);b=n(f,"H3",{class:!0});var p=i(b);E=m(p,"How does it works ?"),p.forEach(h),D=d(f),k=n(f,"DIV",{class:!0});var g=i(k);P=n(g,"DIV",{class:!0});var I=i(P);V=n(I,"P",{class:!0});var y=i(V);B=m(y,"1."),y.forEach(h),T=d(I),S=n(I,"P",{class:!0});var es=i(S);j=m(es,"Click"),es.forEach(h),C=d(I),L=n(I,"P",{class:!0});var ls=i(L);H=m(ls,"Click on the item you want to purchase"),ls.forEach(h),I.forEach(h),$=d(g),A=n(g,"DIV",{class:!0});var ts=i(A);M=n(ts,"P",{class:!0});var cs=i(M);N=m(cs,"2."),cs.forEach(h),z=d(ts),O=n(ts,"P",{class:!0});var rs=i(O);U=m(rs,"Add"),rs.forEach(h),W=d(ts),G=n(ts,"P",{class:!0});var os=i(G);R=m(os,"Add the Winhalla Steam account to your friend list"),os.forEach(h),ts.forEach(h),Y=d(g),q=n(g,"DIV",{class:!0});var ns=i(q);F=n(ns,"P",{class:!0});var is=i(F);K=m(is,"3."),is.forEach(h),J=d(ns),Q=n(ns,"P",{class:!0});var ms=i(Q);X=m(ms,"Receive"),ms.forEach(h),Z=d(ns),_=n(ns,"P",{class:!0});var hs=i(_);ss=m(hs,"You will receive the item you purchased within 1 week to 1\r\n                    month"),hs.forEach(h),ns.forEach(h),g.forEach(h),f.forEach(h),r.forEach(h),this.h()},h(){document.title="Shop - Winhalla, Play Brawlhalla. Earn rewards.",f(a,"name","description"),f(a,"content","Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\r\n        Battle Pass and Season packs| Exchange here your coins into rewards |\r\n        Winhalla Shop page "),f(e,"rel","canonical"),f(e,"href","https://winhalla.appspot.com/shop"),f(b,"class","text-5xl lg:mr-12 text-center lg:text-left"),f(V,"class","text-4xl leading-none text-accent"),f(S,"class","text-4xl text-primary ml-2 leading-none"),f(L,"class","-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0"),f(P,"class","mt-4 flex items-end"),f(M,"class","text-4xl leading-none text-accent"),f(O,"class","text-4xl text-primary ml-2 leading-none"),f(G,"class","-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0"),f(A,"class","mt-4 flex items-end"),f(F,"class","text-4xl leading-none text-accent"),f(Q,"class","text-4xl text-primary ml-2 leading-none"),f(_,"class","receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7"),f(q,"class","mt-4 flex items-end"),f(k,"class","pt-4"),f(v,"class","mb-20 md:mb-8 mx-5    xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3"),f(t,"class","xl:flex xl:relative")},m(s,c){g(document.head,a),g(document.head,e),p(s,l,c),p(s,t,c),g(t,x),as&&as.m(x,null),g(t,u),g(t,v),g(v,b),g(b,E),g(v,D),g(v,k),g(k,P),g(P,V),g(V,B),g(P,T),g(P,S),g(S,j),g(P,C),g(P,L),g(L,H),g(k,$),g(k,A),g(A,M),g(M,N),g(A,z),g(A,O),g(O,U),g(A,W),g(A,G),g(G,R),g(k,Y),g(k,q),g(q,F),g(F,K),g(q,J),g(q,Q),g(Q,X),g(q,Z),g(q,_),g(_,ss)},p(s,[a]){s[2]?as?as.p(s,a):(as=y(s),as.c(),as.m(x,null)):as&&(as.d(1),as=null)},i:I,o:I,d(s){h(a),h(e),s&&h(l),s&&h(t),as&&as.d()}}}async function T(){let e,l=await s("get","/shop");return a.subscribe(s=>{e=s.content})(),e=e.user?e.user.coins:0,l.forEach((s,a)=>{l[a].isDescriptionToggled=!1,l[a].unBuyable=!1,s.name=s.name.toLowerCase().replace(/\s/g,"-"),s.cost>=e&&(l[a].unBuyable=!0)}),{featuredItem:await l.find(s=>0===s.state),seasonPacks:await l.filter(s=>1===s.state),packs:await l.filter(s=>2===s.state)}}function S(a,e,l){let{featuredItem:t}=e,{seasonPacks:c}=e,{packs:r}=e;const o=s=>{s.isDescriptionToggled=!s.isDescriptionToggled,l(0,c=[...c])};return a.$$set=s=>{"featuredItem"in s&&l(1,t=s.featuredItem),"seasonPacks"in s&&l(0,c=s.seasonPacks),"packs"in s&&l(2,r=s.packs)},[c,t,r,o,()=>s("post","/buy/"+t.id),s=>o(s),a=>s("post","/buy/"+a.id),a=>s("post","/buy/"+a.id)]}export default class extends e{constructor(s){super(),l(this,s,S,B,t,{featuredItem:1,seasonPacks:0,packs:2})}}export{T as preload};
