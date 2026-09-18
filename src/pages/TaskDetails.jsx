import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import TaskForm from "../components/tasks/TaskForm";
import Avatar from "../components/common/Avatar";
import { TASK_STATUS_STYLES, PRIORITY_STYLES, formatDate, isOverdue } from "../utils/helpers";
import { updateTask, deleteTask } from "../features/tasks/taskSlice";
import { openModal, addToast } from "../features/ui/uiSlice";

export default function TaskDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === id));
  const assignee = useSelector((state) => state.employees.employees.find((e) => e.id === task?.assignedEmployee));
  const [showEdit, setShowEdit] = useState(false);

  if (!task) {
    return (
      <EmptyState
        title="Task not found"
        message="This task may have been removed."
        action={
          <Link to="/tasks" className="btn-primary">
            Back to tasks
          </Link>
        }
      />
    );
  }

  const overdue = isOverdue(task.dueDate, task.status);

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "confirm",
        payload: {
          title: "Delete task",
          message: `Remove "${task.title}"? This can't be undone.`,
          confirmLabel: "Delete",
          onConfirm: () => {
            dispatch(deleteTask(task.id));
            dispatch(addToast({ message: "Task deleted.", variant: "success" }));
            navigate("/tasks");
          },
        },
      })
    );
  };

  const handleUpdate = (values) => {
    dispatch(updateTask({ id, ...values }));
    dispatch(addToast({ message: "Task updated.", variant: "success" }));
    setShowEdit(false);
  };

  return (
    <div>
      <PageHeader
        title="Task details"
        actions={
          <>
            <Button variant="secondary" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className={TASK_STATUS_STYLES[task.status]}>{task.status}</Badge>
            <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority} priority</Badge>
            {overdue && <Badge className="bg-coral/15 text-coral">Overdue</Badge>}
          </div>
          <h1 className="font-display text-xl font-bold text-paper-100 mb-3">{task.title}</h1>
          <p className="text-sm text-paper-100/65 leading-relaxed">{task.description}</p>
        </div>

        <div className="card p-6 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Avatar name={assignee?.name || "?"} size="sm" />
            <div>
              <p className="text-paper-100 font-medium">{assignee?.name || "Unassigned"}</p>
              <p className="text-paper-100/45 text-xs">Assigned to</p>
            </div>
          </div>
          <div className="pt-4 border-t border-ink-600 space-y-3">
            <Row label="Department" value={task.department} />
            <Row label="Due date" value={formatDate(task.dueDate)} />
            <Row label="Created" value={formatDate(task.createdAt)} />
          </div>
        </div>
      </div>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit task" size="lg">
        <TaskForm initialValues={task} onSubmit={handleUpdate} onCancel={() => setShowEdit(false)} submitLabel="Save changes" />
      </Modal>
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
