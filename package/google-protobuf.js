var COMPILED = !0,
  goog = goog || {};
goog.global = this || self;
goog.DEBUG = !0;
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.typeOf = function (a) {
  var b = typeof a;
  if ('object' == b)
    if (a) {
      if (a instanceof Array) return 'array';
      if (a instanceof Object) return b;
      var c = Object.prototype.toString.call(a);
      if ('[object Window]' == c) return 'object';
      if (
        '[object Array]' == c ||
        ('number' == typeof a.length &&
          'undefined' != typeof a.splice &&
          'undefined' != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable('splice'))
      )
        return 'array';
      if (
        '[object Function]' == c ||
        ('undefined' != typeof a.call &&
          'undefined' != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable('call'))
      )
        return 'function';
    } else return 'null';
  else if ('function' == b && 'undefined' == typeof a.call) return 'object';
  return b;
};
goog.isArray = function (a) {
  return 'array' == goog.typeOf(a);
};
goog.isArrayLike = function (a) {
  var b = goog.typeOf(a);
  return 'array' == b || ('object' == b && 'number' == typeof a.length);
};
goog.isObject = function (a) {
  var b = typeof a;
  return ('object' == b && null != a) || 'function' == b;
};
goog.now =
  (goog.TRUSTED_SITE && Date.now) ||
  function () {
    return +new Date();
  };
goog.inherits = function (a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.base = function (a, c, f) {
    for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
    return b.prototype[c].apply(a, d);
  };
};
var jspb = { BinaryConstants: {}, ConstBinaryMessage: function () {}, BinaryMessage: function () {} };
jspb.BinaryConstants.FieldType = {
  INVALID: -1,
  DOUBLE: 1,
  FLOAT: 2,
  INT64: 3,
  UINT64: 4,
  INT32: 5,
  FIXED64: 6,
  FIXED32: 7,
  BOOL: 8,
  STRING: 9,
  GROUP: 10,
  MESSAGE: 11,
  BYTES: 12,
  UINT32: 13,
  ENUM: 14,
  SFIXED32: 15,
  SFIXED64: 16,
  SINT32: 17,
  SINT64: 18,
  FHASH64: 30,
  VHASH64: 31,
};
jspb.BinaryConstants.WireType = {
  INVALID: -1,
  VARINT: 0,
  FIXED64: 1,
  DELIMITED: 2,
  START_GROUP: 3,
  END_GROUP: 4,
  FIXED32: 5,
};
jspb.BinaryConstants.FieldTypeToWireType = function (a) {
  var b = jspb.BinaryConstants.FieldType,
    c = jspb.BinaryConstants.WireType;
  switch (a) {
    case b.INT32:
    case b.INT64:
    case b.UINT32:
    case b.UINT64:
    case b.SINT32:
    case b.SINT64:
    case b.BOOL:
    case b.ENUM:
    case b.VHASH64:
      return c.VARINT;
    case b.DOUBLE:
    case b.FIXED64:
    case b.SFIXED64:
    case b.FHASH64:
      return c.FIXED64;
    case b.STRING:
    case b.MESSAGE:
    case b.BYTES:
      return c.DELIMITED;
    case b.FLOAT:
    case b.FIXED32:
    case b.SFIXED32:
      return c.FIXED32;
    default:
      return c.INVALID;
  }
};
jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45;
jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38;
jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e38;
jspb.BinaryConstants.FLOAT64_EPS = 4.9e-324;
jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308;
jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e308;
jspb.BinaryConstants.TWO_TO_20 = 1048576;
jspb.BinaryConstants.TWO_TO_23 = 8388608;
jspb.BinaryConstants.TWO_TO_31 = 2147483648;
jspb.BinaryConstants.TWO_TO_32 = 4294967296;
jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
jspb.BinaryConstants.TWO_TO_63 = 0x7fffffffffffffff;
jspb.BinaryConstants.TWO_TO_64 = 1.8446744073709552e19;
jspb.BinaryConstants.ZERO_HASH = '\x00\x00\x00\x00\x00\x00\x00\x00';
goog.debug = {};
goog.debug.Error = function (a) {
  if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
  else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
  this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = 'CustomError';
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function (a, b) {
  goog.debug.Error.call(this, goog.asserts.subs_(a, b));
  this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = 'AssertionError';
goog.asserts.DEFAULT_ERROR_HANDLER = function (a) {
  throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_ = function (a, b) {
  a = a.split('%s');
  for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s');
  return c + a[d];
};
goog.asserts.doAssertFailure_ = function (a, b, c, d) {
  var e = 'Assertion failed';
  if (c) {
    e += ': ' + c;
    var f = d;
  } else a && ((e += ': ' + a), (f = b));
  a = new goog.asserts.AssertionError('' + e, f || []);
  goog.asserts.errorHandler_(a);
};
goog.asserts.assert = function (a, b, c) {
  goog.asserts.ENABLE_ASSERTS &&
    !a &&
    goog.asserts.doAssertFailure_('', null, b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.fail = function (a, b) {
  goog.asserts.ENABLE_ASSERTS &&
    goog.asserts.errorHandler_(
      new goog.asserts.AssertionError('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1))
    );
};
goog.asserts.assertInstanceof = function (a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS ||
    a instanceof b ||
    goog.asserts.doAssertFailure_(
      'Expected instanceof %s but got %s.',
      [goog.asserts.getType_(b), goog.asserts.getType_(a)],
      c,
      Array.prototype.slice.call(arguments, 3)
    );
  return a;
};
goog.asserts.getType_ = function (a) {
  return a instanceof Function
    ? a.displayName || a.name || 'unknown type name'
    : a instanceof Object
    ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
    : null === a
    ? 'null'
    : typeof a;
};
goog.array = {};
goog.array.forEach = function (a, b, c) {
        goog.asserts.assert(null != a.length);
        Array.prototype.forEach.call(a, b, c);
      }
goog.array.map = function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.map.call(a, b, c);
      }
goog.array.slice = function (a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.crypt = {};
goog.crypt.stringToByteArray = function (a) {
  for (var b = [], c = 0, d = 0; d < a.length; d++) {
    var e = a.charCodeAt(d);
    255 < e && ((b[c++] = e & 255), (e >>= 8));
    b[c++] = e;
  }
  return b;
};
goog.crypt.byteArrayToString = function (a) {
  if (8192 >= a.length) return String.fromCharCode.apply(null, a);
  for (var b = '', c = 0; c < a.length; c += 8192) {
    var d = goog.array.slice(a, c, c + 8192);
    b += String.fromCharCode.apply(null, d);
  }
  return b;
};
goog.string = {};
goog.string.internal = {};
goog.string.internal.isEmptyOrWhitespace = function (a) {
  return /^[\s\xa0]*$/.test(a);
};
goog.string.internal.contains = function (a, b) {
  return -1 != a.indexOf(b);
};
goog.object = {};
goog.object.PROTOTYPE_FIELDS_ = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
  ' '
);
goog.object.extend = function (a, b) {
  for (var c, d, e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d) a[c] = d[c];
    for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++)
      (c = goog.object.PROTOTYPE_FIELDS_[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
  }
};
goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
goog.string.contains = goog.string.internal.contains;
goog.crypt.base64 = {};
goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + '+/=';
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + '-_.';
goog.crypt.base64.Alphabet = { DEFAULT: 0, NO_PADDING: 1, WEBSAFE: 2, WEBSAFE_DOT_PADDING: 3, WEBSAFE_NO_PADDING: 4 };
goog.crypt.base64.paddingChars_ = '=.';
goog.crypt.base64.isPadding_ = function (a) {
  return goog.string.contains(goog.crypt.base64.paddingChars_, a);
};
goog.crypt.base64.byteToCharMaps_ = {};
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.HAS_NATIVE_ENCODE_ = true
goog.crypt.base64.HAS_NATIVE_DECODE_ = true
goog.crypt.base64.encodeByteArray = function (a, b) {
  goog.asserts.assert(goog.isArrayLike(a), 'encodeByteArray takes an array as a parameter');
  void 0 === b && (b = goog.crypt.base64.Alphabet.DEFAULT);
  goog.crypt.base64.init_();
  b = goog.crypt.base64.byteToCharMaps_[b];
  for (var c = [], d = 0; d < a.length; d += 3) {
    var e = a[d],
      f = d + 1 < a.length,
      g = f ? a[d + 1] : 0,
      h = d + 2 < a.length,
      k = h ? a[d + 2] : 0,
      l = e >> 2;
    e = ((e & 3) << 4) | (g >> 4);
    g = ((g & 15) << 2) | (k >> 6);
    k &= 63;
    h || ((k = 64), f || (g = 64));
    c.push(b[l], b[e], b[g] || '', b[k] || '');
  }
  return c.join('');
};
goog.crypt.base64.encodeString = function (a, b) {
  return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b
    ? goog.global.btoa(a)
    : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a), b);
};
goog.crypt.base64.decodeString = function (a, b) {
  if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b) return goog.global.atob(a);
  var c = '';
  goog.crypt.base64.decodeStringInternal_(a, function (a) {
    c += String.fromCharCode(a);
  });
  return c;
};
goog.crypt.base64.decodeStringToByteArray = function (a, b) {
  var c = [];
  goog.crypt.base64.decodeStringInternal_(a, function (a) {
    c.push(a);
  });
  return c;
};
goog.crypt.base64.decodeStringToUint8Array = function (a) {
  var b = a.length,
    c = (3 * b) / 4;
  c % 3
    ? (c = Math.floor(c))
    : goog.crypt.base64.isPadding_(a[b - 1]) && (c = goog.crypt.base64.isPadding_(a[b - 2]) ? c - 2 : c - 1);
  var d = new Uint8Array(c),
    e = 0;
  goog.crypt.base64.decodeStringInternal_(a, function (a) {
    d[e++] = a;
  });
  return d.subarray(0, e);
};
goog.crypt.base64.decodeStringInternal_ = function (a, b) {
  function c(b) {
    for (; d < a.length; ) {
      var c = a.charAt(d++),
        e = goog.crypt.base64.charToByteMap_[c];
      if (null != e) return e;
      if (!goog.string.isEmptyOrWhitespace(c)) throw Error('Unknown base64 encoding at char: ' + c);
    }
    return b;
  }
  goog.crypt.base64.init_();
  for (var d = 0; ; ) {
    var e = c(-1),
      f = c(0),
      g = c(64),
      h = c(64);
    if (64 === h && -1 === e) break;
    b((e << 2) | (f >> 4));
    64 != g && (b(((f << 4) & 240) | (g >> 2)), 64 != h && b(((g << 6) & 192) | h));
  }
};
goog.crypt.base64.init_ = function () {
  if (!goog.crypt.base64.charToByteMap_) {
    goog.crypt.base64.charToByteMap_ = {};
    for (
      var a = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(''), b = ['+/=', '+/', '-_=', '-_.', '-_'], c = 0;
      5 > c;
      c++
    ) {
      var d = a.concat(b[c].split(''));
      goog.crypt.base64.byteToCharMaps_[c] = d;
      for (var e = 0; e < d.length; e++) {
        var f = d[e],
          g = goog.crypt.base64.charToByteMap_[f];
        void 0 === g ? (goog.crypt.base64.charToByteMap_[f] = e) : goog.asserts.assert(g === e);
      }
    }
  }
};
jspb.utils = {};
jspb.utils.split64Low = 0;
jspb.utils.split64High = 0;
jspb.utils.splitUint64 = function (a) {
  var b = a >>> 0;
  a = Math.floor((a - b) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
  jspb.utils.split64Low = b;
  jspb.utils.split64High = a;
};
jspb.utils.splitInt64 = function (a) {
  var b = 0 > a;
  a = Math.abs(a);
  var c = a >>> 0;
  a = Math.floor((a - c) / jspb.BinaryConstants.TWO_TO_32);
  a >>>= 0;
  b && ((a = ~a >>> 0), (c = (~c >>> 0) + 1), 4294967295 < c && ((c = 0), a++, 4294967295 < a && (a = 0)));
  jspb.utils.split64Low = c;
  jspb.utils.split64High = a;
};
jspb.utils.splitZigzag64 = function (a) {
  var b = 0 > a;
  a = 2 * Math.abs(a);
  jspb.utils.splitUint64(a);
  a = jspb.utils.split64Low;
  var c = jspb.utils.split64High;
  b && (0 == a ? (0 == c ? (c = a = 4294967295) : (c--, (a = 4294967295))) : a--);
  jspb.utils.split64Low = a;
  jspb.utils.split64High = c;
};
jspb.utils.splitFloat32 = function (a) {
  var b = 0 > a ? 1 : 0;
  a = b ? -a : a;
  if (0 === a)
    0 < 1 / a
      ? ((jspb.utils.split64High = 0), (jspb.utils.split64Low = 0))
      : ((jspb.utils.split64High = 0), (jspb.utils.split64Low = 2147483648));
  else if (isNaN(a)) (jspb.utils.split64High = 0), (jspb.utils.split64Low = 2147483647);
  else if (a > jspb.BinaryConstants.FLOAT32_MAX)
    (jspb.utils.split64High = 0), (jspb.utils.split64Low = ((b << 31) | 2139095040) >>> 0);
  else if (a < jspb.BinaryConstants.FLOAT32_MIN)
    (a = Math.round(a / Math.pow(2, -149))),
      (jspb.utils.split64High = 0),
      (jspb.utils.split64Low = ((b << 31) | a) >>> 0);
  else {
    var c = Math.floor(Math.log(a) / Math.LN2);
    a *= Math.pow(2, -c);
    a = Math.round(a * jspb.BinaryConstants.TWO_TO_23) & 8388607;
    jspb.utils.split64High = 0;
    jspb.utils.split64Low = ((b << 31) | ((c + 127) << 23) | a) >>> 0;
  }
};
jspb.utils.splitFloat64 = function (a) {
  var b = 0 > a ? 1 : 0;
  a = b ? -a : a;
  if (0 === a) (jspb.utils.split64High = 0 < 1 / a ? 0 : 2147483648), (jspb.utils.split64Low = 0);
  else if (isNaN(a)) (jspb.utils.split64High = 2147483647), (jspb.utils.split64Low = 4294967295);
  else if (a > jspb.BinaryConstants.FLOAT64_MAX)
    (jspb.utils.split64High = ((b << 31) | 2146435072) >>> 0), (jspb.utils.split64Low = 0);
  else if (a < jspb.BinaryConstants.FLOAT64_MIN) {
    var c = a / Math.pow(2, -1074);
    a = c / jspb.BinaryConstants.TWO_TO_32;
    jspb.utils.split64High = ((b << 31) | a) >>> 0;
    jspb.utils.split64Low = c >>> 0;
  } else {
    c = a;
    var d = 0;
    if (2 <= c) for (; 2 <= c && 1023 > d; ) d++, (c /= 2);
    else for (; 1 > c && -1022 < d; ) (c *= 2), d--;
    c = a * Math.pow(2, -d);
    a = (c * jspb.BinaryConstants.TWO_TO_20) & 1048575;
    c = (c * jspb.BinaryConstants.TWO_TO_52) >>> 0;
    jspb.utils.split64High = ((b << 31) | ((d + 1023) << 20) | a) >>> 0;
    jspb.utils.split64Low = c;
  }
};
jspb.utils.splitHash64 = function (a) {
  var b = a.charCodeAt(0),
    c = a.charCodeAt(1),
    d = a.charCodeAt(2),
    e = a.charCodeAt(3),
    f = a.charCodeAt(4),
    g = a.charCodeAt(5),
    h = a.charCodeAt(6);
  a = a.charCodeAt(7);
  jspb.utils.split64Low = (b + (c << 8) + (d << 16) + (e << 24)) >>> 0;
  jspb.utils.split64High = (f + (g << 8) + (h << 16) + (a << 24)) >>> 0;
};
jspb.utils.joinUint64 = function (a, b) {
  return b * jspb.BinaryConstants.TWO_TO_32 + (a >>> 0);
};
jspb.utils.joinInt64 = function (a, b) {
  var c = b & 2147483648;
  c && ((a = (~a + 1) >>> 0), (b = ~b >>> 0), 0 == a && (b = (b + 1) >>> 0));
  a = jspb.utils.joinUint64(a, b);
  return c ? -a : a;
};
jspb.utils.toZigzag64 = function (a, b, c) {
  var d = b >> 31;
  return c((a << 1) ^ d, ((b << 1) | (a >>> 31)) ^ d);
};
jspb.utils.joinZigzag64 = function (a, b) {
  return jspb.utils.fromZigzag64(a, b, jspb.utils.joinInt64);
};
jspb.utils.fromZigzag64 = function (a, b, c) {
  var d = -(a & 1);
  return c(((a >>> 1) | (b << 31)) ^ d, (b >>> 1) ^ d);
};
jspb.utils.joinFloat32 = function (a, b) {
  b = 2 * (a >> 31) + 1;
  var c = (a >>> 23) & 255;
  a &= 8388607;
  return 255 == c
    ? a
      ? NaN
      : Infinity * b
    : 0 == c
    ? b * Math.pow(2, -149) * a
    : b * Math.pow(2, c - 150) * (a + Math.pow(2, 23));
};
jspb.utils.joinFloat64 = function (a, b) {
  var c = 2 * (b >> 31) + 1,
    d = (b >>> 20) & 2047;
  a = jspb.BinaryConstants.TWO_TO_32 * (b & 1048575) + a;
  return 2047 == d
    ? a
      ? NaN
      : Infinity * c
    : 0 == d
    ? c * Math.pow(2, -1074) * a
    : c * Math.pow(2, d - 1075) * (a + jspb.BinaryConstants.TWO_TO_52);
};
jspb.utils.joinHash64 = function (a, b) {
  return String.fromCharCode(
    (a >>> 0) & 255,
    (a >>> 8) & 255,
    (a >>> 16) & 255,
    (a >>> 24) & 255,
    (b >>> 0) & 255,
    (b >>> 8) & 255,
    (b >>> 16) & 255,
    (b >>> 24) & 255
  );
};
jspb.utils.DIGITS = '0123456789abcdef'.split('');
jspb.utils.ZERO_CHAR_CODE_ = 48;
jspb.utils.A_CHAR_CODE_ = 97;
jspb.utils.joinUnsignedDecimalString = function (a, b) {
  function c(a, b) {
    a = a ? String(a) : '';
    return b ? '0000000'.slice(a.length) + a : a;
  }
  if (2097151 >= b) return '' + (jspb.BinaryConstants.TWO_TO_32 * b + a);
  var d = (((a >>> 24) | (b << 8)) >>> 0) & 16777215;
  b = (b >> 16) & 65535;
  a = (a & 16777215) + 6777216 * d + 6710656 * b;
  d += 8147497 * b;
  b *= 2;
  1e7 <= a && ((d += Math.floor(a / 1e7)), (a %= 1e7));
  1e7 <= d && ((b += Math.floor(d / 1e7)), (d %= 1e7));
  return c(b, 0) + c(d, b) + c(a, 1);
};
jspb.utils.joinSignedDecimalString = function (a, b) {
  var c = b & 2147483648;
  c && ((a = (~a + 1) >>> 0), (b = (~b + (0 == a ? 1 : 0)) >>> 0));
  a = jspb.utils.joinUnsignedDecimalString(a, b);
  return c ? '-' + a : a;
};
jspb.utils.hash64ToDecimalString = function (a, b) {
  jspb.utils.splitHash64(a);
  a = jspb.utils.split64Low;
  var c = jspb.utils.split64High;
  return b ? jspb.utils.joinSignedDecimalString(a, c) : jspb.utils.joinUnsignedDecimalString(a, c);
};
jspb.utils.hash64ArrayToDecimalStrings = function (a, b) {
  for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = jspb.utils.hash64ToDecimalString(a[d], b);
  return c;
};
jspb.utils.decimalStringToHash64 = function (a) {
  function b(a, b) {
    for (var c = 0; 8 > c && (1 !== a || 0 < b); c++) (b = a * e[c] + b), (e[c] = b & 255), (b >>>= 8);
  }
  function c() {
    for (var a = 0; 8 > a; a++) e[a] = ~e[a] & 255;
  }
  goog.asserts.assert(0 < a.length);
  var d = !1;
  '-' === a[0] && ((d = !0), (a = a.slice(1)));
  for (var e = [0, 0, 0, 0, 0, 0, 0, 0], f = 0; f < a.length; f++) b(10, a.charCodeAt(f) - jspb.utils.ZERO_CHAR_CODE_);
  d && (c(), b(1, 1));
  return goog.crypt.byteArrayToString(e);
};
jspb.utils.splitDecimalString = function (a) {
  jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
};
jspb.utils.toHexDigit_ = function (a) {
  return String.fromCharCode(10 > a ? jspb.utils.ZERO_CHAR_CODE_ + a : jspb.utils.A_CHAR_CODE_ - 10 + a);
};
jspb.utils.fromHexCharCode_ = function (a) {
  return a >= jspb.utils.A_CHAR_CODE_ ? a - jspb.utils.A_CHAR_CODE_ + 10 : a - jspb.utils.ZERO_CHAR_CODE_;
};
jspb.utils.hash64ToHexString = function (a) {
  var b = Array(18);
  b[0] = '0';
  b[1] = 'x';
  for (var c = 0; 8 > c; c++) {
    var d = a.charCodeAt(7 - c);
    b[2 * c + 2] = jspb.utils.toHexDigit_(d >> 4);
    b[2 * c + 3] = jspb.utils.toHexDigit_(d & 15);
  }
  return b.join('');
};
jspb.utils.hexStringToHash64 = function (a) {
  a = a.toLowerCase();
  goog.asserts.assert(18 == a.length);
  goog.asserts.assert('0' == a[0]);
  goog.asserts.assert('x' == a[1]);
  for (var b = '', c = 0; 8 > c; c++) {
    var d = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 2)),
      e = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 3));
    b = String.fromCharCode(16 * d + e) + b;
  }
  return b;
};
jspb.utils.hash64ToNumber = function (a, b) {
  jspb.utils.splitHash64(a);
  a = jspb.utils.split64Low;
  var c = jspb.utils.split64High;
  return b ? jspb.utils.joinInt64(a, c) : jspb.utils.joinUint64(a, c);
};
jspb.utils.numberToHash64 = function (a) {
  jspb.utils.splitInt64(a);
  return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.utils.countVarints = function (a, b, c) {
  for (var d = 0, e = b; e < c; e++) d += a[e] >> 7;
  return c - b - d;
};
jspb.utils.countVarintFields = function (a, b, c, d) {
  var e = 0;
  d = 8 * d + jspb.BinaryConstants.WireType.VARINT;
  if (128 > d)
    for (; b < c && a[b++] == d; )
      for (e++; ; ) {
        var f = a[b++];
        if (0 == (f & 128)) break;
      }
  else
    for (; b < c; ) {
      for (f = d; 128 < f; ) {
        if (a[b] != ((f & 127) | 128)) return e;
        b++;
        f >>= 7;
      }
      if (a[b++] != f) break;
      for (e++; (f = a[b++]), 0 != (f & 128); );
    }
  return e;
};
jspb.utils.countFixedFields_ = function (a, b, c, d, e) {
  var f = 0;
  if (128 > d) for (; b < c && a[b++] == d; ) f++, (b += e);
  else
    for (; b < c; ) {
      for (var g = d; 128 < g; ) {
        if (a[b++] != ((g & 127) | 128)) return f;
        g >>= 7;
      }
      if (a[b++] != g) break;
      f++;
      b += e;
    }
  return f;
};
jspb.utils.countFixed32Fields = function (a, b, c, d) {
  return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED32, 4);
};
jspb.utils.countFixed64Fields = function (a, b, c, d) {
  return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED64, 8);
};
jspb.utils.countDelimitedFields = function (a, b, c, d) {
  var e = 0;
  for (d = 8 * d + jspb.BinaryConstants.WireType.DELIMITED; b < c; ) {
    for (var f = d; 128 < f; ) {
      if (a[b++] != ((f & 127) | 128)) return e;
      f >>= 7;
    }
    if (a[b++] != f) break;
    e++;
    for (var g = 0, h = 1; (f = a[b++]), (g += (f & 127) * h), (h *= 128), 0 != (f & 128); );
    b += g;
  }
  return e;
};
jspb.utils.debugBytesToTextFormat = function (a) {
  var b = '"';
  if (a) {
    a = jspb.utils.byteSourceToUint8Array(a);
    for (var c = 0; c < a.length; c++) (b += '\\x'), 16 > a[c] && (b += '0'), (b += a[c].toString(16));
  }
  return b + '"';
};
jspb.utils.stringToByteArray = function (a) {
  for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
    var d = a.charCodeAt(c);
    if (255 < d) throw Error('Conversion error: string contains codepoint outside of byte range');
    b[c] = d;
  }
  return b;
};
jspb.utils.byteSourceToUint8Array = function (a) {
  if (a.constructor === Uint8Array) return a;
  if (
    a.constructor === ArrayBuffer ||
    ('undefined' != typeof Buffer && a.constructor === Buffer) ||
    a.constructor === Array
  )
    return new Uint8Array(a);
  if (a.constructor === String) return goog.crypt.base64.decodeStringToUint8Array(a);
  goog.asserts.fail('Type not convertible to Uint8Array.');
  return new Uint8Array(0);
};
jspb.BinaryDecoder = function (a, b, c) {
  this.bytes_ = null;
  this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
  a && this.setBlock(a, b, c);
};
jspb.BinaryDecoder.instanceCache_ = [];
jspb.BinaryDecoder.alloc = function (a, b, c) {
  if (jspb.BinaryDecoder.instanceCache_.length) {
    var d = jspb.BinaryDecoder.instanceCache_.pop();
    a && d.setBlock(a, b, c);
    return d;
  }
  return new jspb.BinaryDecoder(a, b, c);
};
jspb.BinaryDecoder.prototype.free = function () {
  this.clear();
  100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
};
jspb.BinaryDecoder.prototype.clone = function () {
  return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
};
jspb.BinaryDecoder.prototype.clear = function () {
  this.bytes_ = null;
  this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
};
jspb.BinaryDecoder.prototype.getBuffer = function () {
  return this.bytes_;
};
jspb.BinaryDecoder.prototype.setBlock = function (a, b, c) {
  this.bytes_ = jspb.utils.byteSourceToUint8Array(a);
  this.start_ = void 0 !== b ? b : 0;
  this.end_ = void 0 !== c ? this.start_ + c : this.bytes_.length;
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getEnd = function () {
  return this.end_;
};
jspb.BinaryDecoder.prototype.setEnd = function (a) {
  this.end_ = a;
};
jspb.BinaryDecoder.prototype.reset = function () {
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getCursor = function () {
  return this.cursor_;
};
jspb.BinaryDecoder.prototype.setCursor = function (a) {
  this.cursor_ = a;
};
jspb.BinaryDecoder.prototype.advance = function (a) {
  this.cursor_ += a;
  goog.asserts.assert(this.cursor_ <= this.end_);
};
jspb.BinaryDecoder.prototype.atEnd = function () {
  return this.cursor_ == this.end_;
};
jspb.BinaryDecoder.prototype.pastEnd = function () {
  return this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.getError = function () {
  return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.readSplitVarint64 = function (a) {
  for (var b = 128, c = 0, d = 0, e = 0; 4 > e && 128 <= b; e++)
    (b = this.bytes_[this.cursor_++]), (c |= (b & 127) << (7 * e));
  128 <= b && ((b = this.bytes_[this.cursor_++]), (c |= (b & 127) << 28), (d |= (b & 127) >> 4));
  if (128 <= b) for (e = 0; 5 > e && 128 <= b; e++) (b = this.bytes_[this.cursor_++]), (d |= (b & 127) << (7 * e + 3));
  if (128 > b) return a(c >>> 0, d >>> 0);
  goog.asserts.fail('Failed to read varint, encoding is invalid.');
  this.error_ = !0;
};
jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function (a) {
  return this.readSplitVarint64(function (b, c) {
    return jspb.utils.fromZigzag64(b, c, a);
  });
};
jspb.BinaryDecoder.prototype.readSplitFixed64 = function (a) {
  var b = this.bytes_,
    c = this.cursor_;
  this.cursor_ += 8;
  for (var d = 0, e = 0, f = c + 7; f >= c; f--) (d = (d << 8) | b[f]), (e = (e << 8) | b[f + 4]);
  return a(d, e);
};
jspb.BinaryDecoder.prototype.skipVarint = function () {
  for (; this.bytes_[this.cursor_] & 128; ) this.cursor_++;
  this.cursor_++;
};
jspb.BinaryDecoder.prototype.unskipVarint = function (a) {
  for (; 128 < a; ) this.cursor_--, (a >>>= 7);
  this.cursor_--;
};
jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
  var a = this.bytes_;
  var b = a[this.cursor_ + 0];
  var c = b & 127;
  if (128 > b) return (this.cursor_ += 1), goog.asserts.assert(this.cursor_ <= this.end_), c;
  b = a[this.cursor_ + 1];
  c |= (b & 127) << 7;
  if (128 > b) return (this.cursor_ += 2), goog.asserts.assert(this.cursor_ <= this.end_), c;
  b = a[this.cursor_ + 2];
  c |= (b & 127) << 14;
  if (128 > b) return (this.cursor_ += 3), goog.asserts.assert(this.cursor_ <= this.end_), c;
  b = a[this.cursor_ + 3];
  c |= (b & 127) << 21;
  if (128 > b) return (this.cursor_ += 4), goog.asserts.assert(this.cursor_ <= this.end_), c;
  b = a[this.cursor_ + 4];
  c |= (b & 15) << 28;
  if (128 > b) return (this.cursor_ += 5), goog.asserts.assert(this.cursor_ <= this.end_), c >>> 0;
  this.cursor_ += 5;
  128 <= a[this.cursor_++] &&
    128 <= a[this.cursor_++] &&
    128 <= a[this.cursor_++] &&
    128 <= a[this.cursor_++] &&
    128 <= a[this.cursor_++] &&
    goog.asserts.assert(!1);
  goog.asserts.assert(this.cursor_ <= this.end_);
  return c;
};
jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function () {
  return this.readUnsignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readSignedVarint32String = function () {
  return this.readSignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
  var a = this.readUnsignedVarint32();
  return (a >>> 1) ^ -(a & 1);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
  return this.readSplitVarint64(jspb.utils.joinUint64);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function () {
  return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString);
};
jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
  return this.readSplitVarint64(jspb.utils.joinInt64);
};
jspb.BinaryDecoder.prototype.readSignedVarint64String = function () {
  return this.readSplitVarint64(jspb.utils.joinSignedDecimalString);
};
jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
  return this.readSplitVarint64(jspb.utils.joinZigzag64);
};
jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function () {
  return this.readSplitZigzagVarint64(jspb.utils.joinHash64);
};
jspb.BinaryDecoder.prototype.readZigzagVarint64String = function () {
  return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString);
};
jspb.BinaryDecoder.prototype.readUint8 = function () {
  var a = this.bytes_[this.cursor_ + 0];
  this.cursor_ += 1;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return a;
};
jspb.BinaryDecoder.prototype.readUint16 = function () {
  var a = this.bytes_[this.cursor_ + 0],
    b = this.bytes_[this.cursor_ + 1];
  this.cursor_ += 2;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (a << 0) | (b << 8);
};
jspb.BinaryDecoder.prototype.readUint32 = function () {
  var a = this.bytes_[this.cursor_ + 0],
    b = this.bytes_[this.cursor_ + 1],
    c = this.bytes_[this.cursor_ + 2],
    d = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
};
jspb.BinaryDecoder.prototype.readUint64 = function () {
  var a = this.readUint32(),
    b = this.readUint32();
  return jspb.utils.joinUint64(a, b);
};
jspb.BinaryDecoder.prototype.readUint64String = function () {
  var a = this.readUint32(),
    b = this.readUint32();
  return jspb.utils.joinUnsignedDecimalString(a, b);
};
jspb.BinaryDecoder.prototype.readInt8 = function () {
  var a = this.bytes_[this.cursor_ + 0];
  this.cursor_ += 1;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (a << 24) >> 24;
};
jspb.BinaryDecoder.prototype.readInt16 = function () {
  var a = this.bytes_[this.cursor_ + 0],
    b = this.bytes_[this.cursor_ + 1];
  this.cursor_ += 2;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (((a << 0) | (b << 8)) << 16) >> 16;
};
jspb.BinaryDecoder.prototype.readInt32 = function () {
  var a = this.bytes_[this.cursor_ + 0],
    b = this.bytes_[this.cursor_ + 1],
    c = this.bytes_[this.cursor_ + 2],
    d = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (a << 0) | (b << 8) | (c << 16) | (d << 24);
};
jspb.BinaryDecoder.prototype.readInt64 = function () {
  var a = this.readUint32(),
    b = this.readUint32();
  return jspb.utils.joinInt64(a, b);
};
jspb.BinaryDecoder.prototype.readInt64String = function () {
  var a = this.readUint32(),
    b = this.readUint32();
  return jspb.utils.joinSignedDecimalString(a, b);
};
jspb.BinaryDecoder.prototype.readFloat = function () {
  var a = this.readUint32();
  return jspb.utils.joinFloat32(a, 0);
};
jspb.BinaryDecoder.prototype.readDouble = function () {
  var a = this.readUint32(),
    b = this.readUint32();
  return jspb.utils.joinFloat64(a, b);
};
jspb.BinaryDecoder.prototype.readBool = function () {
  return !!this.bytes_[this.cursor_++];
};
jspb.BinaryDecoder.prototype.readEnum = function () {
  return this.readSignedVarint32();
};
jspb.BinaryDecoder.prototype.readString = function (a) {
  var b = this.bytes_,
    c = this.cursor_;
  a = c + a;
  for (var d = [], e = ''; c < a; ) {
    var f = b[c++];
    if (128 > f) d.push(f);
    else if (192 > f) continue;
    else if (224 > f) {
      var g = b[c++];
      d.push(((f & 31) << 6) | (g & 63));
    } else if (240 > f) {
      g = b[c++];
      var h = b[c++];
      d.push(((f & 15) << 12) | ((g & 63) << 6) | (h & 63));
    } else if (248 > f) {
      g = b[c++];
      h = b[c++];
      var k = b[c++];
      f = ((f & 7) << 18) | ((g & 63) << 12) | ((h & 63) << 6) | (k & 63);
      f -= 65536;
      d.push(((f >> 10) & 1023) + 55296, (f & 1023) + 56320);
    }
    8192 <= d.length && ((e += String.fromCharCode.apply(null, d)), (d.length = 0));
  }
  e += goog.crypt.byteArrayToString(d);
  this.cursor_ = c;
  return e;
};
jspb.BinaryDecoder.prototype.readStringWithLength = function () {
  var a = this.readUnsignedVarint32();
  return this.readString(a);
};
jspb.BinaryDecoder.prototype.readBytes = function (a) {
  if (0 > a || this.cursor_ + a > this.bytes_.length)
    return (this.error_ = !0), goog.asserts.fail('Invalid byte length!'), new Uint8Array(0);
  var b = this.bytes_.subarray(this.cursor_, this.cursor_ + a);
  this.cursor_ += a;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return b;
};
jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
  return this.readSplitVarint64(jspb.utils.joinHash64);
};
jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
  var a = this.bytes_,
    b = this.cursor_,
    c = a[b + 0],
    d = a[b + 1],
    e = a[b + 2],
    f = a[b + 3],
    g = a[b + 4],
    h = a[b + 5],
    k = a[b + 6];
  a = a[b + 7];
  this.cursor_ += 8;
  return String.fromCharCode(c, d, e, f, g, h, k, a);
};
jspb.BinaryReader = function (a, b, c) {
  this.decoder_ = jspb.BinaryDecoder.alloc(a, b, c);
  this.fieldCursor_ = this.decoder_.getCursor();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
  this.readCallbacks_ = null;
};
jspb.BinaryReader.instanceCache_ = [];
jspb.BinaryReader.alloc = function (a, b, c) {
  if (jspb.BinaryReader.instanceCache_.length) {
    var d = jspb.BinaryReader.instanceCache_.pop();
    a && d.decoder_.setBlock(a, b, c);
    return d;
  }
  return new jspb.BinaryReader(a, b, c);
};
jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free = function () {
  this.decoder_.clear();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
  this.readCallbacks_ = null;
  100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
};
jspb.BinaryReader.prototype.getFieldCursor = function () {
  return this.fieldCursor_;
};
jspb.BinaryReader.prototype.getCursor = function () {
  return this.decoder_.getCursor();
};
jspb.BinaryReader.prototype.getBuffer = function () {
  return this.decoder_.getBuffer();
};
jspb.BinaryReader.prototype.getFieldNumber = function () {
  return this.nextField_;
};
jspb.BinaryReader.prototype.getWireType = function () {
  return this.nextWireType_;
};
jspb.BinaryReader.prototype.isEndGroup = function () {
  return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
};
jspb.BinaryReader.prototype.getError = function () {
  return this.error_ || this.decoder_.getError();
};
jspb.BinaryReader.prototype.setBlock = function (a, b, c) {
  this.decoder_.setBlock(a, b, c);
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.reset = function () {
  this.decoder_.reset();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.advance = function (a) {
  this.decoder_.advance(a);
};
jspb.BinaryReader.prototype.nextField = function () {
  if (this.decoder_.atEnd()) return !1;
  if (this.getError()) return goog.asserts.fail('Decoder hit an error'), !1;
  this.fieldCursor_ = this.decoder_.getCursor();
  var a = this.decoder_.readUnsignedVarint32(),
    b = a >>> 3;
  a &= 7;
  if (
    a != jspb.BinaryConstants.WireType.VARINT &&
    a != jspb.BinaryConstants.WireType.FIXED32 &&
    a != jspb.BinaryConstants.WireType.FIXED64 &&
    a != jspb.BinaryConstants.WireType.DELIMITED &&
    a != jspb.BinaryConstants.WireType.START_GROUP &&
    a != jspb.BinaryConstants.WireType.END_GROUP
  )
    return goog.asserts.fail('Invalid wire type: %s (at position %s)', a, this.fieldCursor_), (this.error_ = !0), !1;
  this.nextField_ = b;
  this.nextWireType_ = a;
  return !0;
};
jspb.BinaryReader.prototype.unskipHeader = function () {
  this.decoder_.unskipVarint((this.nextField_ << 3) | this.nextWireType_);
};
jspb.BinaryReader.prototype.skipMatchingFields = function () {
  var a = this.nextField_;
  for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a; ) this.skipField();
  this.decoder_.atEnd() || this.unskipHeader();
};
jspb.BinaryReader.prototype.skipVarintField = function () {
  this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT
    ? (goog.asserts.fail('Invalid wire type for skipVarintField'), this.skipField())
    : this.decoder_.skipVarint();
};
jspb.BinaryReader.prototype.skipDelimitedField = function () {
  if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED)
    goog.asserts.fail('Invalid wire type for skipDelimitedField'), this.skipField();
  else {
    var a = this.decoder_.readUnsignedVarint32();
    this.decoder_.advance(a);
  }
};
jspb.BinaryReader.prototype.skipFixed32Field = function () {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32
    ? (goog.asserts.fail('Invalid wire type for skipFixed32Field'), this.skipField())
    : this.decoder_.advance(4);
};
jspb.BinaryReader.prototype.skipFixed64Field = function () {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64
    ? (goog.asserts.fail('Invalid wire type for skipFixed64Field'), this.skipField())
    : this.decoder_.advance(8);
};
jspb.BinaryReader.prototype.skipGroup = function () {
  var a = this.nextField_;
  do {
    if (!this.nextField()) {
      goog.asserts.fail('Unmatched start-group tag: stream EOF');
      this.error_ = !0;
      break;
    }
    if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
      this.nextField_ != a && (goog.asserts.fail('Unmatched end-group tag'), (this.error_ = !0));
      break;
    }
    this.skipField();
  } while (1);
};
jspb.BinaryReader.prototype.skipField = function () {
  switch (this.nextWireType_) {
    case jspb.BinaryConstants.WireType.VARINT:
      this.skipVarintField();
      break;
    case jspb.BinaryConstants.WireType.FIXED64:
      this.skipFixed64Field();
      break;
    case jspb.BinaryConstants.WireType.DELIMITED:
      this.skipDelimitedField();
      break;
    case jspb.BinaryConstants.WireType.FIXED32:
      this.skipFixed32Field();
      break;
    case jspb.BinaryConstants.WireType.START_GROUP:
      this.skipGroup();
      break;
    default:
      goog.asserts.fail('Invalid wire encoding for field.');
  }
};
jspb.BinaryReader.prototype.registerReadCallback = function (a, b) {
  null === this.readCallbacks_ && (this.readCallbacks_ = {});
  goog.asserts.assert(!this.readCallbacks_[a]);
  this.readCallbacks_[a] = b;
};
jspb.BinaryReader.prototype.runReadCallback = function (a) {
  goog.asserts.assert(null !== this.readCallbacks_);
  a = this.readCallbacks_[a];
  goog.asserts.assert(a);
  return a(this);
};
jspb.BinaryReader.prototype.readAny = function (a) {
  this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a);
  var b = jspb.BinaryConstants.FieldType;
  switch (a) {
    case b.DOUBLE:
      return this.readDouble();
    case b.FLOAT:
      return this.readFloat();
    case b.INT64:
      return this.readInt64();
    case b.UINT64:
      return this.readUint64();
    case b.INT32:
      return this.readInt32();
    case b.FIXED64:
      return this.readFixed64();
    case b.FIXED32:
      return this.readFixed32();
    case b.BOOL:
      return this.readBool();
    case b.STRING:
      return this.readString();
    case b.GROUP:
      goog.asserts.fail('Group field type not supported in readAny()');
    case b.MESSAGE:
      goog.asserts.fail('Message field type not supported in readAny()');
    case b.BYTES:
      return this.readBytes();
    case b.UINT32:
      return this.readUint32();
    case b.ENUM:
      return this.readEnum();
    case b.SFIXED32:
      return this.readSfixed32();
    case b.SFIXED64:
      return this.readSfixed64();
    case b.SINT32:
      return this.readSint32();
    case b.SINT64:
      return this.readSint64();
    case b.FHASH64:
      return this.readFixedHash64();
    case b.VHASH64:
      return this.readVarintHash64();
    default:
      goog.asserts.fail('Invalid field type in readAny()');
  }
  return 0;
};
jspb.BinaryReader.prototype.readMessage = function (a, b) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var c = this.decoder_.getEnd(),
    d = this.decoder_.readUnsignedVarint32();
  d = this.decoder_.getCursor() + d;
  this.decoder_.setEnd(d);
  b(a, this);
  this.decoder_.setCursor(d);
  this.decoder_.setEnd(c);
};
jspb.BinaryReader.prototype.readGroup = function (a, b, c) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
  goog.asserts.assert(this.nextField_ == a);
  c(b, this);
  this.error_ ||
    this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP ||
    (goog.asserts.fail('Group submessage did not end with an END_GROUP tag'), (this.error_ = !0));
};
jspb.BinaryReader.prototype.getFieldDecoder = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32(),
    b = this.decoder_.getCursor(),
    c = b + a;
  a = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b, a);
  this.decoder_.setCursor(c);
  return a;
};
jspb.BinaryReader.prototype.readInt32 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32();
};
jspb.BinaryReader.prototype.readInt32String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32String();
};
jspb.BinaryReader.prototype.readInt64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readInt64String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64String();
};
jspb.BinaryReader.prototype.readUint32 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readUint32String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32String();
};
jspb.BinaryReader.prototype.readUint64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64();
};
jspb.BinaryReader.prototype.readUint64String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64String();
};
jspb.BinaryReader.prototype.readSint32 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint32();
};
jspb.BinaryReader.prototype.readSint64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint64();
};
jspb.BinaryReader.prototype.readSint64String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint64String();
};
jspb.BinaryReader.prototype.readFixed32 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readUint32();
};
jspb.BinaryReader.prototype.readFixed64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readUint64();
};
jspb.BinaryReader.prototype.readFixed64String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readUint64String();
};
jspb.BinaryReader.prototype.readSfixed32 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readInt32();
};
jspb.BinaryReader.prototype.readSfixed32String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readInt32().toString();
};
jspb.BinaryReader.prototype.readSfixed64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readInt64();
};
jspb.BinaryReader.prototype.readSfixed64String = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readInt64String();
};
jspb.BinaryReader.prototype.readFloat = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readFloat();
};
jspb.BinaryReader.prototype.readDouble = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readDouble();
};
jspb.BinaryReader.prototype.readBool = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return !!this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readEnum = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readString = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readString(a);
};
jspb.BinaryReader.prototype.readBytes = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readBytes(a);
};
jspb.BinaryReader.prototype.readVarintHash64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readVarintHash64();
};
jspb.BinaryReader.prototype.readSintHash64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarintHash64();
};
jspb.BinaryReader.prototype.readSplitVarint64 = function (a) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSplitVarint64(a);
};
jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function (a) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSplitVarint64(function (b, c) {
    return jspb.utils.fromZigzag64(b, c, a);
  });
};
jspb.BinaryReader.prototype.readFixedHash64 = function () {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readFixedHash64();
};
jspb.BinaryReader.prototype.readSplitFixed64 = function (a) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readSplitFixed64(a);
};
jspb.BinaryReader.prototype.readPackedField_ = function (a) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var b = this.decoder_.readUnsignedVarint32();
  b = this.decoder_.getCursor() + b;
  for (var c = []; this.decoder_.getCursor() < b; ) c.push(a.call(this.decoder_));
  return c;
};
jspb.BinaryReader.prototype.readPackedInt32 = function () {
  return this.readPackedField_(this.decoder_.readSignedVarint32);
};
jspb.BinaryReader.prototype.readPackedInt32String = function () {
  return this.readPackedField_(this.decoder_.readSignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedInt64 = function () {
  return this.readPackedField_(this.decoder_.readSignedVarint64);
};
jspb.BinaryReader.prototype.readPackedInt64String = function () {
  return this.readPackedField_(this.decoder_.readSignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedUint32 = function () {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32);
};
jspb.BinaryReader.prototype.readPackedUint32String = function () {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedUint64 = function () {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64);
};
jspb.BinaryReader.prototype.readPackedUint64String = function () {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedSint32 = function () {
  return this.readPackedField_(this.decoder_.readZigzagVarint32);
};
jspb.BinaryReader.prototype.readPackedSint64 = function () {
  return this.readPackedField_(this.decoder_.readZigzagVarint64);
};
jspb.BinaryReader.prototype.readPackedSint64String = function () {
  return this.readPackedField_(this.decoder_.readZigzagVarint64String);
};
jspb.BinaryReader.prototype.readPackedFixed32 = function () {
  return this.readPackedField_(this.decoder_.readUint32);
};
jspb.BinaryReader.prototype.readPackedFixed64 = function () {
  return this.readPackedField_(this.decoder_.readUint64);
};
jspb.BinaryReader.prototype.readPackedFixed64String = function () {
  return this.readPackedField_(this.decoder_.readUint64String);
};
jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
  return this.readPackedField_(this.decoder_.readInt32);
};
jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
  return this.readPackedField_(this.decoder_.readInt64);
};
jspb.BinaryReader.prototype.readPackedSfixed64String = function () {
  return this.readPackedField_(this.decoder_.readInt64String);
};
jspb.BinaryReader.prototype.readPackedFloat = function () {
  return this.readPackedField_(this.decoder_.readFloat);
};
jspb.BinaryReader.prototype.readPackedDouble = function () {
  return this.readPackedField_(this.decoder_.readDouble);
};
jspb.BinaryReader.prototype.readPackedBool = function () {
  return this.readPackedField_(this.decoder_.readBool);
};
jspb.BinaryReader.prototype.readPackedEnum = function () {
  return this.readPackedField_(this.decoder_.readEnum);
};
jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
  return this.readPackedField_(this.decoder_.readVarintHash64);
};
jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
  return this.readPackedField_(this.decoder_.readFixedHash64);
};
jspb.Map = function (a, b) {
  this.arr_ = a;
  this.valueCtor_ = b;
  this.map_ = {};
  this.arrClean = !0;
  0 < this.arr_.length && this.loadFromArray_();
};
jspb.Map.prototype.loadFromArray_ = function () {
  for (var a = 0; a < this.arr_.length; a++) {
    var b = this.arr_[a],
      c = b[0];
    this.map_[c.toString()] = new jspb.Map.Entry_(c, b[1]);
  }
  this.arrClean = !0;
};
jspb.Map.prototype.toArray = function () {
  if (this.arrClean) {
    if (this.valueCtor_) {
      var a = this.map_,
        b;
      for (b in a)
        if (Object.prototype.hasOwnProperty.call(a, b)) {
          var c = a[b].valueWrapper;
          c && c.toArray();
        }
    }
  } else {
    this.arr_.length = 0;
    a = this.stringKeys_();
    a.sort();
    for (b = 0; b < a.length; b++) {
      var d = this.map_[a[b]];
      (c = d.valueWrapper) && c.toArray();
      this.arr_.push([d.key, d.value]);
    }
    this.arrClean = !0;
  }
  return this.arr_;
};
jspb.Map.prototype.toObject = function (a, b) {
  for (var c = this.toArray(), d = [], e = 0; e < c.length; e++) {
    var f = this.map_[c[e][0].toString()];
    this.wrapEntry_(f);
    var g = f.valueWrapper;
    g ? (goog.asserts.assert(b), d.push([f.key, b(a, g)])) : d.push([f.key, f.value]);
  }
  return d;
};
jspb.Map.fromObject = function (a, b, c) {
  b = new jspb.Map([], b);
  for (var d = 0; d < a.length; d++) {
    var e = a[d][0],
      f = c(a[d][1]);
    b.set(e, f);
  }
  return b;
};
jspb.Map.ArrayIteratorIterable_ = function (a) {
  this.idx_ = 0;
  this.arr_ = a;
};
jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
  return this.idx_ < this.arr_.length ? { done: !1, value: this.arr_[this.idx_++] } : { done: !0, value: void 0 };
};
'undefined' != typeof Symbol &&
  (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function () {
    return this;
  });
jspb.Map.prototype.getLength = function () {
  return this.stringKeys_().length;
};
jspb.Map.prototype.clear = function () {
  this.map_ = {};
  this.arrClean = !1;
};
jspb.Map.prototype.del = function (a) {
  a = a.toString();
  var b = this.map_.hasOwnProperty(a);
  delete this.map_[a];
  this.arrClean = !1;
  return b;
};
jspb.Map.prototype.getEntryList = function () {
  var a = [],
    b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    var d = this.map_[b[c]];
    a.push([d.key, d.value]);
  }
  return a;
};
jspb.Map.prototype.entries = function () {
  var a = [],
    b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    var d = this.map_[b[c]];
    a.push([d.key, this.wrapEntry_(d)]);
  }
  return new jspb.Map.ArrayIteratorIterable_(a);
};
jspb.Map.prototype.keys = function () {
  var a = [],
    b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) a.push(this.map_[b[c]].key);
  return new jspb.Map.ArrayIteratorIterable_(a);
};
jspb.Map.prototype.values = function () {
  var a = [],
    b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) a.push(this.wrapEntry_(this.map_[b[c]]));
  return new jspb.Map.ArrayIteratorIterable_(a);
};
jspb.Map.prototype.forEach = function (a, b) {
  var c = this.stringKeys_();
  c.sort();
  for (var d = 0; d < c.length; d++) {
    var e = this.map_[c[d]];
    a.call(b, this.wrapEntry_(e), e.key, this);
  }
};
jspb.Map.prototype.set = function (a, b) {
  var c = new jspb.Map.Entry_(a);
  this.valueCtor_ ? ((c.valueWrapper = b), (c.value = b.toArray())) : (c.value = b);
  this.map_[a.toString()] = c;
  this.arrClean = !1;
  return this;
};
jspb.Map.prototype.wrapEntry_ = function (a) {
  return this.valueCtor_
    ? (a.valueWrapper || (a.valueWrapper = new this.valueCtor_(a.value)), a.valueWrapper)
    : a.value;
};
jspb.Map.prototype.get = function (a) {
  if ((a = this.map_[a.toString()])) return this.wrapEntry_(a);
};
jspb.Map.prototype.has = function (a) {
  return a.toString() in this.map_;
};
jspb.Map.prototype.serializeBinary = function (a, b, c, d, e) {
  var f = this.stringKeys_();
  f.sort();
  for (var g = 0; g < f.length; g++) {
    var h = this.map_[f[g]];
    b.beginSubMessage(a);
    c.call(b, 1, h.key);
    this.valueCtor_ ? d.call(b, 2, this.wrapEntry_(h), e) : d.call(b, 2, h.value);
    b.endSubMessage();
  }
};
jspb.Map.deserializeBinary = function (a, b, c, d, e, f, g) {
  for (; b.nextField() && !b.isEndGroup(); ) {
    var h = b.getFieldNumber();
    1 == h
      ? (f = c.call(b))
      : 2 == h &&
        (a.valueCtor_ ? (goog.asserts.assert(e), g || (g = new a.valueCtor_()), d.call(b, g, e)) : (g = d.call(b)));
  }
  goog.asserts.assert(void 0 != f);
  goog.asserts.assert(void 0 != g);
  a.set(f, g);
};
jspb.Map.prototype.stringKeys_ = function () {
  var a = this.map_,
    b = [],
    c;
  for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
  return b;
};
jspb.Map.Entry_ = function (a, b) {
  this.key = a;
  this.value = b;
  this.valueWrapper = void 0;
};
jspb.ExtensionFieldInfo = function (a, b, c, d, e) {
  this.fieldIndex = a;
  this.fieldName = b;
  this.ctor = c;
  this.toObjectFn = d;
  this.isRepeated = e;
};
jspb.ExtensionFieldBinaryInfo = function (a, b, c, d, e, f) {
  this.fieldInfo = a;
  this.binaryReaderFn = b;
  this.binaryWriterFn = c;
  this.binaryMessageSerializeFn = d;
  this.binaryMessageDeserializeFn = e;
  this.isPacked = f;
};
jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
  return !!this.ctor;
};
jspb.Message = function () {};
jspb.Message.GENERATE_TO_OBJECT = !0;
jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING = !0;
jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0;
jspb.Message.SUPPORTS_UINT8ARRAY_ = 'function' == typeof Uint8Array;
jspb.Message.prototype.getJsPbMessageId = function () {
  return this.messageId_;
};
jspb.Message.getIndex_ = function (a, b) {
  return b + a.arrayIndexOffset_;
};
jspb.Message.hiddenES6Property_ = function () {};
jspb.Message.getFieldNumber_ = function (a, b) {
  return b - a.arrayIndexOffset_;
};
jspb.Message.initialize = function (a, b, c, d, e, f) {
  a.wrappers_ = null;
  b || (b = c ? [c] : []);
  a.messageId_ = c ? String(c) : void 0;
  a.arrayIndexOffset_ = 0 === c ? -1 : 0;
  a.array = b;
  jspb.Message.initPivotAndExtensionObject_(a, d);
  a.convertedPrimitiveFields_ = {};
  jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS || (a.repeatedFields = e);
  if (e)
    for (b = 0; b < e.length; b++)
      (c = e[b]),
        c < a.pivot_
          ? ((c = jspb.Message.getIndex_(a, c)), (a.array[c] = a.array[c] || jspb.Message.EMPTY_LIST_SENTINEL_))
          : (jspb.Message.maybeInitEmptyExtensionObject_(a),
            (a.extensionObject_[c] = a.extensionObject_[c] || jspb.Message.EMPTY_LIST_SENTINEL_));
  if (f && f.length) for (b = 0; b < f.length; b++) jspb.Message.computeOneofCase(a, f[b]);
};
jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
jspb.Message.isArray_ = function (a) {
  return jspb.Message.ASSUME_LOCAL_ARRAYS ? a instanceof Array : Array.isArray(a);
};
jspb.Message.isExtensionObject_ = function (a) {
  return (
    null !== a &&
    'object' == typeof a &&
    !jspb.Message.isArray_(a) &&
    !(jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array)
  );
};
jspb.Message.initPivotAndExtensionObject_ = function (a, b) {
  var c = a.array.length,
    d = -1;
  if (c && ((d = c - 1), (c = a.array[d]), jspb.Message.isExtensionObject_(c))) {
    a.pivot_ = jspb.Message.getFieldNumber_(a, d);
    a.extensionObject_ = c;
    return;
  }
  -1 < b
    ? ((a.pivot_ = Math.max(b, jspb.Message.getFieldNumber_(a, d + 1))), (a.extensionObject_ = null))
    : (a.pivot_ = Number.MAX_VALUE);
};
jspb.Message.maybeInitEmptyExtensionObject_ = function (a) {
  var b = jspb.Message.getIndex_(a, a.pivot_);
  a.array[b] || (a.extensionObject_ = a.array[b] = {});
};
jspb.Message.toObjectList = function (a, b, c) {
  for (var d = [], e = 0; e < a.length; e++) d[e] = b.call(a[e], c, a[e]);
  return d;
};
jspb.Message.toObjectExtension = function (a, b, c, d, e) {
  for (var f in c) {
    var g = c[f],
      h = d.call(a, g);
    if (null != h) {
      for (var k in g.fieldName) if (g.fieldName.hasOwnProperty(k)) break;
      b[k] = g.toObjectFn ? (g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e) : g.toObjectFn(e, h)) : h;
    }
  }
};
jspb.Message.serializeBinaryExtensions = function (a, b, c, d) {
  for (var e in c) {
    var f = c[e],
      g = f.fieldInfo;
    if (!f.binaryWriterFn)
      throw Error('Message extension present that was generated without binary serialization support');
    var h = d.call(a, g);
    if (null != h)
      if (g.isMessageType())
        if (f.binaryMessageSerializeFn) f.binaryWriterFn.call(b, g.fieldIndex, h, f.binaryMessageSerializeFn);
        else
          throw Error(
            'Message extension present holding submessage without binary support enabled, and message is being serialized to binary format'
          );
      else f.binaryWriterFn.call(b, g.fieldIndex, h);
  }
};
jspb.Message.readBinaryExtension = function (a, b, c, d, e) {
  var f = c[b.getFieldNumber()];
  if (f) {
    c = f.fieldInfo;
    if (!f.binaryReaderFn) throw Error('Deserializing extension whose generated code does not support binary format');
    if (c.isMessageType()) {
      var g = new c.ctor();
      f.binaryReaderFn.call(b, g, f.binaryMessageDeserializeFn);
    } else g = f.binaryReaderFn.call(b);
    c.isRepeated && !f.isPacked ? ((b = d.call(a, c)) ? b.push(g) : e.call(a, c, [g])) : e.call(a, c, g);
  } else b.skipField();
};
jspb.Message.getField = function (a, b) {
  if (b < a.pivot_) {
    b = jspb.Message.getIndex_(a, b);
    var c = a.array[b];
    return c === jspb.Message.EMPTY_LIST_SENTINEL_ ? (a.array[b] = []) : c;
  }
  if (a.extensionObject_)
    return (c = a.extensionObject_[b]), c === jspb.Message.EMPTY_LIST_SENTINEL_ ? (a.extensionObject_[b] = []) : c;
};
jspb.Message.getRepeatedField = function (a, b) {
  return jspb.Message.getField(a, b);
};
jspb.Message.getOptionalFloatingPointField = function (a, b) {
  a = jspb.Message.getField(a, b);
  return null == a ? a : +a;
};
jspb.Message.getBooleanField = function (a, b) {
  a = jspb.Message.getField(a, b);
  return null == a ? a : !!a;
};
jspb.Message.getRepeatedFloatingPointField = function (a, b) {
  var c = jspb.Message.getRepeatedField(a, b);
  a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
  if (!a.convertedPrimitiveFields_[b]) {
    for (var d = 0; d < c.length; d++) c[d] = +c[d];
    a.convertedPrimitiveFields_[b] = !0;
  }
  return c;
};
jspb.Message.getRepeatedBooleanField = function (a, b) {
  var c = jspb.Message.getRepeatedField(a, b);
  a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
  if (!a.convertedPrimitiveFields_[b]) {
    for (var d = 0; d < c.length; d++) c[d] = !!c[d];
    a.convertedPrimitiveFields_[b] = !0;
  }
  return c;
};
jspb.Message.bytesAsB64 = function (a) {
  if (null == a || 'string' === typeof a) return a;
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return goog.crypt.base64.encodeByteArray(a);
  goog.asserts.fail('Cannot coerce to b64 string: ' + goog.typeOf(a));
  return null;
};
jspb.Message.bytesAsU8 = function (a) {
  if (null == a || a instanceof Uint8Array) return a;
  if ('string' === typeof a) return goog.crypt.base64.decodeStringToUint8Array(a);
  goog.asserts.fail('Cannot coerce to Uint8Array: ' + goog.typeOf(a));
  return null;
};
jspb.Message.bytesListAsB64 = function (a) {
  jspb.Message.assertConsistentTypes_(a);
  return a.length && 'string' !== typeof a[0] ? goog.array.map(a, jspb.Message.bytesAsB64) : a;
};
jspb.Message.bytesListAsU8 = function (a) {
  jspb.Message.assertConsistentTypes_(a);
  return !a.length || a[0] instanceof Uint8Array ? a : goog.array.map(a, jspb.Message.bytesAsU8);
};
jspb.Message.assertConsistentTypes_ = function (a) {
  if (goog.DEBUG && a && 1 < a.length) {
    var b = goog.typeOf(a[0]);
    goog.array.forEach(a, function (a) {
      goog.typeOf(a) != b &&
        goog.asserts.fail('Inconsistent type in JSPB repeated field array. Got ' + goog.typeOf(a) + ' expected ' + b);
    });
  }
};
jspb.Message.getFieldWithDefault = function (a, b, c) {
  a = jspb.Message.getField(a, b);
  return null == a ? c : a;
};
jspb.Message.getBooleanFieldWithDefault = function (a, b, c) {
  a = jspb.Message.getBooleanField(a, b);
  return null == a ? c : a;
};
jspb.Message.getFloatingPointFieldWithDefault = function (a, b, c) {
  a = jspb.Message.getOptionalFloatingPointField(a, b);
  return null == a ? c : a;
};
jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
jspb.Message.getMapField = function (a, b, c, d) {
  a.wrappers_ || (a.wrappers_ = {});
  if (b in a.wrappers_) return a.wrappers_[b];
  var e = jspb.Message.getField(a, b);
  if (!e) {
    if (c) return;
    e = [];
    jspb.Message.setField(a, b, e);
  }
  return (a.wrappers_[b] = new jspb.Map(e, d));
};
jspb.Message.setField = function (a, b, c) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  b < a.pivot_
    ? (a.array[jspb.Message.getIndex_(a, b)] = c)
    : (jspb.Message.maybeInitEmptyExtensionObject_(a), (a.extensionObject_[b] = c));
  return a;
};
jspb.Message.setProto3IntField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
};
jspb.Message.setProto3FloatField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
};
jspb.Message.setProto3BooleanField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, !1);
};
jspb.Message.setProto3StringField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, '');
};
jspb.Message.setProto3BytesField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, '');
};
jspb.Message.setProto3EnumField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
};
jspb.Message.setProto3StringIntField = function (a, b, c) {
  return jspb.Message.setFieldIgnoringDefault_(a, b, c, '0');
};
jspb.Message.setFieldIgnoringDefault_ = function (a, b, c, d) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  c !== d
    ? jspb.Message.setField(a, b, c)
    : b < a.pivot_
    ? (a.array[jspb.Message.getIndex_(a, b)] = null)
    : (jspb.Message.maybeInitEmptyExtensionObject_(a), delete a.extensionObject_[b]);
  return a;
};
jspb.Message.addToRepeatedField = function (a, b, c, d) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  b = jspb.Message.getRepeatedField(a, b);
  void 0 != d ? b.splice(d, 0, c) : b.push(c);
  return a;
};
jspb.Message.setOneofField = function (a, b, c, d) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  (c = jspb.Message.computeOneofCase(a, c)) &&
    c !== b &&
    void 0 !== d &&
    (a.wrappers_ && c in a.wrappers_ && (a.wrappers_[c] = void 0), jspb.Message.setField(a, c, void 0));
  return jspb.Message.setField(a, b, d);
};
jspb.Message.computeOneofCase = function (a, b) {
  for (var c, d, e = 0; e < b.length; e++) {
    var f = b[e],
      g = jspb.Message.getField(a, f);
    null != g && ((c = f), (d = g), jspb.Message.setField(a, f, void 0));
  }
  return c ? (jspb.Message.setField(a, c, d), c) : 0;
};
jspb.Message.getWrapperField = function (a, b, c, d) {
  a.wrappers_ || (a.wrappers_ = {});
  if (!a.wrappers_[c]) {
    var e = jspb.Message.getField(a, c);
    if (d || e) a.wrappers_[c] = new b(e);
  }
  return a.wrappers_[c];
};
jspb.Message.getRepeatedWrapperField = function (a, b, c) {
  jspb.Message.wrapRepeatedField_(a, b, c);
  b = a.wrappers_[c];
  b == jspb.Message.EMPTY_LIST_SENTINEL_ && (b = a.wrappers_[c] = []);
  return b;
};
jspb.Message.wrapRepeatedField_ = function (a, b, c) {
  a.wrappers_ || (a.wrappers_ = {});
  if (!a.wrappers_[c]) {
    for (var d = jspb.Message.getRepeatedField(a, c), e = [], f = 0; f < d.length; f++) e[f] = new b(d[f]);
    a.wrappers_[c] = e;
  }
};
jspb.Message.setWrapperField = function (a, b, c) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  a.wrappers_ || (a.wrappers_ = {});
  var d = c ? c.toArray() : c;
  a.wrappers_[b] = c;
  return jspb.Message.setField(a, b, d);
};
jspb.Message.setOneofWrapperField = function (a, b, c, d) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  a.wrappers_ || (a.wrappers_ = {});
  var e = d ? d.toArray() : d;
  a.wrappers_[b] = d;
  return jspb.Message.setOneofField(a, b, c, e);
};
jspb.Message.setRepeatedWrapperField = function (a, b, c) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  a.wrappers_ || (a.wrappers_ = {});
  c = c || [];
  for (var d = [], e = 0; e < c.length; e++) d[e] = c[e].toArray();
  a.wrappers_[b] = c;
  return jspb.Message.setField(a, b, d);
};
jspb.Message.addToRepeatedWrapperField = function (a, b, c, d, e) {
  jspb.Message.wrapRepeatedField_(a, d, b);
  var f = a.wrappers_[b];
  f || (f = a.wrappers_[b] = []);
  c = c ? c : new d();
  a = jspb.Message.getRepeatedField(a, b);
  void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.toArray())) : (f.push(c), a.push(c.toArray()));
  return c;
};
jspb.Message.toMap = function (a, b, c, d) {
  for (var e = {}, f = 0; f < a.length; f++) e[b.call(a[f])] = c ? c.call(a[f], d, a[f]) : a[f];
  return e;
};
jspb.Message.prototype.syncMapFields_ = function () {
  if (this.wrappers_)
    for (var a in this.wrappers_) {
      var b = this.wrappers_[a];
      if (Array.isArray(b)) for (var c = 0; c < b.length; c++) b[c] && b[c].toArray();
      else b && b.toArray();
    }
};
jspb.Message.prototype.toArray = function () {
  this.syncMapFields_();
  return this.array;
};
jspb.Message.GENERATE_TO_STRING &&
  (jspb.Message.prototype.toString = function () {
    this.syncMapFields_();
    return this.array.toString();
  });
jspb.Message.prototype.getExtension = function (a) {
  if (this.extensionObject_) {
    this.wrappers_ || (this.wrappers_ = {});
    var b = a.fieldIndex;
    if (a.isRepeated) {
      if (a.isMessageType())
        return (
          this.wrappers_[b] ||
            (this.wrappers_[b] = goog.array.map(this.extensionObject_[b] || [], function (b) {
              return new a.ctor(b);
            })),
          this.wrappers_[b]
        );
    } else if (a.isMessageType())
      return (
        !this.wrappers_[b] && this.extensionObject_[b] && (this.wrappers_[b] = new a.ctor(this.extensionObject_[b])),
        this.wrappers_[b]
      );
    return this.extensionObject_[b];
  }
};
jspb.Message.prototype.setExtension = function (a, b) {
  this.wrappers_ || (this.wrappers_ = {});
  jspb.Message.maybeInitEmptyExtensionObject_(this);
  var c = a.fieldIndex;
  a.isRepeated
    ? ((b = b || []),
      a.isMessageType()
        ? ((this.wrappers_[c] = b),
          (this.extensionObject_[c] = goog.array.map(b, function (a) {
            return a.toArray();
          })))
        : (this.extensionObject_[c] = b))
    : a.isMessageType()
    ? ((this.wrappers_[c] = b), (this.extensionObject_[c] = b ? b.toArray() : b))
    : (this.extensionObject_[c] = b);
  return this;
};
jspb.Message.difference = function (a, b) {
  if (!(a instanceof b.constructor)) throw Error('Messages have different types.');
  var c = a.toArray();
  b = b.toArray();
  var d = [],
    e = 0,
    f = c.length > b.length ? c.length : b.length;
  a.getJsPbMessageId() && ((d[0] = a.getJsPbMessageId()), (e = 1));
  for (; e < f; e++) jspb.Message.compareFields(c[e], b[e]) || (d[e] = b[e]);
  return new a.constructor(d);
};
jspb.Message.equals = function (a, b) {
  return a == b || (!(!a || !b) && a instanceof b.constructor && jspb.Message.compareFields(a.toArray(), b.toArray()));
};
jspb.Message.compareExtensions = function (a, b) {
  a = a || {};
  b = b || {};
  var c = {},
    d;
  for (d in a) c[d] = 0;
  for (d in b) c[d] = 0;
  for (d in c) if (!jspb.Message.compareFields(a[d], b[d])) return !1;
  return !0;
};
jspb.Message.compareFields = function (a, b) {
  if (a == b) return !0;
  if (!goog.isObject(a) || !goog.isObject(b))
    return ('number' === typeof a && isNaN(a)) || ('number' === typeof b && isNaN(b)) ? String(a) == String(b) : !1;
  if (a.constructor != b.constructor) return !1;
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a.constructor === Uint8Array) {
    if (a.length != b.length) return !1;
    for (var c = 0; c < a.length; c++) if (a[c] != b[c]) return !1;
    return !0;
  }
  if (a.constructor === Array) {
    var d = void 0,
      e = void 0,
      f = Math.max(a.length, b.length);
    for (c = 0; c < f; c++) {
      var g = a[c],
        h = b[c];
      g &&
        g.constructor == Object &&
        (goog.asserts.assert(void 0 === d), goog.asserts.assert(c === a.length - 1), (d = g), (g = void 0));
      h &&
        h.constructor == Object &&
        (goog.asserts.assert(void 0 === e), goog.asserts.assert(c === b.length - 1), (e = h), (h = void 0));
      if (!jspb.Message.compareFields(g, h)) return !1;
    }
    return d || e ? ((d = d || {}), (e = e || {}), jspb.Message.compareExtensions(d, e)) : !0;
  }
  if (a.constructor === Object) return jspb.Message.compareExtensions(a, b);
  throw Error('Invalid type in JSPB array');
};
jspb.Message.prototype.cloneMessage = function () {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.prototype.clone = function () {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.clone = function (a) {
  return jspb.Message.cloneMessage(a);
};
jspb.Message.cloneMessage = function (a) {
  return new a.constructor(jspb.Message.clone_(a.toArray()));
};
jspb.Message.copyInto = function (a, b) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  goog.asserts.assertInstanceof(b, jspb.Message);
  goog.asserts.assert(a.constructor == b.constructor, 'Copy source and target message should have the same type.');
  a = jspb.Message.clone(a);
  for (var c = b.toArray(), d = a.toArray(), e = (c.length = 0); e < d.length; e++) c[e] = d[e];
  b.wrappers_ = a.wrappers_;
  b.extensionObject_ = a.extensionObject_;
};
jspb.Message.clone_ = function (a) {
  if (Array.isArray(a)) {
    for (var b = Array(a.length), c = 0; c < a.length; c++) {
      var d = a[c];
      null != d && (b[c] = 'object' == typeof d ? jspb.Message.clone_(goog.asserts.assert(d)) : d);
    }
    return b;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) return new Uint8Array(a);
  b = {};
  for (c in a) (d = a[c]), null != d && (b[c] = 'object' == typeof d ? jspb.Message.clone_(goog.asserts.assert(d)) : d);
  return b;
};
jspb.Message.registerMessageType = function (a, b) {
  b.messageId = a;
};
jspb.Message.messageSetExtensions = {};
jspb.Message.messageSetExtensionsBinary = {};
jspb.arith = {};
jspb.arith.UInt64 = function (a, b) {
  this.lo = a;
  this.hi = b;
};
jspb.arith.UInt64.prototype.cmp = function (a) {
  return this.hi < a.hi || (this.hi == a.hi && this.lo < a.lo) ? -1 : this.hi == a.hi && this.lo == a.lo ? 0 : 1;
};
jspb.arith.UInt64.prototype.rightShift = function () {
  return new jspb.arith.UInt64(((this.lo >>> 1) | ((this.hi & 1) << 31)) >>> 0, (this.hi >>> 1) >>> 0);
};
jspb.arith.UInt64.prototype.leftShift = function () {
  return new jspb.arith.UInt64((this.lo << 1) >>> 0, ((this.hi << 1) | (this.lo >>> 31)) >>> 0);
};
jspb.arith.UInt64.prototype.msb = function () {
  return !!(this.hi & 2147483648);
};
jspb.arith.UInt64.prototype.lsb = function () {
  return !!(this.lo & 1);
};
jspb.arith.UInt64.prototype.zero = function () {
  return 0 == this.lo && 0 == this.hi;
};
jspb.arith.UInt64.prototype.add = function (a) {
  return new jspb.arith.UInt64(
    (((this.lo + a.lo) & 4294967295) >>> 0) >>> 0,
    ((((this.hi + a.hi) & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0)) >>> 0
  );
};
jspb.arith.UInt64.prototype.sub = function (a) {
  return new jspb.arith.UInt64(
    (((this.lo - a.lo) & 4294967295) >>> 0) >>> 0,
    ((((this.hi - a.hi) & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0)) >>> 0
  );
};
jspb.arith.UInt64.mul32x32 = function (a, b) {
  var c = a & 65535;
  a >>>= 16;
  var d = b & 65535,
    e = b >>> 16;
  b = c * d + 65536 * ((c * e) & 65535) + 65536 * ((a * d) & 65535);
  for (c = a * e + ((c * e) >>> 16) + ((a * d) >>> 16); 4294967296 <= b; ) (b -= 4294967296), (c += 1);
  return new jspb.arith.UInt64(b >>> 0, c >>> 0);
};
jspb.arith.UInt64.prototype.mul = function (a) {
  var b = jspb.arith.UInt64.mul32x32(this.lo, a);
  a = jspb.arith.UInt64.mul32x32(this.hi, a);
  a.hi = a.lo;
  a.lo = 0;
  return b.add(a);
};
jspb.arith.UInt64.prototype.div = function (a) {
  if (0 == a) return [];
  var b = new jspb.arith.UInt64(0, 0),
    c = new jspb.arith.UInt64(this.lo, this.hi);
  a = new jspb.arith.UInt64(a, 0);
  for (var d = new jspb.arith.UInt64(1, 0); !a.msb(); ) (a = a.leftShift()), (d = d.leftShift());
  for (; !d.zero(); ) 0 >= a.cmp(c) && ((b = b.add(d)), (c = c.sub(a))), (a = a.rightShift()), (d = d.rightShift());
  return [b, c];
};
jspb.arith.UInt64.prototype.toString = function () {
  for (var a = '', b = this; !b.zero(); ) {
    b = b.div(10);
    var c = b[0];
    a = b[1].lo + a;
    b = c;
  }
  '' == a && (a = '0');
  return a;
};
jspb.arith.UInt64.fromString = function (a) {
  for (var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(0, 0), d = 0; d < a.length; d++) {
    if ('0' > a[d] || '9' < a[d]) return null;
    var e = parseInt(a[d], 10);
    c.lo = e;
    b = b.mul(10).add(c);
  }
  return b;
};
jspb.arith.UInt64.prototype.clone = function () {
  return new jspb.arith.UInt64(this.lo, this.hi);
};
jspb.arith.Int64 = function (a, b) {
  this.lo = a;
  this.hi = b;
};
jspb.arith.Int64.prototype.add = function (a) {
  return new jspb.arith.Int64(
    (((this.lo + a.lo) & 4294967295) >>> 0) >>> 0,
    ((((this.hi + a.hi) & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0)) >>> 0
  );
};
jspb.arith.Int64.prototype.sub = function (a) {
  return new jspb.arith.Int64(
    (((this.lo - a.lo) & 4294967295) >>> 0) >>> 0,
    ((((this.hi - a.hi) & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0)) >>> 0
  );
};
jspb.arith.Int64.prototype.clone = function () {
  return new jspb.arith.Int64(this.lo, this.hi);
};
jspb.arith.Int64.prototype.toString = function () {
  var a = 0 != (this.hi & 2147483648),
    b = new jspb.arith.UInt64(this.lo, this.hi);
  a && (b = new jspb.arith.UInt64(0, 0).sub(b));
  return (a ? '-' : '') + b.toString();
};
jspb.arith.Int64.fromString = function (a) {
  var b = 0 < a.length && '-' == a[0];
  b && (a = a.substring(1));
  a = jspb.arith.UInt64.fromString(a);
  if (null === a) return null;
  b && (a = new jspb.arith.UInt64(0, 0).sub(a));
  return new jspb.arith.Int64(a.lo, a.hi);
};
jspb.BinaryEncoder = function () {
  this.buffer_ = [];
};
jspb.BinaryEncoder.prototype.length = function () {
  return this.buffer_.length;
};
jspb.BinaryEncoder.prototype.end = function () {
  var a = this.buffer_;
  this.buffer_ = [];
  return a;
};
jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (a, b) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(b == Math.floor(b));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
  for (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32); 0 < b || 127 < a; )
    this.buffer_.push((a & 127) | 128), (a = ((a >>> 7) | (b << 25)) >>> 0), (b >>>= 7);
  this.buffer_.push(a);
};
jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (a, b) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(b == Math.floor(b));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
  goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32);
  this.writeUint32(a);
  this.writeUint32(b);
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  for (goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32); 127 < a; )
    this.buffer_.push((a & 127) | 128), (a >>>= 7);
  this.buffer_.push(a);
};
jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  if (0 <= a) this.writeUnsignedVarint32(a);
  else {
    for (var b = 0; 9 > b; b++) this.buffer_.push((a & 127) | 128), (a >>= 7);
    this.buffer_.push(1);
  }
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitInt64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.writeUnsignedVarint32(((a << 1) ^ (a >> 31)) >>> 0);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitZigzag64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (a) {
  this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a));
};
jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function (a) {
  var b = this;
  jspb.utils.splitHash64(a);
  jspb.utils.toZigzag64(jspb.utils.split64Low, jspb.utils.split64High, function (a, d) {
    b.writeSplitVarint64(a >>> 0, d >>> 0);
  });
};
jspb.BinaryEncoder.prototype.writeUint8 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && 256 > a);
  this.buffer_.push((a >>> 0) & 255);
};
jspb.BinaryEncoder.prototype.writeUint16 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && 65536 > a);
  this.buffer_.push((a >>> 0) & 255);
  this.buffer_.push((a >>> 8) & 255);
};
jspb.BinaryEncoder.prototype.writeUint32 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
  this.buffer_.push((a >>> 0) & 255);
  this.buffer_.push((a >>> 8) & 255);
  this.buffer_.push((a >>> 16) & 255);
  this.buffer_.push((a >>> 24) & 255);
};
jspb.BinaryEncoder.prototype.writeUint64 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitUint64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt8 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(-128 <= a && 128 > a);
  this.buffer_.push((a >>> 0) & 255);
};
jspb.BinaryEncoder.prototype.writeInt16 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(-32768 <= a && 32768 > a);
  this.buffer_.push((a >>> 0) & 255);
  this.buffer_.push((a >>> 8) & 255);
};
jspb.BinaryEncoder.prototype.writeInt32 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.buffer_.push((a >>> 0) & 255);
  this.buffer_.push((a >>> 8) & 255);
  this.buffer_.push((a >>> 16) & 255);
  this.buffer_.push((a >>> 24) & 255);
};
jspb.BinaryEncoder.prototype.writeInt64 = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64(a);
  this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt64String = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(+a >= -jspb.BinaryConstants.TWO_TO_63 && +a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
  this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFloat = function (a) {
  goog.asserts.assert(
    Infinity === a ||
      -Infinity === a ||
      isNaN(a) ||
      (a >= -jspb.BinaryConstants.FLOAT32_MAX && a <= jspb.BinaryConstants.FLOAT32_MAX)
  );
  jspb.utils.splitFloat32(a);
  this.writeUint32(jspb.utils.split64Low);
};
jspb.BinaryEncoder.prototype.writeDouble = function (a) {
  goog.asserts.assert(
    Infinity === a ||
      -Infinity === a ||
      isNaN(a) ||
      (a >= -jspb.BinaryConstants.FLOAT64_MAX && a <= jspb.BinaryConstants.FLOAT64_MAX)
  );
  jspb.utils.splitFloat64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeBool = function (a) {
  goog.asserts.assert('boolean' === typeof a || 'number' === typeof a);
  this.buffer_.push(a ? 1 : 0);
};
jspb.BinaryEncoder.prototype.writeEnum = function (a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.writeSignedVarint32(a);
};
jspb.BinaryEncoder.prototype.writeBytes = function (a) {
  this.buffer_.push.apply(this.buffer_, a);
};
jspb.BinaryEncoder.prototype.writeVarintHash64 = function (a) {
  jspb.utils.splitHash64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFixedHash64 = function (a) {
  jspb.utils.splitHash64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeString = function (a) {
  for (var b = this.buffer_.length, c = 0; c < a.length; c++) {
    var d = a.charCodeAt(c);
    if (128 > d) this.buffer_.push(d);
    else if (2048 > d) this.buffer_.push((d >> 6) | 192), this.buffer_.push((d & 63) | 128);
    else if (65536 > d)
      if (55296 <= d && 56319 >= d && c + 1 < a.length) {
        var e = a.charCodeAt(c + 1);
        56320 <= e &&
          57343 >= e &&
          ((d = 1024 * (d - 55296) + e - 56320 + 65536),
          this.buffer_.push((d >> 18) | 240),
          this.buffer_.push(((d >> 12) & 63) | 128),
          this.buffer_.push(((d >> 6) & 63) | 128),
          this.buffer_.push((d & 63) | 128),
          c++);
      } else
        this.buffer_.push((d >> 12) | 224), this.buffer_.push(((d >> 6) & 63) | 128), this.buffer_.push((d & 63) | 128);
  }
  return this.buffer_.length - b;
};
jspb.BinaryWriter = function () {
  this.blocks_ = [];
  this.totalLength_ = 0;
  this.encoder_ = new jspb.BinaryEncoder();
  this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.appendUint8Array_ = function (a) {
  var b = this.encoder_.end();
  this.blocks_.push(b);
  this.blocks_.push(a);
  this.totalLength_ += b.length + a.length;
};
jspb.BinaryWriter.prototype.beginDelimited_ = function (a) {
  this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
  a = this.encoder_.end();
  this.blocks_.push(a);
  this.totalLength_ += a.length;
  a.push(this.totalLength_);
  return a;
};
jspb.BinaryWriter.prototype.endDelimited_ = function (a) {
  var b = a.pop();
  b = this.totalLength_ + this.encoder_.length() - b;
  for (goog.asserts.assert(0 <= b); 127 < b; ) a.push((b & 127) | 128), (b >>>= 7), this.totalLength_++;
  a.push(b);
  this.totalLength_++;
};
jspb.BinaryWriter.prototype.writeSerializedMessage = function (a, b, c) {
  this.appendUint8Array_(a.subarray(b, c));
};
jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function (a, b, c) {
  null != a && null != b && null != c && this.writeSerializedMessage(a, b, c);
};
jspb.BinaryWriter.prototype.reset = function () {
  this.blocks_ = [];
  this.encoder_.end();
  this.totalLength_ = 0;
  this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.getResultBuffer = function () {
  goog.asserts.assert(0 == this.bookmarks_.length);
  for (
    var a = new Uint8Array(this.totalLength_ + this.encoder_.length()), b = this.blocks_, c = b.length, d = 0, e = 0;
    e < c;
    e++
  ) {
    var f = b[e];
    a.set(f, d);
    d += f.length;
  }
  b = this.encoder_.end();
  a.set(b, d);
  d += b.length;
  goog.asserts.assert(d == a.length);
  this.blocks_ = [a];
  return a;
};
jspb.BinaryWriter.prototype.getResultBase64String = function (a) {
  return goog.crypt.base64.encodeByteArray(this.getResultBuffer(), a);
};
jspb.BinaryWriter.prototype.beginSubMessage = function (a) {
  this.bookmarks_.push(this.beginDelimited_(a));
};
jspb.BinaryWriter.prototype.endSubMessage = function () {
  goog.asserts.assert(0 <= this.bookmarks_.length);
  this.endDelimited_(this.bookmarks_.pop());
};
jspb.BinaryWriter.prototype.writeFieldHeader_ = function (a, b) {
  goog.asserts.assert(1 <= a && a == Math.floor(a));
  this.encoder_.writeUnsignedVarint32(8 * a + b);
};
jspb.BinaryWriter.prototype.writeAny = function (a, b, c) {
  var d = jspb.BinaryConstants.FieldType;
  switch (a) {
    case d.DOUBLE:
      this.writeDouble(b, c);
      break;
    case d.FLOAT:
      this.writeFloat(b, c);
      break;
    case d.INT64:
      this.writeInt64(b, c);
      break;
    case d.UINT64:
      this.writeUint64(b, c);
      break;
    case d.INT32:
      this.writeInt32(b, c);
      break;
    case d.FIXED64:
      this.writeFixed64(b, c);
      break;
    case d.FIXED32:
      this.writeFixed32(b, c);
      break;
    case d.BOOL:
      this.writeBool(b, c);
      break;
    case d.STRING:
      this.writeString(b, c);
      break;
    case d.GROUP:
      goog.asserts.fail('Group field type not supported in writeAny()');
      break;
    case d.MESSAGE:
      goog.asserts.fail('Message field type not supported in writeAny()');
      break;
    case d.BYTES:
      this.writeBytes(b, c);
      break;
    case d.UINT32:
      this.writeUint32(b, c);
      break;
    case d.ENUM:
      this.writeEnum(b, c);
      break;
    case d.SFIXED32:
      this.writeSfixed32(b, c);
      break;
    case d.SFIXED64:
      this.writeSfixed64(b, c);
      break;
    case d.SINT32:
      this.writeSint32(b, c);
      break;
    case d.SINT64:
      this.writeSint64(b, c);
      break;
    case d.FHASH64:
      this.writeFixedHash64(b, c);
      break;
    case d.VHASH64:
      this.writeVarintHash64(b, c);
      break;
    default:
      goog.asserts.fail('Invalid field type in writeAny()');
  }
};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (a, b) {
  null != b &&
    (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (a, b) {
  null != b &&
    (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b));
};
jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (a, b) {
  null != b &&
    (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function (a, b) {
  null != b &&
    (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarintHash64(b));
};
jspb.BinaryWriter.prototype.writeInt32 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31),
    this.writeSignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeInt32String = function (a, b) {
  null != b &&
    ((b = parseInt(b, 10)),
    goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31),
    this.writeSignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeInt64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63),
    this.writeSignedVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeInt64String = function (a, b) {
  null != b &&
    ((b = jspb.arith.Int64.fromString(b)),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeSplitVarint64(b.lo, b.hi));
};
jspb.BinaryWriter.prototype.writeUint32 = function (a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeUint32String = function (a, b) {
  null != b &&
    ((b = parseInt(b, 10)),
    goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32),
    this.writeUnsignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeUint64 = function (a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeUint64String = function (a, b) {
  null != b &&
    ((b = jspb.arith.UInt64.fromString(b)),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeSplitVarint64(b.lo, b.hi));
};
jspb.BinaryWriter.prototype.writeSint32 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31),
    this.writeZigzagVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeSint64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63),
    this.writeZigzagVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeSintHash64 = function (a, b) {
  null != b && this.writeZigzagVarintHash64_(a, b);
};
jspb.BinaryWriter.prototype.writeSint64String = function (a, b) {
  null != b && this.writeZigzagVarint64String_(a, b);
};
jspb.BinaryWriter.prototype.writeFixed32 = function (a, b) {
  null != b &&
    (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32),
    this.encoder_.writeUint32(b));
};
jspb.BinaryWriter.prototype.writeFixed64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64),
    this.encoder_.writeUint64(b));
};
jspb.BinaryWriter.prototype.writeFixed64String = function (a, b) {
  null != b &&
    ((b = jspb.arith.UInt64.fromString(b)),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64),
    this.encoder_.writeSplitFixed64(b.lo, b.hi));
};
jspb.BinaryWriter.prototype.writeSfixed32 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32),
    this.encoder_.writeInt32(b));
};
jspb.BinaryWriter.prototype.writeSfixed64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64),
    this.encoder_.writeInt64(b));
};
jspb.BinaryWriter.prototype.writeSfixed64String = function (a, b) {
  null != b &&
    ((b = jspb.arith.Int64.fromString(b)),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64),
    this.encoder_.writeSplitFixed64(b.lo, b.hi));
};
jspb.BinaryWriter.prototype.writeFloat = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b));
};
jspb.BinaryWriter.prototype.writeDouble = function (a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b));
};
jspb.BinaryWriter.prototype.writeBool = function (a, b) {
  null != b &&
    (goog.asserts.assert('boolean' === typeof b || 'number' === typeof b),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeBool(b));
};
jspb.BinaryWriter.prototype.writeEnum = function (a, b) {
  null != b &&
    (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeSignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeString = function (a, b) {
  null != b && ((a = this.beginDelimited_(a)), this.encoder_.writeString(b), this.endDelimited_(a));
};
jspb.BinaryWriter.prototype.writeBytes = function (a, b) {
  null != b &&
    ((b = jspb.utils.byteSourceToUint8Array(b)),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
    this.encoder_.writeUnsignedVarint32(b.length),
    this.appendUint8Array_(b));
};
jspb.BinaryWriter.prototype.writeMessage = function (a, b, c) {
  null != b && ((a = this.beginDelimited_(a)), c(b, this), this.endDelimited_(a));
};
jspb.BinaryWriter.prototype.writeMessageSet = function (a, b, c) {
  null != b &&
    (this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.START_GROUP),
    this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeSignedVarint32(a),
    (a = this.beginDelimited_(3)),
    c(b, this),
    this.endDelimited_(a),
    this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.END_GROUP));
};
jspb.BinaryWriter.prototype.writeGroup = function (a, b, c) {
  null != b &&
    (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP),
    c(b, this),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP));
};
jspb.BinaryWriter.prototype.writeFixedHash64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(8 == b.length),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64),
    this.encoder_.writeFixedHash64(b));
};
jspb.BinaryWriter.prototype.writeVarintHash64 = function (a, b) {
  null != b &&
    (goog.asserts.assert(8 == b.length),
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT),
    this.encoder_.writeVarintHash64(b));
};
jspb.BinaryWriter.prototype.writeSplitFixed64 = function (a, b, c) {
  this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64);
  this.encoder_.writeSplitFixed64(b, c);
};
jspb.BinaryWriter.prototype.writeSplitVarint64 = function (a, b, c) {
  this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
  this.encoder_.writeSplitVarint64(b, c);
};
jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function (a, b, c) {
  this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
  var d = this.encoder_;
  jspb.utils.toZigzag64(b, c, function (a, b) {
    d.writeSplitVarint64(a >>> 0, b >>> 0);
  });
};
jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint32_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeInt32String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeSignedVarint64_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function (a, b, c, d) {
  if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitFixed64(a, c(b[e]), d(b[e]));
};
jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function (a, b, c, d) {
  if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitVarint64(a, c(b[e]), d(b[e]));
};
jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 = function (a, b, c, d) {
  if (null != b) for (var e = 0; e < b.length; e++) this.writeSplitZigzagVarint64(a, c(b[e]), d(b[e]));
};
jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeInt64String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint32_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeUint32String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeUnsignedVarint64_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeUint64String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint32_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarint64String_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeZigzagVarintHash64_(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed32(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeFixed64String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed32(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeSfixed64String(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedFloat = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeFloat(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedDouble = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeDouble(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedBool = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeBool(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedEnum = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeEnum(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedString = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeString(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedBytes = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeBytes(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedMessage = function (a, b, c) {
  if (null != b)
    for (var d = 0; d < b.length; d++) {
      var e = this.beginDelimited_(a);
      c(b[d], this);
      this.endDelimited_(e);
    }
};
jspb.BinaryWriter.prototype.writeRepeatedGroup = function (a, b, c) {
  if (null != b)
    for (var d = 0; d < b.length; d++)
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP),
        c(b[d], this),
        this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP);
};
jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeFixedHash64(a, b[c]);
};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (a, b) {
  if (null != b) for (var c = 0; c < b.length; c++) this.writeVarintHash64(a, b[c]);
};
jspb.BinaryWriter.prototype.writePackedInt32 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint32(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedInt32String = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint32(parseInt(b[c], 10));
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedInt64 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeSignedVarint64(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function (a, b, c, d) {
  if (null != b) {
    a = this.beginDelimited_(a);
    for (var e = 0; e < b.length; e++) this.encoder_.writeSplitFixed64(c(b[e]), d(b[e]));
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function (a, b, c, d) {
  if (null != b) {
    a = this.beginDelimited_(a);
    for (var e = 0; e < b.length; e++) this.encoder_.writeSplitVarint64(c(b[e]), d(b[e]));
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 = function (a, b, c, d) {
  if (null != b) {
    a = this.beginDelimited_(a);
    for (var e = this.encoder_, f = 0; f < b.length; f++)
      jspb.utils.toZigzag64(c(b[f]), d(b[f]), function (a, b) {
        e.writeSplitVarint64(a >>> 0, b >>> 0);
      });
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedInt64String = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) {
      var d = jspb.arith.Int64.fromString(b[c]);
      this.encoder_.writeSplitVarint64(d.lo, d.hi);
    }
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedUint32 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint32(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedUint32String = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint32(parseInt(b[c], 10));
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedUint64 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeUnsignedVarint64(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedUint64String = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) {
      var d = jspb.arith.UInt64.fromString(b[c]);
      this.encoder_.writeSplitVarint64(d.lo, d.hi);
    }
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSint32 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarint32(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSint64 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarint64(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSint64String = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b[c]));
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedSintHash64 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeZigzagVarintHash64(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedFixed32 = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(4 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeUint32(b[a]);
};
jspb.BinaryWriter.prototype.writePackedFixed64 = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeUint64(b[a]);
};
jspb.BinaryWriter.prototype.writePackedFixed64String = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    ) {
      var c = jspb.arith.UInt64.fromString(b[a]);
      this.encoder_.writeSplitFixed64(c.lo, c.hi);
    }
};
jspb.BinaryWriter.prototype.writePackedSfixed32 = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(4 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeInt32(b[a]);
};
jspb.BinaryWriter.prototype.writePackedSfixed64 = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeInt64(b[a]);
};
jspb.BinaryWriter.prototype.writePackedSfixed64String = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeInt64String(b[a]);
};
jspb.BinaryWriter.prototype.writePackedFloat = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(4 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeFloat(b[a]);
};
jspb.BinaryWriter.prototype.writePackedDouble = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeDouble(b[a]);
};
jspb.BinaryWriter.prototype.writePackedBool = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeBool(b[a]);
};
jspb.BinaryWriter.prototype.writePackedEnum = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeEnum(b[c]);
    this.endDelimited_(a);
  }
};
jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (a, b) {
  if (null != b && b.length)
    for (
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED),
        this.encoder_.writeUnsignedVarint32(8 * b.length),
        a = 0;
      a < b.length;
      a++
    )
      this.encoder_.writeFixedHash64(b[a]);
};
jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (a, b) {
  if (null != b && b.length) {
    a = this.beginDelimited_(a);
    for (var c = 0; c < b.length; c++) this.encoder_.writeVarintHash64(b[c]);
    this.endDelimited_(a);
  }
};
jspb.Export = {};
exports.Map = jspb.Map;
exports.Message = jspb.Message;
exports.BinaryReader = jspb.BinaryReader;
exports.BinaryWriter = jspb.BinaryWriter;
exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo;
exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo;
exports.inherits = goog.inherits;
exports.object = { extend: goog.object.extend };
exports.typeOf = goog.typeOf;

// Reimplemented
exports.exportSymbol = (path, value, { proto }) => {
  const parts = path.split('.')
  for (const part of parts) {
    if (!/^[a-z][a-z0-9_]*$/i.test(part) || part === 'constructor') {
      throw new Error('exportSymbol: Unexpected path')
    }
  }

  const final = parts.pop()
  if (value !== null || parts[0] !== 'proto' || !proto || !final) {
    throw new Error('exportSymbol: Unexpected scope')
  }

  let curr = proto
  for (const part of parts.slice(1)) {
    if (curr[part] && Object.getPrototypeOf(curr[part]) !== Object.prototype) {
      throw new Error('exportSymbol: Unexpected non-plain-object')
    }
    if (!curr[part]) curr[part] = {}
    curr = curr[part]
  }

  if (final in curr) {
    throw new Error('exportSymbol: already defined!')
  }
  curr[final] = value
}
