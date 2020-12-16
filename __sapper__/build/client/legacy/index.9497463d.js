import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, O as validate_each_argument, w as validate_slots, T as empty, u as insert_dev, k as detach_dev, C as _slicedToArray, v as noop, R as destroy_each, f as element, g as space, t as text, h as svg_element, j as claim_element, m as children, l as claim_space, n as claim_text, o as attr_dev, p as add_location, r as append_dev, I as set_data_dev, B as globals, F as callApi, E as counter, L as listen_dev, X as set_style, Y as create_component, Z as claim_component, $ as mount_component, a0 as transition_in, a1 as transition_out, a2 as destroy_component, y as _asyncToGenerator, z as regenerator, a3 as _toConsumableArray, q as query_selector_all, a4 as check_outros, a5 as group_outros } from './client.3590f68c.js';
import { R as RefreshButton } from './RefreshButton.0ffc4a02.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "C:\\CODAGE\\artemis-front\\src\\components\\GameModeCards.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
} // (155:4) {:else}


function create_else_block(ctx) {
  var div4;
  var div2;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var div1;
  var h3;
  var t1_value =
  /*gameMode*/
  ctx[1].name + "";
  var t1;
  var t2;
  var div0;
  var p0;
  var raw0_value =
  /*gameMode*/
  ctx[1].description + "";
  var t3;
  var p1;
  var raw1_value =
  /*gameMode*/
  ctx[1].goal + "";
  var t4;
  var p2;
  var raw2_value =
  /*gameMode*/
  ctx[1].duration + "";
  var t5;
  var div3;
  var svg;
  var path;
  var t6;
  var p3;
  var t7;
  var t8;
  var block = {
    c: function create() {
      div4 = element("div");
      div2 = element("div");
      img = element("img");
      t0 = space();
      div1 = element("div");
      h3 = element("h3");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p0 = element("p");
      t3 = space();
      p1 = element("p");
      t4 = space();
      p2 = element("p");
      t5 = space();
      div3 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t6 = space();
      p3 = element("p");
      t7 = text("Coming soon");
      t8 = space();
      this.h();
    },
    l: function claim(nodes) {
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      img = claim_element(div2_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h3 = claim_element(div1_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t1 = claim_text(h3_nodes, t1_value);
      h3_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      p0_nodes.forEach(detach_dev);
      t3 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      p1_nodes.forEach(detach_dev);
      t4 = claim_space(div0_nodes);
      p2 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      p2_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t5 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      svg = claim_element(div3_nodes, "svg", {
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
      t6 = claim_space(div3_nodes);
      p3 = claim_element(div3_nodes, "P", {
        class: true
      });
      var p3_nodes = children(p3);
      t7 = claim_text(p3_nodes, "Coming soon");
      p3_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t8 = claim_space(div4_nodes);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "../assets/ModeBanners/" +
      /*gameMode*/
      ctx[1].name + ".jpg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*gameMode*/
      ctx[1].name);
      attr_dev(img, "class", "game-mode-image svelte-1pirocb");
      add_location(img, file, 158, 16, 3647);
      attr_dev(h3, "class", " svelte-1pirocb");
      add_location(h3, file, 165, 20, 3910);
      attr_dev(p0, "class", "desc svelte-1pirocb");
      add_location(p0, file, 170, 24, 4083);
      attr_dev(p1, "class", "goal svelte-1pirocb");
      add_location(p1, file, 173, 24, 4213);
      attr_dev(p2, "class", "duration svelte-1pirocb");
      add_location(p2, file, 176, 24, 4336);
      attr_dev(div0, "class", "stats svelte-1pirocb");
      add_location(div0, file, 169, 20, 4038);
      attr_dev(div1, "class", "game-mode-text-container svelte-1pirocb");
      add_location(div1, file, 163, 16, 3829);
      attr_dev(div2, "class", "h-full locked-gradient svelte-1pirocb");
      add_location(div2, file, 157, 12, 3593);
      attr_dev(path, "d", "m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z");
      add_location(path, file, 186, 20, 4760);
      attr_dev(svg, "class", "fill-current text-disabled w-12 mx-auto");
      attr_dev(svg, "viewBox", "0 0 20 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file, 184, 16, 4608);
      attr_dev(p3, "class", "mt-1 text-light svelte-1pirocb");
      add_location(p3, file, 190, 16, 5280);
      attr_dev(div3, "class", "absolute lock svelte-1pirocb");
      add_location(div3, file, 182, 12, 4527);
      attr_dev(div4, "class", "game-mode-card block relative shadow-card border border-transparent mb-10 lg:mb-0 lg:mr-15 relative svelte-1pirocb");
      add_location(div4, file, 155, 8, 3464);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div4, anchor);
      append_dev(div4, div2);
      append_dev(div2, img);
      append_dev(div2, t0);
      append_dev(div2, div1);
      append_dev(div1, h3);
      append_dev(h3, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p0);
      p0.innerHTML = raw0_value;
      append_dev(div0, t3);
      append_dev(div0, p1);
      p1.innerHTML = raw1_value;
      append_dev(div0, t4);
      append_dev(div0, p2);
      p2.innerHTML = raw2_value;
      append_dev(div4, t5);
      append_dev(div4, div3);
      append_dev(div3, svg);
      append_dev(svg, path);
      append_dev(div3, t6);
      append_dev(div3, p3);
      append_dev(p3, t7);
      append_dev(div4, t8);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*gameModes*/
      1 && img.src !== (img_src_value = "../assets/ModeBanners/" +
      /*gameMode*/
      ctx[1].name + ".jpg")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*gameModes*/
      1 && img_alt_value !== (img_alt_value =
      /*gameMode*/
      ctx[1].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*gameModes*/
      1 && t1_value !== (t1_value =
      /*gameMode*/
      ctx[1].name + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*gameModes*/
      1 && raw0_value !== (raw0_value =
      /*gameMode*/
      ctx[1].description + "")) p0.innerHTML = raw0_value;
      if (dirty &
      /*gameModes*/
      1 && raw1_value !== (raw1_value =
      /*gameMode*/
      ctx[1].goal + "")) p1.innerHTML = raw1_value;
      if (dirty &
      /*gameModes*/
      1 && raw2_value !== (raw2_value =
      /*gameMode*/
      ctx[1].duration + "")) p2.innerHTML = raw2_value;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div4);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(155:4) {:else}",
    ctx: ctx
  });
  return block;
} // (123:4) {#if gameMode.available}


function create_if_block(ctx) {
  var a;
  var div2;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var div1;
  var h3;
  var t1_value =
  /*gameMode*/
  ctx[1].name + "";
  var t1;
  var t2;
  var div0;
  var p0;
  var raw0_value =
  /*gameMode*/
  ctx[1].description + "";
  var t3;
  var p1;
  var raw1_value =
  /*gameMode*/
  ctx[1].goal + "";
  var t4;
  var p2;
  var raw2_value =
  /*gameMode*/
  ctx[1].duration + "";
  var t5;
  var a_href_value;
  var block = {
    c: function create() {
      a = element("a");
      div2 = element("div");
      img = element("img");
      t0 = space();
      div1 = element("div");
      h3 = element("h3");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p0 = element("p");
      t3 = space();
      p1 = element("p");
      t4 = space();
      p2 = element("p");
      t5 = space();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      div2 = claim_element(a_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      img = claim_element(div2_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h3 = claim_element(div1_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t1 = claim_text(h3_nodes, t1_value);
      h3_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      p0_nodes.forEach(detach_dev);
      t3 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      p1_nodes.forEach(detach_dev);
      t4 = claim_space(div0_nodes);
      p2 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      p2_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t5 = claim_space(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "../assets/ModeBanners/" +
      /*gameMode*/
      ctx[1].name + ".jpg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*gameMode*/
      ctx[1].name);
      attr_dev(img, "class", "game-mode-image object-cover block svelte-1pirocb");
      add_location(img, file, 130, 16, 2544);
      attr_dev(h3, "class", " svelte-1pirocb");
      add_location(h3, file, 136, 20, 2824);
      attr_dev(p0, "class", "desc svelte-1pirocb");
      add_location(p0, file, 141, 24, 2997);
      attr_dev(p1, "class", "goal svelte-1pirocb");
      add_location(p1, file, 144, 24, 3127);
      attr_dev(p2, "class", "duration svelte-1pirocb");
      add_location(p2, file, 147, 24, 3250);
      attr_dev(div0, "class", "stats svelte-1pirocb");
      add_location(div0, file, 140, 20, 2952);
      attr_dev(div1, "class", "game-mode-text-container svelte-1pirocb");
      add_location(div1, file, 134, 16, 2743);
      attr_dev(div2, "class", "h-full");
      add_location(div2, file, 129, 12, 2506);
      attr_dev(a, "class", "game-mode-card block relative shadow-card border\r\n                        border-transparent hover:border-primary\r\n                        hover:shadow-card-hover mb-10 lg:mb-0 lg:mr-15 relative svelte-1pirocb");
      attr_dev(a, "href", a_href_value = "/play/" +
      /*gameMode*/
      ctx[1].name);
      add_location(a, file, 123, 8, 2229);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, div2);
      append_dev(div2, img);
      append_dev(div2, t0);
      append_dev(div2, div1);
      append_dev(div1, h3);
      append_dev(h3, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p0);
      p0.innerHTML = raw0_value;
      append_dev(div0, t3);
      append_dev(div0, p1);
      p1.innerHTML = raw1_value;
      append_dev(div0, t4);
      append_dev(div0, p2);
      p2.innerHTML = raw2_value;
      append_dev(a, t5);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*gameModes*/
      1 && img.src !== (img_src_value = "../assets/ModeBanners/" +
      /*gameMode*/
      ctx[1].name + ".jpg")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*gameModes*/
      1 && img_alt_value !== (img_alt_value =
      /*gameMode*/
      ctx[1].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*gameModes*/
      1 && t1_value !== (t1_value =
      /*gameMode*/
      ctx[1].name + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*gameModes*/
      1 && raw0_value !== (raw0_value =
      /*gameMode*/
      ctx[1].description + "")) p0.innerHTML = raw0_value;
      if (dirty &
      /*gameModes*/
      1 && raw1_value !== (raw1_value =
      /*gameMode*/
      ctx[1].goal + "")) p1.innerHTML = raw1_value;
      if (dirty &
      /*gameModes*/
      1 && raw2_value !== (raw2_value =
      /*gameMode*/
      ctx[1].duration + "")) p2.innerHTML = raw2_value;

      if (dirty &
      /*gameModes*/
      1 && a_href_value !== (a_href_value = "/play/" +
      /*gameMode*/
      ctx[1].name)) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(123:4) {#if gameMode.available}",
    ctx: ctx
  });
  return block;
} // (122:0) {#each gameModes as gameMode}


function create_each_block(ctx) {
  var if_block_anchor;

  function select_block_type(ctx, dirty) {
    if (
    /*gameMode*/
    ctx[1].available) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(122:0) {#each gameModes as gameMode}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var each_1_anchor;
  var each_value =
  /*gameModes*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*gameModes*/
      1) {
        each_value =
        /*gameModes*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("GameModeCards", slots, []);
  var gameModes = $$props.gameModes;
  var writable_props = ["gameModes"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<GameModeCards> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("gameModes" in $$props) $$invalidate(0, gameModes = $$props.gameModes);
  };

  $$self.$capture_state = function () {
    return {
      gameModes: gameModes
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("gameModes" in $$props) $$invalidate(0, gameModes = $$props.gameModes);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [gameModes];
}

var GameModeCards = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(GameModeCards, _SvelteComponentDev);

  var _super = _createSuper(GameModeCards);

  function GameModeCards(options) {
    var _this;

    _classCallCheck(this, GameModeCards);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      gameModes: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "GameModeCards",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*gameModes*/
    ctx[0] === undefined && !("gameModes" in props)) {
      console.warn("<GameModeCards> was created without expected prop 'gameModes'");
    }

    return _this;
  }

  _createClass(GameModeCards, [{
    key: "gameModes",
    get: function get() {
      throw new Error("<GameModeCards>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<GameModeCards>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return GameModeCards;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file$1 = "C:\\CODAGE\\artemis-front\\src\\components\\Quests.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[16] = i;
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context_4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context_5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[16] = i;
  return child_ctx;
} // (145:16) {#if data.finished && data.finished.daily}


function create_if_block_5(ctx) {
  var div;
  var each_value_5 =
  /*data*/
  ctx[0].finished.daily;
  validate_each_argument(each_value_5);
  var each_blocks = [];

  for (var i = 0; i < each_value_5.length; i += 1) {
    each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "pb-1 ");
      add_location(div, file$1, 145, 20, 3572);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calculateRarity, data, collect*/
      37) {
        each_value_5 =
        /*data*/
        ctx[0].finished.daily;
        validate_each_argument(each_value_5);

        var _i4;

        for (_i4 = 0; _i4 < each_value_5.length; _i4 += 1) {
          var child_ctx = get_each_context_5(ctx, each_value_5, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_5(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_5.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(145:16) {#if data.finished && data.finished.daily}",
    ctx: ctx
  });
  return block;
} // (147:24) {#each data.finished.daily as quest, i}


function create_each_block_5(ctx) {
  var button;
  var div1;
  var span;
  var t0;
  var t1;
  var div0;
  var svg;
  var path;
  var svg_class_value;
  var t2;
  var p0;
  var t3;
  var t4;
  var p1;
  var t5_value =
  /*quest*/
  ctx[10].name + "";
  var t5;
  var t6;
  var button_class_value;
  var mounted;
  var dispose;

  function click_handler() {
    return (
      /*click_handler*/
      ctx[6](
      /*i*/
      ctx[16])
    );
  }

  var block = {
    c: function create() {
      button = element("button");
      div1 = element("div");
      span = element("span");
      t0 = text("Click to collect");
      t1 = space();
      div0 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t2 = space();
      p0 = element("p");
      t3 = text("Click to collect");
      t4 = space();
      p1 = element("p");
      t5 = text(t5_value);
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      div1 = claim_element(button_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      span = claim_element(div1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "Click to collect");
      span_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      svg = claim_element(div0_nodes, "svg", {
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
      t2 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "Click to collect");
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, t5_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t6 = claim_space(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-ujezwx");
      add_location(span, file$1, 151, 36, 3999);
      attr_dev(path, "d", "m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z");
      add_location(path, file$1, 158, 44, 4506);
      attr_dev(svg, "class", svg_class_value = "fill-current checkbox-active\r\n                                            text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx");
      attr_dev(svg, "viewBox", "0 0 27 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 153, 40, 4140);
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 161, 40, 4784);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 152, 36, 4066);
      attr_dev(p1, "class", "line-through");
      add_location(p1, file$1, 166, 36, 5014);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 150, 32, 3936);
      attr_dev(button, "class", button_class_value = "card quest finished border-2 border-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " max-w-sm mx-auto block" + " svelte-ujezwx");
      add_location(button, file$1, 147, 28, 3686);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, div1);
      append_dev(div1, span);
      append_dev(span, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);
      append_dev(div0, svg);
      append_dev(svg, path);
      append_dev(div0, t2);
      append_dev(div0, p0);
      append_dev(p0, t3);
      append_dev(div1, t4);
      append_dev(div1, p1);
      append_dev(p1, t5);
      append_dev(button, t6);

      if (!mounted) {
        dispose = listen_dev(button, "click", click_handler, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*data*/
      1 && svg_class_value !== (svg_class_value = "fill-current checkbox-active\r\n                                            text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx")) {
        attr_dev(svg, "class", svg_class_value);
      }

      if (dirty &
      /*data*/
      1 && t5_value !== (t5_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*data*/
      1 && button_class_value !== (button_class_value = "card quest finished border-2 border-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " max-w-sm mx-auto block" + " svelte-ujezwx")) {
        attr_dev(button, "class", button_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_5.name,
    type: "each",
    source: "(147:24) {#each data.finished.daily as quest, i}",
    ctx: ctx
  });
  return block;
} // (174:16) {#if data.dailyQuests}


function create_if_block_4(ctx) {
  var div;
  var each_value_4 =
  /*data*/
  ctx[0].dailyQuests;
  validate_each_argument(each_value_4);
  var each_blocks = [];

  for (var i = 0; i < each_value_4.length; i += 1) {
    each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div, file$1, 174, 20, 5281);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calculateRarity, data, calculateProgressBarWidth*/
      13) {
        each_value_4 =
        /*data*/
        ctx[0].dailyQuests;
        validate_each_argument(each_value_4);

        var _i8;

        for (_i8 = 0; _i8 < each_value_4.length; _i8 += 1) {
          var child_ctx = get_each_context_4(ctx, each_value_4, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_4(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(div, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_4.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(174:16) {#if data.dailyQuests}",
    ctx: ctx
  });
  return block;
} // (176:24) {#each data.dailyQuests as quest}


function create_each_block_4(ctx) {
  var div3;
  var div1;
  var span;
  var t0_value =
  /*quest*/
  ctx[10].reward + "";
  var t0;
  var t1;
  var span_class_value;
  var t2;
  var div0;
  var svg;
  var path;
  var svg_class_value;
  var t3;
  var p0;
  var t4_value =
  /*quest*/
  ctx[10].progress + "";
  var t4;
  var t5;
  var t6_value =
  /*quest*/
  ctx[10].goal + "";
  var t6;
  var t7;
  var p1;
  var t8_value =
  /*quest*/
  ctx[10].name + "";
  var t8;
  var t9;
  var div2;
  var div2_class_value;
  var t10;
  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = text("$");
      t2 = space();
      div0 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t3 = space();
      p0 = element("p");
      t4 = text(t4_value);
      t5 = text("/");
      t6 = text(t6_value);
      t7 = space();
      p1 = element("p");
      t8 = text(t8_value);
      t9 = space();
      div2 = element("div");
      t10 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      span = claim_element(div1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      t1 = claim_text(span_nodes, "$");
      span_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      svg = claim_element(div0_nodes, "svg", {
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
      t3 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t4 = claim_text(p0_nodes, t4_value);
      t5 = claim_text(p0_nodes, "/");
      t6 = claim_text(p0_nodes, t6_value);
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t8 = claim_text(p1_nodes, t8_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true,
        style: true
      });
      children(div2).forEach(detach_dev);
      t10 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", span_class_value = "text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx");
      add_location(span, file$1, 178, 36, 5522);
      attr_dev(path, "d", "m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z");
      add_location(path, file$1, 185, 44, 6063);
      attr_dev(svg, "class", svg_class_value = "fill-current w-4 text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx");
      attr_dev(svg, "viewBox", "0 0 25 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 181, 40, 5754);
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 188, 40, 6263);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 180, 36, 5680);
      attr_dev(p1, "class", "");
      add_location(p1, file$1, 192, 36, 6504);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 177, 32, 5459);
      attr_dev(div2, "class", div2_class_value = "absolute bottom-0 left-0 h-2px bg-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx");
      set_style(div2, "width",
      /*calculateProgressBarWidth*/
      ctx[3](
      /*quest*/
      ctx[10].progress,
      /*quest*/
      ctx[10].goal) + "%");
      add_location(div2, file$1, 194, 32, 6606);
      attr_dev(div3, "class", "relative card quest max-w-sm mx-auto svelte-ujezwx");
      add_location(div3, file$1, 176, 28, 5375);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, span);
      append_dev(span, t0);
      append_dev(span, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, svg);
      append_dev(svg, path);
      append_dev(div0, t3);
      append_dev(div0, p0);
      append_dev(p0, t4);
      append_dev(p0, t5);
      append_dev(p0, t6);
      append_dev(div1, t7);
      append_dev(div1, p1);
      append_dev(p1, t8);
      append_dev(div3, t9);
      append_dev(div3, div2);
      append_dev(div3, t10);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t0_value !== (t0_value =
      /*quest*/
      ctx[10].reward + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*data*/
      1 && span_class_value !== (span_class_value = "text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx")) {
        attr_dev(span, "class", span_class_value);
      }

      if (dirty &
      /*data*/
      1 && svg_class_value !== (svg_class_value = "fill-current w-4 text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx")) {
        attr_dev(svg, "class", svg_class_value);
      }

      if (dirty &
      /*data*/
      1 && t4_value !== (t4_value =
      /*quest*/
      ctx[10].progress + "")) set_data_dev(t4, t4_value);
      if (dirty &
      /*data*/
      1 && t6_value !== (t6_value =
      /*quest*/
      ctx[10].goal + "")) set_data_dev(t6, t6_value);
      if (dirty &
      /*data*/
      1 && t8_value !== (t8_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t8, t8_value);

      if (dirty &
      /*data*/
      1 && div2_class_value !== (div2_class_value = "absolute bottom-0 left-0 h-2px bg-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, true) + " svelte-ujezwx")) {
        attr_dev(div2, "class", div2_class_value);
      }

      if (dirty &
      /*data*/
      1) {
        set_style(div2, "width",
        /*calculateProgressBarWidth*/
        ctx[3](
        /*quest*/
        ctx[10].progress,
        /*quest*/
        ctx[10].goal) + "%");
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_4.name,
    type: "each",
    source: "(176:24) {#each data.dailyQuests as quest}",
    ctx: ctx
  });
  return block;
} // (203:16) {#if data.collected && data.collected.daily}


function create_if_block_3(ctx) {
  var div;
  var each_value_3 =
  /*data*/
  ctx[0].collected.daily;
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "pt-5");
      add_location(div, file$1, 203, 20, 7045);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1) {
        each_value_3 =
        /*data*/
        ctx[0].collected.daily;
        validate_each_argument(each_value_3);

        var _i12;

        for (_i12 = 0; _i12 < each_value_3.length; _i12 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block_3(child_ctx);

            each_blocks[_i12].c();

            each_blocks[_i12].m(div, null);
          }
        }

        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }

        each_blocks.length = each_value_3.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(203:16) {#if data.collected && data.collected.daily}",
    ctx: ctx
  });
  return block;
} // (205:24) {#each data.collected.daily as quest}


function create_each_block_3(ctx) {
  var div2;
  var div1;
  var div0;
  var p0;
  var t0;
  var t1;
  var p1;
  var t2_value =
  /*quest*/
  ctx[10].name + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t0 = text("Collected");
      t1 = space();
      p1 = element("p");
      t2 = text(t2_value);
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Collected");
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, t2_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 209, 40, 7422);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 208, 36, 7348);
      attr_dev(p1, "class", "quest-goal line-through");
      add_location(p1, file$1, 214, 36, 7640);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 207, 32, 7285);
      attr_dev(div2, "class", "card quest text-disabled italic max-w-sm mx-auto svelte-ujezwx");
      add_location(div2, file$1, 205, 28, 7156);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div1);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t0);
      append_dev(div1, t1);
      append_dev(div1, p1);
      append_dev(p1, t2);
      append_dev(div2, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t2_value !== (t2_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(205:24) {#each data.collected.daily as quest}",
    ctx: ctx
  });
  return block;
} // (230:16) {#if data.finished && data.finished.weekly}


function create_if_block_2(ctx) {
  var div;
  var each_value_2 =
  /*data*/
  ctx[0].finished.weekly;
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "pb-1");
      add_location(div, file$1, 230, 20, 8292);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calculateRarity, data, collect*/
      37) {
        each_value_2 =
        /*data*/
        ctx[0].finished.weekly;
        validate_each_argument(each_value_2);

        var _i16;

        for (_i16 = 0; _i16 < each_value_2.length; _i16 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i16);

          if (each_blocks[_i16]) {
            each_blocks[_i16].p(child_ctx, dirty);
          } else {
            each_blocks[_i16] = create_each_block_2(child_ctx);

            each_blocks[_i16].c();

            each_blocks[_i16].m(div, null);
          }
        }

        for (; _i16 < each_blocks.length; _i16 += 1) {
          each_blocks[_i16].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(230:16) {#if data.finished && data.finished.weekly}",
    ctx: ctx
  });
  return block;
} // (232:24) {#each data.finished.weekly as quest, i}


function create_each_block_2(ctx) {
  var button;
  var div1;
  var span;
  var t0;
  var t1;
  var div0;
  var svg;
  var path;
  var svg_class_value;
  var t2;
  var p0;
  var t3;
  var t4;
  var p1;
  var t5_value =
  /*quest*/
  ctx[10].name + "";
  var t5;
  var t6;
  var button_class_value;
  var mounted;
  var dispose;

  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[7](
      /*i*/
      ctx[16])
    );
  }

  var block = {
    c: function create() {
      button = element("button");
      div1 = element("div");
      span = element("span");
      t0 = text("Click to collect");
      t1 = space();
      div0 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t2 = space();
      p0 = element("p");
      t3 = text("Click to collect");
      t4 = space();
      p1 = element("p");
      t5 = text(t5_value);
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      div1 = claim_element(button_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      span = claim_element(div1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "Click to collect");
      span_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      svg = claim_element(div0_nodes, "svg", {
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
      t2 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "Click to collect");
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, t5_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t6 = claim_space(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "svelte-ujezwx");
      add_location(span, file$1, 236, 36, 8715);
      attr_dev(path, "d", "m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z");
      add_location(path, file$1, 243, 44, 9223);
      attr_dev(svg, "class", svg_class_value = "fill-current checkbox-active\r\n                                            text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx");
      attr_dev(svg, "viewBox", "0 0 27 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 238, 40, 8856);
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 246, 40, 9501);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 237, 36, 8782);
      attr_dev(p1, "class", "quest-goal line-through");
      add_location(p1, file$1, 251, 36, 9731);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 235, 32, 8652);
      attr_dev(button, "class", button_class_value = "card quest finished border-2 border-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " max-w-sm mx-auto" + " svelte-ujezwx");
      add_location(button, file$1, 232, 28, 8406);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, div1);
      append_dev(div1, span);
      append_dev(span, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);
      append_dev(div0, svg);
      append_dev(svg, path);
      append_dev(div0, t2);
      append_dev(div0, p0);
      append_dev(p0, t3);
      append_dev(div1, t4);
      append_dev(div1, p1);
      append_dev(p1, t5);
      append_dev(button, t6);

      if (!mounted) {
        dispose = listen_dev(button, "click", click_handler_1, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*data*/
      1 && svg_class_value !== (svg_class_value = "fill-current checkbox-active\r\n                                            text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx")) {
        attr_dev(svg, "class", svg_class_value);
      }

      if (dirty &
      /*data*/
      1 && t5_value !== (t5_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*data*/
      1 && button_class_value !== (button_class_value = "card quest finished border-2 border-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " max-w-sm mx-auto" + " svelte-ujezwx")) {
        attr_dev(button, "class", button_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(232:24) {#each data.finished.weekly as quest, i}",
    ctx: ctx
  });
  return block;
} // (261:16) {#if data.weeklyQuests}


function create_if_block_1(ctx) {
  var div;
  var each_value_1 =
  /*data*/
  ctx[0].weeklyQuests;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);

      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        each_blocks[_i18].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div, file$1, 261, 20, 10090);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calculateRarity, data, calculateProgressBarWidth*/
      13) {
        each_value_1 =
        /*data*/
        ctx[0].weeklyQuests;
        validate_each_argument(each_value_1);

        var _i20;

        for (_i20 = 0; _i20 < each_value_1.length; _i20 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i20);

          if (each_blocks[_i20]) {
            each_blocks[_i20].p(child_ctx, dirty);
          } else {
            each_blocks[_i20] = create_each_block_1(child_ctx);

            each_blocks[_i20].c();

            each_blocks[_i20].m(div, null);
          }
        }

        for (; _i20 < each_blocks.length; _i20 += 1) {
          each_blocks[_i20].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(261:16) {#if data.weeklyQuests}",
    ctx: ctx
  });
  return block;
} // (263:24) {#each data.weeklyQuests as quest}


function create_each_block_1(ctx) {
  var div3;
  var div1;
  var span;
  var t0_value =
  /*quest*/
  ctx[10].reward + "";
  var t0;
  var t1;
  var span_class_value;
  var t2;
  var div0;
  var svg;
  var path;
  var svg_class_value;
  var t3;
  var p0;
  var t4_value =
  /*quest*/
  ctx[10].progress + "";
  var t4;
  var t5;
  var t6_value =
  /*quest*/
  ctx[10].goal + "";
  var t6;
  var t7;
  var p1;
  var t8_value =
  /*quest*/
  ctx[10].name + "";
  var t8;
  var t9;
  var div2;
  var div2_class_value;
  var t10;
  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = text("$");
      t2 = space();
      div0 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t3 = space();
      p0 = element("p");
      t4 = text(t4_value);
      t5 = text("/");
      t6 = text(t6_value);
      t7 = space();
      p1 = element("p");
      t8 = text(t8_value);
      t9 = space();
      div2 = element("div");
      t10 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      span = claim_element(div1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      t1 = claim_text(span_nodes, "$");
      span_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      svg = claim_element(div0_nodes, "svg", {
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
      t3 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t4 = claim_text(p0_nodes, t4_value);
      t5 = claim_text(p0_nodes, "/");
      t6 = claim_text(p0_nodes, t6_value);
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t7 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t8 = claim_text(p1_nodes, t8_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true,
        style: true
      });
      children(div2).forEach(detach_dev);
      t10 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", span_class_value = "text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx");
      add_location(span, file$1, 265, 36, 10332);
      attr_dev(path, "d", "m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z");
      add_location(path, file$1, 272, 44, 10875);
      attr_dev(svg, "class", svg_class_value = "fill-current w-4 text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx");
      attr_dev(svg, "viewBox", "0 0 25 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 268, 40, 10565);
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 275, 40, 11075);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 267, 36, 10491);
      attr_dev(p1, "class", "quest-goal");
      add_location(p1, file$1, 279, 36, 11316);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 264, 32, 10269);
      attr_dev(div2, "class", div2_class_value = "absolute bottom-0 left-0 h-2px bg-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx");
      set_style(div2, "width",
      /*calculateProgressBarWidth*/
      ctx[3](
      /*quest*/
      ctx[10].progress,
      /*quest*/
      ctx[10].goal) + "%");
      add_location(div2, file$1, 281, 32, 11428);
      attr_dev(div3, "class", "relative card quest max-w-sm mx-auto svelte-ujezwx");
      add_location(div3, file$1, 263, 28, 10185);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, span);
      append_dev(span, t0);
      append_dev(span, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, svg);
      append_dev(svg, path);
      append_dev(div0, t3);
      append_dev(div0, p0);
      append_dev(p0, t4);
      append_dev(p0, t5);
      append_dev(p0, t6);
      append_dev(div1, t7);
      append_dev(div1, p1);
      append_dev(p1, t8);
      append_dev(div3, t9);
      append_dev(div3, div2);
      append_dev(div3, t10);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t0_value !== (t0_value =
      /*quest*/
      ctx[10].reward + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*data*/
      1 && span_class_value !== (span_class_value = "text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx")) {
        attr_dev(span, "class", span_class_value);
      }

      if (dirty &
      /*data*/
      1 && svg_class_value !== (svg_class_value = "fill-current w-4 text-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx")) {
        attr_dev(svg, "class", svg_class_value);
      }

      if (dirty &
      /*data*/
      1 && t4_value !== (t4_value =
      /*quest*/
      ctx[10].progress + "")) set_data_dev(t4, t4_value);
      if (dirty &
      /*data*/
      1 && t6_value !== (t6_value =
      /*quest*/
      ctx[10].goal + "")) set_data_dev(t6, t6_value);
      if (dirty &
      /*data*/
      1 && t8_value !== (t8_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t8, t8_value);

      if (dirty &
      /*data*/
      1 && div2_class_value !== (div2_class_value = "absolute bottom-0 left-0 h-2px bg-" +
      /*calculateRarity*/
      ctx[2](
      /*quest*/
      ctx[10].reward, false) + " svelte-ujezwx")) {
        attr_dev(div2, "class", div2_class_value);
      }

      if (dirty &
      /*data*/
      1) {
        set_style(div2, "width",
        /*calculateProgressBarWidth*/
        ctx[3](
        /*quest*/
        ctx[10].progress,
        /*quest*/
        ctx[10].goal) + "%");
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(263:24) {#each data.weeklyQuests as quest}",
    ctx: ctx
  });
  return block;
} // (289:16) {#if data.collected && data.collected.weekly}


function create_if_block$1(ctx) {
  var div;
  var each_value =
  /*data*/
  ctx[0].collected.weekly;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i21 = 0; _i21 < each_blocks.length; _i21 += 1) {
        each_blocks[_i21].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        each_blocks[_i22].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "pt-5");
      add_location(div, file$1, 289, 20, 11867);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i23 = 0; _i23 < each_blocks.length; _i23 += 1) {
        each_blocks[_i23].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1) {
        each_value =
        /*data*/
        ctx[0].collected.weekly;
        validate_each_argument(each_value);

        var _i24;

        for (_i24 = 0; _i24 < each_value.length; _i24 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i24);

          if (each_blocks[_i24]) {
            each_blocks[_i24].p(child_ctx, dirty);
          } else {
            each_blocks[_i24] = create_each_block$1(child_ctx);

            each_blocks[_i24].c();

            each_blocks[_i24].m(div, null);
          }
        }

        for (; _i24 < each_blocks.length; _i24 += 1) {
          each_blocks[_i24].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(289:16) {#if data.collected && data.collected.weekly}",
    ctx: ctx
  });
  return block;
} // (291:24) {#each data.collected.weekly as quest}


function create_each_block$1(ctx) {
  var div2;
  var div1;
  var div0;
  var p0;
  var t0;
  var t1;
  var p1;
  var t2_value =
  /*quest*/
  ctx[10].name + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t0 = text("Collected");
      t1 = space();
      p1 = element("p");
      t2 = text(t2_value);
      t3 = space();
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Collected");
      p0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, t2_value);
      p1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "mr-6 lg:mr-12 text-lg");
      add_location(p0, file$1, 295, 40, 12245);
      attr_dev(div0, "class", "progress-container svelte-ujezwx");
      add_location(div0, file$1, 294, 36, 12171);
      attr_dev(p1, "class", "quest-goal line-through");
      add_location(p1, file$1, 300, 36, 12463);
      attr_dev(div1, "class", "quest-infos svelte-ujezwx");
      add_location(div1, file$1, 293, 32, 12108);
      attr_dev(div2, "class", "card quest text-disabled italic max-w-sm mx-auto svelte-ujezwx");
      add_location(div2, file$1, 291, 28, 11979);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div1);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t0);
      append_dev(div1, t1);
      append_dev(div1, p1);
      append_dev(p1, t2);
      append_dev(div2, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t2_value !== (t2_value =
      /*quest*/
      ctx[10].name + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(291:24) {#each data.collected.weekly as quest}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var div7;
  var div4;
  var div1;
  var h20;
  var t0;
  var t1;
  var div0;
  var t2;
  var t3;
  var t4;
  var div3;
  var h21;
  var t5;
  var t6;
  var div2;
  var t7;
  var t8;
  var t9;
  var div6;
  var refreshbutton;
  var t10;
  var div5;
  var svg;
  var path;
  var t11;
  var p;
  var t12;
  var current;
  var if_block0 =
  /*data*/
  ctx[0].finished &&
  /*data*/
  ctx[0].finished.daily && create_if_block_5(ctx);
  var if_block1 =
  /*data*/
  ctx[0].dailyQuests && create_if_block_4(ctx);
  var if_block2 =
  /*data*/
  ctx[0].collected &&
  /*data*/
  ctx[0].collected.daily && create_if_block_3(ctx);
  var if_block3 =
  /*data*/
  ctx[0].finished &&
  /*data*/
  ctx[0].finished.weekly && create_if_block_2(ctx);
  var if_block4 =
  /*data*/
  ctx[0].weeklyQuests && create_if_block_1(ctx);
  var if_block5 =
  /*data*/
  ctx[0].collected &&
  /*data*/
  ctx[0].collected.weekly && create_if_block$1(ctx);
  refreshbutton = new RefreshButton({
    props: {
      isRefreshing:
      /*isRefreshingQuests*/
      ctx[1],
      refreshMessage: "Refresh quests data"
    },
    $$inline: true
  });
  refreshbutton.$on("click",
  /*click_handler_2*/
  ctx[8]);
  var block = {
    c: function create() {
      div7 = element("div");
      div4 = element("div");
      div1 = element("div");
      h20 = element("h2");
      t0 = text("Daily Quests");
      t1 = space();
      div0 = element("div");
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      t4 = space();
      div3 = element("div");
      h21 = element("h2");
      t5 = text("Weekly Quests");
      t6 = space();
      div2 = element("div");
      if (if_block3) if_block3.c();
      t7 = space();
      if (if_block4) if_block4.c();
      t8 = space();
      if (if_block5) if_block5.c();
      t9 = space();
      div6 = element("div");
      create_component(refreshbutton.$$.fragment);
      t10 = space();
      div5 = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t11 = space();
      p = element("p");
      t12 = text("Daily and Weekly quests data may take up to 30 minutes to\r\n                refresh");
      this.h();
    },
    l: function claim(nodes) {
      div7 = claim_element(nodes, "DIV", {});
      var div7_nodes = children(div7);
      div4 = claim_element(div7_nodes, "DIV", {
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
      t0 = claim_text(h20_nodes, "Daily Quests");
      h20_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if (if_block0) if_block0.l(div0_nodes);
      t2 = claim_space(div0_nodes);
      if (if_block1) if_block1.l(div0_nodes);
      t3 = claim_space(div0_nodes);
      if (if_block2) if_block2.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t4 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h21 = claim_element(div3_nodes, "H2", {
        class: true
      });
      var h21_nodes = children(h21);
      t5 = claim_text(h21_nodes, "Weekly Quests");
      h21_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      if (if_block3) if_block3.l(div2_nodes);
      t7 = claim_space(div2_nodes);
      if (if_block4) if_block4.l(div2_nodes);
      t8 = claim_space(div2_nodes);
      if (if_block5) if_block5.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      t9 = claim_space(div7_nodes);
      div6 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      claim_component(refreshbutton.$$.fragment, div6_nodes);
      t10 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      svg = claim_element(div5_nodes, "svg", {
        xmlns: true,
        class: true,
        viewBox: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        fill: true,
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      t11 = claim_space(div5_nodes);
      p = claim_element(div5_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t12 = claim_text(p_nodes, "Daily and Weekly quests data may take up to 30 minutes to\r\n                refresh");
      p_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h20, "class", "text-6xl text-center lg:text-left");
      add_location(h20, file$1, 141, 12, 3381);
      attr_dev(div0, "class", "quests-container");
      add_location(div0, file$1, 143, 12, 3460);
      attr_dev(div1, "class", "daily-container ml-5 mr-5 md:ml-10 md:mr-10 lg:ml-0 lg:mr-8");
      add_location(div1, file$1, 139, 8, 3281);
      attr_dev(h21, "class", "text-6xl text-center lg:text-left");
      add_location(h21, file$1, 227, 12, 8101);
      attr_dev(div2, "class", "quests-container");
      add_location(div2, file$1, 228, 12, 8179);
      attr_dev(div3, "class", "weekly-container ml-5 mr-5 mt-12 md:ml-10 md:mr-10 lg:mr-0\r\n                lg:mt-0");
      add_location(div3, file$1, 224, 8, 7977);
      attr_dev(div4, "class", "container lg:flex mt-7 w-auto");
      add_location(div4, file$1, 138, 4, 3228);
      attr_dev(path, "fill", "currentColor");
      attr_dev(path, "d", "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z");
      add_location(path, file$1, 334, 16, 15108);
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "class", "w-9 text-primary svelte-ujezwx");
      attr_dev(svg, "viewBox", "0 0 576 512");
      add_location(svg, file$1, 330, 12, 14952);
      attr_dev(p, "class", "text-lg ml-3 lg:ml-2 tip-text text-light svelte-ujezwx");
      add_location(p, file$1, 338, 12, 15665);
      attr_dev(div5, "class", "flex lg:ml-8 items-center mt-4 lg:mt-0");
      add_location(div5, file$1, 318, 8, 13093);
      attr_dev(div6, "class", "flex flex-col items-center lg:flex-row lg:justify-start pb-3 pt-4 ml-5 lg:ml-0");
      add_location(div6, file$1, 311, 4, 12808);
      add_location(div7, file$1, 137, 0, 3217);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div7, anchor);
      append_dev(div7, div4);
      append_dev(div4, div1);
      append_dev(div1, h20);
      append_dev(h20, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);
      if (if_block0) if_block0.m(div0, null);
      append_dev(div0, t2);
      if (if_block1) if_block1.m(div0, null);
      append_dev(div0, t3);
      if (if_block2) if_block2.m(div0, null);
      append_dev(div4, t4);
      append_dev(div4, div3);
      append_dev(div3, h21);
      append_dev(h21, t5);
      append_dev(div3, t6);
      append_dev(div3, div2);
      if (if_block3) if_block3.m(div2, null);
      append_dev(div2, t7);
      if (if_block4) if_block4.m(div2, null);
      append_dev(div2, t8);
      if (if_block5) if_block5.m(div2, null);
      append_dev(div7, t9);
      append_dev(div7, div6);
      mount_component(refreshbutton, div6, null);
      append_dev(div6, t10);
      append_dev(div6, div5);
      append_dev(div5, svg);
      append_dev(svg, path);
      append_dev(div5, t11);
      append_dev(div5, p);
      append_dev(p, t12);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*data*/
      ctx[0].finished &&
      /*data*/
      ctx[0].finished.daily) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_5(ctx);
          if_block0.c();
          if_block0.m(div0, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*data*/
      ctx[0].dailyQuests) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_4(ctx);
          if_block1.c();
          if_block1.m(div0, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (
      /*data*/
      ctx[0].collected &&
      /*data*/
      ctx[0].collected.daily) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_3(ctx);
          if_block2.c();
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (
      /*data*/
      ctx[0].finished &&
      /*data*/
      ctx[0].finished.weekly) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_2(ctx);
          if_block3.c();
          if_block3.m(div2, t7);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (
      /*data*/
      ctx[0].weeklyQuests) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
        } else {
          if_block4 = create_if_block_1(ctx);
          if_block4.c();
          if_block4.m(div2, t8);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }

      if (
      /*data*/
      ctx[0].collected &&
      /*data*/
      ctx[0].collected.weekly) {
        if (if_block5) {
          if_block5.p(ctx, dirty);
        } else {
          if_block5 = create_if_block$1(ctx);
          if_block5.c();
          if_block5.m(div2, null);
        }
      } else if (if_block5) {
        if_block5.d(1);
        if_block5 = null;
      }

      var refreshbutton_changes = {};
      if (dirty &
      /*isRefreshingQuests*/
      2) refreshbutton_changes.isRefreshing =
      /*isRefreshingQuests*/
      ctx[1];
      refreshbutton.$set(refreshbutton_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(refreshbutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(refreshbutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div7);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d();
      if (if_block5) if_block5.d();
      destroy_component(refreshbutton);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Quests", slots, []);
  var data = $$props.data;

  var calculateRarity = function calculateRarity(reward, daily) {
    if (daily) {
      if (reward == 100) return "primary";
      if (reward == 200) return "epic";
      if (reward == 400) return "legendary";
    } else {
      if (reward == 300) return "primary";
      if (reward == 500) return "epic";
      if (reward == 1000) return "legendary";
    }
  };

  var calculateProgressBarWidth = function calculateProgressBarWidth(progress, goal) {
    var calculatedProgress = progress / goal * 100;

    if (calculatedProgress < 0) {
      return 2;
    } else {
      return calculatedProgress;
    }
  };

  function calculateOrder() {
    //Reorder quests by rarety
    if (data.dailyQuests) {
      data.dailyQuests.sort(function (b, a) {
        return a.reward - b.reward;
      });
    }

    if (data.finished && data.finished.daily) {
      data.finished.daily.sort(function (b, a) {
        return a.reward - b.reward;
      });
    }

    if (data.weeklyQuests) {
      data.weeklyQuests.sort(function (b, a) {
        return a.reward - b.reward;
      });
    }

    if (data.finished && data.finished.weekly) {
      data.finished.weekly.sort(function (b, a) {
        return a.reward - b.reward;
      });
    }
  }

  data = data;
  calculateOrder();
  var isRefreshingQuests = false;

  var handleRefresh = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var refreshedData;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $$invalidate(1, isRefreshingQuests = true);
              _context.next = 3;
              return callApi("get", "solo");

            case 3:
              refreshedData = _context.sent;
              console.log(refreshedData);
              calculateOrder();
              $$invalidate(0, data = refreshedData.solo);
              $$invalidate(1, isRefreshingQuests = false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleRefresh() {
      return _ref3.apply(this, arguments);
    };
  }();

  function collect(_x, _x2) {
    return _collect.apply(this, arguments);
  }

  function _collect() {
    _collect = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(type, index) {
      var _data$collected$type;

      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return callApi("post", "solo/collect?type=".concat(type, "&index=").concat(index));

            case 2:
              counter.set({
                "refresh": true
              });

              (_data$collected$type = data.collected[type]).push.apply(_data$collected$type, _toConsumableArray(data.finished[type].splice(index, 1)));

              $$invalidate(0, data);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _collect.apply(this, arguments);
  }

  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Quests> was created with unknown prop '".concat(key, "'"));
  });

  var click_handler = function click_handler(i) {
    return collect("daily", i);
  };

  var click_handler_1 = function click_handler_1(i) {
    return collect("weekly", i);
  };

  var click_handler_2 = function click_handler_2() {
    return handleRefresh();
  };

  $$self.$$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      callApi: callApi,
      RefreshButton: RefreshButton,
      counter: counter,
      data: data,
      calculateRarity: calculateRarity,
      calculateProgressBarWidth: calculateProgressBarWidth,
      calculateOrder: calculateOrder,
      isRefreshingQuests: isRefreshingQuests,
      handleRefresh: handleRefresh,
      collect: collect
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("isRefreshingQuests" in $$props) $$invalidate(1, isRefreshingQuests = $$props.isRefreshingQuests);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [data, isRefreshingQuests, calculateRarity, calculateProgressBarWidth, handleRefresh, collect, click_handler, click_handler_1, click_handler_2];
}

var Quests = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Quests, _SvelteComponentDev);

  var _super = _createSuper$1(Quests);

  function Quests(options) {
    var _this;

    _classCallCheck(this, Quests);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      data: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Quests",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console_1.warn("<Quests> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(Quests, [{
    key: "data",
    get: function get() {
      throw new Error("<Quests>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Quests>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Quests;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file$2 = "C:\\CODAGE\\artemis-front\\src\\routes\\play\\index.svelte"; // (181:12) {:else}

function create_else_block$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Here are the quests");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Here are the quests");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(181:12) {:else}",
    ctx: ctx
  });
  return block;
} // (179:28) 


function create_if_block_1$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text(
      /*error*/
      ctx[1]);
    },
    l: function claim(nodes) {
      t = claim_text(nodes,
      /*error*/
      ctx[1]);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2) set_data_dev(t,
      /*error*/
      ctx[1]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(179:28) ",
    ctx: ctx
  });
  return block;
} // (177:12) {#if quests}


function create_if_block$2(ctx) {
  var quests_1;
  var current;
  quests_1 = new Quests({
    props: {
      data:
      /*quests*/
      ctx[0]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(quests_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(quests_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(quests_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var quests_1_changes = {};
      if (dirty &
      /*quests*/
      1) quests_1_changes.data =
      /*quests*/
      ctx[0];
      quests_1.$set(quests_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(quests_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(quests_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(quests_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(177:12) {#if quests}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var meta;
  var t0;
  var div4;
  var div0;
  var h1;
  var t1;
  var t2;
  var div3;
  var div1;
  var gamemodecard;
  var t3;
  var div2;
  var current_block_type_index;
  var if_block;
  var current;
  gamemodecard = new GameModeCards({
    props: {
      gameModes: gameModes
    },
    $$inline: true
  });
  var if_block_creators = [create_if_block$2, create_if_block_1$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*quests*/
    ctx[0]) return 0;
    if (
    /*error*/
    ctx[1]) return 1;
    return 2;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      meta = element("meta");
      t0 = space();
      div4 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t1 = text("Choose a game mode");
      t2 = space();
      div3 = element("div");
      div1 = element("div");
      create_component(gamemodecard.$$.fragment);
      t3 = space();
      div2 = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-19ohi2s\"]", document.head);
      meta = claim_element(head_nodes, "META", {
        name: true,
        content: true
      });
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div0 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Choose a game mode");
      h1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(gamemodecard.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      if_block.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Play | Winhalla";
      attr_dev(meta, "name", "description");
      attr_dev(meta, "content", "Play Brawlhalla. Earn rewards. | Legit & Free In-Game objects!\r\n        | Exchange here your coins into rewards | Winhalla Shop page ");
      add_location(meta, file$2, 155, 4, 4891);
      attr_dev(h1, "class", "text-6xl leading-snug lg:leading-normal");
      add_location(h1, file$2, 162, 8, 5211);
      attr_dev(div0, "class", "text-center lg:text-left");
      add_location(div0, file$2, 161, 4, 5163);
      attr_dev(div1, "class", "game-mode-card-container lg:mb-10 lg:mr-15 mt-10 text-center\r\n            flex flex-col items-center lg:flex-row lg:items-start");
      add_location(div1, file$2, 170, 8, 5438);
      add_location(div2, file$2, 175, 8, 5660);
      attr_dev(div3, "class", "flex flex-col items-center lg:items-start lg:flex-wrap\r\n        lg:flex-row");
      add_location(div3, file$2, 167, 4, 5330);
      attr_dev(div4, "class", "lg:block lg:pl-24 mt-7 lg:mt-12 h-full w-full");
      add_location(div4, file$2, 160, 0, 5098);
    },
    m: function mount(target, anchor) {
      append_dev(document.head, meta);
      insert_dev(target, t0, anchor);
      insert_dev(target, div4, anchor);
      append_dev(div4, div0);
      append_dev(div0, h1);
      append_dev(h1, t1);
      append_dev(div4, t2);
      append_dev(div4, div3);
      append_dev(div3, div1);
      mount_component(gamemodecard, div1, null);
      append_dev(div3, t3);
      append_dev(div3, div2);
      if_blocks[current_block_type_index].m(div2, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(div2, null);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(gamemodecard.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(gamemodecard.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      detach_dev(meta);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div4);
      destroy_component(gamemodecard);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var gameModes = [{
  name: "ffa",
  description: "Fight against <b>9</b> players!",
  goal: "Be the one who has the <b>most wins</b> out of <b>10 games</b>!",
  duration: "<b>30</b> - <b>50</b> minutes",
  available: false
}, {
  name: "2vs2",
  description: "Fight against an other <b>team</b>!",
  goal: "Be the team that has the <b>most wins</b> out of <b>5 games</b>!",
  duration: "<b>20</b> - <b>30</b> minutes",
  available: false
}];

function preload() {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var gameModesStatus, quests;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return callApi("get", "/status");

          case 3:
            gameModesStatus = _context.sent;

            if (gameModesStatus) {
              gameModesStatus = gameModesStatus.find(function (s) {
                return s.name === "GAMEMODES STATUS";
              });
              gameModesStatus = gameModesStatus.value;
              Object.keys(gameModesStatus).forEach(function (gameModeName) {
                var gameMode = gameModes.find(function (g) {
                  return g.name === gameModeName.toLowerCase();
                });
                gameMode.available = gameModesStatus[gameModeName];
                gameModes = gameModes;
              });
            } //Load quests for user


            _context.next = 7;
            return callApi("get", "/getSolo");

          case 7:
            quests = _context.sent;
            quests = quests.solo;

            if (!(!quests.lastDaily || !quests.lastWeekly)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return callApi("get", "/solo");

          case 12:
            quests = _context.sent;
            quests = quests.solo;

          case 14:
            return _context.abrupt("return", {
              quests: quests
            });

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.response) {
              _context.next = 26;
              break;
            }

            if (!(_context.t0.response.status === 400 && _context.t0.response.data.includes("Play at least one ranked"))) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", {
              error: "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)"
            });

          case 24:
            if (!(_context.t0.response.status === 400 && _context.t0.response.data.includes("Play at least one"))) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", {
              error: "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)"
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _preload.apply(this, arguments);
}

function instance$2($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Play", slots, []);
  var quests = $$props.quests;
  var error = $$props.error;
  var writable_props = ["quests", "error"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Play> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("quests" in $$props) $$invalidate(0, quests = $$props.quests);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      Quests: Quests,
      callApi: callApi,
      GameModeCard: GameModeCards,
      gameModes: gameModes,
      preload: preload,
      quests: quests,
      error: error
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("quests" in $$props) $$invalidate(0, quests = $$props.quests);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [quests, error];
}

var Play = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Play, _SvelteComponentDev);

  var _super = _createSuper$2(Play);

  function Play(options) {
    var _this;

    _classCallCheck(this, Play);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      quests: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Play",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*quests*/
    ctx[0] === undefined && !("quests" in props)) {
      console.warn("<Play> was created without expected prop 'quests'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Play> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Play, [{
    key: "quests",
    get: function get() {
      throw new Error("<Play>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Play>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error("<Play>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Play>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Play;
}(SvelteComponentDev);

export default Play;
export { preload };
