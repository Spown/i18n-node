'use strict';
var i18n = require('../i18n'),
  clear = require('./helpers/clear'),
  should = require('should'),
  fs = require('fs')
;

var isWin = /^win/.test(process.platform);

describe('Module Config (directoryPermissions)', function() {

  var testScope = {};

  afterEach(function(d) {
    d(clear(i18n));
  });

  it('should be possible to setup a custom directory with default permissions', function() {
    i18n.configure({
      locales: ['en', 'de'],
      register: testScope,
      directory: './customlocales',
      extension: '.customextension',
      prefix: 'customprefix-'
    });
    testScope.__('Hello');
    var stat = fs.lstatSync('./customlocales');
    should.exist(stat);
  });

  it('should be possible to setup a custom directory with customized permissions', function() {
    i18n.configure({
      locales: ['en', 'de'],
      register: testScope,
      directoryPermissions: '700',
      directory: './customlocales',
      extension: '.customextension',
      prefix: 'customprefix-'
    });
    testScope.__('Hello');
    var stat = fs.lstatSync('./customlocales');
    var mode = isWin ? '40666' : '40700';
    should.equal(mode, parseInt(stat.mode.toString(8), 10));
    should.exist(stat);
  });

  it('should be possible to setup a custom directory with customized permissions', function() {
    i18n.configure({
      locales: ['en', 'de'],
      register: testScope,
      directoryPermissions: '750',
      directory: './customlocales',
      extension: '.customextension',
      prefix: 'customprefix-'
    });
    testScope.__('Hello');
    var stat = fs.lstatSync('./customlocales');
    var mode = isWin ? '40666' : '40750';
    should.equal(mode, parseInt(stat.mode.toString(8), 10));
    should.exist(stat);
  });

});