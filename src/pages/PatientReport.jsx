import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Navbar from "../components/Navbar";

const PatientReport = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      setPatient(JSON.parse(localStorage.getItem("recentPatient") || "null"));
    } catch {
      localStorage.removeItem("recentPatient");
    }
  }, [navigate]);

  const prediction = patient?.prediction || {};
  const isStone = prediction.label === "stone";
  const date = patient?.createdAt ? new Date(patient.createdAt) : null;
  const formattedDate = date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : "Date unavailable";

  const downloadPdf = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("UroScan Patient Report", 16, 20);
    doc.setFontSize(11);
    doc.text([
      `Patient: ${patient?.name || "Unknown patient"}`,
      `Created: ${formattedDate}`,
      `Result: ${isStone ? "Kidney stone detected" : "No kidney stone detected"}`,
      `Confidence: ${((prediction.confidence || 0) * 100).toFixed(2)}%`,
      "",
      "This result supports clinical review and is not a medical diagnosis.",
    ], 16, 34);
    doc.save(`uroscan-report-${patient?.id || "patient"}.pdf`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <button onClick={() => navigate("/reports")} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700"><ArrowLeft size={17} aria-hidden="true" /> Back to reports</button>
          {!patient ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <FileText className="mx-auto h-10 w-10 text-indigo-500" aria-hidden="true" />
              <h1 className="mt-4 text-xl font-bold text-slate-900">No report selected</h1>
              <p className="mt-2 text-sm text-slate-600">Choose a saved report or run a new detection to view details.</p>
              <button onClick={() => navigate("/reports")} className="btn-brand mt-6">View reports</button>
            </div>
          ) : (
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <header className="border-b border-slate-200 px-5 py-6 sm:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">Analysis report</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{patient.name || "Unknown patient"}</h1>
                    <p className="mt-2 text-sm text-slate-500">Generated {formattedDate}</p>
                  </div>
                  <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${isStone ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{isStone ? "Kidney stone detected" : "No kidney stone detected"}</span>
                </div>
              </header>
              <div className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-8">
                <section className="rounded-xl bg-slate-50 p-5">
                  <h2 className="font-semibold text-slate-900">Patient details</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    {[["Age", patient.age || patient.p_age], ["Gender", patient.gender || patient.p_gender], ["Email", patient.email || patient.p_email], ["Phone", patient.phone || patient.p_phone]].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt className="text-slate-500">{label}</dt><dd className="break-all text-right font-medium text-slate-800">{value || "—"}</dd></div>)}
                  </dl>
                </section>
                <section className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
                  <h2 className="font-semibold text-slate-900">Analysis summary</h2>
                  <p className="mt-4 text-4xl font-bold text-indigo-700">{((prediction.confidence || 0) * 100).toFixed(2)}%</p>
                  <p className="mt-1 text-sm text-slate-600">Model confidence</p>
                  <p className="mt-5 text-sm leading-6 text-slate-700">This AI result is a screening aid. Please consult a qualified clinician for diagnosis and treatment decisions.</p>
                </section>
              </div>
              <footer className="flex flex-col gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button onClick={() => navigate("/reports")} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Back to reports</button>
                <button onClick={downloadPdf} className="btn-brand justify-center gap-2"><Download size={17} aria-hidden="true" /> Download PDF</button>
              </footer>
            </article>
          )}
        </div>
      </main>
    </>
  );
};

export default PatientReport;
