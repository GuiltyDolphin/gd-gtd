(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gd = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function( Backend, undefined ) {

    /**
     * Copy an object
     *
     * @param   {object} object - object to copy
     * @returns {object}          the cloned object
     */
    function copyObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * Get the backend data of an entry
     *
     * @param   {Entry}  entry - entry to set backend data in
     * @returns {object} the backend data as an object
     */
    function getBackend(entry) {
        var backendString = entry.field('backendData');
        if (backendString !== undefined && backendString !== '') {
            return JSON.parse(backendString);
        }
        // backend data hasn't been set yet
        return {};
    }

    /**
     * Set some data in the entry backend
     *
     * @param {Entry}    entry - entry to set backend data in
     * @param {function} setFn - function that takes the backend data
     *                           as an object argument, and returns
     *                           the new backend data as an object
     */
    function setDataFn(entry, setFn) {
        var backendData = getBackend(entry);
        return setFn(copyObject(backendData));
    }

    /**
     * Get data from the backend
     *
     * @param   {Entry}  entry - entry to get backend data from
     * @param   {string} key   - name of data to get
     * @returns {*}      value of the data
     */
    Backend.getData = function(entry, key) {
        var backendData = getBackend(entry);
        return backendData[key];
    };

    /**
     * Set some data in the entry backend
     *
     * @param {Entry}  entry - entry to set backend data in
     * @param {string} key   - identifier for the data to be set
     * @param {*}      value - the value to set the data to
     */
    Backend.setData = function(entry, key, value) {
        var backendData = getBackend(entry);
        var newBackend = setDataFn(entry, function(data) {
            data[key] = value;
            return data;
        });
        entry.set('backendData', JSON.stringify(
            newBackend, null, 2));
    };

}( module.exports ));

},{}],2:[function(require,module,exports){
(function( Context, undefined ) {

    var contextMap = {
        '^Draft ideas re:': ['Planning'],
        '^Create (task|profile) ':    ['Phone'],
        '^(?:Talk to(?= \\w+ re:)|Ask) (\\w+) ': function(match) {
            return [match[1]];
        },
        '^Look up ': ['Network']
    };

    /**
     * Determine contexts that should be associated with an action based
     * on its name
     *
     * @param   {string}   title - the action title
     * @returns {string[]} list containing the names of the contexts
     *                     that should be associated with the action
     */
    Context.contextsByName = function(title) {
        var matchRe =
            Object.keys(contextMap).find(function(regex) {
                return title.match(regex);
            });
        var getContexts = contextMap[matchRe];
        var extraContexts;
        if (typeof(getContexts) == 'function') {
            extraContexts = getContexts(title.match(matchRe));
        } else if (Array.isArray(getContexts)) {
            extraContexts = getContexts;
        } else {
            return [];
        }
        return ['Anywhere'].concat(extraContexts);
    };

}( module.exports ));

},{}],3:[function(require,module,exports){
/** Library entry point
 *
 * backend - interaction with backend data
 * context - support for context inference
 * review  - support for reviewing entries
 */
module.exports = {
    backend: require('./backend.js'),
    context: require('./context.js'),
    review : require('./review.js')
};

},{"./backend.js":1,"./context.js":2,"./review.js":4}],4:[function(require,module,exports){
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

},{"./backend.js":1}]},{},[3])(3)
});
