import axios from "axios";
import store from "../app/store";
import { logoutUser } from "../tools/userSlice";
import { setTokens } from "../tools/authSlice";
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

AuthRutaApi.interceptors.request.use((config) => {
  const state = store.getState();

  const token = state.tokens.token;
  const refreshToken = state.tokens.refreshToken;

  if (!token || !refreshToken) {
    handleLogout();
    return;
  }

  // check if the refreshToken has expired.
  const refreshTokenExpired = jwt_decode(refreshToken).exp * 1000 < Date.now();

  if (refreshTokenExpired) {
    handleLogout();
    return;
  }

  const data = {
    oRefreshToken: refreshToken,
  };

  // validate token to see if has expired. If it has, get new token.
  const decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    RutaApi.post("usuario/token/refresh", data).then((res) => {
      store.dispatch(setTokens(res.data));
    });
  }

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { AuthRutaApi };
