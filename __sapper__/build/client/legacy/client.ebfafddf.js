function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;
      var remove = [];

      while (j < node.attributes.length) {
        var attribute = node.attributes[j++];

        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }

      for (var k = 0; k < remove.length; k++) {
        node.removeAttribute(remove[k]);
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}

function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? 'important' : '');
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(function (fn) {
      return fn(event);
    });
  }
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function tick() {
  schedule_update();
  return resolved_promise;
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.24.1'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node: node,
    attribute: attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node: node,
    attribute: attribute,
    value: value
  });
}

function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("SvelteDOMSetProperty", {
    node: node,
    property: property,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}

var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn("Component was already destroyed"); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

var CONTEXT_KEY = {};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment(ctx) {
  var block = {
    c: noop,
    l: noop,
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
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Tailwindcss> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Tailwindcss", $$slots, []);
  return [];
}

var Tailwindcss = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Tailwindcss, _SvelteComponentDev);

  var _super = _createSuper$1(Tailwindcss);

  function Tailwindcss(options) {
    var _this;

    _classCallCheck(this, Tailwindcss);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Tailwindcss",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Tailwindcss;
}(SvelteComponentDev);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function clickOutside(node) {
  var handleClick = function handleClick(event) {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };

  document.addEventListener('click', handleClick, true);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

var apiUrl = "https://api.winhalla.app";

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src\\components\\Navigation\\NavAccount.svelte";

function create_fragment$1(ctx) {
  var div3;
  var div1;
  var button;
  var div0;
  var img;
  var img_src_value;
  var t0;
  var p;
  var t1;
  var t2;
  var svg;
  var path;
  var clickOutside_action;
  var t3;
  var div2;
  var a;
  var t4;
  var a_href_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      button = element("button");
      div0 = element("div");
      img = element("img");
      t0 = space();
      p = element("p");
      t1 = text(
      /*username*/
      ctx[0]);
      t2 = space();
      svg = svg_element("svg");
      path = svg_element("path");
      t3 = space();
      div2 = element("div");
      a = element("a");
      t4 = text("Logout");
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      button = claim_element(div1_nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      div0 = claim_element(button_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      img = claim_element(div0_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t0 = claim_space(div0_nodes);
      p = claim_element(div0_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes,
      /*username*/
      ctx[0]);
      p_nodes.forEach(detach_dev);
      t2 = claim_space(div0_nodes);
      svg = claim_element(div0_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      a = claim_element(div2_nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      t4 = claim_text(a_nodes, "Logout");
      a_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "class", "w-10 h-10 rounded-full");
      if (img.src !== (img_src_value =
      /*avatar*/
      ctx[1])) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Avatar");
      add_location(img, file, 31, 16, 1390);
      attr_dev(p, "class", "text-xl mr-2 username svelte-f4gux");
      add_location(p, file, 32, 16, 1472);
      attr_dev(path, "d", "m2.43 4.8-2.43 2.422 12 11.978 12-11.978-2.43-2.422-9.57 9.547z");
      add_location(path, file, 36, 55, 1705);
      attr_dev(svg, "class", "w-4 h-6 fill-current hidden lg:block");
      attr_dev(svg, "viewBox", "0 0 24 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file, 33, 16, 1537);
      attr_dev(div0, "class", "flex items-center");
      add_location(div0, file, 30, 12, 1341);
      attr_dev(button, "class", "focus:outline-none lg:hover:bg-primary lg:px-2 py-1 rounded");
      add_location(button, file, 25, 8, 1101);
      attr_dev(div1, "class", "flex items-center h-full");
      add_location(div1, file, 24, 4, 1053);
      attr_dev(a, "class", "block text-red-500 text-lg border-l border-red-600 py-3\r\n                lg:hover:bg-red-500 lg:hover:text-font px-3 rounded-sm\r\n                lg:border-none");
      attr_dev(a, "href", a_href_value = "" + (apiUrl + "/auth/logout"));
      add_location(a, file, 46, 8, 2063);
      attr_dev(div2, "class", "pt-3 lg:pt-0 rounded lg:bg-variant lg:absolute lg:shadow-card\r\n            dropdown z-50 lg:border lg:border-primary svelte-f4gux");
      toggle_class(div2, "lg:hidden", !
      /*isDropdownOpen*/
      ctx[2]);
      add_location(div2, file, 42, 4, 1871);
      attr_dev(div3, "class", "lg:relative");
      add_location(div3, file, 23, 0, 1022);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, button);
      append_dev(button, div0);
      append_dev(div0, img);
      append_dev(div0, t0);
      append_dev(div0, p);
      append_dev(p, t1);
      append_dev(div0, t2);
      append_dev(div0, svg);
      append_dev(svg, path);
      append_dev(div3, t3);
      append_dev(div3, div2);
      append_dev(div2, a);
      append_dev(a, t4);

      if (!mounted) {
        dispose = [action_destroyer(clickOutside_action = clickOutside.call(null, button)), listen_dev(button, "click_outside",
        /*click_outside_handler*/
        ctx[4], false, false, false), listen_dev(button, "click",
        /*click_handler*/
        ctx[5], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*avatar*/
      2 && img.src !== (img_src_value =
      /*avatar*/
      ctx[1])) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*username*/
      1) set_data_dev(t1,
      /*username*/
      ctx[0]);

      if (dirty &
      /*isDropdownOpen*/
      4) {
        toggle_class(div2, "lg:hidden", !
        /*isDropdownOpen*/
        ctx[2]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
      mounted = false;
      run_all(dispose);
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

function instance$1($$self, $$props, $$invalidate) {
  var username = $$props.username;
  var avatar = $$props.avatar;
  var isDropdownOpen;

  var handleClick = function handleClick() {
    $$invalidate(2, isDropdownOpen = !isDropdownOpen);
  };

  var writable_props = ["username", "avatar"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<NavAccount> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("NavAccount", $$slots, []);

  var click_outside_handler = function click_outside_handler() {
    return $$invalidate(2, isDropdownOpen = false);
  };

  var click_handler = function click_handler() {
    return handleClick();
  };

  $$self.$$set = function ($$props) {
    if ("username" in $$props) $$invalidate(0, username = $$props.username);
    if ("avatar" in $$props) $$invalidate(1, avatar = $$props.avatar);
  };

  $$self.$capture_state = function () {
    return {
      clickOutside: clickOutside,
      apiUrl: apiUrl,
      username: username,
      avatar: avatar,
      isDropdownOpen: isDropdownOpen,
      handleClick: handleClick
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("username" in $$props) $$invalidate(0, username = $$props.username);
    if ("avatar" in $$props) $$invalidate(1, avatar = $$props.avatar);
    if ("isDropdownOpen" in $$props) $$invalidate(2, isDropdownOpen = $$props.isDropdownOpen);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [username, avatar, isDropdownOpen, handleClick, click_outside_handler, click_handler];
}

var NavAccount = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(NavAccount, _SvelteComponentDev);

  var _super = _createSuper$2(NavAccount);

  function NavAccount(options) {
    var _this;

    _classCallCheck(this, NavAccount);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      username: 0,
      avatar: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "NavAccount",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*username*/
    ctx[0] === undefined && !("username" in props)) {
      console.warn("<NavAccount> was created without expected prop 'username'");
    }

    if (
    /*avatar*/
    ctx[1] === undefined && !("avatar" in props)) {
      console.warn("<NavAccount> was created without expected prop 'avatar'");
    }

    return _this;
  }

  _createClass(NavAccount, [{
    key: "username",
    get: function get() {
      throw new Error("<NavAccount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NavAccount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "avatar",
    get: function get() {
      throw new Error("<NavAccount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NavAccount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return NavAccount;
}(SvelteComponentDev);

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (_typeof(obj) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

var cookies = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if ((utils.isBlob(requestData) || utils.isFile(requestData)) && requestData.type) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, mergeDeepProperties);
  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios_1.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults_1); // Expose Axios class to allow class inheritance

axios.Axios = Axios_1; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;
var axios_1 = axios; // Allow use of default import syntax in TypeScript

var _default = axios;
axios_1.default = _default;

var axios$1 = axios_1;

var axiosInstance = axios$1.create({
  withCredentials: true,
  baseURL: "https://api.winhalla.app"
});

var callApi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(method, url, data) {
    var res;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axiosInstance({
              method: method,
              url: url,
              data: data
            });

          case 3:
            res = _context.sent;
            return _context.abrupt("return", res.data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function callApi(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", callApi("get", "/account"));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUser() {
    return _ref2.apply(this, arguments);
  };
}();

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;
/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode$1 = encodeURIComponent;
var pairSplitRegExp = /; */;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('='); // skip things that don't look like key=value

    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim(); // quoted values

    if ('"' == val[0]) {
      val = val.slice(1, -1);
    } // only assign once


    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */


function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode$1;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid');
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;

      case 'lax':
        str += '; SameSite=Lax';
        break;

      case 'strict':
        str += '; SameSite=Strict';
        break;

      case 'none':
        str += '; SameSite=None';
        break;

      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */


function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
  parse: parse_1,
  serialize: serialize_1
};

var counter;
counter = writable({
  content: getUser(),
  refresh: false
}); //counter = writable({ content: "err", refresh: false });

counter.subscribe( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(value) {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(value.refresh === true)) {
              _context.next = 7;
              break;
            }

            _context.t0 = counter;
            _context.next = 4;
            return getUser();

          case 4:
            _context.t1 = _context.sent;
            _context.t2 = {
              content: _context.t1,
              refresh: false
            };

            _context.t0.set.call(_context.t0, _context.t2);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file$1 = "src\\components\\Navigation\\NavNotifications.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[19] = list[i];
  child_ctx[21] = i;
  return child_ctx;
} // (151:16) {:else}


function create_else_block(ctx) {
  var svg0;
  var path0;
  var t;
  var svg1;
  var path1;
  var block = {
    c: function create() {
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t = space();
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      svg0 = claim_element(nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg0_nodes = children(svg0);
      path0 = claim_element(svg0_nodes, "path", {
        d: true
      }, 1);
      children(path0).forEach(detach_dev);
      svg0_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      svg1 = claim_element(nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg1_nodes = children(svg1);
      path1 = claim_element(svg1_nodes, "path", {
        d: true
      }, 1);
      children(path1).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path0, "d", "m19.945\r\n                            15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .317.098.611.266.853l-.003-.005c-3.753.623-6.579\r\n                            3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619\r\n                            5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404\r\n                            3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3\r\n                            3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404\r\n                            3.135-3.135\r\n                            0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441\r\n                            6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505\r\n                            1.125-1.126\r\n                            1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886\r\n                            0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612\r\n                            2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572\r\n                            2.495 5.572 5.572c0 4.578 1.089 5.84 2.418\r\n                            7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z");
      add_location(path0, file$1, 155, 24, 6572);
      attr_dev(svg0, "class", "pt-1 w-5 lg:p-0 fill-current bell svelte-1m6kscb");
      attr_dev(svg0, "viewBox", "0 0 21 24");
      attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg0, file$1, 151, 20, 6369);
      attr_dev(path1, "d", "m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\r\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\r\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\r\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\r\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\r\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\r\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\r\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\r\n                            1.125 1.126 1.125z");
      add_location(path1, file$1, 178, 24, 8126);
      attr_dev(svg1, "class", "pt-1 w-5 lg:p-0 fill-current hidden bell-hover svelte-1m6kscb");
      attr_dev(svg1, "viewBox", "0 0 21 24");
      attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg1, file$1, 174, 20, 7910);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg0, anchor);
      append_dev(svg0, path0);
      insert_dev(target, t, anchor);
      insert_dev(target, svg1, anchor);
      append_dev(svg1, path1);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg0);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(svg1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(151:16) {:else}",
    ctx: ctx
  });
  return block;
} // (133:16) {#if isDropdownOpen}


function create_if_block_4(ctx) {
  var svg;
  var path;
  var block = {
    c: function create() {
      svg = svg_element("svg");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "m20.333 17.16c-1.04-1.04-2.339-2.341-2.339-7.409\r\n                            0-3.706-2.688-6.784-6.22-7.393l-.045-.006c.166-.238.265-.533.265-.851\r\n                            0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0\r\n                            .318.099.613.268.856l-.003-.005c-3.578.614-6.266\r\n                            3.692-6.266 7.399 0 5.068-1.296 6.367-2.339\r\n                            7.409-.405.407-.655.968-.655 1.588 0 1.242 1.005\r\n                            2.249 2.246 2.252h5.249c0 1.657 1.343 3 3 3s3-1.343\r\n                            3-3h5.248c1.241-.004 2.246-1.011 2.246-2.252\r\n                            0-.62-.25-1.181-.655-1.588zm-9.84 4.965c.207 0\r\n                            .375.168.375.375s-.168.375-.375.375c-1.035-.001-1.874-.84-1.875-1.875h.75c.001.621.505\r\n                            1.125 1.126 1.125z");
      add_location(path, file$1, 137, 24, 5409);
      attr_dev(svg, "class", "pt-1 w-5 lg:p-0 fill-current");
      attr_dev(svg, "viewBox", "0 0 21 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 133, 20, 5211);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);
      append_dev(svg, path);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(133:16) {#if isDropdownOpen}",
    ctx: ctx
  });
  return block;
} // (193:16) {#if newNotifications}


function create_if_block_3(ctx) {
  var span2;
  var span0;
  var t;
  var span1;
  var block = {
    c: function create() {
      span2 = element("span");
      span0 = element("span");
      t = space();
      span1 = element("span");
      this.h();
    },
    l: function claim(nodes) {
      span2 = claim_element(nodes, "SPAN", {
        class: true
      });
      var span2_nodes = children(span2);
      span0 = claim_element(span2_nodes, "SPAN", {
        class: true
      });
      children(span0).forEach(detach_dev);
      t = claim_space(span2_nodes);
      span1 = claim_element(span2_nodes, "SPAN", {
        class: true
      });
      children(span1).forEach(detach_dev);
      span2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "inline-flex animate-ping absolute top-0 right-0 w-2 h-2 rounded-full bg-legendary opacity-75");
      add_location(span0, file$1, 194, 24, 9169);
      attr_dev(span1, "class", "inline-flex absolute top-0 right-0 w-2 h-2 rounded-full bg-legendary");
      add_location(span1, file$1, 196, 24, 9338);
      attr_dev(span2, "class", "flex");
      add_location(span2, file$1, 193, 20, 9124);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span2, anchor);
      append_dev(span2, span0);
      append_dev(span2, t);
      append_dev(span2, span1);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(193:16) {#if newNotifications}",
    ctx: ctx
  });
  return block;
} // (214:12) {#if data.notifications}


function create_if_block_1(ctx) {
  var div1;
  var p;
  var t0;
  var t1;
  var div0;
  var mounted;
  var dispose;
  var each_value_1 =
  /*data*/
  ctx[0].notifications;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      div1 = element("div");
      p = element("p");
      t0 = text("Notifications");
      t1 = space();
      div0 = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {});
      var div1_nodes = children(div1);
      p = claim_element(div1_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Notifications");
      p_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "ml-1");
      add_location(p, file$1, 231, 20, 10763);
      add_location(div0, file$1, 232, 20, 10818);
      add_location(div1, file$1, 214, 16, 9985);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, p);
      append_dev(p, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div0, null);
      }

      if (!mounted) {
        dispose = listen_dev(div1, "click",
        /*click_handler_3*/
        ctx[10], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*delNotif, idToType, data*/
      97) {
        each_value_1 =
        /*data*/
        ctx[0].notifications;
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div0, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(214:12) {#if data.notifications}",
    ctx: ctx
  });
  return block;
} // (242:36) {#if notification.tip}


function create_if_block_2(ctx) {
  var p;
  var t_value =
  /*notification*/
  ctx[19].tip + "";
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", " mr-6 lg:mr-12 text-light\r\n                                            text-lg");
      add_location(p, file$1, 242, 40, 11431);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t_value !== (t_value =
      /*notification*/
      ctx[19].tip + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(242:36) {#if notification.tip}",
    ctx: ctx
  });
  return block;
} // (234:24) {#each data.notifications as notification, i}


function create_each_block_1(ctx) {
  var button1;
  var div;
  var p;
  var t0_value =
  /*notification*/
  ctx[19].message + "";
  var t0;
  var t1;
  var t2;
  var span;
  var t3_value =
  /*idToType*/
  ctx[5](
  /*notification*/
  ctx[19].id) + "";
  var t3;
  var t4;
  var button0;
  var svg;
  var path;
  var t5;
  var mounted;
  var dispose;
  var if_block =
  /*notification*/
  ctx[19].tip && create_if_block_2(ctx);

  function click_handler_1() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler_1*/
      (_ctx = ctx)[8].apply(_ctx, [
      /*i*/
      ctx[21]].concat(args))
    );
  }

  function click_handler_2() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*click_handler_2*/
      (_ctx2 = ctx)[9].apply(_ctx2, [
      /*i*/
      ctx[21]].concat(args))
    );
  }

  var block = {
    c: function create() {
      button1 = element("button");
      div = element("div");
      p = element("p");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      span = element("span");
      t3 = text(t3_value);
      t4 = space();
      button0 = element("button");
      svg = svg_element("svg");
      path = svg_element("path");
      t5 = space();
      this.h();
    },
    l: function claim(nodes) {
      button1 = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button1_nodes = children(button1);
      div = claim_element(button1_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      p = claim_element(div_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, t0_value);
      p_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      if (if_block) if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      t2 = claim_space(button1_nodes);
      span = claim_element(button1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t3 = claim_text(span_nodes, t3_value);
      span_nodes.forEach(detach_dev);
      t4 = claim_space(button1_nodes);
      button0 = claim_element(button1_nodes, "BUTTON", {
        class: true
      });
      var button0_nodes = children(button0);
      svg = claim_element(button0_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      button0_nodes.forEach(detach_dev);
      t5 = claim_space(button1_nodes);
      button1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "ml-2 mr-6 lg:mr-12 text-2xl");
      add_location(p, file$1, 238, 36, 11184);
      attr_dev(div, "class", "progress-container");
      add_location(div, file$1, 237, 32, 11114);
      attr_dev(span, "class", "quest-goal text-sm text-font px-2\r\n                                    py-1 bg-legendary rounded-lg b");
      add_location(span, file$1, 249, 32, 11793);
      attr_dev(path, "d", "m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z");
      add_location(path, file$1, 260, 40, 12519);
      attr_dev(svg, "class", "w-3 h-3 fill-current ");
      attr_dev(svg, "viewBox", "0 0 28 24");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file$1, 256, 36, 12264);
      attr_dev(button0, "class", "p-2 absolute top-0 right-0 text-light hover:text-font");
      add_location(button0, file$1, 254, 32, 12086);
      attr_dev(button1, "class", "card notification flex items-center relative svelte-1m6kscb");
      add_location(button1, file$1, 234, 28, 10924);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button1, anchor);
      append_dev(button1, div);
      append_dev(div, p);
      append_dev(p, t0);
      append_dev(div, t1);
      if (if_block) if_block.m(div, null);
      append_dev(button1, t2);
      append_dev(button1, span);
      append_dev(span, t3);
      append_dev(button1, t4);
      append_dev(button1, button0);
      append_dev(button0, svg);
      append_dev(svg, path);
      append_dev(button1, t5);

      if (!mounted) {
        dispose = [listen_dev(button0, "click", click_handler_1, false, false, false), listen_dev(button1, "click", click_handler_2, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*data*/
      1 && t0_value !== (t0_value =
      /*notification*/
      ctx[19].message + "")) set_data_dev(t0, t0_value);

      if (
      /*notification*/
      ctx[19].tip) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_2(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*data*/
      1 && t3_value !== (t3_value =
      /*idToType*/
      ctx[5](
      /*notification*/
      ctx[19].id) + "")) set_data_dev(t3, t3_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button1);
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(234:24) {#each data.notifications as notification, i}",
    ctx: ctx
  });
  return block;
} // (270:12) {#if data.inGame}


function create_if_block(ctx) {
  var div1;
  var p;
  var t0;
  var t1;
  var div0;
  var each_value =
  /*data*/
  ctx[0].inGame;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      div1 = element("div");
      p = element("p");
      t0 = text("Matchs in progress");
      t1 = space();
      div0 = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      p = claim_element(div1_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Matchs in progress");
      p_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "ml-1");
      add_location(p, file$1, 271, 20, 12992);
      add_location(div0, file$1, 272, 20, 13052);
      attr_dev(div1, "class", "mt-5");
      add_location(div1, file$1, 270, 16, 12952);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, p);
      append_dev(p, t0);
      append_dev(div1, t1);
      append_dev(div1, div0);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div0, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1) {
        each_value =
        /*data*/
        ctx[0].inGame;
        validate_each_argument(each_value);

        var _i8;

        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(div0, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(270:12) {#if data.inGame}",
    ctx: ctx
  });
  return block;
} // (274:24) {#each data.inGame as match}


function create_each_block(ctx) {
  var a;
  var div;
  var p0;
  var t0_value =
  /*match*/
  ctx[16].type + "";
  var t0;
  var t1;
  var p1;
  var t2_value =
  /*match*/
  ctx[16].timer + "";
  var t2;
  var t3;
  var p2;
  var t4_value = (!
  /*match*/
  ctx[16].isFinished ?
  /*match*/
  ctx[16].progress + "/8" : "Waiting for others to finish") + "";
  var t4;
  var t5;
  var a_href_value;
  var block = {
    c: function create() {
      a = element("a");
      div = element("div");
      p0 = element("p");
      t0 = text(t0_value);
      t1 = space();
      p1 = element("p");
      t2 = text(t2_value);
      t3 = space();
      p2 = element("p");
      t4 = text(t4_value);
      t5 = space();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      div = claim_element(a_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      p0 = claim_element(div_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, t0_value);
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, t2_value);
      p1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      t3 = claim_space(a_nodes);
      p2 = claim_element(a_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      t4 = claim_text(p2_nodes, t4_value);
      p2_nodes.forEach(detach_dev);
      t5 = claim_space(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-2xl");
      add_location(p0, file$1, 278, 36, 13386);
      attr_dev(p1, "class", "ml-2 mr-6 lg:mr-12 text-light\r\n                                        text-lg");
      add_location(p1, file$1, 281, 36, 13559);
      attr_dev(div, "class", "progress-container");
      add_location(div, file$1, 277, 32, 13316);
      attr_dev(p2, "class", "quest-goal text-xl text-primary");
      add_location(p2, file$1, 287, 32, 13861);
      attr_dev(a, "class", "card notification flex items-center svelte-1m6kscb");
      attr_dev(a, "href", a_href_value = "/play/ffa/" +
      /*match*/
      ctx[16].id);
      add_location(a, file$1, 274, 28, 13141);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, div);
      append_dev(div, p0);
      append_dev(p0, t0);
      append_dev(div, t1);
      append_dev(div, p1);
      append_dev(p1, t2);
      append_dev(a, t3);
      append_dev(a, p2);
      append_dev(p2, t4);
      append_dev(a, t5);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t0_value !== (t0_value =
      /*match*/
      ctx[16].type + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*data*/
      1 && t2_value !== (t2_value =
      /*match*/
      ctx[16].timer + "")) set_data_dev(t2, t2_value);
      if (dirty &
      /*data*/
      1 && t4_value !== (t4_value = (!
      /*match*/
      ctx[16].isFinished ?
      /*match*/
      ctx[16].progress + "/8" : "Waiting for others to finish") + "")) set_data_dev(t4, t4_value);

      if (dirty &
      /*data*/
      1 && a_href_value !== (a_href_value = "/play/ffa/" +
      /*match*/
      ctx[16].id)) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(274:24) {#each data.inGame as match}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var div5;
  var div2;
  var div1;
  var div0;
  var t0;
  var t1;
  var div4;
  var div3;
  var t2;
  var clickOutside_action;
  var mounted;
  var dispose;

  function select_block_type(ctx, dirty) {
    if (
    /*isDropdownOpen*/
    ctx[3]) return create_if_block_4;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block0 = current_block_type(ctx);
  var if_block1 =
  /*newNotifications*/
  ctx[1] && create_if_block_3(ctx);
  var if_block2 =
  /*data*/
  ctx[0].notifications && create_if_block_1(ctx);
  var if_block3 =
  /*data*/
  ctx[0].inGame && create_if_block(ctx);
  var block = {
    c: function create() {
      div5 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      div4 = element("div");
      div3 = element("div");
      if (if_block2) if_block2.c();
      t2 = space();
      if (if_block3) if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div2 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if_block0.l(div0_nodes);
      t0 = claim_space(div0_nodes);
      if (if_block1) if_block1.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t1 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", {});
      var div3_nodes = children(div3);
      if (if_block2) if_block2.l(div3_nodes);
      t2 = claim_space(div3_nodes);
      if (if_block3) if_block3.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "flex items-center relative");
      add_location(div0, file$1, 131, 12, 5111);
      attr_dev(div1, "class", "focus:outline-none lg:ml-3 rounded bell-button cursor-pointer svelte-1m6kscb");
      add_location(div1, file$1, 120, 8, 4653);
      attr_dev(div2, "class", "flex items-center h-full mr-4 lg:m-0");
      add_location(div2, file$1, 119, 4, 4593);
      add_location(div3, file$1, 212, 8, 9924);
      attr_dev(div4, "class", "pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n        shadow-card dropdown -right-10 md:right-0 z-50 w-86 lg:w-92 border\r\n        border-primary hoverflow-y-auto hmax-h-screen-80  svelte-1m6kscb");
      toggle_class(div4, "hidden", !
      /*isDropdownOpen*/
      ctx[3]);
      add_location(div4, file$1, 205, 4, 9567);
      attr_dev(div5, "class", "relative");
      add_location(div5, file$1, 118, 0, 4565);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div5, anchor);
      append_dev(div5, div2);
      append_dev(div2, div1);
      append_dev(div1, div0);
      if_block0.m(div0, null);
      append_dev(div0, t0);
      if (if_block1) if_block1.m(div0, null);
      append_dev(div5, t1);
      append_dev(div5, div4);
      append_dev(div4, div3);
      if (if_block2) if_block2.m(div3, null);
      append_dev(div3, t2);
      if (if_block3) if_block3.m(div3, null);

      if (!mounted) {
        dispose = [listen_dev(div1, "click",
        /*click_handler*/
        ctx[7], false, false, false), listen_dev(div1, "click",
        /*handleClick*/
        ctx[4], false, false, false), action_destroyer(clickOutside_action = clickOutside.call(null, div4)), listen_dev(div4, "click_outside",
        /*click_outside_handler*/
        ctx[11], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (current_block_type !== (current_block_type = select_block_type(ctx))) {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(div0, t0);
        }
      }

      if (
      /*newNotifications*/
      ctx[1]) {
        if (if_block1) ; else {
          if_block1 = create_if_block_3(ctx);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (
      /*data*/
      ctx[0].notifications) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1(ctx);
          if_block2.c();
          if_block2.m(div3, t2);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (
      /*data*/
      ctx[0].inGame) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block(ctx);
          if_block3.c();
          if_block3.m(div3, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (dirty &
      /*isDropdownOpen*/
      8) {
        toggle_class(div4, "hidden", !
        /*isDropdownOpen*/
        ctx[3]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div5);
      if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var data = $$props.data;
  var newNotifications = false;
  var opened = false;
  var isDropdownOpen = false;
  var matchesLength;

  function handleClick() {
    console.log(isDropdownOpen, !isDropdownOpen);
    $$invalidate(3, isDropdownOpen = !isDropdownOpen);
    $$invalidate(2, opened = true);
  }

  function calculateTimers() {
    data.inGame.forEach(function (match, i) {
      var d = new Date(match.Date);
      var endsIn = -((new Date().getTime() - new Date(d.setHours(d.getHours() + 3)).getTime()) / 1000);
      startTimer(endsIn, i);
    });
  }

  onMount(function () {
    if (!data.notifications) return;
    var length = data.notifications.length;
    var cookies = cookie.parse(document.cookie);
    console.log(length, cookies.notificationNb);
    if (length > cookies.notificationNb || !cookies.notificationNb) $$invalidate(1, newNotifications = true);
    cookies.notificationNb = length;
    matchesLength = data.inGame.length;
    calculateTimers();
  }); //document.cookie = cookie.serialize("notificationNb",cookies.notificationNb,{maxAge:15552000,sameSite:"lax"})
  //document.cookie = cookie.serialize(cookies)

  counter.subscribe(function () {
    if (data.inGame) {
      if (data.inGame.length !== matchesLength) {
        calculateTimers();
      }
    }
  });

  function startTimer(duration, i) {
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
      $$invalidate(0, data.inGame[i].timer = hours + ":" + minutes + ":" + seconds, data);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  var viewedNotifications = function viewedNotifications() {};

  var idToType = function idToType(id) {
    if (id === 0) return "match finished";
    if (id === 1) return "quest finished";
    if (id === 2) return "match";
  };

  function delNotif(i) {
    callApi("post", "/deleteNotification/" + i);
    data.notifications.splice(i, 1);
    $$invalidate(0, data);
  }

  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<NavNotifications> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("NavNotifications", $$slots, []);

  var click_handler = function click_handler() {
    document.cookie = cookie.serialize("notificationNb", data.notifications.length, {
      maxAge: 15552000,
      sameSite: "lax",
      path: "/"
    });
    $$invalidate(1, newNotifications = false);
  };

  var click_handler_1 = function click_handler_1(i) {
    return delNotif(i);
  };

  var click_handler_2 = function click_handler_2(i) {
    return delNotif(i);
  };

  var click_handler_3 = function click_handler_3() {
    setTimeout(function () {
      if (opened == true) {
        document.cookie = cookie.serialize("notificationNb", data.notifications.length, {
          maxAge: 15552000,
          sameSite: "lax",
          path: "/"
        });
        $$invalidate(1, newNotifications = false);
      }
    }, 10);
  };

  var click_outside_handler = function click_outside_handler() {
    return $$invalidate(3, isDropdownOpen = false);
  };

  $$self.$$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      clickOutside: clickOutside,
      callApi: callApi,
      onMount: onMount,
      cookie: cookie,
      counter: counter,
      data: data,
      newNotifications: newNotifications,
      opened: opened,
      isDropdownOpen: isDropdownOpen,
      matchesLength: matchesLength,
      handleClick: handleClick,
      calculateTimers: calculateTimers,
      startTimer: startTimer,
      viewedNotifications: viewedNotifications,
      idToType: idToType,
      delNotif: delNotif
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("newNotifications" in $$props) $$invalidate(1, newNotifications = $$props.newNotifications);
    if ("opened" in $$props) $$invalidate(2, opened = $$props.opened);
    if ("isDropdownOpen" in $$props) $$invalidate(3, isDropdownOpen = $$props.isDropdownOpen);
    if ("matchesLength" in $$props) matchesLength = $$props.matchesLength;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [data, newNotifications, opened, isDropdownOpen, handleClick, idToType, delNotif, click_handler, click_handler_1, click_handler_2, click_handler_3, click_outside_handler];
}

var NavNotifications = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(NavNotifications, _SvelteComponentDev);

  var _super = _createSuper$3(NavNotifications);

  function NavNotifications(options) {
    var _this;

    _classCallCheck(this, NavNotifications);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      data: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "NavNotifications",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console_1.warn("<NavNotifications> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(NavNotifications, [{
    key: "data",
    get: function get() {
      throw new Error("<NavNotifications>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NavNotifications>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return NavNotifications;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "src\\components\\Navigation\\NavAlert.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
} // (52:12) {#each data as information}


function create_each_block$1(ctx) {
  var div1;
  var div0;
  var p0;
  var t0_value =
  /*information*/
  ctx[5].name + "";
  var t0;
  var t1;
  var p1;
  var t2_value =
  /*information*/
  ctx[5].description + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t0 = text(t0_value);
      t1 = space();
      p1 = element("p");
      t2 = text(t2_value);
      t3 = space();
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
      t0 = claim_text(p0_nodes, t0_value);
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, t2_value);
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "ml-2 mr-6 lg:mr-12 text-2xl");
      add_location(p0, file$2, 55, 24, 3074);
      attr_dev(p1, "class", "ml-2 mr-6 lg:mr-12 text-light\r\n                                            text-lg");
      add_location(p1, file$2, 58, 24, 3217);
      attr_dev(div0, "class", "progress-container");
      add_location(div0, file$2, 54, 20, 3016);
      attr_dev(div1, "class", "card info flex items-center svelte-3zb4gb");
      add_location(div1, file$2, 52, 16, 2932);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t0);
      append_dev(div0, t1);
      append_dev(div0, p1);
      append_dev(p1, t2);
      append_dev(div1, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*data*/
      1 && t0_value !== (t0_value =
      /*information*/
      ctx[5].name + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*data*/
      1 && t2_value !== (t2_value =
      /*information*/
      ctx[5].description + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(52:12) {#each data as information}",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var div3;
  var div0;
  var button;
  var svg;
  var path;
  var clickOutside_action;
  var t;
  var div2;
  var div1;
  var mounted;
  var dispose;
  var each_value =
  /*data*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      div3 = element("div");
      div0 = element("div");
      button = element("button");
      svg = svg_element("svg");
      path = svg_element("path");
      t = space();
      div2 = element("div");
      div1 = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      button = claim_element(div0_nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      svg = claim_element(button_nodes, "svg", {
        xmlns: true,
        class: true,
        viewBox: true
      }, 1);
      var svg_nodes = children(svg);
      path = claim_element(svg_nodes, "path", {
        fill: true,
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {});
      var div1_nodes = children(div1);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div1_nodes);
      }

      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "fill", "currentColor");
      attr_dev(path, "d", "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z");
      add_location(path, file$2, 39, 16, 2058);
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "class", "w-6 lg:w-8 mr-2 lg:mr-4 text-legendary");
      attr_dev(svg, "viewBox", "0 0 576 512");
      add_location(svg, file$2, 37, 12, 1913);
      attr_dev(button, "class", "focus:outline-none");
      add_location(button, file$2, 32, 8, 1714);
      attr_dev(div0, "class", "flex items-center h-full mr-4 lg:m-0");
      add_location(div0, file$2, 31, 4, 1654);
      add_location(div1, file$2, 49, 8, 2866);
      attr_dev(div2, "class", "pt-2 py-1 lg:py-2 px-2 lg:px-3 rounded-lg bg-background absolute\r\n            shadow-card dropdown -right-19 md:right-0 z-50 w-86 lg:w-92\r\n            border border-legendary svelte-3zb4gb");
      toggle_class(div2, "hidden", !
      /*isDropdownOpen*/
      ctx[1]);
      add_location(div2, file$2, 44, 4, 2619);
      attr_dev(div3, "class", "relative");
      add_location(div3, file$2, 30, 0, 1626);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div0);
      append_dev(div0, button);
      append_dev(button, svg);
      append_dev(svg, path);
      append_dev(div3, t);
      append_dev(div3, div2);
      append_dev(div2, div1);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div1, null);
      }

      if (!mounted) {
        dispose = [action_destroyer(clickOutside_action = clickOutside.call(null, button)), listen_dev(button, "click_outside",
        /*click_outside_handler*/
        ctx[3], false, false, false), listen_dev(button, "click",
        /*click_handler*/
        ctx[4], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*data*/
      1) {
        each_value =
        /*data*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div1, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*isDropdownOpen*/
      2) {
        toggle_class(div2, "hidden", !
        /*isDropdownOpen*/
        ctx[1]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var data = $$props.data;
  var isDropdownOpen;

  var handleClick = function handleClick() {
    $$invalidate(1, isDropdownOpen = !isDropdownOpen);
  };

  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<NavAlert> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("NavAlert", $$slots, []);

  var click_outside_handler = function click_outside_handler() {
    return $$invalidate(1, isDropdownOpen = false);
  };

  var click_handler = function click_handler() {
    return handleClick();
  };

  $$self.$$set = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      clickOutside: clickOutside,
      data: data,
      isDropdownOpen: isDropdownOpen,
      handleClick: handleClick
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(0, data = $$props.data);
    if ("isDropdownOpen" in $$props) $$invalidate(1, isDropdownOpen = $$props.isDropdownOpen);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [data, isDropdownOpen, handleClick, click_outside_handler, click_handler];
}

var NavAlert = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(NavAlert, _SvelteComponentDev);

  var _super = _createSuper$4(NavAlert);

  function NavAlert(options) {
    var _this;

    _classCallCheck(this, NavAlert);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      data: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "NavAlert",
      options: options,
      id: create_fragment$3.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !("data" in props)) {
      console.warn("<NavAlert> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(NavAlert, [{
    key: "data",
    get: function get() {
      throw new Error("<NavAlert>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NavAlert>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return NavAlert;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error,
    console_1$1 = globals.console;
var file$3 = "src\\components\\Navigation\\Nav.svelte"; // (105:16) {#if informations}

function create_if_block_5(ctx) {
  var navalert;
  var current;
  navalert = new NavAlert({
    props: {
      data:
      /*informations*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(navalert.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(navalert.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(navalert, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var navalert_changes = {};
      if (dirty &
      /*informations*/
      16) navalert_changes.data =
      /*informations*/
      ctx[4];
      navalert.$set(navalert_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(navalert.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(navalert.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(navalert, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(105:16) {#if informations}",
    ctx: ctx
  });
  return block;
} // (129:20) {:else}


function create_else_block_1(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "m24 2.4-2.4-2.4-9.6 9.6-9.6-9.6-2.4 2.4 9.6 9.6-9.6 9.6 2.4 2.4 9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6z");
      add_location(path, file$3, 129, 24, 5500);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(129:20) {:else}",
    ctx: ctx
  });
  return block;
} // (122:20) {#if !isNavbarOpen}


function create_if_block_4$1(ctx) {
  var path0;
  var path1;
  var path2;
  var block = {
    c: function create() {
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path0 = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path0).forEach(detach_dev);
      path1 = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path1).forEach(detach_dev);
      path2 = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path2).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path0, "d", "m2.61 0h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z");
      add_location(path0, file$3, 122, 24, 4884);
      attr_dev(path1, "d", "m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z");
      add_location(path1, file$3, 124, 24, 5077);
      attr_dev(path2, "d", "m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z");
      add_location(path2, file$3, 126, 24, 5273);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path0, anchor);
      insert_dev(target, path1, anchor);
      insert_dev(target, path2, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path0);
      if (detaching) detach_dev(path1);
      if (detaching) detach_dev(path2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(122:20) {#if !isNavbarOpen}",
    ctx: ctx
  });
  return block;
} // (208:16) {:else}


function create_else_block$1(ctx) {
  var a0;
  var t0;
  var a0_href_value;
  var t1;
  var a1;
  var t2;
  var a1_href_value;
  var block = {
    c: function create() {
      a0 = element("a");
      t0 = text("CREATE ACCOUNT");
      t1 = space();
      a1 = element("a");
      t2 = text("LOGIN");
      this.h();
    },
    l: function claim(nodes) {
      a0 = claim_element(nodes, "A", {
        class: true,
        href: true
      });
      var a0_nodes = children(a0);
      t0 = claim_text(a0_nodes, "CREATE ACCOUNT");
      a0_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      a1 = claim_element(nodes, "A", {
        class: true,
        href: true
      });
      var a1_nodes = children(a1);
      t2 = claim_text(a1_nodes, "LOGIN");
      a1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a0, "class", "button-brand button mr-3");
      attr_dev(a0, "href", a0_href_value = "" + (apiUrl + "/auth/login"));
      add_location(a0, file$3, 208, 20, 10483);
      attr_dev(a1, "class", "button-brand-alternative button");
      attr_dev(a1, "href", a1_href_value = "" + (apiUrl + "/auth/login"));
      add_location(a1, file$3, 213, 20, 10684);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a0, anchor);
      append_dev(a0, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, a1, anchor);
      append_dev(a1, t2);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(a0);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(a1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(208:16) {:else}",
    ctx: ctx
  });
  return block;
} // (204:52) 


function create_if_block_3$1(ctx) {
  var a;
  var t;
  var block = {
    c: function create() {
      a = element("a");
      t = text("CREATE ACCOUNT");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      t = claim_text(a_nodes, "CREATE ACCOUNT");
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "class", "button-brand button mr-3");
      attr_dev(a, "href", "/create-account");
      add_location(a, file$3, 204, 20, 10311);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(204:52) ",
    ctx: ctx
  });
  return block;
} // (184:16) {#if isUserLoggedIn === true}


function create_if_block$1(ctx) {
  var div;
  var t0;
  var navaccount;
  var t1;
  var t2;
  var a;
  var b;
  var t3;
  var t4;
  var current;
  var if_block0 =
  /*informations*/
  ctx[4] && create_if_block_2$1(ctx);
  navaccount = new NavAccount({
    props: {
      username:
      /*user*/
      ctx[6].displayName,
      avatar:
      /*user*/
      ctx[6].photos[1].value
    },
    $$inline: true
  });
  var if_block1 =
  /*notificationsObj*/
  ctx[5] && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(navaccount.$$.fragment);
      t1 = space();
      if (if_block1) if_block1.c();
      t2 = space();
      a = element("a");
      b = element("b");
      t3 = text(
      /*userCoins*/
      ctx[3]);
      t4 = text("$");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      claim_component(navaccount.$$.fragment, div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      t2 = claim_space(div_nodes);
      a = claim_element(div_nodes, "A", {
        class: true,
        href: true
      });
      var a_nodes = children(a);
      b = claim_element(a_nodes, "B", {
        class: true
      });
      var b_nodes = children(b);
      t3 = claim_text(b_nodes,
      /*userCoins*/
      ctx[3]);
      b_nodes.forEach(detach_dev);
      t4 = claim_text(a_nodes, "$");
      a_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b, "class", "font-normal ");
      add_location(b, file$3, 200, 28, 10137);
      attr_dev(a, "class", "ml-8 text-2xl text-primary");
      attr_dev(a, "href", "/shop");
      add_location(a, file$3, 199, 24, 10056);
      attr_dev(div, "class", "lg:flex lg:items-center");
      add_location(div, file$3, 184, 20, 9326);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t0);
      mount_component(navaccount, div, null);
      append_dev(div, t1);
      if (if_block1) if_block1.m(div, null);
      append_dev(div, t2);
      append_dev(div, a);
      append_dev(a, b);
      append_dev(b, t3);
      append_dev(a, t4);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*informations*/
      ctx[4]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*informations*/
          16) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var navaccount_changes = {};
      if (dirty &
      /*user*/
      64) navaccount_changes.username =
      /*user*/
      ctx[6].displayName;
      if (dirty &
      /*user*/
      64) navaccount_changes.avatar =
      /*user*/
      ctx[6].photos[1].value;
      navaccount.$set(navaccount_changes);

      if (
      /*notificationsObj*/
      ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*notificationsObj*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t2);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*userCoins*/
      8) set_data_dev(t3,
      /*userCoins*/
      ctx[3]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(navaccount.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(navaccount.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      destroy_component(navaccount);
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(184:16) {#if isUserLoggedIn === true}",
    ctx: ctx
  });
  return block;
} // (186:24) {#if informations}


function create_if_block_2$1(ctx) {
  var div;
  var navalert;
  var current;
  navalert = new NavAlert({
    props: {
      data:
      /*informations*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(navalert.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(navalert.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "hidden lg:flex items-center");
      add_location(div, file$3, 186, 28, 9437);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(navalert, div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var navalert_changes = {};
      if (dirty &
      /*informations*/
      16) navalert_changes.data =
      /*informations*/
      ctx[4];
      navalert.$set(navalert_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(navalert.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(navalert.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(navalert);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(186:24) {#if informations}",
    ctx: ctx
  });
  return block;
} // (194:24) {#if notificationsObj}


function create_if_block_1$1(ctx) {
  var div;
  var notifications;
  var current;
  notifications = new NavNotifications({
    props: {
      data:
      /*notificationsObj*/
      ctx[5]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(notifications.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(notifications.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "hidden lg:flex items-center");
      add_location(div, file$3, 194, 28, 9845);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(notifications, div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var notifications_changes = {};
      if (dirty &
      /*notificationsObj*/
      32) notifications_changes.data =
      /*notificationsObj*/
      ctx[5];
      notifications.$set(notifications_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(notifications.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(notifications.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(notifications);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(194:24) {#if notificationsObj}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var nav;
  var div3;
  var div0;
  var a0;
  var t0;
  var t1;
  var div2;
  var div1;
  var t2;
  var notifications;
  var t3;
  var button;
  var svg0;
  var clickOutside_action;
  var t4;
  var div7;
  var div6;
  var div4;
  var a1;
  var svg1;
  var path0;
  var t5;
  var t6;
  var a2;
  var svg2;
  var path1;
  var t7;
  var t8;
  var div5;
  var current_block_type_index;
  var if_block2;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*informations*/
  ctx[4] && create_if_block_5(ctx);
  notifications = new NavNotifications({
    props: {
      data:
      /*notificationsObj*/
      ctx[5]
    },
    $$inline: true
  });

  function select_block_type(ctx, dirty) {
    if (!
    /*isNavbarOpen*/
    ctx[1]) return create_if_block_4$1;
    return create_else_block_1;
  }

  var current_block_type = select_block_type(ctx);
  var if_block1 = current_block_type(ctx);
  var if_block_creators = [create_if_block$1, create_if_block_3$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*isUserLoggedIn*/
    ctx[2] === true) return 0;
    if (
    /*isUserLoggedIn*/
    ctx[2] == "steam") return 1;
    return 2;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      nav = element("nav");
      div3 = element("div");
      div0 = element("div");
      a0 = element("a");
      t0 = text("WINHALLA");
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      if (if_block0) if_block0.c();
      t2 = space();
      create_component(notifications.$$.fragment);
      t3 = space();
      button = element("button");
      svg0 = svg_element("svg");
      if_block1.c();
      t4 = space();
      div7 = element("div");
      div6 = element("div");
      div4 = element("div");
      a1 = element("a");
      svg1 = svg_element("svg");
      path0 = svg_element("path");
      t5 = text("\r\n                    PLAY");
      t6 = space();
      a2 = element("a");
      svg2 = svg_element("svg");
      path1 = svg_element("path");
      t7 = text("\r\n                    SHOP");
      t8 = space();
      div5 = element("div");
      if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div3 = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      a0 = claim_element(div0_nodes, "A", {
        class: true,
        href: true
      });
      var a0_nodes = children(a0);
      t0 = claim_text(a0_nodes, "WINHALLA");
      a0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      if (if_block0) if_block0.l(div1_nodes);
      t2 = claim_space(div1_nodes);
      claim_component(notifications.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      button = claim_element(div2_nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      svg0 = claim_element(button_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg0_nodes = children(svg0);
      if_block1.l(svg0_nodes);
      svg0_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t4 = claim_space(nav_nodes);
      div7 = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      div6 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      a1 = claim_element(div4_nodes, "A", {
        class: true,
        href: true,
        rel: true
      });
      var a1_nodes = children(a1);
      svg1 = claim_element(a1_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg1_nodes = children(svg1);
      path0 = claim_element(svg1_nodes, "path", {
        d: true
      }, 1);
      children(path0).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      t5 = claim_text(a1_nodes, "\r\n                    PLAY");
      a1_nodes.forEach(detach_dev);
      t6 = claim_space(div4_nodes);
      a2 = claim_element(div4_nodes, "A", {
        class: true,
        href: true,
        rel: true
      });
      var a2_nodes = children(a2);
      svg2 = claim_element(a2_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg2_nodes = children(svg2);
      path1 = claim_element(svg2_nodes, "path", {
        d: true
      }, 1);
      children(path1).forEach(detach_dev);
      svg2_nodes.forEach(detach_dev);
      t7 = claim_text(a2_nodes, "\r\n                    SHOP");
      a2_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      t8 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      if_block2.l(div5_nodes);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a0, "class", "logo");
      attr_dev(a0, "href", "/");
      add_location(a0, file$3, 100, 12, 4014);
      attr_dev(div0, "class", "pl-7 lg:pl-24 lg:pr-34 text-logo");
      add_location(div0, file$3, 99, 8, 3954);
      attr_dev(div1, "class", "flex lg:hidden items-center");
      add_location(div1, file$3, 103, 12, 4132);
      attr_dev(svg0, "class", "w-7 h-7 fill-current nav-icon svelte-1gp9sq0");
      attr_dev(svg0, "viewBox", "0 0 28 24");
      attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg0, file$3, 117, 16, 4656);
      attr_dev(button, "class", "focus:outline-none");
      add_location(button, file$3, 110, 12, 4381);
      attr_dev(div2, "class", "pr-6 lg:hidden flex -mt-2");
      add_location(div2, file$3, 102, 8, 4079);
      attr_dev(div3, "class", "w-full lg:w-auto flex justify-between items-center py-3");
      add_location(div3, file$3, 98, 4, 3875);
      attr_dev(path0, "d", "m.001 1.165v21.669c.052.661.601 1.177 1.271 1.177.225 0 .436-.058.62-.16l-.006.003 21.442-10.8c.4-.192.671-.593.671-1.058s-.271-.867-.664-1.055l-.007-.003-21.442-10.8c-.177-.099-.388-.157-.613-.157-.672 0-1.223.521-1.27 1.181v.004z");
      add_location(path0, file$3, 161, 24, 7041);
      attr_dev(svg1, "class", "fill-current play svelte-1gp9sq0");
      attr_dev(svg1, "viewBox", "0 0 24 24");
      attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg1, file$3, 157, 20, 6854);
      attr_dev(a1, "class", "nav-link-container lg:hover:text-shadow-link-hover\r\n                        border-l border-primary lg:border-none pl-3 svelte-1gp9sq0");
      attr_dev(a1, "href", "/play");
      attr_dev(a1, "rel", "prefetch");
      add_location(a1, file$3, 152, 16, 6610);
      attr_dev(path1, "d", "m14.416 24v-11.098h5.68c.181 0 .328.147.328.328v10.114c0 .362-.294.656-.656.656zm-12.096 0c-.362 0-.656-.294-.656-.656v-10.114c0-.181.147-.328.328-.328h5.621v11.098zm-1.992-12.08c-.181 0-.328-.147-.328-.328v-4.031c0-.181.147-.328.328-.328h6.546c-3.914-1.01-5.274-3.055-5.345-3.164-.066-.101-.106-.224-.106-.357 0-.362.294-.656.656-.656.23 0 .432.118.549.296l.002.002c.028.041 1.342 1.92 5.15 2.74-1.273-.64-2.518-1.529-2.847-2.673-.049-.187-.077-.401-.077-.622 0-.761.334-1.443.862-1.91l.003-.002c.425-.515 1.05-.851 1.755-.888h.006c1.714 0 2.904 2.391 3.583 4.309.749-1.87 2.037-4.252 3.74-4.252.741.039 1.388.41 1.799.966l.005.006c.48.464.779 1.113.779 1.832 0 .262-.04.515-.113.753l.005-.018c-.352 1.035-1.466 1.823-2.653 2.391 3.472-.872 4.675-2.61 4.69-2.633.12-.173.318-.286.541-.286.362 0 .656.294.656.656 0 .127-.036.246-.099.347l.002-.003c-.07.11-1.434 2.154-5.345 3.164h6.48c.181 0 .328.147.328.328v4.029c0 .181-.147.328-.328.328zm6.349-10.132c-.65.69-.524 1.127-.48 1.27.298 1.035 2.268 2.018 3.936 2.596-.871-2.955-2.053-4.342-2.65-4.342-.329.056-.609.229-.804.473zm5.315 3.791c1.692-.501 3.698-1.389 4.043-2.406.048-.142.194-.572-.422-1.291-.183-.271-.469-.461-.801-.513l-.007-.001c-.946 0-2.103 2.226-2.813 4.21z");
      add_location(path1, file$3, 175, 24, 7839);
      attr_dev(svg2, "class", "fill-current play svelte-1gp9sq0");
      attr_dev(svg2, "viewBox", "0 0 22 24");
      attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg2, file$3, 171, 20, 7652);
      attr_dev(a2, "class", "nav-link-container lg:hover:text-shadow-link-hover\r\n                        border-l border-primary lg:border-none pl-3 svelte-1gp9sq0");
      attr_dev(a2, "href", "/shop");
      attr_dev(a2, "rel", "prefetch");
      add_location(a2, file$3, 166, 16, 7408);
      attr_dev(div4, "class", "ml-7 links text-xl lg:flex");
      add_location(div4, file$3, 138, 12, 5897);
      attr_dev(div5, "class", "ml-7 mt-5 md:m-0 md:mr-7");
      add_location(div5, file$3, 182, 12, 9219);
      attr_dev(div6, "class", "pb-3 lg:p-0 sm:flex items-center w-full justify-between");
      add_location(div6, file$3, 137, 8, 5814);
      attr_dev(div7, "class", "lg:block w-full");
      toggle_class(div7, "hidden", !
      /*isNavbarOpen*/
      ctx[1]);
      add_location(div7, file$3, 136, 4, 5746);
      attr_dev(nav, "class", "shadow-link-hover fixed z-50 lg:flex items-center bg-background text-font w-full transition duration-300 border-b border-transparent");
      toggle_class(nav, "border-primary",
      /*isScrolling*/
      ctx[0]);
      add_location(nav, file$3, 95, 0, 3678);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, div3);
      append_dev(div3, div0);
      append_dev(div0, a0);
      append_dev(a0, t0);
      append_dev(div3, t1);
      append_dev(div3, div2);
      append_dev(div2, div1);
      if (if_block0) if_block0.m(div1, null);
      append_dev(div1, t2);
      mount_component(notifications, div1, null);
      append_dev(div2, t3);
      append_dev(div2, button);
      append_dev(button, svg0);
      if_block1.m(svg0, null);
      append_dev(nav, t4);
      append_dev(nav, div7);
      append_dev(div7, div6);
      append_dev(div6, div4);
      append_dev(div4, a1);
      append_dev(a1, svg1);
      append_dev(svg1, path0);
      append_dev(a1, t5);
      append_dev(div4, t6);
      append_dev(div4, a2);
      append_dev(a2, svg2);
      append_dev(svg2, path1);
      append_dev(a2, t7);
      append_dev(div6, t8);
      append_dev(div6, div5);
      if_blocks[current_block_type_index].m(div5, null);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(clickOutside_action = clickOutside.call(null, button)), listen_dev(button, "click_outside",
        /*click_outside_handler*/
        ctx[7], false, false, false), listen_dev(button, "click",
        /*click_handler*/
        ctx[8], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*informations*/
      ctx[4]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*informations*/
          16) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      var notifications_changes = {};
      if (dirty &
      /*notificationsObj*/
      32) notifications_changes.data =
      /*notificationsObj*/
      ctx[5];
      notifications.$set(notifications_changes);

      if (current_block_type !== (current_block_type = select_block_type(ctx))) {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);

        if (if_block1) {
          if_block1.c();
          if_block1.m(svg0, null);
        }
      }

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
        if_block2 = if_blocks[current_block_type_index];

        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block2.c();
        }

        transition_in(if_block2, 1);
        if_block2.m(div5, null);
      }

      if (dirty &
      /*isNavbarOpen*/
      2) {
        toggle_class(div7, "hidden", !
        /*isNavbarOpen*/
        ctx[1]);
      }

      if (dirty &
      /*isScrolling*/
      1) {
        toggle_class(nav, "border-primary",
        /*isScrolling*/
        ctx[0]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(notifications.$$.fragment, local);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(notifications.$$.fragment, local);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      if (if_block0) if_block0.d();
      destroy_component(notifications);
      if_block1.d();
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var isScrolling = $$props.isScrolling;
  var isNavbarOpen;
  var isUserLoggedIn;
  var userCoins;
  var informations;
  var notificationsObj = {};
  var user;
  var firstLoad = true;

  function calculatePropreties(value) {
    if (value.user) {
      $$invalidate(5, notificationsObj.notifications = value.user.notifications, notificationsObj);
      $$invalidate(5, notificationsObj.inGame = value.user.inGame, notificationsObj);
    }

    $$invalidate(2, isUserLoggedIn = value.user ? true : value.steam ? "steam" : false);
    $$invalidate(3, userCoins = value.user.coins);
    $$invalidate(6, user = value.steam);
    console.log("USER", isUserLoggedIn);
  }

  var resetNav = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(value) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $$invalidate(6, user = value.content);

              if (!(firstLoad === true)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", firstLoad = false);

            case 3:
              if (!(value.refresh === true)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              calculatePropreties(user);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function resetNav(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var unsubscribe = counter.subscribe(resetNav);
  onDestroy(unsubscribe);
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!user.then) {
              _context3.next = 4;
              break;
            }

            user.then( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(value) {
                return regenerator.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(value instanceof Error)) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt("return", goto("/status"));

                      case 2:
                        $$invalidate(6, user = value);
                        _context2.prev = 3;
                        _context2.t0 = $$invalidate;
                        _context2.next = 7;
                        return callApi("get", "/informations");

                      case 7:
                        _context2.t1 = informations = _context2.sent;
                        (0, _context2.t0)(4, _context2.t1);
                        $$invalidate(6, user = value.content);
                        _context2.next = 15;
                        break;

                      case 12:
                        _context2.prev = 12;
                        _context2.t2 = _context2["catch"](3);
                        goto("/status");

                      case 15:
                        calculatePropreties(value);

                      case 16:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[3, 12]]);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context3.next = 16;
            break;

          case 4:
            _context3.prev = 4;
            _context3.t0 = $$invalidate;
            _context3.next = 8;
            return callApi("get", "/informations");

          case 8:
            _context3.t1 = informations = _context3.sent;
            (0, _context3.t0)(4, _context3.t1);
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t2 = _context3["catch"](4);
            goto("/status");

          case 15:
            calculatePropreties();

          case 16:
            calculatePropreties();

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 12]]);
  })));
  var writable_props = ["isScrolling"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn("<Nav> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Nav", $$slots, []);

  var click_outside_handler = function click_outside_handler() {
    return $$invalidate(1, isNavbarOpen = false);
  };

  var click_handler = function click_handler() {
    $$invalidate(1, isNavbarOpen = !isNavbarOpen);
  };

  $$self.$$set = function ($$props) {
    if ("isScrolling" in $$props) $$invalidate(0, isScrolling = $$props.isScrolling);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      onDestroy: onDestroy,
      clickOutside: clickOutside,
      NavAccount: NavAccount,
      Notifications: NavNotifications,
      NavAlert: NavAlert,
      apiUrl: apiUrl,
      callApi: callApi,
      goto: goto,
      counter: counter,
      isScrolling: isScrolling,
      isNavbarOpen: isNavbarOpen,
      isUserLoggedIn: isUserLoggedIn,
      userCoins: userCoins,
      informations: informations,
      notificationsObj: notificationsObj,
      user: user,
      firstLoad: firstLoad,
      calculatePropreties: calculatePropreties,
      resetNav: resetNav,
      unsubscribe: unsubscribe
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("isScrolling" in $$props) $$invalidate(0, isScrolling = $$props.isScrolling);
    if ("isNavbarOpen" in $$props) $$invalidate(1, isNavbarOpen = $$props.isNavbarOpen);
    if ("isUserLoggedIn" in $$props) $$invalidate(2, isUserLoggedIn = $$props.isUserLoggedIn);
    if ("userCoins" in $$props) $$invalidate(3, userCoins = $$props.userCoins);
    if ("informations" in $$props) $$invalidate(4, informations = $$props.informations);
    if ("notificationsObj" in $$props) $$invalidate(5, notificationsObj = $$props.notificationsObj);
    if ("user" in $$props) $$invalidate(6, user = $$props.user);
    if ("firstLoad" in $$props) firstLoad = $$props.firstLoad;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [isScrolling, isNavbarOpen, isUserLoggedIn, userCoins, informations, notificationsObj, user, click_outside_handler, click_handler];
}

var Nav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Nav, _SvelteComponentDev);

  var _super = _createSuper$5(Nav);

  function Nav(options) {
    var _this;

    _classCallCheck(this, Nav);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      isScrolling: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Nav",
      options: options,
      id: create_fragment$4.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*isScrolling*/
    ctx[0] === undefined && !("isScrolling" in props)) {
      console_1$1.warn("<Nav> was created without expected prop 'isScrolling'");
    }

    return _this;
  }

  _createClass(Nav, [{
    key: "isScrolling",
    get: function get() {
      throw new Error_1("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Nav;
}(SvelteComponentDev);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "src\\components\\Footer.svelte";

function create_fragment$5(ctx) {
  var div13;
  var div12;
  var div7;
  var div1;
  var div0;
  var t0;
  var b0;
  var t1;
  var t2;
  var br;
  var t3;
  var b1;
  var t4;
  var t5;
  var div6;
  var div4;
  var div2;
  var h30;
  var t6;
  var t7;
  var a0;
  var t8;
  var t9;
  var a1;
  var t10;
  var t11;
  var div3;
  var h31;
  var t12;
  var t13;
  var a2;
  var t14;
  var t15;
  var a3;
  var t16;
  var t17;
  var div5;
  var h32;
  var t18;
  var t19;
  var a4;
  var t20;
  var t21;
  var a5;
  var t22;
  var t23;
  var div11;
  var div9;
  var div8;
  var a6;
  var t24;
  var t25;
  var p;
  var t26;
  var t27;
  var div10;
  var a7;
  var svg0;
  var path0;
  var t28;
  var a8;
  var svg1;
  var path1;
  var block = {
    c: function create() {
      div13 = element("div");
      div12 = element("div");
      div7 = element("div");
      div1 = element("div");
      div0 = element("div");
      t0 = text("Play\r\n                    ");
      b0 = element("b");
      t1 = text("Brawlhalla");
      t2 = space();
      br = element("br");
      t3 = text("\r\n                    Earn\r\n                    ");
      b1 = element("b");
      t4 = text("rewards");
      t5 = space();
      div6 = element("div");
      div4 = element("div");
      div2 = element("div");
      h30 = element("h3");
      t6 = text("Legal");
      t7 = space();
      a0 = element("a");
      t8 = text("Privacy");
      t9 = space();
      a1 = element("a");
      t10 = text("Legal notice");
      t11 = space();
      div3 = element("div");
      h31 = element("h3");
      t12 = text("Info");
      t13 = space();
      a2 = element("a");
      t14 = text("How\r\n                            does it work");
      t15 = space();
      a3 = element("a");
      t16 = text("Terms of use");
      t17 = space();
      div5 = element("div");
      h32 = element("h3");
      t18 = text("Company");
      t19 = space();
      a4 = element("a");
      t20 = text("Contact us");
      t21 = space();
      a5 = element("a");
      t22 = text("About");
      t23 = space();
      div11 = element("div");
      div9 = element("div");
      div8 = element("div");
      a6 = element("a");
      t24 = text("WINHALLA");
      t25 = space();
      p = element("p");
      t26 = text("© 2020");
      t27 = space();
      div10 = element("div");
      a7 = element("a");
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t28 = space();
      a8 = element("a");
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      div13 = claim_element(nodes, "DIV", {
        class: true
      });
      var div13_nodes = children(div13);
      div12 = claim_element(div13_nodes, "DIV", {});
      var div12_nodes = children(div12);
      div7 = claim_element(div12_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      div1 = claim_element(div7_nodes, "DIV", {});
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, "Play\r\n                    ");
      b0 = claim_element(div0_nodes, "B", {
        class: true
      });
      var b0_nodes = children(b0);
      t1 = claim_text(b0_nodes, "Brawlhalla");
      b0_nodes.forEach(detach_dev);
      t2 = claim_space(div0_nodes);
      br = claim_element(div0_nodes, "BR", {
        class: true
      });
      t3 = claim_text(div0_nodes, "\r\n                    Earn\r\n                    ");
      b1 = claim_element(div0_nodes, "B", {
        class: true
      });
      var b1_nodes = children(b1);
      t4 = claim_text(b1_nodes, "rewards");
      b1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t5 = claim_space(div7_nodes);
      div6 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h30 = claim_element(div2_nodes, "H3", {
        class: true
      });
      var h30_nodes = children(h30);
      t6 = claim_text(h30_nodes, "Legal");
      h30_nodes.forEach(detach_dev);
      t7 = claim_space(div2_nodes);
      a0 = claim_element(div2_nodes, "A", {
        href: true,
        class: true
      });
      var a0_nodes = children(a0);
      t8 = claim_text(a0_nodes, "Privacy");
      a0_nodes.forEach(detach_dev);
      t9 = claim_space(div2_nodes);
      a1 = claim_element(div2_nodes, "A", {
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t10 = claim_text(a1_nodes, "Legal notice");
      a1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t11 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h31 = claim_element(div3_nodes, "H3", {
        class: true
      });
      var h31_nodes = children(h31);
      t12 = claim_text(h31_nodes, "Info");
      h31_nodes.forEach(detach_dev);
      t13 = claim_space(div3_nodes);
      a2 = claim_element(div3_nodes, "A", {
        href: true,
        class: true
      });
      var a2_nodes = children(a2);
      t14 = claim_text(a2_nodes, "How\r\n                            does it work");
      a2_nodes.forEach(detach_dev);
      t15 = claim_space(div3_nodes);
      a3 = claim_element(div3_nodes, "A", {
        href: true,
        class: true
      });
      var a3_nodes = children(a3);
      t16 = claim_text(a3_nodes, "Terms of use");
      a3_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      t17 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      h32 = claim_element(div5_nodes, "H3", {
        class: true
      });
      var h32_nodes = children(h32);
      t18 = claim_text(h32_nodes, "Company");
      h32_nodes.forEach(detach_dev);
      t19 = claim_space(div5_nodes);
      a4 = claim_element(div5_nodes, "A", {
        href: true,
        class: true
      });
      var a4_nodes = children(a4);
      t20 = claim_text(a4_nodes, "Contact us");
      a4_nodes.forEach(detach_dev);
      t21 = claim_space(div5_nodes);
      a5 = claim_element(div5_nodes, "A", {
        href: true,
        class: true
      });
      var a5_nodes = children(a5);
      t22 = claim_text(a5_nodes, "About");
      a5_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      t23 = claim_space(div12_nodes);
      div11 = claim_element(div12_nodes, "DIV", {
        class: true
      });
      var div11_nodes = children(div11);
      div9 = claim_element(div11_nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      div8 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      a6 = claim_element(div8_nodes, "A", {
        class: true,
        href: true
      });
      var a6_nodes = children(a6);
      t24 = claim_text(a6_nodes, "WINHALLA");
      a6_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      t25 = claim_space(div9_nodes);
      p = claim_element(div9_nodes, "P", {
        class: true,
        style: true
      });
      var p_nodes = children(p);
      t26 = claim_text(p_nodes, "© 2020");
      p_nodes.forEach(detach_dev);
      div9_nodes.forEach(detach_dev);
      t27 = claim_space(div11_nodes);
      div10 = claim_element(div11_nodes, "DIV", {
        class: true
      });
      var div10_nodes = children(div10);
      a7 = claim_element(div10_nodes, "A", {
        href: true
      });
      var a7_nodes = children(a7);
      svg0 = claim_element(a7_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg0_nodes = children(svg0);
      path0 = claim_element(svg0_nodes, "path", {
        d: true
      }, 1);
      children(path0).forEach(detach_dev);
      svg0_nodes.forEach(detach_dev);
      a7_nodes.forEach(detach_dev);
      t28 = claim_space(div10_nodes);
      a8 = claim_element(div10_nodes, "A", {
        href: true
      });
      var a8_nodes = children(a8);
      svg1 = claim_element(a8_nodes, "svg", {
        class: true,
        viewBox: true,
        xmlns: true
      }, 1);
      var svg1_nodes = children(svg1);
      path1 = claim_element(svg1_nodes, "path", {
        d: true
      }, 1);
      children(path1).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      a8_nodes.forEach(detach_dev);
      div10_nodes.forEach(detach_dev);
      div11_nodes.forEach(detach_dev);
      div12_nodes.forEach(detach_dev);
      div13_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(b0, "class", "text-accent font-normal");
      add_location(b0, file$4, 8, 20, 351);
      attr_dev(br, "class", "sm:hidden lg:block");
      add_location(br, file$4, 10, 20, 424);
      attr_dev(b1, "class", "text-accent font-normal");
      add_location(b1, file$4, 12, 20, 505);
      attr_dev(div0, "class", "md:mr-14 lg:mr-34 text-4xl md:max-w-60");
      add_location(div0, file$4, 6, 16, 251);
      add_location(div1, file$4, 5, 12, 228);
      attr_dev(h30, "class", "text-primary");
      add_location(h30, file$4, 19, 24, 762);
      attr_dev(a0, "href", "/privacy");
      attr_dev(a0, "class", "block hover:text-shadow-link-hover");
      add_location(a0, file$4, 20, 24, 823);
      attr_dev(a1, "href", "/legal");
      attr_dev(a1, "class", "block hover:text-shadow-link-hover");
      add_location(a1, file$4, 23, 24, 980);
      attr_dev(div2, "class", "mr-8");
      add_location(div2, file$4, 18, 20, 718);
      attr_dev(h31, "class", "text-primary");
      add_location(h31, file$4, 28, 24, 1216);
      attr_dev(a2, "href", "/help");
      attr_dev(a2, "class", "block hover:text-shadow-link-hover");
      add_location(a2, file$4, 29, 24, 1276);
      attr_dev(a3, "href", "/terms");
      attr_dev(a3, "class", "block hover:text-shadow-link-hover");
      add_location(a3, file$4, 31, 24, 1410);
      attr_dev(div3, "class", "ml-8 lg:mx-8");
      add_location(div3, file$4, 27, 20, 1164);
      attr_dev(div4, "class", "flex");
      add_location(div4, file$4, 17, 16, 678);
      attr_dev(h32, "class", "text-primary");
      add_location(h32, file$4, 37, 20, 1670);
      attr_dev(a4, "href", "/contact");
      attr_dev(a4, "class", "block hover:text-shadow-link-hover");
      add_location(a4, file$4, 38, 20, 1729);
      attr_dev(a5, "href", "/about");
      attr_dev(a5, "class", "block hover:text-shadow-link-hover");
      add_location(a5, file$4, 41, 20, 1877);
      attr_dev(div5, "class", "mt-8 lg:mt-0 lg:ml-8");
      add_location(div5, file$4, 36, 16, 1614);
      attr_dev(div6, "class", "lg:flex justify-center mt-8 md:mt-0");
      add_location(div6, file$4, 16, 12, 611);
      attr_dev(div7, "class", "flex flex-col items-center md:flex-row md:items-start justify-center");
      add_location(div7, file$4, 4, 8, 132);
      attr_dev(a6, "class", "logo leading-0");
      attr_dev(a6, "href", "/");
      add_location(a6, file$4, 50, 20, 2231);
      attr_dev(div8, "class", "text-logo");
      add_location(div8, file$4, 49, 16, 2186);
      attr_dev(p, "class", "text-lg ml-3");
      set_style(p, "padding-bottom", "0.2rem");
      add_location(p, file$4, 52, 16, 2322);
      attr_dev(div9, "class", "flex items-end");
      add_location(div9, file$4, 48, 12, 2140);
      attr_dev(path0, "d", "m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z");
      add_location(path0, file$4, 58, 24, 2616);
      attr_dev(svg0, "class", "w-5 fill-current");
      attr_dev(svg0, "viewBox", "0 0 21 24");
      attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg0, file$4, 57, 20, 2505);
      attr_dev(a7, "href", "");
      add_location(a7, file$4, 56, 16, 2472);
      attr_dev(path1, "d", "m29.55 2.85c-.841 1.224-1.848 2.26-3.004 3.106l-.036.025q.018.262.018.787c-.004 1.736-.264 3.41-.745 4.987l.032-.122c-.534 1.773-1.272 3.32-2.206 4.724l.04-.065c-.989 1.509-2.132 2.808-3.435 3.927l-.024.02c-1.372 1.153-2.978 2.083-4.73 2.704l-.108.033c-1.765.648-3.803 1.022-5.928 1.022-.045 0-.09 0-.134 0h.007c-.038 0-.082 0-.127 0-3.41 0-6.584-1.015-9.234-2.76l.063.039c.419.048.904.075 1.396.075h.07-.004c.037 0 .082.001.126.001 2.807 0 5.386-.975 7.417-2.606l-.023.018c-2.639-.05-4.861-1.777-5.65-4.157l-.012-.043c.342.057.738.091 1.141.094h.003c.567 0 1.116-.075 1.637-.216l-.044.01c-1.412-.284-2.615-1.034-3.47-2.08l-.008-.011c-.858-1.011-1.379-2.331-1.379-3.773 0-.028 0-.056.001-.084v.004-.075c.788.452 1.726.732 2.727.768h.011c-.822-.553-1.487-1.279-1.953-2.129l-.016-.031c-.46-.835-.731-1.83-.731-2.889 0-1.126.306-2.18.84-3.084l-.015.028c1.5 1.839 3.337 3.341 5.425 4.427l.095.045c2.022 1.067 4.402 1.743 6.927 1.864l.038.001c-.093-.415-.147-.892-.149-1.382v-.001c.004-3.345 2.717-6.055 6.062-6.055 1.74 0 3.309.733 4.415 1.908l.003.003c1.448-.284 2.735-.792 3.893-1.492l-.053.03c-.455 1.431-1.4 2.596-2.635 3.323l-.028.015c1.294-.148 2.475-.479 3.569-.967l-.077.031z");
      add_location(path1, file$4, 64, 24, 4242);
      attr_dev(svg1, "class", "ml-4 w-6 fill-current");
      attr_dev(svg1, "viewBox", "0 0 30 24");
      attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg1, file$4, 63, 20, 4126);
      attr_dev(a8, "href", "");
      add_location(a8, file$4, 62, 16, 4093);
      attr_dev(div10, "class", "flex items-center");
      add_location(div10, file$4, 55, 12, 2423);
      attr_dev(div11, "class", "mt-10 flex justify-between items-center w-full");
      add_location(div11, file$4, 47, 8, 2066);
      add_location(div12, file$4, 3, 4, 117);
      attr_dev(div13, "class", "w-full pt-12 pb-6\r\n             bg-variant text-font text-default flex flex-col items-center");
      add_location(div13, file$4, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div13, anchor);
      append_dev(div13, div12);
      append_dev(div12, div7);
      append_dev(div7, div1);
      append_dev(div1, div0);
      append_dev(div0, t0);
      append_dev(div0, b0);
      append_dev(b0, t1);
      append_dev(div0, t2);
      append_dev(div0, br);
      append_dev(div0, t3);
      append_dev(div0, b1);
      append_dev(b1, t4);
      append_dev(div7, t5);
      append_dev(div7, div6);
      append_dev(div6, div4);
      append_dev(div4, div2);
      append_dev(div2, h30);
      append_dev(h30, t6);
      append_dev(div2, t7);
      append_dev(div2, a0);
      append_dev(a0, t8);
      append_dev(div2, t9);
      append_dev(div2, a1);
      append_dev(a1, t10);
      append_dev(div4, t11);
      append_dev(div4, div3);
      append_dev(div3, h31);
      append_dev(h31, t12);
      append_dev(div3, t13);
      append_dev(div3, a2);
      append_dev(a2, t14);
      append_dev(div3, t15);
      append_dev(div3, a3);
      append_dev(a3, t16);
      append_dev(div6, t17);
      append_dev(div6, div5);
      append_dev(div5, h32);
      append_dev(h32, t18);
      append_dev(div5, t19);
      append_dev(div5, a4);
      append_dev(a4, t20);
      append_dev(div5, t21);
      append_dev(div5, a5);
      append_dev(a5, t22);
      append_dev(div12, t23);
      append_dev(div12, div11);
      append_dev(div11, div9);
      append_dev(div9, div8);
      append_dev(div8, a6);
      append_dev(a6, t24);
      append_dev(div9, t25);
      append_dev(div9, p);
      append_dev(p, t26);
      append_dev(div11, t27);
      append_dev(div11, div10);
      append_dev(div10, a7);
      append_dev(a7, svg0);
      append_dev(svg0, path0);
      append_dev(div10, t28);
      append_dev(div10, a8);
      append_dev(a8, svg1);
      append_dev(svg1, path1);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div13);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Footer> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Footer", $$slots, []);
  return [];
}

var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Footer, _SvelteComponentDev);

  var _super = _createSuper$6(Footer);

  function Footer(options) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Footer",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  return Footer;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "src\\routes\\_layout.svelte";

var get_default_slot_changes = function get_default_slot_changes(dirty) {
  return {};
};

var get_default_slot_context = function get_default_slot_context(ctx) {
  return {
    class: "flex-grow bg-background block-grow"
  };
};

function create_fragment$6(ctx) {
  var scrolling = false;

  var clear_scrolling = function clear_scrolling() {
    scrolling = false;
  };

  var scrolling_timeout;
  var tailwindcss;
  var t0;
  var t1;
  var div;
  var nav;
  var t2;
  var main;
  var t3;
  var footer;
  var current;
  var mounted;
  var dispose;
  add_render_callback(
  /*onwindowscroll*/
  ctx[3]);
  tailwindcss = new Tailwindcss({
    $$inline: true
  });
  nav = new Nav({
    props: {
      isScrolling:
      /*scrollY*/
      ctx[0] > 0
    },
    $$inline: true
  });
  var default_slot_template =
  /*$$slots*/
  ctx[2].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[1], get_default_slot_context);
  footer = new Footer({
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(tailwindcss.$$.fragment);
      t0 = space();
      t1 = space();
      div = element("div");
      create_component(nav.$$.fragment);
      t2 = space();
      main = element("main");
      if (default_slot) default_slot.c();
      t3 = space();
      create_component(footer.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      claim_component(tailwindcss.$$.fragment, nodes);
      t0 = claim_space(nodes);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(nav.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      claim_component(footer.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(main, "class", "text-font text-default min-h-screen h-full svelte-1gfft8c");
      add_location(main, file$5, 73, 4, 3599);
      attr_dev(div, "class", "font w-full bg-background min-h-screen h-full flex flex-col svelte-1gfft8c");
      add_location(div, file$5, 70, 0, 3479);
    },
    m: function mount(target, anchor) {
      mount_component(tailwindcss, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);
      mount_component(nav, div, null);
      append_dev(div, t2);
      append_dev(div, main);

      if (default_slot) {
        default_slot.m(main, null);
      }

      append_dev(div, t3);
      mount_component(footer, div, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(window, "scroll", function () {
          scrolling = true;
          clearTimeout(scrolling_timeout);
          scrolling_timeout = setTimeout(clear_scrolling, 100);
          /*onwindowscroll*/

          ctx[3]();
        });
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*scrollY*/
      1 && !scrolling) {
        scrolling = true;
        clearTimeout(scrolling_timeout);
        scrollTo(window.pageXOffset,
        /*scrollY*/
        ctx[0]);
        scrolling_timeout = setTimeout(clear_scrolling, 100);
      }

      var nav_changes = {};
      if (dirty &
      /*scrollY*/
      1) nav_changes.isScrolling =
      /*scrollY*/
      ctx[0] > 0;
      nav.$set(nav_changes);

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[1], dirty, get_default_slot_changes, get_default_slot_context);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(tailwindcss.$$.fragment, local);
      transition_in(nav.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tailwindcss.$$.fragment, local);
      transition_out(nav.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tailwindcss, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_component(nav);
      if (default_slot) default_slot.d(detaching);
      destroy_component(footer);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var scrollY = 0;
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", $$slots, ['default']);

  function onwindowscroll() {
    $$invalidate(0, scrollY = window.pageYOffset);
  }

  $$self.$$set = function ($$props) {
    if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Tailwindcss: Tailwindcss,
      Nav: Nav,
      Footer: Footer,
      scrollY: scrollY
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("scrollY" in $$props) $$invalidate(0, scrollY = $$props.scrollY);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [scrollY, $$scope, $$slots, onwindowscroll];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$7(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }

  return Layout;
}(SvelteComponentDev);

var root_comp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Layout
});

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;
var file$6 = "src\\routes\\_error.svelte"; // (37:0) {#if dev && error.stack}

function create_if_block$2(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file$6, 37, 1, 1238);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(37:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block$2(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-c7h4wd");
      add_location(h1, file$6, 32, 0, 1164);
      attr_dev(p, "class", "svelte-c7h4wd");
      add_location(p, file$6, 34, 0, 1185);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$2(ctx);
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Error", $$slots, []);

  $$self.$$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$8(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$7.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$2 = globals.Error;

function create_else_block$2(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx: ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block$3(ctx) {
  var error_1;
  var current;
  error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$3, create_else_block$2];
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
    p: function update(ctx, dirty) {
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$8(ctx) {
  var layout;
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("App", $$slots, []);

  $$self.$$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      notify: notify
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper$9(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment$8.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [];
var components = [{
  js: function js() {
    return import('./index.c4821dee.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:index.svelte__"
}, {
  js: function js() {
    return import('./create-account.13de91b3.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:create-account.svelte__"
}, {
  js: function js() {
    return import('./change-email.8e3b7eb8.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:change-email.svelte__"
}, {
  js: function js() {
    return import('./contact.6f78e78f.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:contact.svelte__"
}, {
  js: function js() {
    return import('./privacy.8bdee12a.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:privacy.svelte__"
}, {
  js: function js() {
    return import('./status.735f7aef.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:status.svelte__"
}, {
  js: function js() {
    return import('./about.3bef9822.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:about.svelte__"
}, {
  js: function js() {
    return import('./terms.2ca97b8e.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:terms.svelte__"
}, {
  js: function js() {
    return import('./tests.cdd767d3.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:tests.svelte__"
}, {
  js: function js() {
    return import('./help.d5804d10.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:help.svelte__"
}, {
  js: function js() {
    return import('./[id].cdc98860.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:link/[id].svelte__"
}, {
  js: function js() {
    return import('./index.8d81bc96.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:play/index.svelte__"
}, {
  js: function js() {
    return import('./index.5d6c7036.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:play/ffa/index.svelte__"
}, {
  js: function js() {
    return import('./[id].c8e158a0.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:play/ffa/[id].svelte__"
}, {
  js: function js() {
    return import('./shop.aa20239f.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:shop.svelte__"
}, {
  js: function js() {
    return import('./test.063a861a.js');
  },
  css: "__SAPPER_CSS_PLACEHOLDER:test.svelte__"
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // create-account.svelte
    pattern: /^\/create-account\/?$/,
    parts: [{
      i: 1
    }]
  }, {
    // change-email.svelte
    pattern: /^\/change-email\/?$/,
    parts: [{
      i: 2
    }]
  }, {
    // contact.svelte
    pattern: /^\/contact\/?$/,
    parts: [{
      i: 3
    }]
  }, {
    // privacy.svelte
    pattern: /^\/privacy\/?$/,
    parts: [{
      i: 4
    }]
  }, {
    // status.svelte
    pattern: /^\/status\/?$/,
    parts: [{
      i: 5
    }]
  }, {
    // about.svelte
    pattern: /^\/about\/?$/,
    parts: [{
      i: 6
    }]
  }, {
    // terms.svelte
    pattern: /^\/terms\/?$/,
    parts: [{
      i: 7
    }]
  }, {
    // tests.svelte
    pattern: /^\/tests\/?$/,
    parts: [{
      i: 8
    }]
  }, {
    // help.svelte
    pattern: /^\/help\/?$/,
    parts: [{
      i: 9
    }]
  }, {
    // link/[id].svelte
    pattern: /^\/link\/([^\/]+?)\/?$/,
    parts: [null, {
      i: 10,
      params: function params(match) {
        return {
          id: d(match[1])
        };
      }
    }]
  }, {
    // play/index.svelte
    pattern: /^\/play\/?$/,
    parts: [{
      i: 11
    }]
  }, {
    // play/ffa/index.svelte
    pattern: /^\/play\/ffa\/?$/,
    parts: [null, {
      i: 12
    }]
  }, {
    // play/ffa/[id].svelte
    pattern: /^\/play\/ffa\/([^\/]+?)\/?$/,
    parts: [null, null, {
      i: 13,
      params: function params(match) {
        return {
          id: d(match[1])
        };
      }
    }]
  }, {
    // shop.svelte
    pattern: /^\/shop\/?$/,
    parts: [{
      i: 14
    }]
  }, {
    // test.svelte
    pattern: /^\/test\/?$/,
    parts: [{
      i: 15
    }]
  }];
}(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    noscroll: false,
    replaceState: false
  };
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null, opts.noscroll).then(function () {});
  }

  location.href = href;
  return new Promise(function (f) {}); // never resolves
}

function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(function (new_value) {
      if (old_value === undefined || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }

  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(function (value) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    var dest, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $session = value;

            if (ready) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            session_dirty = true;
            dest = select_target(new URL(location.href));
            token = current_token = {};
            _context.next = 8;
            return hydrate_target(dest);

          case 8:
            _yield$hydrate_target = _context.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            if (!redirect) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return goto(redirect.location, {
              replaceState: true
            });

          case 17:
            _context.next = 21;
            break;

          case 19:
            _context.next = 21;
            return render(branch, props, dest.page);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
});
var prefetching = null;

function set_prefetching(href, promise) {
  prefetching = {
    href: href,
    promise: promise
  };
}

var target;

function set_target(element) {
  target = element;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState(state, title, href) {},
  replaceState: function replaceState(state, title, href) {},
  scrollRestoration: ''
};

var scroll_history = {};

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(initial_data.baseUrl)) return null;
  var path = url.pathname.slice(initial_data.baseUrl.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

function handle_error(url) {
  var _location = location,
      host = _location.host,
      pathname = _location.pathname,
      search = _location.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render([], props, {
    host: host,
    path: pathname,
    query: query,
    params: {}
  });
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function navigate(dest, id, noscroll, hash) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
    var current_scroll, loaded, token, loaded_result, redirect, props, branch, scroll, deep_linked;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (id) {
              // popstate or initial navigation
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              id = cid = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            cid = id;
            if (root_component) stores.preloading.set(true);
            loaded = prefetching && prefetching.href === dest.href ? prefetching.promise : hydrate_target(dest);
            prefetching = null;
            token = current_token = {};
            _context2.next = 8;
            return loaded;

          case 8:
            loaded_result = _context2.sent;
            redirect = loaded_result.redirect;

            if (!(token !== current_token)) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return");

          case 12:
            if (!redirect) {
              _context2.next = 17;
              break;
            }

            _context2.next = 15;
            return goto(redirect.location, {
              replaceState: true
            });

          case 15:
            _context2.next = 20;
            break;

          case 17:
            props = loaded_result.props, branch = loaded_result.branch;
            _context2.next = 20;
            return render(branch, props, dest.page);

          case 20:
            if (document.activeElement && document.activeElement instanceof HTMLElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top + scrollY
                  };
                }
              }

              scroll_history[cid] = scroll;
              if (scroll) scrollTo(scroll.x, scroll.y);
            }

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}

function render(branch, props, page) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context3.next = 6;
              break;
            }

            root_component.$set(props);
            _context3.next = 13;
            break;

          case 6:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context3.next = 9;
            return root_preloaded;

          case 9:
            _context3.t0 = _context3.sent;
            props.level0 = {
              props: _context3.t0
            };
            props.notify = stores.page.notify;
            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 13:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(dest) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
    var _this = this;

    var route, page, segments, _redirect, props, preload_context, root_preload, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = dest.route, page = dest.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x, _x2) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error("Conflicting redirects");
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preload = undefined || function () {};

              root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context5.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context5.next = 13;
            return Promise.all(route.parts.map(function (part, i) {
              return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
                var segment, j, _yield$load_component, component, preload, preloaded;

                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context4.next = 5;
                          break;
                        }

                        return _context4.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context4.next = 8;
                          break;
                        }

                        return _context4.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context4.next = 11;
                        return load_component(components[part.i]);

                      case 11:
                        _yield$load_component = _context4.sent;
                        component = _yield$load_component.default;
                        preload = _yield$load_component.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context4.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(dest.match) : {}
                        }, $session);

                      case 18:
                        _context4.t0 = _context4.sent;
                        _context4.next = 22;
                        break;

                      case 21:
                        _context4.t0 = {};

                      case 22:
                        preloaded = _context4.t0;
                        _context4.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context4.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
            }));

          case 13:
            branch = _context5.sent;
            _context5.next = 21;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](7);
            props.error = _context5.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context5.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 16]]);
  }));
}

function load_css(chunk) {
  var href = "client/".concat(chunk);
  if (document.querySelector("link[href=\"".concat(href, "\"]"))) return;
  return new Promise(function (fulfil, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = function () {
      return fulfil();
    };

    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function load_component(component) {
  // TODO this is temporary — once placeholders are
  // always rewritten, scratch the ternary
  var promises = typeof component.css === 'string' ? [] : component.css.map(load_css);
  promises.unshift(component.js());
  return Promise.all(promises).then(function (values) {
    return values[0];
  });
}

function prefetch(href) {
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      set_prefetching(href, hydrate_target(target));
    }

    return prefetching.promise;
  }
}

function start(opts) {
  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  set_target(opts.target);
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate); // prefetch

  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
  return Promise.resolve().then(function () {
    var _location2 = location,
        hash = _location2.hash,
        href = _location2.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var url = new URL(location.href);
    if (initial_data.error) return handle_error();
    var target = select_target(url);
    if (target) return navigate(target, uid, true, hash);
  });
}

var mousemove_timeout;

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (!a || a.rel !== 'prefetch') return;
  prefetch(a.href);
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper:noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      // eslint-disable-next-line
      location.href = location.href; // nosonar
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

start({
  target: document.querySelector('#sapper')
});

export { mount_component as $, _createClass as A, globals as B, _slicedToArray as C, onMount as D, counter as E, callApi as F, tick as G, goto as H, set_data_dev as I, toggle_class as J, set_input_value as K, listen_dev as L, prop_dev as M, run_all as N, validate_each_argument as O, action_destroyer as P, clickOutside as Q, destroy_each as R, SvelteComponentDev as S, empty as T, getUser as U, validate_store as V, component_subscribe as W, set_style as X, create_component as Y, claim_component as Z, _inherits as _, _getPrototypeOf as a, transition_in as a0, transition_out as a1, destroy_component as a2, _toConsumableArray as a3, check_outros as a4, group_outros as a5, bubble as a6, _typeof as a7, createCommonjsModule as a8, getCjsExportFromNamespace as a9, _possibleConstructorReturn as b, _classCallCheck as c, _assertThisInitialized as d, dispatch_dev as e, element as f, space as g, svg_element as h, init as i, claim_element as j, detach_dev as k, claim_space as l, children as m, claim_text as n, attr_dev as o, add_location as p, query_selector_all as q, append_dev as r, safe_not_equal as s, text as t, insert_dev as u, noop as v, validate_slots as w, apiUrl as x, _asyncToGenerator as y, regenerator as z };
