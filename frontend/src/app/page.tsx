import Image from "next/image";

async function handleSubmit(formData: FormData) {
  'use server';
  console.log('submitting form...')
  const message = formData.get('message');
  // Perform server-side operations with the message here
  console.log(message);
}


export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type your message here..."
          className="border p-2 rounded text-gray-900"
        />
        <button type="submit" className="mt-2 border p-2 rounded bg-blue-500 text-white">
          Send
        </button>
      </form>
    </main>
  );
}
