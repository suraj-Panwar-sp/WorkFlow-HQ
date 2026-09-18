const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

export default function Button({ variant = "primary", type = "button", className = "", icon, isLoading, children, ...rest }) {
  return (
    <button type={type} className={`${VARIANTS[variant]} ${className}`} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading ? (
        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
