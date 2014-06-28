rsvp-party
==========

idea:
-----

provide a RSVP.Promise subclass that has wonderful extensions and helpers.

extensions:
-----------
* `Promise.prototype.returns`
* `Promise.prototype.tap`
* `Promise.prototype.invoke`
* `Promise.prototype.map`
* `Promise.prototype.filter`
* `Promise.prototype.guard`
* `Promise.prototype.reduce`
* ... get/set ?

utilities:
----------
* `Promise.sequence`
* `Promise.while`
* ...

usage:
----------

var RSVP = require('rsvp-party');
var Promise = require('rsvp-party').Promise;

Running Tests:
--------------

```
testem
```
