import { Routes, Route} from 'react-router-dom';
import '../public/poppins/fonts.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App
