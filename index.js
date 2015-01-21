var generators = require('./lib/generators');
var suggester = require('./lib/suggester');

var suggester = {
  streams: {
    suggester: suggester
  },
  generators: generators,
  pipeline: suggester( generators )
};

module.exports = suggester;
