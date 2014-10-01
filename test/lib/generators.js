
var generators = require('../../lib/generators');
module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generators, 'object', 'valid object');
    t.equal(typeof generators.input, 'function', 'valid function');
    t.equal(typeof generators.output, 'function', 'valid function');
    t.equal(typeof generators.payload, 'function', 'valid function');
    t.equal(typeof generators.weight, 'function', 'valid function');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('generators: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};