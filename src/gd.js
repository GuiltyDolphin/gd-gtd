/** Library entry point
 *
 * gd.backend - interaction with backend data
 * gd.context - support for context inference
 * gd.review  - support for reviewing entries
 */
var gd = gd || {};

Object.assign(gd, {
    backend: require('./backend.js'),
    context: require('./context.js'),
    review : require('./review.js')
});
