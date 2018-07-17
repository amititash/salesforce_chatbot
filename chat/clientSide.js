var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var form = document.getElementById('form');
var textInput = document.getElementById('text-input');
var messages = document.getElementById('messages');

http.listen(3000, function(){
  console.log('Server is ready and listening on 3000');
  setTimeout(()=>{
    messages.insertAdjacentHTML('beforeend',
          `<li style="background: #FFF;
          width: 50%;
          border-radius:10px;
          margin: 0.5%;
          float:left;
          padding: 1%;"><img src="../img/bot.png" style="width:30px; height:30px; margin-right:10px;"/>Hello I'm Chatbot</li>`);
  }, 1000);
});

form.onsubmit = function(event) {
  event.preventDefault();
  if (!textInput.value) {
    return;
  }
  messages.insertAdjacentHTML('beforeend',
    `<li style="background: #FFF;
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
  setTimeout(()=>{
    socket.emit('response',update);
  },1000);
  
  messages.scrollTop = messages.scrollHeight;
  textInput.value = '';
};

io.on('connection', function(socket) {
  socket.on('response', function(data) {
    
      console.log('Got a new message from client', data.message.text);

        messages.insertAdjacentHTML('beforeend',
          `<li style="background: #FFF;
          width: 50%;
          border-radius:10px;
          margin: 5px;
          float:left;
          padding: 1%;"><img src="../img/bot.png" style="width:30px; height:30px; margin-right:10px;"/>${serverResponse()}</li>`);
        });
});

function serverResponse() {
  
  var reply =[
    { txt:'Hi' },
    { txt:'How are you?' },
    { txt:'I am fine, thank you!' },
    { txt:'I like to listen music.' },
    { txt:'What do you like to do in free time?' },
    { txt:'I like to hangout with my friends.' },
    { txt:'Bye have a great day!!!' },
  ]

  var objKeys = Object.keys(reply);
  var randomKey = objKeys[Math.floor(Math.random() *objKeys.length)];
  responseText = reply[randomKey];

  return responseText.txt;
}