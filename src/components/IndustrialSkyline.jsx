// Layered SVG silhouette of rigs, derricks, tanks and cranes — used as a
// cinematic backdrop where photography isn't available. Pure vector, so it
// stays crisp and fast at any size, and layers drift independently for a
// subtle parallax feel.
export function IndustrialSkyline({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 500"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1220" stopOpacity="0" />
          <stop offset="100%" stopColor="#05070a" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* far layer: storage tanks + low horizon */}
      <g opacity="0.35" className="mrd-drift" style={{ animationDuration: "38s" }}>
        {[120, 260, 980, 1120, 1400].map((x, i) => (
          <g key={i}>
            <rect x={x} y="360" width="90" height="70" rx="4" fill="#132038" />
            <ellipse cx={x + 45} cy="360" rx="45" ry="8" fill="#182642" />
          </g>
        ))}
      </g>

      {/* mid layer: pipeline + cranes */}
      <g opacity="0.55" className="mrd-drift" style={{ animationDuration: "26s", animationDirection: "reverse" }}>
        <path d="M0,410 L1600,410" stroke="#1c2a42" strokeWidth="10" />
        <path d="M0,410 L1600,410" stroke="#25344e" strokeWidth="3" strokeDasharray="18 14" />
        {[200, 700, 1250].map((x, i) => (
          <g key={i}>
            <rect x={x} y="230" width="6" height="180" fill="#1e2c46" />
            <path d={`M${x - 90},250 L${x + 6},250 L${x + 6},410`} stroke="#25344e" strokeWidth="5" fill="none" />
          </g>
        ))}
      </g>

      {/* near layer: derricks / rig towers, brightest + slowest drift */}
      <g className="mrd-drift" style={{ animationDuration: "20s" }}>
        {[
          { x: 420, h: 260 },
          { x: 860, h: 320 },
          { x: 1180, h: 220 },
        ].map((rig, i) => (
          <g key={i} opacity={i === 1 ? 0.9 : 0.6}>
            <path
              d={`M${rig.x - 55},410 L${rig.x},${410 - rig.h} L${rig.x + 55},410`}
              stroke="#3a4a66"
              strokeWidth="4"
              fill="none"
            />
            <path
              d={`M${rig.x - 34},410 L${rig.x},${410 - rig.h * 0.62} L${rig.x + 34},410`}
              stroke="#3a4a66"
              strokeWidth="2.5"
              fill="none"
            />
            <line x1={rig.x - 40} y1={410 - rig.h * 0.3} x2={rig.x + 40} y2={410 - rig.h * 0.3} stroke="#3a4a66" strokeWidth="2" />
            <line x1={rig.x - 28} y1={410 - rig.h * 0.55} x2={rig.x + 28} y2={410 - rig.h * 0.55} stroke="#3a4a66" strokeWidth="2" />
            <circle cx={rig.x} cy={410 - rig.h - 4} r="4" fill="#e8a33d" className="mrd-pulse" />
          </g>
        ))}
      </g>

      <rect x="0" y="400" width="1600" height="100" fill="url(#skyFade)" />
    </svg>
  );
}
