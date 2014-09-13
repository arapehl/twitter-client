(function () {
  'use strict';

  describe('Twitter', function () {
    var twitter;

    beforeEach(function () {
      twitter = new Twitter();
    });

    it('should exist', function () {
      expect(typeof twitter).toEqual('object');
    });
  });
}());
