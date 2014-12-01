
var through = require('through2');

function suggester( generators ){

  var stream = through.obj( function( record, enc, next ) {

    var done = function(){
      setImmediate( next );
    };

    // skip suggester for records previously marked as suggestable=false
    if( true !== record._meta.suggestable ){
      this.push( record, enc );
      return done();
    }

    // build suggest input/payload/output
    record.suggest = {
      input:   generators.input( record ),
      output:  generators.output( record )
    };

    var weight = generators.weight( record );
    if( weight ){
      record.suggest.weight = weight;
    }

    this.push( record, enc );
    done();

  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  return stream;
}

module.exports = suggester;