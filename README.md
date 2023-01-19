
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
ICOLLARE CODICE QUA
#
#
#
```

### ASCII 3d shape 

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap  <br>

```
ICOLLARE CODICE QUA
#
#
#
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
