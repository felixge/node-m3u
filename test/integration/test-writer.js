var fs = require('fs');
var assert = require('assert');
var writer = require('../..').createWriter();

writer.comment('I am a comment');
writer.info('10', 'Artist - Title');
writer.info('42');
writer.uri('foo.mp3');
writer.uri('bar.mp3', 23);

var m3uLines = writer
  .toString()
  .split('\n');

fs
  .readFileSync(__dirname + '/../fixture/basic.m3u8', 'utf8')
  .split('\n')
  .forEach(function(line, number) {
    var expected = m3uLines[number];
    assert.strictEqual(
      expected,
      line,
      'Error on line ' + (number + 1) + '\n\n' +
      'Expected: ' + expected + '\n' +
      'Got: ' + line
    );
  });
