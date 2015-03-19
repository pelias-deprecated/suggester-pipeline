/**
 * @file Tests for the `lib/inputGenerator` module
 */

'use strict';
var inputGenerator = require( '../../lib/inputGenerator' );

var tests = {};

tests[ 'generates multiple inputs for prefixes/multiple names.' ] = function ( test ){
  var testCases = [
    {
      input: {default: 'the pub'},
      output: [ 'pub', 'the pub' ]
    },
    {
      input: {default: 'pub'},
      output: [ 'pub' ]
    },
    {
      input: {default: 'pub', alt: 'the street'},
      output: [ 'pub', 'the street', 'street' ]
    },
    {
      input: {default: 'the pub', alt: 'the street'},
      output: [ 'the pub', 'pub', 'the street', 'street' ]
    }
  ];
  testCases.forEach( function ( testCase ){
    var actual = inputGenerator( { name: testCase.input } );
    // console.log( testCase.output, actual );
    var pass = true;
    for( var ind = 0; ind < testCase.output.length; ind++ ){
      if( actual.indexOf( testCase.output[ ind ] ) === -1 ){
        pass = false;
        break;
      }
    }

    test[ ( pass ? 'pass' : 'fail' ) ]( 'Matches expected for: ' + JSON.stringify( testCase.input ) );
  });
  test.end();
};

module.exports = tests;
