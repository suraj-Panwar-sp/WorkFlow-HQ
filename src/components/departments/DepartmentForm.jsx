import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function DepartmentForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState({ name: "", description: "", manager: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name?.trim()) next.name = "Department name is required.";
    if (!values.manager?.trim()) next.manager = "Manager name is required.";
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
      <Input label="Department name" name="name" value={values.name} onChange={handleChange("name")} error={errors.name} placeholder="e.g. Customer Success" />
      <Input label="Manager" name="manager" value={values.manager} onChange={handleChange("manager")} error={errors.manager} placeholder="e.g. Rohan Gupta" />
      <div>
        <label className="label-text" htmlFor="dept-description">Description</label>
        <textarea
          id="dept-description"
          rows={3}
          value={values.description}
          onChange={handleChange("description")}
          className="input-field resize-none"
          placeholder="What does this team own?"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Add department</Button>
      </div>
    </form>
  );
}
