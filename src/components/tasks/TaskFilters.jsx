import { useDispatch, useSelector } from "react-redux";
import { searchTasks, filterTasks, setTaskSort } from "../../features/tasks/taskSlice";

const SORT_OPTIONS = [
  { value: "dueDate-asc", label: "Due date (soonest)" },
  { value: "dueDate-desc", label: "Due date (latest)" },
  { value: "priority-desc", label: "Priority (high–low)" },
  { value: "title-asc", label: "Title (A–Z)" },
];

export default function TaskFilters() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);
  const { searchQuery, statusFilter, priorityFilter, departmentFilter, sortBy } = useSelector((state) => state.tasks);

  return (
    <div className="card p-4 mb-5 flex flex-col md:flex-row gap-3 md:items-center">
      <div className="relative flex-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute left-3 top-1/2 -translate-y-1/2 text-paper-100/35">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => dispatch(searchTasks(e.target.value))}
          placeholder="Search tasks by title…"
          className="input-field pl-9"
        />
      </div>
      <select value={statusFilter} onChange={(e) => dispatch(filterTasks({ status: e.target.value }))} className="input-field md:w-40">
        <option value="All">All statuses</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priorityFilter} onChange={(e) => dispatch(filterTasks({ priority: e.target.value }))} className="input-field md:w-36">
        <option value="All">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={departmentFilter} onChange={(e) => dispatch(filterTasks({ department: e.target.value }))} className="input-field md:w-44">
        <option value="All">All departments</option>
        {departments.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>
      <select value={sortBy} onChange={(e) => dispatch(setTaskSort(e.target.value))} className="input-field md:w-48">
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
