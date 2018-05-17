/**
 * Tests for review.js
 */

var assert = require('assert');
var lolex  = require('lolex');

var mockentry = require('./mockentry.js');

var review    = require('../src/review.js');

describe('getReviewed()', function() {

    var clock;
    var entry;
    var mockedTime;

    beforeEach(function() {
        mockedTime = new Date().getTime();
        clock = lolex.install({now: mockedTime});
        entry = new mockentry.MockEntry();
    });

    afterEach(function() {
        clock.uninstall();
    });

    it('gives undefined if entry has never been reviewed', function() {
        assert.equal(review.getReviewed(entry), undefined);
    });

    it('gives correct time for an entry that has just been reviewed', function() {
        review.review(entry);
        assert.equal(review.getReviewed(entry), mockedTime);
    });

    it('gives correct time for an entry that has been reviewed in the past', function() {
        review.review(entry);
        clock.tick(100);
        assert.equal(review.getReviewed(entry), mockedTime);
    });
});
