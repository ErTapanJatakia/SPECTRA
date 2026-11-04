export default function StatusPill({ label = "Planned" }: { label?: string }) {
  return <span className="status-pill"><span className="status-dot" />{label}</span>;
}
