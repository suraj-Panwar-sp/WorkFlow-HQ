export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-2xl bg-ink-600 border border-ink-500 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-paper-100/40">
          <path d="M4 7h16M4 12h10M4 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-paper-100 mb-1">{title}</h3>
      <p className="text-sm text-paper-100/55 max-w-sm mb-5">{message}</p>
      {action}
    </div>
  );
}
