describe('RSVPParty.RSVP', function() {
  it('should be defined', function() {
    expect(RSVPParty.RSVP).to.exist;
  });

  describe('properties copied from RSVP', function() {
    var key;

    for(key in RSVP) {
      it(key + ' should be defined', function() {
        expect(RSVPParty.RSVP[key]).to.exist;
      });
    }
  });

  describe('methods exist on RSVP object', function() {
    it('sequence - should be defined', function() {
      expect(RSVPParty.RSVP.sequence).to.exist;
    });

    it('hashSequence - should be defined', function() {
      expect(RSVPParty.RSVP.hashSequence).to.exist;
    });

    it('promiseWhile - should be defined', function() {
      expect(RSVPParty.RSVP.promiseWhile).to.exist;
    });
  });
})
