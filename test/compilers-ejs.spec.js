'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mock = require('mock-require'),
  path = require('path'),
  mkweb = require('../index');

describe('#compilers/ejs', function () {

  beforeEach(function () {
    mockfs({
      'fake.ejs': 'Hello <%= something %>'
    });
    mock(path.resolve('./compilers-ejs-scope.js'), { something: 'world' })
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an ejs template', function (done) {
    mkweb.make('fake.ejs', { scope: 'compilers-ejs-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('Hello world');
      done();
    });
  });

});
