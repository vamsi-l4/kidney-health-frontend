import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import kidneyLogo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("recentPatient");

    navigate("/login", { replace: true });
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-lg sm:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={kidneyLogo} alt="Logo" className="h-8 sm:h-9 object-contain" />
          <span className="font-bold text-indigo-700">KidneyAI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/detection">Detection</Link>
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
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium shadow-lg md:hidden"
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/detection" onClick={() => setMenuOpen(false)}>Detection</Link>
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
