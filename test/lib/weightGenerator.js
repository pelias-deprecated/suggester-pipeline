
var weightGenerator = require('../../lib/weightGenerator');
tests = {};

tests.interface = function(t) {
  t.equal(typeof weightGenerator, 'function', 'valid function');
  t.equal(weightGenerator.length, 1, 'accepts x args');
  t.end();
};

// unset type should yield default value
tests[ 'unset type' ] = function(t) {
    var record = { _meta: {} };
    var weight = weightGenerator( record );
    t.equal(weight, 0, 'default weight');
    t.end();
};

tests[ 'geoname type' ] = function(t) {
  var record = { _meta: { type: 'geoname' } };
  var weight = weightGenerator( record );
  t.equal(weight, 0, 'correct weight');
  t.end();
};

tests['admin0 type'] = function(t) {
  var record = { _meta: { type: 'admin0' } };
  var weight = weightGenerator( record );
  t.equal(weight, 2, 'correct weight');
  t.end();
};

tests[ 'admin1 type' ] = function(t) {
  var record = { _meta: { type: 'admin1' } };
  var weight = weightGenerator( record );
  t.equal(weight, 14, 'correct weight');
  t.end();
};

tests[ 'admin2 type'] = function(t) {
  var record = { _meta: { type: 'admin2' } };
  var weight = weightGenerator( record );
  t.equal(weight, 12, 'correct weight');
  t.end();
};

tests[ 'address type' ] = function(t) {
  var record = { _meta: { type: 'osmnode' }, id: 'something-address-foo' };
  var weight = weightGenerator( record );
  t.equal(weight, 4, 'correct weight');
  t.end();
};

tests.poi_address = function(t) {
  var record = { _meta: { type: 'osmway' }, id: 'something-poi-address-foo' };
  var weight = weightGenerator( record );
  t.equal(weight, 8, 'correct weight');
  t.end();
};

// some pipelines may return numeric ids
tests.numeric_id = function(t) {
  var record = { _meta: { type: 'osmnode' }, id: 1 };
  var weight = weightGenerator( record );
  t.equal(weight, 6, 'correct weight');
  t.end();
};

tests.locality = function(t) {
  var record = { _meta: { type: 'locality' } };
  var weight = weightGenerator( record );
  t.equal(weight, 12, 'correct weight');
  t.end();
};

module.exports = tests;
