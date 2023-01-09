let chatSocket = io();

let recievedMessage;
let recievedMessageIndex;

let chatButton = document.querySelector(".access-chat")

chatSocket.on("connect", chatConnected)
chatSocket.on("broadcast-message", saveMessage);
chatSocket.on("show-message",showMessage);

function chatConnected() {
    chatSocket.emit("chatConnected", chatSocket.id)
}

function saveMessage(user) {
    recievedMessage = user.message;
    recievedMessageIndex = user.index;
}
  
function showMessage(){
    let div = createDiv(recievedMessage)
    div.parent(chat)
    let divClass = "client" + recievedMessageIndex
    div.addClass("box")
    div.addClass(divClass)
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}
  


