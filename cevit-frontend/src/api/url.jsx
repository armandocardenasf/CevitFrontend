import axios from "axios";
import store from "../app/store";
import { logoutUser } from "../tools/userSlice";
import { setAuthToken } from "../tools/authSlice";
import jwt_decode from "jwt-decode";

export const RutaApi = axios.create({
  baseURL: "http://localhost:80",
});

// authenticated route.
const AuthRutaApi = axios.create({
  baseURL: "http://localhost:80",
});

// helper function.
const handleLogout = () => {
  store.dispatch(logoutUser());
  window.location.href = "/";
};

AuthRutaApi.interceptors.request.use(async (config) => {
  const state = store.getState();

  let token = state.tokens.token;
  const refreshToken = state.tokens.refreshToken;

  if (!token || !refreshToken) {
    handleLogout();
    return Promise.reject(new Error("Token or refreshToken missing"));
  }

  // Check if the refreshToken has expired.
  const refreshTokenExpired = jwt_decode(refreshToken).exp * 1000 < Date.now();

  if (refreshTokenExpired) {
    handleLogout();
    return Promise.reject(new Error("RefreshToken has expired"));
  }

  const data = {
    oRefreshToken: refreshToken,
  };

  // Validate token to see if it has expired. If it has, get a new token.
  const decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    try {
      const res = await RutaApi.post("usuario/token/refresh", data);
      store.dispatch(setAuthToken(res.data));
      token = res.data.token;
    } catch (err) {
      console.log(err);
      handleLogout();
      return Promise.reject(err);
    }
  }

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { AuthRutaApi };
