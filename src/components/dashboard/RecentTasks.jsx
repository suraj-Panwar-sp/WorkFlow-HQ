import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import { TASK_STATUS_STYLES, formatDate } from "../../utils/helpers";

export default function RecentTasks({ tasks }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-paper-100">Recent tasks</h3>
        <Link to="/tasks" className="text-xs font-semibold text-ion hover:text-ion-light">
          View all
        </Link>
      </div>
      <ul className="divide-y divide-ink-600">
        {tasks.map((task) => (
          <li key={task.id} className="py-3 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <Link to={`/tasks/${task.id}`} className="text-sm font-medium text-paper-100 hover:text-signal truncate block">
                {task.title}
              </Link>
              <p className="text-xs text-paper-100/45 truncate">{task.department} · Due {formatDate(task.dueDate)}</p>
            </div>
            <Badge className={TASK_STATUS_STYLES[task.status]}>{task.status}</Badge>
          </li>
        ))}
        {tasks.length === 0 && <p className="text-sm text-paper-100/45 py-4">No tasks yet.</p>}
      </ul>
    </div>
  );
}
