import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileText, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
};

const downloadPdf = async (report) => {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const prediction = report.prediction || {};
  const hasStone = prediction.label === "stone";
  doc.setFontSize(20);
  doc.text("UroScan Patient Report", 16, 20);
  doc.setFontSize(11);
  doc.text([
    `Patient: ${report.name || "Unknown patient"}`,
    `Created: ${formatDate(report.createdAt)}`,
    `Result: ${hasStone ? "Kidney stone detected" : "No kidney stone detected"}`,
    `Confidence: ${((prediction.confidence || 0) * 100).toFixed(2)}%`,
    "",
    "This result supports clinical review and is not a medical diagnosis.",
  ], 16, 34);
  doc.save(`uroscan-report-${report.id || "patient"}.pdf`);
};

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchReports = async () => {
      try {
        const { data } = await API.get("/reports");
        setReports(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(requestError.message || "Could not load your reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [navigate]);

  const openReport = (report) => {
    // The newest report may also exist in local storage with patient details
    // while an older deployed server still returns the compact report format.
    // Preserve those details when it is the same saved analysis.
    let storedReport = null;
    try {
      storedReport = JSON.parse(localStorage.getItem("recentPatient") || "null");
    } catch {
      localStorage.removeItem("recentPatient");
    }
    const isCurrentReport = storedReport?.createdAt === report.createdAt;
    const selectedReport = isCurrentReport
      ? { ...report, ...storedReport, id: report.id, prediction: report.prediction }
      : report;
    localStorage.setItem("recentPatient", JSON.stringify(selectedReport));
    navigate("/patients/report");
  };

  const removeReport = async (reportId) => {
    if (!window.confirm("Delete this report? This cannot be undone.")) return;
    setDeletingId(reportId);
    try {
      await API.delete(`/reports/${reportId}`);
      setReports((current) => current.filter((report) => report.id !== reportId));
    } catch (requestError) {
      setError(requestError.message || "Could not delete the report.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">Your history</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Patient reports</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Review completed scan analyses, open a full report, or download a professional PDF.</p>
            </div>
            <button onClick={() => navigate("/patients")} className="btn-brand w-full justify-center gap-2 sm:w-auto">
              <Plus size={18} aria-hidden="true" /> New detection
            </button>
          </div>

          {error && <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading your reports…</div>
          ) : reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <FileText className="mx-auto h-10 w-10 text-indigo-500" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900">No reports yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">Run a scan to create your first saved patient report.</p>
              <button onClick={() => navigate("/patients")} className="btn-brand mt-6">Start a detection</button>
            </div>
          ) : (
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Saved patient reports">
              {reports.map((report) => {
                const isStone = report.prediction?.label === "stone";
                return (
                  <article key={report.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-slate-900">{report.name || "Unknown patient"}</h2>
                        <p className="mt-1 text-sm text-slate-500">{formatDate(report.createdAt)}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${isStone ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                        {isStone ? "Stone detected" : "No stone"}
                      </span>
                    </div>
                    <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Model confidence</p>
                      <p className="mt-1 text-xl font-bold text-slate-800">{((report.prediction?.confidence || 0) * 100).toFixed(2)}%</p>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                      <button onClick={() => openReport(report)} className="rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">View report</button>
                      <button onClick={() => downloadPdf(report)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><Download size={16} aria-hidden="true" /> PDF</button>
                      <button disabled={deletingId === report.id} onClick={() => removeReport(report.id)} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"><Trash2 size={16} aria-hidden="true" /> {deletingId === report.id ? "Deleting…" : "Delete report"}</button>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Reports;
