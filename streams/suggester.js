var through = require('through2');

function suggester( generators ){
  var stream = through.obj( function( record, enc, next ) {
    /**
     * Older parts of the pipeline might still generate objects without `_meta`
     * properties; throw an exception to identify them.
     */
    if( typeof record._meta !== 'object' ){
      throw {
        name: 'InvalidObject',
        exception: 'Object has no `_meta` property.'
      };
    }

    /**
     * Older parts of the pipeline might not generate `name.default`
     * properties, or assign them values of now invalid types.
     */
    if( typeof record.name.default !== 'string' ){
      throw {
        name: 'InvalidObject',
        exception: 'Object\'s `name.default` is not a string.'
      };
    }

    // build suggest input/payload/output
    record.suggest = {
      input: generators.input( record ),
      output: generators.output( record )
    };

    var weight = generators.weight( record );
    if( weight ){
      record.suggest.weight = weight;
    }

    this.push( record, enc );
    next();

  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  return stream;
}

module.exports = suggester;
