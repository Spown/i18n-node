'use strict';
var fs = require('fs-extra')
;
module.exports = function clear(_i18n) {
  var dir = _i18n.directory;
  if (_i18n && _i18n.disableReload) {
    _i18n.disableReload();
  }
  try {
    fs.removeSync(dir);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      return error;
    }
  }
}