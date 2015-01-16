module.exports = function( record ){
  var id = record._meta.id;
  var type = record._meta.type;
  if( id === undefined || type === undefined ){
    console.error( 'Either `._meta.id` or `._meta.type` is undefined.' );
    process.exit( 1 );
  }
  return type + ':' + id;
};
