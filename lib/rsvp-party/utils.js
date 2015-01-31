export var o_create = (Object.create || function(object) {
  var o = function() { };
  o.prototype = object;
  return o;
});
