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
