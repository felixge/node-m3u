var common = require('../common');
var assert = common.assert;
var fixture = common.helper.fixture;

var writer = common.m3u.writer();
writer.comment('I am a comment');
writer.write();
writer.uri('foo.mp3');

fixture.compare(writer, 'writer.m3u8');
