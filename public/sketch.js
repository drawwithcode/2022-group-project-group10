let clientSocket = io();
let colorsArray = ["#e6e6e6","#ffe500","#00ff6a","#ff0084","#00aeff"]
let role;
let index;
let userColor;

clientSocket.on("connect", newConnection);
clientSocket.on("updateUsers", updateUsers);



function newConnection() {
}

function updateUsers (userArray) {

  index = userArray.indexOf(clientSocket.id)
  
  if (index == 0) {role = "server"; userColor = colorsArray[index]}
  else if (index <=4) {role = "client n°" + index; userColor = colorsArray[index]}
  else {role = "waiter"; userColor = colorsArray[0];}

  console.log(userArray)

}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(userColor)

  textSize(32);
  textAlign(CENTER)
  text("I'm the " + role, width/2, height/2)

}
