// Seed data used the very first time the app runs (before LocalStorage owns the state).

export const dummyDepartments = [
  { id: "dept_1", name: "Engineering", description: "Builds and maintains WorkFlow's core product.", manager: "Ravi Menon" },
  { id: "dept_2", name: "Design", description: "Owns product design, brand and user research.", manager: "Anaya Kapoor" },
  { id: "dept_3", name: "Marketing", description: "Drives growth, content and campaigns.", manager: "Farah Iqbal" },
  { id: "dept_4", name: "Sales", description: "Manages the pipeline and client relationships.", manager: "Dev Prakash" },
  { id: "dept_5", name: "Human Resources", description: "Hiring, onboarding and employee wellbeing.", manager: "Neha Sethi" },
  { id: "dept_6", name: "Finance", description: "Budgeting, payroll and financial reporting.", manager: "Arjun Bhatt" },
];

export const dummyEmployees = [
  { id: "emp_1", name: "Ravi Menon", email: "ravi.menon@workflow.io", phone: "+91 98200 11223", department: "Engineering", position: "Engineering Manager", status: "Active", avatar: "", joiningDate: "2021-03-14", performanceScore: 92 },
  { id: "emp_2", name: "Priya Nair", email: "priya.nair@workflow.io", phone: "+91 98210 33445", department: "Engineering", position: "Frontend Developer", status: "Active", avatar: "", joiningDate: "2022-06-01", performanceScore: 88 },
  { id: "emp_3", name: "Suraj Verma", email: "suraj.verma@workflow.io", phone: "+91 98220 55667", department: "Engineering", position: "Frontend Developer", status: "Active", avatar: "", joiningDate: "2023-01-19", performanceScore: 95 },
  { id: "emp_4", name: "Anaya Kapoor", email: "anaya.kapoor@workflow.io", phone: "+91 98230 77889", department: "Design", position: "Design Lead", status: "Active", avatar: "", joiningDate: "2020-11-02", performanceScore: 90 },
  { id: "emp_5", name: "Kabir Singh", email: "kabir.singh@workflow.io", phone: "+91 98240 99001", department: "Design", position: "Product Designer", status: "On Leave", avatar: "", joiningDate: "2022-09-12", performanceScore: 76 },
  { id: "emp_6", name: "Farah Iqbal", email: "farah.iqbal@workflow.io", phone: "+91 98250 11002", department: "Marketing", position: "Marketing Manager", status: "Active", avatar: "", joiningDate: "2021-07-23", performanceScore: 84 },
  { id: "emp_7", name: "Ishaan Roy", email: "ishaan.roy@workflow.io", phone: "+91 98260 22334", department: "Marketing", position: "Content Strategist", status: "Active", avatar: "", joiningDate: "2023-04-08", performanceScore: 79 },
  { id: "emp_8", name: "Dev Prakash", email: "dev.prakash@workflow.io", phone: "+91 98270 44556", department: "Sales", position: "Sales Manager", status: "Active", avatar: "", joiningDate: "2019-05-30", performanceScore: 87 },
  { id: "emp_9", name: "Meera Joshi", email: "meera.joshi@workflow.io", phone: "+91 98280 66778", department: "Sales", position: "Account Executive", status: "Inactive", avatar: "", joiningDate: "2022-02-14", performanceScore: 61 },
  { id: "emp_10", name: "Neha Sethi", email: "neha.sethi@workflow.io", phone: "+91 98290 88990", department: "Human Resources", position: "HR Manager", status: "Active", avatar: "", joiningDate: "2020-08-19", performanceScore: 91 },
  { id: "emp_11", name: "Arjun Bhatt", email: "arjun.bhatt@workflow.io", phone: "+91 98300 10112", department: "Finance", position: "Finance Manager", status: "Active", avatar: "", joiningDate: "2021-01-11", performanceScore: 89 },
  { id: "emp_12", name: "Sana Malhotra", email: "sana.malhotra@workflow.io", phone: "+91 98310 21223", department: "Engineering", position: "Backend Developer", status: "Active", avatar: "", joiningDate: "2023-08-21", performanceScore: 83 },
];

const today = new Date();
const inDays = (n) => new Date(today.getTime() + n * 86400000).toISOString().slice(0, 10);

export const dummyTasks = [
  { id: "task_1", title: "Ship dashboard redesign", description: "Finalize the new admin dashboard layout and ship behind a feature flag.", assignedEmployee: "emp_3", department: "Engineering", priority: "High", status: "In Progress", dueDate: inDays(3), createdAt: inDays(-6) },
  { id: "task_2", title: "Fix login redirect bug", description: "Authenticated users occasionally land on a blank screen after login.", assignedEmployee: "emp_2", department: "Engineering", priority: "High", status: "To Do", dueDate: inDays(1), createdAt: inDays(-2) },
  { id: "task_3", title: "Design onboarding illustrations", description: "Create a set of illustrations for the new-user onboarding flow.", assignedEmployee: "emp_5", department: "Design", priority: "Medium", status: "In Progress", dueDate: inDays(5), createdAt: inDays(-4) },
  { id: "task_4", title: "Q3 brand refresh review", description: "Review the updated brand guidelines with stakeholders.", assignedEmployee: "emp_4", department: "Design", priority: "Low", status: "Completed", dueDate: inDays(-2), createdAt: inDays(-10) },
  { id: "task_5", title: "Launch product hunt campaign", description: "Coordinate assets and timing for the Product Hunt launch.", assignedEmployee: "emp_6", department: "Marketing", priority: "High", status: "To Do", dueDate: inDays(2), createdAt: inDays(-1) },
  { id: "task_6", title: "Write Q3 newsletter", description: "Draft and schedule the quarterly newsletter.", assignedEmployee: "emp_7", department: "Marketing", priority: "Medium", status: "In Progress", dueDate: inDays(4), createdAt: inDays(-3) },
  { id: "task_7", title: "Renew enterprise contract", description: "Follow up with legal on the enterprise renewal for Nimbus Corp.", assignedEmployee: "emp_8", department: "Sales", priority: "High", status: "To Do", dueDate: inDays(-1), createdAt: inDays(-7) },
  { id: "task_8", title: "Update sales deck", description: "Refresh the pitch deck with new case studies.", assignedEmployee: "emp_9", department: "Sales", priority: "Low", status: "Completed", dueDate: inDays(-5), createdAt: inDays(-12) },
  { id: "task_9", title: "Plan Q4 hiring roadmap", description: "Align with department leads on Q4 headcount needs.", assignedEmployee: "emp_10", department: "Human Resources", priority: "Medium", status: "In Progress", dueDate: inDays(6), createdAt: inDays(-2) },
  { id: "task_10", title: "Close October payroll", description: "Verify and submit October payroll before the deadline.", assignedEmployee: "emp_11", department: "Finance", priority: "High", status: "To Do", dueDate: inDays(0), createdAt: inDays(-1) },
  { id: "task_11", title: "API rate-limit rollout", description: "Roll out rate limiting on public API endpoints.", assignedEmployee: "emp_12", department: "Engineering", priority: "Medium", status: "To Do", dueDate: inDays(7), createdAt: inDays(-1) },
  { id: "task_12", title: "Employee satisfaction survey", description: "Send and collect responses for the quarterly survey.", assignedEmployee: "emp_10", department: "Human Resources", priority: "Low", status: "Completed", dueDate: inDays(-8), createdAt: inDays(-15) },
];

export const dummyUsers = [
  { id: "user_1", name: "Admin User", email: "admin@workflow.io", password: "admin123", role: "Administrator" },
];
