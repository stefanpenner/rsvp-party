"use strict";
var Promise = require("./rsvp-party/promise")["default"] || require("./rsvp-party/promise");
var RSVP = require("./rsvp-party/rsvp")["default"] || require("./rsvp-party/rsvp");

exports.Promise = Promise;
exports.RSVP = RSVP;