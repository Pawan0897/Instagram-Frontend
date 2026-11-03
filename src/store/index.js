import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./authSlice";
import uiReducer from "./uiSlice";
import { queryClient } from "../lib/queryClient";

export const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer },
});

// http.js 401 (session expired) par ye event bhejta hai -> auto logout
window.addEventListener("auth:expired", () => {
  store.dispatch(logout());
  queryClient.clear();
});
