import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastContainer from "../common/ToastContainer";
import ConfirmModal from "../common/ConfirmModal";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-ink-900">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}
