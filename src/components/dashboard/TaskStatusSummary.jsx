const BAR_COLORS = {
  "To Do": "bg-ion",
  "In Progress": "bg-signal",
  Completed: "bg-mint",
};

export default function TaskStatusSummary({ tasks }) {
  const total = tasks.length || 1;
  const statuses = ["To Do", "In Progress", "Completed"];
  const counts = statuses.map((status) => tasks.filter((t) => t.status === status).length);

  return (
    <div className="card p-5">
      <h3 className="font-display font-bold text-paper-100 mb-4">Task status summary</h3>
      <div className="space-y-4">
        {statuses.map((status, i) => (
          <div key={status}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-paper-100/70 font-medium">{status}</span>
              <span className="text-paper-100/45 tabular-nums">{counts[i]}</span>
            </div>
            <div className="h-2 rounded-full bg-ink-600 overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[status]} transition-all duration-500`}
                style={{ width: `${(counts[i] / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
