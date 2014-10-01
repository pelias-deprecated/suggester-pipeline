
var weightGenerator = require('../../lib/weightGenerator');
module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof weightGenerator, 'function', 'valid function');
    t.equal(weightGenerator.length, 1, 'accepts x args');
    t.end();
  });
};

// unset type should yield default value
module.exports.tests.unset_type = function(test, common) {
  var record = {};
  test('unset type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 0, 'default weight');
    t.end();
  });
};

module.exports.tests.geoname = function(test, common) {
  var record = { _meta: { type: 'geoname' } };
  test('geoname type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 0, 'correct weight');
    t.end();
  });
};

module.exports.tests.admin2 = function(test, common) {
  var record = { _meta: { type: 'admin2' } };
  test('admin2 type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 2, 'correct weight');
    t.end();
  });
};

module.exports.tests.address = function(test, common) {
  var record = { _meta: { type: 'osmnode' }, id: 'something-address-foo' };
  test('address type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 4, 'correct weight');
    t.end();
  });
};

module.exports.tests.poi_address = function(test, common) {
  var record = { _meta: { type: 'osmway' }, id: 'something-poi-address-foo' };
  test('poi_address type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 8, 'correct weight');
    t.end();
  });
};

module.exports.tests.locality = function(test, common) {
  var record = { _meta: { type: 'locality' } };
  test('locality type', function(t) {
    var weight = weightGenerator( record );
    t.equal(weight, 12, 'correct weight');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('weightGenerator: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};