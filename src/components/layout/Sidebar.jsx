import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../features/ui/uiSlice";

const ICONS = {
  dashboard: <path d="M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-5H4v5ZM14 4v5h6V4h-6Z" />,
  employees: <path d="M16 14a4 4 0 1 0-4-4M16 14a4 4 0 0 1 4 4v1H8v-1a4 4 0 0 1 4-4m4 0a4 4 0 0 0-4 0M4 19v-1a3 3 0 0 1 3-3h1" />,
  tasks: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  departments: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
  analytics: <path d="M4 20V10M12 20V4M20 20v-7" />,
  settings: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />,
};

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/employees", label: "Employees", icon: "employees" },
  { to: "/tasks", label: "Tasks", icon: "tasks" },
  { to: "/departments", label: "Departments", icon: "departments" },
  { to: "/analytics", label: "Analytics", icon: "analytics" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <>
      
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950/70 lg:hidden test" onClick={() => dispatch(closeSidebar())} />
      )}

      <aside
        className={`fixed z-50 lg:z-0 top-0 left-0 h-full w-64 bg-ink-800 border-r border-ink-600 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:sticky ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-ink-600">
          <div className="h-8 w-8 rounded-lg bg-signal flex items-center justify-center font-display font-extrabold text-ink-950">
            W
          </div>
          <span className="font-display font-extrabold text-paper-100 tracking-tight">WorkFlow</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => dispatch(closeSidebar())}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-ink-600 text-xs text-paper-100/40">
          WorkFlow v1.0 · Employee productivity, in one place.
        </div>
      </aside>
    </>
  );
}
