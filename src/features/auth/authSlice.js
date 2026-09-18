import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage, STORAGE_KEYS } from "../../utils/localStorage";
import { dummyUsers } from "../../data/dummyData";

const storedUser = getFromLocalStorage(STORAGE_KEYS.USER, null);

const initialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const existing = getFromLocalStorage("workflow_registered_users", dummyUsers);
      const found = existing.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) {
        state.error = "Invalid email or password.";
        return;
      }
      const { password: _pw, ...safeUser } = found;
      state.user = safeUser;
      state.isAuthenticated = true;
      state.error = null;
      setToLocalStorage(STORAGE_KEYS.USER, safeUser);
    },
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const existing = getFromLocalStorage("workflow_registered_users", dummyUsers);
      if (existing.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        state.error = "An account with this email already exists.";
        return;
      }
      const newUser = { id: `user_${Date.now()}`, name, email, password, role: "Administrator" };
      const updated = [...existing, newUser];
      setToLocalStorage("workflow_registered_users", updated);
      const { password: _pw, ...safeUser } = newUser;
      state.user = safeUser;
      state.isAuthenticated = true;
      state.error = null;
      setToLocalStorage(STORAGE_KEYS.USER, safeUser);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeFromLocalStorage(STORAGE_KEYS.USER);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { login, signup, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
