var mergeTrees = require('broccoli-merge-trees');
var dist       = require('broccoli-dist-es6-module');

var sourceTrees = [];

var js = dist('lib', {
  main: 'rsvp-party',
  global: 'RSVP',
  packageName: 'rsvp-party',
  shim: {
    'rsvp': 'RSVP'
  }
});

sourceTrees.push(js);

module.exports = mergeTrees(sourceTrees, { overwrite: true });
