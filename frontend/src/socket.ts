import { io } from "socket.io-client";

// Connect to web socket
const socket = io("ws://localhost:3001");

export default socket;