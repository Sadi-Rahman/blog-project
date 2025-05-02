import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach JWT on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`; // Axios interceptor :contentReference[oaicite:16]{index=16}
  return config;
});

export default API;
