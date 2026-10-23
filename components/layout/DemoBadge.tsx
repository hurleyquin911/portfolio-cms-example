export function DemoBadge() {
  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-[60] rounded-[var(--radius-sm)] border border-border bg-surface/90 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm"
      aria-hidden
    >
      Demo Mode
    </div>
  );
}
