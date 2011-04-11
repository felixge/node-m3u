var Writer = require('./writer');
var ExtendedWriter = require('./writer/extended_writer');
var HttpLiveStreamingWriter = require('./writer/http_live_streaming_writer');

exports.writer = function() {
  return new Writer();
};

exports.extendedWriter = function() {
  return new ExtendedWriter();
};

exports.httpLiveStreamingWriter = function() {
  return new HttpLiveStreamingWriter();
};
