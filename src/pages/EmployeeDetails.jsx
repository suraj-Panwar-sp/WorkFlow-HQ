import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import Avatar from "../components/common/Avatar";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import { STATUS_STYLES, TASK_STATUS_STYLES, formatDate } from "../utils/helpers";
import { deleteEmployee } from "../features/employees/employeeSlice";
import { openModal, addToast } from "../features/ui/uiSlice";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employees.find((e) => e.id === id));
  const tasks = useSelector((state) => state.tasks.tasks.filter((t) => t.assignedEmployee === id));

  if (!employee) {
    return (
      <EmptyState
        title="Employee not found"
        message="This employee may have been removed."
        action={
          <Link to="/employees" className="btn-primary">
            Back to employees
          </Link>
        }
      />
    );
  }

  const handleDelete = () => {
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
            navigate("/employees");
          },
        },
      })
    );
  };

  return (
    <div>
      <PageHeader
        title="Employee profile"
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate(`/employees/edit/${employee.id}`)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card p-6 lg:col-span-1 flex flex-col items-center text-center">
          <Avatar name={employee.name} size="lg" />
          <h2 className="font-display text-xl font-bold text-paper-100 mt-4">{employee.name}</h2>
          <p className="text-sm text-paper-100/50">{employee.position}</p>
          <Badge className={`${STATUS_STYLES[employee.status]} mt-3`}>{employee.status}</Badge>

          <div className="w-full mt-6 pt-6 border-t border-ink-600 text-left space-y-3 text-sm">
            <Row label="Email" value={employee.email} />
            <Row label="Phone" value={employee.phone} />
            <Row label="Department" value={employee.department} />
            <Row label="Joined" value={formatDate(employee.joiningDate)} />
            <Row label="Performance" value={`${employee.performanceScore}%`} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5">
            <h3 className="font-display font-bold text-paper-100 mb-2">Performance score</h3>
            <div className="h-2.5 rounded-full bg-ink-600 overflow-hidden mb-2">
              <div className="h-full rounded-full bg-gradient-to-r from-ion to-mint" style={{ width: `${employee.performanceScore}%` }} />
            </div>
            <p className="text-xs text-paper-100/45">{employee.performanceScore}% of target performance this cycle</p>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-bold text-paper-100 mb-4">Assigned tasks ({tasks.length})</h3>
            {tasks.length === 0 ? (
              <p className="text-sm text-paper-100/45">No tasks assigned to this employee yet.</p>
            ) : (
              <ul className="divide-y divide-ink-600">
                {tasks.map((task) => (
                  <li key={task.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/tasks/${task.id}`} className="text-sm font-medium text-paper-100 hover:text-signal truncate block">
                        {task.title}
                      </Link>
                      <p className="text-xs text-paper-100/45">Due {formatDate(task.dueDate)}</p>
                    </div>
                    <Badge className={TASK_STATUS_STYLES[task.status]}>{task.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-paper-100/45">{label}</span>
      <span className="text-paper-100/85 font-medium truncate">{value}</span>
    </div>
  );
}
