import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import EmptyState from "../components/common/EmptyState";
import DepartmentCard from "../components/departments/DepartmentCard";
import DepartmentForm from "../components/departments/DepartmentForm";
import { addDepartment } from "../features/departments/departmentSlice";
import { addToast } from "../features/ui/uiSlice";

export default function Departments() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (values) => {
    dispatch(addDepartment(values));
    dispatch(addToast({ message: `${values.name} was added.`, variant: "success" }));
    setShowAddModal(false);
  };

  return (
    <div>
      <PageHeader
        title="Departments"
        description={`${departments.length} teams across your organization`}
        actions={
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add department
          </button>
        }
      />

      {departments.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No departments yet"
          message="Create your first department to start organizing your team."
          action={
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add department
            </button>
          }
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add department">
        <DepartmentForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}
