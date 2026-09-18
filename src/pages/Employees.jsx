import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";

export default function Employees() {
  const { employees, searchQuery, departmentFilter, statusFilter, sortBy } = useSelector((state) => state.employees);

  const visibleEmployees = useMemo(() => {
    let list = [...employees];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.position.toLowerCase().includes(q)
      );
    }
    if (departmentFilter !== "All") list = list.filter((e) => e.department === departmentFilter);
    if (statusFilter !== "All") list = list.filter((e) => e.status === statusFilter);

    switch (sortBy) {
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "performance-desc":
        list.sort((a, b) => b.performanceScore - a.performanceScore);
        break;
      case "joiningDate-desc":
        list.sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));
        break;
      default:
        list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [employees, searchQuery, departmentFilter, statusFilter, sortBy]);

  return (
    <div>
      <PageHeader
        title="Employees"
        description={`${employees.length} people across your organization`}
        actions={
          <Link to="/employees/add" className="btn-primary">
            + Add employee
          </Link>
        }
      />

      <EmployeeFilters />

      {visibleEmployees.length > 0 ? (
        <EmployeeTable employees={visibleEmployees} />
      ) : (
        <EmptyState
          title="No employees found"
          message="Try adjusting your search or filters, or add a new employee to get started."
          action={
            <Link to="/employees/add" className="btn-primary">
              + Add employee
            </Link>
          }
        />
      )}
    </div>
  );
}
