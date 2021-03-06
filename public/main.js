const socketio = io();
const form = document.getElementById("form");
const input = document.getElementById("msg");
const chats = document.getElementById("chats");

const nameForm = document.getElementById("nameForm");
const userName = document.getElementById("userName");

let username='';
nameForm.addEventListener('submit', function(event){
  if(userName.value!==''){
    username = userName.value;
    nameForm.style.display ="none";
    form.style.display ="flex";

    socketio.emit('signin');

    const msg = {msg: 'Welcome to our room!!　' + username + '、このroomではみんなで大喜利大会をするよ！メンバーが揃ったら出題者と回答者を決めてスタートだ！', name: 'Hello World'};
    socketio.emit('message', msg);
  }

  event.preventDefault();
})


form.addEventListener('submit', function(event){
  if(input.value!==''){
    const msg = {msg: input.value, name: username};
    socketio.emit('message', msg);
    input.value='';
  }
  event.preventDefault();
})

socketio.on('message',function(msg){
  displayMessage(msg);
});

// 参加時に過去のメッセージを受け取る
socketio.on('signin',function(msgs){
  for(let i=0;i<msgs.length;i++){
    const msg = msgs[i];
    displayMessage(msg);
  }
});

function displayMessage(msg){
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.append(msg.name);
  chats.append(dt);
  dd.append(msg.msg);
  chats.append(dd);
}

const button = document.querySelector('button');

button.onclick = function() {
  let name = prompt('あなたの名前は何ですか？');
  alert('こんにちは、' + name + '先生。もともと興味のあったプログラミングについて学ぶことが出来、こうしてメッセージをサイト上に作ることができるようになりました。私自身大変感動しております。これからもっとプログラミングについて学び、たくさんのことができるようになりたいと思いました。大変お世話になりました。ありがとうございました。原田麗二');
}