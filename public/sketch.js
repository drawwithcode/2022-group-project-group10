let introSocket = io();

let enterRoomButton = document.querySelector(".enter-room-button")
let chatButton = document.querySelector(".access-chat")

introSocket.on("updateUsers", updateEnterButton)

function updateEnterButton (userArray) {
    console.log(userArray)

    let activeUsers = 0;
    for(i = 0;  i< userArray.length; i++) {
    if(userArray[i]) {console.log(activeUsers+1 + " attivo"); activeUsers++}
    }

    if(activeUsers <5) {enterRoomButton.classList.remove("disabled")}
    else {enterRoomButton.classList.add("disabled")} 
}   

enterRoomButton.addEventListener("click", checkAvailability)

function checkAvailability() {
    introSocket.emit("checkAvailability")
}

introSocket.on("placeAvailable", enterRoom)

function enterRoom(index) {
    if(index == 0) {window.location.href = "serverino_index.html";}
    else if (index > 0 && index <=4) {window.location.href = "client_index.html";}
}


introSocket.on("chat connected", chatConnected)
introSocket.on("chat disconnected", chatDisconnected)

function chatConnected() {
    chatButton.classList.add("inactive")
}

function chatDisconnected() {
    chatButton.classList.remove("inactive")
}

function setup() {
    introSocket.emit("requestUserUpdate")
}
