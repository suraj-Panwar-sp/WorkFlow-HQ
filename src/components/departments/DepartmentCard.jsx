import { useDispatch, useSelector } from "react-redux";
import { deleteDepartment } from "../../features/departments/departmentSlice";
import { openModal, addToast } from "../../features/ui/uiSlice";
import Avatar from "../common/Avatar";

export default function DepartmentCard({ department }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees.filter((e) => e.department === department.name));

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "confirm",
        payload: {
          title: "Delete department",
          message: `Remove "${department.name}"? Employees already assigned to it will keep the label until reassigned.`,
          confirmLabel: "Delete",
          onConfirm: () => {
            dispatch(deleteDepartment(department.id));
            dispatch(addToast({ message: `${department.name} was removed.`, variant: "success" }));
          },
        },
      })
    );
  };

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-paper-100">{department.name}</h3>
          <p className="text-xs text-paper-100/45 mt-0.5">Managed by {department.manager}</p>
        </div>
        <button onClick={handleDelete} className="p-1.5 rounded-md text-paper-100/40 hover:text-coral hover:bg-ink-600" aria-label={`Delete ${department.name}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-paper-100/60">{department.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-ink-600">
        <div className="flex -space-x-2">
          {employees.slice(0, 4).map((e) => (
            <div key={e.id} className="ring-2 ring-ink-700 rounded-full">
              <Avatar name={e.name} size="sm" />
            </div>
          ))}
        </div>
        <span className="text-xs font-medium text-paper-100/50">{employees.length} member{employees.length !== 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}
