var net = require('net');

var CONFIG = require('./config');

var headerRequestLine = "";

var headers = "";

var getMethod = 'GET';

var HTTPVersion = 'HTTP/1.1';

var reqParts = process.argv[2].split('/');

var host = reqParts[0];

var resource = reqParts[1]?'/' + reqParts[1]:'/';

console.log(reqParts);
console.log(host);
console.log(resource);

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT, host: host }, function() {

  headers += getMethod + " /" + resource + " " + HTTPVersion + "\n";
  headers += 'Host: ' + host + '\n';
  headers += 'Date\n';
  headers += 'Connection: keep-alive\n';

  console.log(headers);
  client.write(headers);
  //client.end();
});

client.on('data', function(data) {
  console.log(data.toString());
});