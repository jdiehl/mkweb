'use strict';

var path = require('path'),
  extend = require('util')._extend,
  async = require('async'),
  mkweb = require('../lib/mkweb');

mkweb.registerRecipe('default', function (input, options, callback) {
  var scope;

  function loadScope(done) {
    var scope = {};
    if (options.scope) {
      if (typeof options.scope === 'string') {
        scope = require(path.join(process.cwd(), options.scope));
      } else {
        scope = options.scope;
      }
    }
    if (typeof scope === 'function') {
      scope = scope(input, options);
    }
    done(null, extend({}, scope));
  }

  function compile(theScope, done) {
    scope = theScope;
    mkweb.compile(input, scope, done);
  }

  function applyLayout(content, done) {
    if (options.layout) {
      scope.content = content;
      mkweb.compile(options.layout, scope, done);
    } else {
      done(null, content);
    }
  }

  async.waterfall([loadScope, compile, applyLayout], callback);
});
