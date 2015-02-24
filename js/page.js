(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)return a(o, !0);
                if (i)return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        "use strict";
        var loadScripts = require("./load-scripts"), polyfillsNeeded = [];
        window.Promise || polyfillsNeeded.push("js/promise-polyfill.js"), /(iPhone|iPad);/.test(navigator.userAgent) && polyfillsNeeded.push("js/fastclick.js"), loadScripts(polyfillsNeeded, function () {
            require("regenerator/runtime"), new (require("./main-controller"))
        }, function () {
            console.error("Failed to load polyfills")
        });
//# sourceMappingURL=out.js.map

    }, {"./load-scripts": 5, "./main-controller": 6, "regenerator/runtime": 3}],
    2: [function (require, module, exports) {
        function EventEmitter() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function isFunction(e) {
            return "function" == typeof e
        }

        function isNumber(e) {
            return "number" == typeof e
        }

        function isObject(e) {
            return "object" == typeof e && null !== e
        }

        function isUndefined(e) {
            return void 0 === e
        }

        module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function (e) {
            if (!isNumber(e) || 0 > e || isNaN(e))throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, EventEmitter.prototype.emit = function (e) {
            var t, n, s, i, r, o;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                if (t = arguments[1], t instanceof Error)throw t;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (n = this._events[e], isUndefined(n))return !1;
            if (isFunction(n))switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (s = arguments.length, i = new Array(s - 1), r = 1; s > r; r++)i[r - 1] = arguments[r];
                    n.apply(this, i)
            } else if (isObject(n)) {
                for (s = arguments.length, i = new Array(s - 1), r = 1; s > r; r++)i[r - 1] = arguments[r];
                for (o = n.slice(), s = o.length, r = 0; s > r; r++)o[r].apply(this, i)
            }
            return !0
        }, EventEmitter.prototype.addListener = function (e, t) {
            var n;
            if (!isFunction(t))throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, isFunction(t.listener) ? t.listener : t), this._events[e] ? isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, isObject(this._events[e]) && !this._events[e].warned) {
                var n;
                n = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function (e, t) {
            function n() {
                this.removeListener(e, n), s || (s = !0, t.apply(this, arguments))
            }

            if (!isFunction(t))throw TypeError("listener must be a function");
            var s = !1;
            return n.listener = t, this.on(e, n), this
        }, EventEmitter.prototype.removeListener = function (e, t) {
            var n, s, i, r;
            if (!isFunction(t))throw TypeError("listener must be a function");
            if (!this._events || !this._events[e])return this;
            if (n = this._events[e], i = n.length, s = -1, n === t || isFunction(n.listener) && n.listener === t)delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (isObject(n)) {
                for (r = i; r-- > 0;)if (n[r] === t || n[r].listener && n[r].listener === t) {
                    s = r;
                    break
                }
                if (0 > s)return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(s, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, EventEmitter.prototype.removeAllListeners = function (e) {
            var t, n;
            if (!this._events)return this;
            if (!this._events.removeListener)return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[e], isFunction(n))this.removeListener(e, n); else for (; n.length;)this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, EventEmitter.prototype.listeners = function (e) {
            var t;
            return t = this._events && this._events[e] ? isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, EventEmitter.listenerCount = function (e, t) {
            var n;
            return n = e._events && e._events[t] ? isFunction(e._events[t]) ? 1 : e._events[t].length : 0
        };
    }, {}],
    3: [function (require, module, exports) {
        (function (global) {
            !function (t) {
                "use strict";
                function r(t, r, e, n) {
                    return new i(t, r, e || null, n || [])
                }

                function e(t, r, e) {
                    try {
                        return {type: "normal", arg: t.call(r, e)}
                    } catch (n) {
                        return {type: "throw", arg: n}
                    }
                }

                function n() {
                }

                function o() {
                }

                function i(t, r, n, o) {
                    function i(r, o) {
                        if (u === w)throw new Error("Generator is already running");
                        if (u === m)return f();
                        for (; ;) {
                            var i = c.delegate;
                            if (i) {
                                var a = e(i.iterator[r], i.iterator, o);
                                if ("throw" === a.type) {
                                    c.delegate = null, r = "throw", o = a.arg;
                                    continue
                                }
                                r = "next", o = s;
                                var l = a.arg;
                                if (!l.done)return u = g, l;
                                c[i.resultName] = l.value, c.next = i.nextLoc, c.delegate = null
                            }
                            if ("next" === r) {
                                if (u === d && "undefined" != typeof o)throw new TypeError("attempt to send " + JSON.stringify(o) + " to newborn generator");
                                u === g ? c.sent = o : delete c.sent
                            } else if ("throw" === r) {
                                if (u === d)throw u = m, o;
                                c.dispatchException(o) && (r = "next", o = s)
                            } else"return" === r && c.abrupt("return", o);
                            u = w;
                            var a = e(t, n, c);
                            if ("normal" === a.type) {
                                u = c.done ? m : g;
                                var l = {value: a.arg, done: c.done};
                                if (a.arg !== L)return l;
                                c.delegate && "next" === r && (o = s)
                            } else"throw" === a.type && (u = m, "next" === r ? c.dispatchException(a.arg) : o = a.arg)
                        }
                    }

                    var a = r ? Object.create(r.prototype) : this, c = new l(o), u = d;
                    return a.next = i.bind(a, "next"), a["throw"] = i.bind(a, "throw"), a["return"] = i.bind(a, "return"), a
                }

                function a(t) {
                    var r = {tryLoc: t[0]};
                    1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r)
                }

                function c(t) {
                    var r = t.completion || {};
                    r.type = "normal", delete r.arg, t.completion = r
                }

                function l(t) {
                    this.tryEntries = [{tryLoc: "root"}], t.forEach(a, this), this.reset()
                }

                function u(t) {
                    if (t) {
                        var r = t[p];
                        if (r)return r.call(t);
                        if ("function" == typeof t.next)return t;
                        if (!isNaN(t.length)) {
                            var e = -1, n = function o() {
                                for (; ++e < t.length;)if (h.call(t, e))return o.value = t[e], o.done = !1, o;
                                return o.value = s, o.done = !0, o
                            };
                            return n.next = n
                        }
                    }
                    return {next: f}
                }

                function f() {
                    return {value: s, done: !0}
                }

                var s, h = Object.prototype.hasOwnProperty, p = "function" == typeof Symbol && Symbol.iterator || "@@iterator", y = "object" == typeof module, v = t.regeneratorRuntime;
                if (v)return void(y && (module.exports = v));
                v = t.regeneratorRuntime = y ? module.exports : {}, v.wrap = r;
                var d = "suspendedStart", g = "suspendedYield", w = "executing", m = "completed", L = {}, x = o.prototype = i.prototype;
                n.prototype = x.constructor = o, o.constructor = n, n.displayName = "GeneratorFunction", v.isGeneratorFunction = function (t) {
                    var r = "function" == typeof t && t.constructor;
                    return r ? r === n || "GeneratorFunction" === (r.displayName || r.name) : !1
                }, v.mark = function (t) {
                    return t.__proto__ = o, t.prototype = Object.create(x), t
                }, v.async = function (t, n, o, i) {
                    return new Promise(function (a, c) {
                        function l(t) {
                            var r = e(this, null, t);
                            if ("throw" === r.type)return void c(r.arg);
                            var n = r.arg;
                            n.done ? a(n.value) : Promise.resolve(n.value).then(f, s)
                        }

                        var u = r(t, n, o, i), f = l.bind(u.next), s = l.bind(u["throw"]);
                        f()
                    })
                }, x[p] = function () {
                    return this
                }, x.toString = function () {
                    return "[object Generator]"
                }, v.keys = function (t) {
                    var r = [];
                    for (var e in t)r.push(e);
                    return r.reverse(), function n() {
                        for (; r.length;) {
                            var e = r.pop();
                            if (e in t)return n.value = e, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
                }, v.values = u, l.prototype = {
                    constructor: l, reset: function () {
                        this.prev = 0, this.next = 0, this.sent = s, this.done = !1, this.delegate = null, this.tryEntries.forEach(c);
                        for (var t, r = 0; h.call(this, t = "t" + r) || 20 > r; ++r)this[t] = null
                    }, stop: function () {
                        this.done = !0;
                        var t = this.tryEntries[0], r = t.completion;
                        if ("throw" === r.type)throw r.arg;
                        return this.rval
                    }, dispatchException: function (t) {
                        function r(r, n) {
                            return i.type = "throw", i.arg = t, e.next = r, !!n
                        }

                        if (this.done)throw t;
                        for (var e = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                            var o = this.tryEntries[n], i = o.completion;
                            if ("root" === o.tryLoc)return r("end");
                            if (o.tryLoc <= this.prev) {
                                var a = h.call(o, "catchLoc"), c = h.call(o, "finallyLoc");
                                if (a && c) {
                                    if (this.prev < o.catchLoc)return r(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc)return r(o.finallyLoc)
                                } else if (a) {
                                    if (this.prev < o.catchLoc)return r(o.catchLoc, !0)
                                } else {
                                    if (!c)throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc)return r(o.finallyLoc)
                                }
                            }
                        }
                    }, abrupt: function (t, r) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc <= this.prev && h.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                var o = n;
                                break
                            }
                        }
                        o && ("break" === t || "continue" === t) && o.tryLoc <= r && r < o.finallyLoc && (o = null);
                        var i = o ? o.completion : {};
                        return i.type = t, i.arg = r, o ? this.next = o.finallyLoc : this.complete(i), L
                    }, complete: function (t, r) {
                        if ("throw" === t.type)throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = t.arg, this.next = "end") : "normal" === t.type && r && (this.next = r), L
                    }, finish: function (t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var e = this.tryEntries[r];
                            if (e.finallyLoc === t)return this.complete(e.completion, e.afterLoc)
                        }
                    }, "catch": function (t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var e = this.tryEntries[r];
                            if (e.tryLoc === t) {
                                var n = e.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    c(e)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    }, delegateYield: function (t, r, e) {
                        return this.delegate = {iterator: u(t), resultName: r, nextLoc: e}, L
                    }
                }
            }("object" == typeof global ? global : "object" == typeof window ? window : this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    4: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, _get = function e(t, r, o) {
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (void 0 === i) {
                var n = Object.getPrototypeOf(t);
                return null === n ? void 0 : e(n, r, o)
            }
            if ("value"in i && i.writable)return i.value;
            var u = i.get;
            return void 0 === u ? void 0 : u.call(o)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, Gzip = function (e) {
            function t() {
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/gzip-worker.js")
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                compress: {
                    value: function (e) {
                        return this._requestResponse({data: e})
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("./worker-messenger"));
        module.exports = Gzip;
//# sourceMappingURL=out.js.map

    }, {"./worker-messenger": 29}],
    5: [function (require, module, exports) {
        "use strict";
        module.exports = function (e, n, t) {
            var o = e.length, r = !1;
            return 0 == e.length ? n() : void e.forEach(function (e) {
                var c = document.createElement("script");
                c.onload = function () {
                    r || --o || n()
                }, c.onerror = function () {
                    r || (t(), r = !0)
                }, c.src = e, document.head.insertBefore(c, document.head.firstChild)
            })
        };
//# sourceMappingURL=out.js.map

    }, {}],
    6: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, n) {
            t && Object.defineProperties(e, t), n && Object.defineProperties(e.prototype, n)
        }, utils = require("./utils"), svgo = new (require("./svgo")), storage = require("../utils/storage"), SvgFile = require("./svg-file"), MainController = function () {
            function e() {
                var e = this;
                this._container = null, this._mainUi = null, this._outputUi = new (require("./ui/output")), this._downloadButtonUi = new (require("./ui/download-button")), this._resultsUi = new (require("./ui/results")), this._settingsUi = new (require("./ui/settings")), this._mainMenuUi = new (require("./ui/main-menu")), this._toastsUi = new (require("./ui/toasts")), this._dropUi = new (require("./ui/file-drop")), this._preloaderUi = new (require("./ui/preloader")), this._changelogUi = new (require("./ui/changelog"))(self.version), this._resultsContainerUi = new (require("./ui/results-container"))(this._resultsUi), this._viewTogglerUi = new (require("./ui/view-toggler")), this._settingsUi.on("change", function () {
                    return e._onSettingsChange()
                }), this._mainMenuUi.on("svgDataLoad", function (t) {
                    return e._onInputChange(t)
                }), this._dropUi.on("svgDataLoad", function (t) {
                    return e._onInputChange(t)
                }), this._mainMenuUi.on("error", function (t) {
                    var n = t.error;
                    return e._handleError(n)
                }), this._viewTogglerUi.on("change", function (t) {
                    return e._onViewSelectionChange(t)
                }), this._inputFilename = "image.svg", this._inputSvg = null, this._cache = new (require("./results-cache"))(10), this._latestCompressJobId = 0, this._userHasInteracted = !1, "serviceWorker"in navigator && navigator.serviceWorker.register("", {scope: "./"}).then(function (t) {
                    t.addEventListener("updatefound", function () {
                        return e._onUpdateFound(t)
                    })
                }), storage.get("last-seen-version").then(function (t) {
                    t && e._changelogUi.showLogFrom(t), storage.set("last-seen-version", self.version)
                }), utils.domReady.then(function () {
                    e._container = document.querySelector(".app-output"), e._mainUi = new (require("./ui/main-ui"))(document.querySelector(".toolbar"), document.querySelector(".action-button-container"), e._outputUi.container, e._settingsUi.container), document.querySelector(".action-button-container").appendChild(e._downloadButtonUi.container), document.querySelector(".output").appendChild(e._outputUi.container), e._container.appendChild(e._toastsUi.container), e._container.appendChild(e._dropUi.container), document.querySelector(".menu-extra").appendChild(e._changelogUi.container), e._preloaderUi.activated && e._toastsUi.show("Ready now!", {duration: 3e3})
                })
            }

            return _prototypeProperties(e, null, {
                _onViewSelectionChange: {
                    value: function (e) {
                        this._outputUi.set(e.value)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onUpdateFound: {
                    value: function (e) {
                        var t = this, n = e.installing;
                        e.installing.addEventListener("statechange", function () {
                            var e, r, i;
                            return regeneratorRuntime.async(function (t) {
                                for (; ;)switch (t.prev = t.next) {
                                    case 0:
                                        if ("activated" != n.state || navigator.serviceWorker.controller) {
                                            t.next = 3;
                                            break
                                        }
                                        return this._toastsUi.show("Ready to work offline", {duration: 5e3}), t.abrupt("return");
                                    case 3:
                                        if ("installed" != n.state || !navigator.serviceWorker.controller) {
                                            t.next = 17;
                                            break
                                        }
                                        return t.next = 6, storage.get("active-version");
                                    case 6:
                                        if (e = t.sent, !e || e.split(".")[0] == self.version.split(".")[0]) {
                                            t.next = 9;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 9:
                                        if (this._userHasInteracted) {
                                            t.next = 12;
                                            break
                                        }
                                        return location.reload(), t.abrupt("return");
                                    case 12:
                                        return r = this._toastsUi.show("Update available", {buttons: ["reload", "dismiss"]}), t.next = 15, r.answer;
                                    case 15:
                                        i = t.sent, "reload" == i && location.reload();
                                    case 17:
                                    case"end":
                                        return t.stop()
                                }
                            }, null, t)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onSettingsChange: {
                    value: function () {
                        this._compressSvg()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onInputChange: {
                    value: function (e) {
                        var t;
                        return regeneratorRuntime.async(function (n) {
                            for (var r = this; ;)switch (n.prev = n.next) {
                                case 0:
                                    return this._userHasInteracted = !0, n.prev = 1, n.next = 4, svgo.load(e.data);
                                case 4:
                                    this._inputSvg = n.sent, this._inputFilename = e.filename, n.next = 14;
                                    break;
                                case 8:
                                    return n.prev = 8, n.t0 = n["catch"](1), n.t0.message = "Load failed: " + n.t0.message, this._mainMenuUi.stopSpinner(), this._handleError(n.t0), n.abrupt("return");
                                case 14:
                                    this._cache.purge(), t = !0, this._compressSvg(function () {
                                        t && (r._outputUi.reset(), r._mainUi.activate(), r._mainMenuUi.allowHide = !0, r._mainMenuUi.hide(), t = !1)
                                    });
                                case 17:
                                case"end":
                                    return n.stop()
                            }
                        }, null, this, [[1, 8]])
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _handleError: {
                    value: function (e) {
                        this._toastsUi.show(e.message), console.error(e)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _compressSvg: {
                    value: function () {
                        var e, t, n, r, i, a = arguments;
                        return regeneratorRuntime.async(function (s) {
                            for (var o = this; ;)switch (s.prev = s.next) {
                                case 0:
                                    return e = void 0 === a[0] ? function () {
                                    } : a[0], t = this._latestCompressJobId = Math.random(), n = this._settingsUi.getSettings(), s.next = 5, svgo.abortCurrent();
                                case 5:
                                    if (t == this._latestCompressJobId) {
                                        s.next = 7;
                                        break
                                    }
                                    return s.abrupt("return");
                                case 7:
                                    if (!n.original) {
                                        s.next = 10;
                                        break
                                    }
                                    return this._updateForFile(this._inputSvg, {gzip: n.gzip}), s.abrupt("return");
                                case 10:
                                    if (r = this._cache.match(n.fingerprint), !r) {
                                        s.next = 14;
                                        break
                                    }
                                    return this._updateForFile(r, {
                                        compareToFile: this._inputSvg,
                                        gzip: n.gzip
                                    }), s.abrupt("return");
                                case 14:
                                    return this._downloadButtonUi.working(), s.prev = 15, s.next = 18, svgo.process(n, function (t) {
                                        e(t), o._updateForFile(t, {compareToFile: o._inputSvg, gzip: n.gzip})
                                    });
                                case 18:
                                    i = s.sent, this._cache.add(n.fingerprint, i), s.next = 25;
                                    break;
                                case 22:
                                    s.prev = 22, s.t1 = s["catch"](15), "abort" != s.t1.message && (s.t1.message = "Minifying error: " + s.t1.message, this._handleError(s.t1));
                                case 25:
                                    this._downloadButtonUi.done();
                                case 26:
                                case"end":
                                    return s.stop()
                            }
                        }, null, this, [[15, 22]])
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _updateForFile: {
                    value: function (e, t) {
                        var n, r;
                        return regeneratorRuntime.async(function (i) {
                            for (; ;)switch (i.prev = i.next) {
                                case 0:
                                    if (n = t.compareToFile, r = t.gzip, this._outputUi.update(e), this._downloadButtonUi.setDownload(this._inputFilename, e), i.t2 = n, !i.t2) {
                                        i.next = 9;
                                        break
                                    }
                                    return i.next = 8, n.size({compress: r});
                                case 8:
                                    i.t2 = i.sent;
                                case 9:
                                    return i.next = 11, e.size({compress: r});
                                case 11:
                                    i.t3 = i.sent, this._resultsUi.update({comparisonSize: i.t2, size: i.t3});
                                case 13:
                                case"end":
                                    return i.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = MainController;
//# sourceMappingURL=out.js.map

    }, {
        "../utils/storage": 31,
        "./results-cache": 8,
        "./svg-file": 9,
        "./svgo": 10,
        "./ui/changelog": 11,
        "./ui/download-button": 13,
        "./ui/file-drop": 14,
        "./ui/main-menu": 15,
        "./ui/main-ui": 16,
        "./ui/output": 18,
        "./ui/preloader": 20,
        "./ui/results": 22,
        "./ui/results-container": 21,
        "./ui/settings": 23,
        "./ui/toasts": 26,
        "./ui/view-toggler": 27,
        "./utils": 28
    }],
    7: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, _get = function e(t, r, o) {
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (void 0 === i) {
                var n = Object.getPrototypeOf(t);
                return null === n ? void 0 : e(n, r, o)
            }
            if ("value"in i && i.writable)return i.value;
            var u = i.get;
            return void 0 === u ? void 0 : u.call(o)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, Prism = function (e) {
            function t() {
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/prism-worker.js")
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                highlight: {
                    value: function (e) {
                        return this._requestResponse({data: e})
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("./worker-messenger"));
        module.exports = Prism;
//# sourceMappingURL=out.js.map

    }, {"./worker-messenger": 29}],
    8: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, i, t) {
            i && Object.defineProperties(e, i), t && Object.defineProperties(e.prototype, t)
        }, ResultsCache = function () {
            function e(e) {
                this._size = e, this.purge()
            }

            return _prototypeProperties(e, null, {
                purge: {
                    value: function () {
                        this._fingerprints = [], this._files = [], this._index = 0
                    }, writable: !0, enumerable: !0, configurable: !0
                }, add: {
                    value: function (e, i) {
                        var t = this._files[this._index];
                        t && t.release(), this._fingerprints[this._index] = e, this._files[this._index] = i, this._index = (this._index + 1) % this._size
                    }, writable: !0, enumerable: !0, configurable: !0
                }, match: {
                    value: function (e) {
                        return this._files[this._fingerprints.indexOf(e)]
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = ResultsCache;
//# sourceMappingURL=out.js.map

    }, {}],
    9: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, gzip = new (require("./gzip")), SvgFile = function () {
            function e(e, t, r) {
                this.text = e, this._compressedSize = null, this._url = "", this._blob = null, this.width = t, this.height = r
            }

            return _prototypeProperties(e, null, {
                size: {
                    value: function (e) {
                        var t;
                        return regeneratorRuntime.async(function (r) {
                            for (; ;)switch (r.prev = r.next) {
                                case 0:
                                    if (t = e.compress) {
                                        r.next = 3;
                                        break
                                    }
                                    return r.abrupt("return", this.text.length);
                                case 3:
                                    return this._compressedSize || (this._compressedSize = gzip.compress(this.text).then(function (e) {
                                        return e.byteLength
                                    })), r.abrupt("return", this._compressedSize);
                                case 5:
                                case"end":
                                    return r.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _create: {
                    value: function () {
                        this._blob = new Blob([this.text], {type: "image/svg+xml"}), this._url = URL.createObjectURL(this._blob)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, blob: {
                    get: function () {
                        return this._blob || this._create(), this._blob
                    }, enumerable: !0, configurable: !0
                }, url: {
                    get: function () {
                        return this._url || this._create(), this._url
                    }, enumerable: !0, configurable: !0
                }, release: {
                    value: function () {
                        this._url && (this._blob = null, URL.revokeObjectURL(this._url))
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = SvgFile;
//# sourceMappingURL=out.js.map

    }, {"./gzip": 4}],
    10: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, _get = function e(t, r, n) {
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (void 0 === i) {
                var o = Object.getPrototypeOf(t);
                return null === o ? void 0 : e(o, r, n)
            }
            if ("value"in i && i.writable)return i.value;
            var s = i.get;
            return void 0 === s ? void 0 : s.call(n)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, SvgFile = require("./svg-file"), Svgo = function (e) {
            function t() {
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/svgo-worker.js"), this._multiPass = !1, this._abortOnNextItter = !1, this._currentJob = Promise.resolve()
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                load: {
                    value: function (e) {
                        return this._requestResponse({action: "load", data: e}).then(function (t) {
                            var r = t.width, n = t.height;
                            return new SvgFile(e, r, n)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, process: {
                    value: function (e, t) {
                        var r = this;
                        return this._currentJob = this.abortCurrent().then(function () {
                            var n, i;
                            return regeneratorRuntime.async(function (r) {
                                for (; ;)switch (r.prev = r.next) {
                                    case 0:
                                        return this._abortOnNextItter = !1, r.next = 3, this._requestResponse({
                                            action: "process",
                                            settings: e
                                        });
                                    case 3:
                                        if (n = r.sent, i = new SvgFile(n.data, n.dimensions.width, n.dimensions.height), t(i), !e.multipass) {
                                            r.next = 16;
                                            break
                                        }
                                    case 7:
                                        return r.next = 9, this.nextPass();
                                    case 9:
                                        if (!(n = r.sent)) {
                                            r.next = 16;
                                            break
                                        }
                                        if (!this._abortOnNextItter) {
                                            r.next = 12;
                                            break
                                        }
                                        throw Error("abort");
                                    case 12:
                                        i = new SvgFile(n.data, n.dimensions.width, n.dimensions.height), t(i), r.next = 7;
                                        break;
                                    case 16:
                                        return r.abrupt("return", i);
                                    case 17:
                                    case"end":
                                        return r.stop()
                                }
                            }, null, r)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, nextPass: {
                    value: function () {
                        return this._requestResponse({action: "nextPass"})
                    }, writable: !0, enumerable: !0, configurable: !0
                }, abortCurrent: {
                    value: function () {
                        return regeneratorRuntime.async(function (e) {
                            for (; ;)switch (e.prev = e.next) {
                                case 0:
                                    return this._abortOnNextItter = !0, e.prev = 1, e.next = 4, this._currentJob;
                                case 4:
                                    e.next = 8;
                                    break;
                                case 6:
                                    e.prev = 6, e.t4 = e["catch"](1);
                                case 8:
                                case"end":
                                    return e.stop()
                            }
                        }, null, this, [[1, 6]])
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("./worker-messenger"));
        module.exports = Svgo;
//# sourceMappingURL=out.js.map

    }, {"./svg-file": 9, "./worker-messenger": 29}],
    11: [function (require, module, exports) {
        "use strict";
        var _taggedTemplateLiteral = function (e, t) {
            return Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }, _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, utils = require("../utils"), Changelog = function () {
            function e(e) {
                this.container = utils.strToEl('<section class="changelog"></section>'), this._loadedVersion = e
            }

            return _prototypeProperties(e, null, {
                showLogFrom: {
                    value: function (e) {
                        var t, r, n, i, s, a;
                        return regeneratorRuntime.async(function (o) {
                            for (; ;)switch (o.prev = o.next) {
                                case 0:
                                    if (e != this._loadedVersion) {
                                        o.next = 2;
                                        break
                                    }
                                    return o.abrupt("return");
                                case 2:
                                    return o.next = 4, utils.get("changelog.json").then(JSON.parse);
                                case 4:
                                    t = o.sent, r = 0, n = 0, i = 0;
                                case 8:
                                    if (!(i < t.length)) {
                                        o.next = 20;
                                        break
                                    }
                                    if (s = t[i], s.version !== this._loadedVersion) {
                                        o.next = 14;
                                        break
                                    }
                                    r = i, o.next = 16;
                                    break;
                                case 14:
                                    if (s.version !== e) {
                                        o.next = 16;
                                        break
                                    }
                                    return o.abrupt("break", 20);
                                case 16:
                                    n = i + 1;
                                case 17:
                                    i++, o.next = 8;
                                    break;
                                case 20:
                                    return a = t.slice(r, n).reduce(function (e, t) {
                                        return e.concat(t.changes)
                                    }, []).map(function (e) {
                                        return utils.escapeHtmlTag(_taggedTemplateLiteral(["<li>", "</li>"], ["<li>", "</li>"]), e)
                                    }), this.container.appendChild(utils.strToEl("<h1>Updated!</h1>")), this.container.appendChild(utils.strToEl("<ul>" + a.join("") + "</ul>")), o.next = 25, utils.domReady;
                                case 25:
                                    utils.transitionToClass(this.container);
                                case 26:
                                case"end":
                                    return o.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = Changelog;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    12: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, utils = require("../utils"), prism = new (require("../prism")), CodeOutput = function () {
            function e() {
                this.container = utils.strToEl('<div class="code-output"><pre><code></code></pre></div>'), this._codeEl = this.container.querySelector("code")
            }

            return _prototypeProperties(e, null, {
                setSvg: {
                    value: function (e) {
                        return regeneratorRuntime.async(function (t) {
                            for (; ;)switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, prism.highlight(e.text);
                                case 2:
                                    this._codeEl.innerHTML = t.sent;
                                case 3:
                                case"end":
                                    return t.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, reset: {
                    value: function () {
                        this._codeEl.innerHTML = ""
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = CodeOutput;
//# sourceMappingURL=out.js.map

    }, {"../prism": 7, "../utils": 28}],
    13: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, n, t) {
            n && Object.defineProperties(e, n), t && Object.defineProperties(e.prototype, t)
        }, utils = require("../utils"), Spinner = require("./spinner"), DownloadButton = function () {
            function e() {
                var e = this;
                this.container = utils.strToEl('<a href="./" class="floating-action-button"><svg viewBox="0 0 24 24" class="icon"><title>Download output</title><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg></a>'), this._spinner = new Spinner, this.container.appendChild(this._spinner.container), this._svgFile = null, "msSaveBlob"in navigator && this.container.addEventListener("click", function (n) {
                    n.preventDefault(), navigator.msSaveBlob(e._svgFile.blob, e.container.download)
                })
            }

            return _prototypeProperties(e, null, {
                setDownload: {
                    value: function (e, n) {
                        this.container.download = e, this.container.href = n.url, this._svgFile = n
                    }, writable: !0, enumerable: !0, configurable: !0
                }, working: {
                    value: function () {
                        this._spinner.show(500)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, done: {
                    value: function () {
                        this._spinner.hide()
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = DownloadButton;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "./spinner": 24}],
    14: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, _get = function e(t, r, n) {
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (void 0 === i) {
                var o = Object.getPrototypeOf(t);
                return null === o ? void 0 : e(o, r, n)
            }
            if ("value"in i && i.writable)return i.value;
            var a = i.get;
            return void 0 === a ? void 0 : a.call(n)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, utils = require("../utils"), FileDrop = function (e) {
            function t() {
                var e = this;
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.container = utils.strToEl('<div class="drop-overlay">Drop it!</div>'), this._activeEnters = 0, this._currentEnteredElement = null, utils.domReady.then(function () {
                    document.addEventListener("dragover", function (e) {
                        return e.preventDefault()
                    }), document.addEventListener("dragenter", function (t) {
                        return e._onDragEnter(t)
                    }), document.addEventListener("dragleave", function (t) {
                        return e._onDragLeave(t)
                    }), document.addEventListener("drop", function (t) {
                        return e._onDrop(t)
                    })
                })
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                _onDragEnter: {
                    value: function (e) {
                        this._currentEnteredElement != e.target && (this._currentEnteredElement = e.target, this._activeEnters++ || utils.transitionToClass(this.container))
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onDragLeave: {
                    value: function () {
                        this._currentEnteredElement = null, --this._activeEnters || utils.transitionFromClass(this.container)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onDrop: {
                    value: function (e) {
                        var t;
                        return regeneratorRuntime.async(function (r) {
                            for (; ;)switch (r.prev = r.next) {
                                case 0:
                                    return e.preventDefault(), utils.transitionFromClass(this.container), t = e.dataTransfer.files[0], r.next = 5, utils.readFileAsText(t);
                                case 5:
                                    r.t8 = r.sent, this.emit("svgDataLoad", {data: r.t8, filename: t.name});
                                case 7:
                                case"end":
                                    return r.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("events").EventEmitter);
        module.exports = FileDrop;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "events": 2}],
    15: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, n) {
            t && Object.defineProperties(e, t), n && Object.defineProperties(e.prototype, n)
        }, _get = function e(t, n, i) {
            var r = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === r) {
                var o = Object.getPrototypeOf(t);
                return null === o ? void 0 : e(o, n, i)
            }
            if ("value"in r && r.writable)return r.value;
            var a = r.get;
            return void 0 === a ? void 0 : a.call(i)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, utils = require("../utils"), Spinner = require("./spinner"), MainMenu = function (e) {
            function t() {
                var e = this;
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.allowHide = !1, this._spinner = new Spinner, utils.domReady.then(function () {
                    e.container = document.querySelector(".main-menu"), e._selectFileInput = document.querySelector(".select-file-input"), e._pasteInput = document.querySelector(".paste-input"), e._loadDemoBtn = document.querySelector(".load-demo"), e._selectFileBtn = document.querySelector(".select-file"), e._pasteLabel = document.querySelector(".menu-input"), e._overlay = e.container.querySelector(".overlay"), e._menu = e.container.querySelector(".menu"), document.querySelector(".menu-btn").addEventListener("click", function (t) {
                        return e._onMenuButtonClick(t)
                    }), e._overlay.addEventListener("click", function (t) {
                        return e._onOverlayClick(t)
                    }), e._selectFileBtn.addEventListener("click", function (t) {
                        return e._onSelectFileClick(t)
                    }), e._loadDemoBtn.addEventListener("click", function (t) {
                        return e._onLoadDemoClick(t)
                    }), e._selectFileInput.addEventListener("change", function (t) {
                        return e._onFileInputChange(t)
                    }), e._pasteInput.addEventListener("input", function (t) {
                        return e._onTextInputChange(t)
                    })
                })
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                show: {
                    value: function () {
                        this.container.classList.remove("hidden"), utils.transitionFromClass(this._overlay, "hidden"), utils.transitionFromClass(this._menu, "hidden")
                    }, writable: !0, enumerable: !0, configurable: !0
                }, hide: {
                    value: function () {
                        this.allowHide && (this.stopSpinner(), this.container.classList.add("hidden"), utils.transitionToClass(this._overlay, "hidden"), utils.transitionToClass(this._menu, "hidden"))
                    }, writable: !0, enumerable: !0, configurable: !0
                }, stopSpinner: {
                    value: function () {
                        this._spinner.hide()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onOverlayClick: {
                    value: function (e) {
                        e.preventDefault(), this.hide()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onMenuButtonClick: {
                    value: function (e) {
                        e.preventDefault(), this.show()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onTextInputChange: {
                    value: function () {
                        var e = this._pasteInput.value.trim();
                        -1 != e.indexOf("</svg>") && (this._pasteInput.value = "", this._pasteInput.blur(), this._pasteLabel.appendChild(this._spinner.container), this._spinner.show(), this.emit("svgDataLoad", {
                            data: e,
                            filename: "image.svg"
                        }))
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onSelectFileClick: {
                    value: function (e) {
                        e.preventDefault(), e.target.blur(), this._selectFileInput.click()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onFileInputChange: {
                    value: function () {
                        var e;
                        return regeneratorRuntime.async(function (t) {
                            for (; ;)switch (t.prev = t.next) {
                                case 0:
                                    if (e = this._selectFileInput.files[0]) {
                                        t.next = 3;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 3:
                                    return this._selectFileBtn.appendChild(this._spinner.container), this._spinner.show(), t.next = 7, utils.readFileAsText(e);
                                case 7:
                                    t.t5 = t.sent, this.emit("svgDataLoad", {data: t.t5, filename: e.name});
                                case 9:
                                case"end":
                                    return t.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onLoadDemoClick: {
                    value: function (e) {
                        var t;
                        return regeneratorRuntime.async(function (n) {
                            for (; ;)switch (n.prev = n.next) {
                                case 0:
                                    return e.preventDefault(), e.target.blur(), this._loadDemoBtn.appendChild(this._spinner.container), this._spinner.show(), n.prev = 4, n.next = 7, utils.get("test-svgs/car-lite.svg");
                                case 7:
                                    n.t6 = n.sent, this.emit("svgDataLoad", {
                                        data: n.t6,
                                        filename: "car.svg"
                                    }), n.next = 16;
                                    break;
                                case 11:
                                    n.prev = 11, n.t7 = n["catch"](4), this.stopSpinner(), t = Error("serviceWorker"in navigator && navigator.serviceWorker.controller ? "Demo not available offline" : "Couldn't fetch demo SVG"), this.emit("error", {error: t});
                                case 16:
                                case"end":
                                    return n.stop()
                            }
                        }, null, this, [[4, 11]])
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("events").EventEmitter);
        module.exports = MainMenu;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "./spinner": 24, "events": 2}],
    16: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (t, e, i) {
            e && Object.defineProperties(t, e), i && Object.defineProperties(t.prototype, i)
        }, utils = require("../utils"), MainUi = function () {
            function t() {
                for (var t = arguments.length, e = Array(t), i = 0; t > i; i++)e[i] = arguments[i];
                this._activated = !1, this._toActivate = e
            }

            return _prototypeProperties(t, null, {
                activate: {
                    value: function () {
                        return this._activated ? void 0 : (this._activated = !0, Promise.all(this._toActivate.map(function (t) {
                            return utils.transitionToClass(t)
                        })))
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }();
        module.exports = MainUi;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    17: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, n, t) {
            n && Object.defineProperties(e, n), t && Object.defineProperties(e.prototype, t)
        }, utils = require("../utils"), MaterialSlider = function () {
            function e(e) {
                var n = this;
                this.container = utils.strToEl('\n      <div class="material-slider">\n        <div class="track">\n          <div class="track-on"></div>\n          <div class="handle">\n            <div class="arrow"></div>\n            <div class="val"></div>\n          </div>\n        </div>\n      </div>\n    '), this.range = e, this._handle = this.container.querySelector(".handle"), this._trackOn = this.container.querySelector(".track-on"), this._val = this.container.querySelector(".val"), e.parentNode.insertBefore(this.container, e), this.container.insertBefore(e, this.container.firstChild);
                var t = utils.isIe ? "change" : "input";
                e.addEventListener(t, function (e) {
                    return n._onInputChange(e)
                }), this.range.addEventListener("mousedown", function (e) {
                    return n._onRangeMouseDown(e)
                }), this.range.addEventListener("touchstart", function (e) {
                    return n._onRangeTouchStart(e)
                }), this.range.addEventListener("touchend", function (e) {
                    return n._onRangeTouchEnd(e)
                }), this._setPosition()
            }

            return _prototypeProperties(e, null, {
                _onRangeTouchStart: {
                    value: function () {
                        this.range.focus()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onRangeTouchEnd: {
                    value: function () {
                        this.range.blur()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onRangeMouseDown: {
                    value: function () {
                        var e = this;
                        this.range.classList.add("active");
                        var n = function () {
                            requestAnimationFrame(function () {
                                e.range.blur()
                            }), e.range.classList.remove("active"), document.removeEventListener("mouseup", n)
                        };
                        document.addEventListener("mouseup", n)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onInputChange: {
                    value: function () {
                        var e = this;
                        requestAnimationFrame(function () {
                            return e._setPosition()
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _setPosition: {
                    value: function () {
                        var e = this.range.min, n = this.range.max, t = this.range.value, i = (Number(t) - e) / (n - e);
                        this._trackOn.style.width = this._handle.style.left = 100 * i + "%", this._val.textContent = t
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = MaterialSlider;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    18: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, i) {
            t && Object.defineProperties(e, t), i && Object.defineProperties(e.prototype, i)
        }, utils = require("../utils"), Output = function () {
            function e() {
                this.container = utils.strToEl('<div class="output-switcher"></div>'), this._types = {
                    image: new (require("./svg-output")),
                    code: new (require("./code-output"))
                }, this._svgFile = null, this._switchQueue = Promise.resolve(), this.set("image", {noAnimate: !0})
            }

            return _prototypeProperties(e, null, {
                update: {
                    value: function (e) {
                        return this._svgFile = e, this._types[this._activeType].setSvg(e)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, reset: {
                    value: function () {
                        this._types[this._activeType].reset()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, set: {
                    value: function (e) {
                        var t = this, i = void 0 === arguments[1] ? {} : arguments[1], s = i.noAnimate, r = void 0 === s ? !1 : s;
                        return this._switchQueue = this._switchQueue.then(function () {
                            var i, s, n;
                            return regeneratorRuntime.async(function (t) {
                                for (; ;)switch (t.prev = t.next) {
                                    case 0:
                                        if (this._activeType && (i = this._types[this._activeType].container), this._activeType = e, s = this._types[this._activeType].container, this.container.appendChild(s), !this._svgFile) {
                                            t.next = 7;
                                            break
                                        }
                                        return t.next = 7, this.update(this._svgFile);
                                    case 7:
                                        if (!r) {
                                            t.next = 12;
                                            break
                                        }
                                        s.classList.add("active"), i && i.classList.remove("active"), t.next = 16;
                                        break;
                                    case 12:
                                        return n = [utils.transitionToClass(s)], i && n.push(utils.transitionFromClass(i)), t.next = 16, Promise.all(n);
                                    case 16:
                                        i && this.container.removeChild(i);
                                    case 17:
                                    case"end":
                                        return t.stop()
                                }
                            }, null, t)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = Output;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "./code-output": 12, "./svg-output": 25}],
    19: [function (require, module, exports) {
        "use strict";
        function getXY(t) {
            return {x: t.pageX, y: t.pageY}
        }

        function touchDistance(t, e) {
            var n = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y);
            return Math.sqrt(n * n + i * i)
        }

        function getMidpoint(t, e) {
            return {x: (t.x + e.x) / 2, y: (t.y + e.y) / 2}
        }

        function getPoints(t) {
            return t.touches ? Array.prototype.map.call(t.touches, getXY) : [getXY(t)]
        }

        var _prototypeProperties = function (t, e, n) {
            e && Object.defineProperties(t, e), n && Object.defineProperties(t.prototype, n)
        }, utils = require("../utils"), PanZoom = function () {
            function t(t) {
                var e = this, n = void 0 === arguments[1] ? {} : arguments[1], i = n.eventArea, o = void 0 === i ? t : i, s = n.shouldCaptureFunc, r = void 0 === s ? function () {
                    return !0
                } : s;
                this._target = t, this._shouldCaptureFunc = r, this._dx = 0, this._dy = 0, this._scale = 1, this._active = 0, this._lastPoints = [], ["_onPointerDown", "_onPointerMove", "_onPointerUp"].forEach(function (t) {
                    e[t] = e[t].bind(e)
                }), o.addEventListener("mousedown", this._onPointerDown), o.addEventListener("touchstart", this._onPointerDown), o.addEventListener("wheel", function (t) {
                    return e._onWheel(t)
                })
            }

            return _prototypeProperties(t, null, {
                reset: {
                    value: function () {
                        this._dx = 0, this._dy = 0, this._scale = 1, this._update()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onWheel: {
                    value: function (t) {
                        if (this._shouldCaptureFunc(t.target)) {
                            t.preventDefault();
                            var e = this._target.getBoundingClientRect(), n = t.deltaY;
                            1 === t.deltaMode && (n *= 15), n = Math.max(Math.min(n, 60), -60);
                            var i = n / 300 + 1;
                            this._scale * i < .05 || (this._scale *= i, this._dx -= (t.pageX - e.left) * (i - 1), this._dy -= (t.pageY - e.top) * (i - 1), this._update())
                        }
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onFirstPointerDown: {
                    value: function () {
                        document.addEventListener("mousemove", this._onPointerMove), document.addEventListener("mouseup", this._onPointerUp), document.addEventListener("touchmove", this._onPointerMove), document.addEventListener("touchend", this._onPointerUp)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onPointerDown: {
                    value: function (t) {
                        ("mousedown" != t.type || 1 == t.which) && this._shouldCaptureFunc(t.target) && (t.preventDefault(), this._lastPoints = getPoints(t), this._active++, 1 === this._active && this._onFirstPointerDown(t))
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onPointerMove: {
                    value: function (t) {
                        t.preventDefault();
                        var e = getPoints(t), n = e.reduce(getMidpoint), i = this._lastPoints.reduce(getMidpoint), o = this._target.getBoundingClientRect();
                        if (this._dx += n.x - i.x, this._dy += n.y - i.y, e[1]) {
                            var s = touchDistance(e[0], e[1]) / touchDistance(this._lastPoints[0], this._lastPoints[1]);
                            this._scale *= s, this._dx -= (n.x - o.left) * (s - 1), this._dy -= (n.y - o.top) * (s - 1)
                        }
                        this._update(), this._lastPoints = e
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _update: {
                    value: function () {
                        this._target.style.WebkitTransform = this._target.style.transform = "translate3d(" + this._dx + "px, " + this._dy + "px, 0) scale(" + this._scale + ")"
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onPointerUp: {
                    value: function (t) {
                        return t.preventDefault(), this._active--, this._lastPoints.pop(), this._active ? void(this._lastPoints = getPoints(t)) : (document.removeEventListener("mousemove", this._onPointerMove), document.removeEventListener("mouseup", this._onPointerUp), document.removeEventListener("touchmove", this._onPointerMove), void document.removeEventListener("touchend", this._onPointerUp))
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }();
        module.exports = PanZoom;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    20: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, utils = require("../utils"), Preloader = function () {
            function e() {
                var e = this;
                utils.domReady.then(function () {
                    e.container = document.querySelector(".preloader"), e.activated = e.container.classList.contains("active"), e.hide()
                })
            }

            return _prototypeProperties(e, null, {
                hide: {
                    value: function () {
                        return regeneratorRuntime.async(function (e) {
                            for (; ;)switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, utils.transitionFromClass(this.container, "active");
                                case 2:
                                    this.container.style.display = "none";
                                case 3:
                                case"end":
                                    return e.stop()
                            }
                        }, null, this)
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = Preloader;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    21: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, i) {
            t && Object.defineProperties(e, t), i && Object.defineProperties(e.prototype, i)
        }, utils = require("../utils"), ResultsContainer = function () {
            function e(e) {
                var t = this;
                this._results = e, utils.domReady.then(function () {
                    t._mobileContainer = document.querySelector(".results-container-mobile"), t._container = document.querySelector(".results-container"), t._query = matchMedia("(min-width: 640px)"), t._query.addListener(function () {
                        return t._positionResults()
                    }), t._positionResults()
                })
            }

            return _prototypeProperties(e, null, {
                _positionResults: {
                    value: function () {
                        this._query.matches ? this._container.appendChild(this._results.container) : this._mobileContainer.appendChild(this._results.container)
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = ResultsContainer;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    22: [function (require, module, exports) {
        "use strict";
        function round(e, t) {
            var i = Math.pow(10, t);
            return Math.floor(Math.round(e * i)) / i
        }

        function humanSize(e) {
            return 1024 > e ? e + " bytes" : round(e / 1024, 2) + "k"
        }

        var _prototypeProperties = function (e, t, i) {
            t && Object.defineProperties(e, t), i && Object.defineProperties(e.prototype, i)
        }, utils = require("../utils"), Results = function () {
            function e() {
                this.container = utils.strToEl('<div class="results"><span class="size"></span><span class="diff"></span></div>'), this._sizeEl = this.container.querySelector(".size"), this._diffEl = this.container.querySelector(".diff")
            }

            return _prototypeProperties(e, null, {
                update: {
                    value: function (e) {
                        var t = e.size, i = e.comparisonSize;
                        return this._sizeEl.textContent = humanSize(t), i ? void(this._diffEl.textContent = t == i ? " - no change" : t > i ? " - " + round(t / i * 100 - 100, 2) + "% increase" : " - " + round(100 - t / i * 100, 2) + "% saving") : void(this._diffEl.textContent = "")
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = Results;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    23: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, n) {
            t && Object.defineProperties(e, t), n && Object.defineProperties(e.prototype, n)
        }, _get = function e(t, n, r) {
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
                var i = Object.getPrototypeOf(t);
                return null === i ? void 0 : e(i, n, r)
            }
            if ("value"in o && o.writable)return o.value;
            var u = o.get;
            return void 0 === u ? void 0 : u.call(r)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, utils = require("../utils"), Slider = require("./material-slider"), Settings = function (e) {
            function t() {
                var e = this;
                _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this._throttleTimeout = null, utils.domReady.then(function () {
                    e._pluginInputs = utils.toArray(document.querySelectorAll(".settings .plugins input")), e._globalInputs = utils.toArray(document.querySelectorAll(".settings .global input")), utils.toArray(document.querySelectorAll(".settings input[type=range]")).forEach(function (e) {
                        return new Slider(e)
                    }), e.container = document.querySelector(".settings"), e._scroller = document.querySelector(".settings-scroller"), e.container.addEventListener("change", function (t) {
                        return e._onChange(t)
                    }), e.container.addEventListener("input", function (t) {
                        return e._onChange(t)
                    }), e._scroller.addEventListener("wheel", function (t) {
                        return e._onMouseWheel(t)
                    }), e._scroller.addEventListener("mousedown", function (e) {
                        utils.closest(e.target, "input[type=range]") || e.preventDefault()
                    })
                })
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                _onMouseWheel: {
                    value: function (e) {
                        e.deltaMode || (e.preventDefault(), e.currentTarget.scrollTop += e.deltaY)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _onChange: {
                    value: function (e) {
                        var t = this;
                        (utils.isIe || "change" != e.type || "range" != e.target.type) && (clearTimeout(this._throttleTimeout), "range" == e.target.type ? this._throttleTimeout = setTimeout(function () {
                            return t.emit("change")
                        }, 150) : this.emit("change"))
                    }, writable: !0, enumerable: !0, configurable: !0
                }, getSettings: {
                    value: function () {
                        var e = [], t = {plugins: {}};
                        return this._globalInputs.forEach(function (n) {
                            "gzip" != n.name && "original" != n.name && e.push("checkbox" == n.type ? Number(n.checked) : "|" + n.value + "|"), t[n.name] = "checkbox" == n.type ? n.checked : n.value
                        }), this._pluginInputs.forEach(function (n) {
                            e.push(Number(n.checked)), t.plugins[n.name] = n.checked
                        }), t.fingerprint = e.join(), t
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("events").EventEmitter);
        module.exports = Settings;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "./material-slider": 17, "events": 2}],
    24: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (i, e, t) {
            e && Object.defineProperties(i, e), t && Object.defineProperties(i.prototype, t)
        }, utils = require("../utils"), Spinner = function () {
            function i() {
                var i = this;
                this.container = utils.strToEl('<div class="spinner"><div class="spinner-container"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>'), this._showTimeout = null, this.container.style.display = "none";
                var e = function (e) {
                    e.target == i.container && (i.container.style.display = "none")
                };
                this.container.addEventListener("webkitAnimationEnd", e), this.container.addEventListener("animationend", e)
            }

            return _prototypeProperties(i, null, {
                show: {
                    value: function () {
                        var i = this, e = void 0 === arguments[0] ? 300 : arguments[0];
                        clearTimeout(this._showTimeout), this.container.style.display = "none", this.container.classList.remove("cooldown"), this._showTimeout = setTimeout(function () {
                            i.container.style.display = ""
                        }, e)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, hide: {
                    value: function () {
                        clearTimeout(this._showTimeout), this.container.classList.add("cooldown")
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), i
        }();
        module.exports = Spinner;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    25: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, utils = require("../utils"), PanZoom = require("./pan-zoom"), SvgOutput = function () {
            function e() {
                var e = this, t = utils.isIe ? '<img class="svg-frame">' : '<iframe class="svg-frame" sandbox="allow-scripts"></iframe>';
                this.container = utils.strToEl('<div class="svg-output"><div class="svg-container">' + t + '<div class="svg-clickjacker"></div></div></div>'), this._svgFrame = this.container.querySelector(".svg-frame"), this._svgFrame.scrolling = "no", this._svgContainer = this.container.querySelector(".svg-container"), utils.domReady.then(function () {
                    e._panZoom = new PanZoom(e._svgContainer, {eventArea: e.container})
                })
            }

            return _prototypeProperties(e, null, {
                setSvg: {
                    value: function (e) {
                        var t = this._nextLoadPromise();
                        return this._svgFrame.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e.text), this._svgFrame.width = e.width, this._svgFrame.height = e.height, t
                    }, writable: !0, enumerable: !0, configurable: !0
                }, reset: {
                    value: function () {
                        this._svgFrame.src = "about:blank", this._panZoom.reset()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _nextLoadPromise: {
                    value: function () {
                        var e = this;
                        return new Promise(function (t) {
                            var r = function () {
                                e._svgFrame.removeEventListener("load", r), t()
                            };
                            e._svgFrame.addEventListener("load", r)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = SvgOutput;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "./pan-zoom": 19}],
    26: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (t, e, n) {
            e && Object.defineProperties(t, e), n && Object.defineProperties(t.prototype, n)
        }, utils = require("../utils"), Toast = function () {
            function t(t, e, n) {
                var i = this;
                this.container = utils.strToEl('<div class="toast"><div class="toast-content"></div></div>'), this._content = this.container.querySelector(".toast-content"), this._content.textContent = t, this._answerResolve, this._hideTimeout, this.answer = new Promise(function (t) {
                    return i._answerResolve = t
                }), n.forEach(function (t) {
                    var e = document.createElement("button");
                    e.className = "unbutton", e.textContent = t, e.addEventListener("click", function () {
                        i._answerResolve(t)
                    }), i.container.appendChild(e)
                }), e && (this._hideTimeout = setTimeout(function () {
                    return i.hide()
                }, e))
            }

            return _prototypeProperties(t, null, {
                hide: {
                    value: function () {
                        return clearTimeout(this._hideTimeout), this._answerResolve(), utils.transitionToClass(this.container, "hide")
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(), Toasts = function () {
            function t() {
                this.container = utils.strToEl("<div class='toasts'></div>")
            }

            return _prototypeProperties(t, null, {
                show: {
                    value: function (t) {
                        var e = this, n = void 0 === arguments[1] ? {} : arguments[1], i = n.duration, o = void 0 === i ? 0 : i, s = n.buttons, r = void 0 === s ? ["dismiss"] : s, a = new Toast(t, o, r);
                        return this.container.appendChild(a.container), a.answer.then(function () {
                            return a.hide()
                        }).then(function () {
                            e.container.removeChild(a.container)
                        }), a
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }();
        module.exports = Toasts;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28}],
    27: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, _inherits = function (e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (e.__proto__ = t)
        }, utils = require("../utils"), ViewToggler = function (e) {
            function t() {
                var e = this;
                this.container = null, utils.domReady.then(function () {
                    e.container = document.querySelector(".view-toggler"), e.container.output[0].checked = !0, e.container.addEventListener("change", function (t) {
                        return e._onChange(t)
                    })
                })
            }

            return _inherits(t, e), _prototypeProperties(t, null, {
                _onChange: {
                    value: function () {
                        var e = this.container.output.value;
                        e || (e = utils.toArray(this.container.output).reduce(function (e, t) {
                            return e || (t.checked ? t.value : "")
                        }, "")), this.emit("change", {value: e})
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), t
        }(require("events").EventEmitter);
        module.exports = ViewToggler;
//# sourceMappingURL=out.js.map

    }, {"../utils": 28, "events": 2}],
    28: [function (require, module, exports) {
        "use strict";
        function transitionClassFunc() {
            var e = void 0 === arguments[0] ? {} : arguments[0], t = e.removeClass, n = void 0 === t ? !1 : t;
            return function (e) {
                var t = void 0 === arguments[1] ? "active" : arguments[1], r = void 0 === arguments[2] ? "transition" : arguments[2];
                if (n) {
                    if (!e.classList.contains(t))return Promise.resolve()
                } else if (e.classList.contains(t))return Promise.resolve();
                return new Promise(function (o) {
                    var s = function (t) {
                        t.target == e && (e.removeEventListener("webkitTransitionEnd", s), e.removeEventListener("transitionend", s), e.classList.remove(r), o())
                    };
                    e.classList.add(r), requestAnimationFrame(function () {
                        e.addEventListener("webkitTransitionEnd", s), e.addEventListener("transitionend", s), e.classList[n ? "remove" : "add"](t)
                    })
                })
            }
        }

        exports.toArray = function (e) {
            return Array.prototype.slice.apply(e)
        }, exports.domReady = new Promise(function (e) {
            var t = function () {
                "loading" != document.readyState && e()
            };
            document.addEventListener("readystatechange", t), t()
        }), exports.get = function (e) {
            return new Promise(function (t, n) {
                var r = new XMLHttpRequest;
                r.open("GET", e), r.onload = function () {
                    200 == r.status ? t(r.response) : n(Error(r.statusText))
                }, r.onerror = function () {
                    n(Error("Network Error"))
                }, r.send()
            })
        }, exports.strToEl = function () {
            var e = document.createElement("div");
            return function (t) {
                var n;
                for (e.innerHTML = t, n = e.children[0]; e.firstChild;)e.removeChild(e.firstChild);
                return n
            }
        }();
        var entityMap = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;"};
        exports.escapeHtml = function (e) {
            return String(e).replace(/[&<>"'\/]/g, function (e) {
                return entityMap[e]
            })
        }, exports.escapeHtmlTag = function (e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; t > r; r++)n[r - 1] = arguments[r];
            return n = n.map(exports.escapeHtml), e.reduce(function (e, t, r) {
                return e += t + (n[r] || "")
            }, "")
        }, exports.readFileAsText = function (e) {
            return new Promise(function (t, n) {
                var r = new FileReader;
                r.readAsText(e), r.onerror = function () {
                    n(r.error)
                }, r.onload = function () {
                    t(r.result)
                }
            })
        }, exports.transitionToClass = transitionClassFunc(), exports.transitionFromClass = transitionClassFunc({removeClass: !0}), exports.closest = function (e, t) {
            if (e.closest)return e.closest(t);
            var n = e.matches || e.msMatchesSelector;
            do if (1 == e.nodeType && n.call(e, t))return e; while (e = e.parentNode);
            return void 0
        }, exports.isIe = -1 !== navigator.userAgent.indexOf("Trident/"), exports.loadCss = function (e) {
            return new Promise(function (t, n) {
                var r = document.createElement("link");
                r.rel = "stylesheet", r.href = e, r.addEventListener("load", function () {
                    return t()
                }), r.addEventListener("error", function () {
                    return n()
                }), document.head.appendChild(r)
            })
        };
//# sourceMappingURL=out.js.map

    }, {}],
    29: [function (require, module, exports) {
        "use strict";
        var _prototypeProperties = function (e, r, t) {
            r && Object.defineProperties(e, r), t && Object.defineProperties(e.prototype, t)
        }, WorkerMessenger = function () {
            function e(e) {
                var r = this;
                this._requestId = 0, this._worker = new Worker(e), this._pending = {}, this._worker.onmessage = function (e) {
                    return r._onMessage(e)
                }
            }

            return _prototypeProperties(e, null, {
                _onMessage: {
                    value: function (e) {
                        if (!e.data.id)return void console.log("Unexpected message", e);
                        var r = this._pending[e.data.id];
                        return r ? (delete this._pending[e.data.id], e.data.error ? void r[1](new Error(e.data.error)) : void r[0](e.data.result)) : void console.log("No resolver for", e)
                    }, writable: !0, enumerable: !0, configurable: !0
                }, _requestResponse: {
                    value: function (e) {
                        var r = this, t = ++this._requestId;
                        return e.id = t, new Promise(function (o, n) {
                            r._pending[t] = [o, n], r._worker.postMessage(e)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = WorkerMessenger;
//# sourceMappingURL=out.js.map

    }, {}],
    30: [function (require, module, exports) {
        "use strict";
        function promisifyRequest(e) {
            return new Promise(function (t, r) {
                var n = function () {
                    t(e.result), i()
                }, o = function () {
                    r(e.error), i()
                }, i = function () {
                    e.removeEventListener("complete", n), e.removeEventListener("success", n), e.removeEventListener("error", o), e.removeEventListener("abort", o)
                };
                e.addEventListener("complete", n), e.addEventListener("success", n), e.addEventListener("error", o), e.addEventListener("abort", o)
            })
        }

        var _prototypeProperties = function (e, t, r) {
            t && Object.defineProperties(e, t), r && Object.defineProperties(e.prototype, r)
        }, IndexedDouchebag = function () {
            function e(e, t, r) {
                var n = indexedDB.open(e, t);
                this.ready = promisifyRequest(n), n.onupgradeneeded = function (e) {
                    r(n.result, e.oldVersion)
                }
            }

            return _prototypeProperties(e, null, {
                transaction: {
                    value: function (e, t, r) {
                        return this.ready.then(function (n) {
                            var o = "readonly";
                            t.apply ? r = t : t && (o = t);
                            var i, u = n.transaction(e, o), a = r(u, n), s = promisifyRequest(u);
                            return a ? (i = a[0] && "result"in a[0] ? Promise.all(a.map(promisifyRequest)) : promisifyRequest(a), s.then(function () {
                                return i
                            })) : s
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, get: {
                    value: function (e, t) {
                        return this.transaction(e, function (r) {
                            return r.objectStore(e).get(t)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, put: {
                    value: function (e, t, r) {
                        return this.transaction(e, "readwrite", function (n) {
                            n.objectStore(e).put(r, t)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, "delete": {
                    value: function (e, t) {
                        return this.transaction(e, "readwrite", function (r) {
                            r.objectStore(e)["delete"](t)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }
            }), e
        }();
        module.exports = IndexedDouchebag;
//# sourceMappingURL=out.js.map

    }, {}],
    31: [function (require, module, exports) {
        "use strict";
        function getIdb() {
            return idb || (idb = new Idb("svgo-keyval", 1, function (e) {
                e.createObjectStore("keyval")
            })), idb
        }

        var Idb = require("./indexeddouchbag"), idb;
        module.exports = self.indexedDB ? {
            get: function (e) {
                return getIdb().get("keyval", e)
            }, set: function (e, t) {
                return getIdb().put("keyval", e, t)
            }, "delete": function (e) {
                return getIdb()["delete"]("keyval", e)
            }
        } : {
            get: function (e) {
                return Promise.resolve(localStorage.getItem(e))
            }, set: function (e, t) {
                return Promise.resolve(localStorage.setItem(e, t))
            }, "delete": function (e) {
                return Promise.resolve(localStorage.removeItem(e))
            }
        };
//# sourceMappingURL=out.js.map

    }, {"./indexeddouchbag": 30}]
}, {}, [1]);

//# sourceMappingURL=page.js.map