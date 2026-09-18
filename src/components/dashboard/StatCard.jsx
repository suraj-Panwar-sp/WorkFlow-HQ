const ACCENTS = {
  signal: "border-l-signal",
  ion: "border-l-ion",
  mint: "border-l-mint",
  coral: "border-l-coral",
};

export default function StatCard({ label, value, sublabel, accent = "signal" }) {
  return (
    <div className={`card border-l-4 ${ACCENTS[accent]} p-5`}>
      <p className="text-xs font-medium text-paper-100/50 mb-2">{label}</p>
      <p className="font-display text-3xl font-extrabold text-paper-100 tabular-nums">{value}</p>
      {sublabel && <p className="text-xs text-paper-100/40 mt-1.5">{sublabel}</p>}
    </div>
  );
}
