const stroke = { fill: "none", stroke: "var(--ink)", strokeWidth: 1.5 };

function Jigsaw() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "8s" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 40 + (i % 3) * 110;
          const y = 40 + Math.floor(i / 3) * 110;
          return (
            <g key={i} opacity={i === 4 ? 1 : 0.35}>
              <rect x={x} y={y} width="90" height="90" {...stroke} stroke={i === 4 ? "var(--acc)" : "var(--ink)"} />
              <circle cx={x + 90} cy={y + 45} r="10" {...stroke} stroke={i === 4 ? "var(--acc)" : "var(--ink)"} />
              <circle cx={x + 45} cy={y} r="10" {...stroke} stroke={i === 4 ? "var(--acc)" : "var(--ink)"} />
            </g>
          );
        })}
        <text x="40" y="285" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          the missing piece: found
        </text>
      </g>
    </svg>
  );
}

function JigsawB() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "8.5s" }}>
        {[
          { x: 30, y: 60, l: "docs" },
          { x: 30, y: 170, l: "roadmaps" },
          { x: 300, y: 60, l: "videos" },
          { x: 300, y: 170, l: "practice" },
        ].map((n) => (
          <g key={n.l}>
            <line x1={n.x + 40} y1={n.y + 25} x2="200" y2="150" stroke="var(--lin)" strokeWidth="1.5" strokeDasharray="4 6" />
            <rect x={n.x} y={n.y} width="80" height="50" {...stroke} opacity="0.6" />
            <text x={n.x + 40} y={n.y + 30} fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
              {n.l}
            </text>
          </g>
        ))}
        <rect x="140" y="90" width="120" height="120" {...stroke} stroke="var(--acc)" strokeWidth="2" fill="var(--glow)" />
        <circle cx="260" cy="150" r="14" {...stroke} stroke="var(--acc)" strokeWidth="2" fill="var(--paper)" />
        <circle cx="200" cy="90" r="14" fill="var(--paper)" {...stroke} stroke="var(--acc)" strokeWidth="2" />
        <text x="200" y="158" fill="var(--acc)" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">
          best-of
        </text>
        <text x="200" y="275" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
          curated &gt; googled
        </text>
      </g>
    </svg>
  );
}

function JigsawC() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "9.5s" }}>
        <rect x="90" y="110" width="220" height="120" {...stroke} opacity="0.35" />
        <rect x="70" y="80" width="220" height="120" {...stroke} opacity="0.55" />
        <rect x="50" y="50" width="220" height="120" fill="var(--glow)" {...stroke} stroke="var(--acc)" strokeWidth="1.5" />
        <path d="M70 66 l5 10 11 1 -8 8 2 11 -10 -6 -10 6 2 -11 -8 -8 11 -1 z" fill="var(--acc)" />
        {[0, 1, 2].map((r) => (
          <line key={r} x1="70" y1={100 + r * 20} x2={r === 2 ? 190 : 250} y2={100 + r * 20} stroke="var(--mut)" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
        ))}
        <text x="50" y="255" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          hand-picked · zero noise
        </text>
      </g>
    </svg>
  );
}

function SheetCraft() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "9s" }}>
        <rect x="30" y="50" width="340" height="180" {...stroke} opacity="0.6" />
        {[0, 1, 2, 3, 4].map((r) => (
          <line key={r} x1="30" y1={86 + r * 36} x2="370" y2={86 + r * 36} {...stroke} opacity="0.35" />
        ))}
        {[0, 1, 2, 3].map((c) => (
          <line key={c} x1={115 + c * 85} y1="50" x2={115 + c * 85} y2="230" {...stroke} opacity="0.35" />
        ))}
        <rect x="115" y="86" width="85" height="36" fill="var(--glow)" stroke="var(--acc)" strokeWidth="1.5" />
        <rect x="30" y="24" width="340" height="26" {...stroke} opacity="0.6" />
        <text x="40" y="42" fill="var(--acc)" fontSize="11" fontFamily="var(--font-mono)">
          fx =SUM(B2:B6) ✓ live
        </text>
        <text x="30" y="270" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          multi-edit · live updates · REST
        </text>
      </g>
    </svg>
  );
}

function SheetB() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "8s" }}>
        <rect x="40" y="50" width="320" height="190" {...stroke} opacity="0.6" />
        {[70, 130, 190, 250].map((x, i) => (
          <rect key={x} x={x} y={220 - [90, 140, 60, 120][i]} width="34" height={[90, 140, 60, 120][i]} fill={i === 1 ? "var(--acc)" : "var(--glow)"} stroke="var(--acc)" strokeWidth="1" opacity={i === 1 ? 1 : 0.8} />
        ))}
        <rect x="40" y="24" width="320" height="26" {...stroke} opacity="0.6" />
        <text x="50" y="42" fill="var(--acc)" fontSize="11" fontFamily="var(--font-mono)">
          fx =TREND(cells) ↗ live
        </text>
        <text x="40" y="270" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          formulas that react, not just compute
        </text>
      </g>
    </svg>
  );
}

function SheetC() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "10s" }}>
        <rect x="30" y="50" width="340" height="180" {...stroke} opacity="0.5" />
        {[0, 1, 2, 3, 4].map((r) => (
          <line key={r} x1="30" y1={86 + r * 36} x2="370" y2={86 + r * 36} {...stroke} opacity="0.3" />
        ))}
        {[0, 1, 2, 3].map((c) => (
          <line key={c} x1={115 + c * 85} y1="50" x2={115 + c * 85} y2="230" {...stroke} opacity="0.3" />
        ))}
        <rect x="115" y="86" width="85" height="36" fill="var(--glow)" stroke="var(--acc)" strokeWidth="1.5" />
        <rect x="285" y="158" width="85" height="36" fill="var(--glow)" stroke="var(--acc2)" strokeWidth="1.5" />
        <text x="120" y="80" fill="var(--acc)" fontSize="10" fontFamily="var(--font-mono)">▮ you</text>
        <text x="290" y="152" fill="var(--acc2)" fontSize="10" fontFamily="var(--font-mono)">▮ also you</text>
        <text x="30" y="270" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          multi-edit: two cursors, one truth
        </text>
      </g>
    </svg>
  );
}

function Memix() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "7s" }}>
        <rect x="50" y="90" width="220" height="150" {...stroke} opacity="0.35" />
        <rect x="90" y="60" width="220" height="150" {...stroke} opacity="0.55" />
        <rect x="130" y="30" width="220" height="150" fill="var(--glow)" {...stroke} stroke="var(--acc)" />
        <circle cx="142" cy="42" r="3" fill="var(--acc)" />
        <circle cx="154" cy="42" r="3" fill="var(--acc2)" />
        <text x="142" y="105" fill="var(--ink)" fontSize="34">
          ¯\_(ツ)_/¯
        </text>
        <text x="142" y="140" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          always-on-top: true
        </text>
        <text x="142" y="160" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          opacity: 0.85 · emotion: shipping
        </text>
      </g>
    </svg>
  );
}

function MemixB() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "7.5s" }}>
        <rect x="50" y="50" width="300" height="200" {...stroke} stroke="var(--acc)" fill="var(--glow)" />
        <circle cx="62" cy="62" r="3" fill="var(--acc)" />
        <circle cx="74" cy="62" r="3" fill="var(--acc2)" />
        <text x="90" y="66" fill="var(--mut)" fontSize="10" fontFamily="var(--font-mono)">memix · dashboard</text>
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect x="70" y={90 + r * 44} width="120" height="10" {...stroke} opacity="0.5" />
            <rect x="70" y={90 + r * 44} width={[90, 60, 105][r]} height="10" fill="var(--acc)" opacity="0.85" />
            <text x="210" y={99 + r * 44} fill="var(--mut)" fontSize="10" fontFamily="var(--font-mono)">
              {["memes shipped", "stickers pinned", "gifs looped"][r]}
            </text>
          </g>
        ))}
        <rect x="70" y="218" width="120" height="18" {...stroke} stroke="var(--acc2)" />
        <text x="78" y="231" fill="var(--acc2)" fontSize="10" fontFamily="var(--font-mono)">always-on-top: ON</text>
      </g>
    </svg>
  );
}

function MemixC() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "9s" }}>
        {[0, 1, 2, 3].map((i) => {
          const x = 60 + (i % 2) * 150;
          const y = 45 + Math.floor(i / 2) * 110;
          const hot = i === 2;
          return (
            <g key={i}>
              <rect x={x} y={y} width="130" height="90" {...stroke} stroke={hot ? "var(--acc)" : "var(--ink)"} opacity={hot ? 1 : 0.45} fill={hot ? "var(--glow)" : "none"} />
              <polygon points={`${x + 55},${y + 30} ${x + 55},${y + 60} ${x + 82},${y + 45}`} fill={hot ? "var(--acc)" : "var(--mut)"} />
              <text x={x + 8} y={y + 80} fill="var(--mut)" fontSize="9" fontFamily="var(--font-mono)">
                gif_0{i + 1}.loop
              </text>
            </g>
          );
        })}
        <text x="60" y="285" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          hover any frame — it moves first
        </text>
      </g>
    </svg>
  );
}

function Forge() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "10s" }}>
        <path d="M40 220 C 90 120, 130 260, 180 160 S 260 60, 300 140" {...stroke} stroke="var(--acc)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="240" y="170" width="110" height="80" {...stroke} opacity="0.55" transform="rotate(-6 295 210)" />
        <circle cx="90" cy="90" r="34" {...stroke} opacity="0.55" />
        {[40, 180, 300].map((x, i) => (
          <rect key={i} x={x - 4} y={[220, 160, 140][i] - 4} width="8" height="8" fill="var(--acc)" />
        ))}
        <text x="40" y="285" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          freehand + shapes · export-ready
        </text>
      </g>
    </svg>
  );
}

function ForgeB() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "8.5s" }}>
        <polygon points="200,50 280,130 200,210 120,130" {...stroke} stroke="var(--acc)" strokeWidth="2" fill="var(--glow)" />
        <ellipse cx="110" cy="220" rx="55" ry="32" {...stroke} opacity="0.6" />
        {[[200, 50], [280, 130], [200, 210], [120, 130]].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" fill="var(--paper)" stroke="var(--acc)" strokeWidth="1.5" />
        ))}
        <rect x="250" y="180" width="110" height="80" {...stroke} strokeDasharray="5 6" opacity="0.7" />
        <text x="262" y="250" fill="var(--mut)" fontSize="10" fontFamily="var(--font-mono)">selecting…</text>
        <text x="40" y="285" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          shapes with handles, not magic
        </text>
      </g>
    </svg>
  );
}

function ForgeC() {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden>
      <g className="animate-floaty" style={{ animationDuration: "10.5s" }}>
        <rect x="45" y="45" width="220" height="200" {...stroke} stroke="var(--acc)" strokeDasharray="6 6" strokeWidth="1.5" />
        <path d="M70 200 C 100 130, 140 220, 180 140" {...stroke} stroke="var(--acc)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="120" y="80" width="70" height="50" {...stroke} opacity="0.6" transform="rotate(-5 155 105)" />
        <line x1="265" y1="145" x2="315" y2="145" stroke="var(--acc2)" strokeWidth="2" />
        <polygon points="315,145 303,138 303,152" fill="var(--acc2)" />
        <rect x="320" y="122" width="60" height="46" {...stroke} stroke="var(--acc2)" />
        <text x="328" y="142" fill="var(--acc2)" fontSize="10" fontFamily="var(--font-mono)">PNG</text>
        <text x="328" y="158" fill="var(--acc2)" fontSize="10" fontFamily="var(--font-mono)">SVG</text>
        <text x="45" y="285" fill="var(--mut)" fontSize="11" fontFamily="var(--font-mono)">
          export-friendly from day one
        </text>
      </g>
    </svg>
  );
}

const ARTS = {
  jigsaw: [Jigsaw, JigsawB, JigsawC],
  sheetcraft: [SheetCraft, SheetB, SheetC],
  memix: [Memix, MemixB, MemixC],
  forge: [Forge, ForgeB, ForgeC],
};

export default function ProjectArt({ id, variant = 0 }) {
  const list = ARTS[id] || ARTS.forge;
  const Art = list[variant % list.length];
  return <Art />;
}
