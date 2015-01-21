/**
 * Exports the constructor for the suggester stream.
 */

var through = require('through2');

/**
 * Check an inbound record for the existence/type of specific proprties, and
 * throw an exception if conditions are not satisfied. Used to identify older
 * parts of the pipeline that don't use pelias-model and general incorrect
 * objects. Meant to be used inside `suggester()`.
 *
 * @param {object} record An object written to the `suggester()` stream.
 */
function checkProperties( record ){
  if( !( 'type' in record._meta && 'id' in record._meta ) ){
    throw {
      name: 'InvalidRecordMeta',
      message: 'Either `._meta.id` or `._meta.type` is undefined.'
    };
  }

  if( typeof record.name.default !== 'string' ){
    throw {
      name: 'InvalidRecordName',
      exception: 'Object\'s `name.default` is not a string.'
    };
  }
}

/**
 * @param {object} generators An object containing the functions used to
 *    generate values inside inbound records' `suggest` objects.
 * @return {stream.Transform} A stream that will create a `suggest` property on
 *    all inbound records, and assign it an object filled with values using the
 *    functions inside `generators`. Used to enhance suggestion in
 *    elasticsearch.
 */
function suggester( generators ){
  var stream = through.obj( function( record, enc, next ) {
    checkProperties( record );

    record.suggest = {
      input: generators.input( record ),
      output: generators.output( record )
    };

    var weight = generators.weight( record );
    if( weight ){
      record.suggest.weight = weight;
    }

    this.push( record );
    next();
  });

  // catch stream errors
  stream.on( 'error', console.error.bind( console, __filename ) );

  return stream;
}

module.exports = suggester;
