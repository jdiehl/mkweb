'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mock = require('mock-require'),
  path = require('path'),
  mkweb = require('../index');

describe('#compilers/mustache', function () {

  beforeEach(function () {
    mockfs({
      'fake.mustache': 'Hello {{something}}'
    });
    mock(path.resolve('./compilers-mustache-scope.js'), { something: 'world' })
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
