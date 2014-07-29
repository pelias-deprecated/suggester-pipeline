
var tape = require('tape');

var common = {};

var tests = [
  require('./interface.js'),
  require('./suggestable.js'),
  require('./suggester.js')
];

tests.map(function(t) {
  t.all(tape, common)
});