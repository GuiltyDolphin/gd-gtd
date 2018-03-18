var Guilty = Guilty || {};

(function( Review, undefined ) {

    /**
     * Check if an entry has been reviewed
     *
     * @param   {Entry}   entry - entry to check
     * @returns {boolean} `true` if the entry has been reviewed, `false`
     *                    otherwise
     */
    function isReviewed(entry) {
        return Guilty.Backend.getData(entry, 'Reviewed') === true;
    }

    /**
     * Display the next entry that needs reviewing
     * @param {Entry[]}  entries    - candidate entries to search for
     *                                next item
     * @param {function} filterNext - predicate function to further
     *                                reduce candidates for next review
     */
    function showNextReview(entries, filterNext) {
        var nextReview = entries.find(function(e) {
            return !isReviewed(e) &&
                (filterNext === undefined ? true : filterNext(e));
        });
        if (nextReview === undefined) {
            message("Nothing left to review");
        } else {
            nextReview.show();
        }
    }

    /**
     * Mark an entry as reviewed, and display the next unreviewed item
     *
     * @param {Library}  lib        - current library
     * @param {Entry}    entry      - current entry
     * @param {function} filterNext - predicate function to further
     *                                reduce candidates for next review
     */
    Review.markReviewed = function(lib, entry, filterNext) {
        Guilty.Backend.setData(entry, 'Reviewed', true);
        showNextReview(lib.entries(), filterNext);
    };

}( Guilty.Review = Guilty.Review || {} ));
