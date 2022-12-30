let clientSocket = io();
let message;
let colorId = ["#fcba03", "#03fc62","#0318fc","#fc03f0", "#fc4a03"]
let nameId;
clientSocket.on("connect", newConnection);
clientSocket.on("messageBroadcast", printMessage);


function newConnection() {
  console.log(clientSocket)
}

function setup() {
  
  colorId = random(colorId);
  console.log(colorId)
  nameId = "Luca";
  createCanvas(windowWidth, windowHeight);
  background("white")
}

function draw() {
  
}

function printMessage(message) {
  textSize(16);
  fill(message.color);
  text(message.sender, 20, 60)
  textSize(32);
  fill("black");
  text(message.content, 20, 90);
}

function keyPressed() {
  if (keyCode === ENTER) {

    message = {
      content: "ciao a tutti",
      color: colorId,
      sender: nameId  
    }
    
    clientSocket.emit("sendmessage", message);
  }
}
