
var suggestable = require('../streams/suggestable'),
    through = require('through2');

module.exports.suggestable = {};

module.exports.suggestable.interface = function(test, common) {
  test('suggestable', function(t) {
    t.equal(typeof suggestable, 'function', 'valid function');
    t.end();
  });
}

module.exports.suggestable.contructor = function(test, common) {
  test('suggestable()', function(t) {
    var stream = suggestable();
    t.equal(typeof stream._read, 'function', 'valid readable');
    t.equal(typeof stream._write, 'function', 'valid writeable');
    t.end();
  });
}

// @note: test will fail if t.end is called multiple times
module.exports.suggestable.invalidRecord = function(test, common) {
  test('invalidRecord', function(t) {
    var stream = suggestable();
    var invalidRecord = 'invalid not object';

    // ensure 'invalid' event is emitted
    stream.on( 'invalid', function( errRecord ){
      t.equal(invalidRecord, errRecord, 'invalid record');
      t.end();
    });

    // ensure error is not emitted
    stream.on( 'error', t.end );

    // ensure record is not piped downstream
    stream.pipe( through.obj( t.end ) );

    // write an invalid record
    stream.write( invalidRecord, 'utf8' );
  });
}

// @note: test will fail if t.end is called multiple times
module.exports.suggestable.noop = function(test, common) {
  test('reject noop', function(t) {
    var stream = suggestable();
    var record = { _meta: { noop: true } };

    // ensure 'invalid' event not emitted
    stream.on( 'invalid', t.end );

    // ensure error is not emitted
    stream.on( 'error', t.end );

    // ensure meta property is set and record is piped downstream
    stream.pipe( through.obj( function( chunk, enc, done ){
      t.equal( chunk._meta.suggestable, false, 'marked not suggestable' );
      t.end();
    }));

    // write an invalid record
    stream.write( record, 'utf8' );
  });
}

// @note: test will fail if t.end is called multiple times
module.exports.suggestable.invalidname = function(test, common) {
  test('reject name', function(t) {
    var stream = suggestable();
    var record = {};

    // ensure 'invalid' event not emitted
    stream.on( 'invalid', t.end );

    // ensure error is not emitted
    stream.on( 'error', t.end );

    // ensure meta property is set and record is piped downstream
    stream.pipe( through.obj( function( chunk, enc, done ){
      t.equal( chunk._meta.suggestable, false, 'marked not suggestable' );
      t.end();
    }));

    // write an invalid record
    stream.write( record, 'utf8' );
  });

  test('reject name 2', function(t) {
    var stream = suggestable();
    var record = { name: { default: { an: 'object' } } };

    // ensure 'invalid' event not emitted
    stream.on( 'invalid', t.end );

    // ensure error is not emitted
    stream.on( 'error', t.end );

    // ensure meta property is set and record is piped downstream
    stream.pipe( through.obj( function( chunk, enc, done ){
      t.equal( chunk._meta.suggestable, false, 'marked not suggestable' );
      t.end();
    }));

    // write an invalid record
    stream.write( record, 'utf8' );
  });
}

module.exports.suggestable.valid = function(test, common) {
  test('accept name', function(t) {
    var stream = suggestable();
    var record = { name: { default: 'London City' } };

    // ensure 'invalid' event not emitted
    stream.on( 'invalid', t.end );

    // ensure error is not emitted
    stream.on( 'error', t.end );

    // ensure meta property is set and record is piped downstream
    stream.pipe( through.obj( function( chunk, enc, done ){
      t.equal( chunk._meta.suggestable, true, 'marked as suggestable' );
      t.end();
    }));

    // write a valid record
    stream.write( record, 'utf8' );
  });
}

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('suggestable: ' + name, testFunction)
  }

  for( var testCase in module.exports.suggestable ){
    module.exports.suggestable[testCase](test, common);
  }
}