let introSocket = io();

let enterRoomButton = document.querySelector(".enter-room-button")

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