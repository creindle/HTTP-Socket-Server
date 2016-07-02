var net = require('net');

var CONFIG = require('./config');

var request = "";

var URL = process.argv[2];

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT, host: URL }, function() {

  request += 'GET / HTTP/1.1\n';
  request += 'HOST: ' + URL + '\n';
  request += 'Connection: Keep-Alive\n\n';

  client.write(request);
  //client.end();
});

client.on('data', function(data) {
  console.log(data.toString());
});