

var socket = io.connect('http://localhost:3000');
var form = document.getElementById('form');
var textInput = document.getElementById('text-input');
var messages = document.getElementById('messages');

form.onsubmit = function(event) {
  event.preventDefault();
  if (!textInput.value) {
    return;
  }
  messages.insertAdjacentHTML('beforeend',
    `<li class="user-message" style="background: #FFF;
        width: 50%;
        border-radius:10px;
        margin:5px;
        padding: 1%;"><img src="../img/user.png" style="width:30px; height:30px; margin-right:10px;"/>${textInput.value}</li>`);
  const update = {
    message: {
      text: textInput.value
    }
  };
  socket.emit('user',update);
  messages.scrollTo(0,10000);
  textInput.value = '';
};

socket.on('message', function(botmasterMessage){
  var textMessage = botmasterMessage.message.text;

  console.log(JSON.stringify(textMessage));

  messages.insertAdjacentHTML('beforeend',
    `<li class="botmaster-message" style="background: #FFF;
    width: 50%;
    border-radius:10px;
    margin: 0.5%;
    padding: 1%;"><img src="../img/bot.png" style="width:30px; height:30px; margin-right:10px;"/>${textMessage}</li>`);
});