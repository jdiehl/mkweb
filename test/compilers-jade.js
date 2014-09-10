'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#compilers/mustache', function () {

  beforeEach(function () {
    mockfs({
      'compilers-mustache-scope.js': 'exports.something = "world"',
      'fake.mustache': 'Hello {{something}}'
    });
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an mustache template', function (done) {
    mkweb.make('fake.mustache', { scope: 'compilers-mustache-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('Hello world');
      done();
    });
  });

});
