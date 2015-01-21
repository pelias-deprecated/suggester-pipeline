/**
 * Tests for `./lib/generators.js`.
 */

var generators = require('../../lib/generators');

var tests = {};

tests.interface = function(t) {
  t.equal(typeof generators, 'object', 'valid object');
  var expectedFuncProps = [ 'input', 'output', 'weight'];
  expectedFuncProps.forEach( function ( funcName ){
    t.ok( funcName in generators, 'contains ' + funcName );
    t.equal(
      typeof generators[ funcName ], 'function', funcName + ' is a function'
    );
  });
  t.end();
};

module.exports = tests;
