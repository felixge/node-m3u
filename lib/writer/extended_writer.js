var oop = require('oop');
var Writer = require('../writer');

function ExtendedWriter(properties) {
  Writer.call(this);
}
oop.extend(ExtendedWriter, Writer);
module.exports = ExtendedWriter;

ExtendedWriter.prototype.info = function(duration, title) {
  if (title === undefined) {
    title = '';
  }

  this.comment('EXTINF:' + duration + ',' + title);
};

ExtendedWriter.prototype.uri = function(uri, duration, title) {
  if (arguments.length > 1) {
    this.info(duration, title);
  }

  this.write(uri);
};

ExtendedWriter.prototype.toString = function() {
  return (
    '#EXTM3U\n' +
    this._data
  );
};
