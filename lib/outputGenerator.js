
module.exports = function( record ){

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

  var outputs = [ record.name.default ].concat( adminParts );

  // de-dupe outputs
  outputs = outputs.filter( function( i, pos ) {
    return outputs.indexOf( i ) == pos;
  });

  return outputs.join(', ').trim();
};