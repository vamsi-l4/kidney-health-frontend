// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 mt-12 border-t">
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-10" />
          <div>
            <div className="font-semibold">Uroscan</div>
            <div className="text-sm text-gray-500">AI Kidney Stone Detection</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Uroscan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
