// for axios and BASE URL
import axios from "axios";
//import AppRoutes from "../Routes/AppRoutes";
// import { meta } from "eslint-plugin-react-hooks";

//const ApiUrl = import.meta.env.VITE_BASE_URL||"http://localhost:5173";
const API_BASE = "http://localhost:5000/api";
const Api = axios.create({
  baseURL: API_BASE,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,// to send cookies with response 
});
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default Api