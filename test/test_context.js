/**
 * Tests for context.js
 */

var assert = require('assert');

var context = require('../src/context.js');

describe('contextsByName()', function() {
    var inferTests = {
        'Ask Gareth if he likes cheese':    ['Anywhere', 'Gareth'  ],
        'Ask Jessica if she likes cheese':  ['Anywhere', 'Jessica' ],
        'Create profile ...':               ['Anywhere', 'Phone'   ],
        'Create task test':                 ['Anywhere', 'Phone'   ],
        'Draft ideas re: blah':             ['Anywhere', 'Planning'],
        'Look up something about chickens': ['Anywhere', 'Network' ],
        'Talk to Barlows re: something':    ['Anywhere', 'Barlows' ],
        'foo':                              [],
    };

    Object.keys(inferTests).forEach(function(title) {
        it("Correctly infers contexts for '" + title + "'", function() {
            assert.deepEqual(context.contextsByName(title),
                             inferTests[title]);
        });
    });
});
