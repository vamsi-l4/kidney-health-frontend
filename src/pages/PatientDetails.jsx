import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../services/api";

const PatientDetails = () => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const onSubmit = async (data) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (!data.file?.[0]) return alert("Please upload a scan image");
    try {
      setProcessing(true);
      const fd = new FormData();
      fd.append("file", data.file[0]);
      fd.append("p_name", data.name);
      fd.append("p_gender", data.gender);
      fd.append("p_age", data.age);

      const res = await API.post("/predict", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const payload = res.data || res;

      const patientRecord = {
        id: Date.now(),
        name: data.name,
        gender: data.gender,
        age: data.age,
        email: data.email,
        phone: data.phone,
        address: data.address,
        uploadedFile: payload.filename ?? null,
        prediction: payload.prediction ?? payload,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("reports") || "[]");
      existing.unshift(patientRecord);
      localStorage.setItem("reports", JSON.stringify(existing));
      localStorage.setItem("recentPatient", JSON.stringify(patientRecord));

      try {
        await API.post("/reports", {
          name: patientRecord.name,
          prediction: patientRecord.prediction,
          createdAt: patientRecord.createdAt,
        });
      } catch (err) {
        console.error("Failed to save report to backend:", err);
      }

      reset();
      setStep(1);
      navigate("/patients/report");
    } catch (err) {
      console.error(err);
      alert("Submit failed. Please check backend.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-[#fffbee] to-[#F5F7FF]">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md"
        >
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Patient Details</h2>
                <input {...register("name", { required: true })} placeholder="Name" className="border p-2 rounded-md w-full" />
                <select {...register("gender", { required: true })} className="border p-2 rounded-md w-full">
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="flex gap-3">
                  <input type="number" {...register("age")} placeholder="Age" className="border p-2 rounded-md w-full" />
                  <input type="email" {...register("email")} placeholder="Email" className="border p-2 rounded-md w-full" />
                </div>
                <input type="tel" {...register("phone")} placeholder="Phone" className="border p-2 rounded-md w-full" />
                <textarea {...register("address")} placeholder="Address" className="border p-2 rounded-md w-full" />
                <div className="flex justify-end">
                  <button type="button" onClick={() => setStep(2)} className="btn-brand">Next: Upload Scan</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Upload Scan</h2>
                <input type="file" {...register("file", { required: true })} accept=".jpg,.jpeg,.png,.dcm" />
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-md border">Back</button>
                  <button type="submit" disabled={processing} className="btn-brand">{processing ? "Processing..." : "Submit & Analyze"}</button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.form>
      </div>
    </>
  );
};

export default PatientDetails;
