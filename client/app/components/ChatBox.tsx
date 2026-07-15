"use client";

import { useState } from "react";
import api from "../utils/api";
import { getSessionId } from "../utils/session"; // Pastikan session helper-mu sudah ada

interface Message {
  role: "user" | "ai";
  message: string;
}

export default function ChatBox({ videoId }: { videoId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", message: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const sessionId = getSessionId();

      const response = await api.post(`/chat/${videoId}`, {
        message: userMessage,
        sessionId: sessionId,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", message: response.data.reply || "AI berhasil membalas." },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", message: "Maaf, terjadi kesalahan saat menghubungi AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] border rounded-lg bg-white shadow-sm">
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <h2 className="font-semibold text-lg">Chat dengan AI</h2>
        <p className="text-sm text-gray-500">
          Tanyakan detail spesifik dari video ini
        </p>
      </div>

      {/* Area Riwayat Pesan */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            Belum ada obrolan. Silakan mulai bertanya!
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end rounded-br-none"
                : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
            }`}
          >
            {msg.message}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 text-gray-800 self-start p-3 rounded-lg rounded-bl-none animate-pulse">
            AI sedang mengetik...
          </div>
        )}
      </div>

      {/* Area Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan sesuatu..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
