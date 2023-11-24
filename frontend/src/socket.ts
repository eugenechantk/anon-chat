import { io } from "socket.io-client";

console.log(process.env.NEXT_PUBLIC_WS_URL);
// Connect to web socket
const socket = io(process.env.NEXT_PUBLIC_WS_URL as string, {secure: true});

export default socket;