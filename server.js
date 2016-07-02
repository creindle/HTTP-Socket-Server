var net = require('net');

var CONFIG = require('./config');

var dataInput = "";

var fs = require('fs');

var heliumHTMLString;

var heliumHTML = fs.readFile('./public/helium.html', function(err, data) {
  heliumHTMLString = data.toString();
  console.log(heliumHTMLString + "File Opened" + data);
});

var server = net.createServer(function (socket) {
  socket.end('goodbye\n');

  socket.on('data', function(data) {
    dataInput = data.toString();
    console.log(dataInput);
    if(dataInput.includes('blue')){
      console.log("blue");
    }
    if(dataInput.includes('HOST')){
      console.log("This string includes HOST");
    }
  });

  // socket.on('readable', function(data) {
  //   console.log("There is data" + data);
  // });

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

