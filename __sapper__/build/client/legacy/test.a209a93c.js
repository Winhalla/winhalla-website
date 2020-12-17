import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as element, t as text, j as claim_element, m as children, n as claim_text, k as detach_dev, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, C as _slicedToArray, I as set_data_dev, v as noop, w as validate_slots, x as apiUrl, B as globals } from './client.873de4fc.js';
import { b as build } from './index.091962e4.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file = "src\\routes\\test.svelte";

function create_fragment(ctx) {
  var div;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text(
      /*variable*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes,
      /*variable*/
      ctx[0]);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "m-40");
      add_location(div, file, 24, 0, 573);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*variable*/
      1) set_data_dev(t,
      /*variable*/
      ctx[0]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
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
  validate_slots("Test", slots, []);
  var variable;

  var update = function update(_update) {
    $$invalidate(0, variable = _update);
    console.log(_update);
  };

  var socket = build.io(apiUrl);
  socket.on("connection", function (status) {
    console.log(status);
    socket.emit("match connection", "ID");
  });
  socket.on("join match", function (status) {
    console.log(status);
  });
  socket.on("update", function (value) {
    console.log(value);
  });
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Test> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      io: build,
      apiUrl: apiUrl,
      variable: variable,
      update: update,
      socket: socket
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("variable" in $$props) $$invalidate(0, variable = $$props.variable);
    if ("update" in $$props) update = $$props.update;
    if ("socket" in $$props) socket = $$props.socket;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [variable];
}

var Test = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Test, _SvelteComponentDev);

  var _super = _createSuper(Test);

  function Test(options) {
    var _this;

    _classCallCheck(this, Test);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Test",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Test;
}(SvelteComponentDev);

export default Test;
