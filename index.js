/**
 * Modules
 */

var through = require('through');
var marked  = require("marked");

/**
 * Vars
 */
var EXTENSIONS = {
  md:       true,
  markdown: true,
};


/**
 * Expose markdownify
 */

module.exports = markdownify;


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

markdownify.setOptions = function(options) {
  marked.setOptions(options);
}

