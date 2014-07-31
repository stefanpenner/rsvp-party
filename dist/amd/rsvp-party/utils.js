define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var o_create = (Object.create || function(object) {
      var o = function() { };
      o.prototype = object;
      return o;
    });
    __exports__.o_create = o_create;
    var copyProperties = function(to, from) {
      var key;
      for(key in from) {
        if(from.hasOwnProperty(key) && !to.hasOwnProperty(key)) {
          to[key] = from[key];
        }
      }
      return to;
    };
    __exports__.copyProperties = copyProperties;
  });