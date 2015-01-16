var suggester = require('../');

module.exports.interface = {};

module.exports.interface.streams = function(test, common) {
  test('streams', function(t) {
    t.equal(typeof suggester.streams, 'object', 'valid object');
    t.end();
  });
  test('streams.suggester', function(t) {
    t.equal(typeof suggester.streams.suggester, 'function', 'valid function');
    t.end();
  });
}

module.exports.interface.pipeline = function(test, common) {
  test('pipeline', function(t) {
    t.equal(typeof suggester.pipeline, 'object', 'valid stream');
    t.equal(typeof suggester.pipeline._read, 'function', 'valid readable');
    t.equal(typeof suggester.pipeline._write, 'function', 'valid writeable');
    t.end();
  });
}

module.exports.interface.generators = function(test, common) {
  test('generators', function(t) {
    t.equal(typeof suggester.generators, 'object', 'valid object');
    t.equal(typeof suggester.generators.input, 'function', 'input generator');
    t.equal(typeof suggester.generators.output, 'function', 'output generator');
    t.end();
  });
}

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('external interface: ' + name, testFunction)
  }

  for( var testCase in module.exports.interface ){
    module.exports.interface[testCase](test, common);
  }
}
