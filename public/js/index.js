var socket = io();

const messageForm = document.getElementById("message-form");
const inputElement = document.getElementsByName("message")[0];
const locationButton = document.getElementById("send-location");
const ol = document.getElementById("messages");

socket.on("connect", function(event) {
  console.log("Connected to server");
});

socket.on("disconnect", function(event) {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New message:", message);

  const li = document.createElement("li");

  li.innerText = `${message.from}: ${message.text}`;
  ol.appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  console.log("New location:", message);

  const li = document.createElement("li");
  li.innerText = `${message.from}:`;

  const a = document.createElement("a");
  a.innerText = "My current location";
  a.href = message.url;
  a.target = "_blank";

  li.appendChild(a);
  ol.appendChild(li);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();

  socket.emit(
    "createMessage",
    { from: "User", text: inputElement.value },
    () => {
      inputElement.value = "";
    }
  );
});

locationButton.addEventListener("click", e => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  locationButton.disabled = "disabled";
  locationButton.innerText = "Sending location..."
  
  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.disabled = null;
      locationButton.innerText = "Send location"
      
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.disabled = null;
      locationButton.innerText = "Send location"
      alert("Unable to fetch location");
    }
  );
});
