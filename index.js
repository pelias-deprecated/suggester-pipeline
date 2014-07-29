
var bun = require('bun'),
    generators = require('./lib/generators');

var suggester = {
  streams: {
    suggestable: require('./streams/suggestable'),
    suggester: require('./streams/suggester')
  },
  generators: generators
}

suggester.pipeline = bun([
  suggester.streams.suggestable(),
  suggester.streams.suggester( generators )
]);

module.exports = suggester;