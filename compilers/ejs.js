'use strict';

var mkweb = require('../lib/mkweb'),
  ejs = require('ejs');

mkweb.registerCompiler('ejs', function (content, scope, callback) {
  content = ejs.render(content.toString(), scope);
  callback(null, content);
});
