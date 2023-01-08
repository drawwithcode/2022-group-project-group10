let clientSocket = io();
let role;
let index;
let userColor = "white";
let colorsArray;
let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let myMessage;
let recievedMessage;
let recievedMessageIndex;
let onScreenMessage;

let serverSection = document.querySelector(".server")
let clientSection = document.querySelector(".client")

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
  clientSocket.emit("enter-room")
}

function updateUsers(userArray) {

  index = userArray.indexOf(clientSocket.id);
  userColor = colorsArray[index]

  if (index == 0) {
    role = "server";
    //window.location.href = "serverino_index.html";
    serverSection.classList.remove("inactive");
    clientSection.classList.add("inactive")

    userColor = colorsArray[index];
  } else if (index <= 4) {
    role = "client n°" + index;

    clientSection.classList.remove("inactive")
    serverSection.classList.add("inactive");
  } else {
    role = "waiter";
  }

  onScreenMessage = "I'm the " + role;


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
  colorsArray = [color('#e6e6e6'), color('#ffe500'), color('#00ff6a'), color('#ff0084'), color('#00aeff')];
}

function draw() {
  background(userColor);

  textSize(32);
  textAlign(CENTER);

  text(onScreenMessage, width / 2, height / 2);
}
