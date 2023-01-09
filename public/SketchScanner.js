
var verde= "#5fee87";
var rosa= "#dfabff";
var arancio= "#ecac4c";
var rosso= "#ec5555";
// https://kylemcdonald.github.io/cv-examples/

// var targetColor = [{name: "rosso", r: 236, g: 85, b: 85 },{name: "verde", r: 95, g: 238, b: 135 },{name: "arancio", r: 223, g: 171, b: 255 },{name: "viola", r: 236, g: 172, b: 76 }];
var colors;
var capture;
var trackingData;
let canvas

function setup() {
  canvas =createCanvas(windowWidth,windowHeight)

  var constrains = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  }

  capture = createCapture(constrains); //capture the webcam
  capture.position(0,0) //move the capture to the top left
  capture.style('opacity',0.5)// use this to hide the capture later on (change to 0 to hide)...
  capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.

  tracking.ColorTracker.registerColor('verde', function(r, g, b) {
  if (r < 95 && g > 238 && b < 135) {
    return true;
  }
    return false;
  });
  tracking.ColorTracker.registerColor('viola', function(r, g, b) {
    if (r > 233 && g > 171 && b > 255) {
      return true;
    }
      return false;
    });
    tracking.ColorTracker.registerColor('arancio', function(r, g, b) {
        if (r > 236 && g > 172 && b < 76) {
          return true;
        }
          return false;
        });
        tracking.ColorTracker.registerColor('rosso', function(r, g, b) {
            if (r > 236 && g < 85 && b < 85) {
              return true;
            }
              return false;
            });

  colors = new tracking.ColorTracker(['verde','viola','arancio','rosso']);
  //  colors = new tracking.ColorTracker([0x666666]);

  tracking.track('#myVideo', colors); // start the tracking of the colors above on the camera in p5

  //start detecting the tracking
  colors.on('track', function(event) { //this happens each time the tracking happens
      trackingData = event.data // break the trackingjs data into a global so we can access it with p5
  });

}

function draw() {

  // console.log(trackingData);
  if(trackingData){ //if there is tracking data to look at, then...
    for (var i = 0; i < trackingData.length; i++) { //loop through each of the detected colors
       console.log( trackingData[i] )
      if (trackingData[i].color=='verde')
      {
      rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
      }
      if (trackingData[i].color=='viola')
      {
      rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
      }
      if (trackingData[i].color=='arancio')
      {
      rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
      }
      if (trackingData[i].color=='rosso')
      {
      ellipse(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
      }
    }
  }
}