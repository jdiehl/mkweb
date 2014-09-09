'use strict';

var mkweb = require('../lib/mkweb'),
  mustache = require('mustache');

mkweb.registerCompiler('mu', function (content, scope, callback) {
  content = mustache.render(content.toString(), scope);
  callback(null, content);
});
