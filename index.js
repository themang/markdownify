/*jshint node: true*/
var through = require('through');
var marked  = require("marked");

// Default extensions
var EXTENSIONS = {
  md:       true,
  markdown: true,
};

function markdownify(file, opts) {
  extensions = opts.extensions || EXTENSIONS;
  if (!extensions[file.split(".").pop()]) {
    return through();
  }

  var buffer = "";
  return through(function(chunk) {
    buffer += chunk.toString();
  },
  function() {
    // Compile
    var compiled = "";
    compiled += "module.exports = '"
    compiled += marked(buffer).replace(/\n/g, "\\n")
    compiled += "'";

    // Add to stream
    this.queue(compiled);

    // Tell the stream we're done writing
    this.queue(null);
  });

};

module.exports = markdownify;
