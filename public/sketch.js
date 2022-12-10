let clientSocket = io();
clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", drawCircle);

let randomR;
let randomG;
let randomB;


function newConnection() {
  console.log(clientSocket)
}

function drawCircle(dataReceived){
  fill(dataReceived.r, dataReceived.g, dataReceived.b)
  ellipse(dataReceived.x, dataReceived.y, 30)
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  background("white")

  randomR = random(255)
  randomG = random(255)
  randomB = random(255) 
}

function mouseMoved() {
  let message = {
    x : mouseX,
    y : mouseY,
    r: randomR,
    g: randomG,
    b: randomB
  }

  clientSocket.emit("mouse", message);
}

function draw() {
 
  fill(randomR, randomG, randomB)
  ellipse(mouseX, mouseY, 30)

}


