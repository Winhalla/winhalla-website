import { y as _asyncToGenerator, z as regenerator, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, B as globals, s as safe_not_equal, f as element, g as space, q as query_selector_all, j as claim_element, k as detach_dev, l as claim_space, m as children, o as attr_dev, p as add_location, r as append_dev, u as insert_dev, C as _slicedToArray, v as noop, w as validate_slots, D as onMount, E as counter, F as callApi, x as apiUrl, G as tick, H as goto, t as text, h as svg_element, n as claim_text, I as set_data_dev, J as toggle_class, K as set_input_value, L as listen_dev, M as prop_dev, N as run_all } from './client.15883e4a.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file = "src\\routes\\create-account.svelte"; // (332:8) {:else}

function create_else_block(ctx) {
  var div10;
  var div0;
  var h1;
  var t0;
  var t1;
  var div8;
  var div1;
  var p0;
  var t2;
  var t3;
  var p1;
  var t4;
  var b0;
  var t5;
  var t6;
  var b1;
  var t7;
  var t8;
  var b2;
  var t9;
  var t10;
  var u0;
  var t11;
  var t12;
  var b3;
  var t13;
  var t14;
  var t15;
  var div6;
  var div3;
  var svg0;
  var path0;
  var t16;
  var div2;
  var t17;
  var svg1;
  var path1;
  var t18;
  var div5;
  var svg2;
  var path2;
  var t19;
  var div4;
  var t20;
  var svg3;
  var path3;
  var t21;
  var p2;
  var t22;
  var t23;
  var div7;
  var p3;
  var t24;
  var t25;
  var p4;
  var t26;
  var b4;
  var t27;
  var t28;
  var u1;
  var t29;
  var t30;
  var b5;
  var t31;
  var t32;
  var b6;
  var t33;
  var t34;
  var t35;
  var div9;
  var button;
  var p5;
  var t36;
  var t37;
  var svg4;
  var path4;
  var path5;
  var t38;
  var p6;
  var t39;
  var b7;
  var t40;
  var t41;
  var b8;
  var t42;
  var t43;
  var t44;
  var a;
  var t45;
  var block = {
    c: function create() {
      div10 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t0 = text("Share your affiliate link");
      t1 = space();
      div8 = element("div");
      div1 = element("div");
      p0 = element("p");
      t2 = text("You");
      t3 = space();
      p1 = element("p");
      t4 = text("will get\r\n                            ");
      b0 = element("b");
      t5 = text("20%");
      t6 = text("\r\n                            of what\r\n                            ");
      b1 = element("b");
      t7 = text("each people");
      t8 = text("\r\n                            who\r\n                            ");
      b2 = element("b");
      t9 = text("creates an account");
      t10 = text("\r\n                            with\r\n                            ");
      u0 = element("u");
      t11 = text("your");
      t12 = text("\r\n                            link\r\n                            ");
      b3 = element("b");
      t13 = text("wins");
      t14 = text("\r\n                            , for one month!");
      t15 = space();
      div6 = element("div");
      div3 = element("div");
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t16 = space();
      div2 = element("div");
      t17 = space();
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      t18 = space();
      div5 = element("div");
      svg2 = svg_element("svg");
      path2 = svg_element("path");
      t19 = space();
      div4 = element("div");
      t20 = space();
      svg3 = svg_element("svg");
      path3 = svg_element("path");
      t21 = space();
      p2 = element("p");
      t22 = text("Everyone wins!");
      t23 = space();
      div7 = element("div");
      p3 = element("p");
      t24 = text("Each person");
      t25 = space();
      p4 = element("p");
      t26 = text("that will\r\n                            ");
      b4 = element("b");
      t27 = text("create an account");
      t28 = text("\r\n                            with\r\n                            ");
      u1 = element("u");
      t29 = text("your");
      t30 = text("\r\n                            link will get\r\n                            ");
      b5 = element("b");
      t31 = text("20%");
      t32 = text("\r\n                            of reward\r\n                            ");
      b6 = element("b");
      t33 = text("boost");
      t34 = text("\r\n                            , for one month!");
      t35 = space();
      div9 = element("div");
      button = element("button");
      p5 = element("p");
      t36 = text(
      /*generatedLink*/
      ctx[5]);
      t37 = space();
      svg4 = svg_element("svg");
      path4 = svg_element("path");
      path5 = svg_element("path");
      t38 = space();
      p6 = element("p");
      t39 = text("You will be able to\r\n                    ");
      b7 = element("b");
      t40 = text("access your link");
      t41 = text("\r\n                    by clicking on\r\n                    ");
      b8 = element("b");
      t42 = text("your profile");
      t43 = text("\r\n                    !");
      t44 = space();
      a = element("a");
      t45 = text("Finish");
      this.h();
    },
    l: function claim(nodes) {
      div10 = claim_element(nodes, "DIV", {
        class: true
      });
      var div10_nodes = children(div10);
      div0 = claim_element(div10_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Share your affiliate link");
      h1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div10_nodes);
      div8 = claim_element(div10_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      div1 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t2 = claim_text(p0_nodes, "You");
      p0_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t4 = claim_text(p1_nodes, "will get\r\n                            ");
      b0 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t5 = claim_text(b0_nodes, "20%");
      b0_nodes.forEach(detach_dev);
      t6 = claim_text(p1_nodes, "\r\n                            of what\r\n                            ");
      b1 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t7 = claim_text(b1_nodes, "each people");
      b1_nodes.forEach(detach_dev);
      t8 = claim_text(p1_nodes, "\r\n                            who\r\n                            ");
      b2 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b2_nodes = children(b2);
      t9 = claim_text(b2_nodes, "creates an account");
      b2_nodes.forEach(detach_dev);
      t10 = claim_text(p1_nodes, "\r\n                            with\r\n                            ");
      u0 = claim_element(p1_nodes, "U", {});
      var u0_nodes = children(u0);
      t11 = claim_text(u0_nodes, "your");
      u0_nodes.forEach(detach_dev);
      t12 = claim_text(p1_nodes, "\r\n                            link\r\n                            ");
      b3 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b3_nodes = children(b3);
      t13 = claim_text(b3_nodes, "wins");
      b3_nodes.forEach(detach_dev);
      t14 = claim_text(p1_nodes, "\r\n                            , for one month!");
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t15 = claim_space(div8_nodes);
      div6 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div3 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      svg0 = claim_element(div3_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg0_nodes = children(svg0);
      path0 = claim_element(svg0_nodes, "path", {
        d: true
      }, 1);
      children(path0).forEach(detach_dev);
      svg0_nodes.forEach(detach_dev);
      t16 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      children(div2).forEach(detach_dev);
      t17 = claim_space(div3_nodes);
      svg1 = claim_element(div3_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg1_nodes = children(svg1);
      path1 = claim_element(svg1_nodes, "path", {
        d: true
      }, 1);
      children(path1).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t18 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      svg2 = claim_element(div5_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg2_nodes = children(svg2);
      path2 = claim_element(svg2_nodes, "path", {
        d: true
      }, 1);
      children(path2).forEach(detach_dev);
      svg2_nodes.forEach(detach_dev);
      t19 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      children(div4).forEach(detach_dev);
      t20 = claim_space(div5_nodes);
      svg3 = claim_element(div5_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg3_nodes = children(svg3);
      path3 = claim_element(svg3_nodes, "path", {
        d: true
      }, 1);
      children(path3).forEach(detach_dev);
      svg3_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      t21 = claim_space(div6_nodes);
      p2 = claim_element(div6_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      t22 = claim_text(p2_nodes, "Everyone wins!");
      p2_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      t23 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      p3 = claim_element(div7_nodes, "P", {
        class: true
      });
      var p3_nodes = children(p3);
      t24 = claim_text(p3_nodes, "Each person");
      p3_nodes.forEach(detach_dev);
      t25 = claim_space(div7_nodes);
      p4 = claim_element(div7_nodes, "P", {
        class: true
      });
      var p4_nodes = children(p4);
      t26 = claim_text(p4_nodes, "that will\r\n                            ");
      b4 = claim_element(p4_nodes, "B", {
        class: true
      });
      var b4_nodes = children(b4);
      t27 = claim_text(b4_nodes, "create an account");
      b4_nodes.forEach(detach_dev);
      t28 = claim_text(p4_nodes, "\r\n                            with\r\n                            ");
      u1 = claim_element(p4_nodes, "U", {});
      var u1_nodes = children(u1);
      t29 = claim_text(u1_nodes, "your");
      u1_nodes.forEach(detach_dev);
      t30 = claim_text(p4_nodes, "\r\n                            link will get\r\n                            ");
      b5 = claim_element(p4_nodes, "B", {
        class: true
      });
      var b5_nodes = children(b5);
      t31 = claim_text(b5_nodes, "20%");
      b5_nodes.forEach(detach_dev);
      t32 = claim_text(p4_nodes, "\r\n                            of reward\r\n                            ");
      b6 = claim_element(p4_nodes, "B", {
        class: true
      });
      var b6_nodes = children(b6);
      t33 = claim_text(b6_nodes, "boost");
      b6_nodes.forEach(detach_dev);
      t34 = claim_text(p4_nodes, "\r\n                            , for one month!");
      p4_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      t35 = claim_space(div10_nodes);
      div9 = claim_element(div10_nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      button = claim_element(div9_nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      p5 = claim_element(button_nodes, "P", {
        class: true
      });
      var p5_nodes = children(p5);
      t36 = claim_text(p5_nodes,
      /*generatedLink*/
      ctx[5]);
      p5_nodes.forEach(detach_dev);
      t37 = claim_space(button_nodes);
      svg4 = claim_element(button_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg4_nodes = children(svg4);
      path4 = claim_element(svg4_nodes, "path", {
        d: true
      }, 1);
      children(path4).forEach(detach_dev);
      path5 = claim_element(svg4_nodes, "path", {
        d: true
      }, 1);
      children(path5).forEach(detach_dev);
      svg4_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div9_nodes.forEach(detach_dev);
      t38 = claim_space(div10_nodes);
      p6 = claim_element(div10_nodes, "P", {
        class: true
      });
      var p6_nodes = children(p6);
      t39 = claim_text(p6_nodes, "You will be able to\r\n                    ");
      b7 = claim_element(p6_nodes, "B", {
        class: true
      });
      var b7_nodes = children(b7);
      t40 = claim_text(b7_nodes, "access your link");
      b7_nodes.forEach(detach_dev);
      t41 = claim_text(p6_nodes, "\r\n                    by clicking on\r\n                    ");
      b8 = claim_element(p6_nodes, "B", {
        class: true
      });
      var b8_nodes = children(b8);
      t42 = claim_text(b8_nodes, "your profile");
      b8_nodes.forEach(detach_dev);
      t43 = claim_text(p6_nodes, "\r\n                    !");
      p6_nodes.forEach(detach_dev);
      t44 = claim_space(div10_nodes);
      a = claim_element(div10_nodes, "A", {
        href: true,
        class: true
      });
      var a_nodes = children(a);
      t45 = claim_text(a_nodes, "Finish");
      a_nodes.forEach(detach_dev);
      div10_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "text-6xl mb-8 lg:mb-8 leading-snug\r\n                        lg:leading-normal");
      add_location(h1, file, 334, 20, 12707);
      attr_dev(div0, "class", "text-center mt-7 lg:mt-12");
      add_location(div0, file, 333, 16, 12646);
      attr_dev(p0, "class", "text-6xl mt-6");
      add_location(p0, file, 344, 24, 13164);
      attr_dev(b0, "class", "svelte-1c5bp3d");
      add_location(b0, file, 347, 28, 13317);
      attr_dev(b1, "class", "svelte-1c5bp3d");
      add_location(b1, file, 349, 28, 13394);
      attr_dev(b2, "class", "svelte-1c5bp3d");
      add_location(b2, file, 351, 28, 13475);
      add_location(u0, file, 353, 28, 13564);
      attr_dev(b3, "class", "svelte-1c5bp3d");
      add_location(b3, file, 355, 28, 13639);
      attr_dev(p1, "class", "leading-7 mt-13");
      add_location(p1, file, 345, 24, 13222);
      attr_dev(div1, "class", "card py-8 px-6 text-center w-64 h-78 mb-6 md:mb-0\r\n                        md:mr-12");
      add_location(div1, file, 341, 20, 13016);
      attr_dev(path0, "d", "m19.2 2.43-2.422-2.43-11.978 12 11.978 12\r\n                                    2.422-2.43-9.547-9.57z");
      add_location(path0, file, 365, 32, 14149);
      attr_dev(svg0, "class", "w-4 fill-current text-accent -mr-3");
      attr_dev(svg0, "viewBox", "0 0 24 24");
      attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg0, file, 361, 28, 13913);
      attr_dev(div2, "class", "h-2px bg-accent w-40");
      add_location(div2, file, 369, 28, 14366);
      attr_dev(path1, "d", "m4.8 21.57 2.422 2.43\r\n                                    11.978-12-11.978-12-2.422 2.43 9.547 9.57z");
      add_location(path1, file, 374, 32, 14668);
      attr_dev(svg1, "class", "w-4 fill-current text-accent -ml-3");
      attr_dev(svg1, "viewBox", "0 0 24 24");
      attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg1, file, 370, 28, 14432);
      attr_dev(div3, "class", "hidden md:flex items-center");
      add_location(div3, file, 360, 24, 13842);
      attr_dev(path2, "d", "m21.57 19.2 2.43-2.422-12-11.978-12\r\n                                    11.978 2.43 2.422 9.57-9.547z");
      add_location(path2, file, 384, 32, 15229);
      attr_dev(svg2, "class", "w-4 fill-current text-accent -mb-3");
      attr_dev(svg2, "viewBox", "0 0 24 24");
      attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg2, file, 380, 28, 14993);
      attr_dev(div4, "class", "w-2px bg-accent h-16");
      add_location(div4, file, 388, 28, 15447);
      attr_dev(path3, "d", "m2.43 4.8-2.43 2.422 12 11.978\r\n                                    12-11.978-2.43-2.422-9.57 9.547z");
      add_location(path3, file, 393, 32, 15749);
      attr_dev(svg3, "class", "w-4 fill-current text-accent -mt-3");
      attr_dev(svg3, "viewBox", "0 0 24 24");
      attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg3, file, 389, 28, 15513);
      attr_dev(div5, "class", "flex flex-col md:hidden items-center");
      add_location(div5, file, 379, 24, 14913);
      attr_dev(p2, "class", "text-center text-extra-light text-lg ml-4\r\n                            md:ml-0");
      add_location(p2, file, 399, 24, 15995);
      attr_dev(div6, "class", "flex items-center md:block");
      add_location(div6, file, 359, 20, 13776);
      attr_dev(p3, "class", "text-6xl");
      add_location(p3, file, 408, 24, 16386);
      attr_dev(b4, "class", "svelte-1c5bp3d");
      add_location(b4, file, 411, 28, 16542);
      add_location(u1, file, 413, 28, 16630);
      attr_dev(b5, "class", "svelte-1c5bp3d");
      add_location(b5, file, 415, 28, 16714);
      attr_dev(b6, "class", "svelte-1c5bp3d");
      add_location(b6, file, 417, 28, 16793);
      attr_dev(p4, "class", "leading-7 mt-4");
      add_location(p4, file, 409, 24, 16447);
      attr_dev(div7, "class", "card py-8 px-6 text-center w-64 h-78 mt-6 lg:mt-0\r\n                        md:ml-12");
      add_location(div7, file, 405, 20, 16238);
      attr_dev(div8, "class", "flex flex-col md:flex-row items-center");
      add_location(div8, file, 340, 16, 12942);
      attr_dev(p5, "class", "leading-none");
      add_location(p5, file, 427, 24, 17225);
      attr_dev(path4, "d", "m12.922 16.587-3.671 3.671c-.693.645-1.626\r\n                                1.041-2.651 1.041-2.152\r\n                                0-3.896-1.744-3.896-3.896 0-1.025.396-1.958\r\n                                1.043-2.654l-.002.002\r\n                                3.671-3.671c.212-.23.341-.539.341-.878\r\n                                0-.717-.582-1.299-1.299-1.299-.339\r\n                                0-.647.13-.879.342l.001-.001-3.671 3.671c-1.108\r\n                                1.162-1.789 2.74-1.789 4.476 0 3.586 2.907 6.494\r\n                                6.494 6.494 1.738 0 3.316-.683\r\n                                4.482-1.795l-.003.002\r\n                                3.671-3.671c.212-.23.341-.539.341-.878\r\n                                0-.717-.582-1.299-1.299-1.299-.339\r\n                                0-.647.13-.879.342l.001-.001z");
      add_location(path4, file, 433, 28, 17568);
      attr_dev(path5, "d", "m7.412 16.592c.235.235.559.38.918.38s.683-.145.918-.38l7.342-7.342c.212-.23.341-.539.341-.878 0-.717-.582-1.299-1.299-1.299-.339 0-.647.13-.879.342l.001-.001-7.342 7.342c-.235.235-.38.559-.38.918s.145.683.38.918z");
      add_location(path5, file, 447, 28, 18500);
      attr_dev(svg4, "class", "fill-current text-primary w-10 md:w-5 ml-1\r\n                            lg:ml-4 lg:block");
      attr_dev(svg4, "viewBox", "0 0 24 24");
      attr_dev(svg4, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg4, file, 428, 24, 17294);
      attr_dev(button, "class", "text-background bg-font py-4 px-4 mt-14 flex items-center rounded svelte-1c5bp3d");
      add_location(button, file, 425, 20, 17092);
      attr_dev(div9, "class", "lg:flex justify-center");
      add_location(div9, file, 422, 16, 16951);
      attr_dev(b7, "class", "accent svelte-1c5bp3d");
      add_location(b7, file, 455, 20, 18964);
      attr_dev(b8, "class", "accent svelte-1c5bp3d");
      add_location(b8, file, 457, 20, 19060);
      attr_dev(p6, "class", "pt-4 text-lg text-center");
      add_location(p6, file, 453, 16, 18865);
      attr_dev(a, "href", "/play");
      attr_dev(a, "class", "button button-brand mt-10 block mx-auto mb-6 md:mb-0");
      add_location(a, file, 460, 16, 19157);
      attr_dev(div10, "class", "flex flex-col items-center px-5");
      add_location(div10, file, 332, 12, 12583);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div10, anchor);
      append_dev(div10, div0);
      append_dev(div0, h1);
      append_dev(h1, t0);
      append_dev(div10, t1);
      append_dev(div10, div8);
      append_dev(div8, div1);
      append_dev(div1, p0);
      append_dev(p0, t2);
      append_dev(div1, t3);
      append_dev(div1, p1);
      append_dev(p1, t4);
      append_dev(p1, b0);
      append_dev(b0, t5);
      append_dev(p1, t6);
      append_dev(p1, b1);
      append_dev(b1, t7);
      append_dev(p1, t8);
      append_dev(p1, b2);
      append_dev(b2, t9);
      append_dev(p1, t10);
      append_dev(p1, u0);
      append_dev(u0, t11);
      append_dev(p1, t12);
      append_dev(p1, b3);
      append_dev(b3, t13);
      append_dev(p1, t14);
      append_dev(div8, t15);
      append_dev(div8, div6);
      append_dev(div6, div3);
      append_dev(div3, svg0);
      append_dev(svg0, path0);
      append_dev(div3, t16);
      append_dev(div3, div2);
      append_dev(div3, t17);
      append_dev(div3, svg1);
      append_dev(svg1, path1);
      append_dev(div6, t18);
      append_dev(div6, div5);
      append_dev(div5, svg2);
      append_dev(svg2, path2);
      append_dev(div5, t19);
      append_dev(div5, div4);
      append_dev(div5, t20);
      append_dev(div5, svg3);
      append_dev(svg3, path3);
      append_dev(div6, t21);
      append_dev(div6, p2);
      append_dev(p2, t22);
      append_dev(div8, t23);
      append_dev(div8, div7);
      append_dev(div7, p3);
      append_dev(p3, t24);
      append_dev(div7, t25);
      append_dev(div7, p4);
      append_dev(p4, t26);
      append_dev(p4, b4);
      append_dev(b4, t27);
      append_dev(p4, t28);
      append_dev(p4, u1);
      append_dev(u1, t29);
      append_dev(p4, t30);
      append_dev(p4, b5);
      append_dev(b5, t31);
      append_dev(p4, t32);
      append_dev(p4, b6);
      append_dev(b6, t33);
      append_dev(p4, t34);
      append_dev(div10, t35);
      append_dev(div10, div9);
      append_dev(div9, button);
      append_dev(button, p5);
      append_dev(p5, t36);
      append_dev(button, t37);
      append_dev(button, svg4);
      append_dev(svg4, path4);
      append_dev(svg4, path5);
      append_dev(div10, t38);
      append_dev(div10, p6);
      append_dev(p6, t39);
      append_dev(p6, b7);
      append_dev(b7, t40);
      append_dev(p6, t41);
      append_dev(p6, b8);
      append_dev(b8, t42);
      append_dev(p6, t43);
      append_dev(div10, t44);
      append_dev(div10, a);
      append_dev(a, t45);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*generatedLink*/
      32) set_data_dev(t36,
      /*generatedLink*/
      ctx[5]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div10);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(332:8) {:else}",
    ctx: ctx
  });
  return block;
} // (199:8) {#if accountCreationStep === 0}


function create_if_block(ctx) {
  var div5;
  var div0;
  var h1;
  var t0;
  var t1;
  var div2;
  var p0;
  var t2;
  var t3;
  var div1;
  var input0;
  var t4;
  var t5;
  var div4;
  var p1;
  var t6;
  var t7;
  var div3;
  var input1;
  var t8;
  var t9;
  var button;
  var t10;
  var button_disabled_value;
  var mounted;
  var dispose;

  function select_block_type_1(ctx, dirty) {
    if (
    /*validEmail*/
    ctx[3]) return create_if_block_3;
    if (
    /*validEmail*/
    ctx[3] == false) return create_if_block_4;
  }

  var current_block_type = select_block_type_1(ctx);
  var if_block0 = current_block_type && current_block_type(ctx);

  function select_block_type_2(ctx, dirty) {
    if (
    /*validLink*/
    ctx[2]) return create_if_block_1;
    if (
    /*validLink*/
    ctx[2] == false) return create_if_block_2;
  }

  var current_block_type_1 = select_block_type_2(ctx);
  var if_block1 = current_block_type_1 && current_block_type_1(ctx);
  var block = {
    c: function create() {
      div5 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t0 = text("Create your account");
      t1 = space();
      div2 = element("div");
      p0 = element("p");
      t2 = text("Email");
      t3 = space();
      div1 = element("div");
      input0 = element("input");
      t4 = space();
      if (if_block0) if_block0.c();
      t5 = space();
      div4 = element("div");
      p1 = element("p");
      t6 = text("Friend link");
      t7 = space();
      div3 = element("div");
      input1 = element("input");
      t8 = space();
      if (if_block1) if_block1.c();
      t9 = space();
      button = element("button");
      t10 = text("Create account");
      this.h();
    },
    l: function claim(nodes) {
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div0 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Create your account");
      h1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div5_nodes);
      div2 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      p0 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t2 = claim_text(p0_nodes, "Email");
      p0_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {});
      var div1_nodes = children(div1);
      input0 = claim_element(div1_nodes, "INPUT", {
        type: true,
        placeholder: true,
        class: true
      });
      t4 = claim_space(div1_nodes);
      if (if_block0) if_block0.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t5 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      p1 = claim_element(div4_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t6 = claim_text(p1_nodes, "Friend link");
      p1_nodes.forEach(detach_dev);
      t7 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {});
      var div3_nodes = children(div3);
      input1 = claim_element(div3_nodes, "INPUT", {
        placeholder: true,
        class: true
      });
      t8 = claim_space(div3_nodes);
      if (if_block1) if_block1.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      t9 = claim_space(div5_nodes);
      button = claim_element(div5_nodes, "BUTTON", {
        disabled: true,
        class: true
      });
      var button_nodes = children(button);
      t10 = claim_text(button_nodes, "Create account");
      button_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "text-6xl mb-6 md:mb-8 leading-snug\r\n                        md:leading-normal");
      add_location(h1, file, 201, 20, 5955);
      attr_dev(div0, "class", "text-center md:text-left mt-7 md:mt-12");
      add_location(div0, file, 200, 16, 5881);
      attr_dev(p0, "class", "input-header svelte-1c5bp3d");
      add_location(p0, file, 208, 20, 6227);
      attr_dev(input0, "type", "email");
      attr_dev(input0, "placeholder", "Your email goes here");
      attr_dev(input0, "class", "input-style focus:outline-none\r\n                            focus:border-primary placeholder-disabled svelte-1c5bp3d");
      toggle_class(input0, "border-legendary",
      /*validEmail*/
      ctx[3] == false);
      add_location(input0, file, 210, 24, 6313);
      add_location(div1, file, 209, 20, 6282);
      attr_dev(div2, "class", "md:mt-4");
      add_location(div2, file, 207, 16, 6184);
      attr_dev(p1, "class", "text-3xl input-header svelte-1c5bp3d");
      add_location(p1, file, 238, 20, 7769);
      attr_dev(input1, "placeholder", "Paste here your affiliate link");
      attr_dev(input1, "class", "input-style focus:outline-none\r\n                            focus:border-primary w-full placeholder-disabled svelte-1c5bp3d");
      toggle_class(input1, "border-legendary",
      /*validLink*/
      ctx[2] == false);
      add_location(input1, file, 240, 24, 7870);
      add_location(div3, file, 239, 20, 7839);
      attr_dev(div4, "class", "mt-4");
      toggle_class(div4, "mt-12",
      /*validEmail*/
      ctx[3] == null);
      add_location(div4, file, 237, 16, 7696);
      button.disabled = button_disabled_value = !
      /*validEmail*/
      ctx[3];
      attr_dev(button, "class", "button button-brand mt-3 svelte-1c5bp3d");
      toggle_class(button, "mt-11",
      /*validLink*/
      ctx[2] == null);
      add_location(button, file, 264, 16, 9216);
      attr_dev(div5, "class", "flex flex-col justify-center px-5 md:p-0");
      add_location(div5, file, 199, 12, 5809);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div5, anchor);
      append_dev(div5, div0);
      append_dev(div0, h1);
      append_dev(h1, t0);
      append_dev(div5, t1);
      append_dev(div5, div2);
      append_dev(div2, p0);
      append_dev(p0, t2);
      append_dev(div2, t3);
      append_dev(div2, div1);
      append_dev(div1, input0);
      set_input_value(input0,
      /*email*/
      ctx[0]);
      append_dev(div1, t4);
      if (if_block0) if_block0.m(div1, null);
      append_dev(div5, t5);
      append_dev(div5, div4);
      append_dev(div4, p1);
      append_dev(p1, t6);
      append_dev(div4, t7);
      append_dev(div4, div3);
      append_dev(div3, input1);
      set_input_value(input1,
      /*link*/
      ctx[1]);
      append_dev(div3, t8);
      if (if_block1) if_block1.m(div3, null);
      append_dev(div5, t9);
      append_dev(div5, button);
      append_dev(button, t10);

      if (!mounted) {
        dispose = [listen_dev(input0, "keydown",
        /*onKeyPressEmail*/
        ctx[7], false, false, false), listen_dev(input0, "input",
        /*input0_input_handler*/
        ctx[10]), listen_dev(input1, "keydown",
        /*onKeyPressLink*/
        ctx[6], false, false, false), listen_dev(input1, "input",
        /*input1_input_handler*/
        ctx[11]), listen_dev(button, "click",
        /*handleClick*/
        ctx[8], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*email*/
      1 && input0.value !==
      /*email*/
      ctx[0]) {
        set_input_value(input0,
        /*email*/
        ctx[0]);
      }

      if (dirty &
      /*validEmail*/
      8) {
        toggle_class(input0, "border-legendary",
        /*validEmail*/
        ctx[3] == false);
      }

      if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
        if (if_block0) if_block0.d(1);
        if_block0 = current_block_type && current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, null);
        }
      }

      if (dirty &
      /*link*/
      2 && input1.value !==
      /*link*/
      ctx[1]) {
        set_input_value(input1,
        /*link*/
        ctx[1]);
      }

      if (dirty &
      /*validLink*/
      4) {
        toggle_class(input1, "border-legendary",
        /*validLink*/
        ctx[2] == false);
      }

      if (current_block_type_1 !== (current_block_type_1 = select_block_type_2(ctx))) {
        if (if_block1) if_block1.d(1);
        if_block1 = current_block_type_1 && current_block_type_1(ctx);

        if (if_block1) {
          if_block1.c();
          if_block1.m(div3, null);
        }
      }

      if (dirty &
      /*validEmail*/
      8) {
        toggle_class(div4, "mt-12",
        /*validEmail*/
        ctx[3] == null);
      }

      if (dirty &
      /*validEmail*/
      8 && button_disabled_value !== (button_disabled_value = !
      /*validEmail*/
      ctx[3])) {
        prop_dev(button, "disabled", button_disabled_value);
      }

      if (dirty &
      /*validLink*/
      4) {
        toggle_class(button, "mt-11",
        /*validLink*/
        ctx[2] == null);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div5);

      if (if_block0) {
        if_block0.d();
      }

      if (if_block1) {
        if_block1.d();
      }

      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(199:8) {#if accountCreationStep === 0}",
    ctx: ctx
  });
  return block;
} // (232:54) 


function create_if_block_4(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("INVALID EMAIL");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "INVALID EMAIL");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "text-legendary info  svelte-1c5bp3d");
      add_location(p, file, 232, 28, 7544);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(232:54) ",
    ctx: ctx
  });
  return block;
} // (220:24) {#if validEmail}


function create_if_block_3(ctx) {
  var div;
  var svg;
  var path;
  var t0;
  var p;
  var t1;
  var block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t0 = space();
      p = element("p");
      t1 = text("VALID EMAIL");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      t0 = claim_space(div_nodes);
      p = claim_element(div_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, "VALID EMAIL");
      p_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z");
      add_location(path, file, 225, 36, 7137);
      attr_dev(svg, "class", "fill-current text-green w-4 check svelte-1c5bp3d");
      attr_dev(svg, "viewBox", "0 0 33 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file, 221, 32, 6886);
      attr_dev(p, "class", "text-green info svelte-1c5bp3d");
      add_location(p, file, 229, 32, 7380);
      attr_dev(div, "class", "flex items-center");
      add_location(div, file, 220, 28, 6821);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, svg);
      append_dev(svg, path);
      append_dev(div, t0);
      append_dev(div, p);
      append_dev(p, t1);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(220:24) {#if validEmail}",
    ctx: ctx
  });
  return block;
} // (260:53) 


function create_if_block_2(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("INVALID LINK");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "INVALID LINK");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "text-legendary info svelte-1c5bp3d");
      add_location(p, file, 260, 28, 9068);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(260:53) ",
    ctx: ctx
  });
  return block;
} // (248:24) {#if validLink}


function create_if_block_1(ctx) {
  var div;
  var svg;
  var path;
  var t0;
  var p;
  var t1;
  var block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t0 = space();
      p = element("p");
      t1 = text("VALID LINK");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      t0 = claim_space(div_nodes);
      p = claim_element(div_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, "VALID LINK");
      p_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "m0 10.909 4.364-4.364 8.727 8.727\r\n                                        15.273-15.273 4.364 4.364-19.636 19.636z");
      add_location(path, file, 253, 36, 8663);
      attr_dev(svg, "class", "fill-current text-green w-4 check svelte-1c5bp3d");
      attr_dev(svg, "viewBox", "0 0 33 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file, 249, 32, 8412);
      attr_dev(p, "class", "text-green info svelte-1c5bp3d");
      add_location(p, file, 257, 32, 8906);
      attr_dev(div, "class", "flex items-center");
      add_location(div, file, 248, 28, 8347);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, svg);
      append_dev(svg, path);
      append_dev(div, t0);
      append_dev(div, p);
      append_dev(p, t1);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(248:24) {#if validLink}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var meta;
  var t;
  var div1;
  var div0;

  function select_block_type(ctx, dirty) {
    if (
    /*accountCreationStep*/
    ctx[4] === 0) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      meta = element("meta");
      t = space();
      div1 = element("div");
      div0 = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-fwzdel\"]", document.head);
      meta = claim_element(head_nodes, "META", {
        name: true,
        content: true
      });
      head_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {});
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if_block.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Create account | Winhalla, Play Brawlhalla. Earn rewards.";
      attr_dev(meta, "name", "description");
      attr_dev(meta, "content", "This is where all starts | Create a Winhalla account now and\r\n        get a Battle Pass and Mammoth Coins FOR FREE");
      add_location(meta, file, 191, 4, 5495);
      attr_dev(div0, "class", "flex items-center justify-center md:h-screen-7");
      add_location(div0, file, 197, 4, 5694);
      add_location(div1, file, 196, 0, 5683);
    },
    m: function mount(target, anchor) {
      append_dev(document.head, meta);
      insert_dev(target, t, anchor);
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      if_block.m(div0, null);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(div0, null);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      detach_dev(meta);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div1);
      if_block.d();
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

function preload(_x) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_ref3) {
    var params, query, firstLink;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _ref3.params, query = _ref3.query;
            firstLink = query.link;
            return _context3.abrupt("return", {
              firstLink: firstLink
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Create_account", slots, []);
  var firstLink = $$props.firstLink;
  var account;
  var email;
  var link = firstLink;
  var linkId;
  var validLink = null;
  var validEmail = null;
  var accountCreationStep = 0;
  var generatedLink;

  var onKeyPressLink = function onKeyPressLink() {
    setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var testLink;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(link.length > 0)) {
                _context.next = 19;
                break;
              }

              _context.prev = 1;
              linkId = new URL(link);
              linkId = linkId.pathname.split("/")[2];

              if (!(linkId.length == 24)) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return callApi("get", "/getLink/".concat(linkId));

            case 7:
              testLink = _context.sent;
              if (testLink) $$invalidate(2, validLink = true);else $$invalidate(2, validLink = false);
              _context.next = 12;
              break;

            case 11:
              $$invalidate(2, validLink = false);

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              $$invalidate(2, validLink = false);

            case 17:
              _context.next = 20;
              break;

            case 19:
              $$invalidate(2, validLink = null);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    })), 1);
  };

  var onKeyPressEmail = function onKeyPressEmail() {
    setTimeout(function () {
      if (email.length > 0) {
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
        var exec = regex.exec(email);
        if (exec) $$invalidate(3, validEmail = true);else $$invalidate(3, validEmail = false);
      } else {
        $$invalidate(3, validEmail = null);
      }
    }, 1);
  };

  if (link && link != "") onKeyPressLink();
  onMount(function () {
    var unsub = counter.subscribe(function (value) {
      var user = value.content;

      if (user.then) {
        user.then(function (values) {
          if (values.user) {
            goto("/");
          }
        });
      } else if (user) {
        if (!user.user) {
          goto("/");
        }
      }
    });
    unsub();
  });

  function handleClick() {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(accountCreationStep == 0)) {
                _context2.next = 9;
                break;
              }

              try {
                linkId = new URL(link);
                linkId = linkId.pathname.split("/")[2];
              } catch (err) {
                console.log(err);
              }

              _context2.t0 = $$invalidate;
              _context2.next = 5;
              return callApi("post", "/auth/createAccount?email=".concat(email, "&linkId=").concat(linkId));

            case 5:
              _context2.t1 = generatedLink = _context2.sent;
              (0, _context2.t0)(5, _context2.t1);
              $$invalidate(4, accountCreationStep++, accountCreationStep);
              counter.set({
                "refresh": true
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleClick.apply(this, arguments);
  }

  var writable_props = ["firstLink"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Create_account> was created with unknown prop '".concat(key, "'"));
  });

  function input0_input_handler() {
    email = this.value;
    $$invalidate(0, email);
  }

  function input1_input_handler() {
    link = this.value;
    $$invalidate(1, link);
  }

  $$self.$$set = function ($$props) {
    if ("firstLink" in $$props) $$invalidate(9, firstLink = $$props.firstLink);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      counter: counter,
      firstLink: firstLink,
      callApi: callApi,
      onMount: onMount,
      apiUrl: apiUrl,
      account: account,
      email: email,
      link: link,
      linkId: linkId,
      validLink: validLink,
      validEmail: validEmail,
      accountCreationStep: accountCreationStep,
      generatedLink: generatedLink,
      onKeyPressLink: onKeyPressLink,
      onKeyPressEmail: onKeyPressEmail,
      handleClick: handleClick,
      tick: tick,
      goto: goto
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("firstLink" in $$props) $$invalidate(9, firstLink = $$props.firstLink);
    if ("account" in $$props) account = $$props.account;
    if ("email" in $$props) $$invalidate(0, email = $$props.email);
    if ("link" in $$props) $$invalidate(1, link = $$props.link);
    if ("linkId" in $$props) linkId = $$props.linkId;
    if ("validLink" in $$props) $$invalidate(2, validLink = $$props.validLink);
    if ("validEmail" in $$props) $$invalidate(3, validEmail = $$props.validEmail);
    if ("accountCreationStep" in $$props) $$invalidate(4, accountCreationStep = $$props.accountCreationStep);
    if ("generatedLink" in $$props) $$invalidate(5, generatedLink = $$props.generatedLink);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [email, link, validLink, validEmail, accountCreationStep, generatedLink, onKeyPressLink, onKeyPressEmail, handleClick, firstLink, input0_input_handler, input1_input_handler];
}

var Create_account = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Create_account, _SvelteComponentDev);

  var _super = _createSuper(Create_account);

  function Create_account(options) {
    var _this;

    _classCallCheck(this, Create_account);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      firstLink: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Create_account",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*firstLink*/
    ctx[9] === undefined && !("firstLink" in props)) {
      console_1.warn("<Create_account> was created without expected prop 'firstLink'");
    }

    return _this;
  }

  _createClass(Create_account, [{
    key: "firstLink",
    get: function get() {
      throw new Error("<Create_account>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Create_account>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Create_account;
}(SvelteComponentDev);

export default Create_account;
export { preload };
