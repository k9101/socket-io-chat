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

    users.splice(users.indexOf(socket.username), 1);
    connections.splice(connections.indexOf(socket), 1);
    updateUsernames();

    console.log("Disconnected: %s sockets connected", connections.length);
  });

  //Send Message
  socket.on("send message", function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  //New USer
  socket.on("new user", function(data, callback){

    socket.username = data;
    users.push(data);
    callback(true);
    updateUsernames();
  });
});

function updateUsernames(){
  io.sockets.emit('get users', users);
}
