'use strict';

var isArray = require('@fav/type.is-array');

function getDeep(obj, propPath) {
  if (arguments.length < 2) {
    return obj;
  }

  if (!isArray(propPath)) {
    propPath = [propPath];
  }

  if (obj == null) {
    return Boolean(propPath.length) ? undefined : obj;
  }

  for (var i = 0, n = propPath.length; i < n; i++) {
    obj = obj[propPath[i]];
    if (obj == null) {
      break;
    }
  }

  return obj;
}

module.exports = getDeep;
