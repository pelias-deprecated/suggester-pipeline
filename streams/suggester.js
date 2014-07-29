 
var through = require('through2');
var generator = require('../lib/generators');

function suggester( override ){

  // allow overriding of generators
  if( 'object' !== override ){ override = {}; }

  var stream = through.obj( function( record, enc, done ) {

    // skip suggester for records previously marked as suggestable=false
    if( true !== record._meta.suggestable ){
      this.push( record, enc );
      return done();
    }

    // build suggest input/payload/output
    record.suggest = {
      input:   ( override.input   || generator.input   )( record ),
      payload: ( override.payload || generator.payload )( record ),
      output:  ( override.output  || generator.output  )( record )
    };

    this.push( record, enc );
    done();

  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  return stream;
}

module.exports = suggester;