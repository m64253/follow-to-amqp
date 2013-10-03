var amqp = require('amqp'),
	connection = amqp.createConnection({
		host: 'localhost'
	});


connection.on('ready', function () {
	console.log("AMQP::ready");

	connection.exchange('couch-changes', {
		type: 'topic'
	}, function (exchange) {
		console.log("AMQP::exchange");
		
		connection.queue('test1', function (queue) {
			console.log("AMQP::queue");
			
			queue.on('queueBindOk', function () {
				console.log("AMQP::queueBindOk");
				
				queue.subscribe(function (doc, headers, deliveryInfo) {
					console.log('\n\nRECIEVED', deliveryInfo.routingKey, doc);
				});
			});
			queue.bind(exchange, '#');
		});
	});
});