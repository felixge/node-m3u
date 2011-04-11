var common = require('../common');
var oop = common.oop;
var assert = require('assert');

function A() {
  this.a = true;
}
A.methodA = function() {};

function B() {
  A.call(this);

  this.b = true;
}
oop.extend(B, A);

B.methodB = function() {};

function C() {
  B.call(this);
}
oop.extend(C, B);

var c = new C();
assert.ok(c instanceof C);
assert.ok(c instanceof B);
assert.ok(c instanceof A);

assert.ok(c.a);
assert.ok(c.b);

C.methodA();
C.methodB();

assert.strictEqual(c.constructor, C);
