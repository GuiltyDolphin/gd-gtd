var Guilty = Guilty || {};

(function( Context, undefined ) {

    /**
     * Determine contexts that should be associated with an action based
     * on its name
     *
     * @param   {string}   title - the action title
     * @returns {string[]} list containing the names of the contexts
     *                     that should be associated with the action
     */
    Context.contextsByName = function(title) {
        if (title.startsWith('Draft ideas re: ')) {
            return ['Anywhere', 'Planning'];
        } else if (title.startsWith('Create task ')) {
            return ['Anywhere', 'Phone'];
        }
        var match = title.match(/^Talk to (\w+) re:/);
        if (match) {
            return ['Anywhere', match[1]];
        }
        return [];
    };

}( Guilty.Context = Guilty.Context || {} ));
