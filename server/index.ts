import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

const WS_PORT = 3500;

const io = new Server(httpServer, {
  cors: {
      origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000", "http://127.0.0.1:3000"]
  }
})

console.log(`Websocket server started on port ${WS_PORT}`);

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)
  io.on('message', data => {
    console.log(`Received: ${data}`);
    io.emit(`server received message: ${data}`)
  });
});

httpServer.listen(WS_PORT, () => console.log(`listening on port ${WS_PORT}`))