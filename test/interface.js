
var suggester = require('../');

module.exports.interface = {};

module.exports.interface.streams = function(test, common) {
  test('streams', function(t) {
    t.equal(typeof suggester.streams, 'object', 'valid object');
    t.end();
  });
  test('streams.suggestable', function(t) {
    t.equal(typeof suggester.streams.suggestable, 'function', 'valid function');
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

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('external interface: ' + name, testFunction)
  }

  for( var testCase in module.exports.interface ){
    module.exports.interface[testCase](test, common);
  }
}