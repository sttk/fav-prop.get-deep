'use strict';

var isArray = require('@fav/type.is-array');

function getDeep(obj, propPath) {
  if (arguments.length < 2) {
    return obj;
  }

  if (!isArray(propPath)) {
    return undefined;
  }

  if (obj == null) {
    return Boolean(propPath.length) ? undefined : obj;
  }

  for (var i = 0, n = propPath.length; i < n; i++) {
    var prop = propPath[i];
    try {
      obj = obj[prop];
    } catch (e) {
      // If `prop` is an array of Symbol, obj[prop] throws an error,
      // but this function suppress it and return undefined.
      obj = undefined;
    }
    if (obj == null) {
      break;
    }
  }

  return obj;
}

module.exports = getDeep;
