import{S as a,i as e,s as r,c as t,f as s,t as o,h as i,j as n,d as c,l,k as h,m as u,n as d,a as y,p as f,r as p,N as v,u as m,w,x as g,y as b,z as E,Q as I,A as P,B as k,C as A,e as S,D as x,E as T,H as W,K as D,L as C}from"./client.f36ae7fd.js";import{I as B}from"./Infos.12b4196d.js";function H(a){let e,r,g,b,E,I,P,k,A,S,x,T,C,B,H,U,q,L,R,G,O,$,j;function N(a,e){return"delete account"===a[0]?Y:"restrict processing"===a[0]?V:void 0}let F=N(a),z=F&&F(a);return{c(){e=t("div"),g=s(),b=t("div"),E=t("div"),I=t("h1"),P=o("Confirm "),k=o(a[0]),A=s(),z&&z.c(),S=s(),x=t("div"),T=t("div"),C=t("div"),B=t("button"),H=o("Confirm "),U=o(a[0]),q=s(),L=t("button"),R=o("Cancel"),this.h()},l(r){e=i(r,"DIV",{class:!0}),n(e).forEach(c),g=l(r),b=i(r,"DIV",{class:!0});var t=n(b);E=i(t,"DIV",{class:!0,style:!0});var s=n(E);I=i(s,"H1",{class:!0});var o=n(I);P=h(o,"Confirm "),k=h(o,a[0]),o.forEach(c),A=l(s),z&&z.l(s),S=l(s),x=i(s,"DIV",{});var u=n(x);T=i(u,"DIV",{class:!0});var d=n(T);C=i(d,"DIV",{class:!0});var y=n(C);B=i(y,"BUTTON",{class:!0,style:!0});var f=n(B);H=h(f,"Confirm "),U=h(f,a[0]),f.forEach(c),q=l(y),L=i(y,"BUTTON",{class:!0,style:!0});var p=n(L);R=h(p,"Cancel"),p.forEach(c),y.forEach(c),d.forEach(c),u.forEach(c),s.forEach(c),t.forEach(c),this.h()},h(){u(e,"class","fixed flex w-screen h-screen bg-black opacity-90 z-40 left-0 top-0"),u(I,"class","text-5xl text-primary"),u(B,"class","button button-brand mt-8"),d(B,"background-color","#fc1870"),u(L,"class","button button-brand mt-8 border ml-5 border-legendary"),d(L,"background-color","#17171a"),d(L,"padding","-1px"),u(C,"class","justify-center w-full flex"),u(T,"class","overflow-auto max-h-screen-50"),u(E,"class","justify-evenly mx-auto mb-auto rounded-lg border bg-background border-primary px-14 py-8"),d(E,"margin-top","20vh"),u(b,"class","fixed flex w-screen h-screen z-50 left-0 top-0")},m(r,t){y(r,e,t),y(r,g,t),y(r,b,t),f(b,E),f(E,I),f(I,P),f(I,k),f(E,A),z&&z.m(E,null),f(E,S),f(E,x),f(x,T),f(T,C),f(C,B),f(B,H),f(B,U),f(C,q),f(C,L),f(L,R),O=!0,$||(j=[p(B,"click",a[3]),p(L,"click",a[4])],$=!0)},p(a,e){(!O||1&e)&&v(k,a[0]),F!==(F=N(a))&&(z&&z.d(1),z=F&&F(a),z&&(z.c(),z.m(E,S))),(!O||1&e)&&v(U,a[0])},i(a){O||(W((()=>{r||(r=m(e,D,{duration:200},!0)),r.run(1)})),W((()=>{G||(G=m(b,D,{duration:200},!0)),G.run(1)})),O=!0)},o(a){r||(r=m(e,D,{duration:200},!1)),r.run(0),G||(G=m(b,D,{duration:200},!1)),G.run(0),O=!1},d(a){a&&c(e),a&&r&&r.end(),a&&c(g),a&&c(b),z&&z.d(),a&&G&&G.end(),$=!1,w(j)}}}function V(a){let e,r,s,l,d,p,v,m,w,g;return{c(){e=t("p"),r=o("Warning: this action will make your account "),s=t("u"),l=o("unusable"),d=o(". "),p=t("br"),v=o("However,\r\n                    we will still keep your account data and will be able to restore it if you ask us "),m=t("a"),w=o("here"),g=o(" with you account ID you can obtain by downloading\r\n                    you data (download it before restricting processing of your account)"),this.h()},l(a){e=i(a,"P",{class:!0});var t=n(e);r=h(t,"Warning: this action will make your account "),s=i(t,"U",{});var o=n(s);l=h(o,"unusable"),o.forEach(c),d=h(t,". "),p=i(t,"BR",{}),v=h(t,"However,\r\n                    we will still keep your account data and will be able to restore it if you ask us "),m=i(t,"A",{href:!0,class:!0});var u=n(m);w=h(u,"here"),u.forEach(c),g=h(t," with you account ID you can obtain by downloading\r\n                    you data (download it before restricting processing of your account)"),t.forEach(c),this.h()},h(){u(m,"href","mailto:contact@winhalla.app"),u(m,"class","svelte-1y9msar"),u(e,"class","ml-4 text-3xl mt-6 svelte-1y9msar")},m(a,t){y(a,e,t),f(e,r),f(e,s),f(s,l),f(e,d),f(e,p),f(e,v),f(e,m),f(m,w),f(e,g)},d(a){a&&c(e)}}}function Y(a){let e,r,s,l,d,p,v,m,w;return{c(){e=t("p"),r=o("Warning: this action is "),s=t("u"),l=o("not cancellable"),d=o(". "),p=t("br"),v=o(" All data will be lost\r\n                    "),m=t("u"),w=o("forever"),this.h()},l(a){e=i(a,"P",{class:!0});var t=n(e);r=h(t,"Warning: this action is "),s=i(t,"U",{});var o=n(s);l=h(o,"not cancellable"),o.forEach(c),d=h(t,". "),p=i(t,"BR",{}),v=h(t," All data will be lost\r\n                    "),m=i(t,"U",{});var u=n(m);w=h(u,"forever"),u.forEach(c),t.forEach(c),this.h()},h(){u(e,"class","ml-4 text-3xl mt-6 svelte-1y9msar")},m(a,t){y(a,e,t),f(e,r),f(e,s),f(s,l),f(e,d),f(e,p),f(e,v),f(e,m),f(m,w)},d(a){a&&c(e)}}}function U(a){let e,r,p,v,m,w,W,D,V,Y,U,q,L,R,G,O,$,j,N,F,z,M,K,Q,_,J,X,Z,aa,ea,ra,ta,sa,oa,ia,na,ca,la,ha,ua,da,ya,fa,pa,va,ma,wa,ga,ba,Ea,Ia,Pa,ka,Aa,Sa,xa,Ta,Wa,Da,Ca,Ba,Ha,Va,Ya,Ua,qa,La,Ra,Ga,Oa,$a,ja,Na,Fa,za,Ma,Ka,Qa,_a,Ja,Xa,Za,ae,ee,re,te,se,oe,ie,ne,ce,le,he,ue,de,ye,fe,pe,ve,me,we,ge,be,Ee,Ie,Pe,ke,Ae,Se,xe,Te,We,De,Ce,Be,He,Ve,Ye,Ue,qe,Le,Re,Ge,Oe,$e,je,Ne,Fe,ze,Me,Ke,Qe,_e,Je,Xe,Ze,ar,er,rr,tr,sr,or,ir=a[0]&&H(a),nr=a[2]&&function(a){let e,r;return e=new B({props:{pushError:a[1],message:a[2]}}),{c(){g(e.$$.fragment)},l(a){b(e.$$.fragment,a)},m(a,t){E(e,a,t),r=!0},p:I,i(a){r||(P(e.$$.fragment,a),r=!0)},o(a){k(e.$$.fragment,a),r=!1},d(a){A(e,a)}}}(a);return{c(){e=s(),r=t("div"),p=t("h1"),v=o("Privacy Policy"),m=s(),w=t("p"),W=o('Winhalla operates the https://winhalla.app website ("Site"), which provides the SERVICE.'),D=s(),V=t("p"),Y=o("This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of\r\n        Personal Information if anyone decided to use our Service, the Site."),U=s(),q=t("p"),L=o('We therefore only use your personal data within the scope of legal regulations, in particular the General Data\r\n        Protection Regulation ("GDPR")'),R=s(),G=t("p"),O=o("If you choose to use our Service, then you agree to the collection and use of information in relation with this\r\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\r\n        use or share your information with anyone except as described in this Privacy Policy."),$=s(),j=t("h2"),N=o("I. Account data"),F=s(),z=t("p"),M=o('To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with\r\n        your Steam Account and clicking on "Accept Terms And Conditions", we automatically create an account containing\r\n        :'),K=s(),Q=t("ul"),_=t("li"),J=o("Your SteamID64"),X=s(),Z=t("li"),aa=o("Your profile picture URL"),ea=s(),ra=t("li"),ta=o("Your username"),sa=s(),oa=t("li"),ia=o("And other data (including but not limited to : your coins number, your quest in progress...) This\r\n            information is internal to the Site, is used only by us and in no case disclosed"),na=s(),ca=t("p"),la=o("Your STEAMID64 may be sent to Brawlhalla's API ("),ha=t("a"),ua=o("https://api.brawlhalla.com"),da=o(") to track your progress in the game and give\r\n        you coins according to your performance"),ya=s(),fa=t("p"),pa=o("Other account data will not be sent, sold, rented, or traded to any third-party."),va=s(),ma=t("p"),wa=o("All your account data is kept until you "),ga=t("a"),ba=o("delete your\r\n        account"),Ea=o(" and\r\n        may be processed by our servers to provide the Service in its entirety"),Ia=s(),Pa=t("p"),ka=o("If you choose to login with Google, you accept that we will store your Email in the top of the data mentioned\r\n        above (excluding SteamID)"),Aa=s(),Sa=t("p"),xa=o("If you choose to login with another provider than Steam, you will be prompted to enter your Brawlhalla ID. By\r\n        submitting the Brawlhalla ID, you certify that you own the account with the Brawlhalla ID you mentioned.\r\n        Otherwise your account and access to the Service may be terminated"),Ta=s(),Wa=t("h2"),Da=o("II. Analytical software"),Ca=s(),Ba=t("p"),Ha=o("We are using - like any other website - an analytical software. This software helps us to understand our traffic\r\n        and its fluctuations"),Va=s(),Ya=t("p"),Ua=o("Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You\r\n        can edit your consent following "),qa=t("a"),La=o("this"),Ra=o(" instructions"),Ga=s(),Oa=t("p"),$a=o("This analytical software can deposits cookies and collect data ; this data is kept strictly\r\n        anonymous. However\r\n        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order\r\n        to allow us to use this data"),ja=s(),Na=t("h2"),Fa=o("III. Advertising"),za=s(),Ma=t("p"),Ka=o("We are using ads, because a website doesn't update and hosts itself! Our ads are provided by third-party services\r\n        (To read our policy about thrd-party services, "),Qa=t("a"),_a=o("click here"),Ja=o(")"),Xa=s(),Za=t("p"),ae=o("We use prupleads as our banner ad provider"),ee=s(),re=t("p"),te=o("You can read their privacy policy here : "),se=t("a"),oe=o("https://purpleads.io/privacy/"),ie=s(),ne=t("p"),ce=o("We also use adplayer.pro as rewarded ads provider."),le=s(),he=t("p"),ue=o("You can read their privacy policy here : "),de=t("a"),ye=o("https://adplayer.pro/privacy"),fe=s(),pe=t("h2"),ve=o("IV. Cookies"),me=s(),we=t("p"),ge=o("We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly\r\n        used an anonymous unique identifier. They are stored in your computer's hard drive"),be=s(),Ee=t("p"),Ie=o("We use cookies for :"),Pe=s(),ke=t("ul"),Ae=t("li"),Se=o("Authenticating : required, else you cannot use most of the Site's functionalities"),xe=s(),Te=t("li"),We=o("Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are\r\n            required, since they will have a major impact on your experience"),De=s(),Ce=t("li"),Be=o("Analytical : as said "),He=t("a"),Ve=o("here"),Ye=o(", these cookies are not required an can be\r\n            disabled"),Ue=s(),qe=t("p"),Le=o("For more general information on cookies, please read "),Re=t("a"),Ge=o('"What Are Cookies"'),Oe=o("."),$e=s(),je=t("h2"),Ne=o("VI. Changes to This Privacy Policy"),Fe=s(),ze=t("p"),Me=o("We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\r\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\r\n        change in the Site. These changes are effective immediately, after they are posted on this page."),Ke=s(),Qe=t("h2"),_e=o("VII. Contact Us"),Je=s(),Xe=t("p"),Ze=o("If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at "),ar=t("a"),er=o("contact@winhalla.app"),rr=s(),ir&&ir.c(),tr=s(),nr&&nr.c(),sr=S(),this.h()},l(a){x('[data-svelte="svelte-88sy1r"]',document.head).forEach(c),e=l(a),r=i(a,"DIV",{class:!0,style:!0});var t=n(r);p=i(t,"H1",{class:!0});var s=n(p);v=h(s,"Privacy Policy"),s.forEach(c),m=l(t),w=i(t,"P",{class:!0});var o=n(w);W=h(o,'Winhalla operates the https://winhalla.app website ("Site"), which provides the SERVICE.'),o.forEach(c),D=l(t),V=i(t,"P",{class:!0});var u=n(V);Y=h(u,"This page is used to inform the Site visitors regarding our policies with the collection, use, and disclosure of\r\n        Personal Information if anyone decided to use our Service, the Site."),u.forEach(c),U=l(t),q=i(t,"P",{class:!0});var d=n(q);L=h(d,'We therefore only use your personal data within the scope of legal regulations, in particular the General Data\r\n        Protection Regulation ("GDPR")'),d.forEach(c),R=l(t),G=i(t,"P",{class:!0});var y=n(G);O=h(y,"If you choose to use our Service, then you agree to the collection and use of information in relation with this\r\n        policy. The Personal Information that we collect are used for providing and improving the Service. We will not\r\n        use or share your information with anyone except as described in this Privacy Policy."),y.forEach(c),$=l(t),j=i(t,"H2",{class:!0});var f=n(j);N=h(f,"I. Account data"),f.forEach(c),F=l(t),z=i(t,"P",{class:!0});var g=n(z);M=h(g,'To access certain functionalities in the Site, you may have to login with a Steam Account. By logging in with\r\n        your Steam Account and clicking on "Accept Terms And Conditions", we automatically create an account containing\r\n        :'),g.forEach(c),K=l(t),Q=i(t,"UL",{class:!0});var b=n(Q);_=i(b,"LI",{});var E=n(_);J=h(E,"Your SteamID64"),E.forEach(c),X=l(b),Z=i(b,"LI",{});var I=n(Z);aa=h(I,"Your profile picture URL"),I.forEach(c),ea=l(b),ra=i(b,"LI",{});var P=n(ra);ta=h(P,"Your username"),P.forEach(c),sa=l(b),oa=i(b,"LI",{});var k=n(oa);ia=h(k,"And other data (including but not limited to : your coins number, your quest in progress...) This\r\n            information is internal to the Site, is used only by us and in no case disclosed"),k.forEach(c),b.forEach(c),na=l(t),ca=i(t,"P",{class:!0});var A=n(ca);la=h(A,"Your STEAMID64 may be sent to Brawlhalla's API ("),ha=i(A,"A",{href:!0,class:!0});var T=n(ha);ua=h(T,"https://api.brawlhalla.com"),T.forEach(c),da=h(A,") to track your progress in the game and give\r\n        you coins according to your performance"),A.forEach(c),ya=l(t),fa=i(t,"P",{class:!0});var C=n(fa);pa=h(C,"Other account data will not be sent, sold, rented, or traded to any third-party."),C.forEach(c),va=l(t),ma=i(t,"P",{id:!0,class:!0});var B=n(ma);wa=h(B,"All your account data is kept until you "),ga=i(B,"A",{href:!0,class:!0});var H=n(ga);ba=h(H,"delete your\r\n        account"),H.forEach(c),Ea=h(B," and\r\n        may be processed by our servers to provide the Service in its entirety"),B.forEach(c),Ia=l(t),Pa=i(t,"P",{class:!0});var or=n(Pa);ka=h(or,"If you choose to login with Google, you accept that we will store your Email in the top of the data mentioned\r\n        above (excluding SteamID)"),or.forEach(c),Aa=l(t),Sa=i(t,"P",{class:!0});var cr=n(Sa);xa=h(cr,"If you choose to login with another provider than Steam, you will be prompted to enter your Brawlhalla ID. By\r\n        submitting the Brawlhalla ID, you certify that you own the account with the Brawlhalla ID you mentioned.\r\n        Otherwise your account and access to the Service may be terminated"),cr.forEach(c),Ta=l(t),Wa=i(t,"H2",{class:!0});var lr=n(Wa);Da=h(lr,"II. Analytical software"),lr.forEach(c),Ca=l(t),Ba=i(t,"P",{class:!0});var hr=n(Ba);Ha=h(hr,"We are using - like any other website - an analytical software. This software helps us to understand our traffic\r\n        and its fluctuations"),hr.forEach(c),Va=l(t),Ya=i(t,"P",{class:!0});var ur=n(Ya);Ua=h(ur,"Upon your first visit on the Site, we will ask for your consent regarding (among others) analytical software. You\r\n        can edit your consent following "),qa=i(ur,"A",{href:!0,class:!0});var dr=n(qa);La=h(dr,"this"),dr.forEach(c),Ra=h(ur," instructions"),ur.forEach(c),Ga=l(t),Oa=i(t,"P",{id:!0,class:!0});var yr=n(Oa);$a=h(yr,"This analytical software can deposits cookies and collect data ; this data is kept strictly\r\n        anonymous. However\r\n        this data is sent to Google Analytics which will process the data (and may process it outside the EEE) in order\r\n        to allow us to use this data"),yr.forEach(c),ja=l(t),Na=i(t,"H2",{class:!0});var fr=n(Na);Fa=h(fr,"III. Advertising"),fr.forEach(c),za=l(t),Ma=i(t,"P",{class:!0});var pr=n(Ma);Ka=h(pr,"We are using ads, because a website doesn't update and hosts itself! Our ads are provided by third-party services\r\n        (To read our policy about thrd-party services, "),Qa=i(pr,"A",{href:!0,class:!0});var vr=n(Qa);_a=h(vr,"click here"),vr.forEach(c),Ja=h(pr,")"),pr.forEach(c),Xa=l(t),Za=i(t,"P",{class:!0});var mr=n(Za);ae=h(mr,"We use prupleads as our banner ad provider"),mr.forEach(c),ee=l(t),re=i(t,"P",{class:!0});var wr=n(re);te=h(wr,"You can read their privacy policy here : "),se=i(wr,"A",{href:!0,class:!0});var gr=n(se);oe=h(gr,"https://purpleads.io/privacy/"),gr.forEach(c),wr.forEach(c),ie=l(t),ne=i(t,"P",{class:!0});var br=n(ne);ce=h(br,"We also use adplayer.pro as rewarded ads provider."),br.forEach(c),le=l(t),he=i(t,"P",{class:!0});var Er=n(he);ue=h(Er,"You can read their privacy policy here : "),de=i(Er,"A",{href:!0,class:!0});var Ir=n(de);ye=h(Ir,"https://adplayer.pro/privacy"),Ir.forEach(c),Er.forEach(c),fe=l(t),pe=i(t,"H2",{class:!0});var Pr=n(pe);ve=h(Pr,"IV. Cookies"),Pr.forEach(c),me=l(t),we=i(t,"P",{class:!0});var kr=n(we);ge=h(kr,"We are using - like any other website - cookies. Cookies are files with small amount of data that is commonly\r\n        used an anonymous unique identifier. They are stored in your computer's hard drive"),kr.forEach(c),be=l(t),Ee=i(t,"P",{class:!0});var Ar=n(Ee);Ie=h(Ar,"We use cookies for :"),Ar.forEach(c),Pe=l(t),ke=i(t,"UL",{class:!0});var Sr=n(ke);Ae=i(Sr,"LI",{});var xr=n(Ae);Se=h(xr,"Authenticating : required, else you cannot use most of the Site's functionalities"),xr.forEach(c),xe=l(Sr),Te=i(Sr,"LI",{});var Tr=n(Te);We=h(Tr,"Functionalities : used - among others - to determine if new notifications/alerts has arrived, these are\r\n            required, since they will have a major impact on your experience"),Tr.forEach(c),De=l(Sr),Ce=i(Sr,"LI",{});var Wr=n(Ce);Be=h(Wr,"Analytical : as said "),He=i(Wr,"A",{href:!0,class:!0});var Dr=n(He);Ve=h(Dr,"here"),Dr.forEach(c),Ye=h(Wr,", these cookies are not required an can be\r\n            disabled"),Wr.forEach(c),Sr.forEach(c),Ue=l(t),qe=i(t,"P",{class:!0});var Cr=n(qe);Le=h(Cr,"For more general information on cookies, please read "),Re=i(Cr,"A",{href:!0,class:!0});var Br=n(Re);Ge=h(Br,'"What Are Cookies"'),Br.forEach(c),Oe=h(Cr,"."),Cr.forEach(c),$e=l(t),je=i(t,"H2",{class:!0});var Hr=n(je);Ne=h(Hr,"VI. Changes to This Privacy Policy"),Hr.forEach(c),Fe=l(t),ze=i(t,"P",{class:!0});var Vr=n(ze);Me=h(Vr,"We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any\r\n        changes. We will notify you of any changes by posting the new Privacy Policy on this page and notifying of these\r\n        change in the Site. These changes are effective immediately, after they are posted on this page."),Vr.forEach(c),Ke=l(t),Qe=i(t,"H2",{class:!0});var Yr=n(Qe);_e=h(Yr,"VII. Contact Us"),Yr.forEach(c),Je=l(t),Xe=i(t,"P",{class:!0});var Ur=n(Xe);Ze=h(Ur,"If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at "),ar=i(Ur,"A",{href:!0,class:!0});var qr=n(ar);er=h(qr,"contact@winhalla.app"),qr.forEach(c),Ur.forEach(c),t.forEach(c),rr=l(a),ir&&ir.l(a),tr=l(a),nr&&nr.l(a),sr=S(),this.h()},h(){document.title="Privacy policy | Winhalla",u(p,"class","text-5xl underline mb-4"),u(w,"class","svelte-1y9msar"),u(V,"class","svelte-1y9msar"),u(q,"class","svelte-1y9msar"),u(G,"class","svelte-1y9msar"),u(j,"class","svelte-1y9msar"),u(z,"class","svelte-1y9msar"),u(Q,"class","svelte-1y9msar"),u(ha,"href","https://api.brawlhalla.com"),u(ha,"class","svelte-1y9msar"),u(ca,"class","svelte-1y9msar"),u(fa,"class","svelte-1y9msar"),u(ga,"href","https://winhalla.app/deleteAccount"),u(ga,"class","svelte-1y9msar"),u(ma,"id","analytical"),u(ma,"class","svelte-1y9msar"),u(Pa,"class","svelte-1y9msar"),u(Sa,"class","svelte-1y9msar"),u(Wa,"class","svelte-1y9msar"),u(Ba,"class","svelte-1y9msar"),u(qa,"href","/privacy#edit_consent"),u(qa,"class","svelte-1y9msar"),u(Ya,"class","svelte-1y9msar"),u(Oa,"id","advertising"),u(Oa,"class","svelte-1y9msar"),u(Na,"class","svelte-1y9msar"),u(Qa,"href","/terms#3rdParty"),u(Qa,"class","svelte-1y9msar"),u(Ma,"class","svelte-1y9msar"),u(Za,"class","svelte-1y9msar"),u(se,"href","https://adplayer.pro/privacy"),u(se,"class","svelte-1y9msar"),u(re,"class","svelte-1y9msar"),u(ne,"class","svelte-1y9msar"),u(de,"href","https://adplayer.pro/privacy"),u(de,"class","svelte-1y9msar"),u(he,"class","svelte-1y9msar"),u(pe,"class","svelte-1y9msar"),u(we,"class","svelte-1y9msar"),u(Ee,"class","svelte-1y9msar"),u(He,"href","/privacy#analytical"),u(He,"class","svelte-1y9msar"),u(ke,"class","svelte-1y9msar"),u(Re,"href","https://www.privacypolicyonline.com/what-are-cookies/"),u(Re,"class","underline svelte-1y9msar"),u(qe,"class","svelte-1y9msar"),u(je,"class","svelte-1y9msar"),u(ze,"class","svelte-1y9msar"),u(Qe,"class","svelte-1y9msar"),u(ar,"href","mailto:contact@winhalla.app"),u(ar,"class","svelte-1y9msar"),u(Xe,"class","svelte-1y9msar"),u(r,"class","h-full div lg:px-100 px-5 lg:pt-30 pb-30 pt-8  svelte-1y9msar"),d(r,"font-family","Helvetica Neue,Helvetica,Arial,sans-serif"),d(r,"width","calc(99vw + 2px)")},m(a,t){y(a,e,t),y(a,r,t),f(r,p),f(p,v),f(r,m),f(r,w),f(w,W),f(r,D),f(r,V),f(V,Y),f(r,U),f(r,q),f(q,L),f(r,R),f(r,G),f(G,O),f(r,$),f(r,j),f(j,N),f(r,F),f(r,z),f(z,M),f(r,K),f(r,Q),f(Q,_),f(_,J),f(Q,X),f(Q,Z),f(Z,aa),f(Q,ea),f(Q,ra),f(ra,ta),f(Q,sa),f(Q,oa),f(oa,ia),f(r,na),f(r,ca),f(ca,la),f(ca,ha),f(ha,ua),f(ca,da),f(r,ya),f(r,fa),f(fa,pa),f(r,va),f(r,ma),f(ma,wa),f(ma,ga),f(ga,ba),f(ma,Ea),f(r,Ia),f(r,Pa),f(Pa,ka),f(r,Aa),f(r,Sa),f(Sa,xa),f(r,Ta),f(r,Wa),f(Wa,Da),f(r,Ca),f(r,Ba),f(Ba,Ha),f(r,Va),f(r,Ya),f(Ya,Ua),f(Ya,qa),f(qa,La),f(Ya,Ra),f(r,Ga),f(r,Oa),f(Oa,$a),f(r,ja),f(r,Na),f(Na,Fa),f(r,za),f(r,Ma),f(Ma,Ka),f(Ma,Qa),f(Qa,_a),f(Ma,Ja),f(r,Xa),f(r,Za),f(Za,ae),f(r,ee),f(r,re),f(re,te),f(re,se),f(se,oe),f(r,ie),f(r,ne),f(ne,ce),f(r,le),f(r,he),f(he,ue),f(he,de),f(de,ye),f(r,fe),f(r,pe),f(pe,ve),f(r,me),f(r,we),f(we,ge),f(r,be),f(r,Ee),f(Ee,Ie),f(r,Pe),f(r,ke),f(ke,Ae),f(Ae,Se),f(ke,xe),f(ke,Te),f(Te,We),f(ke,De),f(ke,Ce),f(Ce,Be),f(Ce,He),f(He,Ve),f(Ce,Ye),f(r,Ue),f(r,qe),f(qe,Le),f(qe,Re),f(Re,Ge),f(qe,Oe),f(r,$e),f(r,je),f(je,Ne),f(r,Fe),f(r,ze),f(ze,Me),f(r,Ke),f(r,Qe),f(Qe,_e),f(r,Je),f(r,Xe),f(Xe,Ze),f(Xe,ar),f(ar,er),y(a,rr,t),ir&&ir.m(a,t),y(a,tr,t),nr&&nr.m(a,t),y(a,sr,t),or=!0},p(a,[e]){a[0]?ir?(ir.p(a,e),1&e&&P(ir,1)):(ir=H(a),ir.c(),P(ir,1),ir.m(tr.parentNode,tr)):ir&&(C(),k(ir,1,1,(()=>{ir=null})),T()),a[2]&&nr.p(a,e)},i(a){or||(P(ir),P(nr),or=!0)},o(a){k(ir),k(nr),or=!1},d(a){a&&c(e),a&&c(r),a&&c(rr),ir&&ir.d(a),a&&c(tr),nr&&nr.d(a),a&&c(sr)}}}function q(a,e,r){let t;return[t,undefined,undefined,()=>confirm(t),()=>r(0,t=void 0)]}export default class extends a{constructor(a){super(),e(this,a,q,U,r,{})}}