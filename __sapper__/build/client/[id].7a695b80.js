import{S as t,i as a,s,t as c,e,h as o,c as n,g as r,d as i,j as p,l as h,k as l,n as u}from"./client.bbdb746f.js";function d(t){let a,s,d;return{c(){a=c("Redirecting to "),s=e("a"),d=c("https://winhalla.appspot.com/create-account"),this.h()},l(t){a=o(t,"Redirecting to "),s=n(t,"A",{href:!0});var c=r(s);d=o(c,"https://winhalla.appspot.com/create-account"),c.forEach(i),this.h()},h(){p(s,"href","https://winhalla.appspot.com/create-account")},m(t,c){h(t,a,c),h(t,s,c),l(s,d)},p:u,i:u,o:u,d(t){t&&i(a),t&&i(s)}}}async function f({params:t,query:a}){let s=t.id;this.redirect(302,`create-account?link=https://winhalla.appspot.com/link/${s}`)}export default class extends t{constructor(t){super(),a(this,t,null,d,s,{})}}export{f as preload};
