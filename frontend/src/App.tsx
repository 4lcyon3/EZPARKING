import { useEffect, useState } from "react";
import { AppInfoService } from "../bindings/github.com/4lcyon3/ezparking/internal/uiapi";

export default function App() {
  const [info, setInfo] = useState<{ name: string; vendor: string; version: string } | null>(null);

  useEffect(() => { AppInfoService.Info().then(setInfo); }, []);

  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1>{info?.name ?? "cargando…"}</h1>
      <p>{info ? `v${info.version} · by ${info.vendor}` : ""}</p>
    </main>
  );
}