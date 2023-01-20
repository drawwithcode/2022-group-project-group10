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
let messageSent = [undefined, undefined, undefined, undefined];
let globalChat;

function newConnection(newSocket) {
  //global chat entra
  newSocket.on("chatConnected", function (chatId) {
    globalChat = chatId;
    io.emit("chat connected");
    console.log("nuova chat globale: " + chatId);
  });

  //controlla disponibilità di posti
  newSocket.on("checkAvailability", checkAvailability);

  //manda lista aggiornata a tutti appena entrano
  newSocket.on("requestUserUpdate", function () {
    io.emit("updateUsers", userArray);
    if (globalChat) {
      io.emit("chat connected");
    }
  });

  //manda disponibilità
  function checkAvailability() {
    for (i = 0; i < 5; i++) {
      if (userArray[i]) {
        console.log(i + " occupato");
      } else {
        console.log(i + " libero");
        io.to(newSocket.id).emit("placeAvailable", i);
        return;
      }
    }
  }

  //entra nella stanza e aggiorna array
  newSocket.on("enter-room", function () {
    for (let i = 0; true; i++) {
      if (typeof userArray[i] == "undefined") {
        userArray[i] = newSocket.id;
        console.log(userArray);
        io.emit("updateUsers", userArray);
        break;
      }
    }
  });

  //esce dalla stanza stanza e aggiorna array e chat
  newSocket.on("disconnect", function () {
    if (newSocket.id == globalChat) {
      console.log("chat disconnected");
      globalChat = undefined;
      io.emit("chat disconnected");
    }

    let index = userArray.indexOf(newSocket.id);
    if (index > -1) {
      delete userArray[index];
      if (userArray.length > 5) {
        userArray.pop();
      }
      console.log(userArray);
      io.emit("updateUsers", userArray);
    }
  });

  newSocket.on("pending-message", (user) => {
    io.emit("pending-message", user.index);
  });

  newSocket.on("send-chat-message", (user) => {
    console.log(user.message);
    newSocket.broadcast.emit("broadcast-message", user);
    index = userArray.indexOf(newSocket.id);
    messageSent[index - 1] = "sent";
  });

  newSocket.on("get-message", (index) => {
    if (typeof userArray[index] != "undefined") {
      io.to(userArray[index]).emit("message-request");
      console.log(index + "  è stato scansionato id:  " + userArray[index]);
    } else {
      console.log("il client " + index + " non è connesso");
    }
  });

  newSocket.on("show-message", (index) => {
    newSocket.to(userArray[index]).emit("show-message");
    messageSent[index - 1] = "sent";
    console.log(userArray);
    console.log(messageSent);

    let readyForChat = [false, false, false, false];

    for (i = 1; i < userArray.length; i++) {
      if (
        (userArray[i] && messageSent[i - 1] == "sent") ||
        userArray[i] == undefined
      ) {
        readyForChat[i - 1] = true;
      } else readyForChat[i - 1] = false;
    }

    console.log(readyForChat);

    let ready = readyForChat.every(function (e) {
      return e == true;
    });

    console.log(ready);

    if (ready == true) {
      newSocket.to(globalChat).emit("show-message");
    }
  });
}
