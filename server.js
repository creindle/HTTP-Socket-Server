var net = require('net');

var CONFIG = require('./config');

var dataInput = "";

var fs = require('fs');

var response = "";

var heliumHTMLString;
var hydrogenHTMLString;
var indexHTMLString;
var HTMLtime = new Date();

var heliumHTML = fs.readFile('./public/helium.html', function(err, data) {
  heliumHTMLString = data.toString();
  console.log("\n\n" + heliumHTMLString + "File Opened" + data);
});

var hydrogenHTML = fs.readFile('./public/hydrogen.html', function(err, data) {
  hydrogenHTMLString = data.toString();
  console.log("\n\n" + hydrogenHTMLString + "File Opened" + data);
});

var indexHTML = fs.readFile('./public/index.html', function(err, data) {
  indexHTMLString = data.toString();
  console.log("\n\n" + indexHTMLString + "File Opened" + data);
});

var server = net.createServer(function (socket) {
  socket.end('goodbye\n');

  socket.on('data', function(data) {
    dataInput = data.toString();
    console.log(dataInput);

    if(dataInput.includes('GET')){
      var removeGet = dataInput.indexOf('/');
      console.log(removeGet);
      var methodLength = dataInput.indexOf('\n');
      var method = dataInput.slice(6, methodLength);

      console.log(method);
      response += method + "\n";
    }

    if(dataInput.includes('blue')){
      console.log("blue");
    }
    if(dataInput.includes('Host')){
      var serverLength = dataInput.indexOf(':');
      console.log(serverLength);
      //var server = dataInput.slice(server, );
      console.log("This string includes Host");
    }

    if(dataInput.includes('Date')){
      console.log('Date: ' + HTMLtime.toUTCString());
      response += "Date: " + HTMLtime.toUTCString();
    }
    if(dataInput.includes('Connection: keep-alive')){
      console.log("Connection: keep-alive");
      response += "Connection: keep-alive\n";
    }
  });

  // socket.on('readable', function(data) {
  //   console.log("There is data" + data);
  // });

  process.stdin.on('data', function(data) {
    console.log("Socket is able to write" + response);
    socket.write(response);
  });
});

server.listen(CONFIG.PORT, function() {
  var PORT = server.address().port;
  console.log('Opened server on %j', PORT);
});

server.on('error', function (err) {
  console.log(err);
});

