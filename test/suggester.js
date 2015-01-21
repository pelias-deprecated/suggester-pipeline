var suggester = require('../lib/suggester'),
  through = require('through2'),
  generators = require('../lib/generators');

var tests = {};

tests[ 'valid `module.exports`' ] = function(t) {
  t.equal(typeof suggester, 'function', 'is a function');
  t.end();
};

tests[ 'constructor returns expected stream' ] = function(t) {
  var stream = suggester( generators );
  t.equal(typeof stream._read, 'function', 'is readable');
  t.equal(typeof stream._write, 'function', 'is writeable');
  t.end();
};

tests[ 'suggester throws exception on bad properties' ] = function ( t ){
  var suggesterStream = suggester();
  var objects = [ {}, {type: ''}, {id: ''} ];

  objects.forEach( function ( obj ){
    t.throws(
      suggesterStream.write.bind( null, obj ), null,
      'Throws exception on objects without `_meta.id` or `_meta.type`.'
    );
  });

  objects = [ {}, { name: { default: 1 } } ];
  objects.forEach( function ( obj ){
    t.throws(
      suggesterStream.write.bind( null, obj ), null,
      'Throws exception on objects without a `string` `name.default`.'
    );
  });

  t.end();
};

tests[ 'suggester builds `suggest` property' ] = function ( t ){
  var suggesterStream = suggester( generators );
  var input = {
    _meta: {
      id: null,
      type: null
    },
    name: {
      default: ''
    }
  };

  suggesterStream.write( input );
  var output = suggesterStream.read();
  t.ok( 'suggest' in output, 'outbound record contains `suggest`' );
  t.ok( 'input' in output.suggest, '`suggest` contains `input`.' );
  t.ok( 'output' in output.suggest, '`suggest` contains `output`.' );
  t.end();
};

module.exports = tests;
