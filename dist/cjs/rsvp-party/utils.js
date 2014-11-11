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