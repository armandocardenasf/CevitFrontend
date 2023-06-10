import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../tools/userSlice";
import tokenReducer from "../tools/authSlice";
import themeReducer from "../tools/themeSlice";

const rootReducer = combineReducers({
  usuario: userReducer,
  tokens: tokenReducer,
  theme: themeReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export { persistor };
export default store;
