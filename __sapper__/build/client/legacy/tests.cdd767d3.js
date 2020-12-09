import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as element, t as text, g as space, j as claim_element, m as children, n as claim_text, k as detach_dev, l as claim_space, p as add_location, u as insert_dev, r as append_dev, L as listen_dev, C as _slicedToArray, I as set_data_dev, v as noop, N as run_all, V as validate_store, W as component_subscribe, w as validate_slots, E as counter } from './client.ebfafddf.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\routes\\tests.svelte";

function create_fragment(ctx) {
  var div;
  var button0;
  var t0;
  var t1;
  var button1;
  var t2;
  var t3;
  var t4_value =
  /*$counter*/
  ctx[0].content + "";
  var t4;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div = element("div");
      button0 = element("button");
      t0 = text("Reset");
      t1 = space();
      button1 = element("button");
      t2 = text("Update");
      t3 = space();
      t4 = text(t4_value);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      button0 = claim_element(div_nodes, "BUTTON", {});
      var button0_nodes = children(button0);
      t0 = claim_text(button0_nodes, "Reset");
      button0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      button1 = claim_element(div_nodes, "BUTTON", {});
      var button1_nodes = children(button1);
      t2 = claim_text(button1_nodes, "Update");
      button1_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      t4 = claim_text(div_nodes, t4_value);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(button0, file, 34, 4, 623);
      add_location(button1, file, 35, 4, 675);
      add_location(div, file, 33, 0, 612);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, button0);
      append_dev(button0, t0);
      append_dev(div, t1);
      append_dev(div, button1);
      append_dev(button1, t2);
      append_dev(div, t3);
      append_dev(div, t4);

      if (!mounted) {
        dispose = [listen_dev(button0, "click",
        /*resetCounter*/
        ctx[2], false, false, false), listen_dev(button1, "click",
        /*incrementCounter*/
        ctx[1], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$counter*/
      1 && t4_value !== (t4_value =
      /*$counter*/
      ctx[0].content + "")) set_data_dev(t4, t4_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
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
  var $counter;
  validate_store(counter, "counter");
  component_subscribe($$self, counter, function ($$value) {
    return $$invalidate(0, $counter = $$value);
  });

  function incrementCounter() {
    counter.set({
      "refresh": true
    });
  }

  function resetCounter() {
    counter.set(1);
  }

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Tests> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Tests", $$slots, []);

  $$self.$capture_state = function () {
    return {
      counter: counter,
      incrementCounter: incrementCounter,
      resetCounter: resetCounter,
      $counter: $counter
    };
  };

  return [$counter, incrementCounter, resetCounter];
}

var Tests = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Tests, _SvelteComponentDev);

  var _super = _createSuper(Tests);

  function Tests(options) {
    var _this;

    _classCallCheck(this, Tests);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Tests",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Tests;
}(SvelteComponentDev);

export default Tests;
