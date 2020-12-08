import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, O as validate_each_argument, w as validate_slots, f as element, g as space, t as text, j as claim_element, m as children, l as claim_space, n as claim_text, k as detach_dev, o as attr_dev, p as add_location, J as toggle_class, u as insert_dev, r as append_dev, v as noop, T as empty, R as destroy_each, C as _slicedToArray, y as _asyncToGenerator, z as regenerator, B as globals, q as query_selector_all, a1 as transition_out, a4 as check_outros, a0 as transition_in, D as onMount, F as callApi, H as goto, E as counter, a5 as group_outros, a3 as _toConsumableArray, I as set_data_dev, Y as create_component, Z as claim_component, $ as mount_component, a2 as destroy_component, L as listen_dev } from './client.ac65fd5a.js';
import { R as RefreshButton } from './RefreshButton.0ff5bd9e.js';
import { L as Loading } from './Loading.0a2f4a34.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\components\\FfaEnd.svelte";

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[0] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}

function get_each_context_4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  child_ctx[4] = i;
  return child_ctx;
} // (100:12) {#each data[0] as winner,i}


function create_each_block_4(ctx) {
  var div3;
  var div2;
  var div1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var p0;
  var t1_value =
  /*winner*/
  ctx[5].username + "";
  var t1;
  var t2;
  var div0;
  var p1;
  var t3;
  var b;
  var t4_value =
  /*winner*/
  ctx[5].wins + "";
  var t4;
  var t5;
  var t6;
  var block = {
    c: function create() {
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      img = element("img");
      t0 = space();
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p1 = element("p");
      t3 = text("Games won: ");
      b = element("b");
      t4 = text(t4_value);
      t5 = text("/8");
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {});
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Games won: ");
      b = claim_element(p1_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t4 = claim_text(b_nodes, t4_value);
      b_nodes.forEach(detach_dev);
      t5 = claim_text(p1_nodes, "/8");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*winner*/
      ctx[5].legends + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*winner*/
      ctx[5].legends);
      attr_dev(img, "class", "block");
      add_location(img, file, 103, 28, 5206);
      attr_dev(p0, "class", "player-name text-4xl svelte-8uv8or");
      add_location(p0, file, 108, 28, 5432);
      attr_dev(b, "class", "svelte-8uv8or");
      add_location(b, file, 111, 47, 5655);
      add_location(p1, file, 110, 32, 5603);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-8uv8or");
      add_location(div0, file, 109, 28, 5515);
      attr_dev(div1, "class", "ffa-player card user svelte-8uv8or");
      add_location(div1, file, 102, 24, 5142);
      add_location(div2, file, 101, 20, 5111);
      toggle_class(div3, "lg:ml-10",
      /*i*/
      ctx[4] > 0);
      add_location(div3, file, 100, 16, 5062);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, img);
      append_dev(div1, t0);
      append_dev(div1, p0);
      append_dev(p0, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(p1, b);
      append_dev(b, t4);
      append_dev(p1, t5);
      append_dev(div3, t6);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_4.name,
    type: "each",
    source: "(100:12) {#each data[0] as winner,i}",
    ctx: ctx
  });
  return block;
} // (122:12) {#if data[1] !== ""}


function create_if_block_2(ctx) {
  var each_1_anchor;
  var each_value_3 =
  /*data*/
  ctx[1][1];
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
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
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      2) {
        each_value_3 =
        /*data*/
        ctx[1][1];
        validate_each_argument(each_value_3);

        var _i4;

        for (_i4 = 0; _i4 < each_value_3.length; _i4 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_3(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_3.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(122:12) {#if data[1] !== \\\"\\\"}",
    ctx: ctx
  });
  return block;
} // (123:16) {#each data[1] as winner,i}


function create_each_block_3(ctx) {
  var div3;
  var div2;
  var div1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var p0;
  var t1_value =
  /*winner*/
  ctx[5].username + "";
  var t1;
  var t2;
  var div0;
  var p1;
  var t3;
  var b;
  var t4_value =
  /*winner*/
  ctx[5].wins + "";
  var t4;
  var t5;
  var t6;
  var block = {
    c: function create() {
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      img = element("img");
      t0 = space();
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p1 = element("p");
      t3 = text("Games won: ");
      b = element("b");
      t4 = text(t4_value);
      t5 = text("/8");
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Games won: ");
      b = claim_element(p1_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t4 = claim_text(b_nodes, t4_value);
      b_nodes.forEach(detach_dev);
      t5 = claim_text(p1_nodes, "/8");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*winner*/
      ctx[5].legends + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*winner*/
      ctx[5].legends);
      attr_dev(img, "class", "block");
      add_location(img, file, 126, 32, 6214);
      attr_dev(p0, "class", "player-name text-4xl svelte-8uv8or");
      add_location(p0, file, 131, 32, 6456);
      attr_dev(b, "class", "svelte-8uv8or");
      add_location(b, file, 134, 51, 6691);
      add_location(p1, file, 133, 36, 6635);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-8uv8or");
      add_location(div0, file, 132, 32, 6543);
      attr_dev(div1, "class", "ffa-player card user svelte-8uv8or");
      add_location(div1, file, 125, 28, 6146);
      add_location(div2, file, 124, 24, 6111);
      attr_dev(div3, "class", "mt-10 lg:ml-10");
      add_location(div3, file, 123, 20, 6057);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, img);
      append_dev(div1, t0);
      append_dev(div1, p0);
      append_dev(p0, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(p1, b);
      append_dev(b, t4);
      append_dev(p1, t5);
      append_dev(div3, t6);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(123:16) {#each data[1] as winner,i}",
    ctx: ctx
  });
  return block;
} // (146:12) {#if data[2] !== ""}


function create_if_block_1(ctx) {
  var each_1_anchor;
  var each_value_2 =
  /*data*/
  ctx[1][2];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      2) {
        each_value_2 =
        /*data*/
        ctx[1][2];
        validate_each_argument(each_value_2);

        var _i8;

        for (_i8 = 0; _i8 < each_value_2.length; _i8 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_2(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(146:12) {#if data[2] !== \\\"\\\"}",
    ctx: ctx
  });
  return block;
} // (147:16) {#each data[2] as winner,i}


function create_each_block_2(ctx) {
  var div3;
  var div2;
  var div1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var p0;
  var t1_value =
  /*winner*/
  ctx[5].username + "";
  var t1;
  var t2;
  var div0;
  var p1;
  var t3;
  var b;
  var t4_value =
  /*winner*/
  ctx[5].wins + "";
  var t4;
  var t5;
  var t6;
  var block = {
    c: function create() {
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      img = element("img");
      t0 = space();
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p1 = element("p");
      t3 = text("Games won: ");
      b = element("b");
      t4 = text(t4_value);
      t5 = text("/8");
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Games won: ");
      b = claim_element(p1_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t4 = claim_text(b_nodes, t4_value);
      b_nodes.forEach(detach_dev);
      t5 = claim_text(p1_nodes, "/8");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*winner*/
      ctx[5].legends + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*winner*/
      ctx[5].legends);
      attr_dev(img, "class", "block");
      add_location(img, file, 150, 32, 7304);
      attr_dev(p0, "class", "player-name text-4xl svelte-8uv8or");
      add_location(p0, file, 155, 32, 7546);
      attr_dev(b, "class", "svelte-8uv8or");
      add_location(b, file, 158, 51, 7781);
      add_location(p1, file, 157, 36, 7725);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-8uv8or");
      add_location(div0, file, 156, 32, 7633);
      attr_dev(div1, "class", "ffa-player card user svelte-8uv8or");
      add_location(div1, file, 149, 28, 7236);
      add_location(div2, file, 148, 24, 7201);
      attr_dev(div3, "class", "mt-10 lg:mt-20 lg:ml-10");
      add_location(div3, file, 147, 20, 7138);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div2);
      append_dev(div2, div1);
      append_dev(div1, img);
      append_dev(div1, t0);
      append_dev(div1, p0);
      append_dev(p0, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(p1, b);
      append_dev(b, t4);
      append_dev(p1, t5);
      append_dev(div3, t6);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(147:16) {#each data[2] as winner,i}",
    ctx: ctx
  });
  return block;
} // (196:32) {#if winner.avatarURL || winner.username}


function create_if_block(ctx) {
  var tr;
  var td0;
  var b0;
  var t0_value =
  /*i*/
  ctx[4] + 1 + "";
  var t0;
  var t1;
  var td1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t2;
  var p;
  var t3_value =
  /*winner*/
  ctx[5].username + "";
  var t3;
  var t4;
  var td2;
  var b1;
  var t5_value =
  /*winner*/
  ctx[5].wins + "";
  var t5;
  var t6;
  var t7;
  var td3;
  var t8_value =
  /*winner*/
  ctx[5].coinsEarned + "";
  var t8;
  var t9;
  var td4;
  var t10_value =
  /*winner*/
  ctx[5].multiplier + "";
  var t10;
  var t11;
  var block = {
    c: function create() {
      tr = element("tr");
      td0 = element("td");
      b0 = element("b");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      img = element("img");
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      td2 = element("td");
      b1 = element("b");
      t5 = text(t5_value);
      t6 = text("/8");
      t7 = space();
      td3 = element("td");
      t8 = text(t8_value);
      t9 = space();
      td4 = element("td");
      t10 = text(t10_value);
      t11 = space();
      this.h();
    },
    l: function claim(nodes) {
      tr = claim_element(nodes, "TR", {});
      var tr_nodes = children(tr);
      td0 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td0_nodes = children(td0);
      b0 = claim_element(td0_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t0 = claim_text(b0_nodes, t0_value);
      b0_nodes.forEach(detach_dev);
      td0_nodes.forEach(detach_dev);
      t1 = claim_space(tr_nodes);
      td1 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td1_nodes = children(td1);
      img = claim_element(td1_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t2 = claim_space(td1_nodes);
      p = claim_element(td1_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      td1_nodes.forEach(detach_dev);
      t4 = claim_space(tr_nodes);
      td2 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td2_nodes = children(td2);
      b1 = claim_element(td2_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t5 = claim_text(b1_nodes, t5_value);
      b1_nodes.forEach(detach_dev);
      t6 = claim_text(td2_nodes, "/8");
      td2_nodes.forEach(detach_dev);
      t7 = claim_space(tr_nodes);
      td3 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td3_nodes = children(td3);
      t8 = claim_text(td3_nodes, t8_value);
      td3_nodes.forEach(detach_dev);
      t9 = claim_space(tr_nodes);
      td4 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td4_nodes = children(td4);
      t10 = claim_text(td4_nodes, t10_value);
      td4_nodes.forEach(detach_dev);
      t11 = claim_space(tr_nodes);
      tr_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b0, "class", "font-normal svelte-8uv8or");
      add_location(b0, file, 198, 44, 9545);
      attr_dev(td0, "class", "px-6 py-2");
      add_location(td0, file, 197, 40, 9477);
      attr_dev(img, "class", "block w-10 h-10 rounded-full");
      if (img.src !== (img_src_value =
      /*winner*/
      ctx[5].avatarURL)) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*winner*/
      ctx[5].legends);
      add_location(img, file, 201, 44, 9752);
      attr_dev(p, "class", "pl-2");
      add_location(p, file, 203, 44, 9934);
      attr_dev(td1, "class", "flex items-center px-6 py-2");
      add_location(td1, file, 200, 40, 9666);
      attr_dev(b1, "class", "text-primary font-normal svelte-8uv8or");
      add_location(b1, file, 206, 44, 10128);
      attr_dev(td2, "class", "px-6 py-2");
      add_location(td2, file, 205, 40, 10060);
      attr_dev(td3, "class", "px-6 py-2");
      add_location(td3, file, 208, 40, 10272);
      attr_dev(td4, "class", "px-6 py-2");
      add_location(td4, file, 211, 40, 10449);
      add_location(tr, file, 196, 36, 9431);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tr, anchor);
      append_dev(tr, td0);
      append_dev(td0, b0);
      append_dev(b0, t0);
      append_dev(tr, t1);
      append_dev(tr, td1);
      append_dev(td1, img);
      append_dev(td1, t2);
      append_dev(td1, p);
      append_dev(p, t3);
      append_dev(tr, t4);
      append_dev(tr, td2);
      append_dev(td2, b1);
      append_dev(b1, t5);
      append_dev(td2, t6);
      append_dev(tr, t7);
      append_dev(tr, td3);
      append_dev(td3, t8);
      append_dev(tr, t9);
      append_dev(tr, td4);
      append_dev(td4, t10);
      append_dev(tr, t11);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(tr);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(196:32) {#if winner.avatarURL || winner.username}",
    ctx: ctx
  });
  return block;
} // (195:28) {#each winners as winner}


function create_each_block_1(ctx) {
  var if_block_anchor;
  var if_block = (
  /*winner*/
  ctx[5].avatarURL ||
  /*winner*/
  ctx[5].username) && create_if_block(ctx);
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
    p: function update(ctx, dirty) {
      if (
      /*winner*/
      ctx[5].avatarURL ||
      /*winner*/
      ctx[5].username) if_block.p(ctx, dirty);
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(195:28) {#each winners as winner}",
    ctx: ctx
  });
  return block;
} // (193:24) {#each data as winners,i}


function create_each_block(ctx) {
  var each_1_anchor;
  var each_value_1 =
  /*winners*/
  ctx[0];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      2) {
        each_value_1 =
        /*winners*/
        ctx[0];
        validate_each_argument(each_value_1);

        var _i12;

        for (_i12 = 0; _i12 < each_value_1.length; _i12 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block_1(child_ctx);

            each_blocks[_i12].c();

            each_blocks[_i12].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(193:24) {#each data as winners,i}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div7;
  var div1;
  var div0;
  var h1;
  var t0;
  var t1;
  var div6;
  var div2;
  var t2;
  var t3;
  var t4;
  var div5;
  var div4;
  var div3;
  var table;
  var thead;
  var tr;
  var td0;
  var t5;
  var t6;
  var td1;
  var t7;
  var t8;
  var td2;
  var t9;
  var t10;
  var td3;
  var t11;
  var t12;
  var td4;
  var t13;
  var t14;
  var tbody;
  var each_value_4 =
  /*data*/
  ctx[1][0];
  validate_each_argument(each_value_4);
  var each_blocks_1 = [];

  for (var i = 0; i < each_value_4.length; i += 1) {
    each_blocks_1[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }

  var if_block0 =
  /*data*/
  ctx[1][1] !== "" && create_if_block_2(ctx);
  var if_block1 =
  /*data*/
  ctx[1][2] !== "" && create_if_block_1(ctx);
  var each_value =
  /*data*/
  ctx[1];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var _i13 = 0; _i13 < each_value.length; _i13 += 1) {
    each_blocks[_i13] = create_each_block(get_each_context(ctx, each_value, _i13));
  }

  var block = {
    c: function create() {
      div7 = element("div");
      div1 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t0 = text("Match Ended");
      t1 = space();
      div6 = element("div");
      div2 = element("div");

      for (var _i14 = 0; _i14 < each_blocks_1.length; _i14 += 1) {
        each_blocks_1[_i14].c();
      }

      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      div5 = element("div");
      div4 = element("div");
      div3 = element("div");
      table = element("table");
      thead = element("thead");
      tr = element("tr");
      td0 = element("td");
      t5 = text("Rank");
      t6 = space();
      td1 = element("td");
      t7 = text("Player");
      t8 = space();
      td2 = element("td");
      t9 = text("Wins");
      t10 = space();
      td3 = element("td");
      t11 = text("Earned");
      t12 = space();
      td4 = element("td");
      t13 = text("Multiplier");
      t14 = space();
      tbody = element("tbody");

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div7 = claim_element(nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      div1 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Match Ended");
      h1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t1 = claim_space(div7_nodes);
      div6 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div2 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);

      for (var _i16 = 0; _i16 < each_blocks_1.length; _i16 += 1) {
        each_blocks_1[_i16].l(div2_nodes);
      }

      t2 = claim_space(div2_nodes);
      if (if_block0) if_block0.l(div2_nodes);
      t3 = claim_space(div2_nodes);
      if (if_block1) if_block1.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      t4 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {});
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", {});
      var div3_nodes = children(div3);
      table = claim_element(div3_nodes, "TABLE", {
        class: true
      });
      var table_nodes = children(table);
      thead = claim_element(table_nodes, "THEAD", {
        class: true
      });
      var thead_nodes = children(thead);
      tr = claim_element(thead_nodes, "TR", {});
      var tr_nodes = children(tr);
      td0 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td0_nodes = children(td0);
      t5 = claim_text(td0_nodes, "Rank");
      td0_nodes.forEach(detach_dev);
      t6 = claim_space(tr_nodes);
      td1 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td1_nodes = children(td1);
      t7 = claim_text(td1_nodes, "Player");
      td1_nodes.forEach(detach_dev);
      t8 = claim_space(tr_nodes);
      td2 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td2_nodes = children(td2);
      t9 = claim_text(td2_nodes, "Wins");
      td2_nodes.forEach(detach_dev);
      t10 = claim_space(tr_nodes);
      td3 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td3_nodes = children(td3);
      t11 = claim_text(td3_nodes, "Earned");
      td3_nodes.forEach(detach_dev);
      t12 = claim_space(tr_nodes);
      td4 = claim_element(tr_nodes, "TD", {
        class: true
      });
      var td4_nodes = children(td4);
      t13 = claim_text(td4_nodes, "Multiplier");
      td4_nodes.forEach(detach_dev);
      tr_nodes.forEach(detach_dev);
      thead_nodes.forEach(detach_dev);
      t14 = claim_space(table_nodes);
      tbody = claim_element(table_nodes, "TBODY", {
        class: true
      });
      var tbody_nodes = children(tbody);

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].l(tbody_nodes);
      }

      tbody_nodes.forEach(detach_dev);
      table_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "text-6xl");
      add_location(h1, file, 90, 12, 4758);
      attr_dev(div0, "class", "mode-timer lg:flex items-end");
      add_location(div0, file, 89, 8, 4702);
      attr_dev(div1, "class", "pl-7 lg:pl-24 pt-8 lg:pt-12");
      add_location(div1, file, 88, 4, 4651);
      attr_dev(div2, "class", "flex flex-col items-center lg:flex-row");
      add_location(div2, file, 96, 8, 4917);
      attr_dev(td0, "class", "px-6 py-3");
      add_location(td0, file, 173, 28, 8359);
      attr_dev(td1, "class", "px-6 py-3");
      add_location(td1, file, 176, 28, 8484);
      attr_dev(td2, "class", "px-6 py-3");
      add_location(td2, file, 179, 28, 8611);
      attr_dev(td3, "class", "px-6 py-3");
      add_location(td3, file, 182, 28, 8736);
      attr_dev(td4, "class", "px-6 py-3");
      add_location(td4, file, 185, 28, 8863);
      add_location(tr, file, 172, 24, 8325);
      attr_dev(thead, "class", "bg-primary ");
      add_location(thead, file, 171, 24, 8272);
      attr_dev(tbody, "class", "divide-y-4 divide-background text-l");
      add_location(tbody, file, 190, 24, 9055);
      attr_dev(table, "class", "card px-4 overflow-hidden mt-10 lg:mt-20");
      add_location(table, file, 170, 20, 8190);
      add_location(div3, file, 169, 16, 8163);
      attr_dev(div4, "class", "overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 ");
      add_location(div4, file, 168, 12, 8070);
      add_location(div5, file, 167, 8, 8051);
      attr_dev(div6, "class", "flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24");
      add_location(div6, file, 94, 4, 4831);
      attr_dev(div7, "class", "");
      add_location(div7, file, 87, 0, 4631);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div7, anchor);
      append_dev(div7, div1);
      append_dev(div1, div0);
      append_dev(div0, h1);
      append_dev(h1, t0);
      append_dev(div7, t1);
      append_dev(div7, div6);
      append_dev(div6, div2);

      for (var _i18 = 0; _i18 < each_blocks_1.length; _i18 += 1) {
        each_blocks_1[_i18].m(div2, null);
      }

      append_dev(div2, t2);
      if (if_block0) if_block0.m(div2, null);
      append_dev(div2, t3);
      if (if_block1) if_block1.m(div2, null);
      append_dev(div6, t4);
      append_dev(div6, div5);
      append_dev(div5, div4);
      append_dev(div4, div3);
      append_dev(div3, table);
      append_dev(table, thead);
      append_dev(thead, tr);
      append_dev(tr, td0);
      append_dev(td0, t5);
      append_dev(tr, t6);
      append_dev(tr, td1);
      append_dev(td1, t7);
      append_dev(tr, t8);
      append_dev(tr, td2);
      append_dev(td2, t9);
      append_dev(tr, t10);
      append_dev(tr, td3);
      append_dev(td3, t11);
      append_dev(tr, t12);
      append_dev(tr, td4);
      append_dev(td4, t13);
      append_dev(table, t14);
      append_dev(table, tbody);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(tbody, null);
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*data*/
      2) {
        each_value_4 =
        /*data*/
        ctx[1][0];
        validate_each_argument(each_value_4);

        var _i20;

        for (_i20 = 0; _i20 < each_value_4.length; _i20 += 1) {
          var child_ctx = get_each_context_4(ctx, each_value_4, _i20);

          if (each_blocks_1[_i20]) {
            each_blocks_1[_i20].p(child_ctx, dirty);
          } else {
            each_blocks_1[_i20] = create_each_block_4(child_ctx);

            each_blocks_1[_i20].c();

            each_blocks_1[_i20].m(div2, t2);
          }
        }

        for (; _i20 < each_blocks_1.length; _i20 += 1) {
          each_blocks_1[_i20].d(1);
        }

        each_blocks_1.length = each_value_4.length;
      }

      if (
      /*data*/
      ctx[1][1] !== "") if_block0.p(ctx, dirty);
      if (
      /*data*/
      ctx[1][2] !== "") if_block1.p(ctx, dirty);

      if (dirty &
      /*data*/
      2) {
        each_value =
        /*data*/
        ctx[1];
        validate_each_argument(each_value);

        var _i21;

        for (_i21 = 0; _i21 < each_value.length; _i21 += 1) {
          var _child_ctx = get_each_context(ctx, each_value, _i21);

          if (each_blocks[_i21]) {
            each_blocks[_i21].p(_child_ctx, dirty);
          } else {
            each_blocks[_i21] = create_each_block(_child_ctx);

            each_blocks[_i21].c();

            each_blocks[_i21].m(tbody, null);
          }
        }

        for (; _i21 < each_blocks.length; _i21 += 1) {
          each_blocks[_i21].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div7);
      destroy_each(each_blocks_1, detaching);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      destroy_each(each_blocks, detaching);
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
  var players = $$props.players;
  var winners = $$props.winners;
  var data = winners.map(function (w) {
    var array = [];
    w.forEach(function (e, i) {
      //TODO: faire la même mais avec l'array winners au lieu de players
      if (e == "") return;
      var winnerInPlayers = players.find(function (p) {
        return p.steamId == e.steamId;
      });
      array.push({
        username: winnerInPlayers.username,
        avatarURL: winnerInPlayers.avatarURL,
        legends: winnerInPlayers.legends,
        wins: winnerInPlayers.wins,
        coinsEarned: e.coins,
        multiplier: e.multiplier
      });
    });
    return array;
  });
  var writable_props = ["players", "winners"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<FfaEnd> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("FfaEnd", $$slots, []);

  $$self.$$set = function ($$props) {
    if ("players" in $$props) $$invalidate(2, players = $$props.players);
    if ("winners" in $$props) $$invalidate(0, winners = $$props.winners);
  };

  $$self.$capture_state = function () {
    return {
      players: players,
      winners: winners,
      data: data
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("players" in $$props) $$invalidate(2, players = $$props.players);
    if ("winners" in $$props) $$invalidate(0, winners = $$props.winners);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [winners, data, players];
}

var FfaEnd = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FfaEnd, _SvelteComponentDev);

  var _super = _createSuper(FfaEnd);

  function FfaEnd(options) {
    var _this;

    _classCallCheck(this, FfaEnd);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      players: 2,
      winners: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FfaEnd",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*players*/
    ctx[2] === undefined && !("players" in props)) {
      console.warn("<FfaEnd> was created without expected prop 'players'");
    }

    if (
    /*winners*/
    ctx[0] === undefined && !("winners" in props)) {
      console.warn("<FfaEnd> was created without expected prop 'winners'");
    }

    return _this;
  }

  _createClass(FfaEnd, [{
    key: "players",
    get: function get() {
      throw new Error("<FfaEnd>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FfaEnd>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "winners",
    get: function get() {
      throw new Error("<FfaEnd>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FfaEnd>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return FfaEnd;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file$1 = "src\\routes\\play\\ffa\\[id].svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
} // (321:0) {:else}


function create_else_block(ctx) {
  var div;
  var current_block_type_index;
  var if_block;
  var current;
  var if_block_creators = [create_if_block_1$1, create_else_block_3];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*match*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "h-full");
      add_location(div, file$1, 321, 4, 12238);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

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
        }

        transition_in(if_block, 1);
        if_block.m(div, null);
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
      if (detaching) detach_dev(div);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(321:0) {:else}",
    ctx: ctx
  });
  return block;
} // (316:0) {#if error}


function create_if_block$1(ctx) {
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
      ctx[5]);
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
      ctx[5]);
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
      add_location(h2, file$1, 317, 8, 12037);
      attr_dev(p, "class", "underline lg:text-3xl text-2xl  text-center text-primary");
      add_location(p, file$1, 318, 24, 12120);
      attr_dev(a, "href", "/play");
      add_location(a, file$1, 318, 8, 12104);
      attr_dev(div, "class", "w-full content-center lg:mt-60 mt-25 ");
      add_location(div, file$1, 316, 4, 11976);
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
      32) set_data_dev(t0,
      /*error*/
      ctx[5]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(316:0) {#if error}",
    ctx: ctx
  });
  return block;
} // (420:8) {:else}


function create_else_block_3(ctx) {
  var loading;
  var current;
  loading = new Loading({
    props: {
      data: "Loading game data..."
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
    id: create_else_block_3.name,
    type: "else",
    source: "(420:8) {:else}",
    ctx: ctx
  });
  return block;
} // (323:8) {#if match}


function create_if_block_1$1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block_2$1, create_else_block_1];
  var if_blocks = [];

  function select_block_type_2(ctx, dirty) {
    if (
    /*isMatchEnded*/
    ctx[1]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_2(ctx);
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
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx);

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
    id: create_if_block_1$1.name,
    type: "if",
    source: "(323:8) {#if match}",
    ctx: ctx
  });
  return block;
} // (326:12) {:else}


function create_else_block_1(ctx) {
  var div4;
  var div2;
  var div0;
  var h1;
  var t0;
  var t1;
  var p;
  var t2;
  var div1;
  var refreshbutton;
  var t3;
  var t4;
  var div3;
  var t5;
  var current;

  function select_block_type_3(ctx, dirty) {
    if (
    /*countDown*/
    ctx[2]) return create_if_block_6;
    return create_else_block_2;
  }

  var current_block_type = select_block_type_3(ctx);
  var if_block0 = current_block_type(ctx);
  refreshbutton = new RefreshButton({
    props: {
      isRefreshing:
      /*isRefreshingStats*/
      ctx[6],
      refreshMessage: "Refresh data"
    },
    $$inline: true
  });
  refreshbutton.$on("click",
  /*click_handler*/
  ctx[10]);
  var if_block1 =
  /*userPlayer*/
  ctx[3].gamesPlayed == 0 && create_if_block_5(ctx);
  var if_block2 =
  /*userPlayer*/
  ctx[3] && create_if_block_4(ctx);
  var if_block3 =
  /*players*/
  ctx[4] && create_if_block_3(ctx);
  var block = {
    c: function create() {
      div4 = element("div");
      div2 = element("div");
      div0 = element("div");
      h1 = element("h1");
      t0 = text("FFA");
      t1 = space();
      p = element("p");
      if_block0.c();
      t2 = space();
      div1 = element("div");
      create_component(refreshbutton.$$.fragment);
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      div3 = element("div");
      if (if_block2) if_block2.c();
      t5 = space();
      if (if_block3) if_block3.c();
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
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "FFA");
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div0_nodes);
      p = claim_element(div0_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      if_block0.l(p_nodes);
      p_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t2 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(refreshbutton.$$.fragment, div1_nodes);
      t3 = claim_space(div1_nodes);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t4 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      if (if_block2) if_block2.l(div3_nodes);
      t5 = claim_space(div3_nodes);
      if (if_block3) if_block3.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "text-6xl leading-none");
      add_location(h1, file$1, 333, 28, 12846);
      attr_dev(p, "class", "timer text-primary ml-5 text-3xl leading-none svelte-o9xk45");
      add_location(p, file$1, 334, 28, 12918);
      attr_dev(div0, "class", "mode-timer flex justify-center lg:justify-start\r\n                        items-end w-60 ");
      add_location(div0, file$1, 330, 24, 12685);
      attr_dev(div1, "class", "lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\r\n                        items-center");
      add_location(div1, file$1, 340, 24, 13184);
      attr_dev(div2, "class", "flex flex-col justify-center lg:flex-row\r\n                    lg:justify-between items-center lg:mt-12 mt-7");
      add_location(div2, file$1, 327, 20, 12513);
      attr_dev(div3, "class", "flex items-center flex-col lg:flex-row lg:items-start\r\n                    h-full");
      add_location(div3, file$1, 358, 20, 14061);
      attr_dev(div4, "class", "h-full flex items-center flex-col lg:block lg:ml-24");
      add_location(div4, file$1, 326, 16, 12426);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div4, anchor);
      append_dev(div4, div2);
      append_dev(div2, div0);
      append_dev(div0, h1);
      append_dev(h1, t0);
      append_dev(div0, t1);
      append_dev(div0, p);
      if_block0.m(p, null);
      append_dev(div2, t2);
      append_dev(div2, div1);
      mount_component(refreshbutton, div1, null);
      append_dev(div1, t3);
      if (if_block1) if_block1.m(div1, null);
      append_dev(div4, t4);
      append_dev(div4, div3);
      if (if_block2) if_block2.m(div3, null);
      append_dev(div3, t5);
      if (if_block3) if_block3.m(div3, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(p, null);
        }
      }

      var refreshbutton_changes = {};
      if (dirty &
      /*isRefreshingStats*/
      64) refreshbutton_changes.isRefreshing =
      /*isRefreshingStats*/
      ctx[6];
      refreshbutton.$set(refreshbutton_changes);

      if (
      /*userPlayer*/
      ctx[3].gamesPlayed == 0) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_5(ctx);
          if_block1.c();
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (
      /*userPlayer*/
      ctx[3]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_4(ctx);
          if_block2.c();
          if_block2.m(div3, t5);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (
      /*players*/
      ctx[4]) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_3(ctx);
          if_block3.c();
          if_block3.m(div3, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
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
      if (detaching) detach_dev(div4);
      if_block0.d();
      destroy_component(refreshbutton);
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(326:12) {:else}",
    ctx: ctx
  });
  return block;
} // (324:12) {#if isMatchEnded}


function create_if_block_2$1(ctx) {
  var ffaend;
  var current;
  ffaend = new FfaEnd({
    props: {
      players:
      /*match*/
      ctx[0].players,
      winners:
      /*match*/
      ctx[0].winners
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(ffaend.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(ffaend.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(ffaend, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var ffaend_changes = {};
      if (dirty &
      /*match*/
      1) ffaend_changes.players =
      /*match*/
      ctx[0].players;
      if (dirty &
      /*match*/
      1) ffaend_changes.winners =
      /*match*/
      ctx[0].winners;
      ffaend.$set(ffaend_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(ffaend.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(ffaend.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(ffaend, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(324:12) {#if isMatchEnded}",
    ctx: ctx
  });
  return block;
} // (337:58) {:else}


function create_else_block_2(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Loading...");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Loading...");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_2.name,
    type: "else",
    source: "(337:58) {:else}",
    ctx: ctx
  });
  return block;
} // (337:32) {#if countDown}


function create_if_block_6(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text(
      /*countDown*/
      ctx[2]);
    },
    l: function claim(nodes) {
      t = claim_text(nodes,
      /*countDown*/
      ctx[2]);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*countDown*/
      4) set_data_dev(t,
      /*countDown*/
      ctx[2]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(337:32) {#if countDown}",
    ctx: ctx
  });
  return block;
} // (348:28) {#if userPlayer.gamesPlayed == 0}


function create_if_block_5(ctx) {
  var button;
  var t;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      button = element("button");
      t = text("Quit lobby");
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      t = claim_text(button_nodes, "Quit lobby");
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(button, "class", "button button-brand quit lg:ml-4 mt-2\r\n                                lg:mt-0 svelte-o9xk45");
      add_location(button, file$1, 348, 32, 13652);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, t);

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler_1*/
        ctx[11], false, false, false);
        mounted = true;
      }
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(348:28) {#if userPlayer.gamesPlayed == 0}",
    ctx: ctx
  });
  return block;
} // (363:24) {#if userPlayer}


function create_if_block_4(ctx) {
  var div1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var p0;
  var t1_value =
  /*userPlayer*/
  ctx[3].username + "";
  var t1;
  var t2;
  var div0;
  var p1;
  var t3;
  var b0;
  var t4_value =
  /*userPlayer*/
  ctx[3].gamesPlayed + "";
  var t4;
  var t5;
  var t6;
  var p2;
  var t7;
  var b1;
  var t8_value =
  /*userPlayer*/
  ctx[3].wins + "";
  var t8;
  var t9;
  var block = {
    c: function create() {
      div1 = element("div");
      img = element("img");
      t0 = space();
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p1 = element("p");
      t3 = text("Games played:\r\n                                        ");
      b0 = element("b");
      t4 = text(t4_value);
      t5 = text("\r\n                                        /8");
      t6 = space();
      p2 = element("p");
      t7 = text("Games won:\r\n                                        ");
      b1 = element("b");
      t8 = text(t8_value);
      t9 = text("\r\n                                        /8");
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Games played:\r\n                                        ");
      b0 = claim_element(p1_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t4 = claim_text(b0_nodes, t4_value);
      b0_nodes.forEach(detach_dev);
      t5 = claim_text(p1_nodes, "\r\n                                        /8");
      p1_nodes.forEach(detach_dev);
      t6 = claim_space(div0_nodes);
      p2 = claim_element(div0_nodes, "P", {});
      var p2_nodes = children(p2);
      t7 = claim_text(p2_nodes, "Games won:\r\n                                        ");
      b1 = claim_element(p2_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t8 = claim_text(b1_nodes, t8_value);
      b1_nodes.forEach(detach_dev);
      t9 = claim_text(p2_nodes, "\r\n                                        /8");
      p2_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*userPlayer*/
      ctx[3].legends + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*userPlayer*/
      ctx[3].legends);
      attr_dev(img, "class", "block");
      add_location(img, file$1, 364, 32, 14379);
      attr_dev(p0, "class", "player-name text-4xl svelte-o9xk45");
      add_location(p0, file$1, 369, 32, 14629);
      attr_dev(b0, "class", "svelte-o9xk45");
      add_location(b0, file$1, 376, 40, 15021);
      add_location(p1, file$1, 374, 36, 14921);
      attr_dev(b1, "class", "svelte-o9xk45");
      add_location(b1, file$1, 381, 40, 15273);
      add_location(p2, file$1, 379, 36, 15176);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-o9xk45");
      add_location(div0, file$1, 372, 32, 14792);
      attr_dev(div1, "class", "mt-8 lg:mt-25 ffa-player card user svelte-o9xk45");
      add_location(div1, file$1, 363, 28, 14297);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, img);
      append_dev(div1, t0);
      append_dev(div1, p0);
      append_dev(p0, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(p1, b0);
      append_dev(b0, t4);
      append_dev(p1, t5);
      append_dev(div0, t6);
      append_dev(div0, p2);
      append_dev(p2, t7);
      append_dev(p2, b1);
      append_dev(b1, t8);
      append_dev(p2, t9);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*userPlayer*/
      8 && img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*userPlayer*/
      ctx[3].legends + ".png")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*userPlayer*/
      8 && img_alt_value !== (img_alt_value =
      /*userPlayer*/
      ctx[3].legends)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*userPlayer*/
      8 && t1_value !== (t1_value =
      /*userPlayer*/
      ctx[3].username + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*userPlayer*/
      8 && t4_value !== (t4_value =
      /*userPlayer*/
      ctx[3].gamesPlayed + "")) set_data_dev(t4, t4_value);
      if (dirty &
      /*userPlayer*/
      8 && t8_value !== (t8_value =
      /*userPlayer*/
      ctx[3].wins + "")) set_data_dev(t8, t8_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(363:24) {#if userPlayer}",
    ctx: ctx
  });
  return block;
} // (390:24) {#if players}


function create_if_block_3(ctx) {
  var div;
  var each_value =
  /*players*/
  ctx[4];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
      attr_dev(div, "class", "flex flex-col justify-center lg:justify-start\r\n                            lg:flex-row lg:flex-wrap lg:ml-33 mt-14 lg:mt-0");
      add_location(div, file$1, 390, 28, 15607);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*players*/
      16) {
        each_value =
        /*players*/
        ctx[4];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
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
    id: create_if_block_3.name,
    type: "if",
    source: "(390:24) {#if players}",
    ctx: ctx
  });
  return block;
} // (394:32) {#each players as player}


function create_each_block$1(ctx) {
  var div1;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var p0;
  var t1_value =
  /*player*/
  ctx[15].username + "";
  var t1;
  var t2;
  var div0;
  var p1;
  var t3;
  var b;
  var t4_value =
  /*player*/
  ctx[15].gamesPlayed + "";
  var t4;
  var t5;
  var t6;
  var block = {
    c: function create() {
      div1 = element("div");
      img = element("img");
      t0 = space();
      p0 = element("p");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      p1 = element("p");
      t3 = text("Games played:\r\n                                                ");
      b = element("b");
      t4 = text(t4_value);
      t5 = text("\r\n                                                /8");
      t6 = space();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, t1_value);
      p0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "Games played:\r\n                                                ");
      b = claim_element(p1_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t4 = claim_text(b_nodes, t4_value);
      b_nodes.forEach(detach_dev);
      t5 = claim_text(p1_nodes, "\r\n                                                /8");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t6 = claim_space(div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*player*/
      ctx[15].legends + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*player*/
      ctx[15].legends);
      attr_dev(img, "class", "block");
      add_location(img, file$1, 395, 40, 15958);
      attr_dev(p0, "class", "player-name text-3xl svelte-o9xk45");
      add_location(p0, file$1, 400, 40, 16232);
      attr_dev(b, "class", "svelte-o9xk45");
      add_location(b, file$1, 408, 48, 16716);
      add_location(p1, file$1, 406, 44, 16600);
      attr_dev(div0, "class", "stats text-xl bottom-5\r\n                                        text-ultra-light svelte-o9xk45");
      add_location(div0, file$1, 403, 40, 16415);
      attr_dev(div1, "class", "ffa-player card lg:mr-12 mb-8 svelte-o9xk45");
      add_location(div1, file$1, 394, 36, 15873);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, img);
      append_dev(div1, t0);
      append_dev(div1, p0);
      append_dev(p0, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, p1);
      append_dev(p1, t3);
      append_dev(p1, b);
      append_dev(b, t4);
      append_dev(p1, t5);
      append_dev(div1, t6);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*players*/
      16 && img.src !== (img_src_value = "/assets/CharactersBanners/" +
      /*player*/
      ctx[15].legends + ".png")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*players*/
      16 && img_alt_value !== (img_alt_value =
      /*player*/
      ctx[15].legends)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*players*/
      16 && t1_value !== (t1_value =
      /*player*/
      ctx[15].username + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*players*/
      16 && t4_value !== (t4_value =
      /*player*/
      ctx[15].gamesPlayed + "")) set_data_dev(t4, t4_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(394:32) {#each players as player}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var t;
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$1, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[5]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      t = space();
      if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-y6pzc3\"]", document.head);
      head_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      document.title = "Winhalla | FFA match";
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
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
      if (detaching) detach_dev(t);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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

function preload(_x) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref3) {
    var params, id;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = _ref3.params;
            id = params.id;
            /*let user = await getUser();
            user = user.steam;
            
            let match = await callApi("get", `/getMatch/${id}`);
            let isMatchEnded = match.finished;
            let d = new Date(match.Date);
            const endsIn = -(
               (new Date().getTime() -
                   new Date(d.setHours(d.getHours() + 3)).getTime()) /
               1000
            );
            
            startTimer(endsIn);
            
            let userPlayer;
            let players;
            const filterUsers = () => {
               //Find user's object
               userPlayer = match.players.find(
                   (p) => p.steamId === parseInt(user.id)
               );
            
               //Delete user's object from array.
               players = [...match.players];
               players.splice(
                   match.players.findIndex((p) => p.steamId === parseInt(user.id)),
                   1
               );
            };
            filterUsers();
            console.log(id, match);*/

            return _context4.abrupt("return", {
              id: id
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _preload.apply(this, arguments);
}

function instance$1($$self, $$props, $$invalidate) {
  var id = $$props.id;
  /*export let user;
  export let match;
  export let isMatchEnded;
  export let countDown;
  
  export let userPlayer;
  export let players;*/

  var user;
  var match;
  var isMatchEnded;
  var countDown;
  var userPlayer;
  var players;
  /*const data = {
     players: [
         {
             steamId: "76561198860469702",
             brawlhallaId: 13465463,
             username: "WeAreNoobs65",
             wins: 0,
             gamesPlayed: 0,
             legends: "artemis",
             "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
         },
         {
             steamId: "76561198860469701",
             brawlhallaId: 13465463,
             username: "Ghom",
             wins: 0,
             gamesPlayed: 0,
             legends: "wu-shang",
             "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
         },
         {
             steamId: "76561198860469700",
             brawlhallaId: 13465463,
             username: "Felons",
             wins: 0,
             gamesPlayed: 0,
             legends: "petra",
             "avatarURL": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ef/ef5ba04474789d724a8f24fc4599f38ff435b05f_full.jpg"
         },
     ],
     winners: [
         {
             steamId: "76561198860469700",
             coinsEarned: 4000,
             multiplier: "x10"
         },
         {
             steamId: "76561198860469701",
             coinsEarned: 2000,
             multiplier: "x5"
         },
         {
             steamId: "76561198860469702",
             coinsEarned: 2000,
             multiplier: "x10"
         },
     ]
  };*/

  var error;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var unsub, d, endsIn;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            unsub = counter.subscribe(function (value) {
              user = value.content;
            });
            unsub();
            user = user.steam;
            _context.prev = 3;
            _context.t0 = $$invalidate;
            _context.next = 7;
            return callApi("get", "/getMatch/".concat(id));

          case 7:
            _context.t1 = match = _context.sent;
            (0, _context.t0)(0, _context.t1);
            $$invalidate(1, isMatchEnded = match.finished);
            console.log("noobz"); //Start the countdown

            filterUsers();
            d = new Date(userPlayer.joinDate);
            endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);
            startTimer(endsIn);
            counter.set({
              "refresh": true
            });
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t2 = _context["catch"](3);

            if (_context.t2.response) {
              if (_context.t2.response.status === 400 && _context.t2.response.data.includes("Play at least one ranked")) {
                $$invalidate(5, error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)");
              } else if (_context.t2.response.status === 400 && _context.t2.response.data.includes("Play at least one")) {
                $$invalidate(5, error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)");
              }
            }

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 18]]);
  })));

  var filterUsers = function filterUsers() {
    //Find user's object
    $$invalidate(3, userPlayer = match.players.find(function (p) {
      return p.steamId === parseInt(user.id);
    })); //Delete user's object from array.

    $$invalidate(4, players = _toConsumableArray(match.players));
    players.splice(match.players.findIndex(function (p) {
      return p.steamId === parseInt(user.id);
    }), 1);
  }; //Function that starts a timer with a date, and refreshes it every second


  function startTimer(duration) {
    var timer = duration,
        hours,
        minutes,
        seconds;
    setInterval(function () {
      seconds = Math.floor(timer % 60);
      minutes = Math.floor(timer / 60 % 60);
      hours = Math.floor(timer / (60 * 60));
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      $$invalidate(2, countDown = hours + ":" + minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  } //Function that handles the refresh button on click event


  var isRefreshingStats = false;

  var handleRefresh = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
      var winNb;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              $$invalidate(6, isRefreshingStats = true);
              winNb = userPlayer.gamesPlayed;
              _context2.t0 = $$invalidate;
              _context2.next = 5;
              return callApi("get", "/getMatch/".concat(id));

            case 5:
              _context2.t1 = match = _context2.sent;
              (0, _context2.t0)(0, _context2.t1);
              filterUsers();

              if (userPlayer.gamesPlayed !== winNb) {
                counter.set({
                  "refresh": true
                });
              } else if (match.finished && isMatchEnded === false) {
                $$invalidate(1, isMatchEnded = true);
                counter.set({
                  "refresh": true
                });
              }

              console.log(userPlayer);
              $$invalidate(6, isRefreshingStats = false);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleRefresh() {
      return _ref5.apply(this, arguments);
    };
  }();

  var handleQuit = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("quit");
              _context3.next = 3;
              return callApi("post", "/exitMatch");

            case 3:
              goto("/play");

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleQuit() {
      return _ref6.apply(this, arguments);
    };
  }();

  var writable_props = ["id"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<U5Bidu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bidu5D", $$slots, []);

  var click_handler = function click_handler() {
    return handleRefresh();
  };

  var click_handler_1 = function click_handler_1() {
    return handleQuit();
  };

  $$self.$$set = function ($$props) {
    if ("id" in $$props) $$invalidate(9, id = $$props.id);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      onMount: onMount,
      callApi: callApi,
      goto: goto,
      RefreshButton: RefreshButton,
      FfaEnd: FfaEnd,
      Loading: Loading,
      counter: counter,
      id: id,
      user: user,
      match: match,
      isMatchEnded: isMatchEnded,
      countDown: countDown,
      userPlayer: userPlayer,
      players: players,
      error: error,
      filterUsers: filterUsers,
      startTimer: startTimer,
      isRefreshingStats: isRefreshingStats,
      handleRefresh: handleRefresh,
      handleQuit: handleQuit
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("id" in $$props) $$invalidate(9, id = $$props.id);
    if ("user" in $$props) user = $$props.user;
    if ("match" in $$props) $$invalidate(0, match = $$props.match);
    if ("isMatchEnded" in $$props) $$invalidate(1, isMatchEnded = $$props.isMatchEnded);
    if ("countDown" in $$props) $$invalidate(2, countDown = $$props.countDown);
    if ("userPlayer" in $$props) $$invalidate(3, userPlayer = $$props.userPlayer);
    if ("players" in $$props) $$invalidate(4, players = $$props.players);
    if ("error" in $$props) $$invalidate(5, error = $$props.error);
    if ("isRefreshingStats" in $$props) $$invalidate(6, isRefreshingStats = $$props.isRefreshingStats);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [match, isMatchEnded, countDown, userPlayer, players, error, isRefreshingStats, handleRefresh, handleQuit, id, click_handler, click_handler_1];
}

var U5Bidu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bidu5D, _SvelteComponentDev);

  var _super = _createSuper$1(U5Bidu5D);

  function U5Bidu5D(options) {
    var _this;

    _classCallCheck(this, U5Bidu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      id: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bidu5D",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*id*/
    ctx[9] === undefined && !("id" in props)) {
      console_1.warn("<U5Bidu5D> was created without expected prop 'id'");
    }

    return _this;
  }

  _createClass(U5Bidu5D, [{
    key: "id",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bidu5D;
}(SvelteComponentDev);

export default U5Bidu5D;
export { preload };
