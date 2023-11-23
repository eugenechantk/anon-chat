import ws from 'ws';

const WS_PORT = 8080;

const server = new ws.Server({ port: WS_PORT });

console.log(`Websocket server started on port ${WS_PORT}`);

server.on('connection', (socket) => {
  console.log(`New connection from ${socket.url}`);
  socket.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    socket.send(`${message}`)
  });
});