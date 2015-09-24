define("rsvp-party",
  ["./rsvp-party/promise","./rsvp-party/rsvp","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Promise = __dependency1__["default"] || __dependency1__;
    var RSVP = __dependency2__["default"] || __dependency2__;

    __exports__.Promise = Promise;
    __exports__.RSVP = RSVP;
  });
define("rsvp-party/rsvp-party/promise",
  ["rsvp","./utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var _RSVP = __dependency1__["default"] || __dependency1__;
    var o_create = __dependency2__.o_create;
    var assign = __dependency2__.assign;

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

    __exports__["default"] = Promise;
  });
define("rsvp-party/rsvp-party/rsvp",
  ["./promise","rsvp","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Promise = __dependency1__["default"] || __dependency1__;
    var _RSVP = __dependency2__["default"] || __dependency2__;
    var assign = __dependency3__.assign;

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

    __exports__["default"] = RSVP;
  });
define("rsvp-party/rsvp-party/utils",
  ["exports"],
  function(__exports__) {
    "use strict";
    var o_create = (Object.create || function(object) {
      var o = function() { };
      o.prototype = object;
      return o;
    });
    __exports__.o_create = o_create;
    var assign = function(to, from) {
      var key;
      for(key in from) {
        if(from.hasOwnProperty(key) && !to.hasOwnProperty(key)) {
          to[key] = from[key];
        }
      }
      return to;
    };
    __exports__.assign = assign;
  });