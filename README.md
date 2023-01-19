
<p align="center">
  <img src="images/logo.png" width="windowwidth" />
</p>

### Table of Contents
1. [Project](#project) <br>
  1.1 [Concept](#concept) <br>
  1.2 [Aim](#aim) <br>
  1.3 [Context of use and device](#context-of-use-and-device) <br>
3. [Structure](#structure) <br>
  2.1 [Welcome page](#welcome-page) <br>
  2.2 [Client or Server](#client-or-server) <br> 
  2.3 [Client's send page](#clients-send-page) <br>
  2.4 [Server's collect page](#servers-collect-page) <br>
  2.5 [Client's collect page](#clients-collect-page) <br>
  2.6 [Chat pages](#chat-pages) <br>
4. [Design challenges](#design-challenges) <br>
  3.1 [Communicating data exchange](#communicating-data-exchange) <br>
5. [Coding challenges](#coding-challenges) <br>
  4.1 [Server](#server) <br> 
  4.2 [Color recognition](#color-recognition) <br>
  4.3 [ASCII 3D shape](#ascii-3d-shape) <br> 
6. [Credits](#credits) <br>
7. [Team members](#team-members) <br>
8. [Course](#course) <br>



## Concept
This project wants to recreate a chat group in physical space, in which people are the senders, the messengers and the receivers.
This experience aims to make more understandable to people what happens on a daily basis through messaging apps, but in general across all devices that use client and server interactions.
Clients to communicate with each other have to connect to the room with their phones, everyone must go to the station of their color and then complete the steps of sending, packaging and collecting data through the server to see other’s messages.

By entrusting the entire process of sending and receiving messages to users, the prototype makes people move along the intangible flows that would otherwise accomplish data in the Web. It wants to expose the path that data takes before it reaches its destination, demonstrating in  actual how this technology works.

“Invisible things are the ones taken for granted: we do not focus our attention on the hammer itself when we use it—we just use it” 

(Hallnäs & Redström, 2002)
  <br>

### Context of use and device
This exhibition is designed within a space for five people arranged in as many stations, characterized by colorful cardboards
Only one is the server and it is placed in the center, when a client writes and packages a message, the server is able to collect and deliver the package.
The other clients have to collect the package from the server and with that they will be able to read the message in the chat.
<br>

## Structure
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>
Funzionamento generale.   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

### Welcome page
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

### Client or Server
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

### Client's send page
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

### Server's collect page
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>
This is a page between the solo and the interactive experience: a five seconds countdown and a "tunnel of stars" lead the user to the final page.

### Chat page
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>


## Design challenges

### Communicating data exchange
<p align="center">
  <img src="images/place-holder.png" width="700" />
</p>

To make the client-server model more intuitive and easy to understand,we have reworked the steps that would have been handled automatically by the computer, turning them into tasks to be taken by participants
-client sends a request to the server by writing a message and packaging the data.
-server finds the packaged data in a 3D ascii form and collects it with the scanner.
-server transports the packaged data to other clients, which also collect it with their devices.
-Clients receive the response and see the message.
<br>

-To collect the message, the scanner relies on the color of the participant's screen and not the ASCII data package. Is a sharp way we choose to identify clients, rather than qr-code or other popular methods.
<br>

To show the data packages the texts entered by participants are associated with three-dimensional figures with varying sizes and characteristics depending on the text entered.
That graphic element represented well the packing of data and the hidden part of communication that happens after sending a message, that we normally don't know about 
<br>

## Coding challenges

### Server

Creating a full operating server
Here is how a client/server model works:
-The client sends a request to the server 
-The server (perpetually waiting) receives the request
-Performs the requested service, and may perform several at the same time;
-Sends a response and any data to the client;
-The client receives the response and any data.

This type of connection is Unicast: the server communicates with only one client at a time; the advantages of this model concern the possibility of having centralized resources, such as a single database. There is the assurance of better security since network paths can be traced back in a timely manner and open server ports are known. Finally, the scalability of the model is immediate and architecture administration is simplified since (most of) the workload is concentrated on the server.
<br>

```
ICOLLARE CODICE QUA
function newConnection(newSocket) {
  //global chat entra
  newSocket.on("chatConnected", function (chatId) {
    globalChat = chatId;
    io.emit("chat connected");
    console.log("nuova chat globale: " + chatId);
  });

  //controlla disponibilità di posti
  newSocket.on("checkAvailability", checkAvailability);

  //manda lista aggiornata a tutti appena entrano
  newSocket.on("requestUserUpdate", function () {
    io.emit("updateUsers", userArray);
    if (globalChat) {
      io.emit("chat connected");
    }
  });

  //manda disponibilità
  function checkAvailability() {
    for (i = 0; i < 5; i++) {
      if (userArray[i]) {
        console.log(i + " occupato");
      } else {
        console.log(i + " libero");
        io.to(newSocket.id).emit("placeAvailable", i);
      }
    }
  }

  //entra nella stanza e aggiorna array
  newSocket.on("enter-room", function () {
    for (let i = 0; true; i++) {
      if (typeof userArray[i] == "undefined") {
        userArray[i] = newSocket.id;
        console.log(userArray);
        io.emit("updateUsers", userArray);
        break;
      }
    }
  });

  //esce dalla stanza stanza e aggiorna array e chat
  newSocket.on("disconnect", function () {
    if (newSocket.id == globalChat) {
      console.log("chat disconnected");
      globalChat = undefined;
      io.emit("chat disconnected");
    }

    let index = userArray.indexOf(newSocket.id);
    if (index > -1) {
      delete userArray[index];
      if (userArray.length > 5) {
        userArray.pop();
      }
      console.log(userArray);
      io.emit("updateUsers", userArray);
    }
  });

  newSocket.on("pending-message", (user) => {
    io.emit("pending-message", user.index);
  });

  newSocket.on("send-chat-message", (user) => {
    console.log(user.message);
    newSocket.broadcast.emit("broadcast-message", user);
    index = userArray.indexOf(newSocket.id);
    messageSent[index - 1] = "sent";
  });

  newSocket.on("get-message", (index) => {
    if (typeof userArray[index] != "undefined") {
      io.to(userArray[index]).emit("message-request");
      console.log(index + "  è stato scansionato id:  " + userArray[index]);
    } else {
      console.log("il client " + index + " non è connesso");
    }
  });

  newSocket.on("show-message", (index) => {
    newSocket.to(userArray[index]).emit("show-message");
    messageSent[index - 1] = "sent";
    console.log(userArray);
    console.log(messageSent);
```

### Color recognition
Creating a color recognizer that uses the camera is no big deal, the difficulty occurs when you have to recognize the color of a screen.
On a technical level creating the final color scanner was a bit challenging. When capturing a screen with the camera, the colors are distorted according to the device display. We had to calibrate the color scanner to the perception of different devices by averaging the color codes in HSB (Hue, Saturation, Brightness) and adding a threshold.
 <br>

```
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
```

### ASCII 3d shape 

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

```
ICOLLARE CODICE QUA
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

    document
      .getElementById("ascicanvas")
      .removeChild(effect[a - 1].domElement);
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
```

## Credits
[P5js](https://p5js.org/) -
P5 JavaScript library was used to develop the WebApp. <br>


## Team members
Federico Bobbo<br>
Francesco Bonetti<br> 
Sarah Cosentino<br> 
Matteo dell’Agostino<br>
Enrico Isidori


## Course
[Creative Coding 2022/2023](https://drawwithcode.github.io/2023/) <br>
**Politecnico di Milano** - Scuola del Design - Communication Design <br>
**Faculty:** Michele Mauri, Andrea Benedetti, Tommaso Elli <br>
