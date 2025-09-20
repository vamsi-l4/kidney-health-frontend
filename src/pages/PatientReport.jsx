import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const PatientReport = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem("recentPatient");
  const patient = stored ? JSON.parse(stored) : null;
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setAuthChecked(true);
  }, [navigate]);

  // Show loading until authentication is checked
  if (!authChecked) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </>
    );
  }

  const pred = patient?.prediction || { label: "no-stone", confidence: 0.9 };

  const downloadReport = () => {
    const content = `
      Patient Report
      -----------------
      Name: ${patient?.name || "-"}
      Age: ${patient?.age || patient?.p_age || "-"}
      Gender: ${patient?.gender || patient?.p_gender || "-"}
      Email: ${patient?.email || patient?.p_email || "-"}
      Phone: ${patient?.phone || patient?.p_phone || "-"}
      Date: ${patient?.createdAt ? new Date(patient.createdAt).toLocaleString() : "-"}
      Prediction: ${pred.label}
      Confidence: ${(pred.confidence * 100).toFixed(2)}%
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patient_report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {patient?.name || "Unknown Patient"}
              </h1>
              <div className="text-sm text-gray-500">
                Report generated:{" "}
                {patient?.createdAt
                  ? new Date(patient.createdAt).toLocaleString()
                  : "N/A"}
              </div>
            </div>

            <div className="text-right">
              <div
                className={`inline-block px-4 py-2 rounded-md ${
                  pred.label === "stone"
                    ? "bg-red-50 text-red-700 border border-red-100"
                    : "bg-green-50 text-green-700 border border-green-100"
                }`}
              >
                {pred.label === "stone"
                  ? "Kidney stone detected"
                  : "No kidney stones"}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Confidence: {(pred.confidence * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium">Patient Info</h3>
              <div className="mt-2 space-y-2 text-sm text-gray-700">
                <div>
                  <strong>Age:</strong>{" "}
                  {patient?.age || patient?.p_age || "-"}
                </div>
                <div>
                  <strong>Gender:</strong>{" "}
                  {patient?.gender || patient?.p_gender || "-"}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {patient?.email || patient?.p_email || "-"}
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  {patient?.phone || patient?.p_phone || "-"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium">AI Explanation</h3>
              <p className="text-sm text-gray-700 mt-2">
                The model returned a prediction and confidence. Click below to
                reveal the Grad-CAM heatmap (if available) to see where the model
                focused.
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowHeatmap((s) => !s)}
                  className="px-4 py-2 rounded-md border"
                >
                  {showHeatmap ? "Hide Heatmap" : "Reveal Heatmap"}
                </button>
                <button onClick={downloadReport} className="btn-brand">
                  Download Report
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: showHeatmap ? "auto" : 0,
              opacity: showHeatmap ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="overflow-hidden mt-6"
          >
            {showHeatmap && patient?.prediction?.heatmap_url ? (
              <img
                className="w-full rounded-md border"
                src={patient.prediction.heatmap_url}
                alt="heatmap"
              />
            ) : showHeatmap ? (
              <div className="p-6 bg-yellow-50 border rounded text-sm">
                No heatmap available for this result.
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PatientReport;
