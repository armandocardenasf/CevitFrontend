import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  refreshToken: "",
};

const tokenSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    },
    setAuthToken: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },
  },
});

export const { setTokens, setAuthToken } = tokenSlice.actions;
export default tokenSlice.reducer;
