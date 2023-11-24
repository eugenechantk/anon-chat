import { Server } from "socket.io"
import { createServer } from "https";

import { generateKeyPairSync } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const httpsServer = createServer({
  key: privateKey.export({
    type: 'pkcs8',
    format: 'pem',
  }),
  cert: publicKey.export({
    type: 'spki',
    format: 'pem',
  })
});

const io = new Server(httpsServer, {
  cors: {
    origin: "*"
  },
});

// const io = new Server(httpServer);

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
httpsServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});