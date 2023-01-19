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

let openAboutBtn = document.querySelector(".openabout")
let closeAboutBtn = document.querySelector(".closeabout")
let aboutSection = document.querySelector(".about-container")

function openAbout() {
    aboutSection.style.display = "block";
    openAboutBtn.style.display = "none";
}

function closeAbout() {
    aboutSection.style.display = "none";
    openAboutBtn.style.display = "block";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  let ButtonSx = document.getElementsByClassName("prev");
  let ButtonDx = document.getElementsByClassName("next");
  let slides = document.getElementsByClassName("mySlides");
  let join = document.getElementsByClassName("enter-room-button");

  if (n < 1) {
    slideIndex = 1;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  console.log(slideIndex);
  slides[slideIndex - 1].style.display = "block";

  if (n == 1) {
    ButtonSx[0].style.display = "none";
    openAboutBtn.style.display = "block"
  } else if (n > 1) {
    ButtonSx[0].style.display = "block";
    openAboutBtn.style.display = "none"
  }
  if (n == 5) {
    ButtonDx[0].style.display = "none";
    join[0].style.display = "block";
  } else if (n < 5) {
    ButtonDx[0].style.display = "block";
    join[0].style.display = "none";
  }
}
