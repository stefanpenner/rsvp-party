describe('RSVPParty.RSVP', function() {
  var RSVP = RSVPParty.RSVP;

  it('should be defined', function() {
    expect(RSVP).to.exist;
  });

  describe('methods exist on RSVP object', function() {
    it('sequence - should be defined', function() {
      expect(RSVP.sequence).to.exist;
    });

    it('hashSequence - should be defined', function() {
      expect(RSVP.hashSequence).to.exist;
    });

    it('promiseWhile - should be defined', function() {
      expect(RSVP.promiseWhile).to.exist;
    });
  });
})
