import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, w as validate_slots, f as element, g as space, j as claim_element, m as children, k as detach_dev, l as claim_space, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, C as _slicedToArray, v as noop, t as text, n as claim_text, I as set_data_dev } from './client.873de4fc.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\components\\Loading.svelte"; // (41:8) {:else}

function create_else_block(ctx) {
  var h2;
  var t;
  var block = {
    c: function create() {
      h2 = element("h2");
      t = text("Loading...");
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes, "Loading...");
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "text-center text-3xl font-bold pt-4");
      add_location(h2, file, 41, 12, 868);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(41:8) {:else}",
    ctx: ctx
  });
  return block;
} // (39:8) {#if data}


function create_if_block(ctx) {
  var h2;
  var t;
  var block = {
    c: function create() {
      h2 = element("h2");
      t = text(
      /*data*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes,
      /*data*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "text-center text-3xl font-bold pt-4");
      add_location(h2, file, 39, 12, 778);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1) set_data_dev(t,
      /*data*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(39:8) {#if data}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div2;
  var div1;
  var div0;
  var t;

  function select_block_type(ctx, dirty) {
    if (
    /*data*/
    ctx[0]) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      t = space();
      if_block.c();
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
      children(div0).forEach(detach_dev);
      t = claim_space(div1_nodes);
      if_block.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "loader svelte-10nwqqk");
      add_location(div0, file, 37, 8, 718);
      attr_dev(div1, "class", "pb-20");
      add_location(div1, file, 36, 4, 689);
      attr_dev(div2, "class", "h-screen-90 bg-fixed bg-no-repeat flex items-center justify-center");
      add_location(div2, file, 35, 0, 603);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div1);
      append_dev(div1, div0);
      append_dev(div1, t);
      if_block.m(div1, null);
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
          if_block.m(div1, null);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
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

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Loading", slots, []);
  var data = $$props.data;
  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Loading> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      data: data
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [data];
}

var Loading = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Loading, _SvelteComponentDev);

  var _super = _createSuper(Loading);

  function Loading(options) {
    var _this;

    _classCallCheck(this, Loading);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      data: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Loading",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console.warn("<Loading> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(Loading, [{
    key: "data",
    get: function get() {
      throw new Error("<Loading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Loading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Loading;
}(SvelteComponentDev);

export { Loading as L };
