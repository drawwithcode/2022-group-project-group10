import * as THREE from "three";

import { AsciiEffect } from "./jsm/effects/AsciiEffect.js";
import { PolyhedronGeometry } from "./node_modules/three/src/geometries/PolyhedronGeometry.js";

document.querySelector("#message-input").addEventListener("input", getmydata);
document.querySelector("#send-button").addEventListener("click", disappearSend);
document.querySelector("#done-button").addEventListener("click", appearSend);


let camera, scene, renderer;
let cameraTarget = new THREE.Vector3(0, 0, 0);
let effect = [];
let sphere;
const start = Date.now();

let myMessage; //value of the text box
let radiusArr = [0]; //array where all the lengths of myMessage are pushed when changing
let radius; //variable that contains the latest element of the radiusArr

let directionalLight1;
let directionalLight2;
let a = 0;
let nParole;

function disappearSend() {
  document.getElementById("send-box").style.display = "none";
  document.getElementById("done-button").style.display = "block";
  document.getElementById("scan-text").style.display = "flex";
}

function appearSend() {
  document.getElementById("send-box").style.display = "block";
  document.getElementById("done-button").style.display = "none";
  document.getElementById("scan-text").style.display = "none";
  document.getElementById("ascicanvas").removeChild(effect[a].domElement);
  init();
}


function getmydata() {
  myMessage = document.getElementById("message-input").value;
  console.log("lettere: " + myMessage.length);
  nParole = myMessage.split(" ").length;
  let facce = Math.round(map_range(nParole, 1, 10, 0, 5));
  console.log("parole: " + nParole);

  radiusArr.push(myMessage.length * 10);
  radius = radiusArr[radiusArr.length - 1];
  let raggio = Math.round(map_range(myMessage.length, 0, 140, 120, 600));

  sphere = new THREE.Mesh(
    new THREE.TetrahedronGeometry(raggio, facce),
    new THREE.MeshPhongMaterial({ color: "green", flatShading: true })
  );
  sphere.name = "sphere";
  sphere.receiveShadow = true;
  sphere.castShadow = true;
  scene.add(sphere);

  if (radius < radiusArr[radiusArr.length - 2]) {
    a += 1;

    document.getElementById("ascicanvas").removeChild(effect[a - 1].domElement);
    init();

    sphere = new THREE.Mesh(
      new THREE.TetrahedronGeometry(raggio, facce),
      new THREE.MeshPhongMaterial({ color: "green", flatShading: true })
    );
    sphere.name = "sphere";
    sphere.castShadow = true;
    scene.add(sphere);
  }
  console.log(sphere.position);
  console.log(camera.position);
}

init();
animate();

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function init() {
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  //camera.position.y = 150;
  camera.position.x = 500;

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0xff0000 );

  //for ( let i = 0; i < 6; i++ ) {
  lights();

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setClearColor( 0xffffff, 0);

  effect.push(new AsciiEffect(renderer, "#@%=+-:. ", { invert: true }));
  effect[a].setSize(window.innerWidth, window.innerHeight);
  effect[a].domElement.style.color = "black";
  //effect[a].domElement.style.backgroundColor = 'white';

  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
  document.getElementById("ascicanvas").appendChild(effect[a].domElement);
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect[a].setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const timer = Date.now() - start;
  camera.lookAt(cameraTarget);
  //camera.rotation.x = timer * 0.0008;
  scene.rotation.y = timer * 0.0005;

  effect[a].render(scene, camera);
}

function lights() {
  directionalLight1 = new THREE.DirectionalLight(0xffffff);
  directionalLight1.position.set(10, 800, 500);
  directionalLight1.intensity = 10;
  scene.add(directionalLight1);

  directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(-500, -500, -500);
  scene.add(directionalLight2);
}