require('http').createServer(function(req, res) {

	if (req.url.slice(1, 7) == 'whoami') {
		var ip = req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;

		res.end(
			JSON.stringify(
				{
					ipaddress: ip,
					language: req.headers['accept-language'].split(',')[0],
					software: req.headers['user-agent'].match(/\((.*?)\)/)[1]
				}
			)
		);
	}
	else require('fs').readFile('public/header-parse.html', function(err, data) {
		if (err) throw err;
		res.end(data);
	});
	
}).listen(process.env.PORT);