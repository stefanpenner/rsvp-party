var mergeTrees = require('broccoli-merge-trees');
var dist       = require('broccoli-dist-es6-module');
var pickFiles  = require('broccoli-static-compiler');
var env        = require('broccoli-env').getEnv();

var sourceTrees = [];

if(env === 'development') {
  var rsvp = pickFiles('node_modules/rsvp/dist', {
    srcDir: '/',
    files: ['rsvp.js'],
    destDir: '/rsvp'
  });
  sourceTrees.push(rsvp);
  var chai = pickFiles('node_modules/chai', {
    srcDir: '/',
    files: ['chai.js'],
    destDir: '/chai'
  });
  sourceTrees.push(chai);
}

var js = dist('lib', {
  main: 'rsvp-party',
  global: 'RSVPParty',
  packageName: 'rsvp-party',
  shim: {
    'rsvp': 'RSVP'
  }
});
sourceTrees.push(js);

module.exports = mergeTrees(sourceTrees, { overwrite: true });
