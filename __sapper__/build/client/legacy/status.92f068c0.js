import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as element, t as text, g as space, j as claim_element, m as children, n as claim_text, k as detach_dev, l as claim_space, o as attr_dev, p as add_location, u as insert_dev, r as append_dev, T as empty, C as _slicedToArray, v as noop, D as onMount, w as validate_slots, U as getUser, H as goto, y as _asyncToGenerator, z as regenerator } from './client.cd2c6d21.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\routes\\status.svelte"; // (25:0) {#if isApiDown}

function create_if_block(ctx) {
  var div1;
  var div0;
  var p0;
  var t0;
  var br;
  var t1;
  var p1;
  var t2;
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t0 = text("Our services are down");
      br = element("br");
      t1 = space();
      p1 = element("p");
      t2 = text("We will be back as soon as possible !");
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
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
      t0 = claim_text(p0_nodes, "Our services are down");
      p0_nodes.forEach(detach_dev);
      br = claim_element(div0_nodes, "BR", {});
      t1 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, "We will be back as soon as possible !");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "text-6xl lg:text-8xl");
      add_location(p0, file, 27, 12, 666);
      add_location(br, file, 27, 69, 723);
      attr_dev(p1, "class", "text-3xl lg:text-4xl text-mid-light");
      add_location(p1, file, 28, 12, 741);
      attr_dev(div0, "class", "text-center");
      add_location(div0, file, 26, 8, 627);
      attr_dev(div1, "class", "flex items-center justify-center h-screen-60 px-4 w-full lg:mt-10 mt-8 lg:mx-0");
      add_location(div1, file, 25, 4, 525);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t0);
      append_dev(div0, br);
      append_dev(div0, t1);
      append_dev(div0, p1);
      append_dev(p1, t2);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(25:0) {#if isApiDown}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var if_block_anchor;
  var if_block =
  /*isApiDown*/
  ctx[0] && create_if_block(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*isApiDown*/
      ctx[0]) {
        if (if_block) ; else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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
  var isApiDown = false;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var testError;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getUser();

          case 3:
            testError = _context.sent;

            if (testError instanceof Error) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", goto("/"));

          case 6:
            $$invalidate(0, isApiDown = true);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            $$invalidate(0, isApiDown = true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  })));
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Status> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Status", $$slots, []);

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      getUser: getUser,
      goto: goto,
      isApiDown: isApiDown
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("isApiDown" in $$props) $$invalidate(0, isApiDown = $$props.isApiDown);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [isApiDown];
}

var Status = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Status, _SvelteComponentDev);

  var _super = _createSuper(Status);

  function Status(options) {
    var _this;

    _classCallCheck(this, Status);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Status",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Status;
}(SvelteComponentDev);

export default Status;
