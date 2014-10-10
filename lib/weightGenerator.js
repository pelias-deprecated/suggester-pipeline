
var weights = {
  'geoname': 0,
  'admin0': 2,
  'admin1': 20,
  'admin2': 20,
  'address': 4, // OSM addresses without a matching POI
  'osmnode': 6,
  'osmway': 6,
  'poi-address': 8, // OSM addresses with a matching POI
  'neighborhood': 10,
  'local_admin': 12,
  'locality': 12
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