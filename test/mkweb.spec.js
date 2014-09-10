'use strict';

var expect = require('chai').expect,
  mockfs = require('mock-fs'),
  mkweb = require('../index');

describe('#mkweb', function () {

  beforeEach(function () {
    mockfs({
      'fake.spy': 'fake'
    });
  });

  afterEach(function () {
    mockfs.restore();
  });

  it('duck-typing', function () {
    expect(mkweb.registerCompiler).to.be.a('function');
    expect(mkweb.unregisterCompiler).to.be.a('function');
    expect(mkweb.registerRecipe).to.be.a('function');
    expect(mkweb.unregisterRecipe).to.be.a('function');
    expect(mkweb.compile).to.be.a('function');
    expect(mkweb.make).to.be.a('function');
  });

  it('should register a compiler', function (done) {
    var called = false;
    mkweb.registerCompiler('spy', function (content, scope, callback) {
      expect(content.toString()).to.equal('fake');
      expect(scope).to.deep.equal({ foo: 'bar' });
      called = true;
      callback(null, 'fake-compiler');
    });
    mkweb.compile('fake.spy', { foo: 'bar' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('fake-compiler');
      expect(called).to.equal(true);
      mkweb.unregisterCompiler('spy');
      done();
    });
  });

  it('should register a recipe', function (done) {
    var called = false;
    mkweb.registerRecipe('spy', function (input, options, callback) {
      expect(input).to.equal('fake.spy');
      expect(options).to.deep.equal({ recipe: 'spy', foo: 'bar' });
      called = true;
      callback(null, 'fake-recipe');
    });
    mkweb.make('fake.spy', { recipe: 'spy', foo: 'bar' }, function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.equal('fake-recipe');
      expect(called).to.equal(true);
      mkweb.unregisterRecipe('spy');
      done();
    });
  });

});
