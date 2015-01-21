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

  /**
   * allow users to exclude certain common prefixes we search for names
   * beginning with known prefixes and followed by a space. If one is found
   * then we add a copy of that name sans the prefix to the list of inputs
  */
  input.forEach( function ( inputVal ){
    prefixes.forEach( function ( prefixVal ){
      if( inputVal.substr( 0, prefixVal.length + 1 ) === prefixVal + ' ' ){
        input.push( inputVal.substr( prefixVal.length + 1 ) );
      }
    });
  });

  // de-dupe inputs
  return input.filter( function( i, pos ) {
    return input.indexOf( i ) === pos;
  });
};
