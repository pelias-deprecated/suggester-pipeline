var suggester = require('../');

tests = {};

tests.streams = function(t) {
  t.equal(typeof suggester.streams, 'object', 'valid object');
  t.end();
};

tests.suggester = function(t) {
  t.equal(typeof suggester.streams.suggester, 'function', 'valid function');
  t.end();
};


tests.pipeline = function (t) {
  t.equal(typeof suggester.pipeline, 'object', 'valid stream');
  t.equal(typeof suggester.pipeline._read, 'function', 'valid readable');
  t.equal(typeof suggester.pipeline._write, 'function', 'valid writeable');
  t.end();
};

tests.generators = function(t) {
  t.equal(typeof suggester.generators, 'object', 'valid object');
  t.equal(typeof suggester.generators.input, 'function', 'input generator');
  t.equal(typeof suggester.generators.output, 'function', 'output generator');
  t.end();
};

module.exports = tests;
