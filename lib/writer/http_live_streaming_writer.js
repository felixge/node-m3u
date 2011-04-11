var oop = require('oop');
var ExtendedWriter = require('./extended_writer');

function HttpLiveStreamingWriter(properties) {
  ExtendedWriter.call(this);
}
oop.extend(HttpLiveStreamingWriter, ExtendedWriter);
module.exports = HttpLiveStreamingWriter;

HttpLiveStreamingWriter.prototype.targetDuration = function() {
};

HttpLiveStreamingWriter.prototype.mediaSequence = function() {
};

HttpLiveStreamingWriter.prototype.programDateTime = function() {
};

HttpLiveStreamingWriter.prototype.allowCache = function() {
};

HttpLiveStreamingWriter.prototype.playlistType = function() {
};

HttpLiveStreamingWriter.prototype.endlist = function() {
};

HttpLiveStreamingWriter.prototype.version = function() {
};

HttpLiveStreamingWriter.prototype.playlist = function() {
};
