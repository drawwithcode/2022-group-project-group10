let clientSocket = io();
let colorsArray = ["#e6e6e6", "#ffe500", "#00ff6a", "#ff0084", "#00aeff"];
let role;
let index;
let userColor;
let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let myMessage;
let messageRecieved = false;
let recievedMessage;

clientSocket.on("connect", newConnection);
clientSocket.on("updateUsers", updateUsers);
clientSocket.on("message-request", sendMessage);
clientSocket.on("broadcast-message", saveMessage);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  myMessage = messageInput.value;
  messageInput.value = "";
});

function newConnection() {}

function updateUsers(userArray) {
  index = userArray.indexOf(clientSocket.id);

  if (index == 0) {
    role = "server";
    window.location.href = "serverIndex.html";
    userColor = colorsArray[index];
  } else if (index <= 4) {
    role = "client n°" + index;
    userColor = colorsArray[index];
  } else {
    role = "waiter";
    userColor = colorsArray[0];
  }

  console.log(userArray);
}

function sendMessage() {
  if (typeof myMessage != "undefined" && myMessage != "")
    console.log("sto inviando:  " + myMessage);
  clientSocket.emit("send-chat-message", { index: index, message: myMessage });
}

function saveMessage(message) {
  if (message.index != index) {
    console.log("messaggio salvato:  " + message.message);
    recievedMessage = message.index + "  ha mandato:  " + message.message;
    messageRecieved = true;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(userColor);

  textSize(32);
  textAlign(CENTER);

  if (messageRecieved) text(recievedMessage, width / 2, height / 2);
  else text("I'm the " + role, width / 2, height / 2);
}
