let clientSocket = io();
let colorsArray;

let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let myMessage;
let recievedMessage;
let recievedMessageIndex;
let onScreenMessage;

//oggetto utente che contiene ruolo, index, colore e messaggio che vuole mandare
//inizialmente vuoto, poi viene definito con updateUsers
const user = {
  role: "",
  index: "",
  c: "",
  message: "",
}

let serverSection = document.querySelector(".server")
let clientSection = document.querySelector(".client")

clientSocket.on("connect", newConnection);
clientSocket.on("updateUsers", updateUsers);


clientSocket.on("message-request", sendMessage);
clientSocket.on("broadcast-message", saveMessage);
clientSocket.on("show-message",showMessage);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  user.message = messageInput.value;
  messageInput.value = "";
});


//avvisa il server di essere entrato, in modo che possa aggiornare lo userArray e rimandarlo indietro
function newConnection() {
  clientSocket.emit("enter-room")
}

//assegnazione ruolo client o server
function updateUsers(userArray) {
  
  user.index = userArray.indexOf(clientSocket.id);
  user.c = colorsArray[user.index]
  user.role = "client"
  
  onScreenMessage = "I'm the " + user.role;

}

function sendMessage() {
  if (typeof user.message != "undefined" && user.message != ""){
    console.log("sto inviando:  " + user.message);
    clientSocket.emit("send-chat-message", user);
  }
}

function saveMessage(user) {
  recievedMessage = user.message;
  recievedMessageIndex = user.index;
}

function showMessage(){
  onScreenMessage = "il client " + recievedMessageIndex + " ha mandato:  " +recievedMessage;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorsArray = [color('#e6e6e6'), color('#ffe500'), color('#00ff6a'), color('#ff0084'), color('#00aeff')];
}

function draw() {
  if(user.c) {background(user.c);}
  

  textSize(32);
  textAlign(CENTER);

  text(onScreenMessage, width / 2, height / 2);
}
