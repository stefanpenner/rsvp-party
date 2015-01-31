var to5  = require('broccoli-6to5-transpiler');
var stew = require('broccoli-stew');

var log  = stew.log;
var find = stew.find;
var mv   = stew.mv;
var env  = stew.env;

var output = [];
var deps   = [];

var src  = find('lib/**/*.js');

output.push(to5(find(src, '!**/*-test.js')));

env('development', function() {
  output.push(to5(find(src, '**/*-test.js')));

  deps.push(mv(find('node_modules/rsvp/dist/{rsvp.js}'), 'node_modules/rsvp/dist/', '/rsvp/'));
  deps.push(mv(find('node_modules/chai/{chai.js}'),      'node_modules/chai/',      '/chai/'));
});

module.exports = find(output);
