import { createSlice } from "@reduxjs/toolkit";
import { tokenStore } from "../api/http";

// token: localStorage se, user: login ya GET /onboarding se
const authSlice = createSlice({
  name: "auth",
  initialState: { token: tokenStore.get(), user: null },
  reducers: {
    loginSuccess(state, { payload }) {
      const { token, password, ...user } = payload;
      tokenStore.set(token);
      state.token = token;
      state.user = user;
    },
    setUser(state, { payload }) {
      const { password, ...user } = payload; // update API hashed password bhej deti hai
      state.user = { ...state.user, ...user };
    },
    logout(state) {
      tokenStore.clear();
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
