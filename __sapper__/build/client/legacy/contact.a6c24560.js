import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, O as validate_each_argument, s as safe_not_equal, f as element, t as text, g as space, j as claim_element, m as children, n as claim_text, l as claim_space, k as detach_dev, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, L as listen_dev, q as query_selector_all, J as toggle_class, K as set_input_value, P as action_destroyer, Q as clickOutside, C as _slicedToArray, v as noop, R as destroy_each, N as run_all, w as validate_slots } from './client.638e0a89.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\routes\\contact.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
} // (38:16) {#each problems as problem}


function create_each_block(ctx) {
  var p;
  var t0_value =
  /*problem*/
  ctx[9] + "";
  var t0;
  var t1;
  var mounted;
  var dispose;

  function click_handler_1() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler_1*/
      (_ctx = ctx)[7].apply(_ctx, [
      /*problem*/
      ctx[9]].concat(args))
    );
  }

  var block = {
    c: function create() {
      p = element("p");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, t0_value);
      t1 = claim_space(p_nodes);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "block text-black text-xl border-l border-red-600\r\n                        py-3 hover:bg-primary hover:text-font px-3 rounded-sm\r\n                        lg:border-none");
      add_location(p, file, 38, 20, 1457);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      append_dev(p, t1);

      if (!mounted) {
        dispose = listen_dev(p, "click", click_handler_1, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(38:16) {#each problems as problem}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var div5;
  var h1;
  var t1;
  var t2;
  var br0;
  var t3;
  var div4;
  var div1;
  var h20;
  var t4;
  var t5;
  var h30;
  var t6;
  var t7;
  var input;
  var clickOutside_action;
  var t8;
  var div0;
  var t9;
  var br1;
  var t10;
  var br2;
  var t11;
  var h31;
  var t12;
  var t13;
  var textarea;
  var t14;
  var div3;
  var h21;
  var t15;
  var strong0;
  var t16;
  var t17;
  var div2;
  var h32;
  var t18;
  var strong1;
  var t19;
  var t20;
  var p0;
  var t21;
  var strong2;
  var t22;
  var t23;
  var strong3;
  var t24;
  var t25;
  var t26;
  var h33;
  var t27;
  var strong4;
  var t28;
  var t29;
  var p1;
  var t30;
  var strong5;
  var t31;
  var t32;
  var strong6;
  var t33;
  var t34;
  var t35;
  var p2;
  var t36;
  var a;
  var t37;
  var mounted;
  var dispose;
  var each_value =
  /*problems*/
  ctx[3];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      t0 = space();
      div5 = element("div");
      h1 = element("h1");
      t1 = text("How to contact us");
      t2 = space();
      br0 = element("br");
      t3 = space();
      div4 = element("div");
      div1 = element("div");
      h20 = element("h2");
      t4 = text("BY FORM:");
      t5 = space();
      h30 = element("h3");
      t6 = text("Subject:");
      t7 = space();
      input = element("input");
      t8 = space();
      div0 = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t9 = space();
      br1 = element("br");
      t10 = space();
      br2 = element("br");
      t11 = space();
      h31 = element("h3");
      t12 = text("Your message:");
      t13 = space();
      textarea = element("textarea");
      t14 = space();
      div3 = element("div");
      h21 = element("h2");
      t15 = text("BY MAIL\r\n                ");
      strong0 = element("strong");
      t16 = text("(FOR COMMERCIAL PURPOSE ONLY):");
      t17 = space();
      div2 = element("div");
      h32 = element("h3");
      t18 = text("IF YOU ARE A\r\n                    ");
      strong1 = element("strong");
      t19 = text("COMPANY");
      t20 = space();
      p0 = element("p");
      t21 = text("Please describe\r\n                    ");
      strong2 = element("strong");
      t22 = text("who you are");
      t23 = text("\r\n                    and\r\n                    ");
      strong3 = element("strong");
      t24 = text("what are your proposal");
      t25 = text("\r\n                    ACCURATELY");
      t26 = space();
      h33 = element("h3");
      t27 = text("IF YOU ARE A\r\n                    ");
      strong4 = element("strong");
      t28 = text("CONTENT CREATOR");
      t29 = space();
      p1 = element("p");
      t30 = text("Please precise the number of average\r\n                    ");
      strong5 = element("strong");
      t31 = text("views per video");
      t32 = text("\r\n                    (or average\r\n                    ");
      strong6 = element("strong");
      t33 = text("viewers on your stream");
      t34 = text("\r\n                    )");
      t35 = space();
      p2 = element("p");
      t36 = text("At\r\n                    ");
      a = element("a");
      t37 = text("contact@winhalla.us");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1yzvmwa\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      h1 = claim_element(div5_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "How to contact us");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(div5_nodes);
      br0 = claim_element(div5_nodes, "BR", {});
      t3 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div1 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h20 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h20_nodes = children(h20);
      t4 = claim_text(h20_nodes, "BY FORM:");
      h20_nodes.forEach(detach_dev);
      t5 = claim_space(div1_nodes);
      h30 = claim_element(div1_nodes, "H3", {
        class: true
      });
      var h30_nodes = children(h30);
      t6 = claim_text(h30_nodes, "Subject:");
      h30_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      input = claim_element(div1_nodes, "INPUT", {
        class: true,
        readonly: true,
        size: true
      });
      t8 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      t9 = claim_space(div1_nodes);
      br1 = claim_element(div1_nodes, "BR", {});
      t10 = claim_space(div1_nodes);
      br2 = claim_element(div1_nodes, "BR", {});
      t11 = claim_space(div1_nodes);
      h31 = claim_element(div1_nodes, "H3", {
        class: true
      });
      var h31_nodes = children(h31);
      t12 = claim_text(h31_nodes, "Your message:");
      h31_nodes.forEach(detach_dev);
      t13 = claim_space(div1_nodes);
      textarea = claim_element(div1_nodes, "TEXTAREA", {
        class: true,
        maxlength: true
      });
      children(textarea).forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t14 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h21 = claim_element(div3_nodes, "H2", {
        class: true
      });
      var h21_nodes = children(h21);
      t15 = claim_text(h21_nodes, "BY MAIL\r\n                ");
      strong0 = claim_element(h21_nodes, "STRONG", {
        class: true
      });
      var strong0_nodes = children(strong0);
      t16 = claim_text(strong0_nodes, "(FOR COMMERCIAL PURPOSE ONLY):");
      strong0_nodes.forEach(detach_dev);
      h21_nodes.forEach(detach_dev);
      t17 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      h32 = claim_element(div2_nodes, "H3", {
        class: true
      });
      var h32_nodes = children(h32);
      t18 = claim_text(h32_nodes, "IF YOU ARE A\r\n                    ");
      strong1 = claim_element(h32_nodes, "STRONG", {
        class: true
      });
      var strong1_nodes = children(strong1);
      t19 = claim_text(strong1_nodes, "COMPANY");
      strong1_nodes.forEach(detach_dev);
      h32_nodes.forEach(detach_dev);
      t20 = claim_space(div2_nodes);
      p0 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t21 = claim_text(p0_nodes, "Please describe\r\n                    ");
      strong2 = claim_element(p0_nodes, "STRONG", {
        class: true
      });
      var strong2_nodes = children(strong2);
      t22 = claim_text(strong2_nodes, "who you are");
      strong2_nodes.forEach(detach_dev);
      t23 = claim_text(p0_nodes, "\r\n                    and\r\n                    ");
      strong3 = claim_element(p0_nodes, "STRONG", {
        class: true
      });
      var strong3_nodes = children(strong3);
      t24 = claim_text(strong3_nodes, "what are your proposal");
      strong3_nodes.forEach(detach_dev);
      t25 = claim_text(p0_nodes, "\r\n                    ACCURATELY");
      p0_nodes.forEach(detach_dev);
      t26 = claim_space(div2_nodes);
      h33 = claim_element(div2_nodes, "H3", {
        class: true
      });
      var h33_nodes = children(h33);
      t27 = claim_text(h33_nodes, "IF YOU ARE A\r\n                    ");
      strong4 = claim_element(h33_nodes, "STRONG", {
        class: true
      });
      var strong4_nodes = children(strong4);
      t28 = claim_text(strong4_nodes, "CONTENT CREATOR");
      strong4_nodes.forEach(detach_dev);
      h33_nodes.forEach(detach_dev);
      t29 = claim_space(div2_nodes);
      p1 = claim_element(div2_nodes, "P", {});
      var p1_nodes = children(p1);
      t30 = claim_text(p1_nodes, "Please precise the number of average\r\n                    ");
      strong5 = claim_element(p1_nodes, "STRONG", {
        class: true
      });
      var strong5_nodes = children(strong5);
      t31 = claim_text(strong5_nodes, "views per video");
      strong5_nodes.forEach(detach_dev);
      t32 = claim_text(p1_nodes, "\r\n                    (or average\r\n                    ");
      strong6 = claim_element(p1_nodes, "STRONG", {
        class: true
      });
      var strong6_nodes = children(strong6);
      t33 = claim_text(strong6_nodes, "viewers on your stream");
      strong6_nodes.forEach(detach_dev);
      t34 = claim_text(p1_nodes, "\r\n                    )");
      p1_nodes.forEach(detach_dev);
      t35 = claim_space(div2_nodes);
      p2 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      t36 = claim_text(p2_nodes, "At\r\n                    ");
      a = claim_element(p2_nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      t37 = claim_text(a_nodes, "contact@winhalla.us");
      a_nodes.forEach(detach_dev);
      p2_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "How to contact us | Winhalla, Play Brawlhalla. Earn rewards.";
      attr_dev(h1, "class", "text-6xl");
      add_location(h1, file, 18, 4, 539);
      add_location(br0, file, 19, 4, 588);
      attr_dev(h20, "class", "text-4xl mb-2");
      add_location(h20, file, 22, 12, 744);
      attr_dev(h30, "class", "text-xl text-accent");
      add_location(h30, file, 23, 12, 797);
      attr_dev(input, "class", "rounded-sm text-black p-1 focus:outline-none");
      input.readOnly = true;
      attr_dev(input, "size", "35");
      add_location(input, file, 24, 12, 856);
      attr_dev(div0, "class", "mt-1 rounded bg-white lg:absolute shadow-card dropdown\r\n                z-50 border border-primary w-60 ");
      toggle_class(div0, "lg:hidden", !
      /*isPickerOpen*/
      ctx[2]);
      add_location(div0, file, 33, 12, 1206);
      add_location(br1, file, 47, 12, 1843);
      add_location(br2, file, 48, 12, 1863);
      attr_dev(h31, "class", "text-accent");
      add_location(h31, file, 49, 12, 1883);
      attr_dev(textarea, "class", "w-90% rounded-sm text-black p-1 h-70 focus:outline-none");
      attr_dev(textarea, "maxlength", "2000");
      add_location(textarea, file, 50, 12, 1939);
      attr_dev(div1, "class", "w-40% block mb-16 rounded shadow-full bg-variant p-6");
      add_location(div1, file, 21, 8, 664);
      attr_dev(strong0, "class", "text-white font-normal");
      add_location(strong0, file, 58, 16, 2279);
      attr_dev(h21, "class", "text-4xl mt-4 mb-2");
      add_location(h21, file, 56, 12, 2205);
      attr_dev(strong1, "class", "text-accent font-normal");
      add_location(strong1, file, 65, 20, 2530);
      attr_dev(h32, "class", "text-3xl");
      add_location(h32, file, 63, 16, 2453);
      attr_dev(strong2, "class", "text-primary font-normal");
      add_location(strong2, file, 69, 20, 2702);
      attr_dev(strong3, "class", "text-primary font-normal");
      add_location(strong3, file, 73, 20, 2858);
      attr_dev(p0, "class", "mb-4");
      add_location(p0, file, 67, 16, 2627);
      attr_dev(strong4, "class", "text-accent font-normal");
      add_location(strong4, file, 80, 20, 3127);
      attr_dev(h33, "class", "text-3xl");
      add_location(h33, file, 78, 16, 3050);
      attr_dev(strong5, "class", "text-primary font-normal");
      add_location(strong5, file, 86, 20, 3363);
      attr_dev(strong6, "class", "text-primary font-normal");
      add_location(strong6, file, 90, 20, 3531);
      add_location(p1, file, 84, 16, 3280);
      attr_dev(a, "class", "text-primary font-normal underline");
      attr_dev(a, "href", "mailto:contact@winhalla.us");
      add_location(a, file, 97, 20, 3785);
      attr_dev(p2, "class", "text-3xl mt-8");
      add_location(p2, file, 95, 16, 3714);
      add_location(div2, file, 62, 12, 2430);
      attr_dev(div3, "class", "w-40% rounded h-auto shadow-full bg-variant p-6");
      add_location(div3, file, 55, 8, 2130);
      attr_dev(div4, "class", "flex w-full h-auto pr-24 justify-between");
      add_location(div4, file, 20, 4, 600);
      attr_dev(div5, "class", "lg:block lg:pl-24 lg:mt-12 h-full mb-7");
      add_location(div5, file, 17, 0, 481);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div5, anchor);
      append_dev(div5, h1);
      append_dev(h1, t1);
      append_dev(div5, t2);
      append_dev(div5, br0);
      append_dev(div5, t3);
      append_dev(div5, div4);
      append_dev(div4, div1);
      append_dev(div1, h20);
      append_dev(h20, t4);
      append_dev(div1, t5);
      append_dev(div1, h30);
      append_dev(h30, t6);
      append_dev(div1, t7);
      append_dev(div1, input);
      set_input_value(input,
      /*subject*/
      ctx[0]);
      append_dev(div1, t8);
      append_dev(div1, div0);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div0, null);
      }

      append_dev(div1, t9);
      append_dev(div1, br1);
      append_dev(div1, t10);
      append_dev(div1, br2);
      append_dev(div1, t11);
      append_dev(div1, h31);
      append_dev(h31, t12);
      append_dev(div1, t13);
      append_dev(div1, textarea);
      set_input_value(textarea,
      /*message*/
      ctx[1]);
      append_dev(div4, t14);
      append_dev(div4, div3);
      append_dev(div3, h21);
      append_dev(h21, t15);
      append_dev(h21, strong0);
      append_dev(strong0, t16);
      append_dev(div3, t17);
      append_dev(div3, div2);
      append_dev(div2, h32);
      append_dev(h32, t18);
      append_dev(h32, strong1);
      append_dev(strong1, t19);
      append_dev(div2, t20);
      append_dev(div2, p0);
      append_dev(p0, t21);
      append_dev(p0, strong2);
      append_dev(strong2, t22);
      append_dev(p0, t23);
      append_dev(p0, strong3);
      append_dev(strong3, t24);
      append_dev(p0, t25);
      append_dev(div2, t26);
      append_dev(div2, h33);
      append_dev(h33, t27);
      append_dev(h33, strong4);
      append_dev(strong4, t28);
      append_dev(div2, t29);
      append_dev(div2, p1);
      append_dev(p1, t30);
      append_dev(p1, strong5);
      append_dev(strong5, t31);
      append_dev(p1, t32);
      append_dev(p1, strong6);
      append_dev(strong6, t33);
      append_dev(p1, t34);
      append_dev(div2, t35);
      append_dev(div2, p2);
      append_dev(p2, t36);
      append_dev(p2, a);
      append_dev(a, t37);

      if (!mounted) {
        dispose = [listen_dev(input, "input",
        /*input_input_handler*/
        ctx[4]), action_destroyer(clickOutside_action = clickOutside.call(null, input)), listen_dev(input, "click",
        /*click_handler*/
        ctx[5], false, false, false), listen_dev(input, "click_outside",
        /*click_outside_handler*/
        ctx[6], false, false, false), listen_dev(textarea, "input",
        /*textarea_input_handler*/
        ctx[8])];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*subject*/
      1 && input.value !==
      /*subject*/
      ctx[0]) {
        set_input_value(input,
        /*subject*/
        ctx[0]);
      }

      if (dirty &
      /*subject, problems*/
      9) {
        each_value =
        /*problems*/
        ctx[3];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div0, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*isPickerOpen*/
      4) {
        toggle_class(div0, "lg:hidden", !
        /*isPickerOpen*/
        ctx[2]);
      }

      if (dirty &
      /*message*/
      2) {
        set_input_value(textarea,
        /*message*/
        ctx[1]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div5);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
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
  var subject;
  var message;
  var isPickerOpen = false;
  var problems = ["Problem with the shop", "Problem with the FFA gamemode", "Sign in/Sign up Problem", "Problem with the quests", "Other problem (please precise)"];
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Contact> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Contact", $$slots, []);

  function input_input_handler() {
    subject = this.value;
    $$invalidate(0, subject);
  }

  var click_handler = function click_handler() {
    return $$invalidate(2, isPickerOpen = !isPickerOpen);
  };

  var click_outside_handler = function click_outside_handler() {
    return $$invalidate(2, isPickerOpen = false);
  };

  var click_handler_1 = function click_handler_1(problem) {
    return $$invalidate(0, subject = problem);
  };

  function textarea_input_handler() {
    message = this.value;
    $$invalidate(1, message);
  }

  $$self.$capture_state = function () {
    return {
      clickOutside: clickOutside,
      subject: subject,
      message: message,
      isPickerOpen: isPickerOpen,
      problems: problems
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("subject" in $$props) $$invalidate(0, subject = $$props.subject);
    if ("message" in $$props) $$invalidate(1, message = $$props.message);
    if ("isPickerOpen" in $$props) $$invalidate(2, isPickerOpen = $$props.isPickerOpen);
    if ("problems" in $$props) $$invalidate(3, problems = $$props.problems);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [subject, message, isPickerOpen, problems, input_input_handler, click_handler, click_outside_handler, click_handler_1, textarea_input_handler];
}

var Contact = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Contact, _SvelteComponentDev);

  var _super = _createSuper(Contact);

  function Contact(options) {
    var _this;

    _classCallCheck(this, Contact);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Contact",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Contact;
}(SvelteComponentDev);

export default Contact;
