var socket = io();

socket.on("connect", function(event) {
  console.log("Connected to server");
});

socket.on("disconnect", function(event) {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New message:", message);

  const ol = document.getElementById("messages");
  const li = document.createElement("li");

  li.innerText = `${message.from}: ${message.text}`;
  ol.appendChild(li);
});

document.getElementById("message-form").addEventListener("submit", e => {
  e.preventDefault();
  const text = document.getElementsByName("message")[0].value;

  socket.emit("createMessage", { from: "User", text }, data => {
    console.log(data);
    document.getElementsByName("message")[0].value = "";
  });
});
