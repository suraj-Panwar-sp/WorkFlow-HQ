import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { isValidEmail } from "../../utils/helpers";

const STATUS_OPTIONS = ["Active", "Inactive", "On Leave"];

export default function EmployeeForm({ initialValues, onSubmit, onCancel, submitLabel = "Save employee" }) {
  const departments = useSelector((state) => state.departments.departments);
  const [values, setValues] = useState(
    initialValues || {
      name: "",
      email: "",
      phone: "",
      department: departments[0]?.name || "",
      position: "",
      status: "Active",
      joiningDate: new Date().toISOString().slice(0, 10),
      performanceScore: 75,
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name?.trim()) next.name = "Name is required.";
    if (!values.email?.trim()) next.email = "Email is required.";
    else if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.phone?.trim()) next.phone = "Phone number is required.";
    if (!values.position?.trim()) next.position = "Position is required.";
    if (!values.joiningDate) next.joiningDate = "Joining date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...values, performanceScore: Number(values.performanceScore) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full name" name="name" value={values.name} onChange={handleChange("name")} error={errors.name} placeholder="e.g. Priya Nair" />
        <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange("email")} error={errors.email} placeholder="name@workflow.io" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Phone" name="phone" value={values.phone} onChange={handleChange("phone")} error={errors.phone} placeholder="+91 98xxx xxxxx" />
        <Input label="Position" name="position" value={values.position} onChange={handleChange("position")} error={errors.position} placeholder="e.g. Frontend Developer" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Department"
          name="department"
          value={values.department}
          onChange={handleChange("department")}
          options={departments.map((d) => ({ value: d.name, label: d.name }))}
        />
        <Select
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange("status")}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Joining date" type="date" name="joiningDate" value={values.joiningDate} onChange={handleChange("joiningDate")} error={errors.joiningDate} />
        <Input label="Performance score (0–100)" type="number" min="0" max="100" name="performanceScore" value={values.performanceScore} onChange={handleChange("performanceScore")} />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
