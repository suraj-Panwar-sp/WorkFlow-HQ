import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmptyState from "../components/common/EmptyState";
import { updateEmployee } from "../features/employees/employeeSlice";
import { addToast } from "../features/ui/uiSlice";

export default function EditEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) => state.employees.employees.find((e) => e.id === id));

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

  const handleSubmit = (values) => {
    dispatch(updateEmployee({ id, ...values }));
    dispatch(addToast({ message: `${values.name}'s profile was updated.`, variant: "success" }));
    navigate(`/employees/${id}`);
  };

  return (
    <div>
      <PageHeader title="Edit employee" description={`Update details for ${employee.name}.`} />
      <div className="card p-6 max-w-3xl">
        <EmployeeForm initialValues={employee} onSubmit={handleSubmit} onCancel={() => navigate(-1)} submitLabel="Save changes" />
      </div>
    </div>
  );
}
