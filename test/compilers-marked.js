'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#compilers/marked', function () {

  beforeEach(function () {
    mockfs({
      'fake.md': '# Hello world'
    });
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('should parse an markdown template', function (done) {
    mkweb.make('fake.md', {}, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('<h1 id="hello-world">Hello world</h1>\n');
      done();
    });
  });

});
