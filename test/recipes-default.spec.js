'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index'),
  mock = require('mock-require'),
  path = require('path');

describe('#recipes/default', function () {

  before(function () {
    mockfs({
      'layout.spy': 'fake-layout',
      'fake.spy': 'fake',
      'fake.html': 'fake-html'
    });
    mock(path.resolve('./recipes-default-scope.js'), { foo: 'bar' })
  });

  after(function () {
    mockfs.restore();
    mock.stopAll();
  });

  it('should load a scope', function (done) {
    var called = false;
    mkweb.registerCompiler('spy', function (content, scope, callback) {
      expect(content.toString()).to.equal('fake');
      expect(scope).to.deep.equal({ foo: 'bar' });
      called = true;
      callback(null, 'fake-compiler');
    });
    mkweb.make('fake.spy', { scope: 'recipes-default-scope.js' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('fake-compiler');
      expect(called).to.equal(true);
      mkweb.unregisterCompiler('spy');
      done();
    });
  });

  it('should apply a layout', function (done) {
    var called = 0;
    mkweb.registerCompiler('spy', function (content, scope, callback) {
      called++;
      if (called === 1) {
        expect(content.toString()).to.equal('fake');
        expect(scope).to.deep.equal({});
        callback(null, 'fake-compiler');
      } else {
        expect(content.toString()).to.equal('fake-layout');
        expect(scope).to.deep.equal({ content: 'fake-compiler' });
        callback(null, 'fake-compiler-with-layout');
      }
    });
    mkweb.make('fake.spy', { layout: 'layout.spy' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('fake-compiler-with-layout');
      expect(called).to.equal(2);
      mkweb.unregisterCompiler('spy');
      done();
    });
  });

});
