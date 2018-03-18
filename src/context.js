var Guilty = Guilty || {};

(function( Context, undefined ) {

    /**
     * Determine contexts that should be associated with an action based
     * on its name
     *
     * @param  {String} title    - the action title
     * @return {Array}  contexts - an array containing the names of the
     *                             contexts that should be associated
     *                             with the action
     */
    Context.contextsByName = function(title) {
        if (title.startsWith('Draft ideas re: ')) {
            return ['Anywhere', 'Planning'];
        }
        return [];
    };

}( Guilty.Context = Guilty.Context || {} ));
