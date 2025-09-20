// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        setReports(res.data || []);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchReports();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Patient Reports</h1>

          {reports.length === 0 ? (
            <div className="p-6 bg-yellow-50 border rounded text-sm">
              No reports yet. Please generate one from Detection.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reports.map((rep, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow border hover:shadow-lg transition"
                >
                  <h2 className="font-semibold text-lg">{rep.name || "Unknown Patient"}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(rep.createdAt).toLocaleString()}
                  </p>

                  <div
                    className={`mt-3 inline-block px-3 py-1 rounded-md text-sm ${
                      rep.prediction?.label === "stone"
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : "bg-green-50 text-green-700 border border-green-100"
                    }`}
                  >
                    {rep.prediction?.label === "stone"
                      ? "Kidney stone detected"
                      : "No kidney stones"}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        localStorage.setItem("recentPatient", JSON.stringify(rep));
                        window.location.href = "/patients/report";
                      }}
                      className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(rep, null, 2)], {
                          type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `report-${rep.name || "patient"}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="px-4 py-2 rounded-md border text-sm"
                    >
                      Download JSON
                    </button>
                    <button
                      onClick={() => {
                        import("jspdf").then(jsPDF => {
                          const doc = new jsPDF.jsPDF();
                          const text = `
Patient Name: ${rep.name || "Unknown Patient"}
Date: ${new Date(rep.createdAt).toLocaleString()}

Prediction: ${rep.prediction?.label === "stone" ? "Kidney stone detected" : "No kidney stones"}
Confidence: ${((rep.prediction?.confidence ?? 0) * 100).toFixed(2)}%
                          `;
                          doc.text(text, 10, 10);
                          doc.save(`report-${rep.name || "patient"}.pdf`);
                        });
                      }}
                      className="px-4 py-2 rounded-md border text-sm"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this report?")) {
                          try {
                            await API.delete(`/reports/${rep.id}`);
                            setReports(reports.filter((r) => r.id !== rep.id));
                          } catch (err) {
                            console.error("Failed to delete report:", err);
                            alert("Failed to delete report.");
                          }
                        }
                      }}
                      className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;
