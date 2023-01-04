let serverinoSocket = io();
let index;
let messageForm = document.getElementById("collect-container");

serverinoSocket.on("connect", newConnection);
//clientSocket.on("updateUsers", updateUsers);

function newConnection() {
  console.log("fake server connesso");
}

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

collectButtons.forEach((element, index) => {
  element.addEventListener("click", collect);
  function collect() {
    //element.preventDefault();  non ricaricare la pagin
    console.log(index);

    serverinoSocket.emit("get-message", index + 1);
  }
});
