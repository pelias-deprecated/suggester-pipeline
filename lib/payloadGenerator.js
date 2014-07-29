
module.exports = function( record ){
  var payload = {
    id: record.type + '/' + record.id,
    geo: record.center_point.lon + ',' + record.center_point.lat
  };
  return payload;
}