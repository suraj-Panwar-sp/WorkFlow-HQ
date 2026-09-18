import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../features/ui/uiSlice";
import { logout } from "../../features/auth/authSlice";
import { addToast } from "../../features/ui/uiSlice";
import Avatar from "../common/Avatar";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addToast({ message: "You've been logged out.", variant: "info" }));
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 sm:px-6 bg-ink-900/90 backdrop-blur border-b border-ink-600">
      <button
        onClick={() => dispatch(toggleSidebar())}
        aria-label="Toggle navigation"
        className="lg:hidden p-2 -ml-2 rounded-lg text-paper-100/70 hover:bg-ink-600"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex-1">
        <p className="text-sm text-paper-100/45">
          Welcome back, <span className="text-paper-100/80 font-medium">{user?.name?.split(" ")[0] || "there"}</span>
        </p>
      </div>

      <div className="relative ml-auto">
        <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-lg p-1 hover:bg-ink-600" aria-haspopup="true" aria-expanded={menuOpen}>
          <Avatar name={user?.name} size="sm" />
          <span className="hidden sm:block text-sm font-medium text-paper-100/85">{user?.name}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-paper-100/40">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 mt-2 w-52 card z-20 p-1.5">
              <div className="px-3 py-2 border-b border-ink-500 mb-1">
                <p className="text-sm font-medium text-paper-100 truncate">{user?.name}</p>
                <p className="text-xs text-paper-100/50 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-paper-100/80 hover:bg-ink-600"
              >
                Settings
              </button>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-sm text-coral hover:bg-coral/10">
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
