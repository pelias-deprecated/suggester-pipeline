// A stream which decides if a record is 'suggestable' or not.
// The 'suggestable' boolean flag is then set on 'record._meta.suggestable'.

var through = require('through2');

function suggestable(){

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

    this.push( record );
    next();
  });

  return stream;
}

module.exports = suggestable;
