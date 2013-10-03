follow-to-amqp
===========

Listens to a CouchDB database changes "feed" and then publish the changed documents to a AMQP exchange

Usage:
```javascript
var followAMQP = require('follow-amqp');

followToAMQP({
	host	: 'localhost',
	exchange: 'couch-changes'
}, {
	db: 'http://127.0.0.1:5984/test-db',
	filter: function (doc, req) {
		return doc.type || doc._deleted;
	}
});
```
