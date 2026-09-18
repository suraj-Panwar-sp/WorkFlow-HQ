import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import { STATUS_STYLES, formatDate } from "../../utils/helpers";
import { deleteEmployee } from "../../features/employees/employeeSlice";
import { openModal, addToast } from "../../features/ui/uiSlice";

export default function EmployeeTable({ employees }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (employee) => {
    dispatch(
      openModal({
        type: "confirm",
        payload: {
          title: "Delete employee",
          message: `Remove ${employee.name} from WorkFlow? This can't be undone.`,
          confirmLabel: "Delete",
          onConfirm: () => {
            dispatch(deleteEmployee(employee.id));
            dispatch(addToast({ message: `${employee.name} was removed.`, variant: "success" }));
          },
        },
      })
    );
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-600 text-left text-xs text-paper-100/45">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">Department</th>
              <th className="px-5 py-3 font-medium hidden lg:table-cell">Position</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium hidden sm:table-cell">Performance</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-600">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-ink-600/40 transition-colors">
                <td className="px-5 py-3">
                  <Link to={`/employees/${emp.id}`} className="flex items-center gap-3 min-w-[180px]">
                    <Avatar name={emp.name} size="sm" />
                    <div className="min-w-0">
                      <p className="font-medium text-paper-100 truncate">{emp.name}</p>
                      <p className="text-xs text-paper-100/45 truncate">{emp.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-3 text-paper-100/70 hidden md:table-cell">{emp.department}</td>
                <td className="px-5 py-3 text-paper-100/70 hidden lg:table-cell">{emp.position}</td>
                <td className="px-5 py-3">
                  <Badge className={STATUS_STYLES[emp.status]}>{emp.status}</Badge>
                </td>
                <td className="px-5 py-3 text-paper-100/70 tabular-nums hidden sm:table-cell">{emp.performanceScore}%</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => navigate(`/employees/edit/${emp.id}`)}
                      className="p-2 rounded-md text-paper-100/50 hover:text-ion hover:bg-ink-600"
                      aria-label={`Edit ${emp.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(emp)}
                      className="p-2 rounded-md text-paper-100/50 hover:text-coral hover:bg-ink-600"
                      aria-label={`Delete ${emp.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
