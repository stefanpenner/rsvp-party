var to5  = require('broccoli-6to5-transpiler');
var stew = require('broccoli-stew');

var log  = stew.log;
var find = stew.find;
var mv = stew.mv;
var env  = stew.env;

var sourceTrees = [];

env('development', function() {
  sourceTrees.push(mv(find('node_modules/rsvp/dist/{rsvp.js}'), 'node_modules/rsvp/dist/', '/rsvp/'));
  sourceTrees.push(mv(find('node_modules/chai/{chai.js}'),      'node_modules/chai/',      '/chai/'));
  sourceTrees.push(to5(find('tests/**/*.js')));
});

sourceTrees.push(to5(find('lib/**/*.js')));

module.exports = log(find(sourceTrees));
