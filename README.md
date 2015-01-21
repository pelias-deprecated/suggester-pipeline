# suggester-pipeline
Exports a Transform stream that builds the suggester payload (data used in `/suggest` queries by the Pelias API) in
received objects. Data being sent to the Pelias elasticsearch index *must* be `pipe`'d through the suggester-pipeline,
or it won't turn up in suggest results. All inbound records must contain the following properties:

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
