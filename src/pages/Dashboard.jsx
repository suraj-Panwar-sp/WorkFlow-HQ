import { useMemo } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import RecentTasks from "../components/dashboard/RecentTasks";
import TaskStatusSummary from "../components/dashboard/TaskStatusSummary";
import PerformanceSummary from "../components/dashboard/PerformanceSummary";

export default function Dashboard() {
  const employees = useSelector((state) => state.employees.employees);  
  const tasks = useSelector((state) => state.tasks.tasks);
  const departments = useSelector((state) => state.departments.departments);

  const stats = useMemo(() => {
    const activeEmployees = employees.filter((e) => e.status === "Active").length;
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;
    return {
      totalEmployees: employees.length,
      activeEmployees,
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
      departmentsCount: departments.length,
    };
  }, [employees, tasks, departments]);

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);
  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" description="A snapshot of your team's people and work, right now." />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard label="Total employees" value={stats.totalEmployees} accent="ion" />
        <StatCard label="Active employees" value={stats.activeEmployees} accent="mint" />
        <StatCard label="Total tasks" value={stats.totalTasks} accent="signal" />
        <StatCard label="Completed" value={stats.completedTasks} accent="mint" />
        <StatCard label="Pending" value={stats.pendingTasks} accent="coral" />
        <StatCard label="Departments" value={stats.departmentsCount} accent="ion" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <RecentEmployees employees={recentEmployees} />
        <RecentTasks tasks={recentTasks} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <TaskStatusSummary tasks={tasks} />
        <PerformanceSummary employees={employees} />
      </div>
    </div>
  );
}
