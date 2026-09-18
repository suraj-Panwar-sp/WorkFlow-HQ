export default function Input({ label, error, id, className = "", ...rest }) {
  const inputId = id || rest.name;
  return (
    <div className={className}>
      {label && <label htmlFor={inputId} className="label-text">{label}</label>}
      <input id={inputId} className={`input-field ${error ? "border-coral focus:border-coral" : ""}`} {...rest} />
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
