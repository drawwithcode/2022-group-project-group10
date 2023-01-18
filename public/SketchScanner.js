var capture;
var w = window.innerWidth;
var h = w;

let subW = Math.round(w / 15);
let subH = Math.round(w / 15);
let subX = Math.round(w / 2 - subW / 2);
let subY = Math.round(h / 2 - subH / 2);

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

function setup() {
  let collectCanva = createCanvas(windowWidth, windowHeight);
  collectCanva.parent(collectContainer);
  let d = pixelDensity();
  colorMode(HSL, 360, 100, 100);
  pixelDensity(1);

  targetColors = [
    { name: "green", hue: 137, saturation: 81, lightness: 65, total: 0 },
    { name: "purple", hue: 277, saturation: 100, lightness: 84, total: 0 },
    { name: "yellow", hue: 36, saturation: 81, lightness: 61, total: 0 },
    { name: "red", hue: 0, saturation: 80, lightness: 63, total: 0 },
  ];

  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: {
          exact: "user",
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
  frameRate(20);
}

function draw() {
  background("white");

  targetColors.forEach(function (color) {
    color.total = 0;
  }); //resets total

  image(capture, 0, 0);
  noFill();
  rect(subX - 1, subY - 1, subW + 2, subH + 2);

  avgHueArray = [];
  avgSatArray = [];
  avgLigArray = [];
  let colorFound = "nessun colore trovato";

  loadPixels();

  for (let x = subX; x < subX + subW; x++) {
    for (let y = subY; y < subY + subH; y++) {
      let loc = (x + y * capture.width) * 4;

      let r = pixels[loc + 0];
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];

      hue = 0;
      saturation = 0;
      lightness = 0;

      RGBToHSL(r, g, b);

      let pixelHue = hue;
      let pixelSat = saturation;
      let pixelLig = lightness;

      avgHueArray.push(pixelHue);
      avgSatArray.push(pixelSat);
      avgLigArray.push(pixelLig);

      //per trovare colori specifici
      targetColors.forEach(function (color) {
        let hueDiff = Math.abs(pixelHue - color.hue);
        let satDiff = Math.abs(pixelSat - color.saturation);
        let briDiff = Math.abs(pixelLig - color.lightness);

        if (hueDiff < 30 && satDiff < 25 && briDiff < 25) {
          color.total++;
        }
      });
    }
  }

  //per tracking sotto di h s b
  findAverageColor();

  targetColors.forEach(function (color) {
    let ratio = (100 * color.total) / (subW * subH);
    if (ratio >= 70) {
      colorFound = "HO TROVATO: " + color.name;
    }
  });

  textAlign(CENTER);
  textSize(32);
  fill("white");
  text(colorFound, width / 2, 50);
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

  textAlign(LEFT);
  textSize(16);

  fill("black");
  text("hue", 10, w + 30);
  text("saturation", 10, w + 130);
  text("brightness", 10, w + 230);

  colorMode(HSL, 360, 100, 100);
  fill(avgHue, avgSat, avgLig);
  rect(10, w + 50, map(avgHue, 0, 360, 0, width - 50), 30);
  rect(10, w + 150, map(avgSat, 0, 100, 0, width - 50), 30);
  rect(10, w + 250, map(avgLig, 0, 100, 0, width - 50), 30);
  rect(subX - 1, subY - 1, subW + 2, subH + 2);

  fill("black");
  text(round(avgHue), map(avgHue, 0, 360, 0, width - 50) + 20, w + 50 + 15);
  text(round(avgSat), map(avgSat, 0, 100, 0, width - 50) + 20, w + 150 + 15);
  text(round(avgLig), map(avgLig, 0, 100, 0, width - 50) + 20, w + 250 + 15);
}
