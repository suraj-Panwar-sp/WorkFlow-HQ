import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage, STORAGE_KEYS } from "../../utils/localStorage";

const initialState = {
  sidebarOpen: false, // controls the mobile slide-in drawer
  theme: getFromLocalStorage(STORAGE_KEYS.THEME, "dark"),
  modal: { isOpen: false, type: null, payload: null },
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      setToLocalStorage(STORAGE_KEYS.THEME, action.payload);
    },
    openModal: (state, action) => {
      state.modal = { isOpen: true, type: action.payload.type, payload: action.payload.payload ?? null };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, payload: null };
    },
    addToast: {
      reducer: (state, action) => {
        state.toasts.push(action.payload);
      },
      prepare: ({ message, variant = "success" }) => ({
        payload: { id: `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, message, variant },
      }),
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { toggleSidebar, closeSidebar, setTheme, openModal, closeModal, addToast, removeToast } =
  uiSlice.actions;
export default uiSlice.reducer;
