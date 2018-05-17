(function( Review, undefined ) {
    var backend = require('./backend.js');

    /**
     * Get the last time at which an entry was reviewed
     *
     * @param   {Entry}   entry - entry to check
     * @returns {integer} the time (in milliseconds) since the
     *                    epoch at which the entry was last
     *                    reviewed
     */
    Review.getReviewed = function(entry) {
        var reviewData = backend.getData(entry, 'review');
        if (reviewData !== undefined) {
            return reviewData.lastReviewed;
        }
    };

    /**
     * Update the review timestamp of an entry
     *
     * @param {Entry}    entry      - current entry
     */
    Review.review = function(entry) {
        var reviewData = {
            lastReviewed: new Date().getTime()
        };
        backend.setData(entry, 'review', reviewData);
    };

}( module.exports ));
