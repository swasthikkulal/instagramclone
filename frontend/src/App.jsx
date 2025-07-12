import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Register from "./Login/Register";
import Login from "./Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
