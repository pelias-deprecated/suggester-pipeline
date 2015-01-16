var suggester = require('../lib/suggester'),
  through = require('through2'),
  generators = require('../lib/generators'),
  fixtures = require('./fixtures');

tests = {};

tests.suggester = function(t) {
  t.equal(typeof suggester, 'function', 'valid function');
  t.end();
};

tests.contructor = function(t) {
  var stream = suggester( generators );
  t.equal(typeof stream._read, 'function', 'valid readable');
  t.equal(typeof stream._write, 'function', 'valid writeable');
  t.end();
};

tests[ 'suggester should run' ] = function(t) {
  // fixtures.forEach( function( fixture, i ){
    // var stream = suggester( generators );

    // // @todo: better tests & code for when some of these
    // // properties are incorrectly set.
    // // eg. type, id, center_point etc.
    // t.equal( fixture.input._meta.suggestable, true, 'I screwed up the test' );

    // // ensure 'invalid' event not emitted
    // stream.on( 'invalid', t.end );

    // // ensure error is not emitted
    // stream.on( 'error', t.end );

    // // ensure the suggest data is correct
    // stream.pipe( through.obj( function( chunk, enc, done ){
      // t.equal( typeof chunk.suggest, 'object', 'suggest object created' );
      // t.deepEqual( chunk.suggest, fixture.output, 'fixture ' + (i+1) );
    // }));

    // // write a valid record
    // stream.write( fixture.input, 'utf8' );
  // });

  t.end();
};

module.exports = tests;
