 
var through = require('through2');

function suggester(){

  var stream = through.obj( function( record, enc, done ) {

    // skip suggester for records previously marked as suggestable=false
    if( true !== record._meta.suggestable ){
      this.push( record, enc );
      return done();
    }

    // build suggest input/payload/output
    record.suggest = {
      input:   suggester.generateInput( record ),
      payload: suggester.generatePayload( record ),
      output:  suggester.generateOutput( record )
    };

    this.push( record, enc );
    done();

  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  return stream;
}

var prefixes = [ 'the' ];

suggester.generateInput = function( record ){

  // first should be the default name
  var input = [
    record.name.default.toLowerCase()
  ];

  // then add alternative names
  for( var attr in record.name ){
    var name = record.name[ attr ].toLowerCase();
    input.push( name );
  }

  // allow users to exclude certain common prefixes
  // we search for names beginning with known prefixes
  // and followed by a space.
  // If one is found then we add a copy of that name
  // sans the prefix to the list of inputs
  for( var x=0; x<input.length; x++ ){
    var i = input[x];
    for( var y=0; y<prefixes.length; y++ ){
      var prefix = prefixes[y];
      if( i.substr( 0, prefix.length+1 ) == prefix+' ' ){
        input.push( i.substr( prefix.length+1 ) );
      }
    }
  }

  // de-dupe inputs
  return input.filter( function( i, pos ) {
    return input.indexOf( i ) == pos;
  });
}

suggester.generatePayload = function( record ){
  var payload = {
    id: record.type + '/' + record.id,
    geo: record.center_point.lon + ',' + record.center_point.lat
  };
  return payload;
}

suggester.generateOutput = function( record ){
  var adminParts = [];

  if( record.admin2 && record.admin2.length ){
    adminParts.push( record.admin2 );
  }
  else if( record.admin1 && record.admin1.length ){
    adminParts.push( record.admin1 );
  }
  if( record.admin0 && record.admin0.length ){
    adminParts.push( record.admin0 );
  }

  return [ record.name.default ].concat( adminParts ).join(', ').trim();
}

module.exports = suggester;