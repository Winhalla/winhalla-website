import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, g as space, f as element, t as text, q as query_selector_all, k as detach_dev, l as claim_space, j as claim_element, m as children, n as claim_text, p as add_location, o as attr_dev, u as insert_dev, r as append_dev, K as set_input_value, L as listen_dev, C as _slicedToArray, M as prop_dev, v as noop, N as run_all, w as validate_slots, D as onMount, F as callApi, H as goto, E as counter, y as _asyncToGenerator, z as regenerator } from './client.3590f68c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "C:\\CODAGE\\artemis-front\\src\\routes\\change-email.svelte"; // (61:4) {:else}

function create_else_block(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("INVALID EMAIL");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "INVALID EMAIL");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "text-red-700");
      add_location(p, file, 61, 8, 2089);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(61:4) {:else}",
    ctx: ctx
  });
  return block;
} // (59:4) {#if valid}


function create_if_block(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("VALID EMAIL");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "VALID EMAIL");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "text-green-700");
      add_location(p, file, 59, 8, 2025);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(59:4) {#if valid}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var div;
  var h2;
  var t1;
  var t2;
  var input;
  var t3;
  var t4;
  var br;
  var t5;
  var button;
  var t6;
  var button_disabled_value;
  var mounted;
  var dispose;

  function select_block_type(ctx, dirty) {
    if (
    /*valid*/
    ctx[1]) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      t0 = space();
      div = element("div");
      h2 = element("h2");
      t1 = text("Email");
      t2 = space();
      input = element("input");
      t3 = space();
      if_block.c();
      t4 = space();
      br = element("br");
      t5 = space();
      button = element("button");
      t6 = text("Create account");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1r944zp\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {});
      var h2_nodes = children(h2);
      t1 = claim_text(h2_nodes, "Email");
      h2_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      input = claim_element(div_nodes, "INPUT", {
        size: true,
        id: true,
        class: true
      });
      t3 = claim_space(div_nodes);
      if_block.l(div_nodes);
      t4 = claim_space(div_nodes);
      br = claim_element(div_nodes, "BR", {});
      t5 = claim_space(div_nodes);
      button = claim_element(div_nodes, "BUTTON", {
        disabled: true,
        class: true
      });
      var button_nodes = children(button);
      t6 = claim_text(button_nodes, "Create account");
      button_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Change email | Winhalla";
      add_location(h2, file, 55, 4, 1880);
      attr_dev(input, "size", "100");
      attr_dev(input, "id", "test");
      attr_dev(input, "class", "text-black p-1");
      add_location(input, file, 56, 4, 1900);
      add_location(br, file, 64, 4, 2149);
      button.disabled = button_disabled_value = !
      /*valid*/
      ctx[1];
      attr_dev(button, "class", "px-4 py-1 mt-4 bg-primary rounded svelte-g7dw6u");
      add_location(button, file, 65, 4, 2161);
      attr_dev(div, "class", "p-8");
      add_location(div, file, 54, 0, 1857);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t1);
      append_dev(div, t2);
      append_dev(div, input);
      set_input_value(input,
      /*email*/
      ctx[0]);
      append_dev(div, t3);
      if_block.m(div, null);
      append_dev(div, t4);
      append_dev(div, br);
      append_dev(div, t5);
      append_dev(div, button);
      append_dev(button, t6);

      if (!mounted) {
        dispose = [listen_dev(input, "keydown",
        /*onKeyPress*/
        ctx[2], false, false, false), listen_dev(input, "input",
        /*input_input_handler*/
        ctx[4]), listen_dev(button, "click",
        /*onClick*/
        ctx[3], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*email*/
      1 && input.value !==
      /*email*/
      ctx[0]) {
        set_input_value(input,
        /*email*/
        ctx[0]);
      }

      if (current_block_type !== (current_block_type = select_block_type(ctx))) {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(div, t4);
        }
      }

      if (dirty &
      /*valid*/
      2 && button_disabled_value !== (button_disabled_value = !
      /*valid*/
      ctx[1])) {
        prop_dev(button, "disabled", button_disabled_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div);
      if_block.d();
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Change_email", slots, []);
  var account;
  var email;
  var valid = false;

  function onKeyPress() {
    setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var regex, exec;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //Mettre un checker email
              regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
              exec = regex.exec(email);
              if (exec) $$invalidate(1, valid = true);else $$invalidate(1, valid = false);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })), 1);
  }

  var user;
  onMount(function () {
    var unsub = counter.subscribe( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(value) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = value.content;

                if (user.then) {
                  user.then(function (values) {
                    if (!values.user) {
                      goto("/");
                    }
                  });
                } else if (user) {
                  if (!user.user) {
                    goto("/");
                  }
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());
    unsub();
  });

  function onClick() {
    return _onClick.apply(this, arguments);
  }

  function _onClick() {
    _onClick = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return callApi("post", "/auth/changeEmail?email=".concat(email));

            case 2:
              goto("/");

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _onClick.apply(this, arguments);
  }

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Change_email> was created with unknown prop '".concat(key, "'"));
  });

  function input_input_handler() {
    email = this.value;
    $$invalidate(0, email);
  }

  $$self.$capture_state = function () {
    return {
      callApi: callApi,
      onMount: onMount,
      goto: goto,
      counter: counter,
      account: account,
      email: email,
      valid: valid,
      onKeyPress: onKeyPress,
      user: user,
      onClick: onClick
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("account" in $$props) account = $$props.account;
    if ("email" in $$props) $$invalidate(0, email = $$props.email);
    if ("valid" in $$props) $$invalidate(1, valid = $$props.valid);
    if ("user" in $$props) user = $$props.user;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [email, valid, onKeyPress, onClick, input_input_handler];
}

var Change_email = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Change_email, _SvelteComponentDev);

  var _super = _createSuper(Change_email);

  function Change_email(options) {
    var _this;

    _classCallCheck(this, Change_email);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Change_email",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Change_email;
}(SvelteComponentDev);

export default Change_email;
