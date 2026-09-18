export default function Select({ label, error, id, options = [], className = "", ...rest }) {
  const selectId = id || rest.name;
  return (
    <div className={className}>
      {label && <label htmlFor={selectId} className="label-text">{label}</label>}
      <select id={selectId} className={`input-field ${error ? "border-coral focus:border-coral" : ""}`} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
