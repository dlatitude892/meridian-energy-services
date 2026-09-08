import { useEffect, useState } from "react";
import { Mark } from "./Logo";

export function LoadingScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 900);
    const t2 = setTimeout(() => onDone?.(), 1350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#05070a] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className="mrd-float">
        <Mark size={52} light={false} />
      </div>
      <div className="mt-6 w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-amber-400 origin-left"
          style={{ animation: "loaderBar 0.9s cubic-bezier(.16,.84,.44,1) forwards" }}
        />
      </div>
      <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-slate-500">MERIDIAN ENERGY SERVICES</div>
    </div>
  );
}
