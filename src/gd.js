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
