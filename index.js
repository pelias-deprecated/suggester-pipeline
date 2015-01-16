var generators = require('./lib/generators');

/*
 * The schema of the exported object, thought it's now a little cumbersome, is
 * preserved for backwards compatibility.
 */
var suggester = {
  streams: { suggester: require('./lib/suggester') },
  generators: generators
};
suggester.pipeline = suggester.streams.suggester( generators );

module.exports = suggester;
