import{p as s,r as a,S as e,i as l,s as t,e as c,t as r,a as o,c as n,g as i,h as m,d as h,f as d,j as f,l as p,k as g,y as u,v as x,D as v,w as b,z as E,C as w,q as I,n as D}from"./client.3c3d7b64.js";function k(s,a,e){const l=s.slice();return l[8]=a[e],l}function y(s,a,e){const l=s.slice();return l[11]=a[e],l[13]=e,l}function P(s){let a,e,l,t,v,b,E,w,I,D,k,y,P,B,S,j,C,$,L,H,N,A,M,z,O,U,W,G,R,Y,q,F,K,J,Q,X,Z=s[1].name.toLowerCase().replace(/\-/g," ")+"",_=s[1].cost+"",ss=s[0].forEach&&V(s),as=s[2].forEach&&T(s);return{c(){a=c("div"),e=c("div"),l=c("h1"),t=r("Battle pass"),v=o(),b=c("div"),E=c("img"),D=o(),k=c("div"),y=c("div"),P=c("p"),B=r(Z),S=o(),j=c("div"),C=c("button"),$=c("p"),L=c("b"),H=r(_),N=r("$"),M=o(),z=c("div"),O=c("h2"),U=r("Season packs"),W=o(),G=c("div"),ss&&ss.c(),R=o(),Y=c("div"),q=c("h2"),F=r("Packs"),K=o(),J=c("div"),as&&as.c(),this.h()},l(s){a=n(s,"DIV",{class:!0});var c=i(a);e=n(c,"DIV",{});var r=i(e);l=n(r,"H1",{class:!0});var o=i(l);t=m(o,"Battle pass"),o.forEach(h),v=d(r),b=n(r,"DIV",{class:!0});var f=i(b);E=n(f,"IMG",{class:!0,src:!0,alt:!0}),D=d(f),k=n(f,"DIV",{class:!0});var p=i(k);y=n(p,"DIV",{class:!0});var g=i(y);P=n(g,"P",{class:!0});var u=i(P);B=m(u,Z),u.forEach(h),S=d(g),j=n(g,"DIV",{class:!0});var x=i(j);C=n(x,"BUTTON",{disabled:!0,class:!0});var w=i(C);$=n(w,"P",{class:!0});var I=i($);L=n(I,"B",{class:!0});var V=i(L);H=m(V,_),V.forEach(h),N=m(I,"$"),I.forEach(h),w.forEach(h),x.forEach(h),g.forEach(h),p.forEach(h),f.forEach(h),r.forEach(h),M=d(c),z=n(c,"DIV",{class:!0});var T=i(z);O=n(T,"H2",{class:!0});var A=i(O);U=m(A,"Season packs"),A.forEach(h),W=d(T),G=n(T,"DIV",{class:!0});var Q=i(G);ss&&ss.l(Q),Q.forEach(h),T.forEach(h),R=d(c),Y=n(c,"DIV",{class:!0});var X=i(Y);q=n(X,"H2",{class:!0});var es=i(q);F=m(es,"Packs"),es.forEach(h),K=d(X),J=n(X,"DIV",{class:!0});var ls=i(J);as&&as.l(ls),ls.forEach(h),X.forEach(h),c.forEach(h),this.h()},h(){f(l,"class","text-6xl text-center lg:text-left"),f(E,"class","w-full h-full block object-cover"),E.src!==(w="assets/ShopItems/"+s[1].name+".jpg")&&f(E,"src",w),f(E,"alt",I=s[1].name),f(P,"class","text-accent text-6xl"),f(L,"class","mr-1 font-normal"),f($,"class","text-2xl"),C.disabled=A=s[1].unBuyable,f(C,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(j,"class","flex justify-end md:block pb-1"),f(y,"class","md:flex justify-between w-full md:items-center"),f(k,"class","absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full"),f(b,"class","card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item svelte-9agtho"),f(O,"class","text-6xl text-center lg:text-left"),f(G,"class","mt-2 flex flex-col items-center lg:flex-row lg:items-start"),f(z,"class","pt-8 lg:pt-16"),f(q,"class","text-6xl text-center lg:text-left"),f(J,"class","mt-2 flex flex-col items-center lg:flex-row lg:items-start"),f(Y,"class","pt-8 lg:pt-20 lg:pb-6"),f(a,"class","mt-7 lg:mt-12 lg:ml-24 ")},m(c,r){p(c,a,r),g(a,e),g(e,l),g(l,t),g(e,v),g(e,b),g(b,E),g(b,D),g(b,k),g(k,y),g(y,P),g(P,B),g(y,S),g(y,j),g(j,C),g(C,$),g($,L),g(L,H),g($,N),g(a,M),g(a,z),g(z,O),g(O,U),g(z,W),g(z,G),ss&&ss.m(G,null),g(a,R),g(a,Y),g(Y,q),g(q,F),g(Y,K),g(Y,J),as&&as.m(J,null),Q||(X=u(C,"click",s[4]),Q=!0)},p(s,a){2&a&&E.src!==(w="assets/ShopItems/"+s[1].name+".jpg")&&f(E,"src",w),2&a&&I!==(I=s[1].name)&&f(E,"alt",I),2&a&&Z!==(Z=s[1].name.toLowerCase().replace(/\-/g," ")+"")&&x(B,Z),2&a&&_!==(_=s[1].cost+"")&&x(H,_),2&a&&A!==(A=s[1].unBuyable)&&(C.disabled=A),s[0].forEach?ss?ss.p(s,a):(ss=V(s),ss.c(),ss.m(G,null)):ss&&(ss.d(1),ss=null),s[2].forEach?as?as.p(s,a):(as=T(s),as.c(),as.m(J,null)):as&&(as.d(1),as=null)},d(s){s&&h(a),ss&&ss.d(),as&&as.d(),Q=!1,X()}}}function V(s){let a,e=s[0],l=[];for(let a=0;a<e.length;a+=1)l[a]=B(y(s,e,a));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();a=v()},l(s){for(let a=0;a<l.length;a+=1)l[a].l(s);a=v()},m(s,e){for(let a=0;a<l.length;a+=1)l[a].m(s,e);p(s,a,e)},p(s,t){if(9&t){let c;for(e=s[0],c=0;c<e.length;c+=1){const r=y(s,e,c);l[c]?l[c].p(r,t):(l[c]=B(r),l[c].c(),l[c].m(a.parentNode,a))}for(;c<l.length;c+=1)l[c].d(1);l.length=e.length}},d(s){w(l,s),s&&h(a)}}}function B(s){let a,e,l,t,v,w,I,D,k,y,P,V,B,T,S,j,C,$,L,H,N,A,M,z,O,U,W,G,R,Y,q,F=s[11].name.toLowerCase().replace(/\-/g," ")+"",K=s[11].description+"",J=s[11].description+"",Q=s[11].isDescriptionToggled?"Hide description":"Show description",X=s[11].cost+"";function Z(){return s[5](s[11])}function _(){return s[6](s[11])}return{c(){a=c("div"),e=c("img"),v=o(),w=c("div"),I=c("p"),D=r(F),k=o(),y=c("p"),P=r(K),V=o(),B=c("div"),T=c("div"),S=c("div"),j=c("p"),C=r(J),$=o(),L=c("button"),H=c("p"),N=r(Q),A=o(),M=c("button"),z=c("p"),O=c("b"),U=r(X),W=r("$"),R=o(),this.h()},l(s){a=n(s,"DIV",{class:!0});var l=i(a);e=n(l,"IMG",{class:!0,src:!0,alt:!0}),v=d(l),w=n(l,"DIV",{class:!0});var t=i(w);I=n(t,"P",{class:!0});var c=i(I);D=m(c,F),c.forEach(h),k=d(t),y=n(t,"P",{class:!0});var r=i(y);P=m(r,K),r.forEach(h),V=d(t),B=n(t,"DIV",{class:!0});var o=i(B);T=n(o,"DIV",{class:!0});var f=i(T);S=n(f,"DIV",{});var p=i(S);j=n(p,"P",{class:!0});var g=i(j);C=m(g,J),g.forEach(h),$=d(p),L=n(p,"BUTTON",{class:!0});var u=i(L);H=n(u,"P",{class:!0});var x=i(H);N=m(x,Q),x.forEach(h),u.forEach(h),p.forEach(h),f.forEach(h),A=d(o),M=n(o,"BUTTON",{disabled:!0,class:!0});var b=i(M);z=n(b,"P",{class:!0});var E=i(z);O=n(E,"B",{class:!0});var G=i(O);U=m(G,X),G.forEach(h),W=m(E,"$"),E.forEach(h),b.forEach(h),o.forEach(h),t.forEach(h),R=d(l),l.forEach(h),this.h()},h(){f(e,"class","w-full h-full block "),e.src!==(l="assets/ShopItems/"+s[11].name+".jpg")&&f(e,"src",l),f(e,"alt",t=s[11].name),f(I,"class","text-accent text-5xl md:mb-0 md:block"),b(I,"hidden",s[11].isDescriptionToggled),b(I,"-mb-1",!s[11].isDescriptionToggled),f(y,"class","block xl:mt-0"),b(y,"hidden",!s[11].isDescriptionToggled),f(j,"class","hidden xl:block mr-1 -mb-2"),f(H,"class"," text-light text-lg underline leading-none"),f(L,"class","focus:outline-none xl:hidden -mb-10 svelte-9agtho"),f(T,"class","-mb-2 md:mb-0"),f(O,"class","mr-1 font-normal"),f(z,"class","text-2xl"),M.disabled=G=s[11].unBuyable,f(M,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(B,"class","flex justify-between w-full items-end pr-4 md:pr-5 pb-1"),f(w,"class","absolute bottom-0 z-10 pl-5 pb-3 w-full"),f(a,"class","mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem svelte-9agtho")},m(s,l){p(s,a,l),g(a,e),g(a,v),g(a,w),g(w,I),g(I,D),g(w,k),g(w,y),g(y,P),g(w,V),g(w,B),g(B,T),g(T,S),g(S,j),g(j,C),g(S,$),g(S,L),g(L,H),g(H,N),g(B,A),g(B,M),g(M,z),g(z,O),g(O,U),g(z,W),g(a,R),Y||(q=[u(L,"click",Z),u(M,"click",_)],Y=!0)},p(a,c){s=a,1&c&&e.src!==(l="assets/ShopItems/"+s[11].name+".jpg")&&f(e,"src",l),1&c&&t!==(t=s[11].name)&&f(e,"alt",t),1&c&&F!==(F=s[11].name.toLowerCase().replace(/\-/g," ")+"")&&x(D,F),1&c&&b(I,"hidden",s[11].isDescriptionToggled),1&c&&b(I,"-mb-1",!s[11].isDescriptionToggled),1&c&&K!==(K=s[11].description+"")&&x(P,K),1&c&&b(y,"hidden",!s[11].isDescriptionToggled),1&c&&J!==(J=s[11].description+"")&&x(C,J),1&c&&Q!==(Q=s[11].isDescriptionToggled?"Hide description":"Show description")&&x(N,Q),1&c&&X!==(X=s[11].cost+"")&&x(U,X),1&c&&G!==(G=s[11].unBuyable)&&(M.disabled=G)},d(s){s&&h(a),Y=!1,E(q)}}}function T(s){let a,e=s[2],l=[];for(let a=0;a<e.length;a+=1)l[a]=S(k(s,e,a));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();a=v()},l(s){for(let a=0;a<l.length;a+=1)l[a].l(s);a=v()},m(s,e){for(let a=0;a<l.length;a+=1)l[a].m(s,e);p(s,a,e)},p(s,t){if(4&t){let c;for(e=s[2],c=0;c<e.length;c+=1){const r=k(s,e,c);l[c]?l[c].p(r,t):(l[c]=S(r),l[c].c(),l[c].m(a.parentNode,a))}for(;c<l.length;c+=1)l[c].d(1);l.length=e.length}},d(s){w(l,s),s&&h(a)}}}function S(s){let a,e,l,t,v,b,E,w,I,D,k,y,P,V,B,T,S,j,C,$,L,H,N,A,M=s[8].name.toLowerCase().replace(/\-/g," ")+"",z=s[8].description+"",O=s[8].cost+"";function U(){return s[7](s[8])}return{c(){a=c("div"),e=c("img"),v=o(),b=c("div"),E=c("p"),w=r(M),I=o(),D=c("div"),k=c("div"),y=c("div"),P=c("p"),V=r(z),B=o(),T=c("button"),S=c("p"),j=c("b"),C=r(O),$=r("$"),H=o(),this.h()},l(s){a=n(s,"DIV",{class:!0});var l=i(a);e=n(l,"IMG",{class:!0,src:!0,alt:!0}),v=d(l),b=n(l,"DIV",{class:!0});var t=i(b);E=n(t,"P",{class:!0});var c=i(E);w=m(c,M),c.forEach(h),I=d(t),D=n(t,"DIV",{class:!0});var r=i(D);k=n(r,"DIV",{});var o=i(k);y=n(o,"DIV",{});var f=i(y);P=n(f,"P",{class:!0});var p=i(P);V=m(p,z),p.forEach(h),f.forEach(h),o.forEach(h),B=d(r),T=n(r,"BUTTON",{disabled:!0,class:!0});var g=i(T);S=n(g,"P",{class:!0});var u=i(S);j=n(u,"B",{class:!0});var x=i(j);C=m(x,O),x.forEach(h),$=m(u,"$"),u.forEach(h),g.forEach(h),r.forEach(h),t.forEach(h),H=d(l),l.forEach(h),this.h()},h(){f(e,"class","w-full h-full block object-cover"),e.src!==(l="assets/ShopItems/"+s[8].name+".jpg")&&f(e,"src",l),f(e,"alt",t=s[8].name),f(E,"class","text-accent text-5xl"),f(P,"class","block mr-1 -mb-2"),f(j,"class","mr-1 font-normal"),f(S,"class","text-2xl"),T.disabled=L=s[8].unBuyable,f(T,"class","px-4 py-1 bg-primary rounded svelte-9agtho"),f(D,"class","flex justify-between w-full items-end pb-1"),f(b,"class","absolute bottom-0 z-10 px-5 pb-3 w-full"),f(a,"class","mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item svelte-9agtho")},m(s,l){p(s,a,l),g(a,e),g(a,v),g(a,b),g(b,E),g(E,w),g(b,I),g(b,D),g(D,k),g(k,y),g(y,P),g(P,V),g(D,B),g(D,T),g(T,S),g(S,j),g(j,C),g(S,$),g(a,H),N||(A=u(T,"click",U),N=!0)},p(a,c){s=a,4&c&&e.src!==(l="assets/ShopItems/"+s[8].name+".jpg")&&f(e,"src",l),4&c&&t!==(t=s[8].name)&&f(e,"alt",t),4&c&&M!==(M=s[8].name.toLowerCase().replace(/\-/g," ")+"")&&x(w,M),4&c&&z!==(z=s[8].description+"")&&x(V,z),4&c&&O!==(O=s[8].cost+"")&&x(C,O),4&c&&L!==(L=s[8].unBuyable)&&(T.disabled=L)},d(s){s&&h(a),N=!1,A()}}}function j(s){let a,e,l,t,u,x,v,b,E,w,k,y,V,B,T,S,j,C,$,L,H,N,A,M,z,O,U,W,G,R,Y,q,F,K,J,Q,X,Z,_,ss,as,es,ls=s[2]&&P(s);return{c(){a=c("meta"),e=c("link"),l=o(),t=c("div"),u=c("div"),ls&&ls.c(),x=o(),v=c("div"),b=c("h3"),E=r("How does it works ?"),w=o(),k=c("div"),y=c("div"),V=c("p"),B=r("1."),T=o(),S=c("p"),j=r("Click"),C=o(),$=c("p"),L=r("Click on the item you want to purchase"),H=o(),N=c("div"),A=c("p"),M=r("2."),z=o(),O=c("p"),U=r("Add"),W=o(),G=c("p"),R=r("Add the Winhalla Steam account to your friend list"),Y=o(),q=c("div"),F=c("p"),K=r("3."),J=o(),Q=c("p"),X=r("Receive"),Z=o(),_=c("p"),ss=r("You will receive the item you purchased within 1 week to 1\r\n                    month"),as=o(),es=c("div"),this.h()},l(s){const c=I('[data-svelte="svelte-slm77s"]',document.head);a=n(c,"META",{name:!0,content:!0}),e=n(c,"LINK",{rel:!0,href:!0}),c.forEach(h),l=d(s),t=n(s,"DIV",{class:!0});var r=i(t);u=n(r,"DIV",{});var o=i(u);ls&&ls.l(o),o.forEach(h),x=d(r),v=n(r,"DIV",{class:!0});var f=i(v);b=n(f,"H3",{class:!0});var p=i(b);E=m(p,"How does it works ?"),p.forEach(h),w=d(f),k=n(f,"DIV",{class:!0});var g=i(k);y=n(g,"DIV",{class:!0});var D=i(y);V=n(D,"P",{class:!0});var P=i(V);B=m(P,"1."),P.forEach(h),T=d(D),S=n(D,"P",{class:!0});var ts=i(S);j=m(ts,"Click"),ts.forEach(h),C=d(D),$=n(D,"P",{class:!0});var cs=i($);L=m(cs,"Click on the item you want to purchase"),cs.forEach(h),D.forEach(h),H=d(g),N=n(g,"DIV",{class:!0});var rs=i(N);A=n(rs,"P",{class:!0});var os=i(A);M=m(os,"2."),os.forEach(h),z=d(rs),O=n(rs,"P",{class:!0});var ns=i(O);U=m(ns,"Add"),ns.forEach(h),W=d(rs),G=n(rs,"P",{class:!0});var is=i(G);R=m(is,"Add the Winhalla Steam account to your friend list"),is.forEach(h),rs.forEach(h),Y=d(g),q=n(g,"DIV",{class:!0});var ms=i(q);F=n(ms,"P",{class:!0});var hs=i(F);K=m(hs,"3."),hs.forEach(h),J=d(ms),Q=n(ms,"P",{class:!0});var ds=i(Q);X=m(ds,"Receive"),ds.forEach(h),Z=d(ms),_=n(ms,"P",{class:!0});var fs=i(_);ss=m(fs,"You will receive the item you purchased within 1 week to 1\r\n                    month"),fs.forEach(h),ms.forEach(h),g.forEach(h),f.forEach(h),r.forEach(h),as=d(s),es=n(s,"DIV",{hidden:!0,class:!0}),i(es).forEach(h),this.h()},h(){document.title="Shop - Winhalla, Play Brawlhalla. Earn rewards.",f(a,"name","description"),f(a,"content","Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\r\n        Battle Pass and Season packs| Exchange here your coins into rewards |\r\n        Winhalla Shop page "),f(e,"rel","canonical"),f(e,"href","https://winhalla.app/shop"),f(b,"class","text-5xl lg:mr-12 text-center lg:text-left"),f(V,"class","text-4xl leading-none text-accent"),f(S,"class","text-4xl text-primary ml-2 leading-none"),f($,"class","-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0"),f(y,"class","mt-4 flex items-end"),f(A,"class","text-4xl leading-none text-accent"),f(O,"class","text-4xl text-primary ml-2 leading-none"),f(G,"class","-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0"),f(N,"class","mt-4 flex items-end"),f(F,"class","text-4xl leading-none text-accent"),f(Q,"class","text-4xl text-primary ml-2 leading-none"),f(_,"class","receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7"),f(q,"class","mt-4 flex items-end"),f(k,"class","pt-4"),f(v,"class","mb-20 md:mb-8 mx-5    xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3"),f(t,"class","xl:flex xl:relative"),es.hidden=!0,f(es,"class","-mb-1")},m(s,c){g(document.head,a),g(document.head,e),p(s,l,c),p(s,t,c),g(t,u),ls&&ls.m(u,null),g(t,x),g(t,v),g(v,b),g(b,E),g(v,w),g(v,k),g(k,y),g(y,V),g(V,B),g(y,T),g(y,S),g(S,j),g(y,C),g(y,$),g($,L),g(k,H),g(k,N),g(N,A),g(A,M),g(N,z),g(N,O),g(O,U),g(N,W),g(N,G),g(G,R),g(k,Y),g(k,q),g(q,F),g(F,K),g(q,J),g(q,Q),g(Q,X),g(q,Z),g(q,_),g(_,ss),p(s,as,c),p(s,es,c)},p(s,[a]){s[2]?ls?ls.p(s,a):(ls=P(s),ls.c(),ls.m(u,null)):ls&&(ls.d(1),ls=null)},i:D,o:D,d(s){h(a),h(e),s&&h(l),s&&h(t),ls&&ls.d(),s&&h(as),s&&h(es)}}}async function C(){let e,l=await s("get","/shop");return a.subscribe((s=>{e=s.content}))(),e=e.user?e.user.coins:0,l.forEach(((s,a)=>{l[a].isDescriptionToggled=!1,l[a].unBuyable=!1,s.name=s.name.toLowerCase().replace(/\s/g,"-"),s.cost>=e&&(l[a].unBuyable=!0)})),{featuredItem:await l.find((s=>0===s.state)),seasonPacks:await l.filter((s=>1===s.state)),packs:await l.filter((s=>2===s.state))}}function $(a,e,l){let{featuredItem:t}=e,{seasonPacks:c}=e,{packs:r}=e;const o=s=>{s.isDescriptionToggled=!s.isDescriptionToggled,l(0,c=[...c])};return a.$$set=s=>{"featuredItem"in s&&l(1,t=s.featuredItem),"seasonPacks"in s&&l(0,c=s.seasonPacks),"packs"in s&&l(2,r=s.packs)},[c,t,r,o,()=>s("post",`/buy/${t.id}`),s=>o(s),a=>s("post",`/buy/${a.id}`),a=>s("post",`/buy/${a.id}`)]}export default class extends e{constructor(s){super(),l(this,s,$,j,t,{featuredItem:1,seasonPacks:0,packs:2})}}export{C as preload};
