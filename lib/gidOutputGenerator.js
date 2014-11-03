
module.exports = function( record ){
  // record.type is deprecated in favour of record._meta.type
  var id   = ( 'object' == typeof record._meta && record._meta.hasOwnProperty('id') )   ? record._meta.id   : record.id;
  var type = ( 'object' == typeof record._meta && record._meta.hasOwnProperty('type') ) ? record._meta.type : record.type;
  return type + ':' + id;
};