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
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = document.getElementById("message-template").innerHTML;
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  const li = document.createElement("li");
  li.innerHTML = html;
  ol.appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = document.getElementById("location-message-template").innerHTML;
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  const li = document.createElement("li");
  li.innerHTML = html;
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
  locationButton.innerText = "Sending location...";

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.disabled = null;
      locationButton.innerText = "Send location";

      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.disabled = null;
      locationButton.innerText = "Send location";
      alert("Unable to fetch location");
    }
  );
});
