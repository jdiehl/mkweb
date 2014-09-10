'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#compilers/jade', function () {

  beforeEach(function () {
    mockfs({
      'compilers-jade-scope.js': 'exports.something = "world"',
      'fake.jade': 'p Hello #{something}'
    });
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an jade template', function (done) {
    mkweb.make('fake.jade', { scope: 'compilers-jade-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('<p>Hello world</p>');
      done();
    });
  });

});
