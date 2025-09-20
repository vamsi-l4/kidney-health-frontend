import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Landingpage from "./pages/Landingpage";
import Detection from "./pages/Detection";
import PatientDetails from "./pages/PatientDetails";
import PatientReport from "./pages/PatientReport";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Process from "./pages/Process";
import NotFoundPage from "./pages/NotFoundPage";
import Hero from "./pages/Hero";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        {/* Public Pages */}
        <Route path="/" element={<AnimatedPage><Landingpage /></AnimatedPage>} />
        <Route path="/hero" element={<AnimatedPage><Hero /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/process" element={<AnimatedPage><Process /></AnimatedPage>} />
        
        {/* Detection & Patients */}
        <Route path="/detection" element={<AnimatedPage><Detection /></AnimatedPage>} />
        <Route path="/patients" element={<AnimatedPage><PatientDetails /></AnimatedPage>} />
        <Route path="/patients/report" element={<AnimatedPage><PatientReport /></AnimatedPage>} />

        {/* Reports & Profile */}
        <Route path="/reports" element={<AnimatedPage><Reports /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />

        {/* Auth Pages */}
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />

        {/* 404 */}
        <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
    transition={{ duration: 0.38 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

export default App;
