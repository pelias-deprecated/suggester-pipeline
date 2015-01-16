module.exports = function( record ){
  return record._meta.type + ':' + record._meta.id;
};
