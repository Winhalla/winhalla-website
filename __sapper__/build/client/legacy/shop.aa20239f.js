import { y as _asyncToGenerator, z as regenerator, E as counter, F as callApi, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, s as safe_not_equal, O as validate_each_argument, f as element, t as text, g as space, j as claim_element, m as children, n as claim_text, k as detach_dev, l as claim_space, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, L as listen_dev, I as set_data_dev, M as prop_dev, R as destroy_each, J as toggle_class, N as run_all, q as query_selector_all, C as _slicedToArray, v as noop, w as validate_slots, D as onMount, H as goto, a3 as _toConsumableArray } from './client.ebfafddf.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\routes\\shop.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  child_ctx[13] = i;
  return child_ctx;
} // (118:8) {#if packs}


function create_if_block(ctx) {
  var div9;
  var div4;
  var h1;
  var t0;
  var t1;
  var div3;
  var img;
  var img_src_value;
  var img_alt_value;
  var t2;
  var div2;
  var div1;
  var p0;
  var t3_value =
  /*featuredItem*/
  ctx[1].name.toLowerCase().replace(/\-/g, " ") + "";
  var t3;
  var t4;
  var div0;
  var button;
  var p1;
  var b;
  var t5_value =
  /*featuredItem*/
  ctx[1].cost + "";
  var t5;
  var t6;
  var button_disabled_value;
  var t7;
  var div6;
  var h20;
  var t8;
  var t9;
  var div5;
  var t10;
  var div8;
  var h21;
  var t11;
  var t12;
  var div7;
  var mounted;
  var dispose;
  var each_value_1 =
  /*seasonPacks*/
  ctx[0];
  validate_each_argument(each_value_1);
  var each_blocks_1 = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var each_value =
  /*packs*/
  ctx[2];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var _i = 0; _i < each_value.length; _i += 1) {
    each_blocks[_i] = create_each_block(get_each_context(ctx, each_value, _i));
  }

  var block = {
    c: function create() {
      div9 = element("div");
      div4 = element("div");
      h1 = element("h1");
      t0 = text("Battle pass");
      t1 = space();
      div3 = element("div");
      img = element("img");
      t2 = space();
      div2 = element("div");
      div1 = element("div");
      p0 = element("p");
      t3 = text(t3_value);
      t4 = space();
      div0 = element("div");
      button = element("button");
      p1 = element("p");
      b = element("b");
      t5 = text(t5_value);
      t6 = text("$");
      t7 = space();
      div6 = element("div");
      h20 = element("h2");
      t8 = text("Season packs");
      t9 = space();
      div5 = element("div");

      for (var _i2 = 0; _i2 < each_blocks_1.length; _i2 += 1) {
        each_blocks_1[_i2].c();
      }

      t10 = space();
      div8 = element("div");
      h21 = element("h2");
      t11 = text("Packs");
      t12 = space();
      div7 = element("div");

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div9 = claim_element(nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      div4 = claim_element(div9_nodes, "DIV", {});
      var div4_nodes = children(div4);
      h1 = claim_element(div4_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Battle pass");
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      img = claim_element(div3_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, t3_value);
      p0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      button = claim_element(div0_nodes, "BUTTON", {
        disabled: true,
        class: true
      });
      var button_nodes = children(button);
      p1 = claim_element(button_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      b = claim_element(p1_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t5 = claim_text(b_nodes, t5_value);
      b_nodes.forEach(detach_dev);
      t6 = claim_text(p1_nodes, "$");
      p1_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      t7 = claim_space(div9_nodes);
      div6 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      h20 = claim_element(div6_nodes, "H2", {
        class: true
      });
      var h20_nodes = children(h20);
      t8 = claim_text(h20_nodes, "Season packs");
      h20_nodes.forEach(detach_dev);
      t9 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);

      for (var _i4 = 0; _i4 < each_blocks_1.length; _i4 += 1) {
        each_blocks_1[_i4].l(div5_nodes);
      }

      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      t10 = claim_space(div9_nodes);
      div8 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      h21 = claim_element(div8_nodes, "H2", {
        class: true
      });
      var h21_nodes = children(h21);
      t11 = claim_text(h21_nodes, "Packs");
      h21_nodes.forEach(detach_dev);
      t12 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].l(div7_nodes);
      }

      div7_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      div9_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "text-6xl text-center lg:text-left");
      add_location(h1, file, 120, 20, 5286);
      attr_dev(img, "class", "w-full h-full block object-cover");
      if (img.src !== (img_src_value = "assets/ShopItems/" +
      /*featuredItem*/
      ctx[1].name + ".jpg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*featuredItem*/
      ctx[1].name);
      add_location(img, file, 125, 24, 5566);
      attr_dev(p0, "class", "text-accent text-6xl");
      add_location(p0, file, 133, 32, 6046);
      attr_dev(b, "class", "mr-1 font-normal");
      add_location(b, file, 144, 44, 6777);
      attr_dev(p1, "class", "text-2xl");
      add_location(p1, file, 143, 40, 6711);
      button.disabled = button_disabled_value =
      /*featuredItem*/
      ctx[1].unBuyable;
      attr_dev(button, "class", "px-4 py-1 bg-primary rounded svelte-14qgjwn");
      add_location(button, file, 139, 36, 6407);
      attr_dev(div0, "class", "flex justify-end md:block pb-1");
      add_location(div0, file, 138, 32, 6325);
      attr_dev(div1, "class", "md:flex justify-between w-full md:items-center");
      add_location(div1, file, 131, 28, 5919);
      attr_dev(div2, "class", "absolute bottom-0 z-10 px-5 md:px-10 pb-3 w-full");
      add_location(div2, file, 129, 24, 5798);
      attr_dev(div3, "class", "card xl:w-70% 2xl:w-60% xl:h-85% 2xl:h-80% mt-2 mx-5 mb-7 lg:ml-0 lg:mb-0 shop-item svelte-14qgjwn");
      add_location(div3, file, 123, 20, 5418);
      add_location(div4, file, 119, 16, 5259);
      attr_dev(h20, "class", "text-6xl text-center lg:text-left");
      add_location(h20, file, 154, 20, 7198);
      attr_dev(div5, "class", "mt-2 flex flex-col items-center lg:flex-row lg:items-start");
      add_location(div5, file, 157, 20, 7331);
      attr_dev(div6, "class", "pt-8 lg:pt-16");
      add_location(div6, file, 153, 16, 7149);
      attr_dev(h21, "class", "text-6xl text-center lg:text-left");
      add_location(h21, file, 216, 20, 11085);
      attr_dev(div7, "class", "mt-2 flex flex-col items-center lg:flex-row lg:items-start");
      add_location(div7, file, 217, 20, 11163);
      attr_dev(div8, "class", "pt-8 lg:pt-20 lg:pb-6");
      add_location(div8, file, 215, 16, 11028);
      attr_dev(div9, "class", "mt-7 lg:mt-12 lg:ml-24");
      add_location(div9, file, 118, 12, 5205);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div9, anchor);
      append_dev(div9, div4);
      append_dev(div4, h1);
      append_dev(h1, t0);
      append_dev(div4, t1);
      append_dev(div4, div3);
      append_dev(div3, img);
      append_dev(div3, t2);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, p0);
      append_dev(p0, t3);
      append_dev(div1, t4);
      append_dev(div1, div0);
      append_dev(div0, button);
      append_dev(button, p1);
      append_dev(p1, b);
      append_dev(b, t5);
      append_dev(p1, t6);
      append_dev(div9, t7);
      append_dev(div9, div6);
      append_dev(div6, h20);
      append_dev(h20, t8);
      append_dev(div6, t9);
      append_dev(div6, div5);

      for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
        each_blocks_1[_i6].m(div5, null);
      }

      append_dev(div9, t10);
      append_dev(div9, div8);
      append_dev(div8, h21);
      append_dev(h21, t11);
      append_dev(div8, t12);
      append_dev(div8, div7);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div7, null);
      }

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler*/
        ctx[4], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*featuredItem*/
      2 && img.src !== (img_src_value = "assets/ShopItems/" +
      /*featuredItem*/
      ctx[1].name + ".jpg")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*featuredItem*/
      2 && img_alt_value !== (img_alt_value =
      /*featuredItem*/
      ctx[1].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*featuredItem*/
      2 && t3_value !== (t3_value =
      /*featuredItem*/
      ctx[1].name.toLowerCase().replace(/\-/g, " ") + "")) set_data_dev(t3, t3_value);
      if (dirty &
      /*featuredItem*/
      2 && t5_value !== (t5_value =
      /*featuredItem*/
      ctx[1].cost + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*featuredItem*/
      2 && button_disabled_value !== (button_disabled_value =
      /*featuredItem*/
      ctx[1].unBuyable)) {
        prop_dev(button, "disabled", button_disabled_value);
      }

      if (dirty &
      /*seasonPacks, callApi, handleDescriptionToggle*/
      9) {
        each_value_1 =
        /*seasonPacks*/
        ctx[0];
        validate_each_argument(each_value_1);

        var _i8;

        for (_i8 = 0; _i8 < each_value_1.length; _i8 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i8);

          if (each_blocks_1[_i8]) {
            each_blocks_1[_i8].p(child_ctx, dirty);
          } else {
            each_blocks_1[_i8] = create_each_block_1(child_ctx);

            each_blocks_1[_i8].c();

            each_blocks_1[_i8].m(div5, null);
          }
        }

        for (; _i8 < each_blocks_1.length; _i8 += 1) {
          each_blocks_1[_i8].d(1);
        }

        each_blocks_1.length = each_value_1.length;
      }

      if (dirty &
      /*packs, callApi*/
      4) {
        each_value =
        /*packs*/
        ctx[2];
        validate_each_argument(each_value);

        var _i9;

        for (_i9 = 0; _i9 < each_value.length; _i9 += 1) {
          var _child_ctx = get_each_context(ctx, each_value, _i9);

          if (each_blocks[_i9]) {
            each_blocks[_i9].p(_child_ctx, dirty);
          } else {
            each_blocks[_i9] = create_each_block(_child_ctx);

            each_blocks[_i9].c();

            each_blocks[_i9].m(div7, null);
          }
        }

        for (; _i9 < each_blocks.length; _i9 += 1) {
          each_blocks[_i9].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div9);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(118:8) {#if packs}",
    ctx: ctx
  });
  return block;
} // (160:24) {#each seasonPacks as seasonPack, i}


function create_each_block_1(ctx) {
  var div4;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var div3;
  var p0;
  var t1_value =
  /*seasonPack*/
  ctx[11].name.toLowerCase().replace(/\-/g, " ") + "";
  var t1;
  var t2;
  var p1;
  var t3_value =
  /*seasonPack*/
  ctx[11].description + "";
  var t3;
  var t4;
  var div2;
  var div1;
  var div0;
  var p2;
  var t5_value =
  /*seasonPack*/
  ctx[11].description + "";
  var t5;
  var t6;
  var button0;
  var p3;
  var t7_value = (
  /*seasonPack*/
  ctx[11].isDescriptionToggled ? "Hide description" : "Show description") + "";
  var t7;
  var t8;
  var button1;
  var p4;
  var b;
  var t9_value =
  /*seasonPack*/
  ctx[11].cost + "";
  var t9;
  var t10;
  var button1_disabled_value;
  var t11;
  var mounted;
  var dispose;

  function click_handler_1() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler_1*/
      (_ctx = ctx)[5].apply(_ctx, [
      /*seasonPack*/
      ctx[11]].concat(args))
    );
  }

  function click_handler_2() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*click_handler_2*/
      (_ctx2 = ctx)[6].apply(_ctx2, [
      /*seasonPack*/
      ctx[11]].concat(args))
    );
  }

  var block = {
    c: function create() {
      div4 = element("div");
      img = element("img");
      t0 = space();
      div3 = element("div");
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      p1 = element("p");
      t3 = text(t3_value);
      t4 = space();
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      p2 = element("p");
      t5 = text(t5_value);
      t6 = space();
      button0 = element("button");
      p3 = element("p");
      t7 = text(t7_value);
      t8 = space();
      button1 = element("button");
      p4 = element("p");
      b = element("b");
      t9 = text(t9_value);
      t10 = text("$");
      t11 = space();
      this.h();
    },
    l: function claim(nodes) {
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      img = claim_element(div4_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t0 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      p0 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      p1 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, t3_value);
      p1_nodes.forEach(detach_dev);
      t4 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);
      p2 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      t5 = claim_text(p2_nodes, t5_value);
      p2_nodes.forEach(detach_dev);
      t6 = claim_space(div0_nodes);
      button0 = claim_element(div0_nodes, "BUTTON", {
        class: true
      });
      var button0_nodes = children(button0);
      p3 = claim_element(button0_nodes, "P", {
        class: true
      });
      var p3_nodes = children(p3);
      t7 = claim_text(p3_nodes, t7_value);
      p3_nodes.forEach(detach_dev);
      button0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t8 = claim_space(div2_nodes);
      button1 = claim_element(div2_nodes, "BUTTON", {
        disabled: true,
        class: true
      });
      var button1_nodes = children(button1);
      p4 = claim_element(button1_nodes, "P", {
        class: true
      });
      var p4_nodes = children(p4);
      b = claim_element(p4_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t9 = claim_text(b_nodes, t9_value);
      b_nodes.forEach(detach_dev);
      t10 = claim_text(p4_nodes, "$");
      p4_nodes.forEach(detach_dev);
      button1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t11 = claim_space(div4_nodes);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "class", "w-full h-full block ");
      if (img.src !== (img_src_value = "assets/ShopItems/" +
      /*seasonPack*/
      ctx[11].name + ".jpg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*seasonPack*/
      ctx[11].name);
      add_location(img, file, 162, 32, 7684);
      attr_dev(p0, "class", "text-accent text-5xl md:mb-0 md:block");
      toggle_class(p0, "hidden",
      /*seasonPack*/
      ctx[11].isDescriptionToggled);
      toggle_class(p0, "-mb-1", !
      /*seasonPack*/
      ctx[11].isDescriptionToggled);
      add_location(p0, file, 168, 36, 8060);
      attr_dev(p1, "class", "block xl:mt-0");
      toggle_class(p1, "hidden", !
      /*seasonPack*/
      ctx[11].isDescriptionToggled);
      add_location(p1, file, 176, 36, 8591);
      attr_dev(p2, "class", "hidden xl:block mr-1 -mb-2");
      add_location(p2, file, 186, 48, 9174);
      attr_dev(p3, "class", " text-light text-lg underline leading-none");
      add_location(p3, file, 193, 52, 9712);
      attr_dev(button0, "class", "focus:outline-none xl:hidden -mb-10 svelte-14qgjwn");
      add_location(button0, file, 190, 48, 9447);
      add_location(div0, file, 185, 44, 9119);
      attr_dev(div1, "class", "-mb-2 md:mb-0");
      add_location(div1, file, 184, 40, 9046);
      attr_dev(b, "class", "mr-1 font-normal");
      add_location(b, file, 205, 48, 10601);
      attr_dev(p4, "class", "text-2xl");
      add_location(p4, file, 204, 44, 10531);
      button1.disabled = button1_disabled_value =
      /*seasonPack*/
      ctx[11].unBuyable;
      attr_dev(button1, "class", "px-4 py-1 bg-primary rounded svelte-14qgjwn");
      add_location(button1, file, 200, 40, 10215);
      attr_dev(div2, "class", "flex justify-between w-full items-end pr-4 md:pr-5 pb-1");
      add_location(div2, file, 182, 36, 8894);
      attr_dev(div3, "class", "absolute bottom-0 z-10 pl-5 pb-3 w-full");
      add_location(div3, file, 166, 32, 7932);
      attr_dev(div4, "class", "mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 test shop-item xl:w-shopItemLarge 2xl:w-shopItem svelte-14qgjwn");
      add_location(div4, file, 160, 28, 7520);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div4, anchor);
      append_dev(div4, img);
      append_dev(div4, t0);
      append_dev(div4, div3);
      append_dev(div3, p0);
      append_dev(p0, t1);
      append_dev(div3, t2);
      append_dev(div3, p1);
      append_dev(p1, t3);
      append_dev(div3, t4);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, div0);
      append_dev(div0, p2);
      append_dev(p2, t5);
      append_dev(div0, t6);
      append_dev(div0, button0);
      append_dev(button0, p3);
      append_dev(p3, t7);
      append_dev(div2, t8);
      append_dev(div2, button1);
      append_dev(button1, p4);
      append_dev(p4, b);
      append_dev(b, t9);
      append_dev(p4, t10);
      append_dev(div4, t11);

      if (!mounted) {
        dispose = [listen_dev(button0, "click", click_handler_1, false, false, false), listen_dev(button1, "click", click_handler_2, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*seasonPacks*/
      1 && img.src !== (img_src_value = "assets/ShopItems/" +
      /*seasonPack*/
      ctx[11].name + ".jpg")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*seasonPacks*/
      1 && img_alt_value !== (img_alt_value =
      /*seasonPack*/
      ctx[11].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*seasonPacks*/
      1 && t1_value !== (t1_value =
      /*seasonPack*/
      ctx[11].name.toLowerCase().replace(/\-/g, " ") + "")) set_data_dev(t1, t1_value);

      if (dirty &
      /*seasonPacks*/
      1) {
        toggle_class(p0, "hidden",
        /*seasonPack*/
        ctx[11].isDescriptionToggled);
      }

      if (dirty &
      /*seasonPacks*/
      1) {
        toggle_class(p0, "-mb-1", !
        /*seasonPack*/
        ctx[11].isDescriptionToggled);
      }

      if (dirty &
      /*seasonPacks*/
      1 && t3_value !== (t3_value =
      /*seasonPack*/
      ctx[11].description + "")) set_data_dev(t3, t3_value);

      if (dirty &
      /*seasonPacks*/
      1) {
        toggle_class(p1, "hidden", !
        /*seasonPack*/
        ctx[11].isDescriptionToggled);
      }

      if (dirty &
      /*seasonPacks*/
      1 && t5_value !== (t5_value =
      /*seasonPack*/
      ctx[11].description + "")) set_data_dev(t5, t5_value);
      if (dirty &
      /*seasonPacks*/
      1 && t7_value !== (t7_value = (
      /*seasonPack*/
      ctx[11].isDescriptionToggled ? "Hide description" : "Show description") + "")) set_data_dev(t7, t7_value);
      if (dirty &
      /*seasonPacks*/
      1 && t9_value !== (t9_value =
      /*seasonPack*/
      ctx[11].cost + "")) set_data_dev(t9, t9_value);

      if (dirty &
      /*seasonPacks*/
      1 && button1_disabled_value !== (button1_disabled_value =
      /*seasonPack*/
      ctx[11].unBuyable)) {
        prop_dev(button1, "disabled", button1_disabled_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div4);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(160:24) {#each seasonPacks as seasonPack, i}",
    ctx: ctx
  });
  return block;
} // (220:24) {#each packs as pack}


function create_each_block(ctx) {
  var div4;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var div3;
  var p0;
  var t1_value =
  /*pack*/
  ctx[8].name.toLowerCase().replace(/\-/g, " ") + "";
  var t1;
  var t2;
  var div2;
  var div1;
  var div0;
  var p1;
  var t3_value =
  /*pack*/
  ctx[8].description + "";
  var t3;
  var t4;
  var button;
  var p2;
  var b;
  var t5_value =
  /*pack*/
  ctx[8].cost + "";
  var t5;
  var t6;
  var button_disabled_value;
  var t7;
  var mounted;
  var dispose;

  function click_handler_3() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*click_handler_3*/
      (_ctx3 = ctx)[7].apply(_ctx3, [
      /*pack*/
      ctx[8]].concat(args))
    );
  }

  var block = {
    c: function create() {
      div4 = element("div");
      img = element("img");
      t0 = space();
      div3 = element("div");
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      p1 = element("p");
      t3 = text(t3_value);
      t4 = space();
      button = element("button");
      p2 = element("p");
      b = element("b");
      t5 = text(t5_value);
      t6 = text("$");
      t7 = space();
      this.h();
    },
    l: function claim(nodes) {
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      img = claim_element(div4_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t0 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      p0 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {});
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, t3_value);
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t4 = claim_space(div2_nodes);
      button = claim_element(div2_nodes, "BUTTON", {
        disabled: true,
        class: true
      });
      var button_nodes = children(button);
      p2 = claim_element(button_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      b = claim_element(p2_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t5 = claim_text(b_nodes, t5_value);
      b_nodes.forEach(detach_dev);
      t6 = claim_text(p2_nodes, "$");
      p2_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t7 = claim_space(div4_nodes);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "class", "w-full h-full block object-cover");
      if (img.src !== (img_src_value = "assets/ShopItems/" +
      /*pack*/
      ctx[8].name + ".jpg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*pack*/
      ctx[8].name);
      add_location(img, file, 222, 32, 11476);
      attr_dev(p0, "class", "text-accent text-5xl");
      add_location(p0, file, 228, 36, 11852);
      attr_dev(p1, "class", "block mr-1 -mb-2");
      add_location(p1, file, 238, 48, 12390);
      add_location(div0, file, 237, 44, 12335);
      add_location(div1, file, 236, 40, 12284);
      attr_dev(b, "class", "mr-1 font-normal");
      add_location(b, file, 248, 48, 13060);
      attr_dev(p2, "class", "text-2xl");
      add_location(p2, file, 247, 44, 12990);
      button.disabled = button_disabled_value =
      /*pack*/
      ctx[8].unBuyable;
      attr_dev(button, "class", "px-4 py-1 bg-primary rounded svelte-14qgjwn");
      add_location(button, file, 243, 40, 12686);
      attr_dev(div2, "class", "flex justify-between w-full items-end pb-1");
      add_location(div2, file, 234, 36, 12145);
      attr_dev(div3, "class", "absolute bottom-0 z-10 px-5 pb-3 w-full");
      add_location(div3, file, 226, 32, 11724);
      attr_dev(div4, "class", "mx-5 mb-7 lg:ml-0 lg:mb-0 lg:mr-12 xl:w-shopItem shop-item svelte-14qgjwn");
      add_location(div4, file, 220, 28, 11337);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div4, anchor);
      append_dev(div4, img);
      append_dev(div4, t0);
      append_dev(div4, div3);
      append_dev(div3, p0);
      append_dev(p0, t1);
      append_dev(div3, t2);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(div2, t4);
      append_dev(div2, button);
      append_dev(button, p2);
      append_dev(p2, b);
      append_dev(b, t5);
      append_dev(p2, t6);
      append_dev(div4, t7);

      if (!mounted) {
        dispose = listen_dev(button, "click", click_handler_3, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*packs*/
      4 && img.src !== (img_src_value = "assets/ShopItems/" +
      /*pack*/
      ctx[8].name + ".jpg")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*packs*/
      4 && img_alt_value !== (img_alt_value =
      /*pack*/
      ctx[8].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*packs*/
      4 && t1_value !== (t1_value =
      /*pack*/
      ctx[8].name.toLowerCase().replace(/\-/g, " ") + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*packs*/
      4 && t3_value !== (t3_value =
      /*pack*/
      ctx[8].description + "")) set_data_dev(t3, t3_value);
      if (dirty &
      /*packs*/
      4 && t5_value !== (t5_value =
      /*pack*/
      ctx[8].cost + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*packs*/
      4 && button_disabled_value !== (button_disabled_value =
      /*pack*/
      ctx[8].unBuyable)) {
        prop_dev(button, "disabled", button_disabled_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div4);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(220:24) {#each packs as pack}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var meta;
  var link;
  var t0;
  var div6;
  var div0;
  var t1;
  var div5;
  var h3;
  var t2;
  var t3;
  var div4;
  var div1;
  var p0;
  var t4;
  var t5;
  var p1;
  var t6;
  var t7;
  var p2;
  var t8;
  var t9;
  var div2;
  var p3;
  var t10;
  var t11;
  var p4;
  var t12;
  var t13;
  var p5;
  var t14;
  var t15;
  var div3;
  var p6;
  var t16;
  var t17;
  var p7;
  var t18;
  var t19;
  var p8;
  var t20;
  var if_block =
  /*packs*/
  ctx[2] && create_if_block(ctx);
  var block = {
    c: function create() {
      meta = element("meta");
      link = element("link");
      t0 = space();
      div6 = element("div");
      div0 = element("div");
      if (if_block) if_block.c();
      t1 = space();
      div5 = element("div");
      h3 = element("h3");
      t2 = text("How does it works ?");
      t3 = space();
      div4 = element("div");
      div1 = element("div");
      p0 = element("p");
      t4 = text("1.");
      t5 = space();
      p1 = element("p");
      t6 = text("Click");
      t7 = space();
      p2 = element("p");
      t8 = text("Click on the item you want to purchase");
      t9 = space();
      div2 = element("div");
      p3 = element("p");
      t10 = text("2.");
      t11 = space();
      p4 = element("p");
      t12 = text("Add");
      t13 = space();
      p5 = element("p");
      t14 = text("Add the Winhalla Steam account to your friend list");
      t15 = space();
      div3 = element("div");
      p6 = element("p");
      t16 = text("3.");
      t17 = space();
      p7 = element("p");
      t18 = text("Receive");
      t19 = space();
      p8 = element("p");
      t20 = text("You will receive the item you purchased within 1 week to 1\r\n                    month");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-i7b2h7\"]", document.head);
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
      div6 = claim_element(nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div0 = claim_element(div6_nodes, "DIV", {});
      var div0_nodes = children(div0);
      if (if_block) if_block.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      h3 = claim_element(div5_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t2 = claim_text(h3_nodes, "How does it works ?");
      h3_nodes.forEach(detach_dev);
      t3 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div1 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t4 = claim_text(p0_nodes, "1.");
      p0_nodes.forEach(detach_dev);
      t5 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t6 = claim_text(p1_nodes, "Click");
      p1_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      p2 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      t8 = claim_text(p2_nodes, "Click on the item you want to purchase");
      p2_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(div4_nodes);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      p3 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p3_nodes = children(p3);
      t10 = claim_text(p3_nodes, "2.");
      p3_nodes.forEach(detach_dev);
      t11 = claim_space(div2_nodes);
      p4 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p4_nodes = children(p4);
      t12 = claim_text(p4_nodes, "Add");
      p4_nodes.forEach(detach_dev);
      t13 = claim_space(div2_nodes);
      p5 = claim_element(div2_nodes, "P", {
        class: true
      });
      var p5_nodes = children(p5);
      t14 = claim_text(p5_nodes, "Add the Winhalla Steam account to your friend list");
      p5_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t15 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      p6 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p6_nodes = children(p6);
      t16 = claim_text(p6_nodes, "3.");
      p6_nodes.forEach(detach_dev);
      t17 = claim_space(div3_nodes);
      p7 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p7_nodes = children(p7);
      t18 = claim_text(p7_nodes, "Receive");
      p7_nodes.forEach(detach_dev);
      t19 = claim_space(div3_nodes);
      p8 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p8_nodes = children(p8);
      t20 = claim_text(p8_nodes, "You will receive the item you purchased within 1 week to 1\r\n                    month");
      p8_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Shop - Winhalla, Play Brawlhalla. Earn rewards.";
      attr_dev(meta, "name", "description");
      attr_dev(meta, "content", "Play Brawlhalla. Earn rewards. | Legit & Free Mammoth coins,\r\n        Battle Pass and Season packs| Exchange here your coins into rewards |\r\n        Winhalla Shop page ");
      add_location(meta, file, 82, 4, 3827);
      attr_dev(link, "rel", "canonical");
      attr_dev(link, "href", "https://winhalla.appspot.com/shop");
      add_location(link, file, 87, 4, 4057);
      add_location(div0, file, 116, 4, 5165);
      attr_dev(h3, "class", "text-5xl lg:mr-12 text-center lg:text-left");
      add_location(h3, file, 263, 8, 13640);
      attr_dev(p0, "class", "text-4xl leading-none text-accent");
      add_location(p0, file, 268, 16, 13836);
      attr_dev(p1, "class", "text-4xl text-primary ml-2 leading-none");
      add_location(p1, file, 269, 16, 13905);
      attr_dev(p2, "class", "-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 2xl:mt-0 2xl:mb-0");
      add_location(p2, file, 270, 16, 13983);
      attr_dev(div1, "class", "mt-4 flex items-end");
      add_location(div1, file, 267, 12, 13785);
      attr_dev(p3, "class", "text-4xl leading-none text-accent");
      add_location(p3, file, 276, 16, 14266);
      attr_dev(p4, "class", "text-4xl text-primary ml-2 leading-none");
      add_location(p4, file, 277, 16, 14335);
      attr_dev(p5, "class", "-mb-7 mt-8 md:mt-0 md:mb-0 text-light leading-tight ml-2 xl:-mb-7 xl:mt-8 2xl:mt-0 2xl:mb-0");
      add_location(p5, file, 278, 16, 14411);
      attr_dev(div2, "class", "mt-4 flex items-end");
      add_location(div2, file, 275, 12, 14215);
      attr_dev(p6, "class", "text-4xl leading-none text-accent");
      add_location(p6, file, 284, 16, 14714);
      attr_dev(p7, "class", "text-4xl text-primary ml-2 leading-none");
      add_location(p7, file, 285, 16, 14783);
      attr_dev(p8, "class", "receive -mb-14 mt-8 sm:mt-0 sm:mb-0  text-light leading-tight ml-2 xl:-mb-14 xl:mt-8 2xl:mt-0 2xl:-mb-7");
      add_location(p8, file, 286, 16, 14863);
      attr_dev(div3, "class", "mt-4 flex items-end");
      add_location(div3, file, 283, 12, 14663);
      attr_dev(div4, "class", "pt-4");
      add_location(div4, file, 266, 8, 13753);
      attr_dev(div5, "class", "mb-20 md:mb-8 mx-5    xl:right-0 mt-7 lg:mt-16 lg:ml-24 lg:mx-0 xl:fixed xl:w-1/4 2xl:w-1/3");
      add_location(div5, file, 261, 4, 13516);
      attr_dev(div6, "class", "xl:flex xl:relative");
      add_location(div6, file, 115, 0, 5126);
    },
    m: function mount(target, anchor) {
      append_dev(document.head, meta);
      append_dev(document.head, link);
      insert_dev(target, t0, anchor);
      insert_dev(target, div6, anchor);
      append_dev(div6, div0);
      if (if_block) if_block.m(div0, null);
      append_dev(div6, t1);
      append_dev(div6, div5);
      append_dev(div5, h3);
      append_dev(h3, t2);
      append_dev(div5, t3);
      append_dev(div5, div4);
      append_dev(div4, div1);
      append_dev(div1, p0);
      append_dev(p0, t4);
      append_dev(div1, t5);
      append_dev(div1, p1);
      append_dev(p1, t6);
      append_dev(div1, t7);
      append_dev(div1, p2);
      append_dev(p2, t8);
      append_dev(div4, t9);
      append_dev(div4, div2);
      append_dev(div2, p3);
      append_dev(p3, t10);
      append_dev(div2, t11);
      append_dev(div2, p4);
      append_dev(p4, t12);
      append_dev(div2, t13);
      append_dev(div2, p5);
      append_dev(p5, t14);
      append_dev(div4, t15);
      append_dev(div4, div3);
      append_dev(div3, p6);
      append_dev(p6, t16);
      append_dev(div3, t17);
      append_dev(div3, p7);
      append_dev(p7, t18);
      append_dev(div3, t19);
      append_dev(div3, p8);
      append_dev(p8, t20);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*packs*/
      ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(div0, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      detach_dev(meta);
      detach_dev(link);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div6);
      if (if_block) if_block.d();
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

function preload() {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var items, player, unsub, featuredItem, seasonPacks, packs;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return callApi("get", "/shop");

          case 2:
            items = _context.sent;
            unsub = counter.subscribe(function (value) {
              player = value.content;
            });
            unsub();

            if (player.user) {
              player = player.user.coins;
            } else {
              player = 0;
            }

            items.forEach(function (item, i) {
              items[i].isDescriptionToggled = false;
              items[i].unBuyable = false;
              item.name = item.name.toLowerCase().replace(/\s/g, "-");
              if (item.cost >= player) items[i].unBuyable = true;
            });
            _context.next = 9;
            return items.find(function (i) {
              return i.state === 0;
            });

          case 9:
            featuredItem = _context.sent;
            _context.next = 12;
            return items.filter(function (i) {
              return i.state === 1;
            });

          case 12:
            seasonPacks = _context.sent;
            _context.next = 15;
            return items.filter(function (i) {
              return i.state === 2;
            });

          case 15:
            packs = _context.sent;
            return _context.abrupt("return", {
              featuredItem: featuredItem,
              seasonPacks: seasonPacks,
              packs: packs
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var featuredItem = $$props.featuredItem;
  var seasonPacks = $$props.seasonPacks;
  var packs = $$props.packs;

  var handleDescriptionToggle = function handleDescriptionToggle(seasonPack) {
    seasonPack.isDescriptionToggled = !seasonPack.isDescriptionToggled;
    $$invalidate(0, seasonPacks = _toConsumableArray(seasonPacks));
  };

  var writable_props = ["featuredItem", "seasonPacks", "packs"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Shop> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Shop", $$slots, []);

  var click_handler = function click_handler() {
    return callApi("post", "/buy/".concat(featuredItem.id));
  };

  var click_handler_1 = function click_handler_1(seasonPack) {
    return handleDescriptionToggle(seasonPack);
  };

  var click_handler_2 = function click_handler_2(seasonPack) {
    return callApi("post", "/buy/".concat(seasonPack.id));
  };

  var click_handler_3 = function click_handler_3(pack) {
    return callApi("post", "/buy/".concat(pack.id));
  };

  $$self.$$set = function ($$props) {
    if ("featuredItem" in $$props) $$invalidate(1, featuredItem = $$props.featuredItem);
    if ("seasonPacks" in $$props) $$invalidate(0, seasonPacks = $$props.seasonPacks);
    if ("packs" in $$props) $$invalidate(2, packs = $$props.packs);
  };

  $$self.$capture_state = function () {
    return {
      callApi: callApi,
      onMount: onMount,
      counter: counter,
      goto: goto,
      preload: preload,
      featuredItem: featuredItem,
      seasonPacks: seasonPacks,
      packs: packs,
      handleDescriptionToggle: handleDescriptionToggle
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("featuredItem" in $$props) $$invalidate(1, featuredItem = $$props.featuredItem);
    if ("seasonPacks" in $$props) $$invalidate(0, seasonPacks = $$props.seasonPacks);
    if ("packs" in $$props) $$invalidate(2, packs = $$props.packs);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [seasonPacks, featuredItem, packs, handleDescriptionToggle, click_handler, click_handler_1, click_handler_2, click_handler_3];
}

var Shop = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Shop, _SvelteComponentDev);

  var _super = _createSuper(Shop);

  function Shop(options) {
    var _this;

    _classCallCheck(this, Shop);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      featuredItem: 1,
      seasonPacks: 0,
      packs: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Shop",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*featuredItem*/
    ctx[1] === undefined && !("featuredItem" in props)) {
      console.warn("<Shop> was created without expected prop 'featuredItem'");
    }

    if (
    /*seasonPacks*/
    ctx[0] === undefined && !("seasonPacks" in props)) {
      console.warn("<Shop> was created without expected prop 'seasonPacks'");
    }

    if (
    /*packs*/
    ctx[2] === undefined && !("packs" in props)) {
      console.warn("<Shop> was created without expected prop 'packs'");
    }

    return _this;
  }

  _createClass(Shop, [{
    key: "featuredItem",
    get: function get() {
      throw new Error("<Shop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Shop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "seasonPacks",
    get: function get() {
      throw new Error("<Shop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Shop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "packs",
    get: function get() {
      throw new Error("<Shop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Shop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Shop;
}(SvelteComponentDev);

export default Shop;
export { preload };
