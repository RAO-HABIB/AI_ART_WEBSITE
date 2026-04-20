export default function GlowEffect() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Top Left Glow */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-600/20 rounded-full blur-[128px] animate-glow-pulse" />

      {/* Top Right Glow */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent-600/15 rounded-full blur-[128px] animate-glow-pulse delay-1000" />

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[200px]" />

      {/* Bottom Glow */}
      <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-accent-600/10 rounded-full blur-[128px] animate-glow-pulse delay-500" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    </div>
  );
}