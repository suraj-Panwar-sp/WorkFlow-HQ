import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import taskReducer from "../features/tasks/taskSlice";
import departmentReducer from "../features/departments/departmentSlice";
import uiReducer from "../features/ui/uiSlice";
import { setToLocalStorage, STORAGE_KEYS } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    tasks: taskReducer,
    departments: departmentReducer,
    ui: uiReducer,
  },
});

// Whenever employees / tasks / departments change, mirror them to LocalStorage.
// A lightweight subscribe (rather than a slice-per-slice effect) keeps this in one place.
let previous = store.getState();
store.subscribe(() => {
  const state = store.getState();
  if (state.employees.employees !== previous.employees.employees) {
    setToLocalStorage(STORAGE_KEYS.EMPLOYEES, state.employees.employees);
  }
  if (state.tasks.tasks !== previous.tasks.tasks) {
    setToLocalStorage(STORAGE_KEYS.TASKS, state.tasks.tasks);
  }
  if (state.departments.departments !== previous.departments.departments) {
    setToLocalStorage(STORAGE_KEYS.DEPARTMENTS, state.departments.departments);
  }
  previous = state;
});
