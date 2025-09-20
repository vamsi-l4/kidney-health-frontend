// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === 'production'
    ? "https://kidney-health-app.onrender.com"
    : "http://localhost:8000");

const API = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// Attach token if present
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const predictStone = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { filename, prediction: { label, confidence } }
};

export default API;
