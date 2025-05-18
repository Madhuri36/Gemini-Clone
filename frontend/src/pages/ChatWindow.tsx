import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../Context/ThemeProvider";
import { IoSend, IoImageOutline } from "react-icons/io5";
import { sendPrompt } from "../helpers/api-communicator";
import LoadingMessage from "../components/Loading";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorTheme, theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/); // Split by **bold**
  return parts.map((part, index) => {
    if (/^\*\*(.*)\*\*$/.test(part)) {
      return <strong key={index}>{part.slice(2, -2)}</strong>; // Remove **
    }
    return <span key={index}>{part}</span>;
  });
};


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await sendPrompt(input);

      const aiMessage: Message = {
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        sender: "ai",
        text: `❌ Error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] pt-2 bg-[var(--bg-page)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 hide-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[var(--text-secondary)] text-sm">
            Type a message below to begin chatting
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex px-4 py-1 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-full sm:max-w-[80%] w-fit px-4 py-2 rounded-2xl break-words whitespace-pre-wrap ${
                    msg.sender === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                  }`}
                  style={{
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(to right, var(--gradient-from), var(--gradient-to))"
                        : "var(--custom-bg-two)",
                    color: msg.sender === "user" ? "white" : "var(--text-primary)",
                    wordBreak: "break-word",
                  }}
                >
                  <div className="mb-1">{renderFormattedText(msg.text)}</div>
                  <div
                    className={`text-xs ${
                      msg.sender === "user"
                        ? "text-white/70"
                        : "text-[var(--text-secondary)]"
                    } text-right`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && <LoadingMessage />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-[var(--custom-bg-one)] rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1 p-2 bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
            placeholder="Type a message..."
            disabled={loading}
          />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={handleFileUpload}
            className="p-2 rounded-full hover:bg-[var(--custom-bg-two)] transition-colors"
            aria-label="Upload image"
          >
            <IoImageOutline size={20} className="text-[var(--text-secondary)]" />
          </button>

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-2 rounded-full transition-all ${
              !input.trim() || loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            aria-label="Send message"
            style={{
              background:
                "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
            }}
          >
            <IoSend size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
