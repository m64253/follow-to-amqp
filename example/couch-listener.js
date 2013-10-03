var followToAMQP = require('./../index');


followToAMQP({
	host	: 'localhost',
	exchange: 'couch-changes'
}, {
	db: 'http://127.0.0.1:5984/test-db',
	filter: function (doc, req) {
		return doc.type || doc._deleted;
	}
});