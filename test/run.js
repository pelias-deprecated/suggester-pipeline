
var tape = require('tape');

var common = {};

var tests = [
  require('./interface.js'),
  require('./suggestable.js'),
  require('./suggester.js'),
  require('./lib/generators.js'),
  require('./lib/outputSchema.js'),
  require('./lib/weightGenerator.js')
];

tests.map(function(t) {
  t.all(tape, common);
});