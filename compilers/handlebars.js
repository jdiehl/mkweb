'use strict';

var mkweb = require('../lib/mkweb'),
  handlebars = require('handlebars');

mkweb.registerCompiler('handlebars', function (content, scope, callback) {
  content = handlebars.compile(content.toString())(scope);
  callback(null, content);
});
