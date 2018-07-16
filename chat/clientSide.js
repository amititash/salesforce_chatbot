var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var form = document.getElementById('form');
var textInput = document.getElementById('text-input');
var messages = document.getElementById('messages');

http.listen(3000, function(){
  console.log('Server is ready and listening on 3000');
});

form.onsubmit = function(event) {
  event.preventDefault();
  if (!textInput.value) {
    return;
  }
  messages.insertAdjacentHTML('beforeend',
    `<li class="user-message" style="background: #FFF;
        width: 50%;
        border-radius:10px;
        float:right;
        margin:5px;
        padding: 1%;"><img src="../img/user.png" style="width:30px; height:30px; margin-right:10px;"/>${textInput.value}</li>`);
  const update = {
    message: {
      text: textInput.value
    }
  };
  socket.emit('response',update);
  messages.scrollTo(0, document.body.scrollHeight);
  textInput.value = '';
};

io.on('connection', function(socket) {
    
  socket.on('response', function(data) {

      console.log('Got a new message from client', data);

      setTimeout(function(){
        messages.insertAdjacentHTML('beforeend',
          `<li class="botmaster-message" style="background: #FFF;
          width: 50%;
          border-radius:10px;
          margin: 0.5%;
          float:left;
          padding: 1%;"><img src="../img/bot.png" style="width:30px; height:30px; margin-right:10px;"/>${data.message.text}</li>`);
        });
      }, 2000);
});