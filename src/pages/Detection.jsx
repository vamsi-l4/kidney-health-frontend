import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import loaderAnim from "../assets/lottie/loader.json";
import API from "../services/api";

const Detection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setAuthChecked(true);
  }, [navigate]);

  if (!authChecked) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#fffbee] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </>
    );
  }

  const pick = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a scan image first.");
    try {
      setLoading(true);
      const data = await API.post("/predict", (() => {
        const fd = new FormData();
        fd.append("file", file);
        return fd;
      })(), { headers: { "Content-Type": "multipart/form-data" } });

      setResult(data.data ?? data);

      const record = {
        name: "Quick Detection",
        prediction: data.data?.prediction ?? data.data,
        createdAt: new Date().toISOString(),
      };

      try {
        await API.post("/reports", record);
      } catch (err) {
        console.error("Failed to save report:", err);
      }
      localStorage.setItem("recentPatient", JSON.stringify(record));
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-start justify-center py-12 px-4 bg-gradient-to-b from-[#F5F7FF] to-[#fffbee]">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Quick Detection</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload CT/X-ray for instant model analysis.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="border-dashed border-2 border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                <input
                  id="upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.dcm"
                  onChange={(e) => pick(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="upload" className="cursor-pointer">
                  <div className="h-36 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="max-h-36 object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-gray-400">
                        Click to select or drag & drop
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  disabled={!file || loading}
                  className="btn-brand"
                  type="submit"
                >
                  {loading ? "Analyzing..." : "Predict"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResult(null);
                  }}
                  className="px-4 py-2 rounded-md border"
                >
                  Reset
                </button>
              </div>
            </div>

            <div>
              <div className="min-h-[160px] border rounded-lg p-4 bg-gray-50">
                {!loading && !result && (
                  <div className="text-sm text-gray-500">
                    Model output will appear here
                  </div>
                )}
                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="w-12">
                      <Lottie animationData={loaderAnim} loop />
                    </div>
                    <div>Analyzing image — please wait</div>
                  </div>
                )}

                {result && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">Prediction</div>
                    <div className="text-lg font-semibold">
                      {result.prediction?.label ?? result.label ?? "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Confidence:{" "}
                      {(
                        (result.prediction?.confidence ?? result.confidence ?? 0) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                    {result.prediction?.heatmap_url && (
                      <img
                        src={result.prediction.heatmap_url}
                        alt="heatmap"
                        className="mt-2 rounded-md max-h-48"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Detection;
