import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../common/Badge";
import { TASK_STATUS_STYLES, PRIORITY_STYLES, formatDate, isOverdue } from "../../utils/helpers";
import { updateTaskStatus, deleteTask } from "../../features/tasks/taskSlice";
import { openModal, addToast } from "../../features/ui/uiSlice";

const STATUSES = ["To Do", "In Progress", "Completed"];

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignee = useSelector((state) => state.employees.employees.find((e) => e.id === task.assignedEmployee));
  const overdue = isOverdue(task.dueDate, task.status);

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "confirm",
        payload: {
          title: "Delete task",
          message: `Remove "${task.title}" from the board? This can't be undone.`,
          confirmLabel: "Delete",
          onConfirm: () => {
            dispatch(deleteTask(task.id));
            dispatch(addToast({ message: "Task deleted.", variant: "success" }));
          },
        },
      })
    );
  };

  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/tasks/${task.id}`} className="font-medium text-sm text-paper-100 hover:text-signal">
          {task.title}
        </Link>
        <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority}</Badge>
      </div>
      <p className="text-xs text-paper-100/50 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-paper-100/45">
        <span>{assignee?.name || "Unassigned"}</span>
        <span className={overdue ? "text-coral font-medium" : ""}>{overdue ? "Overdue · " : "Due "}{formatDate(task.dueDate)}</span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-ink-600 mt-1">
        <select
          value={task.status}
          onChange={(e) => dispatch(updateTaskStatus({ id: task.id, status: e.target.value }))}
          className={`text-xs font-semibold rounded-md px-2 py-1.5 border-0 outline-none cursor-pointer ${TASK_STATUS_STYLES[task.status]}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="bg-ink-700 text-paper-100">
              {s}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/tasks/${task.id}`)} className="p-1.5 rounded-md text-paper-100/45 hover:text-ion hover:bg-ink-600" aria-label="View task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button onClick={handleDelete} className="p-1.5 rounded-md text-paper-100/45 hover:text-coral hover:bg-ink-600" aria-label="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
