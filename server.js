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
  //socket.end('goodbye\n');

  socket.on('data', function(data) {
    dataInput = data.toString();
    console.log(dataInput);

    var splitData = dataInput.split('\n');
    console.log(splitData);

    console.log(splitData[0]);

    if(splitData[0].includes('GET')) {
      var removeGet = dataInput.indexOf('/');
      console.log(removeGet);
      var methodLength = dataInput.indexOf('\n');
      var method = dataInput.slice(6, methodLength);

      console.log(method);
      response += method + "\n";

      for (var i = 0; i < splitData.length; i++){
        if(splitData[i].includes('Host')){
          console.log("*This string includes Host");
        }
        if(splitData[i].includes('Date')){
          console.log('*Date: ' + HTMLtime.toUTCString());
          response += "*Date: " + HTMLtime.toUTCString() + "\n";
        }
        if(splitData[i].includes('Connection: keep-alive')){
          console.log("*Connection: keep-alive");
          response += "*Connection: keep-alive\n";
        }
      }

      if(splitData[0].includes('helium.html')){
        console.log("*" + heliumHTMLString);
        response += "\n" + heliumHTMLString;
      }

      else if(splitData[0].includes('hydrogen.html')){
        console.log("*" + hydrogenHTMLString);
        response += "\n" + hydrogenHTMLString;
      }

      else if(splitData[0].includes('index.html')){
        console.log("*" + indexHTMLString);
        response += "\n" + indexHTMLString;
      }

    }
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

