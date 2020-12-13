import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, w as validate_slots, f as element, h as svg_element, g as space, t as text, j as claim_element, m as children, k as detach_dev, l as claim_space, n as claim_text, o as attr_dev, p as add_location, J as toggle_class, u as insert_dev, r as append_dev, L as listen_dev, C as _slicedToArray, I as set_data_dev, v as noop, a6 as bubble } from './client.15883e4a.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\components\\RefreshButton.svelte";

function create_fragment(ctx) {
  var button;
  var div;
  var svg;
  var path;
  var t0;
  var p;
  var t1_value = (
  /*isRefreshing*/
  ctx[0] ? "Refreshing" :
  /*refreshMessage*/
  ctx[1]) + "";
  var t1;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      button = element("button");
      div = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t0 = space();
      p = element("p");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      div = claim_element(button_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_element(div_nodes, "svg", {
        viewBox: true,
        xmlns: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      t0 = claim_space(button_nodes);
      p = claim_element(button_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, t1_value);
      p_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "m7.5 21 2.999-3v1.5c4.143 0 7.501-3.359 7.501-7.502 0-2.074-.842-3.952-2.202-5.309l2.114-2.124c1.908 1.901 3.088 4.531 3.088 7.437 0 5.798-4.7 10.498-10.498 10.498-.001 0-.001 0-.002 0v1.5zm-7.5-9c.007-5.796 4.704-10.493 10.499-10.5h.001v-1.5l3 3-3 3v-1.5s-.001 0-.002 0c-4.143 0-7.502 3.359-7.502 7.502 0 2.074.842 3.952 2.203 5.31l-2.112 2.124c-1.907-1.89-3.088-4.511-3.088-7.407 0-.01 0-.02 0-.03v.002z");
      add_location(path, file, 29, 12, 740);
      attr_dev(svg, "viewBox", "0 0 21 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "class", "svelte-1n0xldq");
      add_location(svg, file, 28, 8, 666);
      attr_dev(div, "class", "block svelte-1n0xldq");
      toggle_class(div, "hidden", !
      /*isRefreshing*/
      ctx[0]);
      add_location(div, file, 27, 4, 608);
      attr_dev(p, "class", "pl-3");
      toggle_class(p, "pl-3",
      /*isRefreshing*/
      ctx[0]);
      add_location(p, file, 33, 4, 1209);
      attr_dev(button, "class", "button button-brand refresh-button focus:outline-none svelte-1n0xldq");
      add_location(button, file, 26, 0, 523);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, div);
      append_dev(div, svg);
      append_dev(svg, path);
      append_dev(button, t0);
      append_dev(button, p);
      append_dev(p, t1);

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler*/
        ctx[2], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*isRefreshing*/
      1) {
        toggle_class(div, "hidden", !
        /*isRefreshing*/
        ctx[0]);
      }

      if (dirty &
      /*isRefreshing, refreshMessage*/
      3 && t1_value !== (t1_value = (
      /*isRefreshing*/
      ctx[0] ? "Refreshing" :
      /*refreshMessage*/
      ctx[1]) + "")) set_data_dev(t1, t1_value);

      if (dirty &
      /*isRefreshing*/
      1) {
        toggle_class(p, "pl-3",
        /*isRefreshing*/
        ctx[0]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      mounted = false;
      dispose();
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
  validate_slots("RefreshButton", slots, []);
  var isRefreshing = $$props.isRefreshing;
  var refreshMessage = $$props.refreshMessage;
  var writable_props = ["isRefreshing", "refreshMessage"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<RefreshButton> was created with unknown prop '".concat(key, "'"));
  });

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$$set = function ($$props) {
    if ("isRefreshing" in $$props) $$invalidate(0, isRefreshing = $$props.isRefreshing);
    if ("refreshMessage" in $$props) $$invalidate(1, refreshMessage = $$props.refreshMessage);
  };

  $$self.$capture_state = function () {
    return {
      isRefreshing: isRefreshing,
      refreshMessage: refreshMessage
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("isRefreshing" in $$props) $$invalidate(0, isRefreshing = $$props.isRefreshing);
    if ("refreshMessage" in $$props) $$invalidate(1, refreshMessage = $$props.refreshMessage);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [isRefreshing, refreshMessage, click_handler];
}

var RefreshButton = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(RefreshButton, _SvelteComponentDev);

  var _super = _createSuper(RefreshButton);

  function RefreshButton(options) {
    var _this;

    _classCallCheck(this, RefreshButton);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      isRefreshing: 0,
      refreshMessage: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "RefreshButton",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*isRefreshing*/
    ctx[0] === undefined && !("isRefreshing" in props)) {
      console.warn("<RefreshButton> was created without expected prop 'isRefreshing'");
    }

    if (
    /*refreshMessage*/
    ctx[1] === undefined && !("refreshMessage" in props)) {
      console.warn("<RefreshButton> was created without expected prop 'refreshMessage'");
    }

    return _this;
  }

  _createClass(RefreshButton, [{
    key: "isRefreshing",
    get: function get() {
      throw new Error("<RefreshButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RefreshButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "refreshMessage",
    get: function get() {
      throw new Error("<RefreshButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<RefreshButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return RefreshButton;
}(SvelteComponentDev);

export { RefreshButton as R };
