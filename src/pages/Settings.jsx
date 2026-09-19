import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { setTheme, addToast, openModal } from "../features/ui/uiSlice";
import { clearAppStorage, getFromLocalStorage, setToLocalStorage, STORAGE_KEYS } from "../utils/localStorage";
import { dummyUsers } from "../data/dummyData";

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });

  const handleThemeChange = (value) => {
    dispatch(setTheme(value));
    document.body.classList.toggle("theme-light", value === "light");
    dispatch(addToast({ message: `Switched to ${value} mode.`, variant: "info" }));
  };

  // const handleProfileSave = (e) => {
  //   e.preventDefault();
  //   const loginUser = getFromLocalStorage(STORAGE_KEYS.USER);
  //   const { id, role } = loginUser;
  //   const updatedUser = {
  //     id,
  //     name: profile.name,
  //     email: profile.email,
  //     role,
  //   };
  //   setToLocalStorage(STORAGE_KEYS.USER, updatedUser);
  //   const existing = getFromLocalStorage("workflow_registered_users", dummyUsers);
  //   const updated = existing.map((e) => {
  //     if (e.id === id) {
  //       return {
  //         ...e,
  //         name: profile.name,
  //         email: profile.email,
  //       };
  //     }

  //     return e;
  //   });
  //   console.log(updated);
  //   setToLocalStorage("workflow_registered_users",updated);

  //   dispatch(addToast({ message: "Profile information saved locally.", variant: "success" }));
  // };

  const handleReset = () => {
    dispatch(
      openModal({
        type: "confirm",
        payload: {
          title: "Reset application data",
          message: "This clears all employees, tasks, departments and preferences stored in this browser, and reloads the app.",
          confirmLabel: "Reset data",
          onConfirm: () => {
            clearAppStorage();
            window.location.href = "/login";
          },
        },
      })
    );
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" description="Manage your preferences and account." />

      <div className="card p-6 mb-5">
        <h3 className="font-display font-bold text-paper-100 mb-1">Appearance</h3>
        <p className="text-sm text-paper-100/50 mb-4">Choose how WorkFlow looks on this device.</p>
        <div className="flex gap-3">
          <button
            onClick={() => handleThemeChange("dark")}
            className={`flex-1 rounded-lg border p-4 text-left transition-colors ${theme === "dark" ? "border-signal bg-ink-600" : "border-ink-500 hover:bg-ink-600/50"}`}
          >
            <p className="text-sm font-semibold text-paper-100">Dark</p>
            <p className="text-xs text-paper-100/45 mt-0.5">Navy background, high contrast</p>
          </button>
          <button
            onClick={() => handleThemeChange("light")}
            className={`flex-1 rounded-lg border p-4 text-left transition-colors ${theme === "light" ? "border-signal bg-ink-600" : "border-ink-500 hover:bg-ink-600/50"}`}
          >
            <p className="text-sm font-semibold text-paper-100">Light</p>
            <p className="text-xs text-paper-100/45 mt-0.5">Bright background for daytime use</p>
          </button>
        </div>
      </div>

      {/* <form onSubmit={handleProfileSave} className="card p-6 mb-5 space-y-4">
        <div>
          <h3 className="font-display font-bold text-paper-100 mb-1">Profile</h3>
          <p className="text-sm text-paper-100/50">Update how your name and email appear across WorkFlow.</p>
        </div>
        <Input label="Full name" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
        <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
        <div className="flex justify-end">
          <Button type="submit">Save profile</Button>
        </div>
      </form> */}

      <div className="card p-6 border-coral/30">
        <h3 className="font-display font-bold text-paper-100 mb-1">Reset application data</h3>
        <p className="text-sm text-paper-100/50 mb-4">
          Permanently clear all employees, tasks, departments and your session from this browser's storage.
        </p>
        <Button variant="danger" onClick={handleReset}>
          Reset all data
        </Button>
      </div>
    </div>
  );
}
