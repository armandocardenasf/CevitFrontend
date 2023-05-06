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
  },
});

export const { setTokens } = tokenSlice.actions;
export default tokenSlice.reducer;
