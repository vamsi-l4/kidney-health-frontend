import React, { useState } from "react";
import kidneyLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import scanAnim from "../assets/lottie/scan.json";
const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDetectionClick = () => {
    navigate("/detection");
  };

  return (
    <section
      id="home"
      className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] min-h-screen flex flex-col"
    >
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
     
      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 mt-10">
        
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Advanced{" "}
            <span className="text-indigo-600">Kidney Stone Detection</span>
            <br /> for Early Diagnosis
          </h1>

          <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed mx-auto md:mx-0">
            Detect kidney stones accurately and quickly using our AI-powered
            solution. Empowering patients and doctors for better decisions.
          </p>

          <motion.button
            onClick={handleDetectionClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg"
            type="button"
          >
            <span>Quick Detection</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Right Content (Scan Animation) */}
        <motion.div
          className="flex-1 flex justify-center mt-12 md:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-[90%] max-w-lg h-64 bg-indigo-100 rounded-lg flex items-center justify-center overflow-hidden">
            <Lottie
              animationData={scanAnim}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>
      </main>
    </section>
  );
};

export default HeroSection;
