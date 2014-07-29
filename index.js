
var bun = require('bun');

var suggester = {
  streams: {
    suggestable: require('./streams/suggestable'),
    suggester: require('./streams/suggester')
  }
}

suggester.pipeline = bun([
  suggester.streams.suggestable(),
  suggester.streams.suggester()
]);

module.exports = suggester;