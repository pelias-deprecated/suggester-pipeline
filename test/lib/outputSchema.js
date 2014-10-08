
var schemas = require('../../lib/outputSchema');
module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof schemas, 'object', 'valid object');
    t.end();
  });
};

module.exports.tests.default = function(test, common) {
  var default_schema = {
    local: ['local_admin', 'locality', 'neighborhood', 'admin2'],
    regional: ['admin1_abbr', 'admin1', 'admin0']
  };
  test('schema', function(t) {
    var schema = schemas.default;
    t.deepEqual(schema, default_schema, 'default');
    t.end();
  });
};

module.exports.tests.admin0 = function(test, common) {
  var isValid = function(keys) {
    test('valid object', function(t) {
      t.equal(typeof schemas[keys], 'object',  keys);
      t.end();
    });
  }
  var isNotEmpty = function(keys) {
    test('not an empty object', function(t) {
      t.notEqual(Object.getOwnPropertyNames(schemas[keys]).length, 0,  keys);
      t.end();
    });
  }
  for (keys in schemas) { 
    isValid(keys);
    isNotEmpty(keys); 
  }
};

module.exports.tests.levels = function(test, common) {
  var check = function(keys, levels) {
    test('valid array', function(t) {
      t.equal(Object.prototype.toString.call(schemas[keys][levels]), '[object Array]', levels + ' (' + keys + ')');
      t.end();
    });
  }
  for (keys in schemas) { 
    for (levels in schemas[keys]) { 
      check(keys, levels);
    } 
  }
};

module.exports.tests.keys = function(test, common) {
  var valid_keys = ['local_admin', 'locality', 'neighborhood', 'admin2', 'admin1_abbr', 'admin1', 'admin0'];
  var check = function(i, keys, valid_keys) {
    test('valid keys', function(t) {
      var key = valid_keys.indexOf(i);
      var valid_key = key != -1 ? valid_keys[key] : undefined;
      t.equal(i, valid_key, i + ' (' + keys + ')');
      t.end();
    });
  }
  for (keys in schemas) { 
    for (levels in schemas[keys]) { 
      schemas[keys][levels].forEach(function(i){ 
        check(i, keys, valid_keys);
      }) 
    } 
  }
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('schemas: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};