import axios from "axios";

export const RutaApi = axios.create({
  baseURL: "http://localhost:80",
});

const AuthRutaApi = axios.create({
  baseURL: "http://localhost:80",
});

AuthRutaApi.interceptors.request.use(() => {});

export { AuthRutaApi };
