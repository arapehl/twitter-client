(function () {
  'use strict';

  describe('Tweet', function () {
    var tweet;

    beforeEach(function () {
      tweet = new Tweet();
    });

    it('should exist', function () {
      expect(typeof tweet).toEqual('object');
    });
  });
}());
