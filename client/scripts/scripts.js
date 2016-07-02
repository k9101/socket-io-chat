$(document).ready(function(){
  var socket = io.connect();

  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $userForm = $('#createUserNameForm');
  var $username = $('#username');
  
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

    socket.emit('new user', )

    $('body').removeClass('makeUserName');
  });

  socket.on('new message', function(data){
    $chat.append("<div class='card'>" +
                    "<div class='card-content'>" +
                      "<span class='card-title'>New Message</span>" +
                        "<p>" + data.msg + "</p>" +
                  "</div>");
  });
});
