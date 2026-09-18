import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import { addTask } from "../features/tasks/taskSlice";
import { addToast } from "../features/ui/uiSlice";

const PRIORITY_RANK = { High: 3, Medium: 2, Low: 1 };

export default function Tasks() {
  const dispatch = useDispatch();
  const { tasks, searchQuery, statusFilter, priorityFilter, departmentFilter, sortBy } = useSelector((state) => state.tasks);
  const [showAddModal, setShowAddModal] = useState(false);

  const visibleTasks = useMemo(() => {
    let list = [...tasks];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") list = list.filter((t) => t.status === statusFilter);
    if (priorityFilter !== "All") list = list.filter((t) => t.priority === priorityFilter);
    if (departmentFilter !== "All") list = list.filter((t) => t.department === departmentFilter);

    switch (sortBy) {
      case "dueDate-desc":
        list.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
      case "priority-desc":
        list.sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]);
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    return list;
  }, [tasks, searchQuery, statusFilter, priorityFilter, departmentFilter, sortBy]);

  const handleAdd = (values) => {
    dispatch(addTask(values));
    dispatch(addToast({ message: `"${values.title}" was added.`, variant: "success" }));
    setShowAddModal(false);
  };

  return (
    <div>
      <PageHeader
        title="Tasks"
        description={`${tasks.length} tasks across your team`}
        actions={
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add task
          </button>
        }
      />

      <TaskFilters />

      {visibleTasks.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tasks found"
          message="Try adjusting your search or filters, or create a new task."
          action={
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add task
            </button>
          }
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add task" size="lg">
        <TaskForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} submitLabel="Add task" />
      </Modal>
    </div>
  );
}
