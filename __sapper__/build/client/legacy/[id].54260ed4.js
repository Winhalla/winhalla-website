import { y as _asyncToGenerator, z as regenerator, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, t as text, f as element, n as claim_text, j as claim_element, m as children, k as detach_dev, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, v as noop, w as validate_slots } from './client.3590f68c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "C:\\CODAGE\\artemis-front\\src\\routes\\link\\[id].svelte";

function create_fragment(ctx) {
  var t0;
  var a;
  var t1;
  var block = {
    c: function create() {
      t0 = text("Redirecting to ");
      a = element("a");
      t1 = text("https://winhalla.appspot.com/create-account");
      this.h();
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, "Redirecting to ");
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      t1 = claim_text(a_nodes, "https://winhalla.appspot.com/create-account");
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", "https://winhalla.appspot.com/create-account");
      add_location(a, file, 7, 15, 235);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, a, anchor);
      append_dev(a, t1);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(a);
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
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var params, query, id;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _ref.params, query = _ref.query;
            id = params.id;
            this.redirect(302, "create-account?link=https://winhalla.appspot.com/link/".concat(id));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bidu5D", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bidu5D> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      preload: preload
    };
  };

  return [];
}

var U5Bidu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bidu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bidu5D);

  function U5Bidu5D(options) {
    var _this;

    _classCallCheck(this, U5Bidu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bidu5D",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return U5Bidu5D;
}(SvelteComponentDev);

export default U5Bidu5D;
export { preload };
