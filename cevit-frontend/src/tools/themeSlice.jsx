import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: {
    modo: "",
  },
};

const themeSlice = createSlice({
  name: "themeChange",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export const { changeMode } = themeSlice.actions;
export default themeSlice.reducer;
