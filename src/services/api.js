// import axios from "axios";

// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL ||
//   (import.meta.env.MODE === "production"
//     ? "https://kidney-health-api.onrender.com/api"
//     : "http://localhost:8000/api");

// const API = axios.create({
//   baseURL: API_BASE,
//   timeout: 30000,
//   withCredentials: true
// });

// // Request interceptor to add auth token
// API.interceptors.request.use((cfg) => {
//   const token = localStorage.getItem("token");
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Response interceptor for error handling
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.detail || 'An error occurred';
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject({ message, fields: error.response?.data?.fields });
//   }
// );

// // Auth helpers
// export const login = async (email, password) => {
//   const response = await API.post('/login', { email, password });
//   if (response.data.access_token) {
//     localStorage.setItem('token', response.data.access_token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

// export const register = async (email, password, name) => {
//   const response = await API.post('/register', { email, password, name });
//   if (response.data.access_token) {
//     localStorage.setItem('token', response.data.access_token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   window.location.href = '/login';
// };

// export const isAuthenticated = () => {
//   return !!localStorage.getItem('token');
// };

// export default API;

// // Prediction helper
// export const predictStone = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   const res = await API.post("/predict", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };
import axios from "axios";

// ✅ Base API URL setup
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "production"
    ? "https://kidney-health-app.onrender.com/api"
    : "http://localhost:8000/api");

// ✅ Create axios instance
const API = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  // ⚠️ JWT tokens are sent via Authorization header, not cookies
  withCredentials: false,
});

// ✅ Request interceptor (attach token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (handle backend + network errors)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Detect if server is unreachable or offline
    if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
      return Promise.reject({ message: "Server offline. Please try again later." });
    }

    // Extract readable message from backend response
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "An error occurred";

    // Handle unauthorized (invalid/expired token)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject({ message, fields: error.response?.data?.fields });
  }
);

//
// 🔐 AUTH HELPERS
//

export const login = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const register = async (email, password, name) => {
  try {
    const res = await API.post("/register", { email, password, name });
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isAuthenticated = () => !!localStorage.getItem("token");

//
// 🧠 PREDICTION HELPER
//
export const predictStone = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await API.post("/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default API;
