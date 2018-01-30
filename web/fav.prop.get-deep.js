(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.fav||(g.fav = {}));g=(g.prop||(g.prop = {}));g.getDeep = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    if (Array.isArray(prop)) {
      // This function doesn't allow to use an array as a property.
      return undefined;
    }

    obj = obj[prop];
    if (obj == null) {
      break;
    }
  }

  return obj;
}

module.exports = getDeep;

},{"@fav/type.is-array":2}],2:[function(require,module,exports){
'use strict';

function isArray(value) {
  return Array.isArray(value);
}

function isNotArray(value) {
  return !Array.isArray(value);
}

Object.defineProperty(isArray, 'not', {
  enumerable: true,
  value: isNotArray,
});

module.exports = isArray;

},{}]},{},[1])(1)
});