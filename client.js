var net = require('net');

var CONFIG = require('./config');

var headerRequestLine = "";

var headers = "";

var getMethod = 'GET';

var HTTPVersion = ' / HTTP/1.1\n';

var URL = process.argv[2];

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT, host: URL }, function() {

  headers += getMethod + HTTPVersion;
  headers += 'Host: ' + URL + '\n';
  headers += 'Connection: keep-alive\n\n';
  headers += 'Date\n';

  client.write(headers);
  //client.end();
});

client.on('data', function(data) {
  console.log(data.toString());
});