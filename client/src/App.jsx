import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Classroom from "./pages/Classroom";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Navbar />
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          {isLoggedIn === true && (
            <Route path="/classroom" element={<Classroom />} />
          )}
          {isLoggedIn === false && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
