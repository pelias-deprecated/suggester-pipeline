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

tests[ 'assigns expected weights to different types and population' ] = function ( t ){
  var expected_result = function(pop) {
    return pop ? Math.round(Math.log(pop + 1)) : 0;
  };
  var testCases = {
    default: [{ _meta: {} }, 0],
    geoname:  [{ _meta: { type: 'geoname' }, population: 0 }, 0],
    geoname1: [{ _meta: { type: 'geoname' }, population: 10000 }, expected_result(10000)],
    geoname2: [{ _meta: { type: 'geoname' }, population: 14000 }, expected_result(14000)],
    geoname3: [{ _meta: { type: 'geoname' }, population: 30000 }, expected_result(30000)],
    geoname4: [{ _meta: { type: 'geoname' }, population: 100 }, expected_result(100)],
    geoname5: [{ _meta: { type: 'geoname' }, population: 1 }, expected_result(1)],
    geoname6: [{ _meta: { type: 'geoname' }, population: 234000 }, expected_result(234000)],
    geoname7: [{ _meta: { type: 'geoname' }, population: -1 }, expected_result(-1)],
    geoname8: [{ _meta: { type: 'geoname' }, population: NaN }, expected_result(NaN)],
    admin0: [{ _meta: { type: 'admin0' } }, 2],
    admin1: [{ _meta: { type: 'admin1' } }, 14],
    admin2: [{ _meta: { type: 'admin2' } }, 12],
    osmway: [{ _meta: { type: 'osmway' }, id: 'something-poi-address' }, 8],
    osmnode: [{ _meta: { type: 'osmnode' }, id: 1, population: 0 }, 6],
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
