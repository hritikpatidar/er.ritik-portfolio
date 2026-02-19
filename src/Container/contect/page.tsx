"use client";

import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-10">
      <input
        type="text"
        className="border p-2"
        placeholder="Enter message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 ml-2"
      >
        Send
      </button>
    </div>
  );
}
