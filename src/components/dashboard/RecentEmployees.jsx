import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import { STATUS_STYLES, formatDate } from "../../utils/helpers";

export default function RecentEmployees({ employees }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-paper-100">Recent employees</h3>
        <Link to="/employees" className="text-xs font-semibold text-ion hover:text-ion-light">
          View all
        </Link>
      </div>
      <ul className="divide-y divide-ink-600">
        {employees.map((emp) => (
          <li key={emp.id} className="py-3 flex items-center gap-3">
            <Avatar name={emp.name} size="sm" />
            <div className="min-w-0 flex-1">
              <Link to={`/employees/${emp.id}`} className="text-sm font-medium text-paper-100 hover:text-signal truncate block">
                {emp.name}
              </Link>
              <p className="text-xs text-paper-100/45 truncate">{emp.position} · Joined {formatDate(emp.joiningDate)}</p>
            </div>
            <Badge className={STATUS_STYLES[emp.status]}>{emp.status}</Badge>
          </li>
        ))}
        {employees.length === 0 && <p className="text-sm text-paper-100/45 py-4">No employees yet.</p>}
      </ul>
    </div>
  );
}
