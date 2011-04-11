var common = require('../common');
var assert = common.assert;

var fs = require('fs');

exports.compare = function(output, fixture) {
  var fixtureLines = output
    .toString()
    .split('\n');

  fs
    .readFileSync(__dirname + '/../fixture/' + fixture, 'utf8')
    .split('\n')
    .forEach(function(line, number) {
      var got = fixtureLines[number];
      assert.strictEqual(
        got,
        line,
        'Error on line ' + (number + 1) + '\n\n' +
        'Expected: ' + line + '\n' +
        'Got: ' + got
      );
    });
};

