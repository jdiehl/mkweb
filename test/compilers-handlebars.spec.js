'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mock = require('mock-require'),
  path = require('path'),
  mkweb = require('../index');

describe('#compilers/handlebars', function () {

  beforeEach(function () {
    mockfs({
      'fake.handlebars': 'Hello {{something}}'
    });
    mock(path.resolve('./compilers-handlebars-scope.js'), { something: 'world' })
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
