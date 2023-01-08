let clientSocket = io();
let colorsArray = ["#e6e6e6", "#ffe500", "#00ff6a", "#ff0084", "#00aeff"];
let role;
let index;
let userColor;
let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let myMessage;
let recievedMessage;
let recievedMessageIndex;
let onScreenMessage;

clientSocket.on("connect", newConnection);

clientSocket.on("updateUsers", updateUsers);
clientSocket.on("message-request", sendMessage);
clientSocket.on("broadcast-message", saveMessage);
clientSocket.on("show-message",showMessage);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  myMessage = messageInput.value;
  messageInput.value = "";
});

function newConnection() {
  console.log("sono connesso")
  clientSocket.emit("enterroom", clientSocket.id);
}

function updateUsers(userArray) {
  index = userArray.indexOf(clientSocket.id);

  if (index == 0) {
    role = "server";
    window.location.href = "serverino_index.html";
    userColor = colorsArray[index];
  } else if (index <= 4) {
    role = "client n°" + index;
    userColor = colorsArray[index];
  } else {
    role = "waiter";
    userColor = colorsArray[0];
  }

  onScreenMessage = "I'm the " + role;

  console.log(userArray);
}

function sendMessage() {
  if (typeof myMessage != "undefined" && myMessage != ""){
    console.log("sto inviando:  " + myMessage);
    clientSocket.emit("send-chat-message", { index: index, message: myMessage });
  }
}

function saveMessage(message) {
  recievedMessage = message.message;
  recievedMessageIndex = message.index;
}

function showMessage(){
  onScreenMessage = "il client " + recievedMessageIndex + " ha mandato:  " +recievedMessage;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("yellow");

  textSize(32);
  textAlign(CENTER);

  text(onScreenMessage, width / 2, height / 2);
}