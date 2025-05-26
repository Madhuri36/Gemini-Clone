import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "./Context/ThemeProvider"
import { AuthProvider } from "./Context/AuthContext"
import { ChatProvider } from "./Context/chatContext"


function App() {

  return (
    <AuthProvider>
        <ThemeProvider>
            <ChatProvider>
                <main>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </ChatProvider>
        </ThemeProvider>
    </AuthProvider>
  )
}

export default App