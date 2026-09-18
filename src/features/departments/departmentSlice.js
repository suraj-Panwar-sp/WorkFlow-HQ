import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, STORAGE_KEYS } from "../../utils/localStorage";
import { dummyDepartments } from "../../data/dummyData";
import { generateId } from "../../utils/helpers";

const initialState = {
  departments: getFromLocalStorage(STORAGE_KEYS.DEPARTMENTS, dummyDepartments),
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    addDepartment: {
      reducer: (state, action) => {
        state.departments.push(action.payload);
      },
      prepare: (department) => ({ payload: { id: generateId("dept"), ...department } }),
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter((d) => d.id !== action.payload);
    },
  },
});

export const { addDepartment, deleteDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
