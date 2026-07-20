import axios from "axios";

// Set VITE_API_BASE_URL in your hosting provider. The fallback matches the
// Render service name in server/render.yaml and keeps local development easy.
const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:8000/api"
    : "https://kidney-health-api.onrender.com/api")
).replace(/\/$/, "");

const API = axios.create({ baseURL: API_BASE, timeout: 30000 });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const body = error.response?.data;
    const serverMessage = typeof body?.detail === "string"
      ? body.detail
      : typeof body?.message === "string"
        ? body.message
        : null;
    const message = error.code === "ERR_NETWORK" || !error.response
      ? "Unable to reach the service. Check your connection and try again."
      : serverMessage || "Please check the entered information and try again.";

    if (status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") window.location.assign("/login");
    }

    return Promise.reject({ message, fields: body?.fields, status });
  },
);

export const login = async (email, password) => {
  const { data } = await API.post("/login", { email: email.trim(), password });
  saveSession(data);
  return data;
};

export const register = async (email, password, name) => {
  const { data } = await API.post("/register", {
    email: email.trim(),
    password,
    name: name.trim(),
  });
  saveSession(data);
  return data;
};

function saveSession(data) {
  if (!data?.access_token || !data?.user) {
    throw { message: "The server returned an incomplete sign-in response." };
  }
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("recentPatient");
  window.location.assign("/login");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));

export const predictStone = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await API.post("/predict", formData);
  return data;
};

export default API;
