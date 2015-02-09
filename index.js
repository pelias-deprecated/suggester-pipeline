var generators = require('./lib/generators');
var suggester = require('./lib/suggester');
var weights   = require('./lib/weights');

var suggester = {
  streams: {
    suggester: suggester
  },
  generators: generators,
  pipeline: suggester( generators ),
  weights: weights
};

module.exports = suggester;
