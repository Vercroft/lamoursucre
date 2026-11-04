import type { CSSProperties } from "react";
import type { Shape, Tint } from "@/lib/menu";
import { tintVars } from "@/lib/menu";

/**
 * Hand-drawn pastry illustrations. Every drawing takes a soft + deep colour
 * from the palette so the same croissant can be butter, pistachio or sky.
 */

const INK = "#4a2b2b";

type DrawProps = { soft: string; deep: string };

const outline = {
  fill: "none",
  stroke: INK,
  strokeWidth: 2.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Macaron({ soft, deep }: DrawProps) {
  return (
    <g>
      <path d="M18 56C18 36 37 24 60 24s42 12 42 32Z" fill={soft} />
      <path
        d="M18 55c12 6 16-6 28 0s16-6 28 0 16-6 28 0v20c-12 6-16-6-28 0s-16-6-28 0-16-6-28 0Z"
        fill={deep}
      />
      <path d="M18 74c0 18 19 30 42 30s42-12 42-30Z" fill={soft} />
      <path d="M18 56C18 36 37 24 60 24s42 12 42 32" {...outline} />
      <path d="M18 74c0 18 19 30 42 30s42-12 42-30" {...outline} />
      <path d="M18 55c12 6 16-6 28 0s16-6 28 0 16-6 28 0" {...outline} strokeWidth={2.2} />
      <path d="M18 75c12 6 16-6 28 0s16-6 28 0 16-6 28 0" {...outline} strokeWidth={2.2} />
      <ellipse
        cx="41"
        cy="37"
        rx="12"
        ry="6"
        fill="#fff"
        opacity="0.55"
        transform="rotate(-20 41 37)"
      />
    </g>
  );
}

function Croissant({ soft, deep }: DrawProps) {
  // A crescent carved from two offset circles: outer centred (60,66) r48,
  // inner centred (60,88) r38. Fat over the top, tapering to real tips.
  const body = "M22.97 96.55A48 48 0 1 1 97.03 96.55A38 38 0 1 0 22.97 96.55Z";
  // segment creases, radiating from the outer centre and clipped to the body
  const seg: [number, number, number, number][] = [
    [31.8, 55.7, 11.1, 48.2],
    [38.8, 44.8, 23.2, 29.2],
    [49.7, 37.8, 42.2, 17.1],
    [60, 36, 60, 14],
    [70.3, 37.8, 77.8, 17.1],
    [81.2, 44.8, 96.8, 29.2],
    [88.2, 55.7, 108.9, 48.2],
  ];
  return (
    <g>
      <clipPath id="croissant-body">
        <path d={body} />
      </clipPath>
      <path d={body} fill={soft} />
      <g clipPath="url(#croissant-body)">
        {seg.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={deep}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.7}
          />
        ))}
        <path
          d="M30 78A38 38 0 0 1 44 49"
          fill="none"
          stroke="#fff"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.5}
        />
      </g>
      <path d={body} {...outline} />
    </g>
  );
}

function Eclair({ soft, deep }: DrawProps) {
  return (
    <g>
      <rect x="12" y="44" width="96" height="36" rx="18" fill={soft} />
      <path
        d="M12 62a18 18 0 0 1 18-18h60a18 18 0 0 1 18 18c-10 7-18-3-28 3s-18-3-28 3-18-3-28 3c-4 2-8 1-12-2Z"
        fill={deep}
      />
      <rect x="12" y="44" width="96" height="36" rx="18" {...outline} />
      <path
        d="M12 62a18 18 0 0 1 18-18h60a18 18 0 0 1 18 18c-10 7-18-3-28 3s-18-3-28 3-18-3-28 3c-4 2-8 1-12-2Z"
        {...outline}
        strokeWidth={2.2}
      />
      {[34, 56, 78].map((x) => (
        <line
          key={x}
          x1={x}
          y1="50"
          x2={x - 7}
          y2="62"
          stroke="#fff"
          strokeWidth={3.4}
          strokeLinecap="round"
          opacity={0.75}
        />
      ))}
    </g>
  );
}

function MilleFeuille({ soft, deep }: DrawProps) {
  const pastry = "#f0cfa4";
  return (
    <g>
      {/* three sheets of puff, two of cream */}
      <rect x="20" y="82" width="80" height="14" rx="3" fill={pastry} />
      <rect x="20" y="70" width="80" height="12" rx="3" fill={soft} />
      <rect x="20" y="56" width="80" height="14" rx="3" fill={pastry} />
      <rect x="20" y="44" width="80" height="12" rx="3" fill={soft} />
      <rect x="20" y="30" width="80" height="14" rx="3" fill="#fffaf4" />
      {[96, 82, 70, 56].map((y, i) => (
        <rect
          key={y}
          x="20"
          y={y - (i % 2 === 0 ? 14 : 12)}
          width="80"
          height={i % 2 === 0 ? 14 : 12}
          rx="3"
          {...outline}
          strokeWidth={2.2}
        />
      ))}
      <rect x="20" y="30" width="80" height="14" rx="3" {...outline} strokeWidth={2.2} />
      {/* the feathered chocolate on top */}
      <path d="M26 37h68" stroke={deep} strokeWidth={3} strokeLinecap="round" />
      <path
        d="M30 33c4 4 4 4 0 8M46 33c4 4 4 4 0 8M62 33c4 4 4 4 0 8M78 33c4 4 4 4 0 8"
        stroke={deep}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
      {/* flaky layer ticks */}
      <path
        d="M32 89h10M56 89h14M34 63h12M62 63h16"
        stroke={INK}
        strokeWidth={1.6}
        opacity={0.35}
        strokeLinecap="round"
      />
    </g>
  );
}

function Tarte({ soft, deep }: DrawProps) {
  const berries = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const r = (a * Math.PI) / 180;
    return { x: 60 + 23 * Math.cos(r), y: 62 + 23 * Math.sin(r) };
  });
  return (
    <g>
      <circle cx="60" cy="62" r="42" fill="#e9c085" />
      <circle
        cx="60"
        cy="62"
        r="38"
        fill="none"
        stroke="#d9a860"
        strokeWidth="9"
        strokeDasharray="7 7"
      />
      <circle cx="60" cy="62" r="34" fill={soft} />
      <circle cx="60" cy="62" r="42" {...outline} />
      <circle cx="60" cy="62" r="34" {...outline} strokeWidth={2.2} />
      {[...berries, { x: 60, y: 62 }].map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="8" fill={deep} />
          <circle cx={b.x} cy={b.y} r="8" stroke={INK} strokeWidth="2" fill="none" />
          <path
            d={`M${b.x - 4} ${b.y - 7}l4 3 4-3`}
            stroke="#7fae76"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={b.x - 2.6} cy={b.y - 2.6} r="1.8" fill="#fff" opacity="0.8" />
        </g>
      ))}
    </g>
  );
}

function Canele({ deep }: DrawProps) {
  return (
    <g>
      <path d="M41 30h38q4 0 5 4l10 58q2 10-8 10H34q-10 0-8-10l10-58q1-4 5-4Z" fill="#8a5330" />
      <path d="M41 30h38q4 0 5 4l10 58q2 10-8 10H34q-10 0-8-10l10-58q1-4 5-4Z" {...outline} />
      {["M47 34 39 100", "M60 34v66", "M73 34l8 66"].map((d) => (
        <path key={d} d={d} stroke="#5f3419" strokeWidth="2.6" fill="none" opacity="0.7" />
      ))}
      <ellipse cx="60" cy="31" rx="20" ry="6" fill={deep} />
      <ellipse cx="60" cy="31" rx="20" ry="6" {...outline} strokeWidth={2.2} />
      <ellipse cx="54" cy="30" rx="7" ry="2.4" fill="#fff" opacity="0.45" />
    </g>
  );
}

function Madeleine({ soft, deep }: DrawProps) {
  const body = "M60 103C35 96 17 78 17 56 17 38 36 25 60 25s43 13 43 31c0 22-18 40-43 47Z";
  const ridges: [number, number][] = [
    [30, 52],
    [40, 40],
    [51, 33],
    [60, 31],
    [69, 33],
    [80, 40],
    [90, 52],
  ];
  return (
    <g>
      <path d={body} fill={soft} />
      <g clipPath="url(#madeleine-body)">
        {ridges.map(([x, y]) => (
          <line
            key={x}
            x1="60"
            y1="99"
            x2={x}
            y2={y}
            stroke={deep}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        ))}
      </g>
      <clipPath id="madeleine-body">
        <path d={body} />
      </clipPath>
      {/* the scalloped rim of the shell */}
      <path
        d="M19 50q7-9 14 0t14 0 14 0 14 0 14 0 14 0"
        fill="none"
        stroke={deep}
        strokeWidth="2.4"
        opacity="0.45"
      />
      <path d={body} {...outline} />
      <path
        d="M34 44c6-8 15-13 24-13"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}

function Chouquette({ soft, deep }: DrawProps) {
  const puffs = [
    { cx: 40, cy: 70, r: 22 },
    { cx: 80, cy: 72, r: 20 },
    { cx: 60, cy: 42, r: 21 },
  ];
  const sugar = [
    [34, 60],
    [46, 74],
    [30, 78],
    [52, 62],
    [74, 64],
    [86, 76],
    [78, 82],
    [54, 36],
    [66, 32],
    [60, 48],
    [70, 46],
  ];
  return (
    <g>
      {puffs.map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={soft} />
          <circle cx={p.cx} cy={p.cy} r={p.r} {...outline} />
          <circle
            cx={p.cx - p.r * 0.35}
            cy={p.cy - p.r * 0.4}
            r={p.r * 0.26}
            fill="#fff"
            opacity="0.5"
          />
        </g>
      ))}
      {sugar.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" stroke={deep} strokeWidth="1" />
      ))}
    </g>
  );
}

function LayerCake({ soft, deep }: DrawProps) {
  return (
    <g>
      {/* stand */}
      <path d="M52 100h16v8H52z" fill="#e3d3c6" stroke={INK} strokeWidth="2.4" />
      <ellipse cx="60" cy="110" rx="30" ry="6" fill="#e3d3c6" stroke={INK} strokeWidth="2.4" />
      {/* body */}
      <path d="M24 44h72v56H24z" fill={soft} />
      <path d="M24 58h72M24 72h72M24 86h72" stroke={deep} strokeWidth="6" />
      <path d="M24 44h72v56H24z" {...outline} />
      {/* frosting cap with drips */}
      <path
        d="M24 44c0-12 16-18 36-18s36 6 36 18c-5 5-7 14-12 14s-6-9-11-9-6 11-13 11-7-11-13-11-6 9-11 9-7-9-12-14Z"
        fill="#fffaf4"
      />
      <path
        d="M24 44c0-12 16-18 36-18s36 6 36 18c-5 5-7 14-12 14s-6-9-11-9-6 11-13 11-7-11-13-11-6 9-11 9-7-9-12-14Z"
        {...outline}
      />
      {/* a berry on top */}
      <circle cx="60" cy="20" r="8" fill="var(--color-brass)" stroke={INK} strokeWidth="2.4" />
      <path
        d="M60 12c1-5 5-6 8-6"
        stroke="#7fae76"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="57" cy="17" r="2" fill="#fff" opacity="0.8" />
    </g>
  );
}

function Cupcake({ soft, deep }: DrawProps) {
  return (
    <g>
      {/* liner */}
      <path d="M30 62h60l-8 40q-1 4-5 4H43q-4 0-5-4Z" fill={soft} />
      <path
        d="M42 63l3 42M54 63l1 42M66 63l-1 42M78 63l-3 42"
        stroke={deep}
        strokeWidth="3"
        opacity="0.65"
      />
      <path d="M30 62h60l-8 40q-1 4-5 4H43q-4 0-5-4Z" {...outline} />
      <path d="M30 62h60" {...outline} strokeWidth={2.4} />
      {/* piped swirl */}
      <ellipse cx="60" cy="56" rx="32" ry="15" fill={deep} />
      <ellipse cx="60" cy="44" rx="25" ry="13" fill={deep} />
      <ellipse cx="60" cy="33" rx="17" ry="11" fill={deep} />
      <circle cx="60" cy="24" r="8" fill={deep} />
      <ellipse cx="60" cy="56" rx="32" ry="15" {...outline} />
      <ellipse cx="60" cy="44" rx="25" ry="13" {...outline} strokeWidth={2.2} />
      <ellipse cx="60" cy="33" rx="17" ry="11" {...outline} strokeWidth={2.2} />
      <circle cx="60" cy="24" r="8" {...outline} strokeWidth={2.2} />
      {/* sprinkles */}
      {[
        [44, 50, -25],
        [74, 52, 30],
        [52, 38, 15],
        [70, 36, -40],
        [60, 47, 60],
      ].map(([x, y, rot], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="7"
          height="3"
          rx="1.5"
          fill={["var(--color-bone-2)", "#fff", "var(--color-oat)", "var(--color-sand)", "#fff"][i]}
          transform={`rotate(${rot} ${x + 3.5} ${y + 1.5})`}
        />
      ))}
      <circle cx="60" cy="14" r="7" fill="var(--color-brass)" stroke={INK} strokeWidth="2.4" />
      <path
        d="M60 7c1-4 4-5 7-5"
        stroke="#7fae76"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

const drawings: Record<Shape, (p: DrawProps) => React.JSX.Element> = {
  macaron: Macaron,
  croissant: Croissant,
  eclair: Eclair,
  millefeuille: MilleFeuille,
  tarte: Tarte,
  canele: Canele,
  madeleine: Madeleine,
  chouquette: Chouquette,
  cake: LayerCake,
  cupcake: Cupcake,
};

export function Pastry({
  shape,
  tint,
  className,
  style,
  title,
}: {
  shape: Shape;
  tint: Tint;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  const Draw = drawings[shape];
  const { soft, deep } = tintVars[tint];
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <Draw soft={soft} deep={deep} />
    </svg>
  );
}
