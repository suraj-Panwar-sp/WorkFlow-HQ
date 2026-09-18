export default function PerformanceSummary({ employees }) {
  const top = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  return (
    <div className="card p-5">
      <h3 className="font-display font-bold text-paper-100 mb-4">Top performers</h3>
      <div className="space-y-4">
        {top.map((emp) => (
          <div key={emp.id}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-paper-100/70 font-medium truncate">{emp.name}</span>
              <span className="text-paper-100/45 tabular-nums">{emp.performanceScore}%</span>
            </div>
            <div className="h-2 rounded-full bg-ink-600 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-ion to-mint transition-all duration-500" style={{ width: `${emp.performanceScore}%` }} />
            </div>
          </div>
        ))}
        {top.length === 0 && <p className="text-sm text-paper-100/45">No performance data yet.</p>}
      </div>
    </div>
  );
}
