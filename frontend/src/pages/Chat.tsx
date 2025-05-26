import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
      <div className="flex flex-col min-h-screen w-full overflow-y-auto bg-[var(--bg-page)] hide-scrollbar">
        {/* Main content container that starts below the header */}
        <div className="flex w-full pt-16 hide-scrollbar"> {/* Assuming header height is 64px (16rem) */}
          {/* Sidebar component with fixed positioning */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          {/* Chat window that adjusts its width based on sidebar state */}
          <main
            className="flex-1 transition-all duration-300"
            style={{
              marginLeft: isSidebarOpen ? "16rem" : "4rem", // 256px or 64px
            }}
          >
            <ChatWindow />
          </main>
        </div>
      </div>
  );
};

export default ChatPage;