import { Routes, Route} from 'react-router-dom';
import '../public/poppins/fonts.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </>
  )
}

export default App
