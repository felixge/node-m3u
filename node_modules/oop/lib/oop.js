var oop = exports;

oop.forceMixin = function(child /*, Parent1, ... */) {
  for (i = 1; i < arguments.length; i++) {
    oop._forceMixin(child, arguments[i]);
  }
};
oop.mixin = oop.forceMixin;

oop._forceMixin = function(child, Parent) {
  oop._forceCopyPrototype(child, Parent);
  Parent.call(child);
};

oop._forceCopyPrototype = function(child, Parent) {
  for (var property in Parent.prototype) {
    oop._copyPrototypeProperty(child, Parent, property);
  };
};

oop._copyPrototypeProperty = function(child, Parent, property) {
  Object.defineProperty(child, property, {
    value: Parent.prototype[property],
    writable: true,
    enumerable: false,
    configurable: true
  });
};

oop.strictMixin = function(child /*, Parent1, ... */) {
  for (i = 1; i < arguments.length; i++) {
    oop._strictMixin(child, arguments[i]);
  }
};

oop._strictMixin = function(child, Parent) {
  oop._strictCopyPrototype(child, Parent);
  oop._strictCallConstructor(child, Parent);
};

oop._strictCopyPrototype = function(child, Parent) {
  for (var property in Parent.prototype) {
    if (child[property] === undefined) {
      oop._copyPrototypeProperty(child, Parent, property);
      continue;
    }

    oop._error(
      'oop.strictMixin(): Class "' + Parent.name + '" tried to overwrite ' +
      'prototype property "' + property + '".'
    , oop.strictMixin);
  };
};

oop._strictCallConstructor = function(child, Parent) {
  var original = {};
  for (var property in child) {
    original[property] = child[property];
  }

  Parent.call(child);

  for (var property in original) {
    if (child[property] === original[property]) {
      continue;
    }

    oop._error(
      'oop.mixin(): Class "' + Parent.name +
      '" tried to overwrite property "' + property + '".'
    , oop.strictMixin);
  }
};

oop.softMixin = function(child /*, Parent1, ... */) {
  for (i = 1; i < arguments.length; i++) {
    oop._softMixin(child, arguments[i]);
  }
};

oop._softMixin = function(child, Parent) {
  oop._softCopyPrototype(child, Parent);
  oop._softCallConstructor(child, Parent);
};

oop._softCopyPrototype = function(child, Parent) {
  for (var property in Parent.prototype) {
    if (child[property] !== undefined) {
      continue;
    }

    oop._copyPrototypeProperty(child, Parent, property);
  };
};

oop._softCallConstructor = function(child, Parent) {
  var original = {};
  for (var property in child) {
    original[property] = child[property];
  }

  Parent.call(child);

  for (var property in original) {
    child[property] = original[property];
  }
};

oop._error = function(message, traceOrigin) {
  var error = new Error(message);
  Error.captureStackTrace(error, traceOrigin);
  throw error;
};


oop.extend = function(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      enumerable: false
    }
  });

  for (var property in Parent) {
    if (Child[property] !== undefined) {
      continue;
    }

    Child[property] = Parent[property];
  }
};
