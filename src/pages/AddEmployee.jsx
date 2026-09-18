import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import EmployeeForm from "../components/employees/EmployeeForm";
import { addEmployee } from "../features/employees/employeeSlice";
import { addToast } from "../features/ui/uiSlice";

export default function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(addEmployee(values));
    dispatch(addToast({ message: `${values.name} was added to the team.`, variant: "success" }));
    navigate("/employees");
  };

  return (
    <div>
      <PageHeader title="Add employee" description="Add a new person to your organization." />
      <div className="card p-6 max-w-3xl">
        <EmployeeForm onSubmit={handleSubmit} onCancel={() => navigate("/employees")} submitLabel="Add employee" />
      </div>
    </div>
  );
}
