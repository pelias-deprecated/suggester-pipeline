# suggester-pipeline
[![Build Status](https://travis-ci.org/pelias/suggester-pipeline.svg?branch=master)](https://travis-ci.org/pelias/suggester-pipeline)

[![NPM](https://nodei.co/npm/pelias-suggester-pipeline.png)](https://nodei.co/npm/pelias-suggester-pipeline/)

Exports a Transform stream that builds the suggester payload (data used in `/suggest` queries by the Pelias API) in
received objects. Data being sent to the Pelias elasticsearch index *must* be `pipe`'d through the this stream or it
won't turn up in suggest results. All inbound records must contain the following properties:

```
{
	name: {
		default: ...
	},
	_meta: {
		type: ...,
		id: ...
	}
}
```

And will receive a `suggest` property mapped to an object. If you're using
[pelias-model](https://github.com/pelias/model), everything will work right out of the box.

## example usage
```javascript
var peliasSuggesterPipeline = require( 'pelias-suggester-pipeline' );

someDocumentStream
	.pipe( peliasSuggesterPipeline.pipeline )
	.pipe( /* rest of pelias pipeline */ );
```
