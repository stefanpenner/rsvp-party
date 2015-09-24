!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.RSVPParty=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Promise = _dereq_("./rsvp-party/promise")["default"] || _dereq_("./rsvp-party/promise");
var RSVP = _dereq_("./rsvp-party/rsvp")["default"] || _dereq_("./rsvp-party/rsvp");

exports.Promise = Promise;
exports.RSVP = RSVP;
},{"./rsvp-party/promise":2,"./rsvp-party/rsvp":3}],2:[function(_dereq_,module,exports){
"use strict";
var _RSVP = window.RSVP["default"] || window.RSVP;
var o_create = _dereq_("./utils").o_create;
var assign = _dereq_("./utils").assign;

var _Promise = _RSVP.Promise;

function Promise(resolver, label) {
  this._superConstructor(resolver, label);
}

assign(Promise, _Promise);

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
},{"./utils":4}],3:[function(_dereq_,module,exports){
"use strict";
var Promise = _dereq_("./promise")["default"] || _dereq_("./promise");
var _RSVP = window.RSVP["default"] || window.RSVP;
var assign = _dereq_("./utils").assign;

var RSVP = assign({}, _RSVP);

// please note, these must be array of callables which return promises
RSVP.sequence = Promise.sequence = function(tasks) {
  var length = tasks.length;
  var current = Promise.resolve();
  var results = new Array(length);

  for (var i = 0; i < length; ++i) {
    current = results[i] = current.then(tasks[i]);
  }

  return Promise.all(results);
};

// please note, these must be an object of callables which return promises
// also dependingon the implementation this may be entirely non-deterministic
// what better way to have a party
RSVP.hashSequence = function(tasks) {
  var keys = Object.keys(tasks);
  var length = keys.length;
  var current = Promise.resolve();
  var taskName;
  var results = { };

  for (var i = 0; i < length; ++i) {
    taskName = keys[i];
    current = results[taskName] = current.then(tasks[taskName]);
  }

  return RSVP.hash(results);
};

//Run a promise returning callable body while a
//promise returning callable condition is true.
//Returns a promise.
RSVP.promiseWhile = function(condition, body) {
  return new RSVP.Promise(function(resolve,reject){

    function loop() {
      RSVP.Promise.resolve(condition()).then(function(result){
        // When the result of calling `condition` is no longer true, we are done.
        if (!result){
          resolve();
        } else {
          // When it completes loop again otherwise, if it fails, reject
          RSVP.Promise.resolve(body()).then(loop,reject);
        }
      });
    }

    // Start running the loop
    loop();
  });
};

exports["default"] = RSVP;
},{"./promise":2,"./utils":4}],4:[function(_dereq_,module,exports){
"use strict";
var o_create = (Object.create || function(object) {
  var o = function() { };
  o.prototype = object;
  return o;
});
exports.o_create = o_create;
var assign = function(to, from) {
  var key;
  for(key in from) {
    if(from.hasOwnProperty(key) && !to.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  }
  return to;
};
exports.assign = assign;
},{}]},{},[1])
(1)
});