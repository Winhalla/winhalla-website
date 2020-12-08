import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, q as query_selector_all, k as detach_dev, v as noop, w as validate_slots } from './client.638e0a89.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment(ctx) {
  var block = {
    c: function create() {
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-88sy1r\"]", document.head);
      head_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Privacy policy | Winhalla";
    },
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
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

function instance($$self, $$props) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Privacy> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Privacy", $$slots, []);
  return [];
}

var Privacy = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Privacy, _SvelteComponentDev);

  var _super = _createSuper(Privacy);

  function Privacy(options) {
    var _this;

    _classCallCheck(this, Privacy);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Privacy",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Privacy;
}(SvelteComponentDev);

export default Privacy;
