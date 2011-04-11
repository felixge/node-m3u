function Writer(properties) {
  this._data = '';
}
module.exports = Writer;

Writer.prototype.write = function(line) {
  if (arguments.length === 0) {
    line = '';
  }

  this._data += line + '\n';
};

Writer.prototype.file = function(uri) {
  this.write(uri);
};

Writer.prototype.comment = function(comment) {
  this.write('#' + comment);
};

Writer.prototype.toString = function() {
  return this._data;
};
