'use strict';

var mkweb = require('../lib/mkweb'),
  marked = require('marked');

mkweb.registerCompiler('md', function (content, scope, callback) {
  content = marked(content.toString());
  callback(null, content);
});
