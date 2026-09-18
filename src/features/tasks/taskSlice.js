import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, STORAGE_KEYS } from "../../utils/localStorage";
import { dummyTasks } from "../../data/dummyData";
import { generateId } from "../../utils/helpers";

const initialState = {
  tasks: getFromLocalStorage(STORAGE_KEYS.TASKS, dummyTasks),
  searchQuery: "",
  statusFilter: "All",
  priorityFilter: "All",
  departmentFilter: "All",
  sortBy: "dueDate-asc",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (task) => ({
        payload: { id: generateId("task"), createdAt: new Date().toISOString().slice(0, 10), ...task },
      }),
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = { ...state.tasks[index], ...action.payload };
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = status;
    },
    searchTasks: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterTasks: (state, action) => {
      const { status, priority, department } = action.payload;
      if (status !== undefined) state.statusFilter = status;
      if (priority !== undefined) state.priorityFilter = priority;
      if (department !== undefined) state.departmentFilter = department;
    },
    setTaskSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, updateTaskStatus, searchTasks, filterTasks, setTaskSort } =
  taskSlice.actions;
export default taskSlice.reducer;
