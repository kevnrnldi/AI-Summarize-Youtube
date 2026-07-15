import axios from "axios";
import { getSessionId } from "./session";

//fungsi untuk kirim request ke backend secara otomatis mengambil sessionId
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

//frontend middleware
//cek saat client melakukan request
api.interceptors.request.use(
  (config) => {
    //ambil session id dari storage
    const sessionId = getSessionId();

    //baca session id lewat header
    if (sessionId) {
      config.headers["x-session-id"] = sessionId;
    }

    return config;
  },
  (e) => {
    //kalau ada error kembalikan error mirip metode try&catch
    return Promise.reject(e);
  },
);

//middleware saat server mengirimkan response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    if (e.response?.status === 401) {
      console.log("Sesi habis, silahkan login ulang");
    }

    return Promise.reject(e);
  },
);

export default api;

//pada tahap ini dilakukan verifikasi request dengan session id dan response dari backend saat dikembalikan
//ke frontend
