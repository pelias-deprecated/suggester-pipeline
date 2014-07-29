
var prefixes = [ 'the' ];

module.exports = function( record ){

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