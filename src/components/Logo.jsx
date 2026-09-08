export function Mark({ size = 36, light = true }) {
  const fg = light ? "#05070a" : "#e8a33d";
  const bg = light ? "#e8a33d" : "#05070a";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="39" height="39" rx="6" fill={bg} stroke={light ? "transparent" : "#2a3444"} />
      <path d="M20 6 L31 12.5 V27.5 L20 34 L9 27.5 V12.5 Z" stroke={fg} strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M20 12 L14 21 H19 L17 30 L27 18 H21 Z" fill={fg} />
    </svg>
  );
}

export function Logo({ light = true, compact = false }) {
  const textColor = light ? "text-white" : "text-slate-950";
  const subColor = light ? "text-amber-300" : "text-amber-600";
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <Mark size={36} light={light} />
      {!compact && (
        <div className="leading-none">
          <div className={`font-display font-semibold text-[17px] tracking-tight ${textColor}`}>Meridian</div>
          <div className={`text-[9px] tracking-[0.28em] font-mono ${subColor}`}>ENERGY SERVICES</div>
        </div>
      )}
    </div>
  );
}
