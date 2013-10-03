var url = require('url'),
	follow = require('follow'),
	amqp = require('amqp'),
	
	
	/** 
	 * @param {Object} cfgAMQP
	 * @param {Object} cfgCouch
	 */
	followToAMQP = function (cfgAMQP, cfgCouch) {
		var connection = amqp.createConnection(cfgAMQP);
		
		connection.on('ready', function () {
			connection.exchange(cfgAMQP.exchange, {
				type: 'topic'
			}, function (exchange) {
				var db = url.parse(cfgCouch.db).pathname.substr(1);
				
				cfgCouch.include_docs = true;
				
				follow(cfgCouch, function (err, change) {
					if (!err) {
						var doc = change.doc;
						exchange.publish(db + '.' + doc._id, JSON.stringify(doc), {
							contentType: 'application/json'
						});
					}
				});
			});
		});
	};


/**
 * Module exports
 * @type {Function}
 */
module.exports = followToAMQP;