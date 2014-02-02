follow-to-amqp
===========

Listens to a CouchDB database changes "feed" and then publish the changed documents to a AMQP exchange

Usage:
```javascript
var followToAMQP = require('follow-amqp');

followToAMQP(
	// CouchDB Configuration
	// For more info see: https://npmjs.org/package/follow
	{
		db: 'http://127.0.0.1:5984/test-db',
		filter: function (doc, req) {
			return doc.type || doc._deleted;
		}
	},
	// AMQP Configuration
	// For more info see: https://npmjs.org/package/amqp
	{
		host	: 'localhost',
		exchange: 'couch-changes'
	},
	// Formatter function, this is the default 
	function (doc) {
		return {
			name: doc._id,
			body: JSON.stringify(doc),
			options: {
				contentType: 'application/json'
			}
		};
	}
);
```
