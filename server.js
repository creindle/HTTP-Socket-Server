var net = require('net');

var CONFIG = require('./config');

var server = net.createServer(function (socket) {
  socket.end('goodbye\n');

  socket.on('data', function(data) {
    console.log("Data" + data);
  });

  socket.on('readable', function(data) {
    console.log("There is data" + data);
  });

  process.stdin.on('data', function(data) {
    socket.write("stuff" + data);
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});

server.on('error', function (err) {
  console.log(err);
});

