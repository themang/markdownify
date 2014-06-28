var vm     = require("vm");
var assert = require("assert");

var concat      = require('concat-stream');
var browserify  = require("browserify");
var markdownify = require("../");

describe("markdownify", function() {

  it("converts markdown when required", function(done) {
    var b = browserify("./test/test1.js");
    b.transform(markdownify);
    b.bundle().pipe(concat(function(data) {
      var context = {
        sandbox: {}
      };

      vm.runInNewContext(data.toString(), context); 
      assert.equal(
         context.sandbox.tmpl.trim()
        ,"<p>Look it <strong>actually<\/strong> worked<\/p>"
      );
      done();
    }));
  });

});
