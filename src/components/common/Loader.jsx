export default function Loader({ label = "Loading…", full = false }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 text-paper-100/50 ${full ? "min-h-[60vh]" : "py-16"}`}>
      <span className="h-8 w-8 rounded-full border-2 border-ink-500 border-t-signal animate-spin" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
