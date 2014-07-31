describe('RSVPParty.Promise', function() {
  var Promise = RSVPParty.Promise;

  it('should be defined', function() {
    expect(Promise).to.exist;
  });

  describe('properties are copied from RSVP.Promise', function() {
    var key;

    for(key in RSVP.Promise) {
      it(key + ' should be defined', function() {
        expect(Promise[key]).to.exist;
      });
    }
  });

  describe('methods exist on instantiated promise', function() {
    var promise;
    beforeEach(function() {
      promise = new Promise(function() {});
    });

    it('returns - should be defined', function() {
      expect(promise.returns).to.exist;
    });

    it('tap - should be defined', function() {
      expect(promise.tap).to.exist;
    });

    it('invoke - should be defined', function() {
      expect(promise.invoke).to.exist;
    });

    it('map - should be defined', function() {
      expect(promise.map).to.exist;
    });

    it('filter - should be defined', function() {
      expect(promise.filter).to.exist;
    });

    it('guard - should be defined', function() {
      expect(promise.guard).to.exist;
    });

    it('then - should be defined', function() {
      expect(promise.then).to.exist;
    });
  });
})
