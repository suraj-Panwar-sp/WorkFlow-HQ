import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../features/ui/uiSlice";

const VARIANT_STYLES = {
  success: "border-mint/40 bg-ink-700 text-paper-100 before:bg-mint",
  error: "border-coral/40 bg-ink-700 text-paper-100 before:bg-coral",
  info: "border-ion/40 bg-ink-700 text-paper-100 before:bg-ion",
};

function Toast({ toast }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(toast.id)), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <div
      className={`relative overflow-hidden pl-4 pr-8 py-3 rounded-lg border shadow-panel text-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${VARIANT_STYLES[toast.variant] || VARIANT_STYLES.info}`}
    >
      {toast.message}
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        aria-label="Dismiss notification"
        className="absolute right-2 top-2.5 text-paper-100/40 hover:text-paper-100"
      >
        ✕
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector((state) => state.ui.toasts);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
}
