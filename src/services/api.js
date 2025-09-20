// src/services/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 30000,
});

// Attach token if present
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Handle 401 responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const predictStone = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { filename, prediction: { label, confidence } }
};

export default API;
