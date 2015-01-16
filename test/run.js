var tape = require( 'tape' );
var util = require( 'util' );

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
        'module: %s, function: %s', modulePath, funcName
      );
      tape( testName, tests[ funcName ] );
    }
  }
});
