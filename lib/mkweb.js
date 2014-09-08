'use strict';

var path = require('path'),
  fs = require('fs'),
  compilers = {},
  recipes = {};

// register content compiler
exports.registerCompiler = function (format, compiler) {
  if (format[0] !== '.') {
    format = '.' + format;
  }
  if (compilers[format]) {
    console.warn('Attempting to register a second compiler for the format', format);
  }
  compilers[format] = compiler;
};

// register template renderer
exports.registerRecipe = function (name, recipe) {
  if (recipes[name]) {
    console.warn('Attempting to register second recipe named', name);
  }
  recipes[name] = recipe;
};

// compile
exports.compile = function (input, scope, callback) {
  fs.readFile(input, function (err, content) {
    if (err) {
      return callback(err);
    }
    var compiler = compilers[path.extname(input)];
    if (compiler) {
      compiler(content, scope, callback);
    } else {
      callback(null, content.toString());
    }
  });
};

// make
exports.make = function (input, options, callback) {
  var recipe;
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  callback = callback || function () {};
  if (options && options.recipe) {
    recipe = recipes[options.recipe];
    if (!recipe) {
      return callback('Could not find recipe named');
    }
  } else {
    recipe = recipes['default'];
  }
  recipe(input, options, callback);
};
