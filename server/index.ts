import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer();

// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://frontend-production-f529.up.railway.app"]
//   },
// });

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // socket.join("123")
  
  socket.on("message", (data) => {
    console.log(`From ${socket.id}: ${data}`);
    // socket.to("123").emit("message", `From ${socket.id}: ${data}`);
    socket.broadcast.emit('message', `From ${socket.id}: ${data}`) // sends to all except the sender
    socket.emit('message', `From ${socket.id}: ${data}`)  // sends to the sender
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});