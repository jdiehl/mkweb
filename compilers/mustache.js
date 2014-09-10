'use strict';

var mkweb = require('../lib/mkweb'),
  mustache = require('mustache');

mkweb.registerCompiler('mustache', function (content, scope, callback) {
  content = mustache.render(content.toString(), scope);
  callback(null, content);
});
