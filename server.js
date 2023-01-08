let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);

app.use(express.static("public"));

console.log("running server on http://localhost:" + port);

let serverSocket = require("socket.io");
let io = serverSocket(server);

io.on("connection", newConnection);

let userArray = [];

function newConnection(newSocket) {

  for (let i = 0; true; i++) {

    if (typeof userArray[i] == "undefined") {
      userArray[i] = newSocket;
      break;
    }
  }

  console.log(userArray);

  newSocket.on("disconnect", function () {
    let index = userArray.indexOf(newSocket);
    if (index > -1) {
      delete userArray[index];
    }
  });

  io.emit("updateUsers", userArray);

  newSocket.on("send-chat-message", (message) => {
    console.log(message);

    newSocket.broadcast.emit("broadcast-message", message);
  });

  newSocket.on("get-message", (index) => {
    if (typeof userArray[index] != "undefined") {
      io.to(userArray[index]).emit("message-request");
      console.log(index + "  è stato scansionato id:  " + userArray[index]);
    } else {
      console.log("il client " + index + " non è connesso");
    }
  });

  newSocket.on("show-message",(index)=>{
    newSocket.to(userArray[index]).emit("show-message");
  })
}
