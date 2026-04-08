// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Navbar({ title }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">{title || "TinyTasks"}</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;