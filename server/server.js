const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("disconnect", event => {
    console.log("Client disconnected");
  });

  socket.on("createMessage", message => {
    console.log("Create message:", message);

    socket.broadcast.emit(
      "newMessage",
      generateMessage(message.from, message.text)
    );
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
