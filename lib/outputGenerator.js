
var schemas = require('./outputSchema');

module.exports = function( record ){

  var adminParts = [];

  var schema = schemas.default;
  
  if (record.admin0 && record.admin0.length && schemas[record.admin0]) {
    schema = schemas[record.admin0];
  }
  
  var buildOutput = function(parts, schemaArr, record) {
    for (var i=0; i<schemaArr.length; i++) {
      var rec = record[schemaArr[i]];
      if (rec && rec.length) {
        parts.push( rec );
        return parts;
      }
    }
    return parts;
  };

  for (var key in schema) {
    adminParts = buildOutput(adminParts, schema[key], record);  
  }

  var outputs = [ record.name.default ].concat( adminParts );

  // de-dupe outputs
  outputs = outputs.filter( function( i, pos ) {
    return outputs.indexOf( i ) == pos;
  });

  return outputs.join(', ').trim();
};