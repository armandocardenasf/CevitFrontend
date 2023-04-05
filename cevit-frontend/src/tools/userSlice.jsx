import { createSlice } from "@reduxjs/toolkit";
/**
 * * LOGICA A GUARDAR
 * ! const foundTask = state.find((task) => task.id === id);
 * !   if (foundTask) {
 * !       foundTask.title = title;
 * !       foundTask.description = description;
 * !     }
 * **/
const initialState = {
  user: {
    id: "",
    nombre: "",
    username: "",
    rol: "",
    isActive: true,
    isLoged: false,
  },
};

const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logoutUser: (state) => {
      const usuarioDesactivado = {
        id: "",
        nombre: "",
        username: "",
        rol: "",
        isActive: true,
        isLoged: false,
      };
      return {
        ...state,
        user: usuarioDesactivado,
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
