module.exports = function( record ){
  var id = record._meta.id;
  var type = record._meta.type;
  if( id === undefined || type === undefined ){
    throw {
      name: 'InvalidRecord',
      message: 'Either `._meta.id` or `._meta.type` is undefined.'
    }
  }
  return type + ':' + id;
};
