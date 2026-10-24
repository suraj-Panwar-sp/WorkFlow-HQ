# WorkFlow – Employee Management Dashboard

WorkFlow is an employee management and productivity dashboard built using React, Redux Toolkit, and Tailwind CSS.

I built this project to work on different React concepts, including state management, routing, reusable components, and handling data across multiple pages.

The application allows users to manage employees, assign and track tasks, organize departments, and view productivity statistics from a single dashboard.

**Live Demo:** https://work-flow-hq.vercel.app/

## Tech Stack

- React 19 + Vite
- JavaScript
- Redux Toolkit for state management
- React Router DOM for navigation and protected routes
- Tailwind CSS for styling and responsive layouts
- LocalStorage for storing application data

## Demo Login

You can use the following credentials to explore the dashboard:

- **Email:** admin@workflow.io
- **Password:** admin123

You can also create a new account using the Sign Up page.

## Features

### Authentication
- Login and signup functionality
- Protected routes for authenticated users
- Login session persists after refreshing the page
- Logout functionality

### Employee Management
- Add, edit, and delete employees
- Search employees by name
- Filter employees by department and status
- Sort employee records
- View individual employee profiles

### Task Management
- Create, update, and delete tasks
- Track tasks based on their status
- Set task priorities
- Search, filter, and sort tasks

### Departments
- Add and manage departments
- View employees assigned to each department

### Dashboard & Analytics
- Overview of employees, departments, and tasks
- Recent employee and task activity
- Task status and performance summaries
- Productivity visualizations using CSS progress bars

### Other Features
- Dark and light mode
- Responsive layout for desktop and mobile
- Collapsible sidebar
- Profile settings
- Reset application data option
- Reusable components such as modals, buttons, forms, toasts, and loaders

## Project Structure

```text
src/
├── app/
│   └── store.js
├── features/
│   ├── authSlice
│   ├── employeeSlice
│   ├── taskSlice
│   ├── departmentSlice
│   └── uiSlice
├── components/
│   ├── common/
│   ├── layout/
│   ├── dashboard/
│   ├── employees/
│   ├── tasks/
│   └── departments/
├── pages/
├── routes/
├── utils/
└── data/
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/suraj-Panwar-sp/WorkFlow-HQ.git
```

Go to the project directory:

```bash
cd WorkFlow-HQ
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Note

This is a frontend project, so there is no backend or database connected to it.

Authentication is implemented for demonstration purposes, and application data is stored in the browser using LocalStorage.

Employee records, tasks, departments, and user preferences remain available after refreshing the page.

The Settings page also includes an option to reset all application data.
