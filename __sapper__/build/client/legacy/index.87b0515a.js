import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as element, g as space, t as text, h as svg_element, q as query_selector_all, j as claim_element, k as detach_dev, l as claim_space, m as children, n as claim_text, o as attr_dev, p as add_location, r as append_dev, u as insert_dev, v as noop, w as validate_slots, x as apiUrl } from './client.4a692f1b.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\routes\\index.svelte";

function create_fragment(ctx) {
  var meta;
  var link;
  var t0;
  var div17;
  var div3;
  var div0;
  var h1;
  var t1;
  var b0;
  var t2;
  var t3;
  var br;
  var t4;
  var b1;
  var t5;
  var t6;
  var div1;
  var video;
  var source;
  var source_src_value;
  var t7;
  var div2;
  var p0;
  var t8;
  var t9;
  var svg;
  var path;
  var t10;
  var div16;
  var div13;
  var div6;
  var div5;
  var p1;
  var t11;
  var t12;
  var div4;
  var p2;
  var b2;
  var t13;
  var t14;
  var t15;
  var p3;
  var t16;
  var t17;
  var div9;
  var div8;
  var p4;
  var t18;
  var t19;
  var div7;
  var p5;
  var b3;
  var t20;
  var t21;
  var t22;
  var p6;
  var t23;
  var t24;
  var div12;
  var div11;
  var p7;
  var t25;
  var t26;
  var div10;
  var p8;
  var b4;
  var t27;
  var t28;
  var t29;
  var p9;
  var t30;
  var a0;
  var t31;
  var t32;
  var t33;
  var div15;
  var h2;
  var t34;
  var t35;
  var a1;
  var t36;
  var a1_href_value;
  var t37;
  var div14;
  var a2;
  var t38;
  var a2_href_value;
  var block = {
    c: function create() {
      meta = element("meta");
      link = element("link");
      t0 = space();
      div17 = element("div");
      div3 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t1 = text("PLAY\r\n                ");
      b0 = element("b");
      t2 = text("BRAWLHALLA");
      t3 = space();
      br = element("br");
      t4 = text("\r\n                EARN\r\n                ");
      b1 = element("b");
      t5 = text("REWARDS");
      t6 = space();
      div1 = element("div");
      video = element("video");
      source = element("source");
      t7 = space();
      div2 = element("div");
      p0 = element("p");
      t8 = text("Learn more");
      t9 = space();
      svg = svg_element("svg");
      path = svg_element("path");
      t10 = space();
      div16 = element("div");
      div13 = element("div");
      div6 = element("div");
      div5 = element("div");
      p1 = element("p");
      t11 = text("1");
      t12 = space();
      div4 = element("div");
      p2 = element("p");
      b2 = element("b");
      t13 = text("Choose");
      t14 = text("\r\n                            a game mode");
      t15 = space();
      p3 = element("p");
      t16 = text("FFA, solo, 2vs2...");
      t17 = space();
      div9 = element("div");
      div8 = element("div");
      p4 = element("p");
      t18 = text("2");
      t19 = space();
      div7 = element("div");
      p5 = element("p");
      b3 = element("b");
      t20 = text("Complete");
      t21 = text("\r\n                            the goal of the game mode");
      t22 = space();
      p6 = element("p");
      t23 = text("Quests, win goals...");
      t24 = space();
      div12 = element("div");
      div11 = element("div");
      p7 = element("p");
      t25 = text("3");
      t26 = space();
      div10 = element("div");
      p8 = element("p");
      b4 = element("b");
      t27 = text("Earn");
      t28 = text("\r\n                            rewards");
      t29 = space();
      p9 = element("p");
      t30 = text("Earn coins that you will be able to spend in the\r\n                            ");
      a0 = element("a");
      t31 = text("shop");
      t32 = text("\r\n                            !");
      t33 = space();
      div15 = element("div");
      h2 = element("h2");
      t34 = text("Ready? Start now!");
      t35 = space();
      a1 = element("a");
      t36 = text("Create Account");
      t37 = space();
      div14 = element("div");
      a2 = element("a");
      t38 = text("Already a member? Login");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-19tqu7o\"]", document.head);
      meta = claim_element(head_nodes, "META", {
        name: true,
        content: true
      });
      link = claim_element(head_nodes, "LINK", {
        rel: true,
        href: true
      });
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div17 = claim_element(nodes, "DIV", {
        class: true
      });
      var div17_nodes = children(div17);
      div3 = claim_element(div17_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "PLAY\r\n                ");
      b0 = claim_element(h1_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t2 = claim_text(b0_nodes, "BRAWLHALLA");
      b0_nodes.forEach(detach_dev);
      t3 = claim_space(h1_nodes);
      br = claim_element(h1_nodes, "BR", {});
      t4 = claim_text(h1_nodes, "\r\n                EARN\r\n                ");
      b1 = claim_element(h1_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t5 = claim_text(b1_nodes, "REWARDS");
      b1_nodes.forEach(detach_dev);
      h1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      video = claim_element(div1_nodes, "VIDEO", {
        class: true,
        preload: true,
        loop: true,
        playsinline: true,
        autoplay: true,
        muted: true
      });
      var video_nodes = children(video);
      source = claim_element(video_nodes, "SOURCE", {
        src: true,
        type: true
      });
      video_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t7 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      p0 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t8 = claim_text(p0_nodes, "Learn more");
      p0_nodes.forEach(detach_dev);
      t9 = claim_space(div2_nodes);
      svg = claim_element(div2_nodes, "svg", {
        class: true,
        xmlns: true,
        viewBox: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t10 = claim_space(div17_nodes);
      div16 = claim_element(div17_nodes, "DIV", {
        class: true
      });
      var div16_nodes = children(div16);
      div13 = claim_element(div16_nodes, "DIV", {
        class: true
      });
      var div13_nodes = children(div13);
      div6 = claim_element(div13_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      p1 = claim_element(div5_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t11 = claim_text(p1_nodes, "1");
      p1_nodes.forEach(detach_dev);
      t12 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      p2 = claim_element(div4_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      b2 = claim_element(p2_nodes, "B", {
        class: true
      });
      var b2_nodes = children(b2);
      t13 = claim_text(b2_nodes, "Choose");
      b2_nodes.forEach(detach_dev);
      t14 = claim_text(p2_nodes, "\r\n                            a game mode");
      p2_nodes.forEach(detach_dev);
      t15 = claim_space(div4_nodes);
      p3 = claim_element(div4_nodes, "P", {
        class: true
      });
      var p3_nodes = children(p3);
      t16 = claim_text(p3_nodes, "FFA, solo, 2vs2...");
      p3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      t17 = claim_space(div13_nodes);
      div9 = claim_element(div13_nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      div8 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      p4 = claim_element(div8_nodes, "P", {
        class: true
      });
      var p4_nodes = children(p4);
      t18 = claim_text(p4_nodes, "2");
      p4_nodes.forEach(detach_dev);
      t19 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      p5 = claim_element(div7_nodes, "P", {
        class: true
      });
      var p5_nodes = children(p5);
      b3 = claim_element(p5_nodes, "B", {
        class: true
      });
      var b3_nodes = children(b3);
      t20 = claim_text(b3_nodes, "Complete");
      b3_nodes.forEach(detach_dev);
      t21 = claim_text(p5_nodes, "\r\n                            the goal of the game mode");
      p5_nodes.forEach(detach_dev);
      t22 = claim_space(div7_nodes);
      p6 = claim_element(div7_nodes, "P", {
        class: true
      });
      var p6_nodes = children(p6);
      t23 = claim_text(p6_nodes, "Quests, win goals...");
      p6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      div9_nodes.forEach(detach_dev);
      t24 = claim_space(div13_nodes);
      div12 = claim_element(div13_nodes, "DIV", {});
      var div12_nodes = children(div12);
      div11 = claim_element(div12_nodes, "DIV", {
        class: true
      });
      var div11_nodes = children(div11);
      p7 = claim_element(div11_nodes, "P", {
        class: true
      });
      var p7_nodes = children(p7);
      t25 = claim_text(p7_nodes, "3");
      p7_nodes.forEach(detach_dev);
      t26 = claim_space(div11_nodes);
      div10 = claim_element(div11_nodes, "DIV", {
        class: true
      });
      var div10_nodes = children(div10);
      p8 = claim_element(div10_nodes, "P", {
        class: true
      });
      var p8_nodes = children(p8);
      b4 = claim_element(p8_nodes, "B", {
        class: true
      });
      var b4_nodes = children(b4);
      t27 = claim_text(b4_nodes, "Earn");
      b4_nodes.forEach(detach_dev);
      t28 = claim_text(p8_nodes, "\r\n                            rewards");
      p8_nodes.forEach(detach_dev);
      t29 = claim_space(div10_nodes);
      p9 = claim_element(div10_nodes, "P", {
        class: true
      });
      var p9_nodes = children(p9);
      t30 = claim_text(p9_nodes, "Earn coins that you will be able to spend in the\r\n                            ");
      a0 = claim_element(p9_nodes, "A", {
        class: true,
        href: true
      });
      var a0_nodes = children(a0);
      t31 = claim_text(a0_nodes, "shop");
      a0_nodes.forEach(detach_dev);
      t32 = claim_text(p9_nodes, "\r\n                            !");
      p9_nodes.forEach(detach_dev);
      div10_nodes.forEach(detach_dev);
      div11_nodes.forEach(detach_dev);
      div12_nodes.forEach(detach_dev);
      div13_nodes.forEach(detach_dev);
      t33 = claim_space(div16_nodes);
      div15 = claim_element(div16_nodes, "DIV", {
        class: true
      });
      var div15_nodes = children(div15);
      h2 = claim_element(div15_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t34 = claim_text(h2_nodes, "Ready? Start now!");
      h2_nodes.forEach(detach_dev);
      t35 = claim_space(div15_nodes);
      a1 = claim_element(div15_nodes, "A", {
        class: true,
        href: true
      });
      var a1_nodes = children(a1);
      t36 = claim_text(a1_nodes, "Create Account");
      a1_nodes.forEach(detach_dev);
      t37 = claim_space(div15_nodes);
      div14 = claim_element(div15_nodes, "DIV", {
        class: true
      });
      var div14_nodes = children(div14);
      a2 = claim_element(div14_nodes, "A", {
        class: true,
        href: true
      });
      var a2_nodes = children(a2);
      t38 = claim_text(a2_nodes, "Already a member? Login");
      a2_nodes.forEach(detach_dev);
      div14_nodes.forEach(detach_dev);
      div15_nodes.forEach(detach_dev);
      div16_nodes.forEach(detach_dev);
      div17_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Play Brawlhalla. Earn rewards. - Winhalla";
      attr_dev(meta, "name", "description");
      attr_dev(meta, "content", "Play Brawlhalla. Earn rewards | Legit & Free Battle Pass,\r\n        Mammoth Coins, Season Packs and more! | Winhalla home page");
      add_location(meta, file, 41, 4, 2294);
      attr_dev(link, "rel", "canonical");
      attr_dev(link, "href", "https://winhalla.app");
      add_location(link, file, 46, 4, 2483);
      attr_dev(b0, "class", "text-accent");
      add_location(b0, file, 53, 16, 2770);
      add_location(br, file, 54, 16, 2825);
      attr_dev(b1, "class", "text-accent");
      add_location(b1, file, 56, 16, 2871);
      attr_dev(h1, "class", "text-6xl lg:text-8xl text-shadow-base");
      add_location(h1, file, 51, 12, 2680);
      attr_dev(div0, "class", "absolute top-7 left-7 lg:left-24 lg:top-10 z-10");
      add_location(div0, file, 50, 8, 2605);
      if (source.src !== (source_src_value = "/assets/video/brawlhalla-gameplay.mp4")) attr_dev(source, "src", source_src_value);
      attr_dev(source, "type", "video/mp4");
      add_location(source, file, 69, 16, 3288);
      attr_dev(video, "class", "w-full h-full object-cover");
      attr_dev(video, "preload", "true");
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.muted = true;
      add_location(video, file, 62, 12, 3079);
      attr_dev(div1, "class", "video-container relative z-0 overflow-hidden w-full\r\n            h-screen-60 lg:h-screen svelte-xt4yaa");
      add_location(div1, file, 59, 8, 2950);
      attr_dev(p0, "class", "text-2xl");
      add_location(p0, file, 78, 12, 3570);
      attr_dev(path, "d", "M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707\r\n                    7.778-7.778-1.414-1.414L11 16.172V0H9z");
      add_location(path, file, 83, 16, 3804);
      attr_dev(svg, "class", "fill-current w-7 h-7 mt-1 mb-3 mx-auto arrow-svg svelte-xt4yaa");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "viewBox", "0 0 20 20");
      add_location(svg, file, 79, 12, 3618);
      attr_dev(div2, "class", "tip absolute left-0 right-0 bottom-20 text-center hidden\r\n            lg:block");
      add_location(div2, file, 75, 8, 3451);
      attr_dev(div3, "class", "relative");
      add_location(div3, file, 49, 4, 2573);
      attr_dev(p1, "class", "text-9xl");
      add_location(p1, file, 97, 20, 4388);
      attr_dev(b2, "class", "text-primary font-normal");
      add_location(b2, file, 100, 28, 4535);
      attr_dev(p2, "class", "text-3xl leading-9");
      add_location(p2, file, 99, 24, 4475);
      attr_dev(p3, "class", "text-light text-xl pt-1");
      add_location(p3, file, 103, 24, 4678);
      attr_dev(div4, "class", "");
      add_location(div4, file, 98, 20, 4435);
      attr_dev(div5, "class", "card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary");
      add_location(div5, file, 94, 16, 4221);
      attr_dev(div6, "class", "pb-10 lg:pb-0");
      add_location(div6, file, 93, 12, 4176);
      attr_dev(p4, "class", "text-9xl");
      add_location(p4, file, 113, 20, 5089);
      attr_dev(b3, "class", "text-primary font-normal");
      add_location(b3, file, 116, 28, 5236);
      attr_dev(p5, "class", "text-3xl leading-9");
      add_location(p5, file, 115, 24, 5176);
      attr_dev(p6, "class", "text-light text-xl pt-1");
      add_location(p6, file, 119, 24, 5395);
      attr_dev(div7, "class", "");
      add_location(div7, file, 114, 20, 5136);
      attr_dev(div8, "class", "card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary");
      add_location(div8, file, 110, 16, 4922);
      attr_dev(div9, "class", "pb-10 lg:pb-0");
      add_location(div9, file, 109, 12, 4877);
      attr_dev(p7, "class", "text-9xl");
      add_location(p7, file, 129, 20, 5786);
      attr_dev(b4, "class", "text-primary font-normal");
      add_location(b4, file, 132, 28, 5933);
      attr_dev(p8, "class", "text-3xl leading-9");
      add_location(p8, file, 131, 24, 5873);
      attr_dev(a0, "class", "underline");
      attr_dev(a0, "href", "/shop");
      add_location(a0, file, 137, 28, 6213);
      attr_dev(p9, "class", "text-light text-xl pt-1");
      add_location(p9, file, 135, 24, 6070);
      attr_dev(div10, "class", "");
      add_location(div10, file, 130, 20, 5833);
      attr_dev(div11, "class", "card p-4 w-64 h-84 hover:shadow-card-hover border\r\n                    border-transparent hover:border-primary");
      add_location(div11, file, 126, 16, 5619);
      add_location(div12, file, 125, 12, 5596);
      attr_dev(div13, "class", "cards text-center lg:py-0 lg:mx-30 flex flex-col lg:flex-row\r\n            items-center lg:justify-around svelte-xt4yaa");
      add_location(div13, file, 90, 8, 4031);
      attr_dev(h2, "class", "text-5xl lg:text-7xl");
      add_location(h2, file, 145, 12, 6489);
      attr_dev(a1, "class", "button button-brand mt-4");
      attr_dev(a1, "href", a1_href_value = "" + (apiUrl + "/auth/login"));
      add_location(a1, file, 146, 12, 6558);
      attr_dev(a2, "class", "text-base");
      attr_dev(a2, "href", a2_href_value = "" + (apiUrl + "/auth/login"));
      add_location(a2, file, 150, 16, 6732);
      attr_dev(div14, "class", "pt-1 text-light");
      add_location(div14, file, 149, 12, 6685);
      attr_dev(div15, "class", "join-us w-full text-center mt-15 lg:mt-20 pb-10");
      add_location(div15, file, 144, 8, 6414);
      attr_dev(div16, "class", "pt-10");
      add_location(div16, file, 89, 4, 4002);
      attr_dev(div17, "class", "");
      add_location(div17, file, 48, 0, 2553);
    },
    m: function mount(target, anchor) {
      append_dev(document.head, meta);
      append_dev(document.head, link);
      insert_dev(target, t0, anchor);
      insert_dev(target, div17, anchor);
      append_dev(div17, div3);
      append_dev(div3, div0);
      append_dev(div0, h1);
      append_dev(h1, t1);
      append_dev(h1, b0);
      append_dev(b0, t2);
      append_dev(h1, t3);
      append_dev(h1, br);
      append_dev(h1, t4);
      append_dev(h1, b1);
      append_dev(b1, t5);
      append_dev(div3, t6);
      append_dev(div3, div1);
      append_dev(div1, video);
      append_dev(video, source);
      append_dev(div3, t7);
      append_dev(div3, div2);
      append_dev(div2, p0);
      append_dev(p0, t8);
      append_dev(div2, t9);
      append_dev(div2, svg);
      append_dev(svg, path);
      append_dev(div17, t10);
      append_dev(div17, div16);
      append_dev(div16, div13);
      append_dev(div13, div6);
      append_dev(div6, div5);
      append_dev(div5, p1);
      append_dev(p1, t11);
      append_dev(div5, t12);
      append_dev(div5, div4);
      append_dev(div4, p2);
      append_dev(p2, b2);
      append_dev(b2, t13);
      append_dev(p2, t14);
      append_dev(div4, t15);
      append_dev(div4, p3);
      append_dev(p3, t16);
      append_dev(div13, t17);
      append_dev(div13, div9);
      append_dev(div9, div8);
      append_dev(div8, p4);
      append_dev(p4, t18);
      append_dev(div8, t19);
      append_dev(div8, div7);
      append_dev(div7, p5);
      append_dev(p5, b3);
      append_dev(b3, t20);
      append_dev(p5, t21);
      append_dev(div7, t22);
      append_dev(div7, p6);
      append_dev(p6, t23);
      append_dev(div13, t24);
      append_dev(div13, div12);
      append_dev(div12, div11);
      append_dev(div11, p7);
      append_dev(p7, t25);
      append_dev(div11, t26);
      append_dev(div11, div10);
      append_dev(div10, p8);
      append_dev(p8, b4);
      append_dev(b4, t27);
      append_dev(p8, t28);
      append_dev(div10, t29);
      append_dev(div10, p9);
      append_dev(p9, t30);
      append_dev(p9, a0);
      append_dev(a0, t31);
      append_dev(p9, t32);
      append_dev(div16, t33);
      append_dev(div16, div15);
      append_dev(div15, h2);
      append_dev(h2, t34);
      append_dev(div15, t35);
      append_dev(div15, a1);
      append_dev(a1, t36);
      append_dev(div15, t37);
      append_dev(div15, div14);
      append_dev(div14, a2);
      append_dev(a2, t38);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      detach_dev(meta);
      detach_dev(link);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div17);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Routes", $$slots, []);

  $$self.$capture_state = function () {
    return {
      apiUrl: apiUrl
    };
  };

  return [];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Routes;
}(SvelteComponentDev);

export default Routes;
