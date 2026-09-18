import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full ${widths[size]} card p-6 animate-[fadeIn_.15s_ease-out]`}
      >
        <div className="flex items-start justify-between mb-4">
          <h2 id="modal-title" className="font-display text-lg font-bold text-paper-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-paper-100/50 hover:text-paper-100 transition-colors -mt-1 -mr-1 p-1"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
