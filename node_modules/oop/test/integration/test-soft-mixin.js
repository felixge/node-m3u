var common = require('../common');
var oop = common.oop;
var assert = require('assert');

function A() {
  this.propertyA = true;
  this.sharedProperty = 'A';
}
A.prototype.methodA = function() {}
A.prototype.sharedMethod = function() {}

function B() {
  this.propertyB = true;
  this.sharedProperty = 'B';

  oop.softMixin(this, A);
}
B.prototype.methodB = function() {}
B.prototype.sharedMethod = function() {}

var b = new B();
// Make sure individual properties got copied
assert.ok(b.propertyA);
assert.ok(b.propertyB);

// Make sure that mixin A didn't overwrite shared property B
assert.strictEqual(b.sharedProperty, 'B');

// Make sure all methods got copied and are callable
b.methodA();
b.methodB();
b.sharedMethod();

// Check that our sharedMethod comes from B and wasn't overwritten by mixin A
assert.strictEqual(b.sharedMethod, B.prototype.sharedMethod);
assert.notStrictEqual(b.sharedMethod, A.prototype.sharedMethod);
