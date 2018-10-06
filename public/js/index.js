var socket = io();

socket.on("connect", function(event) {
  console.log("Connected to server");
});

socket.on("disconnect", function(event) {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(event) {
  console.log("New message:", event);
});
