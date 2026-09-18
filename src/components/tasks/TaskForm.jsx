import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["To Do", "In Progress", "Completed"];

export default function TaskForm({ initialValues, onSubmit, onCancel, submitLabel = "Save task" }) {
  const departments = useSelector((state) => state.departments.departments);
  const employees = useSelector((state) => state.employees.employees);

  const [values, setValues] = useState(
    initialValues || {
      title: "",
      description: "",
      assignedEmployee: employees[0]?.id || "",
      department: departments[0]?.name || "",
      priority: "Medium",
      status: "To Do",
      dueDate: new Date().toISOString().slice(0, 10),
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.title?.trim()) next.title = "Title is required.";
    if (!values.description?.trim()) next.description = "Description is required.";
    if (!values.assignedEmployee) next.assignedEmployee = "Assign this task to someone.";
    if (!values.dueDate) next.dueDate = "Due date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" name="title" value={values.title} onChange={handleChange("title")} error={errors.title} placeholder="e.g. Ship dashboard redesign" />
      <div>
        <label className="label-text" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={values.description}
          onChange={handleChange("description")}
          className={`input-field resize-none ${errors.description ? "border-coral focus:border-coral" : ""}`}
          placeholder="What needs to get done?"
        />
        {errors.description && <p className="mt-1 text-xs text-coral">{errors.description}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Assigned employee"
          name="assignedEmployee"
          value={values.assignedEmployee}
          onChange={handleChange("assignedEmployee")}
          error={errors.assignedEmployee}
          options={employees.map((e) => ({ value: e.id, label: e.name }))}
        />
        <Select
          label="Department"
          name="department"
          value={values.department}
          onChange={handleChange("department")}
          options={departments.map((d) => ({ value: d.name, label: d.name }))}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Select
          label="Priority"
          name="priority"
          value={values.priority}
          onChange={handleChange("priority")}
          options={PRIORITIES.map((p) => ({ value: p, label: p }))}
        />
        <Select
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange("status")}
          options={STATUSES.map((s) => ({ value: s, label: s }))}
        />
        <Input label="Due date" type="date" name="dueDate" value={values.dueDate} onChange={handleChange("dueDate")} error={errors.dueDate} />
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
