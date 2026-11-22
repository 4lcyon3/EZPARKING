import "./splash.css";

export function Splash({ label = "Preparando…" }: { label?: string }) {
  return (
    <div className="splash" role="status" aria-live="polite">
      <div className="splash-mark">e</div>
      <h1 className="splash-name">ezparking</h1>
      <p className="splash-vendor">by GeneSYS</p>
      <div className="splash-bar"><span /></div>
      <p className="splash-label">{label}</p>
    </div>
  );
}