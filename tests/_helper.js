/*global RSVP, chai*/

// Node
if(typeof window === "undefined") {
  chai = require('chai');
  RSVPParty = require('../dist/cjs/rsvp-party');
} else {
// Browser
}

expect = chai.expect;

