var net = require('net');

var CONFIG = require('./config');

var dataInput = "";

var fs = require('fs');

var heliumHTMLString;
var hydrogenHTMLString;
var indexHTMLString;
var HTMLtime = new Date();

var heliumHTML = fs.readFile('./public/helium.html', function(err, data) {
  heliumHTMLString = data.toString();
});

var hydrogenHTML = fs.readFile('./public/hydrogen.html', function(err, data) {
  hydrogenHTMLString = data.toString();
});

var indexHTML = fs.readFile('./public/index.html', function(err, data) {
  indexHTMLString = data.toString();
});

var server = net.createServer(function (socket) {
  var response = "";

  socket.on('data', function(data) {
    dataInput = data.toString();
    console.log(dataInput);

    var splitData = dataInput.split('\n');

    var splitGet = splitData[0].split(' ');

    var method = splitGet[0];
    var resource = splitGet[1];
    var HTTPVersion = splitGet[2];

    if(method === 'GET') {

      for (var i = 0; i < splitData.length; i++){
        if(splitData[i].includes('Host')){
          console.log("*This string includes Host");
        }
        if(splitData[i].includes('Date')){
          response += "Date: " + HTMLtime.toUTCString() + "\n";
        }
        if(splitData[i].includes('Connection: keep-alive')){
          response += "Connection: keep-alive\n";
        }
      }

      if(resource.includes('helium.html')){
        response += "\n" + heliumHTMLString;
      }

      if(resource.includes('hydrogen.html')){
        response += "\n" + hydrogenHTMLString;
      }

      if(resource.includes('/index.html')){
        response += "\n" + indexHTMLString;
      }

      else{

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

//console.log("\n\n" + heliumHTMLString + "File Opened" + data);
//console.log("\n\n" + hydrogenHTMLString + "File Opened" + data);
//console.log("\n\n" + indexHTMLString + "File Opened" + data);
//console.log("* Line 39 *" + splitData);
//console.log("* Line 41 *" + splitData[0]);
//console.log("*Get has been split \n" + splitGet);
//console.log("This is a GET method");
//console.log('*Date: ' + HTMLtime.toUTCString());
//console.log("*Connection: keep-alive");
//console.log("*" + heliumHTMLString);
//console.log("*" + hydrogenHTMLString);
//console.log("*" + indexHTMLString);

//socket.end('goodbye\n');
