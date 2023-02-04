! function(t, r) {
    "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((t = t || self).MessagePack = {})
}(this, function(t) {
    "use strict";
    const r = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        e = (t, r) => {
            let e = t;
            return "string" == typeof r ? e = t.toLocaleString(r) : !0 === r && (e = t.toLocaleString()), e
        };
    for (var n = function(t) {
            var r = l(t),
                e = r[0],
                n = r[1];
            return 3 * (e + n) / 4 - n
        }, i = function(t) {
            for (var r, e = l(t), n = e[0], i = e[1], o = new a(function(t, r, e) {
                    return 3 * (r + e) / 4 - e
                }(0, n, i)), f = 0, s = i > 0 ? n - 4 : n, h = 0; h < s; h += 4) r = u[t.charCodeAt(h)] << 18 | u[t.charCodeAt(h + 1)] << 12 | u[t.charCodeAt(h + 2)] << 6 | u[t.charCodeAt(h + 3)], o[f++] = r >> 16 & 255, o[f++] = r >> 8 & 255, o[f++] = 255 & r;
            2 === i && (r = u[t.charCodeAt(h)] << 2 | u[t.charCodeAt(h + 1)] >> 4, o[f++] = 255 & r);
            1 === i && (r = u[t.charCodeAt(h)] << 10 | u[t.charCodeAt(h + 1)] << 4 | u[t.charCodeAt(h + 2)] >> 2, o[f++] = r >> 8 & 255, o[f++] = 255 & r);
            return o
        }, o = function(t) {
            for (var r, e = t.length, n = e % 3, i = [], o = 0, u = e - n; o < u; o += 16383) i.push(p(t, o, o + 16383 > u ? u : o + 16383));
            1 === n ? (r = t[e - 1], i.push(f[r >> 2] + f[r << 4 & 63] + "==")) : 2 === n && (r = (t[e - 2] << 8) + t[e - 1], i.push(f[r >> 10] + f[r >> 4 & 63] + f[r << 2 & 63] + "="));
            return i.join("")
        }, f = [], u = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, c = s.length; h < c; ++h) f[h] = s[h], u[s.charCodeAt(h)] = h;

    function l(t) {
        var r = t.length;
        if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var e = t.indexOf("=");
        return -1 === e && (e = r), [e, e === r ? 0 : 4 - e % 4]
    }

    function p(t, r, e) {
        for (var n, i, o = [], u = r; u < e; u += 3) n = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), o.push(f[(i = n) >> 18 & 63] + f[i >> 12 & 63] + f[i >> 6 & 63] + f[63 & i]);
        return o.join("")
    }
    u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63;
    var y, g = {
            byteLength: n,
            toByteArray: i,
            fromByteArray: o
        },
        d = {
            read: function(t, r, e, n, i) {
                var o, f, u = 8 * i - n - 1,
                    a = (1 << u) - 1,
                    s = a >> 1,
                    h = -7,
                    c = e ? i - 1 : 0,
                    l = e ? -1 : 1,
                    p = t[r + c];
                for (c += l, o = p & (1 << -h) - 1, p >>= -h, h += u; h > 0; o = 256 * o + t[r + c], c += l, h -= 8);
                for (f = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; f = 256 * f + t[r + c], c += l, h -= 8);
                if (0 === o) o = 1 - s;
                else {
                    if (o === a) return f ? NaN : 1 / 0 * (p ? -1 : 1);
                    f += Math.pow(2, n), o -= s
                }
                return (p ? -1 : 1) * f * Math.pow(2, o - n)
            },
            write: function(t, r, e, n, i, o) {
                var f, u, a, s = 8 * o - i - 1,
                    h = (1 << s) - 1,
                    c = h >> 1,
                    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    p = n ? 0 : o - 1,
                    y = n ? 1 : -1,
                    g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = h) : (f = Math.floor(Math.log(r) / Math.LN2), r * (a = Math.pow(2, -f)) < 1 && (f--, a *= 2), (r += f + c >= 1 ? l / a : l * Math.pow(2, 1 - c)) * a >= 2 && (f++, a /= 2), f + c >= h ? (u = 0, f = h) : f + c >= 1 ? (u = (r * a - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + p] = 255 & u, p += y, u /= 256, i -= 8);
                for (f = f << i | u, s += i; s > 0; t[e + p] = 255 & f, p += y, f /= 256, s -= 8);
                t[e + p - y] |= 128 * g
            }
        },
        w = (function(t, r) {
            r.Buffer = i, r.SlowBuffer = function(t) {
                +t != t && (t = 0);
                return i.alloc(+t)
            }, r.INSPECT_MAX_BYTES = 50;
            var e = 2147483647;

            function n(t) {
                if (t > e) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                var r = new Uint8Array(t);
                return r.__proto__ = i.prototype, r
            }

            function i(t, r, e) {
                if ("number" == typeof t) {
                    if ("string" == typeof r) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return u(t)
                }
                return o(t, r, e)
            }

            function o(t, r, e) {
                if ("string" == typeof t) return function(t, r) {
                    "string" == typeof r && "" !== r || (r = "utf8");
                    if (!i.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                    var e = 0 | h(t, r),
                        o = n(e),
                        f = o.write(t, r);
                    f !== e && (o = o.slice(0, f));
                    return o
                }(t, r);
                if (ArrayBuffer.isView(t)) return a(t);
                if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                if (j(t, ArrayBuffer) || t && j(t.buffer, ArrayBuffer)) return function(t, r, e) {
                    if (r < 0 || t.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < r + (e || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === r && void 0 === e ? new Uint8Array(t) : void 0 === e ? new Uint8Array(t, r) : new Uint8Array(t, r, e);
                    return n.__proto__ = i.prototype, n
                }(t, r, e);
                if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var o = t.valueOf && t.valueOf();
                if (null != o && o !== t) return i.from(o, r, e);
                var f = function(t) {
                    if (i.isBuffer(t)) {
                        var r = 0 | s(t.length),
                            e = n(r);
                        return 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
                    }
                    if (void 0 !== t.length) return "number" != typeof t.length || F(t.length) ? n(0) : a(t);
                    if ("Buffer" === t.type && Array.isArray(t.data)) return a(t.data)
                }(t);
                if (f) return f;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return i.from(t[Symbol.toPrimitive]("string"), r, e);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
            }

            function f(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
            }

            function u(t) {
                return f(t), n(t < 0 ? 0 : 0 | s(t))
            }

            function a(t) {
                for (var r = t.length < 0 ? 0 : 0 | s(t.length), e = n(r), i = 0; i < r; i += 1) e[i] = 255 & t[i];
                return e
            }

            function s(t) {
                if (t >= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + e.toString(16) + " bytes");
                return 0 | t
            }

            function h(t, r) {
                if (i.isBuffer(t)) return t.length;
                if (ArrayBuffer.isView(t) || j(t, ArrayBuffer)) return t.byteLength;
                if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                var e = t.length,
                    n = arguments.length > 2 && !0 === arguments[2];
                if (!n && 0 === e) return 0;
                for (var o = !1;;) switch (r) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return e;
                    case "utf8":
                    case "utf-8":
                        return N(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * e;
                    case "hex":
                        return e >>> 1;
                    case "base64":
                        return P(t).length;
                    default:
                        if (o) return n ? -1 : N(t).length;
                        r = ("" + r).toLowerCase(), o = !0
                }
            }

            function c(t, r, e) {
                var n = t[r];
                t[r] = t[e], t[e] = n
            }

            function l(t, r, e, n, o) {
                if (0 === t.length) return -1;
                if ("string" == typeof e ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), F(e = +e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
                    if (o) return -1;
                    e = t.length - 1
                } else if (e < 0) {
                    if (!o) return -1;
                    e = 0
                }
                if ("string" == typeof r && (r = i.from(r, n)), i.isBuffer(r)) return 0 === r.length ? -1 : p(t, r, e, n, o);
                if ("number" == typeof r) return r &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : p(t, [r], e, n, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function p(t, r, e, n, i) {
                var o, f = 1,
                    u = t.length,
                    a = r.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || r.length < 2) return -1;
                    f = 2, u /= 2, a /= 2, e /= 2
                }

                function s(t, r) {
                    return 1 === f ? t[r] : t.readUInt16BE(r * f)
                }
                if (i) {
                    var h = -1;
                    for (o = e; o < u; o++)
                        if (s(t, o) === s(r, -1 === h ? 0 : o - h)) {
                            if (-1 === h && (h = o), o - h + 1 === a) return h * f
                        } else -1 !== h && (o -= o - h), h = -1
                } else
                    for (e + a > u && (e = u - a), o = e; o >= 0; o--) {
                        for (var c = !0, l = 0; l < a; l++)
                            if (s(t, o + l) !== s(r, l)) {
                                c = !1;
                                break
                            }
                        if (c) return o
                    }
                return -1
            }

            function y(t, r, e, n) {
                e = Number(e) || 0;
                var i = t.length - e;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var o = r.length;
                n > o / 2 && (n = o / 2);
                for (var f = 0; f < n; ++f) {
                    var u = parseInt(r.substr(2 * f, 2), 16);
                    if (F(u)) return f;
                    t[e + f] = u
                }
                return f
            }

            function w(t, r, e, n) {
                return z(N(r, t.length - e), t, e, n)
            }

            function b(t, r, e, n) {
                return z(function(t) {
                    for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
                    return r
                }(r), t, e, n)
            }

            function v(t, r, e, n) {
                return b(t, r, e, n)
            }

            function E(t, r, e, n) {
                return z(P(r), t, e, n)
            }

            function m(t, r, e, n) {
                return z(function(t, r) {
                    for (var e, n, i, o = [], f = 0; f < t.length && !((r -= 2) < 0); ++f) e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
                    return o
                }(r, t.length - e), t, e, n)
            }

            function B(t, r, e) {
                return 0 === r && e === t.length ? g.fromByteArray(t) : g.fromByteArray(t.slice(r, e))
            }

            function A(t, r, e) {
                e = Math.min(t.length, e);
                for (var n = [], i = r; i < e;) {
                    var o, f, u, a, s = t[i],
                        h = null,
                        c = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                    if (i + c <= e) switch (c) {
                        case 1:
                            s < 128 && (h = s);
                            break;
                        case 2:
                            128 == (192 & (o = t[i + 1])) && (a = (31 & s) << 6 | 63 & o) > 127 && (h = a);
                            break;
                        case 3:
                            o = t[i + 1], f = t[i + 2], 128 == (192 & o) && 128 == (192 & f) && (a = (15 & s) << 12 | (63 & o) << 6 | 63 & f) > 2047 && (a < 55296 || a > 57343) && (h = a);
                            break;
                        case 4:
                            o = t[i + 1], f = t[i + 2], u = t[i + 3], 128 == (192 & o) && 128 == (192 & f) && 128 == (192 & u) && (a = (15 & s) << 18 | (63 & o) << 12 | (63 & f) << 6 | 63 & u) > 65535 && a < 1114112 && (h = a)
                    }
                    null === h ? (h = 65533, c = 1) : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), n.push(h), i += c
                }
                return function(t) {
                    var r = t.length;
                    if (r <= U) return String.fromCharCode.apply(String, t);
                    var e = "",
                        n = 0;
                    for (; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += U));
                    return e
                }(n)
            }
            r.kMaxLength = e, i.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === t.foo()
                } catch (t) {
                    return !1
                }
            }(), i.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(i.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (i.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(i.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (i.isBuffer(this)) return this.byteOffset
                }
            }), "undefined" != typeof Symbol && null != Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), i.poolSize = 8192, i.from = function(t, r, e) {
                return o(t, r, e)
            }, i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, i.alloc = function(t, r, e) {
                return function(t, r, e) {
                    return f(t), t <= 0 ? n(t) : void 0 !== r ? "string" == typeof e ? n(t).fill(r, e) : n(t).fill(r) : n(t)
                }(t, r, e)
            }, i.allocUnsafe = function(t) {
                return u(t)
            }, i.allocUnsafeSlow = function(t) {
                return u(t)
            }, i.isBuffer = function(t) {
                return null != t && !0 === t._isBuffer && t !== i.prototype
            }, i.compare = function(t, r) {
                if (j(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)), j(r, Uint8Array) && (r = i.from(r, r.offset, r.byteLength)), !i.isBuffer(t) || !i.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (t === r) return 0;
                for (var e = t.length, n = r.length, o = 0, f = Math.min(e, n); o < f; ++o)
                    if (t[o] !== r[o]) {
                        e = t[o], n = r[o];
                        break
                    }
                return e < n ? -1 : n < e ? 1 : 0
            }, i.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, i.concat = function(t, r) {
                if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return i.alloc(0);
                var e;
                if (void 0 === r)
                    for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
                var n = i.allocUnsafe(r),
                    o = 0;
                for (e = 0; e < t.length; ++e) {
                    var f = t[e];
                    if (j(f, Uint8Array) && (f = i.from(f)), !i.isBuffer(f)) throw new TypeError('"list" argument must be an Array of Buffers');
                    f.copy(n, o), o += f.length
                }
                return n
            }, i.byteLength = h, i.prototype._isBuffer = !0, i.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var r = 0; r < t; r += 2) c(this, r, r + 1);
                return this
            }, i.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var r = 0; r < t; r += 4) c(this, r, r + 3), c(this, r + 1, r + 2);
                return this
            }, i.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var r = 0; r < t; r += 8) c(this, r, r + 7), c(this, r + 1, r + 6), c(this, r + 2, r + 5), c(this, r + 3, r + 4);
                return this
            }, i.prototype.toString = function() {
                var t = this.length;
                return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : function(t, r, e) {
                    var n = !1;
                    if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                    if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                    if ((e >>>= 0) <= (r >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return M(this, r, e);
                        case "utf8":
                        case "utf-8":
                            return A(this, r, e);
                        case "ascii":
                            return I(this, r, e);
                        case "latin1":
                        case "binary":
                            return k(this, r, e);
                        case "base64":
                            return B(this, r, e);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return S(this, r, e);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), n = !0
                    }
                }.apply(this, arguments)
            }, i.prototype.toLocaleString = i.prototype.toString, i.prototype.equals = function(t) {
                if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === i.compare(this, t)
            }, i.prototype.inspect = function() {
                var t = "",
                    e = r.INSPECT_MAX_BYTES;
                return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">"
            }, i.prototype.compare = function(t, r, e, n, o) {
                if (j(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)), !i.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), r < 0 || e > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                if (n >= o && r >= e) return 0;
                if (n >= o) return -1;
                if (r >= e) return 1;
                if (this === t) return 0;
                for (var f = (o >>>= 0) - (n >>>= 0), u = (e >>>= 0) - (r >>>= 0), a = Math.min(f, u), s = this.slice(n, o), h = t.slice(r, e), c = 0; c < a; ++c)
                    if (s[c] !== h[c]) {
                        f = s[c], u = h[c];
                        break
                    }
                return f < u ? -1 : u < f ? 1 : 0
            }, i.prototype.includes = function(t, r, e) {
                return -1 !== this.indexOf(t, r, e)
            }, i.prototype.indexOf = function(t, r, e) {
                return l(this, t, r, e, !0)
            }, i.prototype.lastIndexOf = function(t, r, e) {
                return l(this, t, r, e, !1)
            }, i.prototype.write = function(t, r, e, n) {
                if (void 0 === r) n = "utf8", e = this.length, r = 0;
                else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
                else {
                    if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0)
                }
                var i = this.length - r;
                if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o = !1;;) switch (n) {
                    case "hex":
                        return y(this, t, r, e);
                    case "utf8":
                    case "utf-8":
                        return w(this, t, r, e);
                    case "ascii":
                        return b(this, t, r, e);
                    case "latin1":
                    case "binary":
                        return v(this, t, r, e);
                    case "base64":
                        return E(this, t, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return m(this, t, r, e);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), o = !0
                }
            }, i.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var U = 4096;

            function I(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
                return n
            }

            function k(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
                return n
            }

            function M(t, r, e) {
                var n = t.length;
                (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                for (var i = "", o = r; o < e; ++o) i += O(t[o]);
                return i
            }

            function S(t, r, e) {
                for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i
            }

            function T(t, r, e) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + r > e) throw new RangeError("Trying to access beyond buffer length")
            }

            function _(t, r, e, n, o, f) {
                if (!i.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (r > o || r < f) throw new RangeError('"value" argument is out of bounds');
                if (e + n > t.length) throw new RangeError("Index out of range")
            }

            function L(t, r, e, n, i, o) {
                if (e + n > t.length) throw new RangeError("Index out of range");
                if (e < 0) throw new RangeError("Index out of range")
            }

            function x(t, r, e, n, i) {
                return r = +r, e >>>= 0, i || L(t, 0, e, 4), d.write(t, r, e, n, 23, 4), e + 4
            }

            function C(t, r, e, n, i) {
                return r = +r, e >>>= 0, i || L(t, 0, e, 8), d.write(t, r, e, n, 52, 8), e + 8
            }
            i.prototype.slice = function(t, r) {
                var e = this.length;
                (t = ~~t) < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e), (r = void 0 === r ? e : ~~r) < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e), r < t && (r = t);
                var n = this.subarray(t, r);
                return n.__proto__ = i.prototype, n
            }, i.prototype.readUIntLE = function(t, r, e) {
                t >>>= 0, r >>>= 0, e || T(t, r, this.length);
                for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                return n
            }, i.prototype.readUIntBE = function(t, r, e) {
                t >>>= 0, r >>>= 0, e || T(t, r, this.length);
                for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) n += this[t + --r] * i;
                return n
            }, i.prototype.readUInt8 = function(t, r) {
                return t >>>= 0, r || T(t, 1, this.length), this[t]
            }, i.prototype.readUInt16LE = function(t, r) {
                return t >>>= 0, r || T(t, 2, this.length), this[t] | this[t + 1] << 8
            }, i.prototype.readUInt16BE = function(t, r) {
                return t >>>= 0, r || T(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, i.prototype.readUInt32LE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, i.prototype.readUInt32BE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, i.prototype.readIntLE = function(t, r, e) {
                t >>>= 0, r >>>= 0, e || T(t, r, this.length);
                for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
            }, i.prototype.readIntBE = function(t, r, e) {
                t >>>= 0, r >>>= 0, e || T(t, r, this.length);
                for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
                return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
            }, i.prototype.readInt8 = function(t, r) {
                return t >>>= 0, r || T(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, i.prototype.readInt16LE = function(t, r) {
                t >>>= 0, r || T(t, 2, this.length);
                var e = this[t] | this[t + 1] << 8;
                return 32768 & e ? 4294901760 | e : e
            }, i.prototype.readInt16BE = function(t, r) {
                t >>>= 0, r || T(t, 2, this.length);
                var e = this[t + 1] | this[t] << 8;
                return 32768 & e ? 4294901760 | e : e
            }, i.prototype.readInt32LE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, i.prototype.readInt32BE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, i.prototype.readFloatLE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), d.read(this, t, !0, 23, 4)
            }, i.prototype.readFloatBE = function(t, r) {
                return t >>>= 0, r || T(t, 4, this.length), d.read(this, t, !1, 23, 4)
            }, i.prototype.readDoubleLE = function(t, r) {
                return t >>>= 0, r || T(t, 8, this.length), d.read(this, t, !0, 52, 8)
            }, i.prototype.readDoubleBE = function(t, r) {
                return t >>>= 0, r || T(t, 8, this.length), d.read(this, t, !1, 52, 8)
            }, i.prototype.writeUIntLE = function(t, r, e, n) {
                (t = +t, r >>>= 0, e >>>= 0, n) || _(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                var i = 1,
                    o = 0;
                for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
                return r + e
            }, i.prototype.writeUIntBE = function(t, r, e, n) {
                (t = +t, r >>>= 0, e >>>= 0, n) || _(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                var i = e - 1,
                    o = 1;
                for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) this[r + i] = t / o & 255;
                return r + e
            }, i.prototype.writeUInt8 = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1
            }, i.prototype.writeUInt16LE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
            }, i.prototype.writeUInt16BE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
            }, i.prototype.writeUInt32LE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4
            }, i.prototype.writeUInt32BE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
            }, i.prototype.writeIntLE = function(t, r, e, n) {
                if (t = +t, r >>>= 0, !n) {
                    var i = Math.pow(2, 8 * e - 1);
                    _(this, t, r, e, i - 1, -i)
                }
                var o = 0,
                    f = 1,
                    u = 0;
                for (this[r] = 255 & t; ++o < e && (f *= 256);) t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                return r + e
            }, i.prototype.writeIntBE = function(t, r, e, n) {
                if (t = +t, r >>>= 0, !n) {
                    var i = Math.pow(2, 8 * e - 1);
                    _(this, t, r, e, i - 1, -i)
                }
                var o = e - 1,
                    f = 1,
                    u = 0;
                for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                return r + e
            }, i.prototype.writeInt8 = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
            }, i.prototype.writeInt16LE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
            }, i.prototype.writeInt16BE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
            }, i.prototype.writeInt32LE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 4, 2147483647, -2147483648), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4
            }, i.prototype.writeInt32BE = function(t, r, e) {
                return t = +t, r >>>= 0, e || _(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
            }, i.prototype.writeFloatLE = function(t, r, e) {
                return x(this, t, r, !0, e)
            }, i.prototype.writeFloatBE = function(t, r, e) {
                return x(this, t, r, !1, e)
            }, i.prototype.writeDoubleLE = function(t, r, e) {
                return C(this, t, r, !0, e)
            }, i.prototype.writeDoubleBE = function(t, r, e) {
                return C(this, t, r, !1, e)
            }, i.prototype.copy = function(t, r, e, n) {
                if (!i.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (r < 0) throw new RangeError("targetStart out of bounds");
                if (e < 0 || e >= this.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);
                var o = n - e;
                if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(r, e, n);
                else if (this === t && e < r && r < n)
                    for (var f = o - 1; f >= 0; --f) t[f + r] = this[f + e];
                else Uint8Array.prototype.set.call(t, this.subarray(e, n), r);
                return o
            }, i.prototype.fill = function(t, r, e, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !i.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    if (1 === t.length) {
                        var o = t.charCodeAt(0);
                        ("utf8" === n && o < 128 || "latin1" === n) && (t = o)
                    }
                } else "number" == typeof t && (t &= 255);
                if (r < 0 || this.length < r || this.length < e) throw new RangeError("Out of range index");
                if (e <= r) return this;
                var f;
                if (r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0), "number" == typeof t)
                    for (f = r; f < e; ++f) this[f] = t;
                else {
                    var u = i.isBuffer(t) ? t : i.from(t, n),
                        a = u.length;
                    if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                    for (f = 0; f < e - r; ++f) this[f + r] = u[f % a]
                }
                return this
            };
            var R = /[^+\/0-9A-Za-z-_]/g;

            function O(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }

            function N(t, r) {
                var e;
                r = r || 1 / 0;
                for (var n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                    if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                        if (!i) {
                            if (e > 56319) {
                                (r -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (f + 1 === n) {
                                (r -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            i = e;
                            continue
                        }
                        if (e < 56320) {
                            (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                            continue
                        }
                        e = 65536 + (i - 55296 << 10 | e - 56320)
                    } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                    if (i = null, e < 128) {
                        if ((r -= 1) < 0) break;
                        o.push(e)
                    } else if (e < 2048) {
                        if ((r -= 2) < 0) break;
                        o.push(e >> 6 | 192, 63 & e | 128)
                    } else if (e < 65536) {
                        if ((r -= 3) < 0) break;
                        o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                    } else {
                        if (!(e < 1114112)) throw new Error("Invalid code point");
                        if ((r -= 4) < 0) break;
                        o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                    }
                }
                return o
            }

            function P(t) {
                return g.toByteArray(function(t) {
                    if ((t = (t = t.split("=")[0]).trim().replace(R, "")).length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }(t))
            }

            function z(t, r, e, n) {
                for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) r[i + e] = t[i];
                return i
            }

            function j(t, r) {
                return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
            }

            function F(t) {
                return t != t
            }
        }(y = {
            exports: {}
        }, y.exports), y.exports);
    w.Buffer, w.SlowBuffer, w.INSPECT_MAX_BYTES, w.kMaxLength;
    const b = w.Buffer;
    var v = {
            initialize: (t, n) => {
                if ("number" != typeof t || !0 === Number.isNaN(t)) throw Error('@initialize : expecting "tempBufferLength" to be a number.');
                if (t < 1) throw Error('@initialize : expecting "tempBufferLength" to be greater than zero.');
                if (void 0 !== n) {
                    if ("function" != typeof n) throw Error('@initialize : expecting "logFunction" to be a function.');
                    n(`@initialize : setting buffer limit to ${((t,n)=>{if(!Number.isFinite(t))throw new TypeError(`Expected a finite number, got ${typeof t}: ${t}`);if((n=Object.assign({},n)).signed&&0===t)return" 0 B";const i=t<0,o=i?"-":n.signed?"+":"";if(i&&(t=-t),t<1)return o+e(t,n.locale)+" B";const f=Math.min(Math.floor(Math.log10(t)/3),r.length-1);return t=Number((t/Math.pow(1e3,f)).toPrecision(3)),o+e(t,n.locale)+" "+r[f]})(t)}`)
                }
                const i = {};
                let o = !1,
                    f = -33;
                const u = b.allocUnsafe(t).fill(0);
                let a = -1;
                const s = t => {
                    let r = 0;
                    switch (typeof t) {
                        case "string":
                            if ((r = b.byteLength(t)) < 32) {
                                r = 0;
                                for (let e = 0, n = 0, i = t.length; e < i; e += 1)(n = t.charCodeAt(e)) < 128 ? r += 1 : n < 1280 ? r += 2 : n < 55296 || n >= 57344 ? r += 3 : (e += 1, r += 4);
                                u[a += 1] = 160 | r;
                                for (let r = 0, e = 0, n = t.length; r < n; r += 1)(e = t.charCodeAt(r)) < 128 ? u[a += 1] = e : e < 1280 ? (u[a += 1] = 192 | e >> 6, u[a += 1] = 128 | 63 & e) : e < 55296 || e >= 57344 ? (u[a += 1] = 224 | e >> 12, u[a += 1] = 128 | e >> 6 & 63, u[a += 1] = 128 | 63 & e) : (r += 1, e = 65536 + ((1023 & e) << 10 | 1023 & t.charCodeAt(r)), u[a += 1] = 240 | e >> 18, u[a += 1] = 128 | e >> 12 & 63, u[a += 1] = 128 | e >> 6 & 63, u[a += 1] = 128 | 63 & e)
                            } else if (r < 256) u[a += 1] = 217, u[a += 1] = r, u.write(t, a += 1, r, "utf8"), a += r - 1;
                            else if (r < 65536) u[a += 1] = 218, u[a += 1] = r >> 8, u[a += 1] = r, u.write(t, a += 1, r, "utf8"), a += r - 1;
                            else {
                                if (!(r < 4294967296)) throw Error("@internalEncode : Max supported string length (4294967296) exceeded, encoding failure.");
                                u[a += 1] = 219, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r, u.write(t, a += 1, r, "utf8"), a += r - 1
                            }
                            break;
                        case "number":
                            if (!1 === Number.isFinite(t)) {
                                if (!0 === Number.isNaN(t)) {
                                    u[a += 1] = 212, u[a += 1] = 0, u[a += 1] = 1;
                                    break
                                }
                                if (t === 1 / 0) {
                                    u[a += 1] = 212, u[a += 1] = 0, u[a += 1] = 2;
                                    break
                                }
                                if (t === -1 / 0) {
                                    u[a += 1] = 212, u[a += 1] = 0, u[a += 1] = 3;
                                    break
                                }
                            }
                            if (Math.floor(t) !== t) {
                                if (Math.fround(t) === t) {
                                    u[a += 1] = 202, u.writeFloatBE(t, a += 1), a += 3;
                                    break
                                }
                                u[a += 1] = 203, u.writeDoubleBE(t, a += 1), a += 7;
                                break
                            }
                            if (t >= 0) {
                                if (t < 128) {
                                    u[a += 1] = t;
                                    break
                                }
                                if (t < 256) {
                                    u[a += 1] = 204, u[a += 1] = t;
                                    break
                                }
                                if (t < 65536) {
                                    u[a += 1] = 205, u[a += 1] = t >> 8, u[a += 1] = t;
                                    break
                                }
                                if (t < 4294967296) {
                                    u[a += 1] = 206, u[a += 1] = t >> 24, u[a += 1] = t >> 16, u[a += 1] = t >> 8, u[a += 1] = t;
                                    break
                                }
                                let r = t / Math.pow(2, 32) >> 0,
                                    e = t >>> 0;
                                u[a += 1] = 207, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r, u[a += 1] = e >> 24, u[a += 1] = e >> 16, u[a += 1] = e >> 8, u[a += 1] = e
                            } else {
                                if (t >= -32) {
                                    u[a += 1] = t;
                                    break
                                }
                                if (t >= -128) {
                                    u[a += 1] = 208, u[a += 1] = t;
                                    break
                                }
                                if (t >= -12800) {
                                    u[a += 1] = 209, u[a += 1] = t >> 8, u[a += 1] = t;
                                    break
                                }
                                if (t >= -128e6) {
                                    u[a += 1] = 210, u[a += 1] = t >> 24, u[a += 1] = t >> 16, u[a += 1] = t >> 8, u[a += 1] = t;
                                    break
                                }
                                let r = Math.floor(t / Math.pow(2, 32)),
                                    e = t >>> 0;
                                u[a += 1] = 211, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r, u[a += 1] = e >> 24, u[a += 1] = e >> 16, u[a += 1] = e >> 8, u[a += 1] = e
                            }
                            break;
                        case "object":
                            if (null === t) {
                                u[a += 1] = 192;
                                break
                            }
                            if (!0 === Array.isArray(t)) {
                                if ((r = t.length) < 16) u[a += 1] = 144 | r;
                                else if (r < 65536) u[a += 1] = 220, u[a += 1] = r >> 8, u[a += 1] = r;
                                else {
                                    if (!(r < 4294967296)) throw new Error("@internalEncode : Array too large");
                                    u[a += 1] = 221, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r
                                }
                                for (let e = 0; e < r; e += 1) s(t[e]);
                                break
                            }
                            if (t instanceof ArrayBuffer && (t = b.from(t)), t instanceof b == 0 && (t instanceof Int8Array || t instanceof Int16Array || t instanceof Int32Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Uint16Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array)) {
                                let r = b.from(t.buffer);
                                t.byteLength !== t.buffer.byteLength && (r = r.slice(t.byteOffset, t.byteOffset + t.byteLength)), t = r
                            }
                            if (t instanceof b) {
                                if ((r = t.length) < 256)
                                    if (u[a += 1] = 196, u[a += 1] = r, r > 32) t.copy(u, a += 1, 0, r), a += r - 1;
                                    else
                                        for (let e = 0; e < r; e++) u[a += 1] = t[e];
                                else if (r < 65536) u[a += 1] = 197, u[a += 1] = r >> 8, u[a += 1] = r, t.copy(u, a += 1, 0, r), a += r - 1;
                                else {
                                    if (!(r < 4294967296)) throw Error("@internalEncode : Max supported buffer length (4294967296) exceeded, encoding failure.");
                                    u[a += 1] = 198, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r, t.copy(u, a += 1, 0, r), a += r - 1
                                }
                                break
                            } {
                                let e = Object.keys(t);
                                if ((r = e.length) < 16) u[a += 1] = 128 | r;
                                else if (r < 65536) u[a += 1] = 222, u[a += 1] = r >> 8, u[a += 1] = r;
                                else {
                                    if (!(r < 4294967296)) throw new Error("@internalEncode : Object too large");
                                    u[a += 1] = 223, u[a += 1] = r >> 24, u[a += 1] = r >> 16, u[a += 1] = r >> 8, u[a += 1] = r
                                }
                                if (!0 === o)
                                    for (let n = 0; n < r; n += 1) s(i[e[n]] || e[n]), s(t[e[n]]);
                                else
                                    for (let n = 0; n < r; n += 1) s(e[n]), s(t[e[n]])
                            }
                            break;
                        default:
                            switch (t) {
                                case !0:
                                    u[a += 1] = 195;
                                    break;
                                case !1:
                                    u[a += 1] = 194;
                                    break;
                                case void 0:
                                    u[a += 1] = 212, u[a += 1] = 0, u[a += 1] = 0;
                                    break;
                                default:
                                    throw Error("@internalEncode : Error encoding value.")
                            }
                    }
                };
                let h = void 0,
                    c = 0;
                const l = () => {
                    let t, r;
                    if (h[c] < 192) {
                        if (h[c] < 128) return t = h[c], c += 1, t;
                        if (h[c] < 144) {
                            if (r = 31 & h[c], t = {}, c += 1, !0 === o)
                                for (let e, n = 0; n < r; n++) e = l(), t[i[e] || e] = l();
                            else
                                for (let e = 0; e < r; e++) t[l()] = l();
                            return t
                        }
                        if (h[c] < 160) {
                            r = 15 & h[c], c += 1, t = new Array(r);
                            for (let e = 0; e < r; e += 1) t[e] = l();
                            return t
                        }
                        return r = 31 & h[c], c += 1, t = h.toString("utf8", c, c + r), c += r, t
                    }
                    if (h[c] > 223) return t = -1 * (255 - h[c] + 1), c += 1, t;
                    switch (h[c]) {
                        case 202:
                            return t = h.readFloatBE(c += 1), c += 4, t;
                        case 203:
                            return t = h.readDoubleBE(c += 1), c += 8, t;
                        case 204:
                            return t = h.readUInt8(c += 1), c += 1, t;
                        case 205:
                            return t = h.readUInt16BE(c += 1), c += 2, t;
                        case 206:
                            return t = h.readUInt32BE(c += 1), c += 4, t;
                        case 207:
                            return t = h.readUInt32BE(c += 1) * Math.pow(2, 32) + h.readUInt32BE(c += 4), c += 4, t;
                        case 208:
                            return t = h.readInt8(c += 1), c += 1, t;
                        case 209:
                            return t = h.readInt16BE(c += 1), c += 2, t;
                        case 210:
                            return t = h.readInt32BE(c += 1), c += 4, t;
                        case 211:
                            return t = h.readInt32BE(c += 1) * Math.pow(2, 32) + h.readUInt32BE(c += 4), c += 4, t;
                        case 217:
                            return r = h.readUInt8(c += 1), c += 1, t = h.toString("utf8", c, c + r), c += r, t;
                        case 218:
                            return r = h.readUInt16BE(c += 1), c += 2, t = h.toString("utf8", c, c + r), c += r, t;
                        case 219:
                            return r = h.readUInt32BE(c += 1), c += 4, t = h.toString("utf8", c, c + r), c += r, t;
                        case 212:
                            switch (h.readInt8(c += 1)) {
                                case 0:
                                    switch (h.readInt8(c += 1)) {
                                        case 0:
                                            return c += 1, t = void 0;
                                        case 1:
                                            return c += 1, t = NaN;
                                        case 2:
                                            return c += 1, t = 1 / 0;
                                        case 3:
                                            return c += 1, t = -1 / 0
                                    }
                            }
                            break;
                        case 192:
                            return c += 1, t = null;
                        case 194:
                            return c += 1, t = !1;
                        case 195:
                            return c += 1, t = !0;
                        case 220:
                            r = h.readUInt16BE(c += 1), c += 2, t = new Array(r);
                            for (let e = 0; e < r; e += 1) t[e] = l();
                            return t;
                        case 221:
                            r = h.readUInt32BE(c += 1), c += 4, t = new Array(r);
                            for (let e = 0; e < r; e += 1) t[e] = l();
                            return t;
                        case 222:
                            if (r = h.readUInt16BE(c += 1), t = {}, c += 2, !0 === o)
                                for (let e, n = 0; n < r; n++) e = l(), t[i[e] || e] = l();
                            else
                                for (let e = 0; e < r; e++) t[l()] = l();
                            return t;
                        case 223:
                            if (r = h.readUInt32BE(c += 1), t = {}, c += 4, !0 === o)
                                for (let e, n = 0; n < r; n++) e = l(), t[i[e] || e] = l();
                            else
                                for (let e = 0; e < r; e++) t[l()] = l();
                            return t;
                        case 196:
                            return r = h.readUInt8(c += 1), c += 1, t = h.slice(c, c + r), c += r, t;
                        case 197:
                            return r = h.readUInt16BE(c += 1), c += 2, t = h.slice(c, c + r), c += r, t;
                        case 198:
                            return r = h.readUInt32BE(c += 1), c += 4, t = h.slice(c, c + r), c += r, t
                    }
                    throw Error("@internalDecode : Error decoding value.")
                };
                return {
                    encode: t => {
                        a = -1, s(t);
                        const r = b.allocUnsafe(a + 1).fill(0);
                        return u.copy(r, 0, 0, a + 1), r
                    },
                    decode: t => {
                        h = t, c = 0;
                        const r = l();
                        return h = void 0, r
                    },
                    register: (...t) => {
                        !1 === o && (o = !0);
                        for (let r = 0, e = t.length; r < e; r += 1) i[f += 1] = t[r], i[t[r]] = f
                    }
                }
            },
            Buffer: b
        },
        E = v.initialize,
        m = v.Buffer;
    t.default = v, t.initialize = E, t.Buffer = m, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=MessagePack.min.js.map