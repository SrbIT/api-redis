// API to get content based on responses from Redis

var http = require("http"), server,
PORT = 6379,
 HOST = '127.0.0.1',
//HOST = '125.212.209.198',
redis_client = require("redis").createClient(PORT, HOST);

var moment = require('moment');




redis_client.on("error", function (err) {
	console.log("Error " + err);
});

server = http.createServer(function (request, response) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});

	var redis_host;
	var vMinuteFormatter = moment().subtract(1, 'minutes').format("YYYYMMDDHHmm")
//	var vMinuteFormatter=moment().format("YYYYMMDDHHmm")-1
//	var vMinuteFormatter=moment().format("YYYYMMDDHHmm")-2
	var vKeyHost =vMinuteFormatter+":host"
	// var vKeyHost ="ab"
	console.log(vKeyHost)

	redis_client.hgetall(vKeyHost,function (err, reply){

		console.log(reply);
		redis_host=JSON.stringify(reply);
		response.write("" + redis_host + "");
		response.end();

	});

}).listen(8090);
