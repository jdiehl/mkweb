'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mock = require('mock-require'),
  path = require('path'),
  mkweb = require('../index');

describe('#compilers/pug', function () {

  beforeEach(function () {
    mockfs({
      'fake.pug': 'p Hello #{something}'
    });
    mock(path.resolve('./compilers-pug-scope.js'), { something: 'world' })
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an pug template', function (done) {
    mkweb.make('fake.pug', { scope: 'compilers-pug-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('<p>Hello world</p>');
      done();
    });
  });

});
