var generators = require('../../lib/generators');

tests = {};

tests.interface = function(t) {
  t.equal(typeof generators, 'object', 'valid object');
  t.equal(typeof generators.input, 'function', 'valid function');
  t.equal(typeof generators.output, 'function', 'valid function');
  t.equal(typeof generators.weight, 'function', 'valid function');
  t.end();
};

module.exports = tests;
