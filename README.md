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

utilities:
----------
* `RSVP.sequence`
* `RSVP.hashSequence`
* `RSVP.promiseWhile`

todos:
----------
* `Promise.prototype.reduce`
* ... get/set ?


usage:
----------

```
var RSVP = require('rsvp-party').RSVP;
var Promise = require('rsvp-party').Promise;
```

Running Tests:
--------------

```
npm test
```
