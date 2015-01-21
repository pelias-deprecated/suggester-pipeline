/**
 * Tests for `index.js`
 */

var suggester = require('../');

var tests = {};

tests[ 'exports an object with expected properties' ] = function(t) {
  t.equal(typeof suggester, 'object', 'is an object');
  t.ok('streams' in suggester, 'object', 'contains `streams`');
  t.equal(typeof suggester.streams, 'object', '`streams` is an object');
  t.equal(
    typeof suggester.streams.suggester, 'function',
    '`suggester` is a valid function'
  );
  t.equal(typeof suggester.generators, 'object', '`generators` is an object');
  t.end();
};

tests[ 'exports a valid `pipeline`' ] = function (t) {
  t.equal(typeof suggester.pipeline._read, 'function', 'is readable');
  t.equal(typeof suggester.pipeline._write, 'function', 'is writeable');
  t.end();
};

module.exports = tests;
