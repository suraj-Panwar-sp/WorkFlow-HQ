import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, STORAGE_KEYS } from "../../utils/localStorage";
import { dummyEmployees } from "../../data/dummyData";
import { generateId } from "../../utils/helpers";

const initialState = {
  employees: getFromLocalStorage(STORAGE_KEYS.EMPLOYEES, dummyEmployees),
  searchQuery: "",
  departmentFilter: "All",
  statusFilter: "All",
  sortBy: "name-asc",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: {
      reducer: (state, action) => {
        state.employees.push(action.payload);
      },
      prepare: (employee) => ({ payload: { id: generateId("emp"), ...employee } }),
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) state.employees[index] = { ...state.employees[index], ...action.payload };
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((e) => e.id !== action.payload);
    },
    searchEmployees: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterEmployees: (state, action) => {
      const { department, status } = action.payload;
      if (department !== undefined) state.departmentFilter = department;
      if (status !== undefined) state.statusFilter = status;
    },
    setEmployeeSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, searchEmployees, filterEmployees, setEmployeeSort } =
  employeeSlice.actions;
export default employeeSlice.reducer;
