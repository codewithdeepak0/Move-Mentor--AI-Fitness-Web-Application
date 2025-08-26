import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("fittrack-app-user")) || null, // Load user from localStorage if available
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      // Store both the user object and token in localStorage
      localStorage.setItem("fittrack-app-user", JSON.stringify(action.payload.user));
      localStorage.setItem("fittrack-app-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      // Remove both the user and token from localStorage
      localStorage.removeItem("fittrack-app-user");
      localStorage.removeItem("fittrack-app-token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
