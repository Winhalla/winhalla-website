import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, A as _createClass, S as SvelteComponentDev, O as validate_each_argument, w as validate_slots, f as element, g as space, t as text, j as claim_element, m as children, l as claim_space, n as claim_text, k as detach_dev, o as attr_dev, p as add_location, J as toggle_class, u as insert_dev, r as append_dev, v as noop, T as empty$2, R as destroy_each, C as _slicedToArray, a7 as _typeof, a3 as _toConsumableArray, a8 as createCommonjsModule, a9 as _get, y as _asyncToGenerator, z as regenerator, B as globals, q as query_selector_all, a1 as transition_out, a4 as check_outros, a0 as transition_in, D as onMount, F as callApi, H as goto, E as counter, x as apiUrl, a5 as group_outros, I as set_data_dev, Y as create_component, Z as claim_component, $ as mount_component, a2 as destroy_component, L as listen_dev } from './client.ddb4686b.js';
import { R as RefreshButton } from './RefreshButton.042f804c.js';
import { L as Loading } from './Loading.b4f3c85d.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\components\\FfaEnd.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[0] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
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
      add_location(img, file, 103, 28, 2513);
      attr_dev(p0, "class", "player-name text-4xl svelte-yr78kx");
      add_location(p0, file, 108, 28, 2739);
      attr_dev(b, "class", "svelte-yr78kx");
      add_location(b, file, 111, 47, 2962);
      add_location(p1, file, 110, 32, 2910);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-yr78kx");
      add_location(div0, file, 109, 28, 2822);
      attr_dev(div1, "class", "ffa-player card user svelte-yr78kx");
      add_location(div1, file, 102, 24, 2449);
      add_location(div2, file, 101, 20, 2418);
      toggle_class(div3, "lg:ml-10",
      /*i*/
      ctx[4] > 0);
      add_location(div3, file, 100, 16, 2369);
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

      each_1_anchor = empty$2();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty$2();
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
      add_location(img, file, 126, 32, 3521);
      attr_dev(p0, "class", "player-name text-4xl svelte-yr78kx");
      add_location(p0, file, 131, 32, 3763);
      attr_dev(b, "class", "svelte-yr78kx");
      add_location(b, file, 134, 51, 3998);
      add_location(p1, file, 133, 36, 3942);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-yr78kx");
      add_location(div0, file, 132, 32, 3850);
      attr_dev(div1, "class", "ffa-player card user svelte-yr78kx");
      add_location(div1, file, 125, 28, 3453);
      add_location(div2, file, 124, 24, 3418);
      attr_dev(div3, "class", "mt-10 lg:ml-10");
      add_location(div3, file, 123, 20, 3364);
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

      each_1_anchor = empty$2();
    },
    l: function claim(nodes) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nodes);
      }

      each_1_anchor = empty$2();
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
      add_location(img, file, 150, 32, 4611);
      attr_dev(p0, "class", "player-name text-4xl svelte-yr78kx");
      add_location(p0, file, 155, 32, 4853);
      attr_dev(b, "class", "svelte-yr78kx");
      add_location(b, file, 158, 51, 5088);
      add_location(p1, file, 157, 36, 5032);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-yr78kx");
      add_location(div0, file, 156, 32, 4940);
      attr_dev(div1, "class", "ffa-player card user svelte-yr78kx");
      add_location(div1, file, 149, 28, 4543);
      add_location(div2, file, 148, 24, 4508);
      attr_dev(div3, "class", "mt-10 lg:mt-20 lg:ml-10");
      add_location(div3, file, 147, 20, 4445);
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
      attr_dev(b0, "class", "font-normal svelte-yr78kx");
      add_location(b0, file, 198, 44, 6852);
      attr_dev(td0, "class", "px-6 py-2");
      add_location(td0, file, 197, 40, 6784);
      attr_dev(img, "class", "block w-10 h-10 rounded-full");
      if (img.src !== (img_src_value =
      /*winner*/
      ctx[5].avatarURL)) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*winner*/
      ctx[5].legends);
      add_location(img, file, 201, 44, 7059);
      attr_dev(p, "class", "pl-2");
      add_location(p, file, 203, 44, 7241);
      attr_dev(td1, "class", "flex items-center px-6 py-2");
      add_location(td1, file, 200, 40, 6973);
      attr_dev(b1, "class", "text-primary font-normal svelte-yr78kx");
      add_location(b1, file, 206, 44, 7435);
      attr_dev(td2, "class", "px-6 py-2");
      add_location(td2, file, 205, 40, 7367);
      attr_dev(td3, "class", "px-6 py-2");
      add_location(td3, file, 208, 40, 7579);
      attr_dev(td4, "class", "px-6 py-2");
      add_location(td4, file, 211, 40, 7756);
      add_location(tr, file, 196, 36, 6738);
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
      if_block_anchor = empty$2();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty$2();
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

      each_1_anchor = empty$2();
    },
    l: function claim(nodes) {
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(nodes);
      }

      each_1_anchor = empty$2();
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
      add_location(h1, file, 90, 12, 2065);
      attr_dev(div0, "class", "mode-timer lg:flex items-end");
      add_location(div0, file, 89, 8, 2009);
      attr_dev(div1, "class", "pl-7 lg:pl-24 pt-8 lg:pt-12");
      add_location(div1, file, 88, 4, 1958);
      attr_dev(div2, "class", "flex flex-col items-center lg:flex-row");
      add_location(div2, file, 96, 8, 2224);
      attr_dev(td0, "class", "px-6 py-3");
      add_location(td0, file, 173, 28, 5666);
      attr_dev(td1, "class", "px-6 py-3");
      add_location(td1, file, 176, 28, 5791);
      attr_dev(td2, "class", "px-6 py-3");
      add_location(td2, file, 179, 28, 5918);
      attr_dev(td3, "class", "px-6 py-3");
      add_location(td3, file, 182, 28, 6043);
      attr_dev(td4, "class", "px-6 py-3");
      add_location(td4, file, 185, 28, 6170);
      add_location(tr, file, 172, 24, 5632);
      attr_dev(thead, "class", "bg-primary ");
      add_location(thead, file, 171, 24, 5579);
      attr_dev(tbody, "class", "divide-y-4 divide-background text-l");
      add_location(tbody, file, 190, 24, 6362);
      attr_dev(table, "class", "card px-4 overflow-hidden mt-10 lg:mt-20");
      add_location(table, file, 170, 20, 5497);
      add_location(div3, file, 169, 16, 5470);
      attr_dev(div4, "class", "overflow-x-scroll lg:overflow-auto pl-6 lg:pl-0 pb-4 lg:pb-8 ");
      add_location(div4, file, 168, 12, 5377);
      add_location(div5, file, 167, 8, 5358);
      attr_dev(div6, "class", "flex flex-col lg:items-center mt-8 lg:mt-0 relative lg:ml-24");
      add_location(div6, file, 94, 4, 2138);
      attr_dev(div7, "class", "");
      add_location(div7, file, 87, 0, 1938);
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("FfaEnd", slots, []);
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

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

var parseuri = function parseuri(str) {
  var src = str,
      b = str.indexOf('['),
      e = str.indexOf(']');

  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
  }

  var m = re.exec(str || ''),
      uri = {},
      i = 14;

  while (i--) {
    uri[parts[i]] = m[i] || '';
  }

  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }

  uri.pathNames = pathNames(uri, uri['path']);
  uri.queryKey = queryKey(uri, uri['query']);
  return uri;
};

function pathNames(obj, path) {
  var regx = /\/{2,9}/g,
      names = path.replace(regx, "/").split("/");

  if (path.substr(0, 1) == '/' || path.length === 0) {
    names.splice(0, 1);
  }

  if (path.substr(path.length - 1, 1) == '/') {
    names.splice(names.length - 1, 1);
  }

  return names;
}

function queryKey(uri, query) {
  var data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function ms(val, options) {
  options = options || {};

  var type = _typeof(val);

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = ms;
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
      return '-' + namespace;
    }))).join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

var common = setup;

var browser = createCommonjsModule(function (module, exports) {
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
      return true;
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if (match === '%%') {
        return;
      }

      index++;

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    var _console;

    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces);
      } else {
        exports.storage.removeItem('debug');
      }
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.getItem('debug');
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */


  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage;
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };
});

var url_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.url = void 0;
  var debug = browser("socket.io-client:url");
  /**
   * URL parser.
   *
   * @param uri - url
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */

  function url(uri, loc) {
    var obj = uri; // default to window.location

    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        debug("protocol-less url %s", uri);

        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      } // parse


      debug("parse %s", uri);
      obj = parseuri(uri);
    } // make sure we treat `localhost:80` and `localhost` equally


    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }

    obj.path = obj.path || "/";
    var ipv6 = obj.host.indexOf(":") !== -1;
    var host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

    obj.id = obj.protocol + "://" + host + ":" + obj.port; // define href

    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  exports.url = url;
});

var hasCors = createCommonjsModule(function (module) {
  /**
   * Module exports.
   *
   * Logic borrowed from Modernizr:
   *
   *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
   */
  try {
    module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    module.exports = false;
  }
});

var globalThis_browser = function () {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
}();

var xmlhttprequest = function xmlhttprequest(opts) {
  var xdomain = opts.xdomain; // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

  var xscheme = opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217

  var enablesXDR = opts.enablesXDR; // XMLHttpRequest can be disabled on IE

  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
      return new XMLHttpRequest();
    }
  } catch (e) {} // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example


  try {
    if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new globalThis_browser[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
  }
};

var PACKET_TYPES = Object.create(null); // no Map = no polyfill

PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(function (key) {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = {
  type: "error",
  data: "parser error"
};
var commons = {
  PACKET_TYPES: PACKET_TYPES,
  PACKET_TYPES_REVERSE: PACKET_TYPES_REVERSE,
  ERROR_PACKET: ERROR_PACKET
};

var PACKET_TYPES$1 = commons.PACKET_TYPES;
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

var isView = function isView(obj) {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};

var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
  var type = _ref.type,
      data = _ref.data;

  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data instanceof ArrayBuffer ? data : data.buffer);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  } // plain string


  return callback(PACKET_TYPES$1[type] + (data || ""));
};

var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
  var fileReader = new FileReader();

  fileReader.onload = function () {
    var content = fileReader.result.split(",")[1];
    callback("b" + content);
  };

  return fileReader.readAsDataURL(data);
};

var encodePacket_browser = encodePacket;

var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function (chars) {

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;

        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i + 1]);
        encoded3 = chars.indexOf(base64[i + 2]);
        encoded4 = chars.indexOf(base64[i + 3]);
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }

      return arraybuffer;
    };
  })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
});

var PACKET_TYPES_REVERSE$1 = commons.PACKET_TYPES_REVERSE,
    ERROR_PACKET$1 = commons.ERROR_PACKET;
var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
var base64decoder;

if (withNativeArrayBuffer$1) {
  base64decoder = base64Arraybuffer;
}

var decodePacket = function decodePacket(encodedPacket, binaryType) {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }

  var type = encodedPacket.charAt(0);

  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }

  var packetType = PACKET_TYPES_REVERSE$1[type];

  if (!packetType) {
    return ERROR_PACKET$1;
  }

  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE$1[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE$1[type]
  };
};

var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
  if (base64decoder) {
    var decoded = base64decoder.decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return {
      base64: true,
      data: data
    }; // fallback for old browsers
  }
};

var mapBinary = function mapBinary(data, binaryType) {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;

    case "arraybuffer":
    default:
      return data;
    // assuming the data is already an ArrayBuffer
  }
};

var decodePacket_browser = decodePacket;

var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

var encodePayload = function encodePayload(packets, callback) {
  // some packets may be added to the array while encoding, so the initial length must be saved
  var length = packets.length;
  var encodedPackets = new Array(length);
  var count = 0;
  packets.forEach(function (packet, i) {
    // force base64 encoding for binary packets
    encodePacket_browser(packet, false, function (encodedPacket) {
      encodedPackets[i] = encodedPacket;

      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

var decodePayload = function decodePayload(encodedPayload, binaryType) {
  var encodedPackets = encodedPayload.split(SEPARATOR);
  var packets = [];

  for (var i = 0; i < encodedPackets.length; i++) {
    var decodedPacket = decodePacket_browser(encodedPackets[i], binaryType);
    packets.push(decodedPacket);

    if (decodedPacket.type === "error") {
      break;
    }
  }

  return packets;
};

var lib = {
  protocol: 4,
  encodePacket: encodePacket_browser,
  encodePayload: encodePayload,
  decodePacket: decodePacket_browser,
  decodePayload: decodePayload
};

var componentEmitter = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */
  {
    module.exports = Emitter;
  }
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */


  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }

    return obj;
  }
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


    var cb;

    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];

      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    } // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.


    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);

      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */


  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Transport = /*#__PURE__*/function (_Emitter) {
  _inherits(Transport, _Emitter);

  var _super = _createSuper$1(Transport);

  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */
  function Transport(opts) {
    var _this;

    _classCallCheck(this, Transport);

    _this = _super.call(this);
    _this.opts = opts;
    _this.query = opts.query;
    _this.readyState = "";
    _this.socket = opts.socket;
    return _this;
  }
  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */


  _createClass(Transport, [{
    key: "onError",
    value: function onError(msg, desc) {
      var err = new Error(msg);
      err.type = "TransportError";
      err.description = desc;
      this.emit("error", err);
      return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */

  }, {
    key: "open",
    value: function open() {
      if ("closed" === this.readyState || "" === this.readyState) {
        this.readyState = "opening";
        this.doOpen();
      }

      return this;
    }
    /**
     * Closes the transport.
     *
     * @api private
     */

  }, {
    key: "close",
    value: function close() {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.doClose();
        this.onClose();
      }

      return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api private
     */

  }, {
    key: "send",
    value: function send(packets) {
      if ("open" === this.readyState) {
        this.write(packets);
      } else {
        throw new Error("Transport not open");
      }
    }
    /**
     * Called upon open
     *
     * @api private
     */

  }, {
    key: "onOpen",
    value: function onOpen() {
      this.readyState = "open";
      this.writable = true;
      this.emit("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api private
     */

  }, {
    key: "onData",
    value: function onData(data) {
      var packet = lib.decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     */

  }, {
    key: "onPacket",
    value: function onPacket(packet) {
      this.emit("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api private
     */

  }, {
    key: "onClose",
    value: function onClose() {
      this.readyState = "closed";
      this.emit("close");
    }
  }]);

  return Transport;
}(componentEmitter);

var transport = Transport;

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
var encode = function encode(obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */


var decode = function decode(qs) {
  var qry = {};
  var pairs = qs.split('&');

  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return qry;
};

var parseqs = {
  encode: encode,
  decode: decode
};

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */

function encode$1(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */


function decode$1(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */


function yeast() {
  var now = encode$1(+new Date());
  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode$1(seed++);
} //
// Map each character to its index.
//


for (; i < length; i++) {
  map[alphabet[i]] = i;
} //
// Expose the `yeast`, `encode` and `decode` functions.
//


yeast.encode = encode$1;
yeast.decode = decode$1;
var yeast_1 = yeast;

/**
 * Helpers.
 */
var s$1 = 1000;
var m$1 = s$1 * 60;
var h$1 = m$1 * 60;
var d$1 = h$1 * 24;
var w$1 = d$1 * 7;
var y$1 = d$1 * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms$1 = function ms(val, options) {
  options = options || {};

  var type = _typeof(val);

  if (type === 'string' && val.length > 0) {
    return parse$1(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong$1(val) : fmtShort$1(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse$1(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y$1;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w$1;

    case 'days':
    case 'day':
    case 'd':
      return n * d$1;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h$1;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m$1;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s$1;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort$1(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d$1) {
    return Math.round(ms / d$1) + 'd';
  }

  if (msAbs >= h$1) {
    return Math.round(ms / h$1) + 'h';
  }

  if (msAbs >= m$1) {
    return Math.round(ms / m$1) + 'm';
  }

  if (msAbs >= s$1) {
    return Math.round(ms / s$1) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong$1(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d$1) {
    return plural$1(ms, msAbs, d$1, 'day');
  }

  if (msAbs >= h$1) {
    return plural$1(ms, msAbs, h$1, 'hour');
  }

  if (msAbs >= m$1) {
    return plural$1(ms, msAbs, m$1, 'minute');
  }

  if (msAbs >= s$1) {
    return plural$1(ms, msAbs, s$1, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural$1(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup$1(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = ms$1;
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
      return '-' + namespace;
    }))).join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

var common$1 = setup$1;

var browser$1 = createCommonjsModule(function (module, exports) {
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
      return true;
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if (match === '%%') {
        return;
      }

      index++;

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    var _console;

    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces);
      } else {
        exports.storage.removeItem('debug');
      }
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.getItem('debug');
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */


  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage;
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common$1(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };
});

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var debug = browser$1("engine.io-client:polling");

var Polling = /*#__PURE__*/function (_Transport) {
  _inherits(Polling, _Transport);

  var _super = _createSuper$2(Polling);

  function Polling() {
    _classCallCheck(this, Polling);

    return _super.apply(this, arguments);
  }

  _createClass(Polling, [{
    key: "doOpen",

    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    value: function doOpen() {
      this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */

  }, {
    key: "pause",
    value: function pause(onPause) {
      var self = this;
      this.readyState = "pausing";

      function pause() {
        debug("paused");
        self.readyState = "paused";
        onPause();
      }

      if (this.polling || !this.writable) {
        var total = 0;

        if (this.polling) {
          debug("we are currently polling - waiting to pause");
          total++;
          this.once("pollComplete", function () {
            debug("pre-pause polling complete");
            --total || pause();
          });
        }

        if (!this.writable) {
          debug("we are currently writing - waiting to pause");
          total++;
          this.once("drain", function () {
            debug("pre-pause writing complete");
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */

  }, {
    key: "poll",
    value: function poll() {
      debug("polling");
      this.polling = true;
      this.doPoll();
      this.emit("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */

  }, {
    key: "onData",
    value: function onData(data) {
      var self = this;
      debug("polling got data %s", data);

      var callback = function callback(packet, index, total) {
        // if its the first message we consider the transport open
        if ("opening" === self.readyState && packet.type === "open") {
          self.onOpen();
        } // if its a close packet, we close the ongoing requests


        if ("close" === packet.type) {
          self.onClose();
          return false;
        } // otherwise bypass onData and handle the message


        self.onPacket(packet);
      }; // decode payload


      lib.decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

      if ("closed" !== this.readyState) {
        // if we got data we're not polling
        this.polling = false;
        this.emit("pollComplete");

        if ("open" === this.readyState) {
          this.poll();
        } else {
          debug('ignoring poll - transport state "%s"', this.readyState);
        }
      }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */

  }, {
    key: "doClose",
    value: function doClose() {
      var self = this;

      function close() {
        debug("writing close packet");
        self.write([{
          type: "close"
        }]);
      }

      if ("open" === this.readyState) {
        debug("transport open - closing");
        close();
      } else {
        // in case we're trying to close while
        // handshaking is in progress (GH-164)
        debug("transport not open - deferring close");
        this.once("open", close);
      }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */

  }, {
    key: "write",
    value: function write(packets) {
      var _this = this;

      this.writable = false;
      lib.encodePayload(packets, function (data) {
        _this.doWrite(data, function () {
          _this.writable = true;

          _this.emit("drain");
        });
      });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */

  }, {
    key: "uri",
    value: function uri() {
      var query = this.query || {};
      var schema = this.opts.secure ? "https" : "http";
      var port = ""; // cache busting is forced

      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast_1();
      }

      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }

      query = parseqs.encode(query); // avoid port if default for schema

      if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      } // prepend ? to query


      if (query.length) {
        query = "?" + query;
      }

      var ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
    }
  }, {
    key: "name",

    /**
     * Transport name.
     */
    get: function get() {
      return "polling";
    }
  }]);

  return Polling;
}(transport);

var polling = Polling;

var pick = function pick(obj) {
  for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    attr[_key - 1] = arguments[_key];
  }

  return attr.reduce(function (acc, k) {
    acc[k] = obj[k];
    return acc;
  }, {});
};

var util = {
  pick: pick
};

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/* global attachEvent */

var pick$1 = util.pick;
var debug$1 = browser$1("engine.io-client:polling-xhr");
/**
 * Empty function
 */

function empty() {}

var hasXHR2 = function () {
  var xhr = new xmlhttprequest({
    xdomain: false
  });
  return null != xhr.responseType;
}();

var XHR = /*#__PURE__*/function (_Polling) {
  _inherits(XHR, _Polling);

  var _super = _createSuper$3(XHR);

  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */
  function XHR(opts) {
    var _this;

    _classCallCheck(this, XHR);

    _this = _super.call(this, opts);

    if (typeof location !== "undefined") {
      var isSSL = "https:" === location.protocol;
      var port = location.port; // some user agents have empty `location.port`

      if (!port) {
        port = isSSL ? 443 : 80;
      }

      _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      _this.xs = opts.secure !== isSSL;
    }
    /**
     * XHR supports binary
     */


    var forceBase64 = opts && opts.forceBase64;
    _this.supportsBinary = hasXHR2 && !forceBase64;
    return _this;
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */


  _createClass(XHR, [{
    key: "request",
    value: function request() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(opts, {
        xd: this.xd,
        xs: this.xs
      }, this.opts);
      return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */

  }, {
    key: "doWrite",
    value: function doWrite(data, fn) {
      var req = this.request({
        method: "POST",
        data: data
      });
      var self = this;
      req.on("success", fn);
      req.on("error", function (err) {
        self.onError("xhr post error", err);
      });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */

  }, {
    key: "doPoll",
    value: function doPoll() {
      debug$1("xhr poll");
      var req = this.request();
      var self = this;
      req.on("data", function (data) {
        self.onData(data);
      });
      req.on("error", function (err) {
        self.onError("xhr poll error", err);
      });
      this.pollXhr = req;
    }
  }]);

  return XHR;
}(polling);

var Request = /*#__PURE__*/function (_Emitter) {
  _inherits(Request, _Emitter);

  var _super2 = _createSuper$3(Request);

  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */
  function Request(uri, opts) {
    var _this2;

    _classCallCheck(this, Request);

    _this2 = _super2.call(this);
    _this2.opts = opts;
    _this2.method = opts.method || "GET";
    _this2.uri = uri;
    _this2.async = false !== opts.async;
    _this2.data = undefined !== opts.data ? opts.data : null;

    _this2.create();

    return _this2;
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */


  _createClass(Request, [{
    key: "create",
    value: function create() {
      var opts = pick$1(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized");
      opts.xdomain = !!this.opts.xd;
      opts.xscheme = !!this.opts.xs;
      var xhr = this.xhr = new xmlhttprequest(opts);
      var self = this;

      try {
        debug$1("xhr open %s: %s", this.method, this.uri);
        xhr.open(this.method, this.uri, this.async);

        try {
          if (this.opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

            for (var i in this.opts.extraHeaders) {
              if (this.opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
              }
            }
          }
        } catch (e) {}

        if ("POST" === this.method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {}
        }

        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {} // ie6 check


        if ("withCredentials" in xhr) {
          xhr.withCredentials = this.opts.withCredentials;
        }

        if (this.opts.requestTimeout) {
          xhr.timeout = this.opts.requestTimeout;
        }

        if (this.hasXDR()) {
          xhr.onload = function () {
            self.onLoad();
          };

          xhr.onerror = function () {
            self.onError(xhr.responseText);
          };
        } else {
          xhr.onreadystatechange = function () {
            if (4 !== xhr.readyState) return;

            if (200 === xhr.status || 1223 === xhr.status) {
              self.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              setTimeout(function () {
                self.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };
        }

        debug$1("xhr data %s", this.data);
        xhr.send(this.data);
      } catch (e) {
        // Need to defer since .create() is called directly from the constructor
        // and thus the 'error' event can only be only bound *after* this exception
        // occurs.  Therefore, also, we cannot throw here at all.
        setTimeout(function () {
          self.onError(e);
        }, 0);
        return;
      }

      if (typeof document !== "undefined") {
        this.index = Request.requestsCount++;
        Request.requests[this.index] = this;
      }
    }
    /**
     * Called upon successful response.
     *
     * @api private
     */

  }, {
    key: "onSuccess",
    value: function onSuccess() {
      this.emit("success");
      this.cleanup();
    }
    /**
     * Called if we have data.
     *
     * @api private
     */

  }, {
    key: "onData",
    value: function onData(data) {
      this.emit("data", data);
      this.onSuccess();
    }
    /**
     * Called upon error.
     *
     * @api private
     */

  }, {
    key: "onError",
    value: function onError(err) {
      this.emit("error", err);
      this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */

  }, {
    key: "cleanup",
    value: function cleanup(fromError) {
      if ("undefined" === typeof this.xhr || null === this.xhr) {
        return;
      } // xmlhttprequest


      if (this.hasXDR()) {
        this.xhr.onload = this.xhr.onerror = empty;
      } else {
        this.xhr.onreadystatechange = empty;
      }

      if (fromError) {
        try {
          this.xhr.abort();
        } catch (e) {}
      }

      if (typeof document !== "undefined") {
        delete Request.requests[this.index];
      }

      this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */

  }, {
    key: "onLoad",
    value: function onLoad() {
      var data = this.xhr.responseText;

      if (data !== null) {
        this.onData(data);
      }
    }
    /**
     * Check if it has XDomainRequest.
     *
     * @api private
     */

  }, {
    key: "hasXDR",
    value: function hasXDR() {
      return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
    }
    /**
     * Aborts the request.
     *
     * @api public
     */

  }, {
    key: "abort",
    value: function abort() {
      this.cleanup();
    }
  }]);

  return Request;
}(componentEmitter);
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */


Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    var terminationEvent = "onpagehide" in globalThis_browser ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

var pollingXhr = XHR;
var Request_1 = Request;
pollingXhr.Request = Request_1;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;
/**
 * Global JSONP callbacks.
 */

var callbacks;
/**
 * Noop.
 */

function empty$1() {}

var JSONPPolling = /*#__PURE__*/function (_Polling) {
  _inherits(JSONPPolling, _Polling);

  var _super = _createSuper$4(JSONPPolling);

  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */
  function JSONPPolling(opts) {
    var _this;

    _classCallCheck(this, JSONPPolling);

    _this = _super.call(this, opts);
    _this.query = _this.query || {}; // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution

    if (!callbacks) {
      // we need to consider multiple engines in the same page
      callbacks = globalThis_browser.___eio = globalThis_browser.___eio || [];
    } // callback identifier


    _this.index = callbacks.length; // add callback to jsonp global

    var self = _assertThisInitialized(_this);

    callbacks.push(function (msg) {
      self.onData(msg);
    }); // append to query string

    _this.query.j = _this.index; // prevent spurious errors from being emitted when the window is unloaded

    if (typeof addEventListener === "function") {
      addEventListener("beforeunload", function () {
        if (self.script) self.script.onerror = empty$1;
      }, false);
    }

    return _this;
  }
  /**
   * JSONP only supports binary as base64 encoded strings
   */


  _createClass(JSONPPolling, [{
    key: "doClose",

    /**
     * Closes the socket.
     *
     * @api private
     */
    value: function doClose() {
      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }

      if (this.form) {
        this.form.parentNode.removeChild(this.form);
        this.form = null;
        this.iframe = null;
      }

      _get(_getPrototypeOf(JSONPPolling.prototype), "doClose", this).call(this);
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */

  }, {
    key: "doPoll",
    value: function doPoll() {
      var self = this;
      var script = document.createElement("script");

      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }

      script.async = true;
      script.src = this.uri();

      script.onerror = function (e) {
        self.onError("jsonp poll error", e);
      };

      var insertAt = document.getElementsByTagName("script")[0];

      if (insertAt) {
        insertAt.parentNode.insertBefore(script, insertAt);
      } else {
        (document.head || document.body).appendChild(script);
      }

      this.script = script;
      var isUAgecko = "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

      if (isUAgecko) {
        setTimeout(function () {
          var iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          document.body.removeChild(iframe);
        }, 100);
      }
    }
    /**
     * Writes with a hidden iframe.
     *
     * @param {String} data to send
     * @param {Function} called upon flush.
     * @api private
     */

  }, {
    key: "doWrite",
    value: function doWrite(data, fn) {
      var self = this;
      var iframe;

      if (!this.form) {
        var form = document.createElement("form");
        var area = document.createElement("textarea");
        var id = this.iframeId = "eio_iframe_" + this.index;
        form.className = "socketio";
        form.style.position = "absolute";
        form.style.top = "-1000px";
        form.style.left = "-1000px";
        form.target = id;
        form.method = "POST";
        form.setAttribute("accept-charset", "utf-8");
        area.name = "d";
        form.appendChild(area);
        document.body.appendChild(form);
        this.form = form;
        this.area = area;
      }

      this.form.action = this.uri();

      function complete() {
        initIframe();
        fn();
      }

      function initIframe() {
        if (self.iframe) {
          try {
            self.form.removeChild(self.iframe);
          } catch (e) {
            self.onError("jsonp polling iframe removal error", e);
          }
        }

        try {
          // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
          var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
          iframe = document.createElement(html);
        } catch (e) {
          iframe = document.createElement("iframe");
          iframe.name = self.iframeId;
          iframe.src = "javascript:0";
        }

        iframe.id = self.iframeId;
        self.form.appendChild(iframe);
        self.iframe = iframe;
      }

      initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
      // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side

      data = data.replace(rEscapedNewline, "\\\n");
      this.area.value = data.replace(rNewline, "\\n");

      try {
        this.form.submit();
      } catch (e) {}

      if (this.iframe.attachEvent) {
        this.iframe.onreadystatechange = function () {
          if (self.iframe.readyState === "complete") {
            complete();
          }
        };
      } else {
        this.iframe.onload = complete;
      }
    }
  }, {
    key: "supportsBinary",
    get: function get() {
      return false;
    }
  }]);

  return JSONPPolling;
}(polling);

var pollingJsonp = JSONPPolling;

var websocketConstructor_browser = {
  WebSocket: globalThis_browser.WebSocket || globalThis_browser.MozWebSocket,
  usingBrowserWebSocket: true,
  defaultBinaryType: "arraybuffer"
};

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var pick$2 = util.pick;
var WebSocket = websocketConstructor_browser.WebSocket,
    usingBrowserWebSocket = websocketConstructor_browser.usingBrowserWebSocket,
    defaultBinaryType = websocketConstructor_browser.defaultBinaryType;
var debug$2 = browser$1("engine.io-client:websocket"); // detect ReactNative environment

var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";

var WS = /*#__PURE__*/function (_Transport) {
  _inherits(WS, _Transport);

  var _super = _createSuper$5(WS);

  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */
  function WS(opts) {
    var _this;

    _classCallCheck(this, WS);

    _this = _super.call(this, opts);
    _this.supportsBinary = !opts.forceBase64;
    return _this;
  }
  /**
   * Transport name.
   *
   * @api public
   */


  _createClass(WS, [{
    key: "doOpen",

    /**
     * Opens socket.
     *
     * @api private
     */
    value: function doOpen() {
      if (!this.check()) {
        // let probe timeout
        return;
      }

      var uri = this.uri();
      var protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

      var opts = isReactNative ? {} : pick$2(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress");

      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }

      try {
        this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
      } catch (err) {
        return this.emit("error", err);
      }

      this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
      this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */

  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var self = this;

      this.ws.onopen = function () {
        self.onOpen();
      };

      this.ws.onclose = function () {
        self.onClose();
      };

      this.ws.onmessage = function (ev) {
        self.onData(ev.data);
      };

      this.ws.onerror = function (e) {
        self.onError("websocket error", e);
      };
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */

  }, {
    key: "write",
    value: function write(packets) {
      var self = this;
      this.writable = false; // encodePacket efficient as it uses WS framing
      // no need for encodePayload

      var total = packets.length;
      var i = 0;
      var l = total;

      for (; i < l; i++) {
        (function (packet) {
          lib.encodePacket(packet, self.supportsBinary, function (data) {
            // always create a new object (GH-437)
            var opts = {};
            // have a chance of informing us about it yet, in that case send will
            // throw an error


            try {
              if (usingBrowserWebSocket) {
                // TypeError is thrown when passing the second argument on Safari
                self.ws.send(data);
              }
            } catch (e) {
              debug$2("websocket closed before onclose event");
            }

            --total || done();
          });
        })(packets[i]);
      }

      function done() {
        self.emit("flush"); // fake drain
        // defer to next tick to allow Socket to clear writeBuffer

        setTimeout(function () {
          self.writable = true;
          self.emit("drain");
        }, 0);
      }
    }
    /**
     * Called upon close
     *
     * @api private
     */

  }, {
    key: "onClose",
    value: function onClose() {
      transport.prototype.onClose.call(this);
    }
    /**
     * Closes socket.
     *
     * @api private
     */

  }, {
    key: "doClose",
    value: function doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.close();
      }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */

  }, {
    key: "uri",
    value: function uri() {
      var query = this.query || {};
      var schema = this.opts.secure ? "wss" : "ws";
      var port = ""; // avoid port if default for schema

      if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      } // append timestamp to URI


      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast_1();
      } // communicate binary support capabilities


      if (!this.supportsBinary) {
        query.b64 = 1;
      }

      query = parseqs.encode(query); // prepend ? to query

      if (query.length) {
        query = "?" + query;
      }

      var ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */

  }, {
    key: "check",
    value: function check() {
      return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
    }
  }, {
    key: "name",
    get: function get() {
      return "websocket";
    }
  }]);

  return WS;
}(transport);

var websocket = WS;

var polling_1 = polling$1;
var websocket_1 = websocket;
/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling$1(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (typeof location !== "undefined") {
    var isSSL = "https:" === location.protocol;
    var port = location.port; // some user agents have empty `location.port`

    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new xmlhttprequest(opts);

  if ("open" in xhr && !opts.forceJSONP) {
    return new pollingXhr(opts);
  } else {
    if (!jsonp) throw new Error("JSONP disabled");
    return new pollingJsonp(opts);
  }
}

var transports = {
  polling: polling_1,
  websocket: websocket_1
};

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var debug$3 = browser$1("engine.io-client:socket");

var Socket = /*#__PURE__*/function (_Emitter) {
  _inherits(Socket, _Emitter);

  var _super = _createSuper$6(Socket);

  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */
  function Socket(uri) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Socket);

    _this = _super.call(this);

    if (uri && "object" === _typeof(uri)) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = _this.secure ? "443" : "80";
    }

    _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? 443 : 80);
    _this.transports = opts.transports || ["polling", "websocket"];
    _this.readyState = "";
    _this.writeBuffer = [];
    _this.prevBufferLen = 0;
    _this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      jsonp: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {}
    }, opts);
    _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";

    if (typeof _this.opts.query === "string") {
      _this.opts.query = parseqs.decode(_this.opts.query);
    } // set on handshake


    _this.id = null;
    _this.upgrades = null;
    _this.pingInterval = null;
    _this.pingTimeout = null; // set on heartbeat

    _this.pingTimeoutTimer = null;

    _this.open();

    return _this;
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */


  _createClass(Socket, [{
    key: "createTransport",
    value: function createTransport(name) {
      debug$3('creating transport "%s"', name);
      var query = clone(this.opts.query); // append engine.io protocol identifier

      query.EIO = lib.protocol; // transport name

      query.transport = name; // session id if we already have one

      if (this.id) query.sid = this.id;
      var opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
        query: query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      });
      debug$3("options: %j", opts);
      return new transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */

  }, {
    key: "open",
    value: function open() {
      var transport;

      if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
        transport = "websocket";
      } else if (0 === this.transports.length) {
        // Emit error on next tick so it can be listened to
        var self = this;
        setTimeout(function () {
          self.emit("error", "No transports available");
        }, 0);
        return;
      } else {
        transport = this.transports[0];
      }

      this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

      try {
        transport = this.createTransport(transport);
      } catch (e) {
        debug$3("error while creating transport: %s", e);
        this.transports.shift();
        this.open();
        return;
      }

      transport.open();
      this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */

  }, {
    key: "setTransport",
    value: function setTransport(transport) {
      debug$3("setting transport %s", transport.name);
      var self = this;

      if (this.transport) {
        debug$3("clearing existing transport %s", this.transport.name);
        this.transport.removeAllListeners();
      } // set up transport


      this.transport = transport; // set up transport listeners

      transport.on("drain", function () {
        self.onDrain();
      }).on("packet", function (packet) {
        self.onPacket(packet);
      }).on("error", function (e) {
        self.onError(e);
      }).on("close", function () {
        self.onClose("transport close");
      });
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */

  }, {
    key: "probe",
    value: function probe(name) {
      debug$3('probing transport "%s"', name);
      var transport = this.createTransport(name, {
        probe: 1
      });
      var failed = false;
      var self = this;
      Socket.priorWebsocketSuccess = false;

      function onTransportOpen() {
        if (self.onlyBinaryUpgrades) {
          var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
          failed = failed || upgradeLosesBinary;
        }

        if (failed) return;
        debug$3('probe transport "%s" opened', name);
        transport.send([{
          type: "ping",
          data: "probe"
        }]);
        transport.once("packet", function (msg) {
          if (failed) return;

          if ("pong" === msg.type && "probe" === msg.data) {
            debug$3('probe transport "%s" pong', name);
            self.upgrading = true;
            self.emit("upgrading", transport);
            if (!transport) return;
            Socket.priorWebsocketSuccess = "websocket" === transport.name;
            debug$3('pausing current transport "%s"', self.transport.name);
            self.transport.pause(function () {
              if (failed) return;
              if ("closed" === self.readyState) return;
              debug$3("changing transport and sending upgrade packet");
              cleanup();
              self.setTransport(transport);
              transport.send([{
                type: "upgrade"
              }]);
              self.emit("upgrade", transport);
              transport = null;
              self.upgrading = false;
              self.flush();
            });
          } else {
            debug$3('probe transport "%s" failed', name);
            var err = new Error("probe error");
            err.transport = transport.name;
            self.emit("upgradeError", err);
          }
        });
      }

      function freezeTransport() {
        if (failed) return; // Any callback called by transport should be ignored since now

        failed = true;
        cleanup();
        transport.close();
        transport = null;
      } // Handle any error that happens while probing


      function onerror(err) {
        var error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        debug$3('probe transport "%s" failed because of error: %s', name, err);
        self.emit("upgradeError", error);
      }

      function onTransportClose() {
        onerror("transport closed");
      } // When the socket is closed while we're probing


      function onclose() {
        onerror("socket closed");
      } // When the socket is upgraded while we're probing


      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          debug$3('"%s" works - aborting "%s"', to.name, transport.name);
          freezeTransport();
        }
      } // Remove all listeners on the transport and on self


      function cleanup() {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        self.removeListener("close", onclose);
        self.removeListener("upgrading", onupgrade);
      }

      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api public
     */

  }, {
    key: "onOpen",
    value: function onOpen() {
      debug$3("socket open");
      this.readyState = "open";
      Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emit("open");
      this.flush(); // we check for `readyState` in case an `open`
      // listener already closed the socket

      if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
        debug$3("starting upgrade probes");
        var i = 0;
        var l = this.upgrades.length;

        for (; i < l; i++) {
          this.probe(this.upgrades[i]);
        }
      }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */

  }, {
    key: "onPacket",
    value: function onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        debug$3('socket receive: type "%s", data "%s"', packet.type, packet.data);
        this.emit("packet", packet); // Socket is live - any packet counts

        this.emit("heartbeat");

        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;

          case "ping":
            this.resetPingTimeout();
            this.sendPacket("pong");
            this.emit("pong");
            break;

          case "error":
            var err = new Error("server error");
            err.code = packet.data;
            this.onError(err);
            break;

          case "message":
            this.emit("data", packet.data);
            this.emit("message", packet.data);
            break;
        }
      } else {
        debug$3('packet received with socket readyState "%s"', this.readyState);
      }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} handshake obj
     * @api private
     */

  }, {
    key: "onHandshake",
    value: function onHandshake(data) {
      this.emit("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this.upgrades = this.filterUpgrades(data.upgrades);
      this.pingInterval = data.pingInterval;
      this.pingTimeout = data.pingTimeout;
      this.onOpen(); // In case open handler closes socket

      if ("closed" === this.readyState) return;
      this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */

  }, {
    key: "resetPingTimeout",
    value: function resetPingTimeout() {
      var _this2 = this;

      clearTimeout(this.pingTimeoutTimer);
      this.pingTimeoutTimer = setTimeout(function () {
        _this2.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout);
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */

  }, {
    key: "onDrain",
    value: function onDrain() {
      this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
      // for example, when upgrading, upgrade packet is sent over,
      // and a nonzero prevBufferLen could cause problems on `drain`

      this.prevBufferLen = 0;

      if (0 === this.writeBuffer.length) {
        this.emit("drain");
      } else {
        this.flush();
      }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */

  }, {
    key: "flush",
    value: function flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        debug$3("flushing %d packets in socket", this.writeBuffer.length);
        this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
        // splice writeBuffer and callbackBuffer on `drain`

        this.prevBufferLen = this.writeBuffer.length;
        this.emit("flush");
      }
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */

  }, {
    key: "write",
    value: function write(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
  }, {
    key: "send",
    value: function send(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */

  }, {
    key: "sendPacket",
    value: function sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = undefined;
      }

      if ("function" === typeof options) {
        fn = options;
        options = null;
      }

      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }

      options = options || {};
      options.compress = false !== options.compress;
      var packet = {
        type: type,
        data: data,
        options: options
      };
      this.emit("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn) this.once("flush", fn);
      this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api private
     */

  }, {
    key: "close",
    value: function close() {
      var self = this;

      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";

        if (this.writeBuffer.length) {
          this.once("drain", function () {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }

      function close() {
        self.onClose("forced close");
        debug$3("socket closing - telling transport to close");
        self.transport.close();
      }

      function cleanupAndClose() {
        self.removeListener("upgrade", cleanupAndClose);
        self.removeListener("upgradeError", cleanupAndClose);
        close();
      }

      function waitForUpgrade() {
        // wait for upgrade to finish since we can't send packets while pausing a transport
        self.once("upgrade", cleanupAndClose);
        self.once("upgradeError", cleanupAndClose);
      }

      return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */

  }, {
    key: "onError",
    value: function onError(err) {
      debug$3("socket error %j", err);
      Socket.priorWebsocketSuccess = false;
      this.emit("error", err);
      this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */

  }, {
    key: "onClose",
    value: function onClose(reason, desc) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        debug$3('socket close with reason: "%s"', reason);
        var self = this; // clear timers

        clearTimeout(this.pingIntervalTimer);
        clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport

        this.transport.removeAllListeners("close"); // ensure transport won't stay open

        this.transport.close(); // ignore further transport communication

        this.transport.removeAllListeners(); // set ready state

        this.readyState = "closed"; // clear session id

        this.id = null; // emit close event

        this.emit("close", reason, desc); // clean buffers after, so users can still
        // grab the buffers on `close` event

        self.writeBuffer = [];
        self.prevBufferLen = 0;
      }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */

  }, {
    key: "filterUpgrades",
    value: function filterUpgrades(upgrades) {
      var filteredUpgrades = [];
      var i = 0;
      var j = upgrades.length;

      for (; i < j; i++) {
        if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
      }

      return filteredUpgrades;
    }
  }]);

  return Socket;
}(componentEmitter);

Socket.priorWebsocketSuccess = false;
/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = lib.protocol; // this is an int

function clone(obj) {
  var o = {};

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }

  return o;
}

var socket = Socket;

var lib$1 = function lib(uri, opts) {
  return new socket(uri, opts);
};
/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */


var Socket_1 = socket;
var protocol = socket.protocol; // this is an int

var Transport$1 = transport;
var transports$1 = transports;
var parser = lib;
lib$1.Socket = Socket_1;
lib$1.protocol = protocol;
lib$1.Transport = Transport$1;
lib$1.transports = transports$1;
lib$1.parser = parser;

var isBinary_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hasBinary = exports.isBinary = void 0;
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";

  var isView = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };

  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */

  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }

  exports.isBinary = isBinary;

  function hasBinary(obj, toJSON) {
    if (!obj || _typeof(obj) !== "object") {
      return false;
    }

    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }

      return false;
    }

    if (isBinary(obj)) {
      return true;
    }

    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  exports.hasBinary = hasBinary;
});

var binary = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reconstructPacket = exports.deconstructPacket = void 0;
  /**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */

  function deconstructPacket(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'

    return {
      packet: pack,
      buffers: buffers
    };
  }

  exports.deconstructPacket = deconstructPacket;

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBinary_1.isBinary(data)) {
      var placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      var newData = new Array(data.length);

      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }

      return newData;
    } else if (_typeof(data) === "object" && !(data instanceof Date)) {
      var _newData = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          _newData[key] = _deconstructPacket(data[key], buffers);
        }
      }

      return _newData;
    }

    return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */


  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful

    return packet;
  }

  exports.reconstructPacket = reconstructPacket;

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }

    return data;
  }
});

/**
 * Helpers.
 */
var s$2 = 1000;
var m$2 = s$2 * 60;
var h$2 = m$2 * 60;
var d$2 = h$2 * 24;
var w$2 = d$2 * 7;
var y$2 = d$2 * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms$2 = function ms(val, options) {
  options = options || {};

  var type = _typeof(val);

  if (type === 'string' && val.length > 0) {
    return parse$2(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong$2(val) : fmtShort$2(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse$2(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y$2;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w$2;

    case 'days':
    case 'day':
    case 'd':
      return n * d$2;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h$2;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m$2;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s$2;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort$2(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d$2) {
    return Math.round(ms / d$2) + 'd';
  }

  if (msAbs >= h$2) {
    return Math.round(ms / h$2) + 'h';
  }

  if (msAbs >= m$2) {
    return Math.round(ms / m$2) + 'm';
  }

  if (msAbs >= s$2) {
    return Math.round(ms / s$2) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong$2(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d$2) {
    return plural$2(ms, msAbs, d$2, 'day');
  }

  if (msAbs >= h$2) {
    return plural$2(ms, msAbs, h$2, 'hour');
  }

  if (msAbs >= m$2) {
    return plural$2(ms, msAbs, m$2, 'minute');
  }

  if (msAbs >= s$2) {
    return plural$2(ms, msAbs, s$2, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural$2(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup$2(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = ms$2;
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
      return '-' + namespace;
    }))).join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

var common$2 = setup$2;

var browser$2 = createCommonjsModule(function (module, exports) {
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
      return true;
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if (match === '%%') {
        return;
      }

      index++;

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    var _console;

    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces);
      } else {
        exports.storage.removeItem('debug');
      }
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.getItem('debug');
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */


  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage;
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common$2(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };
});

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var dist = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
  var debug = browser$2("socket.io-parser");
  /**
   * Protocol version.
   *
   * @public
   */

  exports.protocol = 5;
  var PacketType;

  (function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType = exports.PacketType || (exports.PacketType = {}));
  /**
   * A socket.io Encoder instance
   */


  var Encoder = /*#__PURE__*/function () {
    function Encoder() {
      _classCallCheck(this, Encoder);
    }

    _createClass(Encoder, [{
      key: "encode",

      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      value: function encode(obj) {
        debug("encoding packet %j", obj);

        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (isBinary_1.hasBinary(obj)) {
            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
            return this.encodeAsBinary(obj);
          }
        }

        return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */

    }, {
      key: "encodeAsString",
      value: function encodeAsString(obj) {
        // first is type
        var str = "" + obj.type; // attachments if we have them

        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        } // if we have a namespace other than `/`
        // we append it followed by a comma `,`


        if (obj.nsp && "/" !== obj.nsp) {
          str += obj.nsp + ",";
        } // immediately followed by the id


        if (null != obj.id) {
          str += obj.id;
        } // json data


        if (null != obj.data) {
          str += JSON.stringify(obj.data);
        }

        debug("encoded %j as %s", obj, str);
        return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */

    }, {
      key: "encodeAsBinary",
      value: function encodeAsBinary(obj) {
        var deconstruction = binary.deconstructPacket(obj);
        var pack = this.encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list

        return buffers; // write all the buffers
      }
    }]);

    return Encoder;
  }();

  exports.Encoder = Encoder;
  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */

  var Decoder = /*#__PURE__*/function (_Emitter) {
    _inherits(Decoder, _Emitter);

    var _super = _createSuper$7(Decoder);

    function Decoder() {
      _classCallCheck(this, Decoder);

      return _super.call(this);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */


    _createClass(Decoder, [{
      key: "add",
      value: function add(obj) {
        var packet;

        if (typeof obj === "string") {
          packet = this.decodeString(obj);

          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            // binary packet's json
            this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

            if (packet.attachments === 0) {
              _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
            }
          } else {
            // non-binary full packet
            _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
          }
        } else if (isBinary_1.isBinary(obj) || obj.base64) {
          // raw binary data
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);

            if (packet) {
              // received final buffer
              this.reconstructor = null;

              _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */

    }, {
      key: "decodeString",
      value: function decodeString(str) {
        var i = 0; // look up type

        var p = {
          type: Number(str.charAt(0))
        };

        if (PacketType[p.type] === undefined) {
          throw new Error("unknown packet type " + p.type);
        } // look up attachments if type binary


        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          var start = i + 1;

          while (str.charAt(++i) !== "-" && i != str.length) {}

          var buf = str.substring(start, i);

          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }

          p.attachments = Number(buf);
        } // look up namespace (if any)


        if ("/" === str.charAt(i + 1)) {
          var _start = i + 1;

          while (++i) {
            var c = str.charAt(i);
            if ("," === c) break;
            if (i === str.length) break;
          }

          p.nsp = str.substring(_start, i);
        } else {
          p.nsp = "/";
        } // look up id


        var next = str.charAt(i + 1);

        if ("" !== next && Number(next) == next) {
          var _start2 = i + 1;

          while (++i) {
            var _c = str.charAt(i);

            if (null == _c || Number(_c) != _c) {
              --i;
              break;
            }

            if (i === str.length) break;
          }

          p.id = Number(str.substring(_start2, i + 1));
        } // look up json data


        if (str.charAt(++i)) {
          var payload = tryParse(str.substr(i));

          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }

        debug("decoded %s as %j", str, p);
        return p;
      }
    }, {
      key: "destroy",

      /**
       * Deallocates a parser's resources
       */
      value: function destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }
    }], [{
      key: "isPayloadValid",
      value: function isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return _typeof(payload) === "object";

          case PacketType.DISCONNECT:
            return payload === undefined;

          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || _typeof(payload) === "object";

          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && typeof payload[0] === "string";

          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
    }]);

    return Decoder;
  }(componentEmitter);

  exports.Decoder = Decoder;

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */


  var BinaryReconstructor = /*#__PURE__*/function () {
    function BinaryReconstructor(packet) {
      _classCallCheck(this, BinaryReconstructor);

      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */


    _createClass(BinaryReconstructor, [{
      key: "takeBinaryData",
      value: function takeBinaryData(binData) {
        this.buffers.push(binData);

        if (this.buffers.length === this.reconPack.attachments) {
          // done with buffer list
          var packet = binary.reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }

        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */

    }, {
      key: "finishedReconstruction",
      value: function finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    }]);

    return BinaryReconstructor;
  }();
});

var on_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.on = void 0;

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return {
      destroy: function destroy() {
        obj.off(ev, fn);
      }
    };
  }

  exports.on = on;
});

/**
 * Slice reference.
 */
var slice = [].slice;
/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

var componentBind = function componentBind(obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var socket$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Socket = void 0;
  var debug = browser("socket.io-client:socket");
  /**
   * Internal events.
   * These events can't be emitted by the user.
   */

  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });

  var Socket = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);

    var _super = _createSuper$8(Socket);

    /**
     * `Socket` constructor.
     *
     * @public
     */
    function Socket(io, nsp, opts) {
      var _this;

      _classCallCheck(this, Socket);

      _this = _super.call(this);
      _this.ids = 0;
      _this.acks = {};
      _this.receiveBuffer = [];
      _this.sendBuffer = [];
      _this.flags = {};
      _this.io = io;
      _this.nsp = nsp;
      _this.ids = 0;
      _this.acks = {};
      _this.receiveBuffer = [];
      _this.sendBuffer = [];
      _this.connected = false;
      _this.disconnected = true;
      _this.flags = {};

      if (opts && opts.auth) {
        _this.auth = opts.auth;
      }

      if (_this.io._autoConnect) _this.open();
      return _this;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */


    _createClass(Socket, [{
      key: "subEvents",
      value: function subEvents() {
        if (this.subs) return;
        var io = this.io;
        this.subs = [on_1.on(io, "open", componentBind(this, "onopen")), on_1.on(io, "packet", componentBind(this, "onpacket")), on_1.on(io, "close", componentBind(this, "onclose"))];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects
       */

    }, {
      key: "connect",

      /**
       * "Opens" the socket.
       *
       * @public
       */
      value: function connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open

        if ("open" === this.io._readyState) this.onopen();
        return this;
      }
      /**
       * Alias for connect()
       */

    }, {
      key: "open",
      value: function open() {
        return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * @return self
       * @public
       */

    }, {
      key: "send",
      value: function send() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      /**
       * Override `emit`.
       * If the event is in `events`, it's emitted normally.
       *
       * @param ev - event name
       * @return self
       * @public
       */

    }, {
      key: "emit",
      value: function emit(ev) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        args.unshift(ev);
        var packet = {
          type: dist.PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false; // event ack callback

        if ("function" === typeof args[args.length - 1]) {
          debug("emitting packet with ack id %d", this.ids);
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }

        var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        var discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);

        if (discardPacket) {
          debug("discard packet as the transport is not currently writable");
        } else if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }

        this.flags = {};
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "packet",
      value: function packet(_packet) {
        _packet.nsp = this.nsp;

        this.io._packet(_packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        var _this2 = this;

        debug("transport is open - connecting");

        if (typeof this.auth == "function") {
          this.auth(function (data) {
            _this2.packet({
              type: dist.PacketType.CONNECT,
              data: data
            });
          });
        } else {
          this.packet({
            type: dist.PacketType.CONNECT,
            data: this.auth
          });
        }
      }
      /**
       * Called upon engine `close`.
       *
       * @param reason
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;

        _get(_getPrototypeOf(Socket.prototype), "emit", this).call(this, "disconnect", reason);
      }
      /**
       * Called with socket packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onpacket",
      value: function onpacket(packet) {
        var sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;

        switch (packet.type) {
          case dist.PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              var id = packet.data.sid;
              this.onconnect(id);
            } else {
              _get(_getPrototypeOf(Socket.prototype), "emit", this).call(this, "connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
            }

            break;

          case dist.PacketType.EVENT:
            this.onevent(packet);
            break;

          case dist.PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;

          case dist.PacketType.ACK:
            this.onack(packet);
            break;

          case dist.PacketType.BINARY_ACK:
            this.onack(packet);
            break;

          case dist.PacketType.DISCONNECT:
            this.ondisconnect();
            break;

          case dist.PacketType.CONNECT_ERROR:
            var err = new Error(packet.data.message); // @ts-ignore

            err.data = packet.data.data;

            _get(_getPrototypeOf(Socket.prototype), "emit", this).call(this, "connect_error", err);

            break;
        }
      }
      /**
       * Called upon a server event.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onevent",
      value: function onevent(packet) {
        var args = packet.data || [];
        debug("emitting event %j", args);

        if (null != packet.id) {
          debug("attaching ack callback to event");
          args.push(this.ack(packet.id));
        }

        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          var listeners = this._anyListeners.slice();

          var _iterator = _createForOfIteratorHelper(listeners),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;
              listener.apply(this, args);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */

    }, {
      key: "ack",
      value: function ack(id) {
        var self = this;
        var sent = false;
        return function () {
          // prevent double callbacks
          if (sent) return;
          sent = true;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          debug("sending ack %j", args);
          self.packet({
            type: dist.PacketType.ACK,
            id: id,
            data: args
          });
        };
      }
      /**
       * Called upon a server acknowlegement.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onack",
      value: function onack(packet) {
        var ack = this.acks[packet.id];

        if ("function" === typeof ack) {
          debug("calling ack %s with %j", packet.id, packet.data);
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        } else {
          debug("bad ack %s", packet.id);
        }
      }
      /**
       * Called upon server connect.
       *
       * @private
       */

    }, {
      key: "onconnect",
      value: function onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;

        _get(_getPrototypeOf(Socket.prototype), "emit", this).call(this, "connect");

        this.emitBuffered();
      }
      /**
       * Emit buffered events (received and emitted).
       *
       * @private
       */

    }, {
      key: "emitBuffered",
      value: function emitBuffered() {
        var _this3 = this;

        this.receiveBuffer.forEach(function (args) {
          return _this3.emitEvent(args);
        });
        this.receiveBuffer = [];
        this.sendBuffer.forEach(function (packet) {
          return _this3.packet(packet);
        });
        this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */

    }, {
      key: "ondisconnect",
      value: function ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
      }
      /**
       * Called upon forced client/server side disconnections,
       * this method ensures the manager stops tracking us and
       * that reconnections don't get triggered for this.
       *
       * @private
       */

    }, {
      key: "destroy",
      value: function destroy() {
        if (this.subs) {
          // clean subscriptions to avoid reconnections
          for (var i = 0; i < this.subs.length; i++) {
            this.subs[i].destroy();
          }

          this.subs = null;
        }

        this.io["_destroy"](this);
      }
      /**
       * Disconnects the socket manually.
       *
       * @return self
       * @public
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this.connected) {
          debug("performing disconnect (%s)", this.nsp);
          this.packet({
            type: dist.PacketType.DISCONNECT
          });
        } // remove socket from pool


        this.destroy();

        if (this.connected) {
          // fire events
          this.onclose("io client disconnect");
        }

        return this;
      }
      /**
       * Alias for disconnect()
       *
       * @return self
       * @public
       */

    }, {
      key: "close",
      value: function close() {
        return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       * @public
       */

    }, {
      key: "compress",
      value: function compress(_compress) {
        this.flags.compress = _compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @returns self
       * @public
       */

    }, {
      key: "onAny",

      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @param listener
       * @public
       */
      value: function onAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.push(listener);

        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @param listener
       * @public
       */

    }, {
      key: "prependAny",
      value: function prependAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.unshift(listener);

        return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @param listener
       * @public
       */

    }, {
      key: "offAny",
      value: function offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }

        if (listener) {
          var listeners = this._anyListeners;

          for (var i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }

        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       *
       * @public
       */

    }, {
      key: "listenersAny",
      value: function listenersAny() {
        return this._anyListeners || [];
      }
    }, {
      key: "active",
      get: function get() {
        return !!this.subs;
      }
    }, {
      key: "volatile",
      get: function get() {
        this.flags.volatile = true;
        return this;
      }
    }]);

    return Socket;
  }(componentEmitter);

  exports.Socket = Socket;
});

/**
 * Expose `Backoff`.
 */
var backo2 = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */


Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);

  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }

  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */


Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */


Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */


Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */


Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var manager = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Manager = void 0;
  var debug = browser("socket.io-client:manager");

  var Manager = /*#__PURE__*/function (_Emitter) {
    _inherits(Manager, _Emitter);

    var _super = _createSuper$9(Manager);

    function Manager(uri, opts) {
      var _this;

      _classCallCheck(this, Manager);

      _this = _super.call(this);
      _this.nsps = {};
      _this.subs = [];

      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = undefined;
      }

      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      _this.opts = opts;

      _this.reconnection(opts.reconnection !== false);

      _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);

      _this.reconnectionDelay(opts.reconnectionDelay || 1000);

      _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);

      _this.randomizationFactor(opts.randomizationFactor || 0.5);

      _this.backoff = new backo2({
        min: _this.reconnectionDelay(),
        max: _this.reconnectionDelayMax(),
        jitter: _this.randomizationFactor()
      });

      _this.timeout(null == opts.timeout ? 20000 : opts.timeout);

      _this._readyState = "closed";
      _this.uri = uri;

      var _parser = opts.parser || dist;

      _this.encoder = new _parser.Encoder();
      _this.decoder = new _parser.Decoder();
      _this._autoConnect = opts.autoConnect !== false;
      if (_this._autoConnect) _this.open();
      return _this;
    }

    _createClass(Manager, [{
      key: "reconnection",
      value: function reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
    }, {
      key: "reconnectionAttempts",
      value: function reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
    }, {
      key: "reconnectionDelay",
      value: function reconnectionDelay(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }
    }, {
      key: "randomizationFactor",
      value: function randomizationFactor(v) {
        var _a;

        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }
    }, {
      key: "reconnectionDelayMax",
      value: function reconnectionDelayMax(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }
    }, {
      key: "timeout",
      value: function timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
      }
      /**
       * Starts trying to reconnect if reconnection is enabled and we have not
       * started reconnecting yet
       *
       * @private
       */

    }, {
      key: "maybeReconnectOnOpen",
      value: function maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          // keeps reconnection from firing twice for the same reconnection loop
          this.reconnect();
        }
      }
      /**
       * Sets the current transport `socket`.
       *
       * @param {Function} fn - optional, callback
       * @return self
       * @public
       */

    }, {
      key: "open",
      value: function open(fn) {
        var _this2 = this;

        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open")) return this;
        debug("opening %s", this.uri);
        this.engine = lib$1(this.uri, this.opts);
        var socket = this.engine;
        var self = this;
        this._readyState = "opening";
        this.skipReconnect = false; // emit `open`

        var openSub = on_1.on(socket, "open", function () {
          self.onopen();
          fn && fn();
        }); // emit `error`

        var errorSub = on_1.on(socket, "error", function (err) {
          debug("error");
          self.cleanup();
          self._readyState = "closed";

          _get(_getPrototypeOf(Manager.prototype), "emit", _this2).call(_this2, "error", err);

          if (fn) {
            fn(err);
          } else {
            // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
          }
        });

        if (false !== this._timeout) {
          var timeout = this._timeout;
          debug("connect attempt will timeout after %d", timeout);

          if (timeout === 0) {
            openSub.destroy(); // prevents a race condition with the 'open' event
          } // set timer


          var timer = setTimeout(function () {
            debug("connect attempt timed out after %d", timeout);
            openSub.destroy();
            socket.close();
            socket.emit("error", new Error("timeout"));
          }, timeout);
          this.subs.push({
            destroy: function destroy() {
              clearTimeout(timer);
            }
          });
        }

        this.subs.push(openSub);
        this.subs.push(errorSub);
        return this;
      }
      /**
       * Alias for open()
       *
       * @return {Manager} self
       * @public
       */

    }, {
      key: "connect",
      value: function connect(fn) {
        return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        debug("open"); // clear old subs

        this.cleanup(); // mark as open

        this._readyState = "open";

        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "open"); // add new subs


        var socket = this.engine;
        this.subs.push(on_1.on(socket, "data", componentBind(this, "ondata")), on_1.on(socket, "ping", componentBind(this, "onping")), on_1.on(socket, "error", componentBind(this, "onerror")), on_1.on(socket, "close", componentBind(this, "onclose")), on_1.on(this.decoder, "decoded", componentBind(this, "ondecoded")));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */

    }, {
      key: "onping",
      value: function onping() {
        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "ping");
      }
      /**
       * Called with data.
       *
       * @private
       */

    }, {
      key: "ondata",
      value: function ondata(data) {
        this.decoder.add(data);
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */

    }, {
      key: "ondecoded",
      value: function ondecoded(packet) {
        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "packet", packet);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */

    }, {
      key: "onerror",
      value: function onerror(err) {
        debug("error", err);

        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */

    }, {
      key: "socket",
      value: function socket(nsp, opts) {
        var socket = this.nsps[nsp];

        if (!socket) {
          socket = new socket$1.Socket(this, nsp, opts);
          this.nsps[nsp] = socket;
        }

        return socket;
      }
      /**
       * Called upon a socket close.
       *
       * @param socket
       * @private
       */

    }, {
      key: "_destroy",
      value: function _destroy(socket) {
        var nsps = Object.keys(this.nsps);

        for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
          var nsp = _nsps[_i];
          var _socket = this.nsps[nsp];

          if (_socket.active) {
            debug("socket %s is still active, skipping close", nsp);
            return;
          }
        }

        this._close();
      }
      /**
       * Writes a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "_packet",
      value: function _packet(packet) {
        debug("writing packet %j", packet);
        if (packet.query && packet.type === 0) packet.nsp += "?" + packet.query;
        var encodedPackets = this.encoder.encode(packet);

        for (var i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */

    }, {
      key: "cleanup",
      value: function cleanup() {
        debug("cleanup");
        var subsLength = this.subs.length;

        for (var i = 0; i < subsLength; i++) {
          var sub = this.subs.shift();
          sub.destroy();
        }

        this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */

    }, {
      key: "_close",
      value: function _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;

        if ("opening" === this._readyState) {
          // `onclose` will not fire because
          // an open event never happened
          this.cleanup();
        }

        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine) this.engine.close();
      }
      /**
       * Alias for close()
       *
       * @private
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";

        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "close", reason);

        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      /**
       * Attempt a reconnection.
       *
       * @private
       */

    }, {
      key: "reconnect",
      value: function reconnect() {
        var _this3 = this;

        if (this._reconnecting || this.skipReconnect) return this;
        var self = this;

        if (this.backoff.attempts >= this._reconnectionAttempts) {
          debug("reconnect failed");
          this.backoff.reset();

          _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "reconnect_failed");

          this._reconnecting = false;
        } else {
          var delay = this.backoff.duration();
          debug("will wait %dms before reconnect attempt", delay);
          this._reconnecting = true;
          var timer = setTimeout(function () {
            if (self.skipReconnect) return;
            debug("attempting reconnect");

            _get(_getPrototypeOf(Manager.prototype), "emit", _this3).call(_this3, "reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events


            if (self.skipReconnect) return;
            self.open(function (err) {
              if (err) {
                debug("reconnect attempt error");
                self._reconnecting = false;
                self.reconnect();

                _get(_getPrototypeOf(Manager.prototype), "emit", _this3).call(_this3, "reconnect_error", err);
              } else {
                debug("reconnect success");
                self.onreconnect();
              }
            });
          }, delay);
          this.subs.push({
            destroy: function destroy() {
              clearTimeout(timer);
            }
          });
        }
      }
      /**
       * Called upon successful reconnect.
       *
       * @private
       */

    }, {
      key: "onreconnect",
      value: function onreconnect() {
        var attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();

        _get(_getPrototypeOf(Manager.prototype), "emit", this).call(this, "reconnect", attempt);
      }
    }]);

    return Manager;
  }(componentEmitter);

  exports.Manager = Manager;
});

var build = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Socket = exports.io = exports.Manager = exports.protocol = void 0;
  Object.defineProperty(exports, "Socket", {
    enumerable: true,
    get: function get() {
      return socket$1.Socket;
    }
  });
  var debug = browser("socket.io-client");
  /**
   * Module exports.
   */

  module.exports = exports = lookup;
  /**
   * Managers cache.
   */

  var cache = exports.managers = {};

  function lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url_1.url(uri);
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id]["nsps"];
    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    var io;

    if (newConnection) {
      debug("ignoring socket cache for %s", source);
      io = new manager.Manager(source, opts);
    } else {
      if (!cache[id]) {
        debug("new io instance for %s", source);
        cache[id] = new manager.Manager(source, opts);
      }

      io = cache[id];
    }

    if (parsed.query && !opts.query) {
      opts.query = parsed.query;
    }

    return io.socket(parsed.path, opts);
  }

  exports.io = lookup;
  /**
   * Protocol version.
   *
   * @public
   */

  Object.defineProperty(exports, "protocol", {
    enumerable: true,
    get: function get() {
      return dist.protocol;
    }
  });
  /**
   * `connect`.
   *
   * @param {String} uri
   * @public
   */

  exports.connect = lookup;
  /**
   * Expose constructors for standalone build.
   *
   * @public
   */

  var manager_2 = manager;
  Object.defineProperty(exports, "Manager", {
    enumerable: true,
    get: function get() {
      return manager_2.Manager;
    }
  });
});

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file$1 = "src\\routes\\play\\ffa\\[id].svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
} // (348:0) {:else}


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
      add_location(div, file$1, 348, 4, 10422);
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
        } else {
          if_block.p(ctx, dirty);
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
    source: "(348:0) {:else}",
    ctx: ctx
  });
  return block;
} // (343:0) {#if error}


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
      add_location(h2, file$1, 344, 8, 10221);
      attr_dev(p, "class", "underline lg:text-3xl text-2xl  text-center text-primary");
      add_location(p, file$1, 345, 24, 10304);
      attr_dev(a, "href", "/play");
      add_location(a, file$1, 345, 8, 10288);
      attr_dev(div, "class", "w-full content-center lg:mt-60 mt-25 ");
      add_location(div, file$1, 343, 4, 10160);
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
    source: "(343:0) {#if error}",
    ctx: ctx
  });
  return block;
} // (447:8) {:else}


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
    source: "(447:8) {:else}",
    ctx: ctx
  });
  return block;
} // (350:8) {#if match}


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
      if_block_anchor = empty$2();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty$2();
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
    id: create_if_block_1$1.name,
    type: "if",
    source: "(350:8) {#if match}",
    ctx: ctx
  });
  return block;
} // (353:12) {:else}


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
      add_location(h1, file$1, 360, 28, 11030);
      attr_dev(p, "class", "timer text-primary ml-5 text-3xl leading-none svelte-11bbg9s");
      add_location(p, file$1, 361, 28, 11102);
      attr_dev(div0, "class", "mode-timer flex justify-center lg:justify-start\r\n                        items-end w-60 ");
      add_location(div0, file$1, 357, 24, 10869);
      attr_dev(div1, "class", "lg:mr-7 mt-4 lg:mt-0 flex flex-col lg:flex-row\r\n                        items-center");
      add_location(div1, file$1, 367, 24, 11368);
      attr_dev(div2, "class", "flex flex-col justify-center lg:flex-row\r\n                    lg:justify-between items-center lg:mt-12 mt-7");
      add_location(div2, file$1, 354, 20, 10697);
      attr_dev(div3, "class", "flex items-center flex-col lg:flex-row lg:items-start\r\n                    h-full");
      add_location(div3, file$1, 385, 20, 12245);
      attr_dev(div4, "class", "h-full flex items-center flex-col lg:block lg:ml-24");
      add_location(div4, file$1, 353, 16, 10610);
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
    source: "(353:12) {:else}",
    ctx: ctx
  });
  return block;
} // (351:12) {#if isMatchEnded}


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
    source: "(351:12) {#if isMatchEnded}",
    ctx: ctx
  });
  return block;
} // (364:58) {:else}


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
    source: "(364:58) {:else}",
    ctx: ctx
  });
  return block;
} // (364:32) {#if countDown}


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
    source: "(364:32) {#if countDown}",
    ctx: ctx
  });
  return block;
} // (375:28) {#if userPlayer.gamesPlayed == 0}


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
      attr_dev(button, "class", "button button-brand quit lg:ml-4 mt-2\r\n                                lg:mt-0 svelte-11bbg9s");
      add_location(button, file$1, 375, 32, 11836);
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
    source: "(375:28) {#if userPlayer.gamesPlayed == 0}",
    ctx: ctx
  });
  return block;
} // (390:24) {#if userPlayer}


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
      add_location(img, file$1, 391, 32, 12563);
      attr_dev(p0, "class", "player-name text-4xl svelte-11bbg9s");
      add_location(p0, file$1, 396, 32, 12813);
      attr_dev(b0, "class", "svelte-11bbg9s");
      add_location(b0, file$1, 403, 40, 13205);
      add_location(p1, file$1, 401, 36, 13105);
      attr_dev(b1, "class", "svelte-11bbg9s");
      add_location(b1, file$1, 408, 40, 13457);
      add_location(p2, file$1, 406, 36, 13360);
      attr_dev(div0, "class", "stats text-2xl bottom-5 text-ultra-light svelte-11bbg9s");
      add_location(div0, file$1, 399, 32, 12976);
      attr_dev(div1, "class", "mt-8 lg:mt-25 ffa-player card user svelte-11bbg9s");
      add_location(div1, file$1, 390, 28, 12481);
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
    source: "(390:24) {#if userPlayer}",
    ctx: ctx
  });
  return block;
} // (417:24) {#if players}


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
      add_location(div, file$1, 417, 28, 13791);
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
    source: "(417:24) {#if players}",
    ctx: ctx
  });
  return block;
} // (421:32) {#each players as player}


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
      add_location(img, file$1, 422, 40, 14142);
      attr_dev(p0, "class", "player-name text-3xl svelte-11bbg9s");
      add_location(p0, file$1, 427, 40, 14416);
      attr_dev(b, "class", "svelte-11bbg9s");
      add_location(b, file$1, 435, 48, 14900);
      add_location(p1, file$1, 433, 44, 14784);
      attr_dev(div0, "class", "stats text-xl bottom-5\r\n                                        text-ultra-light svelte-11bbg9s");
      add_location(div0, file$1, 430, 40, 14599);
      attr_dev(div1, "class", "ffa-player card lg:mr-12 mb-8 svelte-11bbg9s");
      add_location(div1, file$1, 421, 36, 14057);
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
    source: "(421:32) {#each players as player}",
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
      if_block_anchor = empty$2();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-y6pzc3\"]", document.head);
      head_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty$2();
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bidu5D", slots, []);
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
    var unsub, d, endsIn, socket;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            unsub = counter.subscribe(function (value) {
              user = value.content;
            });
            unsub(); //await user
            //user = user.steam

            _context.prev = 2;
            _context.next = 5;
            return user;

          case 5:
            user = _context.sent;
            user = user.steam;
            _context.t0 = $$invalidate;
            _context.next = 10;
            return callApi("get", "/getMatch/".concat(id));

          case 10:
            _context.t1 = match = _context.sent;
            (0, _context.t0)(0, _context.t1);
            $$invalidate(1, isMatchEnded = match.finished); //Start the countdown

            filterUsers(false);
            d = new Date(userPlayer.joinDate);
            endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);

            if (endsIn < 1) {
              $$invalidate(2, countDown = "Waiting for others to finish (you can start a new game from the play page)");
            } else {
              startTimer(endsIn);
            }

            counter.set({
              "refresh": true
            });
            socket = build.io(apiUrl);
            socket.on("connection", function (status) {
              console.log(status);
              socket.emit("match connection", "FFA" + id);
            });
            socket.on("join match", function (status) {
              console.log(status);
            });
            socket.on("lobbyUpdate", function (value) {
              $$invalidate(0, match = value);
              filterUsers(true);
            });
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t2 = _context["catch"](2);

            if (_context.t2.response) {
              if (_context.t2.response.status === 400 && _context.t2.response.data.includes("Play at least one ranked")) {
                $$invalidate(5, error = "You have to play a ranked game before using the site (1v1 or 2v2 doesn't matter)");
              } else if (_context.t2.response.status === 400 && _context.t2.response.data.includes("Play at least one")) {
                $$invalidate(5, error = "You have to download brawlhalla and play at least a game (or you are logged in with the wrong account)");
              }
            }

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 24]]);
  })));

  var filterUsers = function filterUsers(isFromSocket) {
    //Find user's object
    if (isFromSocket === false) {
      $$invalidate(3, userPlayer = match.players.find(function (p) {
        return p.steamId === parseInt(user.id);
      }));
    } else {
      var playerIndex = match.players.findIndex(function (p) {
        return p.steamId === parseInt(user.id);
      });
      $$invalidate(0, match.players[playerIndex].wins = userPlayer.wins, match);
      $$invalidate(3, userPlayer = match.players[playerIndex]);
    } //Delete user's object from array.


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
              //! err ici ?
              $$invalidate(6, isRefreshingStats = true);
              winNb = userPlayer.gamesPlayed;
              _context2.t0 = $$invalidate;
              _context2.next = 5;
              return callApi("get", "/getMatch/".concat(id));

            case 5:
              _context2.t1 = match = _context2.sent;
              (0, _context2.t0)(0, _context2.t1);
              filterUsers(false);

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

              $$invalidate(6, isRefreshingStats = false);

            case 10:
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
      io: build,
      apiUrl: apiUrl,
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

  var _super = _createSuper$a(U5Bidu5D);

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
