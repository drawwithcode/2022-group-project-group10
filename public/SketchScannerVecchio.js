// https://kylemcdonald.github.io/cv-examples/

var capture;
var w = 100;
var h = 100;

function setup() {
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
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  createCanvas(w, h);
  capture.hide();
}

var trailPointsLength = 100;
var trailPoints = [];
function drawTrail(nextPoint) {
  trailPoints.push(nextPoint);
  if (trailPoints.length > trailPointsLength) {
    trailPoints.shift();
  }
  beginShape();
  trailPoints.forEach(function (point) {
    vertex(point.x, point.y);
  });
  endShape();
}

//var targetColor = [236, 85, 85];
var targetColors = [
  // { name: "green", r: 18, g: 238, b: 95, diff: 0, amount: 0 },
  // { name: "purple", r: 255, g: 171, b: 223, diff: 0, amount: 0 },
  // { name: "yellow", r: 76, g: 172, b: 236, diff: 0, amount: 0 },
  // { name: "red", r: 85, g: 85, b: 236, diff: 0, amount: 0 },

  { name: "r", r: 255, g: 0, b: 0, diff: 0, amount: 0 },
  { name: "g", r: 0, g: 255, b: 0, diff: 0, amount: 0 },
  { name: "b", r: 0, g: 0, b: 255, diff: 0, amount: 0 },
];

function draw() {
  capture.loadPixels();
  var sampling = false;

  if (capture.pixels.length > 0) {
    var w = capture.width,
      h = capture.height;
    var i = 0;
    var pixels = capture.pixels;
    var thresholdAmount = select("#thresholdAmount").value();
    thresholdAmount /= 100; // this is the slider range
    thresholdAmount *= 255 * 3; // this is the maximum value
    // var total = 0;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        targetColors.forEach((color) => {
          color.diff = Math.abs(pixels[i + 0] - color.r) + Math.abs(pixels[i + 1] - color.g) + Math.abs(pixels[i + 2] - color.b);
        });

        var smallestDiff = Math.min(targetColors[0].diff, targetColors[1].diff, targetColors[2].diff);

        targetColors.forEach((color) => {
          if (color.diff == smallestDiff) {
            if (color.diff < thresholdAmount) {
              color.amount++;
            }
          }
        });

        //var outputValue = 0;

        i = i + 4; // skip alpha
      }
    }

    // var n = w * h;
    // var ratio = total / n;
    // select("#percentWhite").elt.innerText = int(100 * ratio);
  }
  if (!sampling) {
    capture.updatePixels();
  }

  image(capture, 0, 0, w, h);

  let temp = 0;

  //console.log("color amount:");
  targetColors.forEach((color) => {
    if (color.amount > temp) {
      temp = color.amount;
    }
    //console.log(color.name + ":  " + color.amount);
  });

  targetColors.forEach((color) => {
    if (color.amount == temp) {
      if (color.amount > 7000) console.log(color.name + "  :  " + color.amount);
    }
    color.amount = 0;
  });
}
