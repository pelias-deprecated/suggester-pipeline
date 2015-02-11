var weights = require('./weights');

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

  // use population for weighting (experimental)
  // only weigh areas with 'large' population higher 
  var large = 1000; 
  var pop_weight = record.population ? (Math.ceil(record.population/large)) : 0;

  return pop_weight + (( type in weights ) ? weights[ type ] : 0);
}

module.exports = generator;
