'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#compilers/handlebars', function () {

  beforeEach(function () {
    mockfs({
      'compilers-handlebars-scope.js': 'exports.something = "world"',
      'fake.handlebars': 'Hello {{something}}'
    });
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an handlebars template', function (done) {
    mkweb.make('fake.handlebars', { scope: 'compilers-handlebars-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('Hello world');
      done();
    });
  });

});
