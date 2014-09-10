'use strict';

var mkweb = require('../lib/mkweb'),
  jade = require('jade');

mkweb.registerCompiler('jade', function (content, scope, callback) {
  content = jade.render(content.toString(), scope);
  callback(null, content);
});
