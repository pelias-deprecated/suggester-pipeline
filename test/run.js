/**
 * @file The main entry point for all of the suggester-pipeline's unit tests.
 */

var tape = require( 'tape' );
var util = require( 'util' );

/**
 * All the test modules to execute. Any tests that they contain must be
 * in the `module.exports` object, in the form of functions that accept a
 * single argument: a `tape` test object.
 */
var testModulePaths = [
  './interface.js',
  './suggester.js',
  './lib/generators.js',
  './lib/weightGenerator.js'
];

testModulePaths.forEach( function( modulePath ) {
  var tests = require( modulePath );
  for( var funcName in tests ){
    if( typeof tests[ funcName ] === 'function' ){
      var testName = util.format(
        'module: %s, test: %s', modulePath, funcName
      );
      tape( testName, tests[ funcName ] );
    }
  }
});
