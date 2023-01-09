
var verde= "#5fee87";
var rosa= "#dfabff";
var arancio= "#ecac4c";
var rosso= "#ec5555";
// https://kylemcdonald.github.io/cv-examples/

var capture;
var w = 640;
var h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    },
    function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    createCanvas(w, h);
    capture.hide();
}


// var targetRosso = [236, 85, 85];
// var targetVerde = [95, 238, 135];
// var targetRosa = [223, 171, 255];
// var targetArancio = [236, 172, 76];
var targetColor = [{r: 236, g: 85, b: 85 },{r: 95, g: 238, b: 135 },{r: 223, g: 171, b: 255 },{r: 236, g: 172, b: 76 }];

// --------------------------------------------------------------------------------

function draw() {
    capture.loadPixels();
    var sumPosition = createVector(0, 0);
    

    targetColor.forEach(function(color) {
    if (capture.pixels.length > 0) { // don't forget this!
      
      var w = capture.width,
          h = capture.height;
      var i = 0;
      var pixels = capture.pixels;
      var thresholdAmount = select('#thresholdAmount').value();
      thresholdAmount /= 100.; // this is the slider range
      thresholdAmount *= 255*3; // this is the maximum value
      var total = 0;
      
      for (var y = 0; y < h; y++) {
        
          for (var x = 0; x < w; x++) {

              var diff =
                  Math.abs(pixels[i + 0] - color.r) + 
                  Math.abs(pixels[i + 1] - color.g) +
                  Math.abs(pixels[i + 2] - color.b);
              var outputValue = 0;
              if (diff < thresholdAmount) {
                  outputValue = 255;
                  sumPosition.x += x;
                  sumPosition.y += y;
                  total++;
              }
              pixels[i++] = outputValue; // set red
              pixels[i++] = outputValue; // set green
              pixels[i++] = outputValue; // set blue
              i++; // skip alpha
          }
      }
      
      

      sumPosition.div(total);

      var n = w * h;
      var ratio = total / n;
      select('#percentWhite').elt.innerText = int(100 * ratio);

      if(sumPosition.x != 0 && ratio > 0.3)
      {console.log(color)}
    }

    });
      
    image(capture, 0, 0, w, h);
    

}


// var verde= "#5fee87";
// var rosa= "#dfabff";
// var arancio= "#ecac4c";
// var rosso= "#ec5555";
// var targetColor = [{r: 236, g: 85, b: 85 },{r: 95, g: 238, b: 135 },{r: 223, g: 171, b: 255 },{r: 236, g: 172, b: 76 }];
// var capture;
// var w = 640;
// var h = 480;

// function setup() {
//       capture = createCapture({
//           audio: false,
//           video: {
//               width: w,
//               height: h
//           }
//       },
//       function() {
//           console.log('capture ready.')
//       });
//       capture.elt.setAttribute('playsinline', '');
//       capture.size(w, h);
//       createCanvas(w, h);
//       capture.hide();
//   }
// function draw() {
//   targetColor.forEach(color, trovacolore);

//   function trovacolore (color){
//     capture.loadPixels();
//     var sampling = false;
//     var sumPosition = createVector(0, 0);
//     if (capture.pixels.length > 0) { // don't forget this!

//         // if (mouseIsPressed &&
//         //     mouseX > 0 && mouseX < width &&
//         //     mouseY > 0 && mouseY < height) {
//         //     targetColor = capture.get(mouseX, mouseY);
//         //     sampling = true;
//         // }

//         var w = capture.width,
//             h = capture.height;
//         var i = 0;
//         var pixels = capture.pixels;
//         var thresholdAmount = select('#thresholdAmount').value();
//         thresholdAmount /= 100.; // this is the slider range
//         thresholdAmount *= 255 * 3; // this is the maximum value
//         var total = 0;
//         for (var y = 0; y < h; y++) {
//             for (var x = 0; x < w; x++) {
//                 var diff =
//                     Math.abs(pixels[i + 0] - color.r) +
//                     Math.abs(pixels[i + 1] - color.g) +
//                     Math.abs(pixels[i + 2] - color.b);
//                 var outputValue = 0;
//                 if (diff < thresholdAmount) {
//                     outputValue = 255;
//                     sumPosition.x += x;
//                     sumPosition.y += y;
//                     total++;
//                 }
//                 pixels[i++] = outputValue; // set red
//                 pixels[i++] = outputValue; // set green
//                 pixels[i++] = outputValue; // set blue
//                 i++; // skip alpha
//             }
//         }

//         sumPosition.div(total);

//         var n = w * h;
//         var ratio = total / n;
//         select('#percentWhite').elt.innerText = int(100 * ratio);
//     }

//     image(capture, 0, 0, w, h);
//   }
// }
