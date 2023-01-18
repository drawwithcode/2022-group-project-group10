let serverinoSocket = io();
let messageForm = document.getElementById("collect-container");
let mic;

//oggetto utente che contiene ruolo, index, colore e messaggio che vuole mandare
//inizialmente vuoto, poi viene definito con updateUsers
const user = {
  role: "",
  index: "",
  c: "",
  freq: ""
}


serverinoSocket.on("updateUsers", updateUsers);
serverinoSocket.on("connect", newConnection);
serverinoSocket.on("broadcast-message", messageReady);


function updateUsers(userArray) {
  
  console.log(userArray)
  if (userArray[0] !== serverinoSocket.id) {window.location.href = "index.html";}

  user.index = userArray.indexOf(serverinoSocket.id);
  user.c = "#e6e6e6"
  user.role = "server"

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  console.log(mic)
}

function draw() {
  background(user.c);

  textSize(32);
  textAlign(CENTER);
  text("I'm the " + user.role, width / 2, height / 2);
}

let collectButtons = document.querySelectorAll(".collect");
let deliverButtons = document.querySelectorAll(".deliver");

collectButtons.forEach((collectButton, collectIndex) => {
  collectButton.addEventListener("click", collect);
  function collect() {
      serverinoSocket.emit("get-message", collectIndex + 1);
  }
});

deliverButtons.forEach((deliverButton,deliverIndex)=>{
  deliverButton.addEventListener('click',(button)=>{
    deliverButton.style.display = "none";
    serverinoSocket.emit("show-message", deliverIndex+1);
  })
});

function newConnection() {
  serverinoSocket.emit("enter-room");
}

function messageReady(message){

  deliverButtons.forEach((deliverButton, deliverIndex) => {
    if (deliverIndex != message.index-1) {
      deliverButton.style.display = "inline";
    }
  });
  
}
