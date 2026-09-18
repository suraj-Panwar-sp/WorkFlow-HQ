import { useDispatch, useSelector } from "react-redux";
import { searchEmployees, filterEmployees, setEmployeeSort } from "../../features/employees/employeeSlice";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "performance-desc", label: "Performance (high–low)" },
  { value: "joiningDate-desc", label: "Newest joined" },
];

export default function EmployeeFilters() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);
  const { searchQuery, departmentFilter, statusFilter, sortBy } = useSelector((state) => state.employees);

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
          onChange={(e) => dispatch(searchEmployees(e.target.value))}
          placeholder="Search by name, email or position…"
          className="input-field pl-9"
        />
      </div>
      <select
        value={departmentFilter}
        onChange={(e) => dispatch(filterEmployees({ department: e.target.value }))}
        className="input-field md:w-44"
      >
        <option value="All">All departments</option>
        {departments.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={(e) => dispatch(filterEmployees({ status: e.target.value }))}
        className="input-field md:w-40"
      >
        <option value="All">All statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="On Leave">On Leave</option>
      </select>
      <select value={sortBy} onChange={(e) => dispatch(setEmployeeSort(e.target.value))} className="input-field md:w-48">
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
