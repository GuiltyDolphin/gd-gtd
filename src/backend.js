var Guilty = Guilty || {};

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
        return JSON.parse(entry.field('backendData'));
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
        var backendData = getData(entry);
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

}( Guilty.Backend = Guilty.Backend || {} ));
