'use strict';

var mkweb = require('../lib/mkweb'),
  pug = require('pug');

mkweb.registerCompiler('pug', function (content, scope, callback) {
  content = pug.render(content.toString(), scope);
  callback(null, content);
});
