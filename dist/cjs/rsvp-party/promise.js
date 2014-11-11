"use strict";
var _RSVP = require("rsvp")["default"] || require("rsvp");
var o_create = require("./utils").o_create;
var assign = require("./utils").assign;

var _Promise = _RSVP.Promise;

function Promise(resolver, label) {
  this._superConstructor(resolver, label);
}

copyProperties(Promise, _Promise);

Promise.prototype = o_create(_Promise.prototype);
Promise.prototype.constructor = Promise;
Promise.prototype._superConstructor = _Promise;

Promise.prototype.returns = function(value) {
  return this.then(function() {
    return value;
  });
};

Promise.prototype.tap = function(method) {
  return this.then(function(value){
    method(value);
    return value;
  });
};

Promise.prototype.invoke = function(method) {
  var args = Array.prototype.slice(arguments, 1);

  return this.then(function(value) {
    return value[method].apply(value, args);
  }, undefined, 'invoke: ' + method + ' with: ' + args);
};

Promise.prototype.map = function(mapFn) {
  var Constructor = this.constructor;

  return this.then(function(values) {
    return Constructor.map(values, mapFn);
  });
};

Promise.prototype.filter = function(mapFn) {
  var Constructor = this.constructor;

  return this.then(function(values) {
    return Constructor.filter(values, mapFn);
  });
};

Promise.prototype.guard = function(test) {
  var guarded = this['finally'](function(){
    if (!test()) {
      guarded._subscribers.length = 0;
    }
  });

  return guarded;
};

exports["default"] = Promise;