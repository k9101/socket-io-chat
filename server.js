var express = require('express');

// Set up server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = []

server.listen(process.env.port || 3000);
console.log("Running Server");

app.use('/styles', express.static(__dirname + '/client/styles'));
app.use('/scripts', express.static(__dirname + '/client/scripts'));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/client/index.html");
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  //Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  //Send Message
  socket.on("send message", function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });
});
