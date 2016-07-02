$(document).ready(function(){
  var socket = io.connect();

  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $userForm = $('#createUserNameForm');
  var $username = $('#username');
  var $users = $('#users');
  var username = "";

  $('#submitButton').click(function(){
    $userForm.submit();
  });

  $messageForm.submit(function(e){
    e.preventDefault();

    socket.emit('send message', $message.val());
    $message.val('');
  });

  $userForm.submit(function(e){
    e.preventDefault();

    socket.emit('new user', $username.val(), function(data){
      if(data) {
        $('body').removeClass('makeUserName');
        username = $username.val();
      }
    });
  });

  socket.on('new message', function(data){

    // If message if from user, put it on the left, else right
    var bubbleSide = data.user == username ? 'bubble-left' : 'bubble-right blue-grey lighten-1 white-text';

    $chat.append("<div class='card bubble " + bubbleSide + "'>" +
                    "<div class='card-content'>" +
                      "<span class='card-title'>" + data.user + "</span>" +
                        "<p>" + data.msg + "</p>" +
                  "</div>");
  });

  socket.on('get users', function(users){
    var html = "";
    var len = users.length;

    for (var i = 0; i < len; i++) {
      html += "<li>" + users[i] + "</li>";
    }

    $users.html(html);

  });
});
