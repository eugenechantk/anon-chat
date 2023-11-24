'use client'

import { useEffect, useState } from "react";
import socket from "../socket";

export default function Home() {
  const [messages, setMessages] = useState("")

  function handleSendMessage() {
    console.log(`Sending message to server`);
    socket.emit('message', messages);
  }

  useEffect(() => {
    socket.on('message', (message: string) => {
      console.log(`Received message from server:\n\n${message}`);
    });
  }, [])

  return (
    <main className="relative p-24 h-full">
      <div className="flex flex-row gap-1 w-full absolute bottom-8 left-1/2 transform -translate-x-1/2 px-24">
        <input
          type="text"
          name="message"
          placeholder="Type your message here..."
          className="border p-2 rounded text-gray-900 grow"
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="border p-2 rounded bg-blue-500 text-white"
        >
          Send
        </button>
        </div>
    </main>
  );
}
