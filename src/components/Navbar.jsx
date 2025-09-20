import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import kidneyLogo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("recentPatient");

    // Clear reports data if it exists
    localStorage.removeItem("reports");

    // Navigate to login and force page refresh
    navigate("/login");

    // Force page refresh to clear all component states
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-3 z-50 w-full"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-4 flex items-center justify-between rounded-2xl bg-white/70 backdrop-blur-lg border border-slate-200 shadow-md">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={kidneyLogo} alt="Logo" className="h-8 sm:h-9 object-contain" />
          <span className="font-bold text-indigo-700">KidneyAI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/patients">Detection</Link>
          <Link to="/process">How it Works</Link>
          <Link to="/reports">Reports</Link>
          {user && <Link to="/profile">Profile</Link>}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
            >
              Login / Register
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/profile"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium"
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/patients" onClick={() => setMenuOpen(false)}>Detection</Link>
          <Link to="/process" onClick={() => setMenuOpen(false)}>How it Works</Link>
          <Link to="/reports" onClick={() => setMenuOpen(false)}>Reports</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Login / Register
            </button>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
