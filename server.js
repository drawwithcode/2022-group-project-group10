let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);
app.use(express.static("public"));

console.log("running server on http://localhost:" + port);

let serverSocket = require("socket.io");
let io = serverSocket(server);

io.on("connection", newConnection);

function newConnection(newSocket) {
    console.log(newSocket.id);

    newSocket.on("sendmessage", messageRecieved);

    function messageRecieved(message) {
        console.log(message)

        newSocket.broadcast.emit("messageBroadcast", message)
    }

//     function mouseReceived(dataReceived){
//         console.log(dataReceived);
//         newSocket.broadcast.emit("mouseBroadcast", dataReceived)
//     }
}