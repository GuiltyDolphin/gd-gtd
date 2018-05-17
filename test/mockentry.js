(function( exports, undefined ) {

    var MockEntry = function() {
        this.fields = {};
    };

    MockEntry.prototype.field = function(fieldName) {
        return this.fields[fieldName];
    };

    MockEntry.prototype.set = function(field, value) {
        this.fields[field] = value;
    };

    exports.MockEntry = MockEntry;

}( module.exports ));
