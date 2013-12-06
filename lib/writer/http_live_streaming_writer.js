var oop = require('oop');
var ExtendedWriter = require('./extended_writer');

function HttpLiveStreamingWriter(properties) {
  ExtendedWriter.call(this);
}
oop.extend(HttpLiveStreamingWriter, ExtendedWriter);
module.exports = HttpLiveStreamingWriter;

HttpLiveStreamingWriter._escape = function(attributes) {
  var list = [];
  for (var attribute in attributes) {
    list.push(this._escapeAttribute(attribute, attributes[attribute]));
  }

  return list.join(', ');

};

HttpLiveStreamingWriter._capitalizeAttribute = function(attribute) {
  return (
    attribute
      .replace(/([a-z])([A-Z])/, '$1-$2')
      .toUpperCase()
   );
};

HttpLiveStreamingWriter._escapeAttribute = function(attribute, value) {
  attribute = this._capitalizeAttribute(attribute);

  if (value instanceof Array) {
    value = value.join(', ');
  }

  var dontQuote = (attribute === 'RESOLUTION');
  if (typeof value === 'string' && !dontQuote) {
    value = '"' + value + '"';
  }

  return attribute + '=' + value;
};

HttpLiveStreamingWriter.prototype.targetDuration = function(seconds) {
  this.comment('EXT-X-TARGETDURATION:' + seconds);
};

HttpLiveStreamingWriter.prototype.mediaSequence = function(sequence) {
  this.comment('EXT-X-MEDIA-SEQUENCE:' + sequence);
};

HttpLiveStreamingWriter.prototype.programDateTime = function(dateTime) {
  this.comment('EXT-X-PROGRAM-DATE-TIME:' + dateTime);
};

HttpLiveStreamingWriter.prototype.allowCache = function(value) {
  if (value === true) {
    value = 'YES';
  } else if (value === false) {
    value = 'NO';
  }

  this.comment('EXT-X-ALLOW-CACHE:' + value);
};

HttpLiveStreamingWriter.prototype.playlistType = function(type) {
  this.comment('EXT-X-PLAYLIST-TYPE:' + type);
};

HttpLiveStreamingWriter.prototype.playlist = function(uri, attributes) {
  this.comment('EXT-X-STREAM-INF:' + this.constructor._escape(attributes));
  this.file(uri);
};

HttpLiveStreamingWriter.prototype.discontinuity = function() {
  this.comment('EXT-X-DISCONTINUITY');
};

HttpLiveStreamingWriter.prototype.endlist = function() {
  this.comment('EXT-X-ENDLIST');
};

HttpLiveStreamingWriter.prototype.version = function(version) {
  this.comment('EXT-X-VERSION:' + version);
};
