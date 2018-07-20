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
          `<div style="display:inline-block; width:60%;"><img src="../img/bot.png" style="width:40px; height:40px; float:left; margin-top:5px;"/><li class="bubble server" style="margin-left: 10px;">Hello I'm Chatbot</li></div>`);
  }, 1000);
});

form.onsubmit = function(event) {
  event.preventDefault();

  if (!textInput.value) {
    return alert("Can't send empty message");
  } else {
    console.log(textInput.value)
    messages.insertAdjacentHTML('beforeend',
      `<div><li class="bubble client">${textInput.value}</li></div>`);
    const update = {
      message: {
        text: textInput.value
      }
    };
    setTimeout(()=>{
      socket.emit('response',update);
    },1000);
    
    messages.scrollTo(0,document.body.scrollHeight);
    textInput.value = '';
  }
};

io.on('connection', function(socket) {
  socket.on('response', function(data) {
      console.log('Got a new message from client', data.message.text);
      messages.insertAdjacentHTML('beforeend',
        `<div style="display:inline-block; width:60%;"><img src="../img/bot.png" style="width:40px; height:40px; float:left; margin-top:5px;"/><li class="bubble server" style="margin-left: 10px;">${serverResponse()}</li></div>`);
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