var common = require('../common');
var oop = common.oop;
var assert = require('assert');

function Friendly() {
  // Properties from the mixed in class should be copied
  this.friendly = true;
  this.overWriteMe = 'Friendly';

  // Methods of the mixed in class should be callable from the constructor
  this.greet();
}

Friendly.prototype.greet = function() {
};

function Tall() {
  this.tall = true;
  this.overWriteMe = 'Tall';

  this.slamdunk();
}

Tall.prototype.slamdunk = function() {
}

function Person() {
  // The properties of the mixin target should be kept
  this.person = true;
  // Unless they are overwritten by one of the mixins
  this.overWriteMe = 'Person';

  // Mixins are runtime created
  oop.forceMixin(this, Friendly, Tall);
}

Person.prototype.whimper = function() {
}

var person = new Person();
// Make sure all properties got copied
assert.ok(person.person);
assert.ok(person.friendly);
assert.ok(person.tall);

// Make sure overWriteMe got overwritten by the last mixin
assert.strictEqual(person.overWriteMe, 'Tall');

// Make sure all methods got copied
person.whimper();
person.greet();
person.slamdunk();

// Make sure only the properties are enumerable
var properties = Object.keys(person);
assert.deepEqual(properties, ['person', 'overWriteMe', 'friendly', 'tall']);

// Make sure mixin is an alias of forceMixin
assert.strictEqual(oop.mixin, oop.forceMixin);
