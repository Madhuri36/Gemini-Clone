import React from "react";
import {
  FaBars,
  FaPlus,
  FaRegCommentAlt, // Chat square icon
  FaQuestionCircle,
  FaChartLine,
  FaCog
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const chatHistory: ChatHistoryItem[] = [
    { id: "1", title: "How to implement dark mode", timestamp: "2 hours ago" },
    // only showing 1 chat item
  ];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-64" : "w-16"
      }`}
      style={{
        backgroundColor: "var(--bg-header)",
        backdropFilter: "blur(8px)",
        color: "var(--text-primary)",
        borderRight: "1px solid var(--border-muted)",
        zIndex: 10
      }}
    >
      {/* Menu toggle button */}
      <div className="p-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl p-2 rounded-full hover:bg-[var(--custom-bg-three)] transition-colors"
          style={{ color: "var(--text-accent)" }}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* New Chat button */}
      <div className="p-3">
        {isOpen ? (
          <button
            className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-md text-white text-sm font-medium"
            style={{
              backgroundColor: "var(--btn-primary-bg)"
            }}
          >
            <FaPlus /> New Chat
          </button>
        ) : (
          <button
            className="mx-auto flex items-center justify-center w-10 h-10 rounded-full text-white"
            style={{
              backgroundColor: "var(--btn-primary-bg)"
            }}
            aria-label="New chat"
          >
            <FaPlus />
          </button>
        )}
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto py-2">
        {isOpen ? (
          <div className="px-3">
            <h3 className="text-xs uppercase font-medium mb-2 px-2" style={{ color: "var(--text-secondary)" }}>
              Recent Chats
            </h3>
            {chatHistory.slice(0, 1).map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-2 p-2 rounded-md cursor-pointer mb-1 hover:bg-[var(--custom-bg-three)] transition-colors"
              >
                <FaRegCommentAlt className="shrink-0 text-sm" style={{ color: "var(--text-secondary)" }} />
                <div className="truncate flex-1">
                  <div className="text-sm truncate">{chat.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            {chatHistory.slice(0, 1).map((chat) => (
              <div
                key={chat.id}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--custom-bg-three)] transition-colors mb-2"
                title={chat.title}
              >
                {/* <FaRegCommentAlt style={{ color: "var(--text-secondary)" }} /> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section with help, activity, settings */}
      <div className={`p-3 ${isOpen ? "" : "flex flex-col items-center"}`}>
        {isOpen ? (
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-[var(--custom-bg-three)] transition-colors">
              <FaQuestionCircle /> Help
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-[var(--custom-bg-three)] transition-colors">
              <FaChartLine /> Activity
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-[var(--custom-bg-three)] transition-colors">
              <FaCog /> Settings
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2">
            <button className="text-lg hover:bg-[var(--custom-bg-three)] p-2 rounded-full transition-colors" title="Help">
              <FaQuestionCircle />
            </button>
            <button className="text-lg hover:bg-[var(--custom-bg-three)] p-2 rounded-full transition-colors" title="Activity">
              <FaChartLine />
            </button>
            <button className="text-lg hover:bg-[var(--custom-bg-three)] p-2 rounded-full transition-colors" title="Settings">
              <FaCog />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
