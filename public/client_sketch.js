let clientSocket = io();
let colorsArray;
let frequencyArray = [100, 300, 500, 700, 900];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;jaifs

let recievedMessage;
let recievedMessageIndex;

let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let sendButton = document.getElementById("send-button");
let chat = document.querySelector(".messages-container");

//Navigazione automatica che attiva e disattiva le sezioni
let navBtn = document.querySelectorAll(".navbtn");
let currentActiveBtn = document.querySelector(".navbtn.active");
let sections = document.querySelectorAll(".container");
let currentSection = document.querySelector(".container.active");

navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let id = btn.id;
    let sectionClass = String("." + id + "-container");
    let targetSection = document.querySelector(sectionClass);

    currentActiveBtn.classList.remove("active");
    btn.classList.add("active");
    currentActiveBtn = btn;

    currentSection.classList.remove("active");
    targetSection.classList.add("active");
    currentSection = targetSection;
  });
});

//oggetto utente che contiene ruolo, index, colore e messaggio che vuole mandare
//inizialmente vuoto, poi viene definito con updateUsers
const user = {
  role: "",
  index: "",
  c: "",
  message: "",
};

clientSocket.on("connect", newConnection);
clientSocket.on("updateUsers", updateUsers);

clientSocket.on("message-request", sendMessage);
clientSocket.on("broadcast-message", saveMessage);
clientSocket.on("show-message", showMessage);

sendButton.addEventListener("click", function () {
  user.message = messageInput.value;
  messageInput.value = "";
  console.log(user.message);
});

//avvisa il server di essere entrato, in modo che possa aggiornare lo userArray e rimandarlo indietro
function newConnection() {
  clientSocket.emit("enter-room");
}

//assegnazione ruolo client o server
function updateUsers(userArray) {
  console.log(userArray);

  user.index = userArray.indexOf(clientSocket.id);
  if (user.index == 0) {
    window.location.href = "serverino_index.html";
  } //se uno entra dalla pagina del client quando il posto è libero, diventa server
  if (user.index > 4) {
    window.location.href = "index.html";
  }
  user.c = colorsArray[user.index];
  user.role = "client";
}

function sendMessage() {
  if (typeof user.message != "undefined" && user.message != "") {
    console.log("sto inviando:  " + user.message);
    clientSocket.emit("send-chat-message", user);

    let div = createDiv(user.message);
    div.parent(chat);
    let divClass = "client" + user.index;
    div.addClass("box");
    div.addClass(divClass);
  }
}

function saveMessage(user) {
  recievedMessage = user.message;
  recievedMessageIndex = user.index;
}

function showMessage() {
  let div = createDiv(recievedMessage);
  div.parent(chat);
  let divClass = "client" + recievedMessageIndex;
  div.addClass("box");
  div.addClass(divClass);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorsArray = [
    color("#e6e6e6"),
    color("#5fee87"),
    color("#dfabff"),
    color("#ecac4c"),
    color("#ec5555"),
  ];
}

function draw() {
  if (user.c) {
    background(user.c);
  }
}
