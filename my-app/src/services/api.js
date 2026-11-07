import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getEmployees = () => API.get("/select/");
export const addEmployee = (data) => API.post("/save/", data);
export const getEmployeeById = (id) => API.get(`/search/${id}`);
export const updateEmployee = (id, data) => API.patch(`/update/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/delete/${id}`);

export default API;