const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });
    
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });

  socket.on("disconnect", event => {
    console.log("Client disconnected");
  });

  socket.on("createMessage", message => {
    console.log("Create message:", message);
    
    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
