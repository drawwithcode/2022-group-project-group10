let serverinoSocket = io();

let roleAnnouncement = document.querySelector(".role-announcement")
let messageForm = document.getElementById("collect-buttons");
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let chat = document.querySelector(".messages-container");
let doneButton =  document.querySelector("#done-button1");
let savedMessage = null;

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

doneButton.addEventListener("click", function(){
 
  savedMessage = null;
  collectContainer.style.display = "inline-block";
  doneButton.style.display = "none";

});


//oggetto utente che contiene ruolo, index, colore e messaggio che vuole mandare
//inizialmente vuoto, poi viene definito con updateUsers
const user = {
  role: "",
  index: "",
  c: "",
};

serverinoSocket.on("updateUsers", updateUsers);
serverinoSocket.on("connect", newConnection);
serverinoSocket.on("broadcast-message", messageReady);

function updateUsers(userArray) {
  console.log(userArray);
  if (userArray[0] !== serverinoSocket.id) {
    window.location.href = "index.html";
  }

  user.index = userArray.indexOf(serverinoSocket.id);
  user.c = "#0044ff";
  user.role = "server";
}

function newConnection() {
  serverinoSocket.emit("enter-room");
}

//NASCONDI ANNUNCIO RUOLO SE PREMO "OK"
let roleAcceptance = document.querySelector(".role-accepted")
roleAcceptance.addEventListener("click", function() {
  roleAnnouncement.style.display = "none";
})

//Nascondi Collect e btn container in CHAT
let chatBtn = document.querySelector("#chat")
chatBtn.addEventListener("click", function() {
  collectContainer.style.display = "none";
  document.querySelector("#done-button1").style.display = "none";
})
let collectBtn = document.querySelector("#collect")
collectBtn.addEventListener("click", function() {
  collectContainer.style.display = "block";
  document.querySelector("#done-button1").style.display = "block";
})




function messageReady(message) {
  deliverButtons.forEach((deliverButton, deliverIndex) => {
    if (deliverIndex != message.index - 1) {
      deliverButton.style.display = "inline";

    }
  });

  savedMessage = message.message;
  let div = p1.createDiv(savedMessage);
  div.parent(chat);
  let divClass = "client" + message.index;
  div.addClass("message");
  div.addClass(divClass);

  document.getElementById("receive").innerHTML = savedMessage;
  document.querySelector("#ascicanvas2").style.display = "block";

  
  collectContainer.style.display = "none";
  doneButton.style.display = "block";

}

let sketch = function (p) {};

let p1 = new p5(sketch);

p1.setup = function () {
  p1.createCanvas(windowWidth, windowHeight);
};

p1.draw = function () {
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

let pendingMessages = ["server", false, false, false, false];

let collectContainer = document.querySelector(".collect-container");
let cameraContainer = document.querySelector(".camera-container");

serverinoSocket.on("pending-message", function (index) {
  pendingMessages[index] = true;
});

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
    /* { name: "blue", hue: 224, saturation: 100, lightness: 50, total: 0 }, */
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
      colorFound = "HO TROVATO: " + color.name;
      if (pendingMessages[color.index] == true) {

        if(savedMessage == undefined){
          collectMessage(color.index);
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
}

function collectMessage(i) {
  console.log("ho preso un messaggio dal client n°" + i);

  serverinoSocket.emit("get-message", i);
  pendingMessages[i] = false;
}

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

  p2.textAlign(p2.LEFT);
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

// PER MANDARE E RICEVERE MESSAGGI

let deliverButtons = document.querySelectorAll(".deliver");

deliverButtons.forEach((deliverButton, deliverIndex) => {
  deliverButton.addEventListener("click", (button) => {
    deliverButton.style.display = "none";
    serverinoSocket.emit("show-message", deliverIndex + 1);
  });
});
