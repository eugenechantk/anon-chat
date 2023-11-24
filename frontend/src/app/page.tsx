'use client'

import { useCallback, useEffect, useState } from "react";
import socket from "../socket";

export default function Home() {
  const [messages, setMessages] = useState("")

  function handleSendMessage() {
    console.log(`Sending message to server`);
    socket.emit('message', messages);
  }

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(`Received message from server: ${message}`);
    });
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <input
          type="text"
          name="message"
          placeholder="Type your message here..."
          className="border p-2 rounded text-gray-900"
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 border p-2 rounded bg-blue-500 text-white"
        >
          Send
        </button>
    </main>
  );
}
