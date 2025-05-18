import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "./Context/ThemeProvider"
import { userAuth } from "./Context/AuthContext"


function App() {
  console.log(userAuth()?.isLoggedIn);
  

  return <main>
    <ThemeProvider>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ThemeProvider>
 </main>

  
}

export default App
