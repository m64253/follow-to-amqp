var url = require('url'),
	follow = require('follow'),
	amqp = require('amqp'),

	defaultFormat = function (doc) {
		return {
			name: doc._id,
			body: JSON.stringify(doc),
			options: {
				contentType: 'application/json'
			}
		};
	};
	
	/** 
	 * @param {Object} cfgCouch For more info see: https://npmjs.org/package/amqp
	 * @param {Object} cfgAMQP For more info see: https://npmjs.org/package/follow
	 * @param {Function} [format]
	 */
	followToAMQP = function (cfgCouch, cfgAMQP, format) {
		var connection = amqp.createConnection(cfgAMQP);
		
		connection.on('ready', function () {
			connection.exchange(cfgAMQP.exchange, {
				type: 'topic'
			}, function (exchange) {
				var db = url.parse(cfgCouch.db).pathname.substr(1);
				
				cfgCouch.include_docs = true;
				
				follow(cfgCouch, function (err, change) {
					if (!err) {
						var doc = change.doc,
							msg = (format || defaultFormat)(doc);
						
						if (msg.body) {
							exchange.publish(msg.name, msg.body, msg.options);
						}
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