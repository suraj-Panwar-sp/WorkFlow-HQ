import { getInitials } from "../../utils/helpers";

const COLORS = ["bg-signal/20 text-signal", "bg-ion/20 text-ion", "bg-mint/20 text-mint", "bg-coral/20 text-coral"];

function colorFor(name = "") {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLORS[sum % COLORS.length];
}

export default function Avatar({ name, size = "md" }) {
  const sizes = { sm: "h-7 w-7 text-xs", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-lg" };
  return (
    <div
      className={`shrink-0 flex items-center justify-center rounded-full font-display font-bold ${sizes[size]} ${colorFor(name)}`}
      aria-hidden="true"
    >
      {getInitials(name) || "?"}
    </div>
  );
}
