export function generateId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function timeAgo(dateString) {
  if (!dateString) return "—";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateString);
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export const STATUS_STYLES = {
  Active: "bg-mint/15 text-mint",
  Inactive: "bg-coral/15 text-coral",
  "On Leave": "bg-signal/15 text-signal",
};

export const TASK_STATUS_STYLES = {
  "To Do": "bg-ion/15 text-ion",
  "In Progress": "bg-signal/15 text-signal",
  Completed: "bg-mint/15 text-mint",
};

export const PRIORITY_STYLES = {
  Low: "bg-ink-500/60 text-paper-100/70",
  Medium: "bg-ion/15 text-ion",
  High: "bg-coral/15 text-coral",
};

export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isOverdue(dueDate, status) {
  if (!dueDate || status === "Completed") return false;
  return new Date(dueDate).getTime() < Date.now();
}
