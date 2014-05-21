var RSVP = require('rsvp');
var Promise = RSVP.Promise;

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
  return this.then(function(values) {
    return RSVP.map(values, mapFn);
  });
};

Promise.prototype.filter = function(mapFn) {
  return this.then(function(values) {
    return RSVP.filter(values, mapFn);
  });
};

Promise.prototype.guard = function(test) {
  var guarded = this['finally'](function(){
    if (!test()) {
      guarded._subscribers = 0;
    }
  });

  return guarded;
};

if (RSVP.configure('get') === undefined) {
  RSVP.configure('get', function(obj, property) {
    return obj[property];
  });
}

Promise.prototype.get = function(property) {
  return this.then(function(obj) {
    return RSVP.configure('get')(obj, property);
  });
};

if (RSVP.configure('set') === undefined) {
  RSVP.configure('set', function(obj, property, value) {
    obj[property] = value;

    return value;
  });
}

Promise.prototype.set = function(property, value) {
  return this.then(function(obj) {
    return RSVP.configure('set')(obj, property, value);
  });
};

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