'use strict';

var chai = require('chai');
var expect = chai.expect;

var fav = {}; fav.prop = {}; fav.prop.getDeep = require('..');

var getDeep = fav.prop.getDeep;

describe('fav.prop.get-deep', function() {

  it('Should get value of the specified prop path', function() {
    var obj = {
      a00: {
        a10: { a20: 1, a21: 2, a22: 3, },
        a11: { a20: 4, a23: 5, a24: 6, },
      },
      a01: {
        a10: { a20: 7, a21: 8, a22: 9, },
        a12: {},
      }
    };

    expect(getDeep(obj, [])).to.equal(obj);

    expect(getDeep(obj, ['a00'])).to.equal(obj.a00);
    expect(getDeep(obj, ['a01'])).to.equal(obj.a01);
    expect(getDeep(obj, ['a02'])).to.equal(obj.a02);

    expect(getDeep(obj, ['a00', 'a10'])).to.equal(obj.a00.a10);
    expect(getDeep(obj, ['a00', 'a11'])).to.equal(obj.a00.a11);
    expect(getDeep(obj, ['a01', 'a10'])).to.equal(obj.a01.a10);
    expect(getDeep(obj, ['a01', 'a12'])).to.equal(obj.a01.a12);

    expect(getDeep(obj, ['a00', 'a10', 'a20'])).to.equal(1);
    expect(getDeep(obj, ['a00', 'a10', 'a21'])).to.equal(2);
    expect(getDeep(obj, ['a00', 'a10', 'a22'])).to.equal(3);

    expect(getDeep(obj, ['a00', 'a11', 'a20'])).to.equal(4);
    expect(getDeep(obj, ['a00', 'a11', 'a23'])).to.equal(5);
    expect(getDeep(obj, ['a00', 'a11', 'a24'])).to.equal(6);

    expect(getDeep(obj, ['a01', 'a10', 'a20'])).to.equal(7);
    expect(getDeep(obj, ['a01', 'a10', 'a21'])).to.equal(8);
    expect(getDeep(obj, ['a01', 'a10', 'a22'])).to.equal(9);
  });

  it('Should get value of the specified prop key', function() {
    var obj = {
      a00: {
        a10: { a20: 1, a21: 2, a22: 3, },
        a11: { a20: 4, a23: 5, a24: 6, },
      },
      a01: {
        a10: { a20: 7, a21: 8, a22: 9, },
        a12: {},
      }
    };

    expect(getDeep(obj, 'a00')).to.equal(obj.a00);
    expect(getDeep(obj, 'a01')).to.equal(obj.a01);
  });

  it('Should get undefined when not having the specified prop path',
  function() {
    var obj = {
      a00: {
        a10: { a20: 1, a21: 2, a22: 3, },
        a11: { a20: 4, a23: 5, a24: 6, },
      },
      a01: {
        a10: { a20: 7, a21: 8, a22: 9, },
        a12: {},
      }
    };

    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(undefined);
    expect(getDeep(obj, 'a')).to.equal(undefined);
    expect(getDeep(obj, 'a', 'b', 'c', 'd', 'e')).to.equal(undefined);
  });

  it('Should get obj itself when obj is primitive type and propPath is' +
  '\n\tnullish or empty', function() {
    expect(getDeep(undefined)).to.equal(undefined);
    expect(getDeep(null)).to.equal(null);
    expect(getDeep(true)).to.equal(true);
    expect(getDeep(false)).to.equal(false);
    expect(getDeep(0)).to.equal(0);
    expect(getDeep(123)).to.equal(123);

    expect(getDeep(undefined, [])).to.equal(undefined);
    expect(getDeep(null, [])).to.equal(null);
    expect(getDeep(true, [])).to.equal(true);
    expect(getDeep(false, [])).to.equal(false);
    expect(getDeep(0, [])).to.equal(0);
    expect(getDeep(123, [])).to.equal(123);
  });

  it('Should get prop value even when obj is neither a object', function() {
    expect(getDeep([], ['length'])).to.equal(0);

    function fn(b, c) {
      return b + c;
    }
    expect(getDeep(fn['length'])).to.equal(2);

    expect(getDeep(undefined, ['length'])).to.equal(undefined);
    expect(getDeep(null, ['length'])).to.equal(undefined);
    expect(getDeep(true, ['length'])).to.equal(undefined);
    expect(getDeep(false, ['length'])).to.equal(undefined);
    expect(getDeep(0, ['length'])).to.equal(undefined);
    expect(getDeep(123, ['length'])).to.equal(undefined);
  });

  it('Should get an enumerable property key value', function() {
    var obj = { a: { b: { c: 123 } } };
    expect(getDeep(obj, 'a')).to.equal(obj.a);
    expect(getDeep(obj, ['a'])).to.equal(obj.a);
    expect(getDeep(obj, ['a', 'b'])).to.equal(obj.a.b);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(obj.a.b.c);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(123);
  });

  it('Should get an unenumerable property key value', function() {
    var obj = {};
    Object.defineProperty(obj, 'a', { value: {} });
    Object.defineProperty(obj.a, 'b', { value: {} });
    Object.defineProperty(obj.a.b, 'c', { value: 123 });
    expect(getDeep(obj, 'a')).to.equal(obj.a);
    expect(getDeep(obj, ['a'])).to.equal(obj.a);
    expect(getDeep(obj, ['a', 'b'])).to.equal(obj.a.b);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(obj.a.b.c);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(123);
  });

  it('Should get an inherited property key value', function() {
    var obj0 = new function() {
      this.a = {};
    };
    Object.defineProperty(obj0.a, 'b', { value: {} });

    obj0.a.b.c = 123;
    function Fn1() {};
    Fn1.prototype = obj0;
    var obj = new Fn1();
    expect(obj.a.b.c).to.equal(123);
    expect(getDeep(obj, 'a')).to.equal(obj.a);
    expect(getDeep(obj, ['a'])).to.equal(obj.a);
    expect(getDeep(obj, ['a', 'b'])).to.equal(obj.a.b);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(obj.a.b.c);
    expect(getDeep(obj, ['a', 'b', 'c'])).to.equal(123);
  });

  it('Should get an enumerable property symbol value', function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }
    var a = Symbol('a'), b = Symbol('b'), c = Symbol('c');

    var obj = {};
    obj[a] = {};
    obj[a][b] = {};
    obj[a][b][c] = 123;
    expect(getDeep(obj, a)).to.equal(obj[a]);
    expect(getDeep(obj, [a])).to.equal(obj[a]);
    expect(getDeep(obj, [a, b])).to.equal(obj[a][b]);
    expect(getDeep(obj, [a, b, c])).to.equal(obj[a][b][c]);
    expect(getDeep(obj, [a, b, c])).to.equal(123);
  });

  it('Should get an unenumerable property symbol value', function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }
    var a = Symbol('a'), b = Symbol('b'), c = Symbol('c');

    var obj = {};
    Object.defineProperty(obj, a, { value: {} });
    Object.defineProperty(obj[a], b, { value: {} });
    Object.defineProperty(obj[a][b], c, { value: 123 });
    expect(getDeep(obj, a)).to.equal(obj[a]);
    expect(getDeep(obj, [a])).to.equal(obj[a]);
    expect(getDeep(obj, [a, b])).to.equal(obj[a][b]);
    expect(getDeep(obj, [a, b, c])).to.equal(obj[a][b][c]);
    expect(getDeep(obj, [a, b, c])).to.equal(123);
  });

  it('Should get an inherited property symbol value', function() {
    if (typeof Symbol !== 'function') {
      this.skip();
      return;
    }
    var a = Symbol('a'), b = Symbol('b'), c = Symbol('c');

    var obj0 = new function() {
      this[a] = {};
    };
    Object.defineProperty(obj0[a], b, { value: {} });
    obj0[a][b][c] = 123;
    function Fn1() {};
    Fn1.prototype = obj0;
    var obj = new Fn1();
    expect(obj[a][b][c]).to.equal(123);
    expect(getDeep(obj, a)).to.equal(obj[a]);
    expect(getDeep(obj, [a])).to.equal(obj[a]);
    expect(getDeep(obj, [a, b])).to.equal(obj[a][b]);
    expect(getDeep(obj, [a, b, c])).to.equal(obj[a][b][c]);
    expect(getDeep(obj, [a, b, c])).to.equal(123);
  });
});
