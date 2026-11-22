const NAV = [
  { id: "panel", label: "Panel", icon: "📊" },
  { id: "vehiculos", label: "Vehículos", icon: "🚗" },
  { id: "tarifas", label: "Tarifas", icon: "💲" },
  { id: "listanegra", label: "Lista negra", icon: "⛔" },
  { id: "reportes", label: "Reportes", icon: "📈" },
  { id: "config", label: "Configuración", icon: "⚙️" },
] as const;

type Props = { version: string; vendor: string };

export function AppShell({ version, vendor }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "232px 1fr", height: "100%" }}>
      <aside style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", padding: "var(--s4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", marginBottom: "var(--s5)" }}>
          <div style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", background: "var(--brand)",
                        color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>e</div>
          <strong>ezparking</strong>
        </div>
        <nav style={{ display: "grid", gap: "var(--s1)" }}>
          {NAV.map((n) => (
            <button key={n.id} style={{ display: "flex", gap: "var(--s3)", alignItems: "center",
              padding: "10px var(--s3)", border: 0, borderRadius: "var(--r-sm)",
              background: n.id === "panel" ? "var(--neutral-bg)" : "transparent",
              color: "var(--text)", textAlign: "left" }}>
              <span aria-hidden>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
      </aside>
      <main style={{ padding: "var(--s5)", overflow: "auto" }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Panel principal</h1>
        <p style={{ color: "var(--text-muted)" }}>v{version} · by {vendor}</p>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)", padding: "var(--s5)", boxShadow: "var(--shadow)" }}>
          Fase 0 completada. Los indicadores llegan en la Fase 6.
        </div>
      </main>
    </div>
  );
}