var weights = require('pelias-model').weights;

function generator( record ){
  var type = record._meta.type;

  // poi-address and addresses
  if( ( type === 'osmnode' || type === 'osmway' ) &&
    typeof record.id === 'string' ){
    if( record.id.match('poi-address') ){
      type = 'poi-address';
    }
    else if( record.id.match('address') ){
      type = 'address';
    }
  }

  return ( type in weights ) ? weights[ type ] : 0;
}

module.exports = generator;
