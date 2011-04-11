var common = require('../common');
var assert = common.assert;
var fixture = common.helper.fixture;

var writer = common.m3u.httpLiveStreamingWriter();
writer.comment('I am a comment');
writer.info('10', 'Artist - Title');
writer.info('42');
writer.uri('foo.mp3');
writer.uri('bar.mp3', 23);

fixture.compare(writer, 'http_live_streaming_writer.m3u8');
