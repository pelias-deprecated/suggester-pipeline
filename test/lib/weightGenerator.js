/**
 * @file Tests for the `lib/weightGenerator` module.
 */

var weightGenerator = require('../../lib/weightGenerator');

var tests = {};

tests[ '`exports` expected interface' ] = function( t ) {
  t.equal(typeof weightGenerator, 'function', 'is function');
  t.equal(weightGenerator.length, 1, 'accepts 1 argument.');
  t.end();
};

tests[ 'assigns expected weights to different types' ] = function ( t ){
  var testCases = {
    default: [{ _meta: {} }, 0],
    geoname: [{ _meta: { type: 'geoname' } }, 0],
    admin0: [{ _meta: { type: 'admin0' } }, 2],
    admin1: [{ _meta: { type: 'admin1' } }, 14],
    admin2: [{ _meta: { type: 'admin2' } }, 12],
    osmway: [{ _meta: { type: 'osmway' }, id: 'something-poi-address' }, 8],
    osmnode: [{ _meta: { type: 'osmnode' }, id: 1 }, 6],
    locality: [{ _meta: { type: 'locality' } }, 12]
  };

  t.plan( Object.keys( testCases ).length );
  for( var key in testCases ){
    var testCase = testCases[ key ];
    var actual = weightGenerator( testCase[ 0 ] );
    var expected = testCase[ 1 ];
    t.equal( actual, expected, key + ': weight matches expected.' );
  }
};

module.exports = tests;
