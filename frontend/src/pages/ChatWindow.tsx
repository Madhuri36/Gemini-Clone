import { useState, useRef, useEffect } from "react";
import { useTheme } from "../Context/ThemeProvider";
import { IoSend, IoImageOutline, IoChevronDown } from "react-icons/io5";
import { sendPrompt } from "../helpers/api-communicator";
import LoadingMessage from "../components/Loading";
import { useChat, Message } from "../Context/chatContext";

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { colorTheme, theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [generationType, setGenerationType] = useState("text"); // "text" or "image"

  const { currentChat, currentChatId, addMessageToCurrentChat, createNewChat } = useChat();
  const messages = currentChat?.messages || [];

  const generationOptions = [
    { value: "text", label: "Text Generation" },
    { value: "image", label: "Image Generation"}
  ];

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => (
      /^\*\*(.*)\*\*$/.test(part)
        ? <strong key={index}>{part.slice(2, -2)}</strong>
        : <span key={index}>{part}</span>
    ));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    let chatId = currentChatId || createNewChat();
    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    addMessageToCurrentChat(userMessage);
    setInput("");
    setLoading(true);
    
    if (generationType === "text") {
        await handleTextGeneration(chatId, userMessage);
    } else if (generationType === "image") {
        await handleImageGeneration(chatId, userMessage);
    }

    setLoading(false);
  };

  const handleTextGeneration = async (chatId: string, userMessage: Message) => {
    try {
      const aiResponse = await sendPrompt(input);
      addMessageToCurrentChat({
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      });
    } catch (error: any) {
      addMessageToCurrentChat({
        sender: "ai",
        text: `❌ Error: ${error.message}`,
        timestamp: new Date(),
      });
    }
  };

  const handleImageGeneration = async (chatId: string, userMessage: Message) => {
    console.log("Image generation requested with prompt:", input);
    addMessageToCurrentChat({
      sender: "ai",
      text: "Image Generation is coming soon!",
      timestamp: new Date(),
    });
  };

  const handleFileUpload = () => fileInputRef.current?.click();
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleDropdownSelect = (value: string) => {
    setGenerationType(value);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const selectedOption = generationOptions.find(opt => opt.value === generationType);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] pt-2 bg-[var(--bg-page)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 hide-scrollbar space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[var(--text-secondary)] text-sm">
            Type a message below to begin chatting
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-full sm:max-w-[75%] px-4 py-3 rounded-3xl shadow-md transition-all ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white rounded-tr-sm"
                      : "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-muted)] rounded-tl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{renderFormattedText(msg.text)}</div>
                  <div className={`text-xs mt-2 text-right ${
                    msg.sender === "user" ? "text-white/70" : "text-[var(--text-secondary)]"
                  }`}>
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

      {/* Input */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-muted)] rounded-full px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-200">

          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-[var(--custom-bg-one)] hover:bg-[var(--custom-bg-two)] rounded-md transition-all duration-200 text-sm"
              disabled={loading}
            >
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {generationType === "text" ? "Text" : "Image"}
              </span>
              <IoChevronDown 
                size={12} 
                className={`text-[var(--text-secondary)] transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute bottom-full left-0 mb-1 w-32 bg-[var(--bg-surface)] border border-[var(--border-muted)] rounded-lg shadow-xl z-10 overflow-hidden">
                {generationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleDropdownSelect(option.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[var(--custom-bg-one)] transition-colors duration-150 text-sm ${
                      generationType === option.value 
                        ? 'bg-[var(--custom-bg-two)] text-[var(--text-primary)] font-medium' 
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="text-xs">{option.value === "text" ? "Text" : "Image"}</span>
                    {generationType === option.value && (
                      <div className="w-1.5 h-1.5 bg-[var(--gradient-from)] rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1 p-2 bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
            placeholder="Type a message..."
            disabled={loading}
          />
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          <button
            onClick={handleFileUpload}
            className="p-2 rounded-full hover:bg-[var(--custom-bg-three)] transition-colors"
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
                : "hover:scale-105"
            }`}
            style={{
              background: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
            }}
            aria-label="Send message"
          >
            <IoSend size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;