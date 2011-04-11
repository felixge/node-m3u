var common = require('../common');
var oop = common.oop;
var assert = require('assert');

function A() {
  this.myProperty = 'foo';
}

function B() {
  this.myProperty = 'bar';
}

function C() {
  oop.strictMixin(this, A, B);
}

assert.throws(function() {
  var c = new C();
}, /class "B".+property "myProperty"/i);
