
var weights = {
  'geoname': 0,
  'address': 2, // OSM addresses without a matching POI
  'osmnode': 4,
  'osmway': 4,
  'poi-address': 6, // OSM addresses with a matching POI
  'neighborhood': 8,
  'local_admin': 10,
  'locality': 10,
  'admin2': 12,
  'admin1': 12,
  'admin0': 14
};

function generator( record ){

  var type;

  // all records SHOULD have record._meta.type set
  if( 'object' == typeof record._meta && record._meta.hasOwnProperty('type') ){
    type = record._meta.type;
  }

  if( type ){

    // poi-address and addresses
    if( type === 'osmnode' || type === 'osmway' ){
      if( 'string' === typeof record.id ){
        if( record.id.match('poi-address') ){
          type = 'poi-address';
        } else if( record.id.match('address') ){
          type = 'address';
        }
      }
    }

    // map type to weight
    if( weights.hasOwnProperty(type) && weights[type] ){
      return weights[type];
    }
  }

  // return default
  return 0;
}

module.exports = generator;