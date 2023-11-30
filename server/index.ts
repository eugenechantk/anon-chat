import { Server } from "socket.io"
import { createServer } from "http";
import cors from "cors";
// import { readFileSync } from 'fs';

// const privateKey = readFileSync('./key.pem');
// const certificate = readFileSync('./cert.pem');

// const credentials = { key: privateKey, cert: certificate };
const httpServer = createServer();

const corsOptions = {
  origin: ["http://localhost:3000", "https://frontend-production-f529.up.railway.app", "https://127.0.0.1:3000"],
  methods: ["GET", "POST"],
  // credentials: true
};

const io = new Server(httpServer, {
  cors: corsOptions
});

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