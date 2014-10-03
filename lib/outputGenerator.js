
// schema: poi_name, (local_admin || locality || neighborhood || admin2), (admin1_abbr || admin1)
/* eg:
  "alpha3": "USA",
  "admin0": "United States",
  "admin1": "New York",
  "admin1_abbr": "NY",
  "admin2": "New York",
  "local_admin": "Manhattan",
  "locality": "New York",
  "neighborhood": "Marble Hill"
*/

module.exports = function( record ){

  var adminParts = [];

  // local segment
  if( record.local_admin && record.local_admin.length ){
    adminParts.push( record.local_admin );
  }
  else if( record.locality && record.locality.length ){
    adminParts.push( record.locality );
  }
  else if( record.neighborhood && record.neighborhood.length ){
    adminParts.push( record.neighborhood );
  }
  else if( record.admin2 && record.admin2.length ){
    adminParts.push( record.admin2 );
  }

  // regional segment
  if( record.admin1_abbr && record.admin1_abbr.length ){
    adminParts.push( record.admin1_abbr );
  }
  else if( record.admin1 && record.admin1.length ){
    adminParts.push( record.admin1 );
  }
  else if( record.admin0 && record.admin0.length ){
    adminParts.push( record.admin0 );
  }

  var outputs = [ record.name.default ].concat( adminParts );

  // de-dupe outputs
  outputs = outputs.filter( function( i, pos ) {
    return outputs.indexOf( i ) == pos;
  });

  return outputs.join(', ').trim();
};