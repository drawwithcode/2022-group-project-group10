let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);
app.use(express.static("public"));


console.log("running server on http://localhost:" + port);

let serverSocket = require("socket.io");
let io = serverSocket(server);

io.on("connection", newConnection);

let userArray = []

function newConnection(newSocket) {

    userArray.push(newSocket.id)
    
    newSocket.on("disconnect", function() {
        let index = userArray.indexOf(newSocket.id)
        if (index > -1) { 
            userArray.splice(index, 1); 
        }

        io.emit("updateUsers", userArray)

    })

   io.emit("updateUsers", userArray)

    
}