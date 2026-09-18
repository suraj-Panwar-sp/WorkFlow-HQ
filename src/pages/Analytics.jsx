import { useMemo } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";

const TASK_STATUSES = ["To Do", "In Progress", "Completed"];
const TASK_PRIORITIES = ["Low", "Medium", "High"];
const STATUS_BAR = { "To Do": "bg-ion", "In Progress": "bg-signal", Completed: "bg-mint" };
const PRIORITY_BAR = { Low: "bg-ink-400", Medium: "bg-ion", High: "bg-coral" };

function Bar({ label, value, total, colorClass }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-paper-100/70 font-medium">{label}</span>
        <span className="text-paper-100/45 tabular-nums">{value} · {pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-ink-600 overflow-hidden">
        <div className={`h-full rounded-full ${colorClass} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Analytics() {
  const employees = useSelector((state) => state.employees.employees);
  const tasks = useSelector((state) => state.tasks.tasks);
  const departments = useSelector((state) => state.departments.departments);

  const avgPerformance = useMemo(() => {
    if (!employees.length) return 0;
    return Math.round(employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length);
  }, [employees]);

  const performanceBuckets = useMemo(() => {
    const buckets = { "90–100": 0, "75–89": 0, "60–74": 0, "Below 60": 0 };
    employees.forEach((e) => {
      if (e.performanceScore >= 90) buckets["90–100"]++;
      else if (e.performanceScore >= 75) buckets["75–89"]++;
      else if (e.performanceScore >= 60) buckets["60–74"]++;
      else buckets["Below 60"]++;
    });
    return buckets;
  }, [employees]);

  return (
    <div>
      <PageHeader title="Analytics" description="Performance and workload trends across your organization." />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <p className="text-xs text-paper-100/50 mb-2">Average performance</p>
          <p className="font-display text-3xl font-extrabold text-paper-100">{avgPerformance}%</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-paper-100/50 mb-2">Task completion rate</p>
          <p className="font-display text-3xl font-extrabold text-paper-100">
            {tasks.length ? Math.round((tasks.filter((t) => t.status === "Completed").length / tasks.length) * 100) : 0}%
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-paper-100/50 mb-2">Avg. team size</p>
          <p className="font-display text-3xl font-extrabold text-paper-100">
            {departments.length ? Math.round(employees.length / departments.length) : 0}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="card p-5">
          <h3 className="font-display font-bold text-paper-100 mb-4">Tasks by status</h3>
          <div className="space-y-4">
            {TASK_STATUSES.map((s) => (
              <Bar key={s} label={s} value={tasks.filter((t) => t.status === s).length} total={tasks.length} colorClass={STATUS_BAR[s]} />
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-bold text-paper-100 mb-4">Tasks by priority</h3>
          <div className="space-y-4">
            {TASK_PRIORITIES.map((p) => (
              <Bar key={p} label={p} value={tasks.filter((t) => t.priority === p).length} total={tasks.length} colorClass={PRIORITY_BAR[p]} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-display font-bold text-paper-100 mb-4">Department distribution</h3>
          <div className="space-y-4">
            {departments.map((d) => {
              const count = employees.filter((e) => e.department === d.name).length;
              return <Bar key={d.id} label={d.name} value={count} total={employees.length} colorClass="bg-ion" />;
            })}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-bold text-paper-100 mb-4">Performance distribution</h3>
          <div className="space-y-4">
            {Object.entries(performanceBuckets).map(([label, count]) => (
              <Bar key={label} label={label} value={count} total={employees.length} colorClass="bg-mint" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
