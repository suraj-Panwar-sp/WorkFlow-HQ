# WorkFlow – Employee Management & Productivity Dashboard

A frontend-only, resume-ready SaaS admin dashboard built with React, React Router DOM, Redux Toolkit, Tailwind CSS and LocalStorage persistence. No backend, no database — everything runs in the browser.

## Tech stack

- React 19 + Vite
- React Router DOM (protected/public routes, nested routes, `useParams`, `useNavigate`)
- Redux Toolkit (`authSlice`, `employeeSlice`, `taskSlice`, `departmentSlice`, `uiSlice`)
- Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- Browser LocalStorage for persistence (`src/utils/localStorage.js`)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Demo login

The login screen is pre-filled with a working demo account:

- **Email:** `admin@workflow.io`
- **Password:** `admin123`

You can also create a brand-new account from the Sign Up page — it's stored in LocalStorage under `workflow_registered_users`.

## Features

- Dummy authentication with protected routes, persisted login, and redirect-away-from-login when already signed in
- Employee management: search, filter by department/status, sort, add/edit/delete, detail profile page
- Task management: kanban-style status control, priority, filters, search, sort, add/edit/delete
- Department management with team rosters
- Dashboard with live stats, recent activity, task-status and performance summaries
- Analytics page with CSS-only progress-bar visualizations (no chart library, no backend)
- Settings: dark/light theme (persisted), profile fields, and a full "reset application data" action
- Reusable UI kit: buttons, inputs, selects, modal, confirm-delete modal, toasts, avatars, badges, empty states, loaders
- Fully responsive: collapsible/slide-in sidebar on mobile, responsive tables and grids

## Project structure

```
src/
├── app/store.js              Redux store + LocalStorage sync
├── features/                 authSlice, employeeSlice, taskSlice, departmentSlice, uiSlice
├── components/
│   ├── common/                Button, Input, Select, Modal, ConfirmModal, Toast, Avatar, Badge, EmptyState, Loader, PageHeader
│   ├── layout/                Sidebar, Topbar, DashboardLayout
│   ├── dashboard/              StatCard, RecentEmployees, RecentTasks, TaskStatusSummary, PerformanceSummary
│   ├── employees/              EmployeeForm, EmployeeTable, EmployeeFilters
│   ├── tasks/                  TaskForm, TaskCard, TaskFilters
│   └── departments/            DepartmentForm, DepartmentCard
├── pages/                     One page component per route
├── routes/                    ProtectedRoute, PublicRoute
├── utils/                     localStorage.js, helpers.js
└── data/dummyData.js          Seed data for the first run
```

## Notes

- All data (employees, tasks, departments, theme, session) persists to LocalStorage and survives a page refresh.
- "Reset application data" on the Settings page clears every WorkFlow key and returns you to the login screen.
