import { useEffect, useState } from "react";
import { AppInfoService, UIService } from "../bindings/github.com/4lcyon3/ezparking/internal/uiapi";
import { Splash } from "./components/Splash";
import { AppShell } from "./app/AppShell";
import "./styles/tokens.css";

export default function App() {
  const [info, setInfo] = useState<{ version: string; vendor: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t0 = performance.now();
    (async () => {
      try {
        setInfo(await AppInfoService.Info());
      } catch (err) {
        console.error("AppInfo:", err);
      }
      setTimeout(() => setReady(true), Math.max(0, 400 - (performance.now() - t0)));
    })();
  }, []);

  // Avisamos a Go después de que el shell haya pintado de verdad.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => { UIService.Ready().catch(console.error); });
    return () => cancelAnimationFrame(id);
  }, [ready]);

  if (!ready) return <Splash label="Preparando…" />;
  return <AppShell version={info?.version ?? "0.1.0"} vendor={info?.vendor ?? "GeneSYS"} />;
}