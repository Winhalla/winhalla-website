import{S as e,i as a,s,e as t,a as o,t as r,d as i,f as n,g as c,h as l,n as h,j as u,M as d,k as y,l as f,m as p,z as v,O as m,B as g,I as w,J as b,K as E,F as k,D as P,L as I,c as A,q as x,E as T,u as S,N as D,P as W,$ as C,G as R,C as V}from"./client.10e80283.js";import{I as H}from"./Infos.566522e4.js";const{document:U}=S;function Y(e){let a,s,w,b,E,k,P,I,A,x,T,S,C,R,V,H,U,Y,B,O,G,$,N;function j(e,a){return"delete account"===e[0]?L:"restrict processing"===e[0]?q:void 0}let z=j(e),F=z&&z(e);return{c(){a=t("div"),w=o(),b=t("div"),E=t("div"),k=t("h1"),P=r("Confirm "),I=r(e[0]),A=o(),F&&F.c(),x=o(),T=t("div"),S=t("div"),C=t("div"),R=t("button"),V=r("Confirm "),H=r(e[0]),U=o(),Y=t("button"),B=r("Cancel"),this.h()},l(s){a=i(s,"DIV",{class:!0}),n(a).forEach(c),w=l(s),b=i(s,"DIV",{class:!0});var t=n(b);E=i(t,"DIV",{class:!0,style:!0});var o=n(E);k=i(o,"H1",{class:!0});var r=n(k);P=h(r,"Confirm "),I=h(r,e[0]),r.forEach(c),A=l(o),F&&F.l(o),x=l(o),T=i(o,"DIV",{});var u=n(T);S=i(u,"DIV",{class:!0});var d=n(S);C=i(d,"DIV",{class:!0});var y=n(C);R=i(y,"BUTTON",{class:!0,style:!0});var f=n(R);V=h(f,"Confirm "),H=h(f,e[0]),f.forEach(c),U=l(y),Y=i(y,"BUTTON",{class:!0,style:!0});var p=n(Y);B=h(p,"Cancel"),p.forEach(c),y.forEach(c),d.forEach(c),u.forEach(c),o.forEach(c),t.forEach(c),this.h()},h(){u(a,"class","fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0"),u(k,"class","text-5xl text-primary"),u(R,"class","button button-brand mt-8"),d(R,"background-color","#fc1870"),u(Y,"class","button button-brand mt-8 border ml-5 border-legendary"),d(Y,"background-color","#17171a"),d(Y,"padding","-1px"),u(C,"class","justify-center w-full flex"),u(S,"class","overflow-auto max-h-screen-50"),u(E,"class","justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"),d(E,"margin-top","20vh"),u(b,"class","fixed flex w-screen h-screen z-50 left-0 top-0")},m(s,t){y(s,a,t),y(s,w,t),y(s,b,t),f(b,E),f(E,k),f(k,P),f(k,I),f(E,A),F&&F.m(E,null),f(E,x),f(E,T),f(T,S),f(S,C),f(C,R),f(R,V),f(R,H),f(C,U),f(C,Y),f(Y,B),G=!0,$||(N=[p(R,"click",e[9]),p(Y,"click",e[10])],$=!0)},p(e,a){(!G||1&a)&&v(I,e[0]),z!==(z=j(e))&&(F&&F.d(1),F=z&&z(e),F&&(F.c(),F.m(E,x))),(!G||1&a)&&v(H,e[0])},i(e){G||(D((()=>{s||(s=m(a,W,{duration:200},!0)),s.run(1)})),D((()=>{O||(O=m(b,W,{duration:200},!0)),O.run(1)})),G=!0)},o(e){s||(s=m(a,W,{duration:200},!1)),s.run(0),O||(O=m(b,W,{duration:200},!1)),O.run(0),G=!1},d(e){e&&c(a),e&&s&&s.end(),e&&c(w),e&&c(b),F&&F.d(),e&&O&&O.end(),$=!1,g(N)}}}function q(e){let a,s,o,l,d,p,v,m,g,w;return{c(){a=t("p"),s=r("Warning: this action will make your account "),o=t("u"),l=r("unusable"),d=r(". "),p=t("br"),v=r("However,\r\n                    we will still keep your account data and will be able to restore it if you ask us "),m=t("a"),g=r("here"),w=r(" with your steamId and nickname"),this.h()},l(e){a=i(e,"P",{class:!0});var t=n(a);s=h(t,"Warning: this action will make your account "),o=i(t,"U",{});var r=n(o);l=h(r,"unusable"),r.forEach(c),d=h(t,". "),p=i(t,"BR",{}),v=h(t,"However,\r\n                    we will still keep your account data and will be able to restore it if you ask us "),m=i(t,"A",{href:!0,class:!0});var u=n(m);g=h(u,"here"),u.forEach(c),w=h(t," with your steamId and nickname"),t.forEach(c),this.h()},h(){u(m,"href","mailto:contact@winhalla.app"),u(m,"class","svelte-1y9msar"),u(a,"class","ml-4 text-3xl mt-6 svelte-1y9msar")},m(e,t){y(e,a,t),f(a,s),f(a,o),f(o,l),f(a,d),f(a,p),f(a,v),f(a,m),f(m,g),f(a,w)},d(e){e&&c(a)}}}function L(e){let a,s,o,l,d,p,v,m,g;return{c(){a=t("p"),s=r("Warning: this action is "),o=t("u"),l=r("not cancellable"),d=r(". "),p=t("br"),v=r(" All data will be lost\r\n                    "),m=t("u"),g=r("forever"),this.h()},l(e){a=i(e,"P",{class:!0});var t=n(a);s=h(t,"Warning: this action is "),o=i(t,"U",{});var r=n(o);l=h(r,"not cancellable"),r.forEach(c),d=h(t,". "),p=i(t,"BR",{}),v=h(t," All data will be lost\r\n                    "),m=i(t,"U",{});var u=n(m);g=h(u,"forever"),u.forEach(c),t.forEach(c),this.h()},h(){u(a,"class","ml-4 text-3xl mt-6 svelte-1y9msar")},m(e,t){y(e,a,t),f(a,s),f(a,o),f(o,l),f(a,d),f(a,p),f(a,v),f(a,m),f(m,g)},d(e){e&&c(a)}}}function B(e){let a,s;return a=new H({props:{pushError:e[1],message:e[2]}}),{c(){w(a.$$.fragment)},l(e){b(a.$$.fragment,e)},m(e,t){E(a,e,t),s=!0},p(e,s){const t={};2&s&&(t.pushError=e[1]),4&s&&(t.message=e[2]),a.$set(t)},i(e){s||(k(a.$$.fragment,e),s=!0)},o(e){P(a.$$.fragment,e),s=!1},d(e){I(a,e)}}}function O(e){let a,s,v,m,w,b,E,I,S,D,W,V,H,q,L,O,G,$,N,j,z,F,M,_,J,K,Q,X,Z,ee,ae,se,te,oe,re,ie,ne,ce,le,he,ue,de,ye,fe,pe,ve,me,ge,we,be,Ee,ke,Pe,Ie,Ae,xe,Te,Se,De,We,Ce,Re,Ve,He,Ue,Ye,qe,Le,Be,Oe,Ge,$e,Ne,je,ze,Fe,Me,_e,Je,Ke,Qe,Xe,Ze,ea,aa,sa,ta,oa,ra,ia,na,ca,la,ha,ua,da,ya,fa,pa,va,ma,ga,wa,ba,Ea,ka,Pa,Ia,Aa,xa,Ta,Sa,Da,Wa,Ca,Ra,Va,Ha,Ua,Ya,qa,La,Ba,Oa,Ga,$a,Na,ja,za,Fa,Ma,_a,Ja,Ka,Qa,Xa,Za,es,as,ss,ts,os,rs,is,ns,cs,ls,hs,us,ds,ys,fs,ps,vs,ms,gs,ws,bs,Es,ks,Ps,Is,As,xs,Ts,Ss,Ds,Ws=e[0]&&Y(e),Cs=e[2]&&B(e);return{c(){a=o(),s=t("div"),v=t("h1"),m=r("Privacy Policy"),w=o(),b=t("p"),E=r('Winhalla operates the https://winhalla.app website ("Site"), which provides the SERVICE.'),I=o(),S=t("p"),D=r("This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of\r\n        Personal Information if anyone decided to use our Service, the Site."),W=o(),V=t("p"),H=r('We therefore only use your personal data within the scope of legal regulations, in particular the General Data\r\n        Protection Regulation ("GDPR")'),q=o(),L=t("p"),O=r("If you choose to use our Service, then you agree to the collection and use of information in relation with this\r\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\r\n        use or share your information with anyone except as described in this Privacy Policy."),G=o(),$=t("h2"),N=r("I. Account data"),j=o(),z=t("p"),F=r('To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with\r\n        your Steam Account and clicking on "Accept Terms And Conditions", we automatically create an account containing\r\n        :'),M=o(),_=t("ul"),J=t("li"),K=r("Your SteamID64"),Q=o(),X=t("li"),Z=r("Your profile picture URL"),ee=o(),ae=t("li"),se=r("Your username"),te=o(),oe=t("li"),re=r("And other data (including but not limited to : your coins number, your quest in progress...) This\r\n            information is internal to the Site, is used only by us and in no case disclosed"),ie=o(),ne=t("p"),ce=r("Your STEAMID64 may be sent to Brawlhalla's API ("),le=t("a"),he=r("https://api.brawlhalla.com"),ue=r(") to track your progress in the game and give\r\n        you coins according to your performance"),de=o(),ye=t("p"),fe=r("Other account data will not be sent, sold, rented, or traded to any third-party."),pe=o(),ve=t("p"),me=r("All your account data is kept until you "),ge=t("a"),we=r("delete your\r\n        account"),be=r(" and\r\n        may be processed by our servers to provide the Service in its entirety"),Ee=o(),ke=t("h2"),Pe=r("II. Analytical software"),Ie=o(),Ae=t("p"),xe=r("We are using - like any other website - an analytical software. This software helps us to understand our traffic\r\n        and its fluctuations"),Te=o(),Se=t("p"),De=r("Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You\r\n        can edit your consent following "),We=t("a"),Ce=r("this"),Re=r(" instructions"),Ve=o(),He=t("p"),Ue=r("This analytical software can deposits cookies and collect data ; this data is kept strictly\r\n        anonymous. However\r\n        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order\r\n        to allow us to use this data"),Ye=o(),qe=t("h2"),Le=r("III. Advertising"),Be=o(),Oe=t("p"),Ge=r("We are using ads, because a website doesn't update and hosts itself!"),$e=o(),Ne=t("p"),je=r("You can choose to enable or disable ad personalization via cookies on your first visit (you can always edit your\r\n        consent "),ze=t("a"),Fe=r("here"),Me=r("). Disabling ad personalisation still deposits cookies, but\r\n        these are\r\n        necessary for the Site, since advertising is."),_e=o(),Je=t("p"),Ke=r("You can read their privacy policy here :"),Qe=t("a"),Xe=r("https://policies.google.com/technologies/partner-sites"),Ze=o(),ea=t("p"),aa=r("We also use adplayer.pro as rewarded ads provider. They declared they doesn't use any personal information or\r\n        cookies"),sa=o(),ta=t("p"),oa=r("You can read their privacy policy here : "),ra=t("a"),ia=r("https://adplayer.pro/privacy"),na=o(),ca=t("h2"),la=r("IV. Cookies"),ha=o(),ua=t("p"),da=r("We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly\r\n        used an anonymous unique identifier. They are stored in your computer's hard drive"),ya=o(),fa=t("p"),pa=r("We use cookies for :"),va=o(),ma=t("ul"),ga=t("li"),wa=r("Authenticating : required, else you cannot use most of the Site's functionalities"),ba=o(),Ea=t("li"),ka=r("Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are\r\n            required, since they will have a major impact on your experience"),Pa=o(),Ia=t("li"),Aa=r("Analytical : as said "),xa=t("a"),Ta=r("here"),Sa=r(", they are not required an can be disabled"),Da=o(),Wa=t("li"),Ca=r("Advertising cookies : as said "),Ra=t("a"),Va=r("here"),Ha=r(" they are not required and can be\r\n            disabled,\r\n            however you\r\n            cannot disable ads, they will be un-personalized if you opt-out to cookies"),Ua=o(),Ya=t("p"),qa=r("For more general information on cookies, please read "),La=t("a"),Ba=r('"What Are Cookies"'),Oa=r("."),Ga=o(),$a=t("h2"),Na=r("V. Edit your consent and claim your rights"),ja=o(),za=t("div"),Fa=t("button"),Ma=r("Edit cookie\r\n            consent"),_a=o(),Ja=t("button"),Ka=r("Delete Account"),Qa=o(),Xa=t("a"),Za=r("Download\r\n            Data"),as=o(),ss=t("button"),ts=r("Restrict Processing"),os=r("\r\n        (Restrict processing\r\n        will make your account unusable but we still keep your data)"),rs=o(),is=t("h3"),ns=r("Other GDPR-related user rights can be claimed via email "),cs=t("a"),ls=r("here"),hs=o(),us=t("h2"),ds=r("VI. Changes to This Privacy Policy"),ys=o(),fs=t("p"),ps=r("We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\r\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\r\n        change in the Site. These changes are effective immediately, after they are posted on this page."),vs=o(),ms=t("h2"),gs=r("VII. Contact Us"),ws=o(),bs=t("p"),Es=r("If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at "),ks=t("a"),Ps=r("contact@winhalla.app"),Is=o(),Ws&&Ws.c(),As=o(),Cs&&Cs.c(),xs=A(),this.h()},l(e){x('[data-svelte="svelte-88sy1r"]',U.head).forEach(c),a=l(e),s=i(e,"DIV",{class:!0,style:!0});var t=n(s);v=i(t,"H1",{class:!0});var o=n(v);m=h(o,"Privacy Policy"),o.forEach(c),w=l(t),b=i(t,"P",{class:!0});var r=n(b);E=h(r,'Winhalla operates the https://winhalla.app website ("Site"), which provides the SERVICE.'),r.forEach(c),I=l(t),S=i(t,"P",{class:!0});var u=n(S);D=h(u,"This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of\r\n        Personal Information if anyone decided to use our Service, the Site."),u.forEach(c),W=l(t),V=i(t,"P",{class:!0});var d=n(V);H=h(d,'We therefore only use your personal data within the scope of legal regulations, in particular the General Data\r\n        Protection Regulation ("GDPR")'),d.forEach(c),q=l(t),L=i(t,"P",{class:!0});var y=n(L);O=h(y,"If you choose to use our Service, then you agree to the collection and use of information in relation with this\r\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\r\n        use or share your information with anyone except as described in this Privacy Policy."),y.forEach(c),G=l(t),$=i(t,"H2",{class:!0});var f=n($);N=h(f,"I. Account data"),f.forEach(c),j=l(t),z=i(t,"P",{class:!0});var p=n(z);F=h(p,'To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with\r\n        your Steam Account and clicking on "Accept Terms And Conditions", we automatically create an account containing\r\n        :'),p.forEach(c),M=l(t),_=i(t,"UL",{class:!0});var g=n(_);J=i(g,"LI",{});var k=n(J);K=h(k,"Your SteamID64"),k.forEach(c),Q=l(g),X=i(g,"LI",{});var P=n(X);Z=h(P,"Your profile picture URL"),P.forEach(c),ee=l(g),ae=i(g,"LI",{});var T=n(ae);se=h(T,"Your username"),T.forEach(c),te=l(g),oe=i(g,"LI",{});var C=n(oe);re=h(C,"And other data (including but not limited to : your coins number, your quest in progress...) This\r\n            information is internal to the Site, is used only by us and in no case disclosed"),C.forEach(c),g.forEach(c),ie=l(t),ne=i(t,"P",{class:!0});var R=n(ne);ce=h(R,"Your STEAMID64 may be sent to Brawlhalla's API ("),le=i(R,"A",{href:!0,class:!0});var Y=n(le);he=h(Y,"https://api.brawlhalla.com"),Y.forEach(c),ue=h(R,") to track your progress in the game and give\r\n        you coins according to your performance"),R.forEach(c),de=l(t),ye=i(t,"P",{class:!0});var B=n(ye);fe=h(B,"Other account data will not be sent, sold, rented, or traded to any third-party."),B.forEach(c),pe=l(t),ve=i(t,"P",{id:!0,class:!0});var es=n(ve);me=h(es,"All your account data is kept until you "),ge=i(es,"A",{href:!0,class:!0});var Ts=n(ge);we=h(Ts,"delete your\r\n        account"),Ts.forEach(c),be=h(es," and\r\n        may be processed by our servers to provide the Service in its entirety"),es.forEach(c),Ee=l(t),ke=i(t,"H2",{class:!0});var Ss=n(ke);Pe=h(Ss,"II. Analytical software"),Ss.forEach(c),Ie=l(t),Ae=i(t,"P",{class:!0});var Ds=n(Ae);xe=h(Ds,"We are using - like any other website - an analytical software. This software helps us to understand our traffic\r\n        and its fluctuations"),Ds.forEach(c),Te=l(t),Se=i(t,"P",{class:!0});var Rs=n(Se);De=h(Rs,"Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You\r\n        can edit your consent following "),We=i(Rs,"A",{href:!0,class:!0});var Vs=n(We);Ce=h(Vs,"this"),Vs.forEach(c),Re=h(Rs," instructions"),Rs.forEach(c),Ve=l(t),He=i(t,"P",{id:!0,class:!0});var Hs=n(He);Ue=h(Hs,"This analytical software can deposits cookies and collect data ; this data is kept strictly\r\n        anonymous. However\r\n        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order\r\n        to allow us to use this data"),Hs.forEach(c),Ye=l(t),qe=i(t,"H2",{class:!0});var Us=n(qe);Le=h(Us,"III. Advertising"),Us.forEach(c),Be=l(t),Oe=i(t,"P",{class:!0});var Ys=n(Oe);Ge=h(Ys,"We are using ads, because a website doesn't update and hosts itself!"),Ys.forEach(c),$e=l(t),Ne=i(t,"P",{class:!0});var qs=n(Ne);je=h(qs,"You can choose to enable or disable ad personalization via cookies on your first visit (you can always edit your\r\n        consent "),ze=i(qs,"A",{href:!0,class:!0});var Ls=n(ze);Fe=h(Ls,"here"),Ls.forEach(c),Me=h(qs,"). Disabling ad personalisation still deposits cookies, but\r\n        these are\r\n        necessary for the Site, since advertising is."),qs.forEach(c),_e=l(t),Je=i(t,"P",{class:!0});var Bs=n(Je);Ke=h(Bs,"You can read their privacy policy here :"),Qe=i(Bs,"A",{href:!0,class:!0});var Os=n(Qe);Xe=h(Os,"https://policies.google.com/technologies/partner-sites"),Os.forEach(c),Bs.forEach(c),Ze=l(t),ea=i(t,"P",{class:!0});var Gs=n(ea);aa=h(Gs,"We also use adplayer.pro as rewarded ads provider. They declared they doesn't use any personal information or\r\n        cookies"),Gs.forEach(c),sa=l(t),ta=i(t,"P",{class:!0});var $s=n(ta);oa=h($s,"You can read their privacy policy here : "),ra=i($s,"A",{href:!0,class:!0});var Ns=n(ra);ia=h(Ns,"https://adplayer.pro/privacy"),Ns.forEach(c),$s.forEach(c),na=l(t),ca=i(t,"H2",{class:!0});var js=n(ca);la=h(js,"IV. Cookies"),js.forEach(c),ha=l(t),ua=i(t,"P",{class:!0});var zs=n(ua);da=h(zs,"We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly\r\n        used an anonymous unique identifier. They are stored in your computer's hard drive"),zs.forEach(c),ya=l(t),fa=i(t,"P",{class:!0});var Fs=n(fa);pa=h(Fs,"We use cookies for :"),Fs.forEach(c),va=l(t),ma=i(t,"UL",{class:!0});var Ms=n(ma);ga=i(Ms,"LI",{});var _s=n(ga);wa=h(_s,"Authenticating : required, else you cannot use most of the Site's functionalities"),_s.forEach(c),ba=l(Ms),Ea=i(Ms,"LI",{});var Js=n(Ea);ka=h(Js,"Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are\r\n            required, since they will have a major impact on your experience"),Js.forEach(c),Pa=l(Ms),Ia=i(Ms,"LI",{});var Ks=n(Ia);Aa=h(Ks,"Analytical : as said "),xa=i(Ks,"A",{href:!0,class:!0});var Qs=n(xa);Ta=h(Qs,"here"),Qs.forEach(c),Sa=h(Ks,", they are not required an can be disabled"),Ks.forEach(c),Da=l(Ms),Wa=i(Ms,"LI",{});var Xs=n(Wa);Ca=h(Xs,"Advertising cookies : as said "),Ra=i(Xs,"A",{href:!0,class:!0});var Zs=n(Ra);Va=h(Zs,"here"),Zs.forEach(c),Ha=h(Xs," they are not required and can be\r\n            disabled,\r\n            however you\r\n            cannot disable ads, they will be un-personalized if you opt-out to cookies"),Xs.forEach(c),Ms.forEach(c),Ua=l(t),Ya=i(t,"P",{class:!0});var et=n(Ya);qa=h(et,"For more general information on cookies, please read "),La=i(et,"A",{href:!0,class:!0});var at=n(La);Ba=h(at,'"What Are Cookies"'),at.forEach(c),Oa=h(et,"."),et.forEach(c),Ga=l(t),$a=i(t,"H2",{id:!0,class:!0});var st=n($a);Na=h(st,"V. Edit your consent and claim your rights"),st.forEach(c),ja=l(t),za=i(t,"DIV",{class:!0});var tt=n(za);Fa=i(tt,"BUTTON",{class:!0});var ot=n(Fa);Ma=h(ot,"Edit cookie\r\n            consent"),ot.forEach(c),_a=l(tt),Ja=i(tt,"BUTTON",{class:!0});var rt=n(Ja);Ka=h(rt,"Delete Account"),rt.forEach(c),Qa=l(tt),Xa=i(tt,"A",{class:!0,style:!0,href:!0,download:!0});var it=n(Xa);Za=h(it,"Download\r\n            Data"),it.forEach(c),as=l(tt),ss=i(tt,"BUTTON",{class:!0});var nt=n(ss);ts=h(nt,"Restrict Processing"),nt.forEach(c),os=h(tt,"\r\n        (Restrict processing\r\n        will make your account unusable but we still keep your data)"),tt.forEach(c),rs=l(t),is=i(t,"H3",{class:!0});var ct=n(is);ns=h(ct,"Other GDPR-related user rights can be claimed via email "),cs=i(ct,"A",{href:!0,class:!0});var lt=n(cs);ls=h(lt,"here"),lt.forEach(c),ct.forEach(c),hs=l(t),us=i(t,"H2",{class:!0});var ht=n(us);ds=h(ht,"VI. Changes to This Privacy Policy"),ht.forEach(c),ys=l(t),fs=i(t,"P",{class:!0});var ut=n(fs);ps=h(ut,"We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\r\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\r\n        change in the Site. These changes are effective immediately, after they are posted on this page."),ut.forEach(c),vs=l(t),ms=i(t,"H2",{class:!0});var dt=n(ms);gs=h(dt,"VII. Contact Us"),dt.forEach(c),ws=l(t),bs=i(t,"P",{class:!0});var yt=n(bs);Es=h(yt,"If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at "),ks=i(yt,"A",{href:!0,class:!0});var ft=n(ks);Ps=h(ft,"contact@winhalla.app"),ft.forEach(c),yt.forEach(c),t.forEach(c),Is=l(e),Ws&&Ws.l(e),As=l(e),Cs&&Cs.l(e),xs=A(),this.h()},h(){U.title="Privacy policy | Winhalla",u(v,"class","text-5xl underline mb-4"),u(b,"class","svelte-1y9msar"),u(S,"class","svelte-1y9msar"),u(V,"class","svelte-1y9msar"),u(L,"class","svelte-1y9msar"),u($,"class","svelte-1y9msar"),u(z,"class","svelte-1y9msar"),u(_,"class","svelte-1y9msar"),u(le,"href","https://api.brawlhalla.com"),u(le,"class","svelte-1y9msar"),u(ne,"class","svelte-1y9msar"),u(ye,"class","svelte-1y9msar"),u(ge,"href","https://winhalla.app/deleteAccount"),u(ge,"class","svelte-1y9msar"),u(ve,"id","analytical"),u(ve,"class","svelte-1y9msar"),u(ke,"class","svelte-1y9msar"),u(Ae,"class","svelte-1y9msar"),u(We,"href","/privacy#edit_consent"),u(We,"class","svelte-1y9msar"),u(Se,"class","svelte-1y9msar"),u(He,"id","advertising"),u(He,"class","svelte-1y9msar"),u(qe,"class","svelte-1y9msar"),u(Oe,"class","svelte-1y9msar"),u(ze,"href","/privacy#edit_consent"),u(ze,"class","svelte-1y9msar"),u(Ne,"class","svelte-1y9msar"),u(Qe,"href","https://policies.google.com/technologies/partner-sites"),u(Qe,"class","svelte-1y9msar"),u(Je,"class","svelte-1y9msar"),u(ea,"class","svelte-1y9msar"),u(ra,"href","https://adplayer.pro/privacy"),u(ra,"class","svelte-1y9msar"),u(ta,"class","svelte-1y9msar"),u(ca,"class","svelte-1y9msar"),u(ua,"class","svelte-1y9msar"),u(fa,"class","svelte-1y9msar"),u(xa,"href","/privacy#analytical"),u(xa,"class","svelte-1y9msar"),u(Ra,"href","/privacy#advertising"),u(Ra,"class","svelte-1y9msar"),u(ma,"class","svelte-1y9msar"),u(La,"href","https://www.privacypolicyonline.com/what-are-cookies/"),u(La,"class","underline svelte-1y9msar"),u(Ya,"class","svelte-1y9msar"),u($a,"id","edit_consent"),u($a,"class","svelte-1y9msar"),u(Fa,"class","btn px-2 py-1 mx-6 svelte-1y9msar"),u(Ja,"class","btn px-2 py-1 mx-6 svelte-1y9msar"),u(Xa,"class","btn px-2 py-2 mx-6 svelte-1y9msar"),d(Xa,"text-decoration","none"),u(Xa,"href",es=C+"/auth/downloadData"),u(Xa,"download",""),u(ss,"class","btn px-2 py-1 mx-6 svelte-1y9msar"),u(za,"class",""),u(cs,"href","mailto:contact@winhalla.app"),u(cs,"class","svelte-1y9msar"),u(is,"class","text-2xl"),u(us,"class","svelte-1y9msar"),u(fs,"class","svelte-1y9msar"),u(ms,"class","svelte-1y9msar"),u(ks,"href","mailto:contact@winhalla.app"),u(ks,"class","svelte-1y9msar"),u(bs,"class","svelte-1y9msar"),u(s,"class","h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-1y9msar"),d(s,"font-family","Helvetica Neue,Helvetica,Arial,sans-serif"),d(s,"width","calc(99vw + 2px)")},m(t,o){y(t,a,o),y(t,s,o),f(s,v),f(v,m),f(s,w),f(s,b),f(b,E),f(s,I),f(s,S),f(S,D),f(s,W),f(s,V),f(V,H),f(s,q),f(s,L),f(L,O),f(s,G),f(s,$),f($,N),f(s,j),f(s,z),f(z,F),f(s,M),f(s,_),f(_,J),f(J,K),f(_,Q),f(_,X),f(X,Z),f(_,ee),f(_,ae),f(ae,se),f(_,te),f(_,oe),f(oe,re),f(s,ie),f(s,ne),f(ne,ce),f(ne,le),f(le,he),f(ne,ue),f(s,de),f(s,ye),f(ye,fe),f(s,pe),f(s,ve),f(ve,me),f(ve,ge),f(ge,we),f(ve,be),f(s,Ee),f(s,ke),f(ke,Pe),f(s,Ie),f(s,Ae),f(Ae,xe),f(s,Te),f(s,Se),f(Se,De),f(Se,We),f(We,Ce),f(Se,Re),f(s,Ve),f(s,He),f(He,Ue),f(s,Ye),f(s,qe),f(qe,Le),f(s,Be),f(s,Oe),f(Oe,Ge),f(s,$e),f(s,Ne),f(Ne,je),f(Ne,ze),f(ze,Fe),f(Ne,Me),f(s,_e),f(s,Je),f(Je,Ke),f(Je,Qe),f(Qe,Xe),f(s,Ze),f(s,ea),f(ea,aa),f(s,sa),f(s,ta),f(ta,oa),f(ta,ra),f(ra,ia),f(s,na),f(s,ca),f(ca,la),f(s,ha),f(s,ua),f(ua,da),f(s,ya),f(s,fa),f(fa,pa),f(s,va),f(s,ma),f(ma,ga),f(ga,wa),f(ma,ba),f(ma,Ea),f(Ea,ka),f(ma,Pa),f(ma,Ia),f(Ia,Aa),f(Ia,xa),f(xa,Ta),f(Ia,Sa),f(ma,Da),f(ma,Wa),f(Wa,Ca),f(Wa,Ra),f(Ra,Va),f(Wa,Ha),f(s,Ua),f(s,Ya),f(Ya,qa),f(Ya,La),f(La,Ba),f(Ya,Oa),f(s,Ga),f(s,$a),f($a,Na),f(s,ja),f(s,za),f(za,Fa),f(Fa,Ma),f(za,_a),f(za,Ja),f(Ja,Ka),f(za,Qa),f(za,Xa),f(Xa,Za),f(za,as),f(za,ss),f(ss,ts),f(za,os),f(s,rs),f(s,is),f(is,ns),f(is,cs),f(cs,ls),f(s,hs),f(s,us),f(us,ds),f(s,ys),f(s,fs),f(fs,ps),f(s,vs),f(s,ms),f(ms,gs),f(s,ws),f(s,bs),f(bs,Es),f(bs,ks),f(ks,Ps),y(t,Is,o),Ws&&Ws.m(t,o),y(t,As,o),Cs&&Cs.m(t,o),y(t,xs,o),Ts=!0,Ss||(Ds=[p(Fa,"click",e[6]),p(Ja,"click",e[7]),p(ss,"click",e[8])],Ss=!0)},p(e,[a]){e[0]?Ws?(Ws.p(e,a),1&a&&k(Ws,1)):(Ws=Y(e),Ws.c(),k(Ws,1),Ws.m(As.parentNode,As)):Ws&&(R(),P(Ws,1,1,(()=>{Ws=null})),T()),e[2]?Cs?(Cs.p(e,a),4&a&&k(Cs,1)):(Cs=B(e),Cs.c(),k(Cs,1),Cs.m(xs.parentNode,xs)):Cs&&(R(),P(Cs,1,1,(()=>{Cs=null})),T())},i(e){Ts||(k(Ws),k(Cs),Ts=!0)},o(e){P(Ws),P(Cs),Ts=!1},d(e){e&&c(a),e&&c(s),e&&c(Is),Ws&&Ws.d(e),e&&c(As),Cs&&Cs.d(e),e&&c(xs),Ss=!1,g(Ds)}}}function G(e,a,s){let t,o,r;function i(e){s(0,t=e)}async function n(e){"delete account"===e?(await V("delete","/auth/deleteAccount"),c("account deleted")):"restrict processing"===e&&(await V("patch","/auth/moveAccount"),c("account moved")),s(0,t=void 0)}function c(e){"cookieConsentReset"===e?(document.cookie="hideCookiePopup=;expires=Thu, 01 Jan 1970 00:00:00 GMT",s(1,o="Refresh the page to edit your cookies consent"),s(2,r="One more step")):"account deleted"===e?(s(1,o="Steam data may take up to 30 days to be deleted"),s(2,r="Account successfully deleted")):"account moved"===e&&(s(1,o=""),s(2,r="Data process restriction applied")),setTimeout((()=>{s(1,o=void 0),s(2,r=void 0)}),1e4)}return[t,o,r,i,n,c,()=>c("cookieConsentReset"),()=>i("delete account"),()=>i("restrict processing"),()=>n(t),()=>s(0,t=void 0)]}export default class extends e{constructor(e){super(),a(this,e,G,O,s,{})}}
