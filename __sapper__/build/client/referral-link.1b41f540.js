import{S as a,i as s,s as t,a as e,c as r,q as l,g as c,h as n,k as o,D as i,E as h,F as d,r as f,u,G as m,C as v,H as p,w as x,I as w,J as g,K as y,L as b,e as E,t as I,d as B,f as k,n as D,j as V,l as j,m as z,A as P,z as $,x as C,M as A,y as T,B as N,b as L,N as Y,O as R,P as G}from"./client.44a93c32.js";import{L as U}from"./Loading.57e79170.js";import{s as H,c as F}from"./copyText.efda0c97.js";const{document:M}=u;function O(a){let s,t;return s=new U({props:{data:!1===a[1]?"Creating account...":"Logging in..."}}),{c(){w(s.$$.fragment)},l(a){g(s.$$.fragment,a)},m(a,e){y(s,a,e),t=!0},p(a,t){const e={};2&t&&(e.data=!1===a[1]?"Creating account...":"Logging in..."),s.$set(e)},i(a){t||(d(s.$$.fragment,a),t=!0)},o(a){i(s.$$.fragment,a),t=!1},d(a){b(s,a)}}}function S(a){let s,t,r,l,i,h,d,f,u,m,v,p,x,w;return{c(){s=E("div"),t=E("p"),r=I("By clicking the button below you accept our "),l=E("a"),i=I("terms\r\n            and conditions "),h=I(",\r\n            our "),d=E("a"),f=I("Privacy policy"),u=I(" and the creation of an account"),m=e(),v=E("button"),p=I("Create account"),this.h()},l(a){s=B(a,"DIV",{class:!0});var e=k(s);t=B(e,"P",{class:!0});var o=k(t);r=D(o,"By clicking the button below you accept our "),l=B(o,"A",{href:!0,class:!0});var x=k(l);i=D(x,"terms\r\n            and conditions "),x.forEach(c),h=D(o,",\r\n            our "),d=B(o,"A",{href:!0,class:!0});var w=k(d);f=D(w,"Privacy policy"),w.forEach(c),u=D(o," and the creation of an account"),o.forEach(c),m=n(e),v=B(e,"BUTTON",{class:!0});var g=k(v);p=D(g,"Create account"),g.forEach(c),e.forEach(c),this.h()},h(){V(l,"href","/terms"),V(l,"class","underline text-primary"),V(d,"href","/privacy"),V(d,"class","underline text-primary"),V(t,"class","text-3xl"),V(v,"class","button button-brand mt-10"),V(s,"class","flex items-center justify-center mt-30 flex-col")},m(e,c){o(e,s,c),j(s,t),j(t,r),j(t,l),j(l,i),j(t,h),j(t,d),j(d,f),j(t,u),j(s,m),j(s,v),j(v,p),x||(w=z(v,"click",a[11]),x=!0)},p:P,i:P,o:P,d(a){a&&c(s),x=!1,w()}}}function q(a){let s,t,r,l,i,h,d,f,u,m,v,p,x,w,g,y,b,$,L,Y,R,G,U,H,F,M,O=!1===a[4]&&K(a);return{c(){s=E("div"),t=E("div"),r=E("div"),l=E("h1"),i=I("Register your "),h=E("br"),d=I(" Brawlhalla ID"),f=e(),u=E("div"),m=E("div"),v=E("input"),p=e(),O&&O.c(),x=e(),w=E("button"),g=I("Continue"),y=e(),b=E("p"),$=I("This is your\r\n                Brawlhalla user id. You will find it by clicking on the box under your username (in Brawlhalla):\r\n                and then in the top right corner!"),L=e(),Y=E("img"),G=e(),U=E("img"),this.h()},l(a){s=B(a,"DIV",{class:!0});var e=k(s);t=B(e,"DIV",{class:!0});var o=k(t);r=B(o,"DIV",{class:!0});var E=k(r);l=B(E,"H1",{class:!0});var I=k(l);i=D(I,"Register your "),h=B(I,"BR",{}),d=D(I," Brawlhalla ID"),I.forEach(c),E.forEach(c),f=n(o),u=B(o,"DIV",{class:!0});var V=k(u);m=B(V,"DIV",{});var j=k(m);v=B(j,"INPUT",{type:!0,placeholder:!0,class:!0}),p=n(j),O&&O.l(j),j.forEach(c),V.forEach(c),x=n(o),w=B(o,"BUTTON",{class:!0});var z=k(w);g=D(z,"Continue"),z.forEach(c),y=n(o),b=B(o,"P",{class:!0,style:!0});var P=k(b);$=D(P,"This is your\r\n                Brawlhalla user id. You will find it by clicking on the box under your username (in Brawlhalla):\r\n                and then in the top right corner!"),P.forEach(c),L=n(o),Y=B(o,"IMG",{class:!0,src:!0,style:!0,alt:!0}),o.forEach(c),G=n(e),U=B(e,"IMG",{class:!0,src:!0,style:!0,alt:!0}),e.forEach(c),this.h()},h(){V(l,"class","text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-tight"),V(r,"class","text-center md:text-left mt-7 md:mt-12"),V(v,"type","email"),V(v,"placeholder","Your Brawlhalla ID goes here"),V(v,"class","input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-96ajzy"),C(v,"border-legendary",!1===a[4]),V(u,"class","md:mt-4"),V(w,"class","button button-brand mt-3"),C(w,"mt-11",null==a[4]),V(b,"class","mt-8 italic font-xl"),A(b,"max-width","17rem"),A(b,"font-size","1.25rem"),A(b,"font-family","'Roboto Condensed', sans-serif"),V(Y,"class","my-8  md:hidden"),Y.src!==(R="assets/bid.jpg")&&V(Y,"src","assets/bid.jpg"),A(Y,"max-width","18rem"),V(Y,"alt","BID example"),V(t,"class","flex flex-col justify-center px-5 md:p-0"),V(U,"class","-bottom-70  absolute hidden md:block"),U.src!==(H="assets/bidCut.jpg")&&V(U,"src","assets/bidCut.jpg"),A(U,"max-width","36rem"),V(U,"alt","BID example"),V(s,"class","flex items-center justify-center md:h-screen-7  relative")},m(e,c){o(e,s,c),j(s,t),j(t,r),j(r,l),j(l,i),j(l,h),j(l,d),j(t,f),j(t,u),j(u,m),j(m,v),T(v,a[10]),j(m,p),O&&O.m(m,null),j(t,x),j(t,w),j(w,g),j(t,y),j(t,b),j(b,$),j(t,L),j(t,Y),j(s,G),j(s,U),F||(M=[z(v,"input",a[15]),z(w,"click",a[12])],F=!0)},p(a,s){1024&s&&v.value!==a[10]&&T(v,a[10]),16&s&&C(v,"border-legendary",!1===a[4]),!1===a[4]?O?O.p(a,s):(O=K(a),O.c(),O.m(m,null)):O&&(O.d(1),O=null),16&s&&C(w,"mt-11",null==a[4])},i:P,o:P,d(a){a&&c(s),O&&O.d(),F=!1,N(M)}}}function J(a){let s,t,e,l;const n=[Q,W],f=[];function u(a,s){return a[6]?1:0}return s=u(a),t=f[s]=n[s](a),{c(){t.c(),e=r()},l(a){t.l(a),e=r()},m(a,t){f[s].m(a,t),o(a,e,t),l=!0},p(a,r){let l=s;s=u(a),s===l?f[s].p(a,r):(m(),i(f[l],1,1,(()=>{f[l]=null})),h(),t=f[s],t?t.p(a,r):(t=f[s]=n[s](a),t.c()),d(t,1),t.m(e.parentNode,e))},i(a){l||(d(t),l=!0)},o(a){i(t),l=!1},d(a){f[s].d(a),a&&c(e)}}}function K(a){let s,t;return{c(){s=E("p"),t=I(a[5]),this.h()},l(e){s=B(e,"P",{class:!0});var r=k(s);t=D(r,a[5]),r.forEach(c),this.h()},h(){V(s,"class","text-legendary info ")},m(a,e){o(a,s,e),j(s,t)},p(a,s){32&s&&$(t,a[5])},d(a){a&&c(s)}}}function W(a){let s,t,r,l,i,h,d;return{c(){s=E("div"),t=E("h2"),r=I("Account creation didn't work. Please try again\r\n                later."),l=e(),i=E("a"),h=E("p"),d=I("Go to\r\n                home page"),this.h()},l(a){s=B(a,"DIV",{class:!0});var e=k(s);t=B(e,"H2",{class:!0});var o=k(t);r=D(o,"Account creation didn't work. Please try again\r\n                later."),o.forEach(c),l=n(e),i=B(e,"A",{href:!0});var f=k(i);h=B(f,"P",{class:!0});var u=k(h);d=D(u,"Go to\r\n                home page"),u.forEach(c),f.forEach(c),e.forEach(c),this.h()},h(){V(t,"class","lg:text-5xl text-3xl text-center"),V(h,"class","underline lg:text-3xl pt-4 text-2xl  text-center text-primary"),V(i,"href","/"),V(s,"class","w-full content-center lg:mt-60 mt-25 ")},m(a,e){o(a,s,e),j(s,t),j(t,r),j(s,l),j(s,i),j(i,h),j(h,d)},p:P,i:P,o:P,d(a){a&&c(s)}}}function Q(a){let s,t,r,l,f,u,v,p,x,w,g,y,b,z,P,C,A,T,N,Y,R,G,U,H,F,M,O,S,q,J,K,W,Q,Z,_,aa,sa,ta,ea,ra,la,ca,na,oa,ia,ha,da,fa,ua,ma,va,pa,xa,wa,ga,ya,ba,Ea,Ia,Ba,ka,Da,Va,ja,za,Pa,$a,Ca,Aa,Ta,Na,La,Ya,Ra,Ga,Ua,Ha,Fa,Ma,Oa,Sa,qa=a[9].boost/2+"",Ja=a[9].duration+"",Ka=a[9].boost+"",Wa=a[9].duration+"",Qa=a[2]&&X(a);return{c(){s=E("div"),t=E("div"),r=E("div"),l=E("h1"),f=I("Invite friends and earn rewards"),u=e(),v=E("div"),p=E("div"),x=E("p"),w=I("You"),g=e(),y=E("p"),b=I("will get\r\n                            "),z=E("b"),P=I(qa),C=I("%"),A=I("\r\n                            of the coins that\r\n                            "),T=E("b"),N=I("each people"),Y=I("\r\n                            who\r\n                            "),R=E("b"),G=I("creates an account"),U=I("\r\n                            with your link wins, for "),H=I(Ja),F=I(" days!"),M=e(),O=E("div"),S=E("div"),q=L("svg"),J=L("path"),K=e(),W=E("div"),Q=e(),Z=L("svg"),_=L("path"),aa=e(),sa=E("div"),ta=L("svg"),ea=L("path"),ra=e(),la=E("div"),ca=e(),na=L("svg"),oa=L("path"),ia=e(),ha=E("p"),da=I("Everyone wins!"),fa=e(),ua=E("div"),ma=E("p"),va=I("Each person"),pa=e(),xa=E("p"),wa=I("that will\r\n                            "),ga=E("b"),ya=I("create an account"),ba=I("\r\n                            with\r\n                            "),Ea=E("u"),Ia=I("your"),Ba=I("\r\n                            link will get\r\n                            "),ka=E("b"),Da=I(Ka),Va=I("%"),ja=I("\r\n                            more coins for "),za=I(Wa),Pa=I(" days!"),$a=e(),Ca=E("div"),Qa&&Qa.c(),Aa=e(),Ta=E("p"),Na=I("You will be able to\r\n                    "),La=E("b"),Ya=I("access your link"),Ra=I("\r\n                    by clicking on\r\n                    "),Ga=E("b"),Ua=I("your profile"),Ha=I("\r\n                    !"),Fa=e(),Ma=E("a"),Oa=I("Finish"),this.h()},l(a){s=B(a,"DIV",{class:!0});var e=k(s);t=B(e,"DIV",{class:!0});var o=k(t);r=B(o,"DIV",{class:!0});var i=k(r);l=B(i,"H1",{class:!0});var h=k(l);f=D(h,"Invite friends and earn rewards"),h.forEach(c),i.forEach(c),u=n(o),v=B(o,"DIV",{class:!0});var d=k(v);p=B(d,"DIV",{class:!0});var m=k(p);x=B(m,"P",{class:!0});var E=k(x);w=D(E,"You"),E.forEach(c),g=n(m),y=B(m,"P",{class:!0});var I=k(y);b=D(I,"will get\r\n                            "),z=B(I,"B",{class:!0});var V=k(z);P=D(V,qa),C=D(V,"%"),V.forEach(c),A=D(I,"\r\n                            of the coins that\r\n                            "),T=B(I,"B",{class:!0});var j=k(T);N=D(j,"each people"),j.forEach(c),Y=D(I,"\r\n                            who\r\n                            "),R=B(I,"B",{class:!0});var $=k(R);G=D($,"creates an account"),$.forEach(c),U=D(I,"\r\n                            with your link wins, for "),H=D(I,Ja),F=D(I," days!"),I.forEach(c),m.forEach(c),M=n(d),O=B(d,"DIV",{class:!0});var L=k(O);S=B(L,"DIV",{class:!0});var X=k(S);q=B(X,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var Sa=k(q);J=B(Sa,"path",{d:!0},1),k(J).forEach(c),Sa.forEach(c),K=n(X),W=B(X,"DIV",{class:!0}),k(W).forEach(c),Q=n(X),Z=B(X,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var Xa=k(Z);_=B(Xa,"path",{d:!0},1),k(_).forEach(c),Xa.forEach(c),X.forEach(c),aa=n(L),sa=B(L,"DIV",{class:!0});var Za=k(sa);ta=B(Za,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var _a=k(ta);ea=B(_a,"path",{d:!0},1),k(ea).forEach(c),_a.forEach(c),ra=n(Za),la=B(Za,"DIV",{class:!0}),k(la).forEach(c),ca=n(Za),na=B(Za,"svg",{class:!0,viewBox:!0,xmlns:!0},1);var as=k(na);oa=B(as,"path",{d:!0},1),k(oa).forEach(c),as.forEach(c),Za.forEach(c),ia=n(L),ha=B(L,"P",{class:!0});var ss=k(ha);da=D(ss,"Everyone wins!"),ss.forEach(c),L.forEach(c),fa=n(d),ua=B(d,"DIV",{class:!0});var ts=k(ua);ma=B(ts,"P",{class:!0});var es=k(ma);va=D(es,"Each person"),es.forEach(c),pa=n(ts),xa=B(ts,"P",{class:!0});var rs=k(xa);wa=D(rs,"that will\r\n                            "),ga=B(rs,"B",{class:!0});var ls=k(ga);ya=D(ls,"create an account"),ls.forEach(c),ba=D(rs,"\r\n                            with\r\n                            "),Ea=B(rs,"U",{});var cs=k(Ea);Ia=D(cs,"your"),cs.forEach(c),Ba=D(rs,"\r\n                            link will get\r\n                            "),ka=B(rs,"B",{class:!0});var ns=k(ka);Da=D(ns,Ka),Va=D(ns,"%"),ns.forEach(c),ja=D(rs,"\r\n                            more coins for "),za=D(rs,Wa),Pa=D(rs," days!"),rs.forEach(c),ts.forEach(c),d.forEach(c),$a=n(o),Ca=B(o,"DIV",{class:!0});var os=k(Ca);Qa&&Qa.l(os),os.forEach(c),Aa=n(o),Ta=B(o,"P",{class:!0});var is=k(Ta);Na=D(is,"You will be able to\r\n                    "),La=B(is,"B",{class:!0});var hs=k(La);Ya=D(hs,"access your link"),hs.forEach(c),Ra=D(is,"\r\n                    by clicking on\r\n                    "),Ga=B(is,"B",{class:!0});var ds=k(Ga);Ua=D(ds,"your profile"),ds.forEach(c),Ha=D(is,"\r\n                    !"),is.forEach(c),Fa=n(o),Ma=B(o,"A",{href:!0,class:!0});var fs=k(Ma);Oa=D(fs,"Finish"),fs.forEach(c),o.forEach(c),e.forEach(c),this.h()},h(){V(l,"class","text-6xl mb-8 lg:mb-8 leading-snug\r\n                        lg:leading-normal"),V(r,"class","text-center mt-7 lg:mt-12"),V(x,"class","text-6xl mt-6"),V(z,"class","svelte-96ajzy"),V(T,"class","svelte-96ajzy"),V(R,"class","svelte-96ajzy"),V(y,"class","leading-7 mt-13 text-2xl"),V(p,"class","card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\r\n                        md:mr-12"),V(J,"d","m19.2 2.43-2.422-2.43-11.978 12 11.978 12\r\n                                    2.422-2.43-9.547-9.57z"),V(q,"class","w-4 fill-current text-accent -mr-3"),V(q,"viewBox","0 0 24 24"),V(q,"xmlns","http://www.w3.org/2000/svg"),V(W,"class","h-2px bg-accent w-40"),V(_,"d","m4.8 21.57 2.422 2.43\r\n                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z"),V(Z,"class","w-4 fill-current text-accent -ml-3"),V(Z,"viewBox","0 0 24 24"),V(Z,"xmlns","http://www.w3.org/2000/svg"),V(S,"class","hidden md:flex items-center"),V(ea,"d","m21.57 19.2 2.43-2.422-12-11.978-12\r\n                                    11.978 2.43 2.422 9.57-9.547z"),V(ta,"class","w-4 fill-current text-accent -mb-3"),V(ta,"viewBox","0 0 24 24"),V(ta,"xmlns","http://www.w3.org/2000/svg"),V(la,"class","w-2px bg-accent h-16"),V(oa,"d","m2.43 4.8-2.43 2.422 12 11.978\r\n                                    12-11.978-2.43-2.422-9.57 9.547z"),V(na,"class","w-4 fill-current text-accent -mt-3"),V(na,"viewBox","0 0 24 24"),V(na,"xmlns","http://www.w3.org/2000/svg"),V(sa,"class","flex flex-col md:hidden items-center"),V(ha,"class","text-center text-extra-light text-lg ml-4\r\n                            md:ml-0"),V(O,"class","flex items-center md:block"),V(ma,"class","text-6xl"),V(ga,"class","svelte-96ajzy"),V(ka,"class","svelte-96ajzy"),V(xa,"class","leading-7 mt-4 text-2xl"),V(ua,"class","card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0\r\n                        md:ml-12"),V(v,"class","flex flex-col md:flex-row items-center"),V(Ca,"class","lg:flex justify-center"),V(La,"class","accent svelte-96ajzy"),V(Ga,"class","accent svelte-96ajzy"),V(Ta,"class","pt-4 text-default text-center"),V(Ma,"href","/play"),V(Ma,"class","button button-brand mt-10 block mx-auto mb-6 md:mb-0"),V(t,"class","flex flex-col items-center px-5"),V(s,"class","flex items-center justify-center md:h-screen-7")},m(a,e){o(a,s,e),j(s,t),j(t,r),j(r,l),j(l,f),j(t,u),j(t,v),j(v,p),j(p,x),j(x,w),j(p,g),j(p,y),j(y,b),j(y,z),j(z,P),j(z,C),j(y,A),j(y,T),j(T,N),j(y,Y),j(y,R),j(R,G),j(y,U),j(y,H),j(y,F),j(v,M),j(v,O),j(O,S),j(S,q),j(q,J),j(S,K),j(S,W),j(S,Q),j(S,Z),j(Z,_),j(O,aa),j(O,sa),j(sa,ta),j(ta,ea),j(sa,ra),j(sa,la),j(sa,ca),j(sa,na),j(na,oa),j(O,ia),j(O,ha),j(ha,da),j(v,fa),j(v,ua),j(ua,ma),j(ma,va),j(ua,pa),j(ua,xa),j(xa,wa),j(xa,ga),j(ga,ya),j(xa,ba),j(xa,Ea),j(Ea,Ia),j(xa,Ba),j(xa,ka),j(ka,Da),j(ka,Va),j(xa,ja),j(xa,za),j(xa,Pa),j(t,$a),j(t,Ca),Qa&&Qa.m(Ca,null),j(t,Aa),j(t,Ta),j(Ta,Na),j(Ta,La),j(La,Ya),j(Ta,Ra),j(Ta,Ga),j(Ga,Ua),j(Ta,Ha),j(t,Fa),j(t,Ma),j(Ma,Oa),Sa=!0},p(a,s){(!Sa||512&s)&&qa!==(qa=a[9].boost/2+"")&&$(P,qa),(!Sa||512&s)&&Ja!==(Ja=a[9].duration+"")&&$(H,Ja),(!Sa||512&s)&&Ka!==(Ka=a[9].boost+"")&&$(Da,Ka),(!Sa||512&s)&&Wa!==(Wa=a[9].duration+"")&&$(za,Wa),a[2]?Qa?(Qa.p(a,s),4&s&&d(Qa,1)):(Qa=X(a),Qa.c(),d(Qa,1),Qa.m(Ca,null)):Qa&&(m(),i(Qa,1,1,(()=>{Qa=null})),h())},i(a){Sa||(d(Qa),Sa=!0)},o(a){i(Qa),Sa=!1},d(a){a&&c(s),Qa&&Qa.d()}}}function X(a){let s,t,r,l,f,u,v,p,x,w,g,y,b,P,T,N,Y=a[8]&&Z(a),R=a[7]&&_();return{c(){s=E("div"),t=E("div"),r=E("p"),l=I(a[2]),f=e(),u=E("div"),Y&&Y.c(),v=e(),p=E("div"),x=L("svg"),w=L("path"),g=L("path"),y=L("path"),b=e(),R&&R.c(),this.h()},l(e){s=B(e,"DIV",{class:!0});var o=k(s);t=B(o,"DIV",{id:!0,class:!0,style:!0});var i=k(t);r=B(i,"P",{class:!0});var h=k(r);l=D(h,a[2]),h.forEach(c),f=n(i),u=B(i,"DIV",{class:!0});var d=k(u);Y&&Y.l(d),v=n(d),p=B(d,"DIV",{class:!0});var m=k(p);x=B(m,"svg",{viewBox:!0,fill:!0,class:!0,xmlns:!0},1);var E=k(x);w=B(E,"path",{d:!0},1),k(w).forEach(c),g=B(E,"path",{d:!0},1),k(g).forEach(c),y=B(E,"path",{d:!0},1),k(y).forEach(c),E.forEach(c),m.forEach(c),d.forEach(c),i.forEach(c),b=n(o),R&&R.l(o),o.forEach(c),this.h()},h(){V(r,"class","ml-1"),V(w,"d","m12.922 16.587-3.671 3.671c-.693.645-1.626 1.041-2.651 1.041-2.152 0-3.896-1.744-3.896-3.896 0-1.025.396-1.958 1.043-2.654l-.002.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108 1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494 6.494 6.494 1.738 0 3.316-.683 4.482-1.795l-.003.002 3.671-3.671c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001z"),V(g,"d","m24.007 6.489c-.002-3.585-2.908-6.491-6.494-6.491-1.793 0-3.417.727-4.592 1.902l-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c.693-.645 1.626-1.041 2.651-1.041 2.152 0 3.896 1.744 3.896 3.896 0 1.025-.396 1.958-1.043 2.654l.002-.002-3.671 3.671c-.259.238-.421.579-.421.958 0 .717.582 1.299 1.299 1.299.379 0 .719-.162.957-.42l.001-.001 3.671-3.671c1.178-1.169 1.908-2.789 1.908-4.58 0-.003 0-.006 0-.009z"),V(y,"d","m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z"),V(x,"viewBox","0 0 24 24"),V(x,"fill","currentColor"),V(x,"class","w-5 h-5"),V(x,"xmlns","http://www.w3.org/2000/svg"),C(x,"ml-1",a[8]),V(p,"class","w-5 h-5 hover:text-gray-500 cursor-pointer"),V(u,"class","ml-2 h-5  flex"),C(u,"w-5",!a[8]),C(u,"w-12",a[8]),V(t,"id","link"),V(t,"class","flex justify-between  w-full   leading-none focus:outline-none text-lg lg:text-default focus:border-none"),A(t,"font-family","'Roboto Condensed', sans-serif"),V(s,"class","text-background  bg-font py-4 px-3 mt-14 flex items-center rounded")},m(e,c){o(e,s,c),j(s,t),j(t,r),j(r,l),j(t,f),j(t,u),Y&&Y.m(u,null),j(u,v),j(u,p),j(p,x),j(x,w),j(x,g),j(x,y),j(s,b),R&&R.m(s,null),P=!0,T||(N=z(x,"click",a[14]),T=!0)},p(a,t){(!P||4&t)&&$(l,a[2]),a[8]?Y?Y.p(a,t):(Y=Z(a),Y.c(),Y.m(u,v)):Y&&(Y.d(1),Y=null),256&t&&C(x,"ml-1",a[8]),256&t&&C(u,"w-5",!a[8]),256&t&&C(u,"w-12",a[8]),a[7]?R?128&t&&d(R,1):(R=_(),R.c(),d(R,1),R.m(s,null)):R&&(m(),i(R,1,1,(()=>{R=null})),h())},i(a){P||(d(R),P=!0)},o(a){i(R),P=!1},d(a){a&&c(s),Y&&Y.d(),R&&R.d(),T=!1,N()}}}function Z(a){let s,t,e,r,l;return{c(){s=E("div"),t=L("svg"),e=L("path"),this.h()},l(a){s=B(a,"DIV",{class:!0});var r=k(s);t=B(r,"svg",{viewBox:!0,fill:!0,class:!0,xmlns:!0},1);var l=k(t);e=B(l,"path",{d:!0},1),k(e).forEach(c),l.forEach(c),r.forEach(c),this.h()},h(){V(e,"d","m20.237 15.638c-.001 0-.002 0-.003 0-1.192 0-2.263.515-3.004 1.334l-.003.004-8.948-4.348c0-.167.084-.418.084-.669.002-.029.003-.062.003-.096 0-.176-.032-.344-.09-.499l.003.01 8.948-4.348c.744.823 1.815 1.338 3.007 1.338h.004c2.309 0 4.181-1.872 4.181-4.181s-1.872-4.181-4.181-4.181-4.181 1.872-4.181 4.181c-.002.029-.003.062-.003.096 0 .176.032.344.09.499l-.003-.01-8.948 4.348c-.744-.823-1.815-1.338-3.007-1.338-.001 0-.002 0-.004 0-2.309 0-4.181 1.872-4.181 4.181s1.872 4.181 4.181 4.181h.003c1.192 0 2.263-.515 3.004-1.334l.003-.004 8.948 4.348c0 .167-.084.418-.084.669 0 2.309 1.872 4.181 4.181 4.181s4.181-1.872 4.181-4.181c.001-.027.001-.06.001-.092 0-2.259-1.831-4.09-4.09-4.09-.032 0-.065 0-.097.001z"),V(t,"viewBox","0 0 24 24"),V(t,"fill","currentColor"),V(t,"class","w-5 h-5"),V(t,"xmlns","http://www.w3.org/2000/svg"),C(t,"mr-1",a[8]),V(s,"class","w-5 h-5 hover:text-gray-500 cursor-pointer  mr-1")},m(c,n){o(c,s,n),j(s,t),j(t,e),r||(l=z(t,"click",a[13]),r=!0)},p(a,s){256&s&&C(t,"mr-1",a[8])},d(a){a&&c(s),r=!1,l()}}}function _(a){let s,t,e,r,l;return{c(){s=E("div"),t=E("span"),e=I("Copied!"),this.h()},l(a){s=B(a,"DIV",{class:!0});var r=k(s);t=B(r,"SPAN",{class:!0});var l=k(t);e=D(l,"Copied!"),l.forEach(c),r.forEach(c),this.h()},h(){V(t,"class","tooltip absolute px-6 py-2 bg-primary hidden md:block rounded text-font  text-left -left-20 bottom-5 flex items-center justify-center z-40 svelte-96ajzy"),V(s,"class","relative")},m(a,r){o(a,s,r),j(s,t),j(t,e),l=!0},i(a){l||(Y((()=>{r||(r=R(t,G,{},!0)),r.run(1)})),l=!0)},o(a){r||(r=R(t,G,{},!1)),r.run(0),l=!1},d(a){a&&c(s),a&&r&&r.end()}}}function aa(a){let s,t,f,u,v;const p=[J,q,S,O],x=[];function w(a,s){return a[0]&&a[9]?.boost?0:a[1]&&a[3]?1:a[1]&&!a[3]?2:3}return t=w(a),f=x[t]=p[t](a),{c(){s=e(),f.c(),u=r(),this.h()},l(a){l('[data-svelte="svelte-18vg2am"]',M.head).forEach(c),s=n(a),f.l(a),u=r(),this.h()},h(){M.title="Invite friends and earn rewards | Winhalla, Play Brawlhalla. Earn rewards."},m(a,e){o(a,s,e),x[t].m(a,e),o(a,u,e),v=!0},p(a,[s]){let e=t;t=w(a),t===e?x[t].p(a,s):(m(),i(x[e],1,1,(()=>{x[e]=null})),h(),f=x[t],f?f.p(a,s):(f=x[t]=p[t](a),f.c()),d(f,1),f.m(u.parentNode,u))},i(a){v||(d(f),v=!0)},o(a){i(f),v=!1},d(a){a&&c(s),x[t].d(a),a&&c(u)}}}async function sa({query:a}){return{isVisible:a.visible}}function ta(a,s,t){let e,r,l,c,n,o,i,h,d,{isVisible:u}=s,m=null,w="";f((async()=>{"true"===new URLSearchParams(document.location.search).get("needBrawlhallaID")&&t(3,l=!0),t(8,i=!!window.navigator.share),t(9,h=v("get","/linkConfig"));let a=v("get","/account");a=await a,t(9,h=await h),(!a||a.user&&!u)&&(t(0,u=!0),t(2,r=`https://winhalla.app/link/${a.user.linkId}`)),a.user?t(2,r=a.user.linkId):t(1,e=!0),t(2,r=`https://winhalla.app/link/${r}`),p.set({refresh:!0})}));return a.$$set=a=>{"isVisible"in a&&t(0,u=a.isVisible)},[u,e,r,l,m,c,n,o,i,h,w,async function(){t(1,e=!1);let{source:a,affiliateLinkId:s}=x.parse(document.cookie);if(t(2,r=await v("post",`/auth/createAccount?linkId=${s}&source=${a}&BID=${w}`)),r instanceof Error)return t(6,({error:n,isVisible:u}={error:!0,isVisible:!0}),n,t(0,u));document.cookie=x.serialize("affiliateLinkId",0,{maxAge:1}),document.cookie=x.serialize("source",0,{maxAge:1}),t(0,u=!0),t(2,r=`https://winhalla.app/link/${r}`),p.set({refresh:!0})},async function(){if(isNaN(parseInt(w)))return t(5,c="The brawlhalla id is a number (not your brawlhalla username)"),void t(4,m=!1);const{isValid:a,reason:s}=await v("get",`/auth/isBIDvalid/${w}`);a?t(3,l=!1):(t(5,c=s),t(4,m=!1)),clearInterval(d),d=setTimeout((()=>t(4,m=null)),4e3)},()=>H(r),()=>F(r,(function(){t(7,o=!0),setTimeout((()=>{t(7,o=!1)}),3e3)})),function(){w=this.value,t(10,w)}]}export default class extends a{constructor(a){super(),s(this,a,ta,aa,t,{isVisible:0})}}export{sa as preload};