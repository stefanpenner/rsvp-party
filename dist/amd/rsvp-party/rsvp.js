define(
  ["./promise","rsvp","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Promise = __dependency1__["default"] || __dependency1__;
    var _RSVP = __dependency2__["default"] || __dependency2__;
    var copyProperties = __dependency3__.copyProperties;

    var RSVP = copyProperties({}, _RSVP);

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

    __exports__["default"] = RSVP;
  });