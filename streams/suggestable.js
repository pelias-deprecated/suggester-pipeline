
// A stream which decides if a record is 'suggestable' or not.
// The 'suggestable' boolean flag is then set on 'record._meta.suggestable'.

var through = require('through2');

function suggestable(){

  var stream = through.obj( function( record, enc, done ) {

    // Error if record is not a valid object
    if( 'object' !== typeof record ){
      return error.apply( this, arguments );
    }

    // Skip suggester for records previously marked as noop
    if( 'object' === typeof record._meta && true === record._meta.noop ){
      return reject.apply( this, arguments );
    }

    // Skip suggester for records without a name
    if( 'object' !== typeof record.name || 'string' !== typeof record.name.default ){
      return reject.apply( this, arguments );
    }

    return accept.call( this, record, enc, done );
  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  // log invalid records
  stream.on( 'invalid', console.error.bind( console, __filename ) );

  return stream;
}

function accept( record, enc, done ){
  if( !record._meta ){ record._meta = {}; }
  record._meta.suggestable = true;
  this.push( record, enc ); // Forward record down the pipe
  return done(); // ACK and take next record from the inbound stream
}

function reject( record, enc, done ){
  if( !record._meta ){ record._meta = {}; }
  record._meta.suggestable = false;
  this.push( record, enc ); // Forward record down the pipe
  return done(); // ACK and take next record from the inbound stream
}

function error( record, enc, done ){
  this.emit( 'invalid', record );
  // do not push record downstream (rejected from pipeline)
  return done(); // ACK and take next record from the inbound stream
}

module.exports = suggestable;