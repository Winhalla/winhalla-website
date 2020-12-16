import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, T as empty, u as insert_dev, C as _slicedToArray, a1 as transition_out, a4 as check_outros, a0 as transition_in, k as detach_dev, w as validate_slots, D as onMount, F as callApi, H as goto, x as apiUrl, B as globals, a5 as group_outros, y as _asyncToGenerator, z as regenerator, Y as create_component, Z as claim_component, $ as mount_component, v as noop, a2 as destroy_component, f as element, t as text, g as space, j as claim_element, m as children, n as claim_text, l as claim_space, o as attr_dev, p as add_location, r as append_dev, I as set_data_dev } from './client.3590f68c.js';
import { L as Loading } from './Loading.fc4f9a5f.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file = "C:\\CODAGE\\artemis-front\\src\\routes\\play\\ffa\\index.svelte"; // (36:0) {:else}

function create_else_block(ctx) {
  var loading;
  var current;
  loading = new Loading({
    props: {
      data: "Finding game..."
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(loading.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(loading.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(loading, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(loading.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(loading.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(loading, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(36:0) {:else}",
    ctx: ctx
  });
  return block;
} // (31:0) {#if error}


function create_if_block(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var a;
  var p;
  var t2;
  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text(
      /*error*/
      ctx[0]);
      t1 = space();
      a = element("a");
      p = element("p");
      t2 = text("Go to play page");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes,
      /*error*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      a = claim_element(div_nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      p = claim_element(a_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t2 = claim_text(p_nodes, "Go to play page");
      p_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "lg:text-4xl text-3xl text-center");
      add_location(h2, file, 32, 8, 1133);
      attr_dev(p, "class", "underline lg:text-3xl text-2xl  text-center text-primary");
      add_location(p, file, 33, 24, 1216);
      attr_dev(a, "href", "/play");
      add_location(a, file, 33, 8, 1200);
      attr_dev(div, "class", "w-full content-center lg:mt-60 mt-25 ");
      add_location(div, file, 31, 4, 1072);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t0);
      append_dev(div, t1);
      append_dev(div, a);
      append_dev(a, p);
      append_dev(p, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      1) set_data_dev(t0,
      /*error*/
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
    id: create_if_block.name,
    type: "if",
    source: "(31:0) {#if error}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
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
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Ffa", slots, []);
  var error;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var id;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return callApi("get", "/lobby");

          case 3:
            id = _context.sent;
            console.log("id", id);

            if (!id) {
              goto("".concat(apiUrl, "/auth/login"));
            }

            goto("/play/ffa/".concat(id));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            if (_context.t0.response.status === 400 && _context.t0.response.data.includes("Play at least one ranked")) {
              $$invalidate(0, error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)");
            } else if (_context.t0.response.status === 400 && _context.t0.response.data.includes("Play at least one")) {
              $$invalidate(0, error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)");
            }

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  })));
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Ffa> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      callApi: callApi,
      goto: goto,
      apiUrl: apiUrl,
      Loading: Loading,
      error: error
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error];
}

var Ffa = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Ffa, _SvelteComponentDev);

  var _super = _createSuper(Ffa);

  function Ffa(options) {
    var _this;

    _classCallCheck(this, Ffa);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Ffa",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Ffa;
}(SvelteComponentDev);

export default Ffa;
