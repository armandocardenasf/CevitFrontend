import axios from "axios";

export const RutaApi = axios.create({
  baseURL: "http://localhost:80",
});



