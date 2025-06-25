//import axios from "axios";

/*
const instance = axios.create({
  baseURL: "http://localhost:5000/api/",

});

export default instance;
*/
//import axios from "axios";

/*
axios.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:5000/api/";
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});

export default axios;
*/

// axiosService.js
import axios from "axios";

// Crear instancia con configuración base
const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Interceptor para agregar token si existe
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Puedes agregar manejo de errores global si quieres
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    //console.error("Error de respuesta Axios:", error);
    return Promise.reject(error);
  }
);

export default instance;
