function Writer(properties) {
  this._data = '';
}
module.exports = Writer;

Writer.prototype.comment = function(comment) {
  this._write('#' + comment);
};

Writer.prototype.info = function(duration, title) {
  title = title || '';

  this.comment('EXTINF:' + duration + ',' + title);
};

Writer.prototype.uri = function(uri, duration, title) {
  if (duration || title) {
    this.info(duration, title);
  }

  this._write(uri);
};

Writer.prototype._write = function(line) {
  this._data += line + '\n';
};

Writer.prototype.toString = function() {
  return (
    '#EXTM3U\n' +
    this._data
  );
};
