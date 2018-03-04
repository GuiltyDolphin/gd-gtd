var Review = {
/**
    Mark an entry as reviewed, and display the next unreviewed item
    @param {Library}  lib        - current library
    @param {Entry}    entry      - current entry
    @param {function} filterNext - predicate function to further reduce
                                   candidates for next review
    */
    markReviewed: function(lib, entry, filterNext) {
        entry.set("Reviewed", true);
        showNextReview(lib.entries(), filterNext);
    },

/**
    Display the next entry that needs reviewing
    @param {Array} entries       - candidate entries to search for next
                                   item
    @param {function} filterNext - predicate function to further reduce
                                   candidates for next review
    */
    showNextReview: function(entries, filterNext) {
        var nextReview = entries.find(function(e) {
            return !e.field("Reviewed") &&
                (filterNext === undefined ? true : filterNext(e));
        });
        if (nextReview === undefined) {
            message("Nothing left to review");
        } else {
            nextReview.show();
        }
    }

};
