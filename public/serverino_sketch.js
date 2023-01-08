let serverinoSocket = io();
let messageForm = document.getElementById("collect-container");

serverinoSocket.on("connect", newConnection);
serverinoSocket.on("broadcast-message", messageReady);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#e6e6e6");

  textSize(32);
  textAlign(CENTER);
  text("I'm the server", width / 2, height / 2);
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
    serverinoSocket.emit("show-message",deliverIndex+1);
  })
});

function newConnection() {
  serverinoSocket.emit("enter-room")
}

function messageReady(message){

  deliverButtons.forEach((deliverButton, deliverIndex) => {
    if (deliverIndex != message.index-1) {
      deliverButton.style.display = "inline";
    }
  });
  
}
