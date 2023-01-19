let clientSocket = io();
let colorsArray;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let recievedMessage;
let recievedMessageIndex;
let pendingServerMessage = false;

let roleAnnouncement = document.querySelector(".role-announcement")
let messageForm = document.getElementById("send-container");
let messageInput = document.getElementById("message-input");
let sendButton = document.getElementById("send-button");
let chat = document.querySelector(".messages-container");

//Navigazione automatica che attiva e disattiva le sezioni
let navBtn = document.querySelectorAll(".navbtn");
let currentActiveBtn = document.querySelector(".navbtn.active");
let sections = document.querySelectorAll(".container");
let currentSection = document.querySelector(".container.active");

navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let id = btn.id;
    let sectionClass = String("." + id + "-container");
    let targetSection = document.querySelector(sectionClass);

    currentActiveBtn.classList.remove("active");
    btn.classList.add("active");
    currentActiveBtn = btn;

    currentSection.classList.remove("active");
    targetSection.classList.add("active");
    currentSection = targetSection;
  });
});

//oggetto utente che contiene ruolo, index, colore e messaggio che vuole mandare
//inizialmente vuoto, poi viene definito con updateUsers
const user = {
  role: "",
  index: "",
  c: "",
  message: "",
};

clientSocket.on("connect", newConnection);
clientSocket.on("updateUsers", updateUsers);

clientSocket.on("message-request", sendMessage);
clientSocket.on("broadcast-message", saveMessage);

sendButton.addEventListener("click", function () {
  user.message = messageInput.value;
  messageInput.value = "";
  console.log(user.message);
  clientSocket.emit("pending-message", user);
});

//avvisa il server di essere entrato, in modo che possa aggiornare lo userArray e rimandarlo indietro
function newConnection() {
  clientSocket.emit("enter-room");
}

//assegnazione ruolo client o server
function updateUsers(userArray) {
  console.log(userArray);

  user.index = userArray.indexOf(clientSocket.id);
  if (user.index == 0) {
    window.location.href = "serverino_index.html";
  } //se uno entra dalla pagina del client quando il posto è libero, diventa server
  if (user.index > 4) {
    window.location.href = "index.html";
  }
  //user.c = colorsArray[user.index];
  user.role = "client";
}

//NASCONDI ANNUNCIO RUOLO SE PREMO "OK"
let roleAcceptance = document.querySelector(".role-accepted")
roleAcceptance.addEventListener("click", function() {
  roleAnnouncement.style.display = "none";
})

function sendMessage() {
  if (typeof user.message != "undefined" && user.message != "") {
    console.log("sto inviando:  " + user.message);
    clientSocket.emit("send-chat-message", user);

    let div = p1.createDiv(user.message);
    div.parent(chat);
    let divClass = "client" + user.index;
    div.addClass("message");
    div.addClass(divClass);
  }
}

function saveMessage(user) {
  recievedMessage = user.message;
  recievedMessageIndex = user.index;
  pendingServerMessage = true;
}

function showMessage() {
  console.log("mostra messaggio");
  let div = p1.createDiv(recievedMessage);
  div.parent(chat);
  let divClass = "client" + recievedMessageIndex;
  div.addClass("box");
  div.addClass(divClass);
  pendingServerMessage = false;

  sections[1].classList.remove("active")
  sections[2].classList.add("active")
  navBtn[1].classList.remove("active")
  navBtn[2].classList.add("active")
  
}

let sketch = function (p) {};

let p1 = new p5(sketch);

p1.setup = function () {
  p1.createCanvas(windowWidth, windowHeight);
  colorsArray = [
    p1.color("#0044ff"), //blu server
    p1.color("#5FEE87"), //verde 1
    p1.color("#C738AF"), //viola 2
    p1.color("#F8F00D"), //giallo 3
    p1.color("#EC5555"), //rosso 4
  ];
};

p1.draw = function () {
  user.c = colorsArray[user.index];
  roleAnnouncement.style.backgroundColor = user.c
  if (user.c) {
    p1.background(user.c);
  }
};

//********************************************************  SCANNER COLORI ********************************************************  //

let p2 = new p5(sketch);

var capture;
var w = window.innerWidth;
var h = w;
let subW = Math.round(w / 5);
let subH = Math.round(w / 5);
let subX = Math.round(w / 2 - subW / 2);
let subY = Math.round(h / 1.5);

let ctotal = 0;
let threshold = 15;
let targetColors;
let targetPercent = 0.7;

let avgHueArray = [];
let avgSatArray = [];
let avgLigArray = [];

let hue;
let saturation;
let lightness;

let collectContainer = document.querySelector(".collect-container");
let cameraContainer = document.querySelector(".camera-container");

p2.setup = function () {
  let collectCanva = p2.createCanvas(windowWidth, windowWidth);
  collectCanva.parent(cameraContainer);
  let d = p2.pixelDensity();
  p2.colorMode(p2.HSL, 360, 100, 100);
  p2.pixelDensity(1);

  targetColors = [
    {
      name: "green",
      hue: 170,
      saturation: 75,
      lightness: 43,
      total: 0,
      index: 1,
    },
    {
      name: "purple",
      hue: 280,
      saturation: 80,
      lightness: 50,
      total: 0,
      index: 2,
    },
    {
      name: "yellow",
      hue: 85,
      saturation: 68,
      lightness: 55,
      total: 0,
      index: 3,
    },
    {
      name: "red",
      hue: 340,
      saturation: 75,
      lightness: 60,
      total: 0,
      index: 4,
    },
    { name: "blue", hue: 224, saturation: 100, lightness: 50, total: 0 },
  ];

  capture = p2.createCapture(
    {
      audio: false,
      video: {
        facingMode: {
          exact: "environment",
        },
        width: w,
        height: h,
      },
    },
    function () {
      console.log("capture ready");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  capture.hide();
  p2.frameRate(20);
};

p2.draw = function () {
  user.c = colorsArray[user.index];
  if (user.c) {
    p2.background(user.c);
  }

  targetColors.forEach(function (color) {
    color.total = 0;
  }); //resets total

  p2.image(capture, 0, 0, w, h);
  p2.noFill();
  p2.rectMode(p2.CENTER);

  avgHueArray = [];
  avgSatArray = [];
  avgLigArray = [];
  let colorFound = "nessun colore trovato";

  p2.loadPixels();

  for (let x = subX; x < subX + subW; x++) {
    for (let y = subY; y < subY + subH; y++) {
      let loc = (x + y * capture.width) * 4;

      let r = p2.pixels[loc + 0];
      let g = p2.pixels[loc + 1];
      let b = p2.pixels[loc + 2];

      hue = 0;
      saturation = 0;
      lightness = 0;

      RGBToHSL(r, g, b);

      avgHueArray.push(hue);
      avgSatArray.push(saturation);
      avgLigArray.push(lightness);

      //per trovare colori specifici

      targetColors.forEach(function (color) {
        let hueDiff = Math.abs(hue - color.hue);
        let satDiff = Math.abs(saturation - color.saturation);
        let briDiff = Math.abs(lightness - color.lightness);

        if (hue < 20 && satDiff < 25 && briDiff < 25) {
          targetColors[3].total++;
        } else if (hueDiff < 25 && satDiff < 30 && briDiff < 20) {
          color.total++;
        }
      });
    }
  }

  //per tracking sotto di h s b
  //findAverageColor();

  targetColors.forEach(function (color) {
    let ratio = (100 * color.total) / (subW * subH);
    if (ratio >= 70) {
      if (color.name == "blue") {
        colorFound = "HO TROVATO: " + color.name;
        console.log("colore trovato");
        if (pendingServerMessage == true) {
          showMessage();
        }
      }
    }
  });

  // p2.textAlign(p2.CENTER);
  // p2.textSize(32);
  // p2.fill("white");
  // p2.text(colorFound, p2.width / 2, 50);

  p2.noFill();
  p2.rect(w / 2, h / 2, (h * 0.9 * 9) / 18, h * 0.9, 20);
};

function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;

  // Calculate hue
  // No difference
  if (delta == 0) hue = 0;
  // Red is max
  else if (cmax == r) hue = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) hue = (b - r) / delta + 2;
  // Blue is max
  else hue = (r - g) / delta + 4;

  hue = Math.round(hue * 60);

  // Make negative hues positive behind 360°
  if (hue < 0) hue += 360;

  // Calculate lightness
  lightness = (cmax + cmin) / 2;

  // Calculate saturation
  saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  // Multiply l and s by 100
  saturation = +(saturation * 100).toFixed(1);
  lightness = +(lightness * 100).toFixed(1);
}

function findAverageColor() {
  let totalHue = 0;
  let totalSat = 0;
  let totalLig = 0;

  for (let i = 0; i < avgHueArray.length; i++) {
    totalHue += avgHueArray[i];
    totalSat += avgSatArray[i];
    totalLig += avgLigArray[i];
  }

  let avgHue = totalHue / avgHueArray.length;
  let avgSat = totalSat / avgSatArray.length;
  let avgLig = totalLig / avgLigArray.length;

  p2.textAlign(p2.LEFFT);
  p2.textSize(16);

  p2.fill("black");
  p2.text("hue", 10, w + 30);
  p2.text("saturation", 10, w + 130);
  p2.text("brightness", 10, w + 230);

  p2.colorMode(p2.HSL, 360, 100, 100);
  p2.fill(avgHue, avgSat, avgLig);
  p2.rect(10, w + 50, p2.map(avgHue, 0, 360, 0, p2.width - 50), 30);
  p2.rect(10, w + 150, p2.map(avgSat, 0, 100, 0, p2.width - 50), 30);
  p2.rect(10, w + 250, p2.map(avgLig, 0, 100, 0, p2.width - 50), 30);
  p2.rect(w / 2, h / 1.5, subW + 2, subH + 2);
  p2.noFill();
  p2.rect(w / 2, h / 2, (h * 0.9 * 9) / 18, h * 0.9, 20);

  p2.fill("black");
  p2.text(
    p2.round(avgHue),
    p2.map(avgHue, 0, 360, 0, p2.width - 50) + 20,
    w + 50 + 15
  );
  p2.text(
    p2.round(avgSat),
    p2.map(avgSat, 0, 100, 0, p2.width - 50) + 20,
    w + 150 + 15
  );
  p2.text(
    p2.round(avgLig),
    p2.map(avgLig, 0, 100, 0, p2.width - 50) + 20,
    w + 250 + 15
  );
}
