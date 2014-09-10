'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#compilers/ejs', function () {

  beforeEach(function () {
    mockfs({
      'compilers-ejs-scope.js': 'exports.something = "world"',
      'fake.ejs': 'Hello <%= something %>'
    });
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
