var oop = require('oop');
var ExtendedWriter = require('./extended_writer');

function HttpLiveStreamingWriter(properties) {
  ExtendedWriter.call(this);
}
oop.extend(HttpLiveStreamingWriter, ExtendedWriter);
module.exports = HttpLiveStreamingWriter;
